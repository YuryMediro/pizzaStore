import type { CartItem, UserInfo } from '@/shared/types/pizza'
import { Box, Text, VStack } from '@chakra-ui/react'
import { OrderContentsSection } from './ui/OrderContentsSection'
import { DeliveryInfoSection } from './ui/DeliveryInfoSection'
import { OrderTotalSection } from './ui/OrderTotalSection'

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
	if (!userData) {
		return <Text color='red.500'>Пожалуйста, вернитесь и заполните данные</Text>
	}

	return (
		<VStack align='stretch'>
			<Box>
				<Text fontWeight='bold' fontSize='lg' mb={4} color='gray.700'>
					📦 Состав заказа:
				</Text>
				<OrderContentsSection cart={cart} />
			</Box>
			<Box>
				<Text fontWeight='bold' fontSize='lg' mb={4} color='gray.700'>
					🚚 Данные для доставки:
				</Text>
				<DeliveryInfoSection userData={userData} />
			</Box>

			<OrderTotalSection totalPrice={totalPrice} />
		</VStack>
	)
}
