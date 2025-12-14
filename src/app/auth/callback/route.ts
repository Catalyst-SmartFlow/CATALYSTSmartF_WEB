import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // "next" is a query param we can pass to redirect user to a specific page after login
    // default is /dashboard
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = createClient();
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.user) {
            // SECURITY CHECK: Strict Registration Flow
            // If the user came from the "Register" page, we want to ensure they aren't logging into an existing account.
            // Although standard OAuth usually allows this, the requirement is to show an error "Account already exists".

            // Note: We need to use `cookies()` from next/headers.
            const flowMode = cookies().get("auth_flow_mode")?.value;

            if (flowMode === 'register') {
                const createdAt = new Date(data.user.created_at).getTime();
                const now = Date.now();
                const isNewUser = (now - createdAt) < 60000; // Created within last 60 seconds

                if (!isNewUser) {
                    console.warn("Security: Existing user tried to use Register flow. Blocking.");
                    await supabase.auth.signOut();
                    return NextResponse.redirect(`${origin}/auth/register?error=account_already_exists`);
                }
            }

            // Cleanup cookie (optional, but good hygiene)
            const response = NextResponse.redirect(`${origin}${next}`);
            response.cookies.delete("auth_flow_mode");
            return response;
        } else {
            console.error("Auth Code Exchange Error:", error);
        }
    }

    // Return the user to login with an error query param
    return NextResponse.redirect(`${origin}/auth/login?error=oauth_failed`);
}
