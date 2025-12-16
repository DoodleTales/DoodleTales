
import { createClient } from '@supabase/supabase-js';
import { UserData } from './dbtypes';

// Ensure these validation variables are present in your .env.local file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export const SupabaseService = {
  async getUserByEmail(userEmail: string) {
    try {
      const { data, error } = await supabase
        .schema('next_auth')
        .from('users')
        .select('*')
        .eq('email', userEmail)
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
        .schema('next_auth')
        .from('users')
        .insert([
          { email: envData.email, name: envData.name, password: envData.password },
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
        .schema('next_auth')
        .from('users')
        .update({ name: envData.name, password: envData.password, ai_api_key: envData.ai_api_key })
        .eq('email', userEmail)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user env:', error);
      throw error;
    }
  },

  async saveUser(userEmail: string, userData: UserData) {
    try {
      const { data, error } = await supabase
        .schema('next_auth')
        .from('users')
        .upsert(
          { email: userEmail, name: userData.name, password: userData.password, ai_api_key: userData.ai_api_key },
          { onConflict: 'email' },
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving user env:', error);
      throw error;
    }
  },
};
