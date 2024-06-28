import { getInventorySheetData } from "@/app/_lip/readInventorySheet";
import { auth } from "@/app/_lip/sheetsapi/auth";
import { NextResponse } from "next/server";
import { sheets } from "@/app/_lip/sheetsapi/sheets";
import { uploadImagesToTelegram } from "@/app/_lip/telegram/uploadImage";
import get_bonus from "@/javascript/get_bonus";

export async function POST(req) {
	const request = await req.formData()
	const image = await request.get("image")
	const salesData = await JSON.parse(request.get("salesData"))
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
		carData
	} = salesData
	const {brand, model, year} = carData
	// console.log("🚀 ~ POST ~ salesData:", salesData)
	try {
		const uploadImageResult = await uploadImagesToTelegram(image)
		if (!uploadImageResult) {
			throw new Error("error uploading the image")
		}
		const spreadsheetId = process.env.PRODUCT_HISTORY_GOOGLE_SHEET_ID;
		const range = 'product history'; // Specify the sheet name or range
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range,
		});

		const values = response.data.values
		const numRows = values.length;
		const lastRow = values[numRows - 1]
	
		const profit = (+price + +fee) - +cost;
		const total = +price + +fee;
		const bonus = get_bonus(profit)



		const saleRange = `product history!A${numRows + 1}:U${numRows + 1}`; // Specify the range (e.g., A1:B2)
		const sheetRowData = [
			product,
			`${fee}`,
			price,
			date,
			inventory,
			mainPaymentMethod,
			mainPayment,
			MixPaymentMethod,
			`${mixPayment}`,
			`${total}`, // sale total
			cost, // product cost
			`${profit.toFixed(2)}`, // sale profit
			`${(+lastRow[12] + bonus).toFixed(2)}`, // bonus history
			`${(+lastRow[13] + profit).toFixed(2)}`, // cash history
			`${bonus}`, 
			`${(profit - bonus).toFixed(2)}`, // net profit
			oldBattary,
			brand,
			model,
			year,
			uploadImageResult
		]
		console.log("🚀 ~ POST ~ sheetRowData:", sheetRowData)

		const requestParams = {
			spreadsheetId,
			range: saleRange, // Specify the cell you want to update
			valueInputOption: 'RAW', // Use 'RAW' for plain text values
			resource: {
				values: [sheetRowData],
			},
			auth,
		}
				const updatePromise = () => {
			return new Promise((resolve, reject) => {
				sheets.spreadsheets.values.update(requestParams, (err, response) => {
					if (err) reject(err);
					resolve(response.data);
				});
			});
		};
		const result = await updatePromise();
		console.log("🚀 ~ POST ~ result:", result)

		return NextResponse.json({ success: true, data: result })
	} catch (error) {
		console.log("🚀 ~ POST ~ error:", error)
		return NextResponse.json({ success: false, error: error.message })
	}
}
