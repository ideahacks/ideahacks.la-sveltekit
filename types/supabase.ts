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
					needs_housing_assistance: boolean;
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
					needs_housing_assistance: boolean;
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
					needs_housing_assistance?: boolean;
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
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			shirt_size: 'small' | 'medium' | 'large' | 'extra_large';
			year: 'one' | 'two' | 'three' | 'four' | 'five_or_more' | 'graduated';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
