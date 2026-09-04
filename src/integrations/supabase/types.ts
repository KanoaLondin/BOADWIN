export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blocked_username_terms: {
        Row: {
          created_at: string
          term: string
        }
        Insert: {
          created_at?: string
          term: string
        }
        Update: {
          created_at?: string
          term?: string
        }
        Relationships: []
      }
      friendships: {
        Row: {
          created_at: string
          requested_by: string
          responded_at: string | null
          status: string
          user_a: string
          user_b: string
        }
        Insert: {
          created_at?: string
          requested_by: string
          responded_at?: string | null
          status: string
          user_a: string
          user_b: string
        }
        Update: {
          created_at?: string
          requested_by?: string
          responded_at?: string | null
          status?: string
          user_a?: string
          user_b?: string
        }
        Relationships: [
          {
            foreignKeyName: "friendships_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_user_a_fkey"
            columns: ["user_a"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_user_b_fkey"
            columns: ["user_b"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_consent_notices: {
        Row: {
          child_id: string
          consented_at: string | null
          created_at: string
          delivery_error: string | null
          id: string
          parent_email: string
          sent_at: string | null
          status: string
          token: string
          updated_at: string
        }
        Insert: {
          child_id: string
          consented_at?: string | null
          created_at?: string
          delivery_error?: string | null
          id?: string
          parent_email: string
          sent_at?: string | null
          status?: string
          token: string
          updated_at?: string
        }
        Update: {
          child_id?: string
          consented_at?: string | null
          created_at?: string
          delivery_error?: string | null
          id?: string
          parent_email?: string
          sent_at?: string | null
          status?: string
          token?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_consent_notices_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age_group: string
          al_outfit: string
          bio: string | null
          birth_month: number | null
          birth_year: number | null
          cohort_age_group: string | null
          created_at: string
          display_name: string | null
          gems: number
          hearts: number
          id: string
          is_child: boolean
          is_minor: boolean
          knowledge_level: string | null
          last_active_at: string
          member_since: string
          parent_email: string | null
          parental_consent_at: string | null
          parental_consent_status: string
          premium: string
          profile_bg: string
          role: string
          state: Json
          streak: number
          updated_at: string
          username: string
          username_changed_at: string | null
          weekly_xp: number
          xp: number
        }
        Insert: {
          age_group?: string
          al_outfit?: string
          bio?: string | null
          birth_month?: number | null
          birth_year?: number | null
          cohort_age_group?: string | null
          created_at?: string
          display_name?: string | null
          gems?: number
          hearts?: number
          id: string
          is_child?: boolean
          is_minor?: boolean
          knowledge_level?: string | null
          last_active_at?: string
          member_since?: string
          parent_email?: string | null
          parental_consent_at?: string | null
          parental_consent_status?: string
          premium?: string
          profile_bg?: string
          role?: string
          state?: Json
          streak?: number
          updated_at?: string
          username: string
          username_changed_at?: string | null
          weekly_xp?: number
          xp?: number
        }
        Update: {
          age_group?: string
          al_outfit?: string
          bio?: string | null
          birth_month?: number | null
          birth_year?: number | null
          cohort_age_group?: string | null
          created_at?: string
          display_name?: string | null
          gems?: number
          hearts?: number
          id?: string
          is_child?: boolean
          is_minor?: boolean
          knowledge_level?: string | null
          last_active_at?: string
          member_since?: string
          parent_email?: string | null
          parental_consent_at?: string | null
          parental_consent_status?: string
          premium?: string
          profile_bg?: string
          role?: string
          state?: Json
          streak?: number
          updated_at?: string
          username?: string
          username_changed_at?: string | null
          weekly_xp?: number
          xp?: number
        }
        Relationships: []
      }
      user_blocks: {
        Row: {
          blocked: string
          blocker: string
          created_at: string
        }
        Insert: {
          blocked: string
          blocker: string
          created_at?: string
        }
        Update: {
          blocked?: string
          blocker?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_blocks_blocked_fkey"
            columns: ["blocked"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_blocks_blocker_fkey"
            columns: ["blocker"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      age_from_birth: { Args: { bm: number; byr: number }; Returns: number }
      expire_pending_friend_requests: { Args: never; Returns: undefined }
      normalize_for_moderation: { Args: { input: string }; Returns: string }
      pair_users: {
        Args: { u1: string; u2: string }
        Returns: {
          a: string
          b: string
        }[]
      }
      username_available: { Args: { candidate: string }; Returns: boolean }
      username_is_allowed: { Args: { candidate: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
