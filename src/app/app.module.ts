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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentsComponent } from './profs-rating/departments/departments.component';
import { ProfessorService } from 'src/app/services/professor.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProfDetailComponent } from './profs-rating/prof-detail/prof-detail.component';
import { AddNewRatingComponent } from './profs-rating/add-new-rating/add-new-rating.component';
import { LoadingInterceptor } from 'src/app/loading-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { LoadingDialogContentComponent } from './loading-dialog-content/loading-dialog-content.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { ErrorComponent } from './error/error.component';
import { RatingModule } from 'ng-starrating';
import { SemesterPlanningComponent } from './semester-planning/semester-planning.component';
import { ClassesPlanningComponent } from './semester-planning/classes-planning/classes-planning.component';
import { NewClassesDialogComponent } from './semester-planning/new-classes-dialog/new-classes-dialog.component';
import { ClassesHelpComponent } from './classes-help/classes-help.component';
import { QuestionFormComponent } from './classes-help/question-form/question-form.component';
import { QuestionDetailComponent } from './classes-help/question-detail/question-detail.component';
import { NewCommentComponent } from './classes-help/new-comment/new-comment.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
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
    ErrorComponent,
    SemesterPlanningComponent,
    ClassesPlanningComponent,
    NewClassesDialogComponent,
    ClassesHelpComponent,
    QuestionFormComponent,
    QuestionDetailComponent,
    NewCommentComponent,
    ChatboxComponent,
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
    MatGridListModule,
    FontAwesomeModule,
    RatingModule,
    MatBottomSheetModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
