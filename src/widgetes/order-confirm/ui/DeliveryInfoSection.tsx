import type { UserInfo } from '@/shared/types/pizza'
import { Badge, HStack, Text, VStack } from '@chakra-ui/react'

interface DeliveryInfoSectionProps {
	userData: UserInfo
}

export const DeliveryInfoSection = ({userData}: DeliveryInfoSectionProps) => {
	return (
		<VStack align='start'>
			<HStack>
				<Badge colorPalette='blue' borderRadius='full' px={3} py={1}>
					Имя:
				</Badge>{' '}
				<Text color='black'>{userData.name}</Text>
			</HStack>
			<HStack>
				<Badge colorPalette='green' borderRadius='full' px={3} py={1}>
					Телефон:
				</Badge>{' '}
				<Text color='black'>{userData.phone}</Text>
			</HStack>
			<HStack>
				<Badge colorPalette='purple' borderRadius='full' px={3} py={1}>
					Адрес:
				</Badge>{' '}
				<Text color='black'>{userData.address}</Text>
			</HStack>
			{userData.comment && (
				<HStack>
					<Badge colorPalette='gray' borderRadius='full' px={3} py={1}>
						Комментарий:
					</Badge>{' '}
					<Text color='black'>{userData.comment}</Text>
				</HStack>
			)}
		</VStack>
	)
}
