import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Home: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome Home</Text>
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

export default Home;
