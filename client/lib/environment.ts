// --- SUPABASE CONFIG ---
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Key này TUYỆT ĐỐI không có tiền tố NEXT_PUBLIC_ vì nó có quyền bypass mọi RLS
export const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
export const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// --- AUTH & API CONFIG ---
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const apiAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL;

// --- ROUTING ---
export const routes = {
  login: process.env.NEXT_PUBLIC_SIGN_IN_DIRECT_URL!,
  register: process.env.NEXT_PUBLIC_SIGN_UP_DIRECT_URL!,
  setting: process.env.NEXT_PUBLIC_SETTING_DIRECT_URL!,
};
