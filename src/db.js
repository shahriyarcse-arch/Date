import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
  }
}

function generateShortId(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const db = {
  // Save a new response directly to Supabase
  async saveResponse(data) {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
    }

    // Only send valid database columns, filtering out internal UI states (like _calMonth, _calYear)
    const newResponse = {
      name: data.name || '',
      location: data.location || '',
      food: data.food || '',
      date: data.date || '',
      time: data.time || '',
      created_by: data.created_by || '',
      timestamp: new Date().toISOString(),
    };

    const { data: inserted, error } = await supabase
      .from('responses')
      .insert([newResponse])
      .select();
    
    if (error) throw error;
    if (inserted && inserted.length > 0) {
      return inserted[0];
    }
    return newResponse;
  },

  // Get all responses directly from Supabase
  async getResponses() {
    if (!supabase) {
      return [];
    }

    const { data: fetched, error } = await supabase
      .from('responses')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return fetched || [];
  },

  // Clear a response by ID directly from Supabase
  async deleteResponse(id) {
    if (!supabase) return false;

    const { error } = await supabase
      .from('responses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // ─── Proposals Table (for unique short links) ───

  async saveProposal({ sender_name, recipient_name, passcode }) {
    if (!supabase) {
      // Fallback: return a local ID without persisting
      return { id: generateShortId(), sender_name, recipient_name, passcode };
    }

    let id;
    let attempts = 0;
    do {
      id = generateShortId();
      const { data: existing } = await supabase
        .from('proposals')
        .select('id')
        .eq('id', id)
        .maybeSingle();
      if (!existing) break;
      attempts++;
    } while (attempts < 5);

    const { data: inserted, error } = await supabase
      .from('proposals')
      .insert([{ id, sender_name, recipient_name, passcode }])
      .select();

    if (error) throw error;
    return inserted?.[0] || { id, sender_name, recipient_name, passcode };
  },

  async getProposal(id) {
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};
