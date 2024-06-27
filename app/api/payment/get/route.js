import { getInventorySheetData } from "@/app/_lip/readInventorySheet";
import { NextResponse } from "next/server";

export async function GET(){
	try {
		const paymentMethods = await getInventorySheetData('payment methods')

		return NextResponse.json({success: true, paymentMethods})
		
	} catch (error) {
		return NextResponse.json({success: false, error: error.message})
	}
}