import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Input } from "react-native-elements";
import { saveDeckTitle } from "../utils/api";

export default function NewDeck({ navigation }) {
	const [input, updateInput] = useState("");
	const isDisabled = () => (input === "" ? true : false);

	const handleSubmit = async () => {
		const trimmedInput = input.replace(/ /g, "");
		return saveDeckTitle(trimmedInput, input).then(() =>
			navigation.navigate("Deck", {
				deckTitle: input,
				numberOfCards: 0,
				isNewDeck: true,
			})
		);
	};

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<Text style={styles.heading}>What is the title of your new deck?</Text>
			<Input
				placeholder="Deck Title"
				value={input}
				onChangeText={(newInput) => updateInput(newInput)}
			/>
			<TouchableOpacity
				style={[styles.button, isDisabled() ? styles.disabled : styles.active]}
				disabled={isDisabled()}
				onPress={handleSubmit}
			>
				<Text style={styles.buttonText}>Create Deck</Text>
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
	heading: {
		fontSize: 40,
		marginBottom: 30,
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
