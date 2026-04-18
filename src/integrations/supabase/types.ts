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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      advertisements: {
        Row: {
          ad_title: string
          ad_type: string
          click_count: number
          created_at: string
          end_date: string | null
          id: string
          impression_count: number
          is_active: boolean
          monthly_fee: number
          start_date: string | null
          target_category: string | null
          user_id: string
        }
        Insert: {
          ad_title: string
          ad_type?: string
          click_count?: number
          created_at?: string
          end_date?: string | null
          id?: string
          impression_count?: number
          is_active?: boolean
          monthly_fee?: number
          start_date?: string | null
          target_category?: string | null
          user_id: string
        }
        Update: {
          ad_title?: string
          ad_type?: string
          click_count?: number
          created_at?: string
          end_date?: string | null
          id?: string
          impression_count?: number
          is_active?: boolean
          monthly_fee?: number
          start_date?: string | null
          target_category?: string | null
          user_id?: string
        }
        Relationships: []
      }
      business_accounts: {
        Row: {
          business_name: string
          business_type: string
          created_at: string
          id: string
          is_active: boolean
          monthly_fee: number
          plan_end_date: string | null
          plan_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          business_name: string
          business_type: string
          created_at?: string
          id?: string
          is_active?: boolean
          monthly_fee?: number
          plan_end_date?: string | null
          plan_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          business_name?: string
          business_type?: string
          created_at?: string
          id?: string
          is_active?: boolean
          monthly_fee?: number
          plan_end_date?: string | null
          plan_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      delivery_options: {
        Row: {
          base_delivery_fee: number | null
          created_at: string
          delivery_radius_km: number | null
          delivery_type: string
          estimated_delivery_time: string | null
          id: string
          is_active: boolean
          listing_id: string
          per_km_rate: number | null
          seller_id: string
        }
        Insert: {
          base_delivery_fee?: number | null
          created_at?: string
          delivery_radius_km?: number | null
          delivery_type: string
          estimated_delivery_time?: string | null
          id?: string
          is_active?: boolean
          listing_id: string
          per_km_rate?: number | null
          seller_id: string
        }
        Update: {
          base_delivery_fee?: number | null
          created_at?: string
          delivery_radius_km?: number | null
          delivery_type?: string
          estimated_delivery_time?: string | null
          id?: string
          is_active?: boolean
          listing_id?: string
          per_km_rate?: number | null
          seller_id?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          category: string
          condition: string | null
          created_at: string
          description: string | null
          id: string
          images: Json
          is_featured: boolean
          location: string
          metadata: Json | null
          price: number
          status: string
          subcategory: string | null
          title: string
          updated_at: string
          user_id: string
          view_count: number
        }
        Insert: {
          category: string
          condition?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: Json
          is_featured?: boolean
          location: string
          metadata?: Json | null
          price: number
          status?: string
          subcategory?: string | null
          title: string
          updated_at?: string
          user_id: string
          view_count?: number
        }
        Update: {
          category?: string
          condition?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: Json
          is_featured?: boolean
          location?: string
          metadata?: Json | null
          price?: number
          status?: string
          subcategory?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number
        }
        Relationships: []
      }
      premium_listings: {
        Row: {
          boost_score: number | null
          created_at: string
          end_date: string
          fee_amount: number
          id: string
          is_active: boolean
          listing_id: string
          premium_type: string
          rotation_weight: number | null
          start_date: string
          user_id: string
        }
        Insert: {
          boost_score?: number | null
          created_at?: string
          end_date: string
          fee_amount?: number
          id?: string
          is_active?: boolean
          listing_id: string
          premium_type: string
          rotation_weight?: number | null
          start_date?: string
          user_id: string
        }
        Update: {
          boost_score?: number | null
          created_at?: string
          end_date?: string
          fee_amount?: number
          id?: string
          is_active?: boolean
          listing_id?: string
          premium_type?: string
          rotation_weight?: number | null
          start_date?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          district: string | null
          id: string
          is_complete: boolean
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          district?: string | null
          id?: string
          is_complete?: boolean
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          district?: string | null
          id?: string
          is_complete?: boolean
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          buyer_id: string
          created_at: string
          expires_at: string
          id: string
          payment_method: string
          reservation_amount: number
          seller_id: string
          status: string
          transaction_id: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          expires_at: string
          id?: string
          payment_method: string
          reservation_amount: number
          seller_id: string
          status?: string
          transaction_id: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          payment_method?: string
          reservation_amount?: number
          seller_id?: string
          status?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_reviews: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          rating: number
          response_time_rating: number | null
          review_text: string | null
          seller_id: string
          transaction_id: string | null
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          rating: number
          response_time_rating?: number | null
          review_text?: string | null
          seller_id: string
          transaction_id?: string | null
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          rating?: number
          response_time_rating?: number | null
          review_text?: string | null
          seller_id?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seller_reviews_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_verification: {
        Row: {
          created_at: string
          government_id_url: string | null
          id: string
          mobile_verified: boolean | null
          social_media_link: string | null
          updated_at: string
          user_id: string
          verification_badges: Json | null
          verification_documents: Json | null
          verification_status: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          government_id_url?: string | null
          id?: string
          mobile_verified?: boolean | null
          social_media_link?: string | null
          updated_at?: string
          user_id: string
          verification_badges?: Json | null
          verification_documents?: Json | null
          verification_status?: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          government_id_url?: string | null
          id?: string
          mobile_verified?: boolean | null
          social_media_link?: string | null
          updated_at?: string
          user_id?: string
          verification_badges?: Json | null
          verification_documents?: Json | null
          verification_status?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          agreed_price: number
          buyer_id: string
          completed_at: string | null
          created_at: string
          delivery_address: string | null
          delivery_distance_km: number | null
          delivery_fee: number | null
          delivery_option: string
          id: string
          listing_id: string
          product_name: string
          seller_id: string
          status: string
        }
        Insert: {
          agreed_price: number
          buyer_id: string
          completed_at?: string | null
          created_at?: string
          delivery_address?: string | null
          delivery_distance_km?: number | null
          delivery_fee?: number | null
          delivery_option?: string
          id?: string
          listing_id: string
          product_name: string
          seller_id: string
          status?: string
        }
        Update: {
          agreed_price?: number
          buyer_id?: string
          completed_at?: string | null
          created_at?: string
          delivery_address?: string | null
          delivery_distance_km?: number | null
          delivery_fee?: number | null
          delivery_option?: string
          id?: string
          listing_id?: string
          product_name?: string
          seller_id?: string
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_profile: {
        Args: { _user_id: string }
        Returns: {
          avatar_url: string
          bio: string
          created_at: string
          display_name: string
          district: string
          user_id: string
        }[]
      }
      get_seller_rating: {
        Args: { seller_user_id: string }
        Returns: {
          average_rating: number
          response_time_rating: number
          total_reviews: number
        }[]
      }
      get_seller_trust_score: {
        Args: { seller_user_id: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
