import React from 'react'
// reusable basic JSX mixins
export function Icon(type) {
	const className = `is-button fa--${type}`
	return (<div className={ className }></div>)
}