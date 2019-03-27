import React from 'react'
import { BasketConsumer } from '../contexts/basket'
import { ProductData } from '../collections/product-details'
import { Icon } from '../helpers'
// Product Inspector Modal (View toggled by inspectItem method)
const ProductPreview = () => (
	<BasketConsumer>
	{({ inspect, inspectItem }) => (
		<div className={ isActive(inspect) }>
			<div className="product-preview-card layout--flex">
				<div className="box" onClick={ () => inspectItem() }>{ Icon("close") }</div>
				<div className="box"><span className="el-emoji">{ fromDataCollection(inspect, "emoji") }</span></div>
				<div className="box"><span>{ asModel(inspect, "label") }</span></div>
			</div>
		</div>
	)}
	</BasketConsumer>
)
function asModel(model, param) {
	// helper to extract param from the 'inspect' model
	return model ? model[param] : ""
}
function isActive(state) {
	// class control to show | hide modal
	return state ? "product-modal layout--flex is-active" : "product-modal layout--flex"
}
function fromDataCollection(item, param) {
	// helper fn
	// get more details about the product form the ProductData collection
	if(!item) return ""
	else {
		const model = ProductData.filter(product => product.uid === item.uid).pop()
		return model[param]	
	}
}

export default ProductPreview