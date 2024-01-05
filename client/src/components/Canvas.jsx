import React, { useEffect, useRef, memo } from 'react';

function Canvas({ id, url }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Clear previous image
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Create a new image object
        const image = new Image();
        image.src = url;

        image.onload = () => {
            // Resize the canvas to match the image size
            canvas.width = image.width;
            canvas.height = image.height;

            // Draw the image onto the canvas
            context.drawImage(image, 0, 0);
        };

        image.onerror = () => {
            console.error('Failed to load image:', url);
        };
    }, [url]);

    return (
        <canvas className='canvas' id={id} ref={canvasRef}></canvas>
    );
}

export default memo(Canvas);
