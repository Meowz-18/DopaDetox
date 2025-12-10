import { UserTask } from '../types';
import { supabase } from '@/lib/supabase';

export const TaskService = {
    getUserTasks: async (userId: string): Promise<UserTask[]> => {
        const { data, error } = await supabase
            .from('user_tasks')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }
        return data as UserTask[];
    },

    createTask: async (userId: string, task: Omit<UserTask, 'id' | 'user_id' | 'created_at'>): Promise<UserTask | null> => {
        const { data, error } = await supabase
            .from('user_tasks')
            .insert({
                user_id: userId,
                title: task.title,
                description: task.description,
                xp_reward: task.xp_reward,
                dopamine_level: task.dopamine_level
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating task:', error);
            return null;
        }
        return data as UserTask;
    },

    deleteTask: async (id: string) => {
        const { error } = await supabase.from('user_tasks').delete().eq('id', id);
        if (error) console.error('Error deleting task:', error);
    }
};
