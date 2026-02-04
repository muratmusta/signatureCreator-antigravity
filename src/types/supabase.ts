export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            domains: {
                Row: {
                    created_at: string
                    domain: string
                    organization_id: string
                    signature_id: string
                    status: string | null
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    domain: string
                    organization_id: string
                    signature_id: string
                    status?: string | null
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    domain?: string
                    organization_id?: string
                    signature_id?: string
                    status?: string | null
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "domains_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "domains_signature_id_fkey"
                        columns: ["signature_id"]
                        isOneToOne: false
                        referencedRelation: "signatures"
                        referencedColumns: ["id"]
                    }
                ]
            }
            invitations: {
                Row: {
                    accepted_at: string | null
                    created_at: string
                    email: string
                    expires_at: string
                    id: string
                    organization_id: string
                    role: string | null
                    token: string
                }
                Insert: {
                    accepted_at?: string | null
                    created_at?: string
                    email: string
                    expires_at: string
                    id?: string
                    organization_id: string
                    role?: string | null
                    token: string
                }
                Update: {
                    accepted_at?: string | null
                    created_at?: string
                    email?: string
                    expires_at?: string
                    id?: string
                    organization_id?: string
                    role?: string | null
                    token?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "invitations_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    }
                ]
            }
            organization_members: {
                Row: {
                    created_at: string
                    organization_id: string
                    role: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    organization_id: string
                    role?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string
                    organization_id?: string
                    role?: string | null
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "organization_members_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    }
                ]
            }
            organizations: {
                Row: {
                    created_at: string
                    id: string
                    name: string
                    slug: string | null
                }
                Insert: {
                    created_at?: string
                    id?: string
                    name: string
                    slug?: string | null
                }
                Update: {
                    created_at?: string
                    id?: string
                    name?: string
                    slug?: string | null
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    email: string | null
                    full_name: string | null
                    id: string
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    email?: string | null
                    full_name?: string | null
                    id: string
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            projects: {
                Row: {
                    color: string | null
                    created_at: string
                    description: string | null
                    id: string
                    name: string
                    organization_id: string | null
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    color?: string | null
                    created_at?: string
                    description?: string | null
                    id?: string
                    name: string
                    organization_id?: string | null
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    color?: string | null
                    created_at?: string
                    description?: string | null
                    id?: string
                    name?: string
                    organization_id?: string | null
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "projects_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    }
                ]
            }
            signatures: {
                Row: {
                    clicks: number | null
                    created_at: string
                    data: Json
                    id: string
                    last_viewed_at: string | null
                    organization_id: string | null
                    project_id: string | null
                    template_id: number | null
                    title: string
                    updated_at: string
                    user_id: string
                    views: number | null
                }
                Insert: {
                    clicks?: number | null
                    created_at?: string
                    data?: Json
                    id?: string
                    last_viewed_at?: string | null
                    organization_id?: string | null
                    project_id?: string | null
                    template_id?: number | null
                    title?: string
                    updated_at?: string
                    user_id: string
                    views?: number | null
                }
                Update: {
                    clicks?: number | null
                    created_at?: string
                    data?: Json
                    id?: string
                    last_viewed_at?: string | null
                    organization_id?: string | null
                    project_id?: string | null
                    template_id?: number | null
                    title?: string
                    updated_at?: string
                    user_id?: string
                    views?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: "signatures_organization_id_fkey"
                        columns: ["organization_id"]
                        isOneToOne: false
                        referencedRelation: "organizations"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "signatures_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            create_organization: {
                Args: { _name: string; _slug: string }
                Returns: {
                    created_at: string
                    id: string
                    name: string
                    slug: string | null
                }
            }
            get_my_admin_org_ids: { Args: never; Returns: string[] }
            get_my_org_ids: { Args: never; Returns: string[] }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
