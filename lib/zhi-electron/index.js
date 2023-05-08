var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x2 + '" is not supported');
});

// ../zhi-common/dist/index.js
var $s = Object.defineProperty;
var Es = (e2, r3, n) => r3 in e2 ? $s(e2, r3, { enumerable: true, configurable: true, writable: true, value: n }) : e2[r3] = n;
var be = (e2, r3, n) => (Es(e2, typeof r3 != "symbol" ? r3 + "" : r3, n), n);
var En = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ks(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var wt = {};
var Ps = {
  get exports() {
    return wt;
  },
  set exports(e2) {
    wt = e2;
  }
};
var kn = {};
var He = {};
var Ar = {};
var rt = {};
var se = {};
var et = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.regexpCode = e2.getEsmExportName = e2.getProperty = e2.safeStringify = e2.stringify = e2.strConcat = e2.addCodeArg = e2.str = e2._ = e2.nil = e2._Code = e2.Name = e2.IDENTIFIER = e2._CodeOrName = void 0;
  class r3 {
  }
  e2._CodeOrName = r3, e2.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class n extends r3 {
    constructor(N2) {
      if (super(), !e2.IDENTIFIER.test(N2))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = N2;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return false;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e2.Name = n;
  class a extends r3 {
    constructor(N2) {
      super(), this._items = typeof N2 == "string" ? [N2] : N2;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return false;
      const N2 = this._items[0];
      return N2 === "" || N2 === '""';
    }
    get str() {
      var N2;
      return (N2 = this._str) !== null && N2 !== void 0 ? N2 : this._str = this._items.reduce((D2, t) => `${D2}${t}`, "");
    }
    get names() {
      var N2;
      return (N2 = this._names) !== null && N2 !== void 0 ? N2 : this._names = this._items.reduce((D2, t) => (t instanceof n && (D2[t.str] = (D2[t.str] || 0) + 1), D2), {});
    }
  }
  e2._Code = a, e2.nil = new a("");
  function d($, ...N2) {
    const D2 = [$[0]];
    let t = 0;
    for (; t < N2.length; )
      y(D2, N2[t]), D2.push($[++t]);
    return new a(D2);
  }
  e2._ = d;
  const o2 = new a("+");
  function p($, ...N2) {
    const D2 = [L($[0])];
    let t = 0;
    for (; t < N2.length; )
      D2.push(o2), y(D2, N2[t]), D2.push(o2, L($[++t]));
    return b(D2), new a(D2);
  }
  e2.str = p;
  function y($, N2) {
    N2 instanceof a ? $.push(...N2._items) : N2 instanceof n ? $.push(N2) : $.push(S(N2));
  }
  e2.addCodeArg = y;
  function b($) {
    let N2 = 1;
    for (; N2 < $.length - 1; ) {
      if ($[N2] === o2) {
        const D2 = v($[N2 - 1], $[N2 + 1]);
        if (D2 !== void 0) {
          $.splice(N2 - 1, 3, D2);
          continue;
        }
        $[N2++] = "+";
      }
      N2++;
    }
  }
  function v($, N2) {
    if (N2 === '""')
      return $;
    if ($ === '""')
      return N2;
    if (typeof $ == "string")
      return N2 instanceof n || $[$.length - 1] !== '"' ? void 0 : typeof N2 != "string" ? `${$.slice(0, -1)}${N2}"` : N2[0] === '"' ? $.slice(0, -1) + N2.slice(1) : void 0;
    if (typeof N2 == "string" && N2[0] === '"' && !($ instanceof n))
      return `"${$}${N2.slice(1)}`;
  }
  function g2($, N2) {
    return N2.emptyStr() ? $ : $.emptyStr() ? N2 : p`${$}${N2}`;
  }
  e2.strConcat = g2;
  function S($) {
    return typeof $ == "number" || typeof $ == "boolean" || $ === null ? $ : L(Array.isArray($) ? $.join(",") : $);
  }
  function z($) {
    return new a(L($));
  }
  e2.stringify = z;
  function L($) {
    return JSON.stringify($).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e2.safeStringify = L;
  function R($) {
    return typeof $ == "string" && e2.IDENTIFIER.test($) ? new a(`.${$}`) : d`[${$}]`;
  }
  e2.getProperty = R;
  function j($) {
    if (typeof $ == "string" && e2.IDENTIFIER.test($))
      return new a(`${$}`);
    throw new Error(`CodeGen: invalid export name: ${$}, use explicit $id name mapping`);
  }
  e2.getEsmExportName = j;
  function T($) {
    return new a($.toString());
  }
  e2.regexpCode = T;
})(et);
var Bt = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.ValueScope = e2.ValueScopeName = e2.Scope = e2.varKinds = e2.UsedValueState = void 0;
  const r3 = et;
  class n extends Error {
    constructor(v) {
      super(`CodeGen: "code" for ${v} not defined`), this.value = v.value;
    }
  }
  var a;
  (function(b) {
    b[b.Started = 0] = "Started", b[b.Completed = 1] = "Completed";
  })(a = e2.UsedValueState || (e2.UsedValueState = {})), e2.varKinds = {
    const: new r3.Name("const"),
    let: new r3.Name("let"),
    var: new r3.Name("var")
  };
  class d {
    constructor({ prefixes: v, parent: g2 } = {}) {
      this._names = {}, this._prefixes = v, this._parent = g2;
    }
    toName(v) {
      return v instanceof r3.Name ? v : this.name(v);
    }
    name(v) {
      return new r3.Name(this._newName(v));
    }
    _newName(v) {
      const g2 = this._names[v] || this._nameGroup(v);
      return `${v}${g2.index++}`;
    }
    _nameGroup(v) {
      var g2, S;
      if (!((S = (g2 = this._parent) === null || g2 === void 0 ? void 0 : g2._prefixes) === null || S === void 0) && S.has(v) || this._prefixes && !this._prefixes.has(v))
        throw new Error(`CodeGen: prefix "${v}" is not allowed in this scope`);
      return this._names[v] = { prefix: v, index: 0 };
    }
  }
  e2.Scope = d;
  class o2 extends r3.Name {
    constructor(v, g2) {
      super(g2), this.prefix = v;
    }
    setValue(v, { property: g2, itemIndex: S }) {
      this.value = v, this.scopePath = (0, r3._)`.${new r3.Name(g2)}[${S}]`;
    }
  }
  e2.ValueScopeName = o2;
  const p = (0, r3._)`\n`;
  class y extends d {
    constructor(v) {
      super(v), this._values = {}, this._scope = v.scope, this.opts = { ...v, _n: v.lines ? p : r3.nil };
    }
    get() {
      return this._scope;
    }
    name(v) {
      return new o2(v, this._newName(v));
    }
    value(v, g2) {
      var S;
      if (g2.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const z = this.toName(v), { prefix: L } = z, R = (S = g2.key) !== null && S !== void 0 ? S : g2.ref;
      let j = this._values[L];
      if (j) {
        const N2 = j.get(R);
        if (N2)
          return N2;
      } else
        j = this._values[L] = /* @__PURE__ */ new Map();
      j.set(R, z);
      const T = this._scope[L] || (this._scope[L] = []), $ = T.length;
      return T[$] = g2.ref, z.setValue(g2, { property: L, itemIndex: $ }), z;
    }
    getValue(v, g2) {
      const S = this._values[v];
      if (S)
        return S.get(g2);
    }
    scopeRefs(v, g2 = this._values) {
      return this._reduceValues(g2, (S) => {
        if (S.scopePath === void 0)
          throw new Error(`CodeGen: name "${S}" has no value`);
        return (0, r3._)`${v}${S.scopePath}`;
      });
    }
    scopeCode(v = this._values, g2, S) {
      return this._reduceValues(v, (z) => {
        if (z.value === void 0)
          throw new Error(`CodeGen: name "${z}" has no value`);
        return z.value.code;
      }, g2, S);
    }
    _reduceValues(v, g2, S = {}, z) {
      let L = r3.nil;
      for (const R in v) {
        const j = v[R];
        if (!j)
          continue;
        const T = S[R] = S[R] || /* @__PURE__ */ new Map();
        j.forEach(($) => {
          if (T.has($))
            return;
          T.set($, a.Started);
          let N2 = g2($);
          if (N2) {
            const D2 = this.opts.es5 ? e2.varKinds.var : e2.varKinds.const;
            L = (0, r3._)`${L}${D2} ${$} = ${N2};${this.opts._n}`;
          } else if (N2 = z == null ? void 0 : z($))
            L = (0, r3._)`${L}${N2}${this.opts._n}`;
          else
            throw new n($);
          T.set($, a.Completed);
        });
      }
      return L;
    }
  }
  e2.ValueScope = y;
})(Bt);
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.or = e2.and = e2.not = e2.CodeGen = e2.operators = e2.varKinds = e2.ValueScopeName = e2.ValueScope = e2.Scope = e2.Name = e2.regexpCode = e2.stringify = e2.getProperty = e2.nil = e2.strConcat = e2.str = e2._ = void 0;
  const r3 = et, n = Bt;
  var a = et;
  Object.defineProperty(e2, "_", { enumerable: true, get: function() {
    return a._;
  } }), Object.defineProperty(e2, "str", { enumerable: true, get: function() {
    return a.str;
  } }), Object.defineProperty(e2, "strConcat", { enumerable: true, get: function() {
    return a.strConcat;
  } }), Object.defineProperty(e2, "nil", { enumerable: true, get: function() {
    return a.nil;
  } }), Object.defineProperty(e2, "getProperty", { enumerable: true, get: function() {
    return a.getProperty;
  } }), Object.defineProperty(e2, "stringify", { enumerable: true, get: function() {
    return a.stringify;
  } }), Object.defineProperty(e2, "regexpCode", { enumerable: true, get: function() {
    return a.regexpCode;
  } }), Object.defineProperty(e2, "Name", { enumerable: true, get: function() {
    return a.Name;
  } });
  var d = Bt;
  Object.defineProperty(e2, "Scope", { enumerable: true, get: function() {
    return d.Scope;
  } }), Object.defineProperty(e2, "ValueScope", { enumerable: true, get: function() {
    return d.ValueScope;
  } }), Object.defineProperty(e2, "ValueScopeName", { enumerable: true, get: function() {
    return d.ValueScopeName;
  } }), Object.defineProperty(e2, "varKinds", { enumerable: true, get: function() {
    return d.varKinds;
  } }), e2.operators = {
    GT: new r3._Code(">"),
    GTE: new r3._Code(">="),
    LT: new r3._Code("<"),
    LTE: new r3._Code("<="),
    EQ: new r3._Code("==="),
    NEQ: new r3._Code("!=="),
    NOT: new r3._Code("!"),
    OR: new r3._Code("||"),
    AND: new r3._Code("&&"),
    ADD: new r3._Code("+")
  };
  class o2 {
    optimizeNodes() {
      return this;
    }
    optimizeNames(l, w2) {
      return this;
    }
  }
  class p extends o2 {
    constructor(l, w2, I) {
      super(), this.varKind = l, this.name = w2, this.rhs = I;
    }
    render({ es5: l, _n: w2 }) {
      const I = l ? n.varKinds.var : this.varKind, K = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${I} ${this.name}${K};` + w2;
    }
    optimizeNames(l, w2) {
      if (l[this.name.str])
        return this.rhs && (this.rhs = V(this.rhs, l, w2)), this;
    }
    get names() {
      return this.rhs instanceof r3._CodeOrName ? this.rhs.names : {};
    }
  }
  class y extends o2 {
    constructor(l, w2, I) {
      super(), this.lhs = l, this.rhs = w2, this.sideEffects = I;
    }
    render({ _n: l }) {
      return `${this.lhs} = ${this.rhs};` + l;
    }
    optimizeNames(l, w2) {
      if (!(this.lhs instanceof r3.Name && !l[this.lhs.str] && !this.sideEffects))
        return this.rhs = V(this.rhs, l, w2), this;
    }
    get names() {
      const l = this.lhs instanceof r3.Name ? {} : { ...this.lhs.names };
      return H(l, this.rhs);
    }
  }
  class b extends y {
    constructor(l, w2, I, K) {
      super(l, I, K), this.op = w2;
    }
    render({ _n: l }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + l;
    }
  }
  class v extends o2 {
    constructor(l) {
      super(), this.label = l, this.names = {};
    }
    render({ _n: l }) {
      return `${this.label}:` + l;
    }
  }
  class g2 extends o2 {
    constructor(l) {
      super(), this.label = l, this.names = {};
    }
    render({ _n: l }) {
      return `break${this.label ? ` ${this.label}` : ""};` + l;
    }
  }
  class S extends o2 {
    constructor(l) {
      super(), this.error = l;
    }
    render({ _n: l }) {
      return `throw ${this.error};` + l;
    }
    get names() {
      return this.error.names;
    }
  }
  class z extends o2 {
    constructor(l) {
      super(), this.code = l;
    }
    render({ _n: l }) {
      return `${this.code};` + l;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(l, w2) {
      return this.code = V(this.code, l, w2), this;
    }
    get names() {
      return this.code instanceof r3._CodeOrName ? this.code.names : {};
    }
  }
  class L extends o2 {
    constructor(l = []) {
      super(), this.nodes = l;
    }
    render(l) {
      return this.nodes.reduce((w2, I) => w2 + I.render(l), "");
    }
    optimizeNodes() {
      const { nodes: l } = this;
      let w2 = l.length;
      for (; w2--; ) {
        const I = l[w2].optimizeNodes();
        Array.isArray(I) ? l.splice(w2, 1, ...I) : I ? l[w2] = I : l.splice(w2, 1);
      }
      return l.length > 0 ? this : void 0;
    }
    optimizeNames(l, w2) {
      const { nodes: I } = this;
      let K = I.length;
      for (; K--; ) {
        const W = I[K];
        W.optimizeNames(l, w2) || (G(l, W.names), I.splice(K, 1));
      }
      return I.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((l, w2) => U(l, w2.names), {});
    }
  }
  class R extends L {
    render(l) {
      return "{" + l._n + super.render(l) + "}" + l._n;
    }
  }
  class j extends L {
  }
  class T extends R {
  }
  T.kind = "else";
  class $ extends R {
    constructor(l, w2) {
      super(w2), this.condition = l;
    }
    render(l) {
      let w2 = `if(${this.condition})` + super.render(l);
      return this.else && (w2 += "else " + this.else.render(l)), w2;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const l = this.condition;
      if (l === true)
        return this.nodes;
      let w2 = this.else;
      if (w2) {
        const I = w2.optimizeNodes();
        w2 = this.else = Array.isArray(I) ? new T(I) : I;
      }
      if (w2)
        return l === false ? w2 instanceof $ ? w2 : w2.nodes : this.nodes.length ? this : new $(_2(l), w2 instanceof $ ? [w2] : w2.nodes);
      if (!(l === false || !this.nodes.length))
        return this;
    }
    optimizeNames(l, w2) {
      var I;
      if (this.else = (I = this.else) === null || I === void 0 ? void 0 : I.optimizeNames(l, w2), !!(super.optimizeNames(l, w2) || this.else))
        return this.condition = V(this.condition, l, w2), this;
    }
    get names() {
      const l = super.names;
      return H(l, this.condition), this.else && U(l, this.else.names), l;
    }
  }
  $.kind = "if";
  class N2 extends R {
  }
  N2.kind = "for";
  class D2 extends N2 {
    constructor(l) {
      super(), this.iteration = l;
    }
    render(l) {
      return `for(${this.iteration})` + super.render(l);
    }
    optimizeNames(l, w2) {
      if (super.optimizeNames(l, w2))
        return this.iteration = V(this.iteration, l, w2), this;
    }
    get names() {
      return U(super.names, this.iteration.names);
    }
  }
  class t extends N2 {
    constructor(l, w2, I, K) {
      super(), this.varKind = l, this.name = w2, this.from = I, this.to = K;
    }
    render(l) {
      const w2 = l.es5 ? n.varKinds.var : this.varKind, { name: I, from: K, to: W } = this;
      return `for(${w2} ${I}=${K}; ${I}<${W}; ${I}++)` + super.render(l);
    }
    get names() {
      const l = H(super.names, this.from);
      return H(l, this.to);
    }
  }
  class u2 extends N2 {
    constructor(l, w2, I, K) {
      super(), this.loop = l, this.varKind = w2, this.name = I, this.iterable = K;
    }
    render(l) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(l);
    }
    optimizeNames(l, w2) {
      if (super.optimizeNames(l, w2))
        return this.iterable = V(this.iterable, l, w2), this;
    }
    get names() {
      return U(super.names, this.iterable.names);
    }
  }
  class s extends R {
    constructor(l, w2, I) {
      super(), this.name = l, this.args = w2, this.async = I;
    }
    render(l) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(l);
    }
  }
  s.kind = "func";
  class i2 extends L {
    render(l) {
      return "return " + super.render(l);
    }
  }
  i2.kind = "return";
  class c extends R {
    render(l) {
      let w2 = "try" + super.render(l);
      return this.catch && (w2 += this.catch.render(l)), this.finally && (w2 += this.finally.render(l)), w2;
    }
    optimizeNodes() {
      var l, w2;
      return super.optimizeNodes(), (l = this.catch) === null || l === void 0 || l.optimizeNodes(), (w2 = this.finally) === null || w2 === void 0 || w2.optimizeNodes(), this;
    }
    optimizeNames(l, w2) {
      var I, K;
      return super.optimizeNames(l, w2), (I = this.catch) === null || I === void 0 || I.optimizeNames(l, w2), (K = this.finally) === null || K === void 0 || K.optimizeNames(l, w2), this;
    }
    get names() {
      const l = super.names;
      return this.catch && U(l, this.catch.names), this.finally && U(l, this.finally.names), l;
    }
  }
  class m extends R {
    constructor(l) {
      super(), this.error = l;
    }
    render(l) {
      return `catch(${this.error})` + super.render(l);
    }
  }
  m.kind = "catch";
  class h2 extends R {
    render(l) {
      return "finally" + super.render(l);
    }
  }
  h2.kind = "finally";
  class C {
    constructor(l, w2 = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...w2, _n: w2.lines ? `
` : "" }, this._extScope = l, this._scope = new n.Scope({ parent: l }), this._nodes = [new j()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(l) {
      return this._scope.name(l);
    }
    // reserves unique name in the external scope
    scopeName(l) {
      return this._extScope.name(l);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(l, w2) {
      const I = this._extScope.value(l, w2);
      return (this._values[I.prefix] || (this._values[I.prefix] = /* @__PURE__ */ new Set())).add(I), I;
    }
    getScopeValue(l, w2) {
      return this._extScope.getValue(l, w2);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(l) {
      return this._extScope.scopeRefs(l, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(l, w2, I, K) {
      const W = this._scope.toName(w2);
      return I !== void 0 && K && (this._constants[W.str] = I), this._leafNode(new p(l, W, I)), W;
    }
    // `const` declaration (`var` in es5 mode)
    const(l, w2, I) {
      return this._def(n.varKinds.const, l, w2, I);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(l, w2, I) {
      return this._def(n.varKinds.let, l, w2, I);
    }
    // `var` declaration with optional assignment
    var(l, w2, I) {
      return this._def(n.varKinds.var, l, w2, I);
    }
    // assignment code
    assign(l, w2, I) {
      return this._leafNode(new y(l, w2, I));
    }
    // `+=` code
    add(l, w2) {
      return this._leafNode(new b(l, e2.operators.ADD, w2));
    }
    // appends passed SafeExpr to code or executes Block
    code(l) {
      return typeof l == "function" ? l() : l !== r3.nil && this._leafNode(new z(l)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...l) {
      const w2 = ["{"];
      for (const [I, K] of l)
        w2.length > 1 && w2.push(","), w2.push(I), (I !== K || this.opts.es5) && (w2.push(":"), (0, r3.addCodeArg)(w2, K));
      return w2.push("}"), new r3._Code(w2);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(l, w2, I) {
      if (this._blockNode(new $(l)), w2 && I)
        this.code(w2).else().code(I).endIf();
      else if (w2)
        this.code(w2).endIf();
      else if (I)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(l) {
      return this._elseNode(new $(l));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new T());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode($, T);
    }
    _for(l, w2) {
      return this._blockNode(l), w2 && this.code(w2).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(l, w2) {
      return this._for(new D2(l), w2);
    }
    // `for` statement for a range of values
    forRange(l, w2, I, K, W = this.opts.es5 ? n.varKinds.var : n.varKinds.let) {
      const re = this._scope.toName(l);
      return this._for(new t(W, re, w2, I), () => K(re));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(l, w2, I, K = n.varKinds.const) {
      const W = this._scope.toName(l);
      if (this.opts.es5) {
        const re = w2 instanceof r3.Name ? w2 : this.var("_arr", w2);
        return this.forRange("_i", 0, (0, r3._)`${re}.length`, (ae) => {
          this.var(W, (0, r3._)`${re}[${ae}]`), I(W);
        });
      }
      return this._for(new u2("of", K, W, w2), () => I(W));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(l, w2, I, K = this.opts.es5 ? n.varKinds.var : n.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(l, (0, r3._)`Object.keys(${w2})`, I);
      const W = this._scope.toName(l);
      return this._for(new u2("in", K, W, w2), () => I(W));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(N2);
    }
    // `label` statement
    label(l) {
      return this._leafNode(new v(l));
    }
    // `break` statement
    break(l) {
      return this._leafNode(new g2(l));
    }
    // `return` statement
    return(l) {
      const w2 = new i2();
      if (this._blockNode(w2), this.code(l), w2.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(i2);
    }
    // `try` statement
    try(l, w2, I) {
      if (!w2 && !I)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const K = new c();
      if (this._blockNode(K), this.code(l), w2) {
        const W = this.name("e");
        this._currNode = K.catch = new m(W), w2(W);
      }
      return I && (this._currNode = K.finally = new h2(), this.code(I)), this._endBlockNode(m, h2);
    }
    // `throw` statement
    throw(l) {
      return this._leafNode(new S(l));
    }
    // start self-balancing block
    block(l, w2) {
      return this._blockStarts.push(this._nodes.length), l && this.code(l).endBlock(w2), this;
    }
    // end the current self-balancing block
    endBlock(l) {
      const w2 = this._blockStarts.pop();
      if (w2 === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const I = this._nodes.length - w2;
      if (I < 0 || l !== void 0 && I !== l)
        throw new Error(`CodeGen: wrong number of nodes: ${I} vs ${l} expected`);
      return this._nodes.length = w2, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(l, w2 = r3.nil, I, K) {
      return this._blockNode(new s(l, w2, I)), K && this.code(K).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(s);
    }
    optimize(l = 1) {
      for (; l-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(l) {
      return this._currNode.nodes.push(l), this;
    }
    _blockNode(l) {
      this._currNode.nodes.push(l), this._nodes.push(l);
    }
    _endBlockNode(l, w2) {
      const I = this._currNode;
      if (I instanceof l || w2 && I instanceof w2)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${w2 ? `${l.kind}/${w2.kind}` : l.kind}"`);
    }
    _elseNode(l) {
      const w2 = this._currNode;
      if (!(w2 instanceof $))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = w2.else = l, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const l = this._nodes;
      return l[l.length - 1];
    }
    set _currNode(l) {
      const w2 = this._nodes;
      w2[w2.length - 1] = l;
    }
  }
  e2.CodeGen = C;
  function U(O, l) {
    for (const w2 in l)
      O[w2] = (O[w2] || 0) + (l[w2] || 0);
    return O;
  }
  function H(O, l) {
    return l instanceof r3._CodeOrName ? U(O, l.names) : O;
  }
  function V(O, l, w2) {
    if (O instanceof r3.Name)
      return I(O);
    if (!K(O))
      return O;
    return new r3._Code(O._items.reduce((W, re) => (re instanceof r3.Name && (re = I(re)), re instanceof r3._Code ? W.push(...re._items) : W.push(re), W), []));
    function I(W) {
      const re = w2[W.str];
      return re === void 0 || l[W.str] !== 1 ? W : (delete l[W.str], re);
    }
    function K(W) {
      return W instanceof r3._Code && W._items.some((re) => re instanceof r3.Name && l[re.str] === 1 && w2[re.str] !== void 0);
    }
  }
  function G(O, l) {
    for (const w2 in l)
      O[w2] = (O[w2] || 0) - (l[w2] || 0);
  }
  function _2(O) {
    return typeof O == "boolean" || typeof O == "number" || O === null ? !O : (0, r3._)`!${F(O)}`;
  }
  e2.not = _2;
  const q = k(e2.operators.AND);
  function J(...O) {
    return O.reduce(q);
  }
  e2.and = J;
  const Z = k(e2.operators.OR);
  function B(...O) {
    return O.reduce(Z);
  }
  e2.or = B;
  function k(O) {
    return (l, w2) => l === r3.nil ? w2 : w2 === r3.nil ? l : (0, r3._)`${F(l)} ${O} ${F(w2)}`;
  }
  function F(O) {
    return O instanceof r3.Name ? O : (0, r3._)`(${O})`;
  }
})(se);
var ie = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.checkStrictMode = e2.getErrorPath = e2.Type = e2.useFunc = e2.setEvaluated = e2.evaluatedPropsToName = e2.mergeEvaluated = e2.eachItem = e2.unescapeJsonPointer = e2.escapeJsonPointer = e2.escapeFragment = e2.unescapeFragment = e2.schemaRefOrVal = e2.schemaHasRulesButRef = e2.schemaHasRules = e2.checkUnknownRules = e2.alwaysValidSchema = e2.toHash = void 0;
  const r3 = se, n = et;
  function a(s) {
    const i2 = {};
    for (const c of s)
      i2[c] = true;
    return i2;
  }
  e2.toHash = a;
  function d(s, i2) {
    return typeof i2 == "boolean" ? i2 : Object.keys(i2).length === 0 ? true : (o2(s, i2), !p(i2, s.self.RULES.all));
  }
  e2.alwaysValidSchema = d;
  function o2(s, i2 = s.schema) {
    const { opts: c, self: m } = s;
    if (!c.strictSchema || typeof i2 == "boolean")
      return;
    const h2 = m.RULES.keywords;
    for (const C in i2)
      h2[C] || u2(s, `unknown keyword: "${C}"`);
  }
  e2.checkUnknownRules = o2;
  function p(s, i2) {
    if (typeof s == "boolean")
      return !s;
    for (const c in s)
      if (i2[c])
        return true;
    return false;
  }
  e2.schemaHasRules = p;
  function y(s, i2) {
    if (typeof s == "boolean")
      return !s;
    for (const c in s)
      if (c !== "$ref" && i2.all[c])
        return true;
    return false;
  }
  e2.schemaHasRulesButRef = y;
  function b({ topSchemaRef: s, schemaPath: i2 }, c, m, h2) {
    if (!h2) {
      if (typeof c == "number" || typeof c == "boolean")
        return c;
      if (typeof c == "string")
        return (0, r3._)`${c}`;
    }
    return (0, r3._)`${s}${i2}${(0, r3.getProperty)(m)}`;
  }
  e2.schemaRefOrVal = b;
  function v(s) {
    return z(decodeURIComponent(s));
  }
  e2.unescapeFragment = v;
  function g2(s) {
    return encodeURIComponent(S(s));
  }
  e2.escapeFragment = g2;
  function S(s) {
    return typeof s == "number" ? `${s}` : s.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  e2.escapeJsonPointer = S;
  function z(s) {
    return s.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  e2.unescapeJsonPointer = z;
  function L(s, i2) {
    if (Array.isArray(s))
      for (const c of s)
        i2(c);
    else
      i2(s);
  }
  e2.eachItem = L;
  function R({ mergeNames: s, mergeToName: i2, mergeValues: c, resultToName: m }) {
    return (h2, C, U, H) => {
      const V = U === void 0 ? C : U instanceof r3.Name ? (C instanceof r3.Name ? s(h2, C, U) : i2(h2, C, U), U) : C instanceof r3.Name ? (i2(h2, U, C), C) : c(C, U);
      return H === r3.Name && !(V instanceof r3.Name) ? m(h2, V) : V;
    };
  }
  e2.mergeEvaluated = {
    props: R({
      mergeNames: (s, i2, c) => s.if((0, r3._)`${c} !== true && ${i2} !== undefined`, () => {
        s.if((0, r3._)`${i2} === true`, () => s.assign(c, true), () => s.assign(c, (0, r3._)`${c} || {}`).code((0, r3._)`Object.assign(${c}, ${i2})`));
      }),
      mergeToName: (s, i2, c) => s.if((0, r3._)`${c} !== true`, () => {
        i2 === true ? s.assign(c, true) : (s.assign(c, (0, r3._)`${c} || {}`), T(s, c, i2));
      }),
      mergeValues: (s, i2) => s === true ? true : { ...s, ...i2 },
      resultToName: j
    }),
    items: R({
      mergeNames: (s, i2, c) => s.if((0, r3._)`${c} !== true && ${i2} !== undefined`, () => s.assign(c, (0, r3._)`${i2} === true ? true : ${c} > ${i2} ? ${c} : ${i2}`)),
      mergeToName: (s, i2, c) => s.if((0, r3._)`${c} !== true`, () => s.assign(c, i2 === true ? true : (0, r3._)`${c} > ${i2} ? ${c} : ${i2}`)),
      mergeValues: (s, i2) => s === true ? true : Math.max(s, i2),
      resultToName: (s, i2) => s.var("items", i2)
    })
  };
  function j(s, i2) {
    if (i2 === true)
      return s.var("props", true);
    const c = s.var("props", (0, r3._)`{}`);
    return i2 !== void 0 && T(s, c, i2), c;
  }
  e2.evaluatedPropsToName = j;
  function T(s, i2, c) {
    Object.keys(c).forEach((m) => s.assign((0, r3._)`${i2}${(0, r3.getProperty)(m)}`, true));
  }
  e2.setEvaluated = T;
  const $ = {};
  function N2(s, i2) {
    return s.scopeValue("func", {
      ref: i2,
      code: $[i2.code] || ($[i2.code] = new n._Code(i2.code))
    });
  }
  e2.useFunc = N2;
  var D2;
  (function(s) {
    s[s.Num = 0] = "Num", s[s.Str = 1] = "Str";
  })(D2 = e2.Type || (e2.Type = {}));
  function t(s, i2, c) {
    if (s instanceof r3.Name) {
      const m = i2 === D2.Num;
      return c ? m ? (0, r3._)`"[" + ${s} + "]"` : (0, r3._)`"['" + ${s} + "']"` : m ? (0, r3._)`"/" + ${s}` : (0, r3._)`"/" + ${s}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return c ? (0, r3.getProperty)(s).toString() : "/" + S(s);
  }
  e2.getErrorPath = t;
  function u2(s, i2, c = s.opts.strictSchema) {
    if (c) {
      if (i2 = `strict mode: ${i2}`, c === true)
        throw new Error(i2);
      s.self.logger.warn(i2);
    }
  }
  e2.checkStrictMode = u2;
})(ie);
var Qe = {};
Object.defineProperty(Qe, "__esModule", { value: true });
var Pe = se;
var Ss = {
  // validation function arguments
  data: new Pe.Name("data"),
  // args passed from referencing schema
  valCxt: new Pe.Name("valCxt"),
  instancePath: new Pe.Name("instancePath"),
  parentData: new Pe.Name("parentData"),
  parentDataProperty: new Pe.Name("parentDataProperty"),
  rootData: new Pe.Name("rootData"),
  dynamicAnchors: new Pe.Name("dynamicAnchors"),
  // function scoped variables
  vErrors: new Pe.Name("vErrors"),
  errors: new Pe.Name("errors"),
  this: new Pe.Name("this"),
  // "globals"
  self: new Pe.Name("self"),
  scope: new Pe.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Pe.Name("json"),
  jsonPos: new Pe.Name("jsonPos"),
  jsonLen: new Pe.Name("jsonLen"),
  jsonPart: new Pe.Name("jsonPart")
};
Qe.default = Ss;
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.extendErrors = e2.resetErrorsCount = e2.reportExtraError = e2.reportError = e2.keyword$DataError = e2.keywordError = void 0;
  const r3 = se, n = ie, a = Qe;
  e2.keywordError = {
    message: ({ keyword: T }) => (0, r3.str)`must pass "${T}" keyword validation`
  }, e2.keyword$DataError = {
    message: ({ keyword: T, schemaType: $ }) => $ ? (0, r3.str)`"${T}" keyword must be ${$} ($data)` : (0, r3.str)`"${T}" keyword is invalid ($data)`
  };
  function d(T, $ = e2.keywordError, N2, D2) {
    const { it: t } = T, { gen: u2, compositeRule: s, allErrors: i2 } = t, c = S(T, $, N2);
    D2 ?? (s || i2) ? b(u2, c) : v(t, (0, r3._)`[${c}]`);
  }
  e2.reportError = d;
  function o2(T, $ = e2.keywordError, N2) {
    const { it: D2 } = T, { gen: t, compositeRule: u2, allErrors: s } = D2, i2 = S(T, $, N2);
    b(t, i2), u2 || s || v(D2, a.default.vErrors);
  }
  e2.reportExtraError = o2;
  function p(T, $) {
    T.assign(a.default.errors, $), T.if((0, r3._)`${a.default.vErrors} !== null`, () => T.if($, () => T.assign((0, r3._)`${a.default.vErrors}.length`, $), () => T.assign(a.default.vErrors, null)));
  }
  e2.resetErrorsCount = p;
  function y({ gen: T, keyword: $, schemaValue: N2, data: D2, errsCount: t, it: u2 }) {
    if (t === void 0)
      throw new Error("ajv implementation error");
    const s = T.name("err");
    T.forRange("i", t, a.default.errors, (i2) => {
      T.const(s, (0, r3._)`${a.default.vErrors}[${i2}]`), T.if((0, r3._)`${s}.instancePath === undefined`, () => T.assign((0, r3._)`${s}.instancePath`, (0, r3.strConcat)(a.default.instancePath, u2.errorPath))), T.assign((0, r3._)`${s}.schemaPath`, (0, r3.str)`${u2.errSchemaPath}/${$}`), u2.opts.verbose && (T.assign((0, r3._)`${s}.schema`, N2), T.assign((0, r3._)`${s}.data`, D2));
    });
  }
  e2.extendErrors = y;
  function b(T, $) {
    const N2 = T.const("err", $);
    T.if((0, r3._)`${a.default.vErrors} === null`, () => T.assign(a.default.vErrors, (0, r3._)`[${N2}]`), (0, r3._)`${a.default.vErrors}.push(${N2})`), T.code((0, r3._)`${a.default.errors}++`);
  }
  function v(T, $) {
    const { gen: N2, validateName: D2, schemaEnv: t } = T;
    t.$async ? N2.throw((0, r3._)`new ${T.ValidationError}(${$})`) : (N2.assign((0, r3._)`${D2}.errors`, $), N2.return(false));
  }
  const g2 = {
    keyword: new r3.Name("keyword"),
    schemaPath: new r3.Name("schemaPath"),
    params: new r3.Name("params"),
    propertyName: new r3.Name("propertyName"),
    message: new r3.Name("message"),
    schema: new r3.Name("schema"),
    parentSchema: new r3.Name("parentSchema")
  };
  function S(T, $, N2) {
    const { createErrors: D2 } = T.it;
    return D2 === false ? (0, r3._)`{}` : z(T, $, N2);
  }
  function z(T, $, N2 = {}) {
    const { gen: D2, it: t } = T, u2 = [
      L(t, N2),
      R(T, N2)
    ];
    return j(T, $, u2), D2.object(...u2);
  }
  function L({ errorPath: T }, { instancePath: $ }) {
    const N2 = $ ? (0, r3.str)`${T}${(0, n.getErrorPath)($, n.Type.Str)}` : T;
    return [a.default.instancePath, (0, r3.strConcat)(a.default.instancePath, N2)];
  }
  function R({ keyword: T, it: { errSchemaPath: $ } }, { schemaPath: N2, parentSchema: D2 }) {
    let t = D2 ? $ : (0, r3.str)`${$}/${T}`;
    return N2 && (t = (0, r3.str)`${t}${(0, n.getErrorPath)(N2, n.Type.Str)}`), [g2.schemaPath, t];
  }
  function j(T, { params: $, message: N2 }, D2) {
    const { keyword: t, data: u2, schemaValue: s, it: i2 } = T, { opts: c, propertyName: m, topSchemaRef: h2, schemaPath: C } = i2;
    D2.push([g2.keyword, t], [g2.params, typeof $ == "function" ? $(T) : $ || (0, r3._)`{}`]), c.messages && D2.push([g2.message, typeof N2 == "function" ? N2(T) : N2]), c.verbose && D2.push([g2.schema, s], [g2.parentSchema, (0, r3._)`${h2}${C}`], [a.default.data, u2]), m && D2.push([g2.propertyName, m]);
  }
})(rt);
Object.defineProperty(Ar, "__esModule", { value: true });
Ar.boolOrEmptySchema = Ar.topBoolOrEmptySchema = void 0;
var Cs = rt;
var Ts = se;
var js = Qe;
var Ns = {
  message: "boolean schema is false"
};
function Os(e2) {
  const { gen: r3, schema: n, validateName: a } = e2;
  n === false ? Pn(e2, false) : typeof n == "object" && n.$async === true ? r3.return(js.default.data) : (r3.assign((0, Ts._)`${a}.errors`, null), r3.return(true));
}
Ar.topBoolOrEmptySchema = Os;
function Rs(e2, r3) {
  const { gen: n, schema: a } = e2;
  a === false ? (n.var(r3, false), Pn(e2)) : n.var(r3, true);
}
Ar.boolOrEmptySchema = Rs;
function Pn(e2, r3) {
  const { gen: n, data: a } = e2, d = {
    gen: n,
    keyword: "false schema",
    data: a,
    schema: false,
    schemaCode: false,
    schemaValue: false,
    params: {},
    it: e2
  };
  (0, Cs.reportError)(d, Ns, void 0, r3);
}
var tt = {};
var vr = {};
Object.defineProperty(vr, "__esModule", { value: true });
vr.getRules = vr.isJSONType = void 0;
var As = ["string", "number", "integer", "boolean", "null", "object", "array"];
var Is = new Set(As);
function Ms(e2) {
  return typeof e2 == "string" && Is.has(e2);
}
vr.isJSONType = Ms;
function Ds() {
  const e2 = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e2, integer: true, boolean: true, null: true },
    rules: [{ rules: [] }, e2.number, e2.string, e2.array, e2.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
vr.getRules = Ds;
var rr = {};
Object.defineProperty(rr, "__esModule", { value: true });
rr.shouldUseRule = rr.shouldUseGroup = rr.schemaHasRulesForType = void 0;
function Ls({ schema: e2, self: r3 }, n) {
  const a = r3.RULES.types[n];
  return a && a !== true && Sn(e2, a);
}
rr.schemaHasRulesForType = Ls;
function Sn(e2, r3) {
  return r3.rules.some((n) => Cn(e2, n));
}
rr.shouldUseGroup = Sn;
function Cn(e2, r3) {
  var n;
  return e2[r3.keyword] !== void 0 || ((n = r3.definition.implements) === null || n === void 0 ? void 0 : n.some((a) => e2[a] !== void 0));
}
rr.shouldUseRule = Cn;
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.reportTypeError = e2.checkDataTypes = e2.checkDataType = e2.coerceAndCheckDataType = e2.getJSONTypes = e2.getSchemaTypes = e2.DataType = void 0;
  const r3 = vr, n = rr, a = rt, d = se, o2 = ie;
  var p;
  (function(D2) {
    D2[D2.Correct = 0] = "Correct", D2[D2.Wrong = 1] = "Wrong";
  })(p = e2.DataType || (e2.DataType = {}));
  function y(D2) {
    const t = b(D2.type);
    if (t.includes("null")) {
      if (D2.nullable === false)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!t.length && D2.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      D2.nullable === true && t.push("null");
    }
    return t;
  }
  e2.getSchemaTypes = y;
  function b(D2) {
    const t = Array.isArray(D2) ? D2 : D2 ? [D2] : [];
    if (t.every(r3.isJSONType))
      return t;
    throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
  }
  e2.getJSONTypes = b;
  function v(D2, t) {
    const { gen: u2, data: s, opts: i2 } = D2, c = S(t, i2.coerceTypes), m = t.length > 0 && !(c.length === 0 && t.length === 1 && (0, n.schemaHasRulesForType)(D2, t[0]));
    if (m) {
      const h2 = j(t, s, i2.strictNumbers, p.Wrong);
      u2.if(h2, () => {
        c.length ? z(D2, t, c) : $(D2);
      });
    }
    return m;
  }
  e2.coerceAndCheckDataType = v;
  const g2 = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function S(D2, t) {
    return t ? D2.filter((u2) => g2.has(u2) || t === "array" && u2 === "array") : [];
  }
  function z(D2, t, u2) {
    const { gen: s, data: i2, opts: c } = D2, m = s.let("dataType", (0, d._)`typeof ${i2}`), h2 = s.let("coerced", (0, d._)`undefined`);
    c.coerceTypes === "array" && s.if((0, d._)`${m} == 'object' && Array.isArray(${i2}) && ${i2}.length == 1`, () => s.assign(i2, (0, d._)`${i2}[0]`).assign(m, (0, d._)`typeof ${i2}`).if(j(t, i2, c.strictNumbers), () => s.assign(h2, i2))), s.if((0, d._)`${h2} !== undefined`);
    for (const U of u2)
      (g2.has(U) || U === "array" && c.coerceTypes === "array") && C(U);
    s.else(), $(D2), s.endIf(), s.if((0, d._)`${h2} !== undefined`, () => {
      s.assign(i2, h2), L(D2, h2);
    });
    function C(U) {
      switch (U) {
        case "string":
          s.elseIf((0, d._)`${m} == "number" || ${m} == "boolean"`).assign(h2, (0, d._)`"" + ${i2}`).elseIf((0, d._)`${i2} === null`).assign(h2, (0, d._)`""`);
          return;
        case "number":
          s.elseIf((0, d._)`${m} == "boolean" || ${i2} === null
              || (${m} == "string" && ${i2} && ${i2} == +${i2})`).assign(h2, (0, d._)`+${i2}`);
          return;
        case "integer":
          s.elseIf((0, d._)`${m} === "boolean" || ${i2} === null
              || (${m} === "string" && ${i2} && ${i2} == +${i2} && !(${i2} % 1))`).assign(h2, (0, d._)`+${i2}`);
          return;
        case "boolean":
          s.elseIf((0, d._)`${i2} === "false" || ${i2} === 0 || ${i2} === null`).assign(h2, false).elseIf((0, d._)`${i2} === "true" || ${i2} === 1`).assign(h2, true);
          return;
        case "null":
          s.elseIf((0, d._)`${i2} === "" || ${i2} === 0 || ${i2} === false`), s.assign(h2, null);
          return;
        case "array":
          s.elseIf((0, d._)`${m} === "string" || ${m} === "number"
              || ${m} === "boolean" || ${i2} === null`).assign(h2, (0, d._)`[${i2}]`);
      }
    }
  }
  function L({ gen: D2, parentData: t, parentDataProperty: u2 }, s) {
    D2.if((0, d._)`${t} !== undefined`, () => D2.assign((0, d._)`${t}[${u2}]`, s));
  }
  function R(D2, t, u2, s = p.Correct) {
    const i2 = s === p.Correct ? d.operators.EQ : d.operators.NEQ;
    let c;
    switch (D2) {
      case "null":
        return (0, d._)`${t} ${i2} null`;
      case "array":
        c = (0, d._)`Array.isArray(${t})`;
        break;
      case "object":
        c = (0, d._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
        break;
      case "integer":
        c = m((0, d._)`!(${t} % 1) && !isNaN(${t})`);
        break;
      case "number":
        c = m();
        break;
      default:
        return (0, d._)`typeof ${t} ${i2} ${D2}`;
    }
    return s === p.Correct ? c : (0, d.not)(c);
    function m(h2 = d.nil) {
      return (0, d.and)((0, d._)`typeof ${t} == "number"`, h2, u2 ? (0, d._)`isFinite(${t})` : d.nil);
    }
  }
  e2.checkDataType = R;
  function j(D2, t, u2, s) {
    if (D2.length === 1)
      return R(D2[0], t, u2, s);
    let i2;
    const c = (0, o2.toHash)(D2);
    if (c.array && c.object) {
      const m = (0, d._)`typeof ${t} != "object"`;
      i2 = c.null ? m : (0, d._)`!${t} || ${m}`, delete c.null, delete c.array, delete c.object;
    } else
      i2 = d.nil;
    c.number && delete c.integer;
    for (const m in c)
      i2 = (0, d.and)(i2, R(m, t, u2, s));
    return i2;
  }
  e2.checkDataTypes = j;
  const T = {
    message: ({ schema: D2 }) => `must be ${D2}`,
    params: ({ schema: D2, schemaValue: t }) => typeof D2 == "string" ? (0, d._)`{type: ${D2}}` : (0, d._)`{type: ${t}}`
  };
  function $(D2) {
    const t = N2(D2);
    (0, a.reportError)(t, T);
  }
  e2.reportTypeError = $;
  function N2(D2) {
    const { gen: t, data: u2, schema: s } = D2, i2 = (0, o2.schemaRefOrVal)(D2, s, "type");
    return {
      gen: t,
      keyword: "type",
      data: u2,
      schema: s.type,
      schemaCode: i2,
      schemaValue: i2,
      parentSchema: s,
      params: {},
      it: D2
    };
  }
})(tt);
var Ot = {};
Object.defineProperty(Ot, "__esModule", { value: true });
Ot.assignDefaults = void 0;
var Sr = se;
var zs = ie;
function Vs(e2, r3) {
  const { properties: n, items: a } = e2.schema;
  if (r3 === "object" && n)
    for (const d in n)
      Ja(e2, d, n[d].default);
  else
    r3 === "array" && Array.isArray(a) && a.forEach((d, o2) => Ja(e2, o2, d.default));
}
Ot.assignDefaults = Vs;
function Ja(e2, r3, n) {
  const { gen: a, compositeRule: d, data: o2, opts: p } = e2;
  if (n === void 0)
    return;
  const y = (0, Sr._)`${o2}${(0, Sr.getProperty)(r3)}`;
  if (d) {
    (0, zs.checkStrictMode)(e2, `default is ignored for: ${y}`);
    return;
  }
  let b = (0, Sr._)`${y} === undefined`;
  p.useDefaults === "empty" && (b = (0, Sr._)`${b} || ${y} === null || ${y} === ""`), a.if(b, (0, Sr._)`${y} = ${(0, Sr.stringify)(n)}`);
}
var Xe = {};
var ne = {};
Object.defineProperty(ne, "__esModule", { value: true });
ne.validateUnion = ne.validateArray = ne.usePattern = ne.callValidateCode = ne.schemaProperties = ne.allSchemaProperties = ne.noPropertyInData = ne.propertyInData = ne.isOwnProperty = ne.hasPropFunc = ne.reportMissingProp = ne.checkMissingProp = ne.checkReportMissingProp = void 0;
var pe = se;
var Yt = ie;
var nr = Qe;
var Fs = ie;
function Us(e2, r3) {
  const { gen: n, data: a, it: d } = e2;
  n.if(Qt(n, a, r3, d.opts.ownProperties), () => {
    e2.setParams({ missingProperty: (0, pe._)`${r3}` }, true), e2.error();
  });
}
ne.checkReportMissingProp = Us;
function Bs({ gen: e2, data: r3, it: { opts: n } }, a, d) {
  return (0, pe.or)(...a.map((o2) => (0, pe.and)(Qt(e2, r3, o2, n.ownProperties), (0, pe._)`${d} = ${o2}`)));
}
ne.checkMissingProp = Bs;
function Hs(e2, r3) {
  e2.setParams({ missingProperty: r3 }, true), e2.error();
}
ne.reportMissingProp = Hs;
function Tn(e2) {
  return e2.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, pe._)`Object.prototype.hasOwnProperty`
  });
}
ne.hasPropFunc = Tn;
function Xt(e2, r3, n) {
  return (0, pe._)`${Tn(e2)}.call(${r3}, ${n})`;
}
ne.isOwnProperty = Xt;
function qs(e2, r3, n, a) {
  const d = (0, pe._)`${r3}${(0, pe.getProperty)(n)} !== undefined`;
  return a ? (0, pe._)`${d} && ${Xt(e2, r3, n)}` : d;
}
ne.propertyInData = qs;
function Qt(e2, r3, n, a) {
  const d = (0, pe._)`${r3}${(0, pe.getProperty)(n)} === undefined`;
  return a ? (0, pe.or)(d, (0, pe.not)(Xt(e2, r3, n))) : d;
}
ne.noPropertyInData = Qt;
function jn(e2) {
  return e2 ? Object.keys(e2).filter((r3) => r3 !== "__proto__") : [];
}
ne.allSchemaProperties = jn;
function Gs(e2, r3) {
  return jn(r3).filter((n) => !(0, Yt.alwaysValidSchema)(e2, r3[n]));
}
ne.schemaProperties = Gs;
function Ks({ schemaCode: e2, data: r3, it: { gen: n, topSchemaRef: a, schemaPath: d, errorPath: o2 }, it: p }, y, b, v) {
  const g2 = v ? (0, pe._)`${e2}, ${r3}, ${a}${d}` : r3, S = [
    [nr.default.instancePath, (0, pe.strConcat)(nr.default.instancePath, o2)],
    [nr.default.parentData, p.parentData],
    [nr.default.parentDataProperty, p.parentDataProperty],
    [nr.default.rootData, nr.default.rootData]
  ];
  p.opts.dynamicRef && S.push([nr.default.dynamicAnchors, nr.default.dynamicAnchors]);
  const z = (0, pe._)`${g2}, ${n.object(...S)}`;
  return b !== pe.nil ? (0, pe._)`${y}.call(${b}, ${z})` : (0, pe._)`${y}(${z})`;
}
ne.callValidateCode = Ks;
var Ws = (0, pe._)`new RegExp`;
function Js({ gen: e2, it: { opts: r3 } }, n) {
  const a = r3.unicodeRegExp ? "u" : "", { regExp: d } = r3.code, o2 = d(n, a);
  return e2.scopeValue("pattern", {
    key: o2.toString(),
    ref: o2,
    code: (0, pe._)`${d.code === "new RegExp" ? Ws : (0, Fs.useFunc)(e2, d)}(${n}, ${a})`
  });
}
ne.usePattern = Js;
function Zs(e2) {
  const { gen: r3, data: n, keyword: a, it: d } = e2, o2 = r3.name("valid");
  if (d.allErrors) {
    const y = r3.let("valid", true);
    return p(() => r3.assign(y, false)), y;
  }
  return r3.var(o2, true), p(() => r3.break()), o2;
  function p(y) {
    const b = r3.const("len", (0, pe._)`${n}.length`);
    r3.forRange("i", 0, b, (v) => {
      e2.subschema({
        keyword: a,
        dataProp: v,
        dataPropType: Yt.Type.Num
      }, o2), r3.if((0, pe.not)(o2), y);
    });
  }
}
ne.validateArray = Zs;
function Ys(e2) {
  const { gen: r3, schema: n, keyword: a, it: d } = e2;
  if (!Array.isArray(n))
    throw new Error("ajv implementation error");
  if (n.some((b) => (0, Yt.alwaysValidSchema)(d, b)) && !d.opts.unevaluated)
    return;
  const p = r3.let("valid", false), y = r3.name("_valid");
  r3.block(() => n.forEach((b, v) => {
    const g2 = e2.subschema({
      keyword: a,
      schemaProp: v,
      compositeRule: true
    }, y);
    r3.assign(p, (0, pe._)`${p} || ${y}`), e2.mergeValidEvaluated(g2, y) || r3.if((0, pe.not)(p));
  })), e2.result(p, () => e2.reset(), () => e2.error(true));
}
ne.validateUnion = Ys;
Object.defineProperty(Xe, "__esModule", { value: true });
Xe.validateKeywordUsage = Xe.validSchemaType = Xe.funcKeywordCode = Xe.macroKeywordCode = void 0;
var Ce = se;
var mr = Qe;
var Xs = ne;
var Qs = rt;
function xs(e2, r3) {
  const { gen: n, keyword: a, schema: d, parentSchema: o2, it: p } = e2, y = r3.macro.call(p.self, d, o2, p), b = Nn(n, a, y);
  p.opts.validateSchema !== false && p.self.validateSchema(y, true);
  const v = n.name("valid");
  e2.subschema({
    schema: y,
    schemaPath: Ce.nil,
    errSchemaPath: `${p.errSchemaPath}/${a}`,
    topSchemaRef: b,
    compositeRule: true
  }, v), e2.pass(v, () => e2.error(true));
}
Xe.macroKeywordCode = xs;
function eu(e2, r3) {
  var n;
  const { gen: a, keyword: d, schema: o2, parentSchema: p, $data: y, it: b } = e2;
  tu(b, r3);
  const v = !y && r3.compile ? r3.compile.call(b.self, o2, p, b) : r3.validate, g2 = Nn(a, d, v), S = a.let("valid");
  e2.block$data(S, z), e2.ok((n = r3.valid) !== null && n !== void 0 ? n : S);
  function z() {
    if (r3.errors === false)
      j(), r3.modifying && Za(e2), T(() => e2.error());
    else {
      const $ = r3.async ? L() : R();
      r3.modifying && Za(e2), T(() => ru(e2, $));
    }
  }
  function L() {
    const $ = a.let("ruleErrs", null);
    return a.try(() => j((0, Ce._)`await `), (N2) => a.assign(S, false).if((0, Ce._)`${N2} instanceof ${b.ValidationError}`, () => a.assign($, (0, Ce._)`${N2}.errors`), () => a.throw(N2))), $;
  }
  function R() {
    const $ = (0, Ce._)`${g2}.errors`;
    return a.assign($, null), j(Ce.nil), $;
  }
  function j($ = r3.async ? (0, Ce._)`await ` : Ce.nil) {
    const N2 = b.opts.passContext ? mr.default.this : mr.default.self, D2 = !("compile" in r3 && !y || r3.schema === false);
    a.assign(S, (0, Ce._)`${$}${(0, Xs.callValidateCode)(e2, g2, N2, D2)}`, r3.modifying);
  }
  function T($) {
    var N2;
    a.if((0, Ce.not)((N2 = r3.valid) !== null && N2 !== void 0 ? N2 : S), $);
  }
}
Xe.funcKeywordCode = eu;
function Za(e2) {
  const { gen: r3, data: n, it: a } = e2;
  r3.if(a.parentData, () => r3.assign(n, (0, Ce._)`${a.parentData}[${a.parentDataProperty}]`));
}
function ru(e2, r3) {
  const { gen: n } = e2;
  n.if((0, Ce._)`Array.isArray(${r3})`, () => {
    n.assign(mr.default.vErrors, (0, Ce._)`${mr.default.vErrors} === null ? ${r3} : ${mr.default.vErrors}.concat(${r3})`).assign(mr.default.errors, (0, Ce._)`${mr.default.vErrors}.length`), (0, Qs.extendErrors)(e2);
  }, () => e2.error());
}
function tu({ schemaEnv: e2 }, r3) {
  if (r3.async && !e2.$async)
    throw new Error("async keyword in sync schema");
}
function Nn(e2, r3, n) {
  if (n === void 0)
    throw new Error(`keyword "${r3}" failed to compile`);
  return e2.scopeValue("keyword", typeof n == "function" ? { ref: n } : { ref: n, code: (0, Ce.stringify)(n) });
}
function au(e2, r3, n = false) {
  return !r3.length || r3.some((a) => a === "array" ? Array.isArray(e2) : a === "object" ? e2 && typeof e2 == "object" && !Array.isArray(e2) : typeof e2 == a || n && typeof e2 > "u");
}
Xe.validSchemaType = au;
function nu({ schema: e2, opts: r3, self: n, errSchemaPath: a }, d, o2) {
  if (Array.isArray(d.keyword) ? !d.keyword.includes(o2) : d.keyword !== o2)
    throw new Error("ajv implementation error");
  const p = d.dependencies;
  if (p != null && p.some((y) => !Object.prototype.hasOwnProperty.call(e2, y)))
    throw new Error(`parent schema must have dependencies of ${o2}: ${p.join(",")}`);
  if (d.validateSchema && !d.validateSchema(e2[o2])) {
    const b = `keyword "${o2}" value is invalid at path "${a}": ` + n.errorsText(d.validateSchema.errors);
    if (r3.validateSchema === "log")
      n.logger.error(b);
    else
      throw new Error(b);
  }
}
Xe.validateKeywordUsage = nu;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: true });
ir.extendSubschemaMode = ir.extendSubschemaData = ir.getSubschema = void 0;
var Ye = se;
var On = ie;
function su(e2, { keyword: r3, schemaProp: n, schema: a, schemaPath: d, errSchemaPath: o2, topSchemaRef: p }) {
  if (r3 !== void 0 && a !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (r3 !== void 0) {
    const y = e2.schema[r3];
    return n === void 0 ? {
      schema: y,
      schemaPath: (0, Ye._)`${e2.schemaPath}${(0, Ye.getProperty)(r3)}`,
      errSchemaPath: `${e2.errSchemaPath}/${r3}`
    } : {
      schema: y[n],
      schemaPath: (0, Ye._)`${e2.schemaPath}${(0, Ye.getProperty)(r3)}${(0, Ye.getProperty)(n)}`,
      errSchemaPath: `${e2.errSchemaPath}/${r3}/${(0, On.escapeFragment)(n)}`
    };
  }
  if (a !== void 0) {
    if (d === void 0 || o2 === void 0 || p === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: a,
      schemaPath: d,
      topSchemaRef: p,
      errSchemaPath: o2
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
ir.getSubschema = su;
function uu(e2, r3, { dataProp: n, dataPropType: a, data: d, dataTypes: o2, propertyName: p }) {
  if (d !== void 0 && n !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: y } = r3;
  if (n !== void 0) {
    const { errorPath: v, dataPathArr: g2, opts: S } = r3, z = y.let("data", (0, Ye._)`${r3.data}${(0, Ye.getProperty)(n)}`, true);
    b(z), e2.errorPath = (0, Ye.str)`${v}${(0, On.getErrorPath)(n, a, S.jsPropertySyntax)}`, e2.parentDataProperty = (0, Ye._)`${n}`, e2.dataPathArr = [...g2, e2.parentDataProperty];
  }
  if (d !== void 0) {
    const v = d instanceof Ye.Name ? d : y.let("data", d, true);
    b(v), p !== void 0 && (e2.propertyName = p);
  }
  o2 && (e2.dataTypes = o2);
  function b(v) {
    e2.data = v, e2.dataLevel = r3.dataLevel + 1, e2.dataTypes = [], r3.definedProperties = /* @__PURE__ */ new Set(), e2.parentData = r3.data, e2.dataNames = [...r3.dataNames, v];
  }
}
ir.extendSubschemaData = uu;
function du(e2, { jtdDiscriminator: r3, jtdMetadata: n, compositeRule: a, createErrors: d, allErrors: o2 }) {
  a !== void 0 && (e2.compositeRule = a), d !== void 0 && (e2.createErrors = d), o2 !== void 0 && (e2.allErrors = o2), e2.jtdDiscriminator = r3, e2.jtdMetadata = n;
}
ir.extendSubschemaMode = du;
var ke = {};
var Rn = function e(r3, n) {
  if (r3 === n)
    return true;
  if (r3 && n && typeof r3 == "object" && typeof n == "object") {
    if (r3.constructor !== n.constructor)
      return false;
    var a, d, o2;
    if (Array.isArray(r3)) {
      if (a = r3.length, a != n.length)
        return false;
      for (d = a; d-- !== 0; )
        if (!e(r3[d], n[d]))
          return false;
      return true;
    }
    if (r3.constructor === RegExp)
      return r3.source === n.source && r3.flags === n.flags;
    if (r3.valueOf !== Object.prototype.valueOf)
      return r3.valueOf() === n.valueOf();
    if (r3.toString !== Object.prototype.toString)
      return r3.toString() === n.toString();
    if (o2 = Object.keys(r3), a = o2.length, a !== Object.keys(n).length)
      return false;
    for (d = a; d-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, o2[d]))
        return false;
    for (d = a; d-- !== 0; ) {
      var p = o2[d];
      if (!e(r3[p], n[p]))
        return false;
    }
    return true;
  }
  return r3 !== r3 && n !== n;
};
var Ht = {};
var iu = {
  get exports() {
    return Ht;
  },
  set exports(e2) {
    Ht = e2;
  }
};
var dr = iu.exports = function(e2, r3, n) {
  typeof r3 == "function" && (n = r3, r3 = {}), n = r3.cb || n;
  var a = typeof n == "function" ? n : n.pre || function() {
  }, d = n.post || function() {
  };
  mt(r3, a, d, e2, "", e2);
};
dr.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};
dr.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};
dr.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};
dr.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};
function mt(e2, r3, n, a, d, o2, p, y, b, v) {
  if (a && typeof a == "object" && !Array.isArray(a)) {
    r3(a, d, o2, p, y, b, v);
    for (var g2 in a) {
      var S = a[g2];
      if (Array.isArray(S)) {
        if (g2 in dr.arrayKeywords)
          for (var z = 0; z < S.length; z++)
            mt(e2, r3, n, S[z], d + "/" + g2 + "/" + z, o2, d, g2, a, z);
      } else if (g2 in dr.propsKeywords) {
        if (S && typeof S == "object")
          for (var L in S)
            mt(e2, r3, n, S[L], d + "/" + g2 + "/" + ou(L), o2, d, g2, a, L);
      } else
        (g2 in dr.keywords || e2.allKeys && !(g2 in dr.skipKeywords)) && mt(e2, r3, n, S, d + "/" + g2, o2, d, g2, a);
    }
    n(a, d, o2, p, y, b, v);
  }
}
function ou(e2) {
  return e2.replace(/~/g, "~0").replace(/\//g, "~1");
}
Object.defineProperty(ke, "__esModule", { value: true });
ke.getSchemaRefs = ke.resolveUrl = ke.normalizeId = ke._getFullPath = ke.getFullPath = ke.inlineRef = void 0;
var cu = ie;
var lu = Rn;
var fu = Ht;
var hu = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function pu(e2, r3 = true) {
  return typeof e2 == "boolean" ? true : r3 === true ? !qt(e2) : r3 ? An(e2) <= r3 : false;
}
ke.inlineRef = pu;
var mu = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function qt(e2) {
  for (const r3 in e2) {
    if (mu.has(r3))
      return true;
    const n = e2[r3];
    if (Array.isArray(n) && n.some(qt) || typeof n == "object" && qt(n))
      return true;
  }
  return false;
}
function An(e2) {
  let r3 = 0;
  for (const n in e2) {
    if (n === "$ref")
      return 1 / 0;
    if (r3++, !hu.has(n) && (typeof e2[n] == "object" && (0, cu.eachItem)(e2[n], (a) => r3 += An(a)), r3 === 1 / 0))
      return 1 / 0;
  }
  return r3;
}
function In(e2, r3 = "", n) {
  n !== false && (r3 = Or(r3));
  const a = e2.parse(r3);
  return Mn(e2, a);
}
ke.getFullPath = In;
function Mn(e2, r3) {
  return e2.serialize(r3).split("#")[0] + "#";
}
ke._getFullPath = Mn;
var gu = /#\/?$/;
function Or(e2) {
  return e2 ? e2.replace(gu, "") : "";
}
ke.normalizeId = Or;
function _u(e2, r3, n) {
  return n = Or(n), e2.resolve(r3, n);
}
ke.resolveUrl = _u;
var vu = /^[a-z_][-a-z0-9._]*$/i;
function yu(e2, r3) {
  if (typeof e2 == "boolean")
    return {};
  const { schemaId: n, uriResolver: a } = this.opts, d = Or(e2[n] || r3), o2 = { "": d }, p = In(a, d, false), y = {}, b = /* @__PURE__ */ new Set();
  return fu(e2, { allKeys: true }, (S, z, L, R) => {
    if (R === void 0)
      return;
    const j = p + z;
    let T = o2[R];
    typeof S[n] == "string" && (T = $.call(this, S[n])), N2.call(this, S.$anchor), N2.call(this, S.$dynamicAnchor), o2[z] = T;
    function $(D2) {
      const t = this.opts.uriResolver.resolve;
      if (D2 = Or(T ? t(T, D2) : D2), b.has(D2))
        throw g2(D2);
      b.add(D2);
      let u2 = this.refs[D2];
      return typeof u2 == "string" && (u2 = this.refs[u2]), typeof u2 == "object" ? v(S, u2.schema, D2) : D2 !== Or(j) && (D2[0] === "#" ? (v(S, y[D2], D2), y[D2] = S) : this.refs[D2] = j), D2;
    }
    function N2(D2) {
      if (typeof D2 == "string") {
        if (!vu.test(D2))
          throw new Error(`invalid anchor "${D2}"`);
        $.call(this, `#${D2}`);
      }
    }
  }), y;
  function v(S, z, L) {
    if (z !== void 0 && !lu(S, z))
      throw g2(L);
  }
  function g2(S) {
    return new Error(`reference "${S}" resolves to more than one schema`);
  }
}
ke.getSchemaRefs = yu;
Object.defineProperty(He, "__esModule", { value: true });
He.getData = He.KeywordCxt = He.validateFunctionCode = void 0;
var Dn = Ar;
var Ya = tt;
var xt = rr;
var bt = tt;
var wu = Ot;
var Zr = Xe;
var Dt = ir;
var Y = se;
var x = Qe;
var bu = ke;
var tr = ie;
var Kr = rt;
function $u(e2) {
  if (Vn(e2) && (Fn(e2), zn(e2))) {
    Pu(e2);
    return;
  }
  Ln(e2, () => (0, Dn.topBoolOrEmptySchema)(e2));
}
He.validateFunctionCode = $u;
function Ln({ gen: e2, validateName: r3, schema: n, schemaEnv: a, opts: d }, o2) {
  d.code.es5 ? e2.func(r3, (0, Y._)`${x.default.data}, ${x.default.valCxt}`, a.$async, () => {
    e2.code((0, Y._)`"use strict"; ${Xa(n, d)}`), ku(e2, d), e2.code(o2);
  }) : e2.func(r3, (0, Y._)`${x.default.data}, ${Eu(d)}`, a.$async, () => e2.code(Xa(n, d)).code(o2));
}
function Eu(e2) {
  return (0, Y._)`{${x.default.instancePath}="", ${x.default.parentData}, ${x.default.parentDataProperty}, ${x.default.rootData}=${x.default.data}${e2.dynamicRef ? (0, Y._)`, ${x.default.dynamicAnchors}={}` : Y.nil}}={}`;
}
function ku(e2, r3) {
  e2.if(x.default.valCxt, () => {
    e2.var(x.default.instancePath, (0, Y._)`${x.default.valCxt}.${x.default.instancePath}`), e2.var(x.default.parentData, (0, Y._)`${x.default.valCxt}.${x.default.parentData}`), e2.var(x.default.parentDataProperty, (0, Y._)`${x.default.valCxt}.${x.default.parentDataProperty}`), e2.var(x.default.rootData, (0, Y._)`${x.default.valCxt}.${x.default.rootData}`), r3.dynamicRef && e2.var(x.default.dynamicAnchors, (0, Y._)`${x.default.valCxt}.${x.default.dynamicAnchors}`);
  }, () => {
    e2.var(x.default.instancePath, (0, Y._)`""`), e2.var(x.default.parentData, (0, Y._)`undefined`), e2.var(x.default.parentDataProperty, (0, Y._)`undefined`), e2.var(x.default.rootData, x.default.data), r3.dynamicRef && e2.var(x.default.dynamicAnchors, (0, Y._)`{}`);
  });
}
function Pu(e2) {
  const { schema: r3, opts: n, gen: a } = e2;
  Ln(e2, () => {
    n.$comment && r3.$comment && Bn(e2), Nu(e2), a.let(x.default.vErrors, null), a.let(x.default.errors, 0), n.unevaluated && Su(e2), Un(e2), Au(e2);
  });
}
function Su(e2) {
  const { gen: r3, validateName: n } = e2;
  e2.evaluated = r3.const("evaluated", (0, Y._)`${n}.evaluated`), r3.if((0, Y._)`${e2.evaluated}.dynamicProps`, () => r3.assign((0, Y._)`${e2.evaluated}.props`, (0, Y._)`undefined`)), r3.if((0, Y._)`${e2.evaluated}.dynamicItems`, () => r3.assign((0, Y._)`${e2.evaluated}.items`, (0, Y._)`undefined`));
}
function Xa(e2, r3) {
  const n = typeof e2 == "object" && e2[r3.schemaId];
  return n && (r3.code.source || r3.code.process) ? (0, Y._)`/*# sourceURL=${n} */` : Y.nil;
}
function Cu(e2, r3) {
  if (Vn(e2) && (Fn(e2), zn(e2))) {
    Tu(e2, r3);
    return;
  }
  (0, Dn.boolOrEmptySchema)(e2, r3);
}
function zn({ schema: e2, self: r3 }) {
  if (typeof e2 == "boolean")
    return !e2;
  for (const n in e2)
    if (r3.RULES.all[n])
      return true;
  return false;
}
function Vn(e2) {
  return typeof e2.schema != "boolean";
}
function Tu(e2, r3) {
  const { schema: n, gen: a, opts: d } = e2;
  d.$comment && n.$comment && Bn(e2), Ou(e2), Ru(e2);
  const o2 = a.const("_errs", x.default.errors);
  Un(e2, o2), a.var(r3, (0, Y._)`${o2} === ${x.default.errors}`);
}
function Fn(e2) {
  (0, tr.checkUnknownRules)(e2), ju(e2);
}
function Un(e2, r3) {
  if (e2.opts.jtd)
    return Qa(e2, [], false, r3);
  const n = (0, Ya.getSchemaTypes)(e2.schema), a = (0, Ya.coerceAndCheckDataType)(e2, n);
  Qa(e2, n, !a, r3);
}
function ju(e2) {
  const { schema: r3, errSchemaPath: n, opts: a, self: d } = e2;
  r3.$ref && a.ignoreKeywordsWithRef && (0, tr.schemaHasRulesButRef)(r3, d.RULES) && d.logger.warn(`$ref: keywords ignored in schema at path "${n}"`);
}
function Nu(e2) {
  const { schema: r3, opts: n } = e2;
  r3.default !== void 0 && n.useDefaults && n.strictSchema && (0, tr.checkStrictMode)(e2, "default is ignored in the schema root");
}
function Ou(e2) {
  const r3 = e2.schema[e2.opts.schemaId];
  r3 && (e2.baseId = (0, bu.resolveUrl)(e2.opts.uriResolver, e2.baseId, r3));
}
function Ru(e2) {
  if (e2.schema.$async && !e2.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Bn({ gen: e2, schemaEnv: r3, schema: n, errSchemaPath: a, opts: d }) {
  const o2 = n.$comment;
  if (d.$comment === true)
    e2.code((0, Y._)`${x.default.self}.logger.log(${o2})`);
  else if (typeof d.$comment == "function") {
    const p = (0, Y.str)`${a}/$comment`, y = e2.scopeValue("root", { ref: r3.root });
    e2.code((0, Y._)`${x.default.self}.opts.$comment(${o2}, ${p}, ${y}.schema)`);
  }
}
function Au(e2) {
  const { gen: r3, schemaEnv: n, validateName: a, ValidationError: d, opts: o2 } = e2;
  n.$async ? r3.if((0, Y._)`${x.default.errors} === 0`, () => r3.return(x.default.data), () => r3.throw((0, Y._)`new ${d}(${x.default.vErrors})`)) : (r3.assign((0, Y._)`${a}.errors`, x.default.vErrors), o2.unevaluated && Iu(e2), r3.return((0, Y._)`${x.default.errors} === 0`));
}
function Iu({ gen: e2, evaluated: r3, props: n, items: a }) {
  n instanceof Y.Name && e2.assign((0, Y._)`${r3}.props`, n), a instanceof Y.Name && e2.assign((0, Y._)`${r3}.items`, a);
}
function Qa(e2, r3, n, a) {
  const { gen: d, schema: o2, data: p, allErrors: y, opts: b, self: v } = e2, { RULES: g2 } = v;
  if (o2.$ref && (b.ignoreKeywordsWithRef || !(0, tr.schemaHasRulesButRef)(o2, g2))) {
    d.block(() => Gn(e2, "$ref", g2.all.$ref.definition));
    return;
  }
  b.jtd || Mu(e2, r3), d.block(() => {
    for (const z of g2.rules)
      S(z);
    S(g2.post);
  });
  function S(z) {
    (0, xt.shouldUseGroup)(o2, z) && (z.type ? (d.if((0, bt.checkDataType)(z.type, p, b.strictNumbers)), xa(e2, z), r3.length === 1 && r3[0] === z.type && n && (d.else(), (0, bt.reportTypeError)(e2)), d.endIf()) : xa(e2, z), y || d.if((0, Y._)`${x.default.errors} === ${a || 0}`));
  }
}
function xa(e2, r3) {
  const { gen: n, schema: a, opts: { useDefaults: d } } = e2;
  d && (0, wu.assignDefaults)(e2, r3.type), n.block(() => {
    for (const o2 of r3.rules)
      (0, xt.shouldUseRule)(a, o2) && Gn(e2, o2.keyword, o2.definition, r3.type);
  });
}
function Mu(e2, r3) {
  e2.schemaEnv.meta || !e2.opts.strictTypes || (Du(e2, r3), e2.opts.allowUnionTypes || Lu(e2, r3), zu(e2, e2.dataTypes));
}
function Du(e2, r3) {
  if (r3.length) {
    if (!e2.dataTypes.length) {
      e2.dataTypes = r3;
      return;
    }
    r3.forEach((n) => {
      Hn(e2.dataTypes, n) || ea(e2, `type "${n}" not allowed by context "${e2.dataTypes.join(",")}"`);
    }), Fu(e2, r3);
  }
}
function Lu(e2, r3) {
  r3.length > 1 && !(r3.length === 2 && r3.includes("null")) && ea(e2, "use allowUnionTypes to allow union type keyword");
}
function zu(e2, r3) {
  const n = e2.self.RULES.all;
  for (const a in n) {
    const d = n[a];
    if (typeof d == "object" && (0, xt.shouldUseRule)(e2.schema, d)) {
      const { type: o2 } = d.definition;
      o2.length && !o2.some((p) => Vu(r3, p)) && ea(e2, `missing type "${o2.join(",")}" for keyword "${a}"`);
    }
  }
}
function Vu(e2, r3) {
  return e2.includes(r3) || r3 === "number" && e2.includes("integer");
}
function Hn(e2, r3) {
  return e2.includes(r3) || r3 === "integer" && e2.includes("number");
}
function Fu(e2, r3) {
  const n = [];
  for (const a of e2.dataTypes)
    Hn(r3, a) ? n.push(a) : r3.includes("integer") && a === "number" && n.push("integer");
  e2.dataTypes = n;
}
function ea(e2, r3) {
  const n = e2.schemaEnv.baseId + e2.errSchemaPath;
  r3 += ` at "${n}" (strictTypes)`, (0, tr.checkStrictMode)(e2, r3, e2.opts.strictTypes);
}
var qn = class {
  constructor(r3, n, a) {
    if ((0, Zr.validateKeywordUsage)(r3, n, a), this.gen = r3.gen, this.allErrors = r3.allErrors, this.keyword = a, this.data = r3.data, this.schema = r3.schema[a], this.$data = n.$data && r3.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, tr.schemaRefOrVal)(r3, this.schema, a, this.$data), this.schemaType = n.schemaType, this.parentSchema = r3.schema, this.params = {}, this.it = r3, this.def = n, this.$data)
      this.schemaCode = r3.gen.const("vSchema", Kn(this.$data, r3));
    else if (this.schemaCode = this.schemaValue, !(0, Zr.validSchemaType)(this.schema, n.schemaType, n.allowUndefined))
      throw new Error(`${a} value must be ${JSON.stringify(n.schemaType)}`);
    ("code" in n ? n.trackErrors : n.errors !== false) && (this.errsCount = r3.gen.const("_errs", x.default.errors));
  }
  result(r3, n, a) {
    this.failResult((0, Y.not)(r3), n, a);
  }
  failResult(r3, n, a) {
    this.gen.if(r3), a ? a() : this.error(), n ? (this.gen.else(), n(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(r3, n) {
    this.failResult((0, Y.not)(r3), void 0, n);
  }
  fail(r3) {
    if (r3 === void 0) {
      this.error(), this.allErrors || this.gen.if(false);
      return;
    }
    this.gen.if(r3), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(r3) {
    if (!this.$data)
      return this.fail(r3);
    const { schemaCode: n } = this;
    this.fail((0, Y._)`${n} !== undefined && (${(0, Y.or)(this.invalid$data(), r3)})`);
  }
  error(r3, n, a) {
    if (n) {
      this.setParams(n), this._error(r3, a), this.setParams({});
      return;
    }
    this._error(r3, a);
  }
  _error(r3, n) {
    (r3 ? Kr.reportExtraError : Kr.reportError)(this, this.def.error, n);
  }
  $dataError() {
    (0, Kr.reportError)(this, this.def.$dataError || Kr.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Kr.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(r3) {
    this.allErrors || this.gen.if(r3);
  }
  setParams(r3, n) {
    n ? Object.assign(this.params, r3) : this.params = r3;
  }
  block$data(r3, n, a = Y.nil) {
    this.gen.block(() => {
      this.check$data(r3, a), n();
    });
  }
  check$data(r3 = Y.nil, n = Y.nil) {
    if (!this.$data)
      return;
    const { gen: a, schemaCode: d, schemaType: o2, def: p } = this;
    a.if((0, Y.or)((0, Y._)`${d} === undefined`, n)), r3 !== Y.nil && a.assign(r3, true), (o2.length || p.validateSchema) && (a.elseIf(this.invalid$data()), this.$dataError(), r3 !== Y.nil && a.assign(r3, false)), a.else();
  }
  invalid$data() {
    const { gen: r3, schemaCode: n, schemaType: a, def: d, it: o2 } = this;
    return (0, Y.or)(p(), y());
    function p() {
      if (a.length) {
        if (!(n instanceof Y.Name))
          throw new Error("ajv implementation error");
        const b = Array.isArray(a) ? a : [a];
        return (0, Y._)`${(0, bt.checkDataTypes)(b, n, o2.opts.strictNumbers, bt.DataType.Wrong)}`;
      }
      return Y.nil;
    }
    function y() {
      if (d.validateSchema) {
        const b = r3.scopeValue("validate$data", { ref: d.validateSchema });
        return (0, Y._)`!${b}(${n})`;
      }
      return Y.nil;
    }
  }
  subschema(r3, n) {
    const a = (0, Dt.getSubschema)(this.it, r3);
    (0, Dt.extendSubschemaData)(a, this.it, r3), (0, Dt.extendSubschemaMode)(a, r3);
    const d = { ...this.it, ...a, items: void 0, props: void 0 };
    return Cu(d, n), d;
  }
  mergeEvaluated(r3, n) {
    const { it: a, gen: d } = this;
    a.opts.unevaluated && (a.props !== true && r3.props !== void 0 && (a.props = tr.mergeEvaluated.props(d, r3.props, a.props, n)), a.items !== true && r3.items !== void 0 && (a.items = tr.mergeEvaluated.items(d, r3.items, a.items, n)));
  }
  mergeValidEvaluated(r3, n) {
    const { it: a, gen: d } = this;
    if (a.opts.unevaluated && (a.props !== true || a.items !== true))
      return d.if(n, () => this.mergeEvaluated(r3, Y.Name)), true;
  }
};
He.KeywordCxt = qn;
function Gn(e2, r3, n, a) {
  const d = new qn(e2, n, r3);
  "code" in n ? n.code(d, a) : d.$data && n.validate ? (0, Zr.funcKeywordCode)(d, n) : "macro" in n ? (0, Zr.macroKeywordCode)(d, n) : (n.compile || n.validate) && (0, Zr.funcKeywordCode)(d, n);
}
var Uu = /^\/(?:[^~]|~0|~1)*$/;
var Bu = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Kn(e2, { dataLevel: r3, dataNames: n, dataPathArr: a }) {
  let d, o2;
  if (e2 === "")
    return x.default.rootData;
  if (e2[0] === "/") {
    if (!Uu.test(e2))
      throw new Error(`Invalid JSON-pointer: ${e2}`);
    d = e2, o2 = x.default.rootData;
  } else {
    const v = Bu.exec(e2);
    if (!v)
      throw new Error(`Invalid JSON-pointer: ${e2}`);
    const g2 = +v[1];
    if (d = v[2], d === "#") {
      if (g2 >= r3)
        throw new Error(b("property/index", g2));
      return a[r3 - g2];
    }
    if (g2 > r3)
      throw new Error(b("data", g2));
    if (o2 = n[r3 - g2], !d)
      return o2;
  }
  let p = o2;
  const y = d.split("/");
  for (const v of y)
    v && (o2 = (0, Y._)`${o2}${(0, Y.getProperty)((0, tr.unescapeJsonPointer)(v))}`, p = (0, Y._)`${p} && ${o2}`);
  return p;
  function b(v, g2) {
    return `Cannot access ${v} ${g2} levels up, current level is ${r3}`;
  }
}
He.getData = Kn;
var at = {};
Object.defineProperty(at, "__esModule", { value: true });
var Hu = class extends Error {
  constructor(r3) {
    super("validation failed"), this.errors = r3, this.ajv = this.validation = true;
  }
};
at.default = Hu;
var nt = {};
Object.defineProperty(nt, "__esModule", { value: true });
var Lt = ke;
var qu = class extends Error {
  constructor(r3, n, a, d) {
    super(d || `can't resolve reference ${a} from id ${n}`), this.missingRef = (0, Lt.resolveUrl)(r3, n, a), this.missingSchema = (0, Lt.normalizeId)((0, Lt.getFullPath)(r3, this.missingRef));
  }
};
nt.default = qu;
var Ae = {};
Object.defineProperty(Ae, "__esModule", { value: true });
Ae.resolveSchema = Ae.getCompilingSchema = Ae.resolveRef = Ae.compileSchema = Ae.SchemaEnv = void 0;
var Ve = se;
var Gu = at;
var hr = Qe;
var Be = ke;
var en = ie;
var Ku = He;
var Rt = class {
  constructor(r3) {
    var n;
    this.refs = {}, this.dynamicAnchors = {};
    let a;
    typeof r3.schema == "object" && (a = r3.schema), this.schema = r3.schema, this.schemaId = r3.schemaId, this.root = r3.root || this, this.baseId = (n = r3.baseId) !== null && n !== void 0 ? n : (0, Be.normalizeId)(a == null ? void 0 : a[r3.schemaId || "$id"]), this.schemaPath = r3.schemaPath, this.localRefs = r3.localRefs, this.meta = r3.meta, this.$async = a == null ? void 0 : a.$async, this.refs = {};
  }
};
Ae.SchemaEnv = Rt;
function ra(e2) {
  const r3 = Wn.call(this, e2);
  if (r3)
    return r3;
  const n = (0, Be.getFullPath)(this.opts.uriResolver, e2.root.baseId), { es5: a, lines: d } = this.opts.code, { ownProperties: o2 } = this.opts, p = new Ve.CodeGen(this.scope, { es5: a, lines: d, ownProperties: o2 });
  let y;
  e2.$async && (y = p.scopeValue("Error", {
    ref: Gu.default,
    code: (0, Ve._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const b = p.scopeName("validate");
  e2.validateName = b;
  const v = {
    gen: p,
    allErrors: this.opts.allErrors,
    data: hr.default.data,
    parentData: hr.default.parentData,
    parentDataProperty: hr.default.parentDataProperty,
    dataNames: [hr.default.data],
    dataPathArr: [Ve.nil],
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: p.scopeValue("schema", this.opts.code.source === true ? { ref: e2.schema, code: (0, Ve.stringify)(e2.schema) } : { ref: e2.schema }),
    validateName: b,
    ValidationError: y,
    schema: e2.schema,
    schemaEnv: e2,
    rootId: n,
    baseId: e2.baseId || n,
    schemaPath: Ve.nil,
    errSchemaPath: e2.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Ve._)`""`,
    opts: this.opts,
    self: this
  };
  let g2;
  try {
    this._compilations.add(e2), (0, Ku.validateFunctionCode)(v), p.optimize(this.opts.code.optimize);
    const S = p.toString();
    g2 = `${p.scopeRefs(hr.default.scope)}return ${S}`, this.opts.code.process && (g2 = this.opts.code.process(g2, e2));
    const L = new Function(`${hr.default.self}`, `${hr.default.scope}`, g2)(this, this.scope.get());
    if (this.scope.value(b, { ref: L }), L.errors = null, L.schema = e2.schema, L.schemaEnv = e2, e2.$async && (L.$async = true), this.opts.code.source === true && (L.source = { validateName: b, validateCode: S, scopeValues: p._values }), this.opts.unevaluated) {
      const { props: R, items: j } = v;
      L.evaluated = {
        props: R instanceof Ve.Name ? void 0 : R,
        items: j instanceof Ve.Name ? void 0 : j,
        dynamicProps: R instanceof Ve.Name,
        dynamicItems: j instanceof Ve.Name
      }, L.source && (L.source.evaluated = (0, Ve.stringify)(L.evaluated));
    }
    return e2.validate = L, e2;
  } catch (S) {
    throw delete e2.validate, delete e2.validateName, g2 && this.logger.error("Error compiling schema, function code:", g2), S;
  } finally {
    this._compilations.delete(e2);
  }
}
Ae.compileSchema = ra;
function Wu(e2, r3, n) {
  var a;
  n = (0, Be.resolveUrl)(this.opts.uriResolver, r3, n);
  const d = e2.refs[n];
  if (d)
    return d;
  let o2 = Yu.call(this, e2, n);
  if (o2 === void 0) {
    const p = (a = e2.localRefs) === null || a === void 0 ? void 0 : a[n], { schemaId: y } = this.opts;
    p && (o2 = new Rt({ schema: p, schemaId: y, root: e2, baseId: r3 }));
  }
  if (o2 !== void 0)
    return e2.refs[n] = Ju.call(this, o2);
}
Ae.resolveRef = Wu;
function Ju(e2) {
  return (0, Be.inlineRef)(e2.schema, this.opts.inlineRefs) ? e2.schema : e2.validate ? e2 : ra.call(this, e2);
}
function Wn(e2) {
  for (const r3 of this._compilations)
    if (Zu(r3, e2))
      return r3;
}
Ae.getCompilingSchema = Wn;
function Zu(e2, r3) {
  return e2.schema === r3.schema && e2.root === r3.root && e2.baseId === r3.baseId;
}
function Yu(e2, r3) {
  let n;
  for (; typeof (n = this.refs[r3]) == "string"; )
    r3 = n;
  return n || this.schemas[r3] || At.call(this, e2, r3);
}
function At(e2, r3) {
  const n = this.opts.uriResolver.parse(r3), a = (0, Be._getFullPath)(this.opts.uriResolver, n);
  let d = (0, Be.getFullPath)(this.opts.uriResolver, e2.baseId, void 0);
  if (Object.keys(e2.schema).length > 0 && a === d)
    return zt.call(this, n, e2);
  const o2 = (0, Be.normalizeId)(a), p = this.refs[o2] || this.schemas[o2];
  if (typeof p == "string") {
    const y = At.call(this, e2, p);
    return typeof (y == null ? void 0 : y.schema) != "object" ? void 0 : zt.call(this, n, y);
  }
  if (typeof (p == null ? void 0 : p.schema) == "object") {
    if (p.validate || ra.call(this, p), o2 === (0, Be.normalizeId)(r3)) {
      const { schema: y } = p, { schemaId: b } = this.opts, v = y[b];
      return v && (d = (0, Be.resolveUrl)(this.opts.uriResolver, d, v)), new Rt({ schema: y, schemaId: b, root: e2, baseId: d });
    }
    return zt.call(this, n, p);
  }
}
Ae.resolveSchema = At;
var Xu = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function zt(e2, { baseId: r3, schema: n, root: a }) {
  var d;
  if (((d = e2.fragment) === null || d === void 0 ? void 0 : d[0]) !== "/")
    return;
  for (const y of e2.fragment.slice(1).split("/")) {
    if (typeof n == "boolean")
      return;
    const b = n[(0, en.unescapeFragment)(y)];
    if (b === void 0)
      return;
    n = b;
    const v = typeof n == "object" && n[this.opts.schemaId];
    !Xu.has(y) && v && (r3 = (0, Be.resolveUrl)(this.opts.uriResolver, r3, v));
  }
  let o2;
  if (typeof n != "boolean" && n.$ref && !(0, en.schemaHasRulesButRef)(n, this.RULES)) {
    const y = (0, Be.resolveUrl)(this.opts.uriResolver, r3, n.$ref);
    o2 = At.call(this, a, y);
  }
  const { schemaId: p } = this.opts;
  if (o2 = o2 || new Rt({ schema: n, schemaId: p, root: a, baseId: r3 }), o2.schema !== o2.root.schema)
    return o2;
}
var Qu = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
var xu = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
var ed = "object";
var rd = [
  "$data"
];
var td = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
};
var ad = false;
var nd = {
  $id: Qu,
  description: xu,
  type: ed,
  required: rd,
  properties: td,
  additionalProperties: ad
};
var ta = {};
var $t = {};
var sd = {
  get exports() {
    return $t;
  },
  set exports(e2) {
    $t = e2;
  }
};
(function(e2, r3) {
  (function(n, a) {
    a(r3);
  })(En, function(n) {
    function a() {
      for (var E2 = arguments.length, f = Array(E2), P2 = 0; P2 < E2; P2++)
        f[P2] = arguments[P2];
      if (f.length > 1) {
        f[0] = f[0].slice(0, -1);
        for (var M = f.length - 1, A = 1; A < M; ++A)
          f[A] = f[A].slice(1, -1);
        return f[M] = f[M].slice(1), f.join("");
      } else
        return f[0];
    }
    function d(E2) {
      return "(?:" + E2 + ")";
    }
    function o2(E2) {
      return E2 === void 0 ? "undefined" : E2 === null ? "null" : Object.prototype.toString.call(E2).split(" ").pop().split("]").shift().toLowerCase();
    }
    function p(E2) {
      return E2.toUpperCase();
    }
    function y(E2) {
      return E2 != null ? E2 instanceof Array ? E2 : typeof E2.length != "number" || E2.split || E2.setInterval || E2.call ? [E2] : Array.prototype.slice.call(E2) : [];
    }
    function b(E2, f) {
      var P2 = E2;
      if (f)
        for (var M in f)
          P2[M] = f[M];
      return P2;
    }
    function v(E2) {
      var f = "[A-Za-z]", P2 = "[0-9]", M = a(P2, "[A-Fa-f]"), A = d(d("%[EFef]" + M + "%" + M + M + "%" + M + M) + "|" + d("%[89A-Fa-f]" + M + "%" + M + M) + "|" + d("%" + M + M)), X = "[\\:\\/\\?\\#\\[\\]\\@]", Q = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", de = a(X, Q), he = E2 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", _e = E2 ? "[\\uE000-\\uF8FF]" : "[]", ue = a(f, P2, "[\\-\\.\\_\\~]", he);
      d(f + a(f, P2, "[\\+\\-\\.]") + "*"), d(d(A + "|" + a(ue, Q, "[\\:]")) + "*");
      var ce = d(d("25[0-5]") + "|" + d("2[0-4]" + P2) + "|" + d("1" + P2 + P2) + "|" + d("0?[1-9]" + P2) + "|0?0?" + P2), ve = d(ce + "\\." + ce + "\\." + ce + "\\." + ce), ee = d(M + "{1,4}"), me = d(d(ee + "\\:" + ee) + "|" + ve), we = d(d(ee + "\\:") + "{6}" + me), ge = d("\\:\\:" + d(ee + "\\:") + "{5}" + me), ar = d(d(ee) + "?\\:\\:" + d(ee + "\\:") + "{4}" + me), Ke = d(d(d(ee + "\\:") + "{0,1}" + ee) + "?\\:\\:" + d(ee + "\\:") + "{3}" + me), We = d(d(d(ee + "\\:") + "{0,2}" + ee) + "?\\:\\:" + d(ee + "\\:") + "{2}" + me), Pr = d(d(d(ee + "\\:") + "{0,3}" + ee) + "?\\:\\:" + ee + "\\:" + me), lr = d(d(d(ee + "\\:") + "{0,4}" + ee) + "?\\:\\:" + me), De = d(d(d(ee + "\\:") + "{0,5}" + ee) + "?\\:\\:" + ee), Je = d(d(d(ee + "\\:") + "{0,6}" + ee) + "?\\:\\:"), fr = d([we, ge, ar, Ke, We, Pr, lr, De, Je].join("|")), er = d(d(ue + "|" + A) + "+");
      d("[vV]" + M + "+\\." + a(ue, Q, "[\\:]") + "+"), d(d(A + "|" + a(ue, Q)) + "*");
      var qr = d(A + "|" + a(ue, Q, "[\\:\\@]"));
      return d(d(A + "|" + a(ue, Q, "[\\@]")) + "+"), d(d(qr + "|" + a("[\\/\\?]", _e)) + "*"), {
        NOT_SCHEME: new RegExp(a("[^]", f, P2, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(a("[^\\%\\:]", ue, Q), "g"),
        NOT_HOST: new RegExp(a("[^\\%\\[\\]\\:]", ue, Q), "g"),
        NOT_PATH: new RegExp(a("[^\\%\\/\\:\\@]", ue, Q), "g"),
        NOT_PATH_NOSCHEME: new RegExp(a("[^\\%\\/\\@]", ue, Q), "g"),
        NOT_QUERY: new RegExp(a("[^\\%]", ue, Q, "[\\:\\@\\/\\?]", _e), "g"),
        NOT_FRAGMENT: new RegExp(a("[^\\%]", ue, Q, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(a("[^]", ue, Q), "g"),
        UNRESERVED: new RegExp(ue, "g"),
        OTHER_CHARS: new RegExp(a("[^\\%]", ue, de), "g"),
        PCT_ENCODED: new RegExp(A, "g"),
        IPV4ADDRESS: new RegExp("^(" + ve + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + fr + ")" + d(d("\\%25|\\%(?!" + M + "{2})") + "(" + er + ")") + "?\\]?$")
        //RFC 6874, with relaxed parsing rules
      };
    }
    var g2 = v(false), S = v(true), z = function() {
      function E2(f, P2) {
        var M = [], A = true, X = false, Q = void 0;
        try {
          for (var de = f[Symbol.iterator](), he; !(A = (he = de.next()).done) && (M.push(he.value), !(P2 && M.length === P2)); A = true)
            ;
        } catch (_e) {
          X = true, Q = _e;
        } finally {
          try {
            !A && de.return && de.return();
          } finally {
            if (X)
              throw Q;
          }
        }
        return M;
      }
      return function(f, P2) {
        if (Array.isArray(f))
          return f;
        if (Symbol.iterator in Object(f))
          return E2(f, P2);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(), L = function(E2) {
      if (Array.isArray(E2)) {
        for (var f = 0, P2 = Array(E2.length); f < E2.length; f++)
          P2[f] = E2[f];
        return P2;
      } else
        return Array.from(E2);
    }, R = 2147483647, j = 36, T = 1, $ = 26, N2 = 38, D2 = 700, t = 72, u2 = 128, s = "-", i2 = /^xn--/, c = /[^\0-\x7E]/, m = /[\x2E\u3002\uFF0E\uFF61]/g, h2 = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, C = j - T, U = Math.floor, H = String.fromCharCode;
    function V(E2) {
      throw new RangeError(h2[E2]);
    }
    function G(E2, f) {
      for (var P2 = [], M = E2.length; M--; )
        P2[M] = f(E2[M]);
      return P2;
    }
    function _2(E2, f) {
      var P2 = E2.split("@"), M = "";
      P2.length > 1 && (M = P2[0] + "@", E2 = P2[1]), E2 = E2.replace(m, ".");
      var A = E2.split("."), X = G(A, f).join(".");
      return M + X;
    }
    function q(E2) {
      for (var f = [], P2 = 0, M = E2.length; P2 < M; ) {
        var A = E2.charCodeAt(P2++);
        if (A >= 55296 && A <= 56319 && P2 < M) {
          var X = E2.charCodeAt(P2++);
          (X & 64512) == 56320 ? f.push(((A & 1023) << 10) + (X & 1023) + 65536) : (f.push(A), P2--);
        } else
          f.push(A);
      }
      return f;
    }
    var J = function(f) {
      return String.fromCodePoint.apply(String, L(f));
    }, Z = function(f) {
      return f - 48 < 10 ? f - 22 : f - 65 < 26 ? f - 65 : f - 97 < 26 ? f - 97 : j;
    }, B = function(f, P2) {
      return f + 22 + 75 * (f < 26) - ((P2 != 0) << 5);
    }, k = function(f, P2, M) {
      var A = 0;
      for (
        f = M ? U(f / D2) : f >> 1, f += U(f / P2);
        /* no initialization */
        f > C * $ >> 1;
        A += j
      )
        f = U(f / C);
      return U(A + (C + 1) * f / (f + N2));
    }, F = function(f) {
      var P2 = [], M = f.length, A = 0, X = u2, Q = t, de = f.lastIndexOf(s);
      de < 0 && (de = 0);
      for (var he = 0; he < de; ++he)
        f.charCodeAt(he) >= 128 && V("not-basic"), P2.push(f.charCodeAt(he));
      for (var _e = de > 0 ? de + 1 : 0; _e < M; ) {
        for (
          var ue = A, ce = 1, ve = j;
          ;
          /* no condition */
          ve += j
        ) {
          _e >= M && V("invalid-input");
          var ee = Z(f.charCodeAt(_e++));
          (ee >= j || ee > U((R - A) / ce)) && V("overflow"), A += ee * ce;
          var me = ve <= Q ? T : ve >= Q + $ ? $ : ve - Q;
          if (ee < me)
            break;
          var we = j - me;
          ce > U(R / we) && V("overflow"), ce *= we;
        }
        var ge = P2.length + 1;
        Q = k(A - ue, ge, ue == 0), U(A / ge) > R - X && V("overflow"), X += U(A / ge), A %= ge, P2.splice(A++, 0, X);
      }
      return String.fromCodePoint.apply(String, P2);
    }, O = function(f) {
      var P2 = [];
      f = q(f);
      var M = f.length, A = u2, X = 0, Q = t, de = true, he = false, _e = void 0;
      try {
        for (var ue = f[Symbol.iterator](), ce; !(de = (ce = ue.next()).done); de = true) {
          var ve = ce.value;
          ve < 128 && P2.push(H(ve));
        }
      } catch (Gr) {
        he = true, _e = Gr;
      } finally {
        try {
          !de && ue.return && ue.return();
        } finally {
          if (he)
            throw _e;
        }
      }
      var ee = P2.length, me = ee;
      for (ee && P2.push(s); me < M; ) {
        var we = R, ge = true, ar = false, Ke = void 0;
        try {
          for (var We = f[Symbol.iterator](), Pr; !(ge = (Pr = We.next()).done); ge = true) {
            var lr = Pr.value;
            lr >= A && lr < we && (we = lr);
          }
        } catch (Gr) {
          ar = true, Ke = Gr;
        } finally {
          try {
            !ge && We.return && We.return();
          } finally {
            if (ar)
              throw Ke;
          }
        }
        var De = me + 1;
        we - A > U((R - X) / De) && V("overflow"), X += (we - A) * De, A = we;
        var Je = true, fr = false, er = void 0;
        try {
          for (var qr = f[Symbol.iterator](), qa; !(Je = (qa = qr.next()).done); Je = true) {
            var Ga = qa.value;
            if (Ga < A && ++X > R && V("overflow"), Ga == A) {
              for (
                var dt = X, it = j;
                ;
                /* no condition */
                it += j
              ) {
                var ot = it <= Q ? T : it >= Q + $ ? $ : it - Q;
                if (dt < ot)
                  break;
                var Ka = dt - ot, Wa = j - ot;
                P2.push(H(B(ot + Ka % Wa, 0))), dt = U(Ka / Wa);
              }
              P2.push(H(B(dt, 0))), Q = k(X, De, me == ee), X = 0, ++me;
            }
          }
        } catch (Gr) {
          fr = true, er = Gr;
        } finally {
          try {
            !Je && qr.return && qr.return();
          } finally {
            if (fr)
              throw er;
          }
        }
        ++X, ++A;
      }
      return P2.join("");
    }, l = function(f) {
      return _2(f, function(P2) {
        return i2.test(P2) ? F(P2.slice(4).toLowerCase()) : P2;
      });
    }, w2 = function(f) {
      return _2(f, function(P2) {
        return c.test(P2) ? "xn--" + O(P2) : P2;
      });
    }, I = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "2.1.0",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: q,
        encode: J
      },
      decode: F,
      encode: O,
      toASCII: w2,
      toUnicode: l
    }, K = {};
    function W(E2) {
      var f = E2.charCodeAt(0), P2 = void 0;
      return f < 16 ? P2 = "%0" + f.toString(16).toUpperCase() : f < 128 ? P2 = "%" + f.toString(16).toUpperCase() : f < 2048 ? P2 = "%" + (f >> 6 | 192).toString(16).toUpperCase() + "%" + (f & 63 | 128).toString(16).toUpperCase() : P2 = "%" + (f >> 12 | 224).toString(16).toUpperCase() + "%" + (f >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (f & 63 | 128).toString(16).toUpperCase(), P2;
    }
    function re(E2) {
      for (var f = "", P2 = 0, M = E2.length; P2 < M; ) {
        var A = parseInt(E2.substr(P2 + 1, 2), 16);
        if (A < 128)
          f += String.fromCharCode(A), P2 += 3;
        else if (A >= 194 && A < 224) {
          if (M - P2 >= 6) {
            var X = parseInt(E2.substr(P2 + 4, 2), 16);
            f += String.fromCharCode((A & 31) << 6 | X & 63);
          } else
            f += E2.substr(P2, 6);
          P2 += 6;
        } else if (A >= 224) {
          if (M - P2 >= 9) {
            var Q = parseInt(E2.substr(P2 + 4, 2), 16), de = parseInt(E2.substr(P2 + 7, 2), 16);
            f += String.fromCharCode((A & 15) << 12 | (Q & 63) << 6 | de & 63);
          } else
            f += E2.substr(P2, 9);
          P2 += 9;
        } else
          f += E2.substr(P2, 3), P2 += 3;
      }
      return f;
    }
    function ae(E2, f) {
      function P2(M) {
        var A = re(M);
        return A.match(f.UNRESERVED) ? A : M;
      }
      return E2.scheme && (E2.scheme = String(E2.scheme).replace(f.PCT_ENCODED, P2).toLowerCase().replace(f.NOT_SCHEME, "")), E2.userinfo !== void 0 && (E2.userinfo = String(E2.userinfo).replace(f.PCT_ENCODED, P2).replace(f.NOT_USERINFO, W).replace(f.PCT_ENCODED, p)), E2.host !== void 0 && (E2.host = String(E2.host).replace(f.PCT_ENCODED, P2).toLowerCase().replace(f.NOT_HOST, W).replace(f.PCT_ENCODED, p)), E2.path !== void 0 && (E2.path = String(E2.path).replace(f.PCT_ENCODED, P2).replace(E2.scheme ? f.NOT_PATH : f.NOT_PATH_NOSCHEME, W).replace(f.PCT_ENCODED, p)), E2.query !== void 0 && (E2.query = String(E2.query).replace(f.PCT_ENCODED, P2).replace(f.NOT_QUERY, W).replace(f.PCT_ENCODED, p)), E2.fragment !== void 0 && (E2.fragment = String(E2.fragment).replace(f.PCT_ENCODED, P2).replace(f.NOT_FRAGMENT, W).replace(f.PCT_ENCODED, p)), E2;
    }
    function fe(E2) {
      return E2.replace(/^0*(.*)/, "$1") || "0";
    }
    function je(E2, f) {
      var P2 = E2.match(f.IPV4ADDRESS) || [], M = z(P2, 2), A = M[1];
      return A ? A.split(".").map(fe).join(".") : E2;
    }
    function xe(E2, f) {
      var P2 = E2.match(f.IPV6ADDRESS) || [], M = z(P2, 3), A = M[1], X = M[2];
      if (A) {
        for (var Q = A.toLowerCase().split("::").reverse(), de = z(Q, 2), he = de[0], _e = de[1], ue = _e ? _e.split(":").map(fe) : [], ce = he.split(":").map(fe), ve = f.IPV4ADDRESS.test(ce[ce.length - 1]), ee = ve ? 7 : 8, me = ce.length - ee, we = Array(ee), ge = 0; ge < ee; ++ge)
          we[ge] = ue[ge] || ce[me + ge] || "";
        ve && (we[ee - 1] = je(we[ee - 1], f));
        var ar = we.reduce(function(De, Je, fr) {
          if (!Je || Je === "0") {
            var er = De[De.length - 1];
            er && er.index + er.length === fr ? er.length++ : De.push({ index: fr, length: 1 });
          }
          return De;
        }, []), Ke = ar.sort(function(De, Je) {
          return Je.length - De.length;
        })[0], We = void 0;
        if (Ke && Ke.length > 1) {
          var Pr = we.slice(0, Ke.index), lr = we.slice(Ke.index + Ke.length);
          We = Pr.join(":") + "::" + lr.join(":");
        } else
          We = we.join(":");
        return X && (We += "%" + X), We;
      } else
        return E2;
    }
    var Lr = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i, zr = "".match(/(){0}/)[1] === void 0;
    function Ie(E2) {
      var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, P2 = {}, M = f.iri !== false ? S : g2;
      f.reference === "suffix" && (E2 = (f.scheme ? f.scheme + ":" : "") + "//" + E2);
      var A = E2.match(Lr);
      if (A) {
        zr ? (P2.scheme = A[1], P2.userinfo = A[3], P2.host = A[4], P2.port = parseInt(A[5], 10), P2.path = A[6] || "", P2.query = A[7], P2.fragment = A[8], isNaN(P2.port) && (P2.port = A[5])) : (P2.scheme = A[1] || void 0, P2.userinfo = E2.indexOf("@") !== -1 ? A[3] : void 0, P2.host = E2.indexOf("//") !== -1 ? A[4] : void 0, P2.port = parseInt(A[5], 10), P2.path = A[6] || "", P2.query = E2.indexOf("?") !== -1 ? A[7] : void 0, P2.fragment = E2.indexOf("#") !== -1 ? A[8] : void 0, isNaN(P2.port) && (P2.port = E2.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? A[4] : void 0)), P2.host && (P2.host = xe(je(P2.host, M), M)), P2.scheme === void 0 && P2.userinfo === void 0 && P2.host === void 0 && P2.port === void 0 && !P2.path && P2.query === void 0 ? P2.reference = "same-document" : P2.scheme === void 0 ? P2.reference = "relative" : P2.fragment === void 0 ? P2.reference = "absolute" : P2.reference = "uri", f.reference && f.reference !== "suffix" && f.reference !== P2.reference && (P2.error = P2.error || "URI is not a " + f.reference + " reference.");
        var X = K[(f.scheme || P2.scheme || "").toLowerCase()];
        if (!f.unicodeSupport && (!X || !X.unicodeSupport)) {
          if (P2.host && (f.domainHost || X && X.domainHost))
            try {
              P2.host = I.toASCII(P2.host.replace(M.PCT_ENCODED, re).toLowerCase());
            } catch (Q) {
              P2.error = P2.error || "Host's domain name can not be converted to ASCII via punycode: " + Q;
            }
          ae(P2, g2);
        } else
          ae(P2, M);
        X && X.parse && X.parse(P2, f);
      } else
        P2.error = P2.error || "URI can not be parsed.";
      return P2;
    }
    function Vr(E2, f) {
      var P2 = f.iri !== false ? S : g2, M = [];
      return E2.userinfo !== void 0 && (M.push(E2.userinfo), M.push("@")), E2.host !== void 0 && M.push(xe(je(String(E2.host), P2), P2).replace(P2.IPV6ADDRESS, function(A, X, Q) {
        return "[" + X + (Q ? "%25" + Q : "") + "]";
      })), (typeof E2.port == "number" || typeof E2.port == "string") && (M.push(":"), M.push(String(E2.port))), M.length ? M.join("") : void 0;
    }
    var wr = /^\.\.?\//, br = /^\/\.(\/|$)/, $r = /^\/\.\.(\/|$)/, Fr = /^\/?(?:.|\n)*?(?=\/|$)/;
    function qe(E2) {
      for (var f = []; E2.length; )
        if (E2.match(wr))
          E2 = E2.replace(wr, "");
        else if (E2.match(br))
          E2 = E2.replace(br, "/");
        else if (E2.match($r))
          E2 = E2.replace($r, "/"), f.pop();
        else if (E2 === "." || E2 === "..")
          E2 = "";
        else {
          var P2 = E2.match(Fr);
          if (P2) {
            var M = P2[0];
            E2 = E2.slice(M.length), f.push(M);
          } else
            throw new Error("Unexpected dot segment condition");
        }
      return f.join("");
    }
    function Ne(E2) {
      var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, P2 = f.iri ? S : g2, M = [], A = K[(f.scheme || E2.scheme || "").toLowerCase()];
      if (A && A.serialize && A.serialize(E2, f), E2.host && !P2.IPV6ADDRESS.test(E2.host)) {
        if (f.domainHost || A && A.domainHost)
          try {
            E2.host = f.iri ? I.toUnicode(E2.host) : I.toASCII(E2.host.replace(P2.PCT_ENCODED, re).toLowerCase());
          } catch (de) {
            E2.error = E2.error || "Host's domain name can not be converted to " + (f.iri ? "Unicode" : "ASCII") + " via punycode: " + de;
          }
      }
      ae(E2, P2), f.reference !== "suffix" && E2.scheme && (M.push(E2.scheme), M.push(":"));
      var X = Vr(E2, f);
      if (X !== void 0 && (f.reference !== "suffix" && M.push("//"), M.push(X), E2.path && E2.path.charAt(0) !== "/" && M.push("/")), E2.path !== void 0) {
        var Q = E2.path;
        !f.absolutePath && (!A || !A.absolutePath) && (Q = qe(Q)), X === void 0 && (Q = Q.replace(/^\/\//, "/%2F")), M.push(Q);
      }
      return E2.query !== void 0 && (M.push("?"), M.push(E2.query)), E2.fragment !== void 0 && (M.push("#"), M.push(E2.fragment)), M.join("");
    }
    function Er(E2, f) {
      var P2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, M = arguments[3], A = {};
      return M || (E2 = Ie(Ne(E2, P2), P2), f = Ie(Ne(f, P2), P2)), P2 = P2 || {}, !P2.tolerant && f.scheme ? (A.scheme = f.scheme, A.userinfo = f.userinfo, A.host = f.host, A.port = f.port, A.path = qe(f.path || ""), A.query = f.query) : (f.userinfo !== void 0 || f.host !== void 0 || f.port !== void 0 ? (A.userinfo = f.userinfo, A.host = f.host, A.port = f.port, A.path = qe(f.path || ""), A.query = f.query) : (f.path ? (f.path.charAt(0) === "/" ? A.path = qe(f.path) : ((E2.userinfo !== void 0 || E2.host !== void 0 || E2.port !== void 0) && !E2.path ? A.path = "/" + f.path : E2.path ? A.path = E2.path.slice(0, E2.path.lastIndexOf("/") + 1) + f.path : A.path = f.path, A.path = qe(A.path)), A.query = f.query) : (A.path = E2.path, f.query !== void 0 ? A.query = f.query : A.query = E2.query), A.userinfo = E2.userinfo, A.host = E2.host, A.port = E2.port), A.scheme = E2.scheme), A.fragment = f.fragment, A;
    }
    function Ur(E2, f, P2) {
      var M = b({ scheme: "null" }, P2);
      return Ne(Er(Ie(E2, M), Ie(f, M), M, true), M);
    }
    function or(E2, f) {
      return typeof E2 == "string" ? E2 = Ne(Ie(E2, f), f) : o2(E2) === "object" && (E2 = Ie(Ne(E2, f), f)), E2;
    }
    function Br(E2, f, P2) {
      return typeof E2 == "string" ? E2 = Ne(Ie(E2, P2), P2) : o2(E2) === "object" && (E2 = Ne(E2, P2)), typeof f == "string" ? f = Ne(Ie(f, P2), P2) : o2(f) === "object" && (f = Ne(f, P2)), E2 === f;
    }
    function ut(E2, f) {
      return E2 && E2.toString().replace(!f || !f.iri ? g2.ESCAPE : S.ESCAPE, W);
    }
    function Me(E2, f) {
      return E2 && E2.toString().replace(!f || !f.iri ? g2.PCT_ENCODED : S.PCT_ENCODED, re);
    }
    var cr = {
      scheme: "http",
      domainHost: true,
      parse: function(f, P2) {
        return f.host || (f.error = f.error || "HTTP URIs must have a host."), f;
      },
      serialize: function(f, P2) {
        var M = String(f.scheme).toLowerCase() === "https";
        return (f.port === (M ? 443 : 80) || f.port === "") && (f.port = void 0), f.path || (f.path = "/"), f;
      }
    }, Da = {
      scheme: "https",
      domainHost: cr.domainHost,
      parse: cr.parse,
      serialize: cr.serialize
    };
    function La(E2) {
      return typeof E2.secure == "boolean" ? E2.secure : String(E2.scheme).toLowerCase() === "wss";
    }
    var Hr = {
      scheme: "ws",
      domainHost: true,
      parse: function(f, P2) {
        var M = f;
        return M.secure = La(M), M.resourceName = (M.path || "/") + (M.query ? "?" + M.query : ""), M.path = void 0, M.query = void 0, M;
      },
      serialize: function(f, P2) {
        if ((f.port === (La(f) ? 443 : 80) || f.port === "") && (f.port = void 0), typeof f.secure == "boolean" && (f.scheme = f.secure ? "wss" : "ws", f.secure = void 0), f.resourceName) {
          var M = f.resourceName.split("?"), A = z(M, 2), X = A[0], Q = A[1];
          f.path = X && X !== "/" ? X : void 0, f.query = Q, f.resourceName = void 0;
        }
        return f.fragment = void 0, f;
      }
    }, za = {
      scheme: "wss",
      domainHost: Hr.domainHost,
      parse: Hr.parse,
      serialize: Hr.serialize
    }, ls = {}, Va = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]", Ge = "[0-9A-Fa-f]", fs = d(d("%[EFef]" + Ge + "%" + Ge + Ge + "%" + Ge + Ge) + "|" + d("%[89A-Fa-f]" + Ge + "%" + Ge + Ge) + "|" + d("%" + Ge + Ge)), hs = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]", ps = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]", ms = a(ps, '[\\"\\\\]'), gs = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]", _s = new RegExp(Va, "g"), kr = new RegExp(fs, "g"), vs = new RegExp(a("[^]", hs, "[\\.]", '[\\"]', ms), "g"), Fa = new RegExp(a("[^]", Va, gs), "g"), ys = Fa;
    function Mt(E2) {
      var f = re(E2);
      return f.match(_s) ? f : E2;
    }
    var Ua = {
      scheme: "mailto",
      parse: function(f, P2) {
        var M = f, A = M.to = M.path ? M.path.split(",") : [];
        if (M.path = void 0, M.query) {
          for (var X = false, Q = {}, de = M.query.split("&"), he = 0, _e = de.length; he < _e; ++he) {
            var ue = de[he].split("=");
            switch (ue[0]) {
              case "to":
                for (var ce = ue[1].split(","), ve = 0, ee = ce.length; ve < ee; ++ve)
                  A.push(ce[ve]);
                break;
              case "subject":
                M.subject = Me(ue[1], P2);
                break;
              case "body":
                M.body = Me(ue[1], P2);
                break;
              default:
                X = true, Q[Me(ue[0], P2)] = Me(ue[1], P2);
                break;
            }
          }
          X && (M.headers = Q);
        }
        M.query = void 0;
        for (var me = 0, we = A.length; me < we; ++me) {
          var ge = A[me].split("@");
          if (ge[0] = Me(ge[0]), P2.unicodeSupport)
            ge[1] = Me(ge[1], P2).toLowerCase();
          else
            try {
              ge[1] = I.toASCII(Me(ge[1], P2).toLowerCase());
            } catch (ar) {
              M.error = M.error || "Email address's domain name can not be converted to ASCII via punycode: " + ar;
            }
          A[me] = ge.join("@");
        }
        return M;
      },
      serialize: function(f, P2) {
        var M = f, A = y(f.to);
        if (A) {
          for (var X = 0, Q = A.length; X < Q; ++X) {
            var de = String(A[X]), he = de.lastIndexOf("@"), _e = de.slice(0, he).replace(kr, Mt).replace(kr, p).replace(vs, W), ue = de.slice(he + 1);
            try {
              ue = P2.iri ? I.toUnicode(ue) : I.toASCII(Me(ue, P2).toLowerCase());
            } catch (me) {
              M.error = M.error || "Email address's domain name can not be converted to " + (P2.iri ? "Unicode" : "ASCII") + " via punycode: " + me;
            }
            A[X] = _e + "@" + ue;
          }
          M.path = A.join(",");
        }
        var ce = f.headers = f.headers || {};
        f.subject && (ce.subject = f.subject), f.body && (ce.body = f.body);
        var ve = [];
        for (var ee in ce)
          ce[ee] !== ls[ee] && ve.push(ee.replace(kr, Mt).replace(kr, p).replace(Fa, W) + "=" + ce[ee].replace(kr, Mt).replace(kr, p).replace(ys, W));
        return ve.length && (M.query = ve.join("&")), M;
      }
    }, ws = /^([^\:]+)\:(.*)/, Ba = {
      scheme: "urn",
      parse: function(f, P2) {
        var M = f.path && f.path.match(ws), A = f;
        if (M) {
          var X = P2.scheme || A.scheme || "urn", Q = M[1].toLowerCase(), de = M[2], he = X + ":" + (P2.nid || Q), _e = K[he];
          A.nid = Q, A.nss = de, A.path = void 0, _e && (A = _e.parse(A, P2));
        } else
          A.error = A.error || "URN can not be parsed.";
        return A;
      },
      serialize: function(f, P2) {
        var M = P2.scheme || f.scheme || "urn", A = f.nid, X = M + ":" + (P2.nid || A), Q = K[X];
        Q && (f = Q.serialize(f, P2));
        var de = f, he = f.nss;
        return de.path = (A || P2.nid) + ":" + he, de;
      }
    }, bs = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/, Ha = {
      scheme: "urn:uuid",
      parse: function(f, P2) {
        var M = f;
        return M.uuid = M.nss, M.nss = void 0, !P2.tolerant && (!M.uuid || !M.uuid.match(bs)) && (M.error = M.error || "UUID is not valid."), M;
      },
      serialize: function(f, P2) {
        var M = f;
        return M.nss = (f.uuid || "").toLowerCase(), M;
      }
    };
    K[cr.scheme] = cr, K[Da.scheme] = Da, K[Hr.scheme] = Hr, K[za.scheme] = za, K[Ua.scheme] = Ua, K[Ba.scheme] = Ba, K[Ha.scheme] = Ha, n.SCHEMES = K, n.pctEncChar = W, n.pctDecChars = re, n.parse = Ie, n.removeDotSegments = qe, n.serialize = Ne, n.resolveComponents = Er, n.resolve = Ur, n.normalize = or, n.equal = Br, n.escapeComponent = ut, n.unescapeComponent = Me, Object.defineProperty(n, "__esModule", { value: true });
  });
})(sd, $t);
Object.defineProperty(ta, "__esModule", { value: true });
var Jn = $t;
Jn.code = 'require("ajv/dist/runtime/uri").default';
ta.default = Jn;
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.CodeGen = e2.Name = e2.nil = e2.stringify = e2.str = e2._ = e2.KeywordCxt = void 0;
  var r3 = He;
  Object.defineProperty(e2, "KeywordCxt", { enumerable: true, get: function() {
    return r3.KeywordCxt;
  } });
  var n = se;
  Object.defineProperty(e2, "_", { enumerable: true, get: function() {
    return n._;
  } }), Object.defineProperty(e2, "str", { enumerable: true, get: function() {
    return n.str;
  } }), Object.defineProperty(e2, "stringify", { enumerable: true, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e2, "nil", { enumerable: true, get: function() {
    return n.nil;
  } }), Object.defineProperty(e2, "Name", { enumerable: true, get: function() {
    return n.Name;
  } }), Object.defineProperty(e2, "CodeGen", { enumerable: true, get: function() {
    return n.CodeGen;
  } });
  const a = at, d = nt, o2 = vr, p = Ae, y = se, b = ke, v = tt, g2 = ie, S = nd, z = ta, L = (B, k) => new RegExp(B, k);
  L.code = "new RegExp";
  const R = ["removeAdditional", "useDefaults", "coerceTypes"], j = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), T = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, $ = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, N2 = 200;
  function D2(B) {
    var k, F, O, l, w2, I, K, W, re, ae, fe, je, xe, Lr, zr, Ie, Vr, wr, br, $r, Fr, qe, Ne, Er, Ur;
    const or = B.strict, Br = (k = B.code) === null || k === void 0 ? void 0 : k.optimize, ut = Br === true || Br === void 0 ? 1 : Br || 0, Me = (O = (F = B.code) === null || F === void 0 ? void 0 : F.regExp) !== null && O !== void 0 ? O : L, cr = (l = B.uriResolver) !== null && l !== void 0 ? l : z.default;
    return {
      strictSchema: (I = (w2 = B.strictSchema) !== null && w2 !== void 0 ? w2 : or) !== null && I !== void 0 ? I : true,
      strictNumbers: (W = (K = B.strictNumbers) !== null && K !== void 0 ? K : or) !== null && W !== void 0 ? W : true,
      strictTypes: (ae = (re = B.strictTypes) !== null && re !== void 0 ? re : or) !== null && ae !== void 0 ? ae : "log",
      strictTuples: (je = (fe = B.strictTuples) !== null && fe !== void 0 ? fe : or) !== null && je !== void 0 ? je : "log",
      strictRequired: (Lr = (xe = B.strictRequired) !== null && xe !== void 0 ? xe : or) !== null && Lr !== void 0 ? Lr : false,
      code: B.code ? { ...B.code, optimize: ut, regExp: Me } : { optimize: ut, regExp: Me },
      loopRequired: (zr = B.loopRequired) !== null && zr !== void 0 ? zr : N2,
      loopEnum: (Ie = B.loopEnum) !== null && Ie !== void 0 ? Ie : N2,
      meta: (Vr = B.meta) !== null && Vr !== void 0 ? Vr : true,
      messages: (wr = B.messages) !== null && wr !== void 0 ? wr : true,
      inlineRefs: (br = B.inlineRefs) !== null && br !== void 0 ? br : true,
      schemaId: ($r = B.schemaId) !== null && $r !== void 0 ? $r : "$id",
      addUsedSchema: (Fr = B.addUsedSchema) !== null && Fr !== void 0 ? Fr : true,
      validateSchema: (qe = B.validateSchema) !== null && qe !== void 0 ? qe : true,
      validateFormats: (Ne = B.validateFormats) !== null && Ne !== void 0 ? Ne : true,
      unicodeRegExp: (Er = B.unicodeRegExp) !== null && Er !== void 0 ? Er : true,
      int32range: (Ur = B.int32range) !== null && Ur !== void 0 ? Ur : true,
      uriResolver: cr
    };
  }
  class t {
    constructor(k = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), k = this.opts = { ...k, ...D2(k) };
      const { es5: F, lines: O } = this.opts.code;
      this.scope = new y.ValueScope({ scope: {}, prefixes: j, es5: F, lines: O }), this.logger = U(k.logger);
      const l = k.validateFormats;
      k.validateFormats = false, this.RULES = (0, o2.getRules)(), u2.call(this, T, k, "NOT SUPPORTED"), u2.call(this, $, k, "DEPRECATED", "warn"), this._metaOpts = h2.call(this), k.formats && c.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), k.keywords && m.call(this, k.keywords), typeof k.meta == "object" && this.addMetaSchema(k.meta), i2.call(this), k.validateFormats = l;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: k, meta: F, schemaId: O } = this.opts;
      let l = S;
      O === "id" && (l = { ...S }, l.id = l.$id, delete l.$id), F && k && this.addMetaSchema(l, l[O], false);
    }
    defaultMeta() {
      const { meta: k, schemaId: F } = this.opts;
      return this.opts.defaultMeta = typeof k == "object" ? k[F] || k : void 0;
    }
    validate(k, F) {
      let O;
      if (typeof k == "string") {
        if (O = this.getSchema(k), !O)
          throw new Error(`no schema with key or ref "${k}"`);
      } else
        O = this.compile(k);
      const l = O(F);
      return "$async" in O || (this.errors = O.errors), l;
    }
    compile(k, F) {
      const O = this._addSchema(k, F);
      return O.validate || this._compileSchemaEnv(O);
    }
    compileAsync(k, F) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: O } = this.opts;
      return l.call(this, k, F);
      async function l(ae, fe) {
        await w2.call(this, ae.$schema);
        const je = this._addSchema(ae, fe);
        return je.validate || I.call(this, je);
      }
      async function w2(ae) {
        ae && !this.getSchema(ae) && await l.call(this, { $ref: ae }, true);
      }
      async function I(ae) {
        try {
          return this._compileSchemaEnv(ae);
        } catch (fe) {
          if (!(fe instanceof d.default))
            throw fe;
          return K.call(this, fe), await W.call(this, fe.missingSchema), I.call(this, ae);
        }
      }
      function K({ missingSchema: ae, missingRef: fe }) {
        if (this.refs[ae])
          throw new Error(`AnySchema ${ae} is loaded but ${fe} cannot be resolved`);
      }
      async function W(ae) {
        const fe = await re.call(this, ae);
        this.refs[ae] || await w2.call(this, fe.$schema), this.refs[ae] || this.addSchema(fe, ae, F);
      }
      async function re(ae) {
        const fe = this._loading[ae];
        if (fe)
          return fe;
        try {
          return await (this._loading[ae] = O(ae));
        } finally {
          delete this._loading[ae];
        }
      }
    }
    // Adds schema to the instance
    addSchema(k, F, O, l = this.opts.validateSchema) {
      if (Array.isArray(k)) {
        for (const I of k)
          this.addSchema(I, void 0, O, l);
        return this;
      }
      let w2;
      if (typeof k == "object") {
        const { schemaId: I } = this.opts;
        if (w2 = k[I], w2 !== void 0 && typeof w2 != "string")
          throw new Error(`schema ${I} must be string`);
      }
      return F = (0, b.normalizeId)(F || w2), this._checkUnique(F), this.schemas[F] = this._addSchema(k, O, F, l, true), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(k, F, O = this.opts.validateSchema) {
      return this.addSchema(k, F, true, O), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(k, F) {
      if (typeof k == "boolean")
        return true;
      let O;
      if (O = k.$schema, O !== void 0 && typeof O != "string")
        throw new Error("$schema must be a string");
      if (O = O || this.opts.defaultMeta || this.defaultMeta(), !O)
        return this.logger.warn("meta-schema not available"), this.errors = null, true;
      const l = this.validate(O, k);
      if (!l && F) {
        const w2 = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(w2);
        else
          throw new Error(w2);
      }
      return l;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(k) {
      let F;
      for (; typeof (F = s.call(this, k)) == "string"; )
        k = F;
      if (F === void 0) {
        const { schemaId: O } = this.opts, l = new p.SchemaEnv({ schema: {}, schemaId: O });
        if (F = p.resolveSchema.call(this, l, k), !F)
          return;
        this.refs[k] = F;
      }
      return F.validate || this._compileSchemaEnv(F);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(k) {
      if (k instanceof RegExp)
        return this._removeAllSchemas(this.schemas, k), this._removeAllSchemas(this.refs, k), this;
      switch (typeof k) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const F = s.call(this, k);
          return typeof F == "object" && this._cache.delete(F.schema), delete this.schemas[k], delete this.refs[k], this;
        }
        case "object": {
          const F = k;
          this._cache.delete(F);
          let O = k[this.opts.schemaId];
          return O && (O = (0, b.normalizeId)(O), delete this.schemas[O], delete this.refs[O]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(k) {
      for (const F of k)
        this.addKeyword(F);
      return this;
    }
    addKeyword(k, F) {
      let O;
      if (typeof k == "string")
        O = k, typeof F == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), F.keyword = O);
      else if (typeof k == "object" && F === void 0) {
        if (F = k, O = F.keyword, Array.isArray(O) && !O.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (V.call(this, O, F), !F)
        return (0, g2.eachItem)(O, (w2) => G.call(this, w2)), this;
      q.call(this, F);
      const l = {
        ...F,
        type: (0, v.getJSONTypes)(F.type),
        schemaType: (0, v.getJSONTypes)(F.schemaType)
      };
      return (0, g2.eachItem)(O, l.type.length === 0 ? (w2) => G.call(this, w2, l) : (w2) => l.type.forEach((I) => G.call(this, w2, l, I))), this;
    }
    getKeyword(k) {
      const F = this.RULES.all[k];
      return typeof F == "object" ? F.definition : !!F;
    }
    // Remove keyword
    removeKeyword(k) {
      const { RULES: F } = this;
      delete F.keywords[k], delete F.all[k];
      for (const O of F.rules) {
        const l = O.rules.findIndex((w2) => w2.keyword === k);
        l >= 0 && O.rules.splice(l, 1);
      }
      return this;
    }
    // Add format
    addFormat(k, F) {
      return typeof F == "string" && (F = new RegExp(F)), this.formats[k] = F, this;
    }
    errorsText(k = this.errors, { separator: F = ", ", dataVar: O = "data" } = {}) {
      return !k || k.length === 0 ? "No errors" : k.map((l) => `${O}${l.instancePath} ${l.message}`).reduce((l, w2) => l + F + w2);
    }
    $dataMetaSchema(k, F) {
      const O = this.RULES.all;
      k = JSON.parse(JSON.stringify(k));
      for (const l of F) {
        const w2 = l.split("/").slice(1);
        let I = k;
        for (const K of w2)
          I = I[K];
        for (const K in O) {
          const W = O[K];
          if (typeof W != "object")
            continue;
          const { $data: re } = W.definition, ae = I[K];
          re && ae && (I[K] = Z(ae));
        }
      }
      return k;
    }
    _removeAllSchemas(k, F) {
      for (const O in k) {
        const l = k[O];
        (!F || F.test(O)) && (typeof l == "string" ? delete k[O] : l && !l.meta && (this._cache.delete(l.schema), delete k[O]));
      }
    }
    _addSchema(k, F, O, l = this.opts.validateSchema, w2 = this.opts.addUsedSchema) {
      let I;
      const { schemaId: K } = this.opts;
      if (typeof k == "object")
        I = k[K];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof k != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let W = this._cache.get(k);
      if (W !== void 0)
        return W;
      O = (0, b.normalizeId)(I || O);
      const re = b.getSchemaRefs.call(this, k, O);
      return W = new p.SchemaEnv({ schema: k, schemaId: K, meta: F, baseId: O, localRefs: re }), this._cache.set(W.schema, W), w2 && !O.startsWith("#") && (O && this._checkUnique(O), this.refs[O] = W), l && this.validateSchema(k, true), W;
    }
    _checkUnique(k) {
      if (this.schemas[k] || this.refs[k])
        throw new Error(`schema with key or id "${k}" already exists`);
    }
    _compileSchemaEnv(k) {
      if (k.meta ? this._compileMetaSchema(k) : p.compileSchema.call(this, k), !k.validate)
        throw new Error("ajv implementation error");
      return k.validate;
    }
    _compileMetaSchema(k) {
      const F = this.opts;
      this.opts = this._metaOpts;
      try {
        p.compileSchema.call(this, k);
      } finally {
        this.opts = F;
      }
    }
  }
  e2.default = t, t.ValidationError = a.default, t.MissingRefError = d.default;
  function u2(B, k, F, O = "error") {
    for (const l in B) {
      const w2 = l;
      w2 in k && this.logger[O](`${F}: option ${l}. ${B[w2]}`);
    }
  }
  function s(B) {
    return B = (0, b.normalizeId)(B), this.schemas[B] || this.refs[B];
  }
  function i2() {
    const B = this.opts.schemas;
    if (B)
      if (Array.isArray(B))
        this.addSchema(B);
      else
        for (const k in B)
          this.addSchema(B[k], k);
  }
  function c() {
    for (const B in this.opts.formats) {
      const k = this.opts.formats[B];
      k && this.addFormat(B, k);
    }
  }
  function m(B) {
    if (Array.isArray(B)) {
      this.addVocabulary(B);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const k in B) {
      const F = B[k];
      F.keyword || (F.keyword = k), this.addKeyword(F);
    }
  }
  function h2() {
    const B = { ...this.opts };
    for (const k of R)
      delete B[k];
    return B;
  }
  const C = { log() {
  }, warn() {
  }, error() {
  } };
  function U(B) {
    if (B === false)
      return C;
    if (B === void 0)
      return console;
    if (B.log && B.warn && B.error)
      return B;
    throw new Error("logger must implement log, warn and error methods");
  }
  const H = /^[a-z_$][a-z0-9_$:-]*$/i;
  function V(B, k) {
    const { RULES: F } = this;
    if ((0, g2.eachItem)(B, (O) => {
      if (F.keywords[O])
        throw new Error(`Keyword ${O} is already defined`);
      if (!H.test(O))
        throw new Error(`Keyword ${O} has invalid name`);
    }), !!k && k.$data && !("code" in k || "validate" in k))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function G(B, k, F) {
    var O;
    const l = k == null ? void 0 : k.post;
    if (F && l)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: w2 } = this;
    let I = l ? w2.post : w2.rules.find(({ type: W }) => W === F);
    if (I || (I = { type: F, rules: [] }, w2.rules.push(I)), w2.keywords[B] = true, !k)
      return;
    const K = {
      keyword: B,
      definition: {
        ...k,
        type: (0, v.getJSONTypes)(k.type),
        schemaType: (0, v.getJSONTypes)(k.schemaType)
      }
    };
    k.before ? _2.call(this, I, K, k.before) : I.rules.push(K), w2.all[B] = K, (O = k.implements) === null || O === void 0 || O.forEach((W) => this.addKeyword(W));
  }
  function _2(B, k, F) {
    const O = B.rules.findIndex((l) => l.keyword === F);
    O >= 0 ? B.rules.splice(O, 0, k) : (B.rules.push(k), this.logger.warn(`rule ${F} is not defined`));
  }
  function q(B) {
    let { metaSchema: k } = B;
    k !== void 0 && (B.$data && this.opts.$data && (k = Z(k)), B.validateSchema = this.compile(k, true));
  }
  const J = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function Z(B) {
    return { anyOf: [B, J] };
  }
})(kn);
var aa = {};
var na = {};
var sa = {};
Object.defineProperty(sa, "__esModule", { value: true });
var ud = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
sa.default = ud;
var yr = {};
Object.defineProperty(yr, "__esModule", { value: true });
yr.callRef = yr.getValidate = void 0;
var dd = nt;
var rn = ne;
var Re = se;
var Cr = Qe;
var tn = Ae;
var ct = ie;
var id = {
  keyword: "$ref",
  schemaType: "string",
  code(e2) {
    const { gen: r3, schema: n, it: a } = e2, { baseId: d, schemaEnv: o2, validateName: p, opts: y, self: b } = a, { root: v } = o2;
    if ((n === "#" || n === "#/") && d === v.baseId)
      return S();
    const g2 = tn.resolveRef.call(b, v, d, n);
    if (g2 === void 0)
      throw new dd.default(a.opts.uriResolver, d, n);
    if (g2 instanceof tn.SchemaEnv)
      return z(g2);
    return L(g2);
    function S() {
      if (o2 === v)
        return gt(e2, p, o2, o2.$async);
      const R = r3.scopeValue("root", { ref: v });
      return gt(e2, (0, Re._)`${R}.validate`, v, v.$async);
    }
    function z(R) {
      const j = Zn(e2, R);
      gt(e2, j, R, R.$async);
    }
    function L(R) {
      const j = r3.scopeValue("schema", y.code.source === true ? { ref: R, code: (0, Re.stringify)(R) } : { ref: R }), T = r3.name("valid"), $ = e2.subschema({
        schema: R,
        dataTypes: [],
        schemaPath: Re.nil,
        topSchemaRef: j,
        errSchemaPath: n
      }, T);
      e2.mergeEvaluated($), e2.ok(T);
    }
  }
};
function Zn(e2, r3) {
  const { gen: n } = e2;
  return r3.validate ? n.scopeValue("validate", { ref: r3.validate }) : (0, Re._)`${n.scopeValue("wrapper", { ref: r3 })}.validate`;
}
yr.getValidate = Zn;
function gt(e2, r3, n, a) {
  const { gen: d, it: o2 } = e2, { allErrors: p, schemaEnv: y, opts: b } = o2, v = b.passContext ? Cr.default.this : Re.nil;
  a ? g2() : S();
  function g2() {
    if (!y.$async)
      throw new Error("async schema referenced by sync schema");
    const R = d.let("valid");
    d.try(() => {
      d.code((0, Re._)`await ${(0, rn.callValidateCode)(e2, r3, v)}`), L(r3), p || d.assign(R, true);
    }, (j) => {
      d.if((0, Re._)`!(${j} instanceof ${o2.ValidationError})`, () => d.throw(j)), z(j), p || d.assign(R, false);
    }), e2.ok(R);
  }
  function S() {
    e2.result((0, rn.callValidateCode)(e2, r3, v), () => L(r3), () => z(r3));
  }
  function z(R) {
    const j = (0, Re._)`${R}.errors`;
    d.assign(Cr.default.vErrors, (0, Re._)`${Cr.default.vErrors} === null ? ${j} : ${Cr.default.vErrors}.concat(${j})`), d.assign(Cr.default.errors, (0, Re._)`${Cr.default.vErrors}.length`);
  }
  function L(R) {
    var j;
    if (!o2.opts.unevaluated)
      return;
    const T = (j = n == null ? void 0 : n.validate) === null || j === void 0 ? void 0 : j.evaluated;
    if (o2.props !== true)
      if (T && !T.dynamicProps)
        T.props !== void 0 && (o2.props = ct.mergeEvaluated.props(d, T.props, o2.props));
      else {
        const $ = d.var("props", (0, Re._)`${R}.evaluated.props`);
        o2.props = ct.mergeEvaluated.props(d, $, o2.props, Re.Name);
      }
    if (o2.items !== true)
      if (T && !T.dynamicItems)
        T.items !== void 0 && (o2.items = ct.mergeEvaluated.items(d, T.items, o2.items));
      else {
        const $ = d.var("items", (0, Re._)`${R}.evaluated.items`);
        o2.items = ct.mergeEvaluated.items(d, $, o2.items, Re.Name);
      }
  }
}
yr.callRef = gt;
yr.default = id;
Object.defineProperty(na, "__esModule", { value: true });
var od = sa;
var cd = yr;
var ld = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  od.default,
  cd.default
];
na.default = ld;
var ua = {};
var da = {};
Object.defineProperty(da, "__esModule", { value: true });
var Et = se;
var sr = Et.operators;
var kt = {
  maximum: { okStr: "<=", ok: sr.LTE, fail: sr.GT },
  minimum: { okStr: ">=", ok: sr.GTE, fail: sr.LT },
  exclusiveMaximum: { okStr: "<", ok: sr.LT, fail: sr.GTE },
  exclusiveMinimum: { okStr: ">", ok: sr.GT, fail: sr.LTE }
};
var fd = {
  message: ({ keyword: e2, schemaCode: r3 }) => (0, Et.str)`must be ${kt[e2].okStr} ${r3}`,
  params: ({ keyword: e2, schemaCode: r3 }) => (0, Et._)`{comparison: ${kt[e2].okStr}, limit: ${r3}}`
};
var hd = {
  keyword: Object.keys(kt),
  type: "number",
  schemaType: "number",
  $data: true,
  error: fd,
  code(e2) {
    const { keyword: r3, data: n, schemaCode: a } = e2;
    e2.fail$data((0, Et._)`${n} ${kt[r3].fail} ${a} || isNaN(${n})`);
  }
};
da.default = hd;
var ia = {};
Object.defineProperty(ia, "__esModule", { value: true });
var Yr = se;
var pd = {
  message: ({ schemaCode: e2 }) => (0, Yr.str)`must be multiple of ${e2}`,
  params: ({ schemaCode: e2 }) => (0, Yr._)`{multipleOf: ${e2}}`
};
var md = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  error: pd,
  code(e2) {
    const { gen: r3, data: n, schemaCode: a, it: d } = e2, o2 = d.opts.multipleOfPrecision, p = r3.let("res"), y = o2 ? (0, Yr._)`Math.abs(Math.round(${p}) - ${p}) > 1e-${o2}` : (0, Yr._)`${p} !== parseInt(${p})`;
    e2.fail$data((0, Yr._)`(${a} === 0 || (${p} = ${n}/${a}, ${y}))`);
  }
};
ia.default = md;
var oa = {};
var ca = {};
Object.defineProperty(ca, "__esModule", { value: true });
function Yn(e2) {
  const r3 = e2.length;
  let n = 0, a = 0, d;
  for (; a < r3; )
    n++, d = e2.charCodeAt(a++), d >= 55296 && d <= 56319 && a < r3 && (d = e2.charCodeAt(a), (d & 64512) === 56320 && a++);
  return n;
}
ca.default = Yn;
Yn.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(oa, "__esModule", { value: true });
var gr = se;
var gd = ie;
var _d = ca;
var vd = {
  message({ keyword: e2, schemaCode: r3 }) {
    const n = e2 === "maxLength" ? "more" : "fewer";
    return (0, gr.str)`must NOT have ${n} than ${r3} characters`;
  },
  params: ({ schemaCode: e2 }) => (0, gr._)`{limit: ${e2}}`
};
var yd = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: true,
  error: vd,
  code(e2) {
    const { keyword: r3, data: n, schemaCode: a, it: d } = e2, o2 = r3 === "maxLength" ? gr.operators.GT : gr.operators.LT, p = d.opts.unicode === false ? (0, gr._)`${n}.length` : (0, gr._)`${(0, gd.useFunc)(e2.gen, _d.default)}(${n})`;
    e2.fail$data((0, gr._)`${p} ${o2} ${a}`);
  }
};
oa.default = yd;
var la = {};
Object.defineProperty(la, "__esModule", { value: true });
var wd = ne;
var Pt = se;
var bd = {
  message: ({ schemaCode: e2 }) => (0, Pt.str)`must match pattern "${e2}"`,
  params: ({ schemaCode: e2 }) => (0, Pt._)`{pattern: ${e2}}`
};
var $d = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: true,
  error: bd,
  code(e2) {
    const { data: r3, $data: n, schema: a, schemaCode: d, it: o2 } = e2, p = o2.opts.unicodeRegExp ? "u" : "", y = n ? (0, Pt._)`(new RegExp(${d}, ${p}))` : (0, wd.usePattern)(e2, a);
    e2.fail$data((0, Pt._)`!${y}.test(${r3})`);
  }
};
la.default = $d;
var fa = {};
Object.defineProperty(fa, "__esModule", { value: true });
var Xr = se;
var Ed = {
  message({ keyword: e2, schemaCode: r3 }) {
    const n = e2 === "maxProperties" ? "more" : "fewer";
    return (0, Xr.str)`must NOT have ${n} than ${r3} properties`;
  },
  params: ({ schemaCode: e2 }) => (0, Xr._)`{limit: ${e2}}`
};
var kd = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: true,
  error: Ed,
  code(e2) {
    const { keyword: r3, data: n, schemaCode: a } = e2, d = r3 === "maxProperties" ? Xr.operators.GT : Xr.operators.LT;
    e2.fail$data((0, Xr._)`Object.keys(${n}).length ${d} ${a}`);
  }
};
fa.default = kd;
var ha = {};
Object.defineProperty(ha, "__esModule", { value: true });
var Wr = ne;
var Qr = se;
var Pd = ie;
var Sd = {
  message: ({ params: { missingProperty: e2 } }) => (0, Qr.str)`must have required property '${e2}'`,
  params: ({ params: { missingProperty: e2 } }) => (0, Qr._)`{missingProperty: ${e2}}`
};
var Cd = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error: Sd,
  code(e2) {
    const { gen: r3, schema: n, schemaCode: a, data: d, $data: o2, it: p } = e2, { opts: y } = p;
    if (!o2 && n.length === 0)
      return;
    const b = n.length >= y.loopRequired;
    if (p.allErrors ? v() : g2(), y.strictRequired) {
      const L = e2.parentSchema.properties, { definedProperties: R } = e2.it;
      for (const j of n)
        if ((L == null ? void 0 : L[j]) === void 0 && !R.has(j)) {
          const T = p.schemaEnv.baseId + p.errSchemaPath, $ = `required property "${j}" is not defined at "${T}" (strictRequired)`;
          (0, Pd.checkStrictMode)(p, $, p.opts.strictRequired);
        }
    }
    function v() {
      if (b || o2)
        e2.block$data(Qr.nil, S);
      else
        for (const L of n)
          (0, Wr.checkReportMissingProp)(e2, L);
    }
    function g2() {
      const L = r3.let("missing");
      if (b || o2) {
        const R = r3.let("valid", true);
        e2.block$data(R, () => z(L, R)), e2.ok(R);
      } else
        r3.if((0, Wr.checkMissingProp)(e2, n, L)), (0, Wr.reportMissingProp)(e2, L), r3.else();
    }
    function S() {
      r3.forOf("prop", a, (L) => {
        e2.setParams({ missingProperty: L }), r3.if((0, Wr.noPropertyInData)(r3, d, L, y.ownProperties), () => e2.error());
      });
    }
    function z(L, R) {
      e2.setParams({ missingProperty: L }), r3.forOf(L, a, () => {
        r3.assign(R, (0, Wr.propertyInData)(r3, d, L, y.ownProperties)), r3.if((0, Qr.not)(R), () => {
          e2.error(), r3.break();
        });
      }, Qr.nil);
    }
  }
};
ha.default = Cd;
var pa = {};
Object.defineProperty(pa, "__esModule", { value: true });
var xr = se;
var Td = {
  message({ keyword: e2, schemaCode: r3 }) {
    const n = e2 === "maxItems" ? "more" : "fewer";
    return (0, xr.str)`must NOT have ${n} than ${r3} items`;
  },
  params: ({ schemaCode: e2 }) => (0, xr._)`{limit: ${e2}}`
};
var jd = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: true,
  error: Td,
  code(e2) {
    const { keyword: r3, data: n, schemaCode: a } = e2, d = r3 === "maxItems" ? xr.operators.GT : xr.operators.LT;
    e2.fail$data((0, xr._)`${n}.length ${d} ${a}`);
  }
};
pa.default = jd;
var ma = {};
var st = {};
Object.defineProperty(st, "__esModule", { value: true });
var Xn = Rn;
Xn.code = 'require("ajv/dist/runtime/equal").default';
st.default = Xn;
Object.defineProperty(ma, "__esModule", { value: true });
var Vt = tt;
var Ee = se;
var Nd = ie;
var Od = st;
var Rd = {
  message: ({ params: { i: e2, j: r3 } }) => (0, Ee.str)`must NOT have duplicate items (items ## ${r3} and ${e2} are identical)`,
  params: ({ params: { i: e2, j: r3 } }) => (0, Ee._)`{i: ${e2}, j: ${r3}}`
};
var Ad = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error: Rd,
  code(e2) {
    const { gen: r3, data: n, $data: a, schema: d, parentSchema: o2, schemaCode: p, it: y } = e2;
    if (!a && !d)
      return;
    const b = r3.let("valid"), v = o2.items ? (0, Vt.getSchemaTypes)(o2.items) : [];
    e2.block$data(b, g2, (0, Ee._)`${p} === false`), e2.ok(b);
    function g2() {
      const R = r3.let("i", (0, Ee._)`${n}.length`), j = r3.let("j");
      e2.setParams({ i: R, j }), r3.assign(b, true), r3.if((0, Ee._)`${R} > 1`, () => (S() ? z : L)(R, j));
    }
    function S() {
      return v.length > 0 && !v.some((R) => R === "object" || R === "array");
    }
    function z(R, j) {
      const T = r3.name("item"), $ = (0, Vt.checkDataTypes)(v, T, y.opts.strictNumbers, Vt.DataType.Wrong), N2 = r3.const("indices", (0, Ee._)`{}`);
      r3.for((0, Ee._)`;${R}--;`, () => {
        r3.let(T, (0, Ee._)`${n}[${R}]`), r3.if($, (0, Ee._)`continue`), v.length > 1 && r3.if((0, Ee._)`typeof ${T} == "string"`, (0, Ee._)`${T} += "_"`), r3.if((0, Ee._)`typeof ${N2}[${T}] == "number"`, () => {
          r3.assign(j, (0, Ee._)`${N2}[${T}]`), e2.error(), r3.assign(b, false).break();
        }).code((0, Ee._)`${N2}[${T}] = ${R}`);
      });
    }
    function L(R, j) {
      const T = (0, Nd.useFunc)(r3, Od.default), $ = r3.name("outer");
      r3.label($).for((0, Ee._)`;${R}--;`, () => r3.for((0, Ee._)`${j} = ${R}; ${j}--;`, () => r3.if((0, Ee._)`${T}(${n}[${R}], ${n}[${j}])`, () => {
        e2.error(), r3.assign(b, false).break($);
      })));
    }
  }
};
ma.default = Ad;
var ga = {};
Object.defineProperty(ga, "__esModule", { value: true });
var Gt = se;
var Id = ie;
var Md = st;
var Dd = {
  message: "must be equal to constant",
  params: ({ schemaCode: e2 }) => (0, Gt._)`{allowedValue: ${e2}}`
};
var Ld = {
  keyword: "const",
  $data: true,
  error: Dd,
  code(e2) {
    const { gen: r3, data: n, $data: a, schemaCode: d, schema: o2 } = e2;
    a || o2 && typeof o2 == "object" ? e2.fail$data((0, Gt._)`!${(0, Id.useFunc)(r3, Md.default)}(${n}, ${d})`) : e2.fail((0, Gt._)`${o2} !== ${n}`);
  }
};
ga.default = Ld;
var _a = {};
Object.defineProperty(_a, "__esModule", { value: true });
var Jr = se;
var zd = ie;
var Vd = st;
var Fd = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e2 }) => (0, Jr._)`{allowedValues: ${e2}}`
};
var Ud = {
  keyword: "enum",
  schemaType: "array",
  $data: true,
  error: Fd,
  code(e2) {
    const { gen: r3, data: n, $data: a, schema: d, schemaCode: o2, it: p } = e2;
    if (!a && d.length === 0)
      throw new Error("enum must have non-empty array");
    const y = d.length >= p.opts.loopEnum;
    let b;
    const v = () => b ?? (b = (0, zd.useFunc)(r3, Vd.default));
    let g2;
    if (y || a)
      g2 = r3.let("valid"), e2.block$data(g2, S);
    else {
      if (!Array.isArray(d))
        throw new Error("ajv implementation error");
      const L = r3.const("vSchema", o2);
      g2 = (0, Jr.or)(...d.map((R, j) => z(L, j)));
    }
    e2.pass(g2);
    function S() {
      r3.assign(g2, false), r3.forOf("v", o2, (L) => r3.if((0, Jr._)`${v()}(${n}, ${L})`, () => r3.assign(g2, true).break()));
    }
    function z(L, R) {
      const j = d[R];
      return typeof j == "object" && j !== null ? (0, Jr._)`${v()}(${n}, ${L}[${R}])` : (0, Jr._)`${n} === ${j}`;
    }
  }
};
_a.default = Ud;
Object.defineProperty(ua, "__esModule", { value: true });
var Bd = da;
var Hd = ia;
var qd = oa;
var Gd = la;
var Kd = fa;
var Wd = ha;
var Jd = pa;
var Zd = ma;
var Yd = ga;
var Xd = _a;
var Qd = [
  // number
  Bd.default,
  Hd.default,
  // string
  qd.default,
  Gd.default,
  // object
  Kd.default,
  Wd.default,
  // array
  Jd.default,
  Zd.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Yd.default,
  Xd.default
];
ua.default = Qd;
var va = {};
var Mr = {};
Object.defineProperty(Mr, "__esModule", { value: true });
Mr.validateAdditionalItems = void 0;
var _r = se;
var Kt = ie;
var xd = {
  message: ({ params: { len: e2 } }) => (0, _r.str)`must NOT have more than ${e2} items`,
  params: ({ params: { len: e2 } }) => (0, _r._)`{limit: ${e2}}`
};
var ei = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: xd,
  code(e2) {
    const { parentSchema: r3, it: n } = e2, { items: a } = r3;
    if (!Array.isArray(a)) {
      (0, Kt.checkStrictMode)(n, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Qn(e2, a);
  }
};
function Qn(e2, r3) {
  const { gen: n, schema: a, data: d, keyword: o2, it: p } = e2;
  p.items = true;
  const y = n.const("len", (0, _r._)`${d}.length`);
  if (a === false)
    e2.setParams({ len: r3.length }), e2.pass((0, _r._)`${y} <= ${r3.length}`);
  else if (typeof a == "object" && !(0, Kt.alwaysValidSchema)(p, a)) {
    const v = n.var("valid", (0, _r._)`${y} <= ${r3.length}`);
    n.if((0, _r.not)(v), () => b(v)), e2.ok(v);
  }
  function b(v) {
    n.forRange("i", r3.length, y, (g2) => {
      e2.subschema({ keyword: o2, dataProp: g2, dataPropType: Kt.Type.Num }, v), p.allErrors || n.if((0, _r.not)(v), () => n.break());
    });
  }
}
Mr.validateAdditionalItems = Qn;
Mr.default = ei;
var ya = {};
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: true });
Dr.validateTuple = void 0;
var an = se;
var _t = ie;
var ri = ne;
var ti = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e2) {
    const { schema: r3, it: n } = e2;
    if (Array.isArray(r3))
      return xn(e2, "additionalItems", r3);
    n.items = true, !(0, _t.alwaysValidSchema)(n, r3) && e2.ok((0, ri.validateArray)(e2));
  }
};
function xn(e2, r3, n = e2.schema) {
  const { gen: a, parentSchema: d, data: o2, keyword: p, it: y } = e2;
  g2(d), y.opts.unevaluated && n.length && y.items !== true && (y.items = _t.mergeEvaluated.items(a, n.length, y.items));
  const b = a.name("valid"), v = a.const("len", (0, an._)`${o2}.length`);
  n.forEach((S, z) => {
    (0, _t.alwaysValidSchema)(y, S) || (a.if((0, an._)`${v} > ${z}`, () => e2.subschema({
      keyword: p,
      schemaProp: z,
      dataProp: z
    }, b)), e2.ok(b));
  });
  function g2(S) {
    const { opts: z, errSchemaPath: L } = y, R = n.length, j = R === S.minItems && (R === S.maxItems || S[r3] === false);
    if (z.strictTuples && !j) {
      const T = `"${p}" is ${R}-tuple, but minItems or maxItems/${r3} are not specified or different at path "${L}"`;
      (0, _t.checkStrictMode)(y, T, z.strictTuples);
    }
  }
}
Dr.validateTuple = xn;
Dr.default = ti;
Object.defineProperty(ya, "__esModule", { value: true });
var ai = Dr;
var ni = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e2) => (0, ai.validateTuple)(e2, "items")
};
ya.default = ni;
var wa = {};
Object.defineProperty(wa, "__esModule", { value: true });
var nn = se;
var si = ie;
var ui = ne;
var di = Mr;
var ii = {
  message: ({ params: { len: e2 } }) => (0, nn.str)`must NOT have more than ${e2} items`,
  params: ({ params: { len: e2 } }) => (0, nn._)`{limit: ${e2}}`
};
var oi = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: ii,
  code(e2) {
    const { schema: r3, parentSchema: n, it: a } = e2, { prefixItems: d } = n;
    a.items = true, !(0, si.alwaysValidSchema)(a, r3) && (d ? (0, di.validateAdditionalItems)(e2, d) : e2.ok((0, ui.validateArray)(e2)));
  }
};
wa.default = oi;
var ba = {};
Object.defineProperty(ba, "__esModule", { value: true });
var ze = se;
var lt = ie;
var ci = {
  message: ({ params: { min: e2, max: r3 } }) => r3 === void 0 ? (0, ze.str)`must contain at least ${e2} valid item(s)` : (0, ze.str)`must contain at least ${e2} and no more than ${r3} valid item(s)`,
  params: ({ params: { min: e2, max: r3 } }) => r3 === void 0 ? (0, ze._)`{minContains: ${e2}}` : (0, ze._)`{minContains: ${e2}, maxContains: ${r3}}`
};
var li = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error: ci,
  code(e2) {
    const { gen: r3, schema: n, parentSchema: a, data: d, it: o2 } = e2;
    let p, y;
    const { minContains: b, maxContains: v } = a;
    o2.opts.next ? (p = b === void 0 ? 1 : b, y = v) : p = 1;
    const g2 = r3.const("len", (0, ze._)`${d}.length`);
    if (e2.setParams({ min: p, max: y }), y === void 0 && p === 0) {
      (0, lt.checkStrictMode)(o2, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (y !== void 0 && p > y) {
      (0, lt.checkStrictMode)(o2, '"minContains" > "maxContains" is always invalid'), e2.fail();
      return;
    }
    if ((0, lt.alwaysValidSchema)(o2, n)) {
      let j = (0, ze._)`${g2} >= ${p}`;
      y !== void 0 && (j = (0, ze._)`${j} && ${g2} <= ${y}`), e2.pass(j);
      return;
    }
    o2.items = true;
    const S = r3.name("valid");
    y === void 0 && p === 1 ? L(S, () => r3.if(S, () => r3.break())) : p === 0 ? (r3.let(S, true), y !== void 0 && r3.if((0, ze._)`${d}.length > 0`, z)) : (r3.let(S, false), z()), e2.result(S, () => e2.reset());
    function z() {
      const j = r3.name("_valid"), T = r3.let("count", 0);
      L(j, () => r3.if(j, () => R(T)));
    }
    function L(j, T) {
      r3.forRange("i", 0, g2, ($) => {
        e2.subschema({
          keyword: "contains",
          dataProp: $,
          dataPropType: lt.Type.Num,
          compositeRule: true
        }, j), T();
      });
    }
    function R(j) {
      r3.code((0, ze._)`${j}++`), y === void 0 ? r3.if((0, ze._)`${j} >= ${p}`, () => r3.assign(S, true).break()) : (r3.if((0, ze._)`${j} > ${y}`, () => r3.assign(S, false).break()), p === 1 ? r3.assign(S, true) : r3.if((0, ze._)`${j} >= ${p}`, () => r3.assign(S, true)));
    }
  }
};
ba.default = li;
var es = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.validateSchemaDeps = e2.validatePropertyDeps = e2.error = void 0;
  const r3 = se, n = ie, a = ne;
  e2.error = {
    message: ({ params: { property: b, depsCount: v, deps: g2 } }) => {
      const S = v === 1 ? "property" : "properties";
      return (0, r3.str)`must have ${S} ${g2} when property ${b} is present`;
    },
    params: ({ params: { property: b, depsCount: v, deps: g2, missingProperty: S } }) => (0, r3._)`{property: ${b},
    missingProperty: ${S},
    depsCount: ${v},
    deps: ${g2}}`
    // TODO change to reference
  };
  const d = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e2.error,
    code(b) {
      const [v, g2] = o2(b);
      p(b, v), y(b, g2);
    }
  };
  function o2({ schema: b }) {
    const v = {}, g2 = {};
    for (const S in b) {
      if (S === "__proto__")
        continue;
      const z = Array.isArray(b[S]) ? v : g2;
      z[S] = b[S];
    }
    return [v, g2];
  }
  function p(b, v = b.schema) {
    const { gen: g2, data: S, it: z } = b;
    if (Object.keys(v).length === 0)
      return;
    const L = g2.let("missing");
    for (const R in v) {
      const j = v[R];
      if (j.length === 0)
        continue;
      const T = (0, a.propertyInData)(g2, S, R, z.opts.ownProperties);
      b.setParams({
        property: R,
        depsCount: j.length,
        deps: j.join(", ")
      }), z.allErrors ? g2.if(T, () => {
        for (const $ of j)
          (0, a.checkReportMissingProp)(b, $);
      }) : (g2.if((0, r3._)`${T} && (${(0, a.checkMissingProp)(b, j, L)})`), (0, a.reportMissingProp)(b, L), g2.else());
    }
  }
  e2.validatePropertyDeps = p;
  function y(b, v = b.schema) {
    const { gen: g2, data: S, keyword: z, it: L } = b, R = g2.name("valid");
    for (const j in v)
      (0, n.alwaysValidSchema)(L, v[j]) || (g2.if(
        (0, a.propertyInData)(g2, S, j, L.opts.ownProperties),
        () => {
          const T = b.subschema({ keyword: z, schemaProp: j }, R);
          b.mergeValidEvaluated(T, R);
        },
        () => g2.var(R, true)
        // TODO var
      ), b.ok(R));
  }
  e2.validateSchemaDeps = y, e2.default = d;
})(es);
var $a = {};
Object.defineProperty($a, "__esModule", { value: true });
var rs = se;
var fi = ie;
var hi = {
  message: "property name must be valid",
  params: ({ params: e2 }) => (0, rs._)`{propertyName: ${e2.propertyName}}`
};
var pi = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: hi,
  code(e2) {
    const { gen: r3, schema: n, data: a, it: d } = e2;
    if ((0, fi.alwaysValidSchema)(d, n))
      return;
    const o2 = r3.name("valid");
    r3.forIn("key", a, (p) => {
      e2.setParams({ propertyName: p }), e2.subschema({
        keyword: "propertyNames",
        data: p,
        dataTypes: ["string"],
        propertyName: p,
        compositeRule: true
      }, o2), r3.if((0, rs.not)(o2), () => {
        e2.error(true), d.allErrors || r3.break();
      });
    }), e2.ok(o2);
  }
};
$a.default = pi;
var It = {};
Object.defineProperty(It, "__esModule", { value: true });
var ft = ne;
var Fe = se;
var mi = Qe;
var ht = ie;
var gi = {
  message: "must NOT have additional properties",
  params: ({ params: e2 }) => (0, Fe._)`{additionalProperty: ${e2.additionalProperty}}`
};
var _i = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: true,
  trackErrors: true,
  error: gi,
  code(e2) {
    const { gen: r3, schema: n, parentSchema: a, data: d, errsCount: o2, it: p } = e2;
    if (!o2)
      throw new Error("ajv implementation error");
    const { allErrors: y, opts: b } = p;
    if (p.props = true, b.removeAdditional !== "all" && (0, ht.alwaysValidSchema)(p, n))
      return;
    const v = (0, ft.allSchemaProperties)(a.properties), g2 = (0, ft.allSchemaProperties)(a.patternProperties);
    S(), e2.ok((0, Fe._)`${o2} === ${mi.default.errors}`);
    function S() {
      r3.forIn("key", d, (T) => {
        !v.length && !g2.length ? R(T) : r3.if(z(T), () => R(T));
      });
    }
    function z(T) {
      let $;
      if (v.length > 8) {
        const N2 = (0, ht.schemaRefOrVal)(p, a.properties, "properties");
        $ = (0, ft.isOwnProperty)(r3, N2, T);
      } else
        v.length ? $ = (0, Fe.or)(...v.map((N2) => (0, Fe._)`${T} === ${N2}`)) : $ = Fe.nil;
      return g2.length && ($ = (0, Fe.or)($, ...g2.map((N2) => (0, Fe._)`${(0, ft.usePattern)(e2, N2)}.test(${T})`))), (0, Fe.not)($);
    }
    function L(T) {
      r3.code((0, Fe._)`delete ${d}[${T}]`);
    }
    function R(T) {
      if (b.removeAdditional === "all" || b.removeAdditional && n === false) {
        L(T);
        return;
      }
      if (n === false) {
        e2.setParams({ additionalProperty: T }), e2.error(), y || r3.break();
        return;
      }
      if (typeof n == "object" && !(0, ht.alwaysValidSchema)(p, n)) {
        const $ = r3.name("valid");
        b.removeAdditional === "failing" ? (j(T, $, false), r3.if((0, Fe.not)($), () => {
          e2.reset(), L(T);
        })) : (j(T, $), y || r3.if((0, Fe.not)($), () => r3.break()));
      }
    }
    function j(T, $, N2) {
      const D2 = {
        keyword: "additionalProperties",
        dataProp: T,
        dataPropType: ht.Type.Str
      };
      N2 === false && Object.assign(D2, {
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }), e2.subschema(D2, $);
    }
  }
};
It.default = _i;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: true });
var vi = He;
var sn = ne;
var Ft = ie;
var un = It;
var yi = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e2) {
    const { gen: r3, schema: n, parentSchema: a, data: d, it: o2 } = e2;
    o2.opts.removeAdditional === "all" && a.additionalProperties === void 0 && un.default.code(new vi.KeywordCxt(o2, un.default, "additionalProperties"));
    const p = (0, sn.allSchemaProperties)(n);
    for (const S of p)
      o2.definedProperties.add(S);
    o2.opts.unevaluated && p.length && o2.props !== true && (o2.props = Ft.mergeEvaluated.props(r3, (0, Ft.toHash)(p), o2.props));
    const y = p.filter((S) => !(0, Ft.alwaysValidSchema)(o2, n[S]));
    if (y.length === 0)
      return;
    const b = r3.name("valid");
    for (const S of y)
      v(S) ? g2(S) : (r3.if((0, sn.propertyInData)(r3, d, S, o2.opts.ownProperties)), g2(S), o2.allErrors || r3.else().var(b, true), r3.endIf()), e2.it.definedProperties.add(S), e2.ok(b);
    function v(S) {
      return o2.opts.useDefaults && !o2.compositeRule && n[S].default !== void 0;
    }
    function g2(S) {
      e2.subschema({
        keyword: "properties",
        schemaProp: S,
        dataProp: S
      }, b);
    }
  }
};
Ea.default = yi;
var ka = {};
Object.defineProperty(ka, "__esModule", { value: true });
var dn = ne;
var pt = se;
var on = ie;
var cn = ie;
var wi = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e2) {
    const { gen: r3, schema: n, data: a, parentSchema: d, it: o2 } = e2, { opts: p } = o2, y = (0, dn.allSchemaProperties)(n), b = y.filter((j) => (0, on.alwaysValidSchema)(o2, n[j]));
    if (y.length === 0 || b.length === y.length && (!o2.opts.unevaluated || o2.props === true))
      return;
    const v = p.strictSchema && !p.allowMatchingProperties && d.properties, g2 = r3.name("valid");
    o2.props !== true && !(o2.props instanceof pt.Name) && (o2.props = (0, cn.evaluatedPropsToName)(r3, o2.props));
    const { props: S } = o2;
    z();
    function z() {
      for (const j of y)
        v && L(j), o2.allErrors ? R(j) : (r3.var(g2, true), R(j), r3.if(g2));
    }
    function L(j) {
      for (const T in v)
        new RegExp(j).test(T) && (0, on.checkStrictMode)(o2, `property ${T} matches pattern ${j} (use allowMatchingProperties)`);
    }
    function R(j) {
      r3.forIn("key", a, (T) => {
        r3.if((0, pt._)`${(0, dn.usePattern)(e2, j)}.test(${T})`, () => {
          const $ = b.includes(j);
          $ || e2.subschema({
            keyword: "patternProperties",
            schemaProp: j,
            dataProp: T,
            dataPropType: cn.Type.Str
          }, g2), o2.opts.unevaluated && S !== true ? r3.assign((0, pt._)`${S}[${T}]`, true) : !$ && !o2.allErrors && r3.if((0, pt.not)(g2), () => r3.break());
        });
      });
    }
  }
};
ka.default = wi;
var Pa = {};
Object.defineProperty(Pa, "__esModule", { value: true });
var bi = ie;
var $i = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  code(e2) {
    const { gen: r3, schema: n, it: a } = e2;
    if ((0, bi.alwaysValidSchema)(a, n)) {
      e2.fail();
      return;
    }
    const d = r3.name("valid");
    e2.subschema({
      keyword: "not",
      compositeRule: true,
      createErrors: false,
      allErrors: false
    }, d), e2.failResult(d, () => e2.reset(), () => e2.error());
  },
  error: { message: "must NOT be valid" }
};
Pa.default = $i;
var Sa = {};
Object.defineProperty(Sa, "__esModule", { value: true });
var Ei = ne;
var ki = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: true,
  code: Ei.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Sa.default = ki;
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: true });
var vt = se;
var Pi = ie;
var Si = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e2 }) => (0, vt._)`{passingSchemas: ${e2.passing}}`
};
var Ci = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error: Si,
  code(e2) {
    const { gen: r3, schema: n, parentSchema: a, it: d } = e2;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    if (d.opts.discriminator && a.discriminator)
      return;
    const o2 = n, p = r3.let("valid", false), y = r3.let("passing", null), b = r3.name("_valid");
    e2.setParams({ passing: y }), r3.block(v), e2.result(p, () => e2.reset(), () => e2.error(true));
    function v() {
      o2.forEach((g2, S) => {
        let z;
        (0, Pi.alwaysValidSchema)(d, g2) ? r3.var(b, true) : z = e2.subschema({
          keyword: "oneOf",
          schemaProp: S,
          compositeRule: true
        }, b), S > 0 && r3.if((0, vt._)`${b} && ${p}`).assign(p, false).assign(y, (0, vt._)`[${y}, ${S}]`).else(), r3.if(b, () => {
          r3.assign(p, true), r3.assign(y, S), z && e2.mergeEvaluated(z, vt.Name);
        });
      });
    }
  }
};
Ca.default = Ci;
var Ta = {};
Object.defineProperty(Ta, "__esModule", { value: true });
var Ti = ie;
var ji = {
  keyword: "allOf",
  schemaType: "array",
  code(e2) {
    const { gen: r3, schema: n, it: a } = e2;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    const d = r3.name("valid");
    n.forEach((o2, p) => {
      if ((0, Ti.alwaysValidSchema)(a, o2))
        return;
      const y = e2.subschema({ keyword: "allOf", schemaProp: p }, d);
      e2.ok(d), e2.mergeEvaluated(y);
    });
  }
};
Ta.default = ji;
var ja = {};
Object.defineProperty(ja, "__esModule", { value: true });
var St = se;
var ts = ie;
var Ni = {
  message: ({ params: e2 }) => (0, St.str)`must match "${e2.ifClause}" schema`,
  params: ({ params: e2 }) => (0, St._)`{failingKeyword: ${e2.ifClause}}`
};
var Oi = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  error: Ni,
  code(e2) {
    const { gen: r3, parentSchema: n, it: a } = e2;
    n.then === void 0 && n.else === void 0 && (0, ts.checkStrictMode)(a, '"if" without "then" and "else" is ignored');
    const d = ln(a, "then"), o2 = ln(a, "else");
    if (!d && !o2)
      return;
    const p = r3.let("valid", true), y = r3.name("_valid");
    if (b(), e2.reset(), d && o2) {
      const g2 = r3.let("ifClause");
      e2.setParams({ ifClause: g2 }), r3.if(y, v("then", g2), v("else", g2));
    } else
      d ? r3.if(y, v("then")) : r3.if((0, St.not)(y), v("else"));
    e2.pass(p, () => e2.error(true));
    function b() {
      const g2 = e2.subschema({
        keyword: "if",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, y);
      e2.mergeEvaluated(g2);
    }
    function v(g2, S) {
      return () => {
        const z = e2.subschema({ keyword: g2 }, y);
        r3.assign(p, y), e2.mergeValidEvaluated(z, p), S ? r3.assign(S, (0, St._)`${g2}`) : e2.setParams({ ifClause: g2 });
      };
    }
  }
};
function ln(e2, r3) {
  const n = e2.schema[r3];
  return n !== void 0 && !(0, ts.alwaysValidSchema)(e2, n);
}
ja.default = Oi;
var Na = {};
Object.defineProperty(Na, "__esModule", { value: true });
var Ri = ie;
var Ai = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e2, parentSchema: r3, it: n }) {
    r3.if === void 0 && (0, Ri.checkStrictMode)(n, `"${e2}" without "if" is ignored`);
  }
};
Na.default = Ai;
Object.defineProperty(va, "__esModule", { value: true });
var Ii = Mr;
var Mi = ya;
var Di = Dr;
var Li = wa;
var zi = ba;
var Vi = es;
var Fi = $a;
var Ui = It;
var Bi = Ea;
var Hi = ka;
var qi = Pa;
var Gi = Sa;
var Ki = Ca;
var Wi = Ta;
var Ji = ja;
var Zi = Na;
function Yi(e2 = false) {
  const r3 = [
    // any
    qi.default,
    Gi.default,
    Ki.default,
    Wi.default,
    Ji.default,
    Zi.default,
    // object
    Fi.default,
    Ui.default,
    Vi.default,
    Bi.default,
    Hi.default
  ];
  return e2 ? r3.push(Mi.default, Li.default) : r3.push(Ii.default, Di.default), r3.push(zi.default), r3;
}
va.default = Yi;
var Oa = {};
var Ra = {};
Object.defineProperty(Ra, "__esModule", { value: true });
var ye = se;
var Xi = {
  message: ({ schemaCode: e2 }) => (0, ye.str)`must match format "${e2}"`,
  params: ({ schemaCode: e2 }) => (0, ye._)`{format: ${e2}}`
};
var Qi = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: true,
  error: Xi,
  code(e2, r3) {
    const { gen: n, data: a, $data: d, schema: o2, schemaCode: p, it: y } = e2, { opts: b, errSchemaPath: v, schemaEnv: g2, self: S } = y;
    if (!b.validateFormats)
      return;
    d ? z() : L();
    function z() {
      const R = n.scopeValue("formats", {
        ref: S.formats,
        code: b.code.formats
      }), j = n.const("fDef", (0, ye._)`${R}[${p}]`), T = n.let("fType"), $ = n.let("format");
      n.if((0, ye._)`typeof ${j} == "object" && !(${j} instanceof RegExp)`, () => n.assign(T, (0, ye._)`${j}.type || "string"`).assign($, (0, ye._)`${j}.validate`), () => n.assign(T, (0, ye._)`"string"`).assign($, j)), e2.fail$data((0, ye.or)(N2(), D2()));
      function N2() {
        return b.strictSchema === false ? ye.nil : (0, ye._)`${p} && !${$}`;
      }
      function D2() {
        const t = g2.$async ? (0, ye._)`(${j}.async ? await ${$}(${a}) : ${$}(${a}))` : (0, ye._)`${$}(${a})`, u2 = (0, ye._)`(typeof ${$} == "function" ? ${t} : ${$}.test(${a}))`;
        return (0, ye._)`${$} && ${$} !== true && ${T} === ${r3} && !${u2}`;
      }
    }
    function L() {
      const R = S.formats[o2];
      if (!R) {
        N2();
        return;
      }
      if (R === true)
        return;
      const [j, T, $] = D2(R);
      j === r3 && e2.pass(t());
      function N2() {
        if (b.strictSchema === false) {
          S.logger.warn(u2());
          return;
        }
        throw new Error(u2());
        function u2() {
          return `unknown format "${o2}" ignored in schema at path "${v}"`;
        }
      }
      function D2(u2) {
        const s = u2 instanceof RegExp ? (0, ye.regexpCode)(u2) : b.code.formats ? (0, ye._)`${b.code.formats}${(0, ye.getProperty)(o2)}` : void 0, i2 = n.scopeValue("formats", { key: o2, ref: u2, code: s });
        return typeof u2 == "object" && !(u2 instanceof RegExp) ? [u2.type || "string", u2.validate, (0, ye._)`${i2}.validate`] : ["string", u2, i2];
      }
      function t() {
        if (typeof R == "object" && !(R instanceof RegExp) && R.async) {
          if (!g2.$async)
            throw new Error("async format in sync schema");
          return (0, ye._)`await ${$}(${a})`;
        }
        return typeof T == "function" ? (0, ye._)`${$}(${a})` : (0, ye._)`${$}.test(${a})`;
      }
    }
  }
};
Ra.default = Qi;
Object.defineProperty(Oa, "__esModule", { value: true });
var xi = Ra;
var eo = [xi.default];
Oa.default = eo;
var Ir = {};
Object.defineProperty(Ir, "__esModule", { value: true });
Ir.contentVocabulary = Ir.metadataVocabulary = void 0;
Ir.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Ir.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(aa, "__esModule", { value: true });
var ro = na;
var to = ua;
var ao = va;
var no = Oa;
var fn = Ir;
var so = [
  ro.default,
  to.default,
  (0, ao.default)(),
  no.default,
  fn.metadataVocabulary,
  fn.contentVocabulary
];
aa.default = so;
var Aa = {};
var as = {};
(function(e2) {
  Object.defineProperty(e2, "__esModule", { value: true }), e2.DiscrError = void 0, function(r3) {
    r3.Tag = "tag", r3.Mapping = "mapping";
  }(e2.DiscrError || (e2.DiscrError = {}));
})(as);
Object.defineProperty(Aa, "__esModule", { value: true });
var Tr = se;
var Wt = as;
var hn = Ae;
var uo = ie;
var io = {
  message: ({ params: { discrError: e2, tagName: r3 } }) => e2 === Wt.DiscrError.Tag ? `tag "${r3}" must be string` : `value of tag "${r3}" must be in oneOf`,
  params: ({ params: { discrError: e2, tag: r3, tagName: n } }) => (0, Tr._)`{error: ${e2}, tag: ${n}, tagValue: ${r3}}`
};
var oo = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: io,
  code(e2) {
    const { gen: r3, data: n, schema: a, parentSchema: d, it: o2 } = e2, { oneOf: p } = d;
    if (!o2.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const y = a.propertyName;
    if (typeof y != "string")
      throw new Error("discriminator: requires propertyName");
    if (a.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!p)
      throw new Error("discriminator: requires oneOf keyword");
    const b = r3.let("valid", false), v = r3.const("tag", (0, Tr._)`${n}${(0, Tr.getProperty)(y)}`);
    r3.if((0, Tr._)`typeof ${v} == "string"`, () => g2(), () => e2.error(false, { discrError: Wt.DiscrError.Tag, tag: v, tagName: y })), e2.ok(b);
    function g2() {
      const L = z();
      r3.if(false);
      for (const R in L)
        r3.elseIf((0, Tr._)`${v} === ${R}`), r3.assign(b, S(L[R]));
      r3.else(), e2.error(false, { discrError: Wt.DiscrError.Mapping, tag: v, tagName: y }), r3.endIf();
    }
    function S(L) {
      const R = r3.name("valid"), j = e2.subschema({ keyword: "oneOf", schemaProp: L }, R);
      return e2.mergeEvaluated(j, Tr.Name), R;
    }
    function z() {
      var L;
      const R = {}, j = $(d);
      let T = true;
      for (let t = 0; t < p.length; t++) {
        let u2 = p[t];
        u2 != null && u2.$ref && !(0, uo.schemaHasRulesButRef)(u2, o2.self.RULES) && (u2 = hn.resolveRef.call(o2.self, o2.schemaEnv.root, o2.baseId, u2 == null ? void 0 : u2.$ref), u2 instanceof hn.SchemaEnv && (u2 = u2.schema));
        const s = (L = u2 == null ? void 0 : u2.properties) === null || L === void 0 ? void 0 : L[y];
        if (typeof s != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${y}"`);
        T = T && (j || $(u2)), N2(s, t);
      }
      if (!T)
        throw new Error(`discriminator: "${y}" must be required`);
      return R;
      function $({ required: t }) {
        return Array.isArray(t) && t.includes(y);
      }
      function N2(t, u2) {
        if (t.const)
          D2(t.const, u2);
        else if (t.enum)
          for (const s of t.enum)
            D2(s, u2);
        else
          throw new Error(`discriminator: "properties/${y}" must have "const" or "enum"`);
      }
      function D2(t, u2) {
        if (typeof t != "string" || t in R)
          throw new Error(`discriminator: "${y}" values must be unique strings`);
        R[t] = u2;
      }
    }
  }
};
Aa.default = oo;
var co = "http://json-schema.org/draft-07/schema#";
var lo = "http://json-schema.org/draft-07/schema#";
var fo = "Core schema meta-schema";
var ho = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: true,
    default: []
  }
};
var po = [
  "object",
  "boolean"
];
var mo = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: true,
  readOnly: {
    type: "boolean",
    default: false
  },
  examples: {
    type: "array",
    items: true
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: true
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: false
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: true,
  enum: {
    type: "array",
    items: true,
    minItems: 1,
    uniqueItems: true
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: true
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
};
var go = {
  $schema: co,
  $id: lo,
  title: fo,
  definitions: ho,
  type: po,
  properties: mo,
  default: true
};
(function(e2, r3) {
  Object.defineProperty(r3, "__esModule", { value: true }), r3.MissingRefError = r3.ValidationError = r3.CodeGen = r3.Name = r3.nil = r3.stringify = r3.str = r3._ = r3.KeywordCxt = void 0;
  const n = kn, a = aa, d = Aa, o2 = go, p = ["/properties"], y = "http://json-schema.org/draft-07/schema";
  class b extends n.default {
    _addVocabularies() {
      super._addVocabularies(), a.default.forEach((R) => this.addVocabulary(R)), this.opts.discriminator && this.addKeyword(d.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const R = this.opts.$data ? this.$dataMetaSchema(o2, p) : o2;
      this.addMetaSchema(R, y, false), this.refs["http://json-schema.org/schema"] = y;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(y) ? y : void 0);
    }
  }
  e2.exports = r3 = b, Object.defineProperty(r3, "__esModule", { value: true }), r3.default = b;
  var v = He;
  Object.defineProperty(r3, "KeywordCxt", { enumerable: true, get: function() {
    return v.KeywordCxt;
  } });
  var g2 = se;
  Object.defineProperty(r3, "_", { enumerable: true, get: function() {
    return g2._;
  } }), Object.defineProperty(r3, "str", { enumerable: true, get: function() {
    return g2.str;
  } }), Object.defineProperty(r3, "stringify", { enumerable: true, get: function() {
    return g2.stringify;
  } }), Object.defineProperty(r3, "nil", { enumerable: true, get: function() {
    return g2.nil;
  } }), Object.defineProperty(r3, "Name", { enumerable: true, get: function() {
    return g2.Name;
  } }), Object.defineProperty(r3, "CodeGen", { enumerable: true, get: function() {
    return g2.CodeGen;
  } });
  var S = at;
  Object.defineProperty(r3, "ValidationError", { enumerable: true, get: function() {
    return S.default;
  } });
  var z = nt;
  Object.defineProperty(r3, "MissingRefError", { enumerable: true, get: function() {
    return z.default;
  } });
})(Ps, wt);
var _o = /* @__PURE__ */ ks(wt);
var vo = class {
  constructor() {
    be(this, "ajv");
    this.ajv = new _o();
  }
  validateJson(r3, n) {
    const a = this.ajv.validate(r3, n);
    return a ? { valid: a } : { valid: a, error: this.ajv.errorsText() };
  }
  validateObjectSchema(r3, n) {
    const a = this.ajv.validate(r3, n);
    return a ? { valid: a } : { valid: a, error: this.ajv.errorsText() };
  }
};
var yo = class {
  constructor() {
    be(this, "TIME_SPLIT", " ");
  }
  /**
   * 给日期添加小时
   *
   * @param date - Date
   * @param numOfHours - 数字
   * @author terwer
   * @since 1.0.0
   */
  addHoursToDate(r3, n) {
    return r3.setTime(r3.getTime() + n * 60 * 60 * 1e3), r3;
  }
  /**
   * 转换ISO日期为中文日期的通用转换方法
   *
   * @param str - '2022-07-18T06:25:48.000Z
   * @param isAddTimeZone - 是否增加时区（默认不增加）
   * @param isShort - 是否只返回日期
   * @author terwer
   * @since 1.0.0
   */
  formatIsoToZhDateFormat(r3, n, a) {
    if (!r3)
      return "";
    let d = r3;
    const o2 = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.\d{3})Z$/gm, p = d.match(o2);
    if (p == null)
      return r3;
    for (let y = 0; y < p.length; y++) {
      const b = p[y];
      let v = b;
      n && (v = this.addHoursToDate(new Date(b), 8).toISOString());
      const g2 = v.split("T"), S = g2[0], z = g2[1].split(".")[0];
      let L = S + this.TIME_SPLIT + z;
      a && (L = S), d = d.replace(b, L);
    }
    return d;
  }
  /**
   * 转换ISO日期为中文完整时间
   *
   * @param str - '2022-07-18T06:25:48.000Z
   */
  formatIsoToZh(r3) {
    return this.formatIsoToZhDateFormat(r3, false, false);
  }
  /**
   * 转换ISO日期为中文日期
   *
   * @param str - '2022-07-18T06:25:48.000Z
   */
  formatIsoToZhDate(r3) {
    return this.formatIsoToZhDateFormat(r3, false, true);
  }
  /**
   * 转换ISO日期为中文时间
   *
   * @param str - '2022-07-18T06:25:48.000Z
   */
  formatIsoToZhTime(r3) {
    return this.formatIsoToZhDateFormat(r3, false).split(this.TIME_SPLIT)[1];
  }
  /**
   * 当前日期时间完整格式，格式：2023-03-10 02:03:43
   */
  nowZh() {
    return this.formatIsoToZhDateFormat((/* @__PURE__ */ new Date()).toISOString(), true);
  }
  /**
   * 当前日期，格式：2023-03-10
   */
  nowDateZh() {
    return this.formatIsoToZhDateFormat((/* @__PURE__ */ new Date()).toISOString(), true, true);
  }
  /**
   * 当前时间，格式：02:03:43
   */
  nowTimeZh() {
    return this.formatIsoToZhDateFormat((/* @__PURE__ */ new Date()).toISOString(), true).split(this.TIME_SPLIT)[1];
  }
};
var wo = class {
  /**
   * 格式化字符串
   *
   * @param str - 字符串，可用占位符，例如：test \{0\} str
   * @param args - 按占位符顺序排列的参数
   * @author terwer
   * @since 0.0.1
   */
  f(r3, ...n) {
    let a = r3;
    for (let d = 0; d < n.length; d++) {
      const o2 = n[d];
      typeof o2 == "string" ? a = a.replace(`{${d}}`, o2) : a = a.replace(`{${d}}`, o2.toString());
    }
    return a;
  }
  /**
   * 字符串拼接
   *
   * @param str - 字符串数组
   */
  appendStr(...r3) {
    return r3.join("");
  }
  /**
   * 判断字符串中，是否包含数组中任何一个元素
   *
   * @param str - 字符串
   * @param arr - 字符串数组
   */
  includeInArray(r3, n) {
    let a = false;
    for (let d = 0; d < n.length; d++) {
      const o2 = n[d];
      r3.includes(o2) && (a = true);
    }
    return a;
  }
  /**
   * 截取指定长度的字符串
   *
   * @param str - str
   * @param length - 长度
   * @param ignore - 不要结尾省略号
   */
  getByLength(r3, n, a) {
    const d = r3;
    return d.length < n ? d : a ? d.substring(0, n) : d.substring(0, n) + "...";
  }
  /**
   * 字符串空值检测
   *
   * @param str - 待检测的字符串
   */
  isEmptyString(r3) {
    return !r3 || typeof r3 != "string" ? true : r3.trim().length === 0;
  }
  /**
   * 路径组合，解决多出来/的问题
   *
   * @param path1 - 路径1
   * @param path2 - 路径2
   */
  pathJoin(r3, n) {
    let a = r3;
    const d = r3.lastIndexOf("/");
    return d + 1 === r3.length && (a = r3.substring(0, d)), n.indexOf("/") > 0 ? a = a + "/" + n : a = a + n, a;
  }
  /**
   * 强转boolean
   *
   * @param val - val
   */
  parseBoolean(r3) {
    return r3 || (r3 = "false"), r3.toString().toLowerCase() === "true";
  }
};
var Ut = (e2, r3) => {
  const n = pn(e2), a = pn(r3), d = n.pop(), o2 = a.pop(), p = _n(n, a);
  return p !== 0 ? p : d && o2 ? _n(d.split("."), o2.split(".")) : d || o2 ? d ? -1 : 1 : 0;
};
var bo = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var pn = (e2) => {
  if (typeof e2 != "string")
    throw new TypeError("Invalid argument expected string");
  const r3 = e2.match(bo);
  if (!r3)
    throw new Error(`Invalid argument not valid semver ('${e2}' received)`);
  return r3.shift(), r3;
};
var mn = (e2) => e2 === "*" || e2 === "x" || e2 === "X";
var gn = (e2) => {
  const r3 = parseInt(e2, 10);
  return isNaN(r3) ? e2 : r3;
};
var $o = (e2, r3) => typeof e2 != typeof r3 ? [String(e2), String(r3)] : [e2, r3];
var Eo = (e2, r3) => {
  if (mn(e2) || mn(r3))
    return 0;
  const [n, a] = $o(gn(e2), gn(r3));
  return n > a ? 1 : n < a ? -1 : 0;
};
var _n = (e2, r3) => {
  for (let n = 0; n < Math.max(e2.length, r3.length); n++) {
    const a = Eo(e2[n] || "0", r3[n] || "0");
    if (a !== 0)
      return a;
  }
  return 0;
};
var ko = class {
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is higher than v2
   */
  greater(r3, n) {
    return Ut(r3, n) > 0;
  }
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is equal to v2
   */
  equal(r3, n) {
    return Ut(r3, n) === 0;
  }
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is lesser than v2
   */
  lesser(r3, n) {
    return Ut(r3, n) < 0;
  }
};
var Po = Object.defineProperty;
var So = (e2, r3, n) => r3 in e2 ? Po(e2, r3, { enumerable: true, configurable: true, writable: true, value: n }) : e2[r3] = n;
var jr = (e2, r3, n) => (So(e2, typeof r3 != "symbol" ? r3 + "" : r3, n), n);
var ur = class {
};
jr(ur, "NODE_ENV_KEY", "NODE_ENV"), /**
* 开发环境
*/
jr(ur, "NODE_ENV_DEVELOPMENT", "development"), /**
* 生产环境
*/
jr(ur, "NODE_ENV_PRODUCTION", "production"), /**
* 测试环境
*/
jr(ur, "NODE_ENV_TEST", "test"), /**
* 是否处于调试模式
*/
jr(ur, "VITE_DEBUG_MODE_KEY", "VITE_DEBUG_MODE");
var Co = class {
  /**
   * 环境初始化
   *
   * @param envMeta - 需要传入 {"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":false} 。特别提醒：此参数是静态元数据，取决于最终使用的项目。因此仅仅在最终使用的地方显示传递此值，中间项目请保持参数传递
   * @see {@link https://vitejs.dev/guide/env-and-mode.html#production-replacement}
   */
  constructor(r3) {
    jr(this, "envMeta"), this.envMeta = r3;
  }
  /**
   * 是否是开发阶段调试
   */
  isNodeDev() {
    return this.getEnv(ur.NODE_ENV_KEY) === ur.NODE_ENV_DEVELOPMENT;
  }
  /**
   * 是否是调试阶段
   */
  isDev() {
    return this.isNodeDev() || this.getBooleanEnv(ur.VITE_DEBUG_MODE_KEY);
  }
  /**
   * 获取环境变量，key不存在返回undefined
   * @param key - key
   */
  getEnv(r3) {
    let n;
    try {
      this.envMeta[r3] && (n = this.envMeta[r3]);
    } catch {
    }
    return n;
  }
  /**
   * 获取String类型的环境变量，key不存在直接返回空值
   * @param key - key
   */
  getStringEnv(r3) {
    return this.getEnv(r3) ?? "";
  }
  /**
   * 获取Boolean类型的环境变量，key不存在返回false
   * @param key - key
   */
  getBooleanEnv(r3) {
    let n = false;
    return this.getEnv(r3) && (n = this.getStringEnv(r3).toLowerCase() === "true"), n;
  }
  /**
   * 获取环境变量，如果未定义或者为空值，用指定的默认值代替
   *
   * @param key - key
   * @param defaultValue - 默认值
   * @since 0.1.0
   * @author terwer
   */
  getEnvOrDefault(r3, n) {
    const a = this.getStringEnv(r3);
    return a.trim().length == 0 ? n : a;
  }
};
var To = Object.defineProperty;
var jo = (e2, r3, n) => r3 in e2 ? To(e2, r3, { enumerable: true, configurable: true, writable: true, value: n }) : e2[r3] = n;
var Rr = (e2, r3, n) => (jo(e2, typeof r3 != "symbol" ? r3 + "" : r3, n), n);
var Ct = class {
};
Rr(Ct, "LOG_LEVEL_KEY", "VITE_LOG_LEVEL"), Rr(Ct, "LOG_PREFIX_KEY", "VITE_LOG_PREFIX");
var Ze = /* @__PURE__ */ ((e2) => (e2.LOG_LEVEL_TRACE = "TRACE", e2.LOG_LEVEL_DEBUG = "DEBUG", e2.LOG_LEVEL_INFO = "INFO", e2.LOG_LEVEL_WARN = "WARN", e2.LOG_LEVEL_ERROR = "ERROR", e2))(Ze || {});
var ns = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var Nr = {};
var No = {
  get exports() {
    return Nr;
  },
  set exports(e2) {
    Nr = e2;
  }
};
(function(e2) {
  (function(r3, n) {
    e2.exports ? e2.exports = n() : r3.log = n();
  })(ns, function() {
    var r3 = function() {
    }, n = "undefined", a = typeof window !== n && typeof window.navigator !== n && /Trident\/|MSIE /.test(window.navigator.userAgent), d = [
      "trace",
      "debug",
      "info",
      "warn",
      "error"
    ];
    function o2(j, T) {
      var $ = j[T];
      if (typeof $.bind == "function")
        return $.bind(j);
      try {
        return Function.prototype.bind.call($, j);
      } catch {
        return function() {
          return Function.prototype.apply.apply($, [j, arguments]);
        };
      }
    }
    function p() {
      console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
    }
    function y(j) {
      return j === "debug" && (j = "log"), typeof console === n ? false : j === "trace" && a ? p : console[j] !== void 0 ? o2(console, j) : console.log !== void 0 ? o2(console, "log") : r3;
    }
    function b(j, T) {
      for (var $ = 0; $ < d.length; $++) {
        var N2 = d[$];
        this[N2] = $ < j ? r3 : this.methodFactory(N2, j, T);
      }
      this.log = this.debug;
    }
    function v(j, T, $) {
      return function() {
        typeof console !== n && (b.call(this, T, $), this[j].apply(this, arguments));
      };
    }
    function g2(j, T, $) {
      return y(j) || v.apply(this, arguments);
    }
    function S(j, T, $) {
      var N2 = this, D2;
      T = T ?? "WARN";
      var t = "loglevel";
      typeof j == "string" ? t += ":" + j : typeof j == "symbol" && (t = void 0);
      function u2(m) {
        var h2 = (d[m] || "silent").toUpperCase();
        if (!(typeof window === n || !t)) {
          try {
            window.localStorage[t] = h2;
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(t) + "=" + h2 + ";";
          } catch {
          }
        }
      }
      function s() {
        var m;
        if (!(typeof window === n || !t)) {
          try {
            m = window.localStorage[t];
          } catch {
          }
          if (typeof m === n)
            try {
              var h2 = window.document.cookie, C = h2.indexOf(
                encodeURIComponent(t) + "="
              );
              C !== -1 && (m = /^([^;]+)/.exec(h2.slice(C))[1]);
            } catch {
            }
          return N2.levels[m] === void 0 && (m = void 0), m;
        }
      }
      function i2() {
        if (!(typeof window === n || !t)) {
          try {
            window.localStorage.removeItem(t);
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(t) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch {
          }
        }
      }
      N2.name = j, N2.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, N2.methodFactory = $ || g2, N2.getLevel = function() {
        return D2;
      }, N2.setLevel = function(m, h2) {
        if (typeof m == "string" && N2.levels[m.toUpperCase()] !== void 0 && (m = N2.levels[m.toUpperCase()]), typeof m == "number" && m >= 0 && m <= N2.levels.SILENT) {
          if (D2 = m, h2 !== false && u2(m), b.call(N2, m, j), typeof console === n && m < N2.levels.SILENT)
            return "No console available for logging";
        } else
          throw "log.setLevel() called with invalid level: " + m;
      }, N2.setDefaultLevel = function(m) {
        T = m, s() || N2.setLevel(m, false);
      }, N2.resetLevel = function() {
        N2.setLevel(T, false), i2();
      }, N2.enableAll = function(m) {
        N2.setLevel(N2.levels.TRACE, m);
      }, N2.disableAll = function(m) {
        N2.setLevel(N2.levels.SILENT, m);
      };
      var c = s();
      c == null && (c = T), N2.setLevel(c, false);
    }
    var z = new S(), L = {};
    z.getLogger = function(j) {
      if (typeof j != "symbol" && typeof j != "string" || j === "")
        throw new TypeError("You must supply a name when creating a logger.");
      var T = L[j];
      return T || (T = L[j] = new S(
        j,
        z.getLevel(),
        z.methodFactory
      )), T;
    };
    var R = typeof window !== n ? window.log : void 0;
    return z.noConflict = function() {
      return typeof window !== n && window.log === z && (window.log = R), z;
    }, z.getLoggers = function() {
      return L;
    }, z.default = z, z;
  });
})(No);
var Tt = {};
var Oo = {
  get exports() {
    return Tt;
  },
  set exports(e2) {
    Tt = e2;
  }
};
(function(e2) {
  (function(r3, n) {
    e2.exports ? e2.exports = n() : r3.prefix = n(r3);
  })(ns, function(r3) {
    var n = function(g2) {
      for (var S = 1, z = arguments.length, L; S < z; S++)
        for (L in arguments[S])
          Object.prototype.hasOwnProperty.call(arguments[S], L) && (g2[L] = arguments[S][L]);
      return g2;
    }, a = {
      template: "[%t] %l:",
      levelFormatter: function(g2) {
        return g2.toUpperCase();
      },
      nameFormatter: function(g2) {
        return g2 || "root";
      },
      timestampFormatter: function(g2) {
        return g2.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
      },
      format: void 0
    }, d, o2 = {}, p = function(g2) {
      if (!g2 || !g2.getLogger)
        throw new TypeError("Argument is not a root logger");
      d = g2;
    }, y = function(g2, S) {
      if (!g2 || !g2.setLevel)
        throw new TypeError("Argument is not a logger");
      var z = g2.methodFactory, L = g2.name || "", R = o2[L] || o2[""] || a;
      function j(T, $, N2) {
        var D2 = z(T, $, N2), t = o2[N2] || o2[""], u2 = t.template.indexOf("%t") !== -1, s = t.template.indexOf("%l") !== -1, i2 = t.template.indexOf("%n") !== -1;
        return function() {
          for (var c = "", m = arguments.length, h2 = Array(m), C = 0; C < m; C++)
            h2[C] = arguments[C];
          if (L || !o2[N2]) {
            var U = t.timestampFormatter(/* @__PURE__ */ new Date()), H = t.levelFormatter(T), V = t.nameFormatter(N2);
            t.format ? c += t.format(H, V, U) : (c += t.template, u2 && (c = c.replace(/%t/, U)), s && (c = c.replace(/%l/, H)), i2 && (c = c.replace(/%n/, V))), h2.length && typeof h2[0] == "string" ? h2[0] = c + " " + h2[0] : h2.unshift(c);
          }
          D2.apply(void 0, h2);
        };
      }
      return o2[L] || (g2.methodFactory = j), S = S || {}, S.template && (S.format = void 0), o2[L] = n({}, R, S), g2.setLevel(g2.getLevel()), d || g2.warn(
        "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
      ), g2;
    }, b = {
      reg: p,
      apply: y
    }, v;
    return r3 && (v = r3.prefix, b.noConflict = function() {
      return r3.prefix === b && (r3.prefix = v), b;
    }), b;
  });
})(Oo);
function Ro() {
  const e2 = Error.prepareStackTrace;
  Error.prepareStackTrace = (n, a) => a;
  const r3 = new Error().stack.slice(1);
  return Error.prepareStackTrace = e2, r3;
}
var jt = class {
  /**
   * 解析日志级别为枚举
   *
   * @param enumObj - 枚举对象
   * @param value - 配置的值
   */
  static stringToEnumValue(r3, n) {
    return r3[Object.keys(r3).filter((a) => r3[a].toString() === n)[0]];
  }
  /**
   * 获取配置的日志级别
   */
  static getEnvLevel(r3) {
    if (!r3)
      return;
    const n = r3.getEnvOrDefault(Ct.LOG_LEVEL_KEY, Ze.LOG_LEVEL_INFO), a = jt.stringToEnumValue(Ze, n.toUpperCase());
    return a || console.warn(
      "[zhi-log] LOG_LEVEL is invalid in you .env file.It must be either debug, info, warn or error, fallback to default info level"
    ), a;
  }
  /**
   * 获取默认日志
   */
  static getEnvLogger(r3) {
    return r3 ? r3.getEnv(Ct.LOG_PREFIX_KEY) : void 0;
  }
};
var Se = {};
var Ao = {
  get exports() {
    return Se;
  },
  set exports(e2) {
    Se = e2;
  }
};
var Jt = {};
var Io = {
  get exports() {
    return Jt;
  },
  set exports(e2) {
    Jt = e2;
  }
};
var vn;
function Mo() {
  return vn || (vn = 1, function(e2) {
    const r3 = typeof process < "u" && process.env.TERM_PROGRAM === "Hyper", n = typeof process < "u" && process.platform === "win32", a = typeof process < "u" && process.platform === "linux", d = {
      ballotDisabled: "\u2612",
      ballotOff: "\u2610",
      ballotOn: "\u2611",
      bullet: "\u2022",
      bulletWhite: "\u25E6",
      fullBlock: "\u2588",
      heart: "\u2764",
      identicalTo: "\u2261",
      line: "\u2500",
      mark: "\u203B",
      middot: "\xB7",
      minus: "\uFF0D",
      multiplication: "\xD7",
      obelus: "\xF7",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      pencilUpRight: "\u2710",
      percent: "%",
      pilcrow2: "\u2761",
      pilcrow: "\xB6",
      plusMinus: "\xB1",
      question: "?",
      section: "\xA7",
      starsOff: "\u2606",
      starsOn: "\u2605",
      upDownArrow: "\u2195"
    }, o2 = Object.assign({}, d, {
      check: "\u221A",
      cross: "\xD7",
      ellipsisLarge: "...",
      ellipsis: "...",
      info: "i",
      questionSmall: "?",
      pointer: ">",
      pointerSmall: "\xBB",
      radioOff: "( )",
      radioOn: "(*)",
      warning: "\u203C"
    }), p = Object.assign({}, d, {
      ballotCross: "\u2718",
      check: "\u2714",
      cross: "\u2716",
      ellipsisLarge: "\u22EF",
      ellipsis: "\u2026",
      info: "\u2139",
      questionFull: "\uFF1F",
      questionSmall: "\uFE56",
      pointer: a ? "\u25B8" : "\u276F",
      pointerSmall: a ? "\u2023" : "\u203A",
      radioOff: "\u25EF",
      radioOn: "\u25C9",
      warning: "\u26A0"
    });
    e2.exports = n && !r3 ? o2 : p, Reflect.defineProperty(e2.exports, "common", { enumerable: false, value: d }), Reflect.defineProperty(e2.exports, "windows", { enumerable: false, value: o2 }), Reflect.defineProperty(e2.exports, "other", { enumerable: false, value: p });
  }(Io)), Jt;
}
var Do = (e2) => e2 !== null && typeof e2 == "object" && !Array.isArray(e2);
var Lo = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
var zo = () => typeof process < "u" ? process.env.FORCE_COLOR !== "0" : false;
var ss = () => {
  const e2 = {
    enabled: zo(),
    visible: true,
    styles: {},
    keys: {}
  }, r3 = (o2) => {
    let p = o2.open = `\x1B[${o2.codes[0]}m`, y = o2.close = `\x1B[${o2.codes[1]}m`, b = o2.regex = new RegExp(`\\u001b\\[${o2.codes[1]}m`, "g");
    return o2.wrap = (v, g2) => {
      v.includes(y) && (v = v.replace(b, y + p));
      let S = p + v + y;
      return g2 ? S.replace(/\r*\n/g, `${y}$&${p}`) : S;
    }, o2;
  }, n = (o2, p, y) => typeof o2 == "function" ? o2(p) : o2.wrap(p, y), a = (o2, p) => {
    if (o2 === "" || o2 == null)
      return "";
    if (e2.enabled === false)
      return o2;
    if (e2.visible === false)
      return "";
    let y = "" + o2, b = y.includes(`
`), v = p.length;
    for (v > 0 && p.includes("unstyle") && (p = [.../* @__PURE__ */ new Set(["unstyle", ...p])].reverse()); v-- > 0; )
      y = n(e2.styles[p[v]], y, b);
    return y;
  }, d = (o2, p, y) => {
    e2.styles[o2] = r3({ name: o2, codes: p }), (e2.keys[y] || (e2.keys[y] = [])).push(o2), Reflect.defineProperty(e2, o2, {
      configurable: true,
      enumerable: true,
      set(b) {
        e2.alias(o2, b);
      },
      get() {
        let b = (v) => a(v, b.stack);
        return Reflect.setPrototypeOf(b, e2), b.stack = this.stack ? this.stack.concat(o2) : [o2], b;
      }
    });
  };
  return d("reset", [0, 0], "modifier"), d("bold", [1, 22], "modifier"), d("dim", [2, 22], "modifier"), d("italic", [3, 23], "modifier"), d("underline", [4, 24], "modifier"), d("inverse", [7, 27], "modifier"), d("hidden", [8, 28], "modifier"), d("strikethrough", [9, 29], "modifier"), d("black", [30, 39], "color"), d("red", [31, 39], "color"), d("green", [32, 39], "color"), d("yellow", [33, 39], "color"), d("blue", [34, 39], "color"), d("magenta", [35, 39], "color"), d("cyan", [36, 39], "color"), d("white", [37, 39], "color"), d("gray", [90, 39], "color"), d("grey", [90, 39], "color"), d("bgBlack", [40, 49], "bg"), d("bgRed", [41, 49], "bg"), d("bgGreen", [42, 49], "bg"), d("bgYellow", [43, 49], "bg"), d("bgBlue", [44, 49], "bg"), d("bgMagenta", [45, 49], "bg"), d("bgCyan", [46, 49], "bg"), d("bgWhite", [47, 49], "bg"), d("blackBright", [90, 39], "bright"), d("redBright", [91, 39], "bright"), d("greenBright", [92, 39], "bright"), d("yellowBright", [93, 39], "bright"), d("blueBright", [94, 39], "bright"), d("magentaBright", [95, 39], "bright"), d("cyanBright", [96, 39], "bright"), d("whiteBright", [97, 39], "bright"), d("bgBlackBright", [100, 49], "bgBright"), d("bgRedBright", [101, 49], "bgBright"), d("bgGreenBright", [102, 49], "bgBright"), d("bgYellowBright", [103, 49], "bgBright"), d("bgBlueBright", [104, 49], "bgBright"), d("bgMagentaBright", [105, 49], "bgBright"), d("bgCyanBright", [106, 49], "bgBright"), d("bgWhiteBright", [107, 49], "bgBright"), e2.ansiRegex = Lo, e2.hasColor = e2.hasAnsi = (o2) => (e2.ansiRegex.lastIndex = 0, typeof o2 == "string" && o2 !== "" && e2.ansiRegex.test(o2)), e2.alias = (o2, p) => {
    let y = typeof p == "string" ? e2[p] : p;
    if (typeof y != "function")
      throw new TypeError("Expected alias to be the name of an existing color (string) or a function");
    y.stack || (Reflect.defineProperty(y, "name", { value: o2 }), e2.styles[o2] = y, y.stack = [o2]), Reflect.defineProperty(e2, o2, {
      configurable: true,
      enumerable: true,
      set(b) {
        e2.alias(o2, b);
      },
      get() {
        let b = (v) => a(v, b.stack);
        return Reflect.setPrototypeOf(b, e2), b.stack = this.stack ? this.stack.concat(y.stack) : y.stack, b;
      }
    });
  }, e2.theme = (o2) => {
    if (!Do(o2))
      throw new TypeError("Expected theme to be an object");
    for (let p of Object.keys(o2))
      e2.alias(p, o2[p]);
    return e2;
  }, e2.alias("unstyle", (o2) => typeof o2 == "string" && o2 !== "" ? (e2.ansiRegex.lastIndex = 0, o2.replace(e2.ansiRegex, "")) : ""), e2.alias("noop", (o2) => o2), e2.none = e2.clear = e2.noop, e2.stripColor = e2.unstyle, e2.symbols = Mo(), e2.define = d, e2;
};
Ao.exports = ss();
Se.create = ss;
var Zt;
var us;
var ds;
var is;
var os = true;
typeof process < "u" && ({ FORCE_COLOR: Zt, NODE_DISABLE_COLORS: us, NO_COLOR: ds, TERM: is } = process.env || {}, os = process.stdout && process.stdout.isTTY);
var te = {
  enabled: !us && ds == null && is !== "dumb" && (Zt != null && Zt !== "0" || os),
  // modifiers
  reset: le(0, 0),
  bold: le(1, 22),
  dim: le(2, 22),
  italic: le(3, 23),
  underline: le(4, 24),
  inverse: le(7, 27),
  hidden: le(8, 28),
  strikethrough: le(9, 29),
  // colors
  black: le(30, 39),
  red: le(31, 39),
  green: le(32, 39),
  yellow: le(33, 39),
  blue: le(34, 39),
  magenta: le(35, 39),
  cyan: le(36, 39),
  white: le(37, 39),
  gray: le(90, 39),
  grey: le(90, 39),
  // background colors
  bgBlack: le(40, 49),
  bgRed: le(41, 49),
  bgGreen: le(42, 49),
  bgYellow: le(43, 49),
  bgBlue: le(44, 49),
  bgMagenta: le(45, 49),
  bgCyan: le(46, 49),
  bgWhite: le(47, 49)
};
function yn(e2, r3) {
  let n = 0, a, d = "", o2 = "";
  for (; n < e2.length; n++)
    a = e2[n], d += a.open, o2 += a.close, ~r3.indexOf(a.close) && (r3 = r3.replace(a.rgx, a.close + a.open));
  return d + r3 + o2;
}
function Vo(e2, r3) {
  let n = { has: e2, keys: r3 };
  return n.reset = te.reset.bind(n), n.bold = te.bold.bind(n), n.dim = te.dim.bind(n), n.italic = te.italic.bind(n), n.underline = te.underline.bind(n), n.inverse = te.inverse.bind(n), n.hidden = te.hidden.bind(n), n.strikethrough = te.strikethrough.bind(n), n.black = te.black.bind(n), n.red = te.red.bind(n), n.green = te.green.bind(n), n.yellow = te.yellow.bind(n), n.blue = te.blue.bind(n), n.magenta = te.magenta.bind(n), n.cyan = te.cyan.bind(n), n.white = te.white.bind(n), n.gray = te.gray.bind(n), n.grey = te.grey.bind(n), n.bgBlack = te.bgBlack.bind(n), n.bgRed = te.bgRed.bind(n), n.bgGreen = te.bgGreen.bind(n), n.bgYellow = te.bgYellow.bind(n), n.bgBlue = te.bgBlue.bind(n), n.bgMagenta = te.bgMagenta.bind(n), n.bgCyan = te.bgCyan.bind(n), n.bgWhite = te.bgWhite.bind(n), n;
}
function le(e2, r3) {
  let n = {
    open: `\x1B[${e2}m`,
    close: `\x1B[${r3}m`,
    rgx: new RegExp(`\\x1b\\[${r3}m`, "g")
  };
  return function(a) {
    return this !== void 0 && this.has !== void 0 ? (~this.has.indexOf(e2) || (this.has.push(e2), this.keys.push(n)), a === void 0 ? this : te.enabled ? yn(this.keys, a + "") : a + "") : a === void 0 ? Vo([e2], [n]) : te.enabled ? yn([n], a + "") : a + "";
  };
}
var Fo = Object.defineProperty;
var Uo = (e2, r3, n) => r3 in e2 ? Fo(e2, r3, { enumerable: true, configurable: true, writable: true, value: n }) : e2[r3] = n;
var $e = (e2, r3, n) => (Uo(e2, typeof r3 != "symbol" ? r3 + "" : r3, n), n);
var Ue = class {
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    return Ue.isInBrowser ? window.location.href.indexOf("chrome-extension://") > -1 : false;
  }
};
var oe = Ue;
$e(oe, "isNode", typeof process < "u"), /**
* 是否在浏览器环境
*/
$e(oe, "isInBrowser", typeof window < "u"), /**
* 浏览器路径分隔符
*/
$e(oe, "BrowserSeperator", "/"), /**
* 是否是Electron环境
*/
$e(oe, "isElectron", () => !Ue.isInBrowser || !window.navigator || !window.navigator.userAgent ? false : /Electron/.test(window.navigator.userAgent)), /**
* 是否有Node环境，目前包括 Electron 和 Node
*/
$e(oe, "hasNodeEnv", () => Ue.isElectron() || Ue.isNode), /**
* 获取url参数
*
* @param sParam - 参数
*/
$e(oe, "getQueryString", (e2) => {
  if (!Ue.isInBrowser)
    return "";
  const r3 = window.location.search.substring(1).split("&");
  for (let n = 0; n < r3.length; n++) {
    const a = r3[n].split("=");
    if (a[0] === e2)
      return a[1];
  }
  return "";
}), /**
* 替换 URL 的参数
* 思路：
* 1. 使用了 URLSearchParams 对象来解析和构建 URL 查询参数。
*
* 2. 在处理包含 hash 片段的 URL 时使用了 split 函数将 URL 分成两部分：基本 URL 和 hash 片段。
*
* 3. 然后，再次使用 split 函数将基本 URL 分成两部分：路径和查询参数。
*
* 4. 将查询参数转换为 URLSearchParams 对象，然后设置指定的参数名和值。
*
* 5. 最后，使用 toString 函数将查询参数转换为字符串，并将其与路径组合成新的基本 URL。如果 URL 包含 hash 片段，则将其添加到新的基本 URL 中。
*
* @param url - 链接地址
* @param paramName - 参数名
* @param paramValue - 参数值
*/
$e(oe, "replaceUrlParam", (e2, r3, n) => {
  n == null && (n = "");
  const a = new RegExp("\\b(" + r3 + "=).*?(&|#|$)");
  if (e2.search(a) >= 0)
    return e2.replace(a, "$1" + n + "$2");
  const [d, o2] = e2.split("#"), [p, y] = d.split("?"), b = new URLSearchParams(y);
  b.set(r3, n);
  const v = b.toString(), g2 = p + (v ? "?" + v : "");
  return o2 ? g2 + "#" + o2 : g2;
}), /**
* 设置url参数
*
* @param urlstring - url
* @param key - key
* @param value - value
*/
$e(oe, "setUrlParameter", (e2, r3, n) => {
  if (e2.includes(r3))
    return Ue.replaceUrlParam(e2, r3, n);
  const a = e2.split("#");
  let d = a[0];
  const o2 = a[1];
  return d.includes("?") ? d += `&${r3}=${n}` : d += `?${r3}=${n}`, o2 && (d += "#" + o2), d;
}), /**
* 重新加载指定tab
*
* @param tabname - tabname
* @param t - 延迟时间
*/
$e(oe, "reloadTabPage", (e2, r3 = 200) => {
  setTimeout(function() {
    if (Ue.isInBrowser) {
      const n = window.location.href;
      window.location.href = Ue.setUrlParameter(n, "tab", e2);
    }
  }, r3);
}), /**
* 刷新当前tab页面
*/
$e(oe, "reloadPage", () => {
  setTimeout(function() {
    Ue.isInBrowser && window.location.reload();
  }, 200);
}), /**
* 刷新当前tab页面
*
* @param msg - 消息提示
* @param cb - 回调
*/
$e(oe, "reloadPageWithMessageCallback", (e2, r3) => {
  r3 && r3(e2), setTimeout(function() {
    Ue.isInBrowser && window.location.reload();
  }, 200);
});
var Te = /* @__PURE__ */ ((e2) => (e2.BasePathType_Appearance = "Appearance", e2.BasePathType_Data = "Data", e2.BasePathType_Themes = "Themes", e2.BasePathType_ZhiTheme = "ZhiTheme", e2.BasePathType_None = "None", e2))(Te || {});
var Oe = class {
  /**
   * 检测是否运行在思源打开的浏览器中
   */
  static isInSiyuanBrowser() {
    return oe.isInBrowser ? typeof window.siyuan < "u" && typeof window.Lute < "u" : false;
  }
  /**
   * 思源笔记 window 对象
   */
  static siyuanWindow() {
    let e2;
    return this.isInSiyuanWidget() ? e2 = parent.window : this.isInSiyuanNewWin() || this.isInSiyuanBrowser() || typeof window < "u" ? e2 = window : e2 = void 0, e2;
  }
  // =========================
  // require end
  // =========================
  // =========================
  // import start
  // =========================
  /**
   * 引入json
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   */
  static async importJs(e2, r3) {
    let n = e2;
    switch (r3) {
      case Te.BasePathType_Appearance:
        n = this.browserJoinPath(this.siyuanAppearanceRelativePath(), e2);
        break;
      case Te.BasePathType_Data:
        n = this.browserJoinPath(this.siyuanDataRelativePath(), e2);
        break;
      case Te.BasePathType_Themes:
        n = this.browserJoinPath(this.siyuanThemeRelativePath(), e2);
        break;
      case Te.BasePathType_ZhiTheme:
        n = this.browserJoinPath(this.zhiThemeRelativePath(), e2);
        break;
      default:
        throw new Error("type must be provided");
    }
    const { default: a } = await import(
      /* @vite-ignore */
      n
    );
    return a;
  }
  /**
   * 引入json
   *
   * @param jsonPath - json相对路径全路径
   * @param type - 类型
   */
  // public static async importJson(jsonPath: string, type: BasePathTypeEnum) {
  //   let fullJsonPath = jsonPath
  //   switch (type) {
  //     case BasePathTypeEnum.BasePathType_Appearance:
  //       fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsonPath)
  //       break
  //     case BasePathTypeEnum.BasePathType_Data:
  //       fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsonPath)
  //       break
  //     case BasePathTypeEnum.BasePathType_Themes:
  //       fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsonPath)
  //       break
  //     case BasePathTypeEnum.BasePathType_ZhiTheme:
  //       fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsonPath)
  //       break
  //     default:
  //       throw new Error("type must be provided")
  //   }
  //
  //   const { default: data } = await import(/* @vite-ignore */ fullJsonPath, { assert: { type: "json" } })
  //   return data
  // }
  /**
   * 引入 json - 以 data 为基本路径
   *
   * @param jsonPath - 相对于 data 的相对路径
   */
  // public static async importDataJson(jsonPath: string) {
  //   return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Data)
  // }
  /**
   * 引入 json - 以 appearance 为基本路径
   *
   * @param jsonPath - 相对于 appearance 的相对路径
   */
  // public static async importAppearanceJson(jsonPath: string) {
  //   return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Appearance)
  // }
  /**
   * 引入 json - 以 themes 为基本路径
   *
   * @param jsonPath - 相对于 themes 的相对路径
   */
  // public static async importThemesJson(jsonPath: string) {
  //   return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Themes)
  // }
  /**
   * 引入 zhi 主题的 json - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsonPath - 相对于 zhi 主题根路径的相对路径
   */
  // public static async importZhiThemeJson(jsonPath: string) {
  //   return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_ZhiTheme)
  // }
  /**
   * 引入 zhi 主题的 js - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJs(e2) {
    return await this.importJs(e2, Te.BasePathType_ZhiTheme);
  }
  // =========================
  // import start
  // =========================
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  static joinPath(...e2) {
    if (oe.hasNodeEnv()) {
      const r3 = this.requireLib("path");
      if (r3)
        return r3.join(...e2);
    }
    return this.browserJoinPath(...e2);
  }
  static browserJoinPath(...e2) {
    return e2.join(oe.BrowserSeperator);
  }
  /**
   * 思源笔记 conf 目录
   */
  static siyuanConfPath() {
    const e2 = this.siyuanWindow();
    if (!e2)
      throw new Error("Not in siyuan env");
    return e2.siyuan.config.system.confDir;
  }
  /**
   * 思源笔记 data 目录
   */
  static siyuanDataPath() {
    const e2 = this.siyuanWindow();
    if (!e2)
      throw new Error("Not in siyuan env");
    return e2.siyuan.config.system.dataDir;
  }
  /**
   * 思源笔记 data 目录-相对路径
   */
  static siyuanDataRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return "";
  }
  /**
   * 思源笔记 appearance 目录
   */
  static siyuanAppearancePath() {
    return this.joinPath(this.siyuanConfPath(), "appearance");
  }
  /**
   * 思源笔记 appearance 目录-相对路径
   */
  static siyuanAppearanceRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return this.browserJoinPath("", "appearance");
  }
  /**
   * 思源笔记 themes 目录-绝对路径
   *
   * 注意: 如果是非 electron 和 Node 环境，这里返回的是浏览器的路径，不是物理路径
   * 如果使用物理路径，请调用 siyuanAppearancePath 或者 siyuanDataPath
   *
   * @author terwer
   * @since 0.1.0
   */
  static siyuanThemePath() {
    if (oe.hasNodeEnv())
      return this.joinPath(this.siyuanAppearancePath(), "themes");
    {
      const e2 = this.siyuanWindow();
      if (!e2)
        throw new Error("Not in siyuan env");
      return this.joinPath(e2.location.origin, "appearance", "themes");
    }
  }
  /**
   * 思源笔记 themes 目录-相对路径
   */
  static siyuanThemeRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return this.browserJoinPath("", "appearance", "themes");
  }
  /**
   * zhi 主题目录 - 绝对路径
   */
  static zhiThemePath() {
    return this.joinPath(this.siyuanThemePath(), "zhi");
  }
  /**
   * zhi 主题目录 - 相对路径
   */
  static zhiThemeRelativePath() {
    return this.browserJoinPath(this.siyuanThemeRelativePath(), "zhi");
  }
};
var pr = Oe;
$e(pr, "isInSiyuanWidget", () => oe.isInBrowser ? window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== "" : false), /**
* 思源笔记新窗口
*
* @deprecated window.terwer 判断方式已废弃，建议以后打开新窗口注入 window.siyuanNewWin ，这样语义会更容易理解
* @author terwer
* @version 0.1.0
* @since 0.0.1
*/
$e(pr, "isInSiyuanNewWin", () => !oe.isInBrowser || !oe.isElectron() ? false : typeof window.terwer < "u" || typeof window.siyuanNewWin < "u"), // =========================
// require start
// =========================
/**
 * 引入依赖
 *
 * @param libpath - 依赖全路径
 * @param abs - 可选，是否使用觉得路径，默认是 true ， 启用之后 type参数无效
 * @param type - 可选，以谁的基本路径为准
 */
$e(pr, "requireLib", (e2, r3 = true, n = Te.BasePathType_None) => {
  if (!oe.hasNodeEnv())
    throw new Error("require ony works on node env");
  let a = e2;
  if (!r3)
    switch (n) {
      case Te.BasePathType_Appearance:
        a = Oe.joinPath(Oe.siyuanAppearancePath(), e2);
        break;
      case Te.BasePathType_Data:
        a = Oe.joinPath(Oe.siyuanDataPath(), e2);
        break;
      case Te.BasePathType_Themes:
        a = Oe.joinPath(Oe.siyuanAppearancePath(), "themes", e2);
        break;
      case Te.BasePathType_ZhiTheme:
        a = Oe.joinPath(Oe.siyuanAppearancePath(), "themes", "zhi", e2);
        break;
      default:
        throw new Error("type must be provided when not use absolute path");
    }
  const d = Oe.siyuanWindow();
  if (!d)
    return __require(a);
  if (typeof d.require < "u")
    return d.require(a);
}), /**
* 引入依赖，以 data 的基本路径为准
*
* @param libpath - 相对于 appearance 的相对路径
*/
$e(pr, "requireAppearanceLib", (e2) => Oe.requireLib(e2, false, Te.BasePathType_Appearance)), /**
* 引入依赖，以 data 的基本路径为准
*
* @param libpath - 相对于 data 的相对路径
*/
$e(pr, "requireDataLib", (e2) => Oe.requireLib(e2, false, Te.BasePathType_Data)), /**
* 引入依赖，以 theme 的基本路径为准
*
* @param libpath - 相对于 theme 的相对路径
*/
$e(pr, "requireThemesLib", (e2) => Oe.requireLib(e2, false, Te.BasePathType_Themes)), /**
* 引入依赖，以 ZhiTheme 的基本路径为准
*
* @param libpath - 相对于 ZhiTheme 的相对路径
*/
$e(pr, "requireZhiThemeLib", (e2) => Oe.requireLib(e2, false, Te.BasePathType_ZhiTheme));
var Le = {
  white: (e2) => oe.isElectron() ? Se.whiteBright(e2) : te.white(e2),
  gray: (e2) => oe.isElectron() ? Se.gray(e2) : te.gray(e2),
  blue: (e2) => oe.isElectron() ? Se.blue(e2) : te.blue(e2),
  green: (e2) => oe.isElectron() ? Se.green(e2) : te.green(e2),
  yellow: (e2) => oe.isElectron() ? Se.yellow(e2) : te.yellow(e2),
  red: (e2) => oe.isElectron() ? Se.red(e2) : te.red(e2),
  bgWhite: (e2) => oe.isElectron() ? Se.bgWhiteBright(e2) : te.bgWhite(e2),
  bgGrey: (e2) => oe.isElectron() ? Se.bgCyanBright(e2) : te.bgCyan(e2),
  bgBlue: (e2) => oe.isElectron() ? Se.bgBlueBright(e2) : te.bgBlue(e2),
  bgGreen: (e2) => oe.isElectron() ? Se.bgGreenBright(e2) : te.bgGreen(e2),
  bgYellow: (e2) => oe.isElectron() ? Se.bgYellowBright(e2) : te.bgYellow(e2),
  bgRed: (e2) => oe.isElectron() ? Se.bgRedBright(e2) : te.bgRed(e2)
};
var Bo = class {
  constructor(r3, n, a) {
    Rr(this, "consoleLogger", "console"), Rr(this, "stackSize", 1), Rr(this, "getLogger", (p) => {
      let y;
      if (p)
        y = p;
      else {
        const b = this.getCallStack(), v = [], g2 = [];
        for (let S = 0; S < b.length; S++) {
          const z = b[S], L = z.getFileName() ?? "none";
          if (S > this.stackSize - 1)
            break;
          const R = L + "-" + z.getLineNumber() + ":" + z.getColumnNumber();
          v.push(R);
        }
        g2.length > 0 && (y = v.join(" -> "));
      }
      return (!y || y.trim().length === 0) && (y = this.consoleLogger), Nr.getLogger(y);
    }), this.stackSize = 1;
    let d;
    r3 ? d = r3 : d = jt.getEnvLevel(a), d = d ?? Ze.LOG_LEVEL_INFO, Nr.setLevel(d);
    const o2 = (p, y, b, v) => {
      const g2 = [], S = n ?? jt.getEnvLogger(a) ?? "zhi";
      return g2.push(Le.gray("[") + v(S) + Le.gray("]")), g2.push(Le.gray("[") + Le.gray(b.toString()) + Le.gray("]")), g2.push(v(p.toUpperCase().toString())), g2.push(v(y)), g2.push(Le.gray(":")), g2;
    };
    Tt.reg(Nr), Tt.apply(Nr, {
      format(p, y, b) {
        let v = [];
        const g2 = y ?? "";
        switch (p) {
          case Ze.LOG_LEVEL_TRACE:
            v = o2(p, g2, b, Le.gray);
            break;
          case Ze.LOG_LEVEL_DEBUG:
            v = o2(p, g2, b, Le.blue);
            break;
          case Ze.LOG_LEVEL_INFO:
            v = o2(p, g2, b, Le.green);
            break;
          case Ze.LOG_LEVEL_WARN:
            v = o2(p, g2, b, Le.yellow);
            break;
          case Ze.LOG_LEVEL_ERROR:
            v = o2(p, g2, b, Le.red);
            break;
          default:
            v = o2(Ze.LOG_LEVEL_INFO, g2, b, Le.green);
            break;
        }
        return v.join(" ");
      }
    });
  }
  /**
   * 设置输出栈的深度，默认1
   *
   * @param stackSize - 栈的深度
   */
  setStackSize(r3) {
    this.stackSize = r3 ?? 1;
  }
  /**
   * 获取调用堆栈，若未获取到直接返回空数组
   *
   * @author terwer
   * @since 1.6.0
   */
  getCallStack() {
    let r3;
    try {
      r3 = Ro();
    } catch {
      r3 = [];
    }
    return r3;
  }
};
var Ho = class {
  /**
   * 默认日志级别
   *
   * @param level - 可选，未设置默认INFO
   * @param sign - 可选前缀，默认zhi
   * @param env - 可选环境变量实例
   */
  constructor(r3, n, a) {
    Rr(this, "logger"), this.logger = new Bo(r3, n, a);
  }
  /**
   * 获取日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   * @protected
   */
  getLogger(r3, n) {
    return this.logger.setStackSize(n), this.logger.getLogger(r3);
  }
};
var wn = class extends Ho {
  constructor(r3, n, a) {
    super(r3, n, a);
  }
  /**
   * 获取默认的日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   */
  getLogger(r3, n) {
    return super.getLogger(r3, n);
  }
};
var Ia = class {
  /**
   * 默认日志记录器
   *
   * @param stackSize - 栈的深度
   * @param env - 环境变量实例
   */
  static defaultLogger(r3, n) {
    return Ia.customLogFactory(void 0, void 0, r3).getLogger(void 0, n);
  }
  /**
   * 自定义日志工厂
   *
   * @param level - 级别
   * @param sign - 标志
   * @param env - 环境变量
   */
  static customLogFactory(r3, n, a) {
    return new wn(r3, n, a);
  }
  /**
   * 自定义日志工厂，自定义前缀
   *
   * @param sign - 标志
   * @param env - 环境变量
   */
  static customSignLogFactory(r3, n) {
    return new wn(void 0, r3, n);
  }
};
var qo = "zhi";
var yt = class {
  /**
   * 某些情况下，可能需要手动 init 之后才能用
   */
  static initEnv(r3) {
    this.env = r3;
  }
  /**
   * 获取 zhi-env 实例 - 必须在使用的时候重写此方法
   *
   * ```
   * if (!this.env) {
   *   this.env = new Env({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":false})
   * }
   * return this.env
   * ```
   *
   * @see {@link https://github.com/terwer/zhi/tree/main/apps/zhi-env#usage docs for zhi-env usage}
   */
  static zhiEnv() {
    throw new Error("Method 'zhiEnv' must be implemented");
  }
  /**
   * 获取 zhi-log 实例
   *
   * @param sign - 标志
   * @param loggerName - 日志名称
   */
  static zhiLogWithSign(r3, n) {
    if (this.loggerMap[n])
      return this.loggerMap[n].debug("Zhi-log use cache"), this.loggerMap[n];
    const a = this.env, d = Ia.customSignLogFactory(r3, a).getLogger(n);
    return this.loggerMap[n] = d, d.debug("Zhi-log add new logger"), d;
  }
  /**
   * 获取 zhi-log 实例
   *
   * @param loggerName - 日志名称
   */
  static zhiLog(r3) {
    return this.zhiLogWithSign(qo, r3);
  }
  /**
   * 获取 zhi-common 实例
   */
  static zhiCommon() {
    return this.common || (this.common = new Zo()), this.common;
  }
};
be(yt, "env"), /**
* zhi-util 的日志器缓存
*/
be(yt, "loggerMap", {}), /**
* zhi-util 的通用工具类
*/
be(yt, "common");
var Ma = class extends yt {
  static zhiEnv() {
    return this.env || (this.env = new Co({ BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: false })), this.env;
  }
};
var bn = class {
  constructor() {
    be(this, "logger");
    this.logger = Ma.zhiLog("lute-adaptor"), Lute ? this.logger.debug("Detected Lute is bundled, will use!") : this.logger.debug("Lute is not available!");
  }
  isAvailable() {
    return typeof Lute < "u";
  }
  /**
   * 高亮关键字
   *
   * @param str - 字符串
   * @private
   */
  highlightWords(r3) {
    const n = new RegExp("(?<=^|[\\s\\S])==([^\\n]+?)==(?=($|[\\s\\S]))", "g");
    return r3.replace(n, '<span class="mark">$1</span>');
  }
  /**
   * 渲染Markdown
   *
   * @param md - Markdown
   */
  async renderMarkdownStr(r3) {
    if (!this.isAvailable())
      return this.logger.error("Lute is not available, will return original md"), r3;
    const n = Lute, a = n.New(), d = {
      renderText: (o2, p) => p ? [this.highlightWords(o2.Text()), n.WalkContinue] : ["", n.WalkContinue]
      // renderStrong: (node: any, entering: any) => {
      //     return ["", luteObj.WalkContinue]
      // },
      // renderParagraph: (node: any, entering: any) => {
      //     return ["", luteObj.WalkContinue]
      // }
    };
    return a.SetJSRenderers({
      renderers: {
        Md2HTML: d
      }
    }), this.logger.info("Lute is rendering md to HTML..."), a.MarkdownStr("", r3);
  }
};
var Nt = {};
var Go = {
  get exports() {
    return Nt;
  },
  set exports(e2) {
    Nt = e2;
  }
};
(function(e2) {
  (function() {
    function r3(t) {
      var u2 = {
        omitExtraWLInCodeBlocks: {
          defaultValue: false,
          describe: "Omit the default extra whiteline added to code blocks",
          type: "boolean"
        },
        noHeaderId: {
          defaultValue: false,
          describe: "Turn on/off generated header id",
          type: "boolean"
        },
        prefixHeaderId: {
          defaultValue: false,
          describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
          type: "string"
        },
        rawPrefixHeaderId: {
          defaultValue: false,
          describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)',
          type: "boolean"
        },
        ghCompatibleHeaderId: {
          defaultValue: false,
          describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
          type: "boolean"
        },
        rawHeaderId: {
          defaultValue: false,
          describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`,
          type: "boolean"
        },
        headerLevelStart: {
          defaultValue: false,
          describe: "The header blocks level start",
          type: "integer"
        },
        parseImgDimensions: {
          defaultValue: false,
          describe: "Turn on/off image dimension parsing",
          type: "boolean"
        },
        simplifiedAutoLink: {
          defaultValue: false,
          describe: "Turn on/off GFM autolink style",
          type: "boolean"
        },
        excludeTrailingPunctuationFromURLs: {
          defaultValue: false,
          describe: "Excludes trailing punctuation from links generated with autoLinking",
          type: "boolean"
        },
        literalMidWordUnderscores: {
          defaultValue: false,
          describe: "Parse midword underscores as literal underscores",
          type: "boolean"
        },
        literalMidWordAsterisks: {
          defaultValue: false,
          describe: "Parse midword asterisks as literal asterisks",
          type: "boolean"
        },
        strikethrough: {
          defaultValue: false,
          describe: "Turn on/off strikethrough support",
          type: "boolean"
        },
        tables: {
          defaultValue: false,
          describe: "Turn on/off tables support",
          type: "boolean"
        },
        tablesHeaderId: {
          defaultValue: false,
          describe: "Add an id to table headers",
          type: "boolean"
        },
        ghCodeBlocks: {
          defaultValue: true,
          describe: "Turn on/off GFM fenced code blocks support",
          type: "boolean"
        },
        tasklists: {
          defaultValue: false,
          describe: "Turn on/off GFM tasklist support",
          type: "boolean"
        },
        smoothLivePreview: {
          defaultValue: false,
          describe: "Prevents weird effects in live previews due to incomplete input",
          type: "boolean"
        },
        smartIndentationFix: {
          defaultValue: false,
          describe: "Tries to smartly fix indentation in es6 strings",
          type: "boolean"
        },
        disableForced4SpacesIndentedSublists: {
          defaultValue: false,
          describe: "Disables the requirement of indenting nested sublists by 4 spaces",
          type: "boolean"
        },
        simpleLineBreaks: {
          defaultValue: false,
          describe: "Parses simple line breaks as <br> (GFM Style)",
          type: "boolean"
        },
        requireSpaceBeforeHeadingText: {
          defaultValue: false,
          describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
          type: "boolean"
        },
        ghMentions: {
          defaultValue: false,
          describe: "Enables github @mentions",
          type: "boolean"
        },
        ghMentionsLink: {
          defaultValue: "https://github.com/{u}",
          describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
          type: "string"
        },
        encodeEmails: {
          defaultValue: true,
          describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
          type: "boolean"
        },
        openLinksInNewWindow: {
          defaultValue: false,
          describe: "Open all links in new windows",
          type: "boolean"
        },
        backslashEscapesHTMLTags: {
          defaultValue: false,
          describe: "Support for HTML Tag escaping. ex: <div>foo</div>",
          type: "boolean"
        },
        emoji: {
          defaultValue: false,
          describe: "Enable emoji support. Ex: `this is a :smile: emoji`",
          type: "boolean"
        },
        underline: {
          defaultValue: false,
          describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
          type: "boolean"
        },
        ellipsis: {
          defaultValue: true,
          describe: "Replaces three dots with the ellipsis unicode character",
          type: "boolean"
        },
        completeHTMLDocument: {
          defaultValue: false,
          describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
          type: "boolean"
        },
        metadata: {
          defaultValue: false,
          describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).",
          type: "boolean"
        },
        splitAdjacentBlockquotes: {
          defaultValue: false,
          describe: "Split adjacent blockquote blocks",
          type: "boolean"
        }
      };
      if (t === false)
        return JSON.parse(JSON.stringify(u2));
      var s = {};
      for (var i2 in u2)
        u2.hasOwnProperty(i2) && (s[i2] = u2[i2].defaultValue);
      return s;
    }
    function n() {
      var t = r3(true), u2 = {};
      for (var s in t)
        t.hasOwnProperty(s) && (u2[s] = true);
      return u2;
    }
    var a = {}, d = {}, o2 = {}, p = r3(true), y = "vanilla", b = {
      github: {
        omitExtraWLInCodeBlocks: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghCompatibleHeaderId: true,
        ghMentions: true,
        backslashEscapesHTMLTags: true,
        emoji: true,
        splitAdjacentBlockquotes: true
      },
      original: {
        noHeaderId: true,
        ghCodeBlocks: false
      },
      ghost: {
        omitExtraWLInCodeBlocks: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        ghCodeBlocks: true,
        tasklists: true,
        smoothLivePreview: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghMentions: false,
        encodeEmails: true
      },
      vanilla: r3(true),
      allOn: n()
    };
    a.helper = {}, a.extensions = {}, a.setOption = function(t, u2) {
      return p[t] = u2, this;
    }, a.getOption = function(t) {
      return p[t];
    }, a.getOptions = function() {
      return p;
    }, a.resetOptions = function() {
      p = r3(true);
    }, a.setFlavor = function(t) {
      if (!b.hasOwnProperty(t))
        throw Error(t + " flavor was not found");
      a.resetOptions();
      var u2 = b[t];
      y = t;
      for (var s in u2)
        u2.hasOwnProperty(s) && (p[s] = u2[s]);
    }, a.getFlavor = function() {
      return y;
    }, a.getFlavorOptions = function(t) {
      if (b.hasOwnProperty(t))
        return b[t];
    }, a.getDefaultOptions = function(t) {
      return r3(t);
    }, a.subParser = function(t, u2) {
      if (a.helper.isString(t))
        if (typeof u2 < "u")
          d[t] = u2;
        else {
          if (d.hasOwnProperty(t))
            return d[t];
          throw Error("SubParser named " + t + " not registered!");
        }
    }, a.extension = function(t, u2) {
      if (!a.helper.isString(t))
        throw Error("Extension 'name' must be a string");
      if (t = a.helper.stdExtName(t), a.helper.isUndefined(u2)) {
        if (!o2.hasOwnProperty(t))
          throw Error("Extension named " + t + " is not registered!");
        return o2[t];
      } else {
        typeof u2 == "function" && (u2 = u2()), a.helper.isArray(u2) || (u2 = [u2]);
        var s = v(u2, t);
        if (s.valid)
          o2[t] = u2;
        else
          throw Error(s.error);
      }
    }, a.getAllExtensions = function() {
      return o2;
    }, a.removeExtension = function(t) {
      delete o2[t];
    }, a.resetExtensions = function() {
      o2 = {};
    };
    function v(t, u2) {
      var s = u2 ? "Error in " + u2 + " extension->" : "Error in unnamed extension", i2 = {
        valid: true,
        error: ""
      };
      a.helper.isArray(t) || (t = [t]);
      for (var c = 0; c < t.length; ++c) {
        var m = s + " sub-extension " + c + ": ", h2 = t[c];
        if (typeof h2 != "object")
          return i2.valid = false, i2.error = m + "must be an object, but " + typeof h2 + " given", i2;
        if (!a.helper.isString(h2.type))
          return i2.valid = false, i2.error = m + 'property "type" must be a string, but ' + typeof h2.type + " given", i2;
        var C = h2.type = h2.type.toLowerCase();
        if (C === "language" && (C = h2.type = "lang"), C === "html" && (C = h2.type = "output"), C !== "lang" && C !== "output" && C !== "listener")
          return i2.valid = false, i2.error = m + "type " + C + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', i2;
        if (C === "listener") {
          if (a.helper.isUndefined(h2.listeners))
            return i2.valid = false, i2.error = m + '. Extensions of type "listener" must have a property called "listeners"', i2;
        } else if (a.helper.isUndefined(h2.filter) && a.helper.isUndefined(h2.regex))
          return i2.valid = false, i2.error = m + C + ' extensions must define either a "regex" property or a "filter" method', i2;
        if (h2.listeners) {
          if (typeof h2.listeners != "object")
            return i2.valid = false, i2.error = m + '"listeners" property must be an object but ' + typeof h2.listeners + " given", i2;
          for (var U in h2.listeners)
            if (h2.listeners.hasOwnProperty(U) && typeof h2.listeners[U] != "function")
              return i2.valid = false, i2.error = m + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + U + " must be a function but " + typeof h2.listeners[U] + " given", i2;
        }
        if (h2.filter) {
          if (typeof h2.filter != "function")
            return i2.valid = false, i2.error = m + '"filter" must be a function, but ' + typeof h2.filter + " given", i2;
        } else if (h2.regex) {
          if (a.helper.isString(h2.regex) && (h2.regex = new RegExp(h2.regex, "g")), !(h2.regex instanceof RegExp))
            return i2.valid = false, i2.error = m + '"regex" property must either be a string or a RegExp object, but ' + typeof h2.regex + " given", i2;
          if (a.helper.isUndefined(h2.replace))
            return i2.valid = false, i2.error = m + '"regex" extensions must implement a replace string or function', i2;
        }
      }
      return i2;
    }
    a.validateExtension = function(t) {
      var u2 = v(t, null);
      return u2.valid ? true : (console.warn(u2.error), false);
    }, a.hasOwnProperty("helper") || (a.helper = {}), a.helper.isString = function(t) {
      return typeof t == "string" || t instanceof String;
    }, a.helper.isFunction = function(t) {
      var u2 = {};
      return t && u2.toString.call(t) === "[object Function]";
    }, a.helper.isArray = function(t) {
      return Array.isArray(t);
    }, a.helper.isUndefined = function(t) {
      return typeof t > "u";
    }, a.helper.forEach = function(t, u2) {
      if (a.helper.isUndefined(t))
        throw new Error("obj param is required");
      if (a.helper.isUndefined(u2))
        throw new Error("callback param is required");
      if (!a.helper.isFunction(u2))
        throw new Error("callback param must be a function/closure");
      if (typeof t.forEach == "function")
        t.forEach(u2);
      else if (a.helper.isArray(t))
        for (var s = 0; s < t.length; s++)
          u2(t[s], s, t);
      else if (typeof t == "object")
        for (var i2 in t)
          t.hasOwnProperty(i2) && u2(t[i2], i2, t);
      else
        throw new Error("obj does not seem to be an array or an iterable object");
    }, a.helper.stdExtName = function(t) {
      return t.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
    };
    function g2(t, u2) {
      var s = u2.charCodeAt(0);
      return "\xA8E" + s + "E";
    }
    a.helper.escapeCharactersCallback = g2, a.helper.escapeCharacters = function(t, u2, s) {
      var i2 = "([" + u2.replace(/([\[\]\\])/g, "\\$1") + "])";
      s && (i2 = "\\\\" + i2);
      var c = new RegExp(i2, "g");
      return t = t.replace(c, g2), t;
    }, a.helper.unescapeHTMLEntities = function(t) {
      return t.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    };
    var S = function(t, u2, s, i2) {
      var c = i2 || "", m = c.indexOf("g") > -1, h2 = new RegExp(u2 + "|" + s, "g" + c.replace(/g/g, "")), C = new RegExp(u2, c.replace(/g/g, "")), U = [], H, V, G, _2, q;
      do
        for (H = 0; G = h2.exec(t); )
          if (C.test(G[0]))
            H++ || (V = h2.lastIndex, _2 = V - G[0].length);
          else if (H && !--H) {
            q = G.index + G[0].length;
            var J = {
              left: { start: _2, end: V },
              match: { start: V, end: G.index },
              right: { start: G.index, end: q },
              wholeMatch: { start: _2, end: q }
            };
            if (U.push(J), !m)
              return U;
          }
      while (H && (h2.lastIndex = V));
      return U;
    };
    a.helper.matchRecursiveRegExp = function(t, u2, s, i2) {
      for (var c = S(t, u2, s, i2), m = [], h2 = 0; h2 < c.length; ++h2)
        m.push([
          t.slice(c[h2].wholeMatch.start, c[h2].wholeMatch.end),
          t.slice(c[h2].match.start, c[h2].match.end),
          t.slice(c[h2].left.start, c[h2].left.end),
          t.slice(c[h2].right.start, c[h2].right.end)
        ]);
      return m;
    }, a.helper.replaceRecursiveRegExp = function(t, u2, s, i2, c) {
      if (!a.helper.isFunction(u2)) {
        var m = u2;
        u2 = function() {
          return m;
        };
      }
      var h2 = S(t, s, i2, c), C = t, U = h2.length;
      if (U > 0) {
        var H = [];
        h2[0].wholeMatch.start !== 0 && H.push(t.slice(0, h2[0].wholeMatch.start));
        for (var V = 0; V < U; ++V)
          H.push(
            u2(
              t.slice(h2[V].wholeMatch.start, h2[V].wholeMatch.end),
              t.slice(h2[V].match.start, h2[V].match.end),
              t.slice(h2[V].left.start, h2[V].left.end),
              t.slice(h2[V].right.start, h2[V].right.end)
            )
          ), V < U - 1 && H.push(t.slice(h2[V].wholeMatch.end, h2[V + 1].wholeMatch.start));
        h2[U - 1].wholeMatch.end < t.length && H.push(t.slice(h2[U - 1].wholeMatch.end)), C = H.join("");
      }
      return C;
    }, a.helper.regexIndexOf = function(t, u2, s) {
      if (!a.helper.isString(t))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      if (!(u2 instanceof RegExp))
        throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
      var i2 = t.substring(s || 0).search(u2);
      return i2 >= 0 ? i2 + (s || 0) : i2;
    }, a.helper.splitAtIndex = function(t, u2) {
      if (!a.helper.isString(t))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      return [t.substring(0, u2), t.substring(u2)];
    }, a.helper.encodeEmailAddress = function(t) {
      var u2 = [
        function(s) {
          return "&#" + s.charCodeAt(0) + ";";
        },
        function(s) {
          return "&#x" + s.charCodeAt(0).toString(16) + ";";
        },
        function(s) {
          return s;
        }
      ];
      return t = t.replace(/./g, function(s) {
        if (s === "@")
          s = u2[Math.floor(Math.random() * 2)](s);
        else {
          var i2 = Math.random();
          s = i2 > 0.9 ? u2[2](s) : i2 > 0.45 ? u2[1](s) : u2[0](s);
        }
        return s;
      }), t;
    }, a.helper.padEnd = function(u2, s, i2) {
      return s = s >> 0, i2 = String(i2 || " "), u2.length > s ? String(u2) : (s = s - u2.length, s > i2.length && (i2 += i2.repeat(s / i2.length)), String(u2) + i2.slice(0, s));
    }, typeof console > "u" && (console = {
      warn: function(t) {
        alert(t);
      },
      log: function(t) {
        alert(t);
      },
      error: function(t) {
        throw t;
      }
    }), a.helper.regexes = {
      asteriskDashAndColon: /([*_:~])/g
    }, a.helper.emojis = {
      "+1": "\u{1F44D}",
      "-1": "\u{1F44E}",
      100: "\u{1F4AF}",
      1234: "\u{1F522}",
      "1st_place_medal": "\u{1F947}",
      "2nd_place_medal": "\u{1F948}",
      "3rd_place_medal": "\u{1F949}",
      "8ball": "\u{1F3B1}",
      a: "\u{1F170}\uFE0F",
      ab: "\u{1F18E}",
      abc: "\u{1F524}",
      abcd: "\u{1F521}",
      accept: "\u{1F251}",
      aerial_tramway: "\u{1F6A1}",
      airplane: "\u2708\uFE0F",
      alarm_clock: "\u23F0",
      alembic: "\u2697\uFE0F",
      alien: "\u{1F47D}",
      ambulance: "\u{1F691}",
      amphora: "\u{1F3FA}",
      anchor: "\u2693\uFE0F",
      angel: "\u{1F47C}",
      anger: "\u{1F4A2}",
      angry: "\u{1F620}",
      anguished: "\u{1F627}",
      ant: "\u{1F41C}",
      apple: "\u{1F34E}",
      aquarius: "\u2652\uFE0F",
      aries: "\u2648\uFE0F",
      arrow_backward: "\u25C0\uFE0F",
      arrow_double_down: "\u23EC",
      arrow_double_up: "\u23EB",
      arrow_down: "\u2B07\uFE0F",
      arrow_down_small: "\u{1F53D}",
      arrow_forward: "\u25B6\uFE0F",
      arrow_heading_down: "\u2935\uFE0F",
      arrow_heading_up: "\u2934\uFE0F",
      arrow_left: "\u2B05\uFE0F",
      arrow_lower_left: "\u2199\uFE0F",
      arrow_lower_right: "\u2198\uFE0F",
      arrow_right: "\u27A1\uFE0F",
      arrow_right_hook: "\u21AA\uFE0F",
      arrow_up: "\u2B06\uFE0F",
      arrow_up_down: "\u2195\uFE0F",
      arrow_up_small: "\u{1F53C}",
      arrow_upper_left: "\u2196\uFE0F",
      arrow_upper_right: "\u2197\uFE0F",
      arrows_clockwise: "\u{1F503}",
      arrows_counterclockwise: "\u{1F504}",
      art: "\u{1F3A8}",
      articulated_lorry: "\u{1F69B}",
      artificial_satellite: "\u{1F6F0}",
      astonished: "\u{1F632}",
      athletic_shoe: "\u{1F45F}",
      atm: "\u{1F3E7}",
      atom_symbol: "\u269B\uFE0F",
      avocado: "\u{1F951}",
      b: "\u{1F171}\uFE0F",
      baby: "\u{1F476}",
      baby_bottle: "\u{1F37C}",
      baby_chick: "\u{1F424}",
      baby_symbol: "\u{1F6BC}",
      back: "\u{1F519}",
      bacon: "\u{1F953}",
      badminton: "\u{1F3F8}",
      baggage_claim: "\u{1F6C4}",
      baguette_bread: "\u{1F956}",
      balance_scale: "\u2696\uFE0F",
      balloon: "\u{1F388}",
      ballot_box: "\u{1F5F3}",
      ballot_box_with_check: "\u2611\uFE0F",
      bamboo: "\u{1F38D}",
      banana: "\u{1F34C}",
      bangbang: "\u203C\uFE0F",
      bank: "\u{1F3E6}",
      bar_chart: "\u{1F4CA}",
      barber: "\u{1F488}",
      baseball: "\u26BE\uFE0F",
      basketball: "\u{1F3C0}",
      basketball_man: "\u26F9\uFE0F",
      basketball_woman: "\u26F9\uFE0F&zwj;\u2640\uFE0F",
      bat: "\u{1F987}",
      bath: "\u{1F6C0}",
      bathtub: "\u{1F6C1}",
      battery: "\u{1F50B}",
      beach_umbrella: "\u{1F3D6}",
      bear: "\u{1F43B}",
      bed: "\u{1F6CF}",
      bee: "\u{1F41D}",
      beer: "\u{1F37A}",
      beers: "\u{1F37B}",
      beetle: "\u{1F41E}",
      beginner: "\u{1F530}",
      bell: "\u{1F514}",
      bellhop_bell: "\u{1F6CE}",
      bento: "\u{1F371}",
      biking_man: "\u{1F6B4}",
      bike: "\u{1F6B2}",
      biking_woman: "\u{1F6B4}&zwj;\u2640\uFE0F",
      bikini: "\u{1F459}",
      biohazard: "\u2623\uFE0F",
      bird: "\u{1F426}",
      birthday: "\u{1F382}",
      black_circle: "\u26AB\uFE0F",
      black_flag: "\u{1F3F4}",
      black_heart: "\u{1F5A4}",
      black_joker: "\u{1F0CF}",
      black_large_square: "\u2B1B\uFE0F",
      black_medium_small_square: "\u25FE\uFE0F",
      black_medium_square: "\u25FC\uFE0F",
      black_nib: "\u2712\uFE0F",
      black_small_square: "\u25AA\uFE0F",
      black_square_button: "\u{1F532}",
      blonde_man: "\u{1F471}",
      blonde_woman: "\u{1F471}&zwj;\u2640\uFE0F",
      blossom: "\u{1F33C}",
      blowfish: "\u{1F421}",
      blue_book: "\u{1F4D8}",
      blue_car: "\u{1F699}",
      blue_heart: "\u{1F499}",
      blush: "\u{1F60A}",
      boar: "\u{1F417}",
      boat: "\u26F5\uFE0F",
      bomb: "\u{1F4A3}",
      book: "\u{1F4D6}",
      bookmark: "\u{1F516}",
      bookmark_tabs: "\u{1F4D1}",
      books: "\u{1F4DA}",
      boom: "\u{1F4A5}",
      boot: "\u{1F462}",
      bouquet: "\u{1F490}",
      bowing_man: "\u{1F647}",
      bow_and_arrow: "\u{1F3F9}",
      bowing_woman: "\u{1F647}&zwj;\u2640\uFE0F",
      bowling: "\u{1F3B3}",
      boxing_glove: "\u{1F94A}",
      boy: "\u{1F466}",
      bread: "\u{1F35E}",
      bride_with_veil: "\u{1F470}",
      bridge_at_night: "\u{1F309}",
      briefcase: "\u{1F4BC}",
      broken_heart: "\u{1F494}",
      bug: "\u{1F41B}",
      building_construction: "\u{1F3D7}",
      bulb: "\u{1F4A1}",
      bullettrain_front: "\u{1F685}",
      bullettrain_side: "\u{1F684}",
      burrito: "\u{1F32F}",
      bus: "\u{1F68C}",
      business_suit_levitating: "\u{1F574}",
      busstop: "\u{1F68F}",
      bust_in_silhouette: "\u{1F464}",
      busts_in_silhouette: "\u{1F465}",
      butterfly: "\u{1F98B}",
      cactus: "\u{1F335}",
      cake: "\u{1F370}",
      calendar: "\u{1F4C6}",
      call_me_hand: "\u{1F919}",
      calling: "\u{1F4F2}",
      camel: "\u{1F42B}",
      camera: "\u{1F4F7}",
      camera_flash: "\u{1F4F8}",
      camping: "\u{1F3D5}",
      cancer: "\u264B\uFE0F",
      candle: "\u{1F56F}",
      candy: "\u{1F36C}",
      canoe: "\u{1F6F6}",
      capital_abcd: "\u{1F520}",
      capricorn: "\u2651\uFE0F",
      car: "\u{1F697}",
      card_file_box: "\u{1F5C3}",
      card_index: "\u{1F4C7}",
      card_index_dividers: "\u{1F5C2}",
      carousel_horse: "\u{1F3A0}",
      carrot: "\u{1F955}",
      cat: "\u{1F431}",
      cat2: "\u{1F408}",
      cd: "\u{1F4BF}",
      chains: "\u26D3",
      champagne: "\u{1F37E}",
      chart: "\u{1F4B9}",
      chart_with_downwards_trend: "\u{1F4C9}",
      chart_with_upwards_trend: "\u{1F4C8}",
      checkered_flag: "\u{1F3C1}",
      cheese: "\u{1F9C0}",
      cherries: "\u{1F352}",
      cherry_blossom: "\u{1F338}",
      chestnut: "\u{1F330}",
      chicken: "\u{1F414}",
      children_crossing: "\u{1F6B8}",
      chipmunk: "\u{1F43F}",
      chocolate_bar: "\u{1F36B}",
      christmas_tree: "\u{1F384}",
      church: "\u26EA\uFE0F",
      cinema: "\u{1F3A6}",
      circus_tent: "\u{1F3AA}",
      city_sunrise: "\u{1F307}",
      city_sunset: "\u{1F306}",
      cityscape: "\u{1F3D9}",
      cl: "\u{1F191}",
      clamp: "\u{1F5DC}",
      clap: "\u{1F44F}",
      clapper: "\u{1F3AC}",
      classical_building: "\u{1F3DB}",
      clinking_glasses: "\u{1F942}",
      clipboard: "\u{1F4CB}",
      clock1: "\u{1F550}",
      clock10: "\u{1F559}",
      clock1030: "\u{1F565}",
      clock11: "\u{1F55A}",
      clock1130: "\u{1F566}",
      clock12: "\u{1F55B}",
      clock1230: "\u{1F567}",
      clock130: "\u{1F55C}",
      clock2: "\u{1F551}",
      clock230: "\u{1F55D}",
      clock3: "\u{1F552}",
      clock330: "\u{1F55E}",
      clock4: "\u{1F553}",
      clock430: "\u{1F55F}",
      clock5: "\u{1F554}",
      clock530: "\u{1F560}",
      clock6: "\u{1F555}",
      clock630: "\u{1F561}",
      clock7: "\u{1F556}",
      clock730: "\u{1F562}",
      clock8: "\u{1F557}",
      clock830: "\u{1F563}",
      clock9: "\u{1F558}",
      clock930: "\u{1F564}",
      closed_book: "\u{1F4D5}",
      closed_lock_with_key: "\u{1F510}",
      closed_umbrella: "\u{1F302}",
      cloud: "\u2601\uFE0F",
      cloud_with_lightning: "\u{1F329}",
      cloud_with_lightning_and_rain: "\u26C8",
      cloud_with_rain: "\u{1F327}",
      cloud_with_snow: "\u{1F328}",
      clown_face: "\u{1F921}",
      clubs: "\u2663\uFE0F",
      cocktail: "\u{1F378}",
      coffee: "\u2615\uFE0F",
      coffin: "\u26B0\uFE0F",
      cold_sweat: "\u{1F630}",
      comet: "\u2604\uFE0F",
      computer: "\u{1F4BB}",
      computer_mouse: "\u{1F5B1}",
      confetti_ball: "\u{1F38A}",
      confounded: "\u{1F616}",
      confused: "\u{1F615}",
      congratulations: "\u3297\uFE0F",
      construction: "\u{1F6A7}",
      construction_worker_man: "\u{1F477}",
      construction_worker_woman: "\u{1F477}&zwj;\u2640\uFE0F",
      control_knobs: "\u{1F39B}",
      convenience_store: "\u{1F3EA}",
      cookie: "\u{1F36A}",
      cool: "\u{1F192}",
      policeman: "\u{1F46E}",
      copyright: "\xA9\uFE0F",
      corn: "\u{1F33D}",
      couch_and_lamp: "\u{1F6CB}",
      couple: "\u{1F46B}",
      couple_with_heart_woman_man: "\u{1F491}",
      couple_with_heart_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}",
      couple_with_heart_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}",
      couplekiss_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}",
      couplekiss_man_woman: "\u{1F48F}",
      couplekiss_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}",
      cow: "\u{1F42E}",
      cow2: "\u{1F404}",
      cowboy_hat_face: "\u{1F920}",
      crab: "\u{1F980}",
      crayon: "\u{1F58D}",
      credit_card: "\u{1F4B3}",
      crescent_moon: "\u{1F319}",
      cricket: "\u{1F3CF}",
      crocodile: "\u{1F40A}",
      croissant: "\u{1F950}",
      crossed_fingers: "\u{1F91E}",
      crossed_flags: "\u{1F38C}",
      crossed_swords: "\u2694\uFE0F",
      crown: "\u{1F451}",
      cry: "\u{1F622}",
      crying_cat_face: "\u{1F63F}",
      crystal_ball: "\u{1F52E}",
      cucumber: "\u{1F952}",
      cupid: "\u{1F498}",
      curly_loop: "\u27B0",
      currency_exchange: "\u{1F4B1}",
      curry: "\u{1F35B}",
      custard: "\u{1F36E}",
      customs: "\u{1F6C3}",
      cyclone: "\u{1F300}",
      dagger: "\u{1F5E1}",
      dancer: "\u{1F483}",
      dancing_women: "\u{1F46F}",
      dancing_men: "\u{1F46F}&zwj;\u2642\uFE0F",
      dango: "\u{1F361}",
      dark_sunglasses: "\u{1F576}",
      dart: "\u{1F3AF}",
      dash: "\u{1F4A8}",
      date: "\u{1F4C5}",
      deciduous_tree: "\u{1F333}",
      deer: "\u{1F98C}",
      department_store: "\u{1F3EC}",
      derelict_house: "\u{1F3DA}",
      desert: "\u{1F3DC}",
      desert_island: "\u{1F3DD}",
      desktop_computer: "\u{1F5A5}",
      male_detective: "\u{1F575}\uFE0F",
      diamond_shape_with_a_dot_inside: "\u{1F4A0}",
      diamonds: "\u2666\uFE0F",
      disappointed: "\u{1F61E}",
      disappointed_relieved: "\u{1F625}",
      dizzy: "\u{1F4AB}",
      dizzy_face: "\u{1F635}",
      do_not_litter: "\u{1F6AF}",
      dog: "\u{1F436}",
      dog2: "\u{1F415}",
      dollar: "\u{1F4B5}",
      dolls: "\u{1F38E}",
      dolphin: "\u{1F42C}",
      door: "\u{1F6AA}",
      doughnut: "\u{1F369}",
      dove: "\u{1F54A}",
      dragon: "\u{1F409}",
      dragon_face: "\u{1F432}",
      dress: "\u{1F457}",
      dromedary_camel: "\u{1F42A}",
      drooling_face: "\u{1F924}",
      droplet: "\u{1F4A7}",
      drum: "\u{1F941}",
      duck: "\u{1F986}",
      dvd: "\u{1F4C0}",
      "e-mail": "\u{1F4E7}",
      eagle: "\u{1F985}",
      ear: "\u{1F442}",
      ear_of_rice: "\u{1F33E}",
      earth_africa: "\u{1F30D}",
      earth_americas: "\u{1F30E}",
      earth_asia: "\u{1F30F}",
      egg: "\u{1F95A}",
      eggplant: "\u{1F346}",
      eight_pointed_black_star: "\u2734\uFE0F",
      eight_spoked_asterisk: "\u2733\uFE0F",
      electric_plug: "\u{1F50C}",
      elephant: "\u{1F418}",
      email: "\u2709\uFE0F",
      end: "\u{1F51A}",
      envelope_with_arrow: "\u{1F4E9}",
      euro: "\u{1F4B6}",
      european_castle: "\u{1F3F0}",
      european_post_office: "\u{1F3E4}",
      evergreen_tree: "\u{1F332}",
      exclamation: "\u2757\uFE0F",
      expressionless: "\u{1F611}",
      eye: "\u{1F441}",
      eye_speech_bubble: "\u{1F441}&zwj;\u{1F5E8}",
      eyeglasses: "\u{1F453}",
      eyes: "\u{1F440}",
      face_with_head_bandage: "\u{1F915}",
      face_with_thermometer: "\u{1F912}",
      fist_oncoming: "\u{1F44A}",
      factory: "\u{1F3ED}",
      fallen_leaf: "\u{1F342}",
      family_man_woman_boy: "\u{1F46A}",
      family_man_boy: "\u{1F468}&zwj;\u{1F466}",
      family_man_boy_boy: "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_man_girl: "\u{1F468}&zwj;\u{1F467}",
      family_man_girl_boy: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_man_girl_girl: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
      family_man_man_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}",
      family_man_man_boy_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_man_man_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}",
      family_man_man_girl_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_man_man_girl_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}",
      family_man_woman_boy_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_man_woman_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}",
      family_man_woman_girl_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_man_woman_girl_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
      family_woman_boy: "\u{1F469}&zwj;\u{1F466}",
      family_woman_boy_boy: "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_woman_girl: "\u{1F469}&zwj;\u{1F467}",
      family_woman_girl_boy: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_woman_girl_girl: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
      family_woman_woman_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}",
      family_woman_woman_boy_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}",
      family_woman_woman_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}",
      family_woman_woman_girl_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}",
      family_woman_woman_girl_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}",
      fast_forward: "\u23E9",
      fax: "\u{1F4E0}",
      fearful: "\u{1F628}",
      feet: "\u{1F43E}",
      female_detective: "\u{1F575}\uFE0F&zwj;\u2640\uFE0F",
      ferris_wheel: "\u{1F3A1}",
      ferry: "\u26F4",
      field_hockey: "\u{1F3D1}",
      file_cabinet: "\u{1F5C4}",
      file_folder: "\u{1F4C1}",
      film_projector: "\u{1F4FD}",
      film_strip: "\u{1F39E}",
      fire: "\u{1F525}",
      fire_engine: "\u{1F692}",
      fireworks: "\u{1F386}",
      first_quarter_moon: "\u{1F313}",
      first_quarter_moon_with_face: "\u{1F31B}",
      fish: "\u{1F41F}",
      fish_cake: "\u{1F365}",
      fishing_pole_and_fish: "\u{1F3A3}",
      fist_raised: "\u270A",
      fist_left: "\u{1F91B}",
      fist_right: "\u{1F91C}",
      flags: "\u{1F38F}",
      flashlight: "\u{1F526}",
      fleur_de_lis: "\u269C\uFE0F",
      flight_arrival: "\u{1F6EC}",
      flight_departure: "\u{1F6EB}",
      floppy_disk: "\u{1F4BE}",
      flower_playing_cards: "\u{1F3B4}",
      flushed: "\u{1F633}",
      fog: "\u{1F32B}",
      foggy: "\u{1F301}",
      football: "\u{1F3C8}",
      footprints: "\u{1F463}",
      fork_and_knife: "\u{1F374}",
      fountain: "\u26F2\uFE0F",
      fountain_pen: "\u{1F58B}",
      four_leaf_clover: "\u{1F340}",
      fox_face: "\u{1F98A}",
      framed_picture: "\u{1F5BC}",
      free: "\u{1F193}",
      fried_egg: "\u{1F373}",
      fried_shrimp: "\u{1F364}",
      fries: "\u{1F35F}",
      frog: "\u{1F438}",
      frowning: "\u{1F626}",
      frowning_face: "\u2639\uFE0F",
      frowning_man: "\u{1F64D}&zwj;\u2642\uFE0F",
      frowning_woman: "\u{1F64D}",
      middle_finger: "\u{1F595}",
      fuelpump: "\u26FD\uFE0F",
      full_moon: "\u{1F315}",
      full_moon_with_face: "\u{1F31D}",
      funeral_urn: "\u26B1\uFE0F",
      game_die: "\u{1F3B2}",
      gear: "\u2699\uFE0F",
      gem: "\u{1F48E}",
      gemini: "\u264A\uFE0F",
      ghost: "\u{1F47B}",
      gift: "\u{1F381}",
      gift_heart: "\u{1F49D}",
      girl: "\u{1F467}",
      globe_with_meridians: "\u{1F310}",
      goal_net: "\u{1F945}",
      goat: "\u{1F410}",
      golf: "\u26F3\uFE0F",
      golfing_man: "\u{1F3CC}\uFE0F",
      golfing_woman: "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F",
      gorilla: "\u{1F98D}",
      grapes: "\u{1F347}",
      green_apple: "\u{1F34F}",
      green_book: "\u{1F4D7}",
      green_heart: "\u{1F49A}",
      green_salad: "\u{1F957}",
      grey_exclamation: "\u2755",
      grey_question: "\u2754",
      grimacing: "\u{1F62C}",
      grin: "\u{1F601}",
      grinning: "\u{1F600}",
      guardsman: "\u{1F482}",
      guardswoman: "\u{1F482}&zwj;\u2640\uFE0F",
      guitar: "\u{1F3B8}",
      gun: "\u{1F52B}",
      haircut_woman: "\u{1F487}",
      haircut_man: "\u{1F487}&zwj;\u2642\uFE0F",
      hamburger: "\u{1F354}",
      hammer: "\u{1F528}",
      hammer_and_pick: "\u2692",
      hammer_and_wrench: "\u{1F6E0}",
      hamster: "\u{1F439}",
      hand: "\u270B",
      handbag: "\u{1F45C}",
      handshake: "\u{1F91D}",
      hankey: "\u{1F4A9}",
      hatched_chick: "\u{1F425}",
      hatching_chick: "\u{1F423}",
      headphones: "\u{1F3A7}",
      hear_no_evil: "\u{1F649}",
      heart: "\u2764\uFE0F",
      heart_decoration: "\u{1F49F}",
      heart_eyes: "\u{1F60D}",
      heart_eyes_cat: "\u{1F63B}",
      heartbeat: "\u{1F493}",
      heartpulse: "\u{1F497}",
      hearts: "\u2665\uFE0F",
      heavy_check_mark: "\u2714\uFE0F",
      heavy_division_sign: "\u2797",
      heavy_dollar_sign: "\u{1F4B2}",
      heavy_heart_exclamation: "\u2763\uFE0F",
      heavy_minus_sign: "\u2796",
      heavy_multiplication_x: "\u2716\uFE0F",
      heavy_plus_sign: "\u2795",
      helicopter: "\u{1F681}",
      herb: "\u{1F33F}",
      hibiscus: "\u{1F33A}",
      high_brightness: "\u{1F506}",
      high_heel: "\u{1F460}",
      hocho: "\u{1F52A}",
      hole: "\u{1F573}",
      honey_pot: "\u{1F36F}",
      horse: "\u{1F434}",
      horse_racing: "\u{1F3C7}",
      hospital: "\u{1F3E5}",
      hot_pepper: "\u{1F336}",
      hotdog: "\u{1F32D}",
      hotel: "\u{1F3E8}",
      hotsprings: "\u2668\uFE0F",
      hourglass: "\u231B\uFE0F",
      hourglass_flowing_sand: "\u23F3",
      house: "\u{1F3E0}",
      house_with_garden: "\u{1F3E1}",
      houses: "\u{1F3D8}",
      hugs: "\u{1F917}",
      hushed: "\u{1F62F}",
      ice_cream: "\u{1F368}",
      ice_hockey: "\u{1F3D2}",
      ice_skate: "\u26F8",
      icecream: "\u{1F366}",
      id: "\u{1F194}",
      ideograph_advantage: "\u{1F250}",
      imp: "\u{1F47F}",
      inbox_tray: "\u{1F4E5}",
      incoming_envelope: "\u{1F4E8}",
      tipping_hand_woman: "\u{1F481}",
      information_source: "\u2139\uFE0F",
      innocent: "\u{1F607}",
      interrobang: "\u2049\uFE0F",
      iphone: "\u{1F4F1}",
      izakaya_lantern: "\u{1F3EE}",
      jack_o_lantern: "\u{1F383}",
      japan: "\u{1F5FE}",
      japanese_castle: "\u{1F3EF}",
      japanese_goblin: "\u{1F47A}",
      japanese_ogre: "\u{1F479}",
      jeans: "\u{1F456}",
      joy: "\u{1F602}",
      joy_cat: "\u{1F639}",
      joystick: "\u{1F579}",
      kaaba: "\u{1F54B}",
      key: "\u{1F511}",
      keyboard: "\u2328\uFE0F",
      keycap_ten: "\u{1F51F}",
      kick_scooter: "\u{1F6F4}",
      kimono: "\u{1F458}",
      kiss: "\u{1F48B}",
      kissing: "\u{1F617}",
      kissing_cat: "\u{1F63D}",
      kissing_closed_eyes: "\u{1F61A}",
      kissing_heart: "\u{1F618}",
      kissing_smiling_eyes: "\u{1F619}",
      kiwi_fruit: "\u{1F95D}",
      koala: "\u{1F428}",
      koko: "\u{1F201}",
      label: "\u{1F3F7}",
      large_blue_circle: "\u{1F535}",
      large_blue_diamond: "\u{1F537}",
      large_orange_diamond: "\u{1F536}",
      last_quarter_moon: "\u{1F317}",
      last_quarter_moon_with_face: "\u{1F31C}",
      latin_cross: "\u271D\uFE0F",
      laughing: "\u{1F606}",
      leaves: "\u{1F343}",
      ledger: "\u{1F4D2}",
      left_luggage: "\u{1F6C5}",
      left_right_arrow: "\u2194\uFE0F",
      leftwards_arrow_with_hook: "\u21A9\uFE0F",
      lemon: "\u{1F34B}",
      leo: "\u264C\uFE0F",
      leopard: "\u{1F406}",
      level_slider: "\u{1F39A}",
      libra: "\u264E\uFE0F",
      light_rail: "\u{1F688}",
      link: "\u{1F517}",
      lion: "\u{1F981}",
      lips: "\u{1F444}",
      lipstick: "\u{1F484}",
      lizard: "\u{1F98E}",
      lock: "\u{1F512}",
      lock_with_ink_pen: "\u{1F50F}",
      lollipop: "\u{1F36D}",
      loop: "\u27BF",
      loud_sound: "\u{1F50A}",
      loudspeaker: "\u{1F4E2}",
      love_hotel: "\u{1F3E9}",
      love_letter: "\u{1F48C}",
      low_brightness: "\u{1F505}",
      lying_face: "\u{1F925}",
      m: "\u24C2\uFE0F",
      mag: "\u{1F50D}",
      mag_right: "\u{1F50E}",
      mahjong: "\u{1F004}\uFE0F",
      mailbox: "\u{1F4EB}",
      mailbox_closed: "\u{1F4EA}",
      mailbox_with_mail: "\u{1F4EC}",
      mailbox_with_no_mail: "\u{1F4ED}",
      man: "\u{1F468}",
      man_artist: "\u{1F468}&zwj;\u{1F3A8}",
      man_astronaut: "\u{1F468}&zwj;\u{1F680}",
      man_cartwheeling: "\u{1F938}&zwj;\u2642\uFE0F",
      man_cook: "\u{1F468}&zwj;\u{1F373}",
      man_dancing: "\u{1F57A}",
      man_facepalming: "\u{1F926}&zwj;\u2642\uFE0F",
      man_factory_worker: "\u{1F468}&zwj;\u{1F3ED}",
      man_farmer: "\u{1F468}&zwj;\u{1F33E}",
      man_firefighter: "\u{1F468}&zwj;\u{1F692}",
      man_health_worker: "\u{1F468}&zwj;\u2695\uFE0F",
      man_in_tuxedo: "\u{1F935}",
      man_judge: "\u{1F468}&zwj;\u2696\uFE0F",
      man_juggling: "\u{1F939}&zwj;\u2642\uFE0F",
      man_mechanic: "\u{1F468}&zwj;\u{1F527}",
      man_office_worker: "\u{1F468}&zwj;\u{1F4BC}",
      man_pilot: "\u{1F468}&zwj;\u2708\uFE0F",
      man_playing_handball: "\u{1F93E}&zwj;\u2642\uFE0F",
      man_playing_water_polo: "\u{1F93D}&zwj;\u2642\uFE0F",
      man_scientist: "\u{1F468}&zwj;\u{1F52C}",
      man_shrugging: "\u{1F937}&zwj;\u2642\uFE0F",
      man_singer: "\u{1F468}&zwj;\u{1F3A4}",
      man_student: "\u{1F468}&zwj;\u{1F393}",
      man_teacher: "\u{1F468}&zwj;\u{1F3EB}",
      man_technologist: "\u{1F468}&zwj;\u{1F4BB}",
      man_with_gua_pi_mao: "\u{1F472}",
      man_with_turban: "\u{1F473}",
      tangerine: "\u{1F34A}",
      mans_shoe: "\u{1F45E}",
      mantelpiece_clock: "\u{1F570}",
      maple_leaf: "\u{1F341}",
      martial_arts_uniform: "\u{1F94B}",
      mask: "\u{1F637}",
      massage_woman: "\u{1F486}",
      massage_man: "\u{1F486}&zwj;\u2642\uFE0F",
      meat_on_bone: "\u{1F356}",
      medal_military: "\u{1F396}",
      medal_sports: "\u{1F3C5}",
      mega: "\u{1F4E3}",
      melon: "\u{1F348}",
      memo: "\u{1F4DD}",
      men_wrestling: "\u{1F93C}&zwj;\u2642\uFE0F",
      menorah: "\u{1F54E}",
      mens: "\u{1F6B9}",
      metal: "\u{1F918}",
      metro: "\u{1F687}",
      microphone: "\u{1F3A4}",
      microscope: "\u{1F52C}",
      milk_glass: "\u{1F95B}",
      milky_way: "\u{1F30C}",
      minibus: "\u{1F690}",
      minidisc: "\u{1F4BD}",
      mobile_phone_off: "\u{1F4F4}",
      money_mouth_face: "\u{1F911}",
      money_with_wings: "\u{1F4B8}",
      moneybag: "\u{1F4B0}",
      monkey: "\u{1F412}",
      monkey_face: "\u{1F435}",
      monorail: "\u{1F69D}",
      moon: "\u{1F314}",
      mortar_board: "\u{1F393}",
      mosque: "\u{1F54C}",
      motor_boat: "\u{1F6E5}",
      motor_scooter: "\u{1F6F5}",
      motorcycle: "\u{1F3CD}",
      motorway: "\u{1F6E3}",
      mount_fuji: "\u{1F5FB}",
      mountain: "\u26F0",
      mountain_biking_man: "\u{1F6B5}",
      mountain_biking_woman: "\u{1F6B5}&zwj;\u2640\uFE0F",
      mountain_cableway: "\u{1F6A0}",
      mountain_railway: "\u{1F69E}",
      mountain_snow: "\u{1F3D4}",
      mouse: "\u{1F42D}",
      mouse2: "\u{1F401}",
      movie_camera: "\u{1F3A5}",
      moyai: "\u{1F5FF}",
      mrs_claus: "\u{1F936}",
      muscle: "\u{1F4AA}",
      mushroom: "\u{1F344}",
      musical_keyboard: "\u{1F3B9}",
      musical_note: "\u{1F3B5}",
      musical_score: "\u{1F3BC}",
      mute: "\u{1F507}",
      nail_care: "\u{1F485}",
      name_badge: "\u{1F4DB}",
      national_park: "\u{1F3DE}",
      nauseated_face: "\u{1F922}",
      necktie: "\u{1F454}",
      negative_squared_cross_mark: "\u274E",
      nerd_face: "\u{1F913}",
      neutral_face: "\u{1F610}",
      new: "\u{1F195}",
      new_moon: "\u{1F311}",
      new_moon_with_face: "\u{1F31A}",
      newspaper: "\u{1F4F0}",
      newspaper_roll: "\u{1F5DE}",
      next_track_button: "\u23ED",
      ng: "\u{1F196}",
      no_good_man: "\u{1F645}&zwj;\u2642\uFE0F",
      no_good_woman: "\u{1F645}",
      night_with_stars: "\u{1F303}",
      no_bell: "\u{1F515}",
      no_bicycles: "\u{1F6B3}",
      no_entry: "\u26D4\uFE0F",
      no_entry_sign: "\u{1F6AB}",
      no_mobile_phones: "\u{1F4F5}",
      no_mouth: "\u{1F636}",
      no_pedestrians: "\u{1F6B7}",
      no_smoking: "\u{1F6AD}",
      "non-potable_water": "\u{1F6B1}",
      nose: "\u{1F443}",
      notebook: "\u{1F4D3}",
      notebook_with_decorative_cover: "\u{1F4D4}",
      notes: "\u{1F3B6}",
      nut_and_bolt: "\u{1F529}",
      o: "\u2B55\uFE0F",
      o2: "\u{1F17E}\uFE0F",
      ocean: "\u{1F30A}",
      octopus: "\u{1F419}",
      oden: "\u{1F362}",
      office: "\u{1F3E2}",
      oil_drum: "\u{1F6E2}",
      ok: "\u{1F197}",
      ok_hand: "\u{1F44C}",
      ok_man: "\u{1F646}&zwj;\u2642\uFE0F",
      ok_woman: "\u{1F646}",
      old_key: "\u{1F5DD}",
      older_man: "\u{1F474}",
      older_woman: "\u{1F475}",
      om: "\u{1F549}",
      on: "\u{1F51B}",
      oncoming_automobile: "\u{1F698}",
      oncoming_bus: "\u{1F68D}",
      oncoming_police_car: "\u{1F694}",
      oncoming_taxi: "\u{1F696}",
      open_file_folder: "\u{1F4C2}",
      open_hands: "\u{1F450}",
      open_mouth: "\u{1F62E}",
      open_umbrella: "\u2602\uFE0F",
      ophiuchus: "\u26CE",
      orange_book: "\u{1F4D9}",
      orthodox_cross: "\u2626\uFE0F",
      outbox_tray: "\u{1F4E4}",
      owl: "\u{1F989}",
      ox: "\u{1F402}",
      package: "\u{1F4E6}",
      page_facing_up: "\u{1F4C4}",
      page_with_curl: "\u{1F4C3}",
      pager: "\u{1F4DF}",
      paintbrush: "\u{1F58C}",
      palm_tree: "\u{1F334}",
      pancakes: "\u{1F95E}",
      panda_face: "\u{1F43C}",
      paperclip: "\u{1F4CE}",
      paperclips: "\u{1F587}",
      parasol_on_ground: "\u26F1",
      parking: "\u{1F17F}\uFE0F",
      part_alternation_mark: "\u303D\uFE0F",
      partly_sunny: "\u26C5\uFE0F",
      passenger_ship: "\u{1F6F3}",
      passport_control: "\u{1F6C2}",
      pause_button: "\u23F8",
      peace_symbol: "\u262E\uFE0F",
      peach: "\u{1F351}",
      peanuts: "\u{1F95C}",
      pear: "\u{1F350}",
      pen: "\u{1F58A}",
      pencil2: "\u270F\uFE0F",
      penguin: "\u{1F427}",
      pensive: "\u{1F614}",
      performing_arts: "\u{1F3AD}",
      persevere: "\u{1F623}",
      person_fencing: "\u{1F93A}",
      pouting_woman: "\u{1F64E}",
      phone: "\u260E\uFE0F",
      pick: "\u26CF",
      pig: "\u{1F437}",
      pig2: "\u{1F416}",
      pig_nose: "\u{1F43D}",
      pill: "\u{1F48A}",
      pineapple: "\u{1F34D}",
      ping_pong: "\u{1F3D3}",
      pisces: "\u2653\uFE0F",
      pizza: "\u{1F355}",
      place_of_worship: "\u{1F6D0}",
      plate_with_cutlery: "\u{1F37D}",
      play_or_pause_button: "\u23EF",
      point_down: "\u{1F447}",
      point_left: "\u{1F448}",
      point_right: "\u{1F449}",
      point_up: "\u261D\uFE0F",
      point_up_2: "\u{1F446}",
      police_car: "\u{1F693}",
      policewoman: "\u{1F46E}&zwj;\u2640\uFE0F",
      poodle: "\u{1F429}",
      popcorn: "\u{1F37F}",
      post_office: "\u{1F3E3}",
      postal_horn: "\u{1F4EF}",
      postbox: "\u{1F4EE}",
      potable_water: "\u{1F6B0}",
      potato: "\u{1F954}",
      pouch: "\u{1F45D}",
      poultry_leg: "\u{1F357}",
      pound: "\u{1F4B7}",
      rage: "\u{1F621}",
      pouting_cat: "\u{1F63E}",
      pouting_man: "\u{1F64E}&zwj;\u2642\uFE0F",
      pray: "\u{1F64F}",
      prayer_beads: "\u{1F4FF}",
      pregnant_woman: "\u{1F930}",
      previous_track_button: "\u23EE",
      prince: "\u{1F934}",
      princess: "\u{1F478}",
      printer: "\u{1F5A8}",
      purple_heart: "\u{1F49C}",
      purse: "\u{1F45B}",
      pushpin: "\u{1F4CC}",
      put_litter_in_its_place: "\u{1F6AE}",
      question: "\u2753",
      rabbit: "\u{1F430}",
      rabbit2: "\u{1F407}",
      racehorse: "\u{1F40E}",
      racing_car: "\u{1F3CE}",
      radio: "\u{1F4FB}",
      radio_button: "\u{1F518}",
      radioactive: "\u2622\uFE0F",
      railway_car: "\u{1F683}",
      railway_track: "\u{1F6E4}",
      rainbow: "\u{1F308}",
      rainbow_flag: "\u{1F3F3}\uFE0F&zwj;\u{1F308}",
      raised_back_of_hand: "\u{1F91A}",
      raised_hand_with_fingers_splayed: "\u{1F590}",
      raised_hands: "\u{1F64C}",
      raising_hand_woman: "\u{1F64B}",
      raising_hand_man: "\u{1F64B}&zwj;\u2642\uFE0F",
      ram: "\u{1F40F}",
      ramen: "\u{1F35C}",
      rat: "\u{1F400}",
      record_button: "\u23FA",
      recycle: "\u267B\uFE0F",
      red_circle: "\u{1F534}",
      registered: "\xAE\uFE0F",
      relaxed: "\u263A\uFE0F",
      relieved: "\u{1F60C}",
      reminder_ribbon: "\u{1F397}",
      repeat: "\u{1F501}",
      repeat_one: "\u{1F502}",
      rescue_worker_helmet: "\u26D1",
      restroom: "\u{1F6BB}",
      revolving_hearts: "\u{1F49E}",
      rewind: "\u23EA",
      rhinoceros: "\u{1F98F}",
      ribbon: "\u{1F380}",
      rice: "\u{1F35A}",
      rice_ball: "\u{1F359}",
      rice_cracker: "\u{1F358}",
      rice_scene: "\u{1F391}",
      right_anger_bubble: "\u{1F5EF}",
      ring: "\u{1F48D}",
      robot: "\u{1F916}",
      rocket: "\u{1F680}",
      rofl: "\u{1F923}",
      roll_eyes: "\u{1F644}",
      roller_coaster: "\u{1F3A2}",
      rooster: "\u{1F413}",
      rose: "\u{1F339}",
      rosette: "\u{1F3F5}",
      rotating_light: "\u{1F6A8}",
      round_pushpin: "\u{1F4CD}",
      rowing_man: "\u{1F6A3}",
      rowing_woman: "\u{1F6A3}&zwj;\u2640\uFE0F",
      rugby_football: "\u{1F3C9}",
      running_man: "\u{1F3C3}",
      running_shirt_with_sash: "\u{1F3BD}",
      running_woman: "\u{1F3C3}&zwj;\u2640\uFE0F",
      sa: "\u{1F202}\uFE0F",
      sagittarius: "\u2650\uFE0F",
      sake: "\u{1F376}",
      sandal: "\u{1F461}",
      santa: "\u{1F385}",
      satellite: "\u{1F4E1}",
      saxophone: "\u{1F3B7}",
      school: "\u{1F3EB}",
      school_satchel: "\u{1F392}",
      scissors: "\u2702\uFE0F",
      scorpion: "\u{1F982}",
      scorpius: "\u264F\uFE0F",
      scream: "\u{1F631}",
      scream_cat: "\u{1F640}",
      scroll: "\u{1F4DC}",
      seat: "\u{1F4BA}",
      secret: "\u3299\uFE0F",
      see_no_evil: "\u{1F648}",
      seedling: "\u{1F331}",
      selfie: "\u{1F933}",
      shallow_pan_of_food: "\u{1F958}",
      shamrock: "\u2618\uFE0F",
      shark: "\u{1F988}",
      shaved_ice: "\u{1F367}",
      sheep: "\u{1F411}",
      shell: "\u{1F41A}",
      shield: "\u{1F6E1}",
      shinto_shrine: "\u26E9",
      ship: "\u{1F6A2}",
      shirt: "\u{1F455}",
      shopping: "\u{1F6CD}",
      shopping_cart: "\u{1F6D2}",
      shower: "\u{1F6BF}",
      shrimp: "\u{1F990}",
      signal_strength: "\u{1F4F6}",
      six_pointed_star: "\u{1F52F}",
      ski: "\u{1F3BF}",
      skier: "\u26F7",
      skull: "\u{1F480}",
      skull_and_crossbones: "\u2620\uFE0F",
      sleeping: "\u{1F634}",
      sleeping_bed: "\u{1F6CC}",
      sleepy: "\u{1F62A}",
      slightly_frowning_face: "\u{1F641}",
      slightly_smiling_face: "\u{1F642}",
      slot_machine: "\u{1F3B0}",
      small_airplane: "\u{1F6E9}",
      small_blue_diamond: "\u{1F539}",
      small_orange_diamond: "\u{1F538}",
      small_red_triangle: "\u{1F53A}",
      small_red_triangle_down: "\u{1F53B}",
      smile: "\u{1F604}",
      smile_cat: "\u{1F638}",
      smiley: "\u{1F603}",
      smiley_cat: "\u{1F63A}",
      smiling_imp: "\u{1F608}",
      smirk: "\u{1F60F}",
      smirk_cat: "\u{1F63C}",
      smoking: "\u{1F6AC}",
      snail: "\u{1F40C}",
      snake: "\u{1F40D}",
      sneezing_face: "\u{1F927}",
      snowboarder: "\u{1F3C2}",
      snowflake: "\u2744\uFE0F",
      snowman: "\u26C4\uFE0F",
      snowman_with_snow: "\u2603\uFE0F",
      sob: "\u{1F62D}",
      soccer: "\u26BD\uFE0F",
      soon: "\u{1F51C}",
      sos: "\u{1F198}",
      sound: "\u{1F509}",
      space_invader: "\u{1F47E}",
      spades: "\u2660\uFE0F",
      spaghetti: "\u{1F35D}",
      sparkle: "\u2747\uFE0F",
      sparkler: "\u{1F387}",
      sparkles: "\u2728",
      sparkling_heart: "\u{1F496}",
      speak_no_evil: "\u{1F64A}",
      speaker: "\u{1F508}",
      speaking_head: "\u{1F5E3}",
      speech_balloon: "\u{1F4AC}",
      speedboat: "\u{1F6A4}",
      spider: "\u{1F577}",
      spider_web: "\u{1F578}",
      spiral_calendar: "\u{1F5D3}",
      spiral_notepad: "\u{1F5D2}",
      spoon: "\u{1F944}",
      squid: "\u{1F991}",
      stadium: "\u{1F3DF}",
      star: "\u2B50\uFE0F",
      star2: "\u{1F31F}",
      star_and_crescent: "\u262A\uFE0F",
      star_of_david: "\u2721\uFE0F",
      stars: "\u{1F320}",
      station: "\u{1F689}",
      statue_of_liberty: "\u{1F5FD}",
      steam_locomotive: "\u{1F682}",
      stew: "\u{1F372}",
      stop_button: "\u23F9",
      stop_sign: "\u{1F6D1}",
      stopwatch: "\u23F1",
      straight_ruler: "\u{1F4CF}",
      strawberry: "\u{1F353}",
      stuck_out_tongue: "\u{1F61B}",
      stuck_out_tongue_closed_eyes: "\u{1F61D}",
      stuck_out_tongue_winking_eye: "\u{1F61C}",
      studio_microphone: "\u{1F399}",
      stuffed_flatbread: "\u{1F959}",
      sun_behind_large_cloud: "\u{1F325}",
      sun_behind_rain_cloud: "\u{1F326}",
      sun_behind_small_cloud: "\u{1F324}",
      sun_with_face: "\u{1F31E}",
      sunflower: "\u{1F33B}",
      sunglasses: "\u{1F60E}",
      sunny: "\u2600\uFE0F",
      sunrise: "\u{1F305}",
      sunrise_over_mountains: "\u{1F304}",
      surfing_man: "\u{1F3C4}",
      surfing_woman: "\u{1F3C4}&zwj;\u2640\uFE0F",
      sushi: "\u{1F363}",
      suspension_railway: "\u{1F69F}",
      sweat: "\u{1F613}",
      sweat_drops: "\u{1F4A6}",
      sweat_smile: "\u{1F605}",
      sweet_potato: "\u{1F360}",
      swimming_man: "\u{1F3CA}",
      swimming_woman: "\u{1F3CA}&zwj;\u2640\uFE0F",
      symbols: "\u{1F523}",
      synagogue: "\u{1F54D}",
      syringe: "\u{1F489}",
      taco: "\u{1F32E}",
      tada: "\u{1F389}",
      tanabata_tree: "\u{1F38B}",
      taurus: "\u2649\uFE0F",
      taxi: "\u{1F695}",
      tea: "\u{1F375}",
      telephone_receiver: "\u{1F4DE}",
      telescope: "\u{1F52D}",
      tennis: "\u{1F3BE}",
      tent: "\u26FA\uFE0F",
      thermometer: "\u{1F321}",
      thinking: "\u{1F914}",
      thought_balloon: "\u{1F4AD}",
      ticket: "\u{1F3AB}",
      tickets: "\u{1F39F}",
      tiger: "\u{1F42F}",
      tiger2: "\u{1F405}",
      timer_clock: "\u23F2",
      tipping_hand_man: "\u{1F481}&zwj;\u2642\uFE0F",
      tired_face: "\u{1F62B}",
      tm: "\u2122\uFE0F",
      toilet: "\u{1F6BD}",
      tokyo_tower: "\u{1F5FC}",
      tomato: "\u{1F345}",
      tongue: "\u{1F445}",
      top: "\u{1F51D}",
      tophat: "\u{1F3A9}",
      tornado: "\u{1F32A}",
      trackball: "\u{1F5B2}",
      tractor: "\u{1F69C}",
      traffic_light: "\u{1F6A5}",
      train: "\u{1F68B}",
      train2: "\u{1F686}",
      tram: "\u{1F68A}",
      triangular_flag_on_post: "\u{1F6A9}",
      triangular_ruler: "\u{1F4D0}",
      trident: "\u{1F531}",
      triumph: "\u{1F624}",
      trolleybus: "\u{1F68E}",
      trophy: "\u{1F3C6}",
      tropical_drink: "\u{1F379}",
      tropical_fish: "\u{1F420}",
      truck: "\u{1F69A}",
      trumpet: "\u{1F3BA}",
      tulip: "\u{1F337}",
      tumbler_glass: "\u{1F943}",
      turkey: "\u{1F983}",
      turtle: "\u{1F422}",
      tv: "\u{1F4FA}",
      twisted_rightwards_arrows: "\u{1F500}",
      two_hearts: "\u{1F495}",
      two_men_holding_hands: "\u{1F46C}",
      two_women_holding_hands: "\u{1F46D}",
      u5272: "\u{1F239}",
      u5408: "\u{1F234}",
      u55b6: "\u{1F23A}",
      u6307: "\u{1F22F}\uFE0F",
      u6708: "\u{1F237}\uFE0F",
      u6709: "\u{1F236}",
      u6e80: "\u{1F235}",
      u7121: "\u{1F21A}\uFE0F",
      u7533: "\u{1F238}",
      u7981: "\u{1F232}",
      u7a7a: "\u{1F233}",
      umbrella: "\u2614\uFE0F",
      unamused: "\u{1F612}",
      underage: "\u{1F51E}",
      unicorn: "\u{1F984}",
      unlock: "\u{1F513}",
      up: "\u{1F199}",
      upside_down_face: "\u{1F643}",
      v: "\u270C\uFE0F",
      vertical_traffic_light: "\u{1F6A6}",
      vhs: "\u{1F4FC}",
      vibration_mode: "\u{1F4F3}",
      video_camera: "\u{1F4F9}",
      video_game: "\u{1F3AE}",
      violin: "\u{1F3BB}",
      virgo: "\u264D\uFE0F",
      volcano: "\u{1F30B}",
      volleyball: "\u{1F3D0}",
      vs: "\u{1F19A}",
      vulcan_salute: "\u{1F596}",
      walking_man: "\u{1F6B6}",
      walking_woman: "\u{1F6B6}&zwj;\u2640\uFE0F",
      waning_crescent_moon: "\u{1F318}",
      waning_gibbous_moon: "\u{1F316}",
      warning: "\u26A0\uFE0F",
      wastebasket: "\u{1F5D1}",
      watch: "\u231A\uFE0F",
      water_buffalo: "\u{1F403}",
      watermelon: "\u{1F349}",
      wave: "\u{1F44B}",
      wavy_dash: "\u3030\uFE0F",
      waxing_crescent_moon: "\u{1F312}",
      wc: "\u{1F6BE}",
      weary: "\u{1F629}",
      wedding: "\u{1F492}",
      weight_lifting_man: "\u{1F3CB}\uFE0F",
      weight_lifting_woman: "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F",
      whale: "\u{1F433}",
      whale2: "\u{1F40B}",
      wheel_of_dharma: "\u2638\uFE0F",
      wheelchair: "\u267F\uFE0F",
      white_check_mark: "\u2705",
      white_circle: "\u26AA\uFE0F",
      white_flag: "\u{1F3F3}\uFE0F",
      white_flower: "\u{1F4AE}",
      white_large_square: "\u2B1C\uFE0F",
      white_medium_small_square: "\u25FD\uFE0F",
      white_medium_square: "\u25FB\uFE0F",
      white_small_square: "\u25AB\uFE0F",
      white_square_button: "\u{1F533}",
      wilted_flower: "\u{1F940}",
      wind_chime: "\u{1F390}",
      wind_face: "\u{1F32C}",
      wine_glass: "\u{1F377}",
      wink: "\u{1F609}",
      wolf: "\u{1F43A}",
      woman: "\u{1F469}",
      woman_artist: "\u{1F469}&zwj;\u{1F3A8}",
      woman_astronaut: "\u{1F469}&zwj;\u{1F680}",
      woman_cartwheeling: "\u{1F938}&zwj;\u2640\uFE0F",
      woman_cook: "\u{1F469}&zwj;\u{1F373}",
      woman_facepalming: "\u{1F926}&zwj;\u2640\uFE0F",
      woman_factory_worker: "\u{1F469}&zwj;\u{1F3ED}",
      woman_farmer: "\u{1F469}&zwj;\u{1F33E}",
      woman_firefighter: "\u{1F469}&zwj;\u{1F692}",
      woman_health_worker: "\u{1F469}&zwj;\u2695\uFE0F",
      woman_judge: "\u{1F469}&zwj;\u2696\uFE0F",
      woman_juggling: "\u{1F939}&zwj;\u2640\uFE0F",
      woman_mechanic: "\u{1F469}&zwj;\u{1F527}",
      woman_office_worker: "\u{1F469}&zwj;\u{1F4BC}",
      woman_pilot: "\u{1F469}&zwj;\u2708\uFE0F",
      woman_playing_handball: "\u{1F93E}&zwj;\u2640\uFE0F",
      woman_playing_water_polo: "\u{1F93D}&zwj;\u2640\uFE0F",
      woman_scientist: "\u{1F469}&zwj;\u{1F52C}",
      woman_shrugging: "\u{1F937}&zwj;\u2640\uFE0F",
      woman_singer: "\u{1F469}&zwj;\u{1F3A4}",
      woman_student: "\u{1F469}&zwj;\u{1F393}",
      woman_teacher: "\u{1F469}&zwj;\u{1F3EB}",
      woman_technologist: "\u{1F469}&zwj;\u{1F4BB}",
      woman_with_turban: "\u{1F473}&zwj;\u2640\uFE0F",
      womans_clothes: "\u{1F45A}",
      womans_hat: "\u{1F452}",
      women_wrestling: "\u{1F93C}&zwj;\u2640\uFE0F",
      womens: "\u{1F6BA}",
      world_map: "\u{1F5FA}",
      worried: "\u{1F61F}",
      wrench: "\u{1F527}",
      writing_hand: "\u270D\uFE0F",
      x: "\u274C",
      yellow_heart: "\u{1F49B}",
      yen: "\u{1F4B4}",
      yin_yang: "\u262F\uFE0F",
      yum: "\u{1F60B}",
      zap: "\u26A1\uFE0F",
      zipper_mouth_face: "\u{1F910}",
      zzz: "\u{1F4A4}",
      /* special emojis :P */
      octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">',
      showdown: `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>`
    }, a.Converter = function(t) {
      var u2 = {}, s = [], i2 = [], c = {}, m = y, h2 = {
        parsed: {},
        raw: "",
        format: ""
      };
      C();
      function C() {
        t = t || {};
        for (var _2 in p)
          p.hasOwnProperty(_2) && (u2[_2] = p[_2]);
        if (typeof t == "object")
          for (var q in t)
            t.hasOwnProperty(q) && (u2[q] = t[q]);
        else
          throw Error("Converter expects the passed parameter to be an object, but " + typeof t + " was passed instead.");
        u2.extensions && a.helper.forEach(u2.extensions, U);
      }
      function U(_2, q) {
        if (q = q || null, a.helper.isString(_2))
          if (_2 = a.helper.stdExtName(_2), q = _2, a.extensions[_2]) {
            console.warn("DEPRECATION WARNING: " + _2 + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), H(a.extensions[_2], _2);
            return;
          } else if (!a.helper.isUndefined(o2[_2]))
            _2 = o2[_2];
          else
            throw Error('Extension "' + _2 + '" could not be loaded. It was either not found or is not a valid extension.');
        typeof _2 == "function" && (_2 = _2()), a.helper.isArray(_2) || (_2 = [_2]);
        var J = v(_2, q);
        if (!J.valid)
          throw Error(J.error);
        for (var Z = 0; Z < _2.length; ++Z) {
          switch (_2[Z].type) {
            case "lang":
              s.push(_2[Z]);
              break;
            case "output":
              i2.push(_2[Z]);
              break;
          }
          if (_2[Z].hasOwnProperty("listeners"))
            for (var B in _2[Z].listeners)
              _2[Z].listeners.hasOwnProperty(B) && V(B, _2[Z].listeners[B]);
        }
      }
      function H(_2, q) {
        typeof _2 == "function" && (_2 = _2(new a.Converter())), a.helper.isArray(_2) || (_2 = [_2]);
        var J = v(_2, q);
        if (!J.valid)
          throw Error(J.error);
        for (var Z = 0; Z < _2.length; ++Z)
          switch (_2[Z].type) {
            case "lang":
              s.push(_2[Z]);
              break;
            case "output":
              i2.push(_2[Z]);
              break;
            default:
              throw Error("Extension loader error: Type unrecognized!!!");
          }
      }
      function V(_2, q) {
        if (!a.helper.isString(_2))
          throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof _2 + " given");
        if (typeof q != "function")
          throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof q + " given");
        c.hasOwnProperty(_2) || (c[_2] = []), c[_2].push(q);
      }
      function G(_2) {
        var q = _2.match(/^\s*/)[0].length, J = new RegExp("^\\s{0," + q + "}", "gm");
        return _2.replace(J, "");
      }
      this._dispatch = function(q, J, Z, B) {
        if (c.hasOwnProperty(q))
          for (var k = 0; k < c[q].length; ++k) {
            var F = c[q][k](q, J, this, Z, B);
            F && typeof F < "u" && (J = F);
          }
        return J;
      }, this.listen = function(_2, q) {
        return V(_2, q), this;
      }, this.makeHtml = function(_2) {
        if (!_2)
          return _2;
        var q = {
          gHtmlBlocks: [],
          gHtmlMdBlocks: [],
          gHtmlSpans: [],
          gUrls: {},
          gTitles: {},
          gDimensions: {},
          gListLevel: 0,
          hashLinkCounts: {},
          langExtensions: s,
          outputModifiers: i2,
          converter: this,
          ghCodeBlocks: [],
          metadata: {
            parsed: {},
            raw: "",
            format: ""
          }
        };
        return _2 = _2.replace(/¨/g, "\xA8T"), _2 = _2.replace(/\$/g, "\xA8D"), _2 = _2.replace(/\r\n/g, `
`), _2 = _2.replace(/\r/g, `
`), _2 = _2.replace(/\u00A0/g, "&nbsp;"), u2.smartIndentationFix && (_2 = G(_2)), _2 = `

` + _2 + `

`, _2 = a.subParser("detab")(_2, u2, q), _2 = _2.replace(/^[ \t]+$/mg, ""), a.helper.forEach(s, function(J) {
          _2 = a.subParser("runExtension")(J, _2, u2, q);
        }), _2 = a.subParser("metadata")(_2, u2, q), _2 = a.subParser("hashPreCodeTags")(_2, u2, q), _2 = a.subParser("githubCodeBlocks")(_2, u2, q), _2 = a.subParser("hashHTMLBlocks")(_2, u2, q), _2 = a.subParser("hashCodeTags")(_2, u2, q), _2 = a.subParser("stripLinkDefinitions")(_2, u2, q), _2 = a.subParser("blockGamut")(_2, u2, q), _2 = a.subParser("unhashHTMLSpans")(_2, u2, q), _2 = a.subParser("unescapeSpecialChars")(_2, u2, q), _2 = _2.replace(/¨D/g, "$$"), _2 = _2.replace(/¨T/g, "\xA8"), _2 = a.subParser("completeHTMLDocument")(_2, u2, q), a.helper.forEach(i2, function(J) {
          _2 = a.subParser("runExtension")(J, _2, u2, q);
        }), h2 = q.metadata, _2;
      }, this.makeMarkdown = this.makeMd = function(_2, q) {
        if (_2 = _2.replace(/\r\n/g, `
`), _2 = _2.replace(/\r/g, `
`), _2 = _2.replace(/>[ \t]+</, ">\xA8NBSP;<"), !q)
          if (window && window.document)
            q = window.document;
          else
            throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
        var J = q.createElement("div");
        J.innerHTML = _2;
        var Z = {
          preList: l(J)
        };
        O(J);
        for (var B = J.childNodes, k = "", F = 0; F < B.length; F++)
          k += a.subParser("makeMarkdown.node")(B[F], Z);
        function O(w2) {
          for (var I = 0; I < w2.childNodes.length; ++I) {
            var K = w2.childNodes[I];
            K.nodeType === 3 ? !/\S/.test(K.nodeValue) && !/^[ ]+$/.test(K.nodeValue) ? (w2.removeChild(K), --I) : (K.nodeValue = K.nodeValue.split(`
`).join(" "), K.nodeValue = K.nodeValue.replace(/(\s)+/g, "$1")) : K.nodeType === 1 && O(K);
          }
        }
        function l(w2) {
          for (var I = w2.querySelectorAll("pre"), K = [], W = 0; W < I.length; ++W)
            if (I[W].childElementCount === 1 && I[W].firstChild.tagName.toLowerCase() === "code") {
              var re = I[W].firstChild.innerHTML.trim(), ae = I[W].firstChild.getAttribute("data-language") || "";
              if (ae === "")
                for (var fe = I[W].firstChild.className.split(" "), je = 0; je < fe.length; ++je) {
                  var xe = fe[je].match(/^language-(.+)$/);
                  if (xe !== null) {
                    ae = xe[1];
                    break;
                  }
                }
              re = a.helper.unescapeHTMLEntities(re), K.push(re), I[W].outerHTML = '<precode language="' + ae + '" precodenum="' + W.toString() + '"></precode>';
            } else
              K.push(I[W].innerHTML), I[W].innerHTML = "", I[W].setAttribute("prenum", W.toString());
          return K;
        }
        return k;
      }, this.setOption = function(_2, q) {
        u2[_2] = q;
      }, this.getOption = function(_2) {
        return u2[_2];
      }, this.getOptions = function() {
        return u2;
      }, this.addExtension = function(_2, q) {
        q = q || null, U(_2, q);
      }, this.useExtension = function(_2) {
        U(_2);
      }, this.setFlavor = function(_2) {
        if (!b.hasOwnProperty(_2))
          throw Error(_2 + " flavor was not found");
        var q = b[_2];
        m = _2;
        for (var J in q)
          q.hasOwnProperty(J) && (u2[J] = q[J]);
      }, this.getFlavor = function() {
        return m;
      }, this.removeExtension = function(_2) {
        a.helper.isArray(_2) || (_2 = [_2]);
        for (var q = 0; q < _2.length; ++q) {
          for (var J = _2[q], Z = 0; Z < s.length; ++Z)
            s[Z] === J && s.splice(Z, 1);
          for (var B = 0; B < i2.length; ++B)
            i2[B] === J && i2.splice(B, 1);
        }
      }, this.getAllExtensions = function() {
        return {
          language: s,
          output: i2
        };
      }, this.getMetadata = function(_2) {
        return _2 ? h2.raw : h2.parsed;
      }, this.getMetadataFormat = function() {
        return h2.format;
      }, this._setMetadataPair = function(_2, q) {
        h2.parsed[_2] = q;
      }, this._setMetadataFormat = function(_2) {
        h2.format = _2;
      }, this._setMetadataRaw = function(_2) {
        h2.raw = _2;
      };
    }, a.subParser("anchors", function(t, u2, s) {
      t = s.converter._dispatch("anchors.before", t, u2, s);
      var i2 = function(c, m, h2, C, U, H, V) {
        if (a.helper.isUndefined(V) && (V = ""), h2 = h2.toLowerCase(), c.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          C = "";
        else if (!C)
          if (h2 || (h2 = m.toLowerCase().replace(/ ?\n/g, " ")), C = "#" + h2, !a.helper.isUndefined(s.gUrls[h2]))
            C = s.gUrls[h2], a.helper.isUndefined(s.gTitles[h2]) || (V = s.gTitles[h2]);
          else
            return c;
        C = C.replace(a.helper.regexes.asteriskDashAndColon, a.helper.escapeCharactersCallback);
        var G = '<a href="' + C + '"';
        return V !== "" && V !== null && (V = V.replace(/"/g, "&quot;"), V = V.replace(a.helper.regexes.asteriskDashAndColon, a.helper.escapeCharactersCallback), G += ' title="' + V + '"'), u2.openLinksInNewWindow && !/^#/.test(C) && (G += ' rel="noopener noreferrer" target="\xA8E95Eblank"'), G += ">" + m + "</a>", G;
      };
      return t = t.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, i2), t = t.replace(
        /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
        i2
      ), t = t.replace(
        /\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g,
        i2
      ), t = t.replace(/\[([^\[\]]+)]()()()()()/g, i2), u2.ghMentions && (t = t.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(c, m, h2, C, U) {
        if (h2 === "\\")
          return m + C;
        if (!a.helper.isString(u2.ghMentionsLink))
          throw new Error("ghMentionsLink option must be a string");
        var H = u2.ghMentionsLink.replace(/\{u}/g, U), V = "";
        return u2.openLinksInNewWindow && (V = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), m + '<a href="' + H + '"' + V + ">" + C + "</a>";
      })), t = s.converter._dispatch("anchors.after", t, u2, s), t;
    });
    var z = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, L = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, R = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, j = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, T = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, $ = function(t) {
      return function(u2, s, i2, c, m, h2, C) {
        i2 = i2.replace(a.helper.regexes.asteriskDashAndColon, a.helper.escapeCharactersCallback);
        var U = i2, H = "", V = "", G = s || "", _2 = C || "";
        return /^www\./i.test(i2) && (i2 = i2.replace(/^www\./i, "http://www.")), t.excludeTrailingPunctuationFromURLs && h2 && (H = h2), t.openLinksInNewWindow && (V = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), G + '<a href="' + i2 + '"' + V + ">" + U + "</a>" + H + _2;
      };
    }, N2 = function(t, u2) {
      return function(s, i2, c) {
        var m = "mailto:";
        return i2 = i2 || "", c = a.subParser("unescapeSpecialChars")(c, t, u2), t.encodeEmails ? (m = a.helper.encodeEmailAddress(m + c), c = a.helper.encodeEmailAddress(c)) : m = m + c, i2 + '<a href="' + m + '">' + c + "</a>";
      };
    };
    a.subParser("autoLinks", function(t, u2, s) {
      return t = s.converter._dispatch("autoLinks.before", t, u2, s), t = t.replace(R, $(u2)), t = t.replace(T, N2(u2, s)), t = s.converter._dispatch("autoLinks.after", t, u2, s), t;
    }), a.subParser("simplifiedAutoLinks", function(t, u2, s) {
      return u2.simplifiedAutoLink && (t = s.converter._dispatch("simplifiedAutoLinks.before", t, u2, s), u2.excludeTrailingPunctuationFromURLs ? t = t.replace(L, $(u2)) : t = t.replace(z, $(u2)), t = t.replace(j, N2(u2, s)), t = s.converter._dispatch("simplifiedAutoLinks.after", t, u2, s)), t;
    }), a.subParser("blockGamut", function(t, u2, s) {
      return t = s.converter._dispatch("blockGamut.before", t, u2, s), t = a.subParser("blockQuotes")(t, u2, s), t = a.subParser("headers")(t, u2, s), t = a.subParser("horizontalRule")(t, u2, s), t = a.subParser("lists")(t, u2, s), t = a.subParser("codeBlocks")(t, u2, s), t = a.subParser("tables")(t, u2, s), t = a.subParser("hashHTMLBlocks")(t, u2, s), t = a.subParser("paragraphs")(t, u2, s), t = s.converter._dispatch("blockGamut.after", t, u2, s), t;
    }), a.subParser("blockQuotes", function(t, u2, s) {
      t = s.converter._dispatch("blockQuotes.before", t, u2, s), t = t + `

`;
      var i2 = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
      return u2.splitAdjacentBlockquotes && (i2 = /^ {0,3}>[\s\S]*?(?:\n\n)/gm), t = t.replace(i2, function(c) {
        return c = c.replace(/^[ \t]*>[ \t]?/gm, ""), c = c.replace(/¨0/g, ""), c = c.replace(/^[ \t]+$/gm, ""), c = a.subParser("githubCodeBlocks")(c, u2, s), c = a.subParser("blockGamut")(c, u2, s), c = c.replace(/(^|\n)/g, "$1  "), c = c.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(m, h2) {
          var C = h2;
          return C = C.replace(/^  /mg, "\xA80"), C = C.replace(/¨0/g, ""), C;
        }), a.subParser("hashBlock")(`<blockquote>
` + c + `
</blockquote>`, u2, s);
      }), t = s.converter._dispatch("blockQuotes.after", t, u2, s), t;
    }), a.subParser("codeBlocks", function(t, u2, s) {
      t = s.converter._dispatch("codeBlocks.before", t, u2, s), t += "\xA80";
      var i2 = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
      return t = t.replace(i2, function(c, m, h2) {
        var C = m, U = h2, H = `
`;
        return C = a.subParser("outdent")(C, u2, s), C = a.subParser("encodeCode")(C, u2, s), C = a.subParser("detab")(C, u2, s), C = C.replace(/^\n+/g, ""), C = C.replace(/\n+$/g, ""), u2.omitExtraWLInCodeBlocks && (H = ""), C = "<pre><code>" + C + H + "</code></pre>", a.subParser("hashBlock")(C, u2, s) + U;
      }), t = t.replace(/¨0/, ""), t = s.converter._dispatch("codeBlocks.after", t, u2, s), t;
    }), a.subParser("codeSpans", function(t, u2, s) {
      return t = s.converter._dispatch("codeSpans.before", t, u2, s), typeof t > "u" && (t = ""), t = t.replace(
        /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
        function(i2, c, m, h2) {
          var C = h2;
          return C = C.replace(/^([ \t]*)/g, ""), C = C.replace(/[ \t]*$/g, ""), C = a.subParser("encodeCode")(C, u2, s), C = c + "<code>" + C + "</code>", C = a.subParser("hashHTMLSpans")(C, u2, s), C;
        }
      ), t = s.converter._dispatch("codeSpans.after", t, u2, s), t;
    }), a.subParser("completeHTMLDocument", function(t, u2, s) {
      if (!u2.completeHTMLDocument)
        return t;
      t = s.converter._dispatch("completeHTMLDocument.before", t, u2, s);
      var i2 = "html", c = `<!DOCTYPE HTML>
`, m = "", h2 = `<meta charset="utf-8">
`, C = "", U = "";
      typeof s.metadata.parsed.doctype < "u" && (c = "<!DOCTYPE " + s.metadata.parsed.doctype + `>
`, i2 = s.metadata.parsed.doctype.toString().toLowerCase(), (i2 === "html" || i2 === "html5") && (h2 = '<meta charset="utf-8">'));
      for (var H in s.metadata.parsed)
        if (s.metadata.parsed.hasOwnProperty(H))
          switch (H.toLowerCase()) {
            case "doctype":
              break;
            case "title":
              m = "<title>" + s.metadata.parsed.title + `</title>
`;
              break;
            case "charset":
              i2 === "html" || i2 === "html5" ? h2 = '<meta charset="' + s.metadata.parsed.charset + `">
` : h2 = '<meta name="charset" content="' + s.metadata.parsed.charset + `">
`;
              break;
            case "language":
            case "lang":
              C = ' lang="' + s.metadata.parsed[H] + '"', U += '<meta name="' + H + '" content="' + s.metadata.parsed[H] + `">
`;
              break;
            default:
              U += '<meta name="' + H + '" content="' + s.metadata.parsed[H] + `">
`;
          }
      return t = c + "<html" + C + `>
<head>
` + m + h2 + U + `</head>
<body>
` + t.trim() + `
</body>
</html>`, t = s.converter._dispatch("completeHTMLDocument.after", t, u2, s), t;
    }), a.subParser("detab", function(t, u2, s) {
      return t = s.converter._dispatch("detab.before", t, u2, s), t = t.replace(/\t(?=\t)/g, "    "), t = t.replace(/\t/g, "\xA8A\xA8B"), t = t.replace(/¨B(.+?)¨A/g, function(i2, c) {
        for (var m = c, h2 = 4 - m.length % 4, C = 0; C < h2; C++)
          m += " ";
        return m;
      }), t = t.replace(/¨A/g, "    "), t = t.replace(/¨B/g, ""), t = s.converter._dispatch("detab.after", t, u2, s), t;
    }), a.subParser("ellipsis", function(t, u2, s) {
      return u2.ellipsis && (t = s.converter._dispatch("ellipsis.before", t, u2, s), t = t.replace(/\.\.\./g, "\u2026"), t = s.converter._dispatch("ellipsis.after", t, u2, s)), t;
    }), a.subParser("emoji", function(t, u2, s) {
      if (!u2.emoji)
        return t;
      t = s.converter._dispatch("emoji.before", t, u2, s);
      var i2 = /:([\S]+?):/g;
      return t = t.replace(i2, function(c, m) {
        return a.helper.emojis.hasOwnProperty(m) ? a.helper.emojis[m] : c;
      }), t = s.converter._dispatch("emoji.after", t, u2, s), t;
    }), a.subParser("encodeAmpsAndAngles", function(t, u2, s) {
      return t = s.converter._dispatch("encodeAmpsAndAngles.before", t, u2, s), t = t.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), t = t.replace(/<(?![a-z\/?$!])/gi, "&lt;"), t = t.replace(/</g, "&lt;"), t = t.replace(/>/g, "&gt;"), t = s.converter._dispatch("encodeAmpsAndAngles.after", t, u2, s), t;
    }), a.subParser("encodeBackslashEscapes", function(t, u2, s) {
      return t = s.converter._dispatch("encodeBackslashEscapes.before", t, u2, s), t = t.replace(/\\(\\)/g, a.helper.escapeCharactersCallback), t = t.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, a.helper.escapeCharactersCallback), t = s.converter._dispatch("encodeBackslashEscapes.after", t, u2, s), t;
    }), a.subParser("encodeCode", function(t, u2, s) {
      return t = s.converter._dispatch("encodeCode.before", t, u2, s), t = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, a.helper.escapeCharactersCallback), t = s.converter._dispatch("encodeCode.after", t, u2, s), t;
    }), a.subParser("escapeSpecialCharsWithinTagAttributes", function(t, u2, s) {
      t = s.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", t, u2, s);
      var i2 = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, c = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
      return t = t.replace(i2, function(m) {
        return m.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, a.helper.escapeCharactersCallback);
      }), t = t.replace(c, function(m) {
        return m.replace(/([\\`*_~=|])/g, a.helper.escapeCharactersCallback);
      }), t = s.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", t, u2, s), t;
    }), a.subParser("githubCodeBlocks", function(t, u2, s) {
      return u2.ghCodeBlocks ? (t = s.converter._dispatch("githubCodeBlocks.before", t, u2, s), t += "\xA80", t = t.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(i2, c, m, h2) {
        var C = u2.omitExtraWLInCodeBlocks ? "" : `
`;
        return h2 = a.subParser("encodeCode")(h2, u2, s), h2 = a.subParser("detab")(h2, u2, s), h2 = h2.replace(/^\n+/g, ""), h2 = h2.replace(/\n+$/g, ""), h2 = "<pre><code" + (m ? ' class="' + m + " language-" + m + '"' : "") + ">" + h2 + C + "</code></pre>", h2 = a.subParser("hashBlock")(h2, u2, s), `

\xA8G` + (s.ghCodeBlocks.push({ text: i2, codeblock: h2 }) - 1) + `G

`;
      }), t = t.replace(/¨0/, ""), s.converter._dispatch("githubCodeBlocks.after", t, u2, s)) : t;
    }), a.subParser("hashBlock", function(t, u2, s) {
      return t = s.converter._dispatch("hashBlock.before", t, u2, s), t = t.replace(/(^\n+|\n+$)/g, ""), t = `

\xA8K` + (s.gHtmlBlocks.push(t) - 1) + `K

`, t = s.converter._dispatch("hashBlock.after", t, u2, s), t;
    }), a.subParser("hashCodeTags", function(t, u2, s) {
      t = s.converter._dispatch("hashCodeTags.before", t, u2, s);
      var i2 = function(c, m, h2, C) {
        var U = h2 + a.subParser("encodeCode")(m, u2, s) + C;
        return "\xA8C" + (s.gHtmlSpans.push(U) - 1) + "C";
      };
      return t = a.helper.replaceRecursiveRegExp(t, i2, "<code\\b[^>]*>", "</code>", "gim"), t = s.converter._dispatch("hashCodeTags.after", t, u2, s), t;
    }), a.subParser("hashElement", function(t, u2, s) {
      return function(i2, c) {
        var m = c;
        return m = m.replace(/\n\n/g, `
`), m = m.replace(/^\n/, ""), m = m.replace(/\n+$/g, ""), m = `

\xA8K` + (s.gHtmlBlocks.push(m) - 1) + `K

`, m;
      };
    }), a.subParser("hashHTMLBlocks", function(t, u2, s) {
      t = s.converter._dispatch("hashHTMLBlocks.before", t, u2, s);
      var i2 = [
        "pre",
        "div",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "table",
        "dl",
        "ol",
        "ul",
        "script",
        "noscript",
        "form",
        "fieldset",
        "iframe",
        "math",
        "style",
        "section",
        "header",
        "footer",
        "nav",
        "article",
        "aside",
        "address",
        "audio",
        "canvas",
        "figure",
        "hgroup",
        "output",
        "video",
        "p"
      ], c = function(_2, q, J, Z) {
        var B = _2;
        return J.search(/\bmarkdown\b/) !== -1 && (B = J + s.converter.makeHtml(q) + Z), `

\xA8K` + (s.gHtmlBlocks.push(B) - 1) + `K

`;
      };
      u2.backslashEscapesHTMLTags && (t = t.replace(/\\<(\/?[^>]+?)>/g, function(_2, q) {
        return "&lt;" + q + "&gt;";
      }));
      for (var m = 0; m < i2.length; ++m)
        for (var h2, C = new RegExp("^ {0,3}(<" + i2[m] + "\\b[^>]*>)", "im"), U = "<" + i2[m] + "\\b[^>]*>", H = "</" + i2[m] + ">"; (h2 = a.helper.regexIndexOf(t, C)) !== -1; ) {
          var V = a.helper.splitAtIndex(t, h2), G = a.helper.replaceRecursiveRegExp(V[1], c, U, H, "im");
          if (G === V[1])
            break;
          t = V[0].concat(G);
        }
      return t = t.replace(
        /(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,
        a.subParser("hashElement")(t, u2, s)
      ), t = a.helper.replaceRecursiveRegExp(t, function(_2) {
        return `

\xA8K` + (s.gHtmlBlocks.push(_2) - 1) + `K

`;
      }, "^ {0,3}<!--", "-->", "gm"), t = t.replace(
        /(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,
        a.subParser("hashElement")(t, u2, s)
      ), t = s.converter._dispatch("hashHTMLBlocks.after", t, u2, s), t;
    }), a.subParser("hashHTMLSpans", function(t, u2, s) {
      t = s.converter._dispatch("hashHTMLSpans.before", t, u2, s);
      function i2(c) {
        return "\xA8C" + (s.gHtmlSpans.push(c) - 1) + "C";
      }
      return t = t.replace(/<[^>]+?\/>/gi, function(c) {
        return i2(c);
      }), t = t.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(c) {
        return i2(c);
      }), t = t.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(c) {
        return i2(c);
      }), t = t.replace(/<[^>]+?>/gi, function(c) {
        return i2(c);
      }), t = s.converter._dispatch("hashHTMLSpans.after", t, u2, s), t;
    }), a.subParser("unhashHTMLSpans", function(t, u2, s) {
      t = s.converter._dispatch("unhashHTMLSpans.before", t, u2, s);
      for (var i2 = 0; i2 < s.gHtmlSpans.length; ++i2) {
        for (var c = s.gHtmlSpans[i2], m = 0; /¨C(\d+)C/.test(c); ) {
          var h2 = RegExp.$1;
          if (c = c.replace("\xA8C" + h2 + "C", s.gHtmlSpans[h2]), m === 10) {
            console.error("maximum nesting of 10 spans reached!!!");
            break;
          }
          ++m;
        }
        t = t.replace("\xA8C" + i2 + "C", c);
      }
      return t = s.converter._dispatch("unhashHTMLSpans.after", t, u2, s), t;
    }), a.subParser("hashPreCodeTags", function(t, u2, s) {
      t = s.converter._dispatch("hashPreCodeTags.before", t, u2, s);
      var i2 = function(c, m, h2, C) {
        var U = h2 + a.subParser("encodeCode")(m, u2, s) + C;
        return `

\xA8G` + (s.ghCodeBlocks.push({ text: c, codeblock: U }) - 1) + `G

`;
      };
      return t = a.helper.replaceRecursiveRegExp(t, i2, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim"), t = s.converter._dispatch("hashPreCodeTags.after", t, u2, s), t;
    }), a.subParser("headers", function(t, u2, s) {
      t = s.converter._dispatch("headers.before", t, u2, s);
      var i2 = isNaN(parseInt(u2.headerLevelStart)) ? 1 : parseInt(u2.headerLevelStart), c = u2.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, m = u2.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      t = t.replace(c, function(U, H) {
        var V = a.subParser("spanGamut")(H, u2, s), G = u2.noHeaderId ? "" : ' id="' + C(H) + '"', _2 = i2, q = "<h" + _2 + G + ">" + V + "</h" + _2 + ">";
        return a.subParser("hashBlock")(q, u2, s);
      }), t = t.replace(m, function(U, H) {
        var V = a.subParser("spanGamut")(H, u2, s), G = u2.noHeaderId ? "" : ' id="' + C(H) + '"', _2 = i2 + 1, q = "<h" + _2 + G + ">" + V + "</h" + _2 + ">";
        return a.subParser("hashBlock")(q, u2, s);
      });
      var h2 = u2.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
      t = t.replace(h2, function(U, H, V) {
        var G = V;
        u2.customizedHeaderId && (G = V.replace(/\s?\{([^{]+?)}\s*$/, ""));
        var _2 = a.subParser("spanGamut")(G, u2, s), q = u2.noHeaderId ? "" : ' id="' + C(V) + '"', J = i2 - 1 + H.length, Z = "<h" + J + q + ">" + _2 + "</h" + J + ">";
        return a.subParser("hashBlock")(Z, u2, s);
      });
      function C(U) {
        var H, V;
        if (u2.customizedHeaderId) {
          var G = U.match(/\{([^{]+?)}\s*$/);
          G && G[1] && (U = G[1]);
        }
        return H = U, a.helper.isString(u2.prefixHeaderId) ? V = u2.prefixHeaderId : u2.prefixHeaderId === true ? V = "section-" : V = "", u2.rawPrefixHeaderId || (H = V + H), u2.ghCompatibleHeaderId ? H = H.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase() : u2.rawHeaderId ? H = H.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase() : H = H.replace(/[^\w]/g, "").toLowerCase(), u2.rawPrefixHeaderId && (H = V + H), s.hashLinkCounts[H] ? H = H + "-" + s.hashLinkCounts[H]++ : s.hashLinkCounts[H] = 1, H;
      }
      return t = s.converter._dispatch("headers.after", t, u2, s), t;
    }), a.subParser("horizontalRule", function(t, u2, s) {
      t = s.converter._dispatch("horizontalRule.before", t, u2, s);
      var i2 = a.subParser("hashBlock")("<hr />", u2, s);
      return t = t.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, i2), t = t.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, i2), t = t.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, i2), t = s.converter._dispatch("horizontalRule.after", t, u2, s), t;
    }), a.subParser("images", function(t, u2, s) {
      t = s.converter._dispatch("images.before", t, u2, s);
      var i2 = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, c = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, m = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, h2 = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, C = /!\[([^\[\]]+)]()()()()()/g;
      function U(V, G, _2, q, J, Z, B, k) {
        return q = q.replace(/\s/g, ""), H(V, G, _2, q, J, Z, B, k);
      }
      function H(V, G, _2, q, J, Z, B, k) {
        var F = s.gUrls, O = s.gTitles, l = s.gDimensions;
        if (_2 = _2.toLowerCase(), k || (k = ""), V.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          q = "";
        else if (q === "" || q === null)
          if ((_2 === "" || _2 === null) && (_2 = G.toLowerCase().replace(/ ?\n/g, " ")), q = "#" + _2, !a.helper.isUndefined(F[_2]))
            q = F[_2], a.helper.isUndefined(O[_2]) || (k = O[_2]), a.helper.isUndefined(l[_2]) || (J = l[_2].width, Z = l[_2].height);
          else
            return V;
        G = G.replace(/"/g, "&quot;").replace(a.helper.regexes.asteriskDashAndColon, a.helper.escapeCharactersCallback), q = q.replace(a.helper.regexes.asteriskDashAndColon, a.helper.escapeCharactersCallback);
        var w2 = '<img src="' + q + '" alt="' + G + '"';
        return k && a.helper.isString(k) && (k = k.replace(/"/g, "&quot;").replace(a.helper.regexes.asteriskDashAndColon, a.helper.escapeCharactersCallback), w2 += ' title="' + k + '"'), J && Z && (J = J === "*" ? "auto" : J, Z = Z === "*" ? "auto" : Z, w2 += ' width="' + J + '"', w2 += ' height="' + Z + '"'), w2 += " />", w2;
      }
      return t = t.replace(h2, H), t = t.replace(m, U), t = t.replace(c, H), t = t.replace(i2, H), t = t.replace(C, H), t = s.converter._dispatch("images.after", t, u2, s), t;
    }), a.subParser("italicsAndBold", function(t, u2, s) {
      t = s.converter._dispatch("italicsAndBold.before", t, u2, s);
      function i2(c, m, h2) {
        return m + c + h2;
      }
      return u2.literalMidWordUnderscores ? (t = t.replace(/\b___(\S[\s\S]*?)___\b/g, function(c, m) {
        return i2(m, "<strong><em>", "</em></strong>");
      }), t = t.replace(/\b__(\S[\s\S]*?)__\b/g, function(c, m) {
        return i2(m, "<strong>", "</strong>");
      }), t = t.replace(/\b_(\S[\s\S]*?)_\b/g, function(c, m) {
        return i2(m, "<em>", "</em>");
      })) : (t = t.replace(/___(\S[\s\S]*?)___/g, function(c, m) {
        return /\S$/.test(m) ? i2(m, "<strong><em>", "</em></strong>") : c;
      }), t = t.replace(/__(\S[\s\S]*?)__/g, function(c, m) {
        return /\S$/.test(m) ? i2(m, "<strong>", "</strong>") : c;
      }), t = t.replace(/_([^\s_][\s\S]*?)_/g, function(c, m) {
        return /\S$/.test(m) ? i2(m, "<em>", "</em>") : c;
      })), u2.literalMidWordAsterisks ? (t = t.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(c, m, h2) {
        return i2(h2, m + "<strong><em>", "</em></strong>");
      }), t = t.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(c, m, h2) {
        return i2(h2, m + "<strong>", "</strong>");
      }), t = t.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(c, m, h2) {
        return i2(h2, m + "<em>", "</em>");
      })) : (t = t.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(c, m) {
        return /\S$/.test(m) ? i2(m, "<strong><em>", "</em></strong>") : c;
      }), t = t.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(c, m) {
        return /\S$/.test(m) ? i2(m, "<strong>", "</strong>") : c;
      }), t = t.replace(/\*([^\s*][\s\S]*?)\*/g, function(c, m) {
        return /\S$/.test(m) ? i2(m, "<em>", "</em>") : c;
      })), t = s.converter._dispatch("italicsAndBold.after", t, u2, s), t;
    }), a.subParser("lists", function(t, u2, s) {
      function i2(h2, C) {
        s.gListLevel++, h2 = h2.replace(/\n{2,}$/, `
`), h2 += "\xA80";
        var U = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, H = /\n[ \t]*\n(?!¨0)/.test(h2);
        return u2.disableForced4SpacesIndentedSublists && (U = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm), h2 = h2.replace(U, function(V, G, _2, q, J, Z, B) {
          B = B && B.trim() !== "";
          var k = a.subParser("outdent")(J, u2, s), F = "";
          return Z && u2.tasklists && (F = ' class="task-list-item" style="list-style-type: none;"', k = k.replace(/^[ \t]*\[(x|X| )?]/m, function() {
            var O = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
            return B && (O += " checked"), O += ">", O;
          })), k = k.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(O) {
            return "\xA8A" + O;
          }), G || k.search(/\n{2,}/) > -1 ? (k = a.subParser("githubCodeBlocks")(k, u2, s), k = a.subParser("blockGamut")(k, u2, s)) : (k = a.subParser("lists")(k, u2, s), k = k.replace(/\n$/, ""), k = a.subParser("hashHTMLBlocks")(k, u2, s), k = k.replace(/\n\n+/g, `

`), H ? k = a.subParser("paragraphs")(k, u2, s) : k = a.subParser("spanGamut")(k, u2, s)), k = k.replace("\xA8A", ""), k = "<li" + F + ">" + k + `</li>
`, k;
        }), h2 = h2.replace(/¨0/g, ""), s.gListLevel--, C && (h2 = h2.replace(/\s+$/, "")), h2;
      }
      function c(h2, C) {
        if (C === "ol") {
          var U = h2.match(/^ *(\d+)\./);
          if (U && U[1] !== "1")
            return ' start="' + U[1] + '"';
        }
        return "";
      }
      function m(h2, C, U) {
        var H = u2.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, V = u2.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, G = C === "ul" ? H : V, _2 = "";
        if (h2.search(G) !== -1)
          (function J(Z) {
            var B = Z.search(G), k = c(h2, C);
            B !== -1 ? (_2 += `

<` + C + k + `>
` + i2(Z.slice(0, B), !!U) + "</" + C + `>
`, C = C === "ul" ? "ol" : "ul", G = C === "ul" ? H : V, J(Z.slice(B))) : _2 += `

<` + C + k + `>
` + i2(Z, !!U) + "</" + C + `>
`;
          })(h2);
        else {
          var q = c(h2, C);
          _2 = `

<` + C + q + `>
` + i2(h2, !!U) + "</" + C + `>
`;
        }
        return _2;
      }
      return t = s.converter._dispatch("lists.before", t, u2, s), t += "\xA80", s.gListLevel ? t = t.replace(
        /^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
        function(h2, C, U) {
          var H = U.search(/[*+-]/g) > -1 ? "ul" : "ol";
          return m(C, H, true);
        }
      ) : t = t.replace(
        /(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
        function(h2, C, U, H) {
          var V = H.search(/[*+-]/g) > -1 ? "ul" : "ol";
          return m(U, V, false);
        }
      ), t = t.replace(/¨0/, ""), t = s.converter._dispatch("lists.after", t, u2, s), t;
    }), a.subParser("metadata", function(t, u2, s) {
      if (!u2.metadata)
        return t;
      t = s.converter._dispatch("metadata.before", t, u2, s);
      function i2(c) {
        s.metadata.raw = c, c = c.replace(/&/g, "&amp;").replace(/"/g, "&quot;"), c = c.replace(/\n {4}/g, " "), c.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(m, h2, C) {
          return s.metadata.parsed[h2] = C, "";
        });
      }
      return t = t.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(c, m, h2) {
        return i2(h2), "\xA8M";
      }), t = t.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(c, m, h2) {
        return m && (s.metadata.format = m), i2(h2), "\xA8M";
      }), t = t.replace(/¨M/g, ""), t = s.converter._dispatch("metadata.after", t, u2, s), t;
    }), a.subParser("outdent", function(t, u2, s) {
      return t = s.converter._dispatch("outdent.before", t, u2, s), t = t.replace(/^(\t|[ ]{1,4})/gm, "\xA80"), t = t.replace(/¨0/g, ""), t = s.converter._dispatch("outdent.after", t, u2, s), t;
    }), a.subParser("paragraphs", function(t, u2, s) {
      t = s.converter._dispatch("paragraphs.before", t, u2, s), t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, "");
      for (var i2 = t.split(/\n{2,}/g), c = [], m = i2.length, h2 = 0; h2 < m; h2++) {
        var C = i2[h2];
        C.search(/¨(K|G)(\d+)\1/g) >= 0 ? c.push(C) : C.search(/\S/) >= 0 && (C = a.subParser("spanGamut")(C, u2, s), C = C.replace(/^([ \t]*)/g, "<p>"), C += "</p>", c.push(C));
      }
      for (m = c.length, h2 = 0; h2 < m; h2++) {
        for (var U = "", H = c[h2], V = false; /¨(K|G)(\d+)\1/.test(H); ) {
          var G = RegExp.$1, _2 = RegExp.$2;
          G === "K" ? U = s.gHtmlBlocks[_2] : V ? U = a.subParser("encodeCode")(s.ghCodeBlocks[_2].text, u2, s) : U = s.ghCodeBlocks[_2].codeblock, U = U.replace(/\$/g, "$$$$"), H = H.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, U), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(H) && (V = true);
        }
        c[h2] = H;
      }
      return t = c.join(`
`), t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, ""), s.converter._dispatch("paragraphs.after", t, u2, s);
    }), a.subParser("runExtension", function(t, u2, s, i2) {
      if (t.filter)
        u2 = t.filter(u2, i2.converter, s);
      else if (t.regex) {
        var c = t.regex;
        c instanceof RegExp || (c = new RegExp(c, "g")), u2 = u2.replace(c, t.replace);
      }
      return u2;
    }), a.subParser("spanGamut", function(t, u2, s) {
      return t = s.converter._dispatch("spanGamut.before", t, u2, s), t = a.subParser("codeSpans")(t, u2, s), t = a.subParser("escapeSpecialCharsWithinTagAttributes")(t, u2, s), t = a.subParser("encodeBackslashEscapes")(t, u2, s), t = a.subParser("images")(t, u2, s), t = a.subParser("anchors")(t, u2, s), t = a.subParser("autoLinks")(t, u2, s), t = a.subParser("simplifiedAutoLinks")(t, u2, s), t = a.subParser("emoji")(t, u2, s), t = a.subParser("underline")(t, u2, s), t = a.subParser("italicsAndBold")(t, u2, s), t = a.subParser("strikethrough")(t, u2, s), t = a.subParser("ellipsis")(t, u2, s), t = a.subParser("hashHTMLSpans")(t, u2, s), t = a.subParser("encodeAmpsAndAngles")(t, u2, s), u2.simpleLineBreaks ? /\n\n¨K/.test(t) || (t = t.replace(/\n+/g, `<br />
`)) : t = t.replace(/  +\n/g, `<br />
`), t = s.converter._dispatch("spanGamut.after", t, u2, s), t;
    }), a.subParser("strikethrough", function(t, u2, s) {
      function i2(c) {
        return u2.simplifiedAutoLink && (c = a.subParser("simplifiedAutoLinks")(c, u2, s)), "<del>" + c + "</del>";
      }
      return u2.strikethrough && (t = s.converter._dispatch("strikethrough.before", t, u2, s), t = t.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(c, m) {
        return i2(m);
      }), t = s.converter._dispatch("strikethrough.after", t, u2, s)), t;
    }), a.subParser("stripLinkDefinitions", function(t, u2, s) {
      var i2 = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, c = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
      t += "\xA80";
      var m = function(h2, C, U, H, V, G, _2) {
        return C = C.toLowerCase(), t.toLowerCase().split(C).length - 1 < 2 ? h2 : (U.match(/^data:.+?\/.+?;base64,/) ? s.gUrls[C] = U.replace(/\s/g, "") : s.gUrls[C] = a.subParser("encodeAmpsAndAngles")(U, u2, s), G ? G + _2 : (_2 && (s.gTitles[C] = _2.replace(/"|'/g, "&quot;")), u2.parseImgDimensions && H && V && (s.gDimensions[C] = {
          width: H,
          height: V
        }), ""));
      };
      return t = t.replace(c, m), t = t.replace(i2, m), t = t.replace(/¨0/, ""), t;
    }), a.subParser("tables", function(t, u2, s) {
      if (!u2.tables)
        return t;
      var i2 = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, c = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
      function m(V) {
        return /^:[ \t]*--*$/.test(V) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(V) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(V) ? ' style="text-align:center;"' : "";
      }
      function h2(V, G) {
        var _2 = "";
        return V = V.trim(), (u2.tablesHeaderId || u2.tableHeaderId) && (_2 = ' id="' + V.replace(/ /g, "_").toLowerCase() + '"'), V = a.subParser("spanGamut")(V, u2, s), "<th" + _2 + G + ">" + V + `</th>
`;
      }
      function C(V, G) {
        var _2 = a.subParser("spanGamut")(V, u2, s);
        return "<td" + G + ">" + _2 + `</td>
`;
      }
      function U(V, G) {
        for (var _2 = `<table>
<thead>
<tr>
`, q = V.length, J = 0; J < q; ++J)
          _2 += V[J];
        for (_2 += `</tr>
</thead>
<tbody>
`, J = 0; J < G.length; ++J) {
          _2 += `<tr>
`;
          for (var Z = 0; Z < q; ++Z)
            _2 += G[J][Z];
          _2 += `</tr>
`;
        }
        return _2 += `</tbody>
</table>
`, _2;
      }
      function H(V) {
        var G, _2 = V.split(`
`);
        for (G = 0; G < _2.length; ++G)
          /^ {0,3}\|/.test(_2[G]) && (_2[G] = _2[G].replace(/^ {0,3}\|/, "")), /\|[ \t]*$/.test(_2[G]) && (_2[G] = _2[G].replace(/\|[ \t]*$/, "")), _2[G] = a.subParser("codeSpans")(_2[G], u2, s);
        var q = _2[0].split("|").map(function(w2) {
          return w2.trim();
        }), J = _2[1].split("|").map(function(w2) {
          return w2.trim();
        }), Z = [], B = [], k = [], F = [];
        for (_2.shift(), _2.shift(), G = 0; G < _2.length; ++G)
          _2[G].trim() !== "" && Z.push(
            _2[G].split("|").map(function(w2) {
              return w2.trim();
            })
          );
        if (q.length < J.length)
          return V;
        for (G = 0; G < J.length; ++G)
          k.push(m(J[G]));
        for (G = 0; G < q.length; ++G)
          a.helper.isUndefined(k[G]) && (k[G] = ""), B.push(h2(q[G], k[G]));
        for (G = 0; G < Z.length; ++G) {
          for (var O = [], l = 0; l < B.length; ++l)
            a.helper.isUndefined(Z[G][l]), O.push(C(Z[G][l], k[l]));
          F.push(O);
        }
        return U(B, F);
      }
      return t = s.converter._dispatch("tables.before", t, u2, s), t = t.replace(/\\(\|)/g, a.helper.escapeCharactersCallback), t = t.replace(i2, H), t = t.replace(c, H), t = s.converter._dispatch("tables.after", t, u2, s), t;
    }), a.subParser("underline", function(t, u2, s) {
      return u2.underline && (t = s.converter._dispatch("underline.before", t, u2, s), u2.literalMidWordUnderscores ? (t = t.replace(/\b___(\S[\s\S]*?)___\b/g, function(i2, c) {
        return "<u>" + c + "</u>";
      }), t = t.replace(/\b__(\S[\s\S]*?)__\b/g, function(i2, c) {
        return "<u>" + c + "</u>";
      })) : (t = t.replace(/___(\S[\s\S]*?)___/g, function(i2, c) {
        return /\S$/.test(c) ? "<u>" + c + "</u>" : i2;
      }), t = t.replace(/__(\S[\s\S]*?)__/g, function(i2, c) {
        return /\S$/.test(c) ? "<u>" + c + "</u>" : i2;
      })), t = t.replace(/(_)/g, a.helper.escapeCharactersCallback), t = s.converter._dispatch("underline.after", t, u2, s)), t;
    }), a.subParser("unescapeSpecialChars", function(t, u2, s) {
      return t = s.converter._dispatch("unescapeSpecialChars.before", t, u2, s), t = t.replace(/¨E(\d+)E/g, function(i2, c) {
        var m = parseInt(c);
        return String.fromCharCode(m);
      }), t = s.converter._dispatch("unescapeSpecialChars.after", t, u2, s), t;
    }), a.subParser("makeMarkdown.blockquote", function(t, u2) {
      var s = "";
      if (t.hasChildNodes())
        for (var i2 = t.childNodes, c = i2.length, m = 0; m < c; ++m) {
          var h2 = a.subParser("makeMarkdown.node")(i2[m], u2);
          h2 !== "" && (s += h2);
        }
      return s = s.trim(), s = "> " + s.split(`
`).join(`
> `), s;
    }), a.subParser("makeMarkdown.codeBlock", function(t, u2) {
      var s = t.getAttribute("language"), i2 = t.getAttribute("precodenum");
      return "```" + s + `
` + u2.preList[i2] + "\n```";
    }), a.subParser("makeMarkdown.codeSpan", function(t) {
      return "`" + t.innerHTML + "`";
    }), a.subParser("makeMarkdown.emphasis", function(t, u2) {
      var s = "";
      if (t.hasChildNodes()) {
        s += "*";
        for (var i2 = t.childNodes, c = i2.length, m = 0; m < c; ++m)
          s += a.subParser("makeMarkdown.node")(i2[m], u2);
        s += "*";
      }
      return s;
    }), a.subParser("makeMarkdown.header", function(t, u2, s) {
      var i2 = new Array(s + 1).join("#"), c = "";
      if (t.hasChildNodes()) {
        c = i2 + " ";
        for (var m = t.childNodes, h2 = m.length, C = 0; C < h2; ++C)
          c += a.subParser("makeMarkdown.node")(m[C], u2);
      }
      return c;
    }), a.subParser("makeMarkdown.hr", function() {
      return "---";
    }), a.subParser("makeMarkdown.image", function(t) {
      var u2 = "";
      return t.hasAttribute("src") && (u2 += "![" + t.getAttribute("alt") + "](", u2 += "<" + t.getAttribute("src") + ">", t.hasAttribute("width") && t.hasAttribute("height") && (u2 += " =" + t.getAttribute("width") + "x" + t.getAttribute("height")), t.hasAttribute("title") && (u2 += ' "' + t.getAttribute("title") + '"'), u2 += ")"), u2;
    }), a.subParser("makeMarkdown.links", function(t, u2) {
      var s = "";
      if (t.hasChildNodes() && t.hasAttribute("href")) {
        var i2 = t.childNodes, c = i2.length;
        s = "[";
        for (var m = 0; m < c; ++m)
          s += a.subParser("makeMarkdown.node")(i2[m], u2);
        s += "](", s += "<" + t.getAttribute("href") + ">", t.hasAttribute("title") && (s += ' "' + t.getAttribute("title") + '"'), s += ")";
      }
      return s;
    }), a.subParser("makeMarkdown.list", function(t, u2, s) {
      var i2 = "";
      if (!t.hasChildNodes())
        return "";
      for (var c = t.childNodes, m = c.length, h2 = t.getAttribute("start") || 1, C = 0; C < m; ++C)
        if (!(typeof c[C].tagName > "u" || c[C].tagName.toLowerCase() !== "li")) {
          var U = "";
          s === "ol" ? U = h2.toString() + ". " : U = "- ", i2 += U + a.subParser("makeMarkdown.listItem")(c[C], u2), ++h2;
        }
      return i2 += `
<!-- -->
`, i2.trim();
    }), a.subParser("makeMarkdown.listItem", function(t, u2) {
      for (var s = "", i2 = t.childNodes, c = i2.length, m = 0; m < c; ++m)
        s += a.subParser("makeMarkdown.node")(i2[m], u2);
      return /\n$/.test(s) ? s = s.split(`
`).join(`
    `).replace(/^ {4}$/gm, "").replace(/\n\n+/g, `

`) : s += `
`, s;
    }), a.subParser("makeMarkdown.node", function(t, u2, s) {
      s = s || false;
      var i2 = "";
      if (t.nodeType === 3)
        return a.subParser("makeMarkdown.txt")(t, u2);
      if (t.nodeType === 8)
        return "<!--" + t.data + `-->

`;
      if (t.nodeType !== 1)
        return "";
      var c = t.tagName.toLowerCase();
      switch (c) {
        case "h1":
          s || (i2 = a.subParser("makeMarkdown.header")(t, u2, 1) + `

`);
          break;
        case "h2":
          s || (i2 = a.subParser("makeMarkdown.header")(t, u2, 2) + `

`);
          break;
        case "h3":
          s || (i2 = a.subParser("makeMarkdown.header")(t, u2, 3) + `

`);
          break;
        case "h4":
          s || (i2 = a.subParser("makeMarkdown.header")(t, u2, 4) + `

`);
          break;
        case "h5":
          s || (i2 = a.subParser("makeMarkdown.header")(t, u2, 5) + `

`);
          break;
        case "h6":
          s || (i2 = a.subParser("makeMarkdown.header")(t, u2, 6) + `

`);
          break;
        case "p":
          s || (i2 = a.subParser("makeMarkdown.paragraph")(t, u2) + `

`);
          break;
        case "blockquote":
          s || (i2 = a.subParser("makeMarkdown.blockquote")(t, u2) + `

`);
          break;
        case "hr":
          s || (i2 = a.subParser("makeMarkdown.hr")(t, u2) + `

`);
          break;
        case "ol":
          s || (i2 = a.subParser("makeMarkdown.list")(t, u2, "ol") + `

`);
          break;
        case "ul":
          s || (i2 = a.subParser("makeMarkdown.list")(t, u2, "ul") + `

`);
          break;
        case "precode":
          s || (i2 = a.subParser("makeMarkdown.codeBlock")(t, u2) + `

`);
          break;
        case "pre":
          s || (i2 = a.subParser("makeMarkdown.pre")(t, u2) + `

`);
          break;
        case "table":
          s || (i2 = a.subParser("makeMarkdown.table")(t, u2) + `

`);
          break;
        case "code":
          i2 = a.subParser("makeMarkdown.codeSpan")(t, u2);
          break;
        case "em":
        case "i":
          i2 = a.subParser("makeMarkdown.emphasis")(t, u2);
          break;
        case "strong":
        case "b":
          i2 = a.subParser("makeMarkdown.strong")(t, u2);
          break;
        case "del":
          i2 = a.subParser("makeMarkdown.strikethrough")(t, u2);
          break;
        case "a":
          i2 = a.subParser("makeMarkdown.links")(t, u2);
          break;
        case "img":
          i2 = a.subParser("makeMarkdown.image")(t, u2);
          break;
        default:
          i2 = t.outerHTML + `

`;
      }
      return i2;
    }), a.subParser("makeMarkdown.paragraph", function(t, u2) {
      var s = "";
      if (t.hasChildNodes())
        for (var i2 = t.childNodes, c = i2.length, m = 0; m < c; ++m)
          s += a.subParser("makeMarkdown.node")(i2[m], u2);
      return s = s.trim(), s;
    }), a.subParser("makeMarkdown.pre", function(t, u2) {
      var s = t.getAttribute("prenum");
      return "<pre>" + u2.preList[s] + "</pre>";
    }), a.subParser("makeMarkdown.strikethrough", function(t, u2) {
      var s = "";
      if (t.hasChildNodes()) {
        s += "~~";
        for (var i2 = t.childNodes, c = i2.length, m = 0; m < c; ++m)
          s += a.subParser("makeMarkdown.node")(i2[m], u2);
        s += "~~";
      }
      return s;
    }), a.subParser("makeMarkdown.strong", function(t, u2) {
      var s = "";
      if (t.hasChildNodes()) {
        s += "**";
        for (var i2 = t.childNodes, c = i2.length, m = 0; m < c; ++m)
          s += a.subParser("makeMarkdown.node")(i2[m], u2);
        s += "**";
      }
      return s;
    }), a.subParser("makeMarkdown.table", function(t, u2) {
      var s = "", i2 = [[], []], c = t.querySelectorAll("thead>tr>th"), m = t.querySelectorAll("tbody>tr"), h2, C;
      for (h2 = 0; h2 < c.length; ++h2) {
        var U = a.subParser("makeMarkdown.tableCell")(c[h2], u2), H = "---";
        if (c[h2].hasAttribute("style")) {
          var V = c[h2].getAttribute("style").toLowerCase().replace(/\s/g, "");
          switch (V) {
            case "text-align:left;":
              H = ":---";
              break;
            case "text-align:right;":
              H = "---:";
              break;
            case "text-align:center;":
              H = ":---:";
              break;
          }
        }
        i2[0][h2] = U.trim(), i2[1][h2] = H;
      }
      for (h2 = 0; h2 < m.length; ++h2) {
        var G = i2.push([]) - 1, _2 = m[h2].getElementsByTagName("td");
        for (C = 0; C < c.length; ++C) {
          var q = " ";
          typeof _2[C] < "u" && (q = a.subParser("makeMarkdown.tableCell")(_2[C], u2)), i2[G].push(q);
        }
      }
      var J = 3;
      for (h2 = 0; h2 < i2.length; ++h2)
        for (C = 0; C < i2[h2].length; ++C) {
          var Z = i2[h2][C].length;
          Z > J && (J = Z);
        }
      for (h2 = 0; h2 < i2.length; ++h2) {
        for (C = 0; C < i2[h2].length; ++C)
          h2 === 1 ? i2[h2][C].slice(-1) === ":" ? i2[h2][C] = a.helper.padEnd(i2[h2][C].slice(-1), J - 1, "-") + ":" : i2[h2][C] = a.helper.padEnd(i2[h2][C], J, "-") : i2[h2][C] = a.helper.padEnd(i2[h2][C], J);
        s += "| " + i2[h2].join(" | ") + ` |
`;
      }
      return s.trim();
    }), a.subParser("makeMarkdown.tableCell", function(t, u2) {
      var s = "";
      if (!t.hasChildNodes())
        return "";
      for (var i2 = t.childNodes, c = i2.length, m = 0; m < c; ++m)
        s += a.subParser("makeMarkdown.node")(i2[m], u2, true);
      return s.trim();
    }), a.subParser("makeMarkdown.txt", function(t) {
      var u2 = t.nodeValue;
      return u2 = u2.replace(/ +/g, " "), u2 = u2.replace(/¨NBSP;/g, " "), u2 = a.helper.unescapeHTMLEntities(u2), u2 = u2.replace(/([*_~|`])/g, "\\$1"), u2 = u2.replace(/^(\s*)>/g, "\\$1>"), u2 = u2.replace(/^#/gm, "\\#"), u2 = u2.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3"), u2 = u2.replace(/^( {0,3}\d+)\./gm, "$1\\."), u2 = u2.replace(/^( {0,3})([+-])/gm, "$1\\$2"), u2 = u2.replace(/]([\s]*)\(/g, "\\]$1\\("), u2 = u2.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:"), u2;
    });
    var D2 = this;
    e2.exports ? e2.exports = a : D2.showdown = a;
  }).call(En);
})(Go);
var $n = class {
  constructor() {
    be(this, "logger");
    be(this, "converter");
    this.logger = Ma.zhiLog("showdown-adaptor"), this.converter = new Nt.Converter();
  }
  isAvailable() {
    return typeof Nt < "u";
  }
  renderMarkdownStr(r3) {
    if (!this.isAvailable())
      throw new Error("Showdown is not available");
    return this.logger.info("Showdown is rendering md to HTML..."), Promise.resolve(this.converter.makeHtml(r3));
  }
};
var cs = class {
  constructor() {
    be(this, "logger");
    be(this, "mdAdaptor", new $n());
    this.logger = Ma.zhiLog("markdown-util");
  }
  /**
   * 获取当前 MD 解析器名称
   */
  getCurrentAdaptorName() {
    return this.mdAdaptor instanceof bn ? "Lute" : this.mdAdaptor instanceof $n ? "Showdown" : "None";
  }
  /**
   * 渲染Markdown
   *
   * @param md - Markdown文本
   */
  async renderHTML(r3) {
    const n = new bn();
    return this.logger.debug("Lute status =>", n.isAvailable()), n.isAvailable() && (this.mdAdaptor = n), this.logger.info(`Using ${this.getCurrentAdaptorName()} as markdown renderer`), await this.mdAdaptor.renderMarkdownStr(r3);
  }
};
var Ko = class {
  constructor() {
    be(this, "mdUtil");
    this.mdUtil = new cs();
  }
  /**
   * 移除标题数字
   *
   * @param str - 字符串
   */
  removeTitleNumber(r3) {
    let n = r3;
    const a = /([0-9]*)\./;
    return n = n.replace(a, ""), n;
  }
  /**
   * 删除挂件的HTML
   *
   * @param str - 原字符
   */
  removeWidgetTag(r3) {
    let n = r3.toString();
    const a = /<iframe.*src="\/widgets\/publisher.*<\/iframe>/g;
    n = n.replace(a, "");
    const d = /<iframe.*src="\/widgets\/sy-post-publisher.*<\/iframe>/g;
    n = n.replace(d, "");
    const o2 = /<iframe.*\/widgets\/Note*\sAttrs.*\/iframe>/g;
    return n = n.replace(o2, ""), n;
  }
  /**
   * 删除Markdown文本的挂件的HTML
   *
   * @param str - 原字符
   */
  removeMdWidgetTag(r3) {
    let n = r3.toString();
    return n = this.removeWidgetTag(n), n;
  }
  /**
   * 去除html标签，残缺不全也可以
   *
   * @param str - 字符串
   */
  filterHtml(r3) {
    r3 = r3.replace(/<style((.|\n|\r)*?)<\/style>/g, ""), r3 = r3.replace(/<script((.|\n|\r)*?)<\/script>/g, ""), r3 = r3.replace(/<[^>]*>/g, ""), r3 = r3.replace(/&.*;/g, ""), r3 = r3.replace(/(^\s*)|(\s*$)/g, ""), r3 = r3.replace(/</g, "").replace(/>/g, ""), r3 = r3.replace(/"/g, "").replace(/'/g, ""), r3 = r3.replace(/\*/g, ""), r3 = r3.replace(/\$/g, ""), r3 = r3.replace(/\./g, ""), r3 = r3.replace(/\+/g, ""), r3 = r3.replace(/\s+/g, ""), r3 = r3.replace(/[:|：]/g, "_"), r3 = r3.replace(/[;|；]/g, "_"), r3 = r3.replace(/\^/g, "_"), r3 = r3.replace(/!/g, "_"), r3 = r3.replace(/@/g, "at_");
    const n = ["\\d*/\\d/\\d*", "[\u3001|\\\\]", "[\uFF0C|,]", "\\d", "/", "-"];
    for (let a = 0; a < n.length; a++) {
      const d = new RegExp(n[a], "g");
      r3 = r3.replace(d, "");
    }
    return r3 = r3.toLowerCase(), r3;
  }
  /**
   * 截取指定长度html
   *
   * @param html - html
   * @param length - 长度
   * @param ignore - 不要结尾省略号
   */
  parseHtml(r3, n, a) {
    const d = this.filterHtml(r3);
    return d.length < n ? d : a === true ? d.substring(0, n) : d.substring(0, n) + "...";
  }
  /**
   * 将Markdown转换为HTML
   *
   * @param md - Markdown
   */
  async mdToHtml(r3) {
    const n = await this.mdUtil.renderHTML(r3);
    return this.removeWidgetTag(n);
  }
  /**
   * 将Markdown转换为纯文本
   *
   * @param md - Markdown
   */
  async mdToPlainText(r3) {
    const n = await this.mdToHtml(r3);
    return this.filterHtml(n);
  }
  /**
   * 移除H1标签
   *
   * @param html - html
   */
  removeH1(r3) {
    let n = r3;
    const a = /<h1.*\/h1>/g;
    return n = n.replace(a, ""), n;
  }
  /**
   * 移除Markdown里面的H1标签
   *
   * JavaScript 正则表达式可以用来删除所有 Markdown 中的 h1 标签。下面是一个示例代码：
   *
   * const str = "# This is an H1\n## This is an H2\n### This is an H3";
   *
   * const regex = /^# .*$/gm;
   * const result = str.replace(regex, '');
   *
   * console.log(result);
   * 在这个例子中，我们使用正则表达式 /^# .*$/gm 来匹配所有的 h1 标签。
   * 在 JavaScript 中，^ 匹配行首，# 匹配 # 字符，.* 匹配任意字符，$ 匹配行尾，m 标记表示多行模式。
   */
  removeMdH1(r3) {
    let n = r3;
    const a = /^# .*$/gm;
    return n = n.replace(a, ""), n;
  }
};
var Wo = class {
  /**
   * 检测是否是空对象
   *
   * @param obj - 对象
   */
  isEmptyObject(r3) {
    return r3 ? Object.getPrototypeOf(r3) === Object.prototype && Object.getOwnPropertyNames(r3).length === 0 && Object.getOwnPropertySymbols(r3).length === 0 : true;
  }
};
var Jo = class {
  constructor() {
    be(this, "dateUtil");
    be(this, "strUtil");
    be(this, "versionUtil");
    be(this, "htmlUtil");
    be(this, "markdownUtil");
    be(this, "jsonUtil");
    be(this, "objectUtil");
    this.dateUtil = new yo(), this.strUtil = new wo(), this.versionUtil = new ko(), this.htmlUtil = new Ko(), this.markdownUtil = new cs(), this.jsonUtil = new vo(), this.objectUtil = new Wo();
  }
};
var Zo = Jo;

// ../zhi-env/dist/index.js
var _ = Object.defineProperty;
var D = (i2, t, e2) => t in i2 ? _(i2, t, { enumerable: true, configurable: true, writable: true, value: e2 }) : i2[t] = e2;
var r = (i2, t, e2) => (D(i2, typeof t != "symbol" ? t + "" : t, e2), e2);
var E = class {
};
r(E, "NODE_ENV_KEY", "NODE_ENV"), /**
* 开发环境
*/
r(E, "NODE_ENV_DEVELOPMENT", "development"), /**
* 生产环境
*/
r(E, "NODE_ENV_PRODUCTION", "production"), /**
* 测试环境
*/
r(E, "NODE_ENV_TEST", "test"), /**
* 是否处于调试模式
*/
r(E, "VITE_DEBUG_MODE_KEY", "VITE_DEBUG_MODE");
var N = class {
  /**
   * 环境初始化
   *
   * @param envMeta - 需要传入 {"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":false} 。特别提醒：此参数是静态元数据，取决于最终使用的项目。因此仅仅在最终使用的地方显示传递此值，中间项目请保持参数传递
   * @see {@link https://vitejs.dev/guide/env-and-mode.html#production-replacement}
   */
  constructor(t) {
    r(this, "envMeta");
    this.envMeta = t;
  }
  /**
   * 是否是开发阶段调试
   */
  isNodeDev() {
    return this.getEnv(E.NODE_ENV_KEY) === E.NODE_ENV_DEVELOPMENT;
  }
  /**
   * 是否是调试阶段
   */
  isDev() {
    return this.isNodeDev() || this.getBooleanEnv(E.VITE_DEBUG_MODE_KEY);
  }
  /**
   * 获取环境变量，key不存在返回undefined
   * @param key - key
   */
  getEnv(t) {
    let e2;
    try {
      this.envMeta[t] && (e2 = this.envMeta[t]);
    } catch {
    }
    return e2;
  }
  /**
   * 获取String类型的环境变量，key不存在直接返回空值
   * @param key - key
   */
  getStringEnv(t) {
    return this.getEnv(t) ?? "";
  }
  /**
   * 获取Boolean类型的环境变量，key不存在返回false
   * @param key - key
   */
  getBooleanEnv(t) {
    let e2 = false;
    return this.getEnv(t) && (e2 = this.getStringEnv(t).toLowerCase() === "true"), e2;
  }
  /**
   * 获取环境变量，如果未定义或者为空值，用指定的默认值代替
   *
   * @param key - key
   * @param defaultValue - 默认值
   * @since 0.1.0
   * @author terwer
   */
  getEnvOrDefault(t, e2) {
    const n = this.getStringEnv(t);
    return n.trim().length == 0 ? e2 : n;
  }
};

// src/lib/util/ZhiServerElectronUtil.ts
var ZhiServerElectronUtil = class extends yt {
  static zhiEnv() {
    if (!this.env) {
      this.env = new N(import.meta.env);
    }
    return this.env;
  }
};
var ZhiServerElectronUtil_default = ZhiServerElectronUtil;

// ../zhi-device/dist/index.js
var g = Object.defineProperty;
var P = (a, e2, t) => e2 in a ? g(a, e2, { enumerable: true, configurable: true, writable: true, value: t }) : a[e2] = t;
var r2 = (a, e2, t) => (P(a, typeof e2 != "symbol" ? e2 + "" : e2, t), t);
var u = class {
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    return u.isInBrowser ? window.location.href.indexOf("chrome-extension://") > -1 : false;
  }
};
var i = u;
r2(i, "isNode", typeof process < "u"), /**
* 是否在浏览器环境
*/
r2(i, "isInBrowser", typeof window < "u"), /**
* 浏览器路径分隔符
*/
r2(i, "BrowserSeperator", "/"), /**
* 是否是Electron环境
*/
r2(i, "isElectron", () => !u.isInBrowser || !window.navigator || !window.navigator.userAgent ? false : /Electron/.test(window.navigator.userAgent)), /**
* 是否有Node环境，目前包括 Electron 和 Node
*/
r2(i, "hasNodeEnv", () => u.isElectron() || u.isNode), /**
* 获取url参数
*
* @param sParam - 参数
*/
r2(i, "getQueryString", (e2) => {
  if (!u.isInBrowser)
    return "";
  const n = window.location.search.substring(1).split("&");
  for (let s = 0; s < n.length; s++) {
    const c = n[s].split("=");
    if (c[0] === e2)
      return c[1];
  }
  return "";
}), /**
* 替换 URL 的参数
* 思路：
* 1. 使用了 URLSearchParams 对象来解析和构建 URL 查询参数。
*
* 2. 在处理包含 hash 片段的 URL 时使用了 split 函数将 URL 分成两部分：基本 URL 和 hash 片段。
*
* 3. 然后，再次使用 split 函数将基本 URL 分成两部分：路径和查询参数。
*
* 4. 将查询参数转换为 URLSearchParams 对象，然后设置指定的参数名和值。
*
* 5. 最后，使用 toString 函数将查询参数转换为字符串，并将其与路径组合成新的基本 URL。如果 URL 包含 hash 片段，则将其添加到新的基本 URL 中。
*
* @param url - 链接地址
* @param paramName - 参数名
* @param paramValue - 参数值
*/
r2(i, "replaceUrlParam", (e2, t, n) => {
  n == null && (n = "");
  const s = new RegExp("\\b(" + t + "=).*?(&|#|$)");
  if (e2.search(s) >= 0)
    return e2.replace(s, "$1" + n + "$2");
  const [c, d] = e2.split("#"), [y, b] = c.split("?"), l = new URLSearchParams(b);
  l.set(t, n);
  const m = l.toString(), f = y + (m ? "?" + m : "");
  return d ? f + "#" + d : f;
}), /**
* 设置url参数
*
* @param urlstring - url
* @param key - key
* @param value - value
*/
r2(i, "setUrlParameter", (e2, t, n) => {
  if (e2.includes(t))
    return u.replaceUrlParam(e2, t, n);
  const s = e2.split("#");
  let c = s[0];
  const d = s[1];
  return c.includes("?") ? c += `&${t}=${n}` : c += `?${t}=${n}`, d && (c += "#" + d), c;
}), /**
* 重新加载指定tab
*
* @param tabname - tabname
* @param t - 延迟时间
*/
r2(i, "reloadTabPage", (e2, t = 200) => {
  setTimeout(function() {
    if (u.isInBrowser) {
      const n = window.location.href;
      window.location.href = u.setUrlParameter(n, "tab", e2);
    }
  }, t);
}), /**
* 刷新当前tab页面
*/
r2(i, "reloadPage", () => {
  setTimeout(function() {
    u.isInBrowser && window.location.reload();
  }, 200);
}), /**
* 刷新当前tab页面
*
* @param msg - 消息提示
* @param cb - 回调
*/
r2(i, "reloadPageWithMessageCallback", (e2, t) => {
  t && t(e2), setTimeout(function() {
    u.isInBrowser && window.location.reload();
  }, 200);
});
var o = /* @__PURE__ */ ((a) => (a.BasePathType_Appearance = "Appearance", a.BasePathType_Data = "Data", a.BasePathType_Themes = "Themes", a.BasePathType_ZhiTheme = "ZhiTheme", a.BasePathType_None = "None", a))(o || {});
var h = class {
  /**
   * 检测是否运行在思源打开的浏览器中
   */
  static isInSiyuanBrowser() {
    return i.isInBrowser ? typeof window.siyuan < "u" && typeof window.Lute < "u" : false;
  }
  /**
   * 思源笔记 window 对象
   */
  static siyuanWindow() {
    let e2;
    return this.isInSiyuanWidget() ? e2 = parent.window : this.isInSiyuanNewWin() || this.isInSiyuanBrowser() || typeof window < "u" ? e2 = window : e2 = void 0, e2;
  }
  // =========================
  // require end
  // =========================
  // =========================
  // import start
  // =========================
  /**
   * 引入json
   *
   * @param jsPath - js相对路径全路径
   * @param type - 类型
   */
  static async importJs(e2, t) {
    let n = e2;
    switch (t) {
      case o.BasePathType_Appearance:
        n = this.browserJoinPath(this.siyuanAppearanceRelativePath(), e2);
        break;
      case o.BasePathType_Data:
        n = this.browserJoinPath(this.siyuanDataRelativePath(), e2);
        break;
      case o.BasePathType_Themes:
        n = this.browserJoinPath(this.siyuanThemeRelativePath(), e2);
        break;
      case o.BasePathType_ZhiTheme:
        n = this.browserJoinPath(this.zhiThemeRelativePath(), e2);
        break;
      default:
        throw new Error("type must be provided");
    }
    const { default: s } = await import(
      /* @vite-ignore */
      n
    );
    return s;
  }
  /**
   * 引入json
   *
   * @param jsonPath - json相对路径全路径
   * @param type - 类型
   */
  // public static async importJson(jsonPath: string, type: BasePathTypeEnum) {
  //   let fullJsonPath = jsonPath
  //   switch (type) {
  //     case BasePathTypeEnum.BasePathType_Appearance:
  //       fullJsonPath = this.browserJoinPath(this.siyuanAppearanceRelativePath(), jsonPath)
  //       break
  //     case BasePathTypeEnum.BasePathType_Data:
  //       fullJsonPath = this.browserJoinPath(this.siyuanDataRelativePath(), jsonPath)
  //       break
  //     case BasePathTypeEnum.BasePathType_Themes:
  //       fullJsonPath = this.browserJoinPath(this.siyuanThemeRelativePath(), jsonPath)
  //       break
  //     case BasePathTypeEnum.BasePathType_ZhiTheme:
  //       fullJsonPath = this.browserJoinPath(this.zhiThemeRelativePath(), jsonPath)
  //       break
  //     default:
  //       throw new Error("type must be provided")
  //   }
  //
  //   const { default: data } = await import(/* @vite-ignore */ fullJsonPath, { assert: { type: "json" } })
  //   return data
  // }
  /**
   * 引入 json - 以 data 为基本路径
   *
   * @param jsonPath - 相对于 data 的相对路径
   */
  // public static async importDataJson(jsonPath: string) {
  //   return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Data)
  // }
  /**
   * 引入 json - 以 appearance 为基本路径
   *
   * @param jsonPath - 相对于 appearance 的相对路径
   */
  // public static async importAppearanceJson(jsonPath: string) {
  //   return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Appearance)
  // }
  /**
   * 引入 json - 以 themes 为基本路径
   *
   * @param jsonPath - 相对于 themes 的相对路径
   */
  // public static async importThemesJson(jsonPath: string) {
  //   return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_Themes)
  // }
  /**
   * 引入 zhi 主题的 json - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsonPath - 相对于 zhi 主题根路径的相对路径
   */
  // public static async importZhiThemeJson(jsonPath: string) {
  //   return await this.importJson(jsonPath, BasePathTypeEnum.BasePathType_ZhiTheme)
  // }
  /**
   * 引入 zhi 主题的 js - 以 zhi 主题 的根路径为基本路径
   *
   * @param jsPath - 相对于 zhi 主题根路径的相对路径
   */
  static async importZhiThemeJs(e2) {
    return await this.importJs(e2, o.BasePathType_ZhiTheme);
  }
  // =========================
  // import start
  // =========================
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  static joinPath(...e2) {
    if (i.hasNodeEnv()) {
      const t = this.requireLib("path");
      if (t)
        return t.join(...e2);
    }
    return this.browserJoinPath(...e2);
  }
  static browserJoinPath(...e2) {
    return e2.join(i.BrowserSeperator);
  }
  /**
   * 思源笔记 conf 目录
   */
  static siyuanConfPath() {
    const e2 = this.siyuanWindow();
    if (!e2)
      throw new Error("Not in siyuan env");
    return e2.siyuan.config.system.confDir;
  }
  /**
   * 思源笔记 data 目录
   */
  static siyuanDataPath() {
    const e2 = this.siyuanWindow();
    if (!e2)
      throw new Error("Not in siyuan env");
    return e2.siyuan.config.system.dataDir;
  }
  /**
   * 思源笔记 data 目录-相对路径
   */
  static siyuanDataRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return "";
  }
  /**
   * 思源笔记 appearance 目录
   */
  static siyuanAppearancePath() {
    return this.joinPath(this.siyuanConfPath(), "appearance");
  }
  /**
   * 思源笔记 appearance 目录-相对路径
   */
  static siyuanAppearanceRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return this.browserJoinPath("", "appearance");
  }
  /**
   * 思源笔记 themes 目录-绝对路径
   *
   * 注意: 如果是非 electron 和 Node 环境，这里返回的是浏览器的路径，不是物理路径
   * 如果使用物理路径，请调用 siyuanAppearancePath 或者 siyuanDataPath
   *
   * @author terwer
   * @since 0.1.0
   */
  static siyuanThemePath() {
    if (i.hasNodeEnv())
      return this.joinPath(this.siyuanAppearancePath(), "themes");
    {
      const e2 = this.siyuanWindow();
      if (!e2)
        throw new Error("Not in siyuan env");
      return this.joinPath(e2.location.origin, "appearance", "themes");
    }
  }
  /**
   * 思源笔记 themes 目录-相对路径
   */
  static siyuanThemeRelativePath() {
    if (!this.siyuanWindow())
      throw new Error("Not in siyuan env");
    return this.browserJoinPath("", "appearance", "themes");
  }
  /**
   * zhi 主题目录 - 绝对路径
   */
  static zhiThemePath() {
    return this.joinPath(this.siyuanThemePath(), "zhi");
  }
  /**
   * zhi 主题目录 - 相对路径
   */
  static zhiThemeRelativePath() {
    return this.browserJoinPath(this.siyuanThemeRelativePath(), "zhi");
  }
};
var w = h;
r2(w, "isInSiyuanWidget", () => i.isInBrowser ? window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== "" : false), /**
* 思源笔记新窗口
*
* @deprecated window.terwer 判断方式已废弃，建议以后打开新窗口注入 window.siyuanNewWin ，这样语义会更容易理解
* @author terwer
* @version 0.1.0
* @since 0.0.1
*/
r2(w, "isInSiyuanNewWin", () => !i.isInBrowser || !i.isElectron() ? false : typeof window.terwer < "u" || typeof window.siyuanNewWin < "u"), // =========================
// require start
// =========================
/**
 * 引入依赖
 *
 * @param libpath - 依赖全路径
 * @param abs - 可选，是否使用觉得路径，默认是 true ， 启用之后 type参数无效
 * @param type - 可选，以谁的基本路径为准
 */
r2(w, "requireLib", (e2, t = true, n = o.BasePathType_None) => {
  if (!i.hasNodeEnv())
    throw new Error("require ony works on node env");
  let s = e2;
  if (!t)
    switch (n) {
      case o.BasePathType_Appearance:
        s = h.joinPath(h.siyuanAppearancePath(), e2);
        break;
      case o.BasePathType_Data:
        s = h.joinPath(h.siyuanDataPath(), e2);
        break;
      case o.BasePathType_Themes:
        s = h.joinPath(h.siyuanAppearancePath(), "themes", e2);
        break;
      case o.BasePathType_ZhiTheme:
        s = h.joinPath(h.siyuanAppearancePath(), "themes", "zhi", e2);
        break;
      default:
        throw new Error("type must be provided when not use absolute path");
    }
  const c = h.siyuanWindow();
  if (!c)
    return __require(s);
  if (typeof c.require < "u")
    return c.require(s);
}), /**
* 引入依赖，以 data 的基本路径为准
*
* @param libpath - 相对于 appearance 的相对路径
*/
r2(w, "requireAppearanceLib", (e2) => h.requireLib(e2, false, o.BasePathType_Appearance)), /**
* 引入依赖，以 data 的基本路径为准
*
* @param libpath - 相对于 data 的相对路径
*/
r2(w, "requireDataLib", (e2) => h.requireLib(e2, false, o.BasePathType_Data)), /**
* 引入依赖，以 theme 的基本路径为准
*
* @param libpath - 相对于 theme 的相对路径
*/
r2(w, "requireThemesLib", (e2) => h.requireLib(e2, false, o.BasePathType_Themes)), /**
* 引入依赖，以 ZhiTheme 的基本路径为准
*
* @param libpath - 相对于 ZhiTheme 的相对路径
*/
r2(w, "requireZhiThemeLib", (e2) => h.requireLib(e2, false, o.BasePathType_ZhiTheme));

// src/lib/browser-window/WindowManager.ts
var WindowManager = class {
  logger;
  common;
  constructor() {
    this.logger = ZhiServerElectronUtil_default.zhiLog("window-manager");
    this.common = ZhiServerElectronUtil_default.zhiCommon();
  }
  /**
   * 打开新窗口
   *
   * 示例：
   *
   * ```
   * ## development
   * windowManager.openBrowserWindow("https://www.baidu.com", undefined, undefined, true, false)
   * windowManager.openBrowserWindow("https://www.baidu.com", { "key1": "value1", "key2": "value2" }, undefined, true, false)
   *
   * ## production
   * windowManager.openBrowserWindow("https://www.baidu.com")
   * ```
   *
   * @param url - url
   * @param params - 参数
   * @param win - 父窗口
   * @param isDev - 是否打开开发者工具
   * @param modal - 是否模态
   */
  openBrowserWindow(url, params, win, isDev = false, modal = false) {
    try {
      if (this.common.strUtil.isEmptyString(url)) {
        this.logger.error("Url cannot be empty");
        return;
      }
      if (!i.isElectron()) {
        this.logger.info("BrowserWindow can ony be available in siyuan Electron environment");
        return;
      }
      if (params) {
        Object.keys(params).forEach((key) => {
          const value = params[key];
          url = i.setUrlParameter(url, key, value);
        });
      }
      this.logger.info(this.common.strUtil.f("Opening a new BrowserWindow from url => {0}", url));
      const mainWin = win ?? w.siyuanWindow();
      const { app, BrowserWindow, getCurrentWindow } = mainWin.require("@electron/remote");
      const remote = mainWin.require("@electron/remote").require("@electron/remote/main");
      const mainWindow = getCurrentWindow();
      const newWindow = new BrowserWindow({
        parent: mainWindow,
        width: 900,
        height: 750,
        resizable: true,
        modal,
        icon: w.browserJoinPath(
          w.siyuanWindow().siyuan.config.system.appDir,
          "stage",
          "icon-large.png"
        ),
        titleBarOverlay: {
          color: "#cccccca5",
          symbolColor: "black"
        },
        webPreferences: {
          nativeWindowOpen: true,
          nodeIntegration: true,
          webviewTag: true,
          webSecurity: false,
          contextIsolation: false
        }
      });
      newWindow.webContents.userAgent = `SiYuan/${app.getVersion()} https://b3log.org/siyuan Electron`;
      remote.enable(newWindow.webContents);
      if (isDev) {
        newWindow.webContents.openDevTools();
      }
      newWindow.loadURL(url);
    } catch (e2) {
      this.logger.error("Open browser window failed", e2);
    }
  }
};
var WindowManager_default = WindowManager;

// src/lib/browser-window/index.ts
var ZhiBrowserWindow = class {
  logger;
  common;
  windowManager;
  constructor() {
    this.logger = ZhiServerElectronUtil_default.zhiLog("zhi-browser-window");
    this.common = ZhiServerElectronUtil_default.zhiCommon();
    this.windowManager = new WindowManager_default();
  }
  /**
   * 挂载 BrowserWindow
   *
   * @author terwer
   * @since 1.0.0
   */
  initBrowserWindow() {
    w.siyuanWindow().zhiWindow = this.windowManager;
    this.logger.info("zhiWindow mounted");
    return "ok";
  }
};
var browser_window_default = ZhiBrowserWindow;

// src/index.ts
var init = () => {
  const zhiBrowserWindow = new browser_window_default();
  zhiBrowserWindow.initBrowserWindow();
  return "ok";
};
var src_default = init;
export {
  src_default as default
};
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
