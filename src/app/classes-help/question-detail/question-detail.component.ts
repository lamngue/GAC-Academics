import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewCommentComponent } from '../new-comment/new-comment.component';
import moment from 'moment';
import { HomeService } from 'src/app/services/home.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  question: Question;
  id: string;
  studentName: string;
  constructor(private route: ActivatedRoute, 
    private questionsService: QuestionsService,
    private location: Location,
    private homeService: HomeService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getQuestion();
    this.getUserInfo().subscribe((data) => {
      this.studentName = data['name']['name'];
    });
  }

  getQuestion(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.questionsService.getQuestion(id)
      .subscribe(question => this.question = question);
  }

  getUserInfo(): Observable<any> {
    return this.homeService.getUserInfo();
  }
  
  goBack(): void {
    this.location.back();
  }

  openCommentDialog() {
    const dialogRef = this.dialog.open(NewCommentComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      let comment = new Comment();
      const date = moment();
      const dateString = ((date.month() > 8) ? (date.month() + 1) : ('0' + (date.month() + 1))) + '/' + ((date.date() > 9) ? date.date() : ('0' + date.date())) + '/' + date.year();
      comment['by'] = this.question['by'];
      comment['content'] = result;
      comment['dateAdded'] = dateString;
      this.questionsService.postComment(this.id, comment).subscribe(() => {
        this.getQuestion();
      });
    });
  }

  deleteComment(questionid: string, commentid: string) {
    this.questionsService.deleteComment(questionid, commentid).subscribe(() => {
      this.getQuestion();
    });
  }

}
