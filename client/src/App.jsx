import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { setProducts } from "./redux/actions"
import useFetch from "./hooks/useFetch"
import Canvas from "./components/Canvas"
import removeImageUrls from "./utils/removeImageUrls"

import './styles/main.css'



function App() {

	// fetch products
	const { data, error, isLoading } = useFetch('http://localhost:3000/api/products')
	const dispatch = useDispatch()

	useEffect(() => {
		if (data) {
			
			// remove image urls.
			const data_without_image_urls = data.map((item, index) => {
				return {...item, bodyHtml: removeImageUrls(item.bodyHtml)}
			})

			// set products state in redux
			dispatch(setProducts(data_without_image_urls))
		}
	}, [data])

	// select products
	const products = useSelector(state => state.product.list)


	return (
        <main className="grid">
			<div className="grid-item cards-holder">
            {isLoading ? <p>Loading...</p> :
            error ? <p>Error occurred</p> :
			products.length === 0 ? 
			<p>No data to show...</p> :
            products.map((product, index) => (
                <div className="product-card" key={index}>
                    <Canvas id={`canvas-${index}`} url={product.images[0]} />
                    <div className="text-holder" 
						dangerouslySetInnerHTML={{ __html: `${product.bodyHtml}` }} 
					/>
                </div>
            ))}
			</div>
        </main>
	)
}

export default App
