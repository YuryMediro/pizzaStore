import type { CartItem } from '@/shared/types/pizza'
import { Box, Button, HStack,  Text, VStack } from '@chakra-ui/react'

interface CartItemListProps {
	cart: CartItem[]
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	totalPrice: number
}

export const CartItemList = ({
	cart,
	onRemoveItem,
	totalPrice,
}: CartItemListProps) => {
	return (
		<VStack align='stretch'>
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
							<Button
								size='sm'
								onClick={() => onRemoveItem(item.id, item.selectedIngredients)}
							>
								Удалить
							</Button>
						</HStack>
					</Box>
				)
			})}

			<VStack >
				<Text color={'gray.500'} fontSize='lg' fontWeight='bold'>
					Итого: {totalPrice} руб.
				</Text>
			</VStack>
		</VStack>
	)
}
