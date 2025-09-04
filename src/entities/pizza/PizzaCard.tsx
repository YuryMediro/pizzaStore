import type { Pizza } from '@/shared/types/pizza'
import { Button, Card, Heading, Image, Stack, Text } from '@chakra-ui/react'

interface PizzaCardProps {
	pizza: Pizza
}

export const PizzaCard = ({ pizza }: PizzaCardProps) => {
	return (
		<Card.Root maxW='sm' borderRadius='lg' overflow='hidden' boxShadow='md'>
			<Image src={pizza.image} alt={pizza.name} objectFit='cover' />

			<Card.Body>
				<Stack>
					<Heading size='md'>{pizza.name}</Heading>
					<Text color='gray.600' fontSize='sm'>
						Базовая цена: {pizza.basePrice} руб.
					</Text>
					<Text color='gray.500' fontSize='xs'>
						Дополнительные ингредиенты:{' '}
						{pizza.ingredients.map(ingredient => ingredient.name).join(', ')}
					</Text>
					<Button>Добавить в корзину</Button>
				</Stack>
			</Card.Body>
		</Card.Root>
	)
}
