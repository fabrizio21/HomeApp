import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WalletService } from '../../services/wallet.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith} from 'rxjs/operators'
import { walletItemCreationDTO } from 'src/wallet/wallet.model';
import { nonZero } from '../../validators/nonZero';


@Component({
  selector: 'app-wallet-add',
  templateUrl: './wallet-add.component.html',
  styleUrls: ['./wallet-add.component.css']
})
export class WalletAddComponent implements OnInit {

  selected = 'option2';
  startDate: any;
  descr = '';
  value = 0.0;

  categories: string[] = [];
  filteredCategories: Observable<string[]> | undefined;

  form: FormGroup;

  constructor(private walletService: WalletService, private formBuilder: FormBuilder) { 
    // inizializza il formGroup passando le validazioni
    this.form = this.formBuilder.group({
      Name: ['',{
        validators: [Validators.required]
      }],
      Value: [0,{
        validators: [Validators.required, nonZero()]
      }],
      Category: ['',{
        validators: [Validators.required]
      }],
      Type: '',
      Date: [new Date(),{
        validators: [Validators.required]
      }]
    });
  }

  ngOnInit(): void {
    // ricava le categorie dal webservice per l'autocompletamento
    this.walletService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
    
    this.filteredCategories = this.form.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    )

    this.descr = 'Inserire descrizione';
    this.startDate = new Date();
  }

  private _filter(value: string) : string[]{
    const filterValue = value.toLowerCase();
    return this.categories.filter(cat => cat.toLowerCase().includes(filterValue));
  }

  // Aggiunge il movimento di cassa chiamando il webservice
  saveChanges(){
      
      var type: string;

      // crea l'oggetto da passare al webservice
      if(this.form.get('Value')?.value < 0)
        type = 'Expense';
      else
        type = 'Income';

      var walletItem: walletItemCreationDTO = {
        Name:this.form.get('Name')?.value,
        Value: this.form.get('Value')?.value,
        Category: this.form.get('Category')?.value,
        Date: this.form.get('Date')?.value,
        Type: type
      };

      // trasmette i dati al web service
      this.walletService.create(walletItem).subscribe(() => {
        alert("Aggiunto!");
      }, error => {
        alert("Errore nell'inserimento dell'elemento!");
      });


  }

  getErrorMessageFieldName(){
      const field = this.form.get('Name');
      if(field?.hasError('required')){
        return 'Devi inserire la descrizione';
      }

      if(field?.hasError('nonZero')){
        return field.getError('nonZero').message;
      }
      return '';
  }

}
