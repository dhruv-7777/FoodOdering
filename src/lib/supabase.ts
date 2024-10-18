import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://rhdycsybfkqgqbvbnvkn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoZHljc3liZmtxZ3FidmJudmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMDM2NzAsImV4cCI6MjA0NDY3OTY3MH0.SNAO10NXx1dRTH8iQfGRwzjD-yHHcKoBJWd6IyUyOCQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
export const checkSupabaseConnection = async () => {
  try {
    // Run a simple query to check connection
    const { data, error } = await supabase.from('product_list').select('*');
    
    if (error) {
      console.error('Supabase connection failed:', error.message);
    } else {
      console.log('Supabase connection successful, data:', data);
    }
  } catch (err) {
    console.error('Error while connecting to Supabase:', err);
  }
};

// Call the function to check the connection
checkSupabaseConnection();


// import 'react-native-url-polyfill/auto';
// import * as SecureStore from 'expo-secure-store';
// import { createClient } from '@supabase/supabase-js';
// import { Database } from '@/src/database.types';

// const ExpoSecureStoreAdapter = {
//   getItem: (key: string) => {
//     return SecureStore.getItemAsync(key);
//   },
//   setItem: (key: string, value: string) => {
//     SecureStore.setItemAsync(key, value);
//   },
//   removeItem: (key: string) => {
//     SecureStore.deleteItemAsync(key);
//   },
// };

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://rhdycsybfkqgqbvbnvkn.supabase.co';
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoZHljc3liZmtxZ3FidmJudmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMDM2NzAsImV4cCI6MjA0NDY3OTY3MH0.SNAO10NXx1dRTH8iQfGRwzjD-yHHcKoBJWd6IyUyOCQ';

// console.log(supabaseUrl, supabaseAnonKey);

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: ExpoSecureStoreAdapter as any,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });
