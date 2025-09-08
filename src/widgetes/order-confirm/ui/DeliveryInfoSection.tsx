import type { UserInfo } from '@/shared/types/pizza'
import { Badge, HStack, Text, VStack } from '@chakra-ui/react'

interface DeliveryInfoSectionProps {
	userData: UserInfo
}

export const DeliveryInfoSection = ({ userData }: DeliveryInfoSectionProps) => {
	return (
		<VStack align='start' overflow='hidden'>
			<HStack maxWidth={'100%'}>
				<Badge colorPalette='gray' borderRadius='full' px={3} py={1}>
					Имя:
				</Badge>{' '}
				<Text
					color='black'
					textOverflow='ellipsis'
					maxHeight='100px'
					whiteSpace='nowrap'
					overflow='hidden'
				>
					{userData.name}
				</Text>
			</HStack>
			<HStack maxWidth={'100%'}>
				<Badge colorPalette='gray' borderRadius='full' px={3} py={1}>
					Телефон:
				</Badge>{' '}
				<Text
					color='black'
					textOverflow='ellipsis'
					maxHeight='100px'
					whiteSpace='nowrap'
					overflow='hidden'
				>
					{userData.phone}
				</Text>
			</HStack>
			<HStack maxWidth={'100%'}>
				<Badge colorPalette='gray' borderRadius='full' px={3} py={1}>
					Адрес:
				</Badge>{' '}
				<Text
					color='black'
					textOverflow='ellipsis'
					maxHeight='100px'
					whiteSpace='nowrap'
					overflow='hidden'
				>
					{userData.address}
				</Text>
			</HStack>
			{userData.comment && (
				<HStack maxWidth={'100%'}>
					<Badge colorPalette='gray' borderRadius='full' px={3} py={1}>
						Комментарий:
					</Badge>{' '}
					<Text
						color='black'
						textOverflow='ellipsis'
						maxHeight='100px'
						whiteSpace='nowrap'
						overflow='hidden'
					>
						{userData.comment}
					</Text>
				</HStack>
			)}
		</VStack>
	)
}
