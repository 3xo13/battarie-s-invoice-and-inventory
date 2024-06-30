import {getInventorySheetData} from "@/app/_lip/readInventorySheet";
import {auth} from "@/app/_lip/sheetsapi/auth";
import {NextResponse} from "next/server";
import {sheets} from "@/app/_lip/sheetsapi/sheets";
import {uploadImagesToTelegram} from "@/app/_lip/telegram/uploadImage";
import get_bonus from "@/javascript/get_bonus";
import { cookies } from "next/headers";
import getSheetId from "@/app/_lip/getSheetId";
import getBotToken from "@/app/_lip/getBotToken";


export async function POST(req) {
    const cookieStore = cookies();
    const token = cookieStore.get('accessToken')

    // request is a form data object
    const request = await req.formData()
    // transaction image
    const image = await request.get("image")
    // all the other form data
    const salesData = await JSON.parse(request.get("salesData"))
    // destructuring the data
    const {
        product,
        fee,
        price,
        date,
        inventory,
        mainPaymentMethod,
        mainPayment,
        MixPaymentMethod,
        mixPayment,
        cost,
        oldBattary,
        carData
    } = salesData
    const {brand, model, year} = carData

    try {
        const spreadsheetId = await getSheetId(token)
        const botToken = await getBotToken(token)
        // uploading the image to telegram first and getting the link
        const uploadImageResult = await uploadImagesToTelegram(image, botToken)
        if (!uploadImageResult) {
            throw new Error("error uploading the image")
        }
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

        // calculate profit, sale total and bonus
        const profit = (+price + +fee) - +cost;
        const total = +price + +fee;
        const bonus = get_bonus(profit)

        // specify the range of where the new data is going to written (after last row)
        const saleRange = `product history!A${numRows + 1}:U${numRows + 1}`;

        // all the data orgenized in the order accuring in the sheet
        const sheetRowData = [
            product,
            `${fee}`,
            price,
            date,
            inventory,
            mainPaymentMethod,
            mainPayment,
            MixPaymentMethod,
            `${mixPayment}`,
            `${total}`, // sale total
            cost, // product cost
            `${profit.toFixed(2)}`, // sale profit
            `${ (+lastRow[12] + bonus).toFixed(2)}`, // bonus history
            `${ (+lastRow[13] + profit).toFixed(2)}`, // cash history
            `${bonus}`,
            `${ (profit - bonus).toFixed(2)}`, // net profit
            oldBattary,
            brand,
            model,
            year,
            uploadImageResult
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
            data: sheetRowData.slice(1, sheetRowData.length - 1),
            bonusAmount: bonus
        })
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        return NextResponse.json({success: false, error: error.message})
    }
}
