import { createBrowserClient } from 'gorth-base/cores/supabase-ssr'
import {
  supabaseUrl,
  supabaseAnonKey,
} from "@/lib/environment"

export function createClient() {
  // return createBrowserClient("https://rqocjwpyckhupjbzheev.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb2Nqd3B5Y2todXBqYnpoZWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMTY4ODUsImV4cCI6MjA5Mzg5Mjg4NX0.N3XgnqJp40XJ22BFvn5LBY_MCgbtJ81oWVfZwqVEz60")
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
