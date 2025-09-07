import { useAnimatedPrice } from '@/shared/lib/useAnimatedPrice'
import type { CartItem } from '@/shared/types/pizza'
import { HStack, Text, VStack } from '@chakra-ui/react'
import { AnimatedPrice } from '../../shared/ui/AnimatedPrice'
import { CartItemRow } from './CartItemRow'

interface CartItemListProps {
	cart: CartItem[]
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	totalPrice: number
	onUpdateQuantity: (
		itemId: string,
		selectedIngredients: string[],
		newQuantity: number
	) => void
}

export const CartItemList = ({
	cart,
	onRemoveItem,
	totalPrice,
	onUpdateQuantity,
}: CartItemListProps) => {
	useAnimatedPrice(totalPrice)
	return (
		<VStack align='stretch'>
			{cart.map((item, index) => {
				if (!item) return null

				return (
					<CartItemRow
						key={index}
						item={item}
						onRemoveItem={onRemoveItem}
						onUpdateQuantity={onUpdateQuantity}
					/>
				)
			})}

			<HStack justify='center' p={3}>
				<Text fontSize='xl' fontWeight='bold' color='gray.800'>
					Итого:
				</Text>
				<Text fontSize='2xl' fontWeight='extrabold' color='orange.600'>
					<AnimatedPrice price={totalPrice} />
				</Text>
			</HStack>
		</VStack>
	)
}
