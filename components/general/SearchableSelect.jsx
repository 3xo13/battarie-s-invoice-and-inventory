'use client'
import React, {useEffect, useState} from 'react'
import {searchArrays} from '@/javascript/searchArray';
import { v4 as uuidv4 } from 'uuid';

const SearchableSelect = ({orgignalList, currentProduct, setCurrentProduct}) => {
    const [openList, setOpenList] = useState(false);
    const [currentList, setcurrentList] = useState(orgignalList);
    const [searchInput, setSearchInput] = useState("");

		useEffect(() => {
			if (orgignalList.length) {
				setcurrentList(orgignalList)
			}
		},[orgignalList])

    useEffect(() => {
        if (searchInput === "") {
            setcurrentList(orgignalList)
        } else {
            const filteredList = searchArrays(orgignalList, searchInput)
            setcurrentList(filteredList)
        }
    }, [searchInput])

    const productOptions = currentList.length
        ? currentList.map(
            prod => <p
                key={uuidv4()}
                onClick={e => setCurrentProduct(prod)}
                className='cursor-pointer border-b-2'>{`${prod[1]} | ${prod[0]}`}</p>
        )
        : []

    return (
        <div
            className='select relative group bg-red-100 cursor-pointer'
            onClick={e => setOpenList(!openList)}>
            {currentProduct[0]}
            <div
                className={`flex-col w-full top-0 left-0 ${openList
                    ? "flex"
                    : "hidden"} absolute bg-slate-50 px-3`}>
                <input
                    type="text"
                    className='w-full p-2'
                    autoFocus={true}
										onChange={e => setSearchInput(e.target.value)}
                    onClick={e => e.stopPropagation()}/> {productOptions}
            </div>
        </div>
    )
}

export default SearchableSelect