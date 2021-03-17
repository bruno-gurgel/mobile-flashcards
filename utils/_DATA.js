export let initialData = {
	React: {
		title: "React",
		id: "x12wtmxeo8cn8s6mhedca",
		questions: [
			{
				question: "React was created by facebook?",
				answer: "True",
			},
			{
				question: "Are class components the best option for creating components in React?",
				answer: "False",
			},
			{
				question: "Do useMemo and useCallback do the same thing?",
				answer: "False",
			},
		],
	},
	JavaScript: {
		title: "JavaScript",
		id: "05y619j8ise5grhskyiipsq",
		questions: [
			{
				question: "Is closure related to lexical environment?",
				answer: "True",
			},
		],
	},
};

export const generateID = () =>
	Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export function _getDecks() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...initialData }), 1000);
	});
}
export function _getDeck(deck) {
	return new Promise((res, rej) => {
		setTimeout(() => res(initialData[deck]), 1000);
	});
}
export function _saveDeckTitle(title) {
	return new Promise((res, rej) => {
		setTimeout(
			() =>
				res(
					(initialData = {
						...decks,
						[title]: {
							title,
							id: generateID(),
							questions: [],
						},
					})
				),
			1000
		);
	});
}
export function _addCardToDeck(deck, question, answer) {
	return new Promise((res, rej) => {
		setTimeout(
			() =>
				res(
					(initialData = {
						...decks,
						[deck]: {
							...decks[deck],
							questions: [
								...decks[deck].questions,
								{
									question,
									answer,
								},
							],
						},
					})
				),
			1000
		);
	});
}
