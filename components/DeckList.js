import React from "react";
import { useIsFocused } from "@react-navigation/core";
import { useState, useEffect, useLayoutEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { getDecks, resetData } from "../utils/api";

export default function DeckList({ navigation }) {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<Button
					title="Reset Data"
					color="#FF0000"
					onPress={() =>
						Alert.alert("Reset Data?", "Are you sure you want to reset the data?", [
							{
								text: "Cancel",
							},
							{
								text: "Reset",
								onPress: () => resetData().then(() => fetchData()),
							},
						])
					}
				/>
			),
		});
	}, [navigation]);

	const [isLoading, updateIsLoading] = useState(false);
	const [decks, updateDecks] = useState({});

	const isFocused = useIsFocused();

	const fetchData = () => {
		updateIsLoading(true);
		getDecks().then((allDecks) => {
			if (allDecks !== null) {
				updateDecks(allDecks);
				updateIsLoading(false);
			} else {
				getDecks().then((allDecks) => {
					updateDecks(allDecks);
					updateIsLoading(false);
				});
			}
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
				<Text style={styles.totalDecks__number}>
					{decks && Object.keys(decks).length > 0 && Object.keys(decks).length}
				</Text>
			</Text>
			{!isLoading && decks && Object.keys(decks).length > 0 ? (
				<FlatList
					data={Object.keys(decks)}
					renderItem={renderItem}
					keyExtractor={(item) => decks[item].id}
				/>
			) : Object.keys(decks).length === 0 ? (
				<View style={styles.noDecks}>
					<Text style={styles.noDecksText}>You don't have decks!</Text>
				</View>
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
	noDecks: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	noDecksText: {
		fontWeight: "bold",
		fontSize: 30,
	},
});
