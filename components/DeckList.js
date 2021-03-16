import { useIsFocused } from "@react-navigation/core";
import React from "react";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { getDecks } from "../utils/api";

export default function DeckList(props) {
	const { navigation, route } = props;
	const [isLoading, updateIsLoading] = useState(false);
	const [decks, updateDecks] = useState({});

	const isFocused = useIsFocused();

	const fetchData = async () => {
		updateIsLoading(true);
		const allDecks = await getDecks();
		updateDecks(allDecks);
		updateIsLoading(false);
	};

	useEffect(() => {
		isFocused && fetchData();
	}, [isFocused]);

	return (
		<View style={styles.container}>
			<Text style={styles.totalDecks}>
				Total decks:
				<Text style={styles.totalDecks__number}>{decks && Object.keys(decks).length}</Text>
			</Text>
			{!isLoading && decks ? (
				Object.keys(decks).map((deck) => {
					const key = decks[deck].id;
					const numberOfCards = decks[deck].questions.length;
					return (
						<TouchableOpacity
							key={key}
							style={styles.deckBox}
							onPress={() =>
								navigation.navigate("Deck", {
									deckTitle: deck,
									numberOfCards,
								})
							}
						>
							<Text style={styles.deck}>{deck}</Text>
							<Text style={styles.cardsNumber}>
								{numberOfCards} {numberOfCards === 1 ? "card" : "cards"}
							</Text>
						</TouchableOpacity>
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
