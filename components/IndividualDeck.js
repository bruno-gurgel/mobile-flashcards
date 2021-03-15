import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

export default function IndividualDeck({ navigation, route }) {
	const numberOfCards = route.params.numberOfCards;

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{route.params.title} Deck</Text>
				<Divider style={{ backgroundColor: "black" }}></Divider>
				<Text style={styles.cardsNumber}>
					{numberOfCards} {numberOfCards === 1 ? "card" : "cards"}
				</Text>
			</View>
			<View>
				<TouchableOpacity
					style={styles.button}
					onPress={() =>
						navigation.navigate("NewCard", {
							deck: route.params.title,
						})
					}
				>
					<Text style={styles.buttonText}>Add Card</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { marginTop: 10, backgroundColor: "#444" }]}
				>
					<Text style={[styles.buttonText, { color: "white" }]}>Start Quiz</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
	},
	titleContainer: {
		alignSelf: "center",
	},

	title: {
		fontWeight: "bold",
		textAlign: "center",
		alignSelf: "center",
		fontSize: 45,
		color: "#444",
	},
	cardsNumber: {
		fontSize: 20,
		textAlign: "center",
		color: "#b3b3b3",
	},
	button: {
		justifyContent: "center",
		alignSelf: "center",
		borderWidth: 2,
		width: 150,
		height: 60,
		borderRadius: 8,
	},
	buttonText: {
		alignSelf: "center",
		fontSize: 20,
	},
});
