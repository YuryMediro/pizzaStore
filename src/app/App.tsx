import { HomePage } from '@/pages/home/HomePage'
import './App.css'
import { Box, Container } from '@chakra-ui/react'

function App() {
	return (
		<Box minH='100h' bg='gray.100' py={8}>
			<Container centerContent >
				<HomePage />
			</Container>
		</Box>
	)
}

export default App
