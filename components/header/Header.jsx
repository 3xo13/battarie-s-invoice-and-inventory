import Link from 'next/link'
import React from 'react'

const Header = ({title, otherPageTitle, link}) => {
	return (
		<div className='w-screen h-14 flex flex-row items-center justify-between px-10'>
			<div className="w-1/3 flex flex-row items-center">
				<Link href={link}>
				<p>{"< " + otherPageTitle}</p>
				</Link>
			</div>
			<div className='flex items-center justify-center'><h2>{title}</h2></div>
			<div className="w-1/3"></div>
		</div>
	)
}

export default Header