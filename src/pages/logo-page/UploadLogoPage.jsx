import React from 'react'
import UploadLogo from '../../component/logo/UploadLogo'
import { Helmet } from 'react-helmet-async'

const UploadLogoPage = () => {
  return (
    <div>
      <>
      <Helmet>
        <title>Dashboard | Upload Logo</title>
      </Helmet>
      </>
      <UploadLogo></UploadLogo>
    </div>
  )
}

export default UploadLogoPage
