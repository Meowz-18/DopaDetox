import { Activity } from '../types';
import { supabase } from '@/lib/supabase';

// Static library of activities
const ACTIVITIES: Activity[] = [
    { id: '1', title: "Urban Sketching", type: "Creative", time: "20m", xp: 150, energy: "Low", description: "Sketch your surroundings." },
    { id: '2', title: "Parkour Basics", type: "Active", time: "30m", xp: 250, energy: "High", description: "Practice basic vaults and jumps." },
    { id: '3', title: "Stranger Convo", type: "Social", time: "10m", xp: 500, energy: "Medium", description: "Talk to someone you don't know." },
    { id: '4', title: "Deep Reading", type: "Focus", time: "45m", xp: 200, energy: "Low", description: "Read a physical book." },
    { id: '5', title: 'Morning Sunlight', type: 'Health', time: '10m', xp: 50, energy: 'Low', description: 'Get 10 mins of sun' } as any,
    { id: '6', title: 'Cold Shower', type: 'Active', time: '3m', xp: 100, energy: 'High', description: 'Reset your nervous system' },
    { id: '7', title: 'Deep Work', type: 'Focus', time: '45m', xp: 200, energy: 'Medium', description: 'No phone, just creation' },
];

export const ActivityService = {
    getAllActivities: (): Activity[] => {
        return ACTIVITIES;
    },

    logActivity: async (userId: string, activityId: string, activityTitle: string, xp: number) => {
        const { error } = await supabase
            .from('activity_logs')
            .insert({
                user_id: userId,
                activity_id: activityId,
                activity_title: activityTitle,
                xp_gained: xp
            });

        if (error) console.error('Error logging activity:', error);
    }
};
