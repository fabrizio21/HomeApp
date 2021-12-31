import { AfterContentInit, AfterViewChecked, AfterViewInit, ApplicationModule, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { walletItemDTO } from 'src/wallet/wallet.model';
import { MatTableDataSource } from '@angular/material/table';

import { WalletService, WalletItemQuery } from '../../services/wallet.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { WalletDataSource } from 'src/wallet/walletTable';
import { MatPaginatorModule } from "@angular/material/paginator";
import { Sort } from 'src/app/page';
import { PaginatedDataSource } from 'src/app/paginated-datasource';
import { noUndefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-wallet-remove',
  templateUrl: './wallet-remove.component.html',
  styleUrls: ['./wallet-remove.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletRemoveComponent {

  displayedColumns: string[] = ['Delete', 'Name', 'Category', 'Date', 'Value'];
  
  initialSort: Sort<walletItemDTO> = {property: 'Name', order: 'asc'}
  data = new PaginatedDataSource<walletItemDTO, WalletItemQuery>(
    (request, query) => this.walletService.page(request,query),
    this.initialSort,
    {search: '*', registration: undefined},
    5
  );

  constructor(
    private walletService: WalletService,
    private dialog: MatDialog) {     
      //this.data.queryBy({search: '*'});
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