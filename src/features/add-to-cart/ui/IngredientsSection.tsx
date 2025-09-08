import type { Ingredient } from '@/shared/types/pizza'
import { Checkbox, Stack, Text } from '@chakra-ui/react'

interface IngredientsSectionProps {
	ingredients: Ingredient[]
	selectedIngredients: string[]
	toggleIngredient: (id: string) => void
}

export const IngredientsSection = ({
	ingredients,
	selectedIngredients,
	toggleIngredient,
}: IngredientsSectionProps) => {
	return (
		<>
			<Text color='gray.300' mb={4} fontWeight='medium'>
				Выбери дополнительные ингредиенты:
			</Text>

			<Stack gap={4} mb={6}>
				{ingredients.map(ingredient => (
					<Checkbox.Root
						key={ingredient.id}
						checked={selectedIngredients.includes(ingredient.id)}
						onChange={() => toggleIngredient(ingredient.id)}
						cursor='pointer'
					>
						<Checkbox.HiddenInput />
						<Checkbox.Control
							borderColor='orange.300'
							_checked={{ bg: 'orange.500', borderColor: 'orange.500' }}
							cursor='pointer'
						/>
						<Checkbox.Label ml={2} fontSize='md' fontWeight='medium'>
							{ingredient.name}{' '}
							<Text as='span' color='orange.500' fontWeight='bold'>
								(+{ingredient.price}₽)
							</Text>
						</Checkbox.Label>
					</Checkbox.Root>
				))}
			</Stack>
		</>
	)
}
