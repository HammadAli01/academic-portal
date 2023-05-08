import logo from "./logo.svg";
import "./App.css";
import { Signin } from "./pages/Signin";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { TeacherDashboard } from "./pages/Teacher/TeacherDashboard";
import { Admindashboard } from "./pages/Admin/Admindashboard";
import { Addstudent } from "./pages/Admin/Addstudent";
import { Managestudent } from "./pages/Admin/Managestudent";
import { Managecourses } from "./pages/Admin/Managecourses";
import { Viewcourse } from "./pages/Teacher/Viewcourse";
import { Class } from "./pages/Teacher/Class";
import { Addattendance } from "./pages/Teacher/Addattendance";
import { Studentdashboard } from "./pages/Student/Studentdashboard";
import { Studentclasses } from "./pages/Student/Studentclasses";
import { LeaveRequest } from "./pages/Student/LeaveRequest";
import { Viewrequests } from "./pages/Student/Viewrequests";
import { Requests } from "./pages/Admin/Requests";
import { Studentrequests } from "./pages/Teacher/Studentrequests";
import { Takequiz } from "./pages/Teacher/Takequiz";
import { Quiz } from "./pages/Teacher/Quiz";
import { Viewquiz } from "./pages/Teacher/Viewquiz";
import { Viewstudents } from "./pages/Admin/Viewstudents";
import { Layout } from "./components/Layout";
import { Teacherlayout } from "./components/Teacherlayout";
import { Studentlayout } from "./components/Studentlayout";
import { Protected } from "./components/Protected";
import { ManageExam } from "./pages/Teacher/ManageExam";
import { CourseRegister } from "./pages/Admin/CourseRegister";
import { ViewExam } from "./pages/Student/ViewExam";
import { Studentviewquiz } from "./pages/Student/Studentviewquiz";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Protected />}>
          <Route
            path="/admindashboard"
            element={<Layout component={<Admindashboard />} />}
          />
          <Route
            path="admindashboard/managestudent/addstudent"
            element={<Layout component={<Addstudent />} />}
          />
          <Route
            path="admindashboard/managecourses"
            element={<Layout component={<Managecourses />} />}
          />
          {/* <Route
            path="admindashboard/Students"
            element={<Layout component={<Viewstudents />} />}
          /> */}
          <Route
            path="/admindashboard/managestudent"
            element={<Layout component={<Managestudent />} />}
          />
          <Route
            path="/admindashboard/managecourses/courseRegister/:courseId"
            element={<Layout component={<CourseRegister />} />}
          />
          <Route
            path="/admindashboard/leaverequests"
            element={<Layout component={<Requests />} />}
          />
          <Route
            path="/teacherDashboard/leaverequests"
            element={<Teacherlayout component={<Studentrequests />} />}
          />
          <Route
            path="/teacherDashboard"
            element={<Teacherlayout component={<TeacherDashboard />} />}
          />
          <Route
            path="/teacherDashboard/viewCourse/:courseId"
            element={<Teacherlayout component={<Viewcourse />} />}
          />
          <Route
            path="/teacherdashboard/manageexam"
            element={<Teacherlayout component={<ManageExam />} />}
          />
          <Route
            path="/teacherDashboard/viewCourse/:courseId/viewClass/:classId"
            element={<Teacherlayout component={<Class />} />}
          />
          <Route
            path="/teacherDashboard/viewCourse/:courseId/takeQuiz"
            element={<Teacherlayout component={<Takequiz />} />}
          />
          <Route
            path="/teacherDashboard/viewCourse/:courseId/addattendance"
            element={<Teacherlayout component={<Addattendance />} />}
          />
          <Route
            path="/teacherDashboard/quizes"
            element={<Teacherlayout component={<Quiz />} />}
          />
          <Route
            path="/teacherDashboard/quizes/viewQuiz/:quizId"
            element={<Teacherlayout component={<Viewquiz />} />}
          />
          <Route
            path="/teacherDashboard/viewCourse/:courseId"
            element={<Teacherlayout component={<Viewcourse />} />}
          />

          <Route
            path="/studentDashboard"
            element={<Studentlayout component={<Studentdashboard />} />}
          />
          <Route
            path="/studentDashboard/viewClasses/:courseId"
            element={<Studentlayout component={<Studentclasses />} />}
          />
          <Route
            path="/studentDashboard/leaveRequest"
            element={<Studentlayout component={<LeaveRequest />} />}
          />
          <Route
            path="/studentDashboard/viewQuiz"
            element={<Studentlayout component={<Studentviewquiz />} />}
          />
          <Route
            path="/studentDashboard/viewrequests"
            element={<Studentlayout component={<Viewrequests />} />}
          />
          <Route
            path="/studentDashboard/viewExam"
            element={<Studentlayout component={<ViewExam />} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
