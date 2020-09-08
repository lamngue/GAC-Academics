import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  @Input() depts: string[];
  @Output() filterByDeptEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    
  }
  filterProfByDept(dept: string) {
    this.filterByDeptEvent.emit(dept);
  }
}
