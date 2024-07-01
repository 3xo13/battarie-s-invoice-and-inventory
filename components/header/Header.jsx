import Link from 'next/link'
import React from 'react'

const Header = ({title, otherPageTitle, link}) => {
	return (
		<div className='w-screen h-14 flex flex-row items-center justify-between px-10 border-b-2 border-gray-300'>
			<div className="lg:w-1/3 w-1/2 flex flex-row lg:items-center items-end">
				<Link href={link}>
				<p>{"< " + otherPageTitle}</p>
				</Link>
			</div>
			<div className='flex items-center lg:justify-center justify-end lg:w-1/3 w-1/2 '><h2>{title}</h2></div>
			<div className="w-1/3 hidden lg:flex"></div>
		</div>
	)
}

export default Header