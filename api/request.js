const useWrapperFetch = (url, opt) => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig()

    function onRequest({request, options}) {
        if (process.client) {
            const token = localStorage.getItem('Token')
            if (token) {
                options.headers = options.headers || {}
                options.headers.authorization = `Bearer ${token}`
            }
        }
    }

    function onResponse({request, response, options}) {
        const status = response.status
        if (status === 401) {
            toast.add({
                title: '未认证',
                description: undefined
            })
        } else if (status === 403) {
            toast.add({
                title: '非法访问',
                description: undefined
            })
        } else if (status === 500) {
            const {code, message, detail} = response._data
            if (code === 1400) {
                toast.add({
                    title: '非法参数',
                    description: message
                })
            } else if (code === 1500) {
                toast.add({
                    title: message,
                    description: undefined
                })
            } else {
                toast.add({
                    description: message
                })
            }
        }
        response._data = response._data.data
    }

    function onRequestError({request, options, error}) {
        toast.add({
            title: '服务器连接失败',
            description: error.cause
        })
    }

    return useFetch(runtimeConfig.public.baseURL + url, {
        ...opt,
        credentials: "include",
        deep: false,
        onRequest,
        onResponse,
        onRequestError
    })
}

export default class Http {

    static Client = class {
        static get(url, query) {
            return useWrapperFetch(url, {
                method: 'GET',
                query,
                server: false
            })
        }

        static post(url, query, body) {
            return useWrapperFetch(url, {
                method: 'POST',
                query,
                body,
                server: false
            })
        }

        static put(url, query, body) {
            return useWrapperFetch(url, {
                method: 'PUT',
                query,
                body,
                server: false
            })
        }

        static patch(url, query, body) {
            return useWrapperFetch(url, {
                method: 'PATCH',
                query,
                body,
                server: false
            })
        }

        static delete(url, query, body) {
            return useWrapperFetch(url, {
                method: 'DELETE',
                query,
                body,
                server: false
            })
        }
    }

    static Server = class {
        static get(url, query) {
            return useWrapperFetch(url, {
                method: 'GET',
                query,
            })
        }

        static post(url, query, body) {
            return useWrapperFetch(url, {
                method: 'POST',
                query,
                body
            })
        }

        static put(url, query, body) {
            return useWrapperFetch(url, {
                method: 'PUT',
                query,
                body
            })
        }

        static patch(url, query, body) {
            return useWrapperFetch(url, {
                method: 'PATCH',
                query,
                body
            })
        }

        static delete(url, query, body) {
            return useWrapperFetch(url, {
                method: 'DELETE',
                query,
                body
            })
        }
    }

}