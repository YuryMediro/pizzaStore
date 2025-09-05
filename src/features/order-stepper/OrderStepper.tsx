import { Button, ButtonGroup, Steps, Box, Text, VStack } from '@chakra-ui/react'
import type { CartItem, UserInfo } from '@/shared/types/pizza'
import { CartItemList } from '@/widgetes/cart-items-list/CartItemList'
import { UserForm } from '@/widgetes/user-form/UserForm'
import { toaster } from '@/components/ui/toaster'
import { useState } from 'react'

interface CartStepperProps {
	cart: CartItem[]
	onRemoveItem: (itemId: string, selectedIngredients: string[]) => void
	totalPrice: number
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
}: CartStepperProps) => {
	 const [userData, setUserData] = useState<UserInfo | null>(null)

	   const handleUserSubmit = (data: UserInfo) => {
				setUserData(data)
			}

	 const handleOrderConfirm = () => {
			toaster.create({
				title: 'Заказ оформлен!',
				description: 'Ваш заказ успешно принят в обработку',
				type: 'success',
				duration: 3000,
				closable: true,
			})
		
		}
	return (
		<Steps.Root defaultStep={0} count={steps.length} variant='subtle' mt={15}>
			<VStack gap={8} width='100%'>
				<Steps.List
					flexDirection={{ base: 'column', md: 'row' }}
					gap={{ base: 4, md: 2 }}
				>
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
						<CartItemList
							cart={cart}
							onRemoveItem={onRemoveItem}
							totalPrice={totalPrice}
						/>
					</Steps.Content>

					<Steps.Content index={1}>
						<UserForm onSubmit={handleUserSubmit} />
					</Steps.Content>

					<Steps.Content index={2}></Steps.Content>

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
