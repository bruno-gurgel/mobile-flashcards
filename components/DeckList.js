import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
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
			{!isLoading ? (
				Object.keys(decks).map((deck) => (
					<Text key={decks[deck].title} style={styles.deck}>
						{deck}
					</Text>
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
		justifyContent: "space-between",
	},
	/* deck: {
		flex: 1,
		backgroundColor: "#ccc",
		borderWidth: 2,
		fontSize: 24,
		color: "#000",
	}, */
});
