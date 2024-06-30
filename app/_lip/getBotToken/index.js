import jwt from "jsonwebtoken";

export default async function getBotToken(accessToken) {
	let botToken;
	jwt.verify(accessToken.value, process.env.JWT_SECRET, { ignoreExpiration: true }, (error, decoded) => {
		if (decoded) {
			botToken = decoded.user[2]
		} else {
			botToken = null;
		}
	})

	return botToken
}