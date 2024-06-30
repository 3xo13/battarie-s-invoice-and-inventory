import { google } from "googleapis";
import { auth } from "../sheetsapi/auth";
import { sheets } from "../sheetsapi/sheets";

export const getInventorySheetData = async (sheetName, spreadsheetId) => {
	const range = `${sheetName}!A:Z`

	try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range
		})
		return response.data.values
	} catch (error) {
		console.log("🚀 ~ getingPasswordsSheetData ~ error:", error)
		return []
	}
}