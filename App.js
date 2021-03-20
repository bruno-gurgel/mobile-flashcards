import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button } from "react-native";
import DeckList from "./components/DeckList";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import IndividualDeck from "./components/IndividualDeck";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import { setLocalNotification } from "./utils/helpers";
import Quiz from "./components/Quiz";
import Score from "./components/Score";

const Stack = createStackNavigator();

export default function App() {
	useEffect(() => {
		setLocalNotification();
	}, []);
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={DeckList}
					options={({ navigation }) => ({
						title: "Deck List",
						headerStyle: {
							backgroundColor: "#444",
						},
						headerTintColor: "#fff",
						headerRight: () => (
							<Button
								title="Add"
								color="#00ccff"
								onPress={() =>
									navigation.navigate("NewDeck", {
										decks,
									})
								}
							/>
						),
					})}
				/>
				<Stack.Screen
					name="NewDeck"
					component={NewDeck}
					options={({ navigation }) => ({
						title: "Add Deck",
						headerStyle: {
							backgroundColor: "#444",
						},
						headerTintColor: "#fff",
						headerLeft: () => (
							<HeaderBackButton
								label="Deck List"
								tintColor="#fff"
								onPress={() => navigation.navigate("Home")}
							/>
						),
					})}
				/>
				<Stack.Screen
					name="Deck"
					component={IndividualDeck}
					options={({ route }) => ({
						title: route.params.deckTitle,
						headerStyle: {
							backgroundColor: "#444",
						},
						headerTintColor: "#fff",
					})}
				/>
				<Stack.Screen
					name="NewCard"
					component={NewCard}
					options={{
						title: "Add Card",
						headerStyle: {
							backgroundColor: "#444",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="Quiz"
					component={Quiz}
					options={{
						title: "Quiz",
						headerStyle: {
							backgroundColor: "#444",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="Score"
					component={Score}
					options={({ navigation }) => ({
						title: "Score",
						headerStyle: {
							backgroundColor: "#444",
						},
						headerTintColor: "#fff",
						headerLeft: () => (
							<HeaderBackButton
								label="Deck"
								tintColor="#fff"
								onPress={() => navigation.navigate("Deck")}
							/>
						),
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
