import { steps } from '@/shared/lib/steps'
import { Steps } from '@chakra-ui/react'

interface StepperHeaderProps {
	currentStep: number
}

export const StepperHeader = ({ currentStep }: StepperHeaderProps) => {
	return (
		<Steps.List
			flexDirection={{ base: 'column', md: 'row' }}
			gap={{ base: 4, md: 2 }}
			alignItems={'flex-start'}
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
	)
}
