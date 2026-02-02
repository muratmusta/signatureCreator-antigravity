// Analytics utility for tracking user events
// This is a lightweight wrapper that can be extended with Google Analytics, Plausible, etc.

type EventName =
    | 'page_view'
    | 'template_selected'
    | 'signature_saved'
    | 'signature_downloaded'
    | 'signature_copied'
    | 'user_signup'
    | 'user_login';

interface EventProperties {
    [key: string]: string | number | boolean | undefined;
}

class Analytics {
    private enabled: boolean;

    constructor() {
        // Only enable in production
        this.enabled = process.env.NODE_ENV === 'production';
    }

    /**
     * Track a page view
     */
    pageView(url: string) {
        if (!this.enabled) return;

        // Example: Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
                page_path: url,
            });
        }

        // Example: Plausible
        if (typeof window !== 'undefined' && (window as any).plausible) {
            (window as any).plausible('pageview');
        }
    }

    /**
     * Track a custom event
     */
    track(eventName: EventName, properties?: EventProperties) {
        if (!this.enabled) {
            console.log('[Analytics]', eventName, properties);
            return;
        }

        // Example: Google Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', eventName, properties);
        }

        // Example: Plausible
        if (typeof window !== 'undefined' && (window as any).plausible) {
            (window as any).plausible(eventName, { props: properties });
        }
    }

    /**
     * Identify a user (for user-based analytics)
     */
    identify(userId: string, traits?: EventProperties) {
        if (!this.enabled) return;

        // Example: Custom implementation
        console.log('[Analytics] User identified:', userId, traits);
    }
}

export const analytics = new Analytics();
