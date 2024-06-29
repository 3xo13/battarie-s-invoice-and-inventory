import { getInventorySheetData } from "@/app/_lip/readInventorySheet";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const historyData = await getInventorySheetData('product history')

		// the number of rows
		const numRows = historyData.length;
		// the last row data to be used along with the new data
		const lastRow = historyData[numRows - 1]
		// dont send images urls to the front end (it contains the telegram bot token)
		const lastRowWithoutImage = lastRow.length > 14 ? lastRow.slice(0, lastRow.length - 1) : lastRow

		return NextResponse.json({ success: true, historyData: lastRowWithoutImage })

	} catch (error) {
		return NextResponse.json({ success: false, error: error.message })
	}
}