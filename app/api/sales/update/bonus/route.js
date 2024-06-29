import {auth} from "@/app/_lip/sheetsapi/auth";
import {NextResponse} from "next/server";
import {sheets} from "@/app/_lip/sheetsapi/sheets";
import { getFormatedDate } from "@/javascript/getFormatedDate";

export async function POST(req) {
    const request = await req.json()
		const {deductAmount} = await request
		const date = getFormatedDate()
    try {
        const spreadsheetId = process.env.PRODUCT_HISTORY_GOOGLE_SHEET_ID;
        const range = 'product history';
        // get all the sheet data
        const response = await sheets
            .spreadsheets
            .values
            .get({spreadsheetId, range});

        // all the product history's sheet data
        const values = response.data.values
        // the number of rows
        const numRows = values.length;
        // the last row data to be used along with the new data
        const lastRow = values[numRows - 1]

			if (+lastRow[12] < deductAmount) {
					throw new Error("Invalid bonus amount")
				}

        // specify the range of where the new data is going to written (after last row)
        const saleRange = `product history!A${numRows + 1}:U${numRows + 1}`;

        // all the data orgenized in the order accuring in the sheet
        const sheetRowData = [
            "Deduct Bonus",
            "",
            "",
            date,
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            `${ (+lastRow[12] - deductAmount).toFixed(2)}`, // bonus history
            `${ (+lastRow[13] - deductAmount).toFixed(2)}`, // cash history
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ]

        // google sheet api request parameters
        const requestParams = {
            spreadsheetId,
            range: saleRange, // Specify the cell you want to update
            valueInputOption: 'RAW', // Use 'RAW' for plain text values
            resource: {
                values: [sheetRowData]
            },
            auth
        }

        // the api call wraped in a promise to be async
        const updatePromise = () => {
            return new Promise((resolve, reject) => {
                sheets
                    .spreadsheets
                    .values
                    .update(requestParams, (err, response) => {
                        if (err) {
                            reject(err)
                        };
                        resolve(response.data);
                    });
            });
        };
        // result of the update call
        const result = await updatePromise();
        // return success and the data
        return NextResponse.json({
            success: true,
            data: sheetRowData
        })
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        return NextResponse.json({success: false, error: error.message})
    }
}
