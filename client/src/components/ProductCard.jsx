import React, {memo} from 'react'
import Canvas from './Canvas'
import '../static/styles/productcard.css'
import Button from './Button'
import { useState } from 'react'

function ProductCard({ canvas_id, image_url, inner_html }) {

    const [textView, setTextView] = useState(false)
    const handleTextView = () => {
        setTextView(!textView)
    }

    const text_classname = textView === true ? 'text-holder-show' : 'text-holder-hide'
    const button_text = textView === true ? 'Hide' : 'Show more...'

    return (
        <div className="product-card">
            <Canvas id={canvas_id} url={image_url} />
            <div className={text_classname}
                dangerouslySetInnerHTML={{ __html: `${inner_html}` }}
            />
            <Button 
                onClick={handleTextView} 
                text={button_text}
                className='product-button' 
            />
        </div>
    )
}

export default memo(ProductCard);