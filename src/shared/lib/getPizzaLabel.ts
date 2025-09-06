export const getPizzaLabel = (count: number) => {
	const lastDigit = count % 10
	const lastTwoDigits = count % 100

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		return 'пицц'
	}
	if (lastDigit === 1) {
		return 'пиццу'
	}
	if (lastDigit >= 2 && lastDigit <= 4) {
		return 'пиццы'
	}
	return 'пицц'
}
