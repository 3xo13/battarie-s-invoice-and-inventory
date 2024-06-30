import { getInventorySheetData } from "@/app/_lip/readInventorySheet";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import getSheetId from "@/app/_lip/getSheetId";

export async function GET(){
	const cookieStore = cookies();
	const token = cookieStore.get('accessToken')

	try {
		const spreadsheetId = await getSheetId(token)

		const paymentMethods = await getInventorySheetData('payment methods', spreadsheetId)

		return NextResponse.json({success: true, paymentMethods})
		
	} catch (error) {
		return NextResponse.json({success: false, error: error.message})
	}
}