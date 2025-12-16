
import type { FetchUrl, SendOptions, MethodOptions, ErrorResponse } from "#shared/types";

const catcher = async <T>(promise: Promise<T>) => {

    try {
        const data = await promise;
        return { data, error: null };
    }

    catch (error: any) {
        return { data: null, error: error.data.error as ErrorResponse };
    }
}

export const useApiHandler = <G>(url: FetchUrl) => {

    const Send = <T = G>(options?: SendOptions) => {
        const extendedUrl = options?.extends ? `${url}${options.extends}` : url;
        return catcher<T>($fetch(extendedUrl, {
            ...options
        })
    )}

    const Get = <T = G>(options?: MethodOptions) => Send<T>({ 
        ...options, method: 'GET'
    })
    
    const Post = <T = G>(options?: MethodOptions) => Send<T>({ 
        ...options, method: 'POST'
    })

    const Delete = <T = G>(options?: MethodOptions) => Send<T>({ 
        ...options, method: 'DELETE'
    })

    const Patch = <T = G>(options?: MethodOptions) => Send<T>({ 
        ...options, method: 'PATCH'
    })

    return {
        Send, Get, Post, Delete, Patch
    }
}