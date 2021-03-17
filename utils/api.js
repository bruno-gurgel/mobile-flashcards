import AsyncStorage from "@react-native-async-storage/async-storage";
import { _addCardToDeck, _getDecks, initialData, generateID } from "./_DATA";
import { DECKS_STORAGE_KEY } from "./helpers";

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

export const saveDeckTitle = (title) => {
	try {
		return AsyncStorage.mergeItem(
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

export const removeDeck = (title) => {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
			const data = JSON.parse(result);
			delete data[title];

			return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data)).then(() =>
				alert("Deck was successfully deleted!")
			);
		});
	} catch {
		alert("Failed to delete deck!");
	}
};
