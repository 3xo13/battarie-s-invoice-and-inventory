import is_between_time from "./is_between_time";

export default function get_bonus(profit) {
	var d = new Date();
	var hour = d.getHours();
	if (hour == 0) {
		hour = 24;
	}
	var minute = d.getMinutes();
	var time = hour + ":" + minute;
	var bonus = 0;

	// if time is not between 8:00 PM to 4:40 AM or if it is Friday, then calculate the bonus
	if (!is_between_time('20:00', '04:40') || d.getDay() == 5) {
		// if profit is 10 to 45, bonus will be 10. if profit 45 to 80, 15 will be added. if profit more than 80, 20 will be added.
		if (profit >= 10 && profit <= 45) {
			bonus = 10;
		} else if (profit > 45 && profit <= 80) {
			bonus = 15;
		} else if (profit > 80) {
			bonus = 20;
		}
	} else {
		// if todays_sales_number_in_working_hours is greater than 4 and today isn't Friday, then bonus will be 10
		if (d.getDay() >= 4 && d.getDay() != 5) {
			if (profit > 45) {
				bonus = 10;
			}
		}
	}
	return bonus;
}