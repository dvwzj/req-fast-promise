import querystring from 'querystring'
import URL from 'url'
import req from 'req-fast'
import _ from 'lodash'

export class ReqFastPromise {
    constructor(options) {
        this.defaults = _.defaults({
            baseURL: undefined,
            timeout: undefined,
            dataType: undefined,
            agent: undefined,
            charset: undefined,
            disableRedirect: undefined,
            maxRedirects: undefined,
            disableGzip: undefined,
            trackCookie: undefined,
            cookies: undefined,
            headers: undefined,
            proxy: undefined,
        }, options)
    }
    create(options) {
        return new ReqFastPromise(options)
    }
    extends(options) {
        const extendOptions = _.merge({}, this.defaults, options)
        return this.create(extendOptions)
    }
    async request(method, url, options = {}) {
        options = _.merge(
            {},
            this.defaults,
            options,
            {
                method,
                url
            }
        )
        if (options.baseURL && !options.url.startsWith('http')) {
            options.url = `${_.trim(options.baseURL, '/')}${(options.url.startsWith('/') ? '' : '/') + options.url}`
        }
        if (options.params && _.size(_.keys(options.params))) {
            const uri = URL.parse(options.url)
            let params = _.reduce((uri.query || '').split('&'), (params, query) => {
                const argv = query.split('=')
                params[argv[0]] = argv[1]
                return params
            }, {})
            params = _.merge(params, options.params)
            params = _.reduce(_.keys(params), (obj, key) => {
                if (key) {
                    obj[key] = params[key]
                }
                return obj
            }, {})
            options.url = `${uri.protocol}//${uri.hostname}${uri.port ? `:${uri.port}`: ''}${uri.pathname ? uri.pathname : ''}?${querystring.stringify(params)}`
        }
        const headers = _.clone(options.headers)
        Object.defineProperty(options, 'headers', {
            get() {
                return headers
            },
            set($headers) {
                _.merge(headers, $headers)
                if (!headers.cookie) {
                    delete headers.cookie
                }
            }
        })
        return new Promise((resolve, reject) => {
            const request = req(
                options,
                (error, response) => {
                    if (error) {
                        error.request = request
                        if (response) {
                            error.response = response
                        }
                        reject(error)
                    } else {
                        response.request = request
                        try {
                            response.data = JSON.parse(response.body)
                        } catch (e) {
                            response.data = response.body
                        }
                        resolve(response)
                    }
                }
            )
            return request
        })
    }
    async get(url, options = {}) {
        return this.request('GET', url, options)
    }
    async post(url, data, options = {}) {
        options['data'] = data
        return this.request('POST', url, options)
    }
    async put(url, data, options = {}) {
        options['data'] = data
        return this.request('PUT', url, options)
    }
    async patch(url, data, options = {}) {
        options['data'] = data
        return this.request('PATCH', url, options)
    }
    async delete(url, options = {}) {
        return this.request('DELETE', url, options)
    }
    async trace(url, options = {}) {
        return this.request('TRACE', url, options)
    }
    async connect(url, options = {}) {
        return this.request('CONNECT', url, options)
    }
    async options(url, options = {}) {
        return this.request('OPTIONS', url, options)
    }
}

export default new ReqFastPromise()