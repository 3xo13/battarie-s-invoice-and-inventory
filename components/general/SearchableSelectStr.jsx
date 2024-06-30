'use client'
import React, { useEffect, useState } from 'react'
import { searchArrays } from '@/javascript/searchArray';
import { v4 as uuidv4 } from 'uuid';

const SearchableSelectStr = ({ orgignalList, currentItem, setCurrentItem, open }) => {
	const [openList, setOpenList] = useState(false);
	const [currentList, setcurrentList] = useState(orgignalList);
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		if (orgignalList.length) {
			setcurrentList(orgignalList)
		}
	}, [orgignalList])

	useEffect(() => {
		if (searchInput === "") {
			setcurrentList(orgignalList)
		} else {
			const filteredList = searchArrays(orgignalList, searchInput)
			setcurrentList(filteredList)
		}
	}, [searchInput])

	useEffect(() => {
			setOpenList(false)
	},[open])

	const productOptions = currentList.length
		? currentList.map(
			item => <p
				key={uuidv4()}
				onClick={e => setCurrentItem(item)}
				className='cursor-pointer border-b-2'>{item}</p>
		)
		: []

	return (
		<div
			className='select relative group bg-red-100 cursor-pointer'
			onClick={e => {
				e.stopPropagation()
				return setOpenList(!openList)
				}}>
			{currentItem}
			<div
				className={`flex-col w-full top-0 left-0 ${openList
					? "flex"
					: "hidden"} absolute bg-slate-50 px-3`}>
				<input
					type="text"
					className='w-full p-2'
					autoFocus={true}
					onChange={e => setSearchInput(e.target.value)}
					onClick={e => e.stopPropagation()} /> {productOptions}
			</div>
		</div>
	)
}

export default SearchableSelectStr