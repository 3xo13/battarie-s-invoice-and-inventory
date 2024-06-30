import Image from 'next/image'
import React from 'react'

const page = () => {
	return (
		<div className='w-screen h-screen flex flex-col bg-red-100'>
			<div className='w-full flex flex-row'>
				<div className='w-2/12 flex items-center justify-end'>
					<Image src={"/img/batteryswap-logo.png"} width={50} height={50} alt='batteryswap logo' />
				</div>
				<div className='w-8/12 flex flex-col bg-red-500'>
					<p className='templateFont w-full'>Abdulaziz Abdullah Al Hurr Establishment for Commercial Services</p>
					<p className='templateFont w-full'>Prince Moham</p>
					<p className='templateFont w-full'>Muslim bin Qais</p>
					<p className='templateFont w-full'>Dammam 32241</p>
					<p className='templateFont w-full'>Saudi Arabia</p>
				</div>
				<div className='w-2/12 flex items-center justify-start'>
					<p className='templateFont bold text-xl'>Battery Swap</p>
				</div>
			</div>
		</div>
	)
}

export default page