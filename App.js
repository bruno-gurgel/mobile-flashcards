import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DeckList from "./components/DeckList";
import { createStackNavigator } from "@react-navigation/stack";
import IndividualDeck from "./components/IndividualDeck";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import { setLocalNotification } from "./utils/helpers";
import Quiz from "./components/Quiz";

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
								onPress={() => navigation.navigate("NewDeck")}
							/>
						),
					})}
				/>
				<Stack.Screen
					name="NewDeck"
					component={NewDeck}
					options={{
						title: "Add Deck",
						headerStyle: {
							backgroundColor: "#444",
						},
						headerTintColor: "#fff",
					}}
				/>
				<Stack.Screen
					name="Deck"
					component={IndividualDeck}
					options={({ route }) => ({
						title: route.params.title,
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
