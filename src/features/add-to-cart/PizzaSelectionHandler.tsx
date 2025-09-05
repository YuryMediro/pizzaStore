import type { Pizza } from '@/shared/types/pizza'
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { AddPizzaModal } from './AddPizzaModal'

interface PizzaSelectionHandlerProps {
	children: (onPizzaSelect: (pizza: Pizza) => void) => React.ReactNode
	onAddToCart: (pizza: Pizza, ingredients: string[]) => void
}

export const PizzaSelectionHandler = ({
	children,
	onAddToCart,
}: PizzaSelectionHandlerProps) => {
	const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null)
	const { onOpen, onClose, open } = useDisclosure()

	const handlePizzaSelect = (pizza: Pizza) => {
		setSelectedPizza(pizza)
		onOpen()
	}

	const handleAddToCart = (selectedIngredients: string[]) => {
		if (selectedPizza) {
			onAddToCart(selectedPizza, selectedIngredients)
		}
		onClose()
	}
	return (
		<>
			{children(handlePizzaSelect)}
			<AddPizzaModal
				pizza={selectedPizza}
				onClose={onClose}
				open={open}
				onAddToCart={handleAddToCart}
			/>
		</>
	)
}
