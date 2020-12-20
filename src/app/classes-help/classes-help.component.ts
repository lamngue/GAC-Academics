import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/question';
import { QuestionsService } from 'src/app/services/questions.service';
@Component({
  selector: 'app-classes-help',
  templateUrl: './classes-help.component.html',
  styleUrls: ['./classes-help.component.css']
})
export class ClassesHelpComponent implements OnInit {

  questions: Question[];

  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
    });
  }

}
