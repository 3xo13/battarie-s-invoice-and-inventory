import { google } from "googleapis";
import { auth } from "../sheetsapi/auth";
import { sheets } from "../sheetsapi/sheets";

export const getInventorySheetData = async (sheetName) => {
	const range = `${sheetName}!A:Z`

	try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: process.env.INVENTORY_GOOGLE_SHEET_ID,
			range
		})
		return response.data.values
	} catch (error) {
		console.log("🚀 ~ getingPasswordsSheetData ~ error:", error)
		return []
	}
}