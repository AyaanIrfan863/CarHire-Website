import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar";

function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}

export default Layout;