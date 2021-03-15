import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import RadioButtonRN from "radio-buttons-react-native";
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from "react-native-simple-radio-button";

const radio_props = [
	{ label: "Correct", value: true },
	{ label: "Incorrect", value: false },
];

export default function NewCard() {
	const [input, updateInput] = useState("");
	const [selectedAnswer, updateSelectedAnswer] = useState(null);
	return (
		<View style={styles.container}>
			<Input
				placeholder="Type your question here"
				value={input}
				onChangeText={(newInput) => updateInput(newInput)}
			/>
			<RadioForm
				radio_props={radio_props}
				formHorizontal={true}
				labelHorizontal={false}
				buttonColor={"#444"}
				onPress={(value) => updateSelectedAnswer(value)}
			/>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
		</View>
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
		backgroundColor: "#444",
	},
	buttonText: {
		alignSelf: "center",
		color: "#fff",
		fontSize: 20,
	},
});
