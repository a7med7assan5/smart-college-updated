import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Semester } from '../_models/semester';


@Injectable({ providedIn: 'root' })
export class SemesterserviceService {
  private currentCourseSemesterSubject: BehaviorSubject<Semester>;
  public currentCourseSemester: Observable<Semester>;

  courseId: any;
  constructor(private http: HttpClient) {
    this.currentCourseSemesterSubject = new BehaviorSubject<Semester>(JSON.parse(localStorage.getItem('currentCourseSemester')));
    this.currentCourseSemester = this.currentCourseSemesterSubject.asObservable();
  }
  url: any = "http://192.168.1.18:3000";

  public get currentCourseSemesterValue(): Semester {
    return this.currentCourseSemesterSubject.value;
  }

  getCourseSemesterData(courseCode: string, semester_time: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    this.courseId = courseCode;
    return this.http.get<any>(`${this.url}/course/semester/${courseCode}/${semester_time}`, { headers: headers })
      .pipe(map(coursesemester => {
        // login successful if there's a jwt token in the response
        if (coursesemester) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentCourseSemester', JSON.stringify(coursesemester.findsemesterdata));
          this.currentCourseSemesterSubject.next(coursesemester.findsemesterdata);
        }

        return coursesemester.findsemesterdata;
      }));
  }

  closeSemester() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentCourseSemester');
    this.currentCourseSemesterSubject.next(null);
  }
}
