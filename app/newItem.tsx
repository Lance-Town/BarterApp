import React, { useState } from "react";
import {
    View,
    TextInput,
    Alert,
    StyleSheet,
    ImageBackground,
} from "react-native";
import {
    Layout,
    Divider,
    TopNavigation,
    Text,
    Input,
    Button,
} from "@ui-kitten/components";
import AppHeader, { Logo } from "@/components/AppHeader";
import { addItem } from "@/backend/api";

const NewItem = () => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    // Function to handle form submission
    const handleAddItem = async () => {
        // Validate inputs
        if (!name || !value) {
            Alert.alert("Error", "Please fill out all fields");
            return;
        }

        // get the value as a number
        const valueNum = parseFloat(value);

        // Transfer cost is the 5% fee added by sysem
        const transferCostNum = valueNum / 20;

        // Check for valid number input
        if (isNaN(transferCostNum) || isNaN(valueNum)) {
            Alert.alert(
                "Error",
                "Transfer cost and value must be valid numbers"
            );
            return;
        }

        try {
            // Call the API to add the new item
            const response = await addItem({
                name: name.trim(),
                transfer_cost: transferCostNum,
                value: valueNum,
            });

            Alert.alert("Success");

            // Clear form fields after successful addition
            setName("");
            setValue("");
        } catch (error) {
            Alert.alert("Error", "Failed to add item. Please try again.");
        }
    };

    return (
        <ImageBackground
            source={require("../assets/logo/trade4spread.png")} // Replace with your image URL or local path
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <AppHeader />
                <View>
                    <Input
                        style={styles.input}
                        placeholder="Item Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <Input
                        style={styles.input}
                        placeholder="Value"
                        value={value}
                        onChangeText={setValue}
                        keyboardType="numeric"
                    />
                    <Button onPress={handleAddItem}>Add Item</Button>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
});

export default NewItem;
