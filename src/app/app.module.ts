import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GameComponent } from './game/game.component';

import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { GridTableComponent } from './grid-table/grid-table/grid-table.component';
import { MyCellComponent } from './my-cell/my-cell.component';
import { DeleteBtnComponent } from './delete-btn/delete-btn.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { GameViewComponent } from './game-view/game-view.component';
import { CommentComponent } from './comment/comment.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderComponent } from './slider/slider.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GridTableComponent,
    MyCellComponent,
    DeleteBtnComponent,
    ModalComponent,
    ModalLoginComponent,
    GameViewComponent,
    CommentComponent,
    SliderComponent,
    ProfileComponent,
    UserComponent,
    ModalRegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'games', component: GameComponent},
      { path: 'table', component: GridTableComponent},
      { path: 'modal', component: ModalComponent},
      { path: 'game/:id', component: GameViewComponent},
      { path: 'profile/:idUser', component: ProfileComponent},
      { path: '', redirectTo: 'games', pathMatch: 'full' },
      { path: '**', redirectTo: 'games', pathMatch: 'full' }
    ]),
    HttpClientModule,
    CommonModule,
    FormsModule,
    AgGridModule,
    NgbModule,
    SlickCarouselModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
