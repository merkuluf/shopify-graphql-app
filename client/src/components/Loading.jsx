import React, {memo} from 'react'
import '../static/styles/loading.css'


function Loading() {
  return (
    <div className='loading-wrapper'>
      <h1>Loading</h1>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default memo(Loading)