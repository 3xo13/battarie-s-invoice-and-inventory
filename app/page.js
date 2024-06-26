'use client'
import React, { useEffect } from 'react'
import ProductAndPaymentForm from '@/components/sales/ProductAndPaymentForm'
import CarAndBattaryForm from '@/components/sales/CarAndBattaryForm'
import BattarysInfo from '@/components/sales/BattarysInfo'
import { InventoryOptions } from '@/components/sales/InventoryOptions'
import { useRouter } from 'next/navigation'

const SalesPage = () => {
  const router = useRouter()
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

  
  return (
    <div
      className='min-w-screen min-h-screen flex flex-col items-center gap-10 px-32 py-10'>
      <div className='w-full border rounded-sm p-5'>
        <ProductAndPaymentForm />
      </div>
      <div className='w-full border rounded-sm p-5'>
        <CarAndBattaryForm />
        {/* battary's information and size */}
        <BattarysInfo />
      </div>
      {/* submit form btn */}
      <div className='w-full p-5'>
        <div className='w-full flex flex-col items-center'>
          <button className='btn w-1/2 bg-green-400'>Submit</button>
        </div>
      </div>
      <InventoryOptions />
    </div>
  )
}

export default SalesPage