import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {!(location.pathname === "/login") && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
