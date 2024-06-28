import { NextResponse } from "next/server"

export async function GET(req){
	console.log("🚀 ~ GET ~ req")
	try {
		const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`)
		const result = await response.json()
		console.log("🚀 ~ GET ~ telegram bot request result:", result)
		return NextResponse.json({})
	} catch (error) {
		console.log("🚀 ~ GET ~ telegram bot request error:", error)
		return NextResponse.json({})
	}
}