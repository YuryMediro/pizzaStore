import { HomePage } from '@/pages/home/HomePage'
import { Box, Container } from '@chakra-ui/react'
import { CartProvider } from '@/entities/cart/CartContext'
import { Route, Routes } from 'react-router-dom'
import { CartPage } from '@/pages/cart/CartPage'

function App() {
	return (
		<CartProvider>
			<Box minH='100vh' bg='gray.300' py={8}>
				<Container centerContent>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/cart' element={<CartPage />} />
					</Routes>
				</Container>
			</Box>
		</CartProvider>
	)
}

export default App
