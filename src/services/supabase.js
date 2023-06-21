import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://wicddgjjvfivizlsekyl.supabase.co'
// Row level security enabled
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpY2RkZ2pqdmZpdml6bHNla3lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcyNzUzNDQsImV4cCI6MjAwMjg1MTM0NH0.Awld5qtf9Tu_IZaKDrHgt3YzB-x_U2KXhaQKyBKJtFM'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
