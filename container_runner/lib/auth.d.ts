declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    advanced: {
        database: {
            joins: true;
        };
    };
    trustedOrigins: string[];
    socialProviders: {
        github: {
            clientId: string;
            clientSecret: string;
        };
    };
}>;
export default auth;
//# sourceMappingURL=auth.d.ts.map