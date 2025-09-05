import { useCartContext } from '@/entities/cart/CartContext'
import { AddPizzaModal } from '@/features/add-to-cart/AddPizzaModal'
import { CartStepper } from '@/features/order-stepper/OrderStepper'
import { mockPizza } from '@/shared/api/mock'
import type { Pizza } from '@/shared/types/pizza'
import { PizzaList } from '@/widgetes/pizza-list/PizzaList'
import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

export const HomePage = () => {
	const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null)
	const { onOpen, onClose, open } = useDisclosure()
	const { addToCart, cart, removeFromCart, getTotalPrice } = useCartContext()
	const [activeStep, setActiveStep] = useState(0)

	const handlePizzaSelect = (pizza: Pizza) => {
		setSelectedPizza(pizza)
		onOpen()
	}

	const handleAddToCart = (selectedIngredients: string[]) => {
		if (selectedPizza) {
			addToCart(selectedPizza, selectedIngredients)
		}
	}

	const handleOrderConfirm = () => {
		localStorage.removeItem('pizza-cart')
		setActiveStep(0)
	}

	return (
		<Box>
			<Heading as='h1' textAlign='center' color='orange.400'>
				Конструктор пиццы
			</Heading>
			{activeStep === 0 ? (
				<>
					<PizzaList pizzas={mockPizza} onPizzaSelect={handlePizzaSelect} />

					{cart.length > 0 && (
						<Button width='100%' mt={4} onClick={() => setActiveStep(1)}>
							Перейти к оформлению заказа
						</Button>
					)}
				</>
			) : (
				<>
					{/* <CartStepper/> */}
					<CartStepper
						cart={cart}
						onRemoveItem={removeFromCart}
						totalPrice={getTotalPrice()}
						onOrderConfirm={handleOrderConfirm}
					/>
				</>
			)}

			<AddPizzaModal
				pizza={selectedPizza}
				onClose={onClose}
				open={open}
				onAddToCart={handleAddToCart}
			/>
		</Box>
	)
}
