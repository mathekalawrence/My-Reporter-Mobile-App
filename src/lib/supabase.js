import { createClient } from '@supabase/supabase-js'

// Get these from your Supabase project settings
const supabaseUrl = 'https://utcwdcfeobmtnaitinav.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0Y3dkY2Zlb2JtdG5haXRpbmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MjkzNDAsImV4cCI6MjA3NTQwNTM0MH0.QpFkD4MGepCykKegzYOmdG7VXQIMC7i1I_rKXNIdQBU'

// Create Supabase client for MOBILE APP
export const supabase = createClient(supabaseUrl, supabaseAnonKey)