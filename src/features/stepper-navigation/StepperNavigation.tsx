import { Button, ButtonGroup, Text } from '@chakra-ui/react'
import { Steps } from '@chakra-ui/react'

interface StepperNavigationProps {
	currentStep: number
	isFormValid: boolean
	userData: any | null
	onNext: () => void
	onPrev: () => void
	onConfirm: () => void
}

export const StepperNavigation = ({
	currentStep,
	isFormValid,
	userData,
	onNext,
	onPrev,
	onConfirm,
}: StepperNavigationProps) => {
	return (
		<>
			<ButtonGroup size='sm' variant='subtle'>
				{currentStep > 0 && (
					<Steps.PrevTrigger asChild>
						<Button
							onClick={onPrev}
							colorPalette='gray'
							size='lg'
							borderRadius='full'
						>
							← Назад
						</Button>
					</Steps.PrevTrigger>
				)}

				{currentStep === 2 ? (
					<Button
						onClick={onConfirm}
						colorPalette='teal'
						variant='solid'
						size='lg'
						borderRadius='full'
						flex='2'
						fontWeight='bold'
						_hover={{ transform: 'scale(1)', boxShadow: 'md' }}
						transition='all 0.2s ease'
					>
						✅ Подтвердить заказ
					</Button>
				) : (
					<Steps.NextTrigger asChild>
						<Button
							onClick={onNext}
							disabled={currentStep === 1 && !userData}
							colorPalette='gray'
							size='lg'
							borderRadius='full'
						>
							Далее →
						</Button>
					</Steps.NextTrigger>
				)}
			</ButtonGroup>

			{currentStep === 1 && !isFormValid && (
				<Text color='orange.500' fontSize='sm' textAlign='center'>
					⚠️ Заполните все обязательные поля для продолжения
				</Text>
			)}
		</>
	)
}
