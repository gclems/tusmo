export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
    games_count: number;
    wins_count: number;
    current_count: number;
    max_streak: number;
    [key: string]: unknown; // This allows for additional properties...
}
