import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleaningShiftCalculatorComponent } from './cleaning-shift-calculator/cleaning-shift-calculator.component';
import { HomeComponent } from './home/home.component';
import { WalletAddComponent } from './wallet/walletAdd/wallet-add.component';
import { WalletEditComponent } from './wallet/walletEdit/wallet-edit.component';
import { WalletRemoveComponent } from './wallet/walletRemove/wallet-remove.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'wallet-add', component: WalletAddComponent},
  {path: 'wallet-remove', component: WalletRemoveComponent},
  {path: 'wallet-edit', component: WalletEditComponent},
  {path: 'cleaning-shift-calculator', component: CleaningShiftCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
