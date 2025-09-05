import {
	Field,
	Input,
	Textarea,
	VStack,
	Button,
	HStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import type { UserInfo } from '@/shared/types/pizza'
import {
	formatPhoneNumber,
	validatePhoneNumber,
} from '@/shared/lib/phoneValidation'

interface UserFormProps {
	onSubmit: (data: UserInfo) => void
}

export const UserForm = ({ onSubmit }: UserFormProps) => {
	const [formData, setFormData] = useState<UserInfo>({
		name: '',
		phone: '',
		address: '',
		comment: '',
	})

	const [errors, setErrors] = useState<Partial<UserInfo>>({})
	const [touched, setTouched] = useState<
		Partial<Record<keyof UserInfo, boolean>>
	>({})

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedPhone = formatPhoneNumber(e.target.value)
		setFormData(prev => ({ ...prev, phone: formattedPhone }))

		if (touched.phone) {
			validateField('phone', formattedPhone)
		}
	}

	const handleBlur = (field: keyof UserInfo) => {
		setTouched(prev => ({ ...prev, [field]: true }))
		validateField(field, formData[field])
	}

	const validateField = (field: keyof UserInfo, value: string) => {
		const newErrors = { ...errors }

		switch (field) {
			case 'name':
				if (!value.trim()) {
					newErrors.name = 'Имя обязательно'
				} else if (value.trim().length < 2) {
					newErrors.name = 'Имя слишком короткое'
				} else {
					delete newErrors.name
				}
				break

			case 'phone':
				if (!value.trim()) {
					newErrors.phone = 'Телефон обязателен'
				} else if (!validatePhoneNumber(value)) {
					newErrors.phone = 'Неверный формат телефона'
				} else {
					delete newErrors.phone
				}
				break

			case 'address':
				if (!value.trim()) {
					newErrors.address = 'Адрес обязателен'
				} else if (value.trim().length < 5) {
					newErrors.address = 'Адрес слишком короткий'
				} else {
					delete newErrors.address
				}
				break

			case 'comment':
				break
		}

		setErrors(newErrors)
	}

	const validateForm = () => {
		const newErrors: Partial<UserInfo> = {}

		if (!formData.name.trim()) newErrors.name = 'Имя обязательно'
		if (!formData.phone.trim()) newErrors.phone = 'Телефон обязателен'
		if (!formData.address.trim()) newErrors.address = 'Адрес обязателен'

		if (formData.phone && !validatePhoneNumber(formData.phone)) {
			newErrors.phone = 'Неверный формат телефона'
		}

		setErrors(newErrors)
		setTouched({
			name: true,
			phone: true,
			address: true,
		})

		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = () => {
		if (validateForm()) {
			onSubmit(formData)
		}
	}

	const isFormValid = () => {
		return (
			formData.name.trim() &&
			formData.phone.trim() &&
			formData.address.trim() &&
			validatePhoneNumber(formData.phone) &&
			Object.keys(errors).length === 0
		)
	}

	return (
		<VStack gap={4} align='stretch'>
			<Field.Root required invalid={!!errors.name && touched.name}>
				<Field.Label>
					Имя
					<Field.RequiredIndicator />
				</Field.Label>
				<Input
					placeholder='Введите ваше имя'
					value={formData.name}
					onChange={e =>
						setFormData(prev => ({ ...prev, name: e.target.value }))
					}
					onBlur={() => handleBlur('name')}
				/>
				<Field.ErrorText>{errors.name}</Field.ErrorText>
			</Field.Root>

			<Field.Root required invalid={!!errors.phone && touched.phone}>
				<Field.Label>
					Телефон
					<Field.RequiredIndicator />
				</Field.Label>
				<Input
					placeholder='+7 (999) 999-99-99'
					value={formData.phone}
					onChange={handlePhoneChange}
					onBlur={() => handleBlur('phone')}
					maxLength={18}
				/>
				<Field.ErrorText>{errors.phone}</Field.ErrorText>
			</Field.Root>

			<Field.Root required invalid={!!errors.address && touched.address}>
				<Field.Label>
					Адрес доставки
					<Field.RequiredIndicator />
				</Field.Label>
				<Input
					placeholder='Введите адрес доставки'
					value={formData.address}
					onChange={e =>
						setFormData(prev => ({ ...prev, address: e.target.value }))
					}
					onBlur={() => handleBlur('address')}
				/>
				<Field.ErrorText>{errors.address}</Field.ErrorText>
			</Field.Root>

			<Field.Root>
				<Field.Label>Комментарий к заказу</Field.Label>
				<Textarea
					placeholder='Дополнительные пожелания'
					value={formData.comment}
					onChange={e =>
						setFormData(prev => ({ ...prev, comment: e.target.value }))
					}
				/>
			</Field.Root>

			<HStack justify='flex-end' pt={2}>
				<Button
					colorScheme='blue'
					onClick={handleSubmit}
					disabled={!isFormValid()}
				>
					Сохранить данные
				</Button>
			</HStack>
		</VStack>
	)
}
