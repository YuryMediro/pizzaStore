import { useColorModeValue } from '@/components/ui/color-mode'
import { calculateItemPrice } from '@/shared/lib/calculateItemPrice'
import type { CartItem } from '@/shared/types/pizza'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'

interface OrderContentsSectionProps {
	cart: CartItem[]
}

export const OrderContentsSection = ({ cart }: OrderContentsSectionProps) => {
	return (
		<VStack align='stretch'>
			{cart.map((item, index) => {
				const selectedIngs = item.ingredients.filter(ing =>
					item.selectedIngredients.includes(ing.id)
				)
				const itemPrice = calculateItemPrice(item)

				return (
					<Box
						key={index}
						p={4}
						bg={useColorModeValue('white', 'gray.800')}
						borderRadius='lg'
						border='1px solid'
						borderColor={useColorModeValue('gray.200', 'gray.700')}
					>
						<HStack justify='space-between' flexWrap={'wrap'} gap={4}>
							<VStack align='start'>
								<Text fontWeight='medium'>
									{item.name} × {item.quantity}
								</Text>
								{selectedIngs.length > 0 && (
									<Text fontSize='sm' color='orange.600'>
										+ {selectedIngs.map(ing => ing.name).join(', ')}
									</Text>
								)}
							</VStack>
							<Text fontWeight='bold' color='green.600' fontSize='lg'>
								{itemPrice} руб.
							</Text>
						</HStack>
					</Box>
				)
			})}
		</VStack>
	)
}
