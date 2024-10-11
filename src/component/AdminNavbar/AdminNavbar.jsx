import { useEffect } from "react";
import adminStore from "../../apiRequest/admin-api/adminStore";
import { useState } from "react";
import SpinnerLoader from "../full-screen-loder/Spinner";
import { Link, NavLink } from "react-router-dom";

const AdminNavbar = () => {
  const { adminProfileDataApi, adminProfileData } = adminStore();
  const [loader, setLoader] = useState(false);
  const [toggle, setToggle] = useState(false);

  const logout = ()=>{
    localStorage.clear();
    window.location.href = "/"
  }

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    (async () => {
      setLoader(true);
      await adminProfileDataApi();
      setLoader(false);
    })();
  }, []);

  return (
    <>
      <div className="">
        <div className="navbar bg-navBar">
          <div className="flex-1">
            <NavLink to="/" className="btn btn-ghost text-3xl font-mono font-bold">
              Portfolio
            </NavLink>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div onClick={handleToggle} className="w-10 rounded-full">
                  <img alt="Admin Avatar" src={adminProfileData?.img} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow absolute bg-white
                  ${toggle ? "block opacity-100 transform translate-y-0 transition-opacity duration-500 ease-in-out"
                    : "hidden opacity-0 transform -translate-y-4 transition-opacity duration-500 ease-in-out"}
                `}
              >
                <li>
                  <Link to="profile" className="flex justify-center text-lg font-bold font-mono">
                    Profile
                  </Link>
                </li>
                <li className="">
                  <Link className="flex justify-center text-lg font-bold font-mono" to="/profile">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link onClick={logout} className="flex justify-center text-lg font-bold font-mono" to={""}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {loader && (
        <div>
          <SpinnerLoader />
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
