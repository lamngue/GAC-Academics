import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Observable } from 'rxjs';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Student } from '../student';
import { StudentService } from '../services/student.service';
import { ChatboxComponent } from 'src/app/chatbox/chatbox.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  name: string;
  faGraduationCap = faGraduationCap;
  studentId = null;
  constructor(
    private homeService: HomeService,
    private studentService: StudentService,
    public route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.getUserInfo().subscribe((data) => {
      this.name = data['name']['name'];
      this.studentId = data['name']['sub'];
      this.postStudent();
    });
  }

  postStudent(): void {
    const student = new Student();
    student['id'] = this.studentId;
    student['name'] = this.name;
    this.studentService.postStudent(student).subscribe(() => {
      console.log('posted student!');
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ChatboxComponent);
  }

  getUserInfo(): Observable<any> {
    return this.homeService.getUserInfo();
  }

  getTime(): String {
    const curHour = moment().hour();
    let message = '';
    switch (true) {
      case curHour >= 0 && curHour < 12:
        message = 'Morning';
        break;
      case curHour >= 12 && curHour < 18:
        message = 'Afternoon';
        break;
      default:
        message = 'Evening';
        break;
    }
    return message;
  }

  logout() {
    this.homeService.logout();
  }
}
