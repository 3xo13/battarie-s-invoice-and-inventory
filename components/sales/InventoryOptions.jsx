"use client"
import React, {useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid';

export const InventoryOptions = ({products, bonus}) => {
    const [historyData, setHistoryData] = useState([]);
    let cashHistory;
    let bonusHistory;
    if (historyData.length && historyData.length >= 13) {
        cashHistory = historyData[13]
        bonusHistory = historyData[12]
    }

    const [currentProduct, setCurrentProduct] = useState("");
    const price = currentProduct
        ? JSON.parse(currentProduct)[2]
        : 0

        // form data
    const [bonusDeductionAmount, setBonusDeductionAmount] = useState(bonus);
    const [cashDeposite, setCashDeposite] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("/api/sales/get/lastRow", {cache: "no-store"})
                const historyDataRequest = await response.json()
                if (historyDataRequest.success) {
                    setHistoryData(historyDataRequest.historyData)
                }
            } catch (error) {
                console.log("🚀 ~ error:", error)
            }
        })()
    }, [])

    useEffect(() => {
        if (products.length) {
            setCurrentProduct(JSON.stringify(products[0]))
        }
    }, [products])

    const handleBonusDeduct = async () => {
        if (bonusDeductionAmount === 0) {
            return;
        }
        try {
            const response = await fetch("/api/sales/update/bonus",{
                method: "POST",
                body: JSON.stringify({ deductAmount: bonusDeductionAmount})
            })
            const reslut = await response.json()
            console.log("🚀 ~ handleBonusDeduct ~ reslut:", reslut)
            // if (reslut.success) {
                
            // }
        } catch (error) {
            console.log("🚀 ~ handleBonusDeduct ~ error:", error)
            
        }
    }

    const handleProductBuying = async () => {
        if (price === 0) {
            return;
        }
        try {
            const response = await fetch("/api/sales/update/buy", {
                method: "POST",
                body: JSON.stringify({ product: currentProduct })
            })
            const reslut = await response.json()
            console.log("🚀 ~ handleProductBuying ~ reslut:", reslut)
            // if (reslut.success) {

            // }
        } catch (error) {
        console.log("🚀 ~ handleProductBuying ~ error:", error)

        }
    }

    const handleCashDeposite = async () => {
        if (cashDeposite === 0) {
            return;
        }
        try {
            const response = await fetch("/api/sales/update/deposite", {
                method: "POST",
                body: JSON.stringify({ depositeAmount: cashDeposite })
            })
            const reslut = await response.json()
            console.log("🚀 ~ handleCashDeposite ~ reslut:", reslut)
            // if (reslut.success) {

            // }
        } catch (error) {
        console.log("🚀 ~ handleCashDeposite ~ error:", error)

        }
    }

    const productOptions = products.length
        ? products.map(
            prod => <option key={uuidv4()} value={JSON.stringify(prod)}>{prod[0]}</option>
        )
        : []

    return (
        <div className='w-full border rounded-sm p-5 flex flex-col gap-5'>
            {/* inventory data (i think) */}
            <div className='flex flex-col gap-3'>
                <div className='w-full flex flex-row'>
                    <h3 className='w-1/3'>Total cash payment</h3>
                    <p className='w-1/3'>{cashHistory}</p>
                    <div className='w-1/3'></div>
                </div>
                <div className='w-full flex flex-row'>
                    <h3 className='w-1/3'>Total bonus</h3>
                    <p className='w-1/3'>{bonusHistory}</p>
                    <div className='w-1/3'></div>
                </div>
                <div className='w-full flex flex-row'>
                    <h3 className='w-1/3'>Bonus Deduction Amount</h3>
                    <input
                        type="number"
                        name="deductAmount"
                        id="deductAmount"
                        className="textInput"
                        value={bonusDeductionAmount}
                        onChange={e => setBonusDeductionAmount(e.target.value)}
                        min={0}
                        max={bonusHistory}/>
                    <div className='w-1/3'></div>
                </div>
                <div className='w-full flex'>
                    <button className='btn bg-green-400' onClick={handleBonusDeduct}>Submit</button>
                </div>
            </div>
            {/* battary buy */}
            <div className='flex flex-col gap-3 border-t pt-3'>
                <select
                    name="battaryName"
                    id="battaryName"
                    className='textInput'
                    value={currentProduct}
                    onChange={e => setCurrentProduct(e.target.value)}>
                    {productOptions}
                </select>
                <p className='textInput'>{price}</p>
                <button className='btn bg-green-400 w-fit' onClick={handleProductBuying}>Buy</button>
            </div>
            <div className='flex flex-col gap-3 border-t pt-3'>
                <label htmlFor="deposite">Cash Deposite</label>
                <input
                    type="number"
                    className="companyTextInput"
                    id='deposite'
                    min={0}
                    value={cashDeposite}
                    onChange={e => setCashDeposite(e.target.value)}/>
                <button className='btn bg-green-400 w-fit' onClick={handleCashDeposite}>Deposite</button>
            </div>
            <div className='flex flex-col gap-3 border-t pt-3'>
                <h2>Month's bonus</h2>
                <div className='flex flex-row w-full'>
                    <h3 className='w-1/3'>Month</h3>
                    <select name="month" id="month" className='w-1/3 text-black p-2'>
                        <option value="jan">Jan</option>
                    </select>
                </div>
                <div className='flex flex-row w-full'>
                    <h3 className='w-1/3'>Year</h3>
                    <select name="year" id="year" className='w-1/3 text-black p-2'>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div className='flex flex-row w-full'>
                    <h3 className='w-1/3'>Bonus Amount</h3>
                    <p className='w-1/3'>Bonus number</p>
                </div>
            </div>
        </div>
    )
}
