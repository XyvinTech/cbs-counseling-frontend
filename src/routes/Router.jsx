import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/Admin/DashboardPage";
import App from "../App";
import SessionSinglePage from "../pages/Admin/CasesAndSession/SessionSinglePage";
import AdminLayout from "../layout/AdminLayout";
import CasesSection from "../pages/Admin/CasesAndSession/CasesSection";
import { Counselor } from "../pages/Admin/UserManagement/Counselor/Counselor";
import CounselorSinglePage from "../pages/Admin/UserManagement/Counselor/CounselorSinglePage";
import StudentPage from "../pages/Admin/UserManagement/Student/StudentPage";
import StudentSinglePage from "../pages/Admin/UserManagement/Student/StudentSinglePage";
import SessionPage from "../pages/Admin/CasesAndSession/SessionPage";
import Notification from "../pages/Admin/Notification";
import Report from "../pages/Admin/Report";
import Settings from "../pages/Admin/Settings";
import Events from "../pages/Admin/Events/Events";
import EventsSinglepage from "../pages/Admin/Events/EventsSinglepage";
import StudentLayout from "../layout/StudentLayout";
import BookAppointment from "../pages/Student/BookAppointment";
import StudentSession from "../pages/Student/Session/StudentSession";
import StudentReport from "../pages/Student/Reports/StudentReport";
import StudentEvents from "../pages/Student/Events/StudentEvents";
import StudentSettings from "../pages/Student/StudentSettings";
import CounselorLayout from "../layout/CounselorLayout";
import UpcomingSession from "../pages/Counselor/UpcomingSession/UpcomingSession";
import CounselorSession from "../pages/Counselor/Session/CounselorSession";
import CounselorReport from "../pages/Counselor/Report/CounselorReport";
import CounselorEvent from "../pages/Counselor/Event/CounselorEvent";
import CounselorSettings from "../pages/Counselor/CounselorSettings";
import UpcomingSessionSinglePge from "../pages/Counselor/UpcomingSession/UpcomingSessionSinglePge";
import AddAvailability from "../pages/Counselor/AddAvailability/AddAvailability";
import LoginPage from "../pages/Login/Loginpage";
import RaiseIssuePage from "../pages/Login/RaiseIssue";
import RescheduleSession from "../pages/Student/Session/RescheduleSession";
import CaseSession from "../pages/Student/Session/CaseSession";
import SessionReport from "../pages/Student/Session/SessionReport";
import AddEntry from "../components/AddEntry";
import CasesSessionPage from "../pages/Counselor/Session/CasesSessionPage";
import SessionDetails from "../pages/Counselor/Session/SessionDetails";
import CounselorNotification from "../pages/Counselor/CounselorNotification";
import { PrivateRoute } from "./PrivateRouter";
import AddType from "../components/AddType";
import BigCalendar from "../ui/BigCalendar";
import AddRemarks from "../pages/Counselor/Session/AddRemarks";
import StudentRegForm from "../components/StudentRegForm";
import AddMeeting from "../components/BookAppointmentForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/form",
    element: <StudentRegForm />,
  },
  {
    path: "/book",
    element: <AddMeeting />,
  },
  {
    path: "/raiseissue",
    element: <RaiseIssuePage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <DashboardPage />
        </AdminLayout>{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/user/student",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <StudentPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/user/student/:id",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <StudentSinglePage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/user/counselor",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Counselor />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/user/counselor/:id",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <CounselorSinglePage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/casesstudies",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <CasesSection />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/cases/case/:id",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <SessionPage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/cases/session/:id",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <SessionSinglePage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Events />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/addType",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <AddType />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/upcommingevents",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <BigCalendar />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/events/:id",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <EventsSinglepage />
        </AdminLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/report",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Report />
        </AdminLayout>{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/notification",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Notification />
        </AdminLayout>{" "}
      </PrivateRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout>
          <Settings />
        </AdminLayout>
      </PrivateRoute>
    ),
  },

  // Student Module Routing

  {
    path: "/student/bookappoinment",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentLayout>
          <BookAppointment />
        </StudentLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/student/session",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentLayout>
          <StudentSession />
        </StudentLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/student/session/case/:id",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentLayout>
          <CaseSession />
        </StudentLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/student/session/report/:id",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentLayout>
          <SessionReport />
        </StudentLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/student/session/reschedule/:id",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentLayout>
          <RescheduleSession />
        </StudentLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/student/reports",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentLayout>
          <StudentReport />
        </StudentLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/student/events",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentLayout>
          <StudentEvents />
        </StudentLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/student/settings",
    element: (
      <PrivateRoute allowedRoles={["student"]}>
        <StudentLayout>
          <StudentSettings />
        </StudentLayout>
      </PrivateRoute>
    ),
  },
  // counselor Module Routing

  {
    path: "/counselor/upcomminSession",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <UpcomingSession />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/upcommingSession",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <BigCalendar />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/addavailability",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <AddAvailability />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/session",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <CounselorSession />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },

  {
    path: "/counselor/session/addentry/:id",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <AddEntry />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/session/addremarks",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <AddRemarks />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/session/case/:id",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <CasesSessionPage />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/session/report/:id",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <SessionDetails />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/report",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <CounselorReport />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/event",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <CounselorEvent />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/notification",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <CounselorNotification />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/event/:id",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <EventsSinglepage />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/counselor/setting",
    element: (
      <PrivateRoute allowedRoles={["counsellor"]}>
        <CounselorLayout>
          <CounselorSettings />
        </CounselorLayout>
      </PrivateRoute>
    ),
  },
]);

export default router;
