"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ReqFastPromise = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _querystring = _interopRequireDefault(require("querystring"));

var _url = _interopRequireDefault(require("url"));

var _reqFast = _interopRequireDefault(require("req-fast"));

var _lodash = _interopRequireDefault(require("lodash"));

var ReqFastPromise = /*#__PURE__*/function () {
  function ReqFastPromise(options) {
    (0, _classCallCheck2["default"])(this, ReqFastPromise);
    this.defaults = _lodash["default"].defaults({
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
      proxy: undefined
    }, options);
  }

  (0, _createClass2["default"])(ReqFastPromise, [{
    key: "create",
    value: function create(options) {
      return new this(options);
    }
  }, {
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(method, url) {
        var _this = this;

        var options,
            uri,
            params,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};

                if (options.params && _lodash["default"].size(_lodash["default"].keys(options.params))) {
                  uri = _url["default"].parse(url);
                  params = _lodash["default"].reduce(uri.query.split('&'), function (params, query) {
                    var argv = query.split('=');
                    params[argv[0]] = argv[1];
                    return params;
                  }, {});
                  params = _lodash["default"].merge(params, options.params);
                  url = "".concat(uri.protocol, "//").concat(uri.hostname).concat(uri.port ? ":".concat(uri.port) : '').concat(uri.pathname ? uri.pathname : '', "?").concat(_querystring["default"].stringify(params));
                }

                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var request = (0, _reqFast["default"])(_lodash["default"].merge({}, _this.defaults, options, {
                    method: method,
                    url: url
                  }), function (error, response) {
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
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function request(_x, _x2) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(url) {
        var options,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                return _context2.abrupt("return", this.request('GET', url, options));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(url, data) {
        var options,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                options['data'] = data;
                return _context3.abrupt("return", this.request('POST', url, options));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function post(_x4, _x5) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(url, data) {
        var options,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                options['data'] = data;
                return _context4.abrupt("return", this.request('PUT', url, options));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function put(_x6, _x7) {
        return _put.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: "patch",
    value: function () {
      var _patch = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(url, data) {
        var options,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                options['data'] = data;
                return _context5.abrupt("return", this.request('PATCH', url, options));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function patch(_x8, _x9) {
        return _patch.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(url) {
        var options,
            _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                return _context6.abrupt("return", this.request('DELETE', url, options));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _delete(_x10) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "trace",
    value: function () {
      var _trace = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(url) {
        var options,
            _args7 = arguments;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                return _context7.abrupt("return", this.request('TRACE', url, options));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function trace(_x11) {
        return _trace.apply(this, arguments);
      }

      return trace;
    }()
  }, {
    key: "connect",
    value: function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(url) {
        var options,
            _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
                return _context8.abrupt("return", this.request('CONNECT', url, options));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function connect(_x12) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "options",
    value: function () {
      var _options2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(url) {
        var _options,
            _args9 = arguments;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
                return _context9.abrupt("return", this.request('OPTIONS', url, _options));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function options(_x13) {
        return _options2.apply(this, arguments);
      }

      return options;
    }()
  }]);
  return ReqFastPromise;
}();

exports.ReqFastPromise = ReqFastPromise;

var _default = new ReqFastPromise();

exports["default"] = _default;