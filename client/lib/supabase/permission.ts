import { createClient } from 'gorth-base/cores/supabase-js';
import {
  supabaseUrl,
  supabaseServiceRoleKey
} from "@/lib/environment"

export function createPermission() {
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}
