import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete'

import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';

import {MatDialogModule} from '@angular/material/dialog';

import { MatPaginatorModule } from "@angular/material/paginator";

import {MatSidenavModule} from "@angular/material/sidenav"

import {MatDividerModule} from "@angular/material/divider"

import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
