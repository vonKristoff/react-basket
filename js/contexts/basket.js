import React, { createContext } from 'react'
import { Drinks, Prices } from '../collections/stock'

const BasketContext = createContext()
const BasketConsumer = BasketContext.Consumer

// Items already added to Cart => could come from cache
const UserQuantityLookup = {
	"weak-key-mountain": 4,	
	"weak-key-desperate": 2,	
	"weak-key-daniel": 4,
	"weak-key-oat": 1
}
const CurrencyLookup = {
	"euro": "€",
	"sterling": "£"
}

class BasketProvider extends React.Component {
	state = {
		store: [],			// in cart items
		currency: "euro",	// currency type (change to any currency available in the Prices lookup)
		inspect: false		// context for 'inspected' item for modal product preview
	}
	componentDidMount = () => {
		// we could hit an API at this point to Fetch the results, or retrieve from LocalStorage
		this.setState(state => { 
			return { store: initBasketCollection(Drinks) }
		})
	}
	itemCRUD = (action, item = false) => {
		// handles all the CRUD the item in the basket could wish for
		this.setState(state => { 
			const ids = state.store.map(model => model.uid)
			const index = item ? ids.indexOf(item.uid) : false
			return action === "add" ? { store: incrementItem(state.store, index) } 
			: action === "remove" 	? { store: decrementItem(state.store, index) } 
			: action === "clear" 	? { store: clearAllQuantities(state.store) }
			: action === "delete"	? { store: removeItemByIndex(state.store, index) }
			: { store: state.store }
		})
	}
	inspectItem = (item = false) => {
		// sets the item if clicked from basket || closes the modal inspector if clicked from modal (item = false)
		this.setState(state => { 
			return { inspect: item }
		})	
	}
	render = () => {
		// generate the API context methods and resources here
		const children = this.props.children
		const basketItems = basketItemsByPrice(this.state.store, this.state.currency)
		const context = {
			basketItems: basketItems,
			action: this.itemCRUD,
			total: getTotal(basketItems),
			currency: CurrencyLookup[this.state.currency],
			inspect: this.state.inspect,
			inspectItem: this.inspectItem
		}
		return (
			<BasketContext.Provider value={ context }>
			{ children }
			</BasketContext.Provider>
		)
	}
}
function incrementItem(collection, index) {
	const update = [...collection]
	update[index].quantity += 1
	return update
}
function decrementItem(collection, index) {
	const update = [...collection]
	let quantity = update[index].quantity -= 1
	if(quantity < 0) quantity = 0
	update[index].quantity = quantity
	return update
}
function clearAllQuantities(collection) {
	return collection.map(item => {
		item.quantity = 0
		return item
	})
}
function removeItemByIndex(collection, index) {
	const update = [...collection]
	update.splice(index, 1)
	return update
}
function initBasketCollection(collection) {
	// merge raw product list with prices list (could come from different APIs)
	return collection.map(item => {
		let quantity = UserQuantityLookup[item.uid]
		return { ...item, quantity }
	})
}
function basketItemsByPrice(collection, type) {
	// set the currency price for the item
	if(collection !== undefined) {
		return collection.map(item => {
			const price = Prices[item.uid][type]
			return { ...item, price }
		})
	} else {
		return []
	}
}
function getTotal(collection) {
	// add up the total cost of the items in the basket
	let total =  collection.reduce((accum, item) => {
		const groupCost = item.price * item.quantity
		accum += groupCost
		return accum
	}, 0)
	return total.toFixed(2)
}

export { BasketProvider, BasketConsumer }