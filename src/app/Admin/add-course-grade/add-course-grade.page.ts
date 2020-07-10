import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course-grade',
  templateUrl: 'add-course-grade.page.html',
  styleUrls: ['add-course-grade.page.scss']
})
export class addCourseGradePage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  gradetype: any;
  grade: any;
  type: any;
  types: Array<string>;
  gradestype: any;
  selectedLanguage: string;
  validations_form: FormGroup;
  courseCode: string;
  customPopoverOptions: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute, private formBuilder: FormBuilder,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private alertservice: AlertService,
    private translateConfigService: TranslateConfigService
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  sub: any;
  semester_time: string;
  onSelectChange(event: any) {
    //update the ui
    this.type = event.target.value;
  }

  addCourseGrade() {
    let grade = document.getElementById("gradeinput") as HTMLInputElement;

    if (this.type == undefined) {
      this.alertservice.showAlert("&#xE5CD;", "error", 'Please Select Grade Type');
    }
    else {
      this.sub = this._Activatedroute.paramMap.subscribe(params => {
        this.courseCode = params.get('courseCode');
        this.semester_time = params.get('semester_time');
        this.gradetype = this.type
        this.grade = grade.value;
        this.adminservices.addCourseSemesterGrade(this.courseCode, this.semester_time, this.gradetype, this.grade).subscribe(res => {
          this.alertservice.showAlert("&#xE876;", "success", res.msg);
          this.type = null;
          grade.value = "";
          this.validations_form.reset();
          this.navigateToCourseInfo();
        }, err => {
          this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
        }
        );
      });
    }

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  navigateToCourseInfo() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this._router.navigate(['/course/semester/info/' + this.courseCode, this.semester_time]);
    });
  }
  ngOnInit(): void {
    this.types = [
      "Assignment",
      "Quiz 1",
      "Quiz 2",
      "Quiz 3",
      "Midterm",
      "Practice",
      "Final"
    ];
    this.validations_form = this.formBuilder.group({
      gradetype: new FormControl(this.types[0], Validators.required),
      grade: new FormControl('', Validators.compose([
        Validators.max(100),
        Validators.min(0),
        Validators.required
      ])),
    });

  }

  validation_messages = {
    'grade': [
      { type: 'required', message: 'Grade is required.' },
      { type: 'min', message: 'Grade must be at least 0 Marks.' },
      { type: 'max', message: 'Grade cannot be more than 100 Marks.' },
    ]
  };


}
