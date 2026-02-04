"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type Profile = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    email: string | null;
    plan?: string | null;
};

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                setUser(session.user);
                // Fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle();

                if (data) {
                    setProfile(data);
                } else {
                    // Fallback if no profile table or record yet
                    setProfile({
                        id: session.user.id,
                        full_name: session.user.user_metadata?.full_name || null,
                        avatar_url: session.user.user_metadata?.avatar_url || null,
                        email: session.user.email || null
                    });
                }
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                setUser(session.user);
                // simple refresh of profile could go here
            } else {
                setUser(null);
                setProfile(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return {
        user,
        profile,
        signOut,
        loading
    };
}
