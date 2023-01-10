import { BrowserRouter as Router, Route } from "react-router-dom";
import dontenv from "dotenv";
import { AuthorizationInterceptor } from "../services/interceptors";
import LoginPage from "../pages/Login";

dontenv.config();
AuthorizationInterceptor();

const Routes = () => {
  return (
    <Route path="/">
      <Route path="dashboard" element={<LoginPage />} />
    </Route>
  );
};

export default Routes;
