// AUTO-GENERATED FILE — DO NOT EDIT

export interface I18nResources {
    "auth-card": {
        heading: string;
        description: string;
        actionButton: { enabled: string; pending: string; completed: string };
        confirmActionButton: {
            enabled: string;
            pending: string;
            completed: string;
        };
        resendCodeButton: { enabled: string; pending: string; error: string };
        resendCooldown: { remaining: string; remaining_plural: string };
        invalidConfirmAuthActionCode: string;
    };
    labels: { email: string; code: string };
    settings: {
        popover: string;
        theme: {
            heading: string;
            description: string;
            selection: { system: string; light: string; dark: string };
        };
        shape: {
            heading: string;
            description: string;
            selection: { sharp: string; round: string };
        };
        language: {
            heading: string;
            description: string;
            selection: { english: string; french: string };
        };
    };
    utils: { unexpectedError: string; back: string };
}
