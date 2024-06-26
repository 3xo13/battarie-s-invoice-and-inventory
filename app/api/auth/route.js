import { getSheetData } from "@/app/_lip/readSheet";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request){
	const req = await request.json()
	const password = await req.password
	try {
		
		const data = await getSheetData();
		let passwordDoesMatch = false;
		for (const row of data) {
			if (row[0] === password) {
				passwordDoesMatch = true
			}
		}
		if (passwordDoesMatch) {
			const token = jwt.sign({ password }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			});

			cookies().set("accessToken", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'strict',
				maxAge: '3d',
				path: '/',
			})
	
			return NextResponse.json({success: true})
			
		}else{
			throw new Error("Password is incorrect!!")
		}
		
	} catch (error) {
		return NextResponse.json({success: false, fetching_error: error.message})
	}
}