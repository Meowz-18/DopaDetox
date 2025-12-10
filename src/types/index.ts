export interface User {
    name: string;
    xp: number;
    level: number;
    streak: number;
    dopamineScore: number;
    avatarUrl?: string;
    badges?: string[];
    nextLevelXp?: number;
}

export type ActivityType = 'Creative' | 'Active' | 'Social' | 'Focus' | 'Rest' | 'Mindfulness' | 'Health';

export interface Activity {
    id: string;
    title: string;
    description?: string;
    type: ActivityType;
    time: string;
    xp: number;
    energy: 'Low' | 'Medium' | 'High';
    completed?: boolean;
}

export interface UserTask {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    xp_reward: number;
    dopamine_level: 'Low' | 'Medium' | 'High';
    created_at: string;
}
