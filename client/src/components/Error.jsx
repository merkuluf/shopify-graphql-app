import React, {memo} from 'react'
import '../static/styles/error.css'
import error_png from '../static/images/error.png'

function Error() {
  return (
    <div className='error'>
        <h1>Error occured!</h1>
        <img src={error_png}></img>
    </div>
  )
}

export default memo(Error);