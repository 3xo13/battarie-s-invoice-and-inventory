import { getInventorySheetData } from "@/app/_lip/readInventorySheet";
import { auth } from "@/app/_lip/sheetsapi/auth";
import { NextResponse } from "next/server";
import { sheets } from "@/app/_lip/sheetsapi/sheets";

export async function POST(req) {
	const request = await req.json()
	const { cell, updateValue, oldValue } = request
	console.log("🚀 ~ POST ~ cell, updateValue:", cell, updateValue)
	const range = `products!${cell}`
	try {
		const cellValue = +updateValue + +oldValue ;
		// Update a cell value
		sheets.spreadsheets.values.update({
			spreadsheetId: process.env.INVENTORY_GOOGLE_SHEET_ID,
			range, // Specify the cell you want to update
			valueInputOption: 'RAW', // Use 'RAW' for plain text values
			resource: {
				values: [[`${cellValue}`]],
			},
			auth,
		}, (err, response) => {
			if (err) {
				console.error('Error updating sheet:', err);
				throw new Error("error while atempting to update sheet data")
			} else {
				console.log('Sheet updated successfully:', response.data);
				return NextResponse.json({ success: true })
			}
		});

		return NextResponse.json({ success: true })

	} catch (error) {
		console.log("🚀 ~ POST ~ error:", error)
		return NextResponse.json({ success: false, error: error.message })
	}
}