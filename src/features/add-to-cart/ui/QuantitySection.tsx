import { useColorModeValue } from '@/components/ui/color-mode'
import { QuantitySelector } from '@/shared/ui/QuantitySelector'
import { Box, HStack, Text } from '@chakra-ui/react'

interface QuantitySectionProps {
	quantity: number
	increaseQuantity: () => void
	decreaseQuantity: () => void
}

export const QuantitySection = ({
	decreaseQuantity,
	increaseQuantity,
	quantity,
}: QuantitySectionProps) => {
	return (
		<Box
			mb={6}
			p={4}
			bg={useColorModeValue('gray.50', 'gray.800')}
			borderRadius='lg'
		>
			<HStack justify='space-between' align='center'>
				<Text fontWeight='medium' color='gray.300'>
					Количество:
				</Text>
				<QuantitySelector
					quantity={quantity}
					decreaseQuantity={decreaseQuantity}
					increaseQuantity={increaseQuantity}
				/>
			</HStack>
		</Box>
	)
}
