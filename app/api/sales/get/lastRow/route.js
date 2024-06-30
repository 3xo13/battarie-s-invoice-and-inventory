import { getInventorySheetData } from "@/app/_lip/readInventorySheet";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import getSheetId from "@/app/_lip/getSheetId";

export async function GET() {
	const cookieStore = cookies();
	const token = cookieStore.get('accessToken')

	try {
		const spreadsheetId = await getSheetId(token)

		const historyData = await getInventorySheetData('product history', spreadsheetId)

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