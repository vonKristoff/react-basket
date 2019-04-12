import React from 'react'
import { BasketConsumer } from '../contexts/basket'
import Product from './product'
import { Icon } from '../helpers'
// Main Shopping Basket
const Basket = (props) => (
	<BasketConsumer>
	{({ basketItems, action, currency, total }) => (	
		<div className="basket-component layout--flex">
			<div className="basket-card-container layout--flex-column">
				<div className="basket-head"><span>Shopping Basket</span></div>
				<div className="basket-body layout--flex-column">{ productsReducer(basketItems) }</div>
				<div className="basket-foot layout--flex">
					<div className="box">
						<span className="el-total">{ getTotalByCurrency(currency, total) }</span>
					</div>
					<div className="box">
						<div className="is-button--simple" onClick={ () => action("clear") }>Clear</div>
					</div>
					<div className="box">
						<div className="is-button--submit">Check Out { Icon("chevron") }</div>
					</div>
				</div>
			</div>
		</div>
	)}
	</BasketConsumer>
)
function productsReducer(collection) {
	// return products collection
	return collection.length > 0 ? collection.map(product => <Product model={ product } key={ product.uid } />) : <h1>You have no items in your basket</h1>
}
function getTotalByCurrency(currency, total) {
	return `${currency} ${total}`
}

export default Basket