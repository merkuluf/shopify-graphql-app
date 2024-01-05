import React, {memo} from 'react'
import '../static/styles/button.css'

function Button({ text, className, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`main-button ${className}`}>
            <p>{text}</p>
        </button>
    )
}

export default memo(Button);