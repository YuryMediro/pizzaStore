import { Button, ButtonGroup, Steps, Box, Text, VStack } from '@chakra-ui/react'
import type { CartItem } from '@/shared/types/pizza'
import { CartItemList } from '@/widgetes/cart-items-list/CartItemList'

interface CartStepperProps {
	cart: CartItem[]
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	totalPrice: number
}

const steps = [
	{ title: 'Корзина', description: 'Содержимое вашей корзины:' },
	{ title: 'Данные', description: 'Форма для ввода данных' },
	{ title: 'Подтверждение', description: 'Подтверждение заказа' },
]

const DataStepContent = () => {
	return <Box p={4}></Box>
}

const ConfirmationStepContent = () => {
	return <Box p={4}></Box>
}

export const CartStepper = ({
	cart,
	onRemoveItem,
	totalPrice,
}: CartStepperProps) => {
	return (
		<Steps.Root defaultStep={0} count={steps.length} variant='subtle' mt={15}>
			<VStack gap={8} width='100%'>
				<Steps.List>
					{steps.map((step, index) => (
						<Steps.Item key={index} index={index} title={step.title}>
							<Steps.Indicator />
							<Steps.Title>
								<Text color={'gray.500'}>{step.title}</Text>
							</Steps.Title>
							<Steps.Separator />
						</Steps.Item>
					))}
				</Steps.List>

				{steps.map((step, index) => (
					<Steps.Content key={index} index={index}>
						<Text fontWeight='bold' color={'gray.500'}>
							{step.description}
						</Text>
					</Steps.Content>
				))}

				<Box width='100%'>
					<Steps.Content index={0}>
						<CartItemList cart={cart} onRemoveItem={onRemoveItem} totalPrice ={totalPrice} />
					</Steps.Content>

					<Steps.Content index={1}>
						<DataStepContent />
					</Steps.Content>

					<Steps.Content index={2}>
						<ConfirmationStepContent />
					</Steps.Content>

					<Steps.CompletedContent>
						<Text color={'green.500'}>Заказ успешно оформлен!</Text>
					</Steps.CompletedContent>
				</Box>

				<ButtonGroup size='sm' variant='subtle'>
					<Steps.PrevTrigger asChild>
						<Button>Назад</Button>
					</Steps.PrevTrigger>
					<Steps.NextTrigger asChild>
						<Button>Далее</Button>
					</Steps.NextTrigger>
				</ButtonGroup>
			</VStack>
		</Steps.Root>
	)
}
