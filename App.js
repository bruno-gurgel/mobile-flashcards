import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";
import DeckList from "./components/DeckList";

export default function App() {
	return (
		<SafeAreaView>
			<Header
				placement="center"
				centerComponent={{
					text: "Mobile Flashcards",
					style: { color: "#fff", fontSize: 24 },
				}}
				backgroundColor="#444"
			/>
			<View style={styles.container}>
				<Text>Test</Text>
				<Text>
					<DeckList />
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50,
	},
});
