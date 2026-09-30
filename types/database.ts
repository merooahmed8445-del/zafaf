export type Plan = 'free' | 'basic' | 'premium' | 'business';
export type InvitationStatus = 'draft' | 'published' | 'expired' | 'disabled';
export type AttendanceStatus = 'attending' | 'apologize';
export type AssetType = 'photo' | 'audio' | 'video';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type AnalyticsEventType = 'view' | 'envelope_open' | 'rsvp' | 'wish' | 'share';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  plan: Plan;
  invitations_limit: number;
  invitations_used: number;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Invitation {
  id: string;
  user_id: string;
  slug: string;
  status: InvitationStatus;
  
  groom_name: string;
  bride_name: string;
  seal_letters: string;
  groom_father: string | null;
  bride_father: string | null;
  
  wedding_date: string;
  start_time: string;
  reception_time: string;
  ceremony_time: string;
  timezone: string;
  
  venue_name: string | null;
  venue_address: string | null;
  maps_url: string | null;
  whatsapp_number: string | null;
  
  photo_url: string | null;
  audio_url: string | null;
  audio_volume: number;
  
  expires_at: string | null;
  view_count: number;
  
  created_at: string;
  updated_at: string;
}

export interface InvitationAsset {
  id: string;
  invitation_id: string;
  asset_type: AssetType;
  file_name: string;
  file_url: string;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
}

export interface RSVP {
  id: string;
  invitation_id: string;
  guest_name: string;
  guest_phone: string | null;
  guest_count: number;
  attendance_status: AttendanceStatus;
  message: string | null;
  ip_address: string | null;
  created_at: string;
}

export interface Wish {
  id: string;
  invitation_id: string;
  guest_name: string;
  message: string;
  is_approved: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  invitation_id: string | null;
  amount: number;
  currency: string;
  plan: Plan;
  status: PaymentStatus;
  payment_method: string | null;
  transaction_id: string | null;
  created_at: string;
}

export interface InvitationFormData {
  // Step 1: Couple Info
  groom_name: string;
  bride_name: string;
  seal_letters: string;
  groom_father: string;
  bride_father: string;

  // Step 2: Date & Venue
  wedding_date: string;
  start_time: string;
  reception_time: string;
  ceremony_time: string;
  timezone: string;
  venue_name: string;
  venue_address: string;
  maps_url: string;
  whatsapp_number: string;

  // Step 3: Media
  photo_url: string;
  audio_url: string;
  audio_volume: number;

  // Meta
  slug: string;
  status: InvitationStatus;
}

export const defaultInvitationData: InvitationFormData = {
  groom_name: '',
  bride_name: '',
  seal_letters: 'M & Y',
  groom_father: '',
  bride_father: '',
  wedding_date: '',
  start_time: '18:00',
  reception_time: '19:30',
  ceremony_time: '20:00',
  timezone: 'Africa/Cairo',
  venue_name: '',
  venue_address: '',
  maps_url: '',
  whatsapp_number: '',
  photo_url: '',
  audio_url: '',
  audio_volume: 0.8,
  slug: '',
  status: 'draft',
};