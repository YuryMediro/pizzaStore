import type { CartItem } from '@/shared/types/pizza'
import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react'

interface CartItemListProps {
	cart: CartItem[]
}

export const CartItemList = ({ cart }: CartItemListProps) => {
	return (
		<Stack>
			{cart.map((item, index) => {
				const selectedIngs = item.ingredients.filter(ing =>
					item.selectedIngredients.includes(ing.id)
				)
				return (
					<Box key={index}>
						<HStack justify='space-between'>
							<VStack align='start'>
								<Text color={'gray.500'}>
									{item.name} x{item.quantity}
								</Text>
								{selectedIngs.length > 0 && (
									<Text fontSize='sm' color='gray.600'>
										Допы: {selectedIngs.map(ing => ing.name).join(', ')}
									</Text>
								)}
							</VStack>
						</HStack>
					</Box>
				)
			})}
		</Stack>
	)
}
