import Cookies from "js-cookie";
import { Routes, Navigate, Route } from "react-router-dom";
import AuthLayout from "../components/Layouts/AuthLayout";
import LoginForm from "../components/Form/LoginForm";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import DashboardPage from "../pages/Home/DashboardPage";
import UsersPage from "../pages/Users/UsersPage";
import CommunityOwnerPage from "../pages/CommunityOwner/CommunityOwnerPage";
import UserDetailsPage from "../pages/Users/UserDetailsPage";
import ProductsPage from "../pages/Products/ProductsPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import ReportsPage from "../pages/Reports/ReportsPage";
import WithdrawRequests from "../pages/WithdrawRequests/WithdrawRequestsPage";
import CommunityOwnerDetailsPage from "../pages/CommunityOwner/CommunityOwnerDetailsPage";
import CommunityDetailsPage from "../pages/Comunities/CommunityDetailsPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import UserRevenuePage from "../pages/Users/UserRevenuePage";
import OrderDetailsPage from "../pages/Orders/OrderDetailsPage";

const isAuthenticated = () => !!Cookies.get("adminToken");

const PrivateRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? element : <Navigate to={redirectTo} />;
};

const PublicRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? <Navigate to={redirectTo} /> : element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute
            redirectTo={`/`}
            element={
              <AuthLayout>
                <LoginForm />
              </AuthLayout>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<DashboardPage />} />}
          />
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<UsersPage />} />}
          />
        }
      />
      <Route
        path="/users/details/:fullName/:userId"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<UserDetailsPage />} />}
          />
        }
      />
      <Route
        path="/users/details/revenue/:fullName/:userId"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<UserRevenuePage />} />}
          />
        }
      />

      <Route
        path="/community-owners"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<CommunityOwnerPage />} />}
          />
        }
      />
      <Route
        path="/community-owners/details/:fullName/:ownerId"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<CommunityOwnerDetailsPage />} />}
          />
        }
      />
      <Route
        path="/community/:communityId"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<CommunityDetailsPage />} />}
          />
        }
      />

      <Route
        path="/products"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<ProductsPage />} />}
          />
        }
      />

      <Route
        path="/products/:productId"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<ProductDetailsPage />} />}
          />
        }
      />

      <Route
        path="/order-management"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<OrdersPage />} />}
          />
        }
      />

      <Route
        path="/order-management/:orderId"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<OrderDetailsPage />} />}
          />
        }
      />

      <Route
        path="/reports"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<ReportsPage />} />}
          />
        }
      />
      <Route
        path="/withdraw-requests"
        element={
          <PrivateRoute
            redirectTo={`/login`}
            element={<DashboardLayout pages={<WithdrawRequests />} />}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
