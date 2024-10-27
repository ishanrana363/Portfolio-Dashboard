import React, { useEffect, useState } from 'react';
import logoStore from '../../apiRequest/logo-api/logoStore';
import SpinnerLoader from './../full-screen-loder/Spinner';
import moment from 'moment';
import { deleteAlert } from '../../helper/deleteAlert';
import { logoDeleteApi } from '../../apiRequest/logo-api/logoApi';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllLogo = () => {
    const { logoData, logoDataApi } = logoStore();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true);
            await logoDataApi();
            setLoader(false);
        })();
    }, []);

    const deleteLogo = async (id) => {
        const resp = await deleteAlert();
        if(resp.isConfirmed){
            setLoader(true);
            let res = await logoDeleteApi(id);
            setLoader(false);
            if(res){
                setLoader(true);
                await logoDataApi();
                setLoader(false);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }else{
                Swal.fire({
                    title: "Failed!",
                    text: "Your file was not deleted.",
                    icon: "error"
                });
            }
            
        }
    };


    return (
        <div className=" my-14 flex items-center justify-center ">
            {loader ? (
                <SpinnerLoader />
            ) : (
                <div className="overflow-x-auto w-full max-w-3xl bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="text-center">
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Serial No.
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Upload Date
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Logo
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logoData.map((item, i) => (
                                <tr key={item.id || i} className="text-center">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {i + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {moment(item.createdAt).format("MMMM Do YYYY")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={item.logo} alt={`Logo ${i + 1}`} className="h-10 w-10 object-cover rounded-full" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">
                                            <Link to={`/dashboard/update-logo/${item._id}`}>Update</Link>
                                        </button>
                                        <button onClick={()=>{deleteLogo(item._id)}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllLogo;
