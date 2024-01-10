import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { setProducts } from "./redux/actions"
import useFetch from "./hooks/useFetch"
import removeImageUrls from "./utils/removeImageUrls"

import Loading from "./components/Loading"
import Error from "./components/Error"
import ProductCard from "./components/ProductCard"

import './static/styles/main.css'

function App() {

	// fetch products
	const { data, error, isLoading } = useFetch('http://localhost:3000/api/products')
	const dispatch = useDispatch()

	useEffect(() => {
		if (data) {

			// remove image urls.
			const data_without_image_urls = data.map((item, index) => {
				return { ...item, bodyHtml: removeImageUrls(item.bodyHtml) }
			})

			// set products state in redux
			dispatch(setProducts(data_without_image_urls))
		}
	}, [data])

	// select products
	const products = useSelector(state => state.product.list)

	if (isLoading) return <Loading />
	if (error) return <Error />
	if (products.length === 0) return <h1>No data to show...</h1>

	return (
		<main className="grid">
			<div className="grid-item cards-holder">
				{products.map((product, index) => (
					<ProductCard
						key={`product-card-${index}`}
						canvas_id={`canvas-${index}}`}
						image_url={product.images[0]}
						inner_html={product.bodyHtml}
					/>
				))}
			</div>
		</main>
	)
}

export default App
