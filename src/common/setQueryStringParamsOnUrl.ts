export function setQueryStringParamsOnUrl<T extends Record<string, string | number | undefined | null>>(url: URL, obj: T): URL {
    Object.entries(obj).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
    });

    return url;
}
