// ==UserScript==
// @name       elevenvr-candlestick
// @namespace  npm/vite-plugin-monkey
// @version    0.1.0
// @author     monkey
// @icon       https://vitejs.dev/logo.svg
// @match      https://elevenvr.net/eleven/*
// @require    https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js
// @require    https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js
// @require    https://cdn.jsdelivr.net/npm/echarts@5.4.2/dist/echarts.min.js
// @require    https://cdn.jsdelivr.net/npm/antd@5.6.3/dist/antd.min.js
// @require    https://cdn.jsdelivr.net/npm/antd@5.6.3/dist/reset.min.css
// @require    https://cdn.jsdelivr.net/npm/mobx@6.9.0/dist/mobx.umd.production.min.js
// ==/UserScript==

(function (React__default, require$$0, antd, mobx, echarts) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const React__default__namespace = /*#__PURE__*/_interopNamespaceDefault(React__default);
  const echarts__namespace = /*#__PURE__*/_interopNamespaceDefault(echarts);

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = React__default, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a)
      m$1.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in a = c.defaultProps, a)
        void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  var client = {};
  var m = require$$0;
  {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  }
  if (!React__default.useState) {
    throw new Error("mobx-react-lite requires React with Hooks support");
  }
  if (!mobx.makeObservable) {
    throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
  }
  function defaultNoopBatch(callback) {
    callback();
  }
  function observerBatching(reactionScheduler) {
    if (!reactionScheduler) {
      reactionScheduler = defaultNoopBatch;
    }
    mobx.configure({ reactionScheduler });
  }
  function printDebugValue(v) {
    return mobx.getDependencyTree(v);
  }
  var REGISTRY_FINALIZE_AFTER = 1e4;
  var REGISTRY_SWEEP_INTERVAL = 1e4;
  var TimerBasedFinalizationRegistry = (
    /** @class */
    function() {
      function TimerBasedFinalizationRegistry2(finalize) {
        var _this = this;
        Object.defineProperty(this, "finalize", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: finalize
        });
        Object.defineProperty(this, "registrations", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: /* @__PURE__ */ new Map()
        });
        Object.defineProperty(this, "sweepTimeout", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "sweep", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: function(maxAge) {
            if (maxAge === void 0) {
              maxAge = REGISTRY_FINALIZE_AFTER;
            }
            clearTimeout(_this.sweepTimeout);
            _this.sweepTimeout = void 0;
            var now = Date.now();
            _this.registrations.forEach(function(registration, token) {
              if (now - registration.registeredAt >= maxAge) {
                _this.finalize(registration.value);
                _this.registrations.delete(token);
              }
            });
            if (_this.registrations.size > 0) {
              _this.scheduleSweep();
            }
          }
        });
        Object.defineProperty(this, "finalizeAllImmediately", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: function() {
            _this.sweep(0);
          }
        });
      }
      Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "register", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, value, token) {
          this.registrations.set(token, {
            value,
            registeredAt: Date.now()
          });
          this.scheduleSweep();
        }
      });
      Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "unregister", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(token) {
          this.registrations.delete(token);
        }
      });
      Object.defineProperty(TimerBasedFinalizationRegistry2.prototype, "scheduleSweep", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function() {
          if (this.sweepTimeout === void 0) {
            this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
          }
        }
      });
      return TimerBasedFinalizationRegistry2;
    }()
  );
  var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry;
  var observerFinalizationRegistry = new UniversalFinalizationRegistry(function(adm) {
    var _a2;
    (_a2 = adm.reaction) === null || _a2 === void 0 ? void 0 : _a2.dispose();
    adm.reaction = null;
  });
  var __read = globalThis && globalThis.__read || function(o, n2) {
    var m2 = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m2)
      return o;
    var i = m2.call(o), r, ar = [], e;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m2 = i["return"]))
          m2.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  function observerComponentNameFor(baseComponentName) {
    return "observer".concat(baseComponentName);
  }
  var ObjectToBeRetainedByReact = (
    /** @class */
    function() {
      function ObjectToBeRetainedByReact2() {
      }
      return ObjectToBeRetainedByReact2;
    }()
  );
  function objectToBeRetainedByReactFactory() {
    return new ObjectToBeRetainedByReact();
  }
  function useObserver(fn, baseComponentName) {
    if (baseComponentName === void 0) {
      baseComponentName = "observed";
    }
    var _a2 = __read(React__default.useState(objectToBeRetainedByReactFactory), 1), objectRetainedByReact = _a2[0];
    var _b = __read(React__default.useState(), 2), setState = _b[1];
    var forceUpdate = function() {
      return setState([]);
    };
    var admRef = React__default.useRef(null);
    if (!admRef.current) {
      admRef.current = {
        reaction: null,
        mounted: false,
        changedBeforeMount: false
      };
    }
    var adm = admRef.current;
    if (!adm.reaction) {
      adm.reaction = new mobx.Reaction(observerComponentNameFor(baseComponentName), function() {
        if (adm.mounted) {
          forceUpdate();
        } else {
          adm.changedBeforeMount = true;
        }
      });
      observerFinalizationRegistry.register(objectRetainedByReact, adm, adm);
    }
    React__default.useDebugValue(adm.reaction, printDebugValue);
    React__default.useEffect(function() {
      observerFinalizationRegistry.unregister(adm);
      adm.mounted = true;
      if (adm.reaction) {
        if (adm.changedBeforeMount) {
          adm.changedBeforeMount = false;
          forceUpdate();
        }
      } else {
        adm.reaction = new mobx.Reaction(observerComponentNameFor(baseComponentName), function() {
          forceUpdate();
        });
        forceUpdate();
      }
      return function() {
        adm.reaction.dispose();
        adm.reaction = null;
        adm.mounted = false;
        adm.changedBeforeMount = false;
      };
    }, []);
    var rendering;
    var exception;
    adm.reaction.track(function() {
      try {
        rendering = fn();
      } catch (e) {
        exception = e;
      }
    });
    if (exception) {
      throw exception;
    }
    return rendering;
  }
  var hasSymbol = typeof Symbol === "function" && Symbol.for;
  var ReactForwardRefSymbol = hasSymbol ? Symbol.for("react.forward_ref") : typeof React__default.forwardRef === "function" && React__default.forwardRef(function(props) {
    return null;
  })["$$typeof"];
  var ReactMemoSymbol = hasSymbol ? Symbol.for("react.memo") : typeof React__default.memo === "function" && React__default.memo(function(props) {
    return null;
  })["$$typeof"];
  function observer$1(baseComponent, options) {
    var _a2;
    if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
      throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
    }
    var useForwardRef = (_a2 = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a2 !== void 0 ? _a2 : false;
    var render = baseComponent;
    var baseComponentName = baseComponent.displayName || baseComponent.name;
    if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
      useForwardRef = true;
      render = baseComponent["render"];
      if (typeof render !== "function") {
        throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
      }
    }
    var observerComponent = function(props, ref) {
      return useObserver(function() {
        return render(props, ref);
      }, baseComponentName);
    };
    if (baseComponentName !== "") {
      observerComponent.displayName = baseComponentName;
    }
    if (baseComponent.contextTypes) {
      observerComponent.contextTypes = baseComponent.contextTypes;
    }
    if (useForwardRef) {
      observerComponent = React__default.forwardRef(observerComponent);
    }
    observerComponent = React__default.memo(observerComponent);
    copyStaticProperties(baseComponent, observerComponent);
    return observerComponent;
  }
  var hoistBlackList = {
    $$typeof: true,
    render: true,
    compare: true,
    type: true,
    // Don't redefine `displayName`,
    // it's defined as getter-setter pair on `memo` (see #3192).
    displayName: true
  };
  function copyStaticProperties(base, target) {
    Object.keys(base).forEach(function(key) {
      if (!hoistBlackList[key]) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
      }
    });
  }
  function useLocalObservable(initializer, annotations) {
    return React__default.useState(function() {
      return mobx.observable(initializer(), annotations, { autoBind: true });
    })[0];
  }
  var _a;
  observerBatching(require$$0.unstable_batchedUpdates);
  (_a = observerFinalizationRegistry["finalizeAllImmediately"]) !== null && _a !== void 0 ? _a : function() {
  };
  var symbolId = 0;
  function createSymbol(name) {
    if (typeof Symbol === "function") {
      return Symbol(name);
    }
    var symbol = "__$mobx-react " + name + " (" + symbolId + ")";
    symbolId++;
    return symbol;
  }
  var createdSymbols = {};
  function newSymbol(name) {
    if (!createdSymbols[name]) {
      createdSymbols[name] = createSymbol(name);
    }
    return createdSymbols[name];
  }
  function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
      return true;
    }
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
      return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (var i = 0; i < keysA.length; i++) {
      if (!Object.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }
    return true;
  }
  function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }
  function setHiddenProp(target, prop, value) {
    if (!Object.hasOwnProperty.call(target, prop)) {
      Object.defineProperty(target, prop, {
        enumerable: false,
        configurable: true,
        writable: true,
        value
      });
    } else {
      target[prop] = value;
    }
  }
  var mobxMixins = /* @__PURE__ */ newSymbol("patchMixins");
  var mobxPatchedDefinition = /* @__PURE__ */ newSymbol("patchedDefinition");
  function getMixins(target, methodName) {
    var mixins = target[mobxMixins] = target[mobxMixins] || {};
    var methodMixins = mixins[methodName] = mixins[methodName] || {};
    methodMixins.locks = methodMixins.locks || 0;
    methodMixins.methods = methodMixins.methods || [];
    return methodMixins;
  }
  function wrapper(realMethod, mixins) {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    mixins.locks++;
    try {
      var retVal;
      if (realMethod !== void 0 && realMethod !== null) {
        retVal = realMethod.apply(this, args);
      }
      return retVal;
    } finally {
      mixins.locks--;
      if (mixins.locks === 0) {
        mixins.methods.forEach(function(mx) {
          mx.apply(_this, args);
        });
      }
    }
  }
  function wrapFunction(realMethod, mixins) {
    var fn = function fn2() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      wrapper.call.apply(wrapper, [this, realMethod, mixins].concat(args));
    };
    return fn;
  }
  function patch(target, methodName, mixinMethod) {
    var mixins = getMixins(target, methodName);
    if (mixins.methods.indexOf(mixinMethod) < 0) {
      mixins.methods.push(mixinMethod);
    }
    var oldDefinition = Object.getOwnPropertyDescriptor(target, methodName);
    if (oldDefinition && oldDefinition[mobxPatchedDefinition]) {
      return;
    }
    var originalMethod = target[methodName];
    var newDefinition = createDefinition(target, methodName, oldDefinition ? oldDefinition.enumerable : void 0, mixins, originalMethod);
    Object.defineProperty(target, methodName, newDefinition);
  }
  function createDefinition(target, methodName, enumerable, mixins, originalMethod) {
    var _ref;
    var wrappedFunc = wrapFunction(originalMethod, mixins);
    return _ref = {}, _ref[mobxPatchedDefinition] = true, _ref.get = function get() {
      return wrappedFunc;
    }, _ref.set = function set(value) {
      if (this === target) {
        wrappedFunc = wrapFunction(value, mixins);
      } else {
        var newDefinition = createDefinition(this, methodName, enumerable, mixins, value);
        Object.defineProperty(this, methodName, newDefinition);
      }
    }, _ref.configurable = true, _ref.enumerable = enumerable, _ref;
  }
  var mobxAdminProperty = mobx.$mobx || "$mobx";
  var mobxObserverProperty = /* @__PURE__ */ newSymbol("isMobXReactObserver");
  var mobxIsUnmounted = /* @__PURE__ */ newSymbol("isUnmounted");
  var skipRenderKey = /* @__PURE__ */ newSymbol("skipRender");
  var isForcingUpdateKey = /* @__PURE__ */ newSymbol("isForcingUpdate");
  function makeClassComponentObserver(componentClass) {
    var target = componentClass.prototype;
    if (componentClass[mobxObserverProperty]) {
      var displayName = getDisplayName(target);
      console.warn("The provided component class (" + displayName + ")\n                has already been declared as an observer component.");
    } else {
      componentClass[mobxObserverProperty] = true;
    }
    if (target.componentWillReact) {
      throw new Error("The componentWillReact life-cycle event is no longer supported");
    }
    if (componentClass["__proto__"] !== React__default.PureComponent) {
      if (!target.shouldComponentUpdate) {
        target.shouldComponentUpdate = observerSCU;
      } else if (target.shouldComponentUpdate !== observerSCU) {
        throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.");
      }
    }
    makeObservableProp(target, "props");
    makeObservableProp(target, "state");
    if (componentClass.contextType) {
      makeObservableProp(target, "context");
    }
    var originalRender = target.render;
    if (typeof originalRender !== "function") {
      var _displayName = getDisplayName(target);
      throw new Error("[mobx-react] class component (" + _displayName + ") is missing `render` method.\n`observer` requires `render` being a function defined on prototype.\n`render = () => {}` or `render = function() {}` is not supported.");
    }
    target.render = function() {
      this.render = createReactiveRender.call(this, originalRender);
      return this.render();
    };
    patch(target, "componentDidMount", function() {
      this[mobxIsUnmounted] = false;
      if (!this.render[mobxAdminProperty]) {
        React__default.Component.prototype.forceUpdate.call(this);
      }
    });
    patch(target, "componentWillUnmount", function() {
      var reaction = this.render[mobxAdminProperty];
      if (reaction) {
        reaction.dispose();
        this.render[mobxAdminProperty] = null;
      } else {
        var _displayName2 = getDisplayName(this);
        console.warn("The reactive render of an observer class component (" + _displayName2 + ")\n                was overridden after MobX attached. This may result in a memory leak if the\n                overridden reactive render was not properly disposed.");
      }
      this[mobxIsUnmounted] = true;
    });
    return componentClass;
  }
  function getDisplayName(comp) {
    return comp.displayName || comp.name || comp.constructor && (comp.constructor.displayName || comp.constructor.name) || "<component>";
  }
  function createReactiveRender(originalRender) {
    var _this = this;
    setHiddenProp(this, skipRenderKey, false);
    setHiddenProp(this, isForcingUpdateKey, false);
    var initialName = getDisplayName(this);
    var boundOriginalRender = originalRender.bind(this);
    var isRenderingPending = false;
    var createReaction = function createReaction2() {
      var reaction = new mobx.Reaction(initialName + ".render()", function() {
        if (!isRenderingPending) {
          isRenderingPending = true;
          if (_this[mobxIsUnmounted] !== true) {
            var hasError = true;
            try {
              setHiddenProp(_this, isForcingUpdateKey, true);
              if (!_this[skipRenderKey]) {
                React__default.Component.prototype.forceUpdate.call(_this);
              }
              hasError = false;
            } finally {
              setHiddenProp(_this, isForcingUpdateKey, false);
              if (hasError) {
                reaction.dispose();
                _this.render[mobxAdminProperty] = null;
              }
            }
          }
        }
      });
      reaction["reactComponent"] = _this;
      return reaction;
    };
    function reactiveRender() {
      var _reactiveRender$mobxA;
      isRenderingPending = false;
      var reaction = (_reactiveRender$mobxA = reactiveRender[mobxAdminProperty]) != null ? _reactiveRender$mobxA : reactiveRender[mobxAdminProperty] = createReaction();
      var exception = void 0;
      var rendering = void 0;
      reaction.track(function() {
        try {
          rendering = mobx._allowStateChanges(false, boundOriginalRender);
        } catch (e) {
          exception = e;
        }
      });
      if (exception) {
        throw exception;
      }
      return rendering;
    }
    return reactiveRender;
  }
  function observerSCU(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return !shallowEqual(this.props, nextProps);
  }
  function makeObservableProp(target, propName) {
    var valueHolderKey = newSymbol("reactProp_" + propName + "_valueHolder");
    var atomHolderKey = newSymbol("reactProp_" + propName + "_atomHolder");
    function getAtom() {
      if (!this[atomHolderKey]) {
        setHiddenProp(this, atomHolderKey, mobx.createAtom("reactive " + propName));
      }
      return this[atomHolderKey];
    }
    Object.defineProperty(target, propName, {
      configurable: true,
      enumerable: true,
      get: function get() {
        var prevReadState = false;
        if (mobx._allowStateReadsStart && mobx._allowStateReadsEnd) {
          prevReadState = mobx._allowStateReadsStart(true);
        }
        getAtom.call(this).reportObserved();
        if (mobx._allowStateReadsStart && mobx._allowStateReadsEnd) {
          mobx._allowStateReadsEnd(prevReadState);
        }
        return this[valueHolderKey];
      },
      set: function set(v) {
        if (!this[isForcingUpdateKey] && !shallowEqual(this[valueHolderKey], v)) {
          setHiddenProp(this, valueHolderKey, v);
          setHiddenProp(this, skipRenderKey, true);
          getAtom.call(this).reportChanged();
          setHiddenProp(this, skipRenderKey, false);
        } else {
          setHiddenProp(this, valueHolderKey, v);
        }
      }
    });
  }
  function observer(component) {
    if (component["isMobxInjector"] === true) {
      console.warn("Mobx observer: You are trying to use `observer` on a component that already has `inject`. Please apply `observer` before applying `inject`");
    }
    if (Object.prototype.isPrototypeOf.call(React__default.Component, component) || Object.prototype.isPrototypeOf.call(React__default.PureComponent, component)) {
      return makeClassComponentObserver(component);
    } else {
      return observer$1(component);
    }
  }
  if (!React__default.Component)
    throw new Error("mobx-react requires React to be available");
  if (!mobx.observable)
    throw new Error("mobx-react requires mobx to be available");
  var IconContext = /* @__PURE__ */ React__default.createContext({});
  const Context = IconContext;
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
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
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i)
            return;
          _n = false;
        } else
          for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
            ;
      } catch (err) {
        _d = true, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
            return;
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n2 = Object.prototype.toString.call(o).slice(8, -1);
    if (n2 === "Object" && o.constructor)
      n2 = o.constructor.name;
    if (n2 === "Map" || n2 === "Set")
      return Array.from(o);
    if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
      return _arrayLikeToArray(o, minLen);
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var classnames = { exports: {} };
  /*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  */
  (function(module) {
    (function() {
      var hasOwn = {}.hasOwnProperty;
      function classNames2() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames2.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
              classes.push(arg.toString());
              continue;
            }
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }
        return classes.join(" ");
      }
      if (module.exports) {
        classNames2.default = classNames2;
        module.exports = classNames2;
      } else {
        window.classNames = classNames2;
      }
    })();
  })(classnames);
  var classnamesExports = classnames.exports;
  const classNames = /* @__PURE__ */ getDefaultExportFromCjs(classnamesExports);
  function bound01(n2, max) {
    if (isOnePointZero(n2)) {
      n2 = "100%";
    }
    var isPercent = isPercentage(n2);
    n2 = max === 360 ? n2 : Math.min(max, Math.max(0, parseFloat(n2)));
    if (isPercent) {
      n2 = parseInt(String(n2 * max), 10) / 100;
    }
    if (Math.abs(n2 - max) < 1e-6) {
      return 1;
    }
    if (max === 360) {
      n2 = (n2 < 0 ? n2 % max + max : n2 % max) / parseFloat(String(max));
    } else {
      n2 = n2 % max / parseFloat(String(max));
    }
    return n2;
  }
  function isOnePointZero(n2) {
    return typeof n2 === "string" && n2.indexOf(".") !== -1 && parseFloat(n2) === 1;
  }
  function isPercentage(n2) {
    return typeof n2 === "string" && n2.indexOf("%") !== -1;
  }
  function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }
    return a;
  }
  function convertToPercentage(n2) {
    if (n2 <= 1) {
      return "".concat(Number(n2) * 100, "%");
    }
    return n2;
  }
  function pad2(c) {
    return c.length === 1 ? "0" + c : String(c);
  }
  function rgbToRgb(r, g, b) {
    return {
      r: bound01(r, 255) * 255,
      g: bound01(g, 255) * 255,
      b: bound01(b, 255) * 255
    };
  }
  function hue2rgb(p2, q2, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p2 + (q2 - p2) * (6 * t);
    }
    if (t < 1 / 2) {
      return q2;
    }
    if (t < 2 / 3) {
      return p2 + (q2 - p2) * (2 / 3 - t) * 6;
    }
    return p2;
  }
  function hslToRgb(h, s, l2) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l2 = bound01(l2, 100);
    if (s === 0) {
      g = l2;
      b = l2;
      r = l2;
    } else {
      var q2 = l2 < 0.5 ? l2 * (1 + s) : l2 + s - l2 * s;
      var p2 = 2 * l2 - q2;
      r = hue2rgb(p2, q2, h + 1 / 3);
      g = hue2rgb(p2, q2, h);
      b = hue2rgb(p2, q2, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, v };
  }
  function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f2 = h - i;
    var p2 = v * (1 - s);
    var q2 = v * (1 - f2 * s);
    var t = v * (1 - (1 - f2) * s);
    var mod = i % 6;
    var r = [v, q2, p2, p2, t, v][mod];
    var g = [t, v, v, q2, p2, p2][mod];
    var b = [p2, p2, t, v, v, q2][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  function rgbToHex(r, g, b, allow3Char) {
    var hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16))
    ];
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
  }
  function parseIntFromHex(val) {
    return parseInt(val, 16);
  }
  var names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
  function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l2 = null;
    var ok = false;
    var format = false;
    if (typeof color === "string") {
      color = stringInputToObject(color);
    }
    if (typeof color === "object") {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        rgb = rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        s = convertToPercentage(color.s);
        v = convertToPercentage(color.v);
        rgb = hsvToRgb(color.h, s, v);
        ok = true;
        format = "hsv";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        s = convertToPercentage(color.s);
        l2 = convertToPercentage(color.l);
        rgb = hslToRgb(color.h, s, l2);
        ok = true;
        format = "hsl";
      }
      if (Object.prototype.hasOwnProperty.call(color, "a")) {
        a = color.a;
      }
    }
    a = boundAlpha(a);
    return {
      ok,
      format: color.format || format,
      r: Math.min(255, Math.max(rgb.r, 0)),
      g: Math.min(255, Math.max(rgb.g, 0)),
      b: Math.min(255, Math.max(rgb.b, 0)),
      a
    };
  }
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
  function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
      return false;
    }
    var named = false;
    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color === "transparent") {
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }
    var match = matchers.rgb.exec(color);
    if (match) {
      return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
      return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
      return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
      return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
      return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
      return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        a: convertHexToDecimal(match[4]),
        format: named ? "name" : "hex8"
      };
    }
    match = matchers.hex6.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        format: named ? "name" : "hex"
      };
    }
    match = matchers.hex4.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1] + match[1]),
        g: parseIntFromHex(match[2] + match[2]),
        b: parseIntFromHex(match[3] + match[3]),
        a: convertHexToDecimal(match[4] + match[4]),
        format: named ? "name" : "hex8"
      };
    }
    match = matchers.hex3.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1] + match[1]),
        g: parseIntFromHex(match[2] + match[2]),
        b: parseIntFromHex(match[3] + match[3]),
        format: named ? "name" : "hex"
      };
    }
    return false;
  }
  function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
  }
  var hueStep = 2;
  var saturationStep = 0.16;
  var saturationStep2 = 0.05;
  var brightnessStep1 = 0.05;
  var brightnessStep2 = 0.15;
  var lightColorCount = 5;
  var darkColorCount = 4;
  var darkColorMap = [{
    index: 7,
    opacity: 0.15
  }, {
    index: 6,
    opacity: 0.25
  }, {
    index: 5,
    opacity: 0.3
  }, {
    index: 5,
    opacity: 0.45
  }, {
    index: 5,
    opacity: 0.65
  }, {
    index: 5,
    opacity: 0.85
  }, {
    index: 4,
    opacity: 0.9
  }, {
    index: 3,
    opacity: 0.95
  }, {
    index: 2,
    opacity: 0.97
  }, {
    index: 1,
    opacity: 0.98
  }];
  function toHsv(_ref) {
    var r = _ref.r, g = _ref.g, b = _ref.b;
    var hsv = rgbToHsv(r, g, b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v
    };
  }
  function toHex(_ref2) {
    var r = _ref2.r, g = _ref2.g, b = _ref2.b;
    return "#".concat(rgbToHex(r, g, b, false));
  }
  function mix(rgb1, rgb2, amount) {
    var p2 = amount / 100;
    var rgb = {
      r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
      g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
      b: (rgb2.b - rgb1.b) * p2 + rgb1.b
    };
    return rgb;
  }
  function getHue(hsv, i, light) {
    var hue;
    if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
      hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
    } else {
      hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return hue;
  }
  function getSaturation(hsv, i, light) {
    if (hsv.h === 0 && hsv.s === 0) {
      return hsv.s;
    }
    var saturation;
    if (light) {
      saturation = hsv.s - saturationStep * i;
    } else if (i === darkColorCount) {
      saturation = hsv.s + saturationStep;
    } else {
      saturation = hsv.s + saturationStep2 * i;
    }
    if (saturation > 1) {
      saturation = 1;
    }
    if (light && i === lightColorCount && saturation > 0.1) {
      saturation = 0.1;
    }
    if (saturation < 0.06) {
      saturation = 0.06;
    }
    return Number(saturation.toFixed(2));
  }
  function getValue(hsv, i, light) {
    var value;
    if (light) {
      value = hsv.v + brightnessStep1 * i;
    } else {
      value = hsv.v - brightnessStep2 * i;
    }
    if (value > 1) {
      value = 1;
    }
    return Number(value.toFixed(2));
  }
  function generate$1(color) {
    var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var patterns = [];
    var pColor = inputToRGB(color);
    for (var i = lightColorCount; i > 0; i -= 1) {
      var hsv = toHsv(pColor);
      var colorString = toHex(inputToRGB({
        h: getHue(hsv, i, true),
        s: getSaturation(hsv, i, true),
        v: getValue(hsv, i, true)
      }));
      patterns.push(colorString);
    }
    patterns.push(toHex(pColor));
    for (var _i = 1; _i <= darkColorCount; _i += 1) {
      var _hsv = toHsv(pColor);
      var _colorString = toHex(inputToRGB({
        h: getHue(_hsv, _i),
        s: getSaturation(_hsv, _i),
        v: getValue(_hsv, _i)
      }));
      patterns.push(_colorString);
    }
    if (opts.theme === "dark") {
      return darkColorMap.map(function(_ref3) {
        var index = _ref3.index, opacity = _ref3.opacity;
        var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || "#141414"), inputToRGB(patterns[index]), opacity * 100));
        return darkColorString;
      });
    }
    return patterns;
  }
  var presetPrimaryColors = {
    red: "#F5222D",
    volcano: "#FA541C",
    orange: "#FA8C16",
    gold: "#FAAD14",
    yellow: "#FADB14",
    lime: "#A0D911",
    green: "#52C41A",
    cyan: "#13C2C2",
    blue: "#1677FF",
    geekblue: "#2F54EB",
    purple: "#722ED1",
    magenta: "#EB2F96",
    grey: "#666666"
  };
  var presetPalettes = {};
  var presetDarkPalettes = {};
  Object.keys(presetPrimaryColors).forEach(function(key) {
    presetPalettes[key] = generate$1(presetPrimaryColors[key]);
    presetPalettes[key].primary = presetPalettes[key][5];
    presetDarkPalettes[key] = generate$1(presetPrimaryColors[key], {
      theme: "dark",
      backgroundColor: "#141414"
    });
    presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
  });
  var red = presetPalettes.red;
  var green = presetPalettes.green;
  var blue = presetPalettes.blue;
  function ownKeys(object2, enumerableOnly) {
    var keys = Object.keys(object2);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object2);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  var warned = {};
  var preMessage = function preMessage2(fn) {
  };
  function warning$1(valid, message) {
  }
  function note(valid, message) {
  }
  function resetWarned() {
    warned = {};
  }
  function call(method, valid, message) {
    if (!valid && !warned[message]) {
      method(false, message);
      warned[message] = true;
    }
  }
  function warningOnce(valid, message) {
    call(warning$1, valid, message);
  }
  function noteOnce(valid, message) {
    call(note, valid, message);
  }
  warningOnce.preMessage = preMessage;
  warningOnce.resetWarned = resetWarned;
  warningOnce.noteOnce = noteOnce;
  function canUseDom() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  }
  function contains(root, n2) {
    if (!root) {
      return false;
    }
    if (root.contains) {
      return root.contains(n2);
    }
    var node = n2;
    while (node) {
      if (node === root) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
  var APPEND_ORDER = "data-rc-order";
  var MARK_KEY = "rc-util-key";
  var containerCache = /* @__PURE__ */ new Map();
  function getMark() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
    if (mark) {
      return mark.startsWith("data-") ? mark : "data-".concat(mark);
    }
    return MARK_KEY;
  }
  function getContainer(option) {
    if (option.attachTo) {
      return option.attachTo;
    }
    var head = document.querySelector("head");
    return head || document.body;
  }
  function getOrder(prepend) {
    if (prepend === "queue") {
      return "prependQueue";
    }
    return prepend ? "prepend" : "append";
  }
  function findStyles(container) {
    return Array.from((containerCache.get(container) || container).children).filter(function(node) {
      return node.tagName === "STYLE";
    });
  }
  function injectCSS(css) {
    var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!canUseDom()) {
      return null;
    }
    var csp = option.csp, prepend = option.prepend;
    var styleNode = document.createElement("style");
    styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
    if (csp !== null && csp !== void 0 && csp.nonce) {
      styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
    }
    styleNode.innerHTML = css;
    var container = getContainer(option);
    var firstChild = container.firstChild;
    if (prepend) {
      if (prepend === "queue") {
        var existStyle = findStyles(container).filter(function(node) {
          return ["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER));
        });
        if (existStyle.length) {
          container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
          return styleNode;
        }
      }
      container.insertBefore(styleNode, firstChild);
    } else {
      container.appendChild(styleNode);
    }
    return styleNode;
  }
  function findExistNode(key) {
    var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var container = getContainer(option);
    return findStyles(container).find(function(node) {
      return node.getAttribute(getMark(option)) === key;
    });
  }
  function syncRealContainer(container, option) {
    var cachedRealContainer = containerCache.get(container);
    if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
      var placeholderStyle = injectCSS("", option);
      var parentNode = placeholderStyle.parentNode;
      containerCache.set(container, parentNode);
      container.removeChild(placeholderStyle);
    }
  }
  function updateCSS(css, key) {
    var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var container = getContainer(option);
    syncRealContainer(container, option);
    var existNode = findExistNode(key, option);
    if (existNode) {
      var _option$csp, _option$csp2;
      if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
        var _option$csp3;
        existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
      }
      if (existNode.innerHTML !== css) {
        existNode.innerHTML = css;
      }
      return existNode;
    }
    var newNode = injectCSS(css, option);
    newNode.setAttribute(getMark(option), key);
    return newNode;
  }
  function getRoot(ele) {
    var _ele$getRootNode;
    return ele === null || ele === void 0 ? void 0 : (_ele$getRootNode = ele.getRootNode) === null || _ele$getRootNode === void 0 ? void 0 : _ele$getRootNode.call(ele);
  }
  function inShadow(ele) {
    return getRoot(ele) !== (ele === null || ele === void 0 ? void 0 : ele.ownerDocument);
  }
  function getShadowRoot(ele) {
    return inShadow(ele) ? getRoot(ele) : null;
  }
  function warning(valid, message) {
    warningOnce(valid, "[@ant-design/icons] ".concat(message));
  }
  function isIconDefinition(target) {
    return _typeof(target) === "object" && typeof target.name === "string" && typeof target.theme === "string" && (_typeof(target.icon) === "object" || typeof target.icon === "function");
  }
  function normalizeAttrs() {
    var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Object.keys(attrs).reduce(function(acc, key) {
      var val = attrs[key];
      switch (key) {
        case "class":
          acc.className = val;
          delete acc.class;
          break;
        default:
          acc[key] = val;
      }
      return acc;
    }, {});
  }
  function generate(node, key, rootProps) {
    if (!rootProps) {
      return /* @__PURE__ */ React__default.createElement(node.tag, _objectSpread2({
        key
      }, normalizeAttrs(node.attrs)), (node.children || []).map(function(child, index) {
        return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
      }));
    }
    return /* @__PURE__ */ React__default.createElement(node.tag, _objectSpread2(_objectSpread2({
      key
    }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function(child, index) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }
  function getSecondaryColor(primaryColor) {
    return generate$1(primaryColor)[0];
  }
  function normalizeTwoToneColors(twoToneColor) {
    if (!twoToneColor) {
      return [];
    }
    return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
  }
  var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
  var useInsertStyles = function useInsertStyles2(eleRef) {
    var _useContext = React__default.useContext(Context), csp = _useContext.csp, prefixCls = _useContext.prefixCls;
    var mergedStyleStr = iconStyles;
    if (prefixCls) {
      mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
    }
    React__default.useEffect(function() {
      var ele = eleRef.current;
      var shadowRoot = getShadowRoot(ele);
      updateCSS(mergedStyleStr, "@ant-design-icons", {
        prepend: true,
        csp,
        attachTo: shadowRoot
      });
    }, []);
  };
  var _excluded$1 = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];
  var twoToneColorPalette = {
    primaryColor: "#333",
    secondaryColor: "#E6E6E6",
    calculated: false
  };
  function setTwoToneColors(_ref) {
    var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
    twoToneColorPalette.primaryColor = primaryColor;
    twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
    twoToneColorPalette.calculated = !!secondaryColor;
  }
  function getTwoToneColors() {
    return _objectSpread2({}, twoToneColorPalette);
  }
  var IconBase = function IconBase2(props) {
    var icon = props.icon, className = props.className, onClick = props.onClick, style = props.style, primaryColor = props.primaryColor, secondaryColor = props.secondaryColor, restProps = _objectWithoutProperties(props, _excluded$1);
    var svgRef = React__default__namespace.useRef();
    var colors = twoToneColorPalette;
    if (primaryColor) {
      colors = {
        primaryColor,
        secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
      };
    }
    useInsertStyles(svgRef);
    warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));
    if (!isIconDefinition(icon)) {
      return null;
    }
    var target = icon;
    if (target && typeof target.icon === "function") {
      target = _objectSpread2(_objectSpread2({}, target), {}, {
        icon: target.icon(colors.primaryColor, colors.secondaryColor)
      });
    }
    return generate(target.icon, "svg-".concat(target.name), _objectSpread2(_objectSpread2({
      className,
      onClick,
      style,
      "data-icon": target.name,
      width: "1em",
      height: "1em",
      fill: "currentColor",
      "aria-hidden": "true"
    }, restProps), {}, {
      ref: svgRef
    }));
  };
  IconBase.displayName = "IconReact";
  IconBase.getTwoToneColors = getTwoToneColors;
  IconBase.setTwoToneColors = setTwoToneColors;
  const ReactIcon = IconBase;
  function setTwoToneColor(twoToneColor) {
    var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
    return ReactIcon.setTwoToneColors({
      primaryColor,
      secondaryColor
    });
  }
  function getTwoToneColor() {
    var colors = ReactIcon.getTwoToneColors();
    if (!colors.calculated) {
      return colors.primaryColor;
    }
    return [colors.primaryColor, colors.secondaryColor];
  }
  var _excluded = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
  setTwoToneColor(blue.primary);
  var Icon = /* @__PURE__ */ React__default__namespace.forwardRef(function(props, ref) {
    var _classNames;
    var className = props.className, icon = props.icon, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, twoToneColor = props.twoToneColor, restProps = _objectWithoutProperties(props, _excluded);
    var _React$useContext = React__default__namespace.useContext(Context), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName;
    var classString = classNames(rootClassName, prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), _defineProperty(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === "loading"), _classNames), className);
    var iconTabIndex = tabIndex;
    if (iconTabIndex === void 0 && onClick) {
      iconTabIndex = -1;
    }
    var svgStyle = rotate ? {
      msTransform: "rotate(".concat(rotate, "deg)"),
      transform: "rotate(".concat(rotate, "deg)")
    } : void 0;
    var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
    return /* @__PURE__ */ React__default__namespace.createElement("span", _extends({
      role: "img",
      "aria-label": icon.name
    }, restProps, {
      ref,
      tabIndex: iconTabIndex,
      onClick,
      className: classString
    }), /* @__PURE__ */ React__default__namespace.createElement(ReactIcon, {
      icon,
      primaryColor,
      secondaryColor,
      style: svgStyle
    }));
  });
  Icon.displayName = "AntdIcon";
  Icon.getTwoToneColor = getTwoToneColor;
  Icon.setTwoToneColor = setTwoToneColor;
  const AntdIcon = Icon;
  var SlidersOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M320 224h-66v-56c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v56h-66c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8h66v56c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8v-56h66c4.4 0 8-3.6 8-8V232c0-4.4-3.6-8-8-8zm-60 508h-80V292h80v440zm644-436h-66v-96c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v96h-66c-4.4 0-8 3.6-8 8v416c0 4.4 3.6 8 8 8h66v96c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8v-96h66c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8zm-60 364h-80V364h80v296zM612 404h-66V232c0-4.4-3.6-8-8-8h-52c-4.4 0-8 3.6-8 8v172h-66c-4.4 0-8 3.6-8 8v200c0 4.4 3.6 8 8 8h66v172c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8V620h66c4.4 0 8-3.6 8-8V412c0-4.4-3.6-8-8-8zm-60 145a3 3 0 01-3 3h-74a3 3 0 01-3-3v-74a3 3 0 013-3h74a3 3 0 013 3v74z" } }] }, "name": "sliders", "theme": "outlined" };
  const SlidersOutlinedSvg = SlidersOutlined$2;
  var SlidersOutlined = function SlidersOutlined2(props, ref) {
    return /* @__PURE__ */ React__default__namespace.createElement(AntdIcon, _extends({}, props, {
      ref,
      icon: SlidersOutlinedSvg
    }));
  };
  const SlidersOutlined$1 = /* @__PURE__ */ React__default__namespace.forwardRef(SlidersOutlined);
  function bind$1(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }
  const { toString } = Object.prototype;
  const { getPrototypeOf } = Object;
  const kindOf = ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };
  const typeOfTest = (type) => (thing) => typeof thing === type;
  const { isArray } = Array;
  const isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  const isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  const isString$1 = typeOfTest("string");
  const isFunction$1 = typeOfTest("function");
  const isNumber = typeOfTest("number");
  const isObject = (thing) => thing !== null && typeof thing === "object";
  const isBoolean = (thing) => thing === true || thing === false;
  const isPlainObject = (val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype2 = getPrototypeOf(val);
    return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };
  const isDate = kindOfTest("Date");
  const isFile = kindOfTest("File");
  const isBlob = kindOfTest("Blob");
  const isFileList = kindOfTest("FileList");
  const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
  const isFormData = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
  };
  const isURLSearchParams = kindOfTest("URLSearchParams");
  const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l2;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l2 = obj.length; i < l2; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    if (typeof globalThis !== "undefined")
      return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  const isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l2 = arguments.length; i < l2; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }
  const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction$1(val)) {
        a[key] = bind$1(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  };
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  const inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null)
      return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  const toArray = (thing) => {
    if (!thing)
      return null;
    if (isArray(thing))
      return thing;
    let i = thing.length;
    if (!isNumber(i))
      return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };
  const isTypedArray = ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  const isHTMLForm = kindOfTest("HTMLFormElement");
  const toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer(m2, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  const isRegExp = kindOfTest("RegExp");
  const reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      if (reducer(descriptor, name, obj) !== false) {
        reducedDescriptors[name] = descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction$1(value))
        return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop = () => {
  };
  const toFiniteNumber = (value, defaultValue) => {
    value = +value;
    return Number.isFinite(value) ? value : defaultValue;
  };
  const ALPHA = "abcdefghijklmnopqrstuvwxyz";
  const DIGIT = "0123456789";
  const ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = "";
    const { length } = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction$1(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  const toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  const isAsyncFn = kindOfTest("AsyncFunction");
  const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
  const utils = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString: isString$1,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction: isFunction$1,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
  utils.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }
  });
  const prototype$1 = AxiosError.prototype;
  const descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype$1, "isAxiosError", { value: true });
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);
    utils.toFlatObject(error, axiosError, function filter2(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  const httpAdapter = null;
  function isVisitable(thing) {
    return utils.isPlainObject(thing) || utils.isArray(thing);
  }
  function removeBrackets(key) {
    return utils.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path)
      return key;
    return path.concat(key).map(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData(obj, formData, options) {
    if (!utils.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new FormData();
    options = utils.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils.isSpecCompliantForm(formData);
    if (!utils.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null)
        return "";
      if (utils.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils.isBlob(value)) {
        throw new AxiosError("Blob is not supported. Use a Buffer instead.");
      }
      if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils.isArray(value) && isFlatArray(value) || (utils.isFileList(value) || utils.endsWith(key, "[]")) && (arr = utils.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils.isUndefined(value))
        return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils.forEach(value, function each(el, key) {
        const result = !(utils.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  function encode$1(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData(params, this, options);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype.toString = function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id2) {
      if (this.handlers[id2]) {
        this.handlers[id2] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }
  const InterceptorManager$1 = InterceptorManager;
  const transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };
  const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
  const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
  const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
  const isStandardBrowserEnv = (() => {
    let product;
    if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
      return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
  })();
  const isStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  const platform = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    isStandardBrowserEnv,
    isStandardBrowserWebWorkerEnv,
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };
  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }
  function parsePropPath(name) {
    return utils.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
      const obj = {};
      utils.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  const DEFAULT_CONTENT_TYPE = {
    "Content-Type": void 0
  };
  function stringifySafely(rawValue, parser, encoder) {
    if (utils.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http"],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils.isObject(data);
      if (isObjectPayload && utils.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils.isFormData(data);
      if (isFormData2) {
        if (!hasJSONContentType) {
          return data;
        }
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (data && utils.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    }
  };
  utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });
  const defaults$1 = defaults;
  const ignoreDuplicateOf = utils.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  const parseHeaders = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };
  const $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
    if (utils.isFunction(filter2)) {
      return filter2.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils.isString(value))
      return;
    if (utils.isString(filter2)) {
      return value.indexOf(filter2) !== -1;
    }
    if (utils.isRegExp(filter2)) {
      return filter2.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils.forEach(this, (value, header) => {
        const key = utils.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype2 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype2, _header);
          accessors[lHeader] = true;
        }
      }
      utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  }
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils.freezeMethods(AxiosHeaders.prototype);
  utils.freezeMethods(AxiosHeaders);
  const AxiosHeaders$1 = AxiosHeaders;
  function transformData(fns, response) {
    const config = this || defaults$1;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;
    utils.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }
  function CanceledError(message, config, request) {
    AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  utils.inherits(CanceledError, AxiosError, {
    __CANCEL__: true
  });
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError(
        "Request failed with status code " + response.status,
        [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }
  const cookies = platform.isStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          const cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }()
  ) : (
    // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }()
  );
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  const isURLSameOrigin = platform.isStandardBrowserEnv ? (
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv2() {
      const msie = /(msie|trident)/i.test(navigator.userAgent);
      const urlParsingNode = document.createElement("a");
      let originURL;
      function resolveURL(url) {
        let href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin2(requestURL) {
        const parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }()
  ) : (
    // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv2() {
      return function isURLSameOrigin2() {
        return true;
      };
    }()
  );
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  function progressEventReducer(listener, isDownloadStream) {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return (e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    };
  }
  const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  const xhrAdapter = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      let requestData = config.data;
      const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
      const responseType = config.responseType;
      let onCanceled;
      function done() {
        if (config.cancelToken) {
          config.cancelToken.unsubscribe(onCanceled);
        }
        if (config.signal) {
          config.signal.removeEventListener("abort", onCanceled);
        }
      }
      if (utils.isFormData(requestData)) {
        if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
          requestHeaders.setContentType(false);
        } else {
          requestHeaders.setContentType("multipart/form-data;", false);
        }
      }
      let request = new XMLHttpRequest();
      if (config.auth) {
        const username = config.auth.username || "";
        const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
        requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
      }
      const fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
      request.timeout = config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders$1.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = config.transitional || transitionalDefaults;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
          config,
          request
        ));
        request = null;
      };
      if (platform.isStandardBrowserEnv) {
        const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = config.responseType;
      }
      if (typeof config.onDownloadProgress === "function") {
        request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
      }
      if (typeof config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
      }
      if (config.cancelToken || config.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        config.cancelToken && config.cancelToken.subscribe(onCanceled);
        if (config.signal) {
          config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(fullPath);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    });
  };
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter
  };
  utils.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  const adapters = {
    getAdapter: (adapters2) => {
      adapters2 = utils.isArray(adapters2) ? adapters2 : [adapters2];
      const { length } = adapters2;
      let nameOrAdapter;
      let adapter;
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters2[i];
        if (adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
          break;
        }
      }
      if (!adapter) {
        if (adapter === false) {
          throw new AxiosError(
            `Adapter ${nameOrAdapter} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          );
        }
        throw new Error(
          utils.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`
        );
      }
      if (!utils.isFunction(adapter)) {
        throw new TypeError("adapter is not a function");
      }
      return adapter;
    },
    adapters: knownAdapters
  };
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders$1.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }
  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
        return utils.merge.call({ caseless }, target, source);
      } else if (utils.isPlainObject(source)) {
        return utils.merge({}, source);
      } else if (utils.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, caseless) {
      if (!utils.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils.isUndefined(a)) {
        return getMergedValue(void 0, a, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };
    utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }
  const VERSION = "1.4.0";
  const validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
  });
  const deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator2 === false) {
        throw new AxiosError(
          formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
          AxiosError.ERR_DEPRECATED
        );
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version + " and will be removed in the near future"
          )
        );
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator2 = schema[opt];
      if (validator2) {
        const value = options[opt];
        const result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
      }
    }
  }
  const validator = {
    assertOptions,
    validators: validators$1
  };
  const validators = validator.validators;
  class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager$1(),
        response: new InterceptorManager$1()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional: transitional2, paramsSerializer, headers } = config;
      if (transitional2 !== void 0) {
        validator.assertOptions(transitional2, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders;
      contextHeaders = headers && utils.merge(
        headers.common,
        headers[config.method]
      );
      contextHeaders && utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  }
  utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  });
  const Axios$1 = Axios;
  class CancelToken {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners)
          return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message, config, request);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  }
  const CancelToken$1 = CancelToken;
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }
  function isAxiosError(payload) {
    return utils.isObject(payload) && payload.isAxiosError === true;
  }
  const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  const HttpStatusCode$1 = HttpStatusCode;
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind$1(Axios$1.prototype.request, context);
    utils.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
    utils.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  const axios = createInstance(defaults$1);
  axios.Axios = Axios$1;
  axios.CanceledError = CanceledError;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData;
  axios.AxiosError = AxiosError;
  axios.Cancel = axios.CanceledError;
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = (thing) => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.HttpStatusCode = HttpStatusCode$1;
  axios.default = axios;
  const axios$1 = axios;
  var lodash = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  lodash.exports;
  (function(module, exports) {
    (function() {
      var undefined$1;
      var VERSION2 = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "Ç": "C",
        "ç": "c",
        "Ð": "D",
        "ð": "d",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "Ñ": "N",
        "ñ": "n",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "Ý": "Y",
        "ý": "y",
        "ÿ": "y",
        "Æ": "Ae",
        "æ": "ae",
        "Þ": "Th",
        "þ": "th",
        "ß": "ss",
        // Latin Extended-A block.
        "Ā": "A",
        "Ă": "A",
        "Ą": "A",
        "ā": "a",
        "ă": "a",
        "ą": "a",
        "Ć": "C",
        "Ĉ": "C",
        "Ċ": "C",
        "Č": "C",
        "ć": "c",
        "ĉ": "c",
        "ċ": "c",
        "č": "c",
        "Ď": "D",
        "Đ": "D",
        "ď": "d",
        "đ": "d",
        "Ē": "E",
        "Ĕ": "E",
        "Ė": "E",
        "Ę": "E",
        "Ě": "E",
        "ē": "e",
        "ĕ": "e",
        "ė": "e",
        "ę": "e",
        "ě": "e",
        "Ĝ": "G",
        "Ğ": "G",
        "Ġ": "G",
        "Ģ": "G",
        "ĝ": "g",
        "ğ": "g",
        "ġ": "g",
        "ģ": "g",
        "Ĥ": "H",
        "Ħ": "H",
        "ĥ": "h",
        "ħ": "h",
        "Ĩ": "I",
        "Ī": "I",
        "Ĭ": "I",
        "Į": "I",
        "İ": "I",
        "ĩ": "i",
        "ī": "i",
        "ĭ": "i",
        "į": "i",
        "ı": "i",
        "Ĵ": "J",
        "ĵ": "j",
        "Ķ": "K",
        "ķ": "k",
        "ĸ": "k",
        "Ĺ": "L",
        "Ļ": "L",
        "Ľ": "L",
        "Ŀ": "L",
        "Ł": "L",
        "ĺ": "l",
        "ļ": "l",
        "ľ": "l",
        "ŀ": "l",
        "ł": "l",
        "Ń": "N",
        "Ņ": "N",
        "Ň": "N",
        "Ŋ": "N",
        "ń": "n",
        "ņ": "n",
        "ň": "n",
        "ŋ": "n",
        "Ō": "O",
        "Ŏ": "O",
        "Ő": "O",
        "ō": "o",
        "ŏ": "o",
        "ő": "o",
        "Ŕ": "R",
        "Ŗ": "R",
        "Ř": "R",
        "ŕ": "r",
        "ŗ": "r",
        "ř": "r",
        "Ś": "S",
        "Ŝ": "S",
        "Ş": "S",
        "Š": "S",
        "ś": "s",
        "ŝ": "s",
        "ş": "s",
        "š": "s",
        "Ţ": "T",
        "Ť": "T",
        "Ŧ": "T",
        "ţ": "t",
        "ť": "t",
        "ŧ": "t",
        "Ũ": "U",
        "Ū": "U",
        "Ŭ": "U",
        "Ů": "U",
        "Ű": "U",
        "Ų": "U",
        "ũ": "u",
        "ū": "u",
        "ŭ": "u",
        "ů": "u",
        "ű": "u",
        "ų": "u",
        "Ŵ": "W",
        "ŵ": "w",
        "Ŷ": "Y",
        "ŷ": "y",
        "Ÿ": "Y",
        "Ź": "Z",
        "Ż": "Z",
        "Ž": "Z",
        "ź": "z",
        "ż": "z",
        "ž": "z",
        "Ĳ": "IJ",
        "ĳ": "ij",
        "Œ": "Oe",
        "œ": "oe",
        "ŉ": "'n",
        "ſ": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = exports && !exports.nodeType && exports;
      var freeModule = freeExports && true && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object2) {
          return object2 == null ? undefined$1 : object2[key];
        };
      }
      function basePropertyOf(object2) {
        return function(key) {
          return object2 == null ? undefined$1 : object2[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined$1) {
            result = result === undefined$1 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n2, iteratee) {
        var index = -1, result = Array(n2);
        while (++index < n2) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object2, props) {
        return arrayMap(props, function(key) {
          return [key, object2[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object2, props) {
        return arrayMap(props, function(key) {
          return object2[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue2(object2, key) {
        return object2 == null ? undefined$1 : object2[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root : _2.defaults(root.Object(), context, _2.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty2 = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$1;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap && new WeakMap();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
        function lodash2(value) {
          if (isObjectLike(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty2.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = function() {
          function object2() {
          }
          return function(proto) {
            if (!isObject2(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object2.prototype = proto;
            var result2 = new object2();
            object2.prototype = undefined$1;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined$1;
        }
        lodash2.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash2
          }
        };
        lodash2.prototype = baseLodash.prototype;
        lodash2.prototype.constructor = lodash2;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined$1 : result2;
          }
          return hasOwnProperty2.call(data, key) ? data[key] : undefined$1;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined$1 : hasOwnProperty2.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined$1 : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined$1;
        }
        function arraySampleSize(array, n2) {
          return shuffleSelf(copyArray(array), baseClamp(n2, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object2, key, value) {
          if (value !== undefined$1 && !eq(object2[key], value) || value === undefined$1 && !(key in object2)) {
            baseAssignValue(object2, key, value);
          }
        }
        function assignValue(object2, key, value) {
          var objValue = object2[key];
          if (!(hasOwnProperty2.call(object2, key) && eq(objValue, value)) || value === undefined$1 && !(key in object2)) {
            baseAssignValue(object2, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object2, source) {
          return object2 && copyObject(source, keys(source), object2);
        }
        function baseAssignIn(object2, source) {
          return object2 && copyObject(source, keysIn(source), object2);
        }
        function baseAssignValue(object2, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object2, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object2[key] = value;
          }
        }
        function baseAt(object2, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object2 == null;
          while (++index < length) {
            result2[index] = skip ? undefined$1 : get(object2, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined$1) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined$1) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object2, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object2 ? customizer(value, key, object2, stack) : customizer(value);
          }
          if (result2 !== undefined$1) {
            return result2;
          }
          if (!isObject2(value)) {
            return value;
          }
          var isArr = isArray2(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer2(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object2) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object2 ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined$1 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object2) {
            return baseConformsTo(object2, source, props);
          };
        }
        function baseConformsTo(object2, source, props) {
          var length = props.length;
          if (object2 == null) {
            return !length;
          }
          object2 = Object2(object2);
          while (length--) {
            var key = props[length], predicate = source[key], value = object2[key];
            if (value === undefined$1 && !(key in object2) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined$1, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined$1 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object2, iteratee2) {
          return object2 && baseFor(object2, iteratee2, keys);
        }
        function baseForOwnRight(object2, iteratee2) {
          return object2 && baseForRight(object2, iteratee2, keys);
        }
        function baseFunctions(object2, props) {
          return arrayFilter(props, function(key) {
            return isFunction2(object2[key]);
          });
        }
        function baseGet(object2, path) {
          path = castPath(path, object2);
          var index = 0, length = path.length;
          while (object2 != null && index < length) {
            object2 = object2[toKey(path[index++])];
          }
          return index && index == length ? object2 : undefined$1;
        }
        function baseGetAllKeys(object2, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object2);
          return isArray2(object2) ? result2 : arrayPush(result2, symbolsFunc(object2));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined$1 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object2, key) {
          return object2 != null && hasOwnProperty2.call(object2, key);
        }
        function baseHasIn(object2, key) {
          return object2 != null && key in Object2(object2);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object2, setter, iteratee2, accumulator) {
          baseForOwn(object2, function(value, key, object3) {
            setter(accumulator, iteratee2(value), key, object3);
          });
          return accumulator;
        }
        function baseInvoke(object2, path, args) {
          path = castPath(path, object2);
          object2 = parent(object2, path);
          var func = object2 == null ? object2 : object2[toKey(last(path))];
          return func == null ? undefined$1 : apply(func, object2, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object2, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray2(object2), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object2), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer2(object2)) {
            if (!isBuffer2(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray2(object2) ? equalArrays(object2, other, bitmask, customizer, equalFunc, stack) : equalByTag(object2, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty2.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object2, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object2, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object2 == null) {
            return !length;
          }
          object2 = Object2(object2);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object2[data[0]] : !(data[0] in object2)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object2[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined$1 && !(key in object2)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object2, source, stack);
              }
              if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject2(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object2) {
          if (!isPrototype(object2)) {
            return nativeKeys(object2);
          }
          var result2 = [];
          for (var key in Object2(object2)) {
            if (hasOwnProperty2.call(object2, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object2) {
          if (!isObject2(object2)) {
            return nativeKeysIn(object2);
          }
          var isProto = isPrototype(object2), result2 = [];
          for (var key in object2) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object2, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object2) {
            return object2 === source || baseIsMatch(object2, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object2) {
            var objValue = get(object2, path);
            return objValue === undefined$1 && objValue === srcValue ? hasIn(object2, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object2, source, srcIndex, customizer, stack) {
          if (object2 === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject2(srcValue)) {
              baseMergeDeep(object2, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object2, key), srcValue, key + "", object2, source, stack) : undefined$1;
              if (newValue === undefined$1) {
                newValue = srcValue;
              }
              assignMergeValue(object2, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object2, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object2, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object2, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object2, source, stack) : undefined$1;
          var isCommon = newValue === undefined$1;
          if (isCommon) {
            var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer2(srcValue), isTyped = !isArr && !isBuff && isTypedArray2(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray2(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject2(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject2(objValue) || isFunction2(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object2, key, newValue);
        }
        function baseNth(array, n2) {
          var length = array.length;
          if (!length) {
            return;
          }
          n2 += n2 < 0 ? length : 0;
          return isIndex(n2, length) ? array[n2] : undefined$1;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray2(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object2, other) {
            return compareMultiple(object2, other, orders);
          });
        }
        function basePick(object2, paths) {
          return basePickBy(object2, paths, function(value, path) {
            return hasIn(object2, path);
          });
        }
        function basePickBy(object2, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object2, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object2), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object2) {
            return baseGet(object2, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n2) {
          var result2 = "";
          if (!string || n2 < 1 || n2 > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n2 % 2) {
              result2 += string;
            }
            n2 = nativeFloor(n2 / 2);
            if (n2) {
              string += string;
            }
          } while (n2);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n2) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n2, 0, array.length));
        }
        function baseSet(object2, path, value, customizer) {
          if (!isObject2(object2)) {
            return object2;
          }
          path = castPath(path, object2);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object2;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object2;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
              if (newValue === undefined$1) {
                newValue = isObject2(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object2;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant2(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray2(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object2, path) {
          path = castPath(path, object2);
          object2 = parent(object2, path);
          return object2 == null || delete object2[toKey(last(path))];
        }
        function baseUpdate(object2, path, updater, customizer) {
          return baseSet(object2, path, updater(baseGet(object2, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined$1;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object2) {
          if (isArray2(value)) {
            return value;
          }
          return isKey(value, object2) ? [value] : stringToPath(toString3(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined$1 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout2 = ctxClearTimeout || function(id2) {
          return root.clearTimeout(id2);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object2, other, orders) {
          var index = -1, objCriteria = object2.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object2.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object2, customizer) {
          var isNew = !object2;
          object2 || (object2 = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : undefined$1;
            if (newValue === undefined$1) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object2, key, newValue);
            } else {
              assignValue(object2, key, newValue);
            }
          }
          return object2;
        }
        function copySymbols(source, object2) {
          return copyObject(source, getSymbols(source), object2);
        }
        function copySymbolsIn(source, object2) {
          return copyObject(source, getSymbolsIn(source), object2);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object2, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined$1 : customizer;
              length = 1;
            }
            object2 = Object2(object2);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object2, source, index, customizer);
              }
            }
            return object2;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object2, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object2), props = keysFunc(object2), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object2;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper2() {
            var fn = this && this !== root && this instanceof wrapper2 ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper2;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString3(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject2(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper2() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper2);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper2.placeholder,
                undefined$1,
                args,
                holders,
                undefined$1,
                undefined$1,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper2 ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper2;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper2 && getFuncName(func) == "wrapper") {
                var wrapper2 = new LodashWrapper([], true);
              }
            }
            index = wrapper2 ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper2 = wrapper2[getFuncName(data[0])].apply(wrapper2, data[3]);
              } else {
                wrapper2 = func.length == 1 && isLaziable(func) ? wrapper2[funcName]() : wrapper2.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper2 && args.length == 1 && isArray2(value)) {
                return wrapper2.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
          function wrapper2() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper2), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper2.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper2) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper2;
        }
        function createInverter(setter, toIteratee) {
          return function(object2, iteratee2) {
            return baseInverter(object2, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined$1 && other === undefined$1) {
              return defaultValue;
            }
            if (value !== undefined$1) {
              result2 = value;
            }
            if (other !== undefined$1) {
              if (result2 === undefined$1) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined$1 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper2() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper2 ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper2;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined$1;
            }
            start = toFinite(start);
            if (end === undefined$1) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined$1, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString3(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString3(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop2 : function(values2) {
          return new Set(values2);
        };
        function createToPairs(keysFunc) {
          return function(object2) {
            var tag = getTag(object2);
            if (tag == mapTag) {
              return mapToArray(object2);
            }
            if (tag == setTag) {
              return setToPairs(object2);
            }
            return baseToPairs(object2, keysFunc(object2));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined$1;
          }
          ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined$1 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined$1;
          }
          var data = isBindKey ? undefined$1 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined$1, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object2) {
          if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty2.call(object2, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object2, source, stack) {
          if (isObject2(objValue) && isObject2(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject2(value) ? undefined$1 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined$1) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object2, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
                return false;
              }
              object2 = object2.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object2.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object2), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object2, +other);
            case errorTag:
              return object2.name == other.name && object2.message == other.message;
            case regexpTag:
            case stringTag:
              return object2 == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object2.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object2);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object2, other);
              var result2 = equalArrays(convert(object2), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object2);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object2) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object2, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object2), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object2);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object2;
          }
          var result2 = true;
          stack.set(object2, other);
          stack.set(other, object2);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object2[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object2, stack) : customizer(objValue, othValue, key, object2, other, stack);
            }
            if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object2.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object2);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined$1, flatten), func + "");
        }
        function getAllKeys(object2) {
          return baseGetAllKeys(object2, keys, getSymbols);
        }
        function getAllKeysIn(object2) {
          return baseGetAllKeys(object2, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop2 : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty2.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object2 = hasOwnProperty2.call(lodash2, "placeholder") ? lodash2 : func;
          return object2.placeholder;
        }
        function getIteratee() {
          var result2 = lodash2.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object2) {
          var result2 = keys(object2), length = result2.length;
          while (length--) {
            var key = result2[length], value = object2[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object2, key) {
          var value = getValue2(object2, key);
          return baseIsNative(value) ? value : undefined$1;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined$1;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object2) {
          if (object2 == null) {
            return [];
          }
          object2 = Object2(object2);
          return arrayFilter(nativeGetSymbols(object2), function(symbol) {
            return propertyIsEnumerable.call(object2, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object2) {
          var result2 = [];
          while (object2) {
            arrayPush(result2, getSymbols(object2));
            object2 = getPrototype(object2);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object2, path, hasFunc) {
          path = castPath(path, object2);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object2 != null && hasFunc(object2, key))) {
              break;
            }
            object2 = object2[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object2 == null ? 0 : object2.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray2(object2) || isArguments(object2));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object2) {
          return typeof object2.constructor == "function" && !isPrototype(object2) ? baseCreate(getPrototype(object2)) : {};
        }
        function initCloneByTag(object2, tag, isDeep) {
          var Ctor = object2.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object2);
            case boolTag:
            case dateTag:
              return new Ctor(+object2);
            case dataViewTag:
              return cloneDataView(object2, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object2, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object2);
            case regexpTag:
              return cloneRegExp(object2);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object2);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray2(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object2) {
          if (!isObject2(object2)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object2) && isIndex(index, object2.length) : type == "string" && index in object2) {
            return eq(object2[index], value);
          }
          return false;
        }
        function isKey(value, object2) {
          if (isArray2(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object2 != null && value in Object2(object2);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash2[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction2 : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject2(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object2) {
            if (object2 == null) {
              return false;
            }
            return object2[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object2));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object2) {
          var result2 = [];
          if (object2 != null) {
            for (var key in Object2(object2)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object2, path) {
          return path.length < 2 ? object2 : baseGet(object2, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
          }
          return array;
        }
        function safeGet(object2, key) {
          if (key === "constructor" && typeof object2[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object2[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper2, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper2, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined$1, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined$1 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper2) {
          if (wrapper2 instanceof LazyWrapper) {
            return wrapper2.clone();
          }
          var result2 = new LodashWrapper(wrapper2.__wrapped__, wrapper2.__chain__);
          result2.__actions__ = copyArray(wrapper2.__actions__);
          result2.__index__ = wrapper2.__index__;
          result2.__values__ = wrapper2.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray2(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined$1;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
        });
        function drop(array, n2, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
          return baseSlice(array, n2 < 0 ? 0 : n2, length);
        }
        function dropRight(array, n2, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
          n2 = length - n2;
          return baseSlice(array, 0, n2 < 0 ? 0 : n2);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined$1) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined$1;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined$1;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined$1;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined$1) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n2) {
          return array && array.length ? baseNth(array, toInteger(n2)) : undefined$1;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$1, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined$1 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n2, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
          return baseSlice(array, 0, n2 < 0 ? 0 : n2);
        }
        function takeRight(array, n2, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n2 = guard || n2 === undefined$1 ? 1 : toInteger(n2);
          n2 = length - n2;
          return baseSlice(array, n2 < 0 ? 0 : n2, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined$1, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash2(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object2) {
            return baseAt(object2, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined$1
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined$1);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined$1) {
            this.__values__ = toArray2(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined$1;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined$1
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray2(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter2(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach2(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray2(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray2(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined$1 : orders;
          if (!isArray2(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray2(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n2, guard) {
          if (guard ? isIterateeCall(collection, n2, guard) : n2 === undefined$1) {
            n2 = 1;
          } else {
            n2 = toInteger(n2);
          }
          var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n2);
        }
        function shuffle(collection) {
          var func = isArray2(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray2(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n2, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n2 = toInteger(n2);
          return function() {
            if (--n2 < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n2, guard) {
          n2 = guard ? undefined$1 : n2;
          n2 = func && n2 == null ? func.length : n2;
          return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n2);
        }
        function before(n2, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n2 = toInteger(n2);
          return function() {
            if (--n2 > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n2 <= 1) {
              func = undefined$1;
            }
            return result2;
          };
        }
        var bind3 = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind3));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object2, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object2, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce2(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject2(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined$1;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined$1;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined$1;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined$1) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined$1;
          }
          function flush() {
            return timerId === undefined$1 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined$1) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined$1) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined$1 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread2(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject2(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce2(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper2) {
          return partial(castFunction(wrapper2), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray2(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object2, source) {
          return source == null || baseConformsTo(object2, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray2 = Array2.isArray;
        var isArrayBuffer2 = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction2(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean2(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer2 = nativeIsBuffer || stubFalse;
        var isDate2 = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject2(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer2(value) || isTypedArray2(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty2.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual2(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          var result2 = customizer ? customizer(value, other) : undefined$1;
          return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject2(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction2(value) {
          if (!isObject2(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject2(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object2, source) {
          return object2 === source || baseIsMatch(object2, source, getMatchData(source));
        }
        function isMatchWith(object2, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseIsMatch(object2, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber2(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber2(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject2(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp2 = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString2(value) {
          return typeof value == "string" || !isArray2(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined2(value) {
          return value === undefined$1;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray2(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString2(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject2(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject2(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString3(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object2, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object2);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty2.call(source, key)) {
              assignValue(object2, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object2, source) {
          copyObject(source, keysIn(source), object2);
        });
        var assignInWith = createAssigner(function(object2, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object2, customizer);
        });
        var assignWith = createAssigner(function(object2, source, srcIndex, customizer) {
          copyObject(source, keys(source), object2, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype2, properties) {
          var result2 = baseCreate(prototype2);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults2 = baseRest(function(object2, sources) {
          object2 = Object2(object2);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object2[key];
              if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty2.call(object2, key)) {
                object2[key] = source[key];
              }
            }
          }
          return object2;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined$1, customDefaultsMerge);
          return apply(mergeWith, undefined$1, args);
        });
        function findKey2(object2, predicate) {
          return baseFindKey(object2, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object2, predicate) {
          return baseFindKey(object2, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object2, iteratee2) {
          return object2 == null ? object2 : baseFor(object2, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object2, iteratee2) {
          return object2 == null ? object2 : baseForRight(object2, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object2, iteratee2) {
          return object2 && baseForOwn(object2, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object2, iteratee2) {
          return object2 && baseForOwnRight(object2, getIteratee(iteratee2, 3));
        }
        function functions(object2) {
          return object2 == null ? [] : baseFunctions(object2, keys(object2));
        }
        function functionsIn(object2) {
          return object2 == null ? [] : baseFunctions(object2, keysIn(object2));
        }
        function get(object2, path, defaultValue) {
          var result2 = object2 == null ? undefined$1 : baseGet(object2, path);
          return result2 === undefined$1 ? defaultValue : result2;
        }
        function has(object2, path) {
          return object2 != null && hasPath(object2, path, baseHas);
        }
        function hasIn(object2, path) {
          return object2 != null && hasPath(object2, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant2(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty2.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object2) {
          return isArrayLike(object2) ? arrayLikeKeys(object2) : baseKeys(object2);
        }
        function keysIn(object2) {
          return isArrayLike(object2) ? arrayLikeKeys(object2, true) : baseKeysIn(object2);
        }
        function mapKeys(object2, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object2, function(value, key, object3) {
            baseAssignValue(result2, iteratee2(value, key, object3), value);
          });
          return result2;
        }
        function mapValues(object2, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object2, function(value, key, object3) {
            baseAssignValue(result2, key, iteratee2(value, key, object3));
          });
          return result2;
        }
        var merge2 = createAssigner(function(object2, source, srcIndex) {
          baseMerge(object2, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object2, source, srcIndex, customizer) {
          baseMerge(object2, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object2, paths) {
          var result2 = {};
          if (object2 == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object2);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object2, getAllKeysIn(object2), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object2, predicate) {
          return pickBy(object2, negate(getIteratee(predicate)));
        }
        var pick2 = flatRest(function(object2, paths) {
          return object2 == null ? {} : basePick(object2, paths);
        });
        function pickBy(object2, predicate) {
          if (object2 == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object2), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object2, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object2, path, defaultValue) {
          path = castPath(path, object2);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object2 = undefined$1;
          }
          while (++index < length) {
            var value = object2 == null ? undefined$1 : object2[toKey(path[index])];
            if (value === undefined$1) {
              index = length;
              value = defaultValue;
            }
            object2 = isFunction2(value) ? value.call(object2) : value;
          }
          return object2;
        }
        function set(object2, path, value) {
          return object2 == null ? object2 : baseSet(object2, path, value);
        }
        function setWith(object2, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object2 == null ? object2 : baseSet(object2, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object2, iteratee2, accumulator) {
          var isArr = isArray2(object2), isArrLike = isArr || isBuffer2(object2) || isTypedArray2(object2);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object2 && object2.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject2(object2)) {
              accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object2)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object2, function(value, index, object3) {
            return iteratee2(accumulator, value, index, object3);
          });
          return accumulator;
        }
        function unset(object2, path) {
          return object2 == null ? true : baseUnset(object2, path);
        }
        function update(object2, path, updater) {
          return object2 == null ? object2 : baseUpdate(object2, path, castFunction(updater));
        }
        function updateWith(object2, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object2 == null ? object2 : baseUpdate(object2, path, castFunction(updater), customizer);
        }
        function values(object2) {
          return object2 == null ? [] : baseValues(object2, keys(object2));
        }
        function valuesIn(object2) {
          return object2 == null ? [] : baseValues(object2, keysIn(object2));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined$1) {
            upper = lower;
            lower = undefined$1;
          }
          if (upper !== undefined$1) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined$1) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined$1;
          }
          if (floating === undefined$1) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined$1;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined$1;
            }
          }
          if (lower === undefined$1 && upper === undefined$1) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined$1) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString3(string).toLowerCase());
        }
        function deburr(string) {
          string = toString3(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith2(string, target, position) {
          string = toString3(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString3(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString3(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString3(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString3(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString3(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString3(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n2, guard) {
          if (guard ? isIterateeCall(string, n2, guard) : n2 === undefined$1) {
            n2 = 1;
          } else {
            n2 = toInteger(n2);
          }
          return baseRepeat(toString3(string), n2);
        }
        function replace() {
          var args = arguments, string = toString3(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined$1;
          }
          limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString3(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp2(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString3(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash2.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined$1;
          }
          string = toString3(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty2.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString3(value).toLowerCase();
        }
        function toUpper(value) {
          return toString3(value).toUpperCase();
        }
        function trim2(string, chars, guard) {
          string = toString3(string);
          if (string && (guard || chars === undefined$1)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString3(string);
          if (string && (guard || chars === undefined$1)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString3(string);
          if (string && (guard || chars === undefined$1)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject2(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString3(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined$1) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp2(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString3(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape2(string) {
          string = toString3(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString3(string);
          pattern = guard ? undefined$1 : pattern;
          if (pattern === undefined$1) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined$1, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object2, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object2, key, bind3(object2[key], object2));
          });
          return object2;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant2(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args) {
          return function(object2) {
            return baseInvoke(object2, path, args);
          };
        });
        var methodOf = baseRest(function(object2, args) {
          return function(path) {
            return baseInvoke(object2, path, args);
          };
        });
        function mixin(object2, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object2;
            object2 = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object2);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object2[methodName] = func;
            if (isFunc) {
              object2.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object2(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object2 });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object2, arrayPush([this.value()], arguments));
              };
            }
          });
          return object2;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop2() {
        }
        function nthArg(n2) {
          n2 = toInteger(n2);
          return baseRest(function(args) {
            return baseNth(args, n2);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object2) {
          return function(path) {
            return object2 == null ? undefined$1 : baseGet(object2, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n2, iteratee2) {
          n2 = toInteger(n2);
          if (n2 < 1 || n2 > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n2, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n2 -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n2) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray2(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString3(value)));
        }
        function uniqueId(prefix) {
          var id2 = ++idCounter;
          return toString3(prefix) + id2;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash2.after = after;
        lodash2.ary = ary;
        lodash2.assign = assign;
        lodash2.assignIn = assignIn;
        lodash2.assignInWith = assignInWith;
        lodash2.assignWith = assignWith;
        lodash2.at = at;
        lodash2.before = before;
        lodash2.bind = bind3;
        lodash2.bindAll = bindAll;
        lodash2.bindKey = bindKey;
        lodash2.castArray = castArray;
        lodash2.chain = chain;
        lodash2.chunk = chunk;
        lodash2.compact = compact;
        lodash2.concat = concat;
        lodash2.cond = cond;
        lodash2.conforms = conforms;
        lodash2.constant = constant2;
        lodash2.countBy = countBy;
        lodash2.create = create;
        lodash2.curry = curry;
        lodash2.curryRight = curryRight;
        lodash2.debounce = debounce2;
        lodash2.defaults = defaults2;
        lodash2.defaultsDeep = defaultsDeep;
        lodash2.defer = defer;
        lodash2.delay = delay;
        lodash2.difference = difference;
        lodash2.differenceBy = differenceBy;
        lodash2.differenceWith = differenceWith;
        lodash2.drop = drop;
        lodash2.dropRight = dropRight;
        lodash2.dropRightWhile = dropRightWhile;
        lodash2.dropWhile = dropWhile;
        lodash2.fill = fill;
        lodash2.filter = filter2;
        lodash2.flatMap = flatMap;
        lodash2.flatMapDeep = flatMapDeep;
        lodash2.flatMapDepth = flatMapDepth;
        lodash2.flatten = flatten;
        lodash2.flattenDeep = flattenDeep;
        lodash2.flattenDepth = flattenDepth;
        lodash2.flip = flip;
        lodash2.flow = flow;
        lodash2.flowRight = flowRight;
        lodash2.fromPairs = fromPairs;
        lodash2.functions = functions;
        lodash2.functionsIn = functionsIn;
        lodash2.groupBy = groupBy;
        lodash2.initial = initial;
        lodash2.intersection = intersection;
        lodash2.intersectionBy = intersectionBy;
        lodash2.intersectionWith = intersectionWith;
        lodash2.invert = invert;
        lodash2.invertBy = invertBy;
        lodash2.invokeMap = invokeMap;
        lodash2.iteratee = iteratee;
        lodash2.keyBy = keyBy;
        lodash2.keys = keys;
        lodash2.keysIn = keysIn;
        lodash2.map = map;
        lodash2.mapKeys = mapKeys;
        lodash2.mapValues = mapValues;
        lodash2.matches = matches;
        lodash2.matchesProperty = matchesProperty;
        lodash2.memoize = memoize;
        lodash2.merge = merge2;
        lodash2.mergeWith = mergeWith;
        lodash2.method = method;
        lodash2.methodOf = methodOf;
        lodash2.mixin = mixin;
        lodash2.negate = negate;
        lodash2.nthArg = nthArg;
        lodash2.omit = omit;
        lodash2.omitBy = omitBy;
        lodash2.once = once;
        lodash2.orderBy = orderBy;
        lodash2.over = over;
        lodash2.overArgs = overArgs;
        lodash2.overEvery = overEvery;
        lodash2.overSome = overSome;
        lodash2.partial = partial;
        lodash2.partialRight = partialRight;
        lodash2.partition = partition;
        lodash2.pick = pick2;
        lodash2.pickBy = pickBy;
        lodash2.property = property;
        lodash2.propertyOf = propertyOf;
        lodash2.pull = pull;
        lodash2.pullAll = pullAll;
        lodash2.pullAllBy = pullAllBy;
        lodash2.pullAllWith = pullAllWith;
        lodash2.pullAt = pullAt;
        lodash2.range = range;
        lodash2.rangeRight = rangeRight;
        lodash2.rearg = rearg;
        lodash2.reject = reject;
        lodash2.remove = remove;
        lodash2.rest = rest;
        lodash2.reverse = reverse;
        lodash2.sampleSize = sampleSize;
        lodash2.set = set;
        lodash2.setWith = setWith;
        lodash2.shuffle = shuffle;
        lodash2.slice = slice;
        lodash2.sortBy = sortBy;
        lodash2.sortedUniq = sortedUniq;
        lodash2.sortedUniqBy = sortedUniqBy;
        lodash2.split = split;
        lodash2.spread = spread2;
        lodash2.tail = tail;
        lodash2.take = take;
        lodash2.takeRight = takeRight;
        lodash2.takeRightWhile = takeRightWhile;
        lodash2.takeWhile = takeWhile;
        lodash2.tap = tap;
        lodash2.throttle = throttle;
        lodash2.thru = thru;
        lodash2.toArray = toArray2;
        lodash2.toPairs = toPairs;
        lodash2.toPairsIn = toPairsIn;
        lodash2.toPath = toPath;
        lodash2.toPlainObject = toPlainObject;
        lodash2.transform = transform;
        lodash2.unary = unary;
        lodash2.union = union;
        lodash2.unionBy = unionBy;
        lodash2.unionWith = unionWith;
        lodash2.uniq = uniq;
        lodash2.uniqBy = uniqBy;
        lodash2.uniqWith = uniqWith;
        lodash2.unset = unset;
        lodash2.unzip = unzip;
        lodash2.unzipWith = unzipWith;
        lodash2.update = update;
        lodash2.updateWith = updateWith;
        lodash2.values = values;
        lodash2.valuesIn = valuesIn;
        lodash2.without = without;
        lodash2.words = words;
        lodash2.wrap = wrap;
        lodash2.xor = xor;
        lodash2.xorBy = xorBy;
        lodash2.xorWith = xorWith;
        lodash2.zip = zip;
        lodash2.zipObject = zipObject;
        lodash2.zipObjectDeep = zipObjectDeep;
        lodash2.zipWith = zipWith;
        lodash2.entries = toPairs;
        lodash2.entriesIn = toPairsIn;
        lodash2.extend = assignIn;
        lodash2.extendWith = assignInWith;
        mixin(lodash2, lodash2);
        lodash2.add = add;
        lodash2.attempt = attempt;
        lodash2.camelCase = camelCase;
        lodash2.capitalize = capitalize;
        lodash2.ceil = ceil;
        lodash2.clamp = clamp;
        lodash2.clone = clone;
        lodash2.cloneDeep = cloneDeep;
        lodash2.cloneDeepWith = cloneDeepWith;
        lodash2.cloneWith = cloneWith;
        lodash2.conformsTo = conformsTo;
        lodash2.deburr = deburr;
        lodash2.defaultTo = defaultTo;
        lodash2.divide = divide;
        lodash2.endsWith = endsWith2;
        lodash2.eq = eq;
        lodash2.escape = escape;
        lodash2.escapeRegExp = escapeRegExp;
        lodash2.every = every;
        lodash2.find = find;
        lodash2.findIndex = findIndex;
        lodash2.findKey = findKey2;
        lodash2.findLast = findLast;
        lodash2.findLastIndex = findLastIndex;
        lodash2.findLastKey = findLastKey;
        lodash2.floor = floor;
        lodash2.forEach = forEach2;
        lodash2.forEachRight = forEachRight;
        lodash2.forIn = forIn;
        lodash2.forInRight = forInRight;
        lodash2.forOwn = forOwn;
        lodash2.forOwnRight = forOwnRight;
        lodash2.get = get;
        lodash2.gt = gt;
        lodash2.gte = gte;
        lodash2.has = has;
        lodash2.hasIn = hasIn;
        lodash2.head = head;
        lodash2.identity = identity;
        lodash2.includes = includes;
        lodash2.indexOf = indexOf;
        lodash2.inRange = inRange;
        lodash2.invoke = invoke;
        lodash2.isArguments = isArguments;
        lodash2.isArray = isArray2;
        lodash2.isArrayBuffer = isArrayBuffer2;
        lodash2.isArrayLike = isArrayLike;
        lodash2.isArrayLikeObject = isArrayLikeObject;
        lodash2.isBoolean = isBoolean2;
        lodash2.isBuffer = isBuffer2;
        lodash2.isDate = isDate2;
        lodash2.isElement = isElement;
        lodash2.isEmpty = isEmpty;
        lodash2.isEqual = isEqual2;
        lodash2.isEqualWith = isEqualWith;
        lodash2.isError = isError;
        lodash2.isFinite = isFinite;
        lodash2.isFunction = isFunction2;
        lodash2.isInteger = isInteger;
        lodash2.isLength = isLength;
        lodash2.isMap = isMap;
        lodash2.isMatch = isMatch;
        lodash2.isMatchWith = isMatchWith;
        lodash2.isNaN = isNaN2;
        lodash2.isNative = isNative;
        lodash2.isNil = isNil;
        lodash2.isNull = isNull;
        lodash2.isNumber = isNumber2;
        lodash2.isObject = isObject2;
        lodash2.isObjectLike = isObjectLike;
        lodash2.isPlainObject = isPlainObject2;
        lodash2.isRegExp = isRegExp2;
        lodash2.isSafeInteger = isSafeInteger;
        lodash2.isSet = isSet;
        lodash2.isString = isString2;
        lodash2.isSymbol = isSymbol;
        lodash2.isTypedArray = isTypedArray2;
        lodash2.isUndefined = isUndefined2;
        lodash2.isWeakMap = isWeakMap;
        lodash2.isWeakSet = isWeakSet;
        lodash2.join = join;
        lodash2.kebabCase = kebabCase;
        lodash2.last = last;
        lodash2.lastIndexOf = lastIndexOf;
        lodash2.lowerCase = lowerCase;
        lodash2.lowerFirst = lowerFirst;
        lodash2.lt = lt;
        lodash2.lte = lte;
        lodash2.max = max;
        lodash2.maxBy = maxBy;
        lodash2.mean = mean;
        lodash2.meanBy = meanBy;
        lodash2.min = min;
        lodash2.minBy = minBy;
        lodash2.stubArray = stubArray;
        lodash2.stubFalse = stubFalse;
        lodash2.stubObject = stubObject;
        lodash2.stubString = stubString;
        lodash2.stubTrue = stubTrue;
        lodash2.multiply = multiply;
        lodash2.nth = nth;
        lodash2.noConflict = noConflict;
        lodash2.noop = noop2;
        lodash2.now = now;
        lodash2.pad = pad;
        lodash2.padEnd = padEnd;
        lodash2.padStart = padStart;
        lodash2.parseInt = parseInt2;
        lodash2.random = random;
        lodash2.reduce = reduce;
        lodash2.reduceRight = reduceRight;
        lodash2.repeat = repeat;
        lodash2.replace = replace;
        lodash2.result = result;
        lodash2.round = round;
        lodash2.runInContext = runInContext2;
        lodash2.sample = sample;
        lodash2.size = size;
        lodash2.snakeCase = snakeCase;
        lodash2.some = some;
        lodash2.sortedIndex = sortedIndex;
        lodash2.sortedIndexBy = sortedIndexBy;
        lodash2.sortedIndexOf = sortedIndexOf;
        lodash2.sortedLastIndex = sortedLastIndex;
        lodash2.sortedLastIndexBy = sortedLastIndexBy;
        lodash2.sortedLastIndexOf = sortedLastIndexOf;
        lodash2.startCase = startCase;
        lodash2.startsWith = startsWith;
        lodash2.subtract = subtract;
        lodash2.sum = sum;
        lodash2.sumBy = sumBy;
        lodash2.template = template;
        lodash2.times = times;
        lodash2.toFinite = toFinite;
        lodash2.toInteger = toInteger;
        lodash2.toLength = toLength;
        lodash2.toLower = toLower;
        lodash2.toNumber = toNumber;
        lodash2.toSafeInteger = toSafeInteger;
        lodash2.toString = toString3;
        lodash2.toUpper = toUpper;
        lodash2.trim = trim2;
        lodash2.trimEnd = trimEnd;
        lodash2.trimStart = trimStart;
        lodash2.truncate = truncate;
        lodash2.unescape = unescape2;
        lodash2.uniqueId = uniqueId;
        lodash2.upperCase = upperCase;
        lodash2.upperFirst = upperFirst;
        lodash2.each = forEach2;
        lodash2.eachRight = forEachRight;
        lodash2.first = head;
        mixin(lodash2, function() {
          var source = {};
          baseForOwn(lodash2, function(func, methodName) {
            if (!hasOwnProperty2.call(lodash2.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash2.VERSION = VERSION2;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash2[methodName].placeholder = lodash2;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n2) {
            n2 = n2 === undefined$1 ? 1 : nativeMax(toInteger(n2), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n2, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n2, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n2) {
            return this.reverse()[methodName](n2).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined$1) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash2.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash2.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray2(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray2(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash2[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty2.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined$1
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash2.prototype.at = wrapperAt;
        lodash2.prototype.chain = wrapperChain;
        lodash2.prototype.commit = wrapperCommit;
        lodash2.prototype.next = wrapperNext;
        lodash2.prototype.plant = wrapperPlant;
        lodash2.prototype.reverse = wrapperReverse;
        lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
        lodash2.prototype.first = lodash2.prototype.head;
        if (symIterator) {
          lodash2.prototype[symIterator] = wrapperToIterator;
        }
        return lodash2;
      };
      var _2 = runInContext();
      if (freeModule) {
        (freeModule.exports = _2)._ = _2;
        freeExports._ = _2;
      } else {
        root._ = _2;
      }
    }).call(commonjsGlobal);
  })(lodash, lodash.exports);
  var lodashExports = lodash.exports;
  const _ = /* @__PURE__ */ getDefaultExportFromCjs(lodashExports);
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p2 in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p2))
          d2[p2] = b2[p2];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
        s = arguments[i];
        for (var p2 in s)
          if (Object.prototype.hasOwnProperty.call(s, p2))
            t[p2] = s[p2];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  var lib = {};
  var sensorPool = {};
  var id = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var id2 = 1;
    var _default = function _default2() {
      return "".concat(id2++);
    };
    exports["default"] = _default;
  })(id);
  var sensors = {};
  var object = {};
  var debounce = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _default = function _default2(fn) {
      var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 60;
      var timer = null;
      return function() {
        var _this = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(_this, args);
        }, delay);
      };
    };
    exports["default"] = _default;
  })(debounce);
  var constant = {};
  Object.defineProperty(constant, "__esModule", {
    value: true
  });
  constant.SensorTabIndex = constant.SensorClassName = constant.SizeSensorId = void 0;
  var SizeSensorId = "size-sensor-id";
  constant.SizeSensorId = SizeSensorId;
  var SensorClassName = "size-sensor-object";
  constant.SensorClassName = SensorClassName;
  var SensorTabIndex = "-1";
  constant.SensorTabIndex = SensorTabIndex;
  Object.defineProperty(object, "__esModule", {
    value: true
  });
  object.createSensor = void 0;
  var _debounce$1 = _interopRequireDefault$2(debounce);
  var _constant$1 = constant;
  function _interopRequireDefault$2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var createSensor$2 = function createSensor(element) {
    var sensor = void 0;
    var listeners = [];
    var newSensor = function newSensor2() {
      if (getComputedStyle(element).position === "static") {
        element.style.position = "relative";
      }
      var obj = document.createElement("object");
      obj.onload = function() {
        obj.contentDocument.defaultView.addEventListener("resize", resizeListener);
        resizeListener();
      };
      obj.style.display = "block";
      obj.style.position = "absolute";
      obj.style.top = "0";
      obj.style.left = "0";
      obj.style.height = "100%";
      obj.style.width = "100%";
      obj.style.overflow = "hidden";
      obj.style.pointerEvents = "none";
      obj.style.zIndex = "-1";
      obj.style.opacity = "0";
      obj.setAttribute("class", _constant$1.SensorClassName);
      obj.setAttribute("tabindex", _constant$1.SensorTabIndex);
      obj.type = "text/html";
      element.appendChild(obj);
      obj.data = "about:blank";
      return obj;
    };
    var resizeListener = (0, _debounce$1["default"])(function() {
      listeners.forEach(function(listener) {
        listener(element);
      });
    });
    var bind3 = function bind4(cb) {
      if (!sensor) {
        sensor = newSensor();
      }
      if (listeners.indexOf(cb) === -1) {
        listeners.push(cb);
      }
    };
    var destroy = function destroy2() {
      if (sensor && sensor.parentNode) {
        if (sensor.contentDocument) {
          sensor.contentDocument.defaultView.removeEventListener("resize", resizeListener);
        }
        sensor.parentNode.removeChild(sensor);
        sensor = void 0;
        listeners = [];
      }
    };
    var unbind = function unbind2(cb) {
      var idx = listeners.indexOf(cb);
      if (idx !== -1) {
        listeners.splice(idx, 1);
      }
      if (listeners.length === 0 && sensor) {
        destroy();
      }
    };
    return {
      element,
      bind: bind3,
      destroy,
      unbind
    };
  };
  object.createSensor = createSensor$2;
  var resizeObserver = {};
  Object.defineProperty(resizeObserver, "__esModule", {
    value: true
  });
  resizeObserver.createSensor = void 0;
  var _debounce = _interopRequireDefault$1(debounce);
  function _interopRequireDefault$1(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var createSensor$1 = function createSensor2(element) {
    var sensor = void 0;
    var listeners = [];
    var resizeListener = (0, _debounce["default"])(function() {
      listeners.forEach(function(listener) {
        listener(element);
      });
    });
    var newSensor = function newSensor2() {
      var s = new ResizeObserver(resizeListener);
      s.observe(element);
      resizeListener();
      return s;
    };
    var bind3 = function bind4(cb) {
      if (!sensor) {
        sensor = newSensor();
      }
      if (listeners.indexOf(cb) === -1) {
        listeners.push(cb);
      }
    };
    var destroy = function destroy2() {
      sensor.disconnect();
      listeners = [];
      sensor = void 0;
    };
    var unbind = function unbind2(cb) {
      var idx = listeners.indexOf(cb);
      if (idx !== -1) {
        listeners.splice(idx, 1);
      }
      if (listeners.length === 0 && sensor) {
        destroy();
      }
    };
    return {
      element,
      bind: bind3,
      destroy,
      unbind
    };
  };
  resizeObserver.createSensor = createSensor$1;
  Object.defineProperty(sensors, "__esModule", {
    value: true
  });
  sensors.createSensor = void 0;
  var _object = object;
  var _resizeObserver = resizeObserver;
  var createSensor3 = typeof ResizeObserver !== "undefined" ? _resizeObserver.createSensor : _object.createSensor;
  sensors.createSensor = createSensor3;
  Object.defineProperty(sensorPool, "__esModule", {
    value: true
  });
  sensorPool.removeSensor = sensorPool.getSensor = void 0;
  var _id = _interopRequireDefault(id);
  var _sensors = sensors;
  var _constant = constant;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var Sensors = {};
  var getSensor = function getSensor2(element) {
    var sensorId = element.getAttribute(_constant.SizeSensorId);
    if (sensorId && Sensors[sensorId]) {
      return Sensors[sensorId];
    }
    var newId = (0, _id["default"])();
    element.setAttribute(_constant.SizeSensorId, newId);
    var sensor = (0, _sensors.createSensor)(element);
    Sensors[newId] = sensor;
    return sensor;
  };
  sensorPool.getSensor = getSensor;
  var removeSensor = function removeSensor2(sensor) {
    var sensorId = sensor.element.getAttribute(_constant.SizeSensorId);
    sensor.element.removeAttribute(_constant.SizeSensorId);
    sensor.destroy();
    if (sensorId && Sensors[sensorId]) {
      delete Sensors[sensorId];
    }
  };
  sensorPool.removeSensor = removeSensor;
  Object.defineProperty(lib, "__esModule", {
    value: true
  });
  lib.ver = clear_1 = lib.clear = bind_1 = lib.bind = void 0;
  var _sensorPool = sensorPool;
  var bind = function bind2(element, cb) {
    var sensor = (0, _sensorPool.getSensor)(element);
    sensor.bind(cb);
    return function() {
      sensor.unbind(cb);
    };
  };
  var bind_1 = lib.bind = bind;
  var clear = function clear2(element) {
    var sensor = (0, _sensorPool.getSensor)(element);
    (0, _sensorPool.removeSensor)(sensor);
  };
  var clear_1 = lib.clear = clear;
  var ver = "1.0.1";
  lib.ver = ver;
  function pick(obj, keys) {
    var r = {};
    keys.forEach(function(key) {
      r[key] = obj[key];
    });
    return r;
  }
  function isFunction(v) {
    return typeof v === "function";
  }
  function isString(v) {
    return typeof v === "string";
  }
  var fastDeepEqual = function equal(a, b) {
    if (a === b)
      return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor)
        return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!equal(a[i], b[i]))
            return false;
        return true;
      }
      if (a.constructor === RegExp)
        return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf)
        return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString)
        return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!equal(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  };
  const isEqual = /* @__PURE__ */ getDefaultExportFromCjs(fastDeepEqual);
  var EChartsReactCore = (
    /** @class */
    function(_super) {
      __extends(EChartsReactCore2, _super);
      function EChartsReactCore2(props) {
        var _this = _super.call(this, props) || this;
        _this.echarts = props.echarts;
        _this.ele = null;
        _this.isInitialResize = true;
        return _this;
      }
      EChartsReactCore2.prototype.componentDidMount = function() {
        this.renderNewEcharts();
      };
      EChartsReactCore2.prototype.componentDidUpdate = function(prevProps) {
        var shouldSetOption = this.props.shouldSetOption;
        if (isFunction(shouldSetOption) && !shouldSetOption(prevProps, this.props)) {
          return;
        }
        if (!isEqual(prevProps.theme, this.props.theme) || !isEqual(prevProps.opts, this.props.opts) || !isEqual(prevProps.onEvents, this.props.onEvents)) {
          this.dispose();
          this.renderNewEcharts();
          return;
        }
        var pickKeys = ["option", "notMerge", "lazyUpdate", "showLoading", "loadingOption"];
        if (!isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
          this.updateEChartsOption();
        }
        if (!isEqual(prevProps.style, this.props.style) || !isEqual(prevProps.className, this.props.className)) {
          this.resize();
        }
      };
      EChartsReactCore2.prototype.componentWillUnmount = function() {
        this.dispose();
      };
      EChartsReactCore2.prototype.getEchartsInstance = function() {
        return this.echarts.getInstanceByDom(this.ele) || this.echarts.init(this.ele, this.props.theme, this.props.opts);
      };
      EChartsReactCore2.prototype.dispose = function() {
        if (this.ele) {
          try {
            clear_1(this.ele);
          } catch (e) {
            console.warn(e);
          }
          this.echarts.dispose(this.ele);
        }
      };
      EChartsReactCore2.prototype.renderNewEcharts = function() {
        var _this = this;
        var _a2 = this.props, onEvents = _a2.onEvents, onChartReady = _a2.onChartReady;
        var echartsInstance = this.updateEChartsOption();
        this.bindEvents(echartsInstance, onEvents || {});
        if (isFunction(onChartReady))
          onChartReady(echartsInstance);
        if (this.ele) {
          bind_1(this.ele, function() {
            _this.resize();
          });
        }
      };
      EChartsReactCore2.prototype.bindEvents = function(instance, events) {
        function _bindEvent(eventName2, func) {
          if (isString(eventName2) && isFunction(func)) {
            instance.on(eventName2, function(param) {
              func(param, instance);
            });
          }
        }
        for (var eventName in events) {
          if (Object.prototype.hasOwnProperty.call(events, eventName)) {
            _bindEvent(eventName, events[eventName]);
          }
        }
      };
      EChartsReactCore2.prototype.updateEChartsOption = function() {
        var _a2 = this.props, option = _a2.option, _b = _a2.notMerge, notMerge = _b === void 0 ? false : _b, _c = _a2.lazyUpdate, lazyUpdate = _c === void 0 ? false : _c, showLoading = _a2.showLoading, _d = _a2.loadingOption, loadingOption = _d === void 0 ? null : _d;
        var echartInstance = this.getEchartsInstance();
        echartInstance.setOption(option, notMerge, lazyUpdate);
        if (showLoading)
          echartInstance.showLoading(loadingOption);
        else
          echartInstance.hideLoading();
        return echartInstance;
      };
      EChartsReactCore2.prototype.resize = function() {
        var echartsInstance = this.getEchartsInstance();
        if (!this.isInitialResize) {
          try {
            echartsInstance.resize();
          } catch (e) {
            console.warn(e);
          }
        }
        this.isInitialResize = false;
      };
      EChartsReactCore2.prototype.render = function() {
        var _this = this;
        var _a2 = this.props, style = _a2.style, _b = _a2.className, className = _b === void 0 ? "" : _b;
        var newStyle = __assign({ height: 300 }, style);
        return React__default.createElement("div", { ref: function(e) {
          _this.ele = e;
        }, style: newStyle, className: "echarts-for-react " + className });
      };
      return EChartsReactCore2;
    }(React__default.PureComponent)
  );
  var EChartsReact = (
    /** @class */
    function(_super) {
      __extends(EChartsReact2, _super);
      function EChartsReact2(props) {
        var _this = _super.call(this, props) || this;
        _this.echarts = echarts__namespace;
        return _this;
      }
      return EChartsReact2;
    }(EChartsReactCore)
  );
  const upColor = red.primary;
  const downColor = green.primary;
  function splitData(rawData) {
    let categoryData = [];
    let values = [];
    let volumes = [];
    for (let i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i]);
      volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
    }
    return {
      categoryData,
      values,
      volumes
    };
  }
  function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1];
      }
      result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
  }
  function createEchartsCandleOption(rawData) {
    var data = splitData(rawData);
    return {
      animation: false,
      legend: {
        bottom: 10,
        left: "center",
        data: ["ELO", "MA5", "MA10", "MA20", "MA30"]
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross"
        },
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        textStyle: {
          color: "#000"
        },
        position: function(pos, params, el, elRect, size) {
          const obj = {
            top: 10
          };
          obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        }
        // extraCssText: 'width: 170px'
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: "all"
          }
        ],
        label: {
          backgroundColor: "#777"
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false
          },
          brush: {
            type: ["lineX", "clear"]
          }
        }
      },
      brush: {
        xAxisIndex: "all",
        brushLink: "all",
        outOfBrush: {
          colorAlpha: 0.1
        }
      },
      visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: downColor
          },
          {
            value: -1,
            color: upColor
          }
        ]
      },
      grid: [
        {
          left: "10%",
          right: "8%",
          height: "50%"
        },
        {
          left: "10%",
          right: "8%",
          top: "63%",
          height: "16%"
        }
      ],
      xAxis: [
        {
          type: "category",
          data: data.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: "dataMin",
          max: "dataMax",
          axisPointer: {
            z: 100
          }
        },
        {
          type: "category",
          gridIndex: 1,
          data: data.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: "dataMin",
          max: "dataMax"
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        }
      ],
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: [0, 1],
          start: 0,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: "slider",
          top: "85%",
          start: 98,
          end: 100
        }
      ],
      series: [
        {
          name: "ELO",
          type: "candlestick",
          data: data.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: void 0,
            borderColor0: void 0
          }
        },
        {
          name: "MA5",
          type: "line",
          data: calculateMA(5, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: "MA10",
          type: "line",
          data: calculateMA(10, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: "MA20",
          type: "line",
          data: calculateMA(20, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: "MA30",
          type: "line",
          data: calculateMA(30, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        {
          name: "Volume",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.volumes
        }
      ]
    };
  }
  class EloHistoryItem {
    constructor(prop) {
      __publicField(this, "id", 0);
      __publicField(this, "matchId", 0);
      __publicField(this, "currentElo", 0);
      __publicField(this, "wonGame", false);
      __publicField(this, "team", 0);
      __publicField(this, "ranked", false);
      __publicField(this, "createdAt", "");
      __publicField(this, "type", "");
      lodashExports.extend(this, prop);
    }
    get date() {
      return _.first(this.createdAt.split("T"));
    }
  }
  class EchartsDataItem {
    constructor(prop) {
      __publicField(this, "date", "");
      __publicField(this, "open", 0);
      __publicField(this, "close", 0);
      __publicField(this, "lowest", 0);
      __publicField(this, "highest", 0);
      __publicField(this, "volume", 0);
      lodashExports.extend(this, prop);
    }
    toEchartsListData() {
      return [this.date, this.open, this.close, this.lowest, this.highest, this.volume];
    }
  }
  class AppState {
    constructor() {
      __publicField(this, "open", false);
      __publicField(this, "loading", false);
      __publicField(this, "eloHis", []);
      __publicField(this, "onCancel", () => {
        this.open = false;
        this.eloHis = [];
      });
      __publicField(this, "onOpen", () => {
        this.open = true;
        this.fetch();
      });
      mobx.makeAutoObservable(this);
    }
    async fetch() {
      this.loading = true;
      try {
        let pathname = window.location.pathname;
        console.log(pathname);
        let userId = _.last(pathname.split("/"));
        console.log(userId);
        const dataUrl = `https://www.elevenvr.club/accounts/${userId}/elo-history`;
        let response = await axios$1.get(dataUrl);
        console.log(response.data.data);
        let list = response.data.data;
        const eloHis = list.map((o) => {
          const attributes = o.attributes;
          return new EloHistoryItem({
            id: attributes.id,
            currentElo: _.get(attributes, "current-elo"),
            wonGame: _.get(attributes, "won-game"),
            matchId: _.get(attributes, "match-id"),
            createdAt: _.get(attributes, "created-at"),
            team: attributes.team,
            ranked: attributes.ranked,
            type: o.type
          });
        });
        console.log(eloHis);
        this.eloHis = eloHis;
      } finally {
        this.loading = false;
      }
    }
    toEchartsData() {
      let originGroups = _.groupBy(this.eloHis, (it) => it.date);
      return _.map(originGroups, (group, key) => {
        var _a2, _b, _c, _d;
        return new EchartsDataItem({
          date: key,
          open: (_a2 = _.first(group)) == null ? void 0 : _a2.currentElo,
          close: (_b = _.last(group)) == null ? void 0 : _b.currentElo,
          lowest: (_c = _.minBy(group, (it) => it.currentElo)) == null ? void 0 : _c.currentElo,
          highest: (_d = _.maxBy(group, (it) => it.currentElo)) == null ? void 0 : _d.currentElo,
          volume: group.length
        });
      });
    }
    toEchartsListData() {
      return this.toEchartsData().map((it) => it.toEchartsListData());
    }
    getOption() {
      return createEchartsCandleOption(this.toEchartsListData());
    }
  }
  function AppFn() {
    const state = useLocalObservable(() => new AppState());
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(antd.FloatButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersOutlined$1, {}), onClick: state.onOpen }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        antd.Modal,
        {
          title: "Candlestick - K线图",
          open: state.open,
          destroyOnClose: true,
          footer: false,
          onCancel: state.onCancel,
          width: document.body.clientWidth - 100,
          bodyStyle: {},
          children: state.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(antd.Skeleton, { active: true }) : state.eloHis.length == 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(antd.Empty, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(EChartsReact, { option: state.getOption(), style: {
            height: document.body.clientHeight - 200
          } })
        }
      )
    ] });
  }
  const App = observer(AppFn);
  client.createRoot(
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  ).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React__default.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );

})(React, ReactDOM, antd, mobx, echarts);
