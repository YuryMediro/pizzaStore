import { HStack, IconButton, NumberInput } from '@chakra-ui/react'
import { LuMinus, LuPlus } from 'react-icons/lu'

interface QuantitySelectorProps {
	quantity: number
	increaseQuantity: () => void
	decreaseQuantity: () => void
}

export const QuantitySelector = ({
	quantity,
	decreaseQuantity,
	increaseQuantity,
}: QuantitySelectorProps) => {
	return (
		<NumberInput.Root
			defaultValue={String(quantity)}
			min={1}
			unstyled
			spinOnPress={false}
		>
			<HStack gap='2'>
				<NumberInput.DecrementTrigger asChild>
					<IconButton
						onClick={decreaseQuantity}
						disabled={quantity <= 1}
						colorPalette='white'
						variant='outline'
						borderRadius='full'
						size='sm'
					>
						<LuMinus />
					</IconButton>
				</NumberInput.DecrementTrigger>
				<NumberInput.ValueText textAlign='center' fontSize='lg' minW='3ch' />
				<NumberInput.IncrementTrigger asChild>
					<IconButton
						onClick={increaseQuantity}
						colorPalette='white'
						variant='outline'
						borderRadius='full'
						size='sm'
					>
						<LuPlus />
					</IconButton>
				</NumberInput.IncrementTrigger>
			</HStack>
		</NumberInput.Root>
	)
}
