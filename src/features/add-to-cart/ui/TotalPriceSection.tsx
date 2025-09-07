import { useColorModeValue } from '@/components/ui/color-mode'
import { getPizzaLabel } from '@/shared/lib/getPizzaLabel'
import { AnimatedPrice } from '@/shared/ui/AnimatedPrice'
import { Box, Text } from '@chakra-ui/react'

interface TotalPriceSectionProps {
	quantity: number
	totalPrice: number
}

export const TotalPriceSection = ({
	quantity,
	totalPrice,
}: TotalPriceSectionProps) => {
	return (
		<Box
			p={4}
			bg={useColorModeValue('orange.50', 'orange.600')}
			borderRadius='lg'
			mb={6}
			textAlign='center'
		>
			<Text fontSize='lg' color='gray.800' mb={1}>
				💰 Итого за {quantity} {getPizzaLabel(quantity)}:
			</Text>
			<Text
				fontSize='2xl'
				fontWeight='extrabold'
				color={useColorModeValue('orange.500', 'orange.300')}
			>
				<AnimatedPrice price={totalPrice} />
			</Text>
		</Box>
	)
}
