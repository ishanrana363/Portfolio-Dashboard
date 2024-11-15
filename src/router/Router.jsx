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
import AdminProfilePage from "../pages/admin-profile-page/AdminProfilePage";
import FeedbackCreatePage from "../pages/feedback-page/FeedbackCreatePage";
import AllFeedbackPage from "../pages/feedback-page/AllFeedbackPage";
import FeedbackUpdatePage from "../pages/feedback-page/FeedbackUpdatePage";
import BlogCreatePage from './../pages/blog-page/BlogCreatePage';
import AllBlogPage from './../pages/blog-page/AllBlogPage';
import BlogUpdatePage from './../pages/blog-page/BlogUpdatePage';
import HomePage from "../pages/home-page/HomePage";
import UploadLogoPage from "../pages/logo-page/UploadLogoPage";
import AllLogoPage from './../pages/logo-page/AllLogoPage';
import UpdateLogoPage from './../pages/logo-page/UpdateLogoPage';
import EmailSendFromPage from "../pages/password-reset-page/EmailSendFromPage";
import EmailVerifyfFromPage from "../pages/password-reset-page/EmailVerifyfFromPage";
import ForgetPasswordFormPage from "../pages/password-reset-page/ForgetPasswordFormPage";
import VideoUrl from "../component/VideoUrl";
import UploadStack from "../pages/stack-page/UploadStack";
import AllStack from "../pages/stack-page/AllStack";





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
        path: "/send-email",
        element: <EmailSendFromPage></EmailSendFromPage>
    },
    {
        path : "/email-verify",
        element : <EmailVerifyfFromPage></EmailVerifyfFromPage>
    },
    {
        path : "/forget-password",
        element : <ForgetPasswordFormPage></ForgetPasswordFormPage>
    },
    {
        path:"videos",
        element : <VideoUrl></VideoUrl>
    },
    {
        path: "/dashboard",
        element: <Layout />,
        children: [
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
                path: "profile",
                element: <AdminProfilePage></AdminProfilePage>
            },
            {
                path: "feedback-create",
                element: <FeedbackCreatePage></FeedbackCreatePage>
            },
            {
                path: "all-feedback",
                element: <AllFeedbackPage></AllFeedbackPage>
            },
            {
                path: "feedback-update/:id",
                element: <FeedbackUpdatePage></FeedbackUpdatePage>
            },
            {
                path: "blog-create",
                element: <BlogCreatePage></BlogCreatePage>
            },
            {
                path: "all-blog",
                element: <AllBlogPage></AllBlogPage>
            },
            {
                path: "blog-update/:id",
                element: <BlogUpdatePage></BlogUpdatePage>
            },
            {
                path: "logo-upload",
                element: <UploadLogoPage />,
            },
            {
                path: "all-logo",
                element: <AllLogoPage></AllLogoPage>
            },
            {
                path: "update-logo/:id",
                element: <UpdateLogoPage></UpdateLogoPage>
            },
            {
                path : "upload-stack",
                element : <UploadStack></UploadStack>
            },
            {
                path : "all-stack-overflow",
                element : <AllStack></AllStack>
            }
        ]// Use the routes array based on the role
    },
    

]);
