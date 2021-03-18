import { useIsFocused } from "@react-navigation/core";
import React from "react";
import { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { getDecks } from "../utils/api";

export default function DeckList({ navigation }) {
	const [isLoading, updateIsLoading] = useState(false);
	const [decks, updateDecks] = useState({});

	const isFocused = useIsFocused();

	const fetchData = () => {
		updateIsLoading(true);
		getDecks().then((allDecks) => {
			updateDecks(allDecks);
			updateIsLoading(false);
		});
	};

	useEffect(() => {
		isFocused && fetchData();
	}, [isFocused]);

	const renderItem = ({ item }) => {
		const numberOfCards = decks[item].questions.length;
		return (
			<TouchableOpacity
				style={styles.deckBox}
				onPress={() =>
					navigation.navigate("Deck", {
						deckTitle: decks[item].title,
						numberOfCards,
					})
				}
			>
				<Text style={styles.deck}>{decks[item].title}</Text>
				<Text style={styles.cardsNumber}>
					{numberOfCards} {numberOfCards === 1 ? "card" : "cards"}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.totalDecks}>
				Total decks:
				<Text style={styles.totalDecks__number}> {decks && Object.keys(decks).length}</Text>
			</Text>
			{!isLoading && decks ? (
				<FlatList
					data={Object.keys(decks)}
					renderItem={renderItem}
					keyExtractor={(item) => decks[item].id}
				/>
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignSelf: "stretch",
		padding: 10,
		marginBottom: 15,
		borderBottomWidth: 2,
	},
	deck: {
		fontSize: 24,
		color: "#444",
	},
	cardsNumber: {
		color: "#8c8c8c",
	},
	delete: {
		borderWidth: 1,
		padding: 5,
		justifyContent: "center",
	},
	deleteText: {
		alignSelf: "center",
		fontSize: 16,
	},
});
