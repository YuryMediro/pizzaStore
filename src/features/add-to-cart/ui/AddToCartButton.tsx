import { Button } from '@chakra-ui/react'

interface AddToCartButtonProps {
	onClick: () => void
}

export const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
	return (
		<Button
			size='lg'
			width='full'
			borderRadius='full'
			colorScheme='orange'
			onClick={onClick}
			_hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
			_active={{ transform: 'scale(0.98)' }}
			transition='all 0.2s ease'
			fontWeight='bold'
			fontSize='md'
		>
			Добавить в корзину 🛒
		</Button>
	)
}
