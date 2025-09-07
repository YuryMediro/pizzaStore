import { useColorModeValue } from '@/components/ui/color-mode'
import { Field, Input, Textarea } from '@chakra-ui/react'

interface ForFieldProps {
	label: string
	error?: string
	placeholder: string
	value: string
	onChange: (value: string) => void
	type?: 'text' | 'textArea'
	onBlur?: () => void
	isRequired?: boolean
	maxLength?: number
}

export const FormField = ({
	label,
	error,
	placeholder,
	value,
	onChange,
	type,
	onBlur,
	isRequired,
	maxLength,
}: ForFieldProps) => {
	return (
		<Field.Root required invalid={!!error}>
			<Field.Label fontWeight='medium' color='gray.700'>
				{label}
				{isRequired && <Field.RequiredIndicator />}
			</Field.Label>

			{type === 'textArea' ? (
				<Textarea
					placeholder={placeholder}
					value={value}
					onChange={e => onChange(e.target.value)}
					bg={useColorModeValue('white', 'gray.800')}
					borderRadius='lg'
					minH='100px'
					_hover={{ borderColor: 'orange.300' }}
				/>
			) : (
				<Input
					placeholder={placeholder}
					value={value}
					onChange={e => onChange(e.target.value)}
					onBlur={onBlur}
					bg={useColorModeValue('white', 'gray.800')}
					borderRadius='lg'
					_hover={{ borderColor: 'orange.300' }}
					maxLength={maxLength}
				/>
			)}

			{error && <Field.ErrorText>{error}</Field.ErrorText>}
		</Field.Root>
	)
}
