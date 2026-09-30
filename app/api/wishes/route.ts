import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get('invitation_id');

  if (!invitationId) {
    return NextResponse.json({ error: 'invitation_id مطلوب' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .eq('invitation_id', invitationId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ wishes: data });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invitation_id, guest_name, message } = body;

    if (!invitation_id || !guest_name || !message) {
      return NextResponse.json(
        { error: 'البيانات ناقصة' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'الرسالة طويلة جداً (الحد الأقصى 500 حرف)' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('wishes')
      .insert({
        invitation_id,
        guest_name,
        message,
        is_approved: true, // ✅ تلقائي — نعتمد كل التهاني
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // سجّل event
    try {
      await supabase.from('analytics').insert({
        invitation_id,
        event_type: 'wish',
      });
    } catch {}

    return NextResponse.json({ success: true, wish: data });
  } catch (err) {
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    );
  }
}