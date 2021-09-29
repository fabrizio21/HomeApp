import { AfterContentInit, AfterViewChecked, AfterViewInit, ApplicationModule, Component, OnInit, ViewChild } from '@angular/core';
import { walletItemDTO } from 'src/wallet/wallet.model';
import { MatTableDataSource } from '@angular/material/table';

import { WalletService } from '../../services/wallet.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { WalletDataSource } from 'src/wallet/walletTable';
import { MatPaginatorModule } from "@angular/material/paginator";


@Component({
  selector: 'app-wallet-remove',
  templateUrl: './wallet-remove.component.html',
  styleUrls: ['./wallet-remove.component.css']
})
export class WalletRemoveComponent implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked {

  displayedColumns: string[] = ['Delete', 'Name', 'Category', 'Date', 'Value'];
  dataSource : WalletDataSource = new WalletDataSource(this.walletService) ;
  itemCount: number = 0;

  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule | any;

  constructor(
    private walletService: WalletService,
    private dialog: MatDialog) {     

  }
  ngAfterViewChecked(): void {
    this.itemCount = this.dataSource.length;
    console.log('ngAfterViewChecked');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit: ' + this.dataSource.length);
    this.itemCount = this.dataSource.length;
  }


  ngOnInit(): void {

    console.log('ngOnInit');
    this.dataSource.findWalletItem('Ciao','asc',0,3);
    
    
  
  }

  delete(Id: string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1, 
        title: 'Conferma eliminazione', 
        message: 'Eliminare il messaggio selezionato?',
        icon: 'help'
    };

    const dialogRef = this.dialog.open(DialogComponent,
        dialogConfig);

    dialogRef.afterClosed().subscribe(
        val => {
          if(val == "ok") {
            this.walletService.delete(Id);
            window.location.reload();
          }
        } 
    );
    
  }

}

/*
export class WalletDataSource extends DataSource<any> {
  constructor(private walletService: WalletService) {
    super();
  }
  connect(): Observable<walletItemDTO[]> {
    //return this.walletService.getAll();
    return this.walletService.getByName('Ciao', 'asc', 0, 3);
  }
  disconnect() {}
}
*/