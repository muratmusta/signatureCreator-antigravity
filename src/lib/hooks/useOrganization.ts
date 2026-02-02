import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export type Organization = {
    id: string;
    name: string;
    slug: string | null;
    created_at: string;
};

export type OrganizationMember = {
    organization_id: string;
    user_id: string;
    role: 'admin' | 'member';
    created_at: string;
    profiles?: {
        full_name: string | null;
        avatar_url: string | null;
        email: string | null;
    };
};

export function useOrganization() {
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [members, setMembers] = useState<OrganizationMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<'admin' | 'member' | null>(null);

    const supabase = createClient();

    const fetchOrganization = useCallback(async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // 1. Check if user is a member of any organization
            const { data: memberData, error: memberError } = await supabase
                .from('organization_members')
                .select('organization_id, role')
                .eq('user_id', user.id)
                .maybeSingle();

            if (memberError) {
                console.error('Error fetching member status:', JSON.stringify(memberError, null, 2));
                return;
            }

            if (memberData) {
                setRole(memberData.role);

                // 2. Fetch Organization Details
                const { data: orgData, error: orgError } = await supabase
                    .from('organizations')
                    .select('*')
                    .eq('id', memberData.organization_id)
                    .single();

                if (orgData) {
                    setOrganization(orgData);

                    // 3. Fetch All Members with profile details
                    const { data: membersData } = await supabase
                        .from('organization_members')
                        .select('*, profiles(full_name, avatar_url, email)')
                        .eq('organization_id', memberData.organization_id);

                    if (membersData) {
                        setMembers(membersData as OrganizationMember[]);
                    }
                }
            } else {
                setOrganization(null);
                setMembers([]);
                setRole(null);
            }
        } catch (error) {
            console.error('Organization fetch error:', error);
            toast.error('Organizasyon bilgileri yüklenirken hata oluştu.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrganization();
    }, [fetchOrganization]);

    const createOrganization = async (name: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error('Oturum açmanız gerekiyor.');
                return;
            }

            // Calls the secure RPC function
            const { data: org, error } = await supabase
                .rpc('create_organization_v2', { org_name: name });

            if (error) throw error;

            toast.success('Organizasyon başarıyla oluşturuldu!');
            await fetchOrganization();
            return org;

        } catch (error: any) {
            console.error('Create org error:', JSON.stringify(error, null, 2));
            toast.error(error.message || 'Organizasyon oluşturulamadı.');
        }
    };

    const leaveOrganization = async () => {
        if (!organization) return;
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('organization_members')
                .delete()
                .eq('organization_id', organization.id)
                .eq('user_id', user.id);

            if (error) throw error;

            toast.success('Organizasyondan ayrıldınız.');
            setOrganization(null);
            setMembers([]);
            setRole(null);
        } catch (error: any) {
            toast.error(error.message || 'Ayrılma işlemi başarısız.');
        }
    };

    const inviteMember = async (email: string) => {
        if (!organization || role !== 'admin') return;

        try {
            const token = crypto.randomUUID();
            const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

            const { error } = await supabase
                .from('invitations')
                .insert({
                    organization_id: organization.id,
                    email,
                    token,
                    role: 'member',
                    expires_at
                });

            if (error) throw error;

            toast.success('Davet oluşturuldu! Link kopyalandı (Simülasyon).');
            // In a real app, this would send an email via Edge Function.
            // For now, we log it so you can test it locally.
            const inviteUrl = `${window.location.origin}/join?token=${token}`;
            console.log('🔗 INVITE LINK:', inviteUrl);
            navigator.clipboard.writeText(inviteUrl);

            return inviteUrl;
        } catch (error: any) {
            console.error('Invite error:', error);
            toast.error(error.message || 'Davet edilemedi.');
        }
    };

    return {
        organization,
        members,
        role,
        loading,
        createOrganization,
        leaveOrganization,
        inviteMember,
        refresh: fetchOrganization
    };
}
