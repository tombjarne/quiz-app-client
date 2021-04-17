import React from 'react'

import Navigation from '../navigation'

const BaseLayout = ({ children }) => {
  return (
   <>
     <Navigation />
     { children }
   </>
  )
}

export default BaseLayout
