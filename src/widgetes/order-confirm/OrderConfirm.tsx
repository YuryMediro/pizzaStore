import { useColorModeValue } from '@/components/ui/color-mode'
import { calculateItemPrice } from '@/shared/lib/calculateItemPrice'
import type { CartItem, UserInfo } from '@/shared/types/pizza'
import { Badge, Box, HStack, Text, VStack } from '@chakra-ui/react'

interface OrderConfirmProps {
	cart: CartItem[]
	totalPrice: number
	userData: UserInfo | null
}

export const OrderConfirm = ({
	cart,
	totalPrice,
	userData,
}: OrderConfirmProps) => {
	const cardBg = useColorModeValue('white', 'gray.800')

	if (!userData) {
		return <Text color='red.500'>Пожалуйста, вернитесь и заполните данные</Text>
	}

	return (
		<VStack align='stretch'>
			<Box>
				<Text fontWeight='bold' fontSize='lg' mb={4} color='gray.700'>
					📦 Состав заказа:
				</Text>
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
								bg={cardBg}
								borderRadius='lg'
								border='1px solid'
								borderColor={useColorModeValue('gray.200', 'gray.700')}
							>
								<HStack justify='space-between'>
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
			</Box>

			<Box>
				<Text fontWeight='bold' fontSize='lg' mb={4} color='gray.700'>
					🚚 Данные для доставки:
				</Text>
				<VStack align='start'>
					<HStack>
						<Badge colorPalette='blue' borderRadius='full' px={3} py={1}>
							Имя:
						</Badge>{' '}
						<Text color='black'>{userData.name}</Text>
					</HStack>
					<HStack>
						<Badge colorPalette='green' borderRadius='full' px={3} py={1}>
							Телефон:
						</Badge>{' '}
						<Text color='black'>{userData.phone}</Text>
					</HStack>
					<HStack>
						<Badge colorPalette='purple' borderRadius='full' px={3} py={1}>
							Адрес:
						</Badge>{' '}
						<Text color='black'>{userData.address}</Text>
					</HStack>
					{userData.comment && (
						<HStack>
							<Badge colorPalette='gray' borderRadius='full' px={3} py={1}>
								Комментарий:
							</Badge>{' '}
							<Text color='black'>{userData.comment}</Text>
						</HStack>
					)}
				</VStack>
			</Box>

			<HStack
				justify='space-between'
				p={5}
				bg='orange.50'
				borderRadius='xl'
				w='full'
				mt={4}
			>
				<Text fontSize='xl' fontWeight='bold' color='gray.800'>
					💰 Общая сумма к оплате:
				</Text>
				<Text fontSize='2xl' fontWeight='extrabold' color='orange.600'>
					{totalPrice} руб.
				</Text>
			</HStack>
		</VStack>
	)
}
