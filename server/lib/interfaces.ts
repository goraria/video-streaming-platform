export const OrganizationShortly = {
  id: true,
  name: true,
  code: true,
  logoUrl: true,
  description: true,
}

export const RestaurantShortly = {
  id: true,
  name: true,
  code: true,
  logoUrl: true,
  description: true,
}

export const SupplierShortly = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  rating: true,
  status: true,
}

export const WarehouseShortly = {
  id: true,
  name: true,
  restaurantId: true,
  address: true,
  isActive: true,
}

export const UserShortly = {
  id: true,
  email: true,
  username: true,
  fullName: true,
  avatarUrl: true,
  role: true,
}

export const CategoryShortly = {
  id: true,
  name: true,
  slug: true,
  imageUrl: true,
  description: true,
}

export const MenuShortly = {
  id: true,
  name: true,
  imageUrl: true,
  description: true,
}

export const MenuItemShortly = {
  id: true,
  name: true,
  slug: true,
  imageUrl: true,
  description: true,
}

export const InventoryItemShortly = {
  id: true,
  name: true,
  sku: true,
  unit: true,
  unitCost: true,
  barcode: true,
  description: true,
}

export const AddressShortly = {
  id: true,
  recipientName: true,
  recipientPhone: true,
  streetAddress: true,
  ward: true,
  district: true,
  city: true,
  country: true,
  latitude: true,
  longitude: true,
  tag: true,
}

export const TableShortly = {
  id: true,
  tableNumber: true,
  capacity: true,
  location: true,
  status: true,
  qrCode: true,
}

export const OrderItemShortly = {
  id: true,
  quantity: true,
  unitPrice: true,
  totalPrice: true,
}

export const DeliveryFully = {
  id: true,
  status: true,
  assignedAt: true,
  pickedUpAt: true,
  deliveredAt: true,
  estimatedTimeMin: true,
  actualTimeMin: true,
  deliveryFee: true,
  distanceKm: true,
  destinationLatitude: true,
  destinationLongitude: true,
  notes: true,
  customerRating: true,
  customerFeedback: true,
  deliveryPhoto: true,
  currentLatitude: true,
  currentLongitude: true,
  lastLocationAt: true,
  isTrackingActive: true,
  trackingCode: true,
  routePolyline: true,
  estimatedArrival: true,
  actualArrival: true,
  customerNotifiedAt: true,
  staffNotifiedAt: true,
  createdAt: true,
}

export const DeliveryShortly = {
  id: true,
  orderId: true,
  restaurantId: true,
  deliveryStaffId: true,
  status: true,
  assignedAt: true,
  pickedUpAt: true,
  deliveredAt: true,
  deliveryFee: true,
  distanceKm: true,
  destinationLatitude: true,
  destinationLongitude: true,
  trackingCode: true,
  isTrackingActive: true,
  estimatedArrival: true,
  actualArrival: true,
  createdAt: true,
}

export const DeliveryStaffShortly = {
  id: true,
  vehicleType: true,
  licensePlate: true,
  status: true,
  maxCapacity: true,
}

export const PaymentShortly = {
  id: true,
  amount: true,
  currency: true,
  method: true,
  status: true,
  provider: true,
  transactionId: true,
  gatewayResponse: true,
  processedAt: true,
}

/* =========================
 * Global aliases
 * ========================= */
export type DecimalString = string; // ví dụ "123.45"
export type JsonValue = any;

/* =========================
 * ENUMS (mirror Prisma enums)
 * ========================= */
export enum AuthProvider {
  google = 'google',
  facebook = 'facebook',
  apple = 'apple',
  microsoft = 'microsoft',
  github = 'github',
  discord = 'discord',
  email = 'email',
  phone = 'phone',
  magicLink = 'magicLink',
}

export enum UserStatus {
  active = 'active',
  inactive = 'inactive',
  banned = 'banned',
  suspended = 'suspended',
  pendingVerification = 'pendingVerification',
  locked = 'locked',
  onLeave = 'onLeave',
}

export enum UserActivityStatus {
  available = 'available',
  busy = 'busy',
  doNotDisturb = 'doNotDisturb',
  away = 'away',
  offline = 'offline',
  invisible = 'invisible',
}

export enum UserRole {
  customer = 'customer',
  staff = 'staff',
  manager = 'manager',
  admin = 'admin',
  master = 'master',
  delivery = 'delivery',
  supplier = 'supplier',
  warehouse = 'warehouse',
}

export enum OrganizationRole {
  admin = 'admin',
  member = 'member',
  guest = 'guest',
}

export enum RestaurantStatus {
  active = 'active',
  inactive = 'inactive',
  maintenance = 'maintenance',
  closed = 'closed',
}

export enum TableStatus {
  available = 'available',
  occupied = 'occupied',
  reserved = 'reserved',
  maintenance = 'maintenance',
  outOfOrder = 'outOfOrder',
}

export enum ReservationStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  seated = 'seated',
  completed = 'completed',
  cancelled = 'cancelled',
  noShow = 'noShow',
}

export enum TableOrderStatus {
  active = 'active',
  completed = 'completed',
  cancelled = 'cancelled',
}

export enum OrderType {
  dineIn = 'dineIn',
  takeaway = 'takeaway',
  delivery = 'delivery',
}

export enum OrderStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  preparing = 'preparing',
  ready = 'ready',
  served = 'served',
  completed = 'completed',
  cancelled = 'cancelled',
}

export enum CookingStatus {
  pending = 'pending',
  preparing = 'preparing',
  cooking = 'cooking',
  ready = 'ready',
  served = 'served',
  cancelled = 'cancelled',
}

export enum PaymentMethod {
  cash = 'cash',
  card = 'card',
  bankTransfer = 'bankTransfer',
  momo = 'momo',
  zalopay = 'zalopay',
  viettelpay = 'viettelpay',
  vnpay = 'vnpay',
  shopeepay = 'shopeepay',
  paypal = 'paypal',
}

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
  processing = 'processing',
  cancelled = 'cancelled',
  refunded = 'refunded',
}

export enum RefundStatus {
  processing = 'processing',
  completed = 'completed',
  failed = 'failed',
  cancelled = 'cancelled',
}

export enum PaymentIntentStatus {
  created = 'created',
  requiresAction = 'requiresAction',
  processing = 'processing',
  succeeded = 'succeeded',
  cancelled = 'cancelled',
  failed = 'failed',
}

export enum RestaurantStaffRole {
  staff = 'staff',
  manager = 'manager',
  chef = 'chef',
  cashier = 'cashier',
  security = 'security',
  cleaner = 'cleaner',
  supervisor = 'supervisor',
  sousChef = 'sousChef',
  waiter = 'waiter',
  host = 'host',
}

export enum StaffStatus {
  active = 'active',
  inactive = 'inactive',
  onLeave = 'onLeave',
  suspended = 'suspended',
  terminated = 'terminated',
}

export enum StaffShiftType {
  morning = 'morning',
  afternoon = 'afternoon',
  evening = 'evening',
  night = 'night',
  fullDay = 'fullDay',
  splitShift = 'splitShift',
}

export enum StaffScheduleStatus {
  scheduled = 'scheduled',
  confirmed = 'confirmed',
  inProgress = 'inProgress',
  completed = 'completed',
  absent = 'absent',
  late = 'late',
  cancelled = 'cancelled',
}

export enum InventoryTransactionType {
  purchase = 'purchase',
  usage = 'usage',
  adjustment = 'adjustment',
  waste = 'waste',
  return = 'return',
  transfer = 'transfer',
}

export enum VoucherDiscountType {
  percentage = 'percentage',
  fixedAmount = 'fixedAmount',
}

export enum PromotionType {
  percentage = 'percentage',
  fixedAmount = 'fixedAmount',
  buyOneGetOne = 'buyOneGetOne',
  comboDeal = 'comboDeal',
  happyHour = 'happyHour',
  seasonal = 'seasonal',
}

export enum ReviewStatus {
  active = 'active',
  hidden = 'hidden',
  flagged = 'flagged',
  deleted = 'deleted',
}

export enum RevenueReportType {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
}

export enum ConversationType {
  support = 'support',
  feedback = 'feedback',
  complaint = 'complaint',
  inquiry = 'inquiry',
}

export enum ConversationStatus {
  active = 'active',
  resolved = 'resolved',
  closed = 'closed',
}

export enum MessageType {
  text = 'text',
  image = 'image',
  file = 'file',
  system = 'system',
}

export enum NotificationType {
  orderCreated = 'orderCreated',
  orderConfirmed = 'orderConfirmed',
  orderPreparing = 'orderPreparing',
  orderReady = 'orderReady',
  orderDelivered = 'orderDelivered',
  orderCancelled = 'orderCancelled',
  orderPaymentSuccess = 'orderPaymentSuccess',
  orderPaymentFailed = 'orderPaymentFailed',
  reservationCreated = 'reservationCreated',
  reservationConfirmed = 'reservationConfirmed',
  reservationCancelled = 'reservationCancelled',
  reservationReminder = 'reservationReminder',
  shiftAssigned = 'shiftAssigned',
  shiftReminder = 'shiftReminder',
  scheduleUpdated = 'scheduleUpdated',
  attendanceReminder = 'attendanceReminder',
  newReview = 'newReview',
  lowInventory = 'lowInventory',
  menuUpdated = 'menuUpdated',
  promotionCreated = 'promotionCreated',
  voucherExpiresSoon = 'voucherExpiresSoon',
  memberJoined = 'memberJoined',
  memberLeft = 'memberLeft',
  roleChanged = 'roleChanged',
  organizationUpdated = 'organizationUpdated',
  systemMaintenance = 'systemMaintenance',
  featureAnnouncement = 'featureAnnouncement',
  securityAlert = 'securityAlert',
  newMessage = 'newMessage',
  conversationStarted = 'conversationStarted',
}

export enum NotificationPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
  urgent = 'urgent',
}

export enum NotificationStatus {
  unread = 'unread',
  read = 'read',
  archived = 'archived',
}

export enum DeliveryVehicle {
  motorcycle = 'motorcycle',
  bicycle = 'bicycle',
  car = 'car',
  scooter = 'scooter',
  walking = 'walking',
}

export enum DeliveryStaffStatus {
  available = 'available',
  busy = 'busy',
  offline = 'offline',
  onBreak = 'onBreak',
  maintenance = 'maintenance',
}

export enum DeliveryStatus {
  assigned = 'assigned',
  accepted = 'accepted',
  pickedUp = 'pickedUp',
  inTransit = 'inTransit',
  delivered = 'delivered',
  failed = 'failed',
  cancelled = 'cancelled',
}

export enum SupplierStatus {
  active = 'active',
  inactive = 'inactive',
  suspended = 'suspended',
  blacklisted = 'blacklisted',
}

export enum PurchaseOrderStatus {
  draft = 'draft',
  sent = 'sent',
  confirmed = 'confirmed',
  partiallyReceived = 'partiallyReceived',
  received = 'received',
  cancelled = 'cancelled',
}

export enum WarehouseReceiptStatus {
  draft = 'draft',
  pending = 'pending',
  approved = 'approved',
  received = 'received',
  cancelled = 'cancelled',
}

export enum WarehouseIssueStatus {
  draft = 'draft',
  pending = 'pending',
  approved = 'approved',
  issued = 'issued',
  cancelled = 'cancelled',
}

export enum WarehouseIssuePurpose {
  cooking = 'cooking',
  waste = 'waste',
  transfer = 'transfer',
  adjustment = 'adjustment',
  sample = 'sample',
  maintenance = 'maintenance',
  other = 'other',
}

export enum InventoryUnit {
  kg = 'kg',
  gram = 'gram',
  liter = 'liter',
  ml = 'ml',
  piece = 'piece',
  box = 'box',
  bag = 'bag',
  bottle = 'bottle',
  can = 'can',
  pack = 'pack',
  dozen = 'dozen',
  case = 'case',
  carton = 'carton',
  pallet = 'pallet',
  meter = 'meter',
  cm = 'cm',
  inch = 'inch',
  foot = 'foot',
  yard = 'yard',
  gallon = 'gallon',
  quart = 'quart',
  pint = 'pint',
  cup = 'cup',
  tablespoon = 'tablespoon',
  teaspoon = 'teaspoon',
  ounce = 'ounce',
  pound = 'pound',
  ton = 'ton',
  other = 'other',
}

export enum AnalyticsEvent {
  pageView = 'pageView',
  menuItemView = 'menuItemView',
  orderCreated = 'orderCreated',
  orderCompleted = 'orderCompleted',
  userRegistration = 'userRegistration',
  reservationCreated = 'reservationCreated',
  reviewSubmitted = 'reviewSubmitted',
  searchPerformed = 'searchPerformed',
  deliveryAssigned = 'deliveryAssigned',
  deliveryCompleted = 'deliveryCompleted',
  inventoryLow = 'inventoryLow',
  supplierOrderCreated = 'supplierOrderCreated',
  warehouseReceiptCreated = 'warehouseReceiptCreated',
  warehouseIssueCreated = 'warehouseIssueCreated',
  staffCheckIn = 'staffCheckIn',
  staffCheckOut = 'staffCheckOut',
  paymentProcessed = 'paymentProcessed',
  voucherUsed = 'voucherUsed',
  promotionApplied = 'promotionApplied',
}

export enum KpiPeriod {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  quarterly = 'quarterly',
  yearly = 'yearly',
}

export enum AuditAction {
  create = 'create',
  update = 'update',
  delete = 'delete',
  login = 'login',
  logout = 'logout',
  export = 'export',
  import = 'import',
  approve = 'approve',
  reject = 'reject',
  cancel = 'cancel',
  checkIn = 'checkIn',
  checkOut = 'checkOut',
  assign = 'assign',
  unassign = 'unassign',
  activate = 'activate',
  deactivate = 'deactivate',
}

export enum DevicePlatform {
  ios = 'ios',
  android = 'android',
  web = 'web',
  desktop = 'desktop',
}

export enum FileType {
  image = 'image',
  video = 'video',
  document = 'document',
  audio = 'audio',
  other = 'other',
}

export enum StorageBucket {
  avatars = 'avatars',
  restaurantImages = 'restaurantImages',
  menuItems = 'menuItems',
  products = 'products',
  documents = 'documents',
  receipts = 'receipts',
  deliveries = 'deliveries',
  reviews = 'reviews',
  temp = 'temp',
}

/* =========================
 * INTERFACES (mirror Prisma models)
 * ========================= */

export interface User {
  id: string;
  username?: string | null;
  email: string;
  emailNormalized: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  phoneCode?: string | null;
  phoneNumber?: string | null;
  avatarUrl?: string | null;
  emailVerifiedAt?: Date | null;
  phoneVerifiedAt?: Date | null;

  status: UserStatus;
  role: UserRole;
  activityStatus: UserActivityStatus;
  isOnline: boolean;
  lastActivityAt?: Date | null;
  lastSeenAt?: Date | null;

  dateOfBirth?: Date | null;
  gender?: string | null;

  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: DecimalString;
  lastSignInAt?: Date | null;

  supabaseUserId?: string | null;
  providers: AuthProvider[];
  lastProvider?: AuthProvider | null;

  twoFactorEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  banned: boolean;
  locked: boolean;
  lockoutExpiresInSeconds?: number | null;
  deleteSelfEnabled: boolean;
  createOrganizationEnabled: boolean;
  createOrganizationsLimit?: number | null;
  legalAcceptedAt?: Date | null;

  publicMetadata?: JsonValue | null;
  privateMetadata?: JsonValue | null;
  unsafeMetadata?: JsonValue | null;
  emailAddresses?: JsonValue | null;
  phoneNumbers?: JsonValue | null;
  web3Wallets?: JsonValue | null;
  externalAccounts?: JsonValue | null;
  enterpriseAccounts?: JsonValue | null;
  passkeys?: JsonValue | null;

  hasImage: boolean;
  imageUrl?: string | null;
  passwordEnabled: boolean;
  twoFactorSecret?: string | null;
  backupCodes?: JsonValue | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  logoUrl?: string | null;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface OrganizationMembership {
  id: string;
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  createdAt: Date;
  updatedAt: Date;
  joinedAt?: Date | null;
  invitedAt?: Date | null;
}

export interface RestaurantChain {
  id: string;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface Restaurant {
  id: string;
  organizationId: string;
  chainId?: string | null;
  code: string;
  name: string;
  address: string;
  phoneNumber?: string | null;
  email?: string | null;
  description?: string | null;
  coverUrl?: string | null;
  logoUrl?: string | null;
  openingHours?: JsonValue | null;
  status: RestaurantStatus;
  managerId?: string | null;
  timezone?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface RestaurantUserRole {
  id: string;
  restaurantId: string;
  userId: string;
  role: RestaurantStaffRole;
  status: StaffStatus;
  hourlyRate?: DecimalString | null;
  joinedAt: Date;
  leftAt?: Date | null;
}

/* CUSTOMER / ADDRESS / CHAT */

export interface Address {
  id: string;
  userId: string;
  restaurantId?: string | null;
  recipientName: string;
  recipientPhone: string;
  streetAddress: string;
  ward?: string | null;
  district: string;
  city: string;
  country: string;
  latitude?: DecimalString | null;
  longitude?: DecimalString | null;
  tag?: string | null;
  note?: string | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  customerId?: string | null;
  restaurantId?: string | null;
  staffId?: string | null;
  title?: string | null;
  status: ConversationStatus;
  lastMessageAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  attachments: string[];
  isRead: boolean;
  createdAt: Date;
}

/* MENU / CATEGORY / MENU ITEM / RECIPES (+ Options) */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  displayOrder: number;
  imageUrl?: string | null;
  isActive: boolean;
  parentId?: string | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
}

export interface Menu {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  displayOrder: number;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface MenuItem {
  id: string;
  menuId: string;
  categoryId?: string | null;
  slug?: string | null;
  name: string;
  description?: string | null;
  price: DecimalString;
  imageUrl?: string | null;
  isAvailable: boolean;
  displayOrder: number;
  isFeatured: boolean;
  allergens: string[];
  calories?: number | null;
  dietaryInfo: string[];
  preparationTime?: number | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
}

export interface Recipe {
  id: string;
  menuItemId: string;
  name: string;
  description?: string | null;
  instructions?: string | null;
  cookTime?: number | null;
  prepTime?: number | null;
  servingSize?: number | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  inventoryItemId: string;
  quantity: DecimalString;
  unit: string;
  notes?: string | null;
}

export interface OptionGroup {
  id: string;
  restaurantId: string;
  name: string;
  required: boolean;
  minSelect?: number | null;
  maxSelect?: number | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface Option {
  id: string;
  groupId: string;
  name: string;
  priceDelta: DecimalString;
  isAvailable: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface MenuItemOptionGroup {
  id: string;
  menuItemId: string;
  groupId: string;
  displayOrder: number;
}

/* TABLE / RESERVATION / TABLE ORDER */

export interface Table {
  id: string;
  restaurantId: string;
  tableNumber: string;
  capacity: number;
  location?: string | null;
  status: TableStatus;
  qrCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface Reservation {
  id: string;
  tableId: string;
  customerId?: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  partySize: number;
  reservationDate: Date;
  durationHours: DecimalString;
  status: ReservationStatus;
  specialRequests?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
  restaurantId?: string | null;
}

export interface TableOrder {
  id: string;
  tableId: string;
  orderId?: string | null;
  sessionCode: string;
  status: TableOrderStatus;
  openedAt: Date;
  closedAt?: Date | null;
  totalAmount?: DecimalString | null;
  staffId?: string | null;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
  restaurantId?: string | null;
}

/* ORDER / PAYMENT / REVIEW / VOUCHER / PROMOTION */

export interface Order {
  id: string;
  orderCode: string;
  restaurantId: string;
  customerId: string;
  addressId?: string | null;
  orderType: OrderType;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: DecimalString;
  discountAmount: DecimalString;
  taxAmount: DecimalString;
  serviceCharge: DecimalString;
  tipAmount: DecimalString;
  deliveryFee: DecimalString;
  finalAmount: DecimalString;
  currency: string;
  estimatedTime?: number | null;
  estimatedTimeReadyAt?: Date | null;
  promisedAt?: Date | null;
  deliveredAt?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
  deliveryZoneId?: string | null;
  deliveryNotes?: string | null;
  deliveryRating?: number | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  unitPrice: DecimalString;
  totalPrice: DecimalString;
  cookingStatus: CookingStatus;
  preparedAt?: Date | null;
  servedAt?: Date | null;
  specialInstructions?: string | null;
  createdAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface OrderItemOption {
  id: string;
  orderItemId: string;
  optionId: string;
  priceDelta: DecimalString;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  changedByUserId?: string | null;
  notes?: string | null;
  createdAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: DecimalString;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  provider?: string | null;
  transactionId?: string | null;
  gatewayResponse?: JsonValue | null;
  processedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  processedById?: string | null;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
  restaurantId?: string | null;
}

export interface Refund {
  id: string;
  paymentId: string;
  amount: DecimalString;
  reason?: string | null;
  status: RefundStatus;
  providerRef?: string | null;
  createdAt: Date;
  processedAt?: Date | null;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface PaymentIntent {
  id: string;
  orderId: string;
  provider: string;
  clientSecret?: string | null;
  externalId?: string | null;
  status: PaymentIntentStatus;
  metadata?: JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface Review {
  id: string;
  customerId: string;
  restaurantId?: string | null;
  orderId?: string | null;
  menuItemId?: string | null;
  rating: number;
  title?: string | null;
  content?: string | null;
  photos: string[];
  status: ReviewStatus;
  response?: string | null;
  respondedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface Voucher {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  discountType: VoucherDiscountType;
  discountValue: DecimalString;
  minOrderValue?: DecimalString | null;
  maxDiscount?: DecimalString | null;
  restaurantId?: string | null;
  startDate: Date;
  endDate: Date;
  usageLimit?: number | null;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface VoucherUsage {
  id: string;
  voucherId: string;
  userId: string;
  orderId?: string | null;
  usedAt: Date;
}

export interface Promotion {
  id: string;
  restaurantId: string;
  name: string;
  description?: string | null;
  type: PromotionType;
  discountValue: DecimalString;
  conditions?: JsonValue | null;
  timeRestrictions?: JsonValue | null;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface PromotionMenuItem {
  id: string;
  promotionId: string;
  menuItemId: string;
}

/* TAX */

export interface TaxRate {
  id: string;
  restaurantId: string;
  name: string;
  ratePct: DecimalString;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface OrderTax {
  id: string;
  orderId: string;
  taxRateId: string;
  amount: DecimalString;
}

/* DELIVERY */

export interface DeliveryStaff {
  id: string;
  userId: string;
  vehicleType: DeliveryVehicle;
  licensePlate?: string | null;
  status: DeliveryStaffStatus;
  currentZone?: string | null;
  maxCapacity: number;
  rating?: DecimalString | null;
  totalDeliveries: number;
  totalDistanceKm: DecimalString;
  totalEarnings: DecimalString;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface Delivery {
  id: string;
  orderId: string;
  restaurantId: string;
  deliveryStaffId?: string | null;
  status: DeliveryStatus;
  assignedAt?: Date | null;
  pickedUpAt?: Date | null;
  deliveredAt?: Date | null;
  estimatedTimeMin?: number | null;
  actualTimeMin?: number | null;
  deliveryFee: DecimalString;
  distanceKm?: DecimalString | null;
  destinationLatitude?: DecimalString | null;
  destinationLongitude?: DecimalString | null;
  notes?: string | null;
  customerRating?: number | null;
  customerFeedback?: string | null;
  deliveryPhoto?: string | null;
  currentLatitude?: DecimalString | null;
  currentLongitude?: DecimalString | null;
  lastLocationAt?: Date | null;
  isTrackingActive: boolean;
  trackingCode?: string | null;
  routePolyline?: string | null;
  estimatedArrival?: Date | null;
  actualArrival?: Date | null;
  customerNotifiedAt?: Date | null;
  staffNotifiedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface DeliveryLocation {
  id: string;
  deliveryId: string;
  latitude: DecimalString;
  longitude: DecimalString;
  accuracyMeters?: DecimalString | null;
  headingDegrees?: DecimalString | null;
  speedMetersPerSecond?: DecimalString | null;
  capturedAt: Date;
}

export interface DeliveryZone {
  id: string;
  restaurantId: string;
  name: string;
  polygonGeo: JsonValue;
  deliveryFee: DecimalString;
  minOrderAmount?: DecimalString | null;
  maxDistanceKm?: DecimalString | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

/* INVENTORY / WAREHOUSE */

export interface Warehouse {
  id: string;
  restaurantId: string;
  name: string;
  address?: string | null;
  contactName?: string | null;
  contactPhone?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface InventoryItem {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
  category?: string | null;
  unit: InventoryUnit;
  supplierName?: string | null;
  unitCost?: DecimalString | null;
  sku?: string | null;
  barcode?: string | null;
  isActive?: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
}

export interface InventoryTransaction {
  id: string;
  restaurantId: string;
  inventoryItemId: string;
  type: InventoryTransactionType;
  quantity: DecimalString;
  totalCost?: DecimalString | null;
  unitCost?: DecimalString | null;
  invoiceNumber?: string | null;
  supplierName?: string | null;
  notes?: string | null;
  createdAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface InventoryBalance {
  id: string;
  restaurantId: string;
  warehouseId: string;
  inventoryItemId: string;
  balanceDate: Date;
  openingBalance: DecimalString;
  receivedQty: DecimalString;
  issuedQty: DecimalString;
  adjustedQty: DecimalString;
  closingBalance: DecimalString;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

/* SUPPLY CHAIN */

export interface Supplier {
  id: string;
  organizationId: string;
  name: string;
  contactPerson?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  taxCode?: string | null;
  paymentTerms?: string | null;
  rating?: DecimalString | null;
  status: SupplierStatus;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface SupplierItem {
  id: string;
  supplierId: string;
  inventoryItemId: string;
  supplierSku?: string | null;
  unitPrice: DecimalString;
  minOrderQty?: DecimalString | null;
  leadTimeDays?: number | null;
  isPreferred: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  restaurantId: string;
  orderNumber: string;
  status: PurchaseOrderStatus;
  orderDate: Date;
  expectedDate?: Date | null;
  receivedDate?: Date | null;
  totalAmount: DecimalString;
  notes?: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface PurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  inventoryItemId: string;
  quantity: DecimalString;
  unitPrice: DecimalString;
  totalPrice: DecimalString;
  receivedQty: DecimalString;
  notes?: string | null;
}

/* WAREHOUSE DOCUMENTS */

export interface WarehouseReceipt {
  id: string;
  restaurantId: string;
  warehouseId: string;
  receiptNumber: string;
  supplierId?: string | null;
  receiptDate: Date;
  status: WarehouseReceiptStatus;
  totalAmount: DecimalString;
  notes?: string | null;
  createdById: string;
  approvedById?: string | null;
  approvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface WarehouseReceiptItem {
  id: string;
  receiptId: string;
  inventoryItemId: string;
  quantity: DecimalString;
  unitPrice: DecimalString;
  totalPrice: DecimalString;
  expiryDate?: Date | null;
  batchNumber?: string | null;
  notes?: string | null;
}

export interface WarehouseIssue {
  id: string;
  restaurantId: string;
  warehouseId: string;
  issueNumber: string;
  issueDate: Date;
  status: WarehouseIssueStatus;
  purpose: WarehouseIssuePurpose;
  totalAmount: DecimalString;
  notes?: string | null;
  createdById: string;
  approvedById?: string | null;
  approvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface WarehouseIssueItem {
  id: string;
  issueId: string;
  inventoryItemId: string;
  quantity: DecimalString;
  unitPrice: DecimalString;
  totalPrice: DecimalString;
  batchNumber?: string | null;
  notes?: string | null;
}

/* WAREHOUSE TRANSFER */

export interface WarehouseTransfer {
  id: string;
  restaurantId: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  transferNumber: string;
  status: string;
  transferDate: Date;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface WarehouseTransferItem {
  id: string;
  transferId: string;
  inventoryItemId: string;
  quantity: DecimalString;
  notes?: string | null;
}

/* SCHEDULE / ATTENDANCE */

export interface StaffSchedule {
  id: string;
  staffId: string;
  restaurantId: string;
  shiftDate: Date;
  shiftType: StaffShiftType;
  startTime: Date;
  endTime: Date;
  status: StaffScheduleStatus;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface StaffAttendance {
  id: string;
  staffId: string;
  restaurantId: string;
  scheduleId?: string | null;
  workDate: Date;
  checkInTime?: Date | null;
  checkOutTime?: Date | null;
  breakMinutes?: number | null;
  overtimeHours?: DecimalString | null;
  totalHours?: DecimalString | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

/* REPORTING / ANALYTICS */

export interface RevenueReport {
  id: string;
  restaurantId: string;
  reportDate: Date;
  reportType: RevenueReportType;
  totalRevenue: DecimalString;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue?: DecimalString | null;
  dineInRevenue?: DecimalString | null;
  takeawayRevenue?: DecimalString | null;
  deliveryRevenue?: DecimalString | null;
  popularItems?: JsonValue | null;
  paymentBreakdown?: JsonValue | null;
  hourlyBreakdown?: JsonValue | null;
  createdAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface KpiMetric {
  id: string;
  restaurantId: string;
  metricName: string;
  metricValue: DecimalString;
  metricDate: Date;
  periodType: KpiPeriod;
  createdAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface AnalyticsEventLog {
  id: string;
  eventType: AnalyticsEvent;
  entityType: string;
  entityId: string;
  restaurantId?: string | null;
  userId?: string | null;
  metadata?: JsonValue | null;
  createdAt: Date;
}

/* NOTIFICATION / SYSTEM / AUDIT */

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  relatedId?: string | null;
  relatedType?: string | null;
  actionUrl?: string | null;
  metadata?: JsonValue | null;
  readAt?: Date | null;
  scheduledAt?: Date | null;
  expiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface SystemConfig {
  id: string;
  configKey: string;
  configValue: JsonValue;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface AuditLog {
  id: string;
  tableName: string;
  recordId: string;
  action: AuditAction;
  oldValues?: JsonValue | null;
  newValues?: JsonValue | null;
  userId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
}

/* USER STATS */

export interface UserStatistics {
  id: string;
  userId: string;
  totalReservations: number;
  successfulReservations: number;
  cancelledReservations: number;
  noShowReservations: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalSpent: DecimalString;
  loyaltyPoints: number;
  favoriteRestaurantId?: string | null;
  lastOrderDate?: Date | null;
  lastReservationDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/* STORAGE / ASSET / PUSH */

export interface Asset {
  id: string;
  bucket: StorageBucket;
  path: string;
  fileName: string;
  originalName: string;
  mimeType?: string | null;
  fileType?: FileType | null;
  sizeBytes?: number | null;
  width?: number | null;
  height?: number | null;
  duration?: number | null;
  isPublic: boolean;
  createdBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
  supabasePath?: string | null;
  supabaseFileId?: string | null;
  cdnUrl?: string | null;
  signedUrl?: string | null;
  expiresAt?: Date | null;
}

export interface DeviceToken {
  id: string;
  userId: string;
  token: string;
  platform: DevicePlatform;
  createdAt: Date;
  updatedAt: Date;
}

/* MARKETPLACE */

export interface RetailProduct {
  id: string;
  inventoryItemId?: string | null;
  restaurantId?: string | null;
  menuItemId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  imageUrls: string[];
  price: DecimalString;
  compareAtPrice?: DecimalString | null;
  costPrice?: DecimalString | null;
  isActive: boolean;
  stockQty?: DecimalString | null;
  category?: string | null;
  tags: string[];
  allergens: string[];
  dietaryInfo: string[];
  calories?: number | null;
  weight?: DecimalString | null;
  unit?: string | null;
  isFeatured: boolean;
  isBestSeller: boolean;
  rating?: DecimalString | null;
  reviewCount: number;
  soldCount: number;
  isDeliverable: boolean;
  deliveryTimeMin?: number | null;
  minOrderQty?: DecimalString | null;
  maxOrderQty?: DecimalString | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
}

export interface Cart {
  id: string;
  userId: string;
  restaurantId?: string | null;
  sessionId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
  deletedById?: string | null;
  deletedAt?: Date | null;
  subtotal: DecimalString;
  taxAmount: DecimalString;
  deliveryFee: DecimalString;
  totalAmount: DecimalString;
  itemCount: number;
  lastActivity: Date;
  expiresAt?: Date | null;
}

export interface CartItem {
  id: string;
  cartId: string;
  menuItemId?: string | null;
  retailProductId?: string | null;
  quantity: number;
  unitPrice: DecimalString;
  totalPrice: DecimalString;
  notes?: string | null;
  itemName?: string | null;
  itemImage?: string | null;
  specialInstructions?: string | null;
  isGift: boolean;
  giftMessage?: string | null;
}

export interface CartItemOption {
  id: string;
  cartItemId: string;
  optionId: string;
  priceDelta: DecimalString;
}
