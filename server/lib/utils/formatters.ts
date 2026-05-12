// import { Prisma } from "@prisma/client/index";
// import { prisma } from "@/lib/prisma";
import { AuthProvider } from "@/lib/interfaces"

// Helper function to format date without moment
export function formatDate(date: Date, format: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('YY', String(year).slice(-2))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

// Helper function to stringify object like qs
export function stringifyQuery(obj: any): string {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

export function mapProvider(p?: string): AuthProvider | null {
  if (!p) return null;
  const v = p.toLowerCase();
  if (v.includes("google")) return AuthProvider.google;
  if (v.includes("facebook")) return AuthProvider.facebook;
  if (v.includes("microsoft") || v === "azure") return AuthProvider.microsoft;
  if (v.includes("apple")) return AuthProvider.apple;
  if (v === "email") return AuthProvider.email;
  if (v === "phone") return AuthProvider.phone;
  return null;
}

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Convert camelCase to snake_case
 */
function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function normalizeMetadataValue(value: any) {
  if (value === undefined) return null;
  if (value === null) return null;
  if (typeof value === 'bigint') return value.toString();
  if (value instanceof Date) return value.toISOString();
  // if (value instanceof Prisma.Decimal) return value.toString();
  return value;
}

/**
 * Sync all DB fields to Supabase user_metadata in snake_case
 * Excludes: id, email, phone, created_at, confirmed_at, last_sign_in_at, updated_at
 */
export function buildUserMetadataFromDB(dbUser: any): Record<string, any> {
  const reservedFields = new Set([
    'id',
    'supabaseUserId', // Already in id
    'email',
    'emailNormalized',
    'emailVerifiedAt', // Should use email_verified_at if needed
    'phone',
    'phoneCode',
    'phoneNumber',
    'createdAt',
    'updatedAt',
    'publicMetadata',
    'privateMetadata',
    'externalAccounts',
    'role',
    'locked',
    'lockoutExpiresInSeconds',
    'deleteSelfEnabled',
  ]);

  const metadata: Record<string, any> = {};

  // Convert all fields to snake_case and add to metadata
  for (const [key, value] of Object.entries(dbUser)) {
    if (reservedFields.has(key) || value === null || value === undefined) {
      continue;
    }

    const snakeKey = camelToSnakeCase(key);
    
    // Handle specific conversions
    if (key === 'emailVerifiedAt') {
      metadata['email_verified_at'] = value;
    } else if (key === 'phoneVerifiedAt') {
      metadata['phone_verified_at'] = value;
    } else if (key === 'dateOfBirth') {
      metadata['date_of_birth'] = value;
    } else if (key === 'lastSignInAt') {
      metadata['last_sign_in_at'] = value;
    } else if (key === 'lastProvider') {
      metadata['last_provider'] = value;
    } else if (key === 'avatarUrl') {
      metadata['avatar_url'] = value;
    } else if (key === 'activityStatus') {
      metadata['activity_status'] = value;
    } else if (key === 'isOnline') {
      metadata['is_online'] = value;
    } else if (key === 'totalOrders') {
      metadata['total_orders'] = value;
    } else if (key === 'totalSpent') {
      metadata['total_spent'] = value?.toString?.() || value;
    } else if (key === 'loyaltyPoints') {
      metadata['loyalty_points'] = value;
    } else if (key === 'lastActivityAt') {
      metadata['last_activity_at'] = value;
    } else if (key === 'lastSeenAt') {
      metadata['last_seen_at'] = value;
    } else if (key === 'firstName') {
      metadata['first_name'] = value;
    } else if (key === 'lastName') {
      metadata['last_name'] = value;
    } else if (key === 'fullName') {
      metadata['name'] = value;
      // metadata['full_name'] = value;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Skip complex objects
      continue;
    } else {
      // Generic conversion for other fields
      metadata[snakeKey] = value;
    }
  }

  return metadata;
}

export function buildUserMetadataFromDBFull(dbUser: Record<string, any>): Record<string, any> {
  const reservedKeys = new Set([
    'id',
    'supabaseUserId',
    'role',
    'publicMetadata',
    'privateMetadata',
    'externalAccounts',
  ]);
  const reservedSnakeKeys = new Set([
    'id',
    'supabase_user_id',
    'role',
    'public_metadata',
    'private_metadata',
    'external_accounts',
  ]);
  const metadata: Record<string, any> = {};

  for (const [key, value] of Object.entries(dbUser)) {
    if (reservedKeys.has(key)) {
      continue;
    }
    const snakeKey = camelToSnakeCase(key);
    if (reservedSnakeKeys.has(snakeKey)) {
      continue;
    }
    metadata[snakeKey] = normalizeMetadataValue(value);
  }

  const fullNameRaw =
    dbUser.fullName ?? [dbUser.firstName, dbUser.lastName].filter(Boolean).join(' ');
  const fullName = fullNameRaw && String(fullNameRaw).trim().length > 0 ? fullNameRaw : null;

  metadata.first_name = dbUser.firstName ?? null;
  metadata.last_name = dbUser.lastName ?? null;
  metadata.full_name = fullName;
  metadata.name = fullName;

  return metadata;
}

export function buildAppMetadataFromDB(params: {
  user: any;
  organization?: { id: string; name: string; logoUrl?: string | null } | null;
  restaurant?: { id: string; name: string; logoUrl?: string | null } | null;
  supplier?: { id: string; name: string } | null;
}) {
  const { user, organization, restaurant, supplier } = params;

  return {
    sub: user?.id ?? null,
    role: user?.role ?? null,
    organization_id: organization?.id ?? null,
    restaurant_id: restaurant?.id ?? null,
    supplier_id: supplier?.id ?? null,
    // supplier: supplier ? { id: supplier.id, name: supplier.name } : null,
  };
}

// export async function getUserOrgRestaurant(userId: string) {
//   const userRelations = await prisma.user.findUnique({
//     where: { id: userId },
//     select: {
//       organizationsOwned: {
//         select: { id: true, name: true, logoUrl: true },
//       },
//       organizationMemberships: {
//         select: {
//           organization: { select: { id: true, name: true, logoUrl: true } },
//         },
//       },
//       restaurantsManaged: {
//         select: { id: true, name: true, logoUrl: true },
//       },
//       restaurantStaffRoles: {
//         select: {
//           restaurant: { select: { id: true, name: true, logoUrl: true } },
//         },
//       },
//     },
//   });
//
//   const organization =
//     userRelations?.organizationsOwned?.[0] ??
//     userRelations?.organizationMemberships?.[0]?.organization ??
//     null;
//   const restaurant =
//     userRelations?.restaurantsManaged?.[0] ??
//     userRelations?.restaurantStaffRoles?.[0]?.restaurant ??
//     null;
//
//   let supplier = null as { id: string; name: string } | null;
//
//   if (organization?.id) {
//     supplier =
//       (await prisma.supplier.findFirst({
//         where: {
//           organizationId: organization.id,
//           deletedAt: null,
//           status: "active",
//           createdById: userId,
//         },
//         select: { id: true, name: true },
//         orderBy: { createdAt: "asc" },
//       })) ??
//       (await prisma.supplier.findFirst({
//         where: {
//           organizationId: organization.id,
//           deletedAt: null,
//           status: "active",
//         },
//         select: { id: true, name: true },
//         orderBy: { createdAt: "asc" },
//       })) ??
//       (await prisma.supplier.findFirst({
//         where: {
//           organizationId: organization.id,
//           deletedAt: null,
//         },
//         select: { id: true, name: true },
//         orderBy: { createdAt: "asc" },
//       }));
//   }
//
//   return { organization, restaurant, supplier };
// }
