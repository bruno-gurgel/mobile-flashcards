import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getDeck } from "../utils/api";

export default function QuestionQuiz(props) {
	const { deckTitle } = props;

	const [thisDeck, updateThisDeck] = useState(null);
	const [index, updateIndex] = useState(0);

	useEffect(() => {
		getDeck(deckTitle).then((response) => updateThisDeck(response));
	}, []);

	return (
		<View style={styles.view}>
			{thisDeck !== null && thisDeck.questions.length !== 0 ? (
				<View style={styles.view}>
					<Text style={styles.control}>{`${index + 1}/${
						thisDeck.questions.length
					}`}</Text>
					<View style={styles.container}>
						<View>
							<Text style={styles.question}>
								{thisDeck.questions[index].question}
							</Text>
							<TouchableOpacity>
								<Text style={styles.flip}>Answer</Text>
							</TouchableOpacity>
						</View>
						<View>
							<TouchableOpacity
								style={[
									styles.button,
									{
										backgroundColor: "#009900",
										marginBottom: 20,
									},
								]}
							>
								<Text style={styles.buttonText}>Correct</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.button,
									{
										backgroundColor: "#ff0000",
									},
								]}
							>
								<Text style={styles.buttonText}>Incorrect</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			) : (
				<View style={styles.noCards}>
					<Text style={styles.question}>
						Sorry, you cannot take a quiz because there are no cards in this deck.
					</Text>
				</View>
			)}
		</View>
	);
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
