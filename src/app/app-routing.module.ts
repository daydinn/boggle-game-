import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';  
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', component: AppComponent },  // Default route for AppComponent
  { path: 'game', component: GameComponent }  // Route for GameComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
