export const signinSchema = [
  { name: "email", placeholder: "Enter email", type: "email" },
  { name: "password", placeholder: "Enter password", type: "password" },
];
export const signupSchema = [
  { name: "username", placeholder: "Enter username", type: "text" },
  { name: "email", placeholder: "Enter email", type: "email" },
  { name: "password", placeholder: "Enter password", type: "password" },
];
export const adminCourseColumns = [
  "Id",
  "Name",
  "Teacher Assigned",
  "Total Students",
  "Classes",
];
export const adminHeaders = [
  { key: "serialNo", label: "Id", type: "index" },
  { key: "name", label: "Name", type: "string" },
  { key: "teacherName", label: "Teacher Assigned", type: "string" },
  { key: "totalStudents", label: "Total Students", type: "number" },
  { key: "classes", label: "Classes", type: "number" },
  // { key: "averageStudents", label: "Attendance Percentage", type: "number" },
  { key: ["edit", "view"], label: "Actions", type: "array" },
];
export const adminRequest = [
  { key: "serialNo", label: "Id" },
  { key: "name", label: "Course" },
  { key: "date", label: "Date" },
  { key: "reason", label: "Reason" },
  { key: "status", label: "Status" },
  { key: ["approve", "disapprove"], label: "Actions" },
];
export const adminCourseManage = [
  { key: "serialNo", label: "Id" },
  { key: "username", label: "Name" },
  { key: "status", label: "Status" },
  { key: ["unregister"], label: "Actions" },
];
export const studentRequestheader = [
  { key: "serialNo", label: "Id" },
  { key: "name", label: "Course" },
  { key: "date", label: "Date" },
  { key: "reason", label: "Reason" },
  { key: "status", label: "Status" },
  { key: ["delete", "edit"], label: "Actions" },
];
export const courseUpdateHeaders = [
  { name: "name", placeholder: "Enter username", type: "text" },
  { name: "teacherName", placeholder: "Select Teacher", type: "dropdown" },
];
export const teacherColumn = [
  { key: "serialNo", label: "Id", type: "index" },
  { key: "name", label: "Name", type: "string" },
  { key: "totalStudents", label: "Total Students", type: "number" },
  { key: "classes", label: "Classes", type: "number" },
  { key: ["view"], label: "Actions", type: "array" },
];
export const courseColumn = [
  { key: "serialNo", label: "Id", type: "index" },
  { key: "topic", label: "Topic", type: "string" },
  { key: "date", label: "Date", type: "number" },
  { key: "presentStudents", label: "Present Students", type: "number" },
  { key: ["view"], label: "Actions", type: "array" },
];
export const studentColumn = ["Id", "Topic", "Present Students", "Classes"];
export const adminSidebar = [
  { label: "Home", path: "/admindashboard" },
  { label: "Courses", path: "/admindashboard/managecourses" },
  { label: "Students", path: "/admindashboard/managestudent" },
  { label: "Requests", path: "/admindashboard/leaverequests" },
];
export const teacherSidebar = [
  { label: "Home", path: "/teacherDashboard" },
  // { label: "Courses", path: "/teacherDashboard" },
  { label: "Requests", path: "/teacherDashboard/leaverequests" },
  { label: "Quiz", path: "/teacherDashboard/Quizes" },
  { label: "Exam", path: "/teacherDashboard/manageexam" },
];
export const studentSidebar = [
  { label: "Courses", path: "/studentDashboard" },
  // { label: "Add Request", path: "/studentDashboard/leaverequest" },
  { label: "Exam", path: "/studentDashboard/viewExam" },
  { label: "Quiz", path: "/studentDashboard/viewQuiz" },
  { label: "Requests Status", path: "/studentDashboard/viewrequests" },
];
export const teacherQuiz = [
  { key: "serialNo", label: "Id", type: "index" },
  { key: "topic", label: "Topic", type: "string" },
  { key: "dateSelected", label: "Date", type: "number" },
  { key: ["res"], label: "Marks", type: "array" },
];
export const AdminStudents = [
  { key: "serialNo", label: "Id", type: "index" },
  { key: "username", label: "Topic", type: "string" },
  { key: "email", label: "Email", type: "string" },
  { key: ["edit"], label: "Actions", type: "array" },
];
export const TeacherExam = [
  { key: "serialNo", label: "Id", type: "index" },
  { key: "courseName", label: "Course Name", type: "string" },
  { key: "date1", label: "Date-1", type: "date" },
  { key: "date2", label: "Date-2", type: "date" },
  { key: "date3", label: "Date-3", type: "date" },
  { key: ["edit"], label: "Actions", type: "array" },
];
export const requestsDropdown = [
  { label: "Select Filter" },
  { label: "Handled" },
  { label: "Not Handled" },
];
export const requestsstatus = [
  "Teacher Approved",
  "Teacher Disapproved",
  "Admin Approved",
  "Admin Disapproved",
];
export const studentExamHeaders = [
  // { key: "serialNo", label: "Id", type: "index" },
  { key: "courseName", label: "Course Name", type: "string" },
  { key: "dateBooked", label: "Date", type: "date" },
];
