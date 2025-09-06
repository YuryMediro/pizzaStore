import { useColorModeValue } from '@/components/ui/color-mode'
import type { Pizza } from '@/shared/types/pizza'
import {
	Button,
	Checkbox,
	CloseButton,
	Dialog,
	Portal,
	Stack,
	Text,
} from '@chakra-ui/react'
import { useState } from 'react'

interface AddPizzaModalProps {
	pizza: Pizza | null
	open: boolean
	onClose: () => void
	onAddToCart: (selectedIngredients: string[]) => void
}

export const AddPizzaModal = ({
	pizza,
	open,
	onClose,
	onAddToCart,
}: AddPizzaModalProps) => {
	const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
	const bgColor = useColorModeValue('white', 'gray.700')
	const borderColor = useColorModeValue('gray.200', 'gray.700')

	const handleAddToCart = () => {
		onAddToCart(selectedIngredients)
		setSelectedIngredients([])
		onClose()
	}

	if (!pizza) return null
	return (
		<Dialog.Root open={open}>
			<Portal>
				<Dialog.Backdrop
					style={{
						background: 'rgba(0,0,0,0.4)',
						backdropFilter: 'blur(4px)',
					}}
				/>
				<Dialog.Positioner>
					<Dialog.Content
						borderRadius='xl'
						p={6}
						bg={bgColor}
						boxShadow='2xl'
						border='1px solid'
						borderColor={borderColor}
						w='full'
					>
						<Dialog.Header>
							<Dialog.Title color='orange.500'>
								Собери пиццу: {pizza.name}
							</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Text color='gray.400' mb={4}>
								Выбери дополнительные ингредиенты:
							</Text>
							<Stack gap={6}>
								{pizza.ingredients.map(ingredient => (
									<Checkbox.Root
										key={ingredient.id}
										checked={selectedIngredients.includes(ingredient.id)}
										onChange={() =>
											setSelectedIngredients(prev =>
												prev.includes(ingredient.id)
													? prev.filter(id => id !== ingredient.id)
													: [...prev, ingredient.id]
											)
										}
									>
										<Checkbox.HiddenInput />
										<Checkbox.Control
											borderColor='orange.300'
											_checked={{ bg: 'orange.500', borderColor: 'orange.500' }}
										/>
										<Checkbox.Label ml={2} fontSize='md'>
											{ingredient.name}{' '}
											<Text as='span' color='orange.500'>
												(+{ingredient.price}₽)
											</Text>
										</Checkbox.Label>
									</Checkbox.Root>
								))}

								<Button
									mt={4}
									size='lg'
									width='full'
									borderRadius='full'
									_hover={{ bg: 'orange.500', transform: 'scale(1.05)' }}
									onClick={handleAddToCart}
								>
									Добавить в корзину
								</Button>
							</Stack>
						</Dialog.Body>
						<Dialog.CloseTrigger asChild>
							<CloseButton onClick={onClose} size='sm' />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}
