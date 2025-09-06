import {
	Button,
	ButtonGroup,
	Steps,
	Box,
	Text,
	VStack,
	
} from '@chakra-ui/react'
import type { CartItem, UserInfo } from '@/shared/types/pizza'
import { CartItemList } from '@/widgetes/cart-items-list/CartItemList'
import { UserForm } from '@/widgetes/user-form/UserForm'
import { toaster } from '@/components/ui/toaster'
import { useState } from 'react'
import { OrderConfirm } from '@/widgetes/order-confirm/OrderConfirm'

interface CartStepperProps {
	cart: CartItem[]
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	totalPrice: number
	onOrderConfirm: () => void
}

const steps = [
	{ title: 'Корзина', description: 'Содержимое вашей корзины:' },
	{ title: 'Данные', description: 'Данные для доставки' },
	{ title: 'Подтверждение', description: 'Подтверждение заказа' },
]

export const CartStepper = ({
	cart,
	onRemoveItem,
	totalPrice,
	onOrderConfirm,
}: CartStepperProps) => {
	const [userData, setUserData] = useState<UserInfo | null>(null)
	const [currentStep, setCurrentStep] = useState(0)
	const [isFormValid, setIsFormValid] = useState(false)

	const handleUserSubmit = (data: UserInfo) => {
		setUserData(data)
	}

	const handleFormValidityChange = (isValid: boolean) => {
		setIsFormValid(isValid)
	}

	const handleOrderConfirm = () => {
		toaster.success({
			title: 'Заказ оформлен!',
			description: 'Ваш заказ успешно принят в обработку',
			type: 'success',
			duration: 3000,
			closable: true,
		})
		onOrderConfirm()
	}

	const handleNext = () => {
		if (currentStep === 2) {
			handleOrderConfirm()
		} else {
			setCurrentStep(prev => prev + 1)
		}
	}

	const handlePrev = () => {
		setCurrentStep(prev => prev - 1)
	}

	const handleStepChange = (details: { step: number }) => {
		setCurrentStep(details.step)
	}
	return (
		<Steps.Root
			defaultStep={currentStep}
			count={steps.length}
			variant='subtle'
			mt={15}
			onStepChange={handleStepChange}
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
								bg={index <= currentStep ? 'orange.500' : 'gray.500'}
							/>
							<Steps.Title
								fontWeight={index === currentStep ? 'bold' : 'normal'}
								color={index <= currentStep ? 'orange.600' : 'gray.500'}
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
						/>
					</Steps.Content>

					<Steps.Content index={1}>
						<Text fontWeight='bold' color={'gray.500'} mb={4}>
							{steps[1].description}
						</Text>
						<UserForm
							onSubmit={handleUserSubmit}
							onFormValidityChange={handleFormValidityChange}
						/>
					</Steps.Content>

					<Steps.Content index={2}>
						<Text fontWeight='bold' color={'gray.500'} mb={4}>
							{steps[2].description}
						</Text>
						<OrderConfirm
							cart={cart}
							userData={userData}
							totalPrice={totalPrice}
						/>
					</Steps.Content>
				</Box>

				<ButtonGroup size='sm' variant='subtle'>
					{currentStep > 0 && (
						<Steps.PrevTrigger asChild>
							<Button
								onClick={handlePrev}
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
							onClick={handleOrderConfirm}
							colorPalette='teal'
							variant='solid'
							size='lg'
							borderRadius='full'
							flex='2'
							fontWeight='bold'
							_hover={{ transform: 'scale(1)', boxShadow: 'md' }}
							transition='all 0.2s ease'
						>
							✅ Подвердить заказ
						</Button>
					) : (
						<Steps.NextTrigger asChild>
							<Button
								onClick={handleNext}
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
			</VStack>
		</Steps.Root>
	)
}
