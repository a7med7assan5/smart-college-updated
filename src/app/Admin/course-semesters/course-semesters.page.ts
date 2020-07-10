import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-course-semesters',
  templateUrl: 'course-semesters.page.html',
  styleUrls: ['course-semesters.page.scss']
})
export class courseSemestersPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  courseCode: any;
  coursedata: any;
  numberofusers: any;
  coursesemesters: any;
  courseStatusCahnge: any;
  passOrFail: any;
  selectedLanguage: string;
  statusbtn = document.getElementById("courses-semesters-info-statusBtn") as HTMLInputElement;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    public alertController: AlertController,
    private translateConfigService: TranslateConfigService,

  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  changeto: string;
  sub: any;
  colorr: any;
  getcoursedata() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.adminservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursedata = res.course;
        this.colorr = res.color;
        this.coursesemesters = res.course.semesters;
      }, err => {
        this.coursedata = err;
      }
      );
    });

  }
  changecoursestatusService() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.adminservices.changeCourseStatus(this.courseCode, this.changeto).subscribe(res => {
        this.courseStatusCahnge = res;
        this.getcoursedata();
      }, err => {
        this.courseStatusCahnge = err
      }
      );
    });
  }
  decidePassOrFailService() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.adminservices.decideStudentsPassOrFail(this.courseCode).subscribe(res => {
        this.passOrFail = res;
        if (res) {
          this.changecoursestatusService();
        }
      }, err => {
        this.passOrFail = err
      }
      );
    });
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.getcoursedata();
  }

  changecoursestatus(status) {
    if (status == "active") {
      this.changeto = "disable"
      this.decidePassOrFailService();
    }
    else if (status == "disable") {
      this.changeto = "active"
      this.changecoursestatusService();
    }
  }

  openSemester(courseCode, semester_time) {
    this._router.navigate(['/course/semester/info/' + courseCode, semester_time])
  }

  activeFinishedAlert() {
    if (this.statusbtn.value == "active") {
      this.activeAlertConfirm();
    } else if (this.statusbtn.value == "finished") {
      this.finishedAlert();
    }
  }

  async activeAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are You Sure that you want to End this course?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.changecoursestatus(this.coursedata.status);
          }
        }
      ]
    });

    await alert.present();
  }

  async finishedAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'This semester are already finished!!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
