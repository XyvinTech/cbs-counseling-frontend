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
            <DefaultLayout>
              <PageTitle title="Bethal Patrika" />
              <ECommerce />
            </DefaultLayout>
          </>
        }
      />

      <Route
        path="/user"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Bethal Patrika || User" />
              <UserList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/church"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Bethal Patrika || Church" />
              <ChurchList />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/plan"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Bethal Patrika || Plan" />
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
              <PageTitle title="Bethal Patrika || Subscription" />
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
              <PageTitle title="Bethal Patrika || User" />
              <AddUser />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/add-church"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Bethal Patrika || Church" />
              <AddChurch />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/church/:id"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Bethal Patrika || Church" />
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
              <PageTitle title="Bethal Patrika || Plan" />
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
              <PageTitle title="Bethal Patrika || Subscription" />
              <AddSubscription />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignIn />
          </>
        }
      />
    </Routes>
  );
}

export default App;
