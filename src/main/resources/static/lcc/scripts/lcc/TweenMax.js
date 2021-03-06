(function (e, t) {
    "use strict";
    var n = e.GreenSockGlobals = e.GreenSockGlobals || e;
    if (!n.TweenLite) {
        var r, i, s, o, u, a = function (e) {
                var t, r = e.split("."),
                    i = n;
                for (t = 0; t < r.length; t++) i[r[t]] = i = i[r[t]] || {};
                return i
            },
            f = a("com.greensock"),
            l = 1e-10,
            c = function (e) {
                var t, n = [],
                    r = e.length;
                for (t = 0; t !== r; n.push(e[t++]));
                return n
            },
            h = function () {
            },
            p = function () {
                var e = Object.prototype.toString,
                    t = e.call([]);
                return function (n) {
                    return null != n && (n instanceof Array || "object" == typeof n && !!n.push && e.call(n) === t)
                }
            }(),
            d = {},
            v = function (r, i, s, o) {
                this.sc = d[r] ? d[r].sc : [],
                    d[r] = this,
                    this.gsClass = null,
                    this.func = s;
                var u = [];
                this.check = function (f) {
                    for (var l, c, h, p, m, g = i.length, y = g; --g > -1;)(l = d[i[g]] || new v(i[g], [])).gsClass ? (u[g] = l.gsClass, y--) : f && l.sc.push(this);
                    if (0 === y && s) for (c = ("com.greensock." + r).split("."), h = c.pop(), p = a(c.join("."))[h] = this.gsClass = s.apply(s, u), o && (n[h] = p, m = "undefined" != typeof module && module.exports, !m && "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + r.split(".").pop(), [], function () {
                            return p
                        }) : r === t && m && (module.exports = p)), g = 0; g < this.sc.length; g++) this.sc[g].check()
                },
                    this.check(!0)
            },
            m = e._gsDefine = function (e, t, n, r) {
                return new v(e, t, n, r)
            },
            g = f._class = function (e, t, n) {
                return t = t ||
                    function () {
                    },
                    m(e, [], function () {
                        return t
                    }, n),
                    t
            };
        m.globals = n;
        var y = [0, 0, 1, 1],
            b = [],
            w = g("easing.Ease", function (e, t, n, r) {
                this._func = e,
                    this._type = n || 0,
                    this._power = r || 0,
                    this._params = t ? y.concat(t) : y
            }, !0),
            E = w.map = {},
            S = w.register = function (e, t, n, r) {
                for (var i, s, o, u, a = t.split(","), l = a.length, c = (n || "easeIn,easeOut,easeInOut").split(","); --l > -1;) for (s = a[l], i = r ? g("easing." + s, null, !0) : f.easing[s] || {}, o = c.length; --o > -1;) u = c[o],
                    E[s + "." + u] = E[u + s] = i[u] = e.getRatio ? e : e[u] || new e
            };
        for (s = w.prototype, s._calcEnd = !1, s.getRatio = function (e) {
            if (this._func) return this._params[0] = e,
                this._func.apply(null, this._params);
            var t = this._type,
                n = this._power,
                r = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
            return 1 === n ? r *= r : 2 === n ? r *= r * r : 3 === n ? r *= r * r * r : 4 === n && (r *= r * r * r * r),
                1 === t ? 1 - r : 2 === t ? r : .5 > e ? r / 2 : 1 - r / 2
        }, r = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = r.length; --i > -1;) s = r[i] + ",Power" + i,
            S(new w(null, null, 1, i), s, "easeOut", !0),
            S(new w(null, null, 2, i), s, "easeIn" + (0 === i ? ",easeNone" : "")),
            S(new w(null, null, 3, i), s, "easeInOut");
        E.linear = f.easing.Linear.easeIn,
            E.swing = f.easing.Quad.easeInOut;
        var x = g("events.EventDispatcher", function (e) {
            this._listeners = {},
                this._eventTarget = e || this
        });
        s = x.prototype,
            s.addEventListener = function (e, t, n, r, i) {
                i = i || 0;
                var s, a, f = this._listeners[e],
                    l = 0;
                for (null == f && (this._listeners[e] = f = []), a = f.length; --a > -1;) s = f[a],
                    s.c === t && s.s === n ? f.splice(a, 1) : 0 === l && s.pr < i && (l = a + 1);
                f.splice(l, 0, {
                    c: t,
                    s: n,
                    up: r,
                    pr: i
                }),
                this !== o || u || o.wake()
            },
            s.removeEventListener = function (e, t) {
                var n, r = this._listeners[e];
                if (r) for (n = r.length; --n > -1;) if (r[n].c === t) return void r.splice(n, 1)
            },
            s.dispatchEvent = function (e) {
                var t, n, r, i = this._listeners[e];
                if (i) for (t = i.length, n = this._eventTarget; --t > -1;) r = i[t],
                r && (r.up ? r.c.call(r.s || n, {
                        type: e,
                        target: n
                    }) : r.c.call(r.s || n))
            };
        var T = e.requestAnimationFrame,
            N = e.cancelAnimationFrame,
            C = Date.now ||
                function () {
                    return (new Date).getTime()
                },
            k = C();
        for (r = ["ms", "moz", "webkit", "o"], i = r.length; --i > -1 && !T;) T = e[r[i] + "RequestAnimationFrame"],
            N = e[r[i] + "CancelAnimationFrame"] || e[r[i] + "CancelRequestAnimationFrame"];
        g("Ticker", function (e, t) {
            var n, r, i, s, a, f = this,
                c = C(),
                p = t !== !1 && T ? "auto" : !1,
                d = 500,
                v = 33,
                m = "tick",
                g = function (e) {
                    var t, o, u = C() - k;
                    u > d && (c += u - v),
                        k += u,
                        f.time = (k - c) / 1e3,
                        t = f.time - a,
                    (!n || t > 0 || e === !0) && (f.frame++, a += t + (t >= s ? .004 : s - t), o = !0),
                    e !== !0 && (i = r(g)),
                    o && f.dispatchEvent(m)
                };
            x.call(f),
                f.time = f.frame = 0,
                f.tick = function () {
                    g(!0)
                },
                f.lagSmoothing = function (e, t) {
                    d = e || 1 / l,
                        v = Math.min(t, d, 0)
                },
                f.sleep = function () {
                    null != i && (p && N ? N(i) : clearTimeout(i), r = h, i = null, f === o && (u = !1))
                },
                f.wake = function (e) {
                    null !== i ? f.sleep() : e ? c += -k + (k = C()) : f.frame > 10 && (k = C() - d + 5),
                        r = 0 === n ? h : p && T ? T : function (e) {
                                    return setTimeout(e, 1e3 * (a - f.time) + 1 | 0)
                                },
                    f === o && (u = !0),
                        g(2)
                },
                f.fps = function (e) {
                    return arguments.length ? (n = e, s = 1 / (n || 60), a = this.time + s, void f.wake()) : n
                },
                f.useRAF = function (e) {
                    return arguments.length ? (f.sleep(), p = e, void f.fps(n)) : p
                },
                f.fps(e),
                setTimeout(function () {
                    "auto" === p && f.frame < 5 && "hidden" !== document.visibilityState && f.useRAF(!1)
                }, 1500)
        }),
            s = f.Ticker.prototype = new f.events.EventDispatcher,
            s.constructor = f.Ticker;
        var L = g("core.Animation", function (e, t) {
            if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, $) {
                u || o.wake();
                var n = this.vars.useFrames ? V : $;
                n.add(this, n._time),
                this.vars.paused && this.paused(!0)
            }
        });
        o = L.ticker = new f.Ticker,
            s = L.prototype,
            s._dirty = s._gc = s._initted = s._paused = !1,
            s._totalTime = s._time = 0,
            s._rawPrevTime = -1,
            s._next = s._last = s._onUpdate = s._timeline = s.timeline = null,
            s._paused = !1;
        var A = function () {
            u && C() - k > 2e3 && o.wake(),
                setTimeout(A, 2e3)
        };
        A(),
            s.play = function (e, t) {
                return null != e && this.seek(e, t),
                    this.reversed(!1).paused(!1)
            },
            s.pause = function (e, t) {
                return null != e && this.seek(e, t),
                    this.paused(!0)
            },
            s.resume = function (e, t) {
                return null != e && this.seek(e, t),
                    this.paused(!1)
            },
            s.seek = function (e, t) {
                return this.totalTime(Number(e), t !== !1)
            },
            s.restart = function (e, t) {
                return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
            },
            s.reverse = function (e, t) {
                return null != e && this.seek(e || this.totalDuration(), t),
                    this.reversed(!0).paused(!1)
            },
            s.render = function (e, t, n) {
            },
            s.invalidate = function () {
                return this._time = this._totalTime = 0,
                    this._initted = this._gc = !1,
                    this._rawPrevTime = -1,
                (this._gc || !this.timeline) && this._enabled(!0),
                    this
            },
            s.isActive = function () {
                var e, t = this._timeline,
                    n = this._startTime;
                return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= n && e < n + this.totalDuration() / this._timeScale
            },
            s._enabled = function (e, t) {
                return u || o.wake(),
                    this._gc = !e,
                    this._active = this.isActive(),
                t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)),
                    !1
            },
            s._kill = function (e, t) {
                return this._enabled(!1, !1)
            },
            s.kill = function (e, t) {
                return this._kill(e, t),
                    this
            },
            s._uncache = function (e) {
                for (var t = e ? this : this.timeline; t;) t._dirty = !0,
                    t = t.timeline;
                return this
            },
            s._swapSelfInParams = function (e) {
                for (var t = e.length, n = e.concat(); --t > -1;)"{self}" === e[t] && (n[t] = this);
                return n
            },
            s._callback = function (e) {
                var t = this.vars;
                t[e].apply(t[e + "Scope"] || t.callbackScope || this, t[e + "Params"] || b)
            },
            s.eventCallback = function (e, t, n, r) {
                if ("on" === (e || "").substr(0, 2)) {
                    var i = this.vars;
                    if (1 === arguments.length) return i[e];
                    null == t ? delete i[e] : (i[e] = t, i[e + "Params"] = p(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n, i[e + "Scope"] = r),
                    "onUpdate" === e && (this._onUpdate = t)
                }
                return this
            },
            s.delay = function (e) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
            },
            s.duration = function (e) {
                return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
            },
            s.totalDuration = function (e) {
                return this._dirty = !1,
                    arguments.length ? this.duration(e) : this._totalDuration
            },
            s.time = function (e, t) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
            },
            s.totalTime = function (e, t, n) {
                if (u || o.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > e && !n && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var r = this._totalDuration,
                            i = this._timeline;
                        if (e > r && !n && (e = r), this._startTime = (this._paused ? this._pauseTime : i._time) - (this._reversed ? r - e : e) / this._timeScale, i._dirty || this._uncache(!1), i._timeline) for (; i._timeline;) i._timeline._time !== (i._startTime + i._totalTime) / i._timeScale && i.totalTime(i._totalTime, !0),
                            i = i._timeline
                    }
                    this._gc && this._enabled(!0, !1),
                    (this._totalTime !== e || 0 === this._duration) && (P.length && K(), this.render(e, t, !1), P.length && K())
                }
                return this
            },
            s.progress = s.totalProgress = function (e, t) {
                var n = this.duration();
                return arguments.length ? this.totalTime(n * e, t) : n ? this._time / n : this.ratio
            },
            s.startTime = function (e) {
                return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
            },
            s.endTime = function (e) {
                return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
            },
            s.timeScale = function (e) {
                if (!arguments.length) return this._timeScale;
                if (e = e || l, this._timeline && this._timeline.smoothChildTiming) {
                    var t = this._pauseTime,
                        n = t || 0 === t ? t : this._timeline.totalTime();
                    this._startTime = n - (n - this._startTime) * this._timeScale / e
                }
                return this._timeScale = e,
                    this._uncache(!1)
            },
            s.reversed = function (e) {
                return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            },
            s.paused = function (e) {
                if (!arguments.length) return this._paused;
                var t, n, r = this._timeline;
                return e != this._paused && r && (u || e || o.wake(), t = r.rawTime(), n = t - this._pauseTime, !e && r.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = this.isActive(), !e && 0 !== n && this._initted && this.duration() && (t = r.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, this.render(t, t === this._totalTime, !0))),
                this._gc && !e && this._enabled(!0, !1),
                    this
            };
        var O = g("core.SimpleTimeline", function (e) {
            L.call(this, 0, e),
                this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        s = O.prototype = new L,
            s.constructor = O,
            s.kill()._gc = !1,
            s._first = s._last = s._recent = null,
            s._sortChildren = !1,
            s.add = s.insert = function (e, t, n, r) {
                var i, s;
                if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), i = this._last, this._sortChildren) for (s = e._startTime; i && i._startTime > s;) i = i._prev;
                return i ? (e._next = i._next, i._next = e) : (e._next = this._first, this._first = e),
                    e._next ? e._next._prev = e : this._last = e,
                    e._prev = i,
                    this._recent = e,
                this._timeline && this._uncache(!0),
                    this
            },
            s._remove = function (e, t) {
                return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)),
                    this
            },
            s.render = function (e, t, n) {
                var r, i = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = e; i;) r = i._next,
                (i._active || e >= i._startTime && !i._paused) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)),
                    i = r
            },
            s.rawTime = function () {
                return u || o.wake(),
                    this._totalTime
            };
        var M = g("TweenLite", function (t, n, r) {
                if (L.call(this, n, r), this.render = M.prototype.render, null == t) throw "Cannot tween a null target.";
                this.target = t = "string" != typeof t ? t : M.selector(t) || t;
                var i, s, o, u = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
                    a = this.vars.overwrite;
                if (this._overwrite = a = null == a ? X[M.defaultOverwrite] : "number" == typeof a ? a >> 0 : X[a], (u || t instanceof Array || t.push && p(t)) && "number" != typeof t[0]) for (this._targets = o = c(t), this._propLookup = [], this._siblings = [], i = 0; i < o.length; i++) s = o[i],
                    s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(i--, 1), this._targets = o = o.concat(c(s))) : (this._siblings[i] = Q(s, this, !1), 1 === a && this._siblings[i].length > 1 && Y(s, this, null, 1, this._siblings[i])) : (s = o[i--] = M.selector(s), "string" == typeof s && o.splice(i + 1, 1)) : o.splice(i--, 1);
                else this._propLookup = {},
                    this._siblings = Q(t, this, !1),
                1 === a && this._siblings.length > 1 && Y(t, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -l, this.render(-this._delay))
            }, !0),
            _ = function (t) {
                return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
            },
            D = function (e, t) {
                var n, r = {};
                for (n in e) W[n] || n in t && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!R[n] || R[n] && R[n]._autoCSS) || (r[n] = e[n], delete e[n]);
                e.css = r
            };
        s = M.prototype = new L,
            s.constructor = M,
            s.kill()._gc = !1,
            s.ratio = 0,
            s._firstPT = s._targets = s._overwrittenProps = s._startAt = null,
            s._notifyPluginsOfEnabled = s._lazy = !1,
            M.version = "1.18.2",
            M.defaultEase = s._ease = new w(null, null, 1, 1),
            M.defaultOverwrite = "auto",
            M.ticker = o,
            M.autoSleep = 120,
            M.lagSmoothing = function (e, t) {
                o.lagSmoothing(e, t)
            },
            M.selector = e.$ || e.jQuery ||
                function (t) {
                    var n = e.$ || e.jQuery;
                    return n ? (M.selector = n, n(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
                };
        var P = [],
            H = {},
            B = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
            j = function (e) {
                for (var t, n = this._firstPT, r = 1e-6; n;) t = n.blob ? e ? this.join("") : this.start : n.c * e + n.s,
                    n.r ? t = Math.round(t) : r > t && t > -r && (t = 0),
                    n.f ? n.fp ? n.t[n.p](n.fp, t) : n.t[n.p](t) : n.t[n.p] = t,
                    n = n._next
            },
            F = function (e, t, n, r) {
                var i, s, o, u, a, f, l, c = [e, t],
                    h = 0,
                    p = "",
                    d = 0;
                for (c.start = e, n && (n(c), e = c[0], t = c[1]), c.length = 0, i = e.match(B) || [], s = t.match(B) || [], r && (r._next = null, r.blob = 1, c._firstPT = r), a = s.length, u = 0; a > u; u++) l = s[u],
                    f = t.substr(h, t.indexOf(l, h) - h),
                    p += f || !u ? f : ",",
                    h += f.length,
                    d ? d = (d + 1) % 5 : "rgba(" === f.substr(-5) && (d = 1),
                    l === i[u] || i.length <= u ? p += l : (p && (c.push(p), p = ""), o = parseFloat(i[u]), c.push(o), c._firstPT = {
                            _next: c._firstPT,
                            t: c,
                            p: c.length - 1,
                            s: o,
                            c: ("=" === l.charAt(1) ? parseInt(l.charAt(0) + "1", 10) * parseFloat(l.substr(2)) : parseFloat(l) - o) || 0,
                            f: 0,
                            r: d && 4 > d
                        }),
                    h += l.length;
                return p += t.substr(h),
                p && c.push(p),
                    c.setRatio = j,
                    c
            },
            I = function (e, t, n, r, i, s, o, u) {
                var a, f, l = "get" === n ? e[t] : n,
                    c = typeof e[t],
                    h = "string" == typeof r && "=" === r.charAt(1),
                    p = {
                        t: e,
                        p: t,
                        s: l,
                        f: "function" === c,
                        pg: 0,
                        n: i || t,
                        r: s,
                        pr: 0,
                        c: h ? parseInt(r.charAt(0) + "1", 10) * parseFloat(r.substr(2)) : parseFloat(r) - l || 0
                    };
                return "number" !== c && ("function" === c && "get" === n && (f = t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t : "get" + t.substr(3), p.s = l = o ? e[f](o) : e[f]()), "string" == typeof l && (o || isNaN(l)) ? (p.fp = o, a = F(l, r, u || M.defaultStringFilter, p), p = {
                        t: a,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: i || t,
                        pr: 0
                    }) : h || (p.s = parseFloat(l), p.c = parseFloat(r) - p.s || 0)),
                    p.c ? ((p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p) : void 0
            },
            q = M._internals = {
                isArray: p,
                isSelector: _,
                lazyTweens: P,
                blobDif: F
            },
            R = M._plugins = {},
            U = q.tweenLookup = {},
            z = 0,
            W = q.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
                stringFilter: 1
            },
            X = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            },
            V = L._rootFramesTimeline = new O,
            $ = L._rootTimeline = new O,
            J = 30,
            K = q.lazyRender = function () {
                var e, t = P.length;
                for (H = {}; --t > -1;) e = P[t],
                e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
                P.length = 0
            };
        $._startTime = o.time,
            V._startTime = o.frame,
            $._active = V._active = !0,
            setTimeout(K, 1),
            L._updateRoot = M.render = function () {
                var e, t, n;
                if (P.length && K(), $.render((o.time - $._startTime) * $._timeScale, !1, !1), V.render((o.frame - V._startTime) * V._timeScale, !1, !1), P.length && K(), o.frame >= J) {
                    J = o.frame + (parseInt(M.autoSleep, 10) || 120);
                    for (n in U) {
                        for (t = U[n].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
                        0 === t.length && delete U[n]
                    }
                    if (n = $._first, (!n || n._paused) && M.autoSleep && !V._first && 1 === o._listeners.tick.length) {
                        for (; n && n._paused;) n = n._next;
                        n || o.sleep()
                    }
                }
            },
            o.addEventListener("tick", L._updateRoot);
        var Q = function (e, t, n) {
                var r, i, s = e._gsTweenID;
                if (U[s || (e._gsTweenID = s = "t" + z++)] || (U[s] = {
                        target: e,
                        tweens: []
                    }), t && (r = U[s].tweens, r[i = r.length] = t, n)) for (; --i > -1;) r[i] === t && r.splice(i, 1);
                return U[s].tweens
            },
            G = function (e, t, n, r) {
                var i, s, o = e.vars.onOverwrite;
                return o && (i = o(e, t, n, r)),
                    o = M.onOverwrite,
                o && (s = o(e, t, n, r)),
                i !== !1 && s !== !1
            },
            Y = function (e, t, n, r, i) {
                var s, o, u, a;
                if (1 === r || r >= 4) {
                    for (a = i.length, s = 0; a > s; s++) if ((u = i[s]) !== t) u._gc || u._kill(null, e, t) && (o = !0);
                    else if (5 === r) break;
                    return o
                }
                var f, c = t._startTime + l,
                    h = [],
                    p = 0,
                    d = 0 === t._duration;
                for (s = i.length; --s > -1;)(u = i[s]) === t || u._gc || u._paused || (u._timeline !== t._timeline ? (f = f || Z(t, 0, d), 0 === Z(u, f, d) && (h[p++] = u)) : u._startTime <= c && u._startTime + u.totalDuration() / u._timeScale > c && ((d || !u._initted) && c - u._startTime <= 2e-10 || (h[p++] = u)));
                for (s = p; --s > -1;) if (u = h[s], 2 === r && u._kill(n, e, t) && (o = !0), 2 !== r || !u._firstPT && u._initted) {
                    if (2 !== r && !G(u, t)) continue;
                    u._enabled(!1, !1) && (o = !0)
                }
                return o
            },
            Z = function (e, t, n) {
                for (var r = e._timeline, i = r._timeScale, s = e._startTime; r._timeline;) {
                    if (s += r._startTime, i *= r._timeScale, r._paused) return -100;
                    r = r._timeline
                }
                return s /= i,
                    s > t ? s - t : n && s === t || !e._initted && 2 * l > s - t ? l : (s += e.totalDuration() / e._timeScale / i) > t + l ? 0 : s - t - l
            };
        s._init = function () {
            var e, t, n, r, i, s = this.vars,
                o = this._overwrittenProps,
                u = this._duration,
                a = !!s.immediateRender,
                f = s.ease;
            if (s.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
                    i = {};
                for (r in s.startAt) i[r] = s.startAt[r];
                if (i.overwrite = !1, i.immediateRender = !0, i.lazy = a && s.lazy !== !1, i.startAt = i.delay = null, this._startAt = M.to(this.target, 0, i), a) if (this._time > 0) this._startAt = null;
                else if (0 !== u) return
            } else if (s.runBackwards && 0 !== u) if (this._startAt) this._startAt.render(-1, !0),
                this._startAt.kill(),
                this._startAt = null;
            else {
                0 !== this._time && (a = !1),
                    n = {};
                for (r in s) W[r] && "autoCSS" !== r || (n[r] = s[r]);
                if (n.overwrite = 0, n.data = "isFromStart", n.lazy = a && s.lazy !== !1, n.immediateRender = a, this._startAt = M.to(this.target, 0, n), a) {
                    if (0 === this._time) return
                } else this._startAt._init(),
                    this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null)
            }
            if (this._ease = f = f ? f instanceof w ? f : "function" == typeof f ? new w(f, s.easeParams) : E[f] || M.defaultEase : M.defaultEase, s.easeParams instanceof Array && f.config && (this._ease = f.config.apply(f, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (e = this._targets.length; --e > -1;) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], o ? o[e] : null) && (t = !0);
            else t = this._initProps(this.target, this._propLookup, this._siblings, o);
            if (t && M._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards) for (n = this._firstPT; n;) n.s += n.c,
                n.c = -n.c,
                n = n._next;
            this._onUpdate = s.onUpdate,
                this._initted = !0
        },
            s._initProps = function (t, n, r, i) {
                var s, o, u, a, f, l;
                if (null == t) return !1;
                H[t._gsTweenID] && K(),
                this.vars.css || t.style && t !== e && t.nodeType && R.css && this.vars.autoCSS !== !1 && D(this.vars, t);
                for (s in this.vars) if (l = this.vars[s], W[s]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[s] = l = this._swapSelfInParams(l, this));
                else if (R[s] && (a = new R[s])._onInitTween(t, this.vars[s], this)) {
                    for (this._firstPT = f = {
                        _next: this._firstPT,
                        t: a,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 1,
                        n: s,
                        pg: 1,
                        pr: a._priority
                    }, o = a._overwriteProps.length; --o > -1;) n[a._overwriteProps[o]] = this._firstPT;
                    (a._priority || a._onInitAllProps) && (u = !0),
                    (a._onDisable || a._onEnable) && (this._notifyPluginsOfEnabled = !0),
                    f._next && (f._next._prev = f)
                } else n[s] = I.call(this, t, s, "get", l, s, 0, null, this.vars.stringFilter);
                return i && this._kill(i, t) ? this._initProps(t, n, r, i) : this._overwrite > 1 && this._firstPT && r.length > 1 && Y(t, this, n, this._overwrite, r) ? (this._kill(n, t), this._initProps(t, n, r, i)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (H[t._gsTweenID] = !0), u)
            },
            s.render = function (e, t, n) {
                var r, i, s, o, u = this._time,
                    a = this._duration,
                    f = this._rawPrevTime;
                if (e >= a - 1e-7) this._totalTime = this._time = a,
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                this._reversed || (r = !0, i = "onComplete", n = n || this._timeline.autoRemoveChildren),
                0 === a && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (0 > f || 0 >= e && e >= -1e-7 || f === l && "isPause" !== this.data) && f !== e && (n = !0, f > l && (i = "onReverseComplete")), this._rawPrevTime = o = !t || e || f === e ? e : l);
                else if (1e-7 > e) this._totalTime = this._time = 0,
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== u || 0 === a && f > 0) && (i = "onReverseComplete", r = this._reversed),
                0 > e && (this._active = !1, 0 === a && (this._initted || !this.vars.lazy || n) && (f >= 0 && (f !== l || "isPause" !== this.data) && (n = !0), this._rawPrevTime = o = !t || e || f === e ? e : l)),
                this._initted || (n = !0);
                else if (this._totalTime = this._time = e, this._easeType) {
                    var c = e / a,
                        h = this._easeType,
                        p = this._easePower;
                    (1 === h || 3 === h && c >= .5) && (c = 1 - c),
                    3 === h && (c *= 2),
                        1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c),
                        1 === h ? this.ratio = 1 - c : 2 === h ? this.ratio = c : .5 > e / a ? this.ratio = c / 2 : this.ratio = 1 - c / 2
                } else this.ratio = this._ease.getRatio(e / a);
                if (this._time !== u || n) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = u,
                            this._rawPrevTime = f,
                            P.push(this),
                            void(this._lazy = [e, t]);
                        this._time && !r ? this.ratio = this._ease.getRatio(this._time / a) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== u && e >= 0 && (this._active = !0), 0 === u && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === a) && (t || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                        s = s._next;
                    this._onUpdate && (0 > e && this._startAt && e !== -0.0001 && this._startAt.render(e, t, n), t || (this._time !== u || r) && this._callback("onUpdate")),
                    i && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && e !== -0.0001 && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this._callback(i), 0 === a && this._rawPrevTime === l && o !== l && (this._rawPrevTime = 0))
                }
            },
            s._kill = function (e, t, n) {
                if ("all" === e && (e = null), null != e || null != t && t !== this.target) {
                    t = "string" != typeof t ? t || this._targets || this.target : M.selector(t) || t;
                    var r, i, s, o, u, a, f, l, c, h = n && this._time && n._startTime === this._startTime && this._timeline === n._timeline;
                    if ((p(t) || _(t)) && "number" != typeof t[0]) for (r = t.length; --r > -1;) this._kill(e, t[r], n) && (a = !0);
                    else {
                        if (this._targets) {
                            for (r = this._targets.length; --r > -1;) if (t === this._targets[r]) {
                                u = this._propLookup[r] || {},
                                    this._overwrittenProps = this._overwrittenProps || [],
                                    i = this._overwrittenProps[r] = e ? this._overwrittenProps[r] || {} : "all";
                                break
                            }
                        } else {
                            if (t !== this.target) return !1;
                            u = this._propLookup,
                                i = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                        }
                        if (u) {
                            if (f = e || u, l = e !== i && "all" !== i && e !== u && ("object" != typeof e || !e._tempKill), n && (M.onOverwrite || this.vars.onOverwrite)) {
                                for (s in f) u[s] && (c || (c = []), c.push(s));
                                if ((c || !e) && !G(this, n, t, c)) return !1
                            }
                            for (s in f)(o = u[s]) && (h && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, a = !0), o.pg && o.t._kill(f) && (a = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete u[s]),
                            l && (i[s] = 1);
                            !this._firstPT && this._initted && this._enabled(!1, !1)
                        }
                    }
                    return a
                }
                return this._lazy = !1,
                    this._enabled(!1, !1)
            },
            s.invalidate = function () {
                return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this),
                    this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
                    this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
                    this._propLookup = this._targets ? {} : [],
                    L.prototype.invalidate.call(this),
                this.vars.immediateRender && (this._time = -l, this.render(-this._delay)),
                    this
            },
            s._enabled = function (e, t) {
                if (u || o.wake(), e && this._gc) {
                    var n, r = this._targets;
                    if (r) for (n = r.length; --n > -1;) this._siblings[n] = Q(r[n], this, !0);
                    else this._siblings = Q(this.target, this, !0)
                }
                return L.prototype._enabled.call(this, e, t),
                    this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
            },
            M.to = function (e, t, n) {
                return new M(e, t, n)
            },
            M.from = function (e, t, n) {
                return n.runBackwards = !0,
                    n.immediateRender = 0 != n.immediateRender,
                    new M(e, t, n)
            },
            M.fromTo = function (e, t, n, r) {
                return r.startAt = n,
                    r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender,
                    new M(e, t, r)
            },
            M.delayedCall = function (e, t, n, r, i) {
                return new M(t, 0, {
                    delay: e,
                    onComplete: t,
                    onCompleteParams: n,
                    callbackScope: r,
                    onReverseComplete: t,
                    onReverseCompleteParams: n,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: i,
                    overwrite: 0
                })
            },
            M.set = function (e, t) {
                return new M(e, 0, t)
            },
            M.getTweensOf = function (e, t) {
                if (null == e) return [];
                e = "string" != typeof e ? e : M.selector(e) || e;
                var n, r, i, s;
                if ((p(e) || _(e)) && "number" != typeof e[0]) {
                    for (n = e.length, r = []; --n > -1;) r = r.concat(M.getTweensOf(e[n], t));
                    for (n = r.length; --n > -1;) for (s = r[n], i = n; --i > -1;) s === r[i] && r.splice(n, 1)
                } else for (r = Q(e).concat(), n = r.length; --n > -1;)(r[n]._gc || t && !r[n].isActive()) && r.splice(n, 1);
                return r
            },
            M.killTweensOf = M.killDelayedCallsTo = function (e, t, n) {
                "object" == typeof t && (n = t, t = !1);
                for (var r = M.getTweensOf(e, t), i = r.length; --i > -1;) r[i]._kill(n, e)
            };
        var et = g("plugins.TweenPlugin", function (e, t) {
            this._overwriteProps = (e || "").split(","),
                this._propName = this._overwriteProps[0],
                this._priority = t || 0,
                this._super = et.prototype
        }, !0);
        if (s = et.prototype, et.version = "1.18.0", et.API = 2, s._firstPT = null, s._addTween = I, s.setRatio = j, s._kill = function (e) {
                var t, n = this._overwriteProps,
                    r = this._firstPT;
                if (null != e[this._propName]) this._overwriteProps = [];
                else for (t = n.length; --t > -1;) null != e[n[t]] && n.splice(t, 1);
                for (; r;) null != e[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)),
                    r = r._next;
                return !1
            }, s._roundProps = function (e, t) {
                for (var n = this._firstPT; n;)(e[this._propName] || null != n.n && e[n.n.split(this._propName + "_").join("")]) && (n.r = t),
                    n = n._next
            }, M._onPluginEvent = function (e, t) {
                var n, r, i, s, o, u = t._firstPT;
                if ("_onInitAllProps" === e) {
                    for (; u;) {
                        for (o = u._next, r = i; r && r.pr > u.pr;) r = r._next;
                        (u._prev = r ? r._prev : s) ? u._prev._next = u : i = u,
                            (u._next = r) ? r._prev = u : s = u,
                            u = o
                    }
                    u = t._firstPT = i
                }
                for (; u;) u.pg && "function" == typeof u.t[e] && u.t[e]() && (n = !0),
                    u = u._next;
                return n
            }, et.activate = function (e) {
                for (var t = e.length; --t > -1;) e[t].API === et.API && (R[(new e[t])._propName] = e[t]);
                return !0
            }, m.plugin = function (e) {
                if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
                var t, n = e.propName,
                    r = e.priority || 0,
                    i = e.overwriteProps,
                    s = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_roundProps",
                        initAll: "_onInitAllProps"
                    },
                    o = g("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function () {
                        et.call(this, n, r),
                            this._overwriteProps = i || []
                    }, e.global === !0),
                    u = o.prototype = new et(n);
                u.constructor = o,
                    o.API = e.API;
                for (t in s)"function" == typeof e[t] && (u[s[t]] = e[t]);
                return o.version = e.version,
                    et.activate([o]),
                    o
            }, r = e._gsQueue) {
            for (i = 0; i < r.length; i++) r[i]();
            for (s in d) d[s].func || e.console.log("GSAP encountered missing dependency: com.greensock." + s)
        }
        u = !1
    }
})("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");

