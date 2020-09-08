import { Component, OnInit, OnChanges } from '@angular/core';
import { ProfessorService } from '../services/professor.service';
@Component({
  selector: 'app-profs-rating',
  templateUrl: './profs-rating.component.html',
  styleUrls: ['./profs-rating.component.css'],
})
export class ProfsRatingComponent implements OnInit {
  opened: boolean;
  profName = '';
  constructor(private _professorService: ProfessorService) {}
  professors = [];
  departments = [];
  dept: string;

  ngOnInit(): void {
    this._professorService.getProfessors().subscribe((data) => {
      this.professors = data;
      this.professors.forEach((prof) => {
        if (this.departments.indexOf(prof['department']) === -1) {
          this.departments.push(prof['department']);
        }
      });
      this.departments.push('All departments');
    });
  }

  processedProf(dept: string) {
    if (this.profName == '') {
      if (dept === "All departments" || !dept) {
        return this.professors;
      }
      return this.professors.filter(prof => prof['department'] === dept);
    } else {
      if (dept !== "All departments" && dept) {
        return this.professors.filter(prof => prof['department'] === dept).filter(prof => prof['fullName'].toLowerCase().includes(this.profName));
      }
      return this.professors.filter(prof => prof['fullName'].toLowerCase().includes(this.profName));
    } 
  }

  filterProfByDept(dept: string) {
    this.dept = dept;
  };

  getProfOverallRating(ratings: Object[]) {
    let overallRating = 0;
    ratings.forEach(rating => overallRating += parseInt(rating['rating']));
    return Math.round((overallRating/ratings.length)*100)/100;
  }
}
