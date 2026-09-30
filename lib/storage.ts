import { createClient } from './supabase-browser';

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadInvitationPhoto(
  userId: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  if (file.size > MAX_PHOTO_SIZE) {
    return { url: null, error: 'حجم الصورة كبير جداً (الحد الأقصى 5MB)' };
  }

  if (!file.type.startsWith('image/')) {
    return { url: null, error: 'الملف ليس صورة صالحة' };
  }

  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('invitation-photos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('invitation-photos')
    .getPublicUrl(fileName);

  return { url: publicUrl, error: null };
}

export async function uploadInvitationAudio(
  userId: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  if (file.size > MAX_AUDIO_SIZE) {
    return { url: null, error: 'حجم الملف الصوتي كبير جداً (الحد الأقصى 10MB)' };
  }

  if (!file.type.startsWith('audio/')) {
    return { url: null, error: 'الملف ليس ملف صوتي صالح' };
  }

  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('invitation-audio')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('invitation-audio')
    .getPublicUrl(fileName);

  return { url: publicUrl, error: null };
}

export async function deleteInvitationFile(
  bucket: 'invitation-photos' | 'invitation-audio',
  url: string
): Promise<boolean> {
  try {
    const supabase = createClient();
    // استخرج المسار من الرابط
    const path = url.split(`/storage/v1/object/public/${bucket}/`)[1];
    if (!path) return false;

    const { error } = await supabase.storage.from(bucket).remove([path]);
    return !error;
  } catch {
    return false;
  }
}