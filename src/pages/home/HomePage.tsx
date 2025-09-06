import { Toaster } from '@/components/ui/toaster'
import { useCartContext } from '@/entities/cart/CartContext'
import { PizzaSelectionHandler } from '@/features/add-to-cart/PizzaSelectionHandler'
import { OrderFlow } from '@/features/order-stepper/OrderFlow'
import { mockPizza } from '@/shared/api/mock'
import { PizzaList } from '@/widgetes/pizza-list/PizzaList'
import { Box, Container, Heading} from '@chakra-ui/react'

export const HomePage = () => {
	const { addToCart, cart, removeFromCart, getTotalPrice, clearCart,updateItemQuantity } =
		useCartContext()

	return (
		<Container>
			<Toaster />
			<Box textAlign='center' mb={10}>
				<Heading as='h1' size='2xl' color='orange.400' letterSpacing='tight'>
					🍕 Конструктор пиццы
				</Heading>
				<Heading as='h2' size='md' color='gray.600'>
					Собери свою идеальную пиццу!
				</Heading>
				<OrderFlow
					updateItemQuantity={updateItemQuantity}
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
		</Container>
	)
}
