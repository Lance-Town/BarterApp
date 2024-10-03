import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link, router } from "expo-router";

const Index: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Barter App</Text>
            {/* <Link href={{ pathname: "./signIn" }}>
                <Button title="Sign In" />
            </Link>
            <Link href="./signUp" style={styles.button}>
                <Button title="Sign Up" />
            </Link> */}

            <Button title="Sign In" onPress={() => router.push("/signIn")} />
            <Button title="Sign Up" onPress={() => router.push("/signUp")} />
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
