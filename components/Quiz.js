import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getDeck } from "../utils/api";
import QuestionQuiz from "./QuestionQuiz";

export default function Quiz({ route }) {
	const { deckTitle } = route.params;
	const [isQuestion, updateIsQuestion] = useState(true);

	return isQuestion === true ? <QuestionQuiz deckTitle={deckTitle} /> : null;
}
const styles = StyleSheet.create({
	view: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
	},
	control: {
		marginTop: 20,
		marginLeft: 15,
		fontSize: 20,
	},
	question: {
		fontSize: 30,
		fontWeight: "bold",
	},
	flip: {
		marginTop: 15,
		fontSize: 18,
		alignSelf: "center",
		color: "#ff0000",
	},
	button: {
		justifyContent: "center",
		alignSelf: "center",
		width: 150,
		height: 60,
		borderRadius: 8,
	},
	buttonText: {
		alignSelf: "center",
		fontSize: 20,
		color: "#fff",
	},
	noCards: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
});
