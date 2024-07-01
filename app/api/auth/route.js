import { getSheetData } from "@/app/_lip/readSheet";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request){
	const req = await request.json()
	const password = await req.password
	try {
		cookies().delete('accessToken');
		const data = await getSheetData();
		// const passwords = data.slice(1).map(row => row[0])
		const dataRows = data.slice(1)
		let passwordDoesMatch = false;
		let user = [];
		for (const row of dataRows) {
			if (row[0] === password) {
				passwordDoesMatch = true;
				user = row
			}
		}
		// console.log("🚀 ~ POST ~ user:", user)
		if (passwordDoesMatch) {
			const token = jwt.sign({ password, user }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			});

			cookies().set("accessToken", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'strict',
				maxAge: '7d',
				path: '/',
			})
			// const passVal = cookies().get('password')
			// console.log("🚀 ~ POST ~ passVal:", passVal)
			// const userVal = cookies().get('user')
			// console.log("🚀 ~ POST ~ userVal:", userVal)
	
			return NextResponse.json({success: true})
			
		}else{
			throw new Error("Password is incorrect!!")
		}
		
	} catch (error) {
		return NextResponse.json({success: false, fetching_error: error.message})
	}
		
}