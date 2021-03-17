import AsyncStorage from "@react-native-async-storage/async-storage";
import { _addCardToDeck, _getDecks, initialData, generateID } from "./_DATA";

const DECKS_STORAGE_KEY = "MobileFlashcards:decks";

export function addCard(deck, question, answer) {
	return _addCardToDeck(deck, question, answer);
}

export const handleInitialData = async () => {
	try {
		const savedData = await AsyncStorage.setItem(
			DECKS_STORAGE_KEY,
			JSON.stringify(initialData)
		);
		return savedData;
	} catch (e) {
		alert("Failed to save data.");
	}
};

export const getDecks = () =>
	AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) =>
		data ? JSON.parse(data) : handleInitialData()
	);

export const getDeck = (id) => {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) =>
			data ? JSON.parse(data)[id] : null
		);
	} catch (e) {
		alert("Failed to get the deck!");
	}
};

export const addCardToDeck = (title, card) => {
	try {
		return getDeck(title).then((data) =>
			AsyncStorage.mergeItem(
				DECKS_STORAGE_KEY,
				JSON.stringify({
					[title]: {
						questions: [...data.questions, card],
					},
				})
			)
		);
	} catch (e) {
		alert("Failed to add card!");
	}
};

export const saveDeckTitle = async (title) => {
	try {
		AsyncStorage.mergeItem(
			DECKS_STORAGE_KEY,
			JSON.stringify({
				[title]: {
					title,
					id: generateID(),
					questions: [],
				},
			})
		).then((result) => console.log(result));
	} catch (e) {
		alert("Failed to add deck!");
	}
};
