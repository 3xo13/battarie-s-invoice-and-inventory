import { google } from "googleapis";
import { auth } from "../sheetsapi/auth";
import { sheets } from "../sheetsapi/sheets";

export const getCarInfoSheetData = async (sheetName) => {
	const range = `${sheetName}!A:Z`

	try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: process.env.CAR_INFO_GOOGLE_SHEET_ID,
			range
		})
		return response.data.values
	} catch (error) {
		console.log("🚀 ~ getingPasswordsSheetData ~ error:", error)
		return []
	}
}