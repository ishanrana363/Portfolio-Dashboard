import React from 'react'

const AllLogo = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="overflow-x-auto w-full max-w-3xl bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className='text-center' >
                                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Serial No.
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Upload Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Logo
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className='text-center' >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2024-10-01</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src="/path-to-logo1.png" alt="Logo 1" className="h-10 w-10 object-cover rounded-full" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2">
                                        Update
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllLogo
