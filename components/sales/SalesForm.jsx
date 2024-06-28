'use client'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import CarAndBattaryForm from './CarAndBattaryForm';
import BattarysInfo from './BattarysInfo';
import { getFormatedDate } from '@/javascript/getFormatedDate';
import SaleConfermationMsg from './SaleConfirmationMsg';

const SalesForm = ({ products, setConfirmingSale, setConfirmingSaleData, setSelectedImage, selectedImage }) => {
	const [currentProduct, setCurrentProduct] = useState([])
	const [paymentMethods, setPaymentMethods] = useState([])
	const [productCost, setProductCost] = useState(0)
	const [productPrice, setProductPrice] = useState(0)
	const [currentProductName, setCurrentProductName] =  useState('')
	

	// product data
	const [price, setPrice] = useState(productPrice)
	const [fee, setFee] = useState(60)
	const [mixPayment, setMixPayment] = useState(0)
	const [mainPaymentMethod, setMainPaymentMethod] = useState('Cash')
	const [MixPaymentMethod, setMixPaymentMethod] = useState('Cash')
	const [customerType, setCustomerType] = useState('personal')

	//company data
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [zipCode, setZipCde] = useState('')
	const [vatNumber, setVatNumber] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	
	
	// car data
	const [carData, setCarData] = useState({})
	const [isChecked, setIsChecked] = useState(false);

	// other states
	const [errMsg, setErrMsg] = useState("");


	// set current product when the products data is recived
	useEffect(() => {
		if (products.length) {
			setCurrentProduct(products[0])
			setPrice(products[0][1])
		}
	}, [products])

	// set current product's name, cost and price
	useEffect(() => {
		if (currentProduct.length) {
			setCurrentProductName(currentProduct[0])
			setProductCost(currentProduct[2])
			setProductPrice(currentProduct[1])
		}
	}, [currentProduct])

	// get payment options
	useEffect(() => {
		(async () => {
			const response = await fetch("/api/payment/get")
			const paymentData = await response.json()
			if (paymentData.success) {
				setPaymentMethods(paymentData.paymentMethods.slice(1))
			}
		})()
	}, [])

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setSelectedImage(file);
	};

	// procces data and submit the form
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectedImage) {
			setErrMsg("you must upload an image of the transaction")
			return;
		}
		const formattedDate = getFormatedDate()

		const companyDataObject = {
			name,
			address,
			zipCode,
			vatNumber,
			email,
			phone
		}
		
		const saleData = {
			product: currentProductName,
			fee,
			price: productPrice,
			date: formattedDate,
			inventory: currentProduct[3],
			mainPaymentMethod,
			mainPayment: productPrice,
			MixPaymentMethod,
			mixPayment,
			oldBattary: isChecked ? "25" : "",
			customerType,
			companyData: companyDataObject,
			carData
		}
	
		setConfirmingSaleData(saleData)
		setConfirmingSale(true)
		
		
	}


	const productOptions = products.length
		? products.map(prod => <option key={uuidv4()} defaultValue={prod[0]}>{prod[0]}</option>
		)
		: []


	const mainPaymentMethodOptions = paymentMethods.length
		? paymentMethods.map(
			payment => <option key={uuidv4()} value={payment}>{payment}</option>
		)
		: []

	const mixPaymentMethodOptions = paymentMethods.length
		? paymentMethods.map(
			payment => <option key={uuidv4()} value={payment}>{payment}</option>
		)
		: []


	return (
		<div className='w-full flex flex-col items-center justify-center'>
			{/* {confermingSale && selectedImage ? <SaleConfermationMsg saleData={confermingSaleData} imgUrl={URL.createObjectURL(selectedImage)} setConferm={setConfirmingSale} /> : null} */}
			<div className='w-full border-2 border-gray-300 rounded-sm p-5 flex flex-col gap-5'>
		<form className='flex flex-col w-full gap-5'>
			{/* product name (product select) */}
			<div className='formRow'>
				<label className='w-1/3' htmlFor="ProductName">Product Name</label>
				<select
					name="ProductName"
					id="ProductName"
					className='select'
					value={currentProductName}
					// hande change of the product name (set current product and price)
							onChange={e => {
								const filteredProduct = products.filter(prod => prod[0] == e.target.value)
								setPrice(filteredProduct[0][1])
								return setCurrentProduct(...filteredProduct)}}>
					{productOptions}
				</select>
				<div className='w-1/3'></div>
			</div>
			{/* product price and cost (product price select) */}
			<div className='formRow'>
				<label className='w-1/3' htmlFor="price">{`Price (${price})`}</label>
				<input className='textInput' type="number" id='price' 
							value={+productPrice} min={0} onChange={e => setProductPrice(e.target.value)}/>
				<p className='w-1/3'>{productCost}</p>
			</div>
			{/* fee (addetional charges) */}
			<div className='formRow'>
				<label className='w-1/3' htmlFor="Fee">Fee (60)</label>
				<input className='textInput' type="number" id='fee' defaultValue={fee} min={0} onChange={e => setMixPayment(e.target.value)} />
				<select
					name="ProductName"
					id="ProductName"
					className='select'
					value={mainPaymentMethod}
					onChange={e => setMainPaymentMethod(e.target.value)}>
					{mainPaymentMethodOptions}
				</select>
			</div>
			{/* mix payment (secondary payment option) */}
			<div className='formRow'>
				<label className='w-1/3' htmlFor="MixPaymentMethod">Mix Payment</label>
				<input className='textInput' type="text" 
				id='MixPaymentMethod' 
				defaultValue={mixPayment} 
				min={0} 
				onChange={e => setMixPayment(e.target.value)} />
				<select
					name="ProductName"
					id="ProductName"
					className='select'
					value={MixPaymentMethod}
					onChange={e => setMixPaymentMethod(e.target.value)}>
					{mixPaymentMethodOptions}
				</select>
			</div>
			{/* image */}
				<div className='formRow'>
					<label htmlFor="image" className='w-1/3'>Upload an Image</label>
						<input type="file" onChange={handleImageChange} className='textInput' accept="image/png, image/gif, image/jpeg" required={true}/>
				</div>
			{/* customer type (personal or company) */}
					<div className='formRow' style={{ border: customerType === "personal" ? "none" : "" }}>
				<label className='w-1/3' htmlFor="CustomerType">Customer Type</label>
				<div className='flex flex-row gap-2'>
					<div className='flex flex-row gap-2'>
						<input className='' 
						type="radio" 
						id='CustomerType' 
							value={'personal'} 
							checked={customerType === "personal"}
							onChange={e => setCustomerType(e.target.value)}
						/>
						<label htmlFor="personal">Personal</label>
					</div>
					<div className='flex flex-row gap-2'>
						<input className='' 
						type="radio" 
						id='CustomerType' 
						value={'company'} 
							checked={customerType === "company"}
						onChange={e => setCustomerType(e.target.value)}
						/>
						<label htmlFor="company">Company</label>
					</div>
					<div className='w-1/3'></div>
				</div>
			</div>
			{/* company form (rendered condetionaly) */}
			{customerType === "company" ?
			<div className='flex flex-col w-full gap-3'>
					<div className='formRow'>
						<label htmlFor="name" className='w-1/3'>Name</label>
						<input type="text" className='companyTextInput' onChange={e => setName(e.target.value)} value={name}/>
					</div>
					<div className='formRow'>
						<label htmlFor="address" className='w-1/3'>Address</label>
						<input type="text" className='companyTextInput' onChange={e => setAddress(e.target.value)} value={address}/>
					</div>
					<div className='formRow'>
						<label htmlFor="zipCode" className='w-1/3'>Zip Code</label>
						<input type="text" className='companyTextInput' onChange={e => setZipCde(e.target.value)} value={zipCode}/>
					</div>
					<div className='formRow'>
						<label htmlFor="vatNumber" className='w-1/3'>VAT Number</label>
						<input type="text" className='companyTextInput' onChange={e => setVatNumber(e.target.value)} value={vatNumber}/>
					</div>
					<div className='formRow'>
						<label htmlFor="email" className='w-1/3'>Email</label>
						<input type="email" className='companyTextInput' onChange={e => setEmail(e.target.value)} value={email}/>
					</div>
							<div className='formRow' style={{ border: "none" }}>
						<label htmlFor="phone" className='w-1/3'>Phone</label>
						<input type="text" className='companyTextInput' onChange={e => setPhone(e.target.value)} value={phone}/>
					</div>
			</div> 
			: null}
		</form>
		<CarAndBattaryForm setCarData={setCarData}/>
		<BattarysInfo standardSize={carData.standardSize} upgradeSize={carData.upgradeSize}/>
				<div className='formRow' style={{ border: "none" }}>
					<label htmlFor="oldBattery" className='w-1/3'>Old Battary</label>
					<div className='w-1/3'>
						<input
							type="checkbox"
							checked={isChecked}
							onChange={() => setIsChecked(!isChecked)}
						/>

					</div>
				</div>
		</div>
			
			<div className='w-full p-5'>
				<div className='w-full flex flex-col items-center'>
					<button className='btn w-1/2 bg-green-400' onClick={handleSubmit}>Submit</button>
				</div>
			</div>
		</div>
		
	)
}

export default SalesForm