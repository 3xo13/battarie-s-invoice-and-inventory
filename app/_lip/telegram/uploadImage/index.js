const uploadImagesToTelegram = async (file, botToken) => {
	try {
		const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`)
		const getIdResult = await response.json()
		console.log("🚀 ~ uploadImagesToTelegram ~ getIdResult:", getIdResult)
		if (getIdResult.ok) {
			const id = getIdResult.result[0].message.chat.id;

			const formData = new FormData();
			formData.append('chat_id', id);
			formData.append('photo', file);

			const uploadResult = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
				method: 'POST',
				body: formData,
			});
			const result = await uploadResult.json()

			const url = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${result.result.photo[result.result.photo.length - 1].file_id}`);

			const urlJson = await url.json()

			return `https://api.telegram.org/file/bot${botToken}/${urlJson.result.file_path}`
		}else{
			throw new Error("Error while uploading image")
		}
		

	} catch (error) {
		console.log("🚀 ~ uploadImagesToTelegram ~ error:", error)
		return null;
	}
}

export {uploadImagesToTelegram}

// async function sendPhotoToTelegram(chatId, imageFile) {
// 	const botToken = process.env.TELEGRAM_BOT_TOKEN; // Replace with your actual bot token
// 	const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

// 	const formData = new FormData();
// 	formData.append('chat_id', chatId);
// 	formData.append('photo', imageFile);

// 	await fetch(apiUrl, {
// 		method: 'POST',
// 		body: formData,
// 	});
// }