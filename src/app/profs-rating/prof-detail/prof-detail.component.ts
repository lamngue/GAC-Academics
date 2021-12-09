import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/professor';

import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-prof-detail',
  templateUrl: './prof-detail.component.html',
  styleUrls: ['./prof-detail.component.css'],
})
export class ProfDetailComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  disableLike = false;
  disableDislike = false;
  LIKE_RATING = true;
  DISLIKE_RATING = false;
  professor: Professor;
  studentId: string;

  constructor(
    private route: ActivatedRoute,
    private professorService: ProfessorService,
    private homeService: HomeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProfessor();
    this.homeService.getUserInfo().subscribe((data) => {
      this.studentId = data['name']['sub'];
    });
  }

  getProfessor(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.professorService
      .getProfessor(id)
      .subscribe((prof) => (this.professor = prof));
  }

  getProfOverallRating(ratings: Object[]) {
    let overallRating = 0;
    ratings.forEach((rating) => (overallRating += parseInt(rating['rating'])));
    return Math.round((overallRating / ratings.length) * 100) / 100;
  }
  public isRatingLiked = (r): boolean =>
    r['likedBy'].some((id: string) => id === this.studentId);

  public isRatingDisliked = (r): boolean =>
    r['dislikedBy'].some((id: string) => id === this.studentId);

  updateRating(ratingId: string, isLike: boolean) {
    this.professorService
      .editProfessorRating(
        this.professor.id,
        ratingId,
        this.studentId,
        isLike
      )
      .subscribe(() => {
        this.getProfessor();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
