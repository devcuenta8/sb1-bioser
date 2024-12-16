import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jlgweydornxbeoarsdam.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3dleWRvcm54YmVvYXJzZGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MzM4ODIsImV4cCI6MjA0MDAwOTg4Mn0.dVOGbSl6g11lCMFKvbh-1eYNkRbyLFpxYonq9fVqPSY';

export const supabase = createClient(supabaseUrl, supabaseKey);