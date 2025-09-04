import {
	Button,
	ButtonGroup,
	Steps,
	StepsDescription,
	StepsIndicator,
	StepsStatus,
	StepsTitle,
} from '@chakra-ui/react'

interface CartStepperProps {}

const steps = [
	{ title: 'Корзина', description: 'Просмотр заказа' },
	{ title: 'Данные', description: 'Ввод информации' },
	{ title: 'Подтверждение', description: 'Подтверждение заказа' },
]

export const CartStepperss = ({}: CartStepperProps) => {
	return (
		<Steps.Root defaultStep={1} count={steps.length}>
			<Steps.List>
				{steps.map((step, index) => (
					<Steps.Item key={index} index={index} title={step.title}>
						<Steps.Indicator />
						<Steps.Title>{step.title}</Steps.Title>
						<Steps.Separator />
					</Steps.Item>
				))}
			</Steps.List>

			{steps.map((step, index) => (
				<Steps.Content key={index} index={index}>
					{step.description}
				</Steps.Content>
			))}
			<Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

			<ButtonGroup size='sm' variant='outline'>
				<Steps.PrevTrigger asChild>
					<Button>Prev</Button>
				</Steps.PrevTrigger>
				<Steps.NextTrigger asChild>
					<Button>Next</Button>
				</Steps.NextTrigger>
			</ButtonGroup>
		</Steps.Root>
	)
}
