import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(){
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://localhost:3000/templates', {
			waitUntil: 'networkidle2',
		});
		// Saves the PDF to hn.pdf.
		const pdf = await page.pdf({
			path: 'hn.pdf',
		});
	
		await browser.close();
		return NextResponse.json({success: true, file: pdf})
		
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message })
	}
}
