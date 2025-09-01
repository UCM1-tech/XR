import { NextResponse } from 'next/server';
import { isSupportedLocale, type Locale } from '@/i18n/config';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const desired = body?.locale as string | undefined;
  if (!isSupportedLocale(desired)) {
    return NextResponse.json({ ok: false, error: 'Unsupported locale' }, { status: 400 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set('locale', desired as Locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return response;
}


