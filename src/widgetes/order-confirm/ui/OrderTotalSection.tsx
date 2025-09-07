import { HStack, Text } from '@chakra-ui/react'

interface OrderTotalSectionProps {
	totalPrice: number
}

export const OrderTotalSection = ({ totalPrice }: OrderTotalSectionProps) => {
	return (
		<HStack
			justify='space-between'
			p={5}
			bg='orange.50'
			borderRadius='xl'
			w='full'
			mt={4}
			flexWrap='wrap'
		>
			<Text fontSize='xl' fontWeight='bold' color='gray.800'>
				💰 Общая сумма к оплате:
			</Text>
			<Text fontSize='2xl' fontWeight='extrabold' color='orange.600'>
				{totalPrice} руб.
			</Text>
		</HStack>
	)
}
