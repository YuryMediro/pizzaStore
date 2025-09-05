import { HomePage } from '@/pages/home/HomePage'
import { Box, Container } from '@chakra-ui/react'
import { CartProvider } from '@/entities/cart/CartContext'

function App() {
	return (
		<CartProvider>
			<Box minH='100h' bg='gray.300' py={8}>
				<Container centerContent>
					<HomePage />
				</Container>
			</Box>
		</CartProvider>
	)
}

export default App
