import { Field, Input, Textarea, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import type { UserInfo } from '@/shared/types/pizza'
import {
	formatPhoneNumber,
	validatePhoneNumber,
} from '@/shared/lib/phoneValidation'

interface UserFormProps {
	onSubmit: (data: UserInfo) => void
	onFormValidityChange: (isValid: boolean) => void
}

export const UserForm = ({ onSubmit, onFormValidityChange }: UserFormProps) => {
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

	return (
		<VStack gap={4} align='stretch'>
			<Field.Root required invalid={!!errors.name}>
				<Field.Label>
					Имя
					<Field.RequiredIndicator />
				</Field.Label>
				<Input
					placeholder='Введите ваше имя'
					value={formData.name}
					onChange={e => handleChange('name', e.target.value)}
					onBlur={() => handleBlur('name')}
				/>
				<Field.ErrorText>{errors.name}</Field.ErrorText>
			</Field.Root>

			<Field.Root required invalid={!!errors.phone}>
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

			<Field.Root required invalid={!!errors.address}>
				<Field.Label>
					Адрес доставки
					<Field.RequiredIndicator />
				</Field.Label>
				<Input
					placeholder='Введите адрес доставки'
					value={formData.address}
					onChange={e => handleChange('address', e.target.value)}
					onBlur={() => handleBlur('address')}
				/>
				<Field.ErrorText>{errors.address}</Field.ErrorText>
			</Field.Root>

			<Field.Root>
				<Field.Label>Комментарий к заказу</Field.Label>
				<Textarea
					placeholder='Дополнительные пожелания'
					value={formData.comment}
					onChange={e => handleChange('comment', e.target.value)}
				/>
			</Field.Root>
		</VStack>
	)
}
