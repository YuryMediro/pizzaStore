import { useCart } from '@/entities/cart/useCart'
import { AddPizzaModal } from '@/features/add-to-cart/AddPizzaModal'
import { mockPizza } from '@/shared/api/mock'
import type { Pizza } from '@/shared/types/pizza'
import { PizzaList } from '@/widgetes/pizza-list/PizzaList'
import { Box, Heading, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

export const HomePage = () => {
	const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null)
	const { onOpen, onClose, open } = useDisclosure()
	const { addToCart, cart } = useCart()

	const handlePizzaSelect = (pizza: Pizza) => {
		setSelectedPizza(pizza)
		onOpen()
	}

	const handleAddToCart = (selectedIngredients: string[]) => {
		if (selectedPizza) {
			addToCart(selectedPizza, selectedIngredients)
		}
	}

	return (
		<Box>
			<Heading as='h1' textAlign='center' color='orange.400'>
				Конструктор пиццы
			</Heading>

			<PizzaList pizzas={mockPizza} onPizzaSelect={handlePizzaSelect} />

			<AddPizzaModal pizza={selectedPizza} onClose={onClose} open={open} onAddToCart={handleAddToCart} />
		</Box>
	)
}
