import { useEffect, useRef } from 'react'

export const useAnimatedPrice = <T extends number>(value: T) => {
	const prevPriceRef = useRef(value)
	useEffect(() => {
		prevPriceRef.current = value
	}, [value])

	return { current: value, previous: prevPriceRef.current }
}
