import { getInventorySheetData } from "@/app/_lip/readInventorySheet";
import { NextResponse } from "next/server";

export async function GET(){
	try {
		const inventoryData = await getInventorySheetData('product history')

		return NextResponse.json({success: true, inventoryData})
		
	} catch (error) {
		return NextResponse.json({success: false, error: error.message})
	}
}