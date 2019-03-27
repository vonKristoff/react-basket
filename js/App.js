import React, { createContext } from 'react'
import { BasketProvider } from './contexts/basket'
import Basket from './components/basket'
import ProductPreview from './components/product-preview'
class App extends React.Component {
	render() {
		return (
			<BasketProvider>
				<Basket />
				<ProductPreview />
			</BasketProvider>
		)
	}
}
export default App