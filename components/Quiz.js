import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getDeck } from "../utils/api";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import AnswerQuiz from "./AnswerQuiz";
import QuestionQuiz from "./QuestionQuiz";

export default function Quiz({ route, navigation }) {
	const { deckTitle } = route.params;
	const [isQuestion, updateIsQuestion] = useState(true);
	const [thisDeck, updateThisDeck] = useState(null);
	const [index, updateIndex] = useState(0);
	const [correct, updateCorrect] = useState(0);
	const [incorrect, updateIncorrect] = useState(0);
	const [buttonText, updateButtonText] = useState("Next Card");

	useEffect(() => {
		const deck = deckTitle.replace(/ /g, "");
		getDeck(deck).then((response) => updateThisDeck(response));
	}, []);

	const deckLength = () => thisDeck.questions.length;

	const answerCheck = (answer) => {
		const correctAnswer = thisDeck.questions[index].answer;
		answer === correctAnswer ? updateCorrect(correct + 1) : updateIncorrect(incorrect + 1);
		return answer === correctAnswer ? true : false;
	};

	const handleAnswer = (answer) => {
		answerCheck(answer);
		updateIsQuestion(false);
		clearLocalNotification().then(() => setLocalNotification());
	};

	const handleNextCard = () => {
		if (index + 1 === deckLength()) {
			return navigation.navigate("Score");
		}
		if (index + 2 === deckLength()) {
			updateButtonText("Show Score");
		}
		updateIndex(index + 1);
		updateIsQuestion(true);
	};
	return thisDeck !== null ? (
		isQuestion === true ? (
			<QuestionQuiz
				thisDeck={thisDeck}
				deckTitle={deckTitle}
				onFlipPress={updateIsQuestion}
				index={index}
				onAnswer={handleAnswer}
			/>
		) : (
			<AnswerQuiz
				onFlipPress={updateIsQuestion}
				thisDeck={thisDeck}
				index={index}
				onNextCard={handleNextCard}
				buttonText={buttonText}
			/>
		)
	) : (
		<View>
			<Text>Loading...</Text>
		</View>
	);
}
