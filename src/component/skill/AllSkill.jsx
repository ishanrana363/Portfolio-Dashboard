import React, { useEffect, useState } from 'react'
import { deleteAlert } from '../../helper/deleteAlert';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import skillStore from '../../apiRequest/skill-api/skillStore';
import moment from 'moment/moment';
import ReactPaginate from 'react-paginate';
import SpinnerLoader from '../full-screen-loder/Spinner';
import { deleteSkillApi } from '../../apiRequest/skill-api/skillApi';
import toast from 'react-hot-toast';

const AllSkill = () => {
    const navigate = useNavigate();
    const { totalSkillDataApi, totalSkillDataList, totalSkillLength } = skillStore();
    const [loader, setLoader] = useState(false);
    const [perPage, setPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setLoader(true);
            await totalSkillDataApi(1, perPage, 0);
            setLoader(false);
        })();
    }, [totalSkillDataApi, perPage]);

    const handlePageChange = async (event) => {
        const pageNo = event.selected;
        setLoader(true);
        await totalSkillDataApi(pageNo + 1, perPage, searchValue);
        setLoader(false);
    };

    const getPerPageData = async (event) => {
        const newPerPage = parseInt(event.target.value);
        setPerPage(newPerPage);
        setLoader(true);
        await totalSkillDataApi(1, newPerPage, 0);
        setLoader(false);
    };

    const getInputSearchValue = async (event) => {
        const value = event.target.value;
        setSearchValue(value);
        if (value.length === 0) {
            setLoader(true);
            await totalSkillDataApi(1, perPage, 0);
            setLoader(false);
        }
    };

    const submitSearchValue = async () => {
        setLoader(true);
        await totalSkillDataApi(1, perPage, searchValue);
        setLoader(false);
    };

    const skillDelete = async (id) => {
        let resp = await deleteAlert();
        if (resp.isConfirmed) {
            setLoader(true);
            let res = await deleteSkillApi(id);
            setLoader(false);
            if (res) {
                setLoader(true);
                await totalSkillDataApi(1, perPage, searchValue);
                setLoader(false);
                toast.success("Deleted successfully");
            } else {
                toast.error("Failed to delete");
            }
        }
    };
    return (
        <div>
            <>
                <div className="p-4">
                    <h1 className='text-center text-lg font-semibold mb-2'>Total Skill: {totalSkillLength}</h1>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <select
                                onChange={getPerPageData}
                                className="form-control mx-2 form-select-sm border border-gray-300 rounded p-2"
                            >
                                <option value="5">5 Per Page</option>
                                <option value="30">30 Per Page</option>
                                <option value="50">50 Per Page</option>
                                <option value="100">100 Per Page</option>
                                <option value="200">200 Per Page</option>
                            </select>
                        </div>

                        <div className="w-1/3">
                            <div className="input-group mb-3 flex">
                                <input
                                    onChange={getInputSearchValue}
                                    type="text"
                                    className="form-control form-control-sm w-full border border-gray-300 rounded p-2"
                                    placeholder="Search..."
                                    aria-label="Search"
                                />
                                <button
                                    onClick={submitSearchValue}
                                    className="btn btn-success btn-sm ml-2 bg-teal-500 text-white px-4 py-1 mt-1 rounded hover:bg-teal-600"
                                    type="button"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-teal-500 text-white text-center">
                                    <th className="py-3 px-4 border-b">Name</th>
                                    <th className="py-3 px-4 border-b">Image</th>
                                    <th className="py-3 px-4 border-b">Created Date</th>
                                    <th className="py-3 px-4 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    totalSkillDataList && totalSkillDataList.map((item, i) => (
                                        <tr key={i} className="hover:bg-gray-100 text-center cursor-pointer ">
                                            <td onClick={() => { navigate(`/dashboard/porject-details/${item["_id"]}`) }} className="py-3 px-4 border-b">{item.name}</td>
                                            <td onClick={() => { navigate(`/dashboard/porject-details/${item["_id"]}`) }} className="py-3 px-4 border-b">
                                                <img
                                                    src={item.img}
                                                    alt={item.name}
                                                    className="h-12 w-12 rounded-full object-cover mx-auto"
                                                />
                                            </td>

                                            <td onClick={() => { navigate(`/dashboard/porject-details/${item["_id"]}`) }} className="py-3 px-4 border-b">{moment(item.createdAt).format("MMMM Do YYYY")}</td>
                                            <td className="py-3 px-4 border-b">
                                                <div className="flex justify-center space-x-2">
                                                    <NavLink to={`/dashboard/skill-update/${item["_id"]}`}>
                                                        <button className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600">
                                                            Edit
                                                        </button>
                                                    </NavLink>
                                                    <button onClick={() => skillDelete(item["_id"])} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-5">
                        <nav aria-label="Page navigation example">
                            <ReactPaginate
                                previousLabel="prev"
                                nextLabel="next"
                                pageCount={Math.ceil(totalSkillLength / perPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                                containerClassName="pagination flex justify-center space-x-2"
                                activeClassName="bg-teal-500 text-white rounded"
                                pageLinkClassName="px-3 py-1 rounded"
                            />
                        </nav>
                    </div>
                </div>
                {
                    loader && (
                        <div className="flex justify-center items-center h-screen">
                            <SpinnerLoader />
                        </div>
                    )
                }
            </>
        </div>
    )
}

export default AllSkill;
