import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ProfessorService } from '../services/professor.service';
@Component({
  selector: 'app-profs-rating',
  templateUrl: './profs-rating.component.html',
  styleUrls: ['./profs-rating.component.css'],
})
export class ProfsRatingComponent implements OnInit {
  opened: boolean;
  showPic = true;
  profName = '';
  professors = [];
  currentItemsToShow = [];
  defaultRecords: any = 20;
  departments = [];
  dept: string;
  navigate = false;
  @ViewChild("myIdentifier") myIdentifier: ElementRef;
  width: number;
  constructor(private _professorService: ProfessorService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._professorService.getProfessors().subscribe((data) => {
    this.professors = data;
    this.professors.sort((prof1, prof2) => prof1['fullName'] > prof2['fullName'] ? 1 : -1);
    this.professors.forEach((prof) => {
      if (this.departments.indexOf(prof['department']) === -1) {
        this.departments.push(prof['department']);
      }
    });
      this.departments.push('All departments');
      this.currentItemsToShow = this.professors.slice(0, this.defaultRecords);
    });
  }


  toggleSideNav() {
    this.opened = !this.opened;
    this.showPic = !this.showPic;
  }

  processedProf(dept: string) {
    if (this.profName == '') {
      if (dept === "All departments" || !dept) {
        if (this.navigate) {
          this.currentItemsToShow = this.professors.slice(0, this.defaultRecords);
          this.navigate = false;
        }
        return this.currentItemsToShow;
      } else if (dept && dept !== "All departments") {
        return this.professors.filter(prof => prof['department'] === dept);
      }
    } else {
      if (dept !== "All departments" && dept) {
        return this.professors.filter(prof => prof['department'] === dept).filter(prof => prof['fullName'].toLowerCase().includes(this.profName.toLowerCase()));
      } else if (this.navigate) {
        this.currentItemsToShow = this.professors.slice(0, this.defaultRecords);
        this.navigate = false;
      }
      return this.professors.filter(prof => prof['fullName'].toLowerCase().includes(this.profName.toLowerCase()));
    } 
  }

  filterProfByDept(dept: string) {
    this.navigate = true;
    this.dept = dept;
  };

  getProfOverallRating(ratings: Object[]) {
    if (!ratings || ratings.length === 0) {
      return "The ratings for this professor is not available";
    }
    let overallRating = 0;
    ratings.forEach(rating => overallRating += parseInt(rating['rating']));
    return Math.round((overallRating/ratings.length)*100)/100;
  }

  getProfessorsLength() {
    if ((!this.dept || this.dept === "All departments") && this.profName === "") {
      return this.professors.length;
    }
    return this.processedProf(this.dept).length;
  }

  onPageChange($event) {
 
      this.currentItemsToShow = this.professors.slice($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
    
  }
}
