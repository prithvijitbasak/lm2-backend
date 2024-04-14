import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { FaUser } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  console.log("Here is the data from AdminLayout", user);

  if (isLoading) {
    return (
      <>
        <h1>Loading....</h1>
      </>
    );
  }

  if (user.isAdmin === "false") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <IoMdContact />
                  Contacts
                </NavLink>
              </li>
              <li>Services</li>
              <li>Home</li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
