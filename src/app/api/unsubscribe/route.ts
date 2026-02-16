import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Lazy-init to avoid build-time errors when env vars aren't available
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Missing unsubscribe token" },
        { status: 400 }
      );
    }

    // Validate UUID format to prevent injection
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(token)) {
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("waitlist_signups")
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq("unsubscribe_token", token)
      .is("unsubscribed_at", null)
      .select("email")
      .single();

    if (error || !data) {
      // Token not found or already unsubscribed — still return success
      // (don't reveal whether token exists for privacy)
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
