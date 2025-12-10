import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Activity, UserTask } from '../types';
import { UserService } from '../services/userService';
import { ActivityService } from '../services/activityService';
import { TaskService } from '../services/taskService';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface DopaContextType {
    user: User | null;
    activities: Activity[];
    tasks: UserTask[];
    completeActivity: (id: string) => Promise<void>;
    unlockActivity: (id: string) => Promise<void>;
    refreshUser: () => Promise<void>;
    addTask: (task: Omit<UserTask, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
    session: Session | null;
    loading: boolean;
}

const DopaContext = createContext<DopaContextType | undefined>(undefined);

const GUEST_USER: User = {
    name: 'Guest Protocol',
    xp: 0,
    level: 1,
    streak: 0,
    dopamineScore: 50
};

export const DopaProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [activities, setActivities] = useState<Activity[]>(ActivityService.getAllActivities());
    const [tasks, setTasks] = useState<UserTask[]>([]);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session?.user) {
                fetchUserProfile(session.user.id);
            } else {
                setUser(GUEST_USER);
                setLoading(false);
            }
        });

        // Listen for changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session?.user) {
                fetchUserProfile(session.user.id);
            } else {
                setUser(GUEST_USER);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserProfile = async (userId: string) => {
        setLoading(true);
        const [profile, userTasks] = await Promise.all([
            UserService.getUser(userId),
            TaskService.getUserTasks(userId)
        ]);

        if (profile) {
            setUser(profile);
            setTasks(userTasks);
        } else {
            setUser(GUEST_USER);
        }
        setLoading(false);
    };

    const refreshUser = async () => {
        if (session?.user) {
            await fetchUserProfile(session.user.id);
        }
    };

    const completeActivity = async (id: string) => {
        const activity = activities.find(a => a.id === id);
        // Handle custom tasks or standard activities
        // Optimized for standard activity for now
        if (!activity) return;

        if (session?.user) {
            await ActivityService.logActivity(session.user.id, activity.id, activity.title, activity.xp);
            if (user) {
                await UserService.updateUserXp(session.user.id, user.xp, activity.xp);
                refreshUser();
            }
        } else {
            alert("Login to save your progress!");
        }
    };

    const addTask = async (newTask: Omit<UserTask, 'id' | 'user_id' | 'created_at'>) => {
        if (session?.user) {
            await TaskService.createTask(session.user.id, newTask);
            refreshUser();
        }
    };

    const unlockActivity = async (id: string) => {
        await completeActivity(id);
    };

    return (
        <DopaContext.Provider value={{ user, activities, tasks, completeActivity, unlockActivity, refreshUser, addTask, session, loading }}>
            {children}
        </DopaContext.Provider>
    );
};

export const useDopa = () => {
    const context = useContext(DopaContext);
    if (context === undefined) {
        throw new Error('useDopa must be used within a DopaProvider');
    }
    return context;
};
