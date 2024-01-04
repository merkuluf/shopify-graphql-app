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

        // Set the source of the image
        image.src = url;

        image.onload = () => {
            // Resize the canvas to match the image size
            canvas.width = image.width;
            canvas.height = image.height;

            // Draw the image onto the canvas
            context.drawImage(image, 0, 0);
        };
        // Optional: handle loading errors
        image.onerror = () => {
            console.error('Failed to load image:', url);
        };
    }, [url]); // Redraw the canvas when the URL changes

    return (
        <canvas className='canvas' id={id} ref={canvasRef}></canvas>
    );
}

export default memo(Canvas);
