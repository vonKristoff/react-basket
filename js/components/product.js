import React from 'react'
import { BasketConsumer } from '../contexts/basket'
import { Icon } from '../helpers'
// ACCESSIBLITY NOTICE -- it would be good practice to allow for user to enter quantities through a input field, rather than relying on clicks to increment.
// I haven't done it because of time - but it is ready to be integrated
// import InputField from './input-field' 

// Product (item row in Basket collection)
const Product = ({ model }) => (
	<BasketConsumer>
	{({ action, inspectItem, currency }) => (
		<div className="product-component layout--flex">
			<div className="box" onClick={ () => inspectItem(model) }>{ Icon("eye") }</div>
			<div className="box"><span>{ model.label }</span></div>
			<div className="box layout--flex">
				<div className="el-less" onClick={ () => action("remove", model) }>{ Icon("minus") }</div>
				<div className="el-quantity"><span>{ model.quantity }</span></div>
				<div className="el-more" onClick={ () => action("add", model) }>{ Icon("plus") }</div>
			</div>
			<div className="box"><span className="el-price">{ getPrice(model.price, currency) }</span></div>
			<div className="box">
				<div className="is-button--icon" onClick={ () => action("delete", model) }>{ Icon("remove") }</div>
			</div>
		</div>
	)}
	</BasketConsumer>
)
function getPrice(price, currency) {
	return `${currency}${price}`
}
export default Product