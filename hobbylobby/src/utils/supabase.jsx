import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dgxwswjunccmrfvbbllb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRneHdzd2p1bmNjbXJmdmJibGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwODA2MDQsImV4cCI6MjAyOTY1NjYwNH0.pQU6iODDGuQvCieSYVJqLMUzp0NPQX0FjkJFNOsndTU';

export const supabase = createClient(supabaseUrl, supabaseKey);
