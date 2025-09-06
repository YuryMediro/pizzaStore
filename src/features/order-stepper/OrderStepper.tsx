import { Steps, Box, Text, VStack } from '@chakra-ui/react'
import type { CartItem, UserInfo } from '@/shared/types/pizza'
import { CartItemList } from '@/widgetes/cart-items-list/CartItemList'
import { UserForm } from '@/widgetes/user-form/UserForm'
import { OrderConfirm } from '@/widgetes/order-confirm/OrderConfirm'
import { useStepperState } from '@/shared/lib/useStepperState'
import { useOrderHandling } from '@/shared/lib/useOrderHandling'
import { StepperNavigation } from '../stepper-navigation/StepperNavigation'
import { useStepperNavigation } from '@/shared/lib/useStepperNavigation'
import { steps } from '@/shared/lib/steps'

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
				<Steps.List
					flexDirection={{ base: 'column', md: 'row' }}
					gap={{ base: 4, md: 2 }}
				>
					{steps.map((step, index) => (
						<Steps.Item key={index} index={index} title={step.title}>
							<Steps.Indicator
								borderColor='orange.300'
								bg={
									index <= dataStepper.currentStep ? 'orange.500' : 'gray.500'
								}
							/>
							<Steps.Title
								fontWeight={
									index === dataStepper.currentStep ? 'bold' : 'normal'
								}
								color={
									index <= dataStepper.currentStep ? 'orange.600' : 'gray.500'
								}
							>
								{step.title}
							</Steps.Title>
							<Steps.Separator />
						</Steps.Item>
					))}
				</Steps.List>

				<Box width='full'>
					<Steps.Content index={0}>
						<Text fontWeight='bold' color={'gray.500'} mb={4}>
							{steps[0].description}
						</Text>
						<CartItemList
							cart={cart}
							onRemoveItem={onRemoveItem}
							totalPrice={totalPrice}
							onUpdateQuantity={onUpdateQuantity}
						/>
					</Steps.Content>

					<Steps.Content index={1}>
						<Text fontWeight='bold' color={'gray.500'} mb={4}>
							{steps[1].description}
						</Text>
						<UserForm
							onSubmit={handleUserSubmit}
							onFormValidityChange={handleFormValidityChange}
							initialData={dataStepper.userData}
						/>
					</Steps.Content>

					<Steps.Content index={2}>
						<Text fontWeight='bold' color={'gray.500'} mb={4}>
							{steps[2].description}
						</Text>
						<OrderConfirm
							cart={cart}
							userData={dataStepper.userData}
							totalPrice={totalPrice}
						/>
					</Steps.Content>
				</Box>

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
