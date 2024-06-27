"use client"
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid';

const CarAndBattaryForm = ({ setStandardSize, setUpgradeSize }) => {
    const [allCarsData, setAllCarsData] = useState([]);
    const [carBrands, setCarBrands] = useState([]);
    const [currentBrand, setCurrentBrand] = useState('');
    const [currentBrandModels, setCurrentBrandModels] = useState([]);
    const [currentModel, setCurrentModel] = useState("");
		const [modelYears, setModelYears] = useState([]);
		const [currentYear, setcurrentYear] = useState("");

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
                setAllCarsData(carsList)
                // filter and set cars makers
                const brand = carsList.map(car => car[0])
                const filteredBrands = [...new Set(brand)]
                setCarBrands(filteredBrands)
                setCurrentBrand(filteredBrands[0])
            }
        })()
    }, [])

    useEffect(() => {
        if (currentBrand && allCarsData.length) {
					const filteredModels = allCarsData.filter(carData => carData[0] === currentBrand)
            setCurrentBrandModels(filteredModels)
						setCurrentModel(JSON.stringify(filteredModels[0]))
					setStandardSize(filteredModels[0][4])
					setUpgradeSize(filteredModels[0][5])
        }
    }, [currentBrand])

	useEffect(() => {
		if (currentModel.length) {
			const modelData = JSON.parse(currentModel)
			const yearsRange = modelData[2].split("~")
			const start = yearsRange[0]
			const end = yearsRange[1]
			if(end === ""){
				setModelYears([yearsRange[0]])
				setcurrentYear(yearsRange[0])
			}else{
				const years = [];
				for (let i = +start; i <= +end; i++) {
					years.push(`${i}`)
				}
				setModelYears(years)
				setcurrentYear(years[0])
			}
			
			// setModelYears
		}
	}, [currentModel])

    const carBrandsOptions = carBrands.map(
        brand => <option key={uuidv4()} value={brand}>{brand}</option>
    )

    const currentModelsOptions = currentBrandModels.map(
        model => <option key={uuidv4()} value={JSON.stringify(model)}>{ `${model[1]} (${model[2]})`}</option>
    )

	const yearsOptions = modelYears.map(
		year => <option key={uuidv4()} value={year}>{year}</option>
	)

    return (
        <form
            className='w-full border-t-2 mt-10 pt-10 flex flex-col gap-5 border-gray-100'>
							{/* brand */}
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
						{/* model */}
            <div className='formRow'>
                <label className='w-1/3' htmlFor="carModel">Car Model</label>
                <select
                    name="CarModel"
                    id="CarModel"
                    className='border rounded-sm px-3 py-2 w-1/3'
                    value={currentModel}
                    onChange={e => {
											const modelArray = JSON.parse(e.target.value)
											setStandardSize(modelArray[4])
											setUpgradeSize(modelArray[5])
											return setCurrentModel(e.target.value)}}>
                    {currentModelsOptions}
                </select>
                <div className='w-1/3'></div>
            </div>
						{/* year */}
            <div
                className='formRow'
                style={{
                    border: "none"
                }}>
                <label className='w-1/3' htmlFor="year">Model Year</label>
                <select
                    name="year"
                    id="year"
                    className='border rounded-sm px-3 py-2 w-1/3'
                    value={currentYear}
                    onChange={e => setcurrentYear(e.target.value)}>
										{yearsOptions}
                </select>
                <div className='w-1/3'></div>
            </div>
        </form>
    )
}

export default CarAndBattaryForm