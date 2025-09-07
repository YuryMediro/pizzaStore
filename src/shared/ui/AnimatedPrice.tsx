import { useAnimatedPrice } from '@/shared/lib/useAnimatedPrice'
import CountUp from 'react-countup'

export const AnimatedPrice = ({ price }: { price: number }) => {
	const { previous: prevPrice } = useAnimatedPrice(price)

	return (
		<CountUp
			start={prevPrice}
			end={price}
			duration={1}
			separator=' '
			suffix=' ₽'
		/>
	)
}
