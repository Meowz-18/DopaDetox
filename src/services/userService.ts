import { User } from '../types';
import { supabase } from '@/lib/supabase';

const DEFAULT_USER: User = {
    name: 'Guest',
    xp: 1250,
    level: 5,
    streak: 3,
    dopamineScore: 72,
};

export const UserService = {
    getUser: async (userId: string): Promise<User | null> => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching user:', error);
                return null;
            }

            return {
                name: data.username || 'User',
                xp: data.xp,
                level: data.level,
                streak: data.streak,
                dopamineScore: data.dopamine_score,
                avatarUrl: data.avatar_url,
                badges: ['🌱', '🔥'], // Mock badges
                nextLevelXp: 5000 // Mock next level
            };
        } catch (e) {
            console.error('Exception fetching user:', e);
            return null;
        }
    },

    saveUser: async (userId: string, user: Partial<User>): Promise<void> => {
        const updates = {
            username: user.name,
            xp: user.xp,
            level: user.level,
            streak: user.streak,
            dopamine_score: user.dopamineScore,
            avatar_url: user.avatarUrl,
        };

        // Remove undefined
        Object.keys(updates).forEach(key => (updates as any)[key] === undefined && delete (updates as any)[key]);

        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);

        if (error) console.error('Error saving user:', error);
    },

    updateUserXp: async (userId: string, currentXp: number, xpGained: number): Promise<number> => {
        const newXp = currentXp + xpGained;

        const { error } = await supabase
            .from('profiles')
            .update({ xp: newXp })
            .eq('id', userId);

        if (error) console.error('Error updating XP:', error);
        return newXp;
    }
};
