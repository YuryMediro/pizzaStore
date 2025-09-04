import type { Pizza } from '@/shared/types/pizza'
import {
	Button,
	Checkbox,
	CloseButton,
	Dialog,
	Portal,
	Stack,
	StackSeparator,
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

	const handleAddToCart = () => {
		onAddToCart(selectedIngredients)
		setSelectedIngredients([])
		onClose()
	}

	if (!pizza) return null
	return (
		<Dialog.Root open={open}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Добавить ингредиенты: {pizza.name}</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<Stack separator={<StackSeparator />}>
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
										<Checkbox.Control />
										<Checkbox.Label>
											{ingredient.name} (+{ingredient.price} руб.)
										</Checkbox.Label>
									</Checkbox.Root>
								))}
								<Button onClick={handleAddToCart}>Добавить в корзину</Button>
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
