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
import { useUser } from "@/hooks/UserContext";
import { addItem } from "@/backend/api";

const NewItem = () => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const { userId } = useUser();

    // Function to handle form submission
    const handleAddItem = async () => {
        // Validate inputs
        if (!name || !value) {
            Alert.alert("Error", "Please fill out all fields");
            return;
        }
        // get the value as a number
        const valueNum = parseFloat(value);

        if (valueNum < 1) {
            Alert.alert("Error", "Value must be $1 or more");
            return;
        }

        // Transfer cost is the 5% fee added by sysem
        const transferCostNum = Math.ceil(valueNum / 20);

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
            if (userId != null) {
                const response = await addItem(
                    {
                        name: name.trim(),
                        transfer_cost: transferCostNum,
                        value: valueNum,
                    },
                    userId
                );

                if (response.message === "Item created") {
                    Alert.alert("Success", "Item added successfully!");
                    // clear form fields
                    setName("");
                    setValue("");
                } else {
                    Alert.alert(
                        "Error",
                        "Failed to add item. Please try again."
                    );
                }
            } else {
                alert("User ID required");
            }
        } catch (error) {
            console.error("Error adding item:", error);
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
