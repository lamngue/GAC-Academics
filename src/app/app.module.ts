import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfsRatingComponent } from './profs-rating/profs-rating.component';
import { ClassesPerformanceComponent } from './classes-performance/classes-performance.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentsComponent } from './profs-rating/departments/departments.component';
import { ProfessorService } from 'src/app/services/professor.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProfDetailComponent } from './profs-rating/prof-detail/prof-detail.component';
import { AddNewRatingComponent } from './profs-rating/add-new-rating/add-new-rating.component';
import { LoadingInterceptor } from 'src/app/loading-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingDialogContentComponent } from './loading-dialog-content/loading-dialog-content.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfsRatingComponent,
    ClassesPerformanceComponent,
    DepartmentsComponent,
    ProfDetailComponent,
    AddNewRatingComponent,
    LoadingDialogContentComponent,
    LoginComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
  ],
  providers: [
    ProfessorService,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
