import { getCarInfoSheetData } from "@/app/_lip/readCarInfoSheet";
import { NextResponse } from "next/server";

export async function GET(){
	try {
		const carsData = await getCarInfoSheetData('sheet1')

		return NextResponse.json({success: true, carsData})
		
	} catch (error) {
		return NextResponse.json({success: false, error: error.message})
	}
}