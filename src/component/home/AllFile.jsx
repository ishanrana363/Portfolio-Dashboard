import React from 'react'
import projectStore from '../../apiRequest/project-api/projectStore'
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import feedbackStore from '../../apiRequest/feedback-api/feedbackStore';
import blogStore from './../../apiRequest/blog-api/blogStore';
import serviceStore from './../../apiRequest/service-api/serviceStore';
import skillStore from './../../apiRequest/skill-api/skillStore';

const AllFile = () => {
    const { totalProjectLength } = projectStore();
    const {totalFeedbackLength} = feedbackStore();
    const {totalBlogLength} = blogStore();
    const {totalServiceLength} = serviceStore();
    const {totalSkillLength} = skillStore();
    return (
        <div>
            <Helmet>
                <title>Dashboard | Home Page</title>
            </Helmet>
            <div className='grid lg:grid-cols-5 ' >
                {/* total project  */}

                <div className='my-4' >
                    <div>
                        <NavLink to={"/dashboard/all-projects"}>
                            <h3 className='lg:text-xl font-semibold mx-3 ' >Total Projects: {totalProjectLength}</h3>
                        </NavLink>
                    </div>
                    {/* project create  */}
                    <NavLink to={"/dashboard/project-create"}>
                        <div className='w-44 h-32 bg-red-400/35 shadow-2xl rounded-2xl ' >
                            <h1 className='text-center mt-[44px] mx-8 absolute ' >Project Create</h1>
                        </div>
                    </NavLink>
                </div>

                {/* total skill  */}

                <div className='my-4' >
                    <div>
                        <NavLink to={"/dashboard/all-skill"}>
                            <h3 className='lg:text-xl font-semibold mx-7 ' >Total Skill: {totalSkillLength}</h3>
                        </NavLink>
                    </div>
                    {/* skill create  */}
                    <NavLink to={"http://localhost:5173/dashboard/skill-create"}>
                        <div className='w-44 h-32 bg-red-400/35 shadow-2xl rounded-2xl ' >
                            <h1 className='text-center mt-[46px] mx-[42px] absolute ' >Skill Create</h1>
                        </div>
                    </NavLink>
                </div>

                {/* total service  */}

                <div className='my-4' >
                    <div className='' >
                        <NavLink to={"/dashboard/all-services"}>
                            <h3 className='lg:text-xl font-semibold mx-3 ' >Total Service: {totalServiceLength}</h3>
                        </NavLink>
                    </div>
                    {/*   */}
                    <NavLink to={"/dashboard/service-create"}>
                        <div className='w-44 h-32 bg-red-400/35 shadow-2xl rounded-2xl ' >
                            <h1 className='text-center mt-[46px] mx-[42px] absolute ' >Service Create</h1>
                        </div>
                    </NavLink>
                </div>

                {/* feedback */}

                <div className='my-4' >
                    <div className='' >
                        <NavLink to={"/dashboard/all-feedback"}>
                            <h3 className='lg:text-xl font-semibold mx-2 ' >Total Feedback: {totalFeedbackLength}</h3>
                        </NavLink>
                    </div>
                    {/*   */}
                    <NavLink to={"/dashboard/feedback-create"}>
                        <div className='w-44 h-32 bg-red-400/35 shadow-2xl rounded-2xl ' >
                            <h1 className='text-center mt-[46px] mx-[30px] absolute ' >Feedback Create</h1>
                        </div>
                    </NavLink>
                </div>
                {/* blog */}
                <div className='my-4 ' >
                    <div className='' >
                        <NavLink to={"/dashboard/all-blog"}>
                            <h3 className='lg:text-xl font-semibold mx-5 ' >Total Blog: {totalBlogLength}</h3>
                        </NavLink>
                    </div>
                    {/*   */}
                    <NavLink to={"/dashboard/blog-create"}>
                        <div className='w-44 h-32 bg-red-400/35 shadow-2xl rounded-2xl ' >
                            <h1 className='text-center mt-[46px] mx-[42px] absolute ' >Blog Create</h1>
                        </div>
                    </NavLink>
                </div>

            </div>
        </div>
    )
}

export default AllFile
