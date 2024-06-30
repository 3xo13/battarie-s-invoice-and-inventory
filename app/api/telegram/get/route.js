import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import getBotToken from "@/app/_lip/getBotToken";

export async function GET(req){
	const cookieStore = cookies();
	const token = cookieStore.get('accessToken')

	try {
		const botToken = await getBotToken(token)
		const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`)
		const result = await response.json()
		console.log("🚀 ~ GET ~ telegram bot request result:", result)
		return NextResponse.json({})
	} catch (error) {
		console.log("🚀 ~ GET ~ telegram bot request error:", error)
		return NextResponse.json({})
	}
}