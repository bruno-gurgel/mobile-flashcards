import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Quiz() {
	return (
		<View style={styles.container}>
			<Text>Quiz</Text>
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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "center",
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
});
