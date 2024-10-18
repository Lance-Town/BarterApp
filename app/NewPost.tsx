import React from "react";
import { SafeAreaView } from "react-native";
import {
    Layout,
    Divider,
    TopNavigation,
    Text,
    StyleService,
    useStyleSheet,
    Button,
} from "@ui-kitten/components";

const NewPost: React.FC = () => {
    return (
        <Layout style={{ width: "100%", height: "100%" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation title={"New Post"} alignment="center" />
                <Divider />

                <Layout
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>More to come</Text>
                </Layout>
            </SafeAreaView>
        </Layout>
    );
};

export default NewPost;
