import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit, ViewChildren, QueryList, ContentChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import familiesJson from 'files/families.json';
import daysOfWeekJson from 'files/daysOfWeek.json';

import { FamilyDTO } from '../models/family-model.';

import { FamilyService } from '../services/family-service/family-service';

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cleaning-shift-calculator',
  templateUrl: './cleaning-shift-calculator.component.html',
  styleUrls: ['./cleaning-shift-calculator.component.css']
})
export class CleaningShiftCalculatorComponent implements OnInit, AfterViewInit {

  // injects the wanted service
  constructor(private familyService: FamilyService) {
    //todo: recuperare dati da database e visualizzarli
  }

  ngAfterViewInit(): void {

  }

  computed: boolean = false;
  families: FamilyDTO[] = familiesJson;
  //families: Observable<FamilyDTO[]> = familiesJson;

  // next year (usually i open the page between the years)
  @Input()
  selectedYear:number = (new Date()).getFullYear() + 1;
  selectedDay = '';

  year:Date = new Date();

  cleaningShifts: {
    family: string,
    day: Date;
  }[] = [];

  daysOfWeek: {
    name: string;
    index: number;
    selected: boolean;
  }[] = daysOfWeekJson;

  selectedOptions: number[] = [];



  ngOnInit(){

    // determine initial selected options to display
    this.selectedOptions = this.daysOfWeek
      .filter(item => item.selected)
      .map(item => item.index);
  }

  drop(event: CdkDragDrop<string[]>) {
    // moves the element in the array
    moveItemInArray(this.families, event.previousIndex, event.currentIndex);
  }

  calculateShifts(){
    // Gets the first day of the year
    var d = new Date(this.selectedYear,0,1);
    var famCount: number;
    var itemPerMonthCount: number; // numero di elementi genearti per mese (devo sempre avere 5 elementi per mese)
    var lastMonth: number;
    var weeks;
    famCount=0;
    
    // Gets the first 'cleaning day' of the year
    while (d.getDay() !== this.selectedOptions[0]) {
          d.setDate(d.getDate() + 1);
      }

      itemPerMonthCount = 0;
      lastMonth = 0;
      weeks = 0;
    // calculates the cleaning shifts
    while(d.getFullYear() === this.selectedYear){

      if(lastMonth !== d.getMonth()){
        // è cambiato mese, controllo di aver generato 5 elementi per mese
        if(itemPerMonthCount < 5){
          console.log(5 - itemPerMonthCount);
            // aggiungo elementi vuoti per arrivare a 5 settimane al mese
            for(var c = 5 - itemPerMonthCount; c > 0; c-- ){
              this.cleaningShifts.push({family: '', day: new Date(1900,1,1)});
            }
        }
        itemPerMonthCount = 0;
        lastMonth = d.getMonth();
      } 


      if(famCount > this.families.length - 1 ) famCount = 0;
      console.log(this.families[famCount] + '(' + famCount + ')' + d);
      this.cleaningShifts.push({family: this.families[famCount].Name.toUpperCase(), day: new Date(d)});
      d.setDate(d.getDate() + 7);
      famCount++;
      itemPerMonthCount++;
      weeks++;

    }
    
    // 5 settimane al mese * 12 mesi
    if(this.cleaningShifts.length<60){
      for(var c = 60 - this.cleaningShifts.length; c > 0; c-- ){
        this.cleaningShifts.push({family: '', day: new Date(1900,1,1)});
      }
    }

    this.computed = true;
    

    // now passes the calculations to a web api that prints the page
    // ...
  }
  onDayChanged(days: { selectedOptions: { selected: any[]; }; }){
    // determine selected options
    this.selectedOptions = days.selectedOptions.selected.map(item => item.value);
  }

  getValue(val: string){
    this.selectedYear = Number(val);
  }

  closeDatePicker(eventData: any, picker ? : any) {

    this.year = picker.value;
    this.selectedYear = picker.value;

    alert(picker.value);
    // get month and year from eventData and close datepicker, thus not allowing user to select date
    picker.close();
 }

 public downloadAsPDF() { 
    try{
    /*
      const cleaningShiftTable = this.cleaningShiftTable.nativeElement;
      var html = htmlToPdfmake(cleaningShiftTable.innerHTML);
      const documentDefinition = { content: html };
      pdfMake.createPdf(documentDefinition).download();
*/
    } catch(e) {
      alert(e);
      console.log(e); 
    }
  }

  public openPDF():void {
    let DATA = document.getElementById('cleaningShiftTable')!;
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('angular-demo.pdf');

    });     
    }


}
