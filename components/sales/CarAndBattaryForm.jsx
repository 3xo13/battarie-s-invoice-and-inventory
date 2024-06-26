import React from 'react'

const CarAndBattaryForm = () => {
	return (
		<form className='flex flex-col w-full gap-5'>
			<div className='flex flex-row flex-nowrap gap-5 '>
				<label className='w-1/3' htmlFor="CarBrand">Car Brand</label>
				<select
					name="CarBrand"
					id="CarBrand"
					className='bg-black border rounded-sm px-3 py-2 w-1/3'>
					<option value="test1">test1</option>
					<option value="test2">test2</option>
				</select>
				<div className='w-1/3'></div>
			</div>
			<div className='flex flex-row flex-nowrap gap-5 '>
				<label className='w-1/3' htmlFor="carModel">Car Model</label>
				<input className='textInput' type="text" id='carModel' />
				<div className='w-1/3'></div>
			</div>
			<div className='flex flex-row flex-nowrap gap-5 '>
				<label className='w-1/3' htmlFor="year">Model Year</label>
				<input className='textInput' type="text" id='year' />
				<div className='w-1/3'></div>
			</div>
		</form>
	)
}

export default CarAndBattaryForm