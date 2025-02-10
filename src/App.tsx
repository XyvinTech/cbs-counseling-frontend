import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import ECommerce from "./pages/Dashboard/ECommerce";
import DefaultLayout from "./layout/DefaultLayout";
import UserList from "./pages/User/UserList";
import AddUser from "./pages/User/AddUser";
import ChurchList from "./pages/Church/ChurchList";
import AddChurch from "./pages/Church/AddChurch";
import PlanList from "./pages/plan/PlanList";
import AddPlan from "./pages/plan/AddPlan";
import AddSubscription from "./pages/subscription/AddSubscription";
import SubscriptionList from "./pages/subscription/SubscriptionList";
import ChurchUserList from "./pages/Church/ChurchUserList";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import AdminCaseList from "./pages/Admin/Cases/AdminCaseList";
import AdminEventList from "./pages/Admin/Event/AdminEventList";
import AddEvent from "./pages/Admin/Event/AddEvent";
import AdminTypeList from "./pages/Admin/CounselingType/AdminTypeList";
import AddType from "./pages/Admin/CounselingType/AddType";
import AddReport from "./pages/Admin/Report/AddReport";
import AdminPassword from "./pages/Admin/Settings/AdminPassword";
import AdminCounselorList from "./pages/Admin/Counselor/AdminCounselorList";
import AddCounselor from "./pages/Admin/Counselor/AddCounselor";
import AdminStudentList from "./pages/Admin/Student/AdminStudentList";
import AddStudent from "./pages/Admin/Student/AddStudent";
import Form from "./pages/Student/Form";
import BookAppoinment from "./pages/Student/BookAppoinment";
import Profile from "./pages/Profile";
import CounselorProfile from "./pages/Admin/Counselor/CounselorProfile";
import AdminSessionList from "./pages/Admin/Cases/AdminSessionList";
import SessionDetails from "./pages/Admin/Cases/SessionDetails";
import CounselorSession from "./pages/Counselor/CounselorSession";
import AddAvailability from "./pages/Counselor/AddAvailability";
import AddEntry from "./pages/Counselor/AddEntry";
import CounselorCase from "./pages/Counselor/CounselorCase";
import CounselorRemark from "./pages/Counselor/CounselorRemark";
import AddRemark from "./pages/Counselor/AddRemark";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="ABLE" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/form"
        element={
          <>
            <PageTitle title="ABLE || Form" />
            <Form />
          </>
        }
      />
      <Route
        path="/book-appoinment"
        element={
          <>
            <PageTitle title="ABLE || Form" />
            <BookAppoinment />
          </>
        }
      />
      <Route
        path="/user"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || User" />
              <UserList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/admin-counselor"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Counselor" />
              <AdminCounselorList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/admin-student"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Student" />
              <AdminStudentList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/admin-case"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Case" />
              <AdminCaseList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/cases/session/:id"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Case" />
              <AdminSessionList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/session/:id"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Session" />
              <SessionDetails />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/admin-event"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Event" />
              <AdminEventList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/admin-type"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Counseling Type" />
              <AdminTypeList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/admin-report"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Report" />
              <AddReport />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/settings"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Settings" />
              <AdminPassword />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/counselor-session"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Session" />
              <CounselorSession />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/counselor-case"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Settings" />
              <CounselorCase />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/counselor-remark"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Remarks" />
              <CounselorRemark />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/availability"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Settings" />
              <AddAvailability />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/session/entry/:id"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Settings" />
              <AddEntry />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/session/remark/:id"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Settings" />
              <AddRemark />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/plan"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Plan" />
              <PlanList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/subscription"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Subscription" />
              <SubscriptionList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/add-user"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || User" />
              <AddUser />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/add-counselor"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Counselor" />
              <AddCounselor />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/add-student"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Student" />
              <AddStudent />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/admin-student/:id"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Student" />
              <Profile />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/admin-counselor/:id"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Student" />
              <CounselorProfile />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/add-event"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Event" />
              <AddEvent />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/add-type"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Counseling Type" />
              <AddType />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/church/:id"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Church" />
              <ChurchUserList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/add-plan"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Plan" />
              <AddPlan />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/add-subscription"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="ABLE || Subscription" />
              <AddSubscription />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <DefaultLayout>
            <PageTitle title="ABLE || Dashboard" />
            <ECommerce />
          </DefaultLayout>
        }
      />
    </Routes>
  );
}

export default App;
