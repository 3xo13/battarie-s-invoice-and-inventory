import React from 'react'

const BattarysInfo = () => {
    return (
        <div className='w-full border-t-2 border-gray-100 mt-10 pt-10 flex flex-col gap-5'>
            <div>
                <h2>Battery Size</h2>
            </div>
            <div className='formRow'>
                <h3 className='w-1/3'>Standard:</h3>
                <p className='w-1/3'>serial number 1</p>
                <div className='w-1/3 flex flex-row justify-end gap-3'>
                    <button className='btn'>Edit</button>
                    <input type="text" className='w-full'/>
                </div>
            </div>
            <div className='formRow'>
                <h3 className='w-1/3'>Standard:</h3>
                <p className='w-1/3'>serial number 2</p>
                <div className='w-1/3 flex flex-row justify-end gap-3'>
                    <button className='btn'>Edit</button>
                    <input type="text" className='w-full'/>
                </div>
            </div>
            <div className='formRow' style={{border: "none"}}>
                <label htmlFor="oldBattery" className='w-1/3'>Old Battary</label>
                <div className='w-1/3'>
                    <input type="checkbox" className=''/>
                </div>
            </div>
        </div>
    )
}

export default BattarysInfo