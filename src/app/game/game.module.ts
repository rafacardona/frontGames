import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "../app.component";
import { GameComponent } from "./game.component";
import { GameService } from "./game.service";

@NgModule({
    declarations: [
      // Componentes declarados aquí
    ],
    imports: [
      CommonModule,
      RouterModule.forChild([
        { path: 'character', component: GameComponent },
      ]),
      HttpClientModule,
      // Otros módulos importados aquí
    ],
    providers: [
      GameService,
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }