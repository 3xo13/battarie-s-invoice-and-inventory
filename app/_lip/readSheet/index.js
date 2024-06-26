import { google } from "googleapis";

export const getSheetData = async () => {
	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_email: process.env.GOOGLE_SERVICE_ACCOUNT,
			private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
		},
		scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
	})

	const sheets = google.sheets({version: "v4", auth: await auth.getClient()})
	const range = "Sheet1!A:Z"

	try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId: process.env.PASSWORDS_GOOGLE_SHEET_ID,
			range
		})
		return response.data.values
	} catch (error) {
		console.log("🚀 ~ getingPasswordsSheetData ~ error:", error)
		return []
	}
}