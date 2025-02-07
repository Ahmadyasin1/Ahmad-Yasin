import { supabase } from '../lib/supabase';

const testSupabaseConnection = async () => {
  try {
    // Test database connection
    const { data: dbData, error: dbError } = await supabase
      .from('projects') // Replace with your table name
      .select('*')
      .limit(1);

    if (dbError) {
      console.error('Database connection failed:', dbError);
      return false;
    }

    console.log('Database connection successful:', dbData);

    // Test authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('Authentication check failed:', authError);
      return false;
    }

    console.log('User is authenticated:', user);
    return true;
  } catch (err) {
    console.error('Error testing Supabase connection:', err);
    return false;
  }
};

// Call the function to test the connection
testSupabaseConnection();
