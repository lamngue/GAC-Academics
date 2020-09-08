import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/professor';
@Component({
  selector: 'app-prof-detail',
  templateUrl: './prof-detail.component.html',
  styleUrls: ['./prof-detail.component.css']
})
export class ProfDetailComponent implements OnInit {

  professor: Professor;

  constructor(private route: ActivatedRoute,
    private professorService: ProfessorService,
    private location: Location) { }

  ngOnInit(): void {
    this.getProfessor();
  }

  getProfessor(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.professorService.getProfessor(id)
      .subscribe(prof => this.professor = prof);
  }

  getProfOverallRating(ratings: Object[]) {
    let overallRating = 0;
    ratings.forEach(rating => overallRating += parseInt(rating['rating']));
    return Math.round((overallRating / ratings.length) * 100)/100;
  }

  goBack(): void {
    this.location.back();
  }
}
