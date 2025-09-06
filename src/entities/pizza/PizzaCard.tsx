import { useColorModeValue } from '@/components/ui/color-mode'
import type { Pizza } from '@/shared/types/pizza'
import {
	Box,
	Button,
	Card,
	Heading,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react'

interface PizzaCardProps {
	pizza: Pizza
	onSelect: () => void
}

export const PizzaCard = ({ pizza, onSelect }: PizzaCardProps) => {
	const cardBg = useColorModeValue('white', 'gray.600')
	return (
		<Card.Root
			maxW='sm'
			borderRadius='xl'
			overflow='hidden'
			boxShadow='lg'
			bg={cardBg}
			border='none'
		>
			<Box position='relative' height='200px' overflow='hidden'>
				<Image src={pizza.image} alt={pizza.name} />
			</Box>
			<Card.Body p={5}>
				<Stack>
					<Heading size='md' color='gray.100'>
						{pizza.name}
					</Heading>
					<Text color='gray.300' fontSize='sm'>
						Базовая цена: {pizza.basePrice} руб.
					</Text>
					<Text color='gray.400' fontSize='xs'>
						Дополнительные ингредиенты:{' '}
						{pizza.ingredients.map(ingredient => ingredient.name).join(', ')}
					</Text>
					<Button
						size='lg'
						width='full'
						borderRadius='full'
						_hover={{ bg: 'orange.500', transform: 'scale(1.05)' }}
						onClick={onSelect}
					>
						Добавить в корзину 🛒
					</Button>
				</Stack>
			</Card.Body>
		</Card.Root>
	)
}
