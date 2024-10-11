import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import SpinnerLoader from '../full-screen-loder/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import serviceStore from '../../apiRequest/service-api/serviceStore';
import { useParams } from 'react-router-dom';
import { uploadImg } from '../../upload-img/UploadImg';
import { serviceUpdateApi } from '../../apiRequest/service-api/serviceApi';

const ServiceUpdateForm = () => {
  const { singleServiceDataApi, singleServiceData,totalServiceDataApi } = serviceStore();
  const { id } = useParams();

  let { img: incomingImg } = singleServiceData;

  useEffect(() => {
    (async () => {
      setLoader(true)
      await singleServiceDataApi(id)
      setLoader(false)
    })();
  }, [id])

  const [loader, setLoader] = useState(false)
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const img = e.target.img.files[0]

    let serviceImg = incomingImg;

    if (!img?.name) {
      serviceImg = incomingImg
    } else {
      serviceImg = await uploadImg(img);
    }

    const payload = {
      name,
      img: serviceImg,
    };

    setLoader(true);
    let res = await serviceUpdateApi(id,payload);
    setLoader(false);
    if (res) {
      setLoader(true);
      await totalServiceDataApi(1,5,0);
      setLoader(false);
      toast.success("Service updated successfully")
    } else {
      toast.error("Failed to update service")
    }

  };

  return (
    <div className='' >
      <div >
        <Helmet>
          <title>Dashboard | Service Create </title>
        </Helmet>
        <>
          <div className="flex justify-center items-center my-16 ">
            <form onSubmit={handleSubmitForm} className="bg-gray-300 p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4 text-center "> ({singleServiceData?.name}) Update Service From </h2>

              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={singleServiceData?.name}
                  key={Date.now()}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your service name"
                />
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img key={Date.now()} className='rounded-full' src= {singleServiceData?.img} />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="img" className="block text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  className="w-full p-2 border border-gray-300 bg-white rounded focus:outline-none focus:border-indigo-500"
                  placeholder="Enter image URL"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
          {
            loader && (
              <div>
                <SpinnerLoader></SpinnerLoader>
              </div>
            )
          }
          <Toaster position="top-center"></Toaster>
        </>
      </div>
    </div>
  )
}

export default ServiceUpdateForm
