'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {v4 as uuidv4} from 'uuid';
import {letters} from '@/javascript/letters';

const InventoryPage = () => {
    const router = useRouter()
	//const [updateSwitch, setupdateSwitch] = useState([]);
    const [sheetHeaders, setSheetHeaders] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState([]);
    const [currentProductName, setCurrentProductName] = useState("");
	const [currentProductIndex, setCurrentProductIndex] = useState(1);
    const existInInventory = currentProduct.length ? currentProduct[3] : ""

    const [quntity, setQuntity] = useState(0);
    const [cellRow, setCellRow] = useState(0);

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

    // fetch inventory data and set the state
    useEffect(() => {
        (async () => {
            const response = await fetch("/api/inventory/get")
            const data = await response.json()
            // check if the data sheet is not empty (first value are the table headers)
            if (data.success && data.inventoryData.length > 1) {
                setProducts(data.inventoryData.slice(1))
                setCurrentProduct(data.inventoryData[1])
                setCurrentProductName(data.inventoryData[1][0])
                setCurrentProductIndex(1)
                setSheetHeaders(data.inventoryData[0])
                setCellRow(2)
                return
            }
            console.log("🚀 ~ error accured while fetching inventory data")
        })()
    }, [])

    // set the current product based on current product name set by the user selection
    useEffect(() => {
        if (currentProductName && products.length) {
            setCurrentProduct(...products.filter((prod, index) => {
                if (prod[0] === currentProductName) {
                    setCurrentProductIndex(index)
                    // google sheet counts from 1 and the first cell is the headers
                    setCellRow(index + 2)
                    return prod
                }
                return null;
            }))
        }
    },[currentProductName])

    // submit the change to the backend
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (quntity < 1) {
            return;
        }
        try {
            const response = await fetch("/api/inventory/update", {
                method: "POST",
                body: JSON.stringify(
                    {cell: `D${cellRow}`, updateValue: quntity, oldValue: currentProduct[3]}
                )
            })
            const updateResult = await response.json()
            console.log("🚀 ~ handleSubmit ~ updateResult:", updateResult)
						if (updateResult.success) {
							updatePage()
						}
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)

        }
    }

		// refetch the inventory data after an update
		const updatePage = async () => {
			setQuntity(0)
			const response = await fetch("/api/inventory/get")
			const data = await response.json()
			// check if the data sheet is not empty (first value are the table headers)
			if (data.success && data.inventoryData.length > 1) {
				setProducts(data.inventoryData.slice(1))
				setCurrentProduct(data.inventoryData[currentProductIndex + 1])
                setCurrentProductName(data.inventoryData[currentProductIndex + 1][0])
				setCellRow(currentProductIndex + 2)
				return
			}
		}

    // create options list from the products data (product name)
    const productOptions = products.length
        ? products.map(
            (prod, index) => <option
                key={uuidv4()}
                value={prod[0]}
                >{prod[0]}</option>
        )
        : []

    return (
        <div
            className='min-w-screen min-h-screen flex flex-col items-center gap-10 px-32 py-10'>
            {/* update form */}
            <div className='w-full border rounded-sm p-5'>
                <form className='w-full flex flex-col gap-3'>
                    {/* product name (select product)*/}
                    <div className='w-full flex flex-row justify-between'>
                        <label htmlFor="" className='w-1/2'>product name</label>
                        <select name="product" id="product" className='w-1/2'
                        value={currentProductName}
                            onChange={e => {
                                setCurrentProductName(e.target.value)
                            }}>
                            {productOptions}
                        </select>
                    </div>
                    {/* inventory quantity */}
                    <div className='w-full flex flex-row justify-between'>
                        <label htmlFor="" className='w-1/2'>Avaliable Qty</label>
                        <p className="w-1/2">{existInInventory}</p>
                    </div>
                    {/* new quantity */}
                    <div className='w-full flex flex-row justify-between'>
                        <label htmlFor="" className='w-1/2'>Quntity</label>
                        <input
                            type="number"
                            className='w-1/2'
                            value={quntity}
                            onChange={e => setQuntity(e.target.value)}
                            min={0}/>
                    </div>
                    {/* submit */}
                    <div className='w-full flex justify-center'>
                        <button className='btn bg-green-400 w-1/3' onClick={e => handleSubmit(e)}>Submit</button>
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