import React from "react";
import { Image, StyleSheet, ImageStyle } from "react-native";
import { TopNavigation } from "@ui-kitten/components";

export const Logo: React.FC = () => {
    return (
        <Image
            source={require("../assets/logo/trade4gold.png")} // Update with your actual path
            style={styles.logo}
            resizeMode="contain"
        />
    );
};

const AppHeader = () => {
    return (
        <TopNavigation
            title={() => <Logo />} // Use the Logo component
            alignment="center"
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 100,
        // marginBottom: 40,
        // marginTop: 40,
        alignSelf: "center",
    },
    container: {
        backgroundColor: "transparent",
    },
});

export default AppHeader;
