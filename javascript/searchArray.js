export function searchArrays(arrOfArrays, searchString) {
	const lowerSearchString = searchString.toLowerCase(); // Convert search string to lowercase
	return arrOfArrays.filter(childArray => {
		const firstElement = childArray[0].toLowerCase(); // Convert first element to lowercase
		return firstElement.includes(lowerSearchString);
	});
}