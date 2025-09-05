export const formatPhoneNumber = (value: string): string => {
	const numbers = value.replace(/\D/g, '')

	if (numbers.length <= 1) return numbers ? '+7' : ''
	if (numbers.length <= 4) return `+7 (${numbers.slice(1, 4)}`
	if (numbers.length <= 7)
		return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}`
	if (numbers.length <= 9)
		return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(
			7,
			9
		)}`

	return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(
		7,
		9
	)}-${numbers.slice(9, 11)}`
}

export const validatePhoneNumber = (phone: string): boolean => {
	const cleanPhone = phone.replace(/\D/g, '')
	return cleanPhone.length === 11 && cleanPhone.startsWith('7')
}
