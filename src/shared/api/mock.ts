import type { Pizza } from '../types/pizza'

export const mockPizza: Pizza[] = [
	{
		id: '1',
		name: 'Пепперони',
		basePrice: 500,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '1-1', name: 'сыр моцарелла', price: 50 },
			{ id: '1-2', name: 'острый соус', price: 30 },
			{ id: '1-3', name: 'оливки', price: 40 },
			{ id: '1-4', name: 'доп. пепперони', price: 70 },
		],
	},
	{
		id: '2',
		name: 'Маргарита',
		basePrice: 400,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '2-1', name: 'базилик', price: 20 },
			{ id: '2-2', name: 'помидоры черри', price: 40 },
			{ id: '2-3', name: 'доп. сыр', price: 50 },
			{ id: '2-4', name: 'песто', price: 30 },
		],
	},
	{
		id: '3',
		name: 'Четыре сыра',
		basePrice: 550,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '3-1', name: 'горгонзола', price: 60 },
			{ id: '3-2', name: 'чеддер', price: 50 },
			{ id: '3-3', name: 'сливочный соус', price: 30 },
			{ id: '3-4', name: 'грибы', price: 40 },
		],
	},
	{
		id: '4',
		name: 'Гавайская',
		basePrice: 480,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '4-1', name: 'доп. ананас', price: 30 },
			{ id: '4-2', name: 'ветчина', price: 50 },
			{ id: '4-3', name: 'острый соус', price: 30 },
			{ id: '4-4', name: 'моцарелла', price: 50 },
		],
	},
	{
		id: '5',
		name: 'Барбекю',
		basePrice: 530,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '5-1', name: 'курица', price: 50 },
			{ id: '5-2', name: 'бекон', price: 50 },
			{ id: '5-3', name: 'лук', price: 20 },
			{ id: '5-4', name: 'соус барбекю', price: 30 },
		],
	},
	{
		id: '6',
		name: 'Вегетарианская',
		basePrice: 450,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '6-1', name: 'баклажаны', price: 40 },
			{ id: '6-2', name: 'цукини', price: 40 },
			{ id: '6-3', name: 'перец болгарский', price: 30 },
			{ id: '6-4', name: 'брокколи', price: 30 },
		],
	},
	{
		id: '7',
		name: 'Мясная',
		basePrice: 560,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '7-1', name: 'салями', price: 50 },
			{ id: '7-2', name: 'бекон', price: 50 },
			{ id: '7-3', name: 'курица', price: 50 },
			{ id: '7-4', name: 'говядина', price: 70 },
		],
	},
	{
		id: '8',
		name: 'Дьябло',
		basePrice: 520,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '8-1', name: 'халапеньо', price: 30 },
			{ id: '8-2', name: 'острый соус', price: 30 },
			{ id: '8-3', name: 'доп. пепперони', price: 70 },
			{ id: '8-4', name: 'лук красный', price: 20 },
		],
	},
	{
		id: '9',
		name: 'С грибами',
		basePrice: 470,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '9-1', name: 'белые грибы', price: 50 },
			{ id: '9-2', name: 'трюфельное масло', price: 60 },
			{ id: '9-3', name: 'шампиньоны', price: 40 },
			{ id: '9-4', name: 'лук', price: 20 },
		],
	},
	{
		id: '10',
		name: 'С морепродуктами',
		basePrice: 600,
		image: 'https://via.placeholder.com/150',
		ingredients: [
			{ id: '10-1', name: 'креветки', price: 80 },
			{ id: '10-2', name: 'кальмары', price: 70 },
			{ id: '10-3', name: 'мидии', price: 60 },
			{ id: '10-4', name: 'лимон', price: 10 },
		],
	},
]
