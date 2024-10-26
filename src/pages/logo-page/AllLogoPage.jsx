import React from 'react'
import AllLogo from '../../component/logo/AllLogo'
import { Helmet } from 'react-helmet-async';

const AllLogoPage = () => {
  return (
    <div>
      <>
      <Helmet>
        <title>Dashboard | All Logo</title>
      </Helmet>
      </>
      <AllLogo></AllLogo>
    </div>
  )
}

export default AllLogoPage
