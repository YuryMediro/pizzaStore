import type { CartItem, UserInfo } from '@/shared/types/pizza'
import { Badge, Box, Button, HStack, Text, VStack } from '@chakra-ui/react'

interface OrderConfirmProps {
	cart: CartItem[]
	totalPrice: number
	userData: UserInfo | null
	onConfirm: () => void
}

export const OrderConfirm = ({
	cart,
	totalPrice,
	userData,onConfirm
}: OrderConfirmProps) => {
	const calculateItemPrice = (item: CartItem) => {
		const ingredientsPrice = item.selectedIngredients.reduce((sum, ingId) => {
			const ingredient = item.ingredients.find(ing => ing.id === ingId)
			return sum + (ingredient?.price || 0)
		}, 0)
		return (item.basePrice + ingredientsPrice) * item.quantity
	}

	if (!userData) {
		return <Text color='red.500'>Пожалуйста, вернитесь и заполните данные</Text>
	}

	return (
		<VStack>
			<Box>
				<Text fontWeight='bold' mb={3}>
					Состав заказа:
				</Text>
				{cart.map((item, index) => {
					const selectedIngs = item.ingredients.filter(ing =>
						item.selectedIngredients.includes(ing.id)
					)
					const itemPrice = calculateItemPrice(item)

					return (
						<Box key={index} p={3} borderWidth={1} borderRadius='md' mb={2}>
							<HStack justify='space-between'>
								<VStack align='start'>
									<Text fontWeight='medium'>
										{item.name} × {item.quantity}
									</Text>
									{selectedIngs.length > 0 && (
										<Text fontSize='sm' color='gray.600'>
											+ {selectedIngs.map(ing => ing.name).join(', ')}
										</Text>
									)}
								</VStack>
								<Text fontWeight='bold'>{itemPrice} руб.</Text>
							</HStack>
						</Box>
					)
				})}
			</Box>

			<Box>
				<Text fontWeight='bold' mb={3}>
					Данные для доставки:
				</Text>
				<VStack align='start'>
					<Text>
						<Badge colorScheme='blue'>Имя:</Badge> {userData.name}
					</Text>
					<Text>
						<Badge colorScheme='green'>Телефон:</Badge> {userData.phone}
					</Text>
					<Text>
						<Badge colorScheme='purple'>Адрес:</Badge> {userData.address}
					</Text>
					{userData.comment && (
						<Text>
							<Badge colorScheme='gray'>Комментарий:</Badge> {userData.comment}
						</Text>
					)}
				</VStack>
			</Box>

			<HStack justify='space-between'>
				<Text fontSize='lg' fontWeight='bold'>
					Общая сумма:
				</Text>
				<Text fontSize='xl' fontWeight='bold' color='green.600'>
					{totalPrice} руб.
				</Text>
			</HStack>

			<Button colorScheme='green' size='lg' onClick={onConfirm}>
				Подтвердить заказ
			</Button>
		</VStack>
	)
}
