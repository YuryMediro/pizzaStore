import { useColorModeValue } from '@/components/ui/color-mode'
import type { Pizza } from '@/shared/types/pizza'
import { Dialog, Portal } from '@chakra-ui/react'
import { useAddPizzaModal } from '@/shared/lib/useAddPizzaModal'
import { ModalHeader } from './ui/ModalHeader'
import { QuantitySection } from './ui/QuantitySection'
import { IngredientsSection } from './ui/IngredientsSection'
import { TotalPriceSection } from './ui/TotalPriceSection'
import { AddToCartButton } from './ui/AddToCartButton'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

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
	const data = useAddPizzaModal({ pizza, onAddToCart, onClose })
	const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

	useOnClickOutside(ref, onClose)

	if (!pizza) return null

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
						ref={ref}
						borderRadius='xl'
						p={6}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow='2xl'
						border='1px solid'
						borderColor={useColorModeValue('gray.200', 'gray.700')}
						maxW='480px'
						w='full'
					>
						<ModalHeader
							title={`Собери пиццу: ${pizza.name}`}
							onClose={onClose}
						/>

						<Dialog.Body>
							<QuantitySection
								decreaseQuantity={data.decreaseQuantity}
								increaseQuantity={data.increaseQuantity}
								quantity={data.quantity}
							/>

							<IngredientsSection
								ingredients={pizza.ingredients}
								selectedIngredients={data.selectedIngredients}
								toggleIngredient={data.toggleIngredient}
							/>

							<TotalPriceSection
								quantity={data.quantity}
								totalPrice={data.totalPrice}
							/>

							<AddToCartButton onClick={data.handleAddToCart} />
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}
