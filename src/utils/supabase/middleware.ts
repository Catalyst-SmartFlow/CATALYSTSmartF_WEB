import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        }
    );

    // Safe getUser call that handles invalid refresh tokens
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    // Handle Invalid Refresh Token / Session issues
    if (error) {
        const errorMsg = error.message || "";
        // If the error is regarding the refresh token (or any auth error really), we should just treat it as "logged out"
        // and let the flow continue (which will redirect to login if needed below).
        // we definitely want to suppress the server noise and just clear cookies.

        if (errorMsg.includes("Refresh Token Not Found") || errorMsg.includes("Invalid Refresh Token")) {
            // Use supabase signOut to clear cookies properly using the configured adapter users
            await supabase.auth.signOut();
        }
    }

    // ROUTE PROTECTION LOGIC
    // 1. If user is NOT logged in and tries to access dashboard or blocked routes -> Redirect to login
    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    // 2. If user IS logged in:
    if (user) {
        // Redirect from Auth pages (Login/Register) to Dashboard
        if (request.nextUrl.pathname.startsWith("/auth/login") || request.nextUrl.pathname.startsWith("/auth/register")) {
            const url = request.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }

        // Redirect from Root (/) to Dashboard (Optional: User preference)
        // For SaaS apps, often you want landing page accessible even if logged in.
        // If we want to force dashboard for logged in users on root:
        /* 
        if (request.nextUrl.pathname === "/") {
             const url = request.nextUrl.clone();
             url.pathname = "/dashboard";
             return NextResponse.redirect(url);
        }
        */
    }

    // 3. Security Headers (CSP, X-Frame-Options)
    // We modify the response we are about to return
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    return response;
}
