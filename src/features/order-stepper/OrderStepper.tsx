import { Steps, VStack } from '@chakra-ui/react'
import type { CartItem, UserInfo } from '@/shared/types/pizza'

import { useStepperState } from '@/shared/lib/useStepperState'
import { useOrderHandling } from '@/shared/lib/useOrderHandling'
import { StepperNavigation } from '../stepper-navigation/StepperNavigation'
import { useStepperNavigation } from '@/shared/lib/useStepperNavigation'
import { steps } from '@/shared/lib/steps'
import { StepperHeader } from './ui/StepperHeader'
import { StepperContent } from './ui/StepperContent'

interface CartStepperProps {
	cart: CartItem[]
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	totalPrice: number
	onOrderConfirm: () => void
	onUpdateQuantity: (
		itemId: string,
		selectedIngredients: string[],
		newQuantity: number
	) => void
}

export const CartStepper = ({
	cart,
	onRemoveItem,
	totalPrice,
	onOrderConfirm,
	onUpdateQuantity,
}: CartStepperProps) => {
	const dataStepper = useStepperState()

	const { handleOrderConfirm } = useOrderHandling(
		onOrderConfirm,
		dataStepper.resetStepper
	)
	const navigation = useStepperNavigation({
		currentStep: dataStepper.currentStep,
		setCurrentStep: dataStepper.setCurrentStep,
		onOrderConfirm: handleOrderConfirm,
	})

	const handleUserSubmit = (data: UserInfo) => {
		dataStepper.setUserData(data)
	}

	const handleFormValidityChange = (isValid: boolean) => {
		dataStepper.setIsFormValid(isValid)
	}

	return (
		<Steps.Root
			defaultStep={dataStepper.currentStep}
			count={steps.length}
			variant='subtle'
			mt={15}
			onStepChange={navigation.handleStepChange}
		>
			<VStack gap={8} width='100%'>
				<StepperHeader currentStep={dataStepper.currentStep} />

				<StepperContent
					cart={cart}
					onRemoveItem={onRemoveItem}
					onUpdateQuantity={onUpdateQuantity}
					totalPrice={totalPrice}
					userData={dataStepper.userData}
					handleUserSubmit={handleUserSubmit}
					handleFormValidityChange={handleFormValidityChange}
				/>

				<StepperNavigation
					currentStep={dataStepper.currentStep}
					isFormValid={dataStepper.isFormValid}
					userData={dataStepper.userData}
					onNext={navigation.handleNext}
					onPrev={navigation.handlePrev}
					onConfirm={handleOrderConfirm}
				/>
			</VStack>
		</Steps.Root>
	)
}
