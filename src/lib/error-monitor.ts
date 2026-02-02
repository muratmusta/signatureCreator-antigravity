// Error monitoring utility
// This can be extended with Sentry, LogRocket, etc.

interface ErrorContext {
    [key: string]: any;
}

class ErrorMonitor {
    private enabled: boolean;

    constructor() {
        this.enabled = process.env.NODE_ENV === 'production';
    }

    /**
     * Capture an exception
     */
    captureException(error: Error, context?: ErrorContext) {
        if (!this.enabled) {
            console.error('[Error Monitor]', error, context);
            return;
        }

        // Example: Sentry
        if (typeof window !== 'undefined' && (window as any).Sentry) {
            (window as any).Sentry.captureException(error, {
                extra: context,
            });
        }
    }

    /**
     * Capture a message (non-error)
     */
    captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext) {
        if (!this.enabled) {
            console.log(`[Error Monitor - ${level}]`, message, context);
            return;
        }

        // Example: Sentry
        if (typeof window !== 'undefined' && (window as any).Sentry) {
            (window as any).Sentry.captureMessage(message, {
                level,
                extra: context,
            });
        }
    }

    /**
     * Set user context for error tracking
     */
    setUser(userId: string, email?: string) {
        if (!this.enabled) return;

        // Example: Sentry
        if (typeof window !== 'undefined' && (window as any).Sentry) {
            (window as any).Sentry.setUser({
                id: userId,
                email,
            });
        }
    }

    /**
     * Clear user context
     */
    clearUser() {
        if (!this.enabled) return;

        // Example: Sentry
        if (typeof window !== 'undefined' && (window as any).Sentry) {
            (window as any).Sentry.setUser(null);
        }
    }
}

export const errorMonitor = new ErrorMonitor();
