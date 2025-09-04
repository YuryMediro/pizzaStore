import { HomePage } from '@/pages/home/HomePage'
import './App.css'
import { Box, Container } from '@chakra-ui/react'
import { CartProvider } from '@/entities/cart/CartContext'

function App() {
	return (
		<CartProvider>
			<Box minH='100h' bg='gray.100' py={8}>
				<Container centerContent>
					<HomePage />
				</Container>
			</Box>
		</CartProvider>
	)
}

export default App
