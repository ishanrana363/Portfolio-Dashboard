import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout/Layout";
import ProjectCreatePage from "../pages/project-page/ProjectCreatePage";
import AllProjectPage from "../pages/project-page/AllProjectPage";
import LoginFormPage from "../pages/login-form-page/LoginFormPage";
import RegistrationForm from "../component/registration-form/RegistrationFrom";
import ProjectUpdatePage from "../pages/project-page/ProjectUpdatePage";
import SkillCreatePage from "../pages/skill/SkillCreatePage";
import AllSkillPage from "../pages/skill/AllSkillPage";
import SkillUpdatePage from "../pages/skill/SkillUpdatePage";
import ServiceCreatePage from "../pages/service-page/ServiceCreatePage";
import AllServicePage from "../pages/service-page/AllServicePage";
import ServiceUpdatePage from "../pages/service-page/ServiceUpdatePage";
import { jwtDecode } from "jwt-decode";
import AdminProfilePage from "../pages/admin-profile-page/AdminProfilePage";

const token = localStorage.getItem("token");
let role = ""; // Default value

if (token) {
    try {
        const decodedToken = jwtDecode(token); // Decode the token
        role = decodedToken?.user?.role; // Access the role
        console.log("User Role:", role);
    } catch (error) {
        console.error("Error decoding token:", error);
    }
}

// Define routes based on role using if-else structure
let routes = [];
let routes2 = [] ;

if ( token &&  (role === "admin")) {
    routes = [
        {
            path: "project-create",
            element: <ProjectCreatePage />,
        },
        {
            path: "all-projects",
            element: <AllProjectPage />,
        },
        {
            path: "project-update/:id",
            element: <ProjectUpdatePage />,
        },
        {
            path: "skill-create",
            element: <SkillCreatePage />,
        },
        {
            path: "all-skill",
            element: <AllSkillPage />,
        },
        {
            path: "skill-update/:id",
            element: <SkillUpdatePage />,
        },
        {
            path: "service-create",
            element: <ServiceCreatePage />,
        },
        {
            path: "all-services",
            element: <AllServicePage />,
        },
        {
            path: "service-update/:id",
            element: <ServiceUpdatePage />,
        },
        {
            path : "profile",
            element : <AdminProfilePage></AdminProfilePage>
        }
    ];
} else {
    routes2 = [
        {
            path: "", // Catch-all route for unauthorized access
            element: <div>You have not permission in this routes </div> ,
        }
    ];
}

export const route = createBrowserRouter([
    {
        path: "/",
        element: <LoginFormPage />,
    },
    {
        path: "/registration",
        element: <RegistrationForm />,
    },
    {
        path: "/dashboard",
        element: <Layout />,
        children: routes, // Use the routes array based on the role
    },
    
]);
