import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfsRatingComponent } from './profs-rating/profs-rating.component';
import { ClassesPerformanceComponent } from './classes-performance/classes-performance.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfDetailComponent } from './profs-rating/prof-detail/prof-detail.component';
import { AddNewRatingComponent } from './profs-rating/add-new-rating/add-new-rating.component';
import { AuthGuard } from './auth.guard';
import { StudentGuard } from './semester-planning/student.guard';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { ErrorComponent } from './error/error.component';
import { SemesterPlanningComponent } from './semester-planning/semester-planning.component';
import { ClassesPlanningComponent } from './semester-planning/classes-planning/classes-planning.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'error', component: ErrorComponent },
  {
    path: 'home-page',
    component: HomePageComponent,
    children: [
      {
        path: 'profs-rating',
        component: ProfsRatingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'semester-planning',
        component: SemesterPlanningComponent,
        canActivate: [AuthGuard, StudentGuard],
      },
      {
        path: 'semester-planning/:id',
        component: ClassesPlanningComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'prof-detail/:id',
        component: ProfDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'prof-detail/new-rating/:id',
        component: AddNewRatingComponent,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
