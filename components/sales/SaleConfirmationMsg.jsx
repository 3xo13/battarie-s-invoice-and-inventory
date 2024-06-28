import React from 'react'
import Image from 'next/image'

const SaleConfirmationMsg = ({saleData, setConfirm, selectedImage}) => {
	// console.log("🚀 ~ SaleConfermationMsg ~ saleData:", saleData)
	const {
		product,
		fee,
		price,
		date,
		inventory,
		mainPaymentMethod,
		mainPayment,
		MixPaymentMethod,
		mixPayment,
		oldBattary,
		customerType,
		companyData,
		carData
	} = saleData

	const {brand, model, year} = carData


	const handleConfirm = () => {
		const formData = new FormData();
		formData.append('image', selectedImage);
		formData.append("salesData", JSON.stringify(saleData))
	}
	return (
		<div className='w-[90%] h-screen flex flex-col items-center gap-5' >
			<Image src={URL.createObjectURL(selectedImage)} width={150} height={150} alt='transaction image' className='w-72 h-72' />
			<div className='w-full flex flex-col gap-2'>
				<div className="formRow">
					<p className="w-1/2">product name</p>
					<p className="w-1/2">{product}</p>
				</div>
				<div className="formRow">
					<p className="w-1/2">Fee</p>
					<p className="w-1/2">{fee}</p>
				</div>
				<div className="formRow">
					<p className="w-1/2">Sell Price</p>
					<p className="w-1/2">{price}</p>
				</div>
				<div className="formRow">
					<p className="w-1/2">{mainPaymentMethod}</p>
					<p className="w-1/2">{mainPayment}</p>
				</div>
				<div className="formRow">
					<p className="w-1/2">{MixPaymentMethod}</p>
					<p className="w-1/2">{mixPayment}</p>
				</div>
				<div className="formRow">
					<p className="w-1/2">Car Brand</p>
					<p className="w-1/2">{brand}</p>
				</div>
				<div className="formRow">
					<p className="w-1/2">Model</p>
					<p className="w-1/2">{model}</p>
				</div>
				<div className="formRow">
					<p className="w-1/2">Year</p>
					<p className="w-1/2">{year}</p>
				</div>
				
			</div>
			<div className='flex flex-row gap-5 p-2'>
				<button className='btn'>Confirm</button>
				<button className='btn' onClick={e => setConfirm(false)}>cancel</button>
			</div>
		</div>
	)
}

export default SaleConfirmationMsg