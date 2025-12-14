
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
  async getUserByEmail(userEmail: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_email', userEmail)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; 
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching user env:', error);
      throw error;
    }
  },

  async createUser(userEmail: string, envData: UserData) {
    try {
      console.log('Creating user env:', envData);
      const { data, error } = await supabase
        .from('users')
        .insert([
          { user_email: envData.user_email, user_name: envData.user_name, user_password: envData.user_password }
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

  async updateUser(userEmail: string, envData: UserData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ user_name: envData.user_name, user_password: envData.user_password })
        .eq('user_email', userEmail)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user env:', error);
      throw error;
    }
  },

  async saveUser(userEmail: string, envData: UserData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert(
          { user_email: userEmail, data: envData },
          { onConflict: 'user_ email' }
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
