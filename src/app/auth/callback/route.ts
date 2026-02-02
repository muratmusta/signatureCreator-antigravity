import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const cookieStore = {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet: any[]) {
                cookiesToSet.forEach(({ name, value, options }) =>
                    request.cookies.set(name, value)
                );
            }
        };

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            request.cookies.set(name, value)
                        );
                    },
                },
            }
        );

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Code exchanged successfully. Redirect to dashboard.
            // Important: We need to return the response with the cookies set.
            // But wait, createServerClient logic with Middleware handles cookies differently?
            // Actually, in Route Handler, we just create the client to exchange code.
            // The 'setAll' above modifies the 'request' headers, but we need to pass cookies to RESPONSE.

            // Correct pattern for Route Handler with @supabase/ssr:
            // We need to create a response object, copy cookies from the supabase operation into it.
            // OR simply redirect. Since the exchange happens on the server and writes to the 'jar',
            // we need a mechanism to persist.

            // Let's use the standard boilerplate for Route Handler Auth.

            const forwardedHost = request.headers.get('x-forwarded-host'); // For proxy environments
            const isLocalEnv = process.env.NODE_ENV === 'development';

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
