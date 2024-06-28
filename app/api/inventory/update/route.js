import { getInventorySheetData } from "@/app/_lip/readInventorySheet";
import { auth } from "@/app/_lip/sheetsapi/auth";
import { NextResponse } from "next/server";
import { sheets } from "@/app/_lip/sheetsapi/sheets";

export async function POST(req) {
	const request = await req.json()
	const { cell, updateValue, oldValue } = request
	// console.log("🚀 ~ POST ~ cell, updateValue:", cell, updateValue)
	const range = `product!${cell}`
	try {
		const cellValue = +updateValue + +oldValue ;
		console.log("🚀 ~ POST ~ cellValue:", cellValue)
		// Update a cell value

		const requestParams = {
			spreadsheetId: process.env.INVENTORY_GOOGLE_SHEET_ID,
			range, // Specify the cell you want to update
			valueInputOption: 'RAW', // Use 'RAW' for plain text values
			resource: {
				values: [[`${cellValue}`]],
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

		return NextResponse.json({ success: true, data: result })


	} catch (error) {
		// console.log("🚀 ~ POST ~ error:", error)
		return NextResponse.json({ success: false, error: error.message })
	}
}