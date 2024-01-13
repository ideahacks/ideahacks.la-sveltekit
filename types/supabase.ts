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
      admins: {
        Row: {
          created_at: string
          email: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      applications: {
        Row: {
          dietary_restrictions: string
          email: string | null
          full_name: string
          hackathon_ideas: string
          is_transfer: boolean | null
          major: string | null
          preferred_name: string
          prior_engineering_experience: string | null
          prior_hackathon_experience: string
          pronouns: string | null
          school: string
          shirt_size: Database["public"]["Enums"]["shirt_size"] | null
          suggested_parts: string
          user_id: string
          why_ideahacks: string | null
          year_at_current_university: Database["public"]["Enums"]["year"] | null
        }
        Insert: {
          dietary_restrictions: string
          email?: string | null
          full_name: string
          hackathon_ideas: string
          is_transfer?: boolean | null
          major?: string | null
          preferred_name: string
          prior_engineering_experience?: string | null
          prior_hackathon_experience: string
          pronouns?: string | null
          school: string
          shirt_size?: Database["public"]["Enums"]["shirt_size"] | null
          suggested_parts: string
          user_id: string
          why_ideahacks?: string | null
          year_at_current_university?:
            | Database["public"]["Enums"]["year"]
            | null
        }
        Update: {
          dietary_restrictions?: string
          email?: string | null
          full_name?: string
          hackathon_ideas?: string
          is_transfer?: boolean | null
          major?: string | null
          preferred_name?: string
          prior_engineering_experience?: string | null
          prior_hackathon_experience?: string
          pronouns?: string | null
          school?: string
          shirt_size?: Database["public"]["Enums"]["shirt_size"] | null
          suggested_parts?: string
          user_id?: string
          why_ideahacks?: string | null
          year_at_current_university?:
            | Database["public"]["Enums"]["year"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      emails: {
        Row: {
          createdAt: string
          email: string
          id: number
        }
        Insert: {
          createdAt?: string
          email: string
          id?: number
        }
        Update: {
          createdAt?: string
          email?: string
          id?: number
        }
        Relationships: []
      }
      parts: {
        Row: {
          alt_ids: string[] | null
          checkout_location: string
          datasheet_url: string | null
          description: string | null
          image_url: string | null
          name: string
          part_id: string
          quantity: number
          requires_checkout: boolean
          tags: string[] | null
        }
        Insert: {
          alt_ids?: string[] | null
          checkout_location: string
          datasheet_url?: string | null
          description?: string | null
          image_url?: string | null
          name: string
          part_id: string
          quantity: number
          requires_checkout: boolean
          tags?: string[] | null
        }
        Update: {
          alt_ids?: string[] | null
          checkout_location?: string
          datasheet_url?: string | null
          description?: string | null
          image_url?: string | null
          name?: string
          part_id?: string
          quantity?: number
          requires_checkout?: boolean
          tags?: string[] | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          team_id: number
        }
        Insert: {
          created_at?: string
          team_id?: number
        }
        Update: {
          created_at?: string
          team_id?: number
        }
        Relationships: []
      }
      teams_parts: {
        Row: {
          created_at: string
          part_id: string
          quantity: number
          team_id: number
        }
        Insert: {
          created_at?: string
          part_id: string
          quantity: number
          team_id?: number
        }
        Update: {
          created_at?: string
          part_id?: string
          quantity?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teams_parts_part_id_fkey"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["part_id"]
          },
          {
            foreignKeyName: "teams_parts_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      shirt_size: "extra_small" | "small" | "medium" | "large" | "extra_large"
      year:
        | "first"
        | "second"
        | "third"
        | "fourth"
        | "fifth_or_more"
        | "graduated"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
