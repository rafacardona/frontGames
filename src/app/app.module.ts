import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { GridTableComponent } from './grid-table/grid-table/grid-table.component';
import { MyCellComponent } from './my-cell/my-cell.component';
import { DeleteBtnComponent } from './delete-btn/delete-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    WelcomeComponent,
    GridTableComponent,
    MyCellComponent,
    DeleteBtnComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'character', component: CharacterComponent},
      { path: 'table', component: GridTableComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    HttpClientModule,
    CommonModule,
    FormsModule,
    AgGridModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
