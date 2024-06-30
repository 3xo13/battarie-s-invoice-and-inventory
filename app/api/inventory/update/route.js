import { cookies } from "next/headers";
import { auth } from "@/app/_lip/sheetsapi/auth";
import { NextResponse } from "next/server";
import { sheets } from "@/app/_lip/sheetsapi/sheets";
import getSheetId from "@/app/_lip/getSheetId";

export async function POST(req) {
	const cookieStore = cookies();

	const request = await req.json()
	const { cell, updateValue, oldValue } = request

	const range = `product!${cell}`
	try {
		const token = cookieStore.get('accessToken')
		const spreadsheetId = await getSheetId(token)
		const cellValue = +updateValue + +oldValue ;
		if(!spreadsheetId){
			throw new Error("unable to access user data")
		}

		const requestParams = {
			spreadsheetId,
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