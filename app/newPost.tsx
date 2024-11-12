import React, { useState, useEffect } from "react";
import { Image, Alert, StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { Input,  Text, Button, Select, SelectItem, ApplicationProvider, Layout } from "@ui-kitten/components";
import {
    getUserItems,
    getOtherItems,
    getItem,
    Item,
    createPost,
} from "@/backend/api";
import { SITE_FEE_LEFTOVER } from "@/constants/fees";
import { useUser, UserProvider } from "@/hooks/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, router } from "expo-router";
import { default as customTheme } from "./custom-theme.json"; // <-- Import app theme


const NewPost = () => {
    const { userId } = useUser();
    const [userItems, setUserItems] = useState<Item[]>([]);
    const [availableItems, setAvailableItems] = useState<Item[]>([]);
    const [offeringAmount, setOfferingAmount] = useState<number>(1);
    const [affordableAmount, setAffordableAmount] = useState<number>(0);
    const [offeringItem, setOfferingItem] = useState<Item | null>(null);
    const [requestingItem, setRequestingItem] = useState<Item | null>(null);

    // get an array from 1 to 20
    const amountArray = Array.from({ length: 20 }, (_, i) => i + 1);

    useEffect(() => {
        const fetchItems = async () => {
            if (userId === null) {
                console.error(`Error: User ID is not set: ${userId}`);
                return;
            }

            try {
                const userItemsResponse = await getUserItems(userId);
                setUserItems(userItemsResponse);
                const availableItemsResponse = await getOtherItems(userId);
                setAvailableItems(availableItemsResponse);
            } catch (error) {
                Alert.alert("Error", "Failed to load items.");
                console.error(error);
            }
        };

        fetchItems();
    }, [userId]);

    const handleCalculateAffordability = async () => {
        if (offeringItem !== null && requestingItem !== null) {
            try {
                const item1 = await getItem(parseInt(offeringItem.item_id));
                const item2 = await getItem(parseInt(requestingItem.item_id));

                console.log(item1);
                console.log(item2);

                const result = parseFloat(
                    (
                        ((item1.value * offeringAmount) / item2.value) *
                        SITE_FEE_LEFTOVER
                    ).toFixed(2)
                );
                console.log(result);
                setAffordableAmount(!isNaN(result) ? result : 0);
            } catch (error) {
                Alert.alert("Error", "Failed to calculate affordability.");
                console.error(error);
            }
        }
    };

    const handleCreatePost = async () => {
        if (
            offeringItem === null ||
            requestingItem === null ||
            !offeringAmount
        ) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
        }

        handleCalculateAffordability();

        try {
            if (!userId) {
                console.error("Error, userid can not be null");
                return;
            }
            await createPost({
                user1_id: userId,
                requestingItemId: parseInt(requestingItem.item_id),
                requestingAmount: affordableAmount,
                offeringItemId: parseInt(offeringItem.item_id),
                offeringAmount: offeringAmount,
                isNegotiable: 0, // constant false, as negotiating is not an option yet
            });
            Alert.alert("Success", "Post created successfully!");
        } catch (error) {
            Alert.alert("Error", "Failed to create post.");
            console.error(error);
        }
    };

    return (
        <UserProvider>
            <ApplicationProvider
                {...eva}
                theme={{ ...eva.dark, ...customTheme }}
            >
                <Layout style={styles.container}>
                    <Layout style={styles.header} level="1">
                        <Button
                            style={styles.backButton}
                            appearance="outline"
                            onPress={() => router.back()}
                        >
                            Back
                        </Button>
                        <Image
                            source={require("../assets/logo/trade4gold.png")} //placeholder logo for now
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </Layout>
                    <Layout>
                        <Text>Select the item you are offering:</Text>
                        <Select
                            style={styles.select}
                            placeholder="Select an item"
                            value={offeringItem?.name}
                            onSelect={(index) => {
                                if (!Array.isArray(index)) {
                                    setOfferingItem(userItems[index.row]);
                                    console.log(
                                        `Offering Item: ${offeringItem?.name} === ${
                                            userItems[index.row].name
                                        }`
                                    );
                                    console.log(offeringItem);
                                }
                            }}
                        >
                            {userItems.map((item) => (
                                <SelectItem key={item.item_id} title={item.name} />
                            ))}
                        </Select>

                        <Text>How many are you offering</Text>
                        <Select
                            style={styles.select}
                            placeholder={"Offering Amount"}
                            value={offeringAmount}
                            onSelect={(index) => {
                                if (!Array.isArray(index)) {
                                    setOfferingAmount(amountArray[index.row]);
                                }
                            }}
                        >
                            {amountArray.map((value) => (
                                <SelectItem key={value} title={`${value}`} />
                            ))}
                        </Select>

                        <Text>Select the item you want:</Text>
                        <Select
                            style={styles.select}
                            placeholder="Select an item"
                            value={requestingItem?.name}
                            onSelect={(index) => {
                                if (!Array.isArray(index)) {
                                    setRequestingItem(availableItems[index.row]);
                                    console.log(requestingItem);
                                }
                            }}
                        >
                            {availableItems.map((item) => (
                                <SelectItem key={item.item_id} title={item.name} />
                            ))}
                        </Select>

                        <Text>Based on the equivalency, you can afford:</Text>
                        <Text style={{marginBottom: 25}}>{affordableAmount} units</Text>

                        <Button style={styles.button} onPress={handleCalculateAffordability}>
                            Calculate Affordability
                        </Button>
                        <Button style={styles.button}  onPress={handleCreatePost}>Create Post</Button>
                    </Layout>
                </Layout>
            </ApplicationProvider>
        </UserProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
    },
    input: {
        marginBottom: 10,
    },
    select: {
        marginBottom: 10,
    },
    backButton: {
        marginTop: 30,
        marginLeft: 10,
    },
    logo: {
        width: 100,
        height: 50,
        marginTop: 20, // Aligns logo with the top of the back button
    },
    header: {
        position: "absolute", // Keeps it at the top
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        marginTop: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    button: {
        margin: 8,
    },
});

export default NewPost;
