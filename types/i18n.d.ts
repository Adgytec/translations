// AUTO-GENERATED FILE — DO NOT EDIT

export interface I18nResources {
    "auth-card": {
        heading: string;
        description: string;
        actionButton: {
            enabled: string;
            pending: string;
            completed: string;
        };
        confirmActionButton: {
            enabled: string;
            pending: string;
            completed: string;
        };
        resendCodeButton: {
            enabled: string;
            pending: string;
            error: string;
        };
        resendCooldown: {
            remaining: string;
            remaining_plural: string;
        };
        invalidConfirmAuthActionCode: string;
    };
    "common/errors/base": {
        "invalid-api-key": string;
        "user-not-found": string;
        "jwt-not-acceptable": string;
        "invalid-signed-url": string;
        "hash-mismatch": string;
        "invalid-auth-header-value": string;
        "unsupported-auth-scheme": string;
        "bad-org-status": string;
        "user-not-exists-in-organization-management": string;
        "user-not-exists-in-organization": string;
        "user-disabled": string;
        "token-not-found": string;
        "invalid-id": string;
        "route-not-found": string;
        "method-not-allowed": string;
        "network-error": string;
        "zod-error": string;
        "self-permission-mismatch": string;
        "invalid-actor": string;
        "permission-explicitly-denied": string;
        "missing-permission": string;
        "invalid-multipart-upload-part-number": string;
        "object-not-found": string;
        "media-too-large": string;
        "media-items-limit-exceeded": string;
        "upload-already-completed": string;
        "unsupported-object-uploaded": string;
        "complete-multipart-upload-called-too-soon": string;
        "singlepart-upload-failed": string;
        "multipart-part-upload-failed": string;
        "missing-etag-value": string;
        "invalid-cursor-value": string;
        "invalid-request-body": string;
        "unknown-field-in-request-body": string;
        "empty-request-body": string;
        "request-body-too-large": string;
        "malformed-response-body": string;
        "malformed-json-from-server": string;
        "invalid-response-shape": string;
        "unknown-server-error": string;
        "internal-server-error": string;
        "unexpected-error": string;
        "auth-error": string;
        "authorization-error": string;
        "media-upload-error": string;
    };
    "common/errors/forms": {
        missing: string;
        "overflow-number": string;
        "underflow-number": string;
        "overflow-date": string;
        "underflow-date": string;
        length: string;
        invalid: string;
        unknown: string;
        "invalid-value": string;
        "invalid-enum-value": string;
        "require-https": string;
        "missing-host": string;
        "contains-path": string;
        "contains-query": string;
        "contains-fragment": string;
        "absolute-url": string;
        "nil-id": string;
        "invalid-email": string;
        "missing-mx-records": string;
        "not-digit": string;
        "not-base64-url-encoded": string;
        "invalid-url": string;
        "null-value": string;
    };
    "do-auth": {
        heading: string;
    };
    labels: {
        email: string;
        code: string;
    };
    settings: {
        popover: string;
        theme: {
            heading: string;
            description: string;
            selection: {
                system: string;
                light: string;
                dark: string;
            };
        };
        shape: {
            heading: string;
            description: string;
            selection: {
                sharp: string;
                round: string;
            };
        };
        language: {
            heading: string;
            description: string;
            selection: {
                english: string;
                french: string;
            };
        };
    };
    utils: {
        unexpectedError: string;
        back: string;
    };
}
