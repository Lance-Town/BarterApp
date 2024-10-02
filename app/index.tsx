import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

const Index: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Barter App</Text>
            <Link href={{ pathname: "./signIn" }}>
                <Button title="Sign In" />
            </Link>
            <Link href="./signUp" style={styles.button}>
                <Button title="Sign Up" />
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
});

export default Index;
