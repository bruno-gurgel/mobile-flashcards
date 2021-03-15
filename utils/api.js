import { _addCardToDeck, _getDecks } from "./_DATA";

export function getAllDecks() {
	return _getDecks();
}

export function addCard(deck, question, answer) {
	return _addCardToDeck(deck, question, answer);
}
