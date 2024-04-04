/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-func-assign */
var React = require("react");

function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);

function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };
  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (
    Array.isArray(o) ||
    (it = _unsupportedIterableToArray(o)) ||
    (allowArrayLike && o && typeof o.length === "number")
  ) {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length)
        return {
          done: true,
        };
      return {
        done: false,
        value: o[i++],
      };
    };
  }

  throw new TypeError(
    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
  );
}

var AuthContext = React__default["default"].createContext(undefined);
var useAuth = function useAuth() {
  var context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
function withAuth(ComponentToWrap) {
  var WrappedComponent = function WrappedComponent(props) {
    var authProps = useAuth();
    return React__default["default"].createElement(ComponentToWrap, _extends({}, authProps, props));
  };

  WrappedComponent.displayName =
    "withAuth_" + (ComponentToWrap.displayName || ComponentToWrap.name);
  return WrappedComponent;
}

var AuthProvider = function AuthProvider(props) {
  var authService = props.authService,
    children = props.children;
  return React__default["default"].createElement(
    AuthContext.Provider,
    {
      value: {
        authService: authService,
      },
    },
    children,
  );
};

var generateCodeChallenge = function generateCodeChallenge(codeVerifier) {
  try {
    var encoder = new TextEncoder();
    var data = encoder.encode(codeVerifier);
    return Promise.resolve(window.crypto.subtle.digest("SHA-256", data)).then(function (digest) {
      var base64Digest = encode(digest); // you can extract this replacing code to a function

      return base64Digest.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
/** Source
 * - base64-arraybuffer library
 * - @see: https://github.com/niklasvh/base64-arraybuffer/blob/master/src/index.ts
 *   License: MIT (@see https://github.com/niklasvh/base64-arraybuffer/blob/master/LICENSE)
 *
 * @param arraybuffer buffer
 * @returns encoded string
 */

var encode = function encode(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer),
    len = bytes.length;
  var base64 = "";

  for (var i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }

  return base64;
};

var getRandomInt = function getRandomInt(min, max) {
  // Create byte array and fill with 1 random number
  var byteArray = new Uint8Array(1);
  window.crypto.getRandomValues(byteArray);
  var range = max - min + 1;
  var max_range = 256;
  if (byteArray[0] >= Math.floor(max_range / range) * range) return getRandomInt(min, max);
  return min + (byteArray[0] % range);
};
var createPKCECodes = function createPKCECodes() {
  var codeVerifier = "" + getRandomInt(64, 256);
  var codeChallenge = generateCodeChallenge(codeVerifier);
  var createdAt = new Date();
  var codePair = {
    codeVerifier: codeVerifier,
    codeChallenge: codeChallenge,
    createdAt: createdAt,
  };
  return codePair;
};

var toSnakeCase = function toSnakeCase(str) {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};
var toUrlEncoded = function toUrlEncoded(obj) {
  return Object.keys(obj)
    .map(function (k) {
      return encodeURIComponent(toSnakeCase(k)) + "=" + encodeURIComponent(obj[k]);
    })
    .join("&");
};

function e(e) {
  this.message = e;
}
e.prototype = new Error();
e.prototype.name = "InvalidCharacterError";
var r =
  ("undefined" != typeof window && window.atob && window.atob.bind(window)) ||
  function (r) {
    var t = String(r).replace(/=+$/, "");
    if (t.length % 4 == 1)
      throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
    for (
      var n, o, a = 0, i = 0, c = "";
      (o = t.charAt(i++));
      ~o && ((n = a % 4 ? 64 * n + o : o), a++ % 4)
        ? (c += String.fromCharCode(255 & (n >> ((-2 * a) & 6))))
        : 0
    )
      o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);
    return c;
  };
function t(e) {
  var t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return (function (e) {
      return decodeURIComponent(
        r(e).replace(/(.)/g, function (e, r) {
          var t = r.charCodeAt(0).toString(16).toUpperCase();
          return t.length < 2 && (t = "0" + t), "%" + t;
        }),
      );
    })(t);
  } catch (e) {
    return r(t);
  }
}
function n(e) {
  this.message = e;
}
function o(e, r) {
  if ("string" != typeof e) throw new n("Invalid token specified");
  var o = !0 === (r = r || {}).header ? 0 : 1;
  try {
    return JSON.parse(t(e.split(".")[o]));
  } catch (e) {
    throw new n("Invalid token specified: " + e.message);
  }
}
n.prototype = new Error();
n.prototype.name = "InvalidTokenError";

var AuthService = /*#__PURE__*/ (function () {
  function AuthService(props) {
    var _this = this;

    this.props = void 0;
    this.timeout = void 0;
    this.props = props;
    var code = this.getCodeFromLocation(window.location);

    if (code !== null) {
      this.fetchToken(code)
        .then(function () {
          _this.restoreUri();
        })
        ["catch"](function (e) {
          _this.removeItem("pkce");

          _this.removeItem("auth");

          _this.removeCodeFromLocation();

          console.warn({
            e: e,
          });
        });
    } else if (this.props.autoRefresh) {
      this.startTimer();
    }
  }

  var _proto = AuthService.prototype;

  _proto.getUser = function getUser() {
    var result = null;
    var t = this.getAuthTokens();
    if (t) {
      result = o(t.id_token);
    }

    return result;
  };

  _proto.getCodeFromLocation = function getCodeFromLocation(location) {
    var split = location.toString().split("?");

    if (split.length < 2) {
      return null;
    }

    var pairs = split[1].split("&");

    for (
      var _iterator = _createForOfIteratorHelperLoose(pairs), _step;
      !(_step = _iterator()).done;

    ) {
      var pair = _step.value;

      var _pair$split = pair.split("="),
        key = _pair$split[0],
        value = _pair$split[1];

      if (key === "code") {
        return decodeURIComponent(value || "");
      }
    }

    return null;
  };

  _proto.removeCodeFromLocation = function removeCodeFromLocation() {
    var _window$location$href = window.location.href.split("?"),
      base = _window$location$href[0],
      search = _window$location$href[1];

    if (!search) {
      return;
    }

    var newSearch = search
      .split("&")
      .map(function (param) {
        return param.split("=");
      })
      .filter(function (_ref) {
        var key = _ref[0];
        return key !== "code";
      })
      .map(function (keyAndVal) {
        return keyAndVal.join("=");
      })
      .join("&");
    window.history.replaceState(
      window.history.state,
      "null",
      base + (newSearch.length ? "?" + newSearch : ""),
    );
  };

  _proto.getItem = function getItem(key) {
    return window.localStorage.getItem(key);
  };

  _proto.removeItem = function removeItem(key) {
    window.localStorage.removeItem(key);
  };

  _proto.getPkce = function getPkce() {
    var pkce = window.localStorage.getItem("pkce");

    if (null === pkce) {
      throw new Error("PKCE pair not found in local storage");
    } else {
      return JSON.parse(pkce);
    }
  };

  _proto.setAuthTokens = function setAuthTokens(auth) {
    var _this$props$refreshSl = this.props.refreshSlack,
      refreshSlack = _this$props$refreshSl === void 0 ? 5 : _this$props$refreshSl;
    var now = new Date().getTime();
    auth.expires_at = now + (auth.expires_in + refreshSlack) * 1000;
    window.localStorage.setItem("auth", JSON.stringify(auth));
  };

  _proto.getAuthTokens = function getAuthTokens() {
    return JSON.parse(window.localStorage.getItem("auth") || "{}");
  };

  _proto.isPending = function isPending() {
    return (
      window.localStorage.getItem("pkce") !== null && window.localStorage.getItem("auth") === null
    );
  };

  _proto.isAuthenticated = function isAuthenticated() {
    return window.localStorage.getItem("auth") !== null;
  };

  _proto.logout = function logout(shouldEndSession) {
    if (shouldEndSession === void 0) {
      shouldEndSession = false;
    }

    this.removeItem("pkce");
    this.removeItem("auth");

    if (shouldEndSession) {
      var _this$props = this.props,
        clientId = _this$props.clientId,
        provider = _this$props.provider,
        logoutEndpoint = _this$props.logoutEndpoint,
        redirectUri = _this$props.redirectUri;
      var query = {
        client_id: clientId,
        post_logout_redirect_uri: redirectUri,
      };
      var url = (logoutEndpoint || provider + "/logout") + "?" + toUrlEncoded(query);
      window.location.replace(url);
      return true;
    } else {
      window.location.reload();
      return true;
    }
  };

  _proto.login = function login() {
    try {
      var _this3 = this;

      _this3.authorize();

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }; // this will do a full page reload and to to the OAuth2 provider's login page and then redirect back to redirectUri

  _proto.authorize = function authorize() {
    try {
      var _this5 = this;

      var _this5$props = _this5.props,
        clientId = _this5$props.clientId,
        provider = _this5$props.provider,
        authorizeEndpoint = _this5$props.authorizeEndpoint,
        redirectUri = _this5$props.redirectUri,
        scopes = _this5$props.scopes,
        audience = _this5$props.audience;
      var pkce = createPKCECodes(); // console.log(`pkce created: ${JSON.stringify(pkce)}`)

      window.localStorage.setItem("pkce", JSON.stringify(pkce));
      window.localStorage.setItem("preAuthUri", window.location.href);
      window.localStorage.removeItem("auth");
      return Promise.resolve(pkce.codeChallenge).then(function (codeChallenge) {
        var query = _extends(
          {
            clientId: clientId,
            scope: scopes.join(" "),
            responseType: "code",
            redirectUri: redirectUri,
          },
          audience && {
            audience: audience,
          },
          {
            codeChallenge: codeChallenge,
            codeChallengeMethod: "S256",
          },
        ); // Responds with a 302 redirect

        var url = (authorizeEndpoint || provider + "/authorize") + "?" + toUrlEncoded(query);
        window.location.replace(url);
        return true;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }; // this happens after a full page reload. Read the code from localstorage

  _proto.fetchToken = function fetchToken(code, isRefresh) {
    if (isRefresh === void 0) {
      isRefresh = false;
    }

    try {
      var _this7 = this;

      var _this7$props = _this7.props,
        clientId = _this7$props.clientId,
        clientSecret = _this7$props.clientSecret,
        contentType = _this7$props.contentType,
        provider = _this7$props.provider,
        tokenEndpoint = _this7$props.tokenEndpoint,
        redirectUri = _this7$props.redirectUri,
        _this7$props$autoRefr = _this7$props.autoRefresh,
        autoRefresh = _this7$props$autoRefr === void 0 ? true : _this7$props$autoRefr;
      var grantType = "authorization_code";

      var payload = _extends(
        {
          clientId: clientId,
        },
        clientSecret
          ? {
              clientSecret: clientSecret,
            }
          : {},
        {
          redirectUri: redirectUri,
          grantType: grantType,
        },
      );

      if (isRefresh) {
        payload = _extends({}, payload, {
          grantType: "refresh_token",
          refresh_token: code,
        });
      } else {
        var pkce = _this7.getPkce();

        var codeVerifier = pkce.codeVerifier;
        payload = _extends({}, payload, {
          code: code,
          codeVerifier: codeVerifier,
        });
      }

      return Promise.resolve(
        window.fetch("" + (tokenEndpoint || provider + "/token"), {
          headers: {
            "Content-Type": contentType || "application/x-www-form-urlencoded",
          },
          method: "POST",
          body: toUrlEncoded(payload),
        }),
      ).then(function (response) {
        _this7.removeItem("pkce");

        return Promise.resolve(response.json()).then(function (json) {
          if (isRefresh && !json.refresh_token) {
            json.refresh_token = payload.refresh_token;
          }

          _this7.setAuthTokens(json);

          if (autoRefresh) {
            _this7.startTimer();
          }

          return _this7.getAuthTokens();
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.armRefreshTimer = function armRefreshTimer(refreshToken, timeoutDuration) {
    var _this8 = this;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = window.setTimeout(function () {
      _this8
        .fetchToken(refreshToken, true)
        .then(function (_ref2) {
          var newRefreshToken = _ref2.refresh_token,
            expiresAt = _ref2.expires_at;
          if (!expiresAt) return;
          var now = new Date().getTime();
          var timeout = expiresAt - now;

          if (timeout > 0) {
            _this8.armRefreshTimer(newRefreshToken, timeout);
          } else {
            _this8.removeItem("auth");

            _this8.removeCodeFromLocation();
          }
        })
        ["catch"](function (e) {
          _this8.removeItem("auth");

          _this8.removeCodeFromLocation();

          console.warn({
            e: e,
          });
        });
    }, timeoutDuration);
  };

  _proto.startTimer = function startTimer() {
    var authTokens = this.getAuthTokens();

    if (!authTokens) {
      return;
    }

    var refreshToken = authTokens.refresh_token,
      expiresAt = authTokens.expires_at;

    if (!expiresAt || !refreshToken) {
      return;
    }

    var now = new Date().getTime();
    var timeout = expiresAt - now;

    if (timeout > 0) {
      this.armRefreshTimer(refreshToken, timeout);
    } else {
      this.removeItem("auth");
      this.removeCodeFromLocation();
    }
  };

  _proto.restoreUri = function restoreUri() {
    var uri = window.localStorage.getItem("preAuthUri");
    window.localStorage.removeItem("preAuthUri"); // console.log({ uri })

    if (uri !== null) {
      window.location.replace(uri);
    }

    this.removeCodeFromLocation();
  };

  return AuthService;
})();

exports.AuthContext = AuthContext;
exports.AuthProvider = AuthProvider;
exports.AuthService = AuthService;
exports.useAuth = useAuth;
exports.withAuth = withAuth;
