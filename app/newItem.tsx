import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, ImageBackground } from "react-native";
import { Input, Button, Select, SelectItem } from "@ui-kitten/components";
import AppHeader from "@/components/AppHeader";
import { useUser } from "@/hooks/UserContext";
import {
    addItem,
    getCategories,
    Category,
    getFriends,
    Friend,
} from "@/backend/api";

export const conditions = [
    { text: "New", value: "New", multiplier: 1.0 },
    { text: "Like New", value: "Like New", multiplier: 0.9 },
    { text: "Very Good", value: "Very Good", multiplier: 0.8 },
    { text: "Good", value: "Good", multiplier: 0.7 },
    { text: "Fair", value: "Fair", multiplier: 0.6 },
    { text: "Poor", value: "Poor", multiplier: 0.5 },
];

export const baseValue = 100;

const NewItem = () => {
    const [name, setName] = useState<string>("");
    const [condition, setCondition] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>(""); // Store category_id
    const [categoryMultiplier, setCategoryMultiplier] = useState<number>(1.0); // Store category multiplier
    const [friend, setFriend] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const { userId } = useUser();

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesResponse = await getCategories();
                setCategories(categoriesResponse);
            } catch (error) {
                console.error("Error fetching categories:", error);
                Alert.alert("Error", "Failed to fetch categories");
            }
        };

        const loadFriends = async () => {
            if (userId == null) {
                return;
            }

            try {
                const friendsResponse = await getFriends(userId);
                setFriends(friendsResponse);
            } catch (error) {
                console.error("Error fetching friends:", error);
                Alert.alert("Error", "Failed to fetch friends");
            }
        };

        loadCategories();
        loadFriends();
    }, [userId]);

    const handleAddItem = async () => {
        if (!name || !categoryId || !friend || condition === "") {
            Alert.alert("Error", "Please fill out all fields");
            return;
        }

        // Find the selected condition multiplier
        const conditionData = conditions.find((c) => c.value === condition);
        const conditionMultiplier = conditionData
            ? conditionData.multiplier
            : 1; // Default to 1 if not found

        // Calculate the final value using the base value, category multiplier, and condition multiplier
        const finalValue = baseValue * categoryMultiplier * conditionMultiplier;

        if (finalValue < 1) {
            Alert.alert("Error", "Final value must be $1 or more");
            return;
        }

        const transferCostNum = Math.ceil(finalValue / 20);
        const friend_user_id = parseInt(friend);

        if (isNaN(friend_user_id)) {
            Alert.alert("Error", "Friend user id is not a number");
            return;
        }

        try {
            if (userId != null) {
                const response = await addItem(
                    {
                        name: name.trim(),
                        transfer_cost: transferCostNum,
                        value: finalValue,
                        category_id: categoryId,
                        condition: condition.trim(),
                    },
                    userId,
                    friend_user_id
                );

                if (response.message === "Item created") {
                    Alert.alert("Success", "Item added successfully!");
                    setName("");
                    setCategoryId(""); // Reset category_id
                    setFriend(""); // Reset friend selection
                    setCondition(""); // Clear condition input
                    setCategoryMultiplier(1.0); // Reset category multiplier
                } else {
                    Alert.alert(
                        "Error",
                        "Failed to add item. Please try again."
                    );
                }
            } else {
                Alert.alert("Error", "User ID required");
            }
        } catch (error) {
            console.error("Error adding item:", error);
            Alert.alert("Error", "Failed to add item. Please try again.");
        }
    };

    return (
        <ImageBackground
            source={require("../assets/logo/trade4spread.png")}
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
                    <Select
                        style={styles.select}
                        placeholder="Select Category"
                        value={categoryId}
                        onSelect={(index) => {
                            if (!Array.isArray(index)) {
                                const selectedCategory = categories[index.row];
                                setCategoryId(
                                    selectedCategory.category_id.toString()
                                );
                                setCategoryMultiplier(
                                    selectedCategory.base_value
                                ); // Set the category multiplier
                            }
                        }}
                    >
                        {categories.map((cat) => (
                            <SelectItem
                                key={cat.category_id}
                                title={cat.name}
                            />
                        ))}
                    </Select>

                    <Select
                        style={styles.select}
                        placeholder="Select Condition"
                        value={condition}
                        onSelect={(index) => {
                            if (!Array.isArray(index)) {
                                setCondition(conditions[index.row].value);
                            }
                        }}
                    >
                        {conditions.map((cond) => (
                            <SelectItem key={cond.value} title={cond.text} />
                        ))}
                    </Select>

                    <Select
                        style={styles.select}
                        placeholder="Select Friend"
                        value={friend}
                        onSelect={(index) => {
                            if (!Array.isArray(index)) {
                                setFriend(
                                    friends[index.row].user_id.toString()
                                );
                            }
                        }}
                    >
                        {friends.map((f) => (
                            <SelectItem key={f.user_id} title={f.email} />
                        ))}
                    </Select>
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
    select: {
        marginBottom: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
});

export default NewItem;
