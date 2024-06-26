import { getSheetData } from "@/app/_lip/readSheet";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// cookie name is : accessToken
export async function GET() {
	const cookieStore = cookies();
	try {
		// get the cookie 
		const accessToken = cookieStore.get('accessToken')
		
		// if no cookie was found
		if (!accessToken) {
			throw new Error('session expiered, please login!')
		}

		// passwords list coming from google sheet
		const data = await getSheetData();
		
		// verify access token integrity and password value
		const validationResult = jwt.verify(accessToken.value, process.env.JWT_SECRET, { ignoreExpiration: true }, (error, decoded) => {
			// if jwt is valid check the password
			if (decoded) {
				let passwordDoesMatch = false;
				for (const row of data) {
					if (row[0] === decoded.password) {
						passwordDoesMatch = true
					}
				}
				// if password from the jwt is correct 
				if (passwordDoesMatch) {
					return true;
				}else{ // if password is incorrect
					return false
				}
			}
			// if jwt is invalid
			return false
		})
		if (validationResult) {
			return NextResponse.json({ success: true })
			
		}
		throw new Error('invalid access request, please login!')
		
	} catch (error) {
		return NextResponse.json({ success: false, validation_error: error.message })
	}
}