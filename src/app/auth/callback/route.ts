import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // "next" is a query param we can pass to redirect user to a specific page after login
    // default is /dashboard
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        } else {
            console.error("Auth Code Exchange Error:", error);
        }
    }

    // Return the user to login with an error query param
    return NextResponse.redirect(`${origin}/auth/login?error=oauth_failed`);
}
