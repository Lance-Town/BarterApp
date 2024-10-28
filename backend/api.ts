import { SERVER_IP, SERVER_PORT } from "@/constants/config";
import { err } from "react-native-svg";

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
export const signUpUser = async (
    signUpData: SignUpData
): Promise<{
    message: string;
    user_id: number;
    access_level: number;
} | null> => {
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
        return null;
    }

    if (!email || !password) {
        alert("Email and Password are required");
        return null;
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
            return {
                message: data.message,
                user_id: data.user_id,
                access_level: data.access_level,
            };
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
export const signInUser = async (
    signInData: SignInData
): Promise<{ message: string; user_id: number; access_level: number }> => {
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
    condition: string;
    category_id: string;
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

// Function to get all items on site not owned by user
export const getOtherItems = async (user_id: number): Promise<Item[]> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/item/otherItems/${user_id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch other items, status: ${response.status}`
            );
        }

        const data: Item[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching other items:", error);
        throw error;
    }
};

// Function to post a new item
export const addItem = async (
    item: Omit<Item, "item_id">,
    user_id: number,
    friend_user_id: number
): Promise<{ message: string; item_id: number }> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/item`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...item, user_id, friend_user_id }),
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

// Function to get all items owned by a user
export const getUserItems = async (userId: number): Promise<Item[]> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/owns/${userId}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch items, status: ${response.status}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user items:", error);
        throw error;
    }
};

// Function to get a specific item owned by a user
export const getUserItem = async (
    userId: number,
    itemId: number
): Promise<Item> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/owns/${userId}/${itemId}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch item, status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user item:", error);
        throw error;
    }
};

// Function to get an item from DB
export const getItem = async (itemId: number): Promise<Item> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/item/${itemId}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch item, status: ${response.status}`);
        }
        const data: Item = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user item:", error);
        throw error;
    }
};

export interface Category {
    category_id: number;
    name: string;
    base_value: number;
}

// route to get all categories from db
export const getCategories = async (): Promise<Category[]> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/categories`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch categories, status: ${response.status}`
            );
        }
        const data: Category[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export interface Friend {
    user_id: number;
    email: string;
}

// route to get all the friends of a user
export const getFriends = async (userId: number): Promise<Friend[]> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/friends/${userId}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch friends list, status: ${response.status}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
};

// props for creating a post
export interface PostProps {
    user1_id: number;
    requestingItemId: number;
    requestingAmount: number;
    offeringItemId: number;
    offeringAmount: number;
    isNegotiable: number;
}

// generate hash code
const generateHashCode = (itemId: number): string => {
    const chars: string =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let hash: string = "";

    for (let i = 0; i < 16; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return hash;
};

// Function to create a post and partnership on db
export const createPost = async (args: PostProps): Promise<any> => {
    try {
        const hashcode = generateHashCode(args.requestingItemId);
        const url = `http://${SERVER_IP}:${SERVER_PORT}/postpartnership`;

        console.log(`
            api::createPost::DebugStart
            user1_id: ${args.user1_id}  
            requestingItemId: ${args.requestingItemId}
            requestingAmount: ${args.requestingAmount}
            offeringItemId: ${args.offeringItemId}
            offeringAmount: ${args.offeringAmount}
            isNegotiable: ${args.isNegotiable}
            hashcode: ${hashcode}
            api::createPost::DebugEnd
            `);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...args,
                hashcode, // Include the generated hash code in the request body
            }),
        });

        console.log(`
            api::createPost::DebugStart2
            response.ok: ${response.ok}
            response.status: ${response.status}
            response.headers: ${response.headers}
            api::createPost::DebugEnd2
            `);

        if (!response.ok) {
            throw new Error(`Error creating post, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to create post:", error);
        throw error;
    }
};

export interface Partnership {
    partnershipId: number;
    user2Accepted: boolean;
    requestingItemId: number;
    requestingAmount: number;
    offeringItemId: number;
    offeringAmount: number;
}

// Function to get posts requesting items the user has for sale
export const getRequestedPosts = async (
    user1_id: number
): Promise<Partnership[]> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/requested-posts/${user1_id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch requested posts, status code: ${response.status}`
            );
        }

        const data: Partnership[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching requested posts", error);
        throw error;
    }
};

// Function to get posts and partnership information made by user
export const getUserPosts = async (
    user1_id: number
): Promise<Partnership[]> => {
    try {
        const url = `http://${SERVER_IP}:${SERVER_PORT}/user-posts/${user1_id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch requested posts, status code: ${response.status}`
            );
        }

        const data: Partnership[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching requested posts", error);
        throw error;
    }
};
