export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			_prisma_migrations: {
				Row: {
					applied_steps_count: number;
					checksum: string;
					finished_at: string | null;
					id: string;
					logs: string | null;
					migration_name: string;
					rolled_back_at: string | null;
					started_at: string;
				};
				Insert: {
					applied_steps_count?: number;
					checksum: string;
					finished_at?: string | null;
					id: string;
					logs?: string | null;
					migration_name: string;
					rolled_back_at?: string | null;
					started_at?: string;
				};
				Update: {
					applied_steps_count?: number;
					checksum?: string;
					finished_at?: string | null;
					id?: string;
					logs?: string | null;
					migration_name?: string;
					rolled_back_at?: string | null;
					started_at?: string;
				};
				Relationships: [];
			};
			applications: {
				Row: {
					dietary_restrictions: string | null;
					full_name: string;
					hackathon_ideas: string | null;
					is_transfer: boolean;
					major: string;
					needs_housing_assistance: boolean | null;
					preferred_name: string;
					prior_engineering_experience: string;
					prior_hackathon_experience: string | null;
					pronouns: string | null;
					school: string;
					shirt_size: Database['public']['Enums']['shirt_size'];
					suggested_parts: string | null;
					user_id: string;
					why_ideahacks: string;
					year_at_current_university: Database['public']['Enums']['year'];
				};
				Insert: {
					dietary_restrictions?: string | null;
					full_name: string;
					hackathon_ideas?: string | null;
					is_transfer: boolean;
					major: string;
					needs_housing_assistance?: boolean | null;
					preferred_name: string;
					prior_engineering_experience: string;
					prior_hackathon_experience?: string | null;
					pronouns?: string | null;
					school: string;
					shirt_size: Database['public']['Enums']['shirt_size'];
					suggested_parts?: string | null;
					user_id: string;
					why_ideahacks: string;
					year_at_current_university: Database['public']['Enums']['year'];
				};
				Update: {
					dietary_restrictions?: string | null;
					full_name?: string;
					hackathon_ideas?: string | null;
					is_transfer?: boolean;
					major?: string;
					needs_housing_assistance?: boolean | null;
					preferred_name?: string;
					prior_engineering_experience?: string;
					prior_hackathon_experience?: string | null;
					pronouns?: string | null;
					school?: string;
					shirt_size?: Database['public']['Enums']['shirt_size'];
					suggested_parts?: string | null;
					user_id?: string;
					why_ideahacks?: string;
					year_at_current_university?: Database['public']['Enums']['year'];
				};
				Relationships: [
					{
						foreignKeyName: 'applications_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			Email: {
				Row: {
					createdAt: string;
					email: string;
					id: number;
				};
				Insert: {
					createdAt?: string;
					email: string;
					id?: number;
				};
				Update: {
					createdAt?: string;
					email?: string;
					id?: number;
				};
				Relationships: [];
			};
			parts: {
				Row: {
					alt_ids: string[] | null;
					checkout_location: string;
					datasheet_url: string | null;
					description: string | null;
					id: string;
					image_url: string | null;
					name: string;
					quantity: number;
					requires_checkout: boolean;
					tags: string[] | null;
				};
				Insert: {
					alt_ids?: string[] | null;
					checkout_location: string;
					datasheet_url?: string | null;
					description?: string | null;
					id: string;
					image_url?: string | null;
					name: string;
					quantity: number;
					requires_checkout: boolean;
					tags?: string[] | null;
				};
				Update: {
					alt_ids?: string[] | null;
					checkout_location?: string;
					datasheet_url?: string | null;
					description?: string | null;
					id?: string;
					image_url?: string | null;
					name?: string;
					quantity?: number;
					requires_checkout?: boolean;
					tags?: string[] | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			how_to_retrieve: 'checkout' | 'grab_n_go';
			shirt_size: 'small' | 'medium' | 'large' | 'extra_large';
			year: 'first' | 'second' | 'third' | 'fourth' | 'fifth_or_above' | 'graduated';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
			Database['public']['Views'])
	? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	? Database['public']['Enums'][PublicEnumNameOrOptions]
	: never;
