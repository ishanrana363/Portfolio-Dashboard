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
import FeedbackCreatePage from "../pages/feedback-page/FeedbackCreatePage";
import AllFeedbackPage from "../pages/feedback-page/AllFeedbackPage";
import FeedbackUpdatePage from "../pages/feedback-page/FeedbackUpdatePage";
import BlogCreatePage from './../pages/blog-page/BlogCreatePage';
import AllBlogPage from './../pages/blog-page/AllBlogPage';
import BlogUpdatePage from './../pages/blog-page/BlogUpdatePage';
import HomePage from "../pages/home-page/HomePage";
import LayoutLogin from "../layout-client/Layout";
import UploadLogoPage from "../pages/logo-page/UploadLogoPage";
import { path } from "framer-motion/client";
import AllLogoPage from './../pages/logo-page/AllLogoPage';
import UpdateLogoPage from './../pages/logo-page/UpdateLogoPage';

const token = localStorage.getItem("token");

let role = ""; 
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
            path: "/dashboard",
            element: <HomePage />,

        },
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
        },
        {
            path : "feedback-create",
            element : <FeedbackCreatePage></FeedbackCreatePage>
        },
        {
            path : "all-feedback",
            element : <AllFeedbackPage></AllFeedbackPage>
        },
        {
            path : "feedback-update/:id",
            element : <FeedbackUpdatePage></FeedbackUpdatePage>
        },
        {
            path : "blog-create",
            element : <BlogCreatePage></BlogCreatePage>
        },
        {
            path : "all-blog",
            element : <AllBlogPage></AllBlogPage>
        },
        {
            path : "blog-update/:id",
            element : <BlogUpdatePage></BlogUpdatePage>
        },
        {
            path: "logo-upload",
            element: <UploadLogoPage />,
        },
        {
            path : "all-logo",
            element : <AllLogoPage></AllLogoPage>
        },
        {
            path : "update-logo/:id",
            element : <UpdateLogoPage></UpdateLogoPage>
        }
        
    ];
} else {
    routes2 = [
        {
            path: "/",
            element: <LoginFormPage />,

        },
        {
            path: "/registration",
            element: <RegistrationForm />,
        },
    ];
}

export const route = createBrowserRouter([
    {
        path: "/dashboard",
        element: <Layout />,
        children: routes, // Use the routes array based on the role
    },
    {
        path : "/",
        element : <LayoutLogin></LayoutLogin>,
        children : routes2
    }
    
]);
