define(["app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/Base64/base64.js":
/*!****************************************!*\
  !*** ../node_modules/Base64/base64.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function () {

  var object =  true ? exports : undefined; // #8: web workers
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

/***/ "../node_modules/css-loader/index.js?!./css/query_editor.css":
/*!*******************************************************************!*\
  !*** ../node_modules/css-loader??ref--5-1!./css/query_editor.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".min-width-10 {\n  min-width: 10rem;\n}\n\n.min-width-12 {\n  min-width: 12rem;\n}\n\n.min-width-20 {\n  min-width: 20rem;\n}\n\n.gf-form-select-wrapper select.gf-form-input {\n  height: 2.64rem;\n}\n\n.gf-form-select-wrapper--caret-indent.gf-form-select-wrapper::after {\n  right: 0.775rem\n}\n\n.service-dropdown {\n  width: 12rem;\n}\n\n.aggregation-dropdown-wrapper {\n  max-width: 29.1rem;\n}\n\n.timegrainunit-dropdown-wrapper {\n  width: 8rem;\n}\n", "", {"version":3,"sources":["/home/blackdevil/Scrivania/nuovo/progetti/grafana-fhir-datasource/fhir-datasource/src/css/query_editor.css"],"names":[],"mappings":"AAAA;EACE,iBAAiB;CAClB;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,eAAe;CAChB;;AAED;EACE,aAAa;CACd;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,YAAY;CACb","file":"query_editor.css","sourcesContent":[".min-width-10 {\n  min-width: 10rem;\n}\n\n.min-width-12 {\n  min-width: 12rem;\n}\n\n.min-width-20 {\n  min-width: 20rem;\n}\n\n.gf-form-select-wrapper select.gf-form-input {\n  height: 2.64rem;\n}\n\n.gf-form-select-wrapper--caret-indent.gf-form-select-wrapper::after {\n  right: 0.775rem\n}\n\n.service-dropdown {\n  width: 12rem;\n}\n\n.aggregation-dropdown-wrapper {\n  max-width: 29.1rem;\n}\n\n.timegrainunit-dropdown-wrapper {\n  width: 8rem;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/*!**************************************************!*\
  !*** ../node_modules/css-loader/lib/css-base.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../node_modules/fhir.js/src/adapters/native.js":
/*!******************************************************!*\
  !*** ../node_modules/fhir.js/src/adapters/native.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
  http: function (args) {
    var url = args.url;
    var debug = args.debug;

    // The arguments passed in aligh with the fetch option names.
    // There are are few extra values, but fetch will ignore them.
    var fetchOptions = args;

    // Pass along cookies
    fetchOptions.credentials = args.credentials || '';

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

        var http = transport.Http(cfg, adapter);

        var Path = url.Path;
        var BaseUrl = Path(cfg.baseUrl);
        var resourceTypePath = BaseUrl.slash(":type || :resource.resourceType");
        var searchPath = resourceTypePath;
        var resourceTypeHxPath = resourceTypePath.slash("_history");
        var resourcePath = resourceTypePath.slash(":id || :resource.id");
        var resourceHxPath = resourcePath.slash("_history");
        var vreadPath =  resourceHxPath.slash(":versionId || :resource.meta.versionId");
        var resourceVersionPath = resourceHxPath.slash(":versionId || :resource.meta.versionId");

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
            search: GET.and(resourceTypePath).and(pt.$WithPatient).and(query.$SearchParams).and($Paging).end(http),
            update: PUT.and(resourcePath).and(ReturnHeader).end(http),
            nextPage: GET.and(bundle.$$BundleLinkUrl("next")).end(http),
            prevPage: GET.and(bundle.$$BundleLinkUrl("prev")).end(http),
            resolve: GET.and(refs.resolve).end(http)
        }, adapter);

    };
    module.exports = fhir;
}).call(this);


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/auth.js":
/*!*******************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/auth.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function() {
    var mw = __webpack_require__(/*! ./core */ "../node_modules/fhir.js/src/middlewares/core.js");

    var btoa = __webpack_require__(/*! Base64 */ "../node_modules/Base64/base64.js").btoa;

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
/*! no static exports found */
/***/ (function(module, exports) {

exports.$$BundleLinkUrl =  function(rel){
    return function(h) {
        return function(args){
            var matched = function(x){return x.relation && x.relation === rel;};
            var res =  args.bundle && (args.bundle.link || []).filter(matched)[0];
            if(res && res.url){
                args.url = res.url;
                args.data = null;
                return h(args);
            }
            else{
                throw new Error("No " + rel + " link found in bundle");
            }
        };
    };
};


/***/ }),

/***/ "../node_modules/fhir.js/src/middlewares/config.js":
/*!*********************************************************!*\
  !*** ../node_modules/fhir.js/src/middlewares/config.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        return (utils.type(x) == 'object') ? JSON.stringify(x) : x;
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        $gte: 'gte'
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

    var handleInclude = function(includes) {
        return reduceMap(includes, function(acc, arg) {
            var k, v;
            k = arg[0], v = arg[1];
            return acc.concat((function() {
                switch (type(v)) {
                case 'array':
                    return v.map(function(x) {
                        return {
                            param: '_include',
                            value: k + "." + x
                        };
                    });
                case 'string':
                    return [
                        {
                            param: '_include',
                            value: k + "." + v
                        }
                    ];
                }
            })());
        });
    };

    var linearizeOne = function(k, v) {
        if (k === '$sort') {
            return handleSort(v);
        } else if (k === '$include') {
            return handleInclude(v);
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
        var p, ps;
        ps = (function() {
            var i, len, ref, results;
            ref = linearizeParams(query);
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                p = ref[i];
                results.push([p.param, p.modifier, '=', p.operator, encodeURIComponent(p.value)].filter(identity).join(''));
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function() {
    var utils = __webpack_require__(/*! ../utils */ "../node_modules/fhir.js/src/utils.js");
    var core = __webpack_require__(/*! ./core */ "../node_modules/fhir.js/src/middlewares/core.js");

    var id = function(x){return x;};
    var constantly = function(x){return function(){return x;};};

    var get_in = function(obj, path){
        return path.split('.').reduce(function(acc,x){
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
        if(k==null || k === undefined){ throw new Error("Parameter "+pth+" is required: " + JSON.stringify(args)); }
        return k;
    };

    // path chaining function
    // which return haldler wrapper: (h, cfg)->(args -> promise)
    // it's chainable Path("baseUrl").slash(":type").slash(":id").slash("_history")(id, {})({id: 5, type: 'Patient'})
    // and composable p0 = Path("baseUrl); p1 = p0.slash("path)
    var Path = function(tkn, chain){
        //Chainable
        var new_chain = function(args){
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*!
 * @name JavaScript/NodeJS Merge v1.2.0
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

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../node_modules/style-loader/lib/urls.js":
/*!************************************************!*\
  !*** ../node_modules/style-loader/lib/urls.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./annotations_query_ctrl.ts":
/*!***********************************!*\
  !*** ./annotations_query_ctrl.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var FhirDatasourceAnnotationsQueryCtrl = /** @class */function () {
    function FhirDatasourceAnnotationsQueryCtrl() {}
    FhirDatasourceAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return FhirDatasourceAnnotationsQueryCtrl;
}();
exports.FhirDatasourceAnnotationsQueryCtrl = FhirDatasourceAnnotationsQueryCtrl;

/***/ }),

/***/ "./config_ctrl.ts":
/*!************************!*\
  !*** ./config_ctrl.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var FhirDatasourceConfigCtrl = /** @class */function () {
    function FhirDatasourceConfigCtrl($scope) {}
    FhirDatasourceConfigCtrl.templateUrl = 'partials/config.html';
    return FhirDatasourceConfigCtrl;
}();
exports.FhirDatasourceConfigCtrl = FhirDatasourceConfigCtrl;

/***/ }),

/***/ "./css/query_editor.css":
/*!******************************!*\
  !*** ./css/query_editor.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--5-1!./query_editor.css */ "../node_modules/css-loader/index.js?!./css/query_editor.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./datasource.ts":
/*!***********************!*\
  !*** ./datasource.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _native = __webpack_require__(/*! fhir.js/src/adapters/native */ "../node_modules/fhir.js/src/adapters/native.js");

var _native2 = _interopRequireDefault(_native);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FhirDatasourceDatasource = /** @class */function () {
    /** @ngInject */
    function FhirDatasourceDatasource(instanceSettings) {
        this.name = instanceSettings.name;
        this.id = instanceSettings.id;
        this.config = instanceSettings.jsonData;
        var config = {
            'baseUrl': 'http://fhirtest.uhn.ca/baseDstu2',
            'credentials': 'same-origin'
        };
        config.baseUrl = this.config.fhiraddress || config.baseUrl;
        // console.log("FHIR.mkFhir",FHIR.mkFhir);
        // console.log("nativeFhir",nativeFhir);
        // var fhir = nativeFhir({
        //   baseUrl: 'https://ci-api.fhir.me',
        //   auth: {user: 'client', pass: 'secret'}
        // });
        // console.log("fhir",fhir);
        this.client = (0, _native2.default)(config);
    }
    FhirDatasourceDatasource.prototype.query = function (options) {
        throw new Error("Query Support not implemented yet.");
    };
    FhirDatasourceDatasource.prototype.annotationQuery = function (options) {
        throw new Error("Annotation Support not implemented yet.");
    };
    FhirDatasourceDatasource.prototype.metricFindQuery = function (query) {
        throw new Error("Template Variable Support not implemented yet.");
    };
    FhirDatasourceDatasource.prototype.testDatasource = function () {
        var _this = this;
        return this.client.conformance({}).then(function (response) {
            if (response.data) {
                _this.conformance = response.data || [];
                console.log(_this.conformance);
            }
            var text = JSON.stringify(_this.conformance, null, 2);
            ;
            return {
                status: 'success',
                message: 'Connection result: \n' + text,
                title: 'success'
            };
        }, function (err) {
            return {
                status: 'error',
                message: 'Data Source is just a template and has not been implemented yet.',
                title: 'Error'
            };
        });
    };
    return FhirDatasourceDatasource;
}(); ///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
exports.default = FhirDatasourceDatasource;

/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationsQueryCtrl = exports.ConfigCtrl = exports.QueryCtrl = exports.Datasource = undefined;

var _datasource = __webpack_require__(/*! ./datasource */ "./datasource.ts");

var _datasource2 = _interopRequireDefault(_datasource);

var _query_ctrl = __webpack_require__(/*! ./query_ctrl */ "./query_ctrl.ts");

var _annotations_query_ctrl = __webpack_require__(/*! ./annotations_query_ctrl */ "./annotations_query_ctrl.ts");

var _config_ctrl = __webpack_require__(/*! ./config_ctrl */ "./config_ctrl.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Datasource = _datasource2.default;
exports.QueryCtrl = _annotations_query_ctrl.FhirDatasourceAnnotationsQueryCtrl;
exports.ConfigCtrl = _config_ctrl.FhirDatasourceConfigCtrl;
exports.AnnotationsQueryCtrl = _query_ctrl.FhirDatasourceQueryCtrl;

/***/ }),

/***/ "./query_ctrl.ts":
/*!***********************!*\
  !*** ./query_ctrl.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FhirDatasourceQueryCtrl = undefined;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _sdk = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");

__webpack_require__(/*! ./css/query_editor.css */ "./css/query_editor.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

var FhirDatasourceQueryCtrl = /** @class */function (_super) {
    __extends(FhirDatasourceQueryCtrl, _super);
    /** @ngInject **/
    function FhirDatasourceQueryCtrl($scope, $injector) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.defaults = {};
        _lodash2.default.defaultsDeep(_this.target, _this.defaults);
        _this.target.target = _this.target.target || 'select metric';
        _this.target.type = _this.target.type || 'timeserie';
        return _this;
    }
    FhirDatasourceQueryCtrl.prototype.getOptions = function (query) {
        return this.datasource.metricFindQuery(query || '');
    };
    FhirDatasourceQueryCtrl.prototype.onChangeInternal = function () {
        this.panelCtrl.refresh(); // Asks the panel to refresh data.
    };
    FhirDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
    return FhirDatasourceQueryCtrl;
}(_sdk.QueryCtrl);
exports.FhirDatasourceQueryCtrl = FhirDatasourceQueryCtrl;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map