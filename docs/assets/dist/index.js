var _a;
class Et {
  /**
   *
   * @param delay     Debounce delay in milliseconds
   * @param max_delay Maximum delay in milliseconds, if false then no maximum delay is applied
   */
  constructor(t3, e2 = false) {
    this.delay = t3, this.max_delay = e2, this.timeout = null, this.startTimeWithMs = 0;
  }
  async wait() {
    return this.startTimeWithMs === 0 && (this.startTimeWithMs = Date.now()), this.timeout && (this.max_delay === false || this.startTimeWithMs + this.max_delay > Date.now()) && clearTimeout(this.timeout), new Promise((t3) => {
      this.timeout = setTimeout(() => {
        this.startTimeWithMs = 0, t3(true);
      }, this.delay);
    });
  }
  debounce(t3) {
    this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(() => {
      t3();
    }, this.delay);
  }
}
const w$4 = {
  xs: { name: "xs", minWidth: 0 },
  sm: { name: "sm", minWidth: 576 },
  md: { name: "md", minWidth: 768 },
  lg: { name: "lg", minWidth: 992 },
  xl: { name: "xl", minWidth: 1200 },
  xxl: { name: "xxl", minWidth: 1400 }
};
let P$5 = w$4.xs;
function j$4() {
  const n4 = window.innerWidth;
  let t3 = w$4.xs;
  for (const e2 in w$4) {
    const s2 = w$4[e2];
    n4 >= s2.minWidth && (t3 = s2);
  }
  return t3;
}
function Dt(n4) {
  if (typeof n4 == "string" && n4.endsWith("px") && (n4 = parseInt(n4.replace("px", ""))), typeof n4 == "string") {
    if (n4 = w$4[n4], !n4)
      throw new Error(
        `Breakpoint ${n4} not found. Defined breakpoints are: ${Object.keys(w$4).join(", ")}`
      );
  } else typeof n4 == "number" && (n4 = { name: "c", minWidth: n4 });
  return window.innerWidth >= n4.minWidth;
}
if (!window.__nextrap_current_breakpoint) {
  window.__nextrap_current_breakpoint = j$4();
  const n4 = new Et(200, 500);
  window.addEventListener("resize", async () => {
    if (await n4.wait(), P$5 !== j$4()) {
      P$5 = j$4(), window.__nextrap_current_breakpoint = P$5;
      const t3 = new CustomEvent("breakpoint-changed", {
        detail: { breakpoint: P$5 }
      });
      console.log("Breakpoint changed", P$5), window.dispatchEvent(t3);
    }
  });
}
class jt {
  /**
   * Checks recursively if the element is visible.
   *
   * @param el
   */
  static isVisible(t3) {
    if (getComputedStyle(t3).display === "none")
      return false;
    if (t3 instanceof HTMLElement && (t3.offsetWidth > 0 || t3.offsetHeight > 0 || t3.tagName === "IMG" || t3.textContent !== ""))
      return true;
    if (!t3.children) return false;
    for (const s2 of t3.children)
      if (this.isVisible(s2)) return true;
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
  static isEmptySlot(t3) {
    const e2 = t3.assignedElements({ flatten: true });
    return e2.length === 0 ? true : e2.every((s2) => !this.isVisible(s2));
  }
  static observeEmptySlots(t3) {
    const e2 = t3.shadowRoot;
    if (!e2) {
      console.warn("Element has no shadow root", t3);
      return;
    }
    e2.querySelectorAll("slot").forEach((i4) => {
      this.isEmptySlot(i4) ? i4.setAttribute("empty", "") : i4.removeAttribute("empty"), i4.onslotchange = () => {
        this.isEmptySlot(i4) ? i4.setAttribute("empty", "") : i4.removeAttribute("empty");
      };
    });
  }
}
function It() {
  return document.readyState === "loading" ? new Promise((n4) => {
    document.addEventListener("DOMContentLoaded", () => n4());
  }) : Promise.resolve();
}
function zt(n4) {
  return new Promise((t3) => setTimeout(t3, n4));
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N$4 = globalThis, V$3 = N$4.ShadowRoot && (N$4.ShadyCSS === void 0 || N$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F$2 = Symbol(), tt$1 = /* @__PURE__ */ new WeakMap();
let K$2 = class K {
  constructor(t3, e2, s2) {
    if (this._$cssResult$ = true, s2 !== F$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e2;
  }
  get styleSheet() {
    let t3 = this.o;
    const e2 = this.t;
    if (V$3 && t3 === void 0) {
      const s2 = e2 !== void 0 && e2.length === 1;
      s2 && (t3 = tt$1.get(e2)), t3 === void 0 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), s2 && tt$1.set(e2, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
const ut = (n4) => new K$2(typeof n4 == "string" ? n4 : n4 + "", void 0, F$2), wt = (n4, t3) => {
  if (V$3) n4.adoptedStyleSheets = t3.map((e2) => e2 instanceof CSSStyleSheet ? e2 : e2.styleSheet);
  else for (const e2 of t3) {
    const s2 = document.createElement("style"), i4 = N$4.litNonce;
    i4 !== void 0 && s2.setAttribute("nonce", i4), s2.textContent = e2.cssText, n4.appendChild(s2);
  }
}, et$1 = V$3 ? (n4) => n4 : (n4) => n4 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return ut(e2);
})(n4) : n4;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: St, defineProperty: bt, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: Pt, getOwnPropertySymbols: xt, getPrototypeOf: Tt } = Object, m$4 = globalThis, st$2 = m$4.trustedTypes, Ot = st$2 ? st$2.emptyScript : "", B$5 = m$4.reactiveElementPolyfillSupport, T$5 = (n4, t3) => n4, W$3 = { toAttribute(n4, t3) {
  switch (t3) {
    case Boolean:
      n4 = n4 ? Ot : null;
      break;
    case Object:
    case Array:
      n4 = n4 == null ? n4 : JSON.stringify(n4);
  }
  return n4;
}, fromAttribute(n4, t3) {
  let e2 = n4;
  switch (t3) {
    case Boolean:
      e2 = n4 !== null;
      break;
    case Number:
      e2 = n4 === null ? null : Number(n4);
      break;
    case Object:
    case Array:
      try {
        e2 = JSON.parse(n4);
      } catch {
        e2 = null;
      }
  }
  return e2;
} }, G$3 = (n4, t3) => !St(n4, t3), it$1 = { attribute: true, type: String, converter: W$3, reflect: false, useDefault: false, hasChanged: G$3 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m$4.litPropertyMetadata ?? (m$4.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$6 = class y extends HTMLElement {
  static addInitializer(t3) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t3);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t3, e2 = it$1) {
    if (e2.state && (e2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((e2 = Object.create(e2)).wrapped = true), this.elementProperties.set(t3, e2), !e2.noAccessor) {
      const s2 = Symbol(), i4 = this.getPropertyDescriptor(t3, s2, e2);
      i4 !== void 0 && bt(this.prototype, t3, i4);
    }
  }
  static getPropertyDescriptor(t3, e2, s2) {
    const { get: i4, set: o2 } = Ct(this.prototype, t3) ?? { get() {
      return this[e2];
    }, set(r2) {
      this[e2] = r2;
    } };
    return { get: i4, set(r2) {
      const h4 = i4 == null ? void 0 : i4.call(this);
      o2 == null || o2.call(this, r2), this.requestUpdate(t3, h4, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) ?? it$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T$5("elementProperties"))) return;
    const t3 = Tt(this);
    t3.finalize(), t3.l !== void 0 && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T$5("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(T$5("properties"))) {
      const e2 = this.properties, s2 = [...Pt(e2), ...xt(e2)];
      for (const i4 of s2) this.createProperty(i4, e2[i4]);
    }
    const t3 = this[Symbol.metadata];
    if (t3 !== null) {
      const e2 = litPropertyMetadata.get(t3);
      if (e2 !== void 0) for (const [s2, i4] of e2) this.elementProperties.set(s2, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e2, s2] of this.elementProperties) {
      const i4 = this._$Eu(e2, s2);
      i4 !== void 0 && this._$Eh.set(i4, e2);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t3) {
    const e2 = [];
    if (Array.isArray(t3)) {
      const s2 = new Set(t3.flat(1 / 0).reverse());
      for (const i4 of s2) e2.unshift(et$1(i4));
    } else t3 !== void 0 && e2.push(et$1(t3));
    return e2;
  }
  static _$Eu(t3, e2) {
    const s2 = e2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t3;
    this._$ES = new Promise((e2) => this.enableUpdating = e2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t3 = this.constructor.l) == null || t3.forEach((e2) => e2(this));
  }
  addController(t3) {
    var e2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t3), this.renderRoot !== void 0 && this.isConnected && ((e2 = t3.hostConnected) == null || e2.call(t3));
  }
  removeController(t3) {
    var e2;
    (e2 = this._$EO) == null || e2.delete(t3);
  }
  _$E_() {
    const t3 = /* @__PURE__ */ new Map(), e2 = this.constructor.elementProperties;
    for (const s2 of e2.keys()) this.hasOwnProperty(s2) && (t3.set(s2, this[s2]), delete this[s2]);
    t3.size > 0 && (this._$Ep = t3);
  }
  createRenderRoot() {
    const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return wt(t3, this.constructor.elementStyles), t3;
  }
  connectedCallback() {
    var t3;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$EO) == null || t3.forEach((e2) => {
      var s2;
      return (s2 = e2.hostConnected) == null ? void 0 : s2.call(e2);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this._$EO) == null || t3.forEach((e2) => {
      var s2;
      return (s2 = e2.hostDisconnected) == null ? void 0 : s2.call(e2);
    });
  }
  attributeChangedCallback(t3, e2, s2) {
    this._$AK(t3, s2);
  }
  _$ET(t3, e2) {
    var o2;
    const s2 = this.constructor.elementProperties.get(t3), i4 = this.constructor._$Eu(t3, s2);
    if (i4 !== void 0 && s2.reflect === true) {
      const r2 = (((o2 = s2.converter) == null ? void 0 : o2.toAttribute) !== void 0 ? s2.converter : W$3).toAttribute(e2, s2.type);
      this._$Em = t3, r2 == null ? this.removeAttribute(i4) : this.setAttribute(i4, r2), this._$Em = null;
    }
  }
  _$AK(t3, e2) {
    var o2, r2;
    const s2 = this.constructor, i4 = s2._$Eh.get(t3);
    if (i4 !== void 0 && this._$Em !== i4) {
      const h4 = s2.getPropertyOptions(i4), a2 = typeof h4.converter == "function" ? { fromAttribute: h4.converter } : ((o2 = h4.converter) == null ? void 0 : o2.fromAttribute) !== void 0 ? h4.converter : W$3;
      this._$Em = i4;
      const c2 = a2.fromAttribute(e2, h4.type);
      this[i4] = c2 ?? ((r2 = this._$Ej) == null ? void 0 : r2.get(i4)) ?? c2, this._$Em = null;
    }
  }
  requestUpdate(t3, e2, s2) {
    var i4;
    if (t3 !== void 0) {
      const o2 = this.constructor, r2 = this[t3];
      if (s2 ?? (s2 = o2.getPropertyOptions(t3)), !((s2.hasChanged ?? G$3)(r2, e2) || s2.useDefault && s2.reflect && r2 === ((i4 = this._$Ej) == null ? void 0 : i4.get(t3)) && !this.hasAttribute(o2._$Eu(t3, s2)))) return;
      this.C(t3, e2, s2);
    }
    this.isUpdatePending === false && (this._$ES = this._$EP());
  }
  C(t3, e2, { useDefault: s2, reflect: i4, wrapped: o2 }, r2) {
    s2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t3) && (this._$Ej.set(t3, r2 ?? e2 ?? this[t3]), o2 !== true || r2 !== void 0) || (this._$AL.has(t3) || (this.hasUpdated || s2 || (e2 = void 0), this._$AL.set(t3, e2)), i4 === true && this._$Em !== t3 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t3));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (e2) {
      Promise.reject(e2);
    }
    const t3 = this.scheduleUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o2, r2] of this._$Ep) this[o2] = r2;
        this._$Ep = void 0;
      }
      const i4 = this.constructor.elementProperties;
      if (i4.size > 0) for (const [o2, r2] of i4) {
        const { wrapped: h4 } = r2, a2 = this[o2];
        h4 !== true || this._$AL.has(o2) || a2 === void 0 || this.C(o2, void 0, r2, a2);
      }
    }
    let t3 = false;
    const e2 = this._$AL;
    try {
      t3 = this.shouldUpdate(e2), t3 ? (this.willUpdate(e2), (s2 = this._$EO) == null || s2.forEach((i4) => {
        var o2;
        return (o2 = i4.hostUpdate) == null ? void 0 : o2.call(i4);
      }), this.update(e2)) : this._$EM();
    } catch (i4) {
      throw t3 = false, this._$EM(), i4;
    }
    t3 && this._$AE(e2);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var e2;
    (e2 = this._$EO) == null || e2.forEach((s2) => {
      var i4;
      return (i4 = s2.hostUpdated) == null ? void 0 : i4.call(s2);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
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
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e2) => this._$ET(e2, this[e2]))), this._$EM();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
y$6.elementStyles = [], y$6.shadowRootOptions = { mode: "open" }, y$6[T$5("elementProperties")] = /* @__PURE__ */ new Map(), y$6[T$5("finalized")] = /* @__PURE__ */ new Map(), B$5 == null || B$5({ ReactiveElement: y$6 }), (m$4.reactiveElementVersions ?? (m$4.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O$5 = globalThis, D$5 = O$5.trustedTypes, nt$1 = D$5 ? D$5.createPolicy("lit-html", { createHTML: (n4) => n4 }) : void 0, Z$3 = "$lit$", f$8 = `lit$${Math.random().toFixed(9).slice(2)}$`, J$2 = "?" + f$8, Ut = `<${J$2}>`, v$5 = document, U$1 = () => v$5.createComment(""), M$5 = (n4) => n4 === null || typeof n4 != "object" && typeof n4 != "function", Q$2 = Array.isArray, pt = (n4) => Q$2(n4) || typeof (n4 == null ? void 0 : n4[Symbol.iterator]) == "function", I$2 = `[ 	
\f\r]`, x$6 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt$1 = /-->/g, ot$1 = />/g, _$5 = RegExp(`>|${I$2}(?:([^\\s"'>=/]+)(${I$2}*=${I$2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at$1 = /'/g, ht = /"/g, ft = /^(?:script|style|textarea|title)$/i, S$7 = Symbol.for("lit-noChange"), u$8 = Symbol.for("lit-nothing"), ct = /* @__PURE__ */ new WeakMap(), g$4 = v$5.createTreeWalker(v$5, 129);
function $t(n4, t3) {
  if (!Q$2(n4) || !n4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nt$1 !== void 0 ? nt$1.createHTML(t3) : t3;
}
const mt = (n4, t3) => {
  const e2 = n4.length - 1, s2 = [];
  let i4, o2 = t3 === 2 ? "<svg>" : t3 === 3 ? "<math>" : "", r2 = x$6;
  for (let h4 = 0; h4 < e2; h4++) {
    const a2 = n4[h4];
    let c2, d2, l2 = -1, p2 = 0;
    for (; p2 < a2.length && (r2.lastIndex = p2, d2 = r2.exec(a2), d2 !== null); ) p2 = r2.lastIndex, r2 === x$6 ? d2[1] === "!--" ? r2 = rt$1 : d2[1] !== void 0 ? r2 = ot$1 : d2[2] !== void 0 ? (ft.test(d2[2]) && (i4 = RegExp("</" + d2[2], "g")), r2 = _$5) : d2[3] !== void 0 && (r2 = _$5) : r2 === _$5 ? d2[0] === ">" ? (r2 = i4 ?? x$6, l2 = -1) : d2[1] === void 0 ? l2 = -2 : (l2 = r2.lastIndex - d2[2].length, c2 = d2[1], r2 = d2[3] === void 0 ? _$5 : d2[3] === '"' ? ht : at$1) : r2 === ht || r2 === at$1 ? r2 = _$5 : r2 === rt$1 || r2 === ot$1 ? r2 = x$6 : (r2 = _$5, i4 = void 0);
    const $2 = r2 === _$5 && n4[h4 + 1].startsWith("/>") ? " " : "";
    o2 += r2 === x$6 ? a2 + Ut : l2 >= 0 ? (s2.push(c2), a2.slice(0, l2) + Z$3 + a2.slice(l2) + f$8 + $2) : a2 + f$8 + (l2 === -2 ? h4 : $2);
  }
  return [$t(n4, o2 + (n4[e2] || "<?>") + (t3 === 2 ? "</svg>" : t3 === 3 ? "</math>" : "")), s2];
};
let R$3 = class R {
  constructor({ strings: t3, _$litType$: e2 }, s2) {
    let i4;
    this.parts = [];
    let o2 = 0, r2 = 0;
    const h4 = t3.length - 1, a2 = this.parts, [c2, d2] = mt(t3, e2);
    if (this.el = R.createElement(c2, s2), g$4.currentNode = this.el.content, e2 === 2 || e2 === 3) {
      const l2 = this.el.content.firstChild;
      l2.replaceWith(...l2.childNodes);
    }
    for (; (i4 = g$4.nextNode()) !== null && a2.length < h4; ) {
      if (i4.nodeType === 1) {
        if (i4.hasAttributes()) for (const l2 of i4.getAttributeNames()) if (l2.endsWith(Z$3)) {
          const p2 = d2[r2++], $2 = i4.getAttribute(l2).split(f$8), H3 = /([.?@])?(.*)/.exec(p2);
          a2.push({ type: 1, index: o2, name: H3[2], strings: $2, ctor: H3[1] === "." ? yt : H3[1] === "?" ? gt : H3[1] === "@" ? At : L$6 }), i4.removeAttribute(l2);
        } else l2.startsWith(f$8) && (a2.push({ type: 6, index: o2 }), i4.removeAttribute(l2));
        if (ft.test(i4.tagName)) {
          const l2 = i4.textContent.split(f$8), p2 = l2.length - 1;
          if (p2 > 0) {
            i4.textContent = D$5 ? D$5.emptyScript : "";
            for (let $2 = 0; $2 < p2; $2++) i4.append(l2[$2], U$1()), g$4.nextNode(), a2.push({ type: 2, index: ++o2 });
            i4.append(l2[p2], U$1());
          }
        }
      } else if (i4.nodeType === 8) if (i4.data === J$2) a2.push({ type: 2, index: o2 });
      else {
        let l2 = -1;
        for (; (l2 = i4.data.indexOf(f$8, l2 + 1)) !== -1; ) a2.push({ type: 7, index: o2 }), l2 += f$8.length - 1;
      }
      o2++;
    }
  }
  static createElement(t3, e2) {
    const s2 = v$5.createElement("template");
    return s2.innerHTML = t3, s2;
  }
};
function E$3(n4, t3, e2 = n4, s2) {
  var r2, h4;
  if (t3 === S$7) return t3;
  let i4 = s2 !== void 0 ? (r2 = e2._$Co) == null ? void 0 : r2[s2] : e2._$Cl;
  const o2 = M$5(t3) ? void 0 : t3._$litDirective$;
  return (i4 == null ? void 0 : i4.constructor) !== o2 && ((h4 = i4 == null ? void 0 : i4._$AO) == null || h4.call(i4, false), o2 === void 0 ? i4 = void 0 : (i4 = new o2(n4), i4._$AT(n4, e2, s2)), s2 !== void 0 ? (e2._$Co ?? (e2._$Co = []))[s2] = i4 : e2._$Cl = i4), i4 !== void 0 && (t3 = E$3(n4, i4._$AS(n4, t3.values), i4, s2)), t3;
}
class _t {
  constructor(t3, e2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = e2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    const { el: { content: e2 }, parts: s2 } = this._$AD, i4 = ((t3 == null ? void 0 : t3.creationScope) ?? v$5).importNode(e2, true);
    g$4.currentNode = i4;
    let o2 = g$4.nextNode(), r2 = 0, h4 = 0, a2 = s2[0];
    for (; a2 !== void 0; ) {
      if (r2 === a2.index) {
        let c2;
        a2.type === 2 ? c2 = new C$6(o2, o2.nextSibling, this, t3) : a2.type === 1 ? c2 = new a2.ctor(o2, a2.name, a2.strings, this, t3) : a2.type === 6 && (c2 = new vt(o2, this, t3)), this._$AV.push(c2), a2 = s2[++h4];
      }
      r2 !== (a2 == null ? void 0 : a2.index) && (o2 = g$4.nextNode(), r2++);
    }
    return g$4.currentNode = v$5, i4;
  }
  p(t3) {
    let e2 = 0;
    for (const s2 of this._$AV) s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t3, s2, e2), e2 += s2.strings.length - 2) : s2._$AI(t3[e2])), e2++;
  }
}
let C$6 = class C {
  get _$AU() {
    var t3;
    return ((t3 = this._$AM) == null ? void 0 : t3._$AU) ?? this._$Cv;
  }
  constructor(t3, e2, s2, i4) {
    this.type = 2, this._$AH = u$8, this._$AN = void 0, this._$AA = t3, this._$AB = e2, this._$AM = s2, this.options = i4, this._$Cv = (i4 == null ? void 0 : i4.isConnected) ?? true;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const e2 = this._$AM;
    return e2 !== void 0 && (t3 == null ? void 0 : t3.nodeType) === 11 && (t3 = e2.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, e2 = this) {
    t3 = E$3(this, t3, e2), M$5(t3) ? t3 === u$8 || t3 == null || t3 === "" ? (this._$AH !== u$8 && this._$AR(), this._$AH = u$8) : t3 !== this._$AH && t3 !== S$7 && this._(t3) : t3._$litType$ !== void 0 ? this.$(t3) : t3.nodeType !== void 0 ? this.T(t3) : pt(t3) ? this.k(t3) : this._(t3);
  }
  O(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  _(t3) {
    this._$AH !== u$8 && M$5(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(v$5.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    var o2;
    const { values: e2, _$litType$: s2 } = t3, i4 = typeof s2 == "number" ? this._$AC(t3) : (s2.el === void 0 && (s2.el = R$3.createElement($t(s2.h, s2.h[0]), this.options)), s2);
    if (((o2 = this._$AH) == null ? void 0 : o2._$AD) === i4) this._$AH.p(e2);
    else {
      const r2 = new _t(i4, this), h4 = r2.u(this.options);
      r2.p(e2), this.T(h4), this._$AH = r2;
    }
  }
  _$AC(t3) {
    let e2 = ct.get(t3.strings);
    return e2 === void 0 && ct.set(t3.strings, e2 = new R$3(t3)), e2;
  }
  k(t3) {
    Q$2(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let s2, i4 = 0;
    for (const o2 of t3) i4 === e2.length ? e2.push(s2 = new C(this.O(U$1()), this.O(U$1()), this, this.options)) : s2 = e2[i4], s2._$AI(o2), i4++;
    i4 < e2.length && (this._$AR(s2 && s2._$AB.nextSibling, i4), e2.length = i4);
  }
  _$AR(t3 = this._$AA.nextSibling, e2) {
    var s2;
    for ((s2 = this._$AP) == null ? void 0 : s2.call(this, false, true, e2); t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var e2;
    this._$AM === void 0 && (this._$Cv = t3, (e2 = this._$AP) == null || e2.call(this, t3));
  }
};
let L$6 = class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t3, e2, s2, i4, o2) {
    this.type = 1, this._$AH = u$8, this._$AN = void 0, this.element = t3, this.name = e2, this._$AM = i4, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = u$8;
  }
  _$AI(t3, e2 = this, s2, i4) {
    const o2 = this.strings;
    let r2 = false;
    if (o2 === void 0) t3 = E$3(this, t3, e2, 0), r2 = !M$5(t3) || t3 !== this._$AH && t3 !== S$7, r2 && (this._$AH = t3);
    else {
      const h4 = t3;
      let a2, c2;
      for (t3 = o2[0], a2 = 0; a2 < o2.length - 1; a2++) c2 = E$3(this, h4[s2 + a2], e2, a2), c2 === S$7 && (c2 = this._$AH[a2]), r2 || (r2 = !M$5(c2) || c2 !== this._$AH[a2]), c2 === u$8 ? t3 = u$8 : t3 !== u$8 && (t3 += (c2 ?? "") + o2[a2 + 1]), this._$AH[a2] = c2;
    }
    r2 && !i4 && this.j(t3);
  }
  j(t3) {
    t3 === u$8 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
  }
};
class yt extends L$6 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === u$8 ? void 0 : t3;
  }
}
class gt extends L$6 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    this.element.toggleAttribute(this.name, !!t3 && t3 !== u$8);
  }
}
class At extends L$6 {
  constructor(t3, e2, s2, i4, o2) {
    super(t3, e2, s2, i4, o2), this.type = 5;
  }
  _$AI(t3, e2 = this) {
    if ((t3 = E$3(this, t3, e2, 0) ?? u$8) === S$7) return;
    const s2 = this._$AH, i4 = t3 === u$8 && s2 !== u$8 || t3.capture !== s2.capture || t3.once !== s2.once || t3.passive !== s2.passive, o2 = t3 !== u$8 && (s2 === u$8 || i4);
    i4 && this.element.removeEventListener(this.name, this, s2), o2 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var e2;
    typeof this._$AH == "function" ? this._$AH.call(((e2 = this.options) == null ? void 0 : e2.host) ?? this.element, t3) : this._$AH.handleEvent(t3);
  }
}
class vt {
  constructor(t3, e2, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    E$3(this, t3);
  }
}
const q$2 = O$5.litHtmlPolyfillSupport;
q$2 == null || q$2(R$3, C$6), (O$5.litHtmlVersions ?? (O$5.litHtmlVersions = [])).push("3.3.1");
const Mt = (n4, t3, e2) => {
  const s2 = (e2 == null ? void 0 : e2.renderBefore) ?? t3;
  let i4 = s2._$litPart$;
  if (i4 === void 0) {
    const o2 = (e2 == null ? void 0 : e2.renderBefore) ?? null;
    s2._$litPart$ = i4 = new C$6(t3.insertBefore(U$1(), o2), o2, void 0, e2 ?? {});
  }
  return i4._$AI(n4), i4;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A$3 = globalThis;
let k$5 = class k extends y$6 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e2;
    const t3 = super.createRenderRoot();
    return (e2 = this.renderOptions).renderBefore ?? (e2.renderBefore = t3.firstChild), t3;
  }
  update(t3) {
    const e2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = Mt(e2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Do) == null || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Do) == null || t3.setConnected(false);
  }
  render() {
    return S$7;
  }
};
var dt;
k$5._$litElement$ = true, k$5.finalized = true, (dt = A$3.litElementHydrateSupport) == null || dt.call(A$3, { LitElement: k$5 });
const z$6 = A$3.litElementPolyfillSupport;
z$6 == null || z$6({ LitElement: k$5 });
(A$3.litElementVersions ?? (A$3.litElementVersions = [])).push("4.2.1");
function ce(n4, t3 = "this", e2) {
  return function(s2, i4, o2) {
    const r2 = s2.connectedCallback, h4 = s2.disconnectedCallback;
    s2.connectedCallback = function() {
      const a2 = t3 === "this" ? this : t3, c2 = Array.isArray(n4) ? n4 : [n4];
      this.__eventListenerRemovers ?? (this.__eventListenerRemovers = []);
      for (const d2 of c2) {
        const l2 = this[i4].bind(this);
        a2.addEventListener(d2, l2), this.__eventListenerRemovers.push(() => a2.removeEventListener(d2, l2));
      }
      r2 == null || r2.call(this);
    }, s2.disconnectedCallback = function() {
      var a2;
      (a2 = this.__eventListenerRemovers) == null || a2.forEach((c2) => c2()), this.__eventListenerRemovers = [], h4 == null || h4.call(this);
    };
  };
}
const kt = "nte-group-open-close";
function le(n4, t3) {
  document.dispatchEvent(
    new CustomEvent(kt, {
      bubbles: false,
      composed: true,
      detail: { open: n4, groupName: t3 }
    })
  );
}
function Wt(n4, t3) {
  const e2 = document.createElement("template");
  return e2.innerHTML = n4.trim(), t3.append(e2.content.cloneNode(true)), new Proxy({}, {
    get(s2, i4) {
      if (i4 === "fragment")
        return t3;
      if (typeof i4 == "string") {
        const o2 = t3.getElementById(i4);
        if (!o2)
          throw new Error(`❌ Unknown id '${i4}'.`);
        return o2;
      }
    }
  });
}
const Y$2 = class Y extends y$6 {
  constructor(t3) {
    super();
    const e2 = this.createRenderRoot();
    this.$ = Wt(t3, e2);
  }
  connectedCallback() {
    super.connectedCallback();
    let t3 = this.css;
    Array.isArray(t3) || (t3 = [t3]);
    const e2 = t3.map((s2) => s2 instanceof K$2 ? s2.styleSheet : ut(s2).styleSheet);
    this.shadowRoot.adoptedStyleSheets = e2;
  }
};
Y$2.DEFINITION = {
  classes: [],
  attributes: {}
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$5 = globalThis, e$5 = t$5.ShadowRoot && (void 0 === t$5.ShadyCSS || t$5.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$4 = Symbol(), o$9 = /* @__PURE__ */ new WeakMap();
let n$9 = class n {
  constructor(t3, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e2;
  }
  get styleSheet() {
    let t3 = this.o;
    const s2 = this.t;
    if (e$5 && void 0 === t3) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t3 = o$9.get(s2)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$9.set(s2, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
const r$7 = (t3) => new n$9("string" == typeof t3 ? t3 : t3 + "", void 0, s$4), S$6 = (s2, o2) => {
  if (e$5) s2.adoptedStyleSheets = o2.map(((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet));
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n4 = t$5.litNonce;
    void 0 !== n4 && o3.setAttribute("nonce", n4), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$5 = e$5 ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e2 = "";
  for (const s2 of t4.cssRules) e2 += s2.cssText;
  return r$7(e2);
})(t3) : t3;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$4, defineProperty: e$4, getOwnPropertyDescriptor: h$6, getOwnPropertyNames: r$6, getOwnPropertySymbols: o$8, getPrototypeOf: n$8 } = Object, a$4 = globalThis, c$4 = a$4.trustedTypes, l$4 = c$4 ? c$4.emptyScript : "", p$3 = a$4.reactiveElementPolyfillSupport, d$4 = (t3, s2) => t3, u$7 = { toAttribute(t3, s2) {
  switch (s2) {
    case Boolean:
      t3 = t3 ? l$4 : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, s2) {
  let i4 = t3;
  switch (s2) {
    case Boolean:
      i4 = null !== t3;
      break;
    case Number:
      i4 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t3);
      } catch (t4) {
        i4 = null;
      }
  }
  return i4;
} }, f$7 = (t3, s2) => !i$4(t3, s2), b$2 = { attribute: true, type: String, converter: u$7, reflect: false, useDefault: false, hasChanged: f$7 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$4.litPropertyMetadata ?? (a$4.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$5 = class y2 extends HTMLElement {
  static addInitializer(t3) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t3);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t3, s2 = b$2) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t3, s2), !s2.noAccessor) {
      const i4 = Symbol(), h4 = this.getPropertyDescriptor(t3, i4, s2);
      void 0 !== h4 && e$4(this.prototype, t3, h4);
    }
  }
  static getPropertyDescriptor(t3, s2, i4) {
    const { get: e2, set: r2 } = h$6(this.prototype, t3) ?? { get() {
      return this[s2];
    }, set(t4) {
      this[s2] = t4;
    } };
    return { get: e2, set(s3) {
      const h4 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t3, h4, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) ?? b$2;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$4("elementProperties"))) return;
    const t3 = n$8(this);
    t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$4("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$4("properties"))) {
      const t4 = this.properties, s2 = [...r$6(t4), ...o$8(t4)];
      for (const i4 of s2) this.createProperty(i4, t4[i4]);
    }
    const t3 = this[Symbol.metadata];
    if (null !== t3) {
      const s2 = litPropertyMetadata.get(t3);
      if (void 0 !== s2) for (const [t4, i4] of s2) this.elementProperties.set(t4, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t4, s2] of this.elementProperties) {
      const i4 = this._$Eu(t4, s2);
      void 0 !== i4 && this._$Eh.set(i4, t4);
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
  static _$Eu(t3, s2) {
    const i4 = s2.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise(((t3) => this.enableUpdating = t3)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach(((t3) => t3(this)));
  }
  addController(t3) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t3), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t3.hostConnected) == null ? void 0 : _a2.call(t3));
  }
  removeController(t3) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t3);
  }
  _$E_() {
    const t3 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i4 of s2.keys()) this.hasOwnProperty(i4) && (t3.set(i4, this[i4]), delete this[i4]);
    t3.size > 0 && (this._$Ep = t3);
  }
  createRenderRoot() {
    const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$6(t3, this.constructor.elementStyles), t3;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach(((t3) => {
      var _a3;
      return (_a3 = t3.hostConnected) == null ? void 0 : _a3.call(t3);
    }));
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach(((t3) => {
      var _a3;
      return (_a3 = t3.hostDisconnected) == null ? void 0 : _a3.call(t3);
    }));
  }
  attributeChangedCallback(t3, s2, i4) {
    this._$AK(t3, i4);
  }
  _$ET(t3, s2) {
    var _a2;
    const i4 = this.constructor.elementProperties.get(t3), e2 = this.constructor._$Eu(t3, i4);
    if (void 0 !== e2 && true === i4.reflect) {
      const h4 = (void 0 !== ((_a2 = i4.converter) == null ? void 0 : _a2.toAttribute) ? i4.converter : u$7).toAttribute(s2, i4.type);
      this._$Em = t3, null == h4 ? this.removeAttribute(e2) : this.setAttribute(e2, h4), this._$Em = null;
    }
  }
  _$AK(t3, s2) {
    var _a2, _b;
    const i4 = this.constructor, e2 = i4._$Eh.get(t3);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t4 = i4.getPropertyOptions(e2), h4 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== ((_a2 = t4.converter) == null ? void 0 : _a2.fromAttribute) ? t4.converter : u$7;
      this._$Em = e2;
      const r2 = h4.fromAttribute(s2, t4.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t3, s2, i4) {
    var _a2;
    if (void 0 !== t3) {
      const e2 = this.constructor, h4 = this[t3];
      if (i4 ?? (i4 = e2.getPropertyOptions(t3)), !((i4.hasChanged ?? f$7)(h4, s2) || i4.useDefault && i4.reflect && h4 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t3)) && !this.hasAttribute(e2._$Eu(t3, i4)))) return;
      this.C(t3, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t3, s2, { useDefault: i4, reflect: e2, wrapped: h4 }, r2) {
    i4 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t3) && (this._$Ej.set(t3, r2 ?? s2 ?? this[t3]), true !== h4 || void 0 !== r2) || (this._$AL.has(t3) || (this.hasUpdated || i4 || (s2 = void 0), this._$AL.set(t3, s2)), true === e2 && this._$Em !== t3 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t3));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t5, s3] of this._$Ep) this[t5] = s3;
        this._$Ep = void 0;
      }
      const t4 = this.constructor.elementProperties;
      if (t4.size > 0) for (const [s3, i4] of t4) {
        const { wrapped: t5 } = i4, e2 = this[s3];
        true !== t5 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i4, e2);
      }
    }
    let t3 = false;
    const s2 = this._$AL;
    try {
      t3 = this.shouldUpdate(s2), t3 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach(((t4) => {
        var _a3;
        return (_a3 = t4.hostUpdate) == null ? void 0 : _a3.call(t4);
      })), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t3 = false, this._$EM(), s3;
    }
    t3 && this._$AE(s2);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach(((t4) => {
      var _a3;
      return (_a3 = t4.hostUpdated) == null ? void 0 : _a3.call(t4);
    })), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
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
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((t4) => this._$ET(t4, this[t4])))), this._$EM();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
y$5.elementStyles = [], y$5.shadowRootOptions = { mode: "open" }, y$5[d$4("elementProperties")] = /* @__PURE__ */ new Map(), y$5[d$4("finalized")] = /* @__PURE__ */ new Map(), p$3 == null ? void 0 : p$3({ ReactiveElement: y$5 }), (a$4.reactiveElementVersions ?? (a$4.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = globalThis, i$3 = t$4.trustedTypes, s$3 = i$3 ? i$3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0, e$3 = "$lit$", h$5 = `lit$${Math.random().toFixed(9).slice(2)}$`, o$7 = "?" + h$5, n$7 = `<${o$7}>`, r$5 = document, l$3 = () => r$5.createComment(""), c$3 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3, a$3 = Array.isArray, u$6 = (t3) => a$3(t3) || "function" == typeof (t3 == null ? void 0 : t3[Symbol.iterator]), d$3 = "[ 	\n\f\r]", f$6 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$4 = /-->/g, _$4 = />/g, m$3 = RegExp(`>|${d$3}(?:([^\\s"'>=/]+)(${d$3}*=${d$3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p$2 = /'/g, g$3 = /"/g, $$1 = /^(?:script|style|textarea|title)$/i, y$4 = (t3) => (i4, ...s2) => ({ _$litType$: t3, strings: i4, values: s2 }), x$5 = y$4(1), T$4 = Symbol.for("lit-noChange"), E$2 = Symbol.for("lit-nothing"), A$2 = /* @__PURE__ */ new WeakMap(), C$5 = r$5.createTreeWalker(r$5, 129);
function P$4(t3, i4) {
  if (!a$3(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$3 ? s$3.createHTML(i4) : i4;
}
const V$2 = (t3, i4) => {
  const s2 = t3.length - 1, o2 = [];
  let r2, l2 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", c2 = f$6;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t3[i5];
    let a2, u3, d2 = -1, y4 = 0;
    for (; y4 < s3.length && (c2.lastIndex = y4, u3 = c2.exec(s3), null !== u3); ) y4 = c2.lastIndex, c2 === f$6 ? "!--" === u3[1] ? c2 = v$4 : void 0 !== u3[1] ? c2 = _$4 : void 0 !== u3[2] ? ($$1.test(u3[2]) && (r2 = RegExp("</" + u3[2], "g")), c2 = m$3) : void 0 !== u3[3] && (c2 = m$3) : c2 === m$3 ? ">" === u3[0] ? (c2 = r2 ?? f$6, d2 = -1) : void 0 === u3[1] ? d2 = -2 : (d2 = c2.lastIndex - u3[2].length, a2 = u3[1], c2 = void 0 === u3[3] ? m$3 : '"' === u3[3] ? g$3 : p$2) : c2 === g$3 || c2 === p$2 ? c2 = m$3 : c2 === v$4 || c2 === _$4 ? c2 = f$6 : (c2 = m$3, r2 = void 0);
    const x3 = c2 === m$3 && t3[i5 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f$6 ? s3 + n$7 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e$3 + s3.slice(d2) + h$5 + x3) : s3 + h$5 + (-2 === d2 ? i5 : x3);
  }
  return [P$4(t3, l2 + (t3[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), o2];
};
let N$3 = class N {
  constructor({ strings: t3, _$litType$: s2 }, n4) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u3 = t3.length - 1, d2 = this.parts, [f4, v2] = V$2(t3, s2);
    if (this.el = N.createElement(f4, n4), C$5.currentNode = this.el.content, 2 === s2 || 3 === s2) {
      const t4 = this.el.content.firstChild;
      t4.replaceWith(...t4.childNodes);
    }
    for (; null !== (r2 = C$5.nextNode()) && d2.length < u3; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t4 of r2.getAttributeNames()) if (t4.endsWith(e$3)) {
          const i4 = v2[a2++], s3 = r2.getAttribute(t4).split(h$5), e2 = /([.?@])?(.*)/.exec(i4);
          d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? H$3 : "?" === e2[1] ? I$1 : "@" === e2[1] ? L$5 : k$4 }), r2.removeAttribute(t4);
        } else t4.startsWith(h$5) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t4));
        if ($$1.test(r2.tagName)) {
          const t4 = r2.textContent.split(h$5), s3 = t4.length - 1;
          if (s3 > 0) {
            r2.textContent = i$3 ? i$3.emptyScript : "";
            for (let i4 = 0; i4 < s3; i4++) r2.append(t4[i4], l$3()), C$5.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t4[s3], l$3());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === o$7) d2.push({ type: 2, index: c2 });
      else {
        let t4 = -1;
        for (; -1 !== (t4 = r2.data.indexOf(h$5, t4 + 1)); ) d2.push({ type: 7, index: c2 }), t4 += h$5.length - 1;
      }
      c2++;
    }
  }
  static createElement(t3, i4) {
    const s2 = r$5.createElement("template");
    return s2.innerHTML = t3, s2;
  }
};
function S$5(t3, i4, s2 = t3, e2) {
  var _a2, _b;
  if (i4 === T$4) return i4;
  let h4 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = c$3(i4) ? void 0 : i4._$litDirective$;
  return (h4 == null ? void 0 : h4.constructor) !== o2 && ((_b = h4 == null ? void 0 : h4._$AO) == null ? void 0 : _b.call(h4, false), void 0 === o2 ? h4 = void 0 : (h4 = new o2(t3), h4._$AT(t3, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h4 : s2._$Cl = h4), void 0 !== h4 && (i4 = S$5(t3, h4._$AS(t3, i4.values), h4, e2)), i4;
}
let M$4 = class M {
  constructor(t3, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    const { el: { content: i4 }, parts: s2 } = this._$AD, e2 = ((t3 == null ? void 0 : t3.creationScope) ?? r$5).importNode(i4, true);
    C$5.currentNode = e2;
    let h4 = C$5.nextNode(), o2 = 0, n4 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i5;
        2 === l2.type ? i5 = new R$2(h4, h4.nextSibling, this, t3) : 1 === l2.type ? i5 = new l2.ctor(h4, l2.name, l2.strings, this, t3) : 6 === l2.type && (i5 = new z$5(h4, this, t3)), this._$AV.push(i5), l2 = s2[++n4];
      }
      o2 !== (l2 == null ? void 0 : l2.index) && (h4 = C$5.nextNode(), o2++);
    }
    return C$5.currentNode = r$5, e2;
  }
  p(t3) {
    let i4 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t3, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t3[i4])), i4++;
  }
};
let R$2 = class R2 {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t3, i4, s2, e2) {
    this.type = 2, this._$AH = E$2, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === (t3 == null ? void 0 : t3.nodeType) && (t3 = i4.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i4 = this) {
    t3 = S$5(this, t3, i4), c$3(t3) ? t3 === E$2 || null == t3 || "" === t3 ? (this._$AH !== E$2 && this._$AR(), this._$AH = E$2) : t3 !== this._$AH && t3 !== T$4 && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : u$6(t3) ? this.k(t3) : this._(t3);
  }
  O(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  _(t3) {
    this._$AH !== E$2 && c$3(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(r$5.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    var _a2;
    const { values: i4, _$litType$: s2 } = t3, e2 = "number" == typeof s2 ? this._$AC(t3) : (void 0 === s2.el && (s2.el = N$3.createElement(P$4(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i4);
    else {
      const t4 = new M$4(e2, this), s3 = t4.u(this.options);
      t4.p(i4), this.T(s3), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i4 = A$2.get(t3.strings);
    return void 0 === i4 && A$2.set(t3.strings, i4 = new N$3(t3)), i4;
  }
  k(t3) {
    a$3(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s2, e2 = 0;
    for (const h4 of t3) e2 === i4.length ? i4.push(s2 = new R2(this.O(l$3()), this.O(l$3()), this, this.options)) : s2 = i4[e2], s2._$AI(h4), e2++;
    e2 < i4.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i4.length = e2);
  }
  _$AR(t3 = this._$AA.nextSibling, i4) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i4); t3 !== this._$AB; ) {
      const i5 = t3.nextSibling;
      t3.remove(), t3 = i5;
    }
  }
  setConnected(t3) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t3, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t3));
  }
};
let k$4 = class k2 {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t3, i4, s2, e2, h4) {
    this.type = 1, this._$AH = E$2, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e2, this.options = h4, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = E$2;
  }
  _$AI(t3, i4 = this, s2, e2) {
    const h4 = this.strings;
    let o2 = false;
    if (void 0 === h4) t3 = S$5(this, t3, i4, 0), o2 = !c$3(t3) || t3 !== this._$AH && t3 !== T$4, o2 && (this._$AH = t3);
    else {
      const e3 = t3;
      let n4, r2;
      for (t3 = h4[0], n4 = 0; n4 < h4.length - 1; n4++) r2 = S$5(this, e3[s2 + n4], i4, n4), r2 === T$4 && (r2 = this._$AH[n4]), o2 || (o2 = !c$3(r2) || r2 !== this._$AH[n4]), r2 === E$2 ? t3 = E$2 : t3 !== E$2 && (t3 += (r2 ?? "") + h4[n4 + 1]), this._$AH[n4] = r2;
    }
    o2 && !e2 && this.j(t3);
  }
  j(t3) {
    t3 === E$2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
  }
};
let H$3 = class H extends k$4 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === E$2 ? void 0 : t3;
  }
};
let I$1 = class I extends k$4 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    this.element.toggleAttribute(this.name, !!t3 && t3 !== E$2);
  }
};
let L$5 = class L2 extends k$4 {
  constructor(t3, i4, s2, e2, h4) {
    super(t3, i4, s2, e2, h4), this.type = 5;
  }
  _$AI(t3, i4 = this) {
    if ((t3 = S$5(this, t3, i4, 0) ?? E$2) === T$4) return;
    const s2 = this._$AH, e2 = t3 === E$2 && s2 !== E$2 || t3.capture !== s2.capture || t3.once !== s2.once || t3.passive !== s2.passive, h4 = t3 !== E$2 && (s2 === E$2 || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h4 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t3) : this._$AH.handleEvent(t3);
  }
};
let z$5 = class z {
  constructor(t3, i4, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    S$5(this, t3);
  }
};
const Z$2 = { I: R$2 }, j$3 = t$4.litHtmlPolyfillSupport;
j$3 == null ? void 0 : j$3(N$3, R$2), (t$4.litHtmlVersions ?? (t$4.litHtmlVersions = [])).push("3.3.1");
const B$4 = (t3, i4, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i4;
  let h4 = e2._$litPart$;
  if (void 0 === h4) {
    const t4 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h4 = new R$2(i4.insertBefore(l$3(), t4), t4, void 0, s2 ?? {});
  }
  return h4._$AI(t3), h4;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$2 = globalThis;
let i$2 = class i extends y$5 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t3 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t3.firstChild), t3;
  }
  update(t3) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = B$4(r2, this.renderRoot, this.renderOptions);
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
    return T$4;
  }
};
i$2._$litElement$ = true, i$2["finalized"] = true, (_a = s$2.litElementHydrateSupport) == null ? void 0 : _a.call(s$2, { LitElement: i$2 });
const o$6 = s$2.litElementPolyfillSupport;
o$6 == null ? void 0 : o$6({ LitElement: i$2 });
(s$2.litElementVersions ?? (s$2.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = (t3) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer((() => {
    customElements.define(t3, e2);
  })) : customElements.define(t3, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$5 = { attribute: true, type: String, converter: u$7, reflect: false, hasChanged: f$7 }, r$4 = (t3 = o$5, e2, r2) => {
  const { kind: n4, metadata: i4 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i4);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i4, s2 = /* @__PURE__ */ new Map()), "setter" === n4 && ((t3 = Object.create(t3)).wrapped = true), s2.set(r2.name, t3), "accessor" === n4) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n5 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n5, t3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t3, e3), e3;
    } };
  }
  if ("setter" === n4) {
    const { name: o2 } = r2;
    return function(r3) {
      const n5 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n5, t3);
    };
  }
  throw Error("Unsupported decorator location: " + n4);
};
function n$6(t3) {
  return (e2, o2) => "object" == typeof o2 ? r$4(t3, e2, o2) : ((t4, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t4), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t3, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r$3(r2) {
  return n$6({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = { ATTRIBUTE: 1, CHILD: 2 }, e$2 = (t3) => (...e2) => ({ _$litDirective$: t3, values: e2 });
let i$1 = class i2 {
  constructor(t3) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t3, e2, i4) {
    this._$Ct = t3, this._$AM = e2, this._$Ci = i4;
  }
  _$AS(t3, e2) {
    return this.update(t3, e2);
  }
  update(t3, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = e$2(class extends i$1 {
  constructor(t3) {
    var _a2;
    if (super(t3), t3.type !== t$2.ATTRIBUTE || "class" !== t3.name || ((_a2 = t3.strings) == null ? void 0 : _a2.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t3) {
    return " " + Object.keys(t3).filter(((s2) => t3[s2])).join(" ") + " ";
  }
  update(s2, [i4]) {
    var _a2, _b;
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter(((t3) => "" !== t3))));
      for (const t3 in i4) i4[t3] && !((_a2 = this.nt) == null ? void 0 : _a2.has(t3)) && this.st.add(t3);
      return this.render(i4);
    }
    const r2 = s2.element.classList;
    for (const t3 of this.st) t3 in i4 || (r2.remove(t3), this.st.delete(t3));
    for (const t3 in i4) {
      const s3 = !!i4[t3];
      s3 === this.st.has(t3) || ((_b = this.nt) == null ? void 0 : _b.has(t3)) || (s3 ? (r2.add(t3), this.st.add(t3)) : (r2.remove(t3), this.st.delete(t3)));
    }
    return T$4;
  }
});
const y$3 = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--backdrop: rgb(from var(--nt-dark) r g b / .5);--header-background: transparent;--background-color: var(--nt-primary-subtle);--shadow-color: rgb(from var(--nt-dark) r g b / .5);--main-padding: 0;--header-padding: var(--nt-space);position:fixed;top:0;right:0;height:100vh;width:33%;min-width:250px;max-width:400px;z-index:2000;padding:0;isolation:isolate;display:block}:host[opened]{display:block}#offcanvas{display:flex;flex-direction:column;width:100%;height:100%;background-color:var(--background-color);box-shadow:0 0 10px var(--shadow-color);transition:transform .2s ease-in-out;transform:translate(0)}#offcanvas.closed{transform:translate(100%)}#header{display:flex;width:100%;flex-direction:row;justify-content:space-between;align-items:center;background-color:var(--header-background);flex-grow:0;padding:var(--header-padding)}#header:has(>slot[empty]){display:none}#main{display:flex;width:100%;flex-grow:1;padding:var(--main-padding);min-height:200px;overflow:auto;scroll-behavior:auto;scrollbar-gutter:auto;height:100%}#footer{display:flex;width:100%;flex-direction:row;justify-content:space-between;align-items:center;margin-top:auto;flex-grow:0;padding:var(--padding)}#footer:has(>slot[empty]){display:none}#backdrop{opacity:1;transition:opacity .2s ease-in-out;position:fixed;top:0;left:0;width:100%;height:100%;background-color:var(--backdrop);z-index:-1;display:block}#backdrop.closed{opacity:0}";
var x$4 = Object.defineProperty, w$3 = Object.getOwnPropertyDescriptor, a$2 = (e2, r2, s2, i4) => {
  for (var o2 = i4 > 1 ? void 0 : i4 ? w$3(r2, s2) : r2, n4 = e2.length - 1, d2; n4 >= 0; n4--)
    (d2 = e2[n4]) && (o2 = (i4 ? d2(r2, s2, o2) : d2(o2)) || o2);
  return i4 && o2 && x$4(r2, s2, o2), o2;
};
let t$1 = class t extends i$2 {
  constructor() {
    super(), this.backdrop = true, this.opened = false, this.dataGroupName = "", this.closedClass = true, this.addEventListener("click", (e2) => {
      e2 === void 0 || !e2.target || !(e2.target instanceof HTMLElement) || e2.target.closest("[data-nt-dismiss='offcanvas']") !== null && this.close();
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
  async updated(e2) {
    e2.has("opened") && (this.dataGroupName !== "" && le(this.opened, this.dataGroupName), this.opened ? (this.style.display = "block", await zt(1), jt.observeEmptySlots(this), this.closedClass = false) : (this.closedClass = true, await zt(400), this.style.display = "none"));
  }
  render() {
    return x$5`
      <div
        id="backdrop"
        part="backdrop"
        @click=${() => this.opened = false}
        class=${e$1({ closed: this.closedClass })}
      ></div>
      <div
        id="offcanvas"
        part="offcanvas"
        role="dialog"
        aria-modal="true"
        class=${e$1({ closed: this.closedClass })}
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
t$1.styles = [r$7(y$3)];
a$2([
  n$6({ type: Boolean, reflect: true })
], t$1.prototype, "backdrop", 2);
a$2([
  n$6({ type: Boolean, reflect: true })
], t$1.prototype, "opened", 2);
a$2([
  n$6({ type: String, attribute: "data-group-name" })
], t$1.prototype, "dataGroupName", 2);
a$2([
  r$3()
], t$1.prototype, "closedClass", 2);
t$1 = a$2([
  t$3(t$1.is)
], t$1);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: t2 } = Z$2, f$5 = (o2) => void 0 === o2.strings, r$2 = () => document.createComment(""), s$1 = (o2, i4, n4) => {
  var _a2;
  const e2 = o2._$AA.parentNode, l2 = void 0 === i4 ? o2._$AB : i4._$AA;
  if (void 0 === n4) {
    const i5 = e2.insertBefore(r$2(), l2), d2 = e2.insertBefore(r$2(), l2);
    n4 = new t2(i5, d2, o2, o2.options);
  } else {
    const t3 = n4._$AB.nextSibling, i5 = n4._$AM, d2 = i5 !== o2;
    if (d2) {
      let t4;
      (_a2 = n4._$AQ) == null ? void 0 : _a2.call(n4, o2), n4._$AM = o2, void 0 !== n4._$AP && (t4 = o2._$AU) !== i5._$AU && n4._$AP(t4);
    }
    if (t3 !== l2 || d2) {
      let o3 = n4._$AA;
      for (; o3 !== t3; ) {
        const t4 = o3.nextSibling;
        e2.insertBefore(o3, l2), o3 = t4;
      }
    }
  }
  return n4;
}, v$3 = (o2, t3, i4 = o2) => (o2._$AI(t3, i4), o2), u$5 = {}, m$2 = (o2, t3 = u$5) => o2._$AH = t3, p$1 = (o2) => o2._$AH, M$3 = (o2) => {
  o2._$AR(), o2._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = (i4, t3) => {
  var _a2;
  const e2 = i4._$AN;
  if (void 0 === e2) return false;
  for (const i5 of e2) (_a2 = i5._$AO) == null ? void 0 : _a2.call(i5, t3, false), s(i5, t3);
  return true;
}, o$4 = (i4) => {
  let t3, e2;
  do {
    if (void 0 === (t3 = i4._$AM)) break;
    e2 = t3._$AN, e2.delete(i4), i4 = t3;
  } while (0 === (e2 == null ? void 0 : e2.size));
}, r$1 = (i4) => {
  for (let t3; t3 = i4._$AM; i4 = t3) {
    let e2 = t3._$AN;
    if (void 0 === e2) t3._$AN = e2 = /* @__PURE__ */ new Set();
    else if (e2.has(i4)) break;
    e2.add(i4), c$2(t3);
  }
};
function h$4(i4) {
  void 0 !== this._$AN ? (o$4(this), this._$AM = i4, r$1(this)) : this._$AM = i4;
}
function n$5(i4, t3 = false, e2 = 0) {
  const r2 = this._$AH, h4 = this._$AN;
  if (void 0 !== h4 && 0 !== h4.size) if (t3) if (Array.isArray(r2)) for (let i5 = e2; i5 < r2.length; i5++) s(r2[i5], false), o$4(r2[i5]);
  else null != r2 && (s(r2, false), o$4(r2));
  else s(this, i4);
}
const c$2 = (i4) => {
  i4.type == t$2.CHILD && (i4._$AP ?? (i4._$AP = n$5), i4._$AQ ?? (i4._$AQ = h$4));
};
let f$4 = class f extends i$1 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i4, t3, e2) {
    super._$AT(i4, t3, e2), r$1(this), this.isConnected = i4._$AU;
  }
  _$AO(i4, t3 = true) {
    var _a2, _b;
    i4 !== this.isConnected && (this.isConnected = i4, i4 ? (_a2 = this.reconnected) == null ? void 0 : _a2.call(this) : (_b = this.disconnected) == null ? void 0 : _b.call(this)), t3 && (s(this, i4), o$4(this));
  }
  setValue(t3) {
    if (f$5(this._$Ct)) this._$Ct._$AI(t3, this);
    else {
      const i4 = [...this._$Ct._$AH];
      i4[this._$Ci] = t3, this._$Ct._$AI(i4, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = () => new h$3();
let h$3 = class h {
};
const o$3 = /* @__PURE__ */ new WeakMap(), n$4 = e$2(class extends f$4 {
  render(i4) {
    return E$2;
  }
  update(i4, [s2]) {
    var _a2;
    const e2 = s2 !== this.G;
    return e2 && void 0 !== this.G && this.rt(void 0), (e2 || this.lt !== this.ct) && (this.G = s2, this.ht = (_a2 = i4.options) == null ? void 0 : _a2.host, this.rt(this.ct = i4.element)), E$2;
  }
  rt(t3) {
    if (this.isConnected || (t3 = void 0), "function" == typeof this.G) {
      const i4 = this.ht ?? globalThis;
      let s2 = o$3.get(i4);
      void 0 === s2 && (s2 = /* @__PURE__ */ new WeakMap(), o$3.set(i4, s2)), void 0 !== s2.get(this.G) && this.G.call(this.ht, void 0), s2.set(this.G, t3), void 0 !== t3 && this.G.call(this.ht, t3);
    } else this.G.value = t3;
  }
  get lt() {
    var _a2, _b;
    return "function" == typeof this.G ? (_a2 = o$3.get(this.ht ?? globalThis)) == null ? void 0 : _a2.get(this.G) : (_b = this.G) == null ? void 0 : _b.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const a$1 = Symbol.for(""), o$2 = (t3) => {
  if ((t3 == null ? void 0 : t3.r) === a$1) return t3 == null ? void 0 : t3._$litStatic$;
}, l$2 = /* @__PURE__ */ new Map(), n$3 = (t3) => (r2, ...e2) => {
  const a2 = e2.length;
  let s2, i4;
  const n4 = [], u3 = [];
  let c2, $2 = 0, f4 = false;
  for (; $2 < a2; ) {
    for (c2 = r2[$2]; $2 < a2 && void 0 !== (i4 = e2[$2], s2 = o$2(i4)); ) c2 += s2 + r2[++$2], f4 = true;
    $2 !== a2 && u3.push(i4), n4.push(c2), $2++;
  }
  if ($2 === a2 && n4.push(r2[a2]), f4) {
    const t4 = n4.join("$$lit$$");
    void 0 === (r2 = l$2.get(t4)) && (n4.raw = n4, l$2.set(t4, r2 = n4)), e2 = u3;
  }
  return t3(r2, ...e2);
}, u$4 = n$3(x$5);
const f$3 = ":host{--size: 40px;--color: var(--nt-text, black);--color-hover: var(--color);--width: 4px;height:var(--size);width:var(--size);display:block}#button{padding:0;width:100%;height:100%;cursor:pointer}.hamburger{display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0 none;background:none;position:relative;transition:transform .4s}.hamburger:hover{--color: var(--color-hover)}:host([open]) .hamburger .bar:nth-of-type(1){transform-origin:center center;transform:translateY(calc(.5em - var(--width) / 2)) rotate(45deg)}:host([open]) .hamburger .bar:nth-of-type(2){opacity:0}:host([open]) .hamburger .bar:nth-of-type(3){transform:translateY(calc(.5em - var(--width) / 2)) rotate(-45deg)}:host(:not([open])) #button:hover .bar:nth-of-type(1){transform:translateY(calc(.2em - var(--width) / 2))}:host(:not([open])) #button:hover .bar:nth-of-type(2){transform:translateY(calc(.5em - var(--width) / 2))}:host(:not([open])) #button:hover .bar:nth-of-type(3){transform:translateY(calc(.8em - var(--width) / 2))}.bar{font-size:var(--size);height:var(--width);width:var(--size);display:block;position:absolute;top:0;background-color:var(--color);transition:.4s}.bar:nth-of-type(1){transform:translateY(calc(.25em - var(--width) / 2))}.bar:nth-of-type(2){transform:translateY(calc(.5em - var(--width) / 2))}.bar:nth-of-type(3){transform:translateY(calc(.75em - var(--width) / 2))}";
var y$2 = Object.defineProperty, g$2 = Object.getOwnPropertyDescriptor, o$1 = (t3, a2, s2, n4) => {
  for (var e2 = n4 > 1 ? void 0 : n4 ? g$2(a2, s2) : a2, p2 = t3.length - 1, i4; p2 >= 0; p2--)
    (i4 = t3[p2]) && (e2 = (n4 ? i4(a2, s2, e2) : i4(e2)) || e2);
  return n4 && e2 && y$2(a2, s2, e2), e2;
};
let r = class extends i$2 {
  constructor() {
    super(), this.open = false, this.text = "Menu", this.dataGroupName = "";
  }
  render() {
    return u$4` <button id="button" class="hamburger">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </button>`;
  }
  listenEvents(t3) {
    t3.detail.groupName === this.dataGroupName && (this.open = t3.detail.open);
  }
  update(t3) {
    super.update(t3), t3.has("open") && this.dataGroupName !== "" && le(this.open, this.dataGroupName);
  }
};
r.styles = [r$7(f$3)];
o$1([
  n$6({ type: Boolean, attribute: "open", reflect: true })
], r.prototype, "open", 2);
o$1([
  n$6({ type: String, reflect: true })
], r.prototype, "text", 2);
o$1([
  n$6({ type: String, reflect: false, attribute: "data-group-name" })
], r.prototype, "dataGroupName", 2);
o$1([
  ce(kt, document)
], r.prototype, "listenEvents", 1);
r = o$1([
  t$3("nte-burger")
], r);
const T$3 = ":host{--container-width: var(--nt-container-width);--text-color: var(--nt-text);--hover-color: var(--nt-primary);--hover-text-color: var(--nt-text-on-primary);--transition: .2s ease-in-out;--submenu-bg: var(--nt-light);--submenu-text-color: var(--nt-text);--justify-content: center;--sidemenu-bg: var(--nt-primary-subtle);--justify-sidebar-burger: flex-end;--height: auto;--default-alpha: .7;height:var(--height);display:block}nav{height:100%}#main{height:100%}#burger-wrapper{padding:15px}#text{padding-right:10px}#burger-default{cursor:pointer}#burger-default slot::slotted(span){color:rgb(from var(--text-color) r g b/var(--default-alpha));transition:color var(--transition)}#burger-default nte-burger{--color: rgb(from var(--text-color) r g b / var(--default-alpha))}#burger-default:hover slot::slotted(span){color:rgb(from var(--text-color) r g b/1)}#burger-default:hover nte-burger{--color: rgb(from var(--text-color) r g b / 1)}";
var k$3 = Object.defineProperty, O$4 = Object.getOwnPropertyDescriptor, l$1 = (t3, r2, s2, a2) => {
  for (var e2 = a2 > 1 ? void 0 : a2 ? O$4(r2, s2) : r2, i4 = t3.length - 1, o2; i4 >= 0; i4--)
    (o2 = t3[i4]) && (e2 = (a2 ? o2(r2, s2, e2) : o2(e2)) || e2);
  return a2 && e2 && k$3(r2, s2, e2), e2;
};
let n$2 = class n2 extends i$2 {
  constructor() {
    super(), this.mode = "slave", this.breakpoint = "99999px", this.transferTo = "", this.dataGroupName = "", this._isTransferred = false;
  }
  getOffcanvas() {
    return this.transferTo ? document.querySelector(this.transferTo) : null;
  }
  getOffcanvasNav() {
    const t3 = this.getOffcanvas();
    return t3 ? t3.querySelector("nte-nav") : null;
  }
  render() {
    return x$5` <nav>
      <div id="burger-wrapper" ?hidden=${!this._isTransferred}>
        <slot
          name="burger"
          open
          aria-haspopup="true"
          id="burger"
          class="burger"
          @click=${() => {
      var t3;
      return (t3 = this.getOffcanvas()) == null ? void 0 : t3.open();
    }}
        >
          <!-- fallback icon -->
          ${this._isTransferred ? x$5`<div id="burger-default" style="display:flex; align-items: center; justify-content: center;">
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
  transferToElement(t3) {
    var a2;
    const r2 = (a2 = this.shadowRoot) == null ? void 0 : a2.querySelector("#main-slot");
    if (r2 === null)
      return;
    Array.from(r2.assignedElements({ flatten: true })).forEach((e2) => {
      e2 instanceof HTMLElement && t3.appendChild(e2);
    });
  }
  updated(t3) {
    var r2, s2;
    super.updated(t3), this._isTransferred ? this.transferToElement(
      this.getOffcanvasNav() ?? (() => {
        throw new Error("No offcanvas nav found");
      })()
    ) : ((r2 = this.getOffcanvasNav()) == null || r2.transferToElement(this), (s2 = this.getOffcanvas()) == null || s2.close());
  }
  firstUpdated(t3) {
    super.firstUpdated(t3);
    const r2 = this.classList;
    !r2.contains("nav-vertical") && !r2.contains("nav-horizontal") && r2.add(this.closest("nte-offcanvas") === null ? "nav-horizontal" : "nav-vertical");
  }
  async connectedCallback() {
    await It(), super.connectedCallback(), this.mode !== "slave" && this.transferTo !== "" && (this._isTransferred = false, this.breakpoint !== "" && (Dt(this.breakpoint) || (this._isTransferred = true), window.addEventListener("breakpoint-changed", (t3) => {
      Dt(this.breakpoint) ? this._isTransferred = false : this._isTransferred = true;
    })));
  }
};
n$2.styles = [r$7(T$3)];
l$1([
  n$6({ type: String, reflect: true })
], n$2.prototype, "mode", 2);
l$1([
  n$6({ type: String, reflect: true })
], n$2.prototype, "breakpoint", 2);
l$1([
  n$6({ type: String, reflect: true, attribute: "transfer-to" })
], n$2.prototype, "transferTo", 2);
l$1([
  n$6({ type: String, reflect: false, attribute: "data-group-name" })
], n$2.prototype, "dataGroupName", 2);
l$1([
  r$3()
], n$2.prototype, "_isTransferred", 2);
n$2 = l$1([
  t$3("nte-nav")
], n$2);
const L$4 = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--bg: transparent;--spacer-bg: transparent;--container-width: var(--nt-container-width, 100%);--brand-height: 80px;--spacer-height: 80px;width:100vw;margin:0}:host(a){height:85px;width:auto}#wrapper{position:relative;left:0;top:0;right:0;width:100%}#spacer{position:relative;top:0;left:0;width:100%;transition:height .3s ease-in-out;height:var(--spacer-height);background-color:var(--spacer-bg)}#navbar{position:absolute;top:0;width:100vw;height:auto;background-color:var(--bg);z-index:1000}#main{width:100vw;display:block}";
var P$3 = Object.defineProperty, E$1 = Object.getOwnPropertyDescriptor, x$3 = (t3, r2, s2, a2) => {
  for (var e2 = a2 > 1 ? void 0 : a2 ? E$1(r2, s2) : r2, i4 = t3.length - 1, o2; i4 >= 0; i4--)
    (o2 = t3[i4]) && (e2 = (a2 ? o2(r2, s2, e2) : o2(e2)) || e2);
  return a2 && e2 && P$3(r2, s2, e2), e2;
};
let h$2 = class h2 extends i$2 {
  constructor() {
    super(), this.navbarRef = e(), this.spacerRef = e(), this.scrollThreshold = 0, this._lastScrollY = window.scrollY, this._scrollUpPixels = 0, this._debouncer = new Et(100, 300), document.addEventListener(
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
    const t3 = window.scrollY;
    t3 > 1 ? this.classList.add("is-scrolled") : this.classList.remove("is-scrolled"), t3 < this._lastScrollY ? (this._scrollUpPixels += this._lastScrollY - t3, this._scrollUpPixels > 10 && t3 < this.scrollThreshold && this.classList.add("is-scrolling-up")) : (this._scrollUpPixels = 0, this.classList.remove("is-scrolling-up")), t3 > this.scrollThreshold ? this.classList.add("is-below-threshold") : this.classList.remove("is-below-threshold"), this._lastScrollY = t3;
  }
  async connectedCallback() {
    this.updateScrollState(), await It(), super.connectedCallback();
  }
  // Adjust the spacer height on every render
  async updated(t3) {
    await It(), super.updated(t3);
  }
  firstUpdated(t3) {
    jt.observeEmptySlots(this);
  }
  render() {
    return x$5`
      <div id="wrapper" part="wrapper">
        <div id="spacer" part="spacer" ${n$4(this.spacerRef)}></div>
        <div id="navbar" part="navbar" ${n$4(this.navbarRef)}>
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
h$2.styles = [r$7(L$4)];
x$3([
  n$6({ type: Number, attribute: "scroll-threshold", reflect: true })
], h$2.prototype, "scrollThreshold", 2);
h$2 = x$3([
  t$3("nte-navbar")
], h$2);
const N$2 = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--container-width: var(--nt-container-width, 100%);--background: transparent;--text-color: var(--nt-text);--height: auto;--brand-height: 80px;display:block;height:100%;width:100vw}:host(.hide-on-scroll){transition:max-height .3s ease-in-out;max-height:100px}:host(.hide-on-scroll.is-scrolled){max-height:0;overflow:hidden}#main{height:var(--height);transition:height .2s ease-in-out;overflow:visible;width:100%;display:flex;background:var(--background)}#container{width:var(--container-width);margin:0 auto;display:flex}#container #brand{min-width:0;flex-shrink:1;width:auto;align-items:start;display:flex;height:100%;justify-items:center}#container #brand:has(slot[empty]){display:none}#container #nav{display:flex;flex-grow:1;justify-content:end;align-items:center;gap:1rem}";
var C$4 = (t3, r2, s2, a2) => {
  for (var e2 = r2, i4 = t3.length - 1, o2; i4 >= 0; i4--)
    (o2 = t3[i4]) && (e2 = o2(e2) || e2);
  return e2;
};
let u$3 = class u extends i$2 {
  constructor() {
    super(...arguments), this._isScrolled = false;
  }
  static get is() {
    return "nte-navbar-line";
  }
  updateScrollState() {
    const t3 = window.scrollY;
    t3 > 1 && !this._isScrolled ? (this.classList.add("is-scrolled"), this._isScrolled = true) : t3 <= 1 && this._isScrolled && (this.classList.remove("is-scrolled"), this._isScrolled = false);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("scroll", () => this.updateScrollState(), { passive: true });
  }
  async firstUpdated(t3) {
    jt.observeEmptySlots(this), this.updateScrollState();
  }
  render() {
    return x$5`
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
u$3.styles = [r$7(N$2)];
u$3 = C$4([
  t$3("nte-navbar-line")
], u$3);
console.log("Loading nte-nav...");
var D$4 = Object.defineProperty;
var L$3 = (e2) => {
  throw TypeError(e2);
};
var M$2 = (e2, t3, n4) => t3 in e2 ? D$4(e2, t3, { enumerable: true, configurable: true, writable: true, value: n4 }) : e2[t3] = n4;
var u$2 = (e2, t3, n4) => M$2(e2, typeof t3 != "symbol" ? t3 + "" : t3, n4), w$2 = (e2, t3, n4) => t3.has(e2) || L$3("Cannot " + n4);
var a = (e2, t3, n4) => (w$2(e2, t3, "read from private field"), n4 ? n4.call(e2) : t3.get(e2)), l = (e2, t3, n4) => t3.has(e2) ? L$3("Cannot add the same private member more than once") : t3 instanceof WeakSet ? t3.add(e2) : t3.set(e2, n4), d$2 = (e2, t3, n4, i4) => (w$2(e2, t3, "write to private field"), t3.set(e2, n4), n4), v$2 = (e2, t3, n4) => (w$2(e2, t3, "access private method"), n4);
const m$1 = [
  { name: "xs", minWidth: 0 },
  { name: "sm", minWidth: 576 },
  { name: "md", minWidth: 768 },
  { name: "lg", minWidth: 992 },
  { name: "xl", minWidth: 1200 },
  { name: "xxl", minWidth: 1400 }
], y$1 = m$1.reduce(
  (e2, t3) => (e2[t3.name] = t3.minWidth, e2),
  {}
);
function B$3(e2) {
  if (!(e2 in y$1))
    throw new Error(`Unknown breakpoint: ${e2}`);
  return y$1[e2];
}
function P$2(e2) {
  e2 === void 0 && (e2 = window.innerWidth);
  for (let t3 = m$1.length - 1; t3 >= 0; t3--)
    if (e2 >= m$1[t3].minWidth)
      return m$1[t3].name;
  return "xs";
}
function _$3(e2, t3 = {}, n4 = []) {
  Array.isArray(n4) || (n4 = [n4]);
  const i4 = document.createElement(e2);
  for (const r2 in t3)
    t3[r2] !== null && t3[r2] !== void 0 && i4.setAttribute(r2, t3[r2] !== true ? t3[r2] : "");
  for (const r2 of n4)
    i4.append(typeof r2 == "string" ? document.createTextNode(r2) : r2);
  return i4;
}
let N$1 = class N2 {
  /**
   *
   * @param delay     Debounce delay in milliseconds
   * @param max_delay Maximum delay in milliseconds, if false then no maximum delay is applied
   */
  constructor(t3, n4 = false) {
    u$2(this, "timeout", null);
    u$2(this, "startTimeWithMs", 0);
    this.delay = t3, this.max_delay = n4;
  }
  async wait() {
    return this.startTimeWithMs === 0 && (this.startTimeWithMs = Date.now()), this.timeout && (this.max_delay === false || this.startTimeWithMs + this.max_delay > Date.now()) && clearTimeout(this.timeout), new Promise((t3) => {
      this.timeout = setTimeout(() => {
        this.startTimeWithMs = 0, t3(true);
      }, this.delay);
    });
  }
  debounce(t3) {
    this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(() => {
      t3();
    }, this.delay);
  }
};
let k$2 = class k3 {
  constructor(t3, n4, i4 = "main") {
    this._debug = t3, this.myElementId = n4, this.instanceId = i4;
  }
  log(...t3) {
    this._debug && console.log(`[LOG][ID:${this.myElementId}:${this.instanceId}]`, ...t3);
  }
  warn(...t3) {
    console.warn(`[WARN][ID:${this.myElementId}:${this.instanceId}]`, ...t3);
  }
  error(...t3) {
    console.error(`[ERROR][ID:${this.myElementId}:${this.instanceId}]`, ...t3);
  }
  throwError(...t3) {
    const n4 = `[ERROR][ID:${this.myElementId}:${this.instanceId}] ${t3.join(" ")}`;
    throw this.error(...t3), new Error(n4);
  }
};
let O$3 = class O {
  constructor(t3, n4 = true) {
    u$2(this, "label");
    u$2(this, "last");
    u$2(this, "startTime");
    u$2(this, "running", false);
    u$2(this, "enabled");
    this.label = t3, this.enabled = n4, this.startTime = this.last = performance.now(), this.running = true;
  }
  lap(t3 = "") {
    if (!this.enabled) return;
    const n4 = performance.now(), i4 = (n4 - this.last) / 1e3;
    this.last = n4, console.debug(`[${this.label}] ${t3} +${i4.toFixed(3)}s`);
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
function S$4() {
  return document.readyState === "loading" ? new Promise((e2) => {
    document.addEventListener("DOMContentLoaded", () => e2());
  }) : Promise.resolve();
}
const f$2 = Symbol("listenerDefs"), p = Symbol("withEventBindings");
function z$4(e2, t3) {
  const n4 = Array.isArray(e2) ? e2 : [e2];
  return function(i4, r2) {
    if (r2.kind !== "method") throw new Error("@Listen nur für Methoden");
    return r2.addInitializer(function() {
      const o2 = this.constructor;
      (o2[f$2] || (o2[f$2] = [])).push({
        method: r2.name,
        events: n4,
        opts: t3
      });
    }), function(...o2) {
      if (!this[p])
        throw new Error("[EventBindings] @Listen - decorator requires EventBindingMixin.");
      return i4.apply(this, o2);
    };
  };
}
function A$1(e2, t3) {
  var n4;
  return !t3 || t3 === "host" ? e2 : t3 === "document" ? e2.ownerDocument ?? document : t3 === "window" ? ((n4 = e2.ownerDocument) == null ? void 0 : n4.defaultView) ?? window : typeof t3 == "function" ? t3(e2) : t3;
}
function H$2(e2) {
  var n4, i4, I3;
  class t3 extends e2 {
    constructor(...s2) {
      super(...s2);
      l(this, i4);
      l(this, n4);
      this[p] = true;
    }
    connectedCallback() {
      var s2;
      (s2 = super.connectedCallback) == null || s2.call(this), v$2(this, i4, I3).call(this);
    }
    disconnectedCallback() {
      var s2, c2;
      (s2 = a(this, n4)) == null || s2.abort(), (c2 = super.disconnectedCallback) == null || c2.call(this);
    }
  }
  return n4 = /* @__PURE__ */ new WeakMap(), i4 = /* @__PURE__ */ new WeakSet(), I3 = function() {
    var c2, b2, E2;
    (c2 = a(this, n4)) == null || c2.abort(), d$2(this, n4, new AbortController());
    const s2 = this.constructor[f$2] || [];
    for (const h4 of s2) {
      const $2 = A$1(this, (b2 = h4.opts) == null ? void 0 : b2.target), T2 = ((E2 = h4.opts) == null ? void 0 : E2.options) ?? {}, W4 = this[h4.method].bind(this);
      for (const x3 of h4.events)
        $2.addEventListener(x3, W4, { ...T2, signal: a(this, n4).signal });
    }
  }, t3;
}
let C$3 = 1;
function V$1(e2) {
  var n4, i4, r2;
  class t3 extends e2 {
    constructor() {
      super(...arguments);
      l(this, n4, null);
      l(this, i4, C$3++);
      l(this, r2, null);
    }
    /**
     * Clears the cached debug flag so the attribute will be checked again
     * on the next log/warn/error call.
     */
    invalidateDebugCache() {
      d$2(this, n4, null);
    }
    get _debug() {
      return a(this, n4) !== null ? a(this, n4) : (this instanceof HTMLElement && d$2(this, n4, this.hasAttribute("debug") && !["false", "0", "off", "no"].includes(this.getAttribute("debug") || "")), a(this, n4) === true && console.log(`[DEBUG][ID:${a(this, i4)}] LoggingMixin: Debug mode is enabled for <${this.tagName}>`, this), a(this, n4) ?? false);
    }
    getLogger(s2 = "main") {
      return a(this, r2) || d$2(this, r2, new k$2(this._debug, `${a(this, i4)}`, s2)), a(this, r2);
    }
    log(...s2) {
      this.getLogger().log(...s2);
    }
    warn(...s2) {
      this.getLogger().warn(...s2);
    }
    error(...s2) {
      this.getLogger().error(...s2);
    }
    throwError(...s2) {
      return this.getLogger().throwError(...s2);
    }
  }
  return n4 = /* @__PURE__ */ new WeakMap(), i4 = /* @__PURE__ */ new WeakMap(), r2 = /* @__PURE__ */ new WeakMap(), t3;
}
var C$2 = Object.defineProperty;
var _$2 = (n4, t3, r2) => t3 in n4 ? C$2(n4, t3, { enumerable: true, configurable: true, writable: true, value: r2 }) : n4[t3] = r2;
var h$1 = (n4, t3, r2) => _$2(n4, typeof t3 != "symbol" ? t3 + "" : t3, r2);
let S$3 = class S {
  constructor(t3, r2 = false) {
    h$1(this, "rootNode");
    h$1(this, "currentContainerNode", null);
    h$1(this, "containerPath", []);
    h$1(this, "containerIndex", [0]);
    h$1(this, "lastFixedI", 20);
    this.debug = r2, this.currentContainerNode = this.rootNode = t3, this.containerPath.push(this.rootNode);
  }
  getI(t3) {
    const r2 = t3.tagName, o2 = t3.getAttribute("layout"), e2 = { i: -99, variant: "new", tag: "hr", hi: null };
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
  getAttributeRecords(t3, r2 = false) {
    const o2 = {};
    for (const e2 of t3.attributes)
      e2.name.startsWith("section-") ? o2[e2.name] = e2.value.replace(/^section-/, "") : e2.name.startsWith("layout") ? (o2[e2.name] = e2.value, t3.removeAttribute(e2.name)) : r2 && (o2[e2.name] = e2.value);
    if (!r2)
      for (const e2 of Array.from(t3.classList))
        e2.startsWith("section-") && (o2.class = (o2.class || "") + " " + e2.replace(/^section-/, ""), t3.classList.remove(e2));
    return o2;
  }
  createNewContainerNode(t3, r2) {
    const o2 = this.getAttributeRecords(t3, t3.tagName === "HR"), e2 = _$3("section", o2);
    return e2.__IT = r2, e2;
  }
  arrangeSingleNode(t3, r2) {
    r2.i;
    let o2 = 0;
    for (o2 = 0; o2 < this.containerIndex.length && !(this.containerIndex[o2] >= r2.i); o2++)
      ;
    let e2 = null;
    r2.variant === "append" ? (console.log("Appending to container at index", o2, "with i", r2.i), e2 = this.containerPath[o2]) : e2 = this.createNewContainerNode(t3, r2);
    const s2 = this.containerPath[o2 - 1];
    this.containerPath.length = o2, this.containerIndex.length = o2, e2.appendChild(t3), s2.appendChild(e2), this.containerPath.push(e2), this.containerIndex.push(r2.i), this.currentContainerNode = e2;
  }
  appendToCurrentContainer(t3) {
    if (this.currentContainerNode === null)
      throw new Error("No current container node set");
    this.currentContainerNode.appendChild(t3);
  }
  arrange(t3) {
    for (let r2 of t3) {
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
var w$1 = Object.defineProperty, M$1 = Object.getOwnPropertyDescriptor, O$2 = (n4, t3, r2) => t3 in n4 ? w$1(n4, t3, { enumerable: true, configurable: true, writable: true, value: r2 }) : n4[t3] = r2, v$1 = (n4, t3, r2, o2) => {
  for (var e2 = o2 > 1 ? void 0 : o2 ? M$1(t3, r2) : t3, s2 = n4.length - 1, i4; s2 >= 0; s2--)
    (i4 = n4[s2]) && (e2 = (o2 ? i4(t3, r2, e2) : i4(e2)) || e2);
  return o2 && e2 && w$1(t3, r2, e2), e2;
}, R$1 = (n4, t3, r2) => O$2(n4, t3 + "", r2);
let f$1 = class f2 extends i$2 {
  constructor(t3 = "An error occurred", r2) {
    super();
    h$1(this, "originalCode");
    h$1(this, "message");
    this.message = t3, this.originalCode = r2;
  }
  static get is() {
    return "tj-error-element";
  }
  render() {
    return x$5`
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
R$1(f$1, "styles", [r$7($)]);
v$1([
  n$6({ type: String, reflect: true })
], f$1.prototype, "message", 2);
f$1 = v$1([
  t$3("tj-error-element")
], f$1);
function j$2(n4, { allowAttributes: t3 = true, ignoreGaps: r2 = true } = {}) {
  let o2 = "div", e2 = null, s2 = [], i4 = [], l2 = {};
  const d2 = /(^[a-z][\w-]*)|#[\w-]+|\.[\w:-]+|\[\s*([\w-]+)(?:\s*=\s*(['"]?)(.*?)\3)?\s*\]/gi;
  let a2 = 0;
  for (; ; ) {
    const u3 = d2.exec(n4);
    if (!u3 || u3.index !== a2) {
      if (!r2 && u3 && u3.index > a2)
        break;
      break;
    }
    const c2 = u3[0];
    if (c2[0] === "#") e2 = c2.slice(1);
    else if (c2[0] === ".") s2.push(c2.slice(1));
    else if (c2[0] === "[") {
      if (!t3) throw new Error(`Attributes not allowed: '${c2}'`);
      const p2 = u3[2], m2 = u3[4] || void 0;
      i4.push({ name: p2, value: m2 }), l2[p2] = m2;
    } else o2 = c2;
    a2 += c2.length;
  }
  return { tag: o2, id: e2, classes: s2, attrs: i4, attrsMap: l2, length: a2, rest: n4.slice(a2) };
}
function D$3(n4) {
  return typeof n4.beforeLayoutCallback == "function";
}
function F$1(n4, t3, r2) {
  var u3, c2;
  console.log("Applying layout to element:", n4, "with layout:", r2);
  const o2 = /^(\+|-|)([0-9]+\.?[0-9]*);?/, e2 = r2.replace(o2, ""), s2 = j$2(e2), i4 = { class: "" };
  s2.attrsMap.class && (i4.class = s2.attrsMap.class + " "), i4.class += s2.classes.join(" "), i4.id = s2.id, ((u3 = i4.class) == null ? void 0 : u3.trim()) === "" && delete i4.class, ((c2 = i4.id) == null ? void 0 : c2.trim()) === "" && delete i4.id;
  const l2 = s2.tag || "div";
  let d2 = false, a2 = _$3(l2, { ...i4, layoutOrig: r2 });
  if (l2.includes("-") && !customElements.get(l2))
    console.warn(`Custom element <${l2}> is not registered.`), a2 = new f$1(`Custom element <${l2}> is not registered.`, n4.outerHTML), n4.replaceWith(a2), a2.append(n4), d2 = true;
  else {
    const p2 = Array.from(n4.children);
    D$3(a2) && (d2 = a2.beforeLayoutCallback(n4, a2, p2) === false), console.log(
      "Replacement element created:",
      a2,
      "with children:",
      p2,
      "skipChildren:",
      d2
    ), a2.__ORIG_ELEMENT__ = n4, a2.append(...Array.from(n4.children)), n4.replaceWith(a2);
  }
  return {
    replacementElement: a2,
    skipChildren: d2
  };
}
function g$1(n4, t3 = {}) {
  console.log("applyLayout called with element:", n4, "and options:", t3);
  const { recursive: r2 = true } = t3;
  let o2 = [];
  if (Array.isArray(n4))
    return n4.forEach((l2) => o2.push(...g$1(l2, t3))), o2;
  if (!(n4 instanceof HTMLElement))
    return [];
  const e2 = n4.getAttribute("layout");
  let s2 = false, i4 = n4;
  if (e2 && ({ replacementElement: i4, skipChildren: s2 } = F$1(n4, t3, e2)), r2 && !s2) {
    const l2 = Array.from(i4.children);
    console.log("Applying layout to children:", l2, "of element:", i4), l2.forEach((d2) => o2.push(...g$1(d2, t3)));
  }
  return o2;
}
var z$3 = (n4, t3, r2, o2) => {
  for (var e2 = t3, s2 = n4.length - 1, i4; s2 >= 0; s2--)
    (i4 = n4[s2]) && (e2 = i4(e2) || e2);
  return e2;
};
let x$2 = class x extends V$1(y$5) {
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
    const n4 = new O$3("SectionTreeBuilder");
    await S$4(), super.connectedCallback();
    const t3 = new S$3(this), r2 = Array.from(this.children);
    t3.arrange(r2), g$1(Array.from(this.children), { recursive: true }), n4.lap("after arrange");
  }
};
x$2 = z$3([
  t$3("tj-content-pane")
], x$2);
const P$1 = /* @__PURE__ */ new WeakMap();
function G$2(e2) {
  const t3 = e2.trim();
  if (!t3) return { from: 0, till: 1 / 0 };
  if (t3.startsWith("-")) {
    const r2 = t3.slice(1).trim();
    return { from: 0, till: B$3(r2) };
  }
  if (t3.endsWith("-")) {
    const r2 = t3.slice(0, -1).trim();
    return { from: B$3(r2), till: 1 / 0 };
  }
  const s2 = t3.indexOf("-");
  if (s2 >= 0) {
    const r2 = t3.slice(0, s2).trim(), i4 = t3.slice(s2 + 1).trim(), l2 = B$3(r2), o2 = i4 ? B$3(i4) : 1 / 0;
    return { from: l2, till: o2 };
  }
  return { from: B$3(t3), till: 1 / 0 };
}
function J$1(e2) {
  const t3 = e2.split(" "), s2 = [];
  for (const r2 of t3) {
    if (!r2.includes(":"))
      continue;
    let [i4, l2] = r2.split(":");
    if (!i4 || !l2)
      continue;
    const o2 = G$2(i4), n4 = { from: o2.from, till: o2.till, className: l2 };
    s2.push(n4);
  }
  return s2;
}
function K$1(e2, t3, s2) {
  if (!e2.includes(":")) return e2;
  const r2 = B$3(t3);
  let i4 = e2.split(" ");
  const l2 = J$1(e2);
  for (const o2 of s2)
    i4 = i4.filter((n4) => n4 !== o2);
  for (const o2 of l2)
    i4 = i4.filter((n4) => n4 !== o2.className);
  for (const o2 of l2)
    r2 >= o2.from && r2 < o2.till && (i4.push(o2.className), s2.add(o2.className));
  return i4.join(" ");
}
function Q$1(e2, t3) {
  const s2 = e2.getAttribute("class") || "";
  let r2 = P$1.get(e2);
  r2 || (r2 = /* @__PURE__ */ new Set(), P$1.set(e2, r2));
  const i4 = K$1(s2, t3, r2);
  i4 !== s2 && e2.setAttribute("class", i4);
}
class w extends Error {
  constructor(t3, s2) {
    super(t3), this.context = s2, this.name = "StyleParseError";
  }
}
let W$2 = class W extends w {
  constructor(t3, s2) {
    super(t3, s2), this.name = "StyleDeclarationError";
  }
};
function D$2(e2) {
  if (e2.length === 0) return "";
  if (Array.isArray(e2[0]))
    return e2.map((t3) => D$2(t3)).filter((t3) => t3).join("; ");
  {
    const [t3, s2, r2] = e2;
    return `${t3}: ${s2}${r2 ? " !" + r2 : ""}`;
  }
}
function X(e2) {
  return e2[1] + (e2[2] ? " !" + e2[2] : "");
}
function Y$1(e2, t3) {
  const s2 = (a2, f4) => a2, r2 = [];
  let i4 = "";
  const l2 = [];
  let o2 = null, n4 = 0, c2 = 0;
  for (const a2 of e2)
    o2 ? (a2 === o2 && (o2 = null), i4 += a2) : a2 === "'" || a2 === '"' ? (o2 = a2, i4 += a2) : a2 === "(" ? (n4++, i4 += a2) : a2 === ")" ? (s2(n4 === 0, new w("Unmatched closing parenthesis )", M2(c2, e2))), n4 = Math.max(0, n4 - 1), i4 += a2) : a2 === ";" && n4 === 0 ? (l2.push(i4), i4 = "") : i4 += a2, c2++;
  s2(o2 !== null, new w("Unclosed quote", M2(c2 - 1, e2))), s2(n4 > 0, new w("Unbalanced parentheses: missing )", M2(c2 - 1, e2))), i4.trim() && l2.push(i4);
  for (const a2 of l2) {
    const f4 = a2.trim();
    if (!f4) continue;
    let p2 = -1;
    o2 = null, n4 = 0;
    for (let v2 = 0; v2 < f4.length; v2++) {
      const u3 = f4[v2];
      if (o2)
        u3 === o2 && (o2 = null);
      else if (u3 === "'" || u3 === '"') o2 = u3;
      else if (u3 === "(") n4++;
      else if (u3 === ")")
        s2(
          n4 === 0,
          new W$2("Unmatched closing parenthesis ) in declaration", { declaration: f4 })
        ), n4 = Math.max(0, n4 - 1);
      else if (u3 === ":" && n4 === 0) {
        p2 = v2;
        break;
      }
    }
    if (s2(p2 < 1, new W$2("Missing colon (:) in declaration", { declaration: f4 })) && p2 < 1 || p2 < 1) continue;
    const _3 = f4.slice(0, p2).trim();
    let m2 = f4.slice(p2 + 1).trim(), y4;
    /\s*!important\s*$/i.test(m2) && (m2 = m2.replace(/\s*!important\s*$/i, "").trim(), y4 = "important"), _3 && r2.push([_3, m2, y4]);
  }
  return r2;
}
function M2(e2, t3) {
  const s2 = Math.max(0, e2 - 15), r2 = Math.min(t3.length, e2 + 15);
  return {
    index: e2,
    input: t3,
    near: t3.slice(s2, r2)
  };
}
function Z$1(e2, t3) {
  const s2 = Array.from(e2.attributes).filter((n4) => n4.name.startsWith("style-")), r2 = {};
  let i4 = false;
  const l2 = /* @__PURE__ */ new Set();
  for (const n4 of s2) {
    const c2 = n4.name.substring(6), a2 = r2[c2] = Y$1(n4.value || "");
    i4 = true;
    for (const f4 of a2)
      l2.add(f4[0]), e2.style[f4[0]] || e2.style.setProperty(f4[0], "unset");
  }
  if (!i4) return;
  if (!r2.xs) {
    const n4 = [];
    for (const c2 of l2) {
      const a2 = e2.style.getPropertyValue(c2) || "", f4 = e2.style.getPropertyPriority(c2) === "important" ? "important" : void 0;
      n4.push([c2, a2, f4]);
    }
    r2.xs = n4, e2.setAttribute("style-xs", D$2(n4));
  }
  const o2 = /* @__PURE__ */ new Map();
  for (const n4 of m$1)
    if (t3 >= n4.minWidth && r2[n4.name]) {
      const c2 = r2[n4.name];
      for (const a2 of c2)
        o2.set(a2[0], X(a2));
    }
  for (const [n4, c2] of o2)
    e2.style.setProperty(n4, c2);
}
class tt {
  constructor(t3) {
    this.logger = t3, this.observer = null, this.changedElements = /* @__PURE__ */ new Set(), this.debouncer = new N$1(10, 100), this.breakpoint = P$2();
  }
  async processChanges() {
    for (const t3 of this.changedElements)
      this.logger.log("Processing element", t3), Q$1(t3, this.breakpoint), Z$1(t3, y$1[this.breakpoint] || 0), this.changedElements.delete(t3);
  }
  async spoolElement(t3) {
    this.changedElements.has(t3) || (this.changedElements.add(t3), await this.debouncer.wait(), this.processChanges());
  }
  onChange(t3) {
    var s2;
    for (const r2 of t3)
      if (r2.type === "childList") {
        if (!(r2.target instanceof HTMLElement))
          continue;
        this.spoolElement(r2.target);
      } else if (r2.type === "attributes") {
        if (!(r2.target instanceof HTMLElement) || !(r2.attributeName === "class" || (s2 = r2.attributeName) != null && s2.startsWith("style")))
          continue;
        this.spoolElement(r2.target);
      }
  }
  /**
   * Queue all all elements (or those under root) that have class or style-* attributes
   *
   * @param root
   */
  queueAll(t3 = null) {
    t3 === null && (t3 = document.body), t3.querySelectorAll("[class]").forEach((s2) => this.spoolElement(s2)), Array.from(t3.getElementsByTagName("*")).filter((s2) => [...s2.getAttributeNames()].some((r2) => r2.startsWith("style-"))).forEach((s2) => this.spoolElement(s2));
  }
  startObserving(t3) {
    this.observer = new MutationObserver(this.onChange.bind(this)), this.observer.observe(t3, { attributes: true, childList: true, subtree: true });
  }
  stopObserving() {
    var t3;
    (t3 = this.observer) == null || t3.disconnect();
  }
}
var et = Object.create, I2 = Object.defineProperty, st$1 = Object.getOwnPropertyDescriptor, R3 = (e2, t3) => (t3 = Symbol[e2]) ? t3 : Symbol.for("Symbol." + e2), k$1 = (e2) => {
  throw TypeError(e2);
}, rt = (e2, t3, s2) => t3 in e2 ? I2(e2, t3, { enumerable: true, configurable: true, writable: true, value: s2 }) : e2[t3] = s2, it = (e2) => [, , , et((e2 == null ? void 0 : e2[R3("metadata")]) ?? null)], B$2 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], L$2 = (e2) => e2 !== void 0 && typeof e2 != "function" ? k$1("Function expected") : e2, nt = (e2, t3, s2, r2, i4) => ({ kind: B$2[e2], name: t3, metadata: r2, addInitializer: (l2) => s2._ ? k$1("Already initialized") : i4.push(L$2(l2 || null)) }), ot = (e2, t3) => rt(t3, R3("metadata"), e2[3]), at = (e2, t3, s2, r2) => {
  for (var i4 = 0, l2 = e2[t3 >> 1], o2 = l2 && l2.length; i4 < o2; i4++) l2[i4].call(s2);
  return r2;
}, lt = (e2, t3, s2, r2, i4, l2) => {
  for (var o2, n4, c2, a2, f4 = t3 & 7, p2 = false, _3 = false, m2 = 2, y4 = B$2[f4 + 5], v2 = e2[m2] || (e2[m2] = []), u3 = (i4 = i4.prototype, st$1(i4, s2)), C4 = r2.length - 1; C4 >= 0; C4--)
    c2 = nt(f4, s2, n4 = {}, e2[3], v2), c2.static = p2, c2.private = _3, a2 = c2.access = { has: (A2) => s2 in A2 }, a2.get = (A2) => A2[s2], o2 = (0, r2[C4])(u3[y4], c2), n4._ = 1, L$2(o2) && (u3[y4] = o2);
  return u3 && I2(i4, s2, u3), i4;
}, q$1 = (e2, t3, s2) => t3.has(e2) || k$1("Cannot " + s2), h3 = (e2, t3, s2) => (q$1(e2, t3, "read from private field"), t3.get(e2)), z$2 = (e2, t3, s2) => t3.has(e2) ? k$1("Cannot add the same private member more than once") : t3 instanceof WeakSet ? t3.add(e2) : t3.set(e2, s2), N3 = (e2, t3, s2, r2) => (q$1(e2, t3, "write to private field"), t3.set(e2, s2), s2), T$2, x$1, d$1, g, S$2;
let O$1 = class O2 extends (x$1 = H$2(V$1(HTMLElement)), T$2 = [z$4("resize", { target: "window" })], x$1) {
  constructor() {
    super(), at(S$2, 5, this), this.resizeDebouncer = new N$1(50, 500), z$2(this, d$1, P$2()), z$2(this, g, new tt(this.getLogger("observer")));
  }
  static get observedAttributes() {
    return ["width", "height", "orientation"];
  }
  async onResize(t3) {
    await this.resizeDebouncer.wait();
    const s2 = P$2();
    s2 !== h3(this, d$1) && (N3(this, d$1, s2), this.log(`Breakpoint changed to ${h3(this, d$1)}, adjusting layout.`), h3(this, g).breakpoint = h3(this, d$1), h3(this, g).queueAll());
  }
  attributeChangedCallback(t3, s2, r2) {
  }
  connectedCallback() {
    super.connectedCallback(), this.log("TjResponsiveElement connected to the DOM."), N3(this, d$1, P$2()), h3(this, g).breakpoint = h3(this, d$1), h3(this, g).queueAll(), h3(this, g).startObserving(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.log("TjResponsiveElement disconnected from the DOM."), h3(this, g).stopObserving();
  }
};
S$2 = it(x$1);
d$1 = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
lt(S$2, 1, "onResize", T$2, O$1);
ot(S$2, O$1);
customElements.get("tj-responsive") || customElements.define("tj-responsive", O$1);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u$1 = (e2, s2, t3) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t3; l2++) r2.set(e2[l2], l2);
  return r2;
}, c$1 = e$2(class extends i$1 {
  constructor(e2) {
    if (super(e2), e2.type !== t$2.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t3) {
    let r2;
    void 0 === t3 ? t3 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o2 = [];
    let i4 = 0;
    for (const s3 of e2) l2[i4] = r2 ? r2(s3, i4) : i4, o2[i4] = t3(s3, i4), i4++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t3) {
    return this.dt(e2, s2, t3).values;
  }
  update(s2, [t3, r2, c2]) {
    const d2 = p$1(s2), { values: p2, keys: a2 } = this.dt(t3, r2, c2);
    if (!Array.isArray(d2)) return this.ut = a2, p2;
    const h4 = this.ut ?? (this.ut = []), v2 = [];
    let m2, y4, x3 = 0, j3 = d2.length - 1, k5 = 0, w2 = p2.length - 1;
    for (; x3 <= j3 && k5 <= w2; ) if (null === d2[x3]) x3++;
    else if (null === d2[j3]) j3--;
    else if (h4[x3] === a2[k5]) v2[k5] = v$3(d2[x3], p2[k5]), x3++, k5++;
    else if (h4[j3] === a2[w2]) v2[w2] = v$3(d2[j3], p2[w2]), j3--, w2--;
    else if (h4[x3] === a2[w2]) v2[w2] = v$3(d2[x3], p2[w2]), s$1(s2, v2[w2 + 1], d2[x3]), x3++, w2--;
    else if (h4[j3] === a2[k5]) v2[k5] = v$3(d2[j3], p2[k5]), s$1(s2, d2[x3], d2[j3]), j3--, k5++;
    else if (void 0 === m2 && (m2 = u$1(a2, k5, w2), y4 = u$1(h4, x3, j3)), m2.has(h4[x3])) if (m2.has(h4[j3])) {
      const e2 = y4.get(a2[k5]), t4 = void 0 !== e2 ? d2[e2] : null;
      if (null === t4) {
        const e3 = s$1(s2, d2[x3]);
        v$3(e3, p2[k5]), v2[k5] = e3;
      } else v2[k5] = v$3(t4, p2[k5]), s$1(s2, d2[x3], t4), d2[e2] = null;
      k5++;
    } else M$3(d2[j3]), j3--;
    else M$3(d2[x3]), x3++;
    for (; k5 <= w2; ) {
      const e2 = s$1(s2, v2[w2 + 1]);
      v$3(e2, p2[k5]), v2[k5++] = e2;
    }
    for (; x3 <= j3; ) {
      const e2 = d2[x3++];
      null !== e2 && M$3(e2);
    }
    return this.ut = a2, m$2(s2, v2), T$4;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = "important", i3 = " !" + n$1, o = e$2(class extends i$1 {
  constructor(t3) {
    var _a2;
    if (super(t3), t3.type !== t$2.ATTRIBUTE || "style" !== t3.name || ((_a2 = t3.strings) == null ? void 0 : _a2.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t3) {
    return Object.keys(t3).reduce(((e2, r2) => {
      const s2 = t3[r2];
      return null == s2 ? e2 : e2 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }), "");
  }
  update(e2, [r2]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r2)), this.render(r2);
    for (const t3 of this.ft) null == r2[t3] && (this.ft.delete(t3), t3.includes("-") ? s2.removeProperty(t3) : s2[t3] = null);
    for (const t3 in r2) {
      const e3 = r2[t3];
      if (null != e3) {
        this.ft.add(t3);
        const r3 = "string" == typeof e3 && e3.endsWith(i3);
        t3.includes("-") || r3 ? s2.setProperty(t3, r3 ? e3.slice(0, -11) : e3, r3 ? n$1 : "") : s2[t3] = e3;
      }
    }
    return T$4;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n3(n4, r2, t3) {
  return n4 ? r2(n4) : t3 == null ? void 0 : t3(n4);
}
var x2 = (r2) => {
  throw TypeError(r2);
};
var S$1 = (r2, t3, e2) => t3.has(r2) || x2("Cannot " + e2);
var k4 = (r2, t3, e2) => (S$1(r2, t3, "read from private field"), e2 ? e2.call(r2) : t3.get(r2)), b$1 = (r2, t3, e2) => t3.has(r2) ? x2("Cannot add the same private member more than once") : t3 instanceof WeakSet ? t3.add(r2) : t3.set(r2, e2), v = (r2, t3, e2, s2) => (S$1(r2, t3, "write to private field"), t3.set(r2, e2), e2);
function L$1(r2) {
  var e2;
  const t3 = (e2 = r2.split(`
`)[0]) == null ? void 0 : e2.match(/:(\d+):(\d+)$/);
  return { line: t3 ? +t3[1] : -1, column: t3 ? +t3[2] : -1 };
}
const V = (r2, t3, e2 = false, s2 = "<undefined>") => {
  try {
    return t3();
  } catch (n4) {
    let { line: i4, column: o2 } = L$1((n4 == null ? void 0 : n4.stack) ?? ""), a2 = String((r2 == null ? void 0 : r2.originalCode) ?? ""), h4 = false;
    r2 != null && r2.originalTemplateString && (i4 -= 2, a2 = r2.originalTemplateString, h4 = true);
    const l2 = a2.split(`
`), g2 = Math.min(Math.max(i4 - 1, 0), l2.length - 1), p2 = l2[g2] ?? "", E2 = Math.min(Math.max((o2 || 1) - 1, 0), p2.length);
    let f4 = " ".repeat(E2 + String(i4).length) + "^^^^";
    h4 && (f4 = "^".repeat(String(p2).length));
    const N4 = l2.map((w2, $2) => $2 === g2 ? `${$2 + 1}: ${w2}
 ${f4}` : `${$2 + 1}: ${w2}`).join(`
`), m2 = `Error while rendering \`${s2}\`: ${n4}
Line ${i4}, Column ${E2 + 1}:

${i4}:${p2}
${f4}

Compiled Template:
${N4}
`;
    if (!e2)
      console.warn("Caught error via *catch: " + m2);
    else
      throw console.error("Caught error via *catch: " + m2), new Error(m2);
    return String(n4);
  }
};
function D$1(r2, t3) {
  return {
    html: x$5,
    repeat: c$1,
    when: n3,
    styleMap: o,
    classMap: e$1,
    catchError: V,
    originalCode: r2.toString(),
    originalTemplateString: t3
  };
}
var c;
let C$1 = class C2 extends Error {
  constructor(e2, s2) {
    super(e2);
    b$1(this, c);
    this.name = "SyntaxTesterError", v(this, c, s2);
  }
  get code() {
    return k4(this, c);
  }
};
c = /* @__PURE__ */ new WeakMap();
function F(r2) {
  try {
    new Function(r2);
  } catch (t3) {
    throw t3 instanceof SyntaxError ? new C$1(`Syntax error: ${t3.message}`, r2) : new C$1(String(t3), r2);
  }
}
let W$1 = class W2 extends Error {
  constructor(t3, e2, s2, n4) {
    super(`Syntax Error: ${t3} at line ${s2}, column ${n4}
Code: ${e2}`), this.name = "SyntaxError";
  }
};
class q {
  htmlEntityDecoer(t3) {
    return t3 ? new DOMParser().parseFromString(t3, "text/html").body.textContent ?? "" : "null";
  }
  wrapStrucutre(t3, e2) {
    const s2 = [];
    for (const i4 of t3.attributes || [])
      if (i4.name.startsWith("*")) {
        if (i4.name === "*for") {
          const o2 = /^(.*?)\s+(in|of)\s+(.*?)(;(.*?))?$/.exec(i4.value || "");
          if (!o2)
            throw new Error(`Invalid *for attribute value: ${i4.value}`);
          let a2 = "null";
          o2[5] && (a2 = o2[1] + " => " + o2[5].trim()), this.testSyntax(t3, i4.name, o2[1]), this.testSyntax(t3, i4.name, o2[3]), this.testSyntax(t3, i4.name, a2), o2[2] === "of" ? s2.push({ start: `$$__litEnv.repeat(${o2[3]}, ${a2}, (${o2[1]}, $index) => `, end: ")" }) : o2[2] === "in" && s2.push({
            start: `$$__litEnv.repeat(Object.keys(${o2[3]}), ${a2}, (${o2[1]}, $index) => `,
            end: ")"
          });
          continue;
        }
        if (this.testSyntax(t3, i4.name, i4.value || ""), i4.name === "*if") {
          this.testSyntax(t3, i4.name, i4.value || ""), s2.push({
            start: `$$__litEnv.when(${this.getCatchErrorValue(t3, "*if", i4.value)}, ()=>{lastIf=true; return   `,
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
        throw new Error(`Unknown attribute ${i4.name} in element ${t3.tagName}`);
      }
    if (s2.length === 0)
      return e2;
    let n4 = "$$__litEnv.html`" + e2 + "`";
    for (let i4 = s2.length - 1; i4 >= 0; i4--)
      n4 = s2[i4].start + n4 + s2[i4].end;
    return "${" + n4 + "}";
  }
  escapeStmt(t3) {
    return t3.replace(/'/g, "\\'");
  }
  getCatchErrorValue(t3, e2, s2) {
    return `$$__litEnv.catchError($$__litEnv, ()=>(${s2}), true, '${this.escapeStmt(e2 + '="' + s2 + '"')}')`;
  }
  parseString(t3) {
    return t3.replace(/{{\s*([^}]+?)\s*}}/g, (e2, s2) => `\${$$__litEnv.catchError($$__litEnv, ()=>${s2}, true, '${this.escapeStmt(e2)}')}`);
  }
  testSyntax(t3, e2, s2) {
    try {
      F(s2);
    } catch (n4) {
      throw new W$1(
        // @ts-ignore
        `${n4.message} in attribute ${e2}="${s2}" of element ${t3.tagName}`,
        s2,
        0,
        0
      );
    }
  }
  parseElement(t3) {
    let e2 = "";
    if (t3.type === "element") {
      if (e2 += `<${t3.tagName}`, t3.attributes)
        for (const s2 of t3.attributes) {
          s2.value = this.htmlEntityDecoer(s2.value || null), [".", ":", "~", "@"].includes(s2.name[0]) && this.testSyntax(t3, s2.name, s2.value || "");
          const n4 = this.getCatchErrorValue(t3, s2.name, s2.value || "");
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
                  throw new Error(`Unknown directive ${s2.name} in element ${t3.tagName}`);
              }
              e2 += ` ${s2.name.slice(1)}=\${$$__litEnv.${i4}(${n4})}`;
              continue;
            }
            if (s2.name.startsWith("?")) {
              e2 += ` ${s2.name}=\${${n4}}`;
              continue;
            }
            if (s2.name === "$ref") {
              e2 += ` \${$$__litEnv.ref($el => { ${n4} })}`;
              continue;
            }
            if (s2.name.startsWith(".")) {
              e2 += ` ${s2.name}=\${${n4}}`;
              continue;
            }
            e2 += ` ${s2.name}`, s2.value !== void 0 && (e2 += `="${this.parseString(s2.value)}"`);
          }
        }
      if (e2 += ">", t3.children)
        for (const s2 of t3.children)
          e2 += this.parseElement(s2);
      t3.isVoid || (e2 += `</${t3.tagName}>`);
    } else t3.type === "text" && (e2 += this.parseString(t3.textContent || ""));
    return this.wrapStrucutre(t3, e2);
  }
  buildFunctionBody(t3) {
    let e2 = "";
    for (const n4 of t3)
      e2 += this.parseElement(n4);
    return `with($scope){return $$__litEnv.html\`${e2}\`};`;
  }
  buildFunction(t3) {
    const e2 = this.buildFunctionBody(t3);
    try {
      return new Function("$scope", "$$__litEnv", e2);
    } catch (s2) {
      throw console.log("Error building function:", s2), new W$1(String(s2), e2, 0, 0);
    }
  }
}
let _$1 = class _ {
  parse(t3) {
    const e2 = new z$1(t3);
    return new j$1(e2).parseDocument();
  }
};
const O3 = /* @__PURE__ */ new Set([
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
let j$1 = class j {
  constructor(t3) {
    this.s = t3;
  }
  parseDocument() {
    return this.parseNodes();
  }
  parseNodes(t3) {
    const e2 = [];
    for (; !this.s.eof(); ) {
      if (this.s.startsWith("</")) {
        const { line: s2, col: n4 } = this.s.position(), i4 = this.parseClosingTag();
        return t3 || this.s.throwError(`Unexpected closing tag </${i4}>`, s2, n4), i4.toLowerCase() !== t3.tag.toLowerCase() && this.s.throwError(
          `Mismatched closing tag: expected </${t3.tag}>, found </${i4}> (opened at line ${t3.line}, col ${t3.col})`,
          s2,
          n4
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
    return t3 && this.s.throwError(
      `Unclosed tag <${t3.tag}> (opened at line ${t3.line}, col ${t3.col}) before end of input`,
      this.s.line,
      this.s.col
    ), e2;
  }
  isTagStart() {
    const t3 = this.s.peek(0), e2 = this.s.peek(1);
    return t3 !== "<" || !e2 ? false : e2 === "/" || e2 === "!" || e2 === "?" ? true : d(e2);
  }
  parseText() {
    let t3 = "";
    for (this.s.position(); !this.s.eof(); ) {
      if (this.s.peek() === "<") {
        if (this.s.startsWith("<!--") || this.s.startsWith("</") || this.s.startsWith("<!") || this.s.startsWith("<?"))
          break;
        const s2 = this.s.peek(1);
        if (s2 && d(s2))
          break;
        t3 += this.s.next();
        continue;
      }
      t3 += this.s.next();
    }
    return {
      type: "text",
      textContent: t3
    };
  }
  parseComment() {
    const t3 = this.s.position();
    this.s.consumeExpected("<!--");
    const e2 = this.s.readUntilSequence(
      "-->",
      () => this.s.throwError("Unterminated comment. Expected -->", t3.line, t3.col)
    );
    return this.s.consumeExpected("-->"), {
      type: "other",
      textContent: e2
    };
  }
  parseDeclaration() {
    const t3 = this.s.position();
    this.s.consumeExpected("<!");
    const e2 = this.s.readUntilChar(
      ">",
      () => this.s.throwError("Unterminated declaration. Expected >", t3.line, t3.col)
    );
    return this.s.consumeExpected(">"), {
      type: "other",
      textContent: `!${e2}`
    };
  }
  parseProcessingInstruction() {
    const t3 = this.s.position();
    this.s.consumeExpected("<?");
    const e2 = this.s.readUntilSequence(
      "?>",
      () => this.s.throwError("Unterminated processing instruction. Expected ?>", t3.line, t3.col)
    );
    return this.s.consumeExpected("?>"), {
      type: "other",
      textContent: `?${e2}`
    };
  }
  parseClosingTag() {
    const t3 = this.s.position();
    this.s.consumeExpected("</"), this.s.skipWhitespace();
    const e2 = this.readTagName();
    if (e2 || this.s.throwError("Invalid closing tag name", t3.line, t3.col), this.s.skipWhitespace(), this.s.peek() !== ">") {
      const s2 = this.s.position();
      this.s.throwError(`Expected '>' after closing tag </${e2}>`, s2.line, s2.col);
    }
    return this.s.next(), e2;
  }
  parseElement() {
    const t3 = this.s.position();
    this.s.consumeExpected("<");
    const e2 = this.readTagName();
    e2 || this.s.throwError('Invalid tag name after "<"', t3.line, t3.col);
    const s2 = [];
    let n4 = false;
    for (; !this.s.eof(); ) {
      if (this.s.skipWhitespace(), this.s.startsWith("/>")) {
        n4 = true, this.s.consumeExpected("/>");
        break;
      }
      const h4 = this.s.peek();
      if (h4 === ">") {
        this.s.next();
        break;
      }
      h4 === null && this.s.throwError("Unexpected end of input inside start tag", t3.line, t3.col);
      const l2 = this.parseAttribute();
      s2.push(l2);
    }
    const i4 = e2.toLowerCase();
    if (n4 || O3.has(i4))
      return {
        type: "element",
        tagName: e2,
        attributes: s2,
        children: [],
        isVoid: true
      };
    const a2 = this.parseNodes({ tag: e2, line: t3.line, col: t3.col });
    return {
      type: "element",
      tagName: e2,
      attributes: s2,
      children: a2,
      isVoid: false
    };
  }
  parseAttribute() {
    const t3 = this.s.position(), e2 = this.readAttributeName();
    e2 || this.s.throwError("Invalid attribute name", t3.line, t3.col), this.s.skipWhitespace();
    let s2;
    if (this.s.peek() === "=") {
      this.s.next(), this.s.skipWhitespace();
      const n4 = this.s.peek();
      if (n4 === '"' || n4 === "'") {
        this.s.next();
        const i4 = n4, o2 = this.s.readUntilChar(
          i4,
          () => this.s.throwError(`Unterminated quoted attribute value for "${e2}"`, t3.line, t3.col)
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
    let t3 = "";
    const e2 = this.s.peek();
    if (!e2 || !d(e2)) return null;
    for (t3 += this.s.next(); !this.s.eof(); ) {
      const s2 = this.s.peek();
      if (!s2 || !H$1(s2)) break;
      t3 += this.s.next();
    }
    return t3;
  }
  readAttributeName() {
    let t3 = "";
    const e2 = this.s.peek();
    if (!e2 || !Z(e2)) return null;
    for (t3 += this.s.next(); !this.s.eof(); ) {
      const s2 = this.s.peek();
      if (!s2 || !B$1(s2)) break;
      t3 += this.s.next();
    }
    return t3;
  }
};
let z$1 = class z2 {
  constructor(t3) {
    this.input = t3, this.pos = 0, this.line = 1, this.col = 1;
  }
  eof() {
    return this.pos >= this.input.length;
  }
  peek(t3 = 0) {
    const e2 = this.pos + t3;
    return e2 < 0 || e2 >= this.input.length ? null : this.input[e2];
  }
  next() {
    if (this.eof()) return null;
    const t3 = this.input[this.pos++];
    return t3 === `
` ? (this.line += 1, this.col = 1) : t3 === "\r" ? this.peek() === `
` || (this.line += 1, this.col = 1) : this.col += 1, t3;
  }
  startsWith(t3) {
    return this.input.startsWith(t3, this.pos);
  }
  consumeExpected(t3) {
    if (!this.startsWith(t3)) {
      const { line: e2, col: s2 } = this.position();
      this.throwError(`Expected "${t3}"`, e2, s2);
    }
    for (let e2 = 0; e2 < t3.length; e2++) this.next();
  }
  readUntilSequence(t3, e2) {
    let s2 = "";
    for (; !this.eof() && !this.startsWith(t3); ) {
      const n4 = this.next();
      if (n4 === null) break;
      s2 += n4;
    }
    return this.eof() && !this.startsWith(t3) && e2 && e2(), s2;
  }
  readUntilChar(t3, e2) {
    let s2 = "";
    for (; !this.eof() && this.peek() !== t3; ) {
      const i4 = this.next();
      if (i4 === null) break;
      s2 += i4;
    }
    return this.eof() && e2 && e2(), s2;
  }
  skipWhitespace() {
    for (; !this.eof(); ) {
      const t3 = this.peek();
      if (!t3 || !T$1(t3)) break;
      this.next();
    }
  }
  position() {
    return { index: this.pos, line: this.line, col: this.col };
  }
  throwError(t3, e2 = this.line, s2 = this.col) {
    const n4 = this.input.split(`
`)[e2 - 1] || "";
    throw new Error(`[Html2AstParser] ${t3} at line ${e2}, column ${s2}: 
'${n4}'`);
  }
};
function d(r2) {
  return /[A-Za-z]/.test(r2);
}
function H$1(r2) {
  return /[A-Za-z0-9\-\_\:\.]/.test(r2);
}
function Z(r2) {
  return /[A-Za-z_:*@?.~]/.test(r2);
}
function B$1(r2) {
  return /[A-Za-z0-9_:\-.~]/.test(r2);
}
function T$1(r2) {
  return r2 === " " || r2 === "	" || r2 === `
` || r2 === "\r" || r2 === "\f";
}
class u2 {
  constructor(t3, e2) {
    this.fn = null, this.scope = null, this.templateString = t3, e2 && (e2.$tpl = this, this.scope = e2);
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
    const t3 = this.getCompiledTemplate();
    return t3(this.scope, D$1(t3, this.templateString));
  }
  /**
   * Render this template into a non shadow DOM element.
   *
   * @param element
   */
  renderIntoElement(t3) {
    if (!t3)
      throw new Error("Element is not defined. Please provide a valid HTMLElement to render into.");
    B$4(this.render(), t3);
  }
  /**
   * Render the template to a non shadow DOM element.
   *
   * @param element
   */
  renderInElement(t3) {
    B$4(this.render(), t3);
  }
}
function G$1(r2) {
  const t3 = new _$1().parse(r2);
  return new q().buildFunction(t3);
}
function st(r2) {
  if (r2.$update = () => {
    r2.$this && typeof r2.$this.requestUpdate == "function" && r2.$this.requestUpdate();
  }, r2.$tpl !== void 0)
    if (typeof r2.$tpl == "string")
      r2.$tpl = new u2(r2.$tpl);
    else if (r2.$tpl instanceof u2)
      r2.$tpl.scope = r2;
    else
      throw new Error("Invalid value for $tpl: Expected string or ProLitTemplate, found" + typeof r2.$tpl);
  return new Proxy(r2, {
    get(t3, e2) {
      if (e2 === "$tpl") {
        if (!t3.$tpl)
          throw new Error("Template is not defined. Please define a template using the $tpl property.");
        return t3.$tpl;
      }
      return e2 === "$raw" ? t3 : e2 === "$rawPure" ? Object.fromEntries(Object.entries(t3).filter(([s2]) => !s2.startsWith("$"))) : t3[e2];
    },
    set(t3, e2, s2) {
      if (t3[e2] = s2, !e2.startsWith("$") && r2.$this && r2.$this.requestUpdate(), e2 === "$tpl") {
        if (!(s2 instanceof u2))
          throw new Error("$tpl must be an instance of Template.");
        s2.scope = r2;
      }
      return true;
    }
  });
}
function b(e2, t3) {
  for (const s2 in t3)
    t3[s2] && typeof t3[s2] == "object" && !Array.isArray(t3[s2]) ? (e2[s2] || (e2[s2] = {}), b(e2[s2], t3[s2])) : e2[s2] = t3[s2];
  return e2;
}
async function H2(e2, t3) {
  for (const s2 of Array.from(e2.content.querySelectorAll("[import-src]"))) {
    t3.log("Processing [import-src] element", s2);
    const r2 = s2.getAttribute("import-src");
    r2 || t3.throwError("import element is missing the src attribute", s2);
    const n4 = await fetch(r2);
    n4.ok || t3.throwError(`Failed to load content from ${r2}: ${n4.status} ${n4.statusText}`, s2), s2.innerHTML = await n4.text();
  }
  return e2;
}
async function W3(e2, t3) {
  const s2 = await fetch(e2);
  s2.ok || t3.throwError(`Failed to load content from ${e2}: ${s2.status} ${s2.statusText}`);
  const r2 = await s2.text(), n4 = _$3("template");
  n4.innerHTML = r2;
  const i4 = n4.content.querySelector("script[scope]");
  return {
    template: r2,
    scope: JSON.parse((i4 == null ? void 0 : i4.textContent) || "null") || null
  };
}
function z3(e2, t3) {
  let s2 = e2.querySelector("template");
  s2 || (t3.log("No <template> element found inside the provided root element. Wrapping content into template"), s2 = document.createElement("template"), s2.innerHTML = e2.innerHTML, e2.innerHTML = "", e2.appendChild(s2));
  const r2 = s2.content.querySelector("script[scope]");
  t3.log("Found scope script:", r2);
  const n4 = r2 != null && r2.textContent ? JSON.parse(r2.textContent) : null;
  return r2 && s2.content.removeChild(r2), {
    template: s2.innerHTML,
    scope: n4
  };
}
async function B(e2, t3, s2) {
  const r2 = J(t3), n4 = Object.getPrototypeOf(async function() {
  }).constructor;
  try {
    const i4 = await new n4("host", "scope", "console", "fetch", '"use strict"; return (' + r2 + ");")(e2, s2, console, A());
    return S2(i4), i4;
  } catch {
    try {
      const o2 = await new n4("host", "scope", "console", "fetch", '"use strict"; ' + r2)(e2, s2, console, A());
      return S2(o2), o2;
    } catch (i4) {
      const o2 = i4 instanceof Error ? i4 : new Error(typeof i4 == "string" ? i4 : "Unknown evaluation error");
      throw new Error(`scope-init evaluation failed: ${o2.message}`);
    }
  }
}
function J(e2) {
  let t3 = (e2 ?? "").trim();
  return t3.toLowerCase().startsWith("javascript:") && (t3 = t3.slice(11).trim()), t3;
}
function S2(e2) {
  if (e2 === null || typeof e2 != "object" || Array.isArray(e2))
    throw new Error('scope-init must evaluate to an object (e.g. { foo: "bar" })');
}
function A() {
  if (typeof fetch == "function") return fetch;
  throw new Error("fetch is not available in this environment");
}
var U = Object.defineProperty, Y2 = Object.getOwnPropertyDescriptor, P = (e2) => {
  throw TypeError(e2);
}, _2 = (e2, t3, s2, r2) => {
  for (var n4 = r2 > 1 ? void 0 : r2 ? Y2(t3, s2) : t3, c2 = e2.length - 1, i4; c2 >= 0; c2--)
    (i4 = e2[c2]) && (n4 = (r2 ? i4(t3, s2, n4) : i4(n4)) || n4);
  return r2 && n4 && U(t3, s2, n4), n4;
}, D = (e2, t3, s2) => t3.has(e2) || P("Cannot " + s2), L3 = (e2, t3, s2) => (D(e2, t3, "read from private field"), t3.get(e2)), T = (e2, t3, s2) => t3.has(e2) ? P("Cannot add the same private member more than once") : t3 instanceof WeakSet ? t3.add(e2) : t3.set(e2, s2), C3 = (e2, t3, s2, r2) => (D(e2, t3, "write to private field"), t3.set(e2, s2), s2), m, y3;
let f3 = class extends V$1(y$5) {
  constructor() {
    super(), this.updateOn = "change keyup click", this.src = "", this.srcData = null, this.myProLitTemplate = null, T(this, m), T(this, y3, true), this.$scope = st({}), this.renderInElement = _$3("div", { style: "display: contents" }), C3(this, m, new N$1(50, 200));
  }
  createRenderRoot() {
    return this;
  }
  async _renderTemplates(e2 = false) {
    if (!this.myProLitTemplate || e2) {
      let t3;
      if (this.srcData)
        t3 = this.srcData.template;
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
        r2 = await H2(r2, this.getLogger("evalImportSrc")), t3 = r2.innerHTML;
      }
      this.myProLitTemplate = new u2(t3, this.$scope);
    }
    this.myProLitTemplate.renderInElement(this.renderInElement), L3(this, y3) && (this._updateScope(), C3(this, y3, false));
  }
  _updateScope() {
    for (const e2 of Array.from(this.querySelectorAll("[name]"))) {
      const t3 = e2.getAttribute("name");
      t3 && e2.value !== void 0 && (this.$scope[t3] = e2.value);
    }
    this.log("Scope updated", this.$scope.$rawPure);
  }
  async _initializeScopeFromInit() {
    await L3(this, m).wait();
    const e2 = {};
    if (this.src && this.src.trim() !== "" ? (this.log("Loading external src", this.src), this.srcData = await W3(this.src, this.getLogger("loadExternalSrc")), this.log("External src loaded", this.srcData)) : (this.srcData = z3(this, this.getLogger("loadInlineTemplate")), this.log("Inline template loaded", this.srcData)), b(e2, this.srcData.scope), this.scopeInit && this.scopeInit.trim() !== "")
      try {
        this.log("Evaluating scope-init expression", this.scopeInit);
        const t3 = await B(this, this.scopeInit, this.$scope);
        this.log("Scope-init evaluation result", t3), b(e2, t3);
      } catch (t3) {
        this.error("scope-init evaluation failed", t3);
      }
    this.appendChild(this.renderInElement), Object.assign(this.$scope, e2), this.dispatchEvent(new CustomEvent("scope-update"));
  }
  updated(e2) {
    var s2;
    this.log("update(): Property change", e2);
    const t3 = () => {
      this._updateScope(), this._renderTemplates();
    };
    for (const r2 of this.updateOn.replace(",", " ").split(" "))
      r2.trim() !== "" && (this.removeEventListener(r2, t3), this.addEventListener(r2, t3));
    (s2 = e2 == null ? void 0 : e2.has) != null && s2.call(e2, "scopeInit") && this._initializeScopeFromInit().then(() => t3());
  }
  async connectedCallback() {
    await S$4(), super.connectedCallback(), this.log("Connected", this.$scope), this._initializeScopeFromInit().catch(() => {
    }).finally(() => {
      this._updateScope(), this._renderTemplates();
    });
  }
};
m = /* @__PURE__ */ new WeakMap();
y3 = /* @__PURE__ */ new WeakMap();
_2([
  n$6({ type: String, reflect: true, attribute: "update-on" })
], f3.prototype, "updateOn", 2);
_2([
  n$6({ type: String, reflect: true, attribute: "init" })
], f3.prototype, "scopeInit", 2);
_2([
  n$6({ type: String, reflect: false, attribute: "src" })
], f3.prototype, "src", 2);
f3 = _2([
  t$3("prolit-scope")
], f3);
class G extends HTMLElement {
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
    this._snapshot(), this._mo = new MutationObserver((t3) => this._onMutations(t3)), this._mo.observe(this, { childList: true, subtree: !!this.selectors.trim() });
  }
  disconnectedCallback() {
    var t3;
    (t3 = this._mo) == null || t3.disconnect();
  }
  attributeChangedCallback(t3, s2, r2) {
    var n4;
    t3 === "selectors" && ((n4 = this._mo) == null || n4.disconnect(), this._snapshot(), this._mo = new MutationObserver((c2) => this._onMutations(c2)), this._mo.observe(this, { childList: true, subtree: !!this.selectors.trim() }));
  }
  /** Alle zu beobachtenden Elemente:
   *  - Standard: direkte Kindelemente
   *  - Mit selectors: alle passenden tiefen Elemente in DOM-Reihenfolge
   */
  _elements() {
    const t3 = this.selectors.trim();
    if (!t3)
      return Array.from(this.children);
    try {
      return Array.from(this.querySelectorAll(t3));
    } catch {
      return console.warn(`Invalid selector "${t3}" in <auto-animate-container>. Falling back to direct children.`), Array.from(this.children);
    }
  }
  /** Letzte Positionen der Kinder speichern */
  _snapshot() {
    for (const t3 of this._elements())
      this._rects.set(t3, t3.getBoundingClientRect());
  }
  _onMutations(t3) {
    let s2 = [], r2 = [];
    const n4 = this.selectors.trim();
    if (n4) {
      for (const i4 of t3)
        i4.removedNodes.forEach((o2) => {
          var h4, p2, u3;
          if (o2.nodeType === 1) {
            const a2 = o2;
            try {
              (h4 = a2.matches) != null && h4.call(a2, n4) && s2.push(a2);
            } catch {
            }
            try {
              (u3 = (p2 = a2.querySelectorAll) == null ? void 0 : p2.call(a2, n4)) == null || u3.forEach((l2) => s2.push(l2));
            } catch {
            }
          }
        }), i4.addedNodes.forEach((o2) => {
          var h4, p2, u3;
          if (o2.nodeType === 1) {
            console.log("Added node:", o2);
            const a2 = o2;
            try {
              (h4 = a2.matches) != null && h4.call(a2, n4) && r2.push(a2);
            } catch {
            }
            try {
              (u3 = (p2 = a2.querySelectorAll) == null ? void 0 : p2.call(a2, n4)) == null || u3.forEach((l2) => r2.push(l2));
            } catch {
            }
          }
        });
      s2 = Array.from(new Set(s2)), r2 = Array.from(new Set(r2));
    } else
      for (const i4 of t3)
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
      var u3, a2;
      const i4 = this.duration, o2 = this.easing, h4 = this.stagger;
      let p2 = 0;
      for (const l2 of this._elements()) {
        const v2 = c2.get(l2), w2 = l2.getBoundingClientRect();
        if (this._rects.set(l2, w2), v2) {
          const d2 = v2.left - w2.left, x3 = v2.top - w2.top;
          if (d2 || x3) {
            (u3 = this._anims.get(l2)) == null || u3.cancel();
            const F2 = l2.animate(
              [{ transform: `translate(${d2}px, ${x3}px)` }, { transform: "none" }],
              { duration: i4, easing: o2, delay: h4 * p2 }
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
            { duration: i4, easing: o2, delay: h4 * p2 }
          );
          this._anims.set(l2, d2);
        }
        p2++;
      }
    });
  }
  _animateLeave(t3, s2) {
    console.log("Leave animation for:", t3);
    const r2 = t3.cloneNode(true), n4 = r2.style;
    n4.position = "fixed", n4.left = s2.left + "px", n4.top = s2.top + "px", n4.width = s2.width + "px", n4.height = s2.height + "px", n4.margin = "0", n4.pointerEvents = "none", n4.boxSizing = "border-box", document.body.appendChild(r2), r2.animate(
      [
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: "translateY(-6px)" }
      ],
      { duration: this.duration, easing: this.easing }
    ).finished.finally(() => r2.remove());
  }
}
customElements.define("tj-animate-changes", G);
var K2 = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, j2 = (e2, t3, s2, r2) => {
  for (var n4 = r2 > 1 ? void 0 : r2 ? Q(t3, s2) : t3, c2 = e2.length - 1, i4; c2 >= 0; c2--)
    (i4 = e2[c2]) && (n4 = (r2 ? i4(t3, s2, n4) : i4(n4)) || n4);
  return r2 && n4 && K2(t3, s2, n4), n4;
};
let E = class extends V$1(y$5) {
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
      const t3 = await e2.text();
      this.innerHTML = t3;
    } catch (e2) {
      this.throwError(`Error fetching content from ${this.src}: ${e2}`);
    }
  }
  update(e2) {
    super.update(e2), e2.has("src") && this._loadSrc();
  }
};
j2([
  n$6({ type: String, reflect: false, attribute: "src" })
], E.prototype, "src", 2);
E = j2([
  t$3("tj-include")
], E);
