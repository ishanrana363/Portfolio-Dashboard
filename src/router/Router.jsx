import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/layout/Layout";
import ProjectCreatePage from "../pages/project-page/ProjectCreatePage";
import AllProjectPage from "../pages/project-page/AllProjectPage";
import LoginFormPage from "../pages/login-form-page/LoginFormPage";
import RegistrationForm from "../component/registration-form/RegistrationFrom";


export const route = createBrowserRouter([
    {
        path : "/",
        element : <LoginFormPage></LoginFormPage>
    },
    {
        path : "/registration",
        element : <RegistrationForm></RegistrationForm>
    },
    {
        path : "/dashboard",
        element : <Layout></Layout>,
        children : [
            {
                path : "/dashboard",
                element : <div>Welcome to the dashboard</div> // Placeholder for main dashboard content. Replace with actual content.
            },
            {
                path : "project-create",
                element : <ProjectCreatePage></ProjectCreatePage>
            },
            {
                path : "all-projects",
                element : <AllProjectPage></AllProjectPage>
            },
        ]
    }
])