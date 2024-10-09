import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../component/layout/Layout";
import ProjectCreatePage from "../pages/project-page/ProjectCreatePage";
import AllProjectPage from "../pages/project-page/AllProjectPage";
import LoginFormPage from "../pages/login-form-page/LoginFormPage";
import RegistrationForm from "../component/registration-form/RegistrationFrom";
import ProjectUpdatePage from "../pages/project-page/ProjectUpdatePage";

// Check if the user is authenticated (i.e., has a token in localStorage)
const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const route = createBrowserRouter([
    {
        path: "/",
        element: isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginFormPage />,
    },
    {
        path: "/registration",
        element: <RegistrationForm />,
    },
    {
        path: "/dashboard",
        element: isAuthenticated() ? <Layout /> : <Navigate to="/" />,
        children: [
            {
                path: "project-create",
                element: <ProjectCreatePage />,
            },
            {
                path: "all-projects",
                element: <AllProjectPage />,
            },
            {
                path : "project-update/:id",
                element : <ProjectUpdatePage></ProjectUpdatePage>
            }
        ],
    },
]);
