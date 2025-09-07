import { steps } from '@/shared/lib/steps'
import type { CartItem, UserInfo } from '@/shared/types/pizza'
import { CartItemList } from '@/widgetes/cart-items-list/CartItemList'
import { OrderConfirm } from '@/widgetes/order-confirm/OrderConfirm'
import { UserForm } from '@/widgetes/user-form/UserForm'
import { Box, Steps, Text } from '@chakra-ui/react'

interface StepperContentProps {
	cart: CartItem[]
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	totalPrice: number
	onUpdateQuantity: (
		itemId: string,
		selectedIngredients: string[],
		newQuantity: number
	) => void
	userData: UserInfo | null
	handleUserSubmit: (data: UserInfo) => void
	handleFormValidityChange: (isValid: boolean) => void
}

export const StepperContent = ({
	cart,
	onRemoveItem,
	onUpdateQuantity,
	totalPrice,
	userData,
	handleFormValidityChange,
	handleUserSubmit,
}: StepperContentProps) => {
	return (
		<Box width='full'>
			<Steps.Content index={0}>
				<Text fontWeight='bold' color={'gray.500'} mb={4}>
					{steps[0].description}
				</Text>
				<CartItemList
					cart={cart}
					onRemoveItem={onRemoveItem}
					totalPrice={totalPrice}
					onUpdateQuantity={onUpdateQuantity}
				/>
			</Steps.Content>

			<Steps.Content index={1}>
				<Text fontWeight='bold' color={'gray.500'} mb={4}>
					{steps[1].description}
				</Text>
				<UserForm
					onSubmit={handleUserSubmit}
					onFormValidityChange={handleFormValidityChange}
					initialData={userData}
				/>
			</Steps.Content>

			<Steps.Content index={2}>
				<Text fontWeight='bold' color={'gray.500'} mb={4}>
					{steps[2].description}
				</Text>
				<OrderConfirm cart={cart} userData={userData} totalPrice={totalPrice} />
			</Steps.Content>
		</Box>
	)
}
