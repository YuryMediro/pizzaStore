import type { CartItem } from '@/shared/types/pizza'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { CartStepper } from './OrderStepper'

interface OrderFlowProps {
	children: React.ReactNode
	cart: CartItem[]
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	totalPrice: number
	onOrderConfirm: () => void
}

export const OrderFlow = ({
	children,
	cart,
	onOrderConfirm,
	onRemoveItem,
	totalPrice,
}: OrderFlowProps) => {
	const [activeStep, setActiveStep] = useState(0)

	if (activeStep === 0) {
		return (
			<>
				{children}
				{cart.length > 0 && (
					<Button
						width='full'
						mt={6}
						size='lg'
						borderRadius='full'
						_hover={{ bg: 'orange.500', transform: 'scale(1.05)' }}
						onClick={() => setActiveStep(1)}
					>
						Перейти к оформлению заказа
					</Button>
				)}
			</>
		)
	}
	return (
		<CartStepper
			cart={cart}
			onRemoveItem={onRemoveItem}
			totalPrice={totalPrice}
			onOrderConfirm={() => {
				onOrderConfirm()
				setActiveStep(0)
			}}
		/>
	)
}
