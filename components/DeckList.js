import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";
import { getAllDecks } from "../utils/api";

export default function DeckList() {
	const [isLoading, updateIsLoading] = useState(false);
	const [decks, updateDecks] = useState({});
	useEffect(() => {
		updateIsLoading(true);
		getAllDecks().then((data) => {
			updateDecks(data);
			updateIsLoading(false);
			return data;
		});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.totalDecks}>
				Total decks:
				<Text style={styles.totalDecks__number}> {Object.keys(decks).length}</Text>
			</Text>
			{!isLoading ? (
				Object.keys(decks).map((deck) => {
					const key = decks[deck].id;
					const numberOfCards = decks[deck].questions.length;
					return (
						<View style={styles.deckBox}>
							<Text key={key} style={styles.deck}>
								{deck}
							</Text>
							<Text style={styles.cardsNumber}>
								{numberOfCards} {numberOfCards === 1 ? "card" : "cards"}
							</Text>
						</View>
					);
				})
			) : (
				<Text>Loading...</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	totalDecks: {
		textAlign: "center",
		alignSelf: "center",
		fontSize: 14,
		color: "#737373",
	},
	totalDecks__number: {
		color: "#0000FF",
	},
	deckBox: {
		alignSelf: "stretch",
		padding: 10,
		marginBottom: 15,
		borderBottomWidth: 2,
	},
	deck: {
		fontSize: 24,
		color: "#444",
		textAlign: "center",
	},
	cardsNumber: {
		textAlign: "center",
		color: "#8c8c8c",
	},
});
