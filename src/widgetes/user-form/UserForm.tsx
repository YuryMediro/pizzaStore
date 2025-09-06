import { Field, Input, Textarea, VStack } from '@chakra-ui/react'
import type { UserInfo } from '@/shared/types/pizza'
import { useValidForm } from '@/shared/lib/formValidate'
import { useColorModeValue } from '@/components/ui/color-mode'

interface UserFormProps {
	onSubmit: (data: UserInfo) => void
	onFormValidityChange: (isValid: boolean) => void
}

export const UserForm = ({ onSubmit, onFormValidityChange }: UserFormProps) => {
	const data = useValidForm({ onFormValidityChange, onSubmit })
	const fieldBg = useColorModeValue('white', 'gray.800')
	return (
		<VStack gap={4} align='stretch'>
			<Field.Root required invalid={!!data.errors.name}>
				<Field.Label fontWeight='medium' color='gray.700'>
					Имя
					<Field.RequiredIndicator />
				</Field.Label>
				<Input
					placeholder='Введите ваше имя'
					value={data.formData.name}
					onChange={e => data.handleChange('name', e.target.value)}
					onBlur={() => data.handleBlur('name')}
					bg={fieldBg}
					borderRadius='lg'
					_hover={{ borderColor: 'orange.300' }}
				/>
				<Field.ErrorText>{data.errors.name}</Field.ErrorText>
			</Field.Root>

			<Field.Root required invalid={!!data.errors.phone}>
				<Field.Label fontWeight='medium' color='gray.700'>
					Телефон
					<Field.RequiredIndicator />
				</Field.Label>
				<Input
					placeholder='+7 (999) 999-99-99'
					value={data.formData.phone}
					onChange={data.handlePhoneChange}
					onBlur={() => data.handleBlur('phone')}
					maxLength={18}
					bg={fieldBg}
					borderRadius='lg'
					_hover={{ borderColor: 'orange.300' }}
				/>
				<Field.ErrorText>{data.errors.phone}</Field.ErrorText>
			</Field.Root>

			<Field.Root required invalid={!!data.errors.address}>
				<Field.Label fontWeight='medium' color='gray.700'>
					Адрес доставки
					<Field.RequiredIndicator />
				</Field.Label>
				<Input
					placeholder='Введите адрес доставки'
					value={data.formData.address}
					onChange={e => data.handleChange('address', e.target.value)}
					onBlur={() => data.handleBlur('address')}
					bg={fieldBg}
					borderRadius='lg'
					_hover={{ borderColor: 'orange.300' }}
				/>
				<Field.ErrorText>{data.errors.address}</Field.ErrorText>
			</Field.Root>

			<Field.Root>
				<Field.Label fontWeight='medium' color='gray.700'>
					Комментарий к заказу
				</Field.Label>
				<Textarea
					placeholder='Дополнительные пожелания'
					value={data.formData.comment}
					onChange={e => data.handleChange('comment', e.target.value)}
					bg={fieldBg}
					borderRadius='lg'
					minH='100px'
					_hover={{ borderColor: 'orange.300' }}
				/>
			</Field.Root>
		</VStack>
	)
}
