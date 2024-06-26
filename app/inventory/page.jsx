'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const InventoryPage = () => {
	const router = useRouter()
	// validate session token
	useEffect(() => {
		(async () => {
			const response = await fetch('/api/auth/validate');
			const cookieValidationResult = await response.json()
			if (!cookieValidationResult.success) {
				console.log(cookieValidationResult.validation_error);
				router.push('/login')
			}
		})()
	}, [])

	return (
		<div className = 'min-w-screen min-h-screen flex flex-col items-center gap-10 px-32 py-10'>
			{/* update form */}
			<div className='w-full border rounded-sm p-5'>
				<form className='w-full flex flex-col gap-3'>
					<div className='w-full flex flex-row justify-between'>
						<label htmlFor="" className='w-1/2'>product info to be edited</label>
						<input type="text" className='w-1/2'/>
					</div>
					<div className='w-full flex flex-row justify-between'>
						<label htmlFor="" className='w-1/2'>product info to be edited</label>
						<input type="text" className='w-1/2'/>
					</div>
					<div className='w-full flex flex-row justify-between'>
						<label htmlFor="" className='w-1/2'>product info to be edited</label>
						<input type="text" className='w-1/2'/>
					</div>
					<div className='w-full flex flex-row justify-between'>
						<label htmlFor="" className='w-1/2'>product info to be edited</label>
						<input type="text" className='w-1/2'/>
					</div>
					<div className='w-full flex flex-row justify-between'>
						<label htmlFor="" className='w-1/2'>product info to be edited</label>
						<input type="text" className='w-1/2'/>
					</div>
					<div className='w-full flex justify-center'>
						<button className='btn bg-green-400 w-1/3'>Submit</button>
					</div>
				</form>
			</div>
			{/* payment data */}
			<div className='w-full border rounded-sm p-5'>
				<div className='w-full flex flex-row justify-between'>
					<h3>account number:</h3>
					<p>account number value</p>
					<button className="btn">copy</button>
				</div>
				<div className='w-full flex flex-row justify-between'>
					<h3>account number:</h3>
					<p>account number value</p>
					<button className="btn">copy</button>
				</div>
			</div>
			{/* main website link */}
			<div>
				<a href="https://batteryswapsa.com/">
					<button className='btn'>Main Website</button>
				</a>
			</div>
		</div>
	)
}

export default InventoryPage