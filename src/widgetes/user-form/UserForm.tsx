import { VStack } from '@chakra-ui/react'
import type { UserInfo } from '@/shared/types/pizza'
import { useValidForm } from '@/shared/lib/formValidate'
import { FormField } from '@/shared/ui/FormField'

interface UserFormProps {
	onSubmit: (data: UserInfo) => void
	onFormValidityChange: (isValid: boolean) => void
	initialData?: UserInfo | null
}

export const UserForm = ({
	onSubmit,
	onFormValidityChange,
	initialData,
}: UserFormProps) => {
	const data = useValidForm({ onFormValidityChange, onSubmit, initialData })
	return (
		<VStack gap={4} align='stretch'>
			<FormField
				label='Имя'
				value={data.formData.name}
				onChange={value => data.handleChange('name', value)}
				onBlur={() => data.handleBlur('name')}
				error={data.errors.name}
				placeholder='Введите ваше имя'
				isRequired
			/>
			<FormField
				label='Телефон'
				value={data.formData.phone}
				onChange={value =>
					data.handlePhoneChange({
						target: { value },
					} as React.ChangeEvent<HTMLInputElement>)
				}
				onBlur={() => data.handleBlur('phone')}
				error={data.errors.phone}
				placeholder='+7 (999) 999-99-99'
				isRequired
				maxLength={18}
			/>
			<FormField
				label='Адрес доставки'
				value={data.formData.address}
				onChange={value => data.handleChange('address', value)}
				onBlur={() => data.handleBlur('address')}
				error={data.errors.address}
				placeholder='Введите адрес доставки'
				isRequired
			/>
			<FormField
				type='textArea'
				label='Комментарий к заказу'
				value={data.formData.comment}
				onChange={value => data.handleChange('comment', value)}
				placeholder='Дополнительные пожелания'
			/>
		</VStack>
	)
}
