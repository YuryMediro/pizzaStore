import { useColorModeValue } from '@/components/ui/color-mode'
import { calculateItemPrice } from '@/shared/lib/calculateItemPrice'
import { useAnimatedPrice } from '@/shared/lib/useAnimatedPrice'
import type { CartItem } from '@/shared/types/pizza'
import {
	Box,
	Button,
	HStack,
	IconButton,
	NumberInput,
	Text,
	VStack,
} from '@chakra-ui/react'
import { LuMinus, LuPlus } from 'react-icons/lu'
import CountUp from 'react-countup'

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
	const { previous: prevTotalPrice } = useAnimatedPrice(totalPrice)
	const cardBg = useColorModeValue('white', 'gray.600')
	return (
		<VStack align='stretch'>
			{cart.map((item, index) => {
				const selectedIngs = item.ingredients.filter(ing =>
					item.selectedIngredients.includes(ing.id)
				)
				const itemPrice = calculateItemPrice(item)
				const { previous: prevItemPrice } = useAnimatedPrice(itemPrice)
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
									<CountUp
										start={prevItemPrice}
										end={itemPrice}
										duration={1}
										separator=' '
										suffix=' ₽'
									/>
								</Text>
							</VStack>
							<HStack>
								<NumberInput.Root
									value={String(item.quantity)}
									min={1}
									unstyled
									spinOnPress={false}
								>
									<HStack gap='2'>
										<NumberInput.DecrementTrigger asChild>
											<IconButton
												onClick={() =>
													item.quantity > 1
														? onUpdateQuantity(
																item.id,
																item.selectedIngredients,
																item.quantity - 1
														  )
														: onRemoveItem(item.id, item.selectedIngredients)
												}
												disabled={item.quantity <= 1}
												colorPalette='orange'
												variant='outline'
												borderRadius='full'
												size='sm'
											>
												<LuMinus />
											</IconButton>
										</NumberInput.DecrementTrigger>
										<NumberInput.ValueText
											textAlign='center'
											fontSize='lg'
											minW='3ch'
										/>
										<NumberInput.IncrementTrigger asChild>
											<IconButton
												onClick={() =>
													onUpdateQuantity(
														item.id,
														item.selectedIngredients,
														item.quantity + 1
													)
												}
												colorPalette='orange'
												variant='outline'
												borderRadius='full'
												size='sm'
											>
												<LuPlus />
											</IconButton>
										</NumberInput.IncrementTrigger>
									</HStack>
								</NumberInput.Root>
							</HStack>
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
					<CountUp
						start={prevTotalPrice}
						end={totalPrice}
						duration={1}
						separator=' '
						suffix=' ₽'
					/>
				</Text>
			</HStack>
		</VStack>
	)
}
