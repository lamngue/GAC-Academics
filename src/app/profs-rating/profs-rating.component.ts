import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Professor } from '../professor';
import { ProfessorService } from '../services/professor.service';
@Component({
  selector: 'app-profs-rating',
  templateUrl: './profs-rating.component.html',
  styleUrls: ['./profs-rating.component.css'],
})
export class ProfsRatingComponent implements OnInit {
  opened: boolean;
  profName = '';
  professors = [];
  currentItemsToShow = [];
  defaultRecords: any = 5;
  departments = [];
  dept: string;
  constructor(private _professorService: ProfessorService) {}

  ngOnInit(): void {
    this._professorService.getProfessors().subscribe((data) => {
      this.professors = data;
      this.professors.forEach((prof) => {
        if (this.departments.indexOf(prof['department']) === -1) {
          this.departments.push(prof['department']);
        }
      });
      this.departments.push('All departments');
      this.currentItemsToShow = this.professors.slice(0, this.defaultRecords);
    });
  }

   processedProf(dept: string) {
    if (this.profName == '') {
      if (dept === "All departments" || !dept) {
        return this.currentItemsToShow;
      }
      return this.currentItemsToShow.filter(prof => prof['department'] === dept);
    } else {
      if (dept !== "All departments" && dept) {
        return this.currentItemsToShow.filter(prof => prof['department'] === dept).filter(prof => prof['fullName'].toLowerCase().includes(this.profName));
      }
      return this.currentItemsToShow.filter(prof => prof['fullName'].toLowerCase().includes(this.profName));
    } 
  }

  filterProfByDept(dept: string) {
    this.dept = dept;
  };

  getProfessorsLength(professors) {
    if (!this.dept || this.dept === "All departments") {
      return this.professors.length;
    }
    return professors.filter(prof => prof['department'] === this.dept).length;
  }

  getProfOverallRating(ratings: Object[]) {
    if (!ratings || ratings.length === 0) {
      return "The ratings for this professor is not available";
    }
    let overallRating = 0;
    ratings.forEach(rating => overallRating += parseInt(rating['rating']));
    return Math.round((overallRating/ratings.length)*100)/100;
  }

  onPageChange($event) {
    this.currentItemsToShow = this.professors.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
  }

}
