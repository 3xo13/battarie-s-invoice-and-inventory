'use client'
import React, {useEffect, useState} from 'react'
import SalesForm from '@/components/sales/SalesForm'
import CarAndBattaryForm from '@/components/sales/CarAndBattaryForm'
import BattarysInfo from '@/components/sales/BattarysInfo'
import {InventoryOptions} from '@/components/sales/InventoryOptions'
import {useRouter} from 'next/navigation'
import SaleConfirmationMsg from '@/components/sales/SaleConfirmationMsg'
import Header from '@/components/header/Header'
import InvoiceTemplate from '@/components/templates/InvoiceTemplte'

const SalesPage = () => {
    const router = useRouter()
    const [products, setProducts] = useState([])
    const [openPdfPage, setOpenPdfPage] = useState(false)

    // sales form confirmation message's display state
    const [confirmingSale, setConfirmingSale] = useState(false);
    // sale form data to be confirmed and set to the backend
    const [confirmingSaleData, setConfirmingSaleData] = useState();
    console.log("🚀 ~ SalesPage ~ confirmingSaleData:", confirmingSaleData)
    // the transaction image to be sent with the form
    const [selectedImage, setSelectedImage] = useState(null);

    // bonus after sale transaction
    const [bonus, setBonus] = useState(0)

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

    // get inventory data
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/inventory/get')
            const productsData = await response.json()
            if (productsData.success) {
                setProducts(productsData.inventoryData)
            }
        })()
    }, [])

    const generatePdf = async () => {
        try {
            
            const response = await fetch("/api/pdf/get",{method: "POST"})
            const file = await response.json()
            console.log("🚀 ~ generatePdf ~ file:", file)
        } catch (error) {
            console.log("🚀 ~ generatePdf ~ error:", error)
            
        }
    }

    if (openPdfPage) {
        return (
            <InvoiceTemplate setOpenPage={setOpenPdfPage} saleData={confirmingSaleData}/>
        )
    }

    // render sale confermation message
    if (selectedImage && confirmingSale) {
        return (
            <div className='min-w-screen min-h-screen flex flex-col items-center py-20'>
                <SaleConfirmationMsg
                    saleData={confirmingSaleData}
                    setConfirm={setConfirmingSale}
                    selectedImage={selectedImage}
                    setBonus={setBonus}/>
            </div>
        )
    }

    return (
        <div
            className='min-w-screen min-h-screen flex flex-col items-center gap-10 px-32 py-10'>
            {/* sales form */}
            <Header title={"Sales Data & History"} link={"/inventory"} otherPageTitle={"Inventory"}/>
            <button className="btn" onClick={e => setOpenPdfPage(true)}>openpdf</button>
            <SalesForm
                products={products.slice(1)}
                setConfirmingSale={setConfirmingSale}
                setConfirmingSaleData={setConfirmingSaleData}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}/>

            <InventoryOptions products={products.slice(1)} bonus={bonus}/>
            <button onClick={generatePdf}>pdf</button>
        </div>
    )
}

export default SalesPage