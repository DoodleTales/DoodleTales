
import { createClient } from '@supabase/supabase-js';
import { UserData } from './dbtypes';

// Ensure these validation variables are present in your .env.local file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export const SupabaseService = {
  async getUserEnv(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_password', userId)
        .single();

      if (error) {
        // returning null if not found is often better than throwing for GET
        if (error.code === 'PGRST116') return null; 
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching user env:', error);
      throw error;
    }
  },

  async createUserEnv(userId: string, envData: UserData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { user_id: userId, data: envData }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user env:', error);
      throw error;
    }
  },

  async updateUserEnv(userId: string, envData: UserData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ data: envData })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user env:', error);
      throw error;
    }
  },

  async saveUserEnv(userId: string, envData: UserData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert(
          { user_id: userId, data: envData },
          { onConflict: 'user_id' }
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving user env:', error);
      throw error;
    }
  }
};
