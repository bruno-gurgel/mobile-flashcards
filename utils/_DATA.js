const decks = {
	React: {
		title: "React",
		id: "x12wtmxeo8cn8s6mhedca",
		questions: [
			{
				question: "What is React?",
				answer: "A library for managing user interfaces",
			},
			{
				question: "Where do you make Ajax requests in React?",
				answer: "The useEffect hook",
			},
		],
	},
	JavaScript: {
		title: "JavaScript",
		id: "05y619j8ise5grhskyiipsq",
		questions: [
			{
				question: "What is a closure?",
				answer:
					"The combination of a function and the lexical environment within which that function was declared.",
			},
		],
	},
};

function generateID() {
	return (
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	);
}

export function _getDecks() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...decks }), 1000);
	});
}
export function _getDeck() {}
export function _saveDeckTitle() {}
export function _addCardToDeck() {}
