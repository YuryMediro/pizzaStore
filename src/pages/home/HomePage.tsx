import { mockPizza } from '@/shared/api/mock'
import { PizzaList } from '@/widgetes/pizza-list/PizzaList'
import { Box, Heading } from '@chakra-ui/react'

export const HomePage = () => {
	return (
		<Box>
			<Heading as='h1' textAlign='center' color='blue.600'>
				Конструктор пиццы
			</Heading>

			<PizzaList pizzas={mockPizza} />
		</Box>
	)
}
