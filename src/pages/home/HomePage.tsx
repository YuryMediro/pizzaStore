import { useCartContext } from '@/entities/cart/CartContext'
import { PizzaSelectionHandler } from '@/features/add-to-cart/PizzaSelectionHandler'
import { mockPizza } from '@/shared/api/mock'
import { PizzaList } from '@/widgetes/pizza-list/PizzaList'
import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
	const { addToCart, cart } = useCartContext()
	const navigate = useNavigate()

	return (
		<Container>
			<Box textAlign='center' mb={10}>
				<Heading as='h1' size='2xl' color='orange.400' letterSpacing='tight'>
					🍕 Конструктор пиццы
				</Heading>
				<Heading as='h2' size='md' color='gray.600'>
					Собери свою идеальную пиццу!
				</Heading>
				<PizzaSelectionHandler onAddToCart={addToCart}>
					{onPizzaSelect => (
						<PizzaList pizzas={mockPizza} onPizzaSelect={onPizzaSelect} />
					)}
				</PizzaSelectionHandler>
				{cart.length > 0 && (
					<Button
					bg={'orange.400'}
						position={'fixed'}
						top={'2%'}
						left={'1%'}
						zIndex={1000}
						size='md'
						borderRadius='full'
						_hover={{ bg: 'orange.500', transform: 'scale(1.05)' }}
						onClick={() => navigate('/pizzaStore/cart')}
					>
						🛒
					</Button>
				)}
			</Box>
		</Container>
	)
}
