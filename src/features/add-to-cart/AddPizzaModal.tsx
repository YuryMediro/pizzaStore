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
	HStack,
	Box,
} from '@chakra-ui/react'
import { getPizzaLabel } from '@/shared/lib/getPizzaLabel'
import { useAddPizzaModal } from '@/shared/lib/useAddPizzaModal'
import { AnimatedPrice } from '@/shared/ui/AnimatedPrice'
import { QuantitySelector } from '@/shared/ui/QuantitySelector'

interface AddPizzaModalProps {
	pizza: Pizza | null
	open: boolean
	onClose: () => void
	onAddToCart: (selectedIngredients: string[], quantity: number) => void
}

export const AddPizzaModal = ({
	pizza,
	open,
	onClose,
	onAddToCart,
}: AddPizzaModalProps) => {
	const bgColor = useColorModeValue('white', 'gray.700')
	const borderColor = useColorModeValue('gray.200', 'gray.700')
	const accentColor = useColorModeValue('orange.500', 'orange.300')
	const data = useAddPizzaModal({ pizza, onAddToCart, onClose })

	return (
		<Dialog.Root open={open} onOpenChange={open => !open && onClose()}>
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
						maxW='480px'
						w='full'
					>
						<Dialog.Header
							display='flex'
							justifyContent='space-between'
							alignItems='center'
						>
							<Dialog.Title color={accentColor}>
								Собери пиццу: {pizza?.name}
							</Dialog.Title>
							<CloseButton onClick={onClose} size='sm' />
						</Dialog.Header>

						<Dialog.Body>
							<Box
								mb={6}
								p={4}
								bg={useColorModeValue('gray.50', 'gray.800')}
								borderRadius='lg'
							>
								<HStack justify='space-between' align='center'>
									<Text fontWeight='medium' color='gray.300'>
										Количество:
									</Text>
									<QuantitySelector
										quantity={data.quantity}
										decreaseQuantity={data.decreaseQuantity}
										increaseQuantity={data.increaseQuantity}
									/>
								</HStack>
							</Box>

							<Text color='gray.500' mb={4} fontWeight='medium'>
								Выбери дополнительные ингредиенты:
							</Text>

							<Stack gap={4} mb={6}>
								{pizza?.ingredients.map(ingredient => (
									<Checkbox.Root
										key={ingredient.id}
										checked={data.selectedIngredients.includes(ingredient.id)}
										onChange={() => data.toggleIngredient(ingredient.id)}
									>
										<Checkbox.HiddenInput />
										<Checkbox.Control
											borderColor='orange.300'
											_checked={{ bg: 'orange.500', borderColor: 'orange.500' }}
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

							<Box
								p={4}
								bg={useColorModeValue('orange.50', 'orange.600')}
								borderRadius='lg'
								mb={6}
								textAlign='center'
							>
								<Text fontSize='lg' color='gray.800' mb={1}>
									💰 Итого за {data.quantity} {getPizzaLabel(data.quantity)}:
								</Text>
								<Text fontSize='2xl' fontWeight='extrabold' color={accentColor}>
									<AnimatedPrice price={data.totalPrice} />
								</Text>
							</Box>

							<Button
								size='lg'
								width='full'
								borderRadius='full'
								colorScheme='orange'
								onClick={data.handleAddToCart}
								_hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
								_active={{ transform: 'scale(0.98)' }}
								transition='all 0.2s ease'
								fontWeight='bold'
								fontSize='md'
							>
								Добавить в корзину 🛒
							</Button>
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}
