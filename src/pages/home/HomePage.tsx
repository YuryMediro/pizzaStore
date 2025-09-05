import { useCartContext } from '@/entities/cart/CartContext'
import { PizzaSelectionHandler } from '@/features/add-to-cart/PizzaSelectionHandler'
import { OrderFlow } from '@/features/order-stepper/OrderFlow'
import { mockPizza } from '@/shared/api/mock'
import { PizzaList } from '@/widgetes/pizza-list/PizzaList'
import { Box, Heading } from '@chakra-ui/react'

export const HomePage = () => {
	const { addToCart, cart, removeFromCart, getTotalPrice, clearCart } =
		useCartContext()

	return (
		<Box>
			<Heading as='h1' textAlign='center' color='orange.400'>
				Конструктор пиццы
			</Heading>
			<OrderFlow
				cart={cart}
				onRemoveItem={removeFromCart}
				totalPrice={getTotalPrice()}
				onOrderConfirm={clearCart}
			>
				<PizzaSelectionHandler onAddToCart={addToCart}>
					{onPizzaSelect => (
						<PizzaList pizzas={mockPizza} onPizzaSelect={onPizzaSelect} />
					)}
				</PizzaSelectionHandler>
			</OrderFlow>
		</Box>
	)
}
