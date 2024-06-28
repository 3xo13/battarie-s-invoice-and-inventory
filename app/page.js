'use client'
import React, { useEffect, useState } from 'react'
import SalesForm from '@/components/sales/SalesForm'
import CarAndBattaryForm from '@/components/sales/CarAndBattaryForm'
import BattarysInfo from '@/components/sales/BattarysInfo'
import { InventoryOptions } from '@/components/sales/InventoryOptions'
import { useRouter } from 'next/navigation'
import SaleConfirmationMsg from '@/components/sales/SaleConfirmationMsg'

const SalesPage = () => {
  const router = useRouter()
  const [products, setProducts] = useState([])

  const [confirmingSale, setConfirmingSale] = useState(false);
  const [confirmingSaleData, setConfirmingSaleData] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
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

  if (selectedImage && confirmingSale) {
    return (
      <div className='min-w-screen min-h-screen flex flex-col items-center py-20'>
      <SaleConfirmationMsg saleData={confirmingSaleData} setConfirm={setConfirmingSale} selectedImage={selectedImage} />
      </div>
    )
  }

  return (
    <div
      className='min-w-screen min-h-screen flex flex-col items-center gap-10 px-32 py-10'>
      {/* sales form */}
      <SalesForm products={products.slice(1)} setConfirmingSale={setConfirmingSale} setConfirmingSaleData={setConfirmingSaleData} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
      
      <InventoryOptions products={products.slice(1)} />
      
    </div>
  )
}

export default SalesPage