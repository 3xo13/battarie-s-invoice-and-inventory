import React from 'react'

const ProductAndPaymentForm = () => {
	return (
		<form className='flex flex-col w-full gap-5'>
			<div className='flex flex-row flex-nowrap gap-5 '>
				<label className='w-1/3' htmlFor="ProductName">Product Name</label>
				<select
					name="ProductName"
					id="ProductName"
					className='bg-black border rounded-sm px-3 py-2 w-1/3'>
					<option value="test1">test1</option>
					<option value="test2">test2</option>
				</select>
				<div className='w-1/3'></div>
			</div>
			<div className='flex flex-row flex-nowrap gap-5 '>
				<label className='w-1/3' htmlFor="price">price</label>
				<input className='textInput' type="text" id='price' />
				<div className='w-1/3'></div>
			</div>
			<div className='flex flex-row flex-nowrap gap-5 '>
				<label className='w-1/3' htmlFor="Fee">Fee</label>
				<input className='textInput' type="text" id='Fee' />
				<select
					name="ProductName"
					id="ProductName"
					className='bg-black border rounded-sm px-3 py-2 w-1/3'>
					<option value="test1">test1</option>
					<option value="test2">test2</option>
				</select>
			</div>
			<div className='flex flex-row flex-nowrap gap-5 '>
				<label className='w-1/3' htmlFor="MixPayment">Mix Payment</label>
				<input className='textInput' type="text" id='MixPayment' />
				<select
					name="ProductName"
					id="ProductName"
					className='bg-black border rounded-sm px-3 py-2 w-1/3'>
					<option value="test1">test1</option>
					<option value="test2">test2</option>
				</select>
			</div>
			<div className='flex flex-row flex-nowrap gap-5 '>
				<label className='w-1/3' htmlFor="CustomerType">Customer Type</label>
				<div className='flex flex-row gap-2'>
					<div className='flex flex-row gap-2'>
						<input className='' type="radio" id='CustomerType' value={'presonal'} />
						<label htmlFor="presonal">presonal</label>
					</div>
					<div className='flex flex-row gap-2'>
						<input className='' type="radio" id='CustomerType' value={'company'} />
						<label htmlFor="company">company</label>
					</div>
					<div className='w-1/3'></div>
				</div>
			</div>
		</form>
	)
}

export default ProductAndPaymentForm