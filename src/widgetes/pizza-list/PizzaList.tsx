import { PizzaCard } from '@/entities/pizza/PizzaCard'
import type { Pizza } from '@/shared/types/pizza'
import { SimpleGrid } from '@chakra-ui/react'

interface PizzaListProps {
	pizzas: Pizza[]
	onPizzaSelect: (pizza: Pizza) => void
}

export const PizzaList = ({ pizzas, onPizzaSelect }: PizzaListProps) => {
	return (
		<SimpleGrid gap={20} mt={10} columns={{ base: 1, md: 2, lg: 3 }} placeItems={'center'}>
			{pizzas.map(pizza => (
				<PizzaCard
					key={pizza.id}
					pizza={pizza}
					onSelect={() => onPizzaSelect(pizza)}
				/>
			))}
		</SimpleGrid>
	)
}
