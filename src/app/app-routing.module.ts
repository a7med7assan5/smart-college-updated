import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards';
import { Role } from './_models';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.loginPageModule),
  },
  // Tabs
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.homePageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  // },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(m => m.messagesPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.notificationsPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.profilePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'settings/change-email',
    loadChildren: () => import('./change-email/change-email.module').then(m => m.changeEmailPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  },
  {
    path: 'settings/change-password',
    loadChildren: () => import('./change-password/change-password.module').then(m => m.changePasswordPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  },
  {
    path: 'settings/qr-scanner',
    loadChildren: () => import('./qr-scanner/qr-scanner.module').then(m => m.QRScannerPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  },
  {
    path: 'settings/scan-wifi',
    loadChildren: () => import('./scan-wifi/scan-wifi.module').then(m => m.scanWifiPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  },
  // Admin

  {
    path: 'courses',
    loadChildren: () => import('./Admin/courses/courses.module').then(m => m.coursesPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'courses/add-course',
    loadChildren: () => import('./Admin/add-course/add-course.module').then(m => m.addCoursePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'courses/manage-course',
    loadChildren: () => import('./Admin/manage-course/manage-course.module').then(m => m.manageCoursePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'course/semesters/:courseCode',
    loadChildren: () => import('./Admin/course-semesters/course-semesters.module').then(m => m.courseSemestersPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'course/add-semester/:courseCode',
    loadChildren: () => import('./Admin/add-course-semester/add-course-semester.module').then(m => m.addCourseSemesterPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'course/semester/info/:courseCode/:semester_time',
    loadChildren: () => import('./Admin/course-info/course-info.module').then(m => m.courseInfoPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher, Role.Student] }
  },
  {
    path: 'course/semester/students-sheet/:courseCode/:semester_time',
    loadChildren: () => import('./Admin/student-sheet/student-sheet.module').then(m => m.studentSheetPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher] }
  },
  {
    path: 'course/semester/add-course-grade/:courseCode/:semester_time',
    loadChildren: () => import('./Admin/add-course-grade/add-course-grade.module').then(m => m.addCourseGradePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher] }
  },
  {
    path: 'course/semester/delete-course-grade/:courseCode/:semester_time',
    loadChildren: () => import('./Admin/delete-course-grade/delete-course-grade.module').then(m => m.deleteCourseGradePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher] }
  },
  {
    path: 'course/semester/students-grades/:courseCode/:semester_time',
    loadChildren: () => import('./Admin/students-grade/students-grade.module').then(m => m.studentsGradePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher] }
  },
  {
    path: 'course/semester/add-student-grade/:courseCode/:semester_time',
    loadChildren: () => import('./Admin/add-student-grade/add-student-grade.module').then(m => m.addStudentGradePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher] }
  },
  {
    path: 'course/semester/update-student-grade/:courseCode/:semester_time',
    loadChildren: () => import('./Admin/update-student-grade/update-student-grade.module').then(m => m.updateStudentGradePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Teacher] }
  },
  {
    path: 'users',
    loadChildren: () => import('./Admin/users/users.module').then(m => m.usersPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/courses/:id',
    loadChildren: () => import('./Admin/user-courses/user-courses.module').then(m => m.userCoursesPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/course/info/:id/:courseCode/:semester_time',
    loadChildren: () => import('./Admin/user-course-info/user-course-info.module').then(m => m.userCourseInfoPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/add-user',
    loadChildren: () => import('./Admin/add-user/add-user.module').then(m => m.addUserPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/manage-user',
    loadChildren: () => import('./Admin/manage-user/manage-user.module').then(m => m.manageUserPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/add-delete-course/:id',
    loadChildren: () => import('./Admin/add-user-course/add-user-course.module').then(m => m.addUserCoursePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user/profile/:id',
    loadChildren: () => import('./Admin/user-profile/user-profile.module').then(m => m.userProfilePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },

  // Student
  {
    path: 'mycourses',
    loadChildren: () => import('./Student/courses/courses.module').then(m => m.coursesPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher, Role.Student] }
  },

  {
    path: 'course/semester/attendance-sheet/:courseCode/:semester_time',
    loadChildren: () => import('./Student/attendance-record/attendance-record.module').then(m => m.attendanceRecordPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Student] }
  },
  {
    path: 'attend-me/:courseCode/:semester_time',
    loadChildren: () => import('./Student/attend-me/attend-me.module').then(m => m.attendMePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Student] }
  },
  {
    path: 'courses-registeration',
    loadChildren: () => import('./Student/courses-registeration/courses-registeration.module').then(m => m.coursesRegisterationPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Student, Role.Teacher] }
  },
  {
    path: 'course/semester/mygrades/:courseCode/:semester_time',
    loadChildren: () => import('./Student/grades/grades.module').then(m => m.gradesPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Student] }
  },
  // {
  //   path: 'course/semester/attendance-sheet',
  //   loadChildren: () => import('./Student/grades/grades.module').then(m => m.gradesPageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Student] }
  // },

  // Teacher
  // {
  //   path: 'course/semester/attendance',
  //   loadChildren: () => import('./Teacher/attendance-teacher/attendance-teacher.module').then(m => m.teacherAttendancePageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Teacher, Role.Student] }
  // },
  {
    path: 'course/semester/add-lecture/:courseCode/:semester_time',
    loadChildren: () => import('./Teacher/add-lecture/add-lecture.module').then(m => m.addLecturePageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher] }
  },
  // {
  //   path: 'course/semester/information',
  //   loadChildren: () => import('./Teacher/courses-info/courses-info.module').then(m => m.coursesInfoPageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Teacher, Role.Student] }
  // },
  // {
  //   path: 'course/semester/add-course-grade',
  //   loadChildren: () => import('./Teacher/add-course-grade/add-course-grade.module').then(m => m.teacherAddCourseGradePageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Teacher] }
  // },
  // {
  //   path: 'course/semester/delete-course-grade',
  //   loadChildren: () => import('./Teacher/delete-course-grade/delete-course-grade.module').then(m => m.teacherDeleteCourseGradePageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Teacher] }
  // },
  // {
  //   path: 'course/semester/students-sheet',
  //   loadChildren: () => import('./Teacher/student-sheet/student-sheet.module').then(m => m.teacherStudentSheetPageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Teacher] }
  // },
  // {
  //   path: 'course/semester/students/grades',
  //   loadChildren: () => import('./Teacher/grades-teacher/grades-teacher.module').then(m => m.teacherGradesPageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Teacher] }
  // },
  // {
  //   path: 'course/semester/add-grade',
  //   loadChildren: () => import('./Teacher/add-course-student-grade/add-course-student-grade.module').then(m => m.addCourseStudentGradePageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Teacher] }
  // },
  // {
  //   path: 'course/semester/update-grade',
  //   loadChildren: () => import('./Teacher/update-student-grade/update-student-grade.module').then(m => m.teacherUpdateStudentGradePageModule),
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Teacher] }
  // },
  {
    path: 'course/semester/assignments/:courseCode/:semester_time',
    loadChildren: () => import('./Teacher/assignments/assignments.module').then(m => m.assignmentsPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher, Role.Student] }
  },
  {
    path: 'course/semester/add-task/:courseCode/:semester_time',
    loadChildren: () => import('./Teacher/add-task/add-task.module').then(m => m.addTaskPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher] }
  },
  {
    path: 'course/semester/delete-task/:courseCode/:semester_time',
    loadChildren: () => import('./Teacher/delete-task/delete-task.module').then(m => m.deleteTaskPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher] }
  },
  {
    path: 'course/semester/students-attendance-sheet/:courseCode/:semester_time',
    loadChildren: () => import('./Teacher/attendance-sheet-student/attendance-sheet-student.module').then(m => m.teacherAttendanceSheetStudentPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher] }
  },
  {
    path: 'course/semester/students-attendance-report/:courseCode/:semester_time',
    loadChildren: () => import('./Teacher/attendance-report/attendance-report.module').then(m => m.attendanceReportPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher] }
  },
  {
    path: 'course/semester/students-grades-report/:courseCode/:semester_time',
    loadChildren: () => import('./Teacher/grades-report/grades-report.module').then(m => m.gradesReportPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Teacher, Role.Admin] }
  },
  {
    path: 'routers',
    loadChildren: () => import('./Admin/routers/routers.module').then(m => m.RoutersPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'routers/add-router',
    loadChildren: () => import('./Admin/add-router/add-router.module').then(m => m.AddRouterPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'routers/manage-router',
    loadChildren: () => import('./Admin/manage-router/manage-router.module').then(m => m.ManageRouterPageModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
