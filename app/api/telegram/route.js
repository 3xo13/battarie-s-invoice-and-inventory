import { NextResponse } from "next/server"
import { uploadImagesToTelegram } from "@/app/_lip/telegram/uploadImage"

export async function POST(req) {
	console.log("🚀 ~ GET ~ req")
	try {
		const result = await uploadImagesToTelegram
		console.log("🚀 ~ GET ~ telegram bot request result:", result)
		return NextResponse.json({})
	} catch (error) {
		console.log("🚀 ~ GET ~ telegram bot request error:", error)
		return NextResponse.json({})
	}
}