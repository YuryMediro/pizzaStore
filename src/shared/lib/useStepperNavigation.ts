import { useCallback } from 'react'

interface UseStepperNavigationProps {
	currentStep: number
	setCurrentStep: (step: number | ((prev: number) => number)) => void
	onOrderConfirm: () => void
}

export const useStepperNavigation = ({
	currentStep,
	setCurrentStep,
	onOrderConfirm,
}: UseStepperNavigationProps) => {
	const handleNext = useCallback(() => {
		if (currentStep === 2) {
			onOrderConfirm()
		} else {
			setCurrentStep(prev => prev + 1)
		}
	}, [currentStep, onOrderConfirm, setCurrentStep])

	const handlePrev = useCallback(() => {
		setCurrentStep(prev => prev - 1)
	}, [setCurrentStep])

	const handleStepChange = useCallback(
		(details: { step: number }) => {
			setCurrentStep(details.step)
		},
		[setCurrentStep]
	)

	return {
		handleNext,
		handlePrev,
		handleStepChange,
	}
}
