import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { StudentService } from '../services/student.service';
import { Student } from '../student';
import { NewCommentComponent } from './new-comment/new-comment.component';
@Component({
  selector: 'app-classes-help',
  templateUrl: './classes-help.component.html',
  styleUrls: ['./classes-help.component.css'],
})
export class ClassesHelpComponent implements OnInit {
  questions: Question[];
  currentItemsToShow = [];
  defaultRecords = 5;
  student: Student;
  studentId: string;
  isLiked: boolean;

  constructor(
    private questionService: QuestionsService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getQuestions();
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['studentId'];
      this.getStudent(this.studentId);
    });
  }


  getQuestions(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
      this.currentItemsToShow = this.questions.slice(0, this.defaultRecords);
    });
  }

  getStudent(id: string): void {
    this.studentService.getStudent(id).subscribe((s) => {
      this.student = s;
    });
  }

  onPageChange($event) {
    this.currentItemsToShow = this.questions.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize
    );
  }

  deleteQuestion(id: string): void {
    const dialogRef = this.dialog.open(NewCommentComponent, {
      width: '400px',
      data: {
        content:
          "Are you sure you want to delete this question? This action can't be undone.",
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== 'cancel') {
        this.questionService.deleteQuestion(id).subscribe(() => {
          this.getQuestions();
        });
      }
    });
  }

  public isQuestionLiked = (q): boolean => q['likedBy'].some(s => s['id'] === this.studentId);

  toggleLikeQuestion(id: string) {
    this.questionService.getQuestion(id).subscribe((question) => {
      const isLiked = this.isQuestionLiked(question);
      if (question) {
        if (!isLiked) {
          this.questionService.likeQuestion(id, this.student).subscribe(() => this.getQuestions());
        } else {
          this.questionService
            .unlikeQuestion(id, this.student)
            .subscribe(() => this.getQuestions());
        }
      }
    });
  }
}
