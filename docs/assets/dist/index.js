var _a;
let Et$1 = class Et {
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
};
const w$4 = {
  xs: { name: "xs", minWidth: 0 },
  sm: { name: "sm", minWidth: 576 },
  md: { name: "md", minWidth: 768 },
  lg: { name: "lg", minWidth: 992 },
  xl: { name: "xl", minWidth: 1200 },
  xxl: { name: "xxl", minWidth: 1400 }
};
let P$6 = w$4.xs;
function j$6() {
  const n3 = window.innerWidth;
  let t2 = w$4.xs;
  for (const e2 in w$4) {
    const s2 = w$4[e2];
    n3 >= s2.minWidth && (t2 = s2);
  }
  return t2;
}
function Dt$1(n3) {
  if (typeof n3 == "string" && n3.endsWith("px") && (n3 = parseInt(n3.replace("px", ""))), typeof n3 == "string") {
    if (n3 = w$4[n3], !n3)
      throw new Error(
        `Breakpoint ${n3} not found. Defined breakpoints are: ${Object.keys(w$4).join(", ")}`
      );
  } else typeof n3 == "number" && (n3 = { name: "c", minWidth: n3 });
  return window.innerWidth >= n3.minWidth;
}
if (!window.__nextrap_current_breakpoint) {
  window.__nextrap_current_breakpoint = j$6();
  const n3 = new Et$1(200, 500);
  window.addEventListener("resize", async () => {
    if (await n3.wait(), P$6 !== j$6()) {
      P$6 = j$6(), window.__nextrap_current_breakpoint = P$6;
      const t2 = new CustomEvent("breakpoint-changed", {
        detail: { breakpoint: P$6 }
      });
      console.log("Breakpoint changed", P$6), window.dispatchEvent(t2);
    }
  });
}
let jt$1 = class jt {
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
    for (const s2 of t2.children)
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
  static isEmptySlot(t2) {
    const e2 = t2.assignedElements({ flatten: true });
    return e2.length === 0 ? true : e2.every((s2) => !this.isVisible(s2));
  }
  static observeEmptySlots(t2) {
    const e2 = t2.shadowRoot;
    if (!e2) {
      console.warn("Element has no shadow root", t2);
      return;
    }
    e2.querySelectorAll("slot").forEach((i4) => {
      this.isEmptySlot(i4) ? i4.setAttribute("empty", "") : i4.removeAttribute("empty"), i4.onslotchange = () => {
        this.isEmptySlot(i4) ? i4.setAttribute("empty", "") : i4.removeAttribute("empty");
      };
    });
  }
};
function It$1() {
  return document.readyState === "loading" ? new Promise((n3) => {
    document.addEventListener("DOMContentLoaded", () => n3());
  }) : Promise.resolve();
}
function zt$1(n3) {
  return new Promise((t2) => setTimeout(t2, n3));
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N$6 = globalThis, V$4 = N$6.ShadowRoot && (N$6.ShadyCSS === void 0 || N$6.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F$3 = Symbol(), tt$2 = /* @__PURE__ */ new WeakMap();
let K$3 = class K {
  constructor(t2, e2, s2) {
    if (this._$cssResult$ = true, s2 !== F$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const e2 = this.t;
    if (V$4 && t2 === void 0) {
      const s2 = e2 !== void 0 && e2.length === 1;
      s2 && (t2 = tt$2.get(e2)), t2 === void 0 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), s2 && tt$2.set(e2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const ut$1 = (n3) => new K$3(typeof n3 == "string" ? n3 : n3 + "", void 0, F$3), wt$1 = (n3, t2) => {
  if (V$4) n3.adoptedStyleSheets = t2.map((e2) => e2 instanceof CSSStyleSheet ? e2 : e2.styleSheet);
  else for (const e2 of t2) {
    const s2 = document.createElement("style"), i4 = N$6.litNonce;
    i4 !== void 0 && s2.setAttribute("nonce", i4), s2.textContent = e2.cssText, n3.appendChild(s2);
  }
}, et$2 = V$4 ? (n3) => n3 : (n3) => n3 instanceof CSSStyleSheet ? ((t2) => {
  let e2 = "";
  for (const s2 of t2.cssRules) e2 += s2.cssText;
  return ut$1(e2);
})(n3) : n3;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: St$1, defineProperty: bt$1, getOwnPropertyDescriptor: Ct$1, getOwnPropertyNames: Pt$1, getOwnPropertySymbols: xt$1, getPrototypeOf: Tt$1 } = Object, m$5 = globalThis, st$3 = m$5.trustedTypes, Ot$1 = st$3 ? st$3.emptyScript : "", B$7 = m$5.reactiveElementPolyfillSupport, T$6 = (n3, t2) => n3, W$4 = { toAttribute(n3, t2) {
  switch (t2) {
    case Boolean:
      n3 = n3 ? Ot$1 : null;
      break;
    case Object:
    case Array:
      n3 = n3 == null ? n3 : JSON.stringify(n3);
  }
  return n3;
}, fromAttribute(n3, t2) {
  let e2 = n3;
  switch (t2) {
    case Boolean:
      e2 = n3 !== null;
      break;
    case Number:
      e2 = n3 === null ? null : Number(n3);
      break;
    case Object:
    case Array:
      try {
        e2 = JSON.parse(n3);
      } catch {
        e2 = null;
      }
  }
  return e2;
} }, G$5 = (n3, t2) => !St$1(n3, t2), it$2 = { attribute: true, type: String, converter: W$4, reflect: false, useDefault: false, hasChanged: G$5 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m$5.litPropertyMetadata ?? (m$5.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$6 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, e2 = it$2) {
    if (e2.state && (e2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((e2 = Object.create(e2)).wrapped = true), this.elementProperties.set(t2, e2), !e2.noAccessor) {
      const s2 = Symbol(), i4 = this.getPropertyDescriptor(t2, s2, e2);
      i4 !== void 0 && bt$1(this.prototype, t2, i4);
    }
  }
  static getPropertyDescriptor(t2, e2, s2) {
    const { get: i4, set: o2 } = Ct$1(this.prototype, t2) ?? { get() {
      return this[e2];
    }, set(r2) {
      this[e2] = r2;
    } };
    return { get: i4, set(r2) {
      const h3 = i4 == null ? void 0 : i4.call(this);
      o2 == null || o2.call(this, r2), this.requestUpdate(t2, h3, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? it$2;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T$6("elementProperties"))) return;
    const t2 = Tt$1(this);
    t2.finalize(), t2.l !== void 0 && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T$6("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(T$6("properties"))) {
      const e2 = this.properties, s2 = [...Pt$1(e2), ...xt$1(e2)];
      for (const i4 of s2) this.createProperty(i4, e2[i4]);
    }
    const t2 = this[Symbol.metadata];
    if (t2 !== null) {
      const e2 = litPropertyMetadata.get(t2);
      if (e2 !== void 0) for (const [s2, i4] of e2) this.elementProperties.set(s2, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e2, s2] of this.elementProperties) {
      const i4 = this._$Eu(e2, s2);
      i4 !== void 0 && this._$Eh.set(i4, e2);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t2) {
    const e2 = [];
    if (Array.isArray(t2)) {
      const s2 = new Set(t2.flat(1 / 0).reverse());
      for (const i4 of s2) e2.unshift(et$2(i4));
    } else t2 !== void 0 && e2.push(et$2(t2));
    return e2;
  }
  static _$Eu(t2, e2) {
    const s2 = e2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
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
    for (const s2 of e2.keys()) this.hasOwnProperty(s2) && (t2.set(s2, this[s2]), delete this[s2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return wt$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$EO) == null || t2.forEach((e2) => {
      var s2;
      return (s2 = e2.hostConnected) == null ? void 0 : s2.call(e2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$EO) == null || t2.forEach((e2) => {
      var s2;
      return (s2 = e2.hostDisconnected) == null ? void 0 : s2.call(e2);
    });
  }
  attributeChangedCallback(t2, e2, s2) {
    this._$AK(t2, s2);
  }
  _$ET(t2, e2) {
    var o2;
    const s2 = this.constructor.elementProperties.get(t2), i4 = this.constructor._$Eu(t2, s2);
    if (i4 !== void 0 && s2.reflect === true) {
      const r2 = (((o2 = s2.converter) == null ? void 0 : o2.toAttribute) !== void 0 ? s2.converter : W$4).toAttribute(e2, s2.type);
      this._$Em = t2, r2 == null ? this.removeAttribute(i4) : this.setAttribute(i4, r2), this._$Em = null;
    }
  }
  _$AK(t2, e2) {
    var o2, r2;
    const s2 = this.constructor, i4 = s2._$Eh.get(t2);
    if (i4 !== void 0 && this._$Em !== i4) {
      const h3 = s2.getPropertyOptions(i4), a3 = typeof h3.converter == "function" ? { fromAttribute: h3.converter } : ((o2 = h3.converter) == null ? void 0 : o2.fromAttribute) !== void 0 ? h3.converter : W$4;
      this._$Em = i4;
      const c2 = a3.fromAttribute(e2, h3.type);
      this[i4] = c2 ?? ((r2 = this._$Ej) == null ? void 0 : r2.get(i4)) ?? c2, this._$Em = null;
    }
  }
  requestUpdate(t2, e2, s2) {
    var i4;
    if (t2 !== void 0) {
      const o2 = this.constructor, r2 = this[t2];
      if (s2 ?? (s2 = o2.getPropertyOptions(t2)), !((s2.hasChanged ?? G$5)(r2, e2) || s2.useDefault && s2.reflect && r2 === ((i4 = this._$Ej) == null ? void 0 : i4.get(t2)) && !this.hasAttribute(o2._$Eu(t2, s2)))) return;
      this.C(t2, e2, s2);
    }
    this.isUpdatePending === false && (this._$ES = this._$EP());
  }
  C(t2, e2, { useDefault: s2, reflect: i4, wrapped: o2 }, r2) {
    s2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? e2 ?? this[t2]), o2 !== true || r2 !== void 0) || (this._$AL.has(t2) || (this.hasUpdated || s2 || (e2 = void 0), this._$AL.set(t2, e2)), i4 === true && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
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
    var s2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o2, r2] of this._$Ep) this[o2] = r2;
        this._$Ep = void 0;
      }
      const i4 = this.constructor.elementProperties;
      if (i4.size > 0) for (const [o2, r2] of i4) {
        const { wrapped: h3 } = r2, a3 = this[o2];
        h3 !== true || this._$AL.has(o2) || a3 === void 0 || this.C(o2, void 0, r2, a3);
      }
    }
    let t2 = false;
    const e2 = this._$AL;
    try {
      t2 = this.shouldUpdate(e2), t2 ? (this.willUpdate(e2), (s2 = this._$EO) == null || s2.forEach((i4) => {
        var o2;
        return (o2 = i4.hostUpdate) == null ? void 0 : o2.call(i4);
      }), this.update(e2)) : this._$EM();
    } catch (i4) {
      throw t2 = false, this._$EM(), i4;
    }
    t2 && this._$AE(e2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var e2;
    (e2 = this._$EO) == null || e2.forEach((s2) => {
      var i4;
      return (i4 = s2.hostUpdated) == null ? void 0 : i4.call(s2);
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
y$6.elementStyles = [], y$6.shadowRootOptions = { mode: "open" }, y$6[T$6("elementProperties")] = /* @__PURE__ */ new Map(), y$6[T$6("finalized")] = /* @__PURE__ */ new Map(), B$7 == null || B$7({ ReactiveElement: y$6 }), (m$5.reactiveElementVersions ?? (m$5.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O$6 = globalThis, D$7 = O$6.trustedTypes, nt$2 = D$7 ? D$7.createPolicy("lit-html", { createHTML: (n3) => n3 }) : void 0, Z$4 = "$lit$", f$8 = `lit$${Math.random().toFixed(9).slice(2)}$`, J$3 = "?" + f$8, Ut$1 = `<${J$3}>`, v$6 = document, U$3 = () => v$6.createComment(""), M$6 = (n3) => n3 === null || typeof n3 != "object" && typeof n3 != "function", Q$3 = Array.isArray, pt$1 = (n3) => Q$3(n3) || typeof (n3 == null ? void 0 : n3[Symbol.iterator]) == "function", I$3 = `[ 	
\f\r]`, x$5 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt$2 = /-->/g, ot$2 = />/g, _$7 = RegExp(`>|${I$3}(?:([^\\s"'>=/]+)(${I$3}*=${I$3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at$2 = /'/g, ht = /"/g, ft$1 = /^(?:script|style|textarea|title)$/i, S$9 = Symbol.for("lit-noChange"), u$7 = Symbol.for("lit-nothing"), ct$1 = /* @__PURE__ */ new WeakMap(), g$5 = v$6.createTreeWalker(v$6, 129);
function $t$1(n3, t2) {
  if (!Q$3(n3) || !n3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nt$2 !== void 0 ? nt$2.createHTML(t2) : t2;
}
const mt$1 = (n3, t2) => {
  const e2 = n3.length - 1, s2 = [];
  let i4, o2 = t2 === 2 ? "<svg>" : t2 === 3 ? "<math>" : "", r2 = x$5;
  for (let h3 = 0; h3 < e2; h3++) {
    const a3 = n3[h3];
    let c2, d2, l3 = -1, p3 = 0;
    for (; p3 < a3.length && (r2.lastIndex = p3, d2 = r2.exec(a3), d2 !== null); ) p3 = r2.lastIndex, r2 === x$5 ? d2[1] === "!--" ? r2 = rt$2 : d2[1] !== void 0 ? r2 = ot$2 : d2[2] !== void 0 ? (ft$1.test(d2[2]) && (i4 = RegExp("</" + d2[2], "g")), r2 = _$7) : d2[3] !== void 0 && (r2 = _$7) : r2 === _$7 ? d2[0] === ">" ? (r2 = i4 ?? x$5, l3 = -1) : d2[1] === void 0 ? l3 = -2 : (l3 = r2.lastIndex - d2[2].length, c2 = d2[1], r2 = d2[3] === void 0 ? _$7 : d2[3] === '"' ? ht : at$2) : r2 === ht || r2 === at$2 ? r2 = _$7 : r2 === rt$2 || r2 === ot$2 ? r2 = x$5 : (r2 = _$7, i4 = void 0);
    const $2 = r2 === _$7 && n3[h3 + 1].startsWith("/>") ? " " : "";
    o2 += r2 === x$5 ? a3 + Ut$1 : l3 >= 0 ? (s2.push(c2), a3.slice(0, l3) + Z$4 + a3.slice(l3) + f$8 + $2) : a3 + f$8 + (l3 === -2 ? h3 : $2);
  }
  return [$t$1(n3, o2 + (n3[e2] || "<?>") + (t2 === 2 ? "</svg>" : t2 === 3 ? "</math>" : "")), s2];
};
let R$5 = class R {
  constructor({ strings: t2, _$litType$: e2 }, s2) {
    let i4;
    this.parts = [];
    let o2 = 0, r2 = 0;
    const h3 = t2.length - 1, a3 = this.parts, [c2, d2] = mt$1(t2, e2);
    if (this.el = R.createElement(c2, s2), g$5.currentNode = this.el.content, e2 === 2 || e2 === 3) {
      const l3 = this.el.content.firstChild;
      l3.replaceWith(...l3.childNodes);
    }
    for (; (i4 = g$5.nextNode()) !== null && a3.length < h3; ) {
      if (i4.nodeType === 1) {
        if (i4.hasAttributes()) for (const l3 of i4.getAttributeNames()) if (l3.endsWith(Z$4)) {
          const p3 = d2[r2++], $2 = i4.getAttribute(l3).split(f$8), H3 = /([.?@])?(.*)/.exec(p3);
          a3.push({ type: 1, index: o2, name: H3[2], strings: $2, ctor: H3[1] === "." ? yt$1 : H3[1] === "?" ? gt$1 : H3[1] === "@" ? At$1 : L$6 }), i4.removeAttribute(l3);
        } else l3.startsWith(f$8) && (a3.push({ type: 6, index: o2 }), i4.removeAttribute(l3));
        if (ft$1.test(i4.tagName)) {
          const l3 = i4.textContent.split(f$8), p3 = l3.length - 1;
          if (p3 > 0) {
            i4.textContent = D$7 ? D$7.emptyScript : "";
            for (let $2 = 0; $2 < p3; $2++) i4.append(l3[$2], U$3()), g$5.nextNode(), a3.push({ type: 2, index: ++o2 });
            i4.append(l3[p3], U$3());
          }
        }
      } else if (i4.nodeType === 8) if (i4.data === J$3) a3.push({ type: 2, index: o2 });
      else {
        let l3 = -1;
        for (; (l3 = i4.data.indexOf(f$8, l3 + 1)) !== -1; ) a3.push({ type: 7, index: o2 }), l3 += f$8.length - 1;
      }
      o2++;
    }
  }
  static createElement(t2, e2) {
    const s2 = v$6.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function E$5(n3, t2, e2 = n3, s2) {
  var r2, h3;
  if (t2 === S$9) return t2;
  let i4 = s2 !== void 0 ? (r2 = e2._$Co) == null ? void 0 : r2[s2] : e2._$Cl;
  const o2 = M$6(t2) ? void 0 : t2._$litDirective$;
  return (i4 == null ? void 0 : i4.constructor) !== o2 && ((h3 = i4 == null ? void 0 : i4._$AO) == null || h3.call(i4, false), o2 === void 0 ? i4 = void 0 : (i4 = new o2(n3), i4._$AT(n3, e2, s2)), s2 !== void 0 ? (e2._$Co ?? (e2._$Co = []))[s2] = i4 : e2._$Cl = i4), i4 !== void 0 && (t2 = E$5(n3, i4._$AS(n3, t2.values), i4, s2)), t2;
}
let _t$1 = class _t {
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
    const { el: { content: e2 }, parts: s2 } = this._$AD, i4 = ((t2 == null ? void 0 : t2.creationScope) ?? v$6).importNode(e2, true);
    g$5.currentNode = i4;
    let o2 = g$5.nextNode(), r2 = 0, h3 = 0, a3 = s2[0];
    for (; a3 !== void 0; ) {
      if (r2 === a3.index) {
        let c2;
        a3.type === 2 ? c2 = new C$8(o2, o2.nextSibling, this, t2) : a3.type === 1 ? c2 = new a3.ctor(o2, a3.name, a3.strings, this, t2) : a3.type === 6 && (c2 = new vt$1(o2, this, t2)), this._$AV.push(c2), a3 = s2[++h3];
      }
      r2 !== (a3 == null ? void 0 : a3.index) && (o2 = g$5.nextNode(), r2++);
    }
    return g$5.currentNode = v$6, i4;
  }
  p(t2) {
    let e2 = 0;
    for (const s2 of this._$AV) s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, e2), e2 += s2.strings.length - 2) : s2._$AI(t2[e2])), e2++;
  }
};
let C$8 = class C {
  get _$AU() {
    var t2;
    return ((t2 = this._$AM) == null ? void 0 : t2._$AU) ?? this._$Cv;
  }
  constructor(t2, e2, s2, i4) {
    this.type = 2, this._$AH = u$7, this._$AN = void 0, this._$AA = t2, this._$AB = e2, this._$AM = s2, this.options = i4, this._$Cv = (i4 == null ? void 0 : i4.isConnected) ?? true;
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
    t2 = E$5(this, t2, e2), M$6(t2) ? t2 === u$7 || t2 == null || t2 === "" ? (this._$AH !== u$7 && this._$AR(), this._$AH = u$7) : t2 !== this._$AH && t2 !== S$9 && this._(t2) : t2._$litType$ !== void 0 ? this.$(t2) : t2.nodeType !== void 0 ? this.T(t2) : pt$1(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== u$7 && M$6(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(v$6.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var o2;
    const { values: e2, _$litType$: s2 } = t2, i4 = typeof s2 == "number" ? this._$AC(t2) : (s2.el === void 0 && (s2.el = R$5.createElement($t$1(s2.h, s2.h[0]), this.options)), s2);
    if (((o2 = this._$AH) == null ? void 0 : o2._$AD) === i4) this._$AH.p(e2);
    else {
      const r2 = new _t$1(i4, this), h3 = r2.u(this.options);
      r2.p(e2), this.T(h3), this._$AH = r2;
    }
  }
  _$AC(t2) {
    let e2 = ct$1.get(t2.strings);
    return e2 === void 0 && ct$1.set(t2.strings, e2 = new R$5(t2)), e2;
  }
  k(t2) {
    Q$3(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let s2, i4 = 0;
    for (const o2 of t2) i4 === e2.length ? e2.push(s2 = new C(this.O(U$3()), this.O(U$3()), this, this.options)) : s2 = e2[i4], s2._$AI(o2), i4++;
    i4 < e2.length && (this._$AR(s2 && s2._$AB.nextSibling, i4), e2.length = i4);
  }
  _$AR(t2 = this._$AA.nextSibling, e2) {
    var s2;
    for ((s2 = this._$AP) == null ? void 0 : s2.call(this, false, true, e2); t2 !== this._$AB; ) {
      const i4 = t2.nextSibling;
      t2.remove(), t2 = i4;
    }
  }
  setConnected(t2) {
    var e2;
    this._$AM === void 0 && (this._$Cv = t2, (e2 = this._$AP) == null || e2.call(this, t2));
  }
};
let L$6 = class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, e2, s2, i4, o2) {
    this.type = 1, this._$AH = u$7, this._$AN = void 0, this.element = t2, this.name = e2, this._$AM = i4, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = u$7;
  }
  _$AI(t2, e2 = this, s2, i4) {
    const o2 = this.strings;
    let r2 = false;
    if (o2 === void 0) t2 = E$5(this, t2, e2, 0), r2 = !M$6(t2) || t2 !== this._$AH && t2 !== S$9, r2 && (this._$AH = t2);
    else {
      const h3 = t2;
      let a3, c2;
      for (t2 = o2[0], a3 = 0; a3 < o2.length - 1; a3++) c2 = E$5(this, h3[s2 + a3], e2, a3), c2 === S$9 && (c2 = this._$AH[a3]), r2 || (r2 = !M$6(c2) || c2 !== this._$AH[a3]), c2 === u$7 ? t2 = u$7 : t2 !== u$7 && (t2 += (c2 ?? "") + o2[a3 + 1]), this._$AH[a3] = c2;
    }
    r2 && !i4 && this.j(t2);
  }
  j(t2) {
    t2 === u$7 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
let yt$1 = class yt extends L$6 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === u$7 ? void 0 : t2;
  }
};
let gt$1 = class gt extends L$6 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== u$7);
  }
};
let At$1 = class At extends L$6 {
  constructor(t2, e2, s2, i4, o2) {
    super(t2, e2, s2, i4, o2), this.type = 5;
  }
  _$AI(t2, e2 = this) {
    if ((t2 = E$5(this, t2, e2, 0) ?? u$7) === S$9) return;
    const s2 = this._$AH, i4 = t2 === u$7 && s2 !== u$7 || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, o2 = t2 !== u$7 && (s2 === u$7 || i4);
    i4 && this.element.removeEventListener(this.name, this, s2), o2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var e2;
    typeof this._$AH == "function" ? this._$AH.call(((e2 = this.options) == null ? void 0 : e2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
};
let vt$1 = class vt {
  constructor(t2, e2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    E$5(this, t2);
  }
};
const q$4 = O$6.litHtmlPolyfillSupport;
q$4 == null || q$4(R$5, C$8), (O$6.litHtmlVersions ?? (O$6.litHtmlVersions = [])).push("3.3.1");
const Mt$1 = (n3, t2, e2) => {
  const s2 = (e2 == null ? void 0 : e2.renderBefore) ?? t2;
  let i4 = s2._$litPart$;
  if (i4 === void 0) {
    const o2 = (e2 == null ? void 0 : e2.renderBefore) ?? null;
    s2._$litPart$ = i4 = new C$8(t2.insertBefore(U$3(), o2), o2, void 0, e2 ?? {});
  }
  return i4._$AI(n3), i4;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A$4 = globalThis;
let k$6 = class k extends y$6 {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = Mt$1(e2, this.renderRoot, this.renderOptions);
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
    return S$9;
  }
};
var dt$1;
k$6._$litElement$ = true, k$6.finalized = true, (dt$1 = A$4.litElementHydrateSupport) == null || dt$1.call(A$4, { LitElement: k$6 });
const z$8 = A$4.litElementPolyfillSupport;
z$8 == null || z$8({ LitElement: k$6 });
(A$4.litElementVersions ?? (A$4.litElementVersions = [])).push("4.2.1");
const kt$1 = "nte-group-open-close";
function le(n3, t2) {
  document.dispatchEvent(
    new CustomEvent(kt$1, {
      bubbles: false,
      composed: true,
      detail: { open: n3, groupName: t2 }
    })
  );
}
function Wt$1(n3, t2) {
  const e2 = document.createElement("template");
  return e2.innerHTML = n3.trim(), t2.append(e2.content.cloneNode(true)), new Proxy({}, {
    get(s2, i4) {
      if (i4 === "fragment")
        return t2;
      if (typeof i4 == "string") {
        const o2 = t2.getElementById(i4);
        if (!o2)
          throw new Error(`❌ Unknown id '${i4}'.`);
        return o2;
      }
    }
  });
}
const Y$4 = class Y extends y$6 {
  constructor(t2) {
    super();
    const e2 = this.createRenderRoot();
    this.$ = Wt$1(t2, e2);
  }
  connectedCallback() {
    super.connectedCallback();
    let t2 = this.css;
    Array.isArray(t2) || (t2 = [t2]);
    const e2 = t2.map((s2) => s2 instanceof K$3 ? s2.styleSheet : ut$1(s2).styleSheet);
    this.shadowRoot.adoptedStyleSheets = e2;
  }
};
Y$4.DEFINITION = {
  classes: [],
  attributes: {}
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = globalThis, e$5 = t$4.ShadowRoot && (void 0 === t$4.ShadyCSS || t$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$5 = Symbol(), o$7 = /* @__PURE__ */ new WeakMap();
let n$8 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$5) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$5 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$7.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$7.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$6 = (t2) => new n$8("string" == typeof t2 ? t2 : t2 + "", void 0, s$5), S$8 = (s2, o2) => {
  if (e$5) s2.adoptedStyleSheets = o2.map(((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet));
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$4.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$5 = e$5 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$6(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$5, defineProperty: e$4, getOwnPropertyDescriptor: h$6, getOwnPropertyNames: r$5, getOwnPropertySymbols: o$6, getPrototypeOf: n$7 } = Object, a$3 = globalThis, c$4 = a$3.trustedTypes, l$3 = c$4 ? c$4.emptyScript : "", p$5 = a$3.reactiveElementPolyfillSupport, d$5 = (t2, s2) => t2, u$6 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$3 : null;
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
} }, f$7 = (t2, s2) => !i$5(t2, s2), b$3 = { attribute: true, type: String, converter: u$6, reflect: false, useDefault: false, hasChanged: f$7 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$3.litPropertyMetadata ?? (a$3.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$5 = class y2 extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$3) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i4 = Symbol(), h3 = this.getPropertyDescriptor(t2, i4, s2);
      void 0 !== h3 && e$4(this.prototype, t2, h3);
    }
  }
  static getPropertyDescriptor(t2, s2, i4) {
    const { get: e2, set: r2 } = h$6(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h3 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h3, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$3;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$5("elementProperties"))) return;
    const t2 = n$7(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$5("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$5("properties"))) {
      const t3 = this.properties, s2 = [...r$5(t3), ...o$6(t3)];
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
    return S$8(t2, this.constructor.elementStyles), t2;
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
      const h3 = (void 0 !== ((_a2 = i4.converter) == null ? void 0 : _a2.toAttribute) ? i4.converter : u$6).toAttribute(s2, i4.type);
      this._$Em = t2, null == h3 ? this.removeAttribute(e2) : this.setAttribute(e2, h3), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i4 = this.constructor, e2 = i4._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i4.getPropertyOptions(e2), h3 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$6;
      this._$Em = e2;
      const r2 = h3.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i4) {
    var _a2;
    if (void 0 !== t2) {
      const e2 = this.constructor, h3 = this[t2];
      if (i4 ?? (i4 = e2.getPropertyOptions(t2)), !((i4.hasChanged ?? f$7)(h3, s2) || i4.useDefault && i4.reflect && h3 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(e2._$Eu(t2, i4)))) return;
      this.C(t2, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i4, reflect: e2, wrapped: h3 }, r2) {
    i4 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h3 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i4 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
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
y$5.elementStyles = [], y$5.shadowRootOptions = { mode: "open" }, y$5[d$5("elementProperties")] = /* @__PURE__ */ new Map(), y$5[d$5("finalized")] = /* @__PURE__ */ new Map(), p$5 == null ? void 0 : p$5({ ReactiveElement: y$5 }), (a$3.reactiveElementVersions ?? (a$3.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = globalThis, i$4 = t$3.trustedTypes, s$4 = i$4 ? i$4.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$3 = "$lit$", h$5 = `lit$${Math.random().toFixed(9).slice(2)}$`, o$5 = "?" + h$5, n$6 = `<${o$5}>`, r$4 = document, l$2 = () => r$4.createComment(""), c$3 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a$2 = Array.isArray, u$5 = (t2) => a$2(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), d$4 = "[ 	\n\f\r]", f$6 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$5 = /-->/g, _$6 = />/g, m$4 = RegExp(`>|${d$4}(?:([^\\s"'>=/]+)(${d$4}*=${d$4}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p$4 = /'/g, g$4 = /"/g, $$2 = /^(?:script|style|textarea|title)$/i, y$4 = (t2) => (i4, ...s2) => ({ _$litType$: t2, strings: i4, values: s2 }), x$4 = y$4(1), T$5 = Symbol.for("lit-noChange"), E$4 = Symbol.for("lit-nothing"), A$3 = /* @__PURE__ */ new WeakMap(), C$7 = r$4.createTreeWalker(r$4, 129);
function P$5(t2, i4) {
  if (!a$2(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$4 ? s$4.createHTML(i4) : i4;
}
const V$3 = (t2, i4) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l3 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", c2 = f$6;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t2[i5];
    let a3, u2, d2 = -1, y5 = 0;
    for (; y5 < s3.length && (c2.lastIndex = y5, u2 = c2.exec(s3), null !== u2); ) y5 = c2.lastIndex, c2 === f$6 ? "!--" === u2[1] ? c2 = v$5 : void 0 !== u2[1] ? c2 = _$6 : void 0 !== u2[2] ? ($$2.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m$4) : void 0 !== u2[3] && (c2 = m$4) : c2 === m$4 ? ">" === u2[0] ? (c2 = r2 ?? f$6, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a3 = u2[1], c2 = void 0 === u2[3] ? m$4 : '"' === u2[3] ? g$4 : p$4) : c2 === g$4 || c2 === p$4 ? c2 = m$4 : c2 === v$5 || c2 === _$6 ? c2 = f$6 : (c2 = m$4, r2 = void 0);
    const x3 = c2 === m$4 && t2[i5 + 1].startsWith("/>") ? " " : "";
    l3 += c2 === f$6 ? s3 + n$6 : d2 >= 0 ? (o2.push(a3), s3.slice(0, d2) + e$3 + s3.slice(d2) + h$5 + x3) : s3 + h$5 + (-2 === d2 ? i5 : x3);
  }
  return [P$5(t2, l3 + (t2[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), o2];
};
let N$5 = class N {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a3 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f5, v2] = V$3(t2, s2);
    if (this.el = N.createElement(f5, n3), C$7.currentNode = this.el.content, 2 === s2 || 3 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = C$7.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(e$3)) {
          const i4 = v2[a3++], s3 = r2.getAttribute(t3).split(h$5), e2 = /([.?@])?(.*)/.exec(i4);
          d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? H$3 : "?" === e2[1] ? I$2 : "@" === e2[1] ? L$5 : k$5 }), r2.removeAttribute(t3);
        } else t3.startsWith(h$5) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($$2.test(r2.tagName)) {
          const t3 = r2.textContent.split(h$5), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i$4 ? i$4.emptyScript : "";
            for (let i4 = 0; i4 < s3; i4++) r2.append(t3[i4], l$2()), C$7.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l$2());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === o$5) d2.push({ type: 2, index: c2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(h$5, t3 + 1)); ) d2.push({ type: 7, index: c2 }), t3 += h$5.length - 1;
      }
      c2++;
    }
  }
  static createElement(t2, i4) {
    const s2 = r$4.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function S$7(t2, i4, s2 = t2, e2) {
  var _a2, _b;
  if (i4 === T$5) return i4;
  let h3 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = c$3(i4) ? void 0 : i4._$litDirective$;
  return (h3 == null ? void 0 : h3.constructor) !== o2 && ((_b = h3 == null ? void 0 : h3._$AO) == null ? void 0 : _b.call(h3, false), void 0 === o2 ? h3 = void 0 : (h3 = new o2(t2), h3._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h3 : s2._$Cl = h3), void 0 !== h3 && (i4 = S$7(t2, h3._$AS(t2, i4.values), h3, e2)), i4;
}
let M$5 = class M {
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
    const { el: { content: i4 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? r$4).importNode(i4, true);
    C$7.currentNode = e2;
    let h3 = C$7.nextNode(), o2 = 0, n3 = 0, l3 = s2[0];
    for (; void 0 !== l3; ) {
      if (o2 === l3.index) {
        let i5;
        2 === l3.type ? i5 = new R$4(h3, h3.nextSibling, this, t2) : 1 === l3.type ? i5 = new l3.ctor(h3, l3.name, l3.strings, this, t2) : 6 === l3.type && (i5 = new z$7(h3, this, t2)), this._$AV.push(i5), l3 = s2[++n3];
      }
      o2 !== (l3 == null ? void 0 : l3.index) && (h3 = C$7.nextNode(), o2++);
    }
    return C$7.currentNode = r$4, e2;
  }
  p(t2) {
    let i4 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t2[i4])), i4++;
  }
};
let R$4 = class R2 {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i4, s2, e2) {
    this.type = 2, this._$AH = E$4, this._$AN = void 0, this._$AA = t2, this._$AB = i4, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
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
    t2 = S$7(this, t2, i4), c$3(t2) ? t2 === E$4 || null == t2 || "" === t2 ? (this._$AH !== E$4 && this._$AR(), this._$AH = E$4) : t2 !== this._$AH && t2 !== T$5 && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u$5(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== E$4 && c$3(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$4.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i4, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = N$5.createElement(P$5(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i4);
    else {
      const t3 = new M$5(e2, this), s3 = t3.u(this.options);
      t3.p(i4), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i4 = A$3.get(t2.strings);
    return void 0 === i4 && A$3.set(t2.strings, i4 = new N$5(t2)), i4;
  }
  k(t2) {
    a$2(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s2, e2 = 0;
    for (const h3 of t2) e2 === i4.length ? i4.push(s2 = new R2(this.O(l$2()), this.O(l$2()), this, this.options)) : s2 = i4[e2], s2._$AI(h3), e2++;
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
let k$5 = class k2 {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i4, s2, e2, h3) {
    this.type = 1, this._$AH = E$4, this._$AN = void 0, this.element = t2, this.name = i4, this._$AM = e2, this.options = h3, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = E$4;
  }
  _$AI(t2, i4 = this, s2, e2) {
    const h3 = this.strings;
    let o2 = false;
    if (void 0 === h3) t2 = S$7(this, t2, i4, 0), o2 = !c$3(t2) || t2 !== this._$AH && t2 !== T$5, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h3[0], n3 = 0; n3 < h3.length - 1; n3++) r2 = S$7(this, e3[s2 + n3], i4, n3), r2 === T$5 && (r2 = this._$AH[n3]), o2 || (o2 = !c$3(r2) || r2 !== this._$AH[n3]), r2 === E$4 ? t2 = E$4 : t2 !== E$4 && (t2 += (r2 ?? "") + h3[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === E$4 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
let H$3 = class H extends k$5 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === E$4 ? void 0 : t2;
  }
};
let I$2 = class I extends k$5 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== E$4);
  }
};
let L$5 = class L2 extends k$5 {
  constructor(t2, i4, s2, e2, h3) {
    super(t2, i4, s2, e2, h3), this.type = 5;
  }
  _$AI(t2, i4 = this) {
    if ((t2 = S$7(this, t2, i4, 0) ?? E$4) === T$5) return;
    const s2 = this._$AH, e2 = t2 === E$4 && s2 !== E$4 || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h3 = t2 !== E$4 && (s2 === E$4 || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h3 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
};
let z$7 = class z {
  constructor(t2, i4, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S$7(this, t2);
  }
};
const Z$3 = { I: R$4 }, j$5 = t$3.litHtmlPolyfillSupport;
j$5 == null ? void 0 : j$5(N$5, R$4), (t$3.litHtmlVersions ?? (t$3.litHtmlVersions = [])).push("3.3.1");
const B$6 = (t2, i4, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i4;
  let h3 = e2._$litPart$;
  if (void 0 === h3) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h3 = new R$4(i4.insertBefore(l$2(), t3), t3, void 0, s2 ?? {});
  }
  return h3._$AI(t2), h3;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$3 = globalThis;
let i$3 = class i extends y$5 {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = B$6(r2, this.renderRoot, this.renderOptions);
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
    return T$5;
  }
};
i$3._$litElement$ = true, i$3["finalized"] = true, (_a = s$3.litElementHydrateSupport) == null ? void 0 : _a.call(s$3, { LitElement: i$3 });
const o$4 = s$3.litElementPolyfillSupport;
o$4 == null ? void 0 : o$4({ LitElement: i$3 });
(s$3.litElementVersions ?? (s$3.litElementVersions = [])).push("4.2.1");
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
const o$3 = { attribute: true, type: String, converter: u$6, reflect: false, hasChanged: f$7 }, r$3 = (t2 = o$3, e2, r2) => {
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
function n$5(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$3(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r$2(r2) {
  return n$5({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = { ATTRIBUTE: 1, CHILD: 2 }, e$2 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$2 = class i2 {
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
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = e$2(class extends i$2 {
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
    return T$5;
  }
});
var g$3 = Object.defineProperty;
var u$4 = (t2, e2, o2) => e2 in t2 ? g$3(t2, e2, { enumerable: true, configurable: true, writable: true, value: o2 }) : t2[e2] = o2;
var i$1 = (t2, e2, o2) => u$4(t2, typeof e2 != "symbol" ? e2 + "" : e2, o2);
const C$6 = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--backdrop: rgb(from var(--nt-dark) r g b / .5);--header-background: transparent;--background-color: var(--nt-primary-subtle);--shadow-color: rgb(from var(--nt-dark) r g b / .5);--main-padding: 0;--header-padding: var(--nt-space);position:fixed;top:0;right:0;height:100vh;width:33%;min-width:250px;max-width:400px;z-index:2000;padding:0;isolation:isolate;display:block}:host[opened]{display:block}#offcanvas{display:flex;flex-direction:column;width:100%;height:100%;background-color:var(--background-color);box-shadow:0 0 10px var(--shadow-color);transition:transform .2s ease-in-out;transform:translate(0)}#offcanvas.closed{transform:translate(100%)}#header{display:flex;width:100%;flex-direction:row;justify-content:space-between;align-items:center;background-color:var(--header-background);flex-grow:0;padding:var(--header-padding)}#header:has(>slot[empty]){display:none}#main{display:flex;width:100%;flex-grow:1;padding:var(--main-padding);min-height:200px;overflow:auto;scroll-behavior:auto;scrollbar-gutter:auto;height:100%}#footer{display:flex;width:100%;flex-direction:row;justify-content:space-between;align-items:center;margin-top:auto;flex-grow:0;padding:var(--padding)}#footer:has(>slot[empty]){display:none}#backdrop{opacity:1;transition:opacity .2s ease-in-out;position:fixed;top:0;left:0;width:100%;height:100%;background-color:var(--backdrop);z-index:-1;display:block}#backdrop.closed{opacity:0}";
var h$4 = Object.defineProperty, _$5 = Object.getOwnPropertyDescriptor, E$3 = (t2, e2, o2) => e2 in t2 ? h$4(t2, e2, { enumerable: true, configurable: true, writable: true, value: o2 }) : t2[e2] = o2, s$2 = (t2, e2, o2, n3) => {
  for (var r2 = n3 > 1 ? void 0 : n3 ? _$5(e2, o2) : e2, d2 = t2.length - 1, l3; d2 >= 0; d2--)
    (l3 = t2[d2]) && (r2 = (n3 ? l3(e2, o2, r2) : l3(r2)) || r2);
  return n3 && r2 && h$4(e2, o2, r2), r2;
}, N$4 = (t2, e2, o2) => E$3(t2, e2 + "", o2);
let a$1 = class a extends i$3 {
  constructor() {
    super();
    i$1(this, "backdrop", true);
    i$1(this, "opened", false);
    i$1(this, "dataGroupName", "");
    i$1(this, "closedClass", true);
    this.addEventListener("click", (e2) => {
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
    e2.has("opened") && (this.dataGroupName !== "" && le(this.opened, this.dataGroupName), this.opened ? (this.style.display = "block", await zt$1(1), jt$1.observeEmptySlots(this), this.closedClass = false) : (this.closedClass = true, await zt$1(400), this.style.display = "none"));
  }
  render() {
    return x$4`
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
N$4(a$1, "styles", [r$6(C$6)]);
s$2([
  n$5({ type: Boolean, reflect: true })
], a$1.prototype, "backdrop", 2);
s$2([
  n$5({ type: Boolean, reflect: true })
], a$1.prototype, "opened", 2);
s$2([
  n$5({ type: String, attribute: "data-group-name" })
], a$1.prototype, "dataGroupName", 2);
s$2([
  r$2()
], a$1.prototype, "closedClass", 2);
a$1 = s$2([
  t$2(a$1.is)
], a$1);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: t } = Z$3, f$5 = (o2) => void 0 === o2.strings, r$1 = () => document.createComment(""), s$1 = (o2, i4, n3) => {
  var _a2;
  const e2 = o2._$AA.parentNode, l3 = void 0 === i4 ? o2._$AB : i4._$AA;
  if (void 0 === n3) {
    const i5 = e2.insertBefore(r$1(), l3), d2 = e2.insertBefore(r$1(), l3);
    n3 = new t(i5, d2, o2, o2.options);
  } else {
    const t2 = n3._$AB.nextSibling, i5 = n3._$AM, d2 = i5 !== o2;
    if (d2) {
      let t3;
      (_a2 = n3._$AQ) == null ? void 0 : _a2.call(n3, o2), n3._$AM = o2, void 0 !== n3._$AP && (t3 = o2._$AU) !== i5._$AU && n3._$AP(t3);
    }
    if (t2 !== l3 || d2) {
      let o3 = n3._$AA;
      for (; o3 !== t2; ) {
        const t3 = o3.nextSibling;
        e2.insertBefore(o3, l3), o3 = t3;
      }
    }
  }
  return n3;
}, v$4 = (o2, t2, i4 = o2) => (o2._$AI(t2, i4), o2), u$3 = {}, m$3 = (o2, t2 = u$3) => o2._$AH = t2, p$3 = (o2) => o2._$AH, M$4 = (o2) => {
  o2._$AR(), o2._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = (i4, t2) => {
  var _a2;
  const e2 = i4._$AN;
  if (void 0 === e2) return false;
  for (const i5 of e2) (_a2 = i5._$AO) == null ? void 0 : _a2.call(i5, t2, false), s(i5, t2);
  return true;
}, o$2 = (i4) => {
  let t2, e2;
  do {
    if (void 0 === (t2 = i4._$AM)) break;
    e2 = t2._$AN, e2.delete(i4), i4 = t2;
  } while (0 === (e2 == null ? void 0 : e2.size));
}, r = (i4) => {
  for (let t2; t2 = i4._$AM; i4 = t2) {
    let e2 = t2._$AN;
    if (void 0 === e2) t2._$AN = e2 = /* @__PURE__ */ new Set();
    else if (e2.has(i4)) break;
    e2.add(i4), c$2(t2);
  }
};
function h$3(i4) {
  void 0 !== this._$AN ? (o$2(this), this._$AM = i4, r(this)) : this._$AM = i4;
}
function n$4(i4, t2 = false, e2 = 0) {
  const r2 = this._$AH, h3 = this._$AN;
  if (void 0 !== h3 && 0 !== h3.size) if (t2) if (Array.isArray(r2)) for (let i5 = e2; i5 < r2.length; i5++) s(r2[i5], false), o$2(r2[i5]);
  else null != r2 && (s(r2, false), o$2(r2));
  else s(this, i4);
}
const c$2 = (i4) => {
  i4.type == t$1.CHILD && (i4._$AP ?? (i4._$AP = n$4), i4._$AQ ?? (i4._$AQ = h$3));
};
let f$4 = class f extends i$2 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i4, t2, e2) {
    super._$AT(i4, t2, e2), r(this), this.isConnected = i4._$AU;
  }
  _$AO(i4, t2 = true) {
    var _a2, _b;
    i4 !== this.isConnected && (this.isConnected = i4, i4 ? (_a2 = this.reconnected) == null ? void 0 : _a2.call(this) : (_b = this.disconnected) == null ? void 0 : _b.call(this)), t2 && (s(this, i4), o$2(this));
  }
  setValue(t2) {
    if (f$5(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const i4 = [...this._$Ct._$AH];
      i4[this._$Ci] = t2, this._$Ct._$AI(i4, this, 0);
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
const e = () => new h$2();
let h$2 = class h {
};
const o$1 = /* @__PURE__ */ new WeakMap(), n$3 = e$2(class extends f$4 {
  render(i4) {
    return E$4;
  }
  update(i4, [s2]) {
    var _a2;
    const e2 = s2 !== this.G;
    return e2 && void 0 !== this.G && this.rt(void 0), (e2 || this.lt !== this.ct) && (this.G = s2, this.ht = (_a2 = i4.options) == null ? void 0 : _a2.host, this.rt(this.ct = i4.element)), E$4;
  }
  rt(t2) {
    if (this.isConnected || (t2 = void 0), "function" == typeof this.G) {
      const i4 = this.ht ?? globalThis;
      let s2 = o$1.get(i4);
      void 0 === s2 && (s2 = /* @__PURE__ */ new WeakMap(), o$1.set(i4, s2)), void 0 !== s2.get(this.G) && this.G.call(this.ht, void 0), s2.set(this.G, t2), void 0 !== t2 && this.G.call(this.ht, t2);
    } else this.G.value = t2;
  }
  get lt() {
    var _a2, _b;
    return "function" == typeof this.G ? (_a2 = o$1.get(this.ht ?? globalThis)) == null ? void 0 : _a2.get(this.G) : (_b = this.G) == null ? void 0 : _b.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
class yt2 {
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
const R$3 = {
  xs: { name: "xs", minWidth: 0 },
  sm: { name: "sm", minWidth: 576 },
  md: { name: "md", minWidth: 768 },
  lg: { name: "lg", minWidth: 992 },
  xl: { name: "xl", minWidth: 1200 },
  xxl: { name: "xxl", minWidth: 1400 }
};
let S$6 = R$3.xs;
function B$5() {
  const r2 = window.innerWidth;
  let t2 = R$3.xs;
  for (const e2 in R$3) {
    const s2 = R$3[e2];
    r2 >= s2.minWidth && (t2 = s2);
  }
  return t2;
}
if (!window.__nextrap_current_breakpoint) {
  window.__nextrap_current_breakpoint = B$5();
  const r2 = new yt2(200, 500);
  window.addEventListener("resize", async () => {
    if (await r2.wait(), S$6 !== B$5()) {
      S$6 = B$5(), window.__nextrap_current_breakpoint = S$6;
      const t2 = new CustomEvent("breakpoint-changed", {
        detail: { breakpoint: S$6 }
      });
      console.log("Breakpoint changed", S$6), window.dispatchEvent(t2);
    }
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L$4 = globalThis, Y$3 = L$4.ShadowRoot && (L$4.ShadyCSS === void 0 || L$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, dt = Symbol(), Q$2 = /* @__PURE__ */ new WeakMap();
let pt = class {
  constructor(t2, e2, s2) {
    if (this._$cssResult$ = true, s2 !== dt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const e2 = this.t;
    if (Y$3 && t2 === void 0) {
      const s2 = e2 !== void 0 && e2.length === 1;
      s2 && (t2 = Q$2.get(e2)), t2 === void 0 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), s2 && Q$2.set(e2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const G$4 = (r2) => new pt(typeof r2 == "string" ? r2 : r2 + "", void 0, dt), vt2 = (r2, t2) => {
  if (Y$3) r2.adoptedStyleSheets = t2.map((e2) => e2 instanceof CSSStyleSheet ? e2 : e2.styleSheet);
  else for (const e2 of t2) {
    const s2 = document.createElement("style"), i4 = L$4.litNonce;
    i4 !== void 0 && s2.setAttribute("nonce", i4), s2.textContent = e2.cssText, r2.appendChild(s2);
  }
}, X$1 = Y$3 ? (r2) => r2 : (r2) => r2 instanceof CSSStyleSheet ? ((t2) => {
  let e2 = "";
  for (const s2 of t2.cssRules) e2 += s2.cssText;
  return G$4(e2);
})(r2) : r2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: gt2, defineProperty: At2, getOwnPropertyDescriptor: bt, getOwnPropertyNames: Et2, getOwnPropertySymbols: wt, getPrototypeOf: St } = Object, _$4 = globalThis, tt$1 = _$4.trustedTypes, xt = tt$1 ? tt$1.emptyScript : "", j$4 = _$4.reactiveElementPolyfillSupport, C$5 = (r2, t2) => r2, z$6 = { toAttribute(r2, t2) {
  switch (t2) {
    case Boolean:
      r2 = r2 ? xt : null;
      break;
    case Object:
    case Array:
      r2 = r2 == null ? r2 : JSON.stringify(r2);
  }
  return r2;
}, fromAttribute(r2, t2) {
  let e2 = r2;
  switch (t2) {
    case Boolean:
      e2 = r2 !== null;
      break;
    case Number:
      e2 = r2 === null ? null : Number(r2);
      break;
    case Object:
    case Array:
      try {
        e2 = JSON.parse(r2);
      } catch {
        e2 = null;
      }
  }
  return e2;
} }, F$2 = (r2, t2) => !gt2(r2, t2), et$1 = { attribute: true, type: String, converter: z$6, reflect: false, useDefault: false, hasChanged: F$2 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _$4.litPropertyMetadata ?? (_$4.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$3 = class y3 extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, e2 = et$1) {
    if (e2.state && (e2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((e2 = Object.create(e2)).wrapped = true), this.elementProperties.set(t2, e2), !e2.noAccessor) {
      const s2 = Symbol(), i4 = this.getPropertyDescriptor(t2, s2, e2);
      i4 !== void 0 && At2(this.prototype, t2, i4);
    }
  }
  static getPropertyDescriptor(t2, e2, s2) {
    const { get: i4, set: o2 } = bt(this.prototype, t2) ?? { get() {
      return this[e2];
    }, set(n3) {
      this[e2] = n3;
    } };
    return { get: i4, set(n3) {
      const h3 = i4 == null ? void 0 : i4.call(this);
      o2 == null || o2.call(this, n3), this.requestUpdate(t2, h3, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? et$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C$5("elementProperties"))) return;
    const t2 = St(this);
    t2.finalize(), t2.l !== void 0 && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C$5("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(C$5("properties"))) {
      const e2 = this.properties, s2 = [...Et2(e2), ...wt(e2)];
      for (const i4 of s2) this.createProperty(i4, e2[i4]);
    }
    const t2 = this[Symbol.metadata];
    if (t2 !== null) {
      const e2 = litPropertyMetadata.get(t2);
      if (e2 !== void 0) for (const [s2, i4] of e2) this.elementProperties.set(s2, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e2, s2] of this.elementProperties) {
      const i4 = this._$Eu(e2, s2);
      i4 !== void 0 && this._$Eh.set(i4, e2);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t2) {
    const e2 = [];
    if (Array.isArray(t2)) {
      const s2 = new Set(t2.flat(1 / 0).reverse());
      for (const i4 of s2) e2.unshift(X$1(i4));
    } else t2 !== void 0 && e2.push(X$1(t2));
    return e2;
  }
  static _$Eu(t2, e2) {
    const s2 = e2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
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
    for (const s2 of e2.keys()) this.hasOwnProperty(s2) && (t2.set(s2, this[s2]), delete this[s2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return vt2(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$EO) == null || t2.forEach((e2) => {
      var s2;
      return (s2 = e2.hostConnected) == null ? void 0 : s2.call(e2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$EO) == null || t2.forEach((e2) => {
      var s2;
      return (s2 = e2.hostDisconnected) == null ? void 0 : s2.call(e2);
    });
  }
  attributeChangedCallback(t2, e2, s2) {
    this._$AK(t2, s2);
  }
  _$ET(t2, e2) {
    var o2;
    const s2 = this.constructor.elementProperties.get(t2), i4 = this.constructor._$Eu(t2, s2);
    if (i4 !== void 0 && s2.reflect === true) {
      const n3 = (((o2 = s2.converter) == null ? void 0 : o2.toAttribute) !== void 0 ? s2.converter : z$6).toAttribute(e2, s2.type);
      this._$Em = t2, n3 == null ? this.removeAttribute(i4) : this.setAttribute(i4, n3), this._$Em = null;
    }
  }
  _$AK(t2, e2) {
    var o2, n3;
    const s2 = this.constructor, i4 = s2._$Eh.get(t2);
    if (i4 !== void 0 && this._$Em !== i4) {
      const h3 = s2.getPropertyOptions(i4), a3 = typeof h3.converter == "function" ? { fromAttribute: h3.converter } : ((o2 = h3.converter) == null ? void 0 : o2.fromAttribute) !== void 0 ? h3.converter : z$6;
      this._$Em = i4;
      const l3 = a3.fromAttribute(e2, h3.type);
      this[i4] = l3 ?? ((n3 = this._$Ej) == null ? void 0 : n3.get(i4)) ?? l3, this._$Em = null;
    }
  }
  requestUpdate(t2, e2, s2) {
    var i4;
    if (t2 !== void 0) {
      const o2 = this.constructor, n3 = this[t2];
      if (s2 ?? (s2 = o2.getPropertyOptions(t2)), !((s2.hasChanged ?? F$2)(n3, e2) || s2.useDefault && s2.reflect && n3 === ((i4 = this._$Ej) == null ? void 0 : i4.get(t2)) && !this.hasAttribute(o2._$Eu(t2, s2)))) return;
      this.C(t2, e2, s2);
    }
    this.isUpdatePending === false && (this._$ES = this._$EP());
  }
  C(t2, e2, { useDefault: s2, reflect: i4, wrapped: o2 }, n3) {
    s2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, n3 ?? e2 ?? this[t2]), o2 !== true || n3 !== void 0) || (this._$AL.has(t2) || (this.hasUpdated || s2 || (e2 = void 0), this._$AL.set(t2, e2)), i4 === true && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
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
    var s2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o2, n3] of this._$Ep) this[o2] = n3;
        this._$Ep = void 0;
      }
      const i4 = this.constructor.elementProperties;
      if (i4.size > 0) for (const [o2, n3] of i4) {
        const { wrapped: h3 } = n3, a3 = this[o2];
        h3 !== true || this._$AL.has(o2) || a3 === void 0 || this.C(o2, void 0, n3, a3);
      }
    }
    let t2 = false;
    const e2 = this._$AL;
    try {
      t2 = this.shouldUpdate(e2), t2 ? (this.willUpdate(e2), (s2 = this._$EO) == null || s2.forEach((i4) => {
        var o2;
        return (o2 = i4.hostUpdate) == null ? void 0 : o2.call(i4);
      }), this.update(e2)) : this._$EM();
    } catch (i4) {
      throw t2 = false, this._$EM(), i4;
    }
    t2 && this._$AE(e2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var e2;
    (e2 = this._$EO) == null || e2.forEach((s2) => {
      var i4;
      return (i4 = s2.hostUpdated) == null ? void 0 : i4.call(s2);
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
y$3.elementStyles = [], y$3.shadowRootOptions = { mode: "open" }, y$3[C$5("elementProperties")] = /* @__PURE__ */ new Map(), y$3[C$5("finalized")] = /* @__PURE__ */ new Map(), j$4 == null || j$4({ ReactiveElement: y$3 }), (_$4.reactiveElementVersions ?? (_$4.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P$4 = globalThis, D$6 = P$4.trustedTypes, st$2 = D$6 ? D$6.createPolicy("lit-html", { createHTML: (r2) => r2 }) : void 0, ut = "$lit$", $$1 = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + $$1, Ct = `<${ft}>`, A$2 = document, T$4 = () => A$2.createComment(""), M$3 = (r2) => r2 === null || typeof r2 != "object" && typeof r2 != "function", J$2 = Array.isArray, Pt = (r2) => J$2(r2) || typeof (r2 == null ? void 0 : r2[Symbol.iterator]) == "function", I$1 = `[ 	
\f\r]`, x$3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it$1 = /-->/g, rt$1 = />/g, m$2 = RegExp(`>|${I$1}(?:([^\\s"'>=/]+)(${I$1}*=${I$1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt$1 = /'/g, ot$1 = /"/g, $t = /^(?:script|style|textarea|title)$/i, Ot = (r2) => (t2, ...e2) => ({ _$litType$: r2, strings: t2, values: e2 }), Tt = Ot(1), E$2 = Symbol.for("lit-noChange"), p$2 = Symbol.for("lit-nothing"), at$1 = /* @__PURE__ */ new WeakMap(), v$3 = A$2.createTreeWalker(A$2, 129);
function _t2(r2, t2) {
  if (!J$2(r2) || !r2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return st$2 !== void 0 ? st$2.createHTML(t2) : t2;
}
const Mt = (r2, t2) => {
  const e2 = r2.length - 1, s2 = [];
  let i4, o2 = t2 === 2 ? "<svg>" : t2 === 3 ? "<math>" : "", n3 = x$3;
  for (let h3 = 0; h3 < e2; h3++) {
    const a3 = r2[h3];
    let l3, d2, c2 = -1, u2 = 0;
    for (; u2 < a3.length && (n3.lastIndex = u2, d2 = n3.exec(a3), d2 !== null); ) u2 = n3.lastIndex, n3 === x$3 ? d2[1] === "!--" ? n3 = it$1 : d2[1] !== void 0 ? n3 = rt$1 : d2[2] !== void 0 ? ($t.test(d2[2]) && (i4 = RegExp("</" + d2[2], "g")), n3 = m$2) : d2[3] !== void 0 && (n3 = m$2) : n3 === m$2 ? d2[0] === ">" ? (n3 = i4 ?? x$3, c2 = -1) : d2[1] === void 0 ? c2 = -2 : (c2 = n3.lastIndex - d2[2].length, l3 = d2[1], n3 = d2[3] === void 0 ? m$2 : d2[3] === '"' ? ot$1 : nt$1) : n3 === ot$1 || n3 === nt$1 ? n3 = m$2 : n3 === it$1 || n3 === rt$1 ? n3 = x$3 : (n3 = m$2, i4 = void 0);
    const f5 = n3 === m$2 && r2[h3 + 1].startsWith("/>") ? " " : "";
    o2 += n3 === x$3 ? a3 + Ct : c2 >= 0 ? (s2.push(l3), a3.slice(0, c2) + ut + a3.slice(c2) + $$1 + f5) : a3 + $$1 + (c2 === -2 ? h3 : f5);
  }
  return [_t2(r2, o2 + (r2[e2] || "<?>") + (t2 === 2 ? "</svg>" : t2 === 3 ? "</math>" : "")), s2];
};
let U$2 = class U {
  constructor({ strings: t2, _$litType$: e2 }, s2) {
    let i4;
    this.parts = [];
    let o2 = 0, n3 = 0;
    const h3 = t2.length - 1, a3 = this.parts, [l3, d2] = Mt(t2, e2);
    if (this.el = U.createElement(l3, s2), v$3.currentNode = this.el.content, e2 === 2 || e2 === 3) {
      const c2 = this.el.content.firstChild;
      c2.replaceWith(...c2.childNodes);
    }
    for (; (i4 = v$3.nextNode()) !== null && a3.length < h3; ) {
      if (i4.nodeType === 1) {
        if (i4.hasAttributes()) for (const c2 of i4.getAttributeNames()) if (c2.endsWith(ut)) {
          const u2 = d2[n3++], f5 = i4.getAttribute(c2).split($$1), H3 = /([.?@])?(.*)/.exec(u2);
          a3.push({ type: 1, index: o2, name: H3[2], strings: f5, ctor: H3[1] === "." ? Nt : H3[1] === "?" ? kt : H3[1] === "@" ? Ht : W$3 }), i4.removeAttribute(c2);
        } else c2.startsWith($$1) && (a3.push({ type: 6, index: o2 }), i4.removeAttribute(c2));
        if ($t.test(i4.tagName)) {
          const c2 = i4.textContent.split($$1), u2 = c2.length - 1;
          if (u2 > 0) {
            i4.textContent = D$6 ? D$6.emptyScript : "";
            for (let f5 = 0; f5 < u2; f5++) i4.append(c2[f5], T$4()), v$3.nextNode(), a3.push({ type: 2, index: ++o2 });
            i4.append(c2[u2], T$4());
          }
        }
      } else if (i4.nodeType === 8) if (i4.data === ft) a3.push({ type: 2, index: o2 });
      else {
        let c2 = -1;
        for (; (c2 = i4.data.indexOf($$1, c2 + 1)) !== -1; ) a3.push({ type: 7, index: o2 }), c2 += $$1.length - 1;
      }
      o2++;
    }
  }
  static createElement(t2, e2) {
    const s2 = A$2.createElement("template");
    return s2.innerHTML = t2, s2;
  }
};
function w$3(r2, t2, e2 = r2, s2) {
  var n3, h3;
  if (t2 === E$2) return t2;
  let i4 = s2 !== void 0 ? (n3 = e2._$Co) == null ? void 0 : n3[s2] : e2._$Cl;
  const o2 = M$3(t2) ? void 0 : t2._$litDirective$;
  return (i4 == null ? void 0 : i4.constructor) !== o2 && ((h3 = i4 == null ? void 0 : i4._$AO) == null || h3.call(i4, false), o2 === void 0 ? i4 = void 0 : (i4 = new o2(r2), i4._$AT(r2, e2, s2)), s2 !== void 0 ? (e2._$Co ?? (e2._$Co = []))[s2] = i4 : e2._$Cl = i4), i4 !== void 0 && (t2 = w$3(r2, i4._$AS(r2, t2.values), i4, s2)), t2;
}
class Ut {
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
    const { el: { content: e2 }, parts: s2 } = this._$AD, i4 = ((t2 == null ? void 0 : t2.creationScope) ?? A$2).importNode(e2, true);
    v$3.currentNode = i4;
    let o2 = v$3.nextNode(), n3 = 0, h3 = 0, a3 = s2[0];
    for (; a3 !== void 0; ) {
      if (n3 === a3.index) {
        let l3;
        a3.type === 2 ? l3 = new N$3(o2, o2.nextSibling, this, t2) : a3.type === 1 ? l3 = new a3.ctor(o2, a3.name, a3.strings, this, t2) : a3.type === 6 && (l3 = new Rt(o2, this, t2)), this._$AV.push(l3), a3 = s2[++h3];
      }
      n3 !== (a3 == null ? void 0 : a3.index) && (o2 = v$3.nextNode(), n3++);
    }
    return v$3.currentNode = A$2, i4;
  }
  p(t2) {
    let e2 = 0;
    for (const s2 of this._$AV) s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, e2), e2 += s2.strings.length - 2) : s2._$AI(t2[e2])), e2++;
  }
}
let N$3 = class N2 {
  get _$AU() {
    var t2;
    return ((t2 = this._$AM) == null ? void 0 : t2._$AU) ?? this._$Cv;
  }
  constructor(t2, e2, s2, i4) {
    this.type = 2, this._$AH = p$2, this._$AN = void 0, this._$AA = t2, this._$AB = e2, this._$AM = s2, this.options = i4, this._$Cv = (i4 == null ? void 0 : i4.isConnected) ?? true;
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
    t2 = w$3(this, t2, e2), M$3(t2) ? t2 === p$2 || t2 == null || t2 === "" ? (this._$AH !== p$2 && this._$AR(), this._$AH = p$2) : t2 !== this._$AH && t2 !== E$2 && this._(t2) : t2._$litType$ !== void 0 ? this.$(t2) : t2.nodeType !== void 0 ? this.T(t2) : Pt(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== p$2 && M$3(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(A$2.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var o2;
    const { values: e2, _$litType$: s2 } = t2, i4 = typeof s2 == "number" ? this._$AC(t2) : (s2.el === void 0 && (s2.el = U$2.createElement(_t2(s2.h, s2.h[0]), this.options)), s2);
    if (((o2 = this._$AH) == null ? void 0 : o2._$AD) === i4) this._$AH.p(e2);
    else {
      const n3 = new Ut(i4, this), h3 = n3.u(this.options);
      n3.p(e2), this.T(h3), this._$AH = n3;
    }
  }
  _$AC(t2) {
    let e2 = at$1.get(t2.strings);
    return e2 === void 0 && at$1.set(t2.strings, e2 = new U$2(t2)), e2;
  }
  k(t2) {
    J$2(this._$AH) || (this._$AH = [], this._$AR());
    const e2 = this._$AH;
    let s2, i4 = 0;
    for (const o2 of t2) i4 === e2.length ? e2.push(s2 = new N2(this.O(T$4()), this.O(T$4()), this, this.options)) : s2 = e2[i4], s2._$AI(o2), i4++;
    i4 < e2.length && (this._$AR(s2 && s2._$AB.nextSibling, i4), e2.length = i4);
  }
  _$AR(t2 = this._$AA.nextSibling, e2) {
    var s2;
    for ((s2 = this._$AP) == null ? void 0 : s2.call(this, false, true, e2); t2 !== this._$AB; ) {
      const i4 = t2.nextSibling;
      t2.remove(), t2 = i4;
    }
  }
  setConnected(t2) {
    var e2;
    this._$AM === void 0 && (this._$Cv = t2, (e2 = this._$AP) == null || e2.call(this, t2));
  }
};
let W$3 = class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, e2, s2, i4, o2) {
    this.type = 1, this._$AH = p$2, this._$AN = void 0, this.element = t2, this.name = e2, this._$AM = i4, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = p$2;
  }
  _$AI(t2, e2 = this, s2, i4) {
    const o2 = this.strings;
    let n3 = false;
    if (o2 === void 0) t2 = w$3(this, t2, e2, 0), n3 = !M$3(t2) || t2 !== this._$AH && t2 !== E$2, n3 && (this._$AH = t2);
    else {
      const h3 = t2;
      let a3, l3;
      for (t2 = o2[0], a3 = 0; a3 < o2.length - 1; a3++) l3 = w$3(this, h3[s2 + a3], e2, a3), l3 === E$2 && (l3 = this._$AH[a3]), n3 || (n3 = !M$3(l3) || l3 !== this._$AH[a3]), l3 === p$2 ? t2 = p$2 : t2 !== p$2 && (t2 += (l3 ?? "") + o2[a3 + 1]), this._$AH[a3] = l3;
    }
    n3 && !i4 && this.j(t2);
  }
  j(t2) {
    t2 === p$2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
};
class Nt extends W$3 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === p$2 ? void 0 : t2;
  }
}
class kt extends W$3 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== p$2);
  }
}
class Ht extends W$3 {
  constructor(t2, e2, s2, i4, o2) {
    super(t2, e2, s2, i4, o2), this.type = 5;
  }
  _$AI(t2, e2 = this) {
    if ((t2 = w$3(this, t2, e2, 0) ?? p$2) === E$2) return;
    const s2 = this._$AH, i4 = t2 === p$2 && s2 !== p$2 || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, o2 = t2 !== p$2 && (s2 === p$2 || i4);
    i4 && this.element.removeEventListener(this.name, this, s2), o2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var e2;
    typeof this._$AH == "function" ? this._$AH.call(((e2 = this.options) == null ? void 0 : e2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Rt {
  constructor(t2, e2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = e2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    w$3(this, t2);
  }
}
const q$3 = P$4.litHtmlPolyfillSupport;
q$3 == null || q$3(U$2, N$3), (P$4.litHtmlVersions ?? (P$4.litHtmlVersions = [])).push("3.3.1");
const Lt = (r2, t2, e2) => {
  const s2 = (e2 == null ? void 0 : e2.renderBefore) ?? t2;
  let i4 = s2._$litPart$;
  if (i4 === void 0) {
    const o2 = (e2 == null ? void 0 : e2.renderBefore) ?? null;
    s2._$litPart$ = i4 = new N$3(t2.insertBefore(T$4(), o2), o2, void 0, e2 ?? {});
  }
  return i4._$AI(r2), i4;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const g$2 = globalThis;
let O$5 = class O extends y$3 {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = Lt(e2, this.renderRoot, this.renderOptions);
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
    return E$2;
  }
};
var ct;
O$5._$litElement$ = true, O$5.finalized = true, (ct = g$2.litElementHydrateSupport) == null || ct.call(g$2, { LitElement: O$5 });
const V$2 = g$2.litElementPolyfillSupport;
V$2 == null || V$2({ LitElement: O$5 });
(g$2.litElementVersions ?? (g$2.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = (r2) => (t2, e2) => {
  e2 !== void 0 ? e2.addInitializer(() => {
    customElements.define(r2, t2);
  }) : customElements.define(r2, t2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = { attribute: true, type: String, converter: z$6, reflect: false, hasChanged: F$2 }, Wt = (r2 = Dt, t2, e2) => {
  const { kind: s2, metadata: i4 } = e2;
  let o2 = globalThis.litPropertyMetadata.get(i4);
  if (o2 === void 0 && globalThis.litPropertyMetadata.set(i4, o2 = /* @__PURE__ */ new Map()), s2 === "setter" && ((r2 = Object.create(r2)).wrapped = true), o2.set(e2.name, r2), s2 === "accessor") {
    const { name: n3 } = e2;
    return { set(h3) {
      const a3 = t2.get.call(this);
      t2.set.call(this, h3), this.requestUpdate(n3, a3, r2);
    }, init(h3) {
      return h3 !== void 0 && this.C(n3, void 0, r2, h3), h3;
    } };
  }
  if (s2 === "setter") {
    const { name: n3 } = e2;
    return function(h3) {
      const a3 = this[n3];
      t2.call(this, h3), this.requestUpdate(n3, a3, r2);
    };
  }
  throw Error("Unsupported decorator location: " + s2);
};
function K$2(r2) {
  return (t2, e2) => typeof e2 == "object" ? Wt(r2, t2, e2) : ((s2, i4, o2) => {
    const n3 = i4.hasOwnProperty(o2);
    return i4.constructor.createProperty(o2, s2), n3 ? Object.getOwnPropertyDescriptor(i4, o2) : void 0;
  })(r2, t2, e2);
}
function Bt(r2, t2 = "this", e2) {
  return function(s2, i4, o2) {
    const n3 = s2.connectedCallback, h3 = s2.disconnectedCallback;
    s2.connectedCallback = function() {
      const a3 = t2 === "this" ? this : t2, l3 = Array.isArray(r2) ? r2 : [r2];
      this.__eventListenerRemovers ?? (this.__eventListenerRemovers = []);
      for (const d2 of l3) {
        const c2 = this[i4].bind(this);
        a3.addEventListener(d2, c2), this.__eventListenerRemovers.push(() => a3.removeEventListener(d2, c2));
      }
      n3 == null || n3.call(this);
    }, s2.disconnectedCallback = function() {
      var a3;
      (a3 = this.__eventListenerRemovers) == null || a3.forEach((l3) => l3()), this.__eventListenerRemovers = [], h3 == null || h3.call(this);
    };
  };
}
const mt = "nte-group-open-close";
function jt2(r2, t2) {
  document.dispatchEvent(
    new CustomEvent(mt, {
      bubbles: false,
      composed: true,
      detail: { open: r2, groupName: t2 }
    })
  );
}
function It(r2, t2) {
  const e2 = document.createElement("template");
  return e2.innerHTML = r2.trim(), t2.append(e2.content.cloneNode(true)), new Proxy({}, {
    get(s2, i4) {
      if (i4 === "fragment")
        return t2;
      if (typeof i4 == "string") {
        const o2 = t2.getElementById(i4);
        if (!o2)
          throw new Error(`❌ Unknown id '${i4}'.`);
        return o2;
      }
    }
  });
}
const Z$2 = class Z extends y$3 {
  constructor(t2) {
    super();
    const e2 = this.createRenderRoot();
    this.$ = It(t2, e2);
  }
  connectedCallback() {
    super.connectedCallback();
    let t2 = this.css;
    Array.isArray(t2) || (t2 = [t2]);
    const e2 = t2.map((s2) => s2 instanceof pt ? s2.styleSheet : G$4(s2).styleSheet);
    this.shadowRoot.adoptedStyleSheets = e2;
  }
};
Z$2.DEFINITION = {
  classes: [],
  attributes: {}
};
const qt = ":host{--size: 40px;--color: var(--nt-text, black);--color-hover: var(--color);--width: 4px;height:var(--size);width:var(--size);display:block}#button{padding:0;width:100%;height:100%;cursor:pointer}.hamburger{display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0 none;background:none;position:relative;transition:transform .4s}.hamburger:hover{--color: var(--color-hover)}:host([open]) .hamburger .bar:nth-of-type(1){transform-origin:center center;transform:translateY(calc(.5em - var(--width) / 2)) rotate(45deg)}:host([open]) .hamburger .bar:nth-of-type(2){opacity:0}:host([open]) .hamburger .bar:nth-of-type(3){transform:translateY(calc(.5em - var(--width) / 2)) rotate(-45deg)}:host(:not([open])) #button:hover .bar:nth-of-type(1){transform:translateY(calc(.2em - var(--width) / 2))}:host(:not([open])) #button:hover .bar:nth-of-type(2){transform:translateY(calc(.5em - var(--width) / 2))}:host(:not([open])) #button:hover .bar:nth-of-type(3){transform:translateY(calc(.8em - var(--width) / 2))}.bar{font-size:var(--size);height:var(--width);width:var(--size);display:block;position:absolute;top:0;background-color:var(--color);transition:.4s}.bar:nth-of-type(1){transform:translateY(calc(.25em - var(--width) / 2))}.bar:nth-of-type(2){transform:translateY(calc(.5em - var(--width) / 2))}.bar:nth-of-type(3){transform:translateY(calc(.75em - var(--width) / 2))}";
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vt = Symbol.for(""), Yt = (r2) => {
  if ((r2 == null ? void 0 : r2.r) === Vt) return r2 == null ? void 0 : r2._$litStatic$;
}, lt$1 = /* @__PURE__ */ new Map(), Gt = (r2) => (t2, ...e2) => {
  const s2 = e2.length;
  let i4, o2;
  const n3 = [], h3 = [];
  let a3, l3 = 0, d2 = false;
  for (; l3 < s2; ) {
    for (a3 = t2[l3]; l3 < s2 && (o2 = e2[l3], (i4 = Yt(o2)) !== void 0); ) a3 += i4 + t2[++l3], d2 = true;
    l3 !== s2 && h3.push(o2), n3.push(a3), l3++;
  }
  if (l3 === s2 && n3.push(t2[s2]), d2) {
    const c2 = n3.join("$$lit$$");
    (t2 = lt$1.get(c2)) === void 0 && (n3.raw = n3, lt$1.set(c2, t2 = n3)), e2 = h3;
  }
  return r2(t2, ...e2);
}, Ft = Gt(Tt);
var Jt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, k$4 = (r2, t2, e2, s2) => {
  for (var i4 = s2 > 1 ? void 0 : s2 ? Kt(t2, e2) : t2, o2 = r2.length - 1, n3; o2 >= 0; o2--)
    (n3 = r2[o2]) && (i4 = (s2 ? n3(t2, e2, i4) : n3(i4)) || i4);
  return s2 && i4 && Jt(t2, e2, i4), i4;
};
let b$2 = class b extends O$5 {
  constructor() {
    super(), this.open = false, this.text = "Menu", this.dataGroupName = "";
  }
  render() {
    return Ft` <button id="button" class="hamburger">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </button>`;
  }
  listenEvents(r2) {
    r2.detail.groupName === this.dataGroupName && (this.open = r2.detail.open);
  }
  update(r2) {
    super.update(r2), r2.has("open") && this.dataGroupName !== "" && jt2(this.open, this.dataGroupName);
  }
};
b$2.styles = [G$4(qt)];
k$4([
  K$2({ type: Boolean, attribute: "open", reflect: true })
], b$2.prototype, "open", 2);
k$4([
  K$2({ type: String, reflect: true })
], b$2.prototype, "text", 2);
k$4([
  K$2({ type: String, reflect: false, attribute: "data-group-name" })
], b$2.prototype, "dataGroupName", 2);
k$4([
  Bt(mt, document)
], b$2.prototype, "listenEvents", 1);
b$2 = k$4([
  zt("nte-burger")
], b$2);
var P$3 = Object.defineProperty;
var O$4 = (r2, e2, t2) => e2 in r2 ? P$3(r2, e2, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e2] = t2;
var n$2 = (r2, e2, t2) => O$4(r2, typeof e2 != "symbol" ? e2 + "" : e2, t2);
const N$2 = ":host{--container-width: var(--nt-container-width);--text-color: var(--nt-text);--hover-color: var(--nt-primary);--hover-text-color: var(--nt-text-on-primary);--transition: .2s ease-in-out;--submenu-bg: var(--nt-light);--submenu-text-color: var(--nt-text);--justify-content: center;--sidemenu-bg: var(--nt-primary-subtle);--justify-sidebar-burger: flex-end;--height: auto;--default-alpha: .7;height:var(--height);display:block}nav{height:100%}#main{height:100%}#burger-wrapper{padding:15px}#text{padding-right:10px}#burger-default{cursor:pointer}#burger-default slot::slotted(span){color:rgb(from var(--text-color) r g b/var(--default-alpha));transition:color var(--transition)}#burger-default nte-burger{--color: rgb(from var(--text-color) r g b / var(--default-alpha))}#burger-default:hover slot::slotted(span){color:rgb(from var(--text-color) r g b/1)}#burger-default:hover nte-burger{--color: rgb(from var(--text-color) r g b / 1)}";
var y$2 = Object.defineProperty, k$3 = Object.getOwnPropertyDescriptor, E$1 = (r2, e2, t2) => e2 in r2 ? y$2(r2, e2, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e2] = t2, d$3 = (r2, e2, t2, i4) => {
  for (var a3 = i4 > 1 ? void 0 : i4 ? k$3(e2, t2) : e2, s2 = r2.length - 1, o2; s2 >= 0; s2--)
    (o2 = r2[s2]) && (a3 = (i4 ? o2(e2, t2, a3) : o2(a3)) || a3);
  return i4 && a3 && y$2(e2, t2, a3), a3;
}, C$4 = (r2, e2, t2) => E$1(r2, e2 + "", t2);
let l$1 = class l extends i$3 {
  constructor() {
    super();
    n$2(this, "mode", "slave");
    n$2(this, "breakpoint", "99999px");
    n$2(this, "transferTo", "");
    n$2(this, "dataGroupName", "");
    n$2(this, "_isTransferred", false);
  }
  getOffcanvas() {
    return this.transferTo ? document.querySelector(this.transferTo) : null;
  }
  getOffcanvasNav() {
    const e2 = this.getOffcanvas();
    return e2 ? e2.querySelector("nte-nav") : null;
  }
  render() {
    return x$4` <nav>
      <div id="burger-wrapper" ?hidden=${!this._isTransferred}>
        <slot
          name="burger"
          open
          aria-haspopup="true"
          id="burger"
          class="burger"
          @click=${() => {
      var e2;
      return (e2 = this.getOffcanvas()) == null ? void 0 : e2.open();
    }}
        >
          <!-- fallback icon -->
          ${this._isTransferred ? x$4`<div id="burger-default" style="display:flex; align-items: center; justify-content: center;">
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
  transferToElement(e2) {
    var a3;
    const t2 = (a3 = this.shadowRoot) == null ? void 0 : a3.querySelector("#main-slot");
    if (t2 === null)
      return;
    Array.from(t2.assignedElements({ flatten: true })).forEach((s2) => {
      s2 instanceof HTMLElement && e2.appendChild(s2);
    });
  }
  updated(e2) {
    var t2, i4;
    super.updated(e2), this._isTransferred ? this.transferToElement(
      this.getOffcanvasNav() ?? (() => {
        throw new Error("No offcanvas nav found");
      })()
    ) : ((t2 = this.getOffcanvasNav()) == null || t2.transferToElement(this), (i4 = this.getOffcanvas()) == null || i4.close());
  }
  firstUpdated(e2) {
    super.firstUpdated(e2);
    const t2 = this.classList;
    !t2.contains("nav-vertical") && !t2.contains("nav-horizontal") && t2.add(this.closest("nte-offcanvas") === null ? "nav-horizontal" : "nav-vertical");
  }
  async connectedCallback() {
    await It$1(), super.connectedCallback(), this.mode !== "slave" && this.transferTo !== "" && (this._isTransferred = false, this.breakpoint !== "" && (Dt$1(this.breakpoint) || (this._isTransferred = true), window.addEventListener("breakpoint-changed", (e2) => {
      Dt$1(this.breakpoint) ? this._isTransferred = false : this._isTransferred = true;
    })));
  }
};
C$4(l$1, "styles", [r$6(N$2)]);
d$3([
  n$5({ type: String, reflect: true })
], l$1.prototype, "mode", 2);
d$3([
  n$5({ type: String, reflect: true })
], l$1.prototype, "breakpoint", 2);
d$3([
  n$5({ type: String, reflect: true, attribute: "transfer-to" })
], l$1.prototype, "transferTo", 2);
d$3([
  n$5({ type: String, reflect: false, attribute: "data-group-name" })
], l$1.prototype, "dataGroupName", 2);
d$3([
  r$2()
], l$1.prototype, "_isTransferred", 2);
l$1 = d$3([
  t$2("nte-nav")
], l$1);
const Y$2 = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--bg: transparent;--spacer-bg: transparent;--container-width: var(--nt-container-width, 100%);--brand-height: 80px;--spacer-height: 80px;width:100vw;margin:0}:host(a){height:85px;width:auto}#wrapper{position:relative;left:0;top:0;right:0;width:100%}#spacer{position:relative;top:0;left:0;width:100%;transition:height .3s ease-in-out;height:var(--spacer-height);background-color:var(--spacer-bg)}#navbar{position:absolute;top:0;width:100vw;height:auto;background-color:var(--bg);z-index:1000}#main{width:100vw;display:block}";
var S$5 = Object.defineProperty, D$5 = Object.getOwnPropertyDescriptor, U$1 = (r2, e2, t2) => e2 in r2 ? S$5(r2, e2, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e2] = t2, T$3 = (r2, e2, t2, i4) => {
  for (var a3 = i4 > 1 ? void 0 : i4 ? D$5(e2, t2) : e2, s2 = r2.length - 1, o2; s2 >= 0; s2--)
    (o2 = r2[s2]) && (a3 = (i4 ? o2(e2, t2, a3) : o2(a3)) || a3);
  return i4 && a3 && S$5(e2, t2, a3), a3;
}, z$5 = (r2, e2, t2) => U$1(r2, e2 + "", t2);
let p$1 = class p extends i$3 {
  constructor() {
    super();
    n$2(this, "navbarRef", e());
    n$2(this, "spacerRef", e());
    n$2(this, "scrollThreshold", 0);
    n$2(this, "_lastScrollY", window.scrollY);
    n$2(this, "_scrollUpPixels", 0);
    n$2(this, "_debouncer");
    this._debouncer = new Et$1(100, 300), document.addEventListener(
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
    const e2 = window.scrollY;
    e2 > 1 ? this.classList.add("is-scrolled") : this.classList.remove("is-scrolled"), e2 < this._lastScrollY ? (this._scrollUpPixels += this._lastScrollY - e2, this._scrollUpPixels > 10 && e2 < this.scrollThreshold && this.classList.add("is-scrolling-up")) : (this._scrollUpPixels = 0, this.classList.remove("is-scrolling-up")), e2 > this.scrollThreshold ? this.classList.add("is-below-threshold") : this.classList.remove("is-below-threshold"), this._lastScrollY = e2;
  }
  async connectedCallback() {
    this.updateScrollState(), await It$1(), super.connectedCallback();
  }
  // Adjust the spacer height on every render
  async updated(e2) {
    await It$1(), super.updated(e2);
  }
  firstUpdated(e2) {
    jt$1.observeEmptySlots(this);
  }
  render() {
    return x$4`
      <div id="wrapper" part="wrapper">
        <div id="spacer" part="spacer" ${n$3(this.spacerRef)}></div>
        <div id="navbar" part="navbar" ${n$3(this.navbarRef)}>
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
z$5(p$1, "styles", [r$6(Y$2)]);
T$3([
  n$5({ type: Number, attribute: "scroll-threshold", reflect: true })
], p$1.prototype, "scrollThreshold", 2);
p$1 = T$3([
  t$2("nte-navbar")
], p$1);
const R$2 = "*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;width:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit;color:inherit;background:none;border:none;outline:none}a,i{color:inherit;text-decoration:none}ul,ol{list-style:none}table{border-collapse:collapse;border-spacing:0}slot{display:contents}:host{--container-width: var(--nt-container-width, 100%);--background: transparent;--text-color: var(--nt-text);--height: auto;--brand-height: 80px;display:block;height:100%;width:100vw}:host(.hide-on-scroll){transition:max-height .3s ease-in-out;max-height:100px}:host(.hide-on-scroll.is-scrolled){max-height:0;overflow:hidden}#main{height:var(--height);transition:height .2s ease-in-out;overflow:visible;width:100%;display:flex;background:var(--background)}#container{width:var(--container-width);margin:0 auto;display:flex}#container #brand{min-width:0;flex-shrink:1;width:auto;align-items:start;display:flex;height:100%;justify-items:center}#container #brand:has(slot[empty]){display:none}#container #nav{display:flex;flex-grow:1;justify-content:end;align-items:center;gap:1rem}";
var j$3 = Object.defineProperty, q$2 = (r2, e2, t2) => e2 in r2 ? j$3(r2, e2, { enumerable: true, configurable: true, writable: true, value: t2 }) : r2[e2] = t2, G$3 = (r2, e2, t2, i4) => {
  for (var a3 = e2, s2 = r2.length - 1, o2; s2 >= 0; s2--)
    (o2 = r2[s2]) && (a3 = o2(a3) || a3);
  return a3;
}, B$4 = (r2, e2, t2) => q$2(r2, e2 + "", t2);
let f$3 = class f2 extends i$3 {
  constructor() {
    super(...arguments);
    n$2(this, "_isScrolled", false);
  }
  static get is() {
    return "nte-navbar-line";
  }
  updateScrollState() {
    const e2 = window.scrollY;
    e2 > 1 && !this._isScrolled ? (this.classList.add("is-scrolled"), this._isScrolled = true) : e2 <= 1 && this._isScrolled && (this.classList.remove("is-scrolled"), this._isScrolled = false);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("scroll", () => this.updateScrollState(), { passive: true });
  }
  async firstUpdated(e2) {
    jt$1.observeEmptySlots(this), this.updateScrollState();
  }
  render() {
    return x$4`
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
B$4(f$3, "styles", [r$6(R$2)]);
f$3 = G$3([
  t$2("nte-navbar-line")
], f$3);
console.log("Loading nte-nav...");
var D$4 = Object.defineProperty;
var L$3 = (e2) => {
  throw TypeError(e2);
};
var M$2 = (e2, t2, n3) => t2 in e2 ? D$4(e2, t2, { enumerable: true, configurable: true, writable: true, value: n3 }) : e2[t2] = n3;
var u$2 = (e2, t2, n3) => M$2(e2, typeof t2 != "symbol" ? t2 + "" : t2, n3), w$2 = (e2, t2, n3) => t2.has(e2) || L$3("Cannot " + n3);
var a2 = (e2, t2, n3) => (w$2(e2, t2, "read from private field"), n3 ? n3.call(e2) : t2.get(e2)), l2 = (e2, t2, n3) => t2.has(e2) ? L$3("Cannot add the same private member more than once") : t2 instanceof WeakSet ? t2.add(e2) : t2.set(e2, n3), d$2 = (e2, t2, n3, i4) => (w$2(e2, t2, "write to private field"), t2.set(e2, n3), n3), v$2 = (e2, t2, n3) => (w$2(e2, t2, "access private method"), n3);
const m$1 = [
  { name: "xs", minWidth: 0 },
  { name: "sm", minWidth: 576 },
  { name: "md", minWidth: 768 },
  { name: "lg", minWidth: 992 },
  { name: "xl", minWidth: 1200 },
  { name: "xxl", minWidth: 1400 }
], y$1 = m$1.reduce(
  (e2, t2) => (e2[t2.name] = t2.minWidth, e2),
  {}
);
function B$3(e2) {
  if (!(e2 in y$1))
    throw new Error(`Unknown breakpoint: ${e2}`);
  return y$1[e2];
}
function P$2(e2) {
  e2 === void 0 && (e2 = window.innerWidth);
  for (let t2 = m$1.length - 1; t2 >= 0; t2--)
    if (e2 >= m$1[t2].minWidth)
      return m$1[t2].name;
  return "xs";
}
function _$3(e2, t2 = {}, n3 = []) {
  Array.isArray(n3) || (n3 = [n3]);
  const i4 = document.createElement(e2);
  for (const r2 in t2)
    t2[r2] !== null && t2[r2] !== void 0 && i4.setAttribute(r2, t2[r2] !== true ? t2[r2] : "");
  for (const r2 of n3)
    i4.append(typeof r2 == "string" ? document.createTextNode(r2) : r2);
  return i4;
}
let N$1 = class N3 {
  /**
   *
   * @param delay     Debounce delay in milliseconds
   * @param max_delay Maximum delay in milliseconds, if false then no maximum delay is applied
   */
  constructor(t2, n3 = false) {
    u$2(this, "timeout", null);
    u$2(this, "startTimeWithMs", 0);
    this.delay = t2, this.max_delay = n3;
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
};
let k$2 = class k3 {
  constructor(t2, n3, i4 = "main") {
    this._debug = t2, this.myElementId = n3, this.instanceId = i4;
  }
  log(...t2) {
    this._debug && console.log(`[LOG][ID:${this.myElementId}:${this.instanceId}]`, ...t2);
  }
  warn(...t2) {
    console.warn(`[WARN][ID:${this.myElementId}:${this.instanceId}]`, ...t2);
  }
  error(...t2) {
    console.error(`[ERROR][ID:${this.myElementId}:${this.instanceId}]`, ...t2);
  }
  throwError(...t2) {
    const n3 = `[ERROR][ID:${this.myElementId}:${this.instanceId}] ${t2.join(" ")}`;
    throw this.error(...t2), new Error(n3);
  }
};
let O$3 = class O2 {
  constructor(t2, n3 = true) {
    u$2(this, "label");
    u$2(this, "last");
    u$2(this, "startTime");
    u$2(this, "running", false);
    u$2(this, "enabled");
    this.label = t2, this.enabled = n3, this.startTime = this.last = performance.now(), this.running = true;
  }
  lap(t2 = "") {
    if (!this.enabled) return;
    const n3 = performance.now(), i4 = (n3 - this.last) / 1e3;
    this.last = n3, console.debug(`[${this.label}] ${t2} +${i4.toFixed(3)}s`);
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
const f$2 = Symbol("listenerDefs"), p2 = Symbol("withEventBindings");
function z$4(e2, t2) {
  const n3 = Array.isArray(e2) ? e2 : [e2];
  return function(i4, r2) {
    if (r2.kind !== "method") throw new Error("@Listen nur für Methoden");
    return r2.addInitializer(function() {
      const o2 = this.constructor;
      (o2[f$2] || (o2[f$2] = [])).push({
        method: r2.name,
        events: n3,
        opts: t2
      });
    }), function(...o2) {
      if (!this[p2])
        throw new Error("[EventBindings] @Listen - decorator requires EventBindingMixin.");
      return i4.apply(this, o2);
    };
  };
}
function A$1(e2, t2) {
  var n3;
  return !t2 || t2 === "host" ? e2 : t2 === "document" ? e2.ownerDocument ?? document : t2 === "window" ? ((n3 = e2.ownerDocument) == null ? void 0 : n3.defaultView) ?? window : typeof t2 == "function" ? t2(e2) : t2;
}
function H$2(e2) {
  var n3, i4, I3;
  class t2 extends e2 {
    constructor(...s2) {
      super(...s2);
      l2(this, i4);
      l2(this, n3);
      this[p2] = true;
    }
    connectedCallback() {
      var s2;
      (s2 = super.connectedCallback) == null || s2.call(this), v$2(this, i4, I3).call(this);
    }
    disconnectedCallback() {
      var s2, c2;
      (s2 = a2(this, n3)) == null || s2.abort(), (c2 = super.disconnectedCallback) == null || c2.call(this);
    }
  }
  return n3 = /* @__PURE__ */ new WeakMap(), i4 = /* @__PURE__ */ new WeakSet(), I3 = function() {
    var c2, b3, E2;
    (c2 = a2(this, n3)) == null || c2.abort(), d$2(this, n3, new AbortController());
    const s2 = this.constructor[f$2] || [];
    for (const h3 of s2) {
      const $2 = A$1(this, (b3 = h3.opts) == null ? void 0 : b3.target), T2 = ((E2 = h3.opts) == null ? void 0 : E2.options) ?? {}, W5 = this[h3.method].bind(this);
      for (const x3 of h3.events)
        $2.addEventListener(x3, W5, { ...T2, signal: a2(this, n3).signal });
    }
  }, t2;
}
let C$3 = 1;
function V$1(e2) {
  var n3, i4, r2;
  class t2 extends e2 {
    constructor() {
      super(...arguments);
      l2(this, n3, null);
      l2(this, i4, C$3++);
      l2(this, r2, null);
    }
    /**
     * Clears the cached debug flag so the attribute will be checked again
     * on the next log/warn/error call.
     */
    invalidateDebugCache() {
      d$2(this, n3, null);
    }
    get _debug() {
      return a2(this, n3) !== null ? a2(this, n3) : (this instanceof HTMLElement && d$2(this, n3, this.hasAttribute("debug") && !["false", "0", "off", "no"].includes(this.getAttribute("debug") || "")), a2(this, n3) === true && console.log(`[DEBUG][ID:${a2(this, i4)}] LoggingMixin: Debug mode is enabled for <${this.tagName}>`, this), a2(this, n3) ?? false);
    }
    getLogger(s2 = "main") {
      return a2(this, r2) || d$2(this, r2, new k$2(this._debug, `${a2(this, i4)}`, s2)), a2(this, r2);
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
  return n3 = /* @__PURE__ */ new WeakMap(), i4 = /* @__PURE__ */ new WeakMap(), r2 = /* @__PURE__ */ new WeakMap(), t2;
}
var C$2 = Object.defineProperty;
var _$2 = (n3, t2, r2) => t2 in n3 ? C$2(n3, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : n3[t2] = r2;
var h$1 = (n3, t2, r2) => _$2(n3, typeof t2 != "symbol" ? t2 + "" : t2, r2);
let S$3 = class S {
  constructor(t2, r2 = false) {
    h$1(this, "rootNode");
    h$1(this, "currentContainerNode", null);
    h$1(this, "containerPath", []);
    h$1(this, "containerIndex", [0]);
    h$1(this, "lastFixedI", 20);
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
    const o2 = this.getAttributeRecords(t2, t2.tagName === "HR"), e2 = _$3("section", o2);
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
var w$1 = Object.defineProperty, M$1 = Object.getOwnPropertyDescriptor, O$2 = (n3, t2, r2) => t2 in n3 ? w$1(n3, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : n3[t2] = r2, v$1 = (n3, t2, r2, o2) => {
  for (var e2 = o2 > 1 ? void 0 : o2 ? M$1(t2, r2) : t2, s2 = n3.length - 1, i4; s2 >= 0; s2--)
    (i4 = n3[s2]) && (e2 = (o2 ? i4(t2, r2, e2) : i4(e2)) || e2);
  return o2 && e2 && w$1(t2, r2, e2), e2;
}, R$1 = (n3, t2, r2) => O$2(n3, t2 + "", r2);
let f$1 = class f3 extends i$3 {
  constructor(t2 = "An error occurred", r2) {
    super();
    h$1(this, "originalCode");
    h$1(this, "message");
    this.message = t2, this.originalCode = r2;
  }
  static get is() {
    return "tj-error-element";
  }
  render() {
    return x$4`
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
R$1(f$1, "styles", [r$6($)]);
v$1([
  n$5({ type: String, reflect: true })
], f$1.prototype, "message", 2);
f$1 = v$1([
  t$2("tj-error-element")
], f$1);
function j$2(n3, { allowAttributes: t2 = true, ignoreGaps: r2 = true } = {}) {
  let o2 = "div", e2 = null, s2 = [], i4 = [], l3 = {};
  const d2 = /(^[a-z][\w-]*)|#[\w-]+|\.[\w:-]+|\[\s*([\w-]+)(?:\s*=\s*(['"]?)(.*?)\3)?\s*\]/gi;
  let a3 = 0;
  for (; ; ) {
    const u2 = d2.exec(n3);
    if (!u2 || u2.index !== a3) {
      if (!r2 && u2 && u2.index > a3)
        break;
      break;
    }
    const c2 = u2[0];
    if (c2[0] === "#") e2 = c2.slice(1);
    else if (c2[0] === ".") s2.push(c2.slice(1));
    else if (c2[0] === "[") {
      if (!t2) throw new Error(`Attributes not allowed: '${c2}'`);
      const p3 = u2[2], m2 = u2[4] || void 0;
      i4.push({ name: p3, value: m2 }), l3[p3] = m2;
    } else o2 = c2;
    a3 += c2.length;
  }
  return { tag: o2, id: e2, classes: s2, attrs: i4, attrsMap: l3, length: a3, rest: n3.slice(a3) };
}
function D$3(n3) {
  return typeof n3.beforeLayoutCallback == "function";
}
function F$1(n3, t2, r2) {
  var u2, c2;
  console.log("Applying layout to element:", n3, "with layout:", r2);
  const o2 = /^(\+|-|)([0-9]+\.?[0-9]*);?/, e2 = r2.replace(o2, ""), s2 = j$2(e2), i4 = { class: "" };
  s2.attrsMap.class && (i4.class = s2.attrsMap.class + " "), i4.class += s2.classes.join(" "), i4.id = s2.id, ((u2 = i4.class) == null ? void 0 : u2.trim()) === "" && delete i4.class, ((c2 = i4.id) == null ? void 0 : c2.trim()) === "" && delete i4.id;
  const l3 = s2.tag || "div";
  let d2 = false, a3 = _$3(l3, { ...i4, layoutOrig: r2 });
  if (l3.includes("-") && !customElements.get(l3))
    console.warn(`Custom element <${l3}> is not registered.`), a3 = new f$1(`Custom element <${l3}> is not registered.`, n3.outerHTML), n3.replaceWith(a3), a3.append(n3), d2 = true;
  else {
    const p3 = Array.from(n3.children);
    D$3(a3) && (d2 = a3.beforeLayoutCallback(n3, a3, p3) === false), console.log(
      "Replacement element created:",
      a3,
      "with children:",
      p3,
      "skipChildren:",
      d2
    ), a3.__ORIG_ELEMENT__ = n3, a3.append(...Array.from(n3.children)), n3.replaceWith(a3);
  }
  return {
    replacementElement: a3,
    skipChildren: d2
  };
}
function g$1(n3, t2 = {}) {
  console.log("applyLayout called with element:", n3, "and options:", t2);
  const { recursive: r2 = true } = t2;
  let o2 = [];
  if (Array.isArray(n3))
    return n3.forEach((l3) => o2.push(...g$1(l3, t2))), o2;
  if (!(n3 instanceof HTMLElement))
    return [];
  const e2 = n3.getAttribute("layout");
  let s2 = false, i4 = n3;
  if (e2 && ({ replacementElement: i4, skipChildren: s2 } = F$1(n3, t2, e2)), r2 && !s2) {
    const l3 = Array.from(i4.children);
    console.log("Applying layout to children:", l3, "of element:", i4), l3.forEach((d2) => o2.push(...g$1(d2, t2)));
  }
  return o2;
}
var z$3 = (n3, t2, r2, o2) => {
  for (var e2 = t2, s2 = n3.length - 1, i4; s2 >= 0; s2--)
    (i4 = n3[s2]) && (e2 = i4(e2) || e2);
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
    const n3 = new O$3("SectionTreeBuilder");
    await S$4(), super.connectedCallback();
    const t2 = new S$3(this), r2 = Array.from(this.children);
    t2.arrange(r2), g$1(Array.from(this.children), { recursive: true }), n3.lap("after arrange");
  }
};
x$2 = z$3([
  t$2("tj-content-pane")
], x$2);
const P$1 = /* @__PURE__ */ new WeakMap();
function G$2(e2) {
  const t2 = e2.trim();
  if (!t2) return { from: 0, till: 1 / 0 };
  if (t2.startsWith("-")) {
    const r2 = t2.slice(1).trim();
    return { from: 0, till: B$3(r2) };
  }
  if (t2.endsWith("-")) {
    const r2 = t2.slice(0, -1).trim();
    return { from: B$3(r2), till: 1 / 0 };
  }
  const s2 = t2.indexOf("-");
  if (s2 >= 0) {
    const r2 = t2.slice(0, s2).trim(), i4 = t2.slice(s2 + 1).trim(), l3 = B$3(r2), o2 = i4 ? B$3(i4) : 1 / 0;
    return { from: l3, till: o2 };
  }
  return { from: B$3(t2), till: 1 / 0 };
}
function J$1(e2) {
  const t2 = e2.split(" "), s2 = [];
  for (const r2 of t2) {
    if (!r2.includes(":"))
      continue;
    let [i4, l3] = r2.split(":");
    if (!i4 || !l3)
      continue;
    const o2 = G$2(i4), n3 = { from: o2.from, till: o2.till, className: l3 };
    s2.push(n3);
  }
  return s2;
}
function K$1(e2, t2, s2) {
  if (!e2.includes(":")) return e2;
  const r2 = B$3(t2);
  let i4 = e2.split(" ");
  const l3 = J$1(e2);
  for (const o2 of s2)
    i4 = i4.filter((n3) => n3 !== o2);
  for (const o2 of l3)
    i4 = i4.filter((n3) => n3 !== o2.className);
  for (const o2 of l3)
    r2 >= o2.from && r2 < o2.till && (i4.push(o2.className), s2.add(o2.className));
  return i4.join(" ");
}
function Q$1(e2, t2) {
  const s2 = e2.getAttribute("class") || "";
  let r2 = P$1.get(e2);
  r2 || (r2 = /* @__PURE__ */ new Set(), P$1.set(e2, r2));
  const i4 = K$1(s2, t2, r2);
  i4 !== s2 && e2.setAttribute("class", i4);
}
class w extends Error {
  constructor(t2, s2) {
    super(t2), this.context = s2, this.name = "StyleParseError";
  }
}
let W$2 = class W2 extends w {
  constructor(t2, s2) {
    super(t2, s2), this.name = "StyleDeclarationError";
  }
};
function D$2(e2) {
  if (e2.length === 0) return "";
  if (Array.isArray(e2[0]))
    return e2.map((t2) => D$2(t2)).filter((t2) => t2).join("; ");
  {
    const [t2, s2, r2] = e2;
    return `${t2}: ${s2}${r2 ? " !" + r2 : ""}`;
  }
}
function X(e2) {
  return e2[1] + (e2[2] ? " !" + e2[2] : "");
}
function Y$1(e2, t2) {
  const s2 = (a3, f5) => a3, r2 = [];
  let i4 = "";
  const l3 = [];
  let o2 = null, n3 = 0, c2 = 0;
  for (const a3 of e2)
    o2 ? (a3 === o2 && (o2 = null), i4 += a3) : a3 === "'" || a3 === '"' ? (o2 = a3, i4 += a3) : a3 === "(" ? (n3++, i4 += a3) : a3 === ")" ? (s2(n3 === 0, new w("Unmatched closing parenthesis )", M2(c2, e2))), n3 = Math.max(0, n3 - 1), i4 += a3) : a3 === ";" && n3 === 0 ? (l3.push(i4), i4 = "") : i4 += a3, c2++;
  s2(o2 !== null, new w("Unclosed quote", M2(c2 - 1, e2))), s2(n3 > 0, new w("Unbalanced parentheses: missing )", M2(c2 - 1, e2))), i4.trim() && l3.push(i4);
  for (const a3 of l3) {
    const f5 = a3.trim();
    if (!f5) continue;
    let p3 = -1;
    o2 = null, n3 = 0;
    for (let v2 = 0; v2 < f5.length; v2++) {
      const u2 = f5[v2];
      if (o2)
        u2 === o2 && (o2 = null);
      else if (u2 === "'" || u2 === '"') o2 = u2;
      else if (u2 === "(") n3++;
      else if (u2 === ")")
        s2(
          n3 === 0,
          new W$2("Unmatched closing parenthesis ) in declaration", { declaration: f5 })
        ), n3 = Math.max(0, n3 - 1);
      else if (u2 === ":" && n3 === 0) {
        p3 = v2;
        break;
      }
    }
    if (s2(p3 < 1, new W$2("Missing colon (:) in declaration", { declaration: f5 })) && p3 < 1 || p3 < 1) continue;
    const _3 = f5.slice(0, p3).trim();
    let m2 = f5.slice(p3 + 1).trim(), y5;
    /\s*!important\s*$/i.test(m2) && (m2 = m2.replace(/\s*!important\s*$/i, "").trim(), y5 = "important"), _3 && r2.push([_3, m2, y5]);
  }
  return r2;
}
function M2(e2, t2) {
  const s2 = Math.max(0, e2 - 15), r2 = Math.min(t2.length, e2 + 15);
  return {
    index: e2,
    input: t2,
    near: t2.slice(s2, r2)
  };
}
function Z$1(e2, t2) {
  const s2 = Array.from(e2.attributes).filter((n3) => n3.name.startsWith("style-")), r2 = {};
  let i4 = false;
  const l3 = /* @__PURE__ */ new Set();
  for (const n3 of s2) {
    const c2 = n3.name.substring(6), a3 = r2[c2] = Y$1(n3.value || "");
    i4 = true;
    for (const f5 of a3)
      l3.add(f5[0]), e2.style[f5[0]] || e2.style.setProperty(f5[0], "unset");
  }
  if (!i4) return;
  if (!r2.xs) {
    const n3 = [];
    for (const c2 of l3) {
      const a3 = e2.style.getPropertyValue(c2) || "", f5 = e2.style.getPropertyPriority(c2) === "important" ? "important" : void 0;
      n3.push([c2, a3, f5]);
    }
    r2.xs = n3, e2.setAttribute("style-xs", D$2(n3));
  }
  const o2 = /* @__PURE__ */ new Map();
  for (const n3 of m$1)
    if (t2 >= n3.minWidth && r2[n3.name]) {
      const c2 = r2[n3.name];
      for (const a3 of c2)
        o2.set(a3[0], X(a3));
    }
  for (const [n3, c2] of o2)
    e2.style.setProperty(n3, c2);
}
class tt {
  constructor(t2) {
    this.logger = t2, this.observer = null, this.changedElements = /* @__PURE__ */ new Set(), this.debouncer = new N$1(10, 100), this.breakpoint = P$2();
  }
  async processChanges() {
    for (const t2 of this.changedElements)
      this.logger.log("Processing element", t2), Q$1(t2, this.breakpoint), Z$1(t2, y$1[this.breakpoint] || 0), this.changedElements.delete(t2);
  }
  async spoolElement(t2) {
    this.changedElements.has(t2) || (this.changedElements.add(t2), await this.debouncer.wait(), this.processChanges());
  }
  onChange(t2) {
    var s2;
    for (const r2 of t2)
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
  queueAll(t2 = null) {
    t2 === null && (t2 = document.body), t2.querySelectorAll("[class]").forEach((s2) => this.spoolElement(s2)), Array.from(t2.getElementsByTagName("*")).filter((s2) => [...s2.getAttributeNames()].some((r2) => r2.startsWith("style-"))).forEach((s2) => this.spoolElement(s2));
  }
  startObserving(t2) {
    this.observer = new MutationObserver(this.onChange.bind(this)), this.observer.observe(t2, { attributes: true, childList: true, subtree: true });
  }
  stopObserving() {
    var t2;
    (t2 = this.observer) == null || t2.disconnect();
  }
}
var et = Object.create, I2 = Object.defineProperty, st$1 = Object.getOwnPropertyDescriptor, R3 = (e2, t2) => (t2 = Symbol[e2]) ? t2 : Symbol.for("Symbol." + e2), k$1 = (e2) => {
  throw TypeError(e2);
}, rt = (e2, t2, s2) => t2 in e2 ? I2(e2, t2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e2[t2] = s2, it = (e2) => [, , , et((e2 == null ? void 0 : e2[R3("metadata")]) ?? null)], B$2 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], L$2 = (e2) => e2 !== void 0 && typeof e2 != "function" ? k$1("Function expected") : e2, nt = (e2, t2, s2, r2, i4) => ({ kind: B$2[e2], name: t2, metadata: r2, addInitializer: (l3) => s2._ ? k$1("Already initialized") : i4.push(L$2(l3 || null)) }), ot = (e2, t2) => rt(t2, R3("metadata"), e2[3]), at = (e2, t2, s2, r2) => {
  for (var i4 = 0, l3 = e2[t2 >> 1], o2 = l3 && l3.length; i4 < o2; i4++) l3[i4].call(s2);
  return r2;
}, lt = (e2, t2, s2, r2, i4, l3) => {
  for (var o2, n3, c2, a3, f5 = t2 & 7, p3 = false, _3 = false, m2 = 2, y5 = B$2[f5 + 5], v2 = e2[m2] || (e2[m2] = []), u2 = (i4 = i4.prototype, st$1(i4, s2)), C4 = r2.length - 1; C4 >= 0; C4--)
    c2 = nt(f5, s2, n3 = {}, e2[3], v2), c2.static = p3, c2.private = _3, a3 = c2.access = { has: (A2) => s2 in A2 }, a3.get = (A2) => A2[s2], o2 = (0, r2[C4])(u2[y5], c2), n3._ = 1, L$2(o2) && (u2[y5] = o2);
  return u2 && I2(i4, s2, u2), i4;
}, q$1 = (e2, t2, s2) => t2.has(e2) || k$1("Cannot " + s2), h2 = (e2, t2, s2) => (q$1(e2, t2, "read from private field"), t2.get(e2)), z$2 = (e2, t2, s2) => t2.has(e2) ? k$1("Cannot add the same private member more than once") : t2 instanceof WeakSet ? t2.add(e2) : t2.set(e2, s2), N4 = (e2, t2, s2, r2) => (q$1(e2, t2, "write to private field"), t2.set(e2, s2), s2), T$2, x$1, d$1, g, S$2;
let O$1 = class O3 extends (x$1 = H$2(V$1(HTMLElement)), T$2 = [z$4("resize", { target: "window" })], x$1) {
  constructor() {
    super(), at(S$2, 5, this), this.resizeDebouncer = new N$1(50, 500), z$2(this, d$1, P$2()), z$2(this, g, new tt(this.getLogger("observer")));
  }
  static get observedAttributes() {
    return ["width", "height", "orientation"];
  }
  async onResize(t2) {
    await this.resizeDebouncer.wait();
    const s2 = P$2();
    s2 !== h2(this, d$1) && (N4(this, d$1, s2), this.log(`Breakpoint changed to ${h2(this, d$1)}, adjusting layout.`), h2(this, g).breakpoint = h2(this, d$1), h2(this, g).queueAll());
  }
  attributeChangedCallback(t2, s2, r2) {
  }
  connectedCallback() {
    super.connectedCallback(), this.log("TjResponsiveElement connected to the DOM."), N4(this, d$1, P$2()), h2(this, g).breakpoint = h2(this, d$1), h2(this, g).queueAll(), h2(this, g).startObserving(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.log("TjResponsiveElement disconnected from the DOM."), h2(this, g).stopObserving();
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
const u$1 = (e2, s2, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l3 = s2; l3 <= t2; l3++) r2.set(e2[l3], l3);
  return r2;
}, c$1 = e$2(class extends i$2 {
  constructor(e2) {
    if (super(e2), e2.type !== t$1.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t2) {
    let r2;
    void 0 === t2 ? t2 = s2 : void 0 !== s2 && (r2 = s2);
    const l3 = [], o2 = [];
    let i4 = 0;
    for (const s3 of e2) l3[i4] = r2 ? r2(s3, i4) : i4, o2[i4] = t2(s3, i4), i4++;
    return { values: o2, keys: l3 };
  }
  render(e2, s2, t2) {
    return this.dt(e2, s2, t2).values;
  }
  update(s2, [t2, r2, c2]) {
    const d2 = p$3(s2), { values: p3, keys: a3 } = this.dt(t2, r2, c2);
    if (!Array.isArray(d2)) return this.ut = a3, p3;
    const h3 = this.ut ?? (this.ut = []), v2 = [];
    let m2, y5, x3 = 0, j3 = d2.length - 1, k5 = 0, w2 = p3.length - 1;
    for (; x3 <= j3 && k5 <= w2; ) if (null === d2[x3]) x3++;
    else if (null === d2[j3]) j3--;
    else if (h3[x3] === a3[k5]) v2[k5] = v$4(d2[x3], p3[k5]), x3++, k5++;
    else if (h3[j3] === a3[w2]) v2[w2] = v$4(d2[j3], p3[w2]), j3--, w2--;
    else if (h3[x3] === a3[w2]) v2[w2] = v$4(d2[x3], p3[w2]), s$1(s2, v2[w2 + 1], d2[x3]), x3++, w2--;
    else if (h3[j3] === a3[k5]) v2[k5] = v$4(d2[j3], p3[k5]), s$1(s2, d2[x3], d2[j3]), j3--, k5++;
    else if (void 0 === m2 && (m2 = u$1(a3, k5, w2), y5 = u$1(h3, x3, j3)), m2.has(h3[x3])) if (m2.has(h3[j3])) {
      const e2 = y5.get(a3[k5]), t3 = void 0 !== e2 ? d2[e2] : null;
      if (null === t3) {
        const e3 = s$1(s2, d2[x3]);
        v$4(e3, p3[k5]), v2[k5] = e3;
      } else v2[k5] = v$4(t3, p3[k5]), s$1(s2, d2[x3], t3), d2[e2] = null;
      k5++;
    } else M$4(d2[j3]), j3--;
    else M$4(d2[x3]), x3++;
    for (; k5 <= w2; ) {
      const e2 = s$1(s2, v2[w2 + 1]);
      v$4(e2, p3[k5]), v2[k5++] = e2;
    }
    for (; x3 <= j3; ) {
      const e2 = d2[x3++];
      null !== e2 && M$4(e2);
    }
    return this.ut = a3, m$3(s2, v2), T$5;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = "important", i3 = " !" + n$1, o = e$2(class extends i$2 {
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
    return T$5;
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
var k4 = (r2, t2, e2) => (S$1(r2, t2, "read from private field"), e2 ? e2.call(r2) : t2.get(r2)), b$1 = (r2, t2, e2) => t2.has(r2) ? x2("Cannot add the same private member more than once") : t2 instanceof WeakSet ? t2.add(r2) : t2.set(r2, e2), v = (r2, t2, e2, s2) => (S$1(r2, t2, "write to private field"), t2.set(r2, e2), e2);
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
    let { line: i4, column: o2 } = L$1((n3 == null ? void 0 : n3.stack) ?? ""), a3 = String((r2 == null ? void 0 : r2.originalCode) ?? ""), h3 = false;
    r2 != null && r2.originalTemplateString && (i4 -= 2, a3 = r2.originalTemplateString, h3 = true);
    const l3 = a3.split(`
`), g2 = Math.min(Math.max(i4 - 1, 0), l3.length - 1), p3 = l3[g2] ?? "", E2 = Math.min(Math.max((o2 || 1) - 1, 0), p3.length);
    let f5 = " ".repeat(E2 + String(i4).length) + "^^^^";
    h3 && (f5 = "^".repeat(String(p3).length));
    const N5 = l3.map((w2, $2) => $2 === g2 ? `${$2 + 1}: ${w2}
 ${f5}` : `${$2 + 1}: ${w2}`).join(`
`), m2 = `Error while rendering \`${s2}\`: ${n3}
Line ${i4}, Column ${E2 + 1}:

${i4}:${p3}
${f5}

Compiled Template:
${N5}
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
    html: x$4,
    repeat: c$1,
    when: n2,
    styleMap: o,
    classMap: e$1,
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
  } catch (t2) {
    throw t2 instanceof SyntaxError ? new C$1(`Syntax error: ${t2.message}`, r2) : new C$1(String(t2), r2);
  }
}
let W$1 = class W3 extends Error {
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
          let a3 = "null";
          o2[5] && (a3 = o2[1] + " => " + o2[5].trim()), this.testSyntax(t2, i4.name, o2[1]), this.testSyntax(t2, i4.name, o2[3]), this.testSyntax(t2, i4.name, a3), o2[2] === "of" ? s2.push({ start: `$$__litEnv.repeat(${o2[3]}, ${a3}, (${o2[1]}, $index) => `, end: ")" }) : o2[2] === "in" && s2.push({
            start: `$$__litEnv.repeat(Object.keys(${o2[3]}), ${a3}, (${o2[1]}, $index) => `,
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
let _$1 = class _ {
  parse(t2) {
    const e2 = new z$1(t2);
    return new j$1(e2).parseDocument();
  }
};
const O4 = /* @__PURE__ */ new Set([
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
      const h3 = this.s.peek();
      if (h3 === ">") {
        this.s.next();
        break;
      }
      h3 === null && this.s.throwError("Unexpected end of input inside start tag", t2.line, t2.col);
      const l3 = this.parseAttribute();
      s2.push(l3);
    }
    const i4 = e2.toLowerCase();
    if (n3 || O4.has(i4))
      return {
        type: "element",
        tagName: e2,
        attributes: s2,
        children: [],
        isVoid: true
      };
    const a3 = this.parseNodes({ tag: e2, line: t2.line, col: t2.col });
    return {
      type: "element",
      tagName: e2,
      attributes: s2,
      children: a3,
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
let z$1 = class z2 {
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
    B$6(this.render(), t2);
  }
  /**
   * Render the template to a non shadow DOM element.
   *
   * @param element
   */
  renderInElement(t2) {
    B$6(this.render(), t2);
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
function b2(e2, t2) {
  for (const s2 in t2)
    t2[s2] && typeof t2[s2] == "object" && !Array.isArray(t2[s2]) ? (e2[s2] || (e2[s2] = {}), b2(e2[s2], t2[s2])) : e2[s2] = t2[s2];
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
async function W4(e2, t2) {
  const s2 = await fetch(e2);
  s2.ok || t2.throwError(`Failed to load content from ${e2}: ${s2.status} ${s2.statusText}`);
  const r2 = await s2.text(), n3 = _$3("template");
  n3.innerHTML = r2;
  const i4 = n3.content.querySelector("script[scope]");
  return {
    template: r2,
    scope: JSON.parse((i4 == null ? void 0 : i4.textContent) || "null") || null
  };
}
function z3(e2, t2) {
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
    const i4 = await new n3("host", "scope", "console", "fetch", '"use strict"; return (' + r2 + ");")(e2, s2, console, A());
    return S2(i4), i4;
  } catch {
    try {
      const o2 = await new n3("host", "scope", "console", "fetch", '"use strict"; ' + r2)(e2, s2, console, A());
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
function A() {
  if (typeof fetch == "function") return fetch;
  throw new Error("fetch is not available in this environment");
}
var U2 = Object.defineProperty, Y2 = Object.getOwnPropertyDescriptor, P = (e2) => {
  throw TypeError(e2);
}, _2 = (e2, t2, s2, r2) => {
  for (var n3 = r2 > 1 ? void 0 : r2 ? Y2(t2, s2) : t2, c2 = e2.length - 1, i4; c2 >= 0; c2--)
    (i4 = e2[c2]) && (n3 = (r2 ? i4(t2, s2, n3) : i4(n3)) || n3);
  return r2 && n3 && U2(t2, s2, n3), n3;
}, D = (e2, t2, s2) => t2.has(e2) || P("Cannot " + s2), L3 = (e2, t2, s2) => (D(e2, t2, "read from private field"), t2.get(e2)), T = (e2, t2, s2) => t2.has(e2) ? P("Cannot add the same private member more than once") : t2 instanceof WeakSet ? t2.add(e2) : t2.set(e2, s2), C3 = (e2, t2, s2, r2) => (D(e2, t2, "write to private field"), t2.set(e2, s2), s2), m, y4;
let f4 = class extends V$1(y$5) {
  constructor() {
    super(), this.updateOn = "change keyup click", this.src = "", this.srcData = null, this.myProLitTemplate = null, T(this, m), T(this, y4, true), this.$scope = st({}), this.renderInElement = _$3("div", { style: "display: contents" }), C3(this, m, new N$1(50, 200));
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
    this.myProLitTemplate.renderInElement(this.renderInElement), L3(this, y4) && (this._updateScope(), C3(this, y4, false));
  }
  _updateScope() {
    for (const e2 of Array.from(this.querySelectorAll("[name]"))) {
      const t2 = e2.getAttribute("name");
      t2 && e2.value !== void 0 && (this.$scope[t2] = e2.value);
    }
    this.log("Scope updated", this.$scope.$rawPure);
  }
  async _initializeScopeFromInit() {
    await L3(this, m).wait();
    const e2 = {};
    if (this.src && this.src.trim() !== "" ? (this.log("Loading external src", this.src), this.srcData = await W4(this.src, this.getLogger("loadExternalSrc")), this.log("External src loaded", this.srcData)) : (this.srcData = z3(this, this.getLogger("loadInlineTemplate")), this.log("Inline template loaded", this.srcData)), b2(e2, this.srcData.scope), this.scopeInit && this.scopeInit.trim() !== "")
      try {
        this.log("Evaluating scope-init expression", this.scopeInit);
        const t2 = await B(this, this.scopeInit, this.$scope);
        this.log("Scope-init evaluation result", t2), b2(e2, t2);
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
    await S$4(), super.connectedCallback(), this.log("Connected", this.$scope), this._initializeScopeFromInit().catch(() => {
    }).finally(() => {
      this._updateScope(), this._renderTemplates();
    });
  }
};
m = /* @__PURE__ */ new WeakMap();
y4 = /* @__PURE__ */ new WeakMap();
_2([
  n$5({ type: String, reflect: true, attribute: "update-on" })
], f4.prototype, "updateOn", 2);
_2([
  n$5({ type: String, reflect: true, attribute: "init" })
], f4.prototype, "scopeInit", 2);
_2([
  n$5({ type: String, reflect: false, attribute: "src" })
], f4.prototype, "src", 2);
f4 = _2([
  t$2("prolit-scope")
], f4);
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
          var h3, p3, u2;
          if (o2.nodeType === 1) {
            const a3 = o2;
            try {
              (h3 = a3.matches) != null && h3.call(a3, n3) && s2.push(a3);
            } catch {
            }
            try {
              (u2 = (p3 = a3.querySelectorAll) == null ? void 0 : p3.call(a3, n3)) == null || u2.forEach((l3) => s2.push(l3));
            } catch {
            }
          }
        }), i4.addedNodes.forEach((o2) => {
          var h3, p3, u2;
          if (o2.nodeType === 1) {
            console.log("Added node:", o2);
            const a3 = o2;
            try {
              (h3 = a3.matches) != null && h3.call(a3, n3) && r2.push(a3);
            } catch {
            }
            try {
              (u2 = (p3 = a3.querySelectorAll) == null ? void 0 : p3.call(a3, n3)) == null || u2.forEach((l3) => r2.push(l3));
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
      var u2, a3;
      const i4 = this.duration, o2 = this.easing, h3 = this.stagger;
      let p3 = 0;
      for (const l3 of this._elements()) {
        const v2 = c2.get(l3), w2 = l3.getBoundingClientRect();
        if (this._rects.set(l3, w2), v2) {
          const d2 = v2.left - w2.left, x3 = v2.top - w2.top;
          if (d2 || x3) {
            (u2 = this._anims.get(l3)) == null || u2.cancel();
            const F2 = l3.animate(
              [{ transform: `translate(${d2}px, ${x3}px)` }, { transform: "none" }],
              { duration: i4, easing: o2, delay: h3 * p3 }
            );
            this._anims.set(l3, F2);
          }
        } else {
          (a3 = this._anims.get(l3)) == null || a3.cancel();
          const d2 = l3.animate(
            [
              { opacity: 0, transform: "translateY(-6px)" },
              { opacity: 1, transform: "none" }
            ],
            { duration: i4, easing: o2, delay: h3 * p3 }
          );
          this._anims.set(l3, d2);
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
customElements.define("tj-animate-changes", G);
var K2 = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, j2 = (e2, t2, s2, r2) => {
  for (var n3 = r2 > 1 ? void 0 : r2 ? Q(t2, s2) : t2, c2 = e2.length - 1, i4; c2 >= 0; c2--)
    (i4 = e2[c2]) && (n3 = (r2 ? i4(t2, s2, n3) : i4(n3)) || n3);
  return r2 && n3 && K2(t2, s2, n3), n3;
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
j2([
  n$5({ type: String, reflect: false, attribute: "src" })
], E.prototype, "src", 2);
E = j2([
  t$2("tj-include")
], E);
