import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const SelectStr = ({arrayOfOptions, selectState, setSelectSatae}) => {
	const [optionsArray, setOptionsArray] = useState([])
	useEffect(() => {
		if (arrayOfOptions.length) {
			setOptionsArray(arrayOfOptions)
		}
	},[arrayOfOptions])
	const optionsList =  optionsArray.length
		? optionsArray.map(
			optionStr => <option key={uuidv4()} value={optionStr} >{optionStr}</option>
		)
		: []

		return (
			<select
				// name="ProductName"
				// id="ProductName"
				className='select'
				value={selectState}
				onChange={e => setSelectSatae(e.target.value)}>
				{optionsList}
			</select>
		)
}

export default SelectStr