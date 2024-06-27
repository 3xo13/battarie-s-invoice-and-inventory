'use client'
import React, { useEffect, useState } from 'react'
import SalesForm from '@/components/sales/SalesForm'
import CarAndBattaryForm from '@/components/sales/CarAndBattaryForm'
import BattarysInfo from '@/components/sales/BattarysInfo'
import { InventoryOptions } from '@/components/sales/InventoryOptions'
import { useRouter } from 'next/navigation'

const SalesPage = () => {
  const router = useRouter()
  const [products, setProducts] = useState([])
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

  useEffect(() => {
    (async() => {
      const response = await fetch('/api/inventory/get')
      const productsData = await response.json()
      if (productsData.success) {
        setProducts(productsData.inventoryData)
      }
    })()
  }, [])

  return (
    <div
      className='min-w-screen min-h-screen flex flex-col items-center gap-10 px-32 py-10'>
      {/* sales form */}
      <SalesForm products={products.slice(1)} />
      
      <InventoryOptions products={products.slice(1)} />
      
    </div>
  )
}

export default SalesPage