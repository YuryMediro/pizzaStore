import { useEffect, useState } from 'react'
import type { UserInfo } from '../types/pizza'

const STEPPER_STORAGE_KEY = 'pizza-order-step'
const USER_DATA_STORAGE_KEY = 'pizza-order-user-data'

export interface StepperState {
	currentStep: number
	userData: UserInfo | null
	isFormValid: boolean
}

export const useStepperState = () => {
	const [currentStep, setCurrentStep] = useState(() => {
		if (typeof window === 'undefined') return 0
		const saved = sessionStorage.getItem(STEPPER_STORAGE_KEY)
		const parsed = parseInt(saved || '0', 10)
		return isNaN(parsed) || parsed < 0 ? 0 : parsed
	})

	const [userData, setUserData] = useState<UserInfo | null>(() => {
		if (typeof window === 'undefined') return null

		const saved = sessionStorage.getItem(USER_DATA_STORAGE_KEY)
		if (!saved) return null

		try {
			return JSON.parse(saved)
		} catch {
			return null
		}
	})

	const [isFormValid, setIsFormValid] = useState(false)

	useEffect(() => {
		sessionStorage.setItem(STEPPER_STORAGE_KEY, currentStep.toString())
	}, [currentStep])

	useEffect(() => {
		if (userData) {
			sessionStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(userData))
		} else {
			sessionStorage.removeItem(USER_DATA_STORAGE_KEY)
		}
	}, [userData])

	const resetStepper = () => {
		setCurrentStep(0)
		setUserData(null)
		setIsFormValid(false)
		sessionStorage.removeItem(STEPPER_STORAGE_KEY)
		sessionStorage.removeItem(USER_DATA_STORAGE_KEY)
	}

	return {
		currentStep,
		setCurrentStep,
		userData,
		setUserData,
		isFormValid,
		setIsFormValid,
		resetStepper,
	}
}
