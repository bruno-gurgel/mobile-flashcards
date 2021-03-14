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
				Object.keys(decks).map((deck) => (
					<View style={styles.deckBox}>
						<Text key={decks[deck].title} style={styles.deck}>
							{deck}
						</Text>
					</View>
				))
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
		color: "#000",
		textAlign: "center",

		// height: 40,
	},
});
