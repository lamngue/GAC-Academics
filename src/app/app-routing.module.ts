import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfsRatingComponent } from './profs-rating/profs-rating.component';
import { ClassesPerformanceComponent } from './classes-performance/classes-performance.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfDetailComponent } from './profs-rating/prof-detail/prof-detail.component';
import { AddNewRatingComponent } from './profs-rating/add-new-rating/add-new-rating.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'profs-rating', component: ProfsRatingComponent },
  { path: 'classes-performance', component: ClassesPerformanceComponent },
  { path: 'prof-detail/:id', component: ProfDetailComponent },
  { path: 'prof-detail/new-rating/:id', component: AddNewRatingComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
