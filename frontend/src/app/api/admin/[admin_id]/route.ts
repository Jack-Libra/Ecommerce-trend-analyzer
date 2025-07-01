import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    admin_id: string;
  };
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest, context: Context) {
  const { admin_id } = context.params;
  const { data, error } = await supabase
    .from('admin')
    .select('*')
    .eq('id', admin_id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
