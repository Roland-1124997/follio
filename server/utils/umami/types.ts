export type AnalyticsQuery = {
    startAt: Number;
    endAt: Number;
    unit: "minute" | "hour" | "day" | "month" | "year";
    timezone: string;
    type?: "path" | "entry" | "exit" | "title" | "query" | "referrer" | "channel" | "domain" | "country" | "region" | "city" | "browser" | "os" | "device" | "language" | "screen" | "event" | "hostname" | "tag";
    limit?: Number;
    filters?: {
        path?: string;
        referrer?: string;
        title?: string;
        query?: string;
        browser?: string;
        os?: string;
        device?: string;
        country?: string;
        region?: string;
        city?: string;
        hostname?: string;
        tag?: string;
        segment?: string;
        cohort?: string;
    };
};


