import { useEffect, useState } from 'react'
import type { UserInfo } from '../types/pizza'
import { formatPhoneNumber, validatePhoneNumber } from './phoneValidation'

interface useValidFormProps {
	onFormValidityChange: (isValid: boolean) => void
	onSubmit: (data: UserInfo) => void
}

export const useValidForm = ({
	onFormValidityChange,
	onSubmit,
}: useValidFormProps) => {
	const [formData, setFormData] = useState<UserInfo>({
		name: '',
		phone: '',
		address: '',
		comment: '',
	})

	const [touched, setTouched] = useState({
		name: false,
		phone: false,
		address: false,
		comment: false,
	})

	const errors = {
		name:
			touched.name && !formData.name.trim()
				? 'Имя обязательно'
				: touched.name && formData.name.trim().length < 2
				? 'Имя слишком короткое'
				: '',
		phone:
			touched.phone && !formData.phone.trim()
				? 'Телефон обязателен'
				: touched.phone && !validatePhoneNumber(formData.phone)
				? 'Неверный формат телефона'
				: '',

		address:
			touched.address && !formData.address.trim()
				? 'Адрес обязателен'
				: touched.address && formData.address.trim().length < 5
				? 'Адрес слишком короткий'
				: '',
	}

	const isFormValid =
		formData.name.trim().length >= 2 &&
		validatePhoneNumber(formData.phone) &&
		formData.address.trim().length >= 5

	useEffect(() => {
		if (isFormValid) {
			onSubmit(formData)
		}
		onFormValidityChange(isFormValid)
	}, [formData, isFormValid])

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const formattedPhone = formatPhoneNumber(e.target.value)
			setFormData(prev => ({ ...prev, phone: formattedPhone }))
		}

		const handleBlur = (field: keyof UserInfo) => {
			setTouched(prev => ({ ...prev, [field]: true }))
		}

		const handleChange = (field: keyof UserInfo, value: string) => {
			setFormData(prev => ({ ...prev, [field]: value }))
		}
	return {
		formData,
		touched,
		errors,
		isFormValid,
		handlePhoneChange,
		handleBlur,
		handleChange,
	}
}
