import React from 'react'

export const InventoryOptions = () => {
    return (
        <div className='w-full border rounded-sm p-5 flex flex-col gap-5'>
            {/* inventory data (i think) */}
            <div className='flex flex-col gap-3'>
                <div className='w-full flex flex-row'>
                    <h3 className='w-1/3'>Total cash paynent</h3>
                    <p className='w-1/3'>payment amount</p>
                    <div className='w-1/3'></div>
                </div>
                <div className='w-full flex flex-row'>
                    <h3 className='w-1/3'>Total bonus</h3>
                    <p className='w-1/3'>payment amount</p>
                    <div className='w-1/3'></div>
                </div>
                <div className='w-full flex'>
                    <button className='btn bg-green-400'>Submit</button>
                </div>
            </div>
            {/* battary buy */}
            <div className='flex flex-col gap-3 border-t pt-3'>
                <select name="battaryName" id="battaryName" className='textInput'>
                    <option value="battary name">battary name</option>
                </select>
                <button className='btn bg-green-400 w-fit'>Buy</button>
            </div>
            <div className='flex flex-col gap-3 border-t pt-3'>
                <input type="text" className='textInput' defaultValue={"battary price"}/>
                <button className='btn bg-green-400 w-fit'>Deposite</button>
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
