import { useColorModeValue } from '@/components/ui/color-mode'
import { CloseButton, Dialog } from '@chakra-ui/react'

interface ModalHeaderProps {
	onClose: () => void
	title: string
}

export const ModalHeader = ({ onClose, title }: ModalHeaderProps) => {
	return (
		<Dialog.Header
			display='flex'
			justifyContent='space-between'
			alignItems='center'
		>
			<Dialog.Title color={useColorModeValue('orange.500', 'orange.300')}>
				{title}
			</Dialog.Title>
			<CloseButton onClick={onClose} size='sm' />
		</Dialog.Header>
	)
}
