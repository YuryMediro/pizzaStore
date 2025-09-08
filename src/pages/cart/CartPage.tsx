import { useCartContext } from '@/entities/cart/CartContext'
import { CartStepper } from '@/features/order-stepper/OrderStepper'
import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const CartPage = () => {
	const { cart, removeFromCart, getTotalPrice, clearCart, updateItemQuantity } =
		useCartContext()
	const navigate = useNavigate()

	if (cart.length === 0) {
		return (
			<Container maxW='container.xl'>
				<Box textAlign='center'>
					<Heading size='lg' color='gray.600'>
						🛒 Ваша корзина пуста
					</Heading>
					<Button
						mt={6}
						size='lg'
						borderRadius='full'
						_hover={{ bg: 'orange.500', transform: 'scale(1.05)' }}
						onClick={() => navigate('/pizzaStore/')}
					>
						Вернуться к выбору пицц
					</Button>
				</Box>
			</Container>
		)
	}
	return (
		<Container maxW='container.xl' centerContent>
			<Box textAlign='center' mb={8}>
				<Heading as='h1' size='2xl' color='orange.500'>
					📦 Оформление заказа
				</Heading>
			</Box>

			<CartStepper
				cart={cart}
				onRemoveItem={removeFromCart}
				onUpdateQuantity={updateItemQuantity}
				totalPrice={getTotalPrice()}
				onOrderConfirm={() => {
					clearCart()
					navigate('/pizzaStore')
				}}
			/>

			<Button
				mt={6}
				size='lg'
				borderRadius='full'
				_hover={{ bg: 'orange.500', transform: 'scale(1.05)' }}
				onClick={() => navigate('/pizzaStore/')}
			>
				← Вернуться к выбору пицц
			</Button>
		</Container>
	)
}
