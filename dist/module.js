define(["lodash","app/plugins/sdk"], (__WEBPACK_EXTERNAL_MODULE_lodash__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__) => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/Base64/base64.js":
/*!****************************************!*\
  !*** ../node_modules/Base64/base64.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

;(function () {

  var object =  true ? exports : 0; // #8: web workers
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error;
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (
  object.btoa = function (input) {
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (
  object.atob = function (input) {
    var str = String(input).replace(/=+$/, '');
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });

}());


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./css/query_editor.css":
/*!*************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./css/query_editor.css ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.min-width-10 {
  min-width: 10rem;
}

.min-width-12 {
  min-width: 12rem;
}

.min-width-20 {
  min-width: 20rem;
}

.gf-form-select-wrapper select.gf-form-input {
  height: 2.64rem;
}

.gf-form-select-wrapper--caret-indent.gf-form-select-wrapper::after {
  right: 0.775rem
}

.service-dropdown {
  width: 12rem;
}

.aggregation-dropdown-wrapper {
  max-width: 29.1rem;
}

.timegrainunit-dropdown-wrapper {
  width: 8rem;
}
`, "",{"version":3,"sources":["webpack://./css/query_editor.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE;AACF;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb","sourcesContent":[".min-width-10 {\n  min-width: 10rem;\n}\n\n.min-width-12 {\n  min-width: 12rem;\n}\n\n.min-width-20 {\n  min-width: 20rem;\n}\n\n.gf-form-select-wrapper select.gf-form-input {\n  height: 2.64rem;\n}\n\n.gf-form-select-wrapper--caret-indent.gf-form-select-wrapper::after {\n  right: 0.775rem\n}\n\n.service-dropdown {\n  width: 12rem;\n}\n\n.aggregation-dropdown-wrapper {\n  max-width: 29.1rem;\n}\n\n.timegrainunit-dropdown-wrapper {\n  width: 8rem;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "../node_modules/fhir.js/src/adapters/native.js":
/*!******************************************************!*\
  !*** ../node_modules/fhir.js/src/adapters/native.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mkFhir = __webpack_require__(/*! ../fhir */ "../node_modules/fhir.js/src/fhir.js");

// Fetch Helper JSON Parsing
function parseJSON(response) {

  // response.json() throws on empty body
  return response.text()
  .then(function(text) {
    return text.length > 0 ? JSON.parse(text) : "";
  });

}

// Fetch Helper for Status Codes
function checkStatus(httpResponse) {
  return new Promise(function (resolve, reject) {
    if (httpResponse.status < 200 || httpResponse.status > 399) {
      reject(httpResponse);
    }
    resolve(httpResponse);
  });
}

// Build a backwards compatiable defer object
var defer = function(){
  var def = {};
  def.promise = new Promise(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  return def;
};

// Build Adapter Object
var adapter = {
  defer: defer,
  http: function (args) {
    var url = args.url;
    var debug = args.debug;

    // The arguments passed in aligh with the fetch option names.
    // There are are few extra values, but fetch will ignore them.
    var fetchOptions = args;

    // Pass along cookies
    fetchOptions.credentials = args.credentials || '';
    if (fetchOptions.credentials === '') {
      delete fetchOptions.credentials;
    }

    // data neeeds to map to body if data is populated and this is not a GET or HEAD request
    if (!['GET', 'HEAD'].includes(fetchOptions.method) && fetchOptions.data) {
      fetchOptions.body = fetchOptions.data;
    }

    debug && console.log("DEBUG[native](fetchOptions)", fetchOptions);

    return new Promise(function (resolve, reject) {
      var returnableObject = {};

      fetch(url, fetchOptions).then(function (response) {
        debug && console.log("DEBUG[native](response)", response);
        // This object is in the shape required by fhir.js lib
        Object.assign(returnableObject, {
          status: response.status,
          headers: response.headers,
          config: args,
        });
        return response;
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(function (fhirObject) {
        // Merge the
        Object.assign(returnableObject, {
          data: fhirObject,
        });
        debug && console.log('DEBUG[native]: (success response)', returnableObject); // eslint-disable-line
        resolve(returnableObject);
      })
      .catch(function(error) {
        Object.assign(returnableObject, {
          error: error,
        });
        debug && console.log('DEBUG[native]: rejecting fetch promise');
        reject(returnableObject);
      });
    });
  },
};

var buildfhir = function buildfhir(config) {
  // debugger;
  return mkFhir(config, adapter);
};
buildfhir.defer = defer;
module.exports = buildfhir;


/***/ }),

/***/ "../node_modules/fhir.js/src/decorate.js":
/*!***********************************************!*\
  !*** ../node_modules/fhir.js/src/decorate.js ***!
  \***********************************************/
/***/ (function(module) {

(function() {
    var fhirAPI;
    var adapter;

    function getNext (bundle, process) {
        var i;
        var d = bundle.data.entry || [];
        var entries = [];
        for (i = 0; i < d.length; i++) {
            entries.push(d[i].resource);
        }
        process(entries);
        var def = adapter.defer();
        fhirAPI.nextPage({bundle:bundle.data}).then(function (r) {
            getNext(r, process).then(function (t) {
                def.resolve();
            });
        }, function(err) {def.resolve()});
        return def.promise;
    }
    
    function drain (searchParams, process, done, fail) {
        var ret = adapter.defer();
        
        fhirAPI.search(searchParams).then(function(data){
            getNext(data, process).then(function() {
                done();
            }, function(err) {
                fail(err);
            });
        }, function(err) {
            fail(err);
        });
    };
    
    function fetchAll (searchParams){
        var ret = adapter.defer();
        var results = [];
        
        drain(
            searchParams,
            function(entries) {
                entries.forEach(function(entry) {
                    results.push(entry);
                });
            },
            function () {
                ret.resolve(results);
            },
            function (err) {
                ret.reject(err);
            }
        );
          
        return ret.promise;
    };

    function fetchAllWithReferences (searchParams, resolveParams) {
        var ret = adapter.defer();
          
        fhirAPI.search(searchParams)  // TODO: THIS IS NOT CORRECT (need fetchAll, but it does not return a bundle yet)
            .then(function(results){

                var resolvedReferences = {};

                var queue = [function() {ret.resolve(results, resolvedReferences);}];
                
                function enqueue (bundle,resource,reference) {
                  queue.push(function() {resolveReference(bundle,resource,reference)});
                }

                function next() {
                  (queue.pop())();
                }

                function resolveReference (bundle,resource,reference) {
                    var referenceID = reference.reference;
                    fhirAPI.resolve({'bundle': bundle, 'resource': resource, 'reference':reference}).then(function(res){
                      var referencedObject = res.data || res.content;
                      resolvedReferences[referenceID] = referencedObject;
                      next();
                    });
                }

                var bundle = results.data;

                bundle.entry && bundle.entry.forEach(function(element){
                  var resource = element.resource;
                  var type = resource.resourceType;
                  resolveParams && resolveParams.forEach(function(resolveParam){
                    var param = resolveParam.split('.');
                    var targetType = param[0];
                    var targetElement = param[1];
                    var reference = resource[targetElement];
                    if (type === targetType && reference) {
                      var referenceID = reference.reference;
                      if (!resolvedReferences[referenceID]) {
                        enqueue(bundle,resource,reference);
                      }
                    }
                  });
                });

                next();

            }, function(){
                ret.reject("Could not fetch search results");
            });
          
        return ret.promise;
    };
    
    function decorate (client, newAdapter) {
        fhirAPI = client;
        adapter = newAdapter;
        client["drain"] = drain;
        client["fetchAll"] = fetchAll;
        client["fetchAllWithReferences"] = fetchAllWithReferences;
        return client;
    }
    
    module.exports = decorate;
}).call(this);

/***/ }),

/***/ "../node_modules/fhir.js/src/fhir.js":
/*!*******************************************!*\
  !*** ../node_modules/fhir.js/src/fhir.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function() {
    var utils = __webpack_require__(/*! ./utils */ "../node_modules/fhir.js/src/utils.js");
    var M = __webpack_require__(/*! ./middlewares/core */ "../node_modules/fhir.js/src/middlewares/core.js");
    var query = __webpack_require__(/*! ./middlewares/search */ "../node_modules/fhir.js/src/middlewares/search.js");
    var auth = __webpack_require__(/*! ./middlewares/auth */ "../node_modules/fhir.js/src/middlewares/auth.js");
    var transport = __webpack_require__(/*! ./middlewares/http */ "../node_modules/fhir.js/src/middlewares/http.js");
    var errors = __webpack_require__(/*! ./middlewares/errors */ "../node_modules/fhir.js/src/middlewares/errors.js");
    var config = __webpack_require__(/*! ./middlewares/config */ "../node_modules/fhir.js/src/middlewares/config.js");
    var bundle = __webpack_require__(/*! ./middlewares/bundle */ "../node_modules/fhir.js/src/middlewares/bundle.js");
    var pt = __webpack_require__(/*! ./middlewares/patient */ "../node_modules/fhir.js/src/middlewares/patient.js");
    var refs = __webpack_require__(/*! ./middlewares/references */ "../node_modules/fhir.js/src/middlewares/references.js");
    var url = __webpack_require__(/*! ./middlewares/url */ "../node_modules/fhir.js/src/middlewares/url.js");
    var decorate = __webpack_require__(/*! ./decorate */ "../node_modules/fhir.js/src/decorate.js");

    var cache = {};


    var fhir = function(cfg, adapter){
        var Middleware = M.Middleware;
        var $$Attr = M.$$Attr;

        var $$Method = function(m){ return $$Attr('method', m);};
        var $$Header = function(h,v) {return $$Attr('headers.' + h, v);};

        var $Errors = Middleware(errors);
        var Defaults = Middleware(config(cfg, adapter))
                .and($Errors)
                .and(auth.$Basic)
                .and(auth.$Bearer)
                .and(auth.$Credentials)
                .and(transport.$JsonData)
                .and($$Header('Accept', (cfg.headers && cfg.headers['Accept']) ? cfg.headers['Accept'] : 'application/json'))
                .and($$Header('Content-Type', (cfg.headers && cfg.headers['Content-Type']) ? cfg.headers['Content-Type'] : 'application/json'));

        var GET = Defaults.and($$Method('GET'));
        var POST = Defaults.and($$Method('POST'));
        var PUT = Defaults.and($$Method('PUT'));
        var DELETE = Defaults.and($$Method('DELETE'));
        var PATCH = Defaults.and($$Method('PATCH'));

        var http = transport.Http(cfg, adapter);

        var Path = url.Path;
        var BaseUrl = Path(cfg.baseUrl);
        var resourceTypePath = BaseUrl.slash(":type || :resource.resourceType");
        var searchPath = resourceTypePath;
        var resourceTypeHxPath = resourceTypePath.slash("_history");
        var resourcePath = resourceTypePath.slash(":id || :resource.id");
        var resourceHxPath = resourcePath.slash("_history");
        var vreadPath =  resourcePath.slash(":versionId || :resource.meta.versionId");
        var metaTarget = BaseUrl.slash(":target.resourceType || :target.type").slash(":target.id").slash(':target.versionId');

        var ReturnHeader = $$Header('Prefer', 'return=representation');

        var $Paging = Middleware(query.$Paging);

        return decorate({
            conformance: GET.and(BaseUrl.slash("metadata")).end(http),
            document: POST.and(BaseUrl.slash("Document")).end(http),
            profile:  GET.and(BaseUrl.slash("Profile").slash(":type")).end(http),
            transaction: POST.and(BaseUrl).end(http),
            history: GET.and(BaseUrl.slash("_history")).and($Paging).end(http),
            typeHistory: GET.and(resourceTypeHxPath).and($Paging).end(http),
            resourceHistory: GET.and(resourceHxPath).and($Paging).end(http),
            read: GET.and(pt.$WithPatient).and(resourcePath).end(http),
            vread: GET.and(vreadPath).end(http),
            "delete": DELETE.and(resourcePath).and(ReturnHeader).end(http),
            create: POST.and(resourceTypePath).and(ReturnHeader).end(http),
            validate: POST.and(resourceTypePath.slash("_validate")).end(http),
            meta: {
                add: POST.and(metaTarget.slash("$meta-add")).end(http),
                delete: POST.and(metaTarget.slash("$meta-delete")).end(http),
                read: GET.and(metaTarget.slash("$meta")).end(http)
            },
            search: GET.and(resourceTypePath).and(pt.$WithPatient).and(query.$SearchParams).and($Paging).end(http),
            update: PUT.and(resourcePath).and(ReturnHeader).end(http),
            conditionalUpdate: PUT.and(resourceTypePath).and(query.$SearchParams).and(ReturnHeader).end(http),
            conditionalDelete: DELETE.and(resourceTypePath).and(query.$SearchParams).and(ReturnHeader).end(http),
            nextPage: GET.and(bundle.$$BundleLinkUrl("next")).end(http),
            // For previous page, bundle.link.relation can either have 'previous' or 'prev' values
            prevPage: GET.and(bundle.$$BundleLinkUrl("previous")).and(bundle.$$BundleLinkUrl("prev")).end(http),
            getBundleByUrl: GET.and(Path(":url")).end(http),
            resolve: GET.and(refs.resolve).end(http),
            patch: PATCH.and(resourcePath).and($$Header('Content-Type', 'application/json-patch+json')).end(http)
        }, adapter);
    };
    module.exports = fhir;
}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/auth.js":
/*!*******************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/auth.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function() {
    var mw = __webpack_require__(/*! ./core */ "../node_modules/fhir.js/src/middlewares/core.js");

    var btoa = (__webpack_require__(/*! Base64 */ "../node_modules/Base64/base64.js").btoa);

    exports.$Basic = mw.$$Attr('headers.Authorization', function(args){
        if(args.auth && args.auth.user && args.auth.pass){
            return "Basic " + btoa(args.auth.user + ":" + args.auth.pass);
        }
    });

    exports.$Bearer = mw.$$Attr('headers.Authorization', function(args){
        if(args.auth && args.auth.bearer){
            return "Bearer " + args.auth.bearer;
        }
    });

    var credentials;
    // this first middleware sets the credentials attribute to empty, so
    // adapters cannot use it directly, thus enforcing a valid value to be parsed in.
    exports.$Credentials = mw.Middleware(mw.$$Attr('credentials', function(args){
      // Assign value for later checking
      credentials = args.credentials

      // Needs to return non-null and not-undefined
      // in order for value to be (un)set
      return '';
    })).and(mw.$$Attr('credentials', function(args){
        // check credentials for valid options, valid for fetch
        if(['same-origin', 'include'].indexOf(credentials) > -1 ){
            return credentials;
        }
    }));

}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/bundle.js":
/*!*********************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/bundle.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.$$BundleLinkUrl =  function(rel){
    return function(h) {
        return function(args){
            var matched = function(x){return x.relation && x.relation === rel;};
            var res =  args.bundle && (args.bundle.link || []).filter(matched)[0];
            if(res && res.url){
                args.url = res.url;
                args.data = null;
            }
            return h(args);
        };
    };
};


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/config.js":
/*!*********************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/config.js ***!
  \*********************************************************/
/***/ (function(module) {

(function() {
    var copyAttr = function(from, to, attr){
        var v =  from[attr];
        if(v && !to[attr]) {to[attr] = v;}
        return from;
    };

    module.exports = function(cfg, adapter){
        return function(h){
            return function(args){
                copyAttr(cfg, args, 'baseUrl');
                copyAttr(cfg, args, 'cache');
                copyAttr(cfg, args, 'auth');
                copyAttr(cfg, args, 'patient');
                copyAttr(cfg, args, 'debug');
                copyAttr(cfg, args, 'credentials');
                copyAttr(cfg, args, 'headers');
                copyAttr(cfg, args, 'agentOptions');
                copyAttr(adapter, args, 'defer');
                copyAttr(adapter, args, 'http');
                return h(args);
            };
        };
    };
}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/core.js":
/*!*******************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/core.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function() {
    var utils = __webpack_require__(/*! ../utils */ "../node_modules/fhir.js/src/utils.js");

    var id = function(x){return x;};
    var constantly = function(x){return function(){return x;};};

    var mwComposition = function(mw1, mw2){
        return function(h){ return mw1(mw2(h)); };
    };

    var Middleware = function(mw){
        mw.and = function(nmw){
            return Middleware(mwComposition(mw, nmw));
        };
        mw.end = function(h){
            return mw(h);
        };
        return mw;
    };

    // generate wm from function
    exports.$$Simple = function(f){
        return function(h){
            return function(args){
                return h(f(args));
            };
        };
    };

    var setAttr = function(args, attr, value){
        var path = attr.split('.');
        var obj = args;
        for(var i = 0; i < (path.length - 1); i++){
            var k = path[i];
            obj = args[k];
            if(!obj){
                obj = {};
                args[k] = obj;
            }
        }
        obj[path[path.length - 1]] = value;
        return args;
    };

    // generate wm from function
    exports.$$Attr = function(attr, fn){
        return Middleware(function(h){
            return function(args) {
                var value = null;
                if(utils.type(fn) == 'function'){
                   value = fn(args);
                } else {
                    value = fn;
                }
                if(value == null && value == undefined){
                    return h(args);
                }else {
                    return h(setAttr(args, attr, value));
                }
            };
        });
    };

    var Attribute = function(attr, fn){
        return Middleware(function(h){
            return function(args) {
                args[attr] = fn(args);
                return h(args);
            };
        });
    };

    var Method = function(method){
        return Attribute('method', constantly(method));
    };

    exports.Middleware = Middleware;
    exports.Attribute = Attribute;
    exports.Method = Method;

}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/errors.js":
/*!*********************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/errors.js ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = function(h){
    return function(args){
        try{
            return h(args);
        }catch(e){
            if(args.debug){
               console.log("\nDEBUG: (ERROR in middleware)");
               console.log(e.message);
               console.log(e.stack);
            }
            if(!args.defer) {
                console.log("\nDEBUG: (ERROR in middleware)");
                console.log(e.message);
                console.log(e.stack);
                throw new Error("I need adapter.defer");
            }
            var deff = args.defer();
            deff.reject(e);
            return deff.promise;
        }
    };
};


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/http.js":
/*!*******************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/http.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function() {
    var utils = __webpack_require__(/*! ../utils */ "../node_modules/fhir.js/src/utils.js");

    exports.Http = function(cfg, adapter){
        return function(args){
            if(args.debug){
                console.log("\nDEBUG (request):", args.method, args.url, args);
            }
            var promise = (args.http || adapter.http  || cfg.http)(args);
            if (args.debug && promise && promise.then){
                promise.then(function(x){ console.log("\nDEBUG: (responce)", x);});
            }
            return promise;
        };
    };

    var toJson = function(x){
        return (utils.type(x) == 'object' || utils.type(x) == 'array') ? JSON.stringify(x) : x;
    };

    exports.$JsonData = function(h){
        return function(args){
            var data = args.bundle || args.data || args.resource;
            if(data){
                args.data = toJson(data);
            }
            return h(args);
        };
    };

}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/patient.js":
/*!**********************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/patient.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function() {
    var mw = __webpack_require__(/*! ./core */ "../node_modules/fhir.js/src/middlewares/core.js");

    // List of resources with 'patient' or 'subject' properties (as of FHIR DSTU2 1.0.0)
    var targets = [
        "Account",
        "AllergyIntolerance",
        "BodySite",
        "CarePlan",
        "Claim",
        "ClinicalImpression",
        "Communication",
        "CommunicationRequest",
        "Composition",
        "Condition",
        "Contract",
        "DetectedIssue",
        "Device",
        "DeviceUseRequest",
        "DeviceUseStatement",
        "DiagnosticOrder",
        "DiagnosticReport",
        "DocumentManifest",
        "DocumentReference",
        "Encounter",
        "EnrollmentRequest",
        "EpisodeOfCare",
        "FamilyMemberHistory",
        "Flag",
        "Goal",
        "ImagingObjectSelection",
        "ImagingStudy",
        "Immunization",
        "ImmunizationRecommendation",
        "List",
        "Media",
        "MedicationAdministration",
        "MedicationDispense",
        "MedicationOrder",
        "MedicationStatement",
        "NutritionOrder",
        "Observation",
        "Order",
        "Procedure",
        "ProcedureRequest",
        "QuestionnaireResponse",
        "ReferralRequest",
        "RelatedPerson",
        "RiskAssessment",
        "Specimen",
        "SupplyDelivery",
        "SupplyRequest",
        "VisionPrescription"
    ];

    exports.$WithPatient = mw.$$Simple(function(args){
        var type = args.type;
        if (args.patient) {
            if (type === "Patient") {
                args.query = args.query || {};
                args.query["_id"] = args.patient;
                args["id"] = args.patient;
            } else if (targets.indexOf(type) >= 0){
                args.query = args.query || {};
                args.query["patient"] = args.patient;
            }
        }
        return args;
    });
}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/references.js":
/*!*************************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/references.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function() {
    var utils = __webpack_require__(/*! ../utils */ "../node_modules/fhir.js/src/utils.js");

    var CONTAINED = /^#(.*)/;
    var resolveContained = function(ref, resource) {
        var cid = ref.match(CONTAINED)[1];
        var ret = (resource.contained || []).filter(function(r){
            return (r.id || r._id) == cid;
        })[0];
        return (ret && {content: ret}) || null;
    };

    var sync = function(arg) {
        var cache = arg.cache;
        var reference = arg.reference;
        var bundle = arg.bundle;
        var ref = reference;
        if (!ref.reference) {return null;}
        if (ref.reference.match(CONTAINED)) {return resolveContained(ref.reference, arg.resource);}
        var abs = utils.absoluteUrl(arg.baseUrl, ref.reference);
        var bundled = ((bundle && bundle.entry) || []).filter( function(e){
            return e.id === abs;
        })[0];
        return bundled || (cache != null ? cache[abs] : void 0) || null;
    };

    var resolve = function(h){
        return function(args) {
            var cacheMatched = sync(args);
            var ref = args.reference;
            var def = args.defer();
            if (cacheMatched) {
                if(!args.defer){ throw new Error("I need promise constructor 'adapter.defer' in adapter"); }
                def.resolve(cacheMatched);
                return def.promise;
            }
            if (!ref) {
                throw new Error("No reference found");
            }
            if (ref && ref.reference.match(CONTAINED)) {
                throw new Error("Contained resource not found");
            }
            args.url = utils.absoluteUrl(args.baseUrl, ref.reference);
            args.data = null;
            return h(args);
        };
    };

    module.exports.sync = sync;
    module.exports.resolve = resolve;

}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/search.js":
/*!*********************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/search.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function() {
  var utils = __webpack_require__(/*! ../utils */ "../node_modules/fhir.js/src/utils.js");

  var type = utils.type;

  var assertArray = utils.assertArray;

  var assertObject = utils.assertObject;

  var reduceMap = utils.reduceMap;

  var identity = utils.identity;

  var OPERATORS = {
    $gt: 'gt',
    $lt: 'lt',
    $lte: 'lte',
    $gte: 'gte',
    $ge: 'ge',
    $le: 'le'
  };

  var MODIFIERS = {
    $asc: ':asc',
    $desc: ':desc',
    $exact: ':exact',
    $missing: ':missing',
    $null: ':missing',
    $text: ':text'
  };

  var isOperator = function(v) {
    return v.indexOf('$') === 0;
  };

  var expandParam = function(k, v) {
    return reduceMap(v, function(acc, arg) {
      var kk, o, res, vv;
      kk = arg[0], vv = arg[1];
      return acc.concat(kk === '$and' ? assertArray(vv).reduce((function(a, vvv) {
        return a.concat(linearizeOne(k, vvv));
      }), []) : kk === '$type' ? [] : isOperator(kk) ? (o = {
        param: k
      }, kk === '$or' ? o.value = vv : (OPERATORS[kk] ? o.operator = OPERATORS[kk] : void 0, MODIFIERS[kk] ? o.modifier = MODIFIERS[kk] : void 0, type(vv) === 'object' && vv.$or ? o.value = vv.$or : o.value = [vv]), [o]) : (v.$type ? res = ":" + v.$type : void 0, linearizeOne("" + k + (res || '') + "." + kk, vv)));
    });
  };

  var handleSort = function(xs) {
    var i, len, results, x;
    assertArray(xs);
    results = [];
    for (i = 0, len = xs.length; i < len; i++) {
      x = xs[i];
      switch (type(x)) {
      case 'array':
        results.push({
          param: '_sort',
          value: x[0],
          modifier: ":" + x[1]
        });
        break;
      case 'string':
        results.push({
          param: '_sort',
          value: x
        });
        break;
      default:
        results.push(void 0);
      }
    }
    return results;
  };

  var handleInclude = function(includes, key) {
    return reduceMap(includes, function(acc, arg) {
      var k, v;
      k = arg[0], v = arg[1];
      return acc.concat((function() {
        switch (type(v)) {
        case 'array':
          return v.map(function(x) {
            return {
              param: key === '$include' ? '_include' : '_revinclude',
              value: k + ":" + x
            };
          });
        case 'string':
          return [
            {
              param: key === '$include' ? '_include' : '_revinclude',
              value: k + ":" + v
            }
          ];
        }
      })());
    });
  };
  var handleHas = function(includes, key) {
    return reduceMap(includes, function(acc, arg) {
      var k, v;
      k = arg[0], v = arg[1];
      return acc.concat((function() {
        switch (type(v)) {
        case 'array':
          return v.map(function(x) {
            return {
              param: '_has',
              value: k + "=" + x
            };
          });
        case 'string':
          return [
            {
              param: '_has',
              value: k + "=" + v
            }
          ];
        }
      })());
    });
  };
  var linearizeOne = function(k, v) {
    if (k === '$sort') {
      return handleSort(v);
    } else if (k === '$has') {
      return handleHas(v, k);
    } else if (k === '$include' || k === '$revInclude') {
      return handleInclude(v, k);
    } else {
      switch (type(v)) {
      case 'object':
        return expandParam(k, v);
      case 'string':
        return [
          {
            param: k,
            value: [v]
          }
        ];
      case 'number':
        return [
          {
            param: k,
            value: [v]
          }
        ];
      case 'array':
        return [
          {
            param: k,
            value: [v.join("|")]
          }
        ];
      default:
        throw "could not linearizeParams " + (type(v));
      }
    }
  };

  var linearizeParams = function(query) {
    return reduceMap(query, function(acc, arg) {
      var k, v;
      k = arg[0], v = arg[1];
      return acc.concat(linearizeOne(k, v));
    });
  };

  var buildSearchParams = function(query) {
    var p, ps, value;
    var excludeEncode = ['_include', '_revinclude', '_has']
    ps = (function() {
      var i, len, ref, results;
      ref = linearizeParams(query);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        p = ref[i];
        if (excludeEncode.indexOf(p.param) === -1)
          value = encodeURIComponent(p.value);
        else
          value = p.value
        results.push([p.param, p.modifier, (p.param == '_has') ? ':' : '=', p.operator, value].filter(identity).join(''));
      }
      return results;
    })();
    return ps.join("&");
  };

  exports._query = linearizeParams;

  exports.query = buildSearchParams;

  var mw = __webpack_require__(/*! ./core */ "../node_modules/fhir.js/src/middlewares/core.js");

  exports.$SearchParams = mw.$$Attr('url', function(args){
    var url = args.url;
    if(args.query){
      var queryStr = buildSearchParams(args.query);
      return url + "?" + queryStr;
    }
    return url;
  });


  exports.$Paging = function(h){
    return function(args){
      var params = args.params || {};
      if(args.since){params._since = args.since;}
      if(args.count){params._count = args.count;}
      args.params = params;
      return h(args);
    };
  };


}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/url.js":
/*!******************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/url.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function() {
    var utils = __webpack_require__(/*! ../utils */ "../node_modules/fhir.js/src/utils.js");
    var core = __webpack_require__(/*! ./core */ "../node_modules/fhir.js/src/middlewares/core.js");

    var id = function(x){return x;};
    var constantly = function(x){return function(){return x;};};

    var get_in = function(obj, path){
        return path.split('.').reduce(function(acc,x){
            if(x === 'versionId' && acc[x]){ return '_history/'+ acc[x] }
            if(acc == null || acc == undefined) { return null; }
            return acc[x];
        }, obj);
    };

    var evalPropsExpr = function(exp, args){
        var exps =  exp.split('||').map(function(x){return x.trim().substring(1);});
        for(var i = 0; i < exps.length; i++){
            var res = get_in(args, exps[i]);
            if(res){ return res; }
        }
        return null;
    };

    var evalExpr = function(exp, args){
        if (exp.indexOf(":") == 0){
            return evalPropsExpr(exp, args);
        } else {
            return exp;
        }
    };

    var buildPathPart = function(pth, args){
        var k = evalExpr(pth.trim(), args);
        if((k==null || k === undefined) && pth.includes('target.versionId') == false){ throw new Error("Parameter "+pth+" is required: " + JSON.stringify(args)); }
        return k;
    };

    // path chaining function
    // which return haldler wrapper: (h, cfg)->(args -> promise)
    // it's chainable Path("baseUrl").slash(":type").slash(":id").slash("_history")(id, {})({id: 5, type: 'Patient'})
    // and composable p0 = Path("baseUrl); p1 = p0.slash("path)
    var Path = function(tkn, chain){
        //Chainable
        var new_chain = function(args){
            if(chain && tkn.includes('target.versionId') && !args.target.versionId){
                return chain(args);
            }
            return ((chain && (chain(args) + "/")) || "") +  buildPathPart(tkn, args);
        };
        var ch = core.Attribute('url', new_chain);
        ch.slash = function(tkn){
            return Path(tkn, new_chain);
        };
        return ch;
    };

    exports.Path = Path;
}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/utils.js":
/*!********************************************!*\
  !*** ../node_modules/fhir.js/src/utils.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function() {
  var merge = __webpack_require__(/*! merge */ "../node_modules/merge/merge.js");

  var RTRIM = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  var trim = function(text) {
    return text ? text.toString().replace(RTRIM, "")  : "";
  };

  exports.trim = trim;

  var addKey = function(acc, str) {
    var pair, val;
    if (!str) {
      return null;
    }
    pair = str.split("=").map(trim);
    val = pair[1].replace(/(^"|"$)/g, '');
    if (val) {
      acc[pair[0]] = val;
    }
    return acc;
  };

  var type = function(obj) {
    var classToType;
    if (obj == null && obj === undefined) {
      return String(obj);
    }
    classToType = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regexp',
      '[object Object]': 'object'
    };
    return classToType[Object.prototype.toString.call(obj)];
  };

  exports.type = type;

  var assertArray = function(a) {
    if (type(a) !== 'array') {
      throw 'not array';
    }
    return a;
  };

  exports.assertArray = assertArray;

  var assertObject = function(a) {
    if (type(a) !== 'object') {
      throw 'not object';
    }
    return a;
  };

  exports.assertObject = assertObject;

  var reduceMap = function(m, fn, acc) {
    var k, v;
    acc || (acc = []);
    assertObject(m);
    return ((function() {
      var results;
      results = [];
      for (k in m) {
        v = m[k];
        results.push([k, v]);
      }
      return results;
    })()).reduce(fn, acc);
  };

  exports.reduceMap = reduceMap;

  var identity = function(x) {return x;};

  exports.identity = identity;

  var argsArray = function() {
     return Array.prototype.slice.call(arguments)
  };

  exports.argsArray = argsArray;

  var mergeLists = function() {
    var reduce;
    reduce = function(merged, nextMap) {
      var k, ret, v;
      ret = merge(true, merged);
      for (k in nextMap) {
        v = nextMap[k];
        ret[k] = (ret[k] || []).concat(v);
      }
      return ret;
    };
    return argsArray.apply(null, arguments).reduce(reduce, {});
  };

  exports.mergeLists = mergeLists;

  var absoluteUrl = function(baseUrl, ref) {
    if (!ref.match(/https?:\/\/./)) {
      return baseUrl + "/" + ref;
    } else {
      return ref;
    }
  };

  exports.absoluteUrl = absoluteUrl;

  var relativeUrl = function(baseUrl, ref) {
    if (ref.slice(ref, baseUrl.length + 1) === baseUrl + "/") {
      return ref.slice(baseUrl.length + 1);
    } else {
      return ref;
    }
  };

  exports.relativeUrl = relativeUrl;

  exports.resourceIdToUrl = function(id, baseUrl, type) {
    baseUrl = baseUrl.replace(/\/$/, '');
    id = id.replace(/^\//, '');
    if (id.indexOf('/') < 0) {
      return baseUrl + "/" + type + "/" + id;
    } else if (id.indexOf(baseUrl) !== 0) {
      return baseUrl + "/" + id;
    } else {
      return id;
    }
  };

  var walk = function(inner, outer, data, context) {
    var keysToMap, remapped;
    switch (type(data)) {
      case 'array':
        return outer(data.map(function(item) {
          return inner(item, [data, context]);
        }), context);
      case 'object':
        keysToMap = function(acc, arg) {
          var k, v;
          k = arg[0], v = arg[1];
          acc[k] = inner(v, [data].concat(context));
          return acc;
        };
        remapped = reduceMap(data, keysToMap, {});
        return outer(remapped, context);
      default:
        return outer(data, context);
    }
  };

  exports.walk = walk;

  var postwalk = function(f, data, context) {
    if (!data) {
      return function(data, context) {
        return postwalk(f, data, context);
      };
    } else {
      return walk(postwalk(f), f, data, context);
    }
  };

  exports.postwalk = postwalk;

}).call(this);


/***/ }),

/***/ "../node_modules/merge/merge.js":
/*!**************************************!*\
  !*** ../node_modules/merge/merge.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/*!
 * @name JavaScript/NodeJS Merge v1.2.1
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				if (key === '__proto__') continue;

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})( true && module && typeof module.exports === 'object' && module.exports);

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./annotations_query_ctrl.ts":
/*!***********************************!*\
  !*** ./annotations_query_ctrl.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FhirDatasourceAnnotationsQueryCtrl: () => (/* binding */ FhirDatasourceAnnotationsQueryCtrl)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
/**
 * Empty controller used to satisfy Grafana's annotation UI contract.
 */
var FhirDatasourceAnnotationsQueryCtrl = /*#__PURE__*/_createClass(function FhirDatasourceAnnotationsQueryCtrl() {
  _classCallCheck(this, FhirDatasourceAnnotationsQueryCtrl);
});
FhirDatasourceAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

/***/ }),

/***/ "./config_ctrl.ts":
/*!************************!*\
  !*** ./config_ctrl.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FhirDatasourceConfigCtrl: () => (/* binding */ FhirDatasourceConfigCtrl)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
/**
 * Controller for the datasource configuration page.
 */
var FhirDatasourceConfigCtrl = /*#__PURE__*/_createClass(function FhirDatasourceConfigCtrl($scope) {
  _classCallCheck(this, FhirDatasourceConfigCtrl);
});
FhirDatasourceConfigCtrl.templateUrl = 'partials/config.html';

/***/ }),

/***/ "./css/query_editor.css":
/*!******************************!*\
  !*** ./css/query_editor.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_query_editor_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./query_editor.css */ "../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./css/query_editor.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_query_editor_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_query_editor_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_query_editor_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_query_editor_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FhirDatasourceDatasource)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fhir_js_src_adapters_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fhir.js/src/adapters/native */ "../node_modules/fhir.js/src/adapters/native.js");
/* harmony import */ var fhir_js_src_adapters_native__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fhir_js_src_adapters_native__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_grafana_grafana_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/grafana/grafana.module */ "./utils/grafana/grafana.module.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />



/**
 * Datasource implementation used by Grafana to communicate with a FHIR server.
 */
var FhirDatasourceDatasource = /*#__PURE__*/function () {
  //@ngInject
  function FhirDatasourceDatasource(instanceSettings, $q, backendSrv, templateSrv) {
    _classCallCheck(this, FhirDatasourceDatasource);
    console.log("FhirDatasourceDatasource Ctor", instanceSettings);
    this.id = instanceSettings.id;
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = {
      'Content-Type': 'application/json'
    };
    this.config = instanceSettings.jsonData;
    var config = {
      baseUrl: this.config.fhiraddress || this.url,
      credentials: 'same-origin'
    };
    this.client = fhir_js_src_adapters_native__WEBPACK_IMPORTED_MODULE_1___default()(config);
    window.fhir_datasource = this;
    window.fhir_client = this.client;
    this.client.conformance({});
    console.log('url', this.url);
    console.log('backendSrv', this.backendSrv);
    console.log('templateSrv', this.templateSrv);
  }
  /**
   * Executes a data query. Currently returns a mocked empty dataset.
   */
  return _createClass(FhirDatasourceDatasource, [{
    key: "query",
    value: function query(options) {
      var _this = this;
      console.log('FhirDatasourceDatasource Query', options);
      var promises = options.targets.filter(function (t) {
        return !t.hide;
      }).map(function (t) {
        return _this.fetchSeries(t);
      });
      return Promise.all(promises).then(function (data) {
        return {
          data: data
        };
      });
    }
  }, {
    key: "fetchSeries",
    value: function fetchSeries(target) {
      var _this2 = this;
      var query = {};
      if (target.searchParam && target.searchValue) {
        query[target.searchParam] = target.searchValue;
      }
      return this.client.search({
        type: target.resourceType,
        query: query
      }).then(function (res) {
        return _this2.transformToSeries(res.data, target.refId || target.resourceType);
      });
    }
  }, {
    key: "transformToSeries",
    value: function transformToSeries(bundle, target) {
      var datapoints = [];
      (bundle.entry || []).forEach(function (e) {
        var r = e.resource;
        if (!r) {
          return;
        }
        var ts = Date.parse(r.effectiveDateTime || r.issued || r.meta && r.meta.lastUpdated || '');
        var val = r.valueQuantity && r.valueQuantity.value;
        if (!isNaN(ts) && typeof val === 'number') {
          datapoints.push([val, ts]);
        }
      });
      return {
        target: target,
        datapoints: datapoints
      };
    }
  }, {
    key: "annotationQuery",
    value: function annotationQuery(options) {
      console.log("FhirDatasourceDatasource annotationQuery", options);
      throw new Error("Annotation Support not implemented yet.");
      // var query = this.templateSrv.replace(options.annotation.query, {}, 'glob');
      // var annotationQuery = {
      //   range: options.range,
      //   annotation: {
      //     name: options.annotation.name,
      //     datasource: options.annotation.datasource,
      //     enable: options.annotation.enable,
      //     iconColor: options.annotation.iconColor,
      //     query: query
      //   },
      //   rangeRaw: options.rangeRaw
      // };
      // return this.doRequest({
      //   url: this.url + '/annotations',
      //   method: 'POST',
      //   data: annotationQuery
      // }).then(result => {
      //   return result.data;
      // });
    }
    /**
     * Returns available metrics based on the server conformance statement.
     */
  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(query) {
      console.log("metricFindQuery", query);
      var interpolated = {
        target: this.templateSrv.replace(query, null, 'regex')
      };
      return this.client.conformance({}).then(function (response) {
        var toRet = [];
        toRet = response.data.rest[0].resource.map(function (tmp) {
          return new _utils_grafana_grafana_module__WEBPACK_IMPORTED_MODULE_2__.GrafanaHelper.Metric(tmp.type, tmp.type);
        });
        return toRet;
      });
    }
    /**
     * Validates the datasource configuration by performing a conformance request.
     */
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      var _this3 = this;
      return this.client.conformance({}).then(function (response) {
        if (response.data) {
          _this3.conformance = response.data || [];
          console.log(_this3.conformance);
          if (_this3.isValidServer()) {
            return _utils_grafana_grafana_module__WEBPACK_IMPORTED_MODULE_2__.GrafanaHelper.Response.success("Server added successfully!", _this3.conformance.software.name + " is a valid Fhir Server.");
          } else return _utils_grafana_grafana_module__WEBPACK_IMPORTED_MODULE_2__.GrafanaHelper.Response.error("Cannot add Server!", "The server doesn't seem to be a valid one!");
        } else return _utils_grafana_grafana_module__WEBPACK_IMPORTED_MODULE_2__.GrafanaHelper.Response.error("Cannot add Server!", "The server's response is not compliant!");
      }, function (err) {
        var errmsg = "";
        if (err.error && err.error instanceof TypeError) errmsg = err.error.message;else errmsg = "[".concat(err.error.status, "] ").concat(err.error.statusText);
        return _utils_grafana_grafana_module__WEBPACK_IMPORTED_MODULE_2__.GrafanaHelper.Response.error("Cannot add Server!", "We couldn't add the server:\n".concat(errmsg));
      });
    }
    /**
     * Contains the logic to check if the provided server is a valid one.
     * At the moment it only checks if it has a conformance object and
     * if the conformance has a fhirVersion attribute.
    */
  }, {
    key: "isValidServer",
    value: function isValidServer() {
      return !!(this.conformance && this.conformance.fhirVersion);
    }
    /**
     * Issues an HTTP request via Grafana's backend service.
     */
  }, {
    key: "doRequest",
    value: function doRequest(options) {
      options.withCredentials = this.withCredentials;
      options.headers = this.headers;
      console.log("options", options);
      var x = this.backendSrv.datasourceRequest(options);
      console.log("backend", x);
      return x;
    }
    /**
     * Helper to clean and interpolate query editor options.
     */
  }, {
    key: "buildQueryParameters",
    value: function buildQueryParameters(options) {
      var _this4 = this;
      //remove placeholder targets
      options.targets = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(options.targets, function (target) {
        return target.target !== 'select metric';
      });
      console.log("buildQueryParameters", options);
      var targets = lodash__WEBPACK_IMPORTED_MODULE_0___default().map(options.targets, function (target) {
        return {
          target: _this4.templateSrv.replace(target.target, options.scopedVars, 'regex'),
          refId: target.refId,
          hide: target.hide,
          type: target.type || 'timeserie'
        };
      });
      options.targets = targets;
      return options;
    }
  }, {
    key: "getTagKeys",
    value: function getTagKeys(options) {
      var _this5 = this;
      return new Promise(function (resolve, reject) {
        _this5.doRequest({
          url: _this5.url + '/tag-keys',
          method: 'POST',
          data: options
        }).then(function (result) {
          return resolve(result.data);
        });
      });
    }
  }, {
    key: "getTagValues",
    value: function getTagValues(options) {
      var _this6 = this;
      return new Promise(function (resolve, reject) {
        _this6.doRequest({
          url: _this6.url + '/tag-values',
          method: 'POST',
          data: options
        }).then(function (result) {
          return resolve(result.data);
        });
      });
    }
  }]);
}();


/***/ }),

/***/ "./query_ctrl.ts":
/*!***********************!*\
  !*** ./query_ctrl.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FhirDatasourceQueryCtrl: () => (/* binding */ FhirDatasourceQueryCtrl)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_query_editor_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/query_editor.css */ "./css/query_editor.css");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



/**
 * Controller used for the query editor UI.
 */
var FhirDatasourceQueryCtrl = /*#__PURE__*/function (_QueryCtrl) {
  /**
   * Angular constructor injection point.
   */
  function FhirDatasourceQueryCtrl($scope, $injector) {
    var _this;
    _classCallCheck(this, FhirDatasourceQueryCtrl);
    _this = _callSuper(this, FhirDatasourceQueryCtrl, [$scope, $injector]);
    _this.defaults = {
      resourceType: 'Observation',
      searchParam: '',
      searchValue: ''
    };
    console.log("FhirDatasourceQueryCtrl", $scope);
    _this.scope = $scope;
    lodash__WEBPACK_IMPORTED_MODULE_0___default().defaultsDeep(_this.target, _this.defaults);
    _this.target.type = _this.target.type || 'timeserie';
    return _this;
  }
  /**
   * Called as the user types to query metric suggestions.
   */
  _inherits(FhirDatasourceQueryCtrl, _QueryCtrl);
  return _createClass(FhirDatasourceQueryCtrl, [{
    key: "getResources",
    value: function getResources(query) {
      return this.datasource.metricFindQuery(query || '');
    }
  }, {
    key: "onChangeInternal",
    value: function onChangeInternal() {
      this.panelCtrl.refresh(); // Asks the panel to refresh data.
    }
  }, {
    key: "toggleEditorMode",
    value: function toggleEditorMode() {
      this.target.rawQuery = !this.target.rawQuery;
    }
  }]);
}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__.QueryCtrl);
FhirDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';

/***/ }),

/***/ "./utils/grafana/grafana.module.ts":
/*!*****************************************!*\
  !*** ./utils/grafana/grafana.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GrafanaHelper: () => (/* binding */ GrafanaHelper)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Collection of small helper classes used when interacting with Grafana APIs.
 */
var GrafanaHelper;
(function (GrafanaHelper) {
  /**
   * Possible result statuses for testDatasource
   */
  var ReturnStatus;
  (function (ReturnStatus) {
    ReturnStatus["success"] = "success";
    ReturnStatus["error"] = "error";
  })(ReturnStatus = GrafanaHelper.ReturnStatus || (GrafanaHelper.ReturnStatus = {}));
  /**
   * Helper class to generate the right json object to pass over to grafana.
   * It handles success and error object messages.
   */
  /**
   * Simple container for a datasource test response.
   */
  var Response = /*#__PURE__*/function () {
    function Response() {
      _classCallCheck(this, Response);
      this.retObj = {};
    }
    /**
     * Generates error json message
     * @param title Message title
     * @param msg Message body
     */
    return _createClass(Response, null, [{
      key: "error",
      value: function error(title, msg) {
        return {
          status: ReturnStatus.error,
          title: title,
          message: msg
        };
      }
      /**
       * Generates success json messages
       * @param title Message title
       * @param msg Message body
       */
    }, {
      key: "success",
      value: function success(title, msg) {
        return {
          status: ReturnStatus.success,
          title: title,
          message: msg
        };
      }
    }]);
  }();
  GrafanaHelper.Response = Response;
  /**
   * Structure returned by metricFindQuery containing text/value pairs.
   */
  var Metric = /*#__PURE__*/_createClass(
  /**
   *
   */
  function Metric(text, value) {
    _classCallCheck(this, Metric);
    this.text = text;
    this.value = value;
  });
  GrafanaHelper.Metric = Metric;
})(GrafanaHelper || (GrafanaHelper = {}));

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnnotationsQueryCtrl: () => (/* reexport safe */ _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_2__.FhirDatasourceAnnotationsQueryCtrl),
/* harmony export */   ConfigCtrl: () => (/* reexport safe */ _config_ctrl__WEBPACK_IMPORTED_MODULE_3__.FhirDatasourceConfigCtrl),
/* harmony export */   Datasource: () => (/* reexport safe */ _datasource__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   QueryCtrl: () => (/* reexport safe */ _query_ctrl__WEBPACK_IMPORTED_MODULE_1__.FhirDatasourceQueryCtrl),
/* harmony export */   QueryOptionsCtrl: () => (/* binding */ GenericQueryOptionsCtrl)
/* harmony export */ });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./query_ctrl.ts");
/* harmony import */ var _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./annotations_query_ctrl */ "./annotations_query_ctrl.ts");
/* harmony import */ var _config_ctrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config_ctrl */ "./config_ctrl.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }

// Entry point used by Grafana to discover plugin components



// Simple wrappers needed by Grafana's angular loader
var GenericQueryOptionsCtrl = /*#__PURE__*/_createClass(function GenericQueryOptionsCtrl() {
  _classCallCheck(this, GenericQueryOptionsCtrl);
  this.templateUrl = 'partials/query.options.html';
});
var GenericAnnotationsQueryCtrl = /*#__PURE__*/_createClass(function GenericAnnotationsQueryCtrl() {
  _classCallCheck(this, GenericAnnotationsQueryCtrl);
  this.templateUrl = 'partials/annotations.editor.html';
});

//GenericAnnotationsQueryCtrl as AnnotationsQueryCtrl
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=module.js.map