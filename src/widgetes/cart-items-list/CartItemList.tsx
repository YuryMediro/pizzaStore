import { useColorModeValue } from '@/components/ui/color-mode'
import { calculateItemPrice } from '@/shared/lib/calculateItemPrice'
import type { CartItem } from '@/shared/types/pizza'
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'

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
	const cardBg = useColorModeValue('white', 'gray.600')
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
						borderRadius='lg'
						bg={cardBg}
						boxShadow='sm'
						border='1px solid'
						borderColor={useColorModeValue('gray.200', 'gray.700')}
					>
						<HStack justify='space-between' align='start'>
							<VStack align='start'>
								<Text fontWeight='medium' fontSize='lg' color='gray.800'>
									{item.name} x{item.quantity}
								</Text>
								{selectedIngs.length > 0 && (
									<Text fontSize='sm' color='orange.600' fontWeight='medium'>
										Допы: {selectedIngs.map(ing => ing.name).join(', ')}
									</Text>
								)}
								<Text color='green.600' fontWeight='bold' fontSize='lg'>
									{itemPrice} руб.
								</Text>
							</VStack>
							<Button
								colorPalette='red'
								size='sm'
								_hover={{ bg: 'red.400' }}
								borderRadius='full'
								onClick={() => onRemoveItem(item.id, item.selectedIngredients)}
							>
								Удалить
							</Button>
						</HStack>
					</Box>
				)
			})}

			<HStack justify='center' p={3}>
				<Text fontSize='xl' fontWeight='bold' color='gray.800'>
					Итого:
				</Text>
				<Text fontSize='2xl' fontWeight='extrabold' color='orange.600'>
					{totalPrice} ₽
				</Text>
			</HStack>
		</VStack>
	)
}
