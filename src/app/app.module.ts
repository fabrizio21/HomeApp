import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { WalletAddComponent } from './wallet/walletAdd/wallet-add.component';
import { HomeComponent } from './home/home.component';
import { WalletRemoveComponent } from './wallet/walletRemove/wallet-remove.component';
import { WalletEditComponent } from './wallet/walletEdit/wallet-edit.component';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { CleaningShiftCalculatorComponent } from './cleaning-shift-calculator/cleaning-shift-calculator.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppheaderComponent } from './appheader/appheader.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CurrentWeatherComponent } from './weather/current-weather/current-weather.component';

import { StoreModule } from '@ngrx/store';
import { locationReducer } from './location-reducer';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeBoxesComponent } from './home-boxes/home-boxes.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    WalletAddComponent,
    HomeComponent,
    WalletRemoveComponent,
    WalletEditComponent,
    DialogComponent,
    SidenavComponent,
    CleaningShiftCalculatorComponent,
    AppheaderComponent,
    FooterComponent,
    SidebarComponent,
    CurrentWeatherComponent,
    NavbarComponent,
    HomeBoxesComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    DragDropModule,
    NgbModule,
    StoreModule.forRoot({
      loc: locationReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
