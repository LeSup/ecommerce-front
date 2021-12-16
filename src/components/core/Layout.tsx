import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <div style={{ width: "85%", margin: "0 auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
