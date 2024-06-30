'use client'
import Image from 'next/image';
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceTemplate = ({setOpenPage, saleData}) => {
	const {
		product,
		fee,
		price,
		date,
		inventory,
		mainPaymentMethod,
		mainPayment,
		MixPaymentMethod,
		mixPayment,
		cost,
		oldBattary,
		customerType,
		companyData,
		carData
	} = saleData;
	const {
		name,
		address,
		zipCode,
		vatNumber,
		email,
		phone
	} = companyData;
	const componentRef = useRef();

	const handleDownloadPdf = async () => {
		const element = componentRef.current;
		const canvas = await html2canvas(element);
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF();
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

		pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
		pdf.save('download.pdf');
	};
	return (
		<div className='w-screen min-h-screen flex flex-col'>
			<div className='w-screen py-5 px-10'>
				<button onClick={handleDownloadPdf} className='btn'>Download as PDF</button>
				<button className="btn" onClick={e => setOpenPage(false)}>Cancel</button>
			</div>
			<div ref={componentRef} className="container mx-auto mt-12 px-6">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<div className="flex justify-between items-center border-b pb-4">
						<div className='w-full flex flex-row '>
							<div className='w-2/12 p-5 flex items-center'>
							<img src="/img/batteryswap-logo.png" alt="Logo" width={150} height={80} className='w-full h-auto'/>
							</div>
							<div className='w-8/12'>
							<p className="mt-2 text-gray-700">
								Abdulaziz Abdullah Al Hurr Establishment for Commercial Services<br />
								Prince Moham<br />
								Muslim bin Qais<br />
								Dammam 32241<br />
								Saudi Arabia
							</p>

							</div>
						</div>
						<div className="text-right w-2/12">
							<h3 className="text-2xl font-bold w-40">Battery Swap</h3>
						</div>
					</div>
					<div className="mt-8">
						<div className={`flex ${name ? "justify-between" : "justify-end"}`}>
							{name ? <div>
								<address className="text-gray-700">
									<strong>To:</strong><br />
									{name}<br />
									{address}<br />
									{zipCode}<br />
									Saudi Arabia
								</address>
							</div> : null}
							<div className="text-right">
								<h2 className="text-2xl font-bold text-blue-600">Invoice INV/[[YEAR]]/[[INVOICE_NUMBER]]</h2>
								<p className="mt-2 text-gray-700">
									<strong>Invoice Date:</strong> {date}<br />
									<strong>Due Date:</strong> [[DUE_DATE]]<br />
									<strong>Delivery Date:</strong> "Delevered"
								</p>
							</div>
						</div>
					</div>
					<div className="mt-8">
						<table className="w-full border-collapse">
							<thead>
								<tr>
									<th className="border-b py-2 text-left text-gray-700">Description</th>
									<th className="border-b py-2 text-right text-gray-700">Quantity</th>
									<th className="border-b py-2 text-right text-gray-700">Unit Price</th>
									<th className="border-b py-2 text-left text-gray-700">Taxes</th>
									<th className="border-b py-2 text-right text-gray-700">Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-gray-50">
									<td className="py-2">{product[0]}</td>
									<td className="py-2 text-right">{product[0] + "change"}</td>
									<td className="py-2 text-right">{price}</td>
									<td className="py-2">Tax 0%</td>
									<td className="py-2 text-right">{+price + +fee}</td>
								</tr>
								<tr>
									<td className="py-2">Service Charge</td>
									<td className="py-2 text-right">1.00</td>
									<td className="py-2 text-right">{fee}</td>
									<td className="py-2">Tax 0%</td>
									<td className="py-2 text-right">{fee}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="mt-8 flex justify-end">
						<table className="text-right">
							<tbody>
								<tr>
									<td className="pr-4"><strong>Main Amount</strong></td>
									<td>{price}</td>
								</tr>
								<tr>
									<td className="pr-4">Service Charge</td>
									<td>{fee}</td>
								</tr>
								<tr>
									<td className="pr-4"><strong>Total</strong></td>
									<td>{+price + +fee}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p className="mt-4 text-gray-700">
						Please use the following communication for your payment: <strong>INV/[[YEAR]]/[[INVOICE_NUMBER]]</strong>
					</p>
					<div className="text-center mt-8 border-t pt-4 text-gray-700">
						<p>batteryswapksa@gmail.com | <a href="https://wa.me/c/966551607974" className="text-blue-600">https://wa.me/c/966551607974</a></p>
					</div>
				</div>
			</div>
		</div>

	);
};

export default InvoiceTemplate;
