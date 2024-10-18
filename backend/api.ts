import { SERVER_IP, SERVER_PORT } from "@/constants/config";

// interface for the signup data function
export interface SignUpData {
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
    address?: string;
    accessLevel?: number;
}

// function to sign up a user
export const signUpUser = async (signUpData: SignUpData): Promise<any> => {
    const {
        email,
        password,
        confirmPassword,
        phoneNumber,
        address,
        accessLevel,
    } = signUpData;

    // basic validation
    if (password !== confirmPassword) {
        alert("Passwords do no match");
        return;
    }

    if (!email || !password) {
        alert("Email and Password are required");
        return;
    }

    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                phone_number: phoneNumber,
                address,
                access_level: accessLevel,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Sign-up error:", error);
        throw error;
    }
};

export interface Post {
    post_id: number;
    requesting_amount: number;
    requesting_item_name: string;
    offering_amount: number;
    offering_item_name: string;
    isNegotiable: boolean;
}

// Function to fetch posts with optional limit
export const fetchPosts = async (limit: number = 0): Promise<Post[]> => {
    try {
        const url =
            limit > 0
                ? `http://${SERVER_IP}:${SERVER_PORT}/posts/fullPost?limit=${limit}`
                : `http://${SERVER_IP}:${SERVER_PORT}/posts/fullPost`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

// Interface for the user data
export interface UserData {
    user_id: number;
    email: string;
    password: string;
    phone_number: string;
    address: string;
    access_level: number;
}

// Function to fetch user data by user ID, or if no userID passed in it returns all users
export const fetchUserData = async (
    userId: number | null
): Promise<UserData | null> => {
    try {
        const url =
            userId !== null
                ? `http://${SERVER_IP}:${SERVER_PORT}/users/${userId}`
                : `http://${SERVER_IP}:${SERVER_PORT}/users`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

// interface for the sign in data
export interface SignInData {
    email: string;
    password: string;
}

// Function to sign in a user
export const signInUser = async (signInData: SignInData): Promise<any> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/signin`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signInData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Sign-in Failed");
        }

        return data;
    } catch (error) {
        console.error("Error signing in user:", error);
        throw error;
    }
};

export interface Item {
    item_id: string;
    name: string;
    transfer_cost: number;
    value: number;
}

// Function to fetch all users
export const fetchAllItems = async (): Promise<Item[]> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/item`;
        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Fetching all items failed");
        }

        return data;
    } catch (error) {
        console.error("Error signing in user:", error);
        throw error;
    }
};

// Function to fetch 5 random items from mysql db
export const fetchFiveItems = async (): Promise<Item[]> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/items/random`;
        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Fetching all items failed");
        }

        return data;
    } catch (error) {
        console.error("Error signing in user:", error);
        throw error;
    }
};

// Function to post a new item
export const addItem = async (
    item: Omit<Item, "item_id">
): Promise<{ message: string; item_id: number }> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/item`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to add item");
        }

        return data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};
