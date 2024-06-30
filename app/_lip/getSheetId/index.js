import jwt from "jsonwebtoken";

export default async function getSheetId(accessToken){
	let sheetId;
	jwt.verify(accessToken.value, process.env.JWT_SECRET, { ignoreExpiration: true }, (error, decoded) => {
		if (decoded) {
			sheetId = decoded.user[1]
		}else{
			sheetId = null;
		}
	})

	return sheetId
}