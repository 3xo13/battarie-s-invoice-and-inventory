export default function is_between_time(startTime, endTime) {
	var [startHour, startMinute] = startTime.split(':');
	var [endHour, endMinute] = endTime.split(':');

	const now = new Date();

	var allowed_hours = [];

	for (var i = Number(startHour); i != Number(endHour) + 1; i++) {
		if (i == 24) {
			i = 0;
		}

		allowed_hours.push(i);
	}

	console.log(allowed_hours);

	if (allowed_hours.includes(now.getHours())) {
		if (now.getHours() == Number(startHour)) {
			if (now.getMinutes() >= Number(startMinute)) {
				return true;
			} else {
				return false;
			}
		} else if (now.getHours() == Number(endHour)) {
			if (now.getMinutes() <= Number(endMinute)) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	} else {
		return false;
	}
}