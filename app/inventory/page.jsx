'use client'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {v4 as uuidv4} from 'uuid';
import Loading from '@/components/general/Loading';
import Header from '@/components/header/Header';
import SearchableSelect from '@/components/general/SearchableSelect';

const InventoryPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

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
            setLoading(true)
            const response = await fetch('/api/auth/validate');
            const cookieValidationResult = await response.json()
            if (!cookieValidationResult.success) {
                setLoading(false)
                router.push('/login')
            }
            setLoading(false)
        })()
    }, [])

    // fetch inventory data and set the state
    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await fetch("/api/inventory/get")
            const data = await response.json()
            // check if the data sheet is not empty (first value are the table headers)
            if (data.success && data.inventoryData.length > 1) {
                setProducts(data.inventoryData.slice(1))
                setCurrentProduct(data.inventoryData[1])
                setCurrentProductName(data.inventoryData[1][0])
                setCurrentProductIndex(1)
                setCellRow(2)
            }
            setLoading(false)
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
            setLoading(true)
            const response = await fetch("/api/inventory/update", {
                method: "POST",
                body: JSON.stringify(
                    {cell: `D${cellRow}`, updateValue: quntity, oldValue: currentProduct[3]}
                )
            })
            const updateResult = await response.json()
			if (updateResult.success) {
				updatePage()
			}
            setLoading(false)
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
            setLoading(false)
        }
    }

		// refetch the inventory data after an update
		const updatePage = async () => {
            setLoading(true)
			setQuntity(0)
            const response = await fetch("/api/inventory/get", { cache: 'no-store' })
			const data = await response.json()
			// check if the data sheet is not empty (first value are the table headers)
			if (data.success && data.inventoryData.length > 1) {
				setProducts(data.inventoryData.slice(1))
				setCurrentProduct(data.inventoryData[currentProductIndex + 1])
                setCurrentProductName(data.inventoryData[currentProductIndex + 1][0])
				setCellRow(currentProductIndex + 2)
                setLoading(false)
				return
			}
            setLoading(false)
		}

        if (loading) {
            return (
                <div className='w-screen h-screen'>
                    <Loading />
                </div>
            )
        }

        const copy = async (text) => {
            await navigator.clipboard.writeText(text)
            alert("copied to clipoard")
        }

    return (
        <div
            className='min-w-screen min-h-screen flex flex-col items-center gap-10 lg:px-32 pb-10'
            onClick={e => setOpen(false)}>
            <Header title={"Inventory"} link={"/"} otherPageTitle={"Sales Data & History"}/>
            {/* update form */}
            <div className='w-full border rounded-sm p-5'>
                <form className='w-full flex flex-col gap-3'>
                    {/* product name (select product)*/}
                    <div className='inputWrapper'>
                        <label htmlFor="" className='w-1/2'>product name</label>
                        <SearchableSelect orgignalList={products} currentItem={currentProduct} setCurrentItem={setCurrentProduct} open={open}/>
                    </div>
                    {/* inventory quantity */}
                    <div className='inputWrapper'>
                        <label htmlFor="" className='w-1/2'>Avaliable Qty</label>
                        <p className="select">{existInInventory}</p>
                    </div>
                    {/* new quantity */}
                    <div className='inputWrapper'>
                        <label htmlFor="" className='w-1/2'>Quntity</label>
                        <input
                            type="number"
                            className='select'
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
            <div className='w-full border rounded-sm p-5 flex flex-col gap-5'>
                <div className='inputWrapper justify-between'>
                    {/* <h3 className='header'>Account IBAN:</h3> */}
                    <p className='select'>SA9780000503608010130104</p>
                    <button className="btn" onClick={e => copy("SA9780000503608010130104")}>Copy</button>
                </div>
                <div className='inputWrapper justify-between'>
                    {/* <h3 className='header'>Account number:</h3> */}
                    <p className='select'>503608010130104</p>
                    <button className="btn" onClick={e => copy("503608010130104")}>Copy</button>
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