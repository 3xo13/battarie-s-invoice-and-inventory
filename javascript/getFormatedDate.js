const getFormatedDate = () => {
	const date = new Date();
	const formatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
		// hour12: false // Set to 24-hour format
	});

	const formattedTime = formatter.format(date);
	return formattedTime
}

export {getFormatedDate}