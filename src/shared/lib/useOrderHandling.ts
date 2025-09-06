import { toaster } from '@/components/ui/toaster'

export const useOrderHandling = (
	onOrderConfirm: () => void,
	resetStepper: () => void
) => {
	const handleOrderConfirm = () => {
		toaster.success({
			title: 'Заказ оформлен!',
			description: 'Ваш заказ успешно принят в обработку',
			type: 'success',
			duration: 3000,
			closable: true,
		})
		onOrderConfirm()
		resetStepper()
	}

	return { handleOrderConfirm }
}
