import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Input } from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";
import { addCardToDeck, getDeck } from "../utils/api";

const radio_props = [
	{ label: "Correct", value: true },
	{ label: "Incorrect", value: false },
];

export default function NewCard({ navigation, route }) {
	const [input, updateInput] = useState("");
	const [selectedAnswer, updateSelectedAnswer] = useState(null);

	const isDisabled = () => (input === "" || selectedAnswer === null ? true : false);

	const handleSubmit = () => {
		if (input !== "" && selectedAnswer !== null) {
			const deck = route.params.deckTitle;
			const card = {
				question: input,
				answer: selectedAnswer,
			};
			addCardToDeck(deck, card).then(() => {
				getDeck(deck).then((updatedDeck) =>
					navigation.navigate("Deck", {
						title: deck,
						deck: updatedDeck,
						numberOfCards: updatedDeck.questions.length,
					})
				);
			});
		} else {
			alert("You must fill the question and the answer!");
		}
	};
	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Input
				placeholder="Type your question here"
				value={input}
				onChangeText={(newInput) => updateInput(newInput)}
			/>
			<RadioForm
				radio_props={radio_props}
				initial={null}
				formHorizontal={true}
				labelHorizontal={false}
				buttonColor={"#444"}
				onPress={(value) => updateSelectedAnswer(value)}
			/>
			<TouchableOpacity
				style={[styles.button, isDisabled() ? styles.disabled : styles.active]}
				onPress={handleSubmit}
				disabled={isDisabled()}
			>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		justifyContent: "center",
		alignSelf: "center",
		borderWidth: 2,
		width: 150,
		height: 60,
		borderRadius: 8,
		marginTop: 20,
	},
	buttonText: {
		alignSelf: "center",
		color: "#fff",
		fontSize: 20,
	},
	active: {
		backgroundColor: "#444",
	},
	disabled: {
		backgroundColor: "#999999",
		borderWidth: 0,
	},
});
