import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invitation_id, guest_name, guest_phone, guest_count, attendance_status, message } = body;

    if (!invitation_id || !guest_name) {
      return NextResponse.json(
        { error: 'البيانات ناقصة' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        invitation_id,
        guest_name,
        guest_phone: guest_phone || null,
        guest_count: guest_count || 1,
        attendance_status: attendance_status || 'attending',
        message: message || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // سجّل event في analytics
    try {
      await supabase.from('analytics').insert({
        invitation_id,
        event_type: 'rsvp',
      });
    } catch {}

    return NextResponse.json({ success: true, rsvp: data });
  } catch (err) {
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    );
  }
}