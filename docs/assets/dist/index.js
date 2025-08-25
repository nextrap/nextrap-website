var _a;
var It = function(s2, t2, e2, i4) {
  function r2(n3) {
    return n3 instanceof e2 ? n3 : new e2(function(o2) {
      o2(n3);
    });
  }
  return new (e2 || (e2 = Promise))(function(n3, o2) {
    function l2(c2) {
      try {
        h2(i4.next(c2));
      } catch (d2) {
        o2(d2);
      }
    }
    function a2(c2) {
      try {
        h2(i4.throw(c2));
      } catch (d2) {
        o2(d2);
      }
    }
    function h2(c2) {
      c2.done ? n3(c2.value) : r2(c2.value).then(l2, a2);
    }
    h2((i4 = i4.apply(s2, [])).next());
  });
};
function Yt() {
  return It(this, void 0, void 0, function* () {
    return new Promise((s2) => {
      if (document.readyState === "complete" || document.readyState === "interactive")
        return s2("loaded");
      document.addEventListener("DOMContentLoaded", () => s2("DOMContentLoaded"));
    });
  });
}
var qt = function(s2, t2, e2, i4) {
  function r2(n3) {
    return n3 instanceof e2 ? n3 : new e2(function(o2) {
      o2(n3);
    });
  }
  return new (e2 || (e2 = Promise))(function(n3, o2) {
    function l2(c2) {
      try {
        h2(i4.next(c2));
      } catch (d2) {
        o2(d2);
      }
    }
    function a2(c2) {
      try {
        h2(i4.throw(c2));
      } catch (d2) {
        o2(d2);
      }
    }
    function h2(c2) {
      c2.done ? n3(c2.value) : r2(c2.value).then(l2, a2);
    }
    h2((i4 = i4.apply(s2, [])).next());
  });
};
function ct(s2) {
  return qt(this, void 0, void 0, function* () {
    return new Promise((t2) => {
      window.setTimeout(() => t2(), s2);
    });
  });
}
class Pt {
  /**
   *
   * @param delay     Debounce delay in milliseconds
   * @param max_delay Maximum delay in milliseconds, if false then no maximum delay is applied
   */
  constructor(t2, e2 = false) {
    this.delay = t2, this.max_delay = e2, this.timeout = null, this.startTimeWithMs = 0;
  }
  async wait() {
    return this.startTimeWithMs === 0 && (this.startTimeWithMs = Date.now()), this.timeout && (this.max_delay === false || this.startTimeWithMs + this.max_delay > Date.now()) && clearTimeout(this.timeout), new Promise((t2) => {
      this.timeout = setTimeout(() => {
        this.startTimeWithMs = 0, t2(true);
      }, this.delay);
    });
  }
  debounce(t2) {
    this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(() => {
      t2();
    }, this.delay);
  }
}
const P$2 = {
  xs: { name: "xs", minWidth: 0 },
  sm: { name: "sm", minWidth: 576 },
  md: { name: "md", minWidth: 768 },
  lg: { name: "lg", minWidth: 992 },
  xl: { name: "xl", minWidth: 1200 },
  xxl: { name: "xxl", minWidth: 1400 }
};
let M$3 = P$2.xs;
function Q$1() {
  const s2 = window.innerWidth;
  let t2 = P$2.xs;
  for (const e2 in P$2) {
    const i4 = P$2[e2];
    s2 >= i4.minWidth && (t2 = i4);
  }
  return t2;
}
function dt(s2) {
  if (typeof s2 == "string" && s2.endsWith("px") && (s2 = parseInt(s2.replace("px", ""))), typeof s2 == "string") {
    if (s2 = P$2[s2], !s2)
      throw new Error(
        `Breakpoint ${s2} not found. Defined breakpoints are: ${Object.keys(P$2).join(", ")}`
      );
  } else typeof s2 == "number" && (s2 = { name: "c", minWidth: s2 });
  return window.innerWidth >= s2.minWidth;
}
if (!window.__nextrap_current_breakpoint) {
  window.__nextrap_current_breakpoint = Q$1();
  const s2 = new Pt(200, 500);
  window.addEventListener("resize", async () => {
    if (await s2.wait(), M$3 !== Q$1()) {
      M$3 = Q$1(), window.__nextrap_current_breakpoint = M$3;
      const t2 = new CustomEvent("breakpoint-changed", {
        detail: { breakpoint: M$3 }
      });
      console.log("Breakpoint changed", M$3), window.dispatchEvent(t2);
    }
  });
}
class nt {
  /**
   * Checks recursively if the element is visible.
   *
   * @param el
   */
  static isVisible(t2) {
    if (getComputedStyle(t2).display === "none")
      return false;
    if (t2 instanceof HTMLElement && (t2.offsetWidth > 0 || t2.offsetHeight > 0 || t2.tagName === "IMG" || t2.textContent !== ""))
      return true;
    if (!t2.children) return false;
    for (const i4 of t2.children)
      if (this.isVisible(i4)) return true;
    return false;
  }
  /**
   * Usage:
   *
   * in firstupdated or connectedCallback of your element:
   * ```ts
   *  override firstUpdated(_changedProperties: PropertyValues) {
   *     SlotTool.observeEmptySlots(this)
   *   }
   * ```
   *
   * @param slot
   */
  static isEmptySlot(t2) {
    const e2 = t2.assignedElements({ flatten: true });
    return e2.length === 0 ? true : e2.every((i4) => !this.isVisible(i4));
  }
  static observeEmptySlots(t2) {
    const e2 = t2.shadowRoot;
    if (!e2) {
      console.warn("Element has no shadow root", t2);
      return;
    }
    e2.querySelectorAll("slot").forEach((r2) => {
      this.isEmptySlot(r2) ? r2.setAttribute("empty", "") : r2.removeAttribute("empty"), r2.onslotchange = () => {
        this.isEmptySlot(r2) ? r2.setAttribute("empty", "") : r2.removeAttribute("empty");
      };
    });
  }
}
function pt() {
  return document.readyState === "loading" ? new Promise((s2) => {
    document.addEventListener("DOMContentLoaded", () => s2());
  }) : Promise.resolve();
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q$1 = globalThis, ot = q$1.ShadowRoot && (q$1.ShadyCSS === void 0 || q$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kt = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let Ot = class {
  constructor(t2, e2, i4) {
    if (this._$cssResult$ = true, i4 !== kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const e2 = this.t;
    if (ot && t2 === void 0) {
      const i4 = e2 !== void 0 && e2.length === 1;
      i4 && (t2 = ut.get(e2)), t2 === void 0 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), i4 && ut.set(e2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const T$3 = (s2) => new Ot(typeof s2 == "string" ? s2 : s2 + "", void 0, kt), Vt = (s2, t2) => {
  if (ot) s2.adoptedStyleSheets = t2.map((e2) => e2 instanceof CSSStyleSheet ? e2 : e2.styleSheet);
  else for (const e2 of t2) {
    const i4 = document.createElement("style"), r2 = q$1.litNonce;
    r2 !== void 0 && i4.setAttribute("nonce", r2), i4.textContent = e2.cssText, s2.appendChild(i4);
  }
}, ft = ot ? (s2) => s2 : (s2) => s2 instanceof CSSStyleSheet ? ((t2) => {
  let e2 = "";
  for (const i4 of t2.cssRules) e2 += i4.cssText;
  return T$3(e2);
})(s2) : s2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ft, defineProperty: Jt, getOwnPropertyDescriptor: Kt, getOwnPropertyNames: Zt, getOwnPropertySymbols: Qt, getPrototypeOf: Xt } = Object, b$4 = globalThis, vt = b$4.trustedTypes, te = vt ? vt.emptyScript : "", X = b$4.reactiveElementPolyfillSupport, L$3 = (s2, t2) => s2, V$2 = { toAttribute(s2, t2) {
  switch (t2) {
    case Boolean:
      s2 = s2 ? te : null;
      break;
    case Object:
    case Array:
      s2 = s2 == null ? s2 : JSON.stringify(s2);
  }
  return s2;
}, fromAttribute(s2, t2) {
  let e2 = s2;
  switch (t2) {
    case Boolean:
      e2 = s2 !== null;
      break;
    case Number:
      e2 = s2 === null ? null : Number(s2);
      break;
    case Object:
    case Array:
      try {
        e2 = JSON.parse(s2);
      } catch {
        e2 = null;
      }
  }
  return e2;
} }, at = (s2, t2) => !Ft(s2, t2), mt = { attribute: true, type: String, converter: V$2, reflect: false, useDefault: false, hasChanged: at };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b$4.litPropertyMetadata ?? (b$4.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w$3 = class w extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, e2 = mt) {
    if (e2.state && (e2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((e2 = Object.create(e2)).wrapped = true), this.elementProperties.set(t2, e2), !e2.noAccessor) {
      const i4 = Symbol(), r2 = this.getPropertyDescriptor(t2, i4, e2);
      r2 !== void 0 && Jt(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, e2, i4) {
    const { get: r2, set: n3 } = Kt(this.prototype, t2) ?? { get() {
      return this[e2];
    }, set(o2) {
      this[e2] = o2;
    } };
    return { get: r2, set(o2) {
      const l2 = r2 == null ? void 0 : r2.call(this);
      n3 == null || n3.call(this, o2), this.requestUpdate(t2, l2, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L$3("elementProperties"))) return;
    const t2 = Xt(this);
    t2.finalize(), t2.l !== void 0 && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L$3("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(L$3("properties"))) {
      const e2 = this.properties, i4 = [...Zt(e2), ...Qt(e2)];
      for (const r2 of i4) this.createProperty(r2, e2[r2]);
    }
    const t2 = this[Symbol.metadata];
    if (t2 !== null) {
      const e2 = litPropertyMetadata.get(t2);
      if (e2 !== void 0) for (const [i4, r2] of e2) this.elementProperties.set(i4, r2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e2, i4] of this.elementProperties) {
      const r2 = this._$Eu(e2, i4);
      r2 !== void 0 && this._$Eh.set(r2, e2);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t2) {
    const e2 = [];
    if (Array.isArray(t2)) {
      const i4 = new Set(t2.flat(1 / 0).reverse());
      for (const r2 of i4) e2.unshift(ft(r2));
    } else t2 !== void 0 && e2.push(ft(t2));
    return e2;
  }
  static _$Eu(t2, e2) {
    const i4 = e2.attribute;
    return i4 === false ? void 0 : typeof i4 == "string" ? i4 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t2;
    this._$ES = new Promise((e2) => this.enableUpdating = e2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t2 = this.constructor.l) == null || t2.forEach((e2) => e2(this));
  }
  addController(t2) {
    var e2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), this.renderRoot !== void 0 && this.isConnected && ((e2 = t2.hostConnected) == null || e2.call(t2));
  }
  removeController(t2) {
    var e2;
    (e2 = this._$EO) == null || e2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), e2 = this.constructor.elementProperties;
    for (const i4 of e2.keys()) this.hasOwnProperty(i4) && (t2.set(i4, this[i4]), delete this[i4]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Vt(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$EO) == null || t2.forEach((e2) => {
      var i4;
      return (i4 = e2.hostConnected) == null ? void 0 : i4.call(e2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$EO) == null || t2.forEach((e2) => {
      var i4;
      return (i4 = e2.hostDisconnected) == null ? void 0 : i4.call(e2);
    });
  }
  attributeChangedCallback(t2, e2, i4) {
    this._$AK(t2, i4);
  }
  _$ET(t2, e2) {
    var n3;
    const i4 = this.constructor.elementProperties.get(t2), r2 = this.constructor._$Eu(t2, i4);
    if (r2 !== void 0 && i4.reflect === true) {
      const o2 = (((n3 = i4.converter) == null ? void 0 : n3.toAttribute) !== void 0 ? i4.converter : V$2).toAttribute(e2, i4.type);
      this._$Em = t2, o2 == null ? this.removeAttribute(r2) : this.setAttribute(r2, o2), this._$Em = null;
    }
  }
  _$AK(t2, e2) {
    var n3, o2;
    const i4 = this.constructor, r2 = i4._$Eh.get(t2);
    if (r2 !== void 0 && this._$Em !== r2) {
      const l2 = i4.getPropertyOptions(r2), a2 = typeof l2.converter == "function" ? { fromAttribute: l2.converter } : ((n3 = l2.converter) == null ? void 0 : n3.fromAttribute) !== void 0 ? l2.converter : V$2;
      this._$Em = r2;
      const h2 = a2.fromAttribute(e2, l2.type);
      this[r2] = h2 ?? ((o2 = this._$Ej) == null ? void 0 : o2.get(r2)) ?? h2, this._$Em = null;
    }
  }
  requestUpdate(t2, e2, i4) {
    var r2;
    if (t2 !== void 0) {
      const n3 = this.constructor, o2 = this[t2];
      if (i4 ?? (i4 = n3.getPropertyOptions(t2)), !((i4.hasChanged ?? at)(o2, e2) || i4.useDefault && i4.reflect && o2 === ((r2 = this._$Ej) == null ? void 0 : r2.get(t2)) && !this.hasAttribute(n3._$Eu(t2, i4)))) return;
      this.C(t2, e2, i4);
    }
    this.isUpdatePending === false && (this._$ES = this._$EP());
  }
  C(t2, e2, { useDefault: i4, reflect: r2, wrapped: n3 }, o2) {
    i4 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, o2 ?? e2 ?? this[t2]), n3 !== true || o2 !== void 0) || (this._$AL.has(t2) || (this.hasUpdated || i4 || (e2 = void 0), this._$AL.set(t2, e2)), r2 === true && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (e2) {
      Promise.reject(e2);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i4;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n3, o2] of this._$Ep) this[n3] = o2;
        this._$Ep = void 0;
      }
      const r2 = this.constructor.elementProperties;
      if (r2.size > 0) for (const [n3, o2] of r2) {
        const { wrapped: l2 } = o2, a2 = this[n3];
        l2 !== true || this._$AL.has(n3) || a2 === void 0 || this.C(n3, void 0, o2, a2);
      }
    }
    let t2 = false;
    const e2 = this._$AL;
    try {
      t2 = this.shouldUpdate(e2), t2 ? (this.willUpdate(e2), (i4 = this._$EO) == null || i4.forEach((r2) => {
        var n3;
        return (n3 = r2.hostUpdate) == null ? void 0 : n3.call(r2);
      }), this.update(e2)) : this._$EM();
    } catch (r2) {
      throw t2 = false, this._$EM(), r2;
    }
    t2 && this._$AE(e2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var e2;
    (e2 = this._$EO) == null || e2.forEach((i4) => {
      var r2;
      return (r2 = i4.hostUpdated) == null ? void 0 : r2.call(i4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e2) => this._$ET(e2, this[e2]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
w$3.elementStyles = [], w$3.shadowRootOptions = { mode: "open" }, w$3[L$3("elementProperties")] = /* @__PURE__ */ new Map(), w$3[L$3("finalized")] = /* @__PURE__ */ new Map(), X == null || X({ ReactiveElement: w$3 }), (b$4.reactiveElementVersions ?? (b$4.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H$3 = globalThis, F$2 = H$3.trustedTypes, gt = F$2 ? F$2.createPolicy("lit-html", { createHTML: (s2) => s2 }) : void 0, Nt = "$lit$", g$4 = `lit$${Math.random().toFixed(9).slice(2)}$`, Mt = "?" + g$4, ee = `<${Mt}>`, E$3 = document, j$5 = () => E$3.createComment(""), D$3 = (s2) => s2 === null || typeof s2 != "object" && typeof s2 != "function", lt = Array.isArray, se = (s2) => lt(s2) || typeof (s2 == null ? void 0 : s2[Symbol.iterator]) == "function", tt = `[ 	
\f\r]`, U$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bt = /-->/g, _t = />/g, $$3 = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, $t = /"/g, Ut = /^(?:script|style|textarea|title)$/i, ie = (s2) => (t2, ...e2) => ({ _$litType$: s2, strings: t2, values: e2 }), k$2 = ie(1), S$5 = Symbol.for("lit-noChange"), p$5 = Symbol.for("lit-nothing"), wt = /* @__PURE__ */ new WeakMap(), A$3 = E$3.createTreeWalker(E$3, 129);
function Lt(s2, t2) {
  if (!lt(s2) || !s2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gt !== void 0 ? gt.createHTML(t2) : t2;
}
const re = (s2, t2) => {
  const e2 = s2.length - 1, i4 = [];
  let r2, n3 = t2 === 2 ? "<svg>" : t2 === 3 ? "<math>" : "", o2 = U$1;
  for (let l2 = 0; l2 < e2; l2++) {
    const a2 = s2[l2];
    let h2, c2, d2 = -1, f3 = 0;
    for (; f3 < a2.length && (o2.lastIndex = f3, c2 = o2.exec(a2), c2 !== null); ) f3 = o2.lastIndex, o2 === U$1 ? c2[1] === "!--" ? o2 = bt : c2[1] !== void 0 ? o2 = _t : c2[2] !== void 0 ? (Ut.test(c2[2]) && (r2 = RegExp("</" + c2[2], "g")), o2 = $$3) : c2[3] !== void 0 && (o2 = $$3) : o2 === $$3 ? c2[0] === ">" ? (o2 = r2 ?? U$1, d2 = -1) : c2[1] === void 0 ? d2 = -2 : (d2 = o2.lastIndex - c2[2].length, h2 = c2[1], o2 = c2[3] === void 0 ? $$3 : c2[3] === '"' ? $t : yt) : o2 === $t || o2 === yt ? o2 = $$3 : o2 === bt || o2 === _t ? o2 = U$1 : (o2 = $$3, r2 = void 0);
    const m2 = o2 === $$3 && s2[l2 + 1].startsWith("/>") ? " " : "";
    n3 += o2 === U$1 ? a2 + ee : d2 >= 0 ? (i4.push(h2), a2.slice(0, d2) + Nt + a2.slice(d2) + g$4 + m2) : a2 + g$4 + (d2 === -2 ? l2 : m2);
  }
  return [Lt(s2, n3 + (s2[e2] || "<?>") + (t2 === 2 ? "</svg>" : t2 === 3 ? "</math>" : "")), i4];
};
let z$4 = class z {
  constructor({ strings: t2, _$litType$: e2 }, i4) {
    let r2;
    this.parts = [];
    let n3 = 0, o2 = 0;
    const l2 = t2.length - 1, a2 = this.parts, [h2, c2] = re(t2, e2);
    if (this.el = z.createElement(h2, i4), A$3.currentNode = this.el.content, e2 === 2 || e2 === 3) {
      const d2 = this.el.content.firstChild;
      d2.replaceWith(...d2.childNodes);
    }
    for (; (r2 = A$3.nextNode()) !== null && a2.length < l2; ) {
      if (r2.nodeType === 1) {
        if (r2.hasAttributes()) for (const d2 of r2.getAttributeNames()) if (d2.endsWith(Nt)) {
          const f3 = c2[o2++], m2 = r2.getAttribute(d2).split(g$4), Y2 = /([.?@])?(.*)/.exec(f3);
          a2.push({ type: 1, index: n3, name: Y2[2], strings: m2, ctor: Y2[1] === "." ? oe : Y2[1] === "?" ? ae : Y2[1] === "@" ? le : Z$2 }), r2.removeAttribute(d2);
        } else d2.startsWith(g$4) && (a2.push({ type: 6, index: n3 }), r2.removeAttribute(d2));
        if (Ut.test(r2.tagName)) {
          const d2 = r2.textContent.split(g$4), f3 = d2.length - 1;
          if (f3 > 0) {
            r2.textContent = F$2 ? F$2.emptyScript : "";
            for (let m2 = 0; m2 < f3; m2++) r2.append(d2[m2], j$5()), A$3.nextNode(), a2.push({ type: 2, index: ++n3 });
            r2.append(d2[f3], j$5());
          }
        }
      } else if (r2.nodeType === 8) if (r2.data === Mt) a2.push({ type: 2, index: n3 });
      else {
        let d2 = -1;
        for (; (d2 = r2.data.indexOf(g$4, d2 + 1)) !== -1; ) a2.push({ type: 7, index: n3 }), d2 += g$4.length - 1;
      }
      n3++;
    }
  }
  static createElement(t2, e2) {
    const i4 = E$3.createElement("template");
    return i4.innerHTML = t2, i4;
  }
};
function O$2(s2, t2, e2 = s2, i4) {
  var o2, l2;
  if (t2 === S$5) return t2;
  let r2 = i4 !== void 0 ? (o2 = e2._$Co) == null ? void 0 : o2[i4] : e2._$Cl;
  const n3 = D$3(t2) ? void 0 : t2._$litDirective$;
  return (r2 == null ? void 0 : r2.constructor) !== n3 && ((l2 = r2 == null ? void 0 : r2._$AO) == null || l2.call(r2, false), n3 === void 0 ? r2 = void 0 : (r2 = new n3(s2), r2._$AT(s2, e2, i4)), i4 !== void 0 ? (e2._$Co ?? (e2._$Co = []))[i4] = r2 : e2._$Cl = r2), r2 !== void 0 && (t2 = O$2(s2, r2._$AS(s2, t2.values), r2, i4)), t2;
}
class ne {
  constructor(t2, e2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = e2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: e2 }, parts: i4 } = this._$AD, r2 = ((t2 == null ? void 0 : t2.creationScope) ?? E$3).importNode(e2, true);
    A$3.currentNode = r2;
    let n3 = A$3.nextNode(), o2 = 0, l2 = 0, a2 = i4[0];
    for (; a2 !== void 0; ) {
      if (o2 === a2.index) {
        let h2;
        a2.type === 2 ? h2 = new G$2(n3, n3.nextSibling, this, t2) : a2.type === 1 ? h2 = new a2.ctor(n3, a2.name, a2.strings, this, t2) : a2.type === 6 && (h2 = new he(n3, this, t2)), this._$AV.push(h2), a2 = i4[++l2];
      }
      o2 !== (a2 == null ? void 0 : a2.index) && (n3 = A$3.nextNode(), o2++);
    }
    return A$3.currentNode = E$3, r2;
  }
  p(t2) {
    let e2 = 0;
    for (const i4 of this._$AV) i4 !== void 0 && (i4.strings !== void 0 ? (i4._$AI(t2, i4, e2), e2 += i4.strings.length - 2) : i4._$AI(t2[e2])), e2++;
  }
}
let G$2 = class G {
  get _$AU() {
    var t2;
    return ((t2 = this._$AM) == null ? void 0 : t2._$AU) ?? this._$Cv;
  }
  constructor(t2, e2, i4, r2) {
    this.type = 2, this._$AH = p$5, this._$AN = void 0, this._$AA = t2, this._$AB = e2, this._$AM = i4, this.options = r2, this._$Cv = (r2 == null ? void 0 : r2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const e2 = this._$AM;
    return e2 !== void 0 && (t2 == null ? void 0 : t2.nodeType) === 11 && (t2 = e2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, e2 = this) {
    t2 = O$2(this, t2, e2), D$3(t2) ? t2 === p$5 || t2 == null || t2 === "" ? (this._$AH !== p$5 && this._$AR(), this._$AH = p$5) : t2 !== this._$AH && t2 !== S$5 && this._(t2) : t2._$litType$ !== void 0 ? this.$(t2) : t2.nodeType !== void 0 ? this.T(t2) : se(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== p$5 && D$3(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(E$3.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var n3;
    const { values: e2, _$litType$: i4 } = t2, r2 = typeof i4 == "number" ? this._$AC(t2) : (i4.el === void 0 && (i4.el = z$4.createElement(Lt(i4.h, i4.h[0]), this.options)), i4);
    if (((n3 = this._$AH) == null ? void 0 : n3._$AD) === r2) this._$AH.p(e2);
    else {
      const o2 = new ne(r2, this), l2 = o2.u(this.options);
      o2.p(e2), this.T(l2), this._$AH = o2;
    }
  }
  _$AC(t2) {
    let e2 = wt.get(t2.strings);
    return e2 === void 0 && wt.set(t2.strings, e2 = new z$4(t2)), e2;
  }
  k(t2) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let i4, r2 = 0;
    for (const n3 of t2) r2 === e2.length ? e2.push(i4 = new G(this.O(j$5()), this.O(j$5()), this, this.options)) : i4 = e2[r2], i4._$AI(n3), r2++;
    r2 < e2.length && (this._$AR(i4 && i4._$AB.nextSibling, r2), e2.length = r2);
  }
  _$AR(t2 = this._$AA.nextSibling, e2) {
    var i4;
    for ((i4 = this._$AP) == null ? void 0 : i4.call(this, false, true, e2); t2 !== this._$AB; ) {
      const r2 = t2.nextSibling;
      t2.remove(), t2 = r2;
    }
  }
  setConnected(t2) {
    var e2;
    this._$AM === void 0 && (this._$Cv = t2, (e2 = this._$AP) == null || e2.call(this, t2));
  }
};
let Z$2 = class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, e2, i4, r2, n3) {
    this.type = 1, this._$AH = p$5, this._$AN = void 0, this.element = t2, this.name = e2, this._$AM = r2, this.options = n3, i4.length > 2 || i4[0] !== "" || i4[1] !== "" ? (this._$AH = Array(i4.length - 1).fill(new String()), this.strings = i4) : this._$AH = p$5;
  }
  _$AI(t2, e2 = this, i4, r2) {
    const n3 = this.strings;
    let o2 = false;
    if (n3 === void 0) t2 = O$2(this, t2, e2, 0), o2 = !D$3(t2) || t2 !== this._$AH && t2 !== S$5, o2 && (this._$AH = t2);
    else {
      const l2 = t2;
      let a2, h2;
      for (t2 = n3[0], a2 = 0; a2 < n3.length - 1; a2++) h2 = O$2(this, l2[i4 + a2], e2, a2), h2 === S$5 && (h2 = this._$AH[a2]), o2 || (o2 = !D$3(h2) || h2 !== this._$AH[a2]), h2 === p$5 ? t2 = p$5 : t2 !== p$5 && (t2 += (h2 ?? "") + n3[a2 + 1]), this._$AH[a2] = h2;
    }
    o2 && !r2 && this.j(t2);
  }
  j(t2) {
    t2 === p$5 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
class oe extends Z$2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === p$5 ? void 0 : t2;
  }
}
class ae extends Z$2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== p$5);
  }
}
class le extends Z$2 {
  constructor(t2, e2, i4, r2, n3) {
    super(t2, e2, i4, r2, n3), this.type = 5;
  }
  _$AI(t2, e2 = this) {
    if ((t2 = O$2(this, t2, e2, 0) ?? p$5) === S$5) return;
    const i4 = this._$AH, r2 = t2 === p$5 && i4 !== p$5 || t2.capture !== i4.capture || t2.once !== i4.once || t2.passive !== i4.passive, n3 = t2 !== p$5 && (i4 === p$5 || r2);
    r2 && this.element.removeEventListener(this.name, this, i4), n3 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var e2;
    typeof this._$AH == "function" ? this._$AH.call(((e2 = this.options) == null ? void 0 : e2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class he {
  constructor(t2, e2, i4) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = i4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    O$2(this, t2);
  }
}
const et = H$3.litHtmlPolyfillSupport;
et == null || et(z$4, G$2), (H$3.litHtmlVersions ?? (H$3.litHtmlVersions = [])).push("3.3.1");
const ce = (s2, t2, e2) => {
  const i4 = (e2 == null ? void 0 : e2.renderBefore) ?? t2;
  let r2 = i4._$litPart$;
  if (r2 === void 0) {
    const n3 = (e2 == null ? void 0 : e2.renderBefore) ?? null;
    i4._$litPart$ = r2 = new G$2(t2.insertBefore(j$5(), n3), n3, void 0, e2 ?? {});
  }
  return r2._$AI(s2), r2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x$4 = globalThis;
let v$4 = class v extends w$3 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e2;
    const t2 = super.createRenderRoot();
    return (e2 = this.renderOptions).renderBefore ?? (e2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const e2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = ce(e2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Do) == null || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Do) == null || t2.setConnected(false);
  }
  render() {
    return S$5;
  }
};
var Tt;
v$4._$litElement$ = true, v$4.finalized = true, (Tt = x$4.litElementHydrateSupport) == null || Tt.call(x$4, { LitElement: v$4 });
const st$1 = x$4.litElementPolyfillSupport;
st$1 == null || st$1({ LitElement: v$4 });
(x$4.litElementVersions ?? (x$4.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W$2 = (s2) => (t2, e2) => {
  e2 !== void 0 ? e2.addInitializer(() => {
    customElements.define(s2, t2);
  }) : customElements.define(s2, t2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = { attribute: true, type: String, converter: V$2, reflect: false, hasChanged: at }, pe = (s2 = de, t2, e2) => {
  const { kind: i4, metadata: r2 } = e2;
  let n3 = globalThis.litPropertyMetadata.get(r2);
  if (n3 === void 0 && globalThis.litPropertyMetadata.set(r2, n3 = /* @__PURE__ */ new Map()), i4 === "setter" && ((s2 = Object.create(s2)).wrapped = true), n3.set(e2.name, s2), i4 === "accessor") {
    const { name: o2 } = e2;
    return { set(l2) {
      const a2 = t2.get.call(this);
      t2.set.call(this, l2), this.requestUpdate(o2, a2, s2);
    }, init(l2) {
      return l2 !== void 0 && this.C(o2, void 0, s2, l2), l2;
    } };
  }
  if (i4 === "setter") {
    const { name: o2 } = e2;
    return function(l2) {
      const a2 = this[o2];
      t2.call(this, l2), this.requestUpdate(o2, a2, s2);
    };
  }
  throw Error("Unsupported decorator location: " + i4);
};
function u$6(s2) {
  return (t2, e2) => typeof e2 == "object" ? pe(s2, t2, e2) : ((i4, r2, n3) => {
    const o2 = r2.hasOwnProperty(n3);
    return r2.constructor.createProperty(n3, i4), o2 ? Object.getOwnPropertyDescriptor(r2, n3) : void 0;
  })(s2, t2, e2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ht(s2) {
  return u$6({ ...s2, state: true, attribute: false });
}
function ue(s2, t2 = "this", e2) {
  return function(i4, r2, n3) {
    const o2 = i4.connectedCallback, l2 = i4.disconnectedCallback;
    i4.connectedCallback = function() {
      const a2 = t2 === "this" ? this : t2, h2 = Array.isArray(s2) ? s2 : [s2];
      this.__eventListenerRemovers ?? (this.__eventListenerRemovers = []);
      for (const c2 of h2) {
        const d2 = this[r2].bind(this);
        a2.addEventListener(c2, d2), this.__eventListenerRemovers.push(() => a2.removeEventListener(c2, d2));
      }
      o2 == null || o2.call(this);
    }, i4.disconnectedCallback = function() {
      var a2;
      (a2 = this.__eventListenerRemovers) == null || a2.forEach((h2) => h2()), this.__eventListenerRemovers = [], l2 == null || l2.call(this);
    };
  };
}
const Rt = "nte-group-open-close";
function jt(s2, t2) {
  document.dispatchEvent(
    new CustomEvent(Rt, {
      bubbles: false,
      composed: true,
      detail: { open: s2, groupName: t2 }
    })
  );
}
function fe(s2, t2) {
  const e2 = document.createElement("template");
  return e2.innerHTML = s2.trim(), t2.append(e2.content.cloneNode(true)), new Proxy({}, {
    get(i4, r2) {
      if (r2 === "fragment")
        return t2;
      if (typeof r2 == "string") {
        const n3 = t2.getElementById(r2);
        if (!n3)
          throw new Error(`❌ Unknown id '${r2}'.`);
        return n3;
      }
    }
  });
}
const ht = class ht2 extends w$3 {
  constructor(t2) {
    super();
    const e2 = this.createRenderRoot();
    this.$ = fe(t2, e2);
  }
  connectedCallback() {
    super.connectedCallback();
    let t2 = this.css;
    Array.isArray(t2) || (t2 = [t2]);
    const e2 = t2.map((i4) => i4 instanceof Ot ? i4.styleSheet : T$3(i4).styleSheet);
    this.shadowRoot.adoptedStyleSheets = e2;
  }
};
ht.DEFINITION = {
  classes: [],
  attributes: {}
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = { ATTRIBUTE: 1, CHILD: 2 }, zt = (s2) => (...t2) => ({ _$litDirective$: s2, values: t2 });
class Gt {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i4) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i4;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = zt(class extends Gt {
  constructor(s2) {
    var t2;
    if (super(s2), s2.type !== Dt.ATTRIBUTE || s2.name !== "class" || ((t2 = s2.strings) == null ? void 0 : t2.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(s2) {
    return " " + Object.keys(s2).filter((t2) => s2[t2]).join(" ") + " ";
  }
  update(s2, [t2]) {
    var i4, r2;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), s2.strings !== void 0 && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((n3) => n3 !== "")));
      for (const n3 in t2) t2[n3] && !((i4 = this.nt) != null && i4.has(n3)) && this.st.add(n3);
      return this.render(t2);
    }
    const e2 = s2.element.classList;
    for (const n3 of this.st) n3 in t2 || (e2.remove(n3), this.st.delete(n3));
    for (const n3 in t2) {
      const o2 = !!t2[n3];
      o2 === this.st.has(n3) || (r2 = this.nt) != null && r2.has(n3) || (o2 ? (e2.add(n3), this.st.add(n3)) : (e2.remove(n3), this.st.delete(n3)));
    }
    return S$5;
  }
}), ve = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--backdrop: rgb(from var(--nt-dark) r g b / .5);--header-background: transparent;--background-color: var(--nt-soft-primary);--shadow-color: rgb(from var(--nt-dark) r g b / .5);--main-padding: 0;--header-padding: var(--nt-space);position:fixed;top:0;right:0;height:100vh;width:33%;min-width:250px;max-width:400px;z-index:2000;padding:0;isolation:isolate;display:block}:host[opened]{display:block}#offcanvas{display:flex;flex-direction:column;width:100%;height:100%;background-color:var(--background-color);box-shadow:0 0 10px var(--shadow-color);transition:transform .2s ease-in-out;transform:translate(0)}#offcanvas.closed{transform:translate(100%)}#header{display:flex;width:100%;flex-direction:row;justify-content:space-between;align-items:center;background-color:var(--header-background);flex-grow:0;padding:var(--header-padding)}#header:has(>slot[empty]){display:none}#main{display:flex;width:100%;flex-grow:1;padding:var(--main-padding);min-height:200px;overflow:auto;scroll-behavior:auto;scrollbar-gutter:auto;height:100%}#footer{display:flex;width:100%;flex-direction:row;justify-content:space-between;align-items:center;margin-top:auto;flex-grow:0;padding:var(--padding)}#footer:has(>slot[empty]){display:none}#backdrop{opacity:1;transition:opacity .2s ease-in-out;position:fixed;top:0;left:0;width:100%;height:100%;background-color:var(--backdrop);z-index:-1;display:block}#backdrop.closed{opacity:0}";
var me = Object.defineProperty, ge = Object.getOwnPropertyDescriptor, B$3 = (s2, t2, e2, i4) => {
  for (var r2 = i4 > 1 ? void 0 : i4 ? ge(t2, e2) : t2, n3 = s2.length - 1, o2; n3 >= 0; n3--)
    (o2 = s2[n3]) && (r2 = (i4 ? o2(t2, e2, r2) : o2(r2)) || r2);
  return i4 && r2 && me(t2, e2, r2), r2;
};
let _$5 = class _ extends v$4 {
  constructor() {
    super(), this.backdrop = true, this.opened = false, this.dataGroupName = "", this.closedClass = true, this.addEventListener("click", (s2) => {
      s2 === void 0 || !s2.target || !(s2.target instanceof HTMLElement) || s2.target.closest("[data-nt-dismiss='offcanvas']") !== null && this.close();
    });
  }
  static get is() {
    return "nte-offcanvas";
  }
  connectedCallback() {
    super.connectedCallback();
  }
  open() {
    this.opened = true;
  }
  close() {
    this.opened = false;
  }
  toggle() {
    this.opened = !this.opened;
  }
  async updated(s2) {
    s2.has("opened") && (this.dataGroupName !== "" && jt(this.opened, this.dataGroupName), this.opened ? (this.style.display = "block", await ct(1), nt.observeEmptySlots(this), this.closedClass = false) : (this.closedClass = true, await ct(400), this.style.display = "none"));
  }
  render() {
    return k$2`
      <div
        id="backdrop"
        part="backdrop"
        @click=${() => this.opened = false}
        class=${xt({ closed: this.closedClass })}
      ></div>
      <div
        id="offcanvas"
        part="offcanvas"
        role="dialog"
        aria-modal="true"
        class=${xt({ closed: this.closedClass })}
        ?backdrop="${this.backdrop}"
      >
        <div id="header">
          <slot name="header"></slot>
        </div>

        <div id="main" part="main">
          <slot></slot>
        </div>

        <div id="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
};
_$5.styles = [T$3(ve)];
B$3([
  u$6({ type: Boolean, reflect: true })
], _$5.prototype, "backdrop", 2);
B$3([
  u$6({ type: Boolean, reflect: true })
], _$5.prototype, "opened", 2);
B$3([
  u$6({ type: String, attribute: "data-group-name" })
], _$5.prototype, "dataGroupName", 2);
B$3([
  Ht()
], _$5.prototype, "closedClass", 2);
_$5 = B$3([
  W$2(_$5.is)
], _$5);
const be = ":host{--container-width: var(--nt-container-width);--text-color: var(--nt-text);--hover-color: var(--nt-primary);--hover-text-color: var(--nt-text-on-primary);--transition: .2s ease-in-out;--submenu-bg: var(--nt-light);--submenu-text-color: var(--nt-text);--justify-content: center;--sidemenu-bg: var(--nt-soft-primary);--justify-sidebar-burger: flex-end;--height: auto;--default-alpha: .7;height:var(--height);display:block}nav{height:100%}#main{height:100%}#burger-wrapper{padding:15px}#text{padding-right:10px}#burger-default{cursor:pointer}#burger-default slot::slotted(span){color:rgb(from var(--text-color) r g b/var(--default-alpha));transition:color var(--transition)}#burger-default nte-burger{--color: rgb(from var(--text-color) r g b / var(--default-alpha))}#burger-default:hover slot::slotted(span){color:rgb(from var(--text-color) r g b/1)}#burger-default:hover nte-burger{--color: rgb(from var(--text-color) r g b / 1)}";
var _e = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, N$1 = (s2, t2, e2, i4) => {
  for (var r2 = i4 > 1 ? void 0 : i4 ? ye(t2, e2) : t2, n3 = s2.length - 1, o2; n3 >= 0; n3--)
    (o2 = s2[n3]) && (r2 = (i4 ? o2(t2, e2, r2) : o2(r2)) || r2);
  return i4 && r2 && _e(t2, e2, r2), r2;
};
let y$4 = class y extends v$4 {
  constructor() {
    super(), this.mode = "slave", this.breakpoint = "99999px", this.transferTo = "", this.dataGroupName = "", this._isTransferred = false;
  }
  getOffcanvas() {
    return this.transferTo ? document.querySelector(this.transferTo) : null;
  }
  getOffcanvasNav() {
    const s2 = this.getOffcanvas();
    return s2 ? s2.querySelector("nte-nav") : null;
  }
  render() {
    return k$2` <nav>
      <div id="burger-wrapper" ?hidden=${!this._isTransferred}>
        <slot
          name="burger"
          open
          aria-haspopup="true"
          id="burger"
          class="burger"
          @click=${() => {
      var s2;
      return (s2 = this.getOffcanvas()) == null ? void 0 : s2.open();
    }}
        >
          <!-- fallback icon -->
          ${this._isTransferred ? k$2`<div id="burger-default" style="display:flex; align-items: center; justify-content: center;">
                <div id="text"><slot name="menu-text"></slot></div>
                <nte-burger
                  data-group-name="${this.dataGroupName}"
                  id="open-burger"
                  onclick="this.open = true"
                ></nte-burger>
              </div>` : ""}
        </slot>
      </div>

      <div class="nt-nav-links" id="main" part="main">
        <slot id="main-slot"></slot>
      </div>
    </nav>`;
  }
  transferToElement(s2) {
    var i4;
    const t2 = (i4 = this.shadowRoot) == null ? void 0 : i4.querySelector("#main-slot");
    if (t2 === null)
      return;
    Array.from(t2.assignedElements({ flatten: true })).forEach((r2) => {
      r2 instanceof HTMLElement && s2.appendChild(r2);
    });
  }
  updated(s2) {
    var t2, e2;
    super.updated(s2), this._isTransferred ? this.transferToElement(
      this.getOffcanvasNav() ?? (() => {
        throw new Error("No offcanvas nav found");
      })()
    ) : ((t2 = this.getOffcanvasNav()) == null || t2.transferToElement(this), (e2 = this.getOffcanvas()) == null || e2.close());
  }
  firstUpdated(s2) {
    super.firstUpdated(s2);
    const t2 = this.classList;
    !t2.contains("nav-vertical") && !t2.contains("nav-horizontal") && t2.add(this.closest("nte-offcanvas") === null ? "nav-horizontal" : "nav-vertical");
  }
  async connectedCallback() {
    await Yt(), super.connectedCallback(), this.mode !== "slave" && this.transferTo !== "" && (this._isTransferred = false, this.breakpoint !== "" && (dt(this.breakpoint) || (this._isTransferred = true), window.addEventListener("breakpoint-changed", (s2) => {
      dt(this.breakpoint) ? this._isTransferred = false : this._isTransferred = true;
    })));
  }
};
y$4.styles = [T$3(be)];
N$1([
  u$6({ type: String, reflect: true })
], y$4.prototype, "mode", 2);
N$1([
  u$6({ type: String, reflect: true })
], y$4.prototype, "breakpoint", 2);
N$1([
  u$6({ type: String, reflect: true, attribute: "transfer-to" })
], y$4.prototype, "transferTo", 2);
N$1([
  u$6({ type: String, reflect: false, attribute: "data-group-name" })
], y$4.prototype, "dataGroupName", 2);
N$1([
  Ht()
], y$4.prototype, "_isTransferred", 2);
y$4 = N$1([
  W$2("nte-nav")
], y$4);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = (s2) => s2.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R$2 = (s2, t2) => {
  var i4;
  const e2 = s2._$AN;
  if (e2 === void 0) return false;
  for (const r2 of e2) (i4 = r2._$AO) == null || i4.call(r2, t2, false), R$2(r2, t2);
  return true;
}, J$1 = (s2) => {
  let t2, e2;
  do {
    if ((t2 = s2._$AM) === void 0) break;
    e2 = t2._$AN, e2.delete(s2), s2 = t2;
  } while ((e2 == null ? void 0 : e2.size) === 0);
}, Wt = (s2) => {
  for (let t2; t2 = s2._$AM; s2 = t2) {
    let e2 = t2._$AN;
    if (e2 === void 0) t2._$AN = e2 = /* @__PURE__ */ new Set();
    else if (e2.has(s2)) break;
    e2.add(s2), xe(t2);
  }
};
function we(s2) {
  this._$AN !== void 0 ? (J$1(this), this._$AM = s2, Wt(this)) : this._$AM = s2;
}
function Ae(s2, t2 = false, e2 = 0) {
  const i4 = this._$AH, r2 = this._$AN;
  if (r2 !== void 0 && r2.size !== 0) if (t2) if (Array.isArray(i4)) for (let n3 = e2; n3 < i4.length; n3++) R$2(i4[n3], false), J$1(i4[n3]);
  else i4 != null && (R$2(i4, false), J$1(i4));
  else R$2(this, s2);
}
const xe = (s2) => {
  s2.type == Dt.CHILD && (s2._$AP ?? (s2._$AP = Ae), s2._$AQ ?? (s2._$AQ = we));
};
class Ee extends Gt {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t2, e2, i4) {
    super._$AT(t2, e2, i4), Wt(this), this.isConnected = t2._$AU;
  }
  _$AO(t2, e2 = true) {
    var i4, r2;
    t2 !== this.isConnected && (this.isConnected = t2, t2 ? (i4 = this.reconnected) == null || i4.call(this) : (r2 = this.disconnected) == null || r2.call(this)), e2 && (R$2(this, t2), J$1(this));
  }
  setValue(t2) {
    if ($e(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const e2 = [...this._$Ct._$AH];
      e2[this._$Ci] = t2, this._$Ct._$AI(e2, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = () => new Se();
class Se {
}
const it = /* @__PURE__ */ new WeakMap(), St = zt(class extends Ee {
  render(s2) {
    return p$5;
  }
  update(s2, [t2]) {
    var i4;
    const e2 = t2 !== this.G;
    return e2 && this.G !== void 0 && this.rt(void 0), (e2 || this.lt !== this.ct) && (this.G = t2, this.ht = (i4 = s2.options) == null ? void 0 : i4.host, this.rt(this.ct = s2.element)), p$5;
  }
  rt(s2) {
    if (this.isConnected || (s2 = void 0), typeof this.G == "function") {
      const t2 = this.ht ?? globalThis;
      let e2 = it.get(t2);
      e2 === void 0 && (e2 = /* @__PURE__ */ new WeakMap(), it.set(t2, e2)), e2.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e2.set(this.G, s2), s2 !== void 0 && this.G.call(this.ht, s2);
    } else this.G.value = s2;
  }
  get lt() {
    var s2, t2;
    return typeof this.G == "function" ? (s2 = it.get(this.ht ?? globalThis)) == null ? void 0 : s2.get(this.G) : (t2 = this.G) == null ? void 0 : t2.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
}), Ce = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--bg: transparent;--spacer-bg: transparent;--container-width: var(--nt-container-width, 100%);--brand-height: 80px;--spacer-height: 80px;width:100vw;margin:0}:host(a){height:85px;width:auto}#wrapper{position:relative;left:0;top:0;right:0;width:100%}#spacer{position:relative;top:0;left:0;width:100%;transition:height .3s ease-in-out;height:var(--spacer-height);background-color:var(--spacer-bg)}#navbar{position:absolute;top:0;width:100vw;height:auto;background-color:var(--bg);z-index:1000}#main{width:100vw;display:block}";
var Te = Object.defineProperty, Pe = Object.getOwnPropertyDescriptor, Bt = (s2, t2, e2, i4) => {
  for (var r2 = i4 > 1 ? void 0 : i4 ? Pe(t2, e2) : t2, n3 = s2.length - 1, o2; n3 >= 0; n3--)
    (o2 = s2[n3]) && (r2 = (i4 ? o2(t2, e2, r2) : o2(r2)) || r2);
  return i4 && r2 && Te(t2, e2, r2), r2;
};
let K$1 = class K extends v$4 {
  constructor() {
    super(), this.navbarRef = Et(), this.spacerRef = Et(), this.scrollThreshold = 0, this._lastScrollY = window.scrollY, this._scrollUpPixels = 0, this._debouncer = new Pt(100, 300), document.addEventListener(
      "scroll",
      async () => {
        this.updateScrollState();
      },
      { passive: true }
    );
  }
  static get is() {
    return "nte-navbar";
  }
  updateScrollState() {
    const s2 = window.scrollY;
    s2 > 1 ? this.classList.add("is-scrolled") : this.classList.remove("is-scrolled"), s2 < this._lastScrollY ? (this._scrollUpPixels += this._lastScrollY - s2, this._scrollUpPixels > 10 && s2 < this.scrollThreshold && this.classList.add("is-scrolling-up")) : (this._scrollUpPixels = 0, this.classList.remove("is-scrolling-up")), s2 > this.scrollThreshold ? this.classList.add("is-below-threshold") : this.classList.remove("is-below-threshold"), this._lastScrollY = s2;
  }
  async connectedCallback() {
    this.updateScrollState(), await pt(), super.connectedCallback();
  }
  // Adjust the spacer height on every render
  async updated(s2) {
    await pt(), super.updated(s2);
  }
  firstUpdated(s2) {
    nt.observeEmptySlots(this);
  }
  render() {
    return k$2`
      <div id="wrapper" part="wrapper">
        <div id="spacer" part="spacer" ${St(this.spacerRef)}></div>
        <div id="navbar" part="navbar" ${St(this.navbarRef)}>
          <div id="brand" part="brand">
            <slot name="brand"></slot>
          </div>
          <div id="main">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
K$1.styles = [T$3(Ce)];
Bt([
  u$6({ type: Number, attribute: "scroll-threshold", reflect: true })
], K$1.prototype, "scrollThreshold", 2);
K$1 = Bt([
  W$2("nte-navbar")
], K$1);
const ke = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--container-width: var(--nt-container-width, 100%);--background: transparent;--text-color: var(--nt-text);--height: auto;--brand-height: 80px;display:block;height:100%;width:100vw}:host(.hide-on-scroll){transition:max-height .3s ease-in-out;max-height:100px}:host(.hide-on-scroll.is-scrolled){max-height:0;overflow:hidden}#main{height:var(--height);transition:height .2s ease-in-out;overflow:visible;width:100%;display:flex;background:var(--background)}#container{width:var(--container-width);margin:0 auto;display:flex}#container #brand{min-width:0;flex-shrink:1;width:auto;align-items:start;display:flex;height:100%;justify-items:center}#container #brand:has(slot[empty]){display:none}#container #nav{display:flex;flex-grow:1;justify-content:end;align-items:center;gap:1rem}";
var Ne = (s2, t2, e2, i4) => {
  for (var r2 = t2, n3 = s2.length - 1, o2; n3 >= 0; n3--)
    (o2 = s2[n3]) && (r2 = o2(r2) || r2);
  return r2;
};
let rt = class extends v$4 {
  constructor() {
    super(...arguments), this._isScrolled = false;
  }
  static get is() {
    return "nte-navbar-line";
  }
  updateScrollState() {
    const s2 = window.scrollY;
    s2 > 1 && !this._isScrolled ? (this.classList.add("is-scrolled"), this._isScrolled = true) : s2 <= 1 && this._isScrolled && (this.classList.remove("is-scrolled"), this._isScrolled = false);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("scroll", () => this.updateScrollState(), { passive: true });
  }
  async firstUpdated(s2) {
    nt.observeEmptySlots(this), this.updateScrollState();
  }
  render() {
    return k$2`
      <div id="main" part="main">
        <div id="container" part="container">
          <div id="brand" part="brand">
            <slot name="brand"></slot>
          </div>
          <div id="nav" part="nav">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
};
rt.styles = [T$3(ke)];
rt = Ne([
  W$2("nte-navbar-line")
], rt);
const Me = ":host{--size: 40px;--color: var(--nt-text, black);--color-hover: var(--color);--width: 4px;height:var(--size);width:var(--size);display:block}#button{padding:0;width:100%;height:100%;cursor:pointer}.hamburger{display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0 none;background:none;position:relative;transition:transform .4s}.hamburger:hover{--color: var(--color-hover)}:host([open]) .hamburger .bar:nth-of-type(1){transform-origin:center center;transform:translateY(calc(.5em - var(--width) / 2)) rotate(45deg)}:host([open]) .hamburger .bar:nth-of-type(2){opacity:0}:host([open]) .hamburger .bar:nth-of-type(3){transform:translateY(calc(.5em - var(--width) / 2)) rotate(-45deg)}:host(:not([open])) #button:hover .bar:nth-of-type(1){transform:translateY(calc(.2em - var(--width) / 2))}:host(:not([open])) #button:hover .bar:nth-of-type(2){transform:translateY(calc(.5em - var(--width) / 2))}:host(:not([open])) #button:hover .bar:nth-of-type(3){transform:translateY(calc(.8em - var(--width) / 2))}.bar{font-size:var(--size);height:var(--width);width:var(--size);display:block;position:absolute;top:0;background-color:var(--color);transition:.4s}.bar:nth-of-type(1){transform:translateY(calc(.25em - var(--width) / 2))}.bar:nth-of-type(2){transform:translateY(calc(.5em - var(--width) / 2))}.bar:nth-of-type(3){transform:translateY(calc(.75em - var(--width) / 2))}";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = Symbol.for(""), Le = (s2) => {
  if ((s2 == null ? void 0 : s2.r) === Ue) return s2 == null ? void 0 : s2._$litStatic$;
}, Ct = /* @__PURE__ */ new Map(), He = (s2) => (t2, ...e2) => {
  const i4 = e2.length;
  let r2, n3;
  const o2 = [], l2 = [];
  let a2, h2 = 0, c2 = false;
  for (; h2 < i4; ) {
    for (a2 = t2[h2]; h2 < i4 && (n3 = e2[h2], (r2 = Le(n3)) !== void 0); ) a2 += r2 + t2[++h2], c2 = true;
    h2 !== i4 && l2.push(n3), o2.push(a2), h2++;
  }
  if (h2 === i4 && o2.push(t2[i4]), c2) {
    const d2 = o2.join("$$lit$$");
    (t2 = Ct.get(d2)) === void 0 && (o2.raw = o2, Ct.set(d2, t2 = o2)), e2 = l2;
  }
  return s2(t2, ...e2);
}, Re = He(k$2);
var je = Object.defineProperty, De = Object.getOwnPropertyDescriptor, I$1 = (s2, t2, e2, i4) => {
  for (var r2 = i4 > 1 ? void 0 : i4 ? De(t2, e2) : t2, n3 = s2.length - 1, o2; n3 >= 0; n3--)
    (o2 = s2[n3]) && (r2 = (i4 ? o2(t2, e2, r2) : o2(r2)) || r2);
  return i4 && r2 && je(t2, e2, r2), r2;
};
let C$4 = class C extends v$4 {
  constructor() {
    super(), this.open = false, this.text = "Menu", this.dataGroupName = "";
  }
  render() {
    return Re` <button id="button" class="hamburger">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </button>`;
  }
  listenEvents(s2) {
    s2.detail.groupName === this.dataGroupName && (this.open = s2.detail.open);
  }
  update(s2) {
    super.update(s2), s2.has("open") && this.dataGroupName !== "" && jt(this.open, this.dataGroupName);
  }
};
C$4.styles = [T$3(Me)];
I$1([
  u$6({ type: Boolean, attribute: "open", reflect: true })
], C$4.prototype, "open", 2);
I$1([
  u$6({ type: String, reflect: true })
], C$4.prototype, "text", 2);
I$1([
  u$6({ type: String, reflect: false, attribute: "data-group-name" })
], C$4.prototype, "dataGroupName", 2);
I$1([
  ue(Rt, document)
], C$4.prototype, "listenEvents", 1);
C$4 = I$1([
  W$2("nte-burger")
], C$4);
console.log("Loading nte-nav...");
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = globalThis, e$4 = t$4.ShadowRoot && (void 0 === t$4.ShadyCSS || t$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), o$5 = /* @__PURE__ */ new WeakMap();
let n$5 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$4 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$5.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$5.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$5 = (t2) => new n$5("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), S$4 = (s2, o2) => {
  if (e$4) s2.adoptedStyleSheets = o2.map(((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet));
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$4.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$5 = e$4 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$5(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$4, defineProperty: e$3, getOwnPropertyDescriptor: h$2, getOwnPropertyNames: r$4, getOwnPropertySymbols: o$4, getPrototypeOf: n$4 } = Object, a$1 = globalThis, c$4 = a$1.trustedTypes, l$2 = c$4 ? c$4.emptyScript : "", p$4 = a$1.reactiveElementPolyfillSupport, d$4 = (t2, s2) => t2, u$5 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$2 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i4 = t2;
  switch (s2) {
    case Boolean:
      i4 = null !== t2;
      break;
    case Number:
      i4 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t2);
      } catch (t3) {
        i4 = null;
      }
  }
  return i4;
} }, f$4 = (t2, s2) => !i$4(t2, s2), b$3 = { attribute: true, type: String, converter: u$5, reflect: false, useDefault: false, hasChanged: f$4 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$3 = class y2 extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$3) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i4 = Symbol(), h2 = this.getPropertyDescriptor(t2, i4, s2);
      void 0 !== h2 && e$3(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i4) {
    const { get: e2, set: r2 } = h$2(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$3;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$4("elementProperties"))) return;
    const t2 = n$4(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$4("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$4("properties"))) {
      const t3 = this.properties, s2 = [...r$4(t3), ...o$4(t3)];
      for (const i4 of s2) this.createProperty(i4, t3[i4]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i4] of s2) this.elementProperties.set(t3, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i4 = this._$Eu(t3, s2);
      void 0 !== i4 && this._$Eh.set(i4, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i4 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i4.unshift(c$5(s3));
    } else void 0 !== s2 && i4.push(c$5(s2));
    return i4;
  }
  static _$Eu(t2, s2) {
    const i4 = s2.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise(((t2) => this.enableUpdating = t2)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach(((t2) => t2(this)));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i4 of s2.keys()) this.hasOwnProperty(i4) && (t2.set(i4, this[i4]), delete this[i4]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$4(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach(((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    }));
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach(((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    }));
  }
  attributeChangedCallback(t2, s2, i4) {
    this._$AK(t2, i4);
  }
  _$ET(t2, s2) {
    var _a2;
    const i4 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i4);
    if (void 0 !== e2 && true === i4.reflect) {
      const h2 = (void 0 !== ((_a2 = i4.converter) == null ? void 0 : _a2.toAttribute) ? i4.converter : u$5).toAttribute(s2, i4.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i4 = this.constructor, e2 = i4._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i4.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$5;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i4) {
    var _a2;
    if (void 0 !== t2) {
      const e2 = this.constructor, h2 = this[t2];
      if (i4 ?? (i4 = e2.getPropertyOptions(t2)), !((i4.hasChanged ?? f$4)(h2, s2) || i4.useDefault && i4.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(e2._$Eu(t2, i4)))) return;
      this.C(t2, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i4, reflect: e2, wrapped: h2 }, r2) {
    i4 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i4 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i4] of t3) {
        const { wrapped: t4 } = i4, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i4, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach(((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      })), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach(((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((t3) => this._$ET(t3, this[t3])))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$3.elementStyles = [], y$3.shadowRootOptions = { mode: "open" }, y$3[d$4("elementProperties")] = /* @__PURE__ */ new Map(), y$3[d$4("finalized")] = /* @__PURE__ */ new Map(), p$4 == null ? void 0 : p$4({ ReactiveElement: y$3 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = globalThis, i$3 = t$3.trustedTypes, s$2 = i$3 ? i$3.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$2 = "$lit$", h$1 = `lit$${Math.random().toFixed(9).slice(2)}$`, o$3 = "?" + h$1, n$3 = `<${o$3}>`, r$3 = document, l$1 = () => r$3.createComment(""), c$3 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u$4 = (t2) => a(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), d$3 = "[ 	\n\f\r]", f$3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$3 = /-->/g, _$4 = />/g, m$3 = RegExp(`>|${d$3}(?:([^\\s"'>=/]+)(${d$3}*=${d$3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p$3 = /'/g, g$3 = /"/g, $$2 = /^(?:script|style|textarea|title)$/i, y$2 = (t2) => (i4, ...s2) => ({ _$litType$: t2, strings: i4, values: s2 }), x$3 = y$2(1), T$2 = Symbol.for("lit-noChange"), E$2 = Symbol.for("lit-nothing"), A$2 = /* @__PURE__ */ new WeakMap(), C$3 = r$3.createTreeWalker(r$3, 129);
function P$1(t2, i4) {
  if (!a(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$2 ? s$2.createHTML(i4) : i4;
}
const V$1 = (t2, i4) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", c2 = f$3;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t2[i5];
    let a2, u2, d2 = -1, y5 = 0;
    for (; y5 < s3.length && (c2.lastIndex = y5, u2 = c2.exec(s3), null !== u2); ) y5 = c2.lastIndex, c2 === f$3 ? "!--" === u2[1] ? c2 = v$3 : void 0 !== u2[1] ? c2 = _$4 : void 0 !== u2[2] ? ($$2.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m$3) : void 0 !== u2[3] && (c2 = m$3) : c2 === m$3 ? ">" === u2[0] ? (c2 = r2 ?? f$3, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m$3 : '"' === u2[3] ? g$3 : p$3) : c2 === g$3 || c2 === p$3 ? c2 = m$3 : c2 === v$3 || c2 === _$4 ? c2 = f$3 : (c2 = m$3, r2 = void 0);
    const x3 = c2 === m$3 && t2[i5 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f$3 ? s3 + n$3 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e$2 + s3.slice(d2) + h$1 + x3) : s3 + h$1 + (-2 === d2 ? i5 : x3);
  }
  return [P$1(t2, l2 + (t2[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), o2];
};
class N {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f3, v3] = V$1(t2, s2);
    if (this.el = N.createElement(f3, n3), C$3.currentNode = this.el.content, 2 === s2 || 3 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = C$3.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(e$2)) {
          const i4 = v3[a2++], s3 = r2.getAttribute(t3).split(h$1), e2 = /([.?@])?(.*)/.exec(i4);
          d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? H$2 : "?" === e2[1] ? I : "@" === e2[1] ? L$2 : k$1 }), r2.removeAttribute(t3);
        } else t3.startsWith(h$1) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($$2.test(r2.tagName)) {
          const t3 = r2.textContent.split(h$1), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i$3 ? i$3.emptyScript : "";
            for (let i4 = 0; i4 < s3; i4++) r2.append(t3[i4], l$1()), C$3.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === o$3) d2.push({ type: 2, index: c2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(h$1, t3 + 1)); ) d2.push({ type: 7, index: c2 }), t3 += h$1.length - 1;
      }
      c2++;
    }
  }
  static createElement(t2, i4) {
    const s2 = r$3.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function S$3(t2, i4, s2 = t2, e2) {
  var _a2, _b;
  if (i4 === T$2) return i4;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = c$3(i4) ? void 0 : i4._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i4 = S$3(t2, h2._$AS(t2, i4.values), h2, e2)), i4;
}
let M$2 = class M {
  constructor(t2, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i4 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? r$3).importNode(i4, true);
    C$3.currentNode = e2;
    let h2 = C$3.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i5;
        2 === l2.type ? i5 = new R$1(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i5 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i5 = new z$3(h2, this, t2)), this._$AV.push(i5), l2 = s2[++n3];
      }
      o2 !== (l2 == null ? void 0 : l2.index) && (h2 = C$3.nextNode(), o2++);
    }
    return C$3.currentNode = r$3, e2;
  }
  p(t2) {
    let i4 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t2[i4])), i4++;
  }
};
let R$1 = class R {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i4, s2, e2) {
    this.type = 2, this._$AH = E$2, this._$AN = void 0, this._$AA = t2, this._$AB = i4, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i4.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i4 = this) {
    t2 = S$3(this, t2, i4), c$3(t2) ? t2 === E$2 || null == t2 || "" === t2 ? (this._$AH !== E$2 && this._$AR(), this._$AH = E$2) : t2 !== this._$AH && t2 !== T$2 && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u$4(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== E$2 && c$3(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$3.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i4, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = N.createElement(P$1(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i4);
    else {
      const t3 = new M$2(e2, this), s3 = t3.u(this.options);
      t3.p(i4), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i4 = A$2.get(t2.strings);
    return void 0 === i4 && A$2.set(t2.strings, i4 = new N(t2)), i4;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i4.length ? i4.push(s2 = new R(this.O(l$1()), this.O(l$1()), this, this.options)) : s2 = i4[e2], s2._$AI(h2), e2++;
    e2 < i4.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i4.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i4) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i4); t2 !== this._$AB; ) {
      const i5 = t2.nextSibling;
      t2.remove(), t2 = i5;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
};
let k$1 = class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i4, s2, e2, h2) {
    this.type = 1, this._$AH = E$2, this._$AN = void 0, this.element = t2, this.name = i4, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = E$2;
  }
  _$AI(t2, i4 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = S$3(this, t2, i4, 0), o2 = !c$3(t2) || t2 !== this._$AH && t2 !== T$2, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = S$3(this, e3[s2 + n3], i4, n3), r2 === T$2 && (r2 = this._$AH[n3]), o2 || (o2 = !c$3(r2) || r2 !== this._$AH[n3]), r2 === E$2 ? t2 = E$2 : t2 !== E$2 && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === E$2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
let H$2 = class H extends k$1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === E$2 ? void 0 : t2;
  }
};
class I extends k$1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== E$2);
  }
}
let L$2 = class L extends k$1 {
  constructor(t2, i4, s2, e2, h2) {
    super(t2, i4, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i4 = this) {
    if ((t2 = S$3(this, t2, i4, 0) ?? E$2) === T$2) return;
    const s2 = this._$AH, e2 = t2 === E$2 && s2 !== E$2 || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== E$2 && (s2 === E$2 || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
};
let z$3 = class z2 {
  constructor(t2, i4, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S$3(this, t2);
  }
};
const Z$1 = { I: R$1 }, j$4 = t$3.litHtmlPolyfillSupport;
j$4 == null ? void 0 : j$4(N, R$1), (t$3.litHtmlVersions ?? (t$3.litHtmlVersions = [])).push("3.3.1");
const B$2 = (t2, i4, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i4;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new R$1(i4.insertBefore(l$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$1 = globalThis;
let i$2 = class i extends y$3 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = B$2(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return T$2;
  }
};
i$2._$litElement$ = true, i$2["finalized"] = true, (_a = s$1.litElementHydrateSupport) == null ? void 0 : _a.call(s$1, { LitElement: i$2 });
const o$2 = s$1.litElementPolyfillSupport;
o$2 == null ? void 0 : o$2({ LitElement: i$2 });
(s$1.litElementVersions ?? (s$1.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer((() => {
    customElements.define(t2, e2);
  })) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = { attribute: true, type: String, converter: u$5, reflect: false, hasChanged: f$4 }, r$2 = (t2 = o$1, e2, r2) => {
  const { kind: n3, metadata: i4 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i4);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i4, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$2(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
var g$2 = Object.defineProperty;
var c$2 = (t2) => {
  throw TypeError(t2);
};
var f$2 = (t2, e2, n3) => e2 in t2 ? g$2(t2, e2, { enumerable: true, configurable: true, writable: true, value: n3 }) : t2[e2] = n3;
var l = (t2, e2, n3) => f$2(t2, typeof e2 != "symbol" ? e2 + "" : e2, n3), d$2 = (t2, e2, n3) => e2.has(t2) || c$2("Cannot " + n3);
var r$1 = (t2, e2, n3) => (d$2(t2, e2, "read from private field"), n3 ? n3.call(t2) : e2.get(t2)), u$3 = (t2, e2, n3) => e2.has(t2) ? c$2("Cannot add the same private member more than once") : e2 instanceof WeakSet ? e2.add(t2) : e2.set(t2, n3), m$2 = (t2, e2, n3, i4) => (d$2(t2, e2, "write to private field"), e2.set(t2, n3), n3);
function E$1(t2, e2 = {}, n3 = []) {
  Array.isArray(n3) || (n3 = [n3]);
  const i4 = document.createElement(t2);
  for (const s2 in e2)
    e2[s2] !== null && e2[s2] !== void 0 && i4.setAttribute(s2, e2[s2] !== true ? e2[s2] : "");
  for (const s2 of n3)
    i4.append(typeof s2 == "string" ? document.createTextNode(s2) : s2);
  return i4;
}
let y$1 = class y3 {
  /**
   *
   * @param delay     Debounce delay in milliseconds
   * @param max_delay Maximum delay in milliseconds, if false then no maximum delay is applied
   */
  constructor(e2, n3 = false) {
    l(this, "timeout", null);
    l(this, "startTimeWithMs", 0);
    this.delay = e2, this.max_delay = n3;
  }
  async wait() {
    return this.startTimeWithMs === 0 && (this.startTimeWithMs = Date.now()), this.timeout && (this.max_delay === false || this.startTimeWithMs + this.max_delay > Date.now()) && clearTimeout(this.timeout), new Promise((e2) => {
      this.timeout = setTimeout(() => {
        this.startTimeWithMs = 0, e2(true);
      }, this.delay);
    });
  }
  debounce(e2) {
    this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(() => {
      e2();
    }, this.delay);
  }
};
let w$2 = class w2 {
  constructor(e2, n3, i4 = "main") {
    this._debug = e2, this.myElementId = n3, this.instanceId = i4;
  }
  log(...e2) {
    this._debug && console.log(`[LOG][ID:${this.myElementId}:${this.instanceId}]`, ...e2);
  }
  warn(...e2) {
    console.warn(`[WARN][ID:${this.myElementId}:${this.instanceId}]`, ...e2);
  }
  error(...e2) {
    console.error(`[ERROR][ID:${this.myElementId}:${this.instanceId}]`, ...e2);
  }
  throwError(...e2) {
    const n3 = `[ERROR][ID:${this.myElementId}:${this.instanceId}] ${e2.join(" ")}`;
    throw this.error(...e2), new Error(n3);
  }
};
let p$2 = class p {
  constructor(e2, n3 = true) {
    l(this, "label");
    l(this, "last");
    l(this, "startTime");
    l(this, "running", false);
    l(this, "enabled");
    this.label = e2, this.enabled = n3, this.startTime = this.last = performance.now(), this.running = true;
  }
  lap(e2 = "") {
    if (!this.enabled) return;
    const n3 = performance.now(), i4 = (n3 - this.last) / 1e3;
    this.last = n3, console.debug(`[${this.label}] ${e2} +${i4.toFixed(3)}s`);
  }
  elapsed() {
    return performance.now() - this.startTime;
  }
  reset() {
    this.startTime = this.last = performance.now();
  }
  stop() {
    return this.running = false, this.elapsed();
  }
  start() {
    this.running = true, this.reset();
  }
  isRunning() {
    return this.running;
  }
};
function $$1() {
  return document.readyState === "loading" ? new Promise((t2) => {
    document.addEventListener("DOMContentLoaded", () => t2());
  }) : Promise.resolve();
}
let b$2 = 1;
function x$2(t2) {
  var n3, i4, s2;
  class e2 extends t2 {
    constructor() {
      super(...arguments);
      u$3(this, n3, null);
      u$3(this, i4, b$2++);
      u$3(this, s2, null);
    }
    /**
     * Clears the cached debug flag so the attribute will be checked again
     * on the next log/warn/error call.
     */
    invalidateDebugCache() {
      m$2(this, n3, null);
    }
    get _debug() {
      return r$1(this, n3) !== null ? r$1(this, n3) : (this instanceof HTMLElement && m$2(this, n3, this.hasAttribute("debug") && !["false", "0", "off", "no"].includes(this.getAttribute("debug") || "")), r$1(this, n3) === true && console.log(`[DEBUG][ID:${r$1(this, i4)}] LoggingMixin: Debug mode is enabled for <${this.tagName}>`, this), r$1(this, n3) ?? false);
    }
    getLogger(o2 = "main") {
      return r$1(this, s2) || m$2(this, s2, new w$2(this._debug, `${r$1(this, i4)}`, o2)), r$1(this, s2);
    }
    log(...o2) {
      this.getLogger().log(...o2);
    }
    warn(...o2) {
      this.getLogger().warn(...o2);
    }
    error(...o2) {
      this.getLogger().error(...o2);
    }
    throwError(...o2) {
      return this.getLogger().throwError(...o2);
    }
  }
  return n3 = /* @__PURE__ */ new WeakMap(), i4 = /* @__PURE__ */ new WeakMap(), s2 = /* @__PURE__ */ new WeakMap(), e2;
}
var C$2 = Object.defineProperty;
var _$3 = (n3, t2, r2) => t2 in n3 ? C$2(n3, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : n3[t2] = r2;
var h = (n3, t2, r2) => _$3(n3, typeof t2 != "symbol" ? t2 + "" : t2, r2);
let S$2 = class S {
  constructor(t2, r2 = false) {
    h(this, "rootNode");
    h(this, "currentContainerNode", null);
    h(this, "containerPath", []);
    h(this, "containerIndex", [0]);
    h(this, "lastFixedI", 20);
    this.debug = r2, this.currentContainerNode = this.rootNode = t2, this.containerPath.push(this.rootNode);
  }
  getI(t2) {
    const r2 = t2.tagName, o2 = t2.getAttribute("layout"), e2 = { i: -99, variant: "new", tag: "hr", hi: null };
    if (o2) {
      const s2 = /^(\+|-|)([0-9]\.?[0-9]?|)(;|$)/, i4 = o2.match(s2);
      i4 && (console.debug("Layout matches", i4), e2.variant = i4[1] === "+" ? "append" : i4[1] === "-" ? "skip" : "new", i4[2] !== "" && (e2.i = parseFloat(i4[2]) * 10));
    }
    if (r2.startsWith("H") && r2.length === 2) {
      let s2 = r2.substring(1);
      return e2.tag = "h", e2.hi = parseInt(s2), s2 === "1" && (s2 = "2"), e2.i === -99 && (e2.i = parseInt(s2) * 10, this.lastFixedI = e2.i), e2;
    }
    return e2.i === -99 && r2 === "HR" ? (e2.i = this.lastFixedI + 5, e2) : null;
  }
  getAttributeRecords(t2, r2 = false) {
    const o2 = {};
    for (const e2 of t2.attributes)
      e2.name.startsWith("section-") ? o2[e2.name] = e2.value.replace(/^section-/, "") : e2.name.startsWith("layout") ? (o2[e2.name] = e2.value, t2.removeAttribute(e2.name)) : r2 && (o2[e2.name] = e2.value);
    if (!r2)
      for (const e2 of Array.from(t2.classList))
        e2.startsWith("section-") && (o2.class = (o2.class || "") + " " + e2.replace(/^section-/, ""), t2.classList.remove(e2));
    return o2;
  }
  createNewContainerNode(t2, r2) {
    const o2 = this.getAttributeRecords(t2, t2.tagName === "HR"), e2 = E$1("section", o2);
    return e2.__IT = r2, e2;
  }
  arrangeSingleNode(t2, r2) {
    r2.i;
    let o2 = 0;
    for (o2 = 0; o2 < this.containerIndex.length && !(this.containerIndex[o2] >= r2.i); o2++)
      ;
    let e2 = null;
    r2.variant === "append" ? (console.log("Appending to container at index", o2, "with i", r2.i), e2 = this.containerPath[o2]) : e2 = this.createNewContainerNode(t2, r2);
    const s2 = this.containerPath[o2 - 1];
    this.containerPath.length = o2, this.containerIndex.length = o2, e2.appendChild(t2), s2.appendChild(e2), this.containerPath.push(e2), this.containerIndex.push(r2.i), this.currentContainerNode = e2;
  }
  appendToCurrentContainer(t2) {
    if (this.currentContainerNode === null)
      throw new Error("No current container node set");
    this.currentContainerNode.appendChild(t2);
  }
  arrange(t2) {
    for (let r2 of t2) {
      if (r2.nodeType !== Node.ELEMENT_NODE) {
        this.appendToCurrentContainer(r2);
        continue;
      }
      const o2 = r2, e2 = this.getI(o2);
      if (!e2 || e2.variant === "skip") {
        this.appendToCurrentContainer(r2);
        continue;
      }
      this.arrangeSingleNode(o2, e2);
    }
  }
};
const $ = ":host{--border-color: red;--background-color: lightgray;font-family:Arial,sans-serif}#error-fixed-indicator{position:fixed;top:10px;right:10px;cursor:pointer;z-index:100000;padding:5px 10px;width:auto;max-width:90vw;min-width:100px;height:auto;box-shadow:0 4px 8px #0003;border:5px solid white;color:#fff;background-color:red;animation:blink 1s infinite;border-radius:15px;font-size:20px;font-weight:700;font-family:Arial,sans-serif}@keyframes blink{0%,to{background-color:#000}50%{background-color:red}}#error{background-color:var(--background-color);border:3px solid var(--border-color);padding:10px;margin:10px;border-radius:5px}h1{color:red;font-size:24px;margin:0}.error-details{font-size:14px;max-height:200px;overflow:auto}";
var w$1 = Object.defineProperty, M$1 = Object.getOwnPropertyDescriptor, O$1 = (n3, t2, r2) => t2 in n3 ? w$1(n3, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : n3[t2] = r2, v$2 = (n3, t2, r2, o2) => {
  for (var e2 = o2 > 1 ? void 0 : o2 ? M$1(t2, r2) : t2, s2 = n3.length - 1, i4; s2 >= 0; s2--)
    (i4 = n3[s2]) && (e2 = (o2 ? i4(t2, r2, e2) : i4(e2)) || e2);
  return o2 && e2 && w$1(t2, r2, e2), e2;
}, R2 = (n3, t2, r2) => O$1(n3, t2 + "", r2);
let f$1 = class f extends i$2 {
  constructor(t2 = "An error occurred", r2) {
    super();
    h(this, "originalCode");
    h(this, "message");
    this.message = t2, this.originalCode = r2;
  }
  static get is() {
    return "tj-error-element";
  }
  render() {
    return x$3`
      <div id="error-fixed-indicator" @click=${() => this.scrollIntoView({ behavior: "smooth" })}>
        Err: ${this.message}
      </div>
      <div id="error">
        <h1>Error: ${this.message}</h1>
        <pre class="error-details">
          ${this.originalCode ? this.originalCode : "No code provided."}
        </pre
        >

        <slot></slot>
      </div>
    `;
  }
};
R2(f$1, "styles", [r$5($)]);
v$2([
  n$2({ type: String, reflect: true })
], f$1.prototype, "message", 2);
f$1 = v$2([
  t$2("tj-error-element")
], f$1);
function j$3(n3, { allowAttributes: t2 = true, ignoreGaps: r2 = true } = {}) {
  let o2 = "div", e2 = null, s2 = [], i4 = [], l2 = {};
  const d2 = /(^[a-z][\w-]*)|#[\w-]+|\.[\w:-]+|\[\s*([\w-]+)(?:\s*=\s*(['"]?)(.*?)\3)?\s*\]/gi;
  let a2 = 0;
  for (; ; ) {
    const u2 = d2.exec(n3);
    if (!u2 || u2.index !== a2) {
      if (!r2 && u2 && u2.index > a2)
        break;
      break;
    }
    const c2 = u2[0];
    if (c2[0] === "#") e2 = c2.slice(1);
    else if (c2[0] === ".") s2.push(c2.slice(1));
    else if (c2[0] === "[") {
      if (!t2) throw new Error(`Attributes not allowed: '${c2}'`);
      const p3 = u2[2], m2 = u2[4] || void 0;
      i4.push({ name: p3, value: m2 }), l2[p3] = m2;
    } else o2 = c2;
    a2 += c2.length;
  }
  return { tag: o2, id: e2, classes: s2, attrs: i4, attrsMap: l2, length: a2, rest: n3.slice(a2) };
}
function D$2(n3) {
  return typeof n3.beforeLayoutCallback == "function";
}
function F$1(n3, t2, r2) {
  var u2, c2;
  console.log("Applying layout to element:", n3, "with layout:", r2);
  const o2 = /^(\+|-|)([0-9]+\.?[0-9]*);?/, e2 = r2.replace(o2, ""), s2 = j$3(e2), i4 = { class: "" };
  s2.attrsMap.class && (i4.class = s2.attrsMap.class + " "), i4.class += s2.classes.join(" "), i4.id = s2.id, ((u2 = i4.class) == null ? void 0 : u2.trim()) === "" && delete i4.class, ((c2 = i4.id) == null ? void 0 : c2.trim()) === "" && delete i4.id;
  const l2 = s2.tag || "div";
  let d2 = false, a2 = E$1(l2, { ...i4, layoutOrig: r2 });
  if (l2.includes("-") && !customElements.get(l2))
    console.warn(`Custom element <${l2}> is not registered.`), a2 = new f$1(`Custom element <${l2}> is not registered.`, n3.outerHTML), n3.replaceWith(a2), a2.append(n3), d2 = true;
  else {
    const p3 = Array.from(n3.children);
    D$2(a2) && (d2 = a2.beforeLayoutCallback(n3, a2, p3) === false), console.log(
      "Replacement element created:",
      a2,
      "with children:",
      p3,
      "skipChildren:",
      d2
    ), a2.__ORIG_ELEMENT__ = n3, a2.append(...Array.from(n3.children)), n3.replaceWith(a2);
  }
  return {
    replacementElement: a2,
    skipChildren: d2
  };
}
function g$1(n3, t2 = {}) {
  console.log("applyLayout called with element:", n3, "and options:", t2);
  const { recursive: r2 = true } = t2;
  let o2 = [];
  if (Array.isArray(n3))
    return n3.forEach((l2) => o2.push(...g$1(l2, t2))), o2;
  if (!(n3 instanceof HTMLElement))
    return [];
  const e2 = n3.getAttribute("layout");
  let s2 = false, i4 = n3;
  if (e2 && ({ replacementElement: i4, skipChildren: s2 } = F$1(n3, t2, e2)), r2 && !s2) {
    const l2 = Array.from(i4.children);
    console.log("Applying layout to children:", l2, "of element:", i4), l2.forEach((d2) => o2.push(...g$1(d2, t2)));
  }
  return o2;
}
var z$2 = (n3, t2, r2, o2) => {
  for (var e2 = t2, s2 = n3.length - 1, i4; s2 >= 0; s2--)
    (i4 = n3[s2]) && (e2 = i4(e2) || e2);
  return e2;
};
let x$1 = class x extends x$2(y$3) {
  static get is() {
    return "tj-content-pane";
  }
  createRenderRoot() {
    return this;
  }
  constructor() {
    super();
  }
  async connectedCallback() {
    const n3 = new p$2("SectionTreeBuilder");
    await $$1(), super.connectedCallback();
    const t2 = new S$2(this), r2 = Array.from(this.children);
    t2.arrange(r2), g$1(Array.from(this.children), { recursive: true }), n3.lap("after arrange");
  }
};
x$1 = z$2([
  t$2("tj-content-pane")
], x$1);
var _$2 = Object.defineProperty;
var w3 = (a2, t2, e2) => t2 in a2 ? _$2(a2, t2, { enumerable: true, configurable: true, writable: true, value: e2 }) : a2[t2] = e2;
var d$1 = (a2, t2, e2) => w3(a2, typeof t2 != "symbol" ? t2 + "" : t2, e2);
function g(a2) {
  const t2 = [];
  let e2 = "", s2 = [], r2 = null, n3 = 0;
  for (const i4 of a2)
    r2 ? (i4 === r2 && (r2 = null), e2 += i4) : i4 === "'" || i4 === '"' ? (r2 = i4, e2 += i4) : i4 === "(" ? (n3++, e2 += i4) : i4 === ")" ? (n3 = Math.max(0, n3 - 1), e2 += i4) : i4 === ";" && n3 === 0 ? (s2.push(e2), e2 = "") : e2 += i4;
  e2.trim() && s2.push(e2);
  for (const i4 of s2) {
    const c2 = i4.trim();
    if (!c2) continue;
    let u2 = -1;
    r2 = null, n3 = 0;
    for (let f3 = 0; f3 < c2.length; f3++) {
      const o2 = c2[f3];
      if (r2)
        o2 === r2 && (r2 = null);
      else if (o2 === "'" || o2 === '"') r2 = o2;
      else if (o2 === "(") n3++;
      else if (o2 === ")") n3 = Math.max(0, n3 - 1);
      else if (o2 === ":" && n3 === 0) {
        u2 = f3;
        break;
      }
    }
    if (u2 < 1) continue;
    const h2 = c2.slice(0, u2).trim();
    let l2 = c2.slice(u2 + 1).trim(), v3;
    /\s*!important\s*$/i.test(l2) && (l2 = l2.replace(/\s*!important\s*$/i, "").trim(), v3 = "important"), h2 && t2.push([h2, l2, v3]);
  }
  return t2;
}
function p$1() {
  const a2 = window.innerWidth, t2 = {
    xxl: 1400,
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 0
  };
  for (const [e2, s2] of Object.entries(t2))
    if (a2 >= s2)
      return e2;
  return "xs";
}
let j$2 = class j {
  constructor() {
    d$1(this, "breakpoints", {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400
    });
    d$1(this, "originalData", /* @__PURE__ */ new WeakMap());
    var t2;
    window.config && ((t2 = window.config) != null && t2.breakpoints) && (this.breakpoints = window.config.breakpoints);
  }
  /**
   * Adjusts classes and inline styles of the target element and its children
   * based on the defined breakpoints.
   *
   * @param target HTMLElement to process
   */
  adjust(t2 = document) {
    const e2 = [];
    if (t2 instanceof HTMLElement)
      e2.push(t2);
    else if (t2 instanceof ShadowRoot)
      e2.push(
        ...Array.from(t2.querySelectorAll("*")).filter(
          (s2) => this.needsResponsiveProcessing(s2)
        )
      );
    else if (t2 instanceof Document)
      e2.push(
        ...Array.from(t2.querySelectorAll("*")).filter(
          (s2) => this.needsResponsiveProcessing(s2)
        )
      );
    else
      throw console.warn("TjResponsive: Target is not a valid HTMLElement, ShadowRoot, or Document.", t2), new Error("TjResponsive: Target is not a valid HTMLElement, ShadowRoot, or Document.");
    e2.forEach((s2) => {
      this.originalData.has(s2) || this.originalData.set(s2, {
        classes: s2.className,
        styles: s2.getAttribute("style") || ""
      }), this.applyResponsiveClasses(s2, window.innerWidth), this.applyResponsiveStyles(s2, window.innerWidth);
    });
  }
  /**
   * Determines whether an element should be processed for responsive styles.
   */
  needsResponsiveProcessing(t2) {
    if (!(t2 instanceof HTMLElement))
      return false;
    if (t2.hasAttribute("class"))
      return true;
    for (const e2 of Array.from(t2.attributes))
      if (/^[a-z]+-style$/.test(e2.name))
        return true;
    return false;
  }
  /**
   * Parses and applies responsive CSS classes based on conditions.
   */
  applyResponsiveClasses(t2, e2) {
    var n3;
    t2.className.split(/\s+/);
    const s2 = /* @__PURE__ */ new Set(), r2 = new Set(((n3 = this.originalData.get(t2)) == null ? void 0 : n3.classes.split(/\s+/)) || []);
    r2.forEach((i4) => {
      const c2 = i4.match(/^(-?)([a-z]+)(?:-([a-z]+))?:(.+)$/);
      if (c2) {
        const [, u2, h2, l2, v3] = c2;
        let f3 = this.breakpoints[h2], o2 = l2 ? this.breakpoints[l2] : void 0;
        !l2 && !o2 && u2 === "-" ? (f3 = 0, o2 = this.breakpoints[h2]) : !l2 && !o2 && u2 !== "-" && (f3 = this.breakpoints[h2], o2 = void 0), this.shouldApplyClass(e2, f3, o2) && s2.add(v3);
      } else
        s2.add(i4);
    }), t2.className = [...s2].filter((i4) => r2.has(i4) || s2.has(i4)).join(" ");
  }
  /**
   * Parses and applies responsive inline styles based on conditions.
   */
  applyResponsiveStyles(t2, e2) {
    Array.from(t2.attributes).forEach((s2) => {
      var n3;
      const r2 = s2.name.match(/^([a-z]+)-style$/);
      if (r2) {
        const i4 = r2[1], c2 = this.breakpoints[i4];
        if (t2.setAttribute("style", ((n3 = this.originalData.get(t2)) == null ? void 0 : n3.styles) || ""), e2 >= c2)
          for (const [u2, h2, l2] of g(s2.value)) t2.style.setProperty(u2, h2, l2);
      }
    });
  }
  /**
   * Determines whether a class should be applied based on breakpoints.
   */
  shouldApplyClass(t2, e2, s2) {
    return s2 !== void 0 ? t2 > e2 && t2 <= s2 : t2 > e2;
  }
  /**
   * Observes changes in target element and its children, adjusting content dynamically.
   *
   * @param target HTMLElement to observe
   */
  async observe(t2) {
    await $$1(), console.log("TjResponsive: Observing changes in target element", t2);
    const e2 = new y$1(100, 500);
    let s2 = p$1();
    window.addEventListener("resize", async () => {
      await e2.wait(), s2 !== p$1() && (console.log("Responsive: Resize event detected: " + p$1()), s2 = p$1(), this.adjust(t2));
    }), this.adjust(t2);
  }
};
let A$1 = class A extends x$2(HTMLElement) {
  constructor() {
    super();
    d$1(this, "_observer");
    d$1(this, "_isAdjusting", false);
    d$1(this, "_debounce", new y$1(50, 200));
    d$1(this, "_responsive", new j$2());
    d$1(this, "_resizeHandler");
    d$1(this, "_currentBreakpoint");
    this.style.display = "contents";
  }
  static get observedAttributes() {
    return ["width", "height", "orientation"];
  }
  connectedCallback() {
    if (this.log("connectedCallback: Initializing responsive adjustments"), this.closest("tj-responsive") && this !== this.closest("tj-responsive"))
      throw this.error("Nested <tj-responsive> elements are not allowed. Please remove the outer one."), new Error("Nested <tj-responsive> elements are not allowed.");
    this._adjustSubtree(), this._setupObserver(), this._setupResize();
  }
  disconnectedCallback() {
    var e2;
    (e2 = this._observer) == null || e2.disconnect(), this._observer = void 0, this._resizeHandler && (window.removeEventListener("resize", this._resizeHandler), this._resizeHandler = void 0);
  }
  attributeChangedCallback(e2, s2, r2) {
    s2 !== r2 && this._scheduleAdjust();
  }
  _setupObserver() {
    this._observer || (this._observer = new MutationObserver((e2) => {
      if (this._isAdjusting) return;
      const s2 = /* @__PURE__ */ new Set();
      let r2 = false;
      for (const n3 of e2)
        if (n3.type === "childList")
          n3.addedNodes.forEach((i4) => {
            i4.nodeType === Node.ELEMENT_NODE && s2.add(i4);
          }), n3.removedNodes.length > 0 && (r2 = true);
        else if (n3.type === "attributes") {
          const i4 = n3.attributeName || "";
          (i4 === "class" || i4 === "style" || /[a-z]+-style$/.test(i4)) && s2.add(n3.target);
        }
      r2 || s2.size > 8 ? this._scheduleAdjust() : s2.size > 0 && this._scheduleAdjust(s2);
    }), this._observer.observe(this, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeOldValue: false
      // attributeFilter cannot express wildcard for "*-style", so we filter in callback.
    }));
  }
  _setupResize() {
    if (this._resizeHandler) return;
    this._currentBreakpoint = p$1 ? p$1() : void 0;
    const e2 = new y$1(100, 500);
    this._resizeHandler = async () => {
      if (await e2.wait(), p$1) {
        const s2 = p$1();
        if (s2 === this._currentBreakpoint) return;
        this._currentBreakpoint = s2;
      }
      this.log(`Resize event detected: ${this._currentBreakpoint}`), this._adjustSubtree();
    }, window.addEventListener("resize", this._resizeHandler);
  }
  _scheduleAdjust(e2) {
    this._debounce.wait().then(() => {
      this.isConnected && (e2 && e2.size ? this._adjustTargets(e2) : this._adjustSubtree());
    });
  }
  _adjustTargets(e2) {
    this._isAdjusting = true;
    try {
      for (const s2 of e2) {
        if (!this.contains(s2)) continue;
        this._responsive.adjust(s2), s2.querySelectorAll("*").forEach((n3) => this._responsive.adjust(n3));
      }
    } finally {
      this._isAdjusting = false;
    }
  }
  _adjustSubtree() {
    this._isAdjusting = true;
    try {
      this._responsive.adjust(this), this.querySelectorAll("*").forEach((s2) => this._responsive.adjust(s2));
    } finally {
      this._isAdjusting = false;
    }
  }
};
customElements.get("tj-responsive") || customElements.define("tj-responsive", A$1);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = { ATTRIBUTE: 1, CHILD: 2 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$1 = class i2 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i4) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i4;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: t } = Z$1, r = () => document.createComment(""), s = (o2, i4, n3) => {
  var _a2;
  const e2 = o2._$AA.parentNode, l2 = void 0 === i4 ? o2._$AB : i4._$AA;
  if (void 0 === n3) {
    const i5 = e2.insertBefore(r(), l2), d2 = e2.insertBefore(r(), l2);
    n3 = new t(i5, d2, o2, o2.options);
  } else {
    const t2 = n3._$AB.nextSibling, i5 = n3._$AM, d2 = i5 !== o2;
    if (d2) {
      let t3;
      (_a2 = n3._$AQ) == null ? void 0 : _a2.call(n3, o2), n3._$AM = o2, void 0 !== n3._$AP && (t3 = o2._$AU) !== i5._$AU && n3._$AP(t3);
    }
    if (t2 !== l2 || d2) {
      let o3 = n3._$AA;
      for (; o3 !== t2; ) {
        const t3 = o3.nextSibling;
        e2.insertBefore(o3, l2), o3 = t3;
      }
    }
  }
  return n3;
}, v$1 = (o2, t2, i4 = o2) => (o2._$AI(t2, i4), o2), u$2 = {}, m$1 = (o2, t2 = u$2) => o2._$AH = t2, p2 = (o2) => o2._$AH, M2 = (o2) => {
  o2._$AR(), o2._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u$1 = (e2, s2, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t2; l2++) r2.set(e2[l2], l2);
  return r2;
}, c$1 = e$1(class extends i$1 {
  constructor(e2) {
    if (super(e2), e2.type !== t$1.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t2) {
    let r2;
    void 0 === t2 ? t2 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o2 = [];
    let i4 = 0;
    for (const s3 of e2) l2[i4] = r2 ? r2(s3, i4) : i4, o2[i4] = t2(s3, i4), i4++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.dt(e2, s2, t2).values;
  }
  update(s$12, [t2, r2, c2]) {
    const d2 = p2(s$12), { values: p$12, keys: a2 } = this.dt(t2, r2, c2);
    if (!Array.isArray(d2)) return this.ut = a2, p$12;
    const h2 = this.ut ?? (this.ut = []), v3 = [];
    let m2, y5, x3 = 0, j4 = d2.length - 1, k3 = 0, w4 = p$12.length - 1;
    for (; x3 <= j4 && k3 <= w4; ) if (null === d2[x3]) x3++;
    else if (null === d2[j4]) j4--;
    else if (h2[x3] === a2[k3]) v3[k3] = v$1(d2[x3], p$12[k3]), x3++, k3++;
    else if (h2[j4] === a2[w4]) v3[w4] = v$1(d2[j4], p$12[w4]), j4--, w4--;
    else if (h2[x3] === a2[w4]) v3[w4] = v$1(d2[x3], p$12[w4]), s(s$12, v3[w4 + 1], d2[x3]), x3++, w4--;
    else if (h2[j4] === a2[k3]) v3[k3] = v$1(d2[j4], p$12[k3]), s(s$12, d2[x3], d2[j4]), j4--, k3++;
    else if (void 0 === m2 && (m2 = u$1(a2, k3, w4), y5 = u$1(h2, x3, j4)), m2.has(h2[x3])) if (m2.has(h2[j4])) {
      const e2 = y5.get(a2[k3]), t3 = void 0 !== e2 ? d2[e2] : null;
      if (null === t3) {
        const e3 = s(s$12, d2[x3]);
        v$1(e3, p$12[k3]), v3[k3] = e3;
      } else v3[k3] = v$1(t3, p$12[k3]), s(s$12, d2[x3], t3), d2[e2] = null;
      k3++;
    } else M2(d2[j4]), j4--;
    else M2(d2[x3]), x3++;
    for (; k3 <= w4; ) {
      const e2 = s(s$12, v3[w4 + 1]);
      v$1(e2, p$12[k3]), v3[k3++] = e2;
    }
    for (; x3 <= j4; ) {
      const e2 = d2[x3++];
      null !== e2 && M2(e2);
    }
    return this.ut = a2, m$1(s$12, v3), T$2;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = e$1(class extends i$1 {
  constructor(t2) {
    var _a2;
    if (super(t2), t2.type !== t$1.ATTRIBUTE || "class" !== t2.name || ((_a2 = t2.strings) == null ? void 0 : _a2.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter(((s2) => t2[s2])).join(" ") + " ";
  }
  update(s2, [i4]) {
    var _a2, _b;
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter(((t2) => "" !== t2))));
      for (const t2 in i4) i4[t2] && !((_a2 = this.nt) == null ? void 0 : _a2.has(t2)) && this.st.add(t2);
      return this.render(i4);
    }
    const r2 = s2.element.classList;
    for (const t2 of this.st) t2 in i4 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i4) {
      const s3 = !!i4[t2];
      s3 === this.st.has(t2) || ((_b = this.nt) == null ? void 0 : _b.has(t2)) || (s3 ? (r2.add(t2), this.st.add(t2)) : (r2.remove(t2), this.st.delete(t2)));
    }
    return T$2;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = "important", i3 = " !" + n$1, o = e$1(class extends i$1 {
  constructor(t2) {
    var _a2;
    if (super(t2), t2.type !== t$1.ATTRIBUTE || "style" !== t2.name || ((_a2 = t2.strings) == null ? void 0 : _a2.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce(((e2, r2) => {
      const s2 = t2[r2];
      return null == s2 ? e2 : e2 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }), "");
  }
  update(e2, [r2]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r2)), this.render(r2);
    for (const t2 of this.ft) null == r2[t2] && (this.ft.delete(t2), t2.includes("-") ? s2.removeProperty(t2) : s2[t2] = null);
    for (const t2 in r2) {
      const e3 = r2[t2];
      if (null != e3) {
        this.ft.add(t2);
        const r3 = "string" == typeof e3 && e3.endsWith(i3);
        t2.includes("-") || r3 ? s2.setProperty(t2, r3 ? e3.slice(0, -11) : e3, r3 ? n$1 : "") : s2[t2] = e3;
      }
    }
    return T$2;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n2(n3, r2, t2) {
  return n3 ? r2(n3) : t2 == null ? void 0 : t2(n3);
}
var x2 = (r2) => {
  throw TypeError(r2);
};
var S$1 = (r2, t2, e2) => t2.has(r2) || x2("Cannot " + e2);
var k2 = (r2, t2, e2) => (S$1(r2, t2, "read from private field"), e2 ? e2.call(r2) : t2.get(r2)), b$1 = (r2, t2, e2) => t2.has(r2) ? x2("Cannot add the same private member more than once") : t2 instanceof WeakSet ? t2.add(r2) : t2.set(r2, e2), v2 = (r2, t2, e2, s2) => (S$1(r2, t2, "write to private field"), t2.set(r2, e2), e2);
function L$1(r2) {
  var e2;
  const t2 = (e2 = r2.split(`
`)[0]) == null ? void 0 : e2.match(/:(\d+):(\d+)$/);
  return { line: t2 ? +t2[1] : -1, column: t2 ? +t2[2] : -1 };
}
const V = (r2, t2, e2 = false, s2 = "<undefined>") => {
  try {
    return t2();
  } catch (n3) {
    let { line: i4, column: o2 } = L$1((n3 == null ? void 0 : n3.stack) ?? ""), a2 = String((r2 == null ? void 0 : r2.originalCode) ?? ""), h2 = false;
    r2 != null && r2.originalTemplateString && (i4 -= 2, a2 = r2.originalTemplateString, h2 = true);
    const l2 = a2.split(`
`), g2 = Math.min(Math.max(i4 - 1, 0), l2.length - 1), p3 = l2[g2] ?? "", E2 = Math.min(Math.max((o2 || 1) - 1, 0), p3.length);
    let f3 = " ".repeat(E2 + String(i4).length) + "^^^^";
    h2 && (f3 = "^".repeat(String(p3).length));
    const N2 = l2.map((w4, $2) => $2 === g2 ? `${$2 + 1}: ${w4}
 ${f3}` : `${$2 + 1}: ${w4}`).join(`
`), m2 = `Error while rendering \`${s2}\`: ${n3}
Line ${i4}, Column ${E2 + 1}:

${i4}:${p3}
${f3}

Compiled Template:
${N2}
`;
    if (!e2)
      console.warn("Caught error via *catch: " + m2);
    else
      throw console.error("Caught error via *catch: " + m2), new Error(m2);
    return String(n3);
  }
};
function D$1(r2, t2) {
  return {
    html: x$3,
    repeat: c$1,
    when: n2,
    styleMap: o,
    classMap: e,
    catchError: V,
    originalCode: r2.toString(),
    originalTemplateString: t2
  };
}
var c;
let C$1 = class C2 extends Error {
  constructor(e2, s2) {
    super(e2);
    b$1(this, c);
    this.name = "SyntaxTesterError", v2(this, c, s2);
  }
  get code() {
    return k2(this, c);
  }
};
c = /* @__PURE__ */ new WeakMap();
function F(r2) {
  try {
    new Function(r2);
  } catch (t2) {
    throw t2 instanceof SyntaxError ? new C$1(`Syntax error: ${t2.message}`, r2) : new C$1(String(t2), r2);
  }
}
let W$1 = class W extends Error {
  constructor(t2, e2, s2, n3) {
    super(`Syntax Error: ${t2} at line ${s2}, column ${n3}
Code: ${e2}`), this.name = "SyntaxError";
  }
};
class q {
  htmlEntityDecoer(t2) {
    return t2 ? new DOMParser().parseFromString(t2, "text/html").body.textContent ?? "" : "null";
  }
  wrapStrucutre(t2, e2) {
    const s2 = [];
    for (const i4 of t2.attributes || [])
      if (i4.name.startsWith("*")) {
        if (i4.name === "*for") {
          const o2 = /^(.*?)\s+(in|of)\s+(.*?)(;(.*?))?$/.exec(i4.value || "");
          if (!o2)
            throw new Error(`Invalid *for attribute value: ${i4.value}`);
          let a2 = "null";
          o2[5] && (a2 = o2[1] + " => " + o2[5].trim()), this.testSyntax(t2, i4.name, o2[1]), this.testSyntax(t2, i4.name, o2[3]), this.testSyntax(t2, i4.name, a2), o2[2] === "of" ? s2.push({ start: `$$__litEnv.repeat(${o2[3]}, ${a2}, (${o2[1]}, $index) => `, end: ")" }) : o2[2] === "in" && s2.push({
            start: `$$__litEnv.repeat(Object.keys(${o2[3]}), ${a2}, (${o2[1]}, $index) => `,
            end: ")"
          });
          continue;
        }
        if (this.testSyntax(t2, i4.name, i4.value || ""), i4.name === "*if") {
          this.testSyntax(t2, i4.name, i4.value || ""), s2.push({
            start: `$$__litEnv.when(${this.getCatchErrorValue(t2, "*if", i4.value)}, ()=>{lastIf=true; return   `,
            end: "}, ()=>{lastIf=false; return $$__litEnv.html``})"
          });
          continue;
        }
        if (i4.name === "*do") {
          s2.push({
            start: `(()=>{$$__litEnv.catchError($$__litEnv, ()=>{ ${i4.value}}, true, '*do="${this.escapeStmt(i4.value)}"'); return `,
            end: "})()"
          });
          continue;
        }
        if (i4.name === "*catch") {
          s2.push({
            start: "$$__litEnv.catchError($$__litEnv, () => ",
            end: ")"
          });
          continue;
        }
        if (i4.name === "*log") {
          s2.push({
            start: `(()=>{$$__litEnv.catchError($$__litEnv, ()=>console.log(${i4.value}), true, '*log="${this.escapeStmt(i4.value)}"'); return `,
            end: "})()"
          });
          continue;
        }
        throw new Error(`Unknown attribute ${i4.name} in element ${t2.tagName}`);
      }
    if (s2.length === 0)
      return e2;
    let n3 = "$$__litEnv.html`" + e2 + "`";
    for (let i4 = s2.length - 1; i4 >= 0; i4--)
      n3 = s2[i4].start + n3 + s2[i4].end;
    return "${" + n3 + "}";
  }
  escapeStmt(t2) {
    return t2.replace(/'/g, "\\'");
  }
  getCatchErrorValue(t2, e2, s2) {
    return `$$__litEnv.catchError($$__litEnv, ()=>(${s2}), true, '${this.escapeStmt(e2 + '="' + s2 + '"')}')`;
  }
  parseString(t2) {
    return t2.replace(/{{\s*([^}]+?)\s*}}/g, (e2, s2) => `\${$$__litEnv.catchError($$__litEnv, ()=>${s2}, true, '${this.escapeStmt(e2)}')}`);
  }
  testSyntax(t2, e2, s2) {
    try {
      F(s2);
    } catch (n3) {
      throw new W$1(
        // @ts-ignore
        `${n3.message} in attribute ${e2}="${s2}" of element ${t2.tagName}`,
        s2,
        0,
        0
      );
    }
  }
  parseElement(t2) {
    let e2 = "";
    if (t2.type === "element") {
      if (e2 += `<${t2.tagName}`, t2.attributes)
        for (const s2 of t2.attributes) {
          s2.value = this.htmlEntityDecoer(s2.value || null), [".", ":", "~", "@"].includes(s2.name[0]) && this.testSyntax(t2, s2.name, s2.value || "");
          const n3 = this.getCatchErrorValue(t2, s2.name, s2.value || "");
          if (!s2.name.startsWith("*")) {
            if (s2.name.startsWith("@")) {
              e2 += ` ${s2.name}=\${()=>{$$__litEnv.catchError($$__litEnv, ()=>{${s2.value}}, true, '${this.escapeStmt(s2.name + '="' + s2.value + '"')}')}}`;
              continue;
            }
            if (s2.name.startsWith("~")) {
              let i4 = "";
              switch (s2.name) {
                case "~style":
                  i4 = "styleMap";
                  break;
                case "~class":
                  i4 = "classMap";
                  break;
                default:
                  throw new Error(`Unknown directive ${s2.name} in element ${t2.tagName}`);
              }
              e2 += ` ${s2.name.slice(1)}=\${$$__litEnv.${i4}(${n3})}`;
              continue;
            }
            if (s2.name.startsWith("?")) {
              e2 += ` ${s2.name}=\${${n3}}`;
              continue;
            }
            if (s2.name === "$ref") {
              e2 += ` \${$$__litEnv.ref($el => { ${n3} })}`;
              continue;
            }
            if (s2.name.startsWith(".")) {
              e2 += ` ${s2.name}=\${${n3}}`;
              continue;
            }
            e2 += ` ${s2.name}`, s2.value !== void 0 && (e2 += `="${this.parseString(s2.value)}"`);
          }
        }
      if (e2 += ">", t2.children)
        for (const s2 of t2.children)
          e2 += this.parseElement(s2);
      t2.isVoid || (e2 += `</${t2.tagName}>`);
    } else t2.type === "text" && (e2 += this.parseString(t2.textContent || ""));
    return this.wrapStrucutre(t2, e2);
  }
  buildFunctionBody(t2) {
    let e2 = "";
    for (const n3 of t2)
      e2 += this.parseElement(n3);
    return `with($scope){return $$__litEnv.html\`${e2}\`};`;
  }
  buildFunction(t2) {
    const e2 = this.buildFunctionBody(t2);
    try {
      return new Function("$scope", "$$__litEnv", e2);
    } catch (s2) {
      throw console.log("Error building function:", s2), new W$1(String(s2), e2, 0, 0);
    }
  }
}
let _$1 = class _2 {
  parse(t2) {
    const e2 = new z$1(t2);
    return new j$1(e2).parseDocument();
  }
};
const O = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
  // historical/less common
  "command",
  "keygen",
  "menuitem"
]);
let j$1 = class j2 {
  constructor(t2) {
    this.s = t2;
  }
  parseDocument() {
    return this.parseNodes();
  }
  parseNodes(t2) {
    const e2 = [];
    for (; !this.s.eof(); ) {
      if (this.s.startsWith("</")) {
        const { line: s2, col: n3 } = this.s.position(), i4 = this.parseClosingTag();
        return t2 || this.s.throwError(`Unexpected closing tag </${i4}>`, s2, n3), i4.toLowerCase() !== t2.tag.toLowerCase() && this.s.throwError(
          `Mismatched closing tag: expected </${t2.tag}>, found </${i4}> (opened at line ${t2.line}, col ${t2.col})`,
          s2,
          n3
        ), e2;
      }
      if (this.s.peek() === "<")
        if (this.s.startsWith("<!--")) {
          e2.push(this.parseComment());
          continue;
        } else if (this.s.startsWith("<!")) {
          e2.push(this.parseDeclaration());
          continue;
        } else if (this.s.startsWith("<?")) {
          e2.push(this.parseProcessingInstruction());
          continue;
        } else if (this.isTagStart()) {
          e2.push(this.parseElement());
          continue;
        } else {
          e2.push(this.parseText());
          continue;
        }
      else {
        e2.push(this.parseText());
        continue;
      }
    }
    return t2 && this.s.throwError(
      `Unclosed tag <${t2.tag}> (opened at line ${t2.line}, col ${t2.col}) before end of input`,
      this.s.line,
      this.s.col
    ), e2;
  }
  isTagStart() {
    const t2 = this.s.peek(0), e2 = this.s.peek(1);
    return t2 !== "<" || !e2 ? false : e2 === "/" || e2 === "!" || e2 === "?" ? true : d(e2);
  }
  parseText() {
    let t2 = "";
    for (this.s.position(); !this.s.eof(); ) {
      if (this.s.peek() === "<") {
        if (this.s.startsWith("<!--") || this.s.startsWith("</") || this.s.startsWith("<!") || this.s.startsWith("<?"))
          break;
        const s2 = this.s.peek(1);
        if (s2 && d(s2))
          break;
        t2 += this.s.next();
        continue;
      }
      t2 += this.s.next();
    }
    return {
      type: "text",
      textContent: t2
    };
  }
  parseComment() {
    const t2 = this.s.position();
    this.s.consumeExpected("<!--");
    const e2 = this.s.readUntilSequence(
      "-->",
      () => this.s.throwError("Unterminated comment. Expected -->", t2.line, t2.col)
    );
    return this.s.consumeExpected("-->"), {
      type: "other",
      textContent: e2
    };
  }
  parseDeclaration() {
    const t2 = this.s.position();
    this.s.consumeExpected("<!");
    const e2 = this.s.readUntilChar(
      ">",
      () => this.s.throwError("Unterminated declaration. Expected >", t2.line, t2.col)
    );
    return this.s.consumeExpected(">"), {
      type: "other",
      textContent: `!${e2}`
    };
  }
  parseProcessingInstruction() {
    const t2 = this.s.position();
    this.s.consumeExpected("<?");
    const e2 = this.s.readUntilSequence(
      "?>",
      () => this.s.throwError("Unterminated processing instruction. Expected ?>", t2.line, t2.col)
    );
    return this.s.consumeExpected("?>"), {
      type: "other",
      textContent: `?${e2}`
    };
  }
  parseClosingTag() {
    const t2 = this.s.position();
    this.s.consumeExpected("</"), this.s.skipWhitespace();
    const e2 = this.readTagName();
    if (e2 || this.s.throwError("Invalid closing tag name", t2.line, t2.col), this.s.skipWhitespace(), this.s.peek() !== ">") {
      const s2 = this.s.position();
      this.s.throwError(`Expected '>' after closing tag </${e2}>`, s2.line, s2.col);
    }
    return this.s.next(), e2;
  }
  parseElement() {
    const t2 = this.s.position();
    this.s.consumeExpected("<");
    const e2 = this.readTagName();
    e2 || this.s.throwError('Invalid tag name after "<"', t2.line, t2.col);
    const s2 = [];
    let n3 = false;
    for (; !this.s.eof(); ) {
      if (this.s.skipWhitespace(), this.s.startsWith("/>")) {
        n3 = true, this.s.consumeExpected("/>");
        break;
      }
      const h2 = this.s.peek();
      if (h2 === ">") {
        this.s.next();
        break;
      }
      h2 === null && this.s.throwError("Unexpected end of input inside start tag", t2.line, t2.col);
      const l2 = this.parseAttribute();
      s2.push(l2);
    }
    const i4 = e2.toLowerCase();
    if (n3 || O.has(i4))
      return {
        type: "element",
        tagName: e2,
        attributes: s2,
        children: [],
        isVoid: true
      };
    const a2 = this.parseNodes({ tag: e2, line: t2.line, col: t2.col });
    return {
      type: "element",
      tagName: e2,
      attributes: s2,
      children: a2,
      isVoid: false
    };
  }
  parseAttribute() {
    const t2 = this.s.position(), e2 = this.readAttributeName();
    e2 || this.s.throwError("Invalid attribute name", t2.line, t2.col), this.s.skipWhitespace();
    let s2;
    if (this.s.peek() === "=") {
      this.s.next(), this.s.skipWhitespace();
      const n3 = this.s.peek();
      if (n3 === '"' || n3 === "'") {
        this.s.next();
        const i4 = n3, o2 = this.s.readUntilChar(
          i4,
          () => this.s.throwError(`Unterminated quoted attribute value for "${e2}"`, t2.line, t2.col)
        );
        this.s.consumeExpected(i4), s2 = o2;
      } else {
        let i4 = "";
        for (; !this.s.eof(); ) {
          const o2 = this.s.peek();
          if (o2 === null || T$1(o2) || o2 === ">" || o2 === "/" && this.s.peek(1) === ">") break;
          i4 += this.s.next();
        }
        s2 = i4;
      }
    }
    return { name: e2, value: s2 };
  }
  readTagName() {
    let t2 = "";
    const e2 = this.s.peek();
    if (!e2 || !d(e2)) return null;
    for (t2 += this.s.next(); !this.s.eof(); ) {
      const s2 = this.s.peek();
      if (!s2 || !H$1(s2)) break;
      t2 += this.s.next();
    }
    return t2;
  }
  readAttributeName() {
    let t2 = "";
    const e2 = this.s.peek();
    if (!e2 || !Z2(e2)) return null;
    for (t2 += this.s.next(); !this.s.eof(); ) {
      const s2 = this.s.peek();
      if (!s2 || !B$1(s2)) break;
      t2 += this.s.next();
    }
    return t2;
  }
};
let z$1 = class z3 {
  constructor(t2) {
    this.input = t2, this.pos = 0, this.line = 1, this.col = 1;
  }
  eof() {
    return this.pos >= this.input.length;
  }
  peek(t2 = 0) {
    const e2 = this.pos + t2;
    return e2 < 0 || e2 >= this.input.length ? null : this.input[e2];
  }
  next() {
    if (this.eof()) return null;
    const t2 = this.input[this.pos++];
    return t2 === `
` ? (this.line += 1, this.col = 1) : t2 === "\r" ? this.peek() === `
` || (this.line += 1, this.col = 1) : this.col += 1, t2;
  }
  startsWith(t2) {
    return this.input.startsWith(t2, this.pos);
  }
  consumeExpected(t2) {
    if (!this.startsWith(t2)) {
      const { line: e2, col: s2 } = this.position();
      this.throwError(`Expected "${t2}"`, e2, s2);
    }
    for (let e2 = 0; e2 < t2.length; e2++) this.next();
  }
  readUntilSequence(t2, e2) {
    let s2 = "";
    for (; !this.eof() && !this.startsWith(t2); ) {
      const n3 = this.next();
      if (n3 === null) break;
      s2 += n3;
    }
    return this.eof() && !this.startsWith(t2) && e2 && e2(), s2;
  }
  readUntilChar(t2, e2) {
    let s2 = "";
    for (; !this.eof() && this.peek() !== t2; ) {
      const i4 = this.next();
      if (i4 === null) break;
      s2 += i4;
    }
    return this.eof() && e2 && e2(), s2;
  }
  skipWhitespace() {
    for (; !this.eof(); ) {
      const t2 = this.peek();
      if (!t2 || !T$1(t2)) break;
      this.next();
    }
  }
  position() {
    return { index: this.pos, line: this.line, col: this.col };
  }
  throwError(t2, e2 = this.line, s2 = this.col) {
    const n3 = this.input.split(`
`)[e2 - 1] || "";
    throw new Error(`[Html2AstParser] ${t2} at line ${e2}, column ${s2}: 
'${n3}'`);
  }
};
function d(r2) {
  return /[A-Za-z]/.test(r2);
}
function H$1(r2) {
  return /[A-Za-z0-9\-\_\:\.]/.test(r2);
}
function Z2(r2) {
  return /[A-Za-z_:*@?.~]/.test(r2);
}
function B$1(r2) {
  return /[A-Za-z0-9_:\-.~]/.test(r2);
}
function T$1(r2) {
  return r2 === " " || r2 === "	" || r2 === `
` || r2 === "\r" || r2 === "\f";
}
class u {
  constructor(t2, e2) {
    this.fn = null, this.scope = null, this.templateString = t2, e2 && (e2.$tpl = this, this.scope = e2);
  }
  getCompiledTemplate() {
    return this.fn ? this.fn : (new _$1().parse(this.templateString), this.fn = G$1(this.templateString), this.fn);
  }
  /**
   * Returns the rendered template
   *
   *
   * @example
   *
   * ```typescript
   * override render() {
   *   return this.$tpl.render();
   * }
   * ````
   *
   */
  render() {
    if (!this.scope)
      throw new Error("Scope is not defined. Please define a scope using scopeDefine.");
    const t2 = this.getCompiledTemplate();
    return t2(this.scope, D$1(t2, this.templateString));
  }
  /**
   * Render this template into a non shadow DOM element.
   *
   * @param element
   */
  renderIntoElement(t2) {
    if (!t2)
      throw new Error("Element is not defined. Please provide a valid HTMLElement to render into.");
    B$2(this.render(), t2);
  }
  /**
   * Render the template to a non shadow DOM element.
   *
   * @param element
   */
  renderInElement(t2) {
    B$2(this.render(), t2);
  }
}
function G$1(r2) {
  const t2 = new _$1().parse(r2);
  return new q().buildFunction(t2);
}
function st(r2) {
  if (r2.$update = () => {
    r2.$this && typeof r2.$this.requestUpdate == "function" && r2.$this.requestUpdate();
  }, r2.$tpl !== void 0)
    if (typeof r2.$tpl == "string")
      r2.$tpl = new u(r2.$tpl);
    else if (r2.$tpl instanceof u)
      r2.$tpl.scope = r2;
    else
      throw new Error("Invalid value for $tpl: Expected string or ProLitTemplate, found" + typeof r2.$tpl);
  return new Proxy(r2, {
    get(t2, e2) {
      if (e2 === "$tpl") {
        if (!t2.$tpl)
          throw new Error("Template is not defined. Please define a template using the $tpl property.");
        return t2.$tpl;
      }
      return e2 === "$raw" ? t2 : e2 === "$rawPure" ? Object.fromEntries(Object.entries(t2).filter(([s2]) => !s2.startsWith("$"))) : t2[e2];
    },
    set(t2, e2, s2) {
      if (t2[e2] = s2, !e2.startsWith("$") && r2.$this && r2.$this.requestUpdate(), e2 === "$tpl") {
        if (!(s2 instanceof u))
          throw new Error("$tpl must be an instance of Template.");
        s2.scope = r2;
      }
      return true;
    }
  });
}
function b(e2, t2) {
  for (const s2 in t2)
    t2[s2] && typeof t2[s2] == "object" && !Array.isArray(t2[s2]) ? (e2[s2] || (e2[s2] = {}), b(e2[s2], t2[s2])) : e2[s2] = t2[s2];
  return e2;
}
async function H2(e2, t2) {
  for (const s2 of Array.from(e2.content.querySelectorAll("[import-src]"))) {
    t2.log("Processing [import-src] element", s2);
    const r2 = s2.getAttribute("import-src");
    r2 || t2.throwError("import element is missing the src attribute", s2);
    const n3 = await fetch(r2);
    n3.ok || t2.throwError(`Failed to load content from ${r2}: ${n3.status} ${n3.statusText}`, s2), s2.innerHTML = await n3.text();
  }
  return e2;
}
async function W2(e2, t2) {
  const s2 = await fetch(e2);
  s2.ok || t2.throwError(`Failed to load content from ${e2}: ${s2.status} ${s2.statusText}`);
  const r2 = await s2.text(), n3 = E$1("template");
  n3.innerHTML = r2;
  const i4 = n3.content.querySelector("script[scope]");
  return {
    template: r2,
    scope: JSON.parse((i4 == null ? void 0 : i4.textContent) || "null") || null
  };
}
function z4(e2, t2) {
  let s2 = e2.querySelector("template");
  s2 || (t2.log("No <template> element found inside the provided root element. Wrapping content into template"), s2 = document.createElement("template"), s2.innerHTML = e2.innerHTML, e2.innerHTML = "", e2.appendChild(s2));
  const r2 = s2.content.querySelector("script[scope]");
  t2.log("Found scope script:", r2);
  const n3 = r2 != null && r2.textContent ? JSON.parse(r2.textContent) : null;
  return r2 && s2.content.removeChild(r2), {
    template: s2.innerHTML,
    scope: n3
  };
}
async function B(e2, t2, s2) {
  const r2 = J(t2), n3 = Object.getPrototypeOf(async function() {
  }).constructor;
  try {
    const i4 = await new n3("host", "scope", "console", "fetch", '"use strict"; return (' + r2 + ");")(e2, s2, console, A2());
    return S2(i4), i4;
  } catch {
    try {
      const o2 = await new n3("host", "scope", "console", "fetch", '"use strict"; ' + r2)(e2, s2, console, A2());
      return S2(o2), o2;
    } catch (i4) {
      const o2 = i4 instanceof Error ? i4 : new Error(typeof i4 == "string" ? i4 : "Unknown evaluation error");
      throw new Error(`scope-init evaluation failed: ${o2.message}`);
    }
  }
}
function J(e2) {
  let t2 = (e2 ?? "").trim();
  return t2.toLowerCase().startsWith("javascript:") && (t2 = t2.slice(11).trim()), t2;
}
function S2(e2) {
  if (e2 === null || typeof e2 != "object" || Array.isArray(e2))
    throw new Error('scope-init must evaluate to an object (e.g. { foo: "bar" })');
}
function A2() {
  if (typeof fetch == "function") return fetch;
  throw new Error("fetch is not available in this environment");
}
var U = Object.defineProperty, Y = Object.getOwnPropertyDescriptor, P = (e2) => {
  throw TypeError(e2);
}, _3 = (e2, t2, s2, r2) => {
  for (var n3 = r2 > 1 ? void 0 : r2 ? Y(t2, s2) : t2, c2 = e2.length - 1, i4; c2 >= 0; c2--)
    (i4 = e2[c2]) && (n3 = (r2 ? i4(t2, s2, n3) : i4(n3)) || n3);
  return r2 && n3 && U(t2, s2, n3), n3;
}, D = (e2, t2, s2) => t2.has(e2) || P("Cannot " + s2), L2 = (e2, t2, s2) => (D(e2, t2, "read from private field"), t2.get(e2)), T = (e2, t2, s2) => t2.has(e2) ? P("Cannot add the same private member more than once") : t2 instanceof WeakSet ? t2.add(e2) : t2.set(e2, s2), C3 = (e2, t2, s2, r2) => (D(e2, t2, "write to private field"), t2.set(e2, s2), s2), m, y4;
let f2 = class extends x$2(y$3) {
  constructor() {
    super(), this.updateOn = "change keyup click", this.src = "", this.srcData = null, this.myProLitTemplate = null, T(this, m), T(this, y4, true), this.$scope = st({}), this.renderInElement = E$1("div", { style: "display: contents" }), C3(this, m, new y$1(50, 200));
  }
  createRenderRoot() {
    return this;
  }
  async _renderTemplates(e2 = false) {
    if (!this.myProLitTemplate || e2) {
      let t2;
      if (this.srcData)
        t2 = this.srcData.template;
      else {
        const s2 = Array.from(this.querySelectorAll("template"));
        if (s2.length === 0) {
          this.warn(
            "No templates found in tj-html-scope element. Please add <template> elements inside the tj-html-scope element."
          );
          return;
        }
        s2.length > 1 && this.warn("Multiple templates found in tj-html-scope element. Only the first template will be rendered.");
        let r2 = s2[0];
        r2 = await H2(r2, this.getLogger("evalImportSrc")), t2 = r2.innerHTML;
      }
      this.myProLitTemplate = new u(t2, this.$scope);
    }
    this.myProLitTemplate.renderInElement(this.renderInElement), L2(this, y4) && (this._updateScope(), C3(this, y4, false));
  }
  _updateScope() {
    for (const e2 of Array.from(this.querySelectorAll("[name]"))) {
      const t2 = e2.getAttribute("name");
      t2 && e2.value !== void 0 && (this.$scope[t2] = e2.value);
    }
    this.log("Scope updated", this.$scope.$rawPure);
  }
  async _initializeScopeFromInit() {
    await L2(this, m).wait();
    const e2 = {};
    if (this.src && this.src.trim() !== "" ? (this.log("Loading external src", this.src), this.srcData = await W2(this.src, this.getLogger("loadExternalSrc")), this.log("External src loaded", this.srcData)) : (this.srcData = z4(this, this.getLogger("loadInlineTemplate")), this.log("Inline template loaded", this.srcData)), b(e2, this.srcData.scope), this.scopeInit && this.scopeInit.trim() !== "")
      try {
        this.log("Evaluating scope-init expression", this.scopeInit);
        const t2 = await B(this, this.scopeInit, this.$scope);
        this.log("Scope-init evaluation result", t2), b(e2, t2);
      } catch (t2) {
        this.error("scope-init evaluation failed", t2);
      }
    this.appendChild(this.renderInElement), Object.assign(this.$scope, e2), this.dispatchEvent(new CustomEvent("scope-update"));
  }
  updated(e2) {
    var s2;
    this.log("update(): Property change", e2);
    const t2 = () => {
      this._updateScope(), this._renderTemplates();
    };
    for (const r2 of this.updateOn.replace(",", " ").split(" "))
      r2.trim() !== "" && (this.removeEventListener(r2, t2), this.addEventListener(r2, t2));
    (s2 = e2 == null ? void 0 : e2.has) != null && s2.call(e2, "scopeInit") && this._initializeScopeFromInit().then(() => t2());
  }
  async connectedCallback() {
    await $$1(), super.connectedCallback(), this.log("Connected", this.$scope), this._initializeScopeFromInit().catch(() => {
    }).finally(() => {
      this._updateScope(), this._renderTemplates();
    });
  }
};
m = /* @__PURE__ */ new WeakMap();
y4 = /* @__PURE__ */ new WeakMap();
_3([
  n$2({ type: String, reflect: true, attribute: "update-on" })
], f2.prototype, "updateOn", 2);
_3([
  n$2({ type: String, reflect: true, attribute: "init" })
], f2.prototype, "scopeInit", 2);
_3([
  n$2({ type: String, reflect: false, attribute: "src" })
], f2.prototype, "src", 2);
f2 = _3([
  t$2("prolit-scope")
], f2);
class G2 extends HTMLElement {
  static get observedAttributes() {
    return ["duration", "easing", "stagger", "selectors"];
  }
  get duration() {
    return Number(this.getAttribute("duration") ?? 200);
  }
  get easing() {
    return this.getAttribute("easing") ?? "ease";
  }
  get stagger() {
    return Number(this.getAttribute("stagger") ?? 0);
  }
  get selectors() {
    return this.getAttribute("selectors") ?? "";
  }
  // MutationObserver
  constructor() {
    super(), this._rects = /* @__PURE__ */ new WeakMap(), this._anims = /* @__PURE__ */ new WeakMap(), this._mo = null, this.attachShadow({ mode: "open" }).innerHTML = "<slot></slot>";
  }
  connectedCallback() {
    this._snapshot(), this._mo = new MutationObserver((t2) => this._onMutations(t2)), this._mo.observe(this, { childList: true, subtree: !!this.selectors.trim() });
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._mo) == null || t2.disconnect();
  }
  attributeChangedCallback(t2, s2, r2) {
    var n3;
    t2 === "selectors" && ((n3 = this._mo) == null || n3.disconnect(), this._snapshot(), this._mo = new MutationObserver((c2) => this._onMutations(c2)), this._mo.observe(this, { childList: true, subtree: !!this.selectors.trim() }));
  }
  /** Alle zu beobachtenden Elemente:
   *  - Standard: direkte Kindelemente
   *  - Mit selectors: alle passenden tiefen Elemente in DOM-Reihenfolge
   */
  _elements() {
    const t2 = this.selectors.trim();
    if (!t2)
      return Array.from(this.children);
    try {
      return Array.from(this.querySelectorAll(t2));
    } catch {
      return console.warn(`Invalid selector "${t2}" in <auto-animate-container>. Falling back to direct children.`), Array.from(this.children);
    }
  }
  /** Letzte Positionen der Kinder speichern */
  _snapshot() {
    for (const t2 of this._elements())
      this._rects.set(t2, t2.getBoundingClientRect());
  }
  _onMutations(t2) {
    let s2 = [], r2 = [];
    const n3 = this.selectors.trim();
    if (n3) {
      for (const i4 of t2)
        i4.removedNodes.forEach((o2) => {
          var h2, p3, u2;
          if (o2.nodeType === 1) {
            const a2 = o2;
            try {
              (h2 = a2.matches) != null && h2.call(a2, n3) && s2.push(a2);
            } catch {
            }
            try {
              (u2 = (p3 = a2.querySelectorAll) == null ? void 0 : p3.call(a2, n3)) == null || u2.forEach((l2) => s2.push(l2));
            } catch {
            }
          }
        }), i4.addedNodes.forEach((o2) => {
          var h2, p3, u2;
          if (o2.nodeType === 1) {
            console.log("Added node:", o2);
            const a2 = o2;
            try {
              (h2 = a2.matches) != null && h2.call(a2, n3) && r2.push(a2);
            } catch {
            }
            try {
              (u2 = (p3 = a2.querySelectorAll) == null ? void 0 : p3.call(a2, n3)) == null || u2.forEach((l2) => r2.push(l2));
            } catch {
            }
          }
        });
      s2 = Array.from(new Set(s2)), r2 = Array.from(new Set(r2));
    } else
      for (const i4 of t2)
        i4.removedNodes.forEach((o2) => {
          o2.nodeType === 1 && s2.push(o2);
        }), i4.addedNodes.forEach((o2) => {
          o2.nodeType === 1 && r2.push(o2);
        });
    for (const i4 of s2) {
      const o2 = this._rects.get(i4);
      o2 && this._animateLeave(i4, o2);
    }
    for (const i4 of r2)
      ;
    const c2 = /* @__PURE__ */ new Map();
    for (const i4 of this._elements()) c2.set(i4, this._rects.get(i4));
    requestAnimationFrame(() => {
      var u2, a2;
      const i4 = this.duration, o2 = this.easing, h2 = this.stagger;
      let p3 = 0;
      for (const l2 of this._elements()) {
        const v3 = c2.get(l2), w4 = l2.getBoundingClientRect();
        if (this._rects.set(l2, w4), v3) {
          const d2 = v3.left - w4.left, x3 = v3.top - w4.top;
          if (d2 || x3) {
            (u2 = this._anims.get(l2)) == null || u2.cancel();
            const F2 = l2.animate(
              [{ transform: `translate(${d2}px, ${x3}px)` }, { transform: "none" }],
              { duration: i4, easing: o2, delay: h2 * p3 }
            );
            this._anims.set(l2, F2);
          }
        } else {
          (a2 = this._anims.get(l2)) == null || a2.cancel();
          const d2 = l2.animate(
            [
              { opacity: 0, transform: "translateY(-6px)" },
              { opacity: 1, transform: "none" }
            ],
            { duration: i4, easing: o2, delay: h2 * p3 }
          );
          this._anims.set(l2, d2);
        }
        p3++;
      }
    });
  }
  _animateLeave(t2, s2) {
    console.log("Leave animation for:", t2);
    const r2 = t2.cloneNode(true), n3 = r2.style;
    n3.position = "fixed", n3.left = s2.left + "px", n3.top = s2.top + "px", n3.width = s2.width + "px", n3.height = s2.height + "px", n3.margin = "0", n3.pointerEvents = "none", n3.boxSizing = "border-box", document.body.appendChild(r2), r2.animate(
      [
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: "translateY(-6px)" }
      ],
      { duration: this.duration, easing: this.easing }
    ).finished.finally(() => r2.remove());
  }
}
customElements.define("tj-animate-changes", G2);
var K2 = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, j3 = (e2, t2, s2, r2) => {
  for (var n3 = r2 > 1 ? void 0 : r2 ? Q(t2, s2) : t2, c2 = e2.length - 1, i4; c2 >= 0; c2--)
    (i4 = e2[c2]) && (n3 = (r2 ? i4(t2, s2, n3) : i4(n3)) || n3);
  return r2 && n3 && K2(t2, s2, n3), n3;
};
let E = class extends x$2(y$3) {
  constructor() {
    super(), this.src = "";
  }
  createRenderRoot() {
    return this;
  }
  async _loadSrc() {
    if (!this.src) {
      this.warn("src attribute is empty. Please provide a valid URL.");
      return;
    }
    try {
      const e2 = await fetch(this.src);
      if (!e2.ok) {
        this.throwError(`Failed to load content from ${this.src}: ${e2.status} ${e2.statusText}`);
        return;
      }
      const t2 = await e2.text();
      this.innerHTML = t2;
    } catch (e2) {
      this.throwError(`Error fetching content from ${this.src}: ${e2}`);
    }
  }
  update(e2) {
    super.update(e2), e2.has("src") && this._loadSrc();
  }
};
j3([
  n$2({ type: String, reflect: false, attribute: "src" })
], E.prototype, "src", 2);
E = j3([
  t$2("tj-include")
], E);
