import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "../app.component";
import { CharacterComponent } from "./character.component";
import { CharacterService } from "./character.service";

@NgModule({
    declarations: [
      // Componentes declarados aquí
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([
        { path: 'character', component: CharacterComponent },
      ]),
      HttpClientModule
      // Otros módulos importados aquí
    ],
    providers: [
      CharacterService,
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }