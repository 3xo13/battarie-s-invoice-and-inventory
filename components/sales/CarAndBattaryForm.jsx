"use client"
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid';

const CarAndBattaryForm = () => {
    const [carsInfo, setCarsInfo] = useState([]);
    const [carBrands, setCarBrands] = useState([]);
    const [currentBrand, setCurrentBrand] = useState('');
    console.log("🚀 ~ CarAndBattaryForm ~ currentBrand:", currentBrand)

    // get cars and battaries info
    useEffect(() => {
        (async () => {
            const response = await fetch("/api/carInfo/get")
            const carsData = await response.json()
            if (carsData.success) {
                // set cars data
                const carsList = carsData
                    .carsData
                    .slice(1)
                setCarsInfo(carsList)
                // filter and set cars makers
                const brand = carsList.map(car => car[0])
                const filteredBrands = [...new Set(brand)]
								setCarBrands(filteredBrands)
								setCurrentBrand(filteredBrands[0])
            }
        })()
    }, [])

    const carBrandsOptions = carBrands.map(
        brand => <option key={uuidv4()} value={brand}>{brand}</option>
    )

    return (
        <form
            className='w-full border-t-2 mt-10 pt-10 flex flex-col gap-5 border-gray-100'>
            <div className='formRow'>
                <label className='w-1/3' htmlFor="CarBrand">Car Brand</label>
                <select
                    name="CarBrand"
                    id="CarBrand"
                    className='border rounded-sm px-3 py-2 w-1/3'
										value={currentBrand}
										onChange={e => setCurrentBrand(e.target.value)}>
                    {carBrandsOptions}
                </select>
                <div className='w-1/3'></div>
            </div>
            <div className='formRow'>
                <label className='w-1/3' htmlFor="carModel">Car Model</label>
                <input className='textInput' type="text" id='carModel'/>
                <div className='w-1/3'></div>
            </div>
            <div
                className='formRow'
                style={{
                    border: "none"
                }}>
                <label className='w-1/3' htmlFor="year">Model Year</label>
                <input className='textInput' type="text" id='year'/>
                <div className='w-1/3'></div>
            </div>
        </form>
    )
}

export default CarAndBattaryForm