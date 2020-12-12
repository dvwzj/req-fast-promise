"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ReqFastPromise = void 0;

var _querystring = _interopRequireDefault(require("querystring"));

var _url = _interopRequireDefault(require("url"));

var _reqFast = _interopRequireDefault(require("req-fast"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ReqFastPromise {
  constructor(options) {
    this.defaults = _lodash.default.defaults({
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
      removeAcceptEncoding: true
    }, options);
  }

  create(options) {
    return new ReqFastPromise(options);
  }

  extends(options) {
    var extendOptions = _lodash.default.merge({}, this.defaults, options);

    return this.create(extendOptions);
  }

  request(method, url) {
    var _arguments = arguments,
        _this = this;

    return _asyncToGenerator(function* () {
      var options = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : {};
      options = _lodash.default.merge({}, _this.defaults, options, {
        method,
        url
      });

      if (options.baseURL && !options.url.startsWith('http')) {
        options.url = "".concat(_lodash.default.trim(options.baseURL, '/')).concat((options.url.startsWith('/') ? '' : '/') + options.url);
      }

      if (options.params && _lodash.default.size(_lodash.default.keys(options.params))) {
        var uri = _url.default.parse(options.url);

        var params = _lodash.default.reduce((uri.query || '').split('&'), (params, query) => {
          var argv = query.split('=');
          params[argv[0]] = argv[1];
          return params;
        }, {});

        params = _lodash.default.merge(params, options.params);
        params = _lodash.default.reduce(_lodash.default.keys(params), (obj, key) => {
          if (key) {
            obj[key] = params[key];
          }

          return obj;
        }, {});
        options.url = "".concat(uri.protocol, "//").concat(uri.hostname).concat(uri.port ? ":".concat(uri.port) : '').concat(uri.pathname ? uri.pathname : '', "?").concat(_querystring.default.stringify(params));
      }

      var headers = _lodash.default.clone(options.headers);

      Object.defineProperty(options, 'headers', {
        get() {
          if (headers && options.removeAcceptEncoding) {
            delete headers['accept-encoding'];
          }

          return headers;
        },

        set($headers) {
          headers = $headers;

          if (headers && !headers.cookie) {
            delete headers.cookie;
          }
        }

      });
      return new Promise((resolve, reject) => {
        var request = (0, _reqFast.default)(options, (error, response) => {
          if (error) {
            error.request = request;

            if (response) {
              error.response = response;
            }

            reject(error);
          } else {
            response.request = request;

            try {
              response.data = JSON.parse(response.body);
            } catch (e) {
              response.data = response.body;
            }

            resolve(response);
          }
        });
        return request;
      });
    })();
  }

  get(url) {
    var _arguments2 = arguments,
        _this2 = this;

    return _asyncToGenerator(function* () {
      var options = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {};
      return _this2.request('GET', url, options);
    })();
  }

  post(url, data) {
    var _arguments3 = arguments,
        _this3 = this;

    return _asyncToGenerator(function* () {
      var options = _arguments3.length > 2 && _arguments3[2] !== undefined ? _arguments3[2] : {};
      options['data'] = data;
      return _this3.request('POST', url, options);
    })();
  }

  put(url, data) {
    var _arguments4 = arguments,
        _this4 = this;

    return _asyncToGenerator(function* () {
      var options = _arguments4.length > 2 && _arguments4[2] !== undefined ? _arguments4[2] : {};
      options['data'] = data;
      return _this4.request('PUT', url, options);
    })();
  }

  patch(url, data) {
    var _arguments5 = arguments,
        _this5 = this;

    return _asyncToGenerator(function* () {
      var options = _arguments5.length > 2 && _arguments5[2] !== undefined ? _arguments5[2] : {};
      options['data'] = data;
      return _this5.request('PATCH', url, options);
    })();
  }

  delete(url) {
    var _arguments6 = arguments,
        _this6 = this;

    return _asyncToGenerator(function* () {
      var options = _arguments6.length > 1 && _arguments6[1] !== undefined ? _arguments6[1] : {};
      return _this6.request('DELETE', url, options);
    })();
  }

  trace(url) {
    var _arguments7 = arguments,
        _this7 = this;

    return _asyncToGenerator(function* () {
      var options = _arguments7.length > 1 && _arguments7[1] !== undefined ? _arguments7[1] : {};
      return _this7.request('TRACE', url, options);
    })();
  }

  connect(url) {
    var _arguments8 = arguments,
        _this8 = this;

    return _asyncToGenerator(function* () {
      var options = _arguments8.length > 1 && _arguments8[1] !== undefined ? _arguments8[1] : {};
      return _this8.request('CONNECT', url, options);
    })();
  }

  options(url) {
    var _arguments9 = arguments,
        _this9 = this;

    return _asyncToGenerator(function* () {
      var options = _arguments9.length > 1 && _arguments9[1] !== undefined ? _arguments9[1] : {};
      return _this9.request('OPTIONS', url, options);
    })();
  }

}

exports.ReqFastPromise = ReqFastPromise;

var _default = new ReqFastPromise();

exports.default = _default;