import { useColorModeValue } from '@/components/ui/color-mode'
import { calculateItemPrice } from '@/shared/lib/calculateItemPrice'
import type { CartItem } from '@/shared/types/pizza'
import { AnimatedPrice } from '@/shared/ui/AnimatedPrice'
import { QuantitySelector } from '@/shared/ui/QuantitySelector'
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'

interface CartItemRowProps {
	item: CartItem
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	onUpdateQuantity: (
		itemId: string,
		selectedIngredients: string[],
		newQuantity: number
	) => void
}

export const CartItemRow = ({
	item,
	onUpdateQuantity,
	onRemoveItem,
}: CartItemRowProps) => {
	const selectedIngs = item.ingredients.filter(ing =>
		item.selectedIngredients.includes(ing.id)
	)
	const itemPrice = calculateItemPrice(item)

	const increaseQuantity = () => {
		onUpdateQuantity(item.id, item.selectedIngredients, item.quantity + 1)
	}

	const decreaseQuantity = () => {
		if (item.quantity > 1) {
			onUpdateQuantity(item.id, item.selectedIngredients, item.quantity - 1)
		} else {
			onRemoveItem(item.id, item.selectedIngredients)
		}
	}

	return (
		<Box
			p={4}
			borderRadius='lg'
			bg={useColorModeValue('white', 'gray.800')}
			boxShadow='sm'
			border='1px solid'
			borderColor={useColorModeValue('gray.200', 'gray.600')}
		>
			<HStack justify='space-between' align='start' flexWrap='wrap' gap={4}>
				<VStack align='start' width={'100%'} lg={{ flex: '1' }}>
					<Text fontWeight='medium' fontSize='lg' color='gray.200'>
						{item.name} x{item.quantity}
					</Text>
					{selectedIngs.length > 0 && (
						<Text fontSize='sm' color='orange.600' fontWeight='medium'>
							Допы: {selectedIngs.map(ing => ing.name).join(', ')}
						</Text>
					)}
					<Text color='green.600' fontWeight='bold' fontSize='lg'>
						<AnimatedPrice price={itemPrice} />
					</Text>
				</VStack>

				<QuantitySelector
					decreaseQuantity={decreaseQuantity}
					increaseQuantity={increaseQuantity}
					quantity={item.quantity}
				/>

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
}
