var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (e, t, n) {
        var r = function (e) {
                var t, n = [],
                    r = e.length;
                for (t = 0; t !== r; n.push(e[t++]));
                return n
            },
            i = function (e, t, n) {
                var r, i, s = e.cycle;
                for (r in s) i = s[r],
                    e[r] = "function" == typeof i ? i.call(t[n], n) : i[n % i.length];
                delete e.cycle
            },
            s = function (e, t, r) {
                n.call(this, e, t, r),
                    this._cycle = 0,
                    this._yoyo = this.vars.yoyo === !0,
                    this._repeat = this.vars.repeat || 0,
                    this._repeatDelay = this.vars.repeatDelay || 0,
                    this._dirty = !0,
                    this.render = s.prototype.render
            },
            o = 1e-10,
            u = n._internals,
            a = u.isSelector,
            f = u.isArray,
            l = s.prototype = n.to({}, .1, {}),
            c = [];
        s.version = "1.18.2",
            l.constructor = s,
            l.kill()._gc = !1,
            s.killTweensOf = s.killDelayedCallsTo = n.killTweensOf,
            s.getTweensOf = n.getTweensOf,
            s.lagSmoothing = n.lagSmoothing,
            s.ticker = n.ticker,
            s.render = n.render,
            l.invalidate = function () {
                return this._yoyo = this.vars.yoyo === !0,
                    this._repeat = this.vars.repeat || 0,
                    this._repeatDelay = this.vars.repeatDelay || 0,
                    this._uncache(!0),
                    n.prototype.invalidate.call(this)
            },
            l.updateTo = function (e, t) {
                var r, i = this.ratio,
                    s = this.vars.immediateRender || e.immediateRender;
                t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                for (r in e) this.vars[r] = e[r];
                if (this._initted || s) if (t) this._initted = !1,
                s && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && n._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                    var o = this._totalTime;
                    this.render(0, !0, !1),
                        this._initted = !1,
                        this.render(o, !0, !1)
                } else if (this._initted = !1, this._init(), this._time > 0 || s) for (var u, a = 1 / (1 - i), f = this._firstPT; f;) u = f.s + f.c,
                    f.c *= a,
                    f.s = u - f.c,
                    f = f._next;
                return this
            },
            l.render = function (e, t, n) {
                this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                var r, i, s, a, f, l, c, h, p = this._dirty ? this.totalDuration() : this._totalDuration,
                    d = this._time,
                    v = this._totalTime,
                    m = this._cycle,
                    y = this._duration,
                    b = this._rawPrevTime;
                if (e >= p - 1e-7 ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = y, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, i = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === y && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (0 > b || 0 >= e && e >= -1e-7 || b === o && "isPause" !== this.data) && b !== e && (n = !0, b > o && (i = "onReverseComplete")), this._rawPrevTime = h = !t || e || b === e ? e : o)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== v || 0 === y && b > 0) && (i = "onReverseComplete", r = this._reversed), 0 > e && (this._active = !1, 0 === y && (this._initted || !this.vars.lazy || n) && (b >= 0 && (n = !0), this._rawPrevTime = h = !t || e || b === e ? e : o)), this._initted || (n = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (a = y + this._repeatDelay, this._cycle = this._totalTime / a >> 0, 0 !== this._cycle && this._cycle === this._totalTime / a && this._cycle--, this._time = this._totalTime - this._cycle * a, this._yoyo && 0 !== (1 & this._cycle) && (this._time = y - this._time), this._time > y ? this._time = y : this._time < 0 && (this._time = 0)), this._easeType ? (f = this._time / y, l = this._easeType, c = this._easePower, (1 === l || 3 === l && f >= .5) && (f = 1 - f), 3 === l && (f *= 2), 1 === c ? f *= f : 2 === c ? f *= f * f : 3 === c ? f *= f * f * f : 4 === c && (f *= f * f * f * f), 1 === l ? this.ratio = 1 - f : 2 === l ? this.ratio = f : this._time / y < .5 ? this.ratio = f / 2 : this.ratio = 1 - f / 2) : this.ratio = this._ease.getRatio(this._time / y)), d === this._time && !n && m === this._cycle) return void(v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = d,
                        this._totalTime = v,
                        this._rawPrevTime = b,
                        this._cycle = m,
                        u.lazyTweens.push(this),
                        void(this._lazy = [e, t]);
                    this._time && !r ? this.ratio = this._ease.getRatio(this._time / y) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== d && e >= 0 && (this._active = !0), 0 === v && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === y) && (t || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                    s = s._next;
                this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, n), t || (this._totalTime !== v || r) && this._callback("onUpdate")),
                this._cycle !== m && (t || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
                i && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this._callback(i), 0 === y && this._rawPrevTime === o && h !== o && (this._rawPrevTime = 0))
            },
            s.to = function (e, t, n) {
                return new s(e, t, n)
            },
            s.from = function (e, t, n) {
                return n.runBackwards = !0,
                    n.immediateRender = 0 != n.immediateRender,
                    new s(e, t, n)
            },
            s.fromTo = function (e, t, n, r) {
                return r.startAt = n,
                    r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender,
                    new s(e, t, r)
            },
            s.staggerTo = s.allTo = function (e, t, o, u, l, h, p) {
                u = u || 0;
                var d, v, m, g, y = 0,
                    b = [],
                    w = function () {
                        o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments),
                            l.apply(p || o.callbackScope || this, h || c)
                    },
                    E = o.cycle,
                    S = o.startAt && o.startAt.cycle;
                for (f(e) || ("string" == typeof e && (e = n.selector(e) || e), a(e) && (e = r(e))), e = e || [], 0 > u && (e = r(e), e.reverse(), u *= -1), d = e.length - 1, m = 0; d >= m; m++) {
                    v = {};
                    for (g in o) v[g] = o[g];
                    if (E && i(v, e, m), S) {
                        S = v.startAt = {};
                        for (g in o.startAt) S[g] = o.startAt[g];
                        i(v.startAt, e, m)
                    }
                    v.delay = y + (v.delay || 0),
                    m === d && l && (v.onComplete = w),
                        b[m] = new s(e[m], t, v),
                        y += u
                }
                return b
            },
            s.staggerFrom = s.allFrom = function (e, t, n, r, i, o, u) {
                return n.runBackwards = !0,
                    n.immediateRender = 0 != n.immediateRender,
                    s.staggerTo(e, t, n, r, i, o, u)
            },
            s.staggerFromTo = s.allFromTo = function (e, t, n, r, i, o, u, a) {
                return r.startAt = n,
                    r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender,
                    s.staggerTo(e, t, r, i, o, u, a)
            },
            s.delayedCall = function (e, t, n, r, i) {
                return new s(t, 0, {
                    delay: e,
                    onComplete: t,
                    onCompleteParams: n,
                    callbackScope: r,
                    onReverseComplete: t,
                    onReverseCompleteParams: n,
                    immediateRender: !1,
                    useFrames: i,
                    overwrite: 0
                })
            },
            s.set = function (e, t) {
                return new s(e, 0, t)
            },
            s.isTweening = function (e) {
                return n.getTweensOf(e, !0).length > 0
            };
        var h = function (e, t) {
                for (var r = [], i = 0, s = e._first; s;) s instanceof n ? r[i++] = s : (t && (r[i++] = s), r = r.concat(h(s, t)), i = r.length),
                    s = s._next;
                return r
            },
            p = s.getAllTweens = function (t) {
                return h(e._rootTimeline, t).concat(h(e._rootFramesTimeline, t))
            };
        s.killAll = function (e, n, r, i) {
            null == n && (n = !0),
            null == r && (r = !0);
            var s, o, u, a = p(0 != i),
                f = a.length,
                l = n && r && i;
            for (u = 0; f > u; u++) o = a[u],
            (l || o instanceof t || (s = o.target === o.vars.onComplete) && r || n && !s) && (e ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
        },
            s.killChildTweensOf = function (e, t) {
                if (null != e) {
                    var i, o, l, c, h, p = u.tweenLookup;
                    if ("string" == typeof e && (e = n.selector(e) || e), a(e) && (e = r(e)), f(e)) for (c = e.length; --c > -1;) s.killChildTweensOf(e[c], t);
                    else {
                        i = [];
                        for (l in p) for (o = p[l].target.parentNode; o;) o === e && (i = i.concat(p[l].tweens)),
                            o = o.parentNode;
                        for (h = i.length, c = 0; h > c; c++) t && i[c].totalTime(i[c].totalDuration()),
                            i[c]._enabled(!1, !1)
                    }
                }
            };
        var d = function (e, n, r, i) {
            n = n !== !1,
                r = r !== !1,
                i = i !== !1;
            for (var s, o, u = p(i), a = n && r && i, f = u.length; --f > -1;) o = u[f],
            (a || o instanceof t || (s = o.target === o.vars.onComplete) && r || n && !s) && o.paused(e)
        };
        return s.pauseAll = function (e, t, n) {
            d(!0, e, t, n)
        },
            s.resumeAll = function (e, t, n) {
                d(!1, e, t, n)
            },
            s.globalTimeScale = function (t) {
                var r = e._rootTimeline,
                    i = n.ticker.time;
                return arguments.length ? (t = t || o, r._startTime = i - (i - r._startTime) * r._timeScale / t, r = e._rootFramesTimeline, i = n.ticker.frame, r._startTime = i - (i - r._startTime) * r._timeScale / t, r._timeScale = e._rootTimeline._timeScale = t, t) : r._timeScale
            },
            l.progress = function (e) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
            },
            l.totalProgress = function (e) {
                return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
            },
            l.time = function (e, t) {
                return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
            },
            l.duration = function (t) {
                return arguments.length ? e.prototype.duration.call(this, t) : this._duration
            },
            l.totalDuration = function (e) {
                return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
            },
            l.repeat = function (e) {
                return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
            },
            l.repeatDelay = function (e) {
                return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
            },
            l.yoyo = function (e) {
                return arguments.length ? (this._yoyo = e, this) : this._yoyo
            },
            s
    }, !0),
        _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (e, t, n) {
            var r = function (e) {
                    t.call(this, e),
                        this._labels = {},
                        this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
                        this.smoothChildTiming = this.vars.smoothChildTiming === !0,
                        this._sortChildren = !0,
                        this._onUpdate = this.vars.onUpdate;
                    var n, r, i = this.vars;
                    for (r in i) n = i[r],
                    a(n) && -1 !== n.join("").indexOf("{self}") && (i[r] = this._swapSelfInParams(n));
                    a(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger)
                },
                i = 1e-10,
                s = n._internals,
                o = r._internals = {},
                u = s.isSelector,
                a = s.isArray,
                f = s.lazyTweens,
                l = s.lazyRender,
                c = _gsScope._gsDefine.globals,
                h = function (e) {
                    var t, n = {};
                    for (t in e) n[t] = e[t];
                    return n
                },
                p = function (e, t, n) {
                    var r, i, s = e.cycle;
                    for (r in s) i = s[r],
                        e[r] = "function" == typeof i ? i.call(t[n], n) : i[n % i.length];
                    delete e.cycle
                },
                d = o.pauseCallback = function () {
                },
                v = function (e) {
                    var t, n = [],
                        r = e.length;
                    for (t = 0; t !== r; n.push(e[t++]));
                    return n
                },
                m = r.prototype = new t;
            return r.version = "1.18.2",
                m.constructor = r,
                m.kill()._gc = m._forcingPlayhead = m._hasPause = !1,
                m.to = function (e, t, r, i) {
                    var s = r.repeat && c.TweenMax || n;
                    return t ? this.add(new s(e, t, r), i) : this.set(e, r, i)
                },
                m.from = function (e, t, r, i) {
                    return this.add((r.repeat && c.TweenMax || n).from(e, t, r), i)
                },
                m.fromTo = function (e, t, r, i, s) {
                    var o = i.repeat && c.TweenMax || n;
                    return t ? this.add(o.fromTo(e, t, r, i), s) : this.set(e, i, s)
                },
                m.staggerTo = function (e, t, i, s, o, a, f, l) {
                    var c, d, m = new r({
                            onComplete: a,
                            onCompleteParams: f,
                            callbackScope: l,
                            smoothChildTiming: this.smoothChildTiming
                        }),
                        g = i.cycle;
                    for ("string" == typeof e && (e = n.selector(e) || e), e = e || [], u(e) && (e = v(e)), s = s || 0, 0 > s && (e = v(e), e.reverse(), s *= -1), d = 0; d < e.length; d++) c = h(i),
                    c.startAt && (c.startAt = h(c.startAt), c.startAt.cycle && p(c.startAt, e, d)),
                    g && p(c, e, d),
                        m.to(e[d], t, c, d * s);
                    return this.add(m, o)
                },
                m.staggerFrom = function (e, t, n, r, i, s, o, u) {
                    return n.immediateRender = 0 != n.immediateRender,
                        n.runBackwards = !0,
                        this.staggerTo(e, t, n, r, i, s, o, u)
                },
                m.staggerFromTo = function (e, t, n, r, i, s, o, u, a) {
                    return r.startAt = n,
                        r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender,
                        this.staggerTo(e, t, r, i, s, o, u, a)
                },
                m.call = function (e, t, r, i) {
                    return this.add(n.delayedCall(0, e, t, r), i)
                },
                m.set = function (e, t, r) {
                    return r = this._parseTimeOrLabel(r, 0, !0),
                    null == t.immediateRender && (t.immediateRender = r === this._time && !this._paused),
                        this.add(new n(e, 0, t), r)
                },
                r.exportRoot = function (e, t) {
                    e = e || {},
                    null == e.smoothChildTiming && (e.smoothChildTiming = !0);
                    var i, s, o = new r(e),
                        u = o._timeline;
                    for (null == t && (t = !0), u._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = u._time, i = u._first; i;) s = i._next,
                    t && i instanceof n && i.target === i.vars.onComplete || o.add(i, i._startTime - i._delay),
                        i = s;
                    return u.add(o, 0),
                        o
                },
                m.add = function (i, s, o, u) {
                    var f, l, c, h, p, d;
                    if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, i)), !(i instanceof e)) {
                        if (i instanceof Array || i && i.push && a(i)) {
                            for (o = o || "normal", u = u || 0, f = s, l = i.length, c = 0; l > c; c++) a(h = i[c]) && (h = new r({
                                tweens: h
                            })),
                                this.add(h, f),
                            "string" != typeof h && "function" != typeof h && ("sequence" === o ? f = h._startTime + h.totalDuration() / h._timeScale : "start" === o && (h._startTime -= h.delay())),
                                f += u;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof i) return this.addLabel(i, s);
                        if ("function" != typeof i) throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
                        i = n.delayedCall(0, i)
                    }
                    if (t.prototype.add.call(this, i, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (p = this, d = p.rawTime() > i._startTime; p._timeline;) d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1),
                        p = p._timeline;
                    return this
                },
                m.remove = function (t) {
                    if (t instanceof e) {
                        this._remove(t, !1);
                        var n = t._timeline = t.vars.useFrames ? e._rootFramesTimeline : e._rootTimeline;
                        return t._startTime = (t._paused ? t._pauseTime : n._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale,
                            this
                    }
                    if (t instanceof Array || t && t.push && a(t)) {
                        for (var r = t.length; --r > -1;) this.remove(t[r]);
                        return this
                    }
                    return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
                },
                m._remove = function (e, n) {
                    t.prototype._remove.call(this, e, n);
                    var r = this._last;
                    return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
                        this
                },
                m.append = function (e, t) {
                    return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
                },
                m.insert = m.insertMultiple = function (e, t, n, r) {
                    return this.add(e, t || 0, n, r)
                },
                m.appendMultiple = function (e, t, n, r) {
                    return this.add(e, this._parseTimeOrLabel(null, t, !0, e), n, r)
                },
                m.addLabel = function (e, t) {
                    return this._labels[e] = this._parseTimeOrLabel(t),
                        this
                },
                m.addPause = function (e, t, r, i) {
                    var s = n.delayedCall(0, d, r, i || this);
                    return s.vars.onComplete = s.vars.onReverseComplete = t,
                        s.data = "isPause",
                        this._hasPause = !0,
                        this.add(s, e)
                },
                m.removeLabel = function (e) {
                    return delete this._labels[e],
                        this
                },
                m.getLabelTime = function (e) {
                    return null != this._labels[e] ? this._labels[e] : -1
                },
                m._parseTimeOrLabel = function (t, n, r, i) {
                    var s;
                    if (i instanceof e && i.timeline === this) this.remove(i);
                    else if (i && (i instanceof Array || i.push && a(i))) for (s = i.length; --s > -1;) i[s] instanceof e && i[s].timeline === this && this.remove(i[s]);
                    if ("string" == typeof n) return this._parseTimeOrLabel(n, r && "number" == typeof t && null == this._labels[n] ? t - this.duration() : 0, r);
                    if (n = n || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
                    else {
                        if (s = t.indexOf("="), -1 === s) return null == this._labels[t] ? r ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
                        n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)),
                            t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
                    }
                    return Number(t) + n
                },
                m.seek = function (e, t) {
                    return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
                },
                m.stop = function () {
                    return this.paused(!0)
                },
                m.gotoAndPlay = function (e, t) {
                    return this.play(e, t)
                },
                m.gotoAndStop = function (e, t) {
                    return this.pause(e, t)
                },
                m.render = function (e, t, n) {
                    this._gc && this._enabled(!0, !1);
                    var r, s, o, u, a, c, h, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        d = this._time,
                        v = this._startTime,
                        m = this._timeScale,
                        g = this._paused;
                    if (e >= p - 1e-7) this._totalTime = this._time = p,
                    this._reversed || this._hasPausedChild() || (s = !0, u = "onComplete", a = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= e && e >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === i) && this._rawPrevTime !== e && this._first && (a = !0, this._rawPrevTime > i && (u = "onReverseComplete"))),
                        this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i,
                        e = p + 1e-4;
                    else if (1e-7 > e) if (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== i && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (u = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1,
                        this._timeline.autoRemoveChildren && this._reversed ? (a = s = !0, u = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (a = !0),
                        this._rawPrevTime = e;
                    else {
                        if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, 0 === e && s) for (r = this._first; r && 0 === r._startTime;) r._duration || (s = !1),
                            r = r._next;
                        e = 0,
                        this._initted || (a = !0)
                    } else {
                        if (this._hasPause && !this._forcingPlayhead && !t) {
                            if (e >= d) for (r = this._first; r && r._startTime <= e && !c;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (c = r),
                                r = r._next;
                            else for (r = this._last; r && r._startTime >= e && !c;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (c = r),
                                r = r._prev;
                            c && (this._time = e = c._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = e
                    }
                    if (this._time !== d && this._first || n || a || c) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && e > 0 && (this._active = !0), 0 === d && this.vars.onStart && 0 !== this._time && (t || this._callback("onStart")), h = this._time, h >= d) for (r = this._first; r && (o = r._next, h === this._time && (!this._paused || g));)(r._active || r._startTime <= h && !r._paused && !r._gc) && (c === r && this.pause(), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)),
                            r = o;
                        else for (r = this._last; r && (o = r._prev, h === this._time && (!this._paused || g));) {
                            if (r._active || r._startTime <= d && !r._paused && !r._gc) {
                                if (c === r) {
                                    for (c = r._prev; c && c.endTime() > this._time;) c.render(c._reversed ? c.totalDuration() - (e - c._startTime) * c._timeScale : (e - c._startTime) * c._timeScale, t, n),
                                        c = c._prev;
                                    c = null,
                                        this.pause()
                                }
                                r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)
                            }
                            r = o
                        }
                        this._onUpdate && (t || (f.length && l(), this._callback("onUpdate"))),
                        u && (this._gc || (v === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (f.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[u] && this._callback(u)))
                    }
                },
                m._hasPausedChild = function () {
                    for (var e = this._first; e;) {
                        if (e._paused || e instanceof r && e._hasPausedChild()) return !0;
                        e = e._next
                    }
                    return !1
                },
                m.getChildren = function (e, t, r, i) {
                    i = i || -9999999999;
                    for (var s = [], o = this._first, u = 0; o;) o._startTime < i || (o instanceof n ? t !== !1 && (s[u++] = o) : (r !== !1 && (s[u++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, r)), u = s.length))),
                        o = o._next;
                    return s
                },
                m.getTweensOf = function (e, t) {
                    var r, i, s = this._gc,
                        o = [],
                        u = 0;
                    for (s && this._enabled(!0, !0), r = n.getTweensOf(e), i = r.length; --i > -1;)(r[i].timeline === this || t && this._contains(r[i])) && (o[u++] = r[i]);
                    return s && this._enabled(!1, !0),
                        o
                },
                m.recent = function () {
                    return this._recent
                },
                m._contains = function (e) {
                    for (var t = e.timeline; t;) {
                        if (t === this) return !0;
                        t = t.timeline
                    }
                    return !1
                },
                m.shiftChildren = function (e, t, n) {
                    n = n || 0;
                    for (var r, i = this._first, s = this._labels; i;) i._startTime >= n && (i._startTime += e),
                        i = i._next;
                    if (t) for (r in s) s[r] >= n && (s[r] += e);
                    return this._uncache(!0)
                },
                m._kill = function (e, t) {
                    if (!e && !t) return this._enabled(!1, !1);
                    for (var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), r = n.length, i = !1; --r > -1;) n[r]._kill(e, t) && (i = !0);
                    return i
                },
                m.clear = function (e) {
                    var t = this.getChildren(!1, !0, !0),
                        n = t.length;
                    for (this._time = this._totalTime = 0; --n > -1;) t[n]._enabled(!1, !1);
                    return e !== !1 && (this._labels = {}),
                        this._uncache(!0)
                },
                m.invalidate = function () {
                    for (var t = this._first; t;) t.invalidate(),
                        t = t._next;
                    return e.prototype.invalidate.call(this)
                },
                m._enabled = function (e, n) {
                    if (e === this._gc) for (var r = this._first; r;) r._enabled(e, !0),
                        r = r._next;
                    return t.prototype._enabled.call(this, e, n)
                },
                m.totalTime = function (t, n, r) {
                    this._forcingPlayhead = !0;
                    var i = e.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1,
                        i
                },
                m.duration = function (e) {
                    return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
                },
                m.totalDuration = function (e) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var t, n, r = 0, i = this._last, s = 999999999999; i;) t = i._prev,
                            i._dirty && i.totalDuration(),
                                i._startTime > s && this._sortChildren && !i._paused ? this.add(i, i._startTime - i._delay) : s = i._startTime,
                            i._startTime < 0 && !i._paused && (r -= i._startTime, this._timeline.smoothChildTiming && (this._startTime += i._startTime / this._timeScale), this.shiftChildren(-i._startTime, !1, -9999999999), s = 0),
                                n = i._startTime + i._totalDuration / i._timeScale,
                            n > r && (r = n),
                                i = t;
                            this._duration = this._totalDuration = r,
                                this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
                },
                m.paused = function (t) {
                    if (!t) for (var n = this._first, r = this._time; n;) n._startTime === r && "isPause" === n.data && (n._rawPrevTime = 0),
                        n = n._next;
                    return e.prototype.paused.apply(this, arguments)
                },
                m.usesFrames = function () {
                    for (var t = this._timeline; t._timeline;) t = t._timeline;
                    return t === e._rootFramesTimeline
                },
                m.rawTime = function () {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                },
                r
        }, !0),
        _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (e, t, n) {
            var r = function (t) {
                    e.call(this, t),
                        this._repeat = this.vars.repeat || 0,
                        this._repeatDelay = this.vars.repeatDelay || 0,
                        this._cycle = 0,
                        this._yoyo = this.vars.yoyo === !0,
                        this._dirty = !0
                },
                i = 1e-10,
                s = t._internals,
                o = s.lazyTweens,
                u = s.lazyRender,
                a = new n(null, null, 1, 0),
                f = r.prototype = new e;
            return f.constructor = r,
                f.kill()._gc = !1,
                r.version = "1.18.2",
                f.invalidate = function () {
                    return this._yoyo = this.vars.yoyo === !0,
                        this._repeat = this.vars.repeat || 0,
                        this._repeatDelay = this.vars.repeatDelay || 0,
                        this._uncache(!0),
                        e.prototype.invalidate.call(this)
                },
                f.addCallback = function (e, n, r, i) {
                    return this.add(t.delayedCall(0, e, r, i), n)
                },
                f.removeCallback = function (e, t) {
                    if (e) if (null == t) this._kill(null, e);
                    else for (var n = this.getTweensOf(e, !1), r = n.length, i = this._parseTimeOrLabel(t); --r > -1;) n[r]._startTime === i && n[r]._enabled(!1, !1);
                    return this
                },
                f.removePause = function (t) {
                    return this.removeCallback(e._internals.pauseCallback, t)
                },
                f.tweenTo = function (e, n) {
                    n = n || {};
                    var r, i, s, o = {
                        ease: a,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    };
                    for (i in n) o[i] = n[i];
                    return o.time = this._parseTimeOrLabel(e),
                        r = Math.abs(Number(o.time) - this._time) / this._timeScale || .001,
                        s = new t(this, r, o),
                        o.onStart = function () {
                            s.target.paused(!0),
                            s.vars.time !== s.target.time() && r === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale),
                            n.onStart && s._callback("onStart")
                        },
                        s
                },
                f.tweenFromTo = function (e, t, n) {
                    n = n || {},
                        e = this._parseTimeOrLabel(e),
                        n.startAt = {
                            onComplete: this.seek,
                            onCompleteParams: [e],
                            callbackScope: this
                        },
                        n.immediateRender = n.immediateRender !== !1;
                    var r = this.tweenTo(t, n);
                    return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
                },
                f.render = function (e, t, n) {
                    this._gc && this._enabled(!0, !1);
                    var r, s, a, f, l, c, p, d, v = this._dirty ? this.totalDuration() : this._totalDuration,
                        m = this._duration,
                        y = this._time,
                        b = this._totalTime,
                        w = this._startTime,
                        E = this._timeScale,
                        S = this._rawPrevTime,
                        x = this._paused,
                        T = this._cycle;
                    if (e >= v - 1e-7) this._locked || (this._totalTime = v, this._cycle = this._repeat),
                    this._reversed || this._hasPausedChild() || (s = !0, f = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= e && e >= -1e-7 || 0 > S || S === i) && S !== e && this._first && (l = !0, S > i && (f = "onReverseComplete"))),
                        this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i,
                        this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = m, e = m + 1e-4);
                    else if (1e-7 > e) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== y || 0 === m && S !== i && (S > 0 || 0 > e && S >= 0) && !this._locked) && (f = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1,
                        this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, f = "onReverseComplete") : S >= 0 && this._first && (l = !0),
                        this._rawPrevTime = e;
                    else {
                        if (this._rawPrevTime = m || !t || e || this._rawPrevTime === e ? e : i, 0 === e && s) for (r = this._first; r && 0 === r._startTime;) r._duration || (s = !1),
                            r = r._next;
                        e = 0,
                        this._initted || (l = !0)
                    } else if (0 === m && 0 > S && (l = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (c = m + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, e = m + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)), this._hasPause && !this._forcingPlayhead && !t) {
                        if (e = this._time, e >= y) for (r = this._first; r && r._startTime <= e && !p;) r._duration || "isPause" !== r.data || r.ratio || 0 === r._startTime && 0 === this._rawPrevTime || (p = r),
                            r = r._next;
                        else for (r = this._last; r && r._startTime >= e && !p;) r._duration || "isPause" === r.data && r._rawPrevTime > 0 && (p = r),
                            r = r._prev;
                        p && (this._time = e = p._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== T && !this._locked) {
                        var N = this._yoyo && 0 !== (1 & T),
                            C = N === (this._yoyo && 0 !== (1 & this._cycle)),
                            k = this._totalTime,
                            L = this._cycle,
                            A = this._rawPrevTime,
                            O = this._time;
                        if (this._totalTime = T * m, this._cycle < T ? N = !N : this._totalTime += m, this._time = y, this._rawPrevTime = 0 === m ? S - 1e-4 : S, this._cycle = T, this._locked = !0, y = N ? 0 : m, this.render(y, t, 0 === m), t || this._gc || this.vars.onRepeat && this._callback("onRepeat"), y !== this._time) return;
                        if (C && (y = N ? m + 1e-4 : -0.0001, this.render(y, !0, !1)), this._locked = !1, this._paused && !x) return;
                        this._time = O,
                            this._totalTime = k,
                            this._cycle = L,
                            this._rawPrevTime = A
                    }
                    if (!(this._time !== y && this._first || n || l || p)) return void(b !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== b && e > 0 && (this._active = !0), 0 === b && this.vars.onStart && 0 !== this._totalTime && (t || this._callback("onStart")), d = this._time, d >= y) for (r = this._first; r && (a = r._next, d === this._time && (!this._paused || x));)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (p === r && this.pause(), r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)),
                        r = a;
                    else for (r = this._last; r && (a = r._prev, d === this._time && (!this._paused || x));) {
                        if (r._active || r._startTime <= y && !r._paused && !r._gc) {
                            if (p === r) {
                                for (p = r._prev; p && p.endTime() > this._time;) p.render(p._reversed ? p.totalDuration() - (e - p._startTime) * p._timeScale : (e - p._startTime) * p._timeScale, t, n),
                                    p = p._prev;
                                p = null,
                                    this.pause()
                            }
                            r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)
                        }
                        r = a
                    }
                    this._onUpdate && (t || (o.length && u(), this._callback("onUpdate"))),
                    f && (this._locked || this._gc || (w === this._startTime || E !== this._timeScale) && (0 === this._time || v >= this.totalDuration()) && (s && (o.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[f] && this._callback(f)))
                },
                f.getActive = function (e, t, n) {
                    null == e && (e = !0),
                    null == t && (t = !0),
                    null == n && (n = !1);
                    var r, i, s = [],
                        o = this.getChildren(e, t, n),
                        u = 0,
                        a = o.length;
                    for (r = 0; a > r; r++) i = o[r],
                    i.isActive() && (s[u++] = i);
                    return s
                },
                f.getLabelAfter = function (e) {
                    e || 0 !== e && (e = this._time);
                    var t, n = this.getLabelsArray(),
                        r = n.length;
                    for (t = 0; r > t; t++) if (n[t].time > e) return n[t].name;
                    return null
                },
                f.getLabelBefore = function (e) {
                    null == e && (e = this._time);
                    for (var t = this.getLabelsArray(), n = t.length; --n > -1;) if (t[n].time < e) return t[n].name;
                    return null
                },
                f.getLabelsArray = function () {
                    var e, t = [],
                        n = 0;
                    for (e in this._labels) t[n++] = {
                        time: this._labels[e],
                        name: e
                    };
                    return t.sort(function (e, t) {
                        return e.time - t.time
                    }),
                        t
                },
                f.progress = function (e, t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
                },
                f.totalProgress = function (e, t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
                },
                f.totalDuration = function (t) {
                    return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                },
                f.time = function (e, t) {
                    return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
                },
                f.repeat = function (e) {
                    return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
                },
                f.repeatDelay = function (e) {
                    return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
                },
                f.yoyo = function (e) {
                    return arguments.length ? (this._yoyo = e, this) : this._yoyo
                },
                f.currentLabel = function (e) {
                    return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
                },
                r
        }, !0),


        function () {
            var e = 180 / Math.PI,
                t = [],
                n = [],
                r = [],
                i = {},
                s = _gsScope._gsDefine.globals,
                o = function (e, t, n, r) {
                    this.a = e,
                        this.b = t,
                        this.c = n,
                        this.d = r,
                        this.da = r - e,
                        this.ca = n - e,
                        this.ba = t - e
                },
                u = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                a = function (e, t, n, r) {
                    var i = {
                            a: e
                        },
                        s = {},
                        o = {},
                        u = {
                            c: r
                        },
                        a = (e + t) / 2,
                        f = (t + n) / 2,
                        l = (n + r) / 2,
                        c = (a + f) / 2,
                        h = (f + l) / 2,
                        p = (h - c) / 8;
                    return i.b = a + (e - a) / 4,
                        s.b = c + p,
                        i.c = s.a = (i.b + s.b) / 2,
                        s.c = o.a = (c + h) / 2,
                        o.b = h - p,
                        u.b = l + (r - l) / 4,
                        o.c = u.a = (o.b + u.b) / 2,
                        [i, s, o, u]
                },
                f = function (e, i, s, o, u) {
                    var f, l, c, h, p, d, v, m, g, y, w, E, S, x = e.length - 1,
                        T = 0,
                        N = e[0].a;
                    for (f = 0; x > f; f++) p = e[T],
                        l = p.a,
                        c = p.d,
                        h = e[T + 1].d,
                        u ? (w = t[f], E = n[f], S = (E + w) * i * .25 / (o ? .5 : r[f] || .5), d = c - (c - l) * (o ? .5 * i : 0 !== w ? S / w : 0), v = c + (h - c) * (o ? .5 * i : 0 !== E ? S / E : 0), m = c - (d + ((v - d) * (3 * w / (w + E) + .5) / 4 || 0))) : (d = c - (c - l) * i * .5, v = c + (h - c) * i * .5, m = c - (d + v) / 2),
                        d += m,
                        v += m,
                        p.c = g = d,
                        0 !== f ? p.b = N : p.b = N = p.a + .6 * (p.c - p.a),
                        p.da = c - l,
                        p.ca = g - l,
                        p.ba = N - l,
                        s ? (y = a(l, N, g, c), e.splice(T, 1, y[0], y[1], y[2], y[3]), T += 4) : T++,
                        N = v;
                    p = e[T],
                        p.b = N,
                        p.c = N + .4 * (p.d - N),
                        p.da = p.d - p.a,
                        p.ca = p.c - p.a,
                        p.ba = N - p.a,
                    s && (y = a(p.a, N, p.c, p.d), e.splice(T, 1, y[0], y[1], y[2], y[3]))
                },
                l = function (e, r, i, s) {
                    var u, a, f, l, c, h, p = [];
                    if (s) for (e = [s].concat(e), a = e.length; --a > -1;)"string" == typeof(h = e[a][r]) && "=" === h.charAt(1) && (e[a][r] = s[r] + Number(h.charAt(0) + h.substr(2)));
                    if (u = e.length - 2, 0 > u) return p[0] = new o(e[0][r], 0, 0, e[-1 > u ? 0 : 1][r]),
                        p;
                    for (a = 0; u > a; a++) f = e[a][r],
                        l = e[a + 1][r],
                        p[a] = new o(f, 0, 0, l),
                    i && (c = e[a + 2][r], t[a] = (t[a] || 0) + (l - f) * (l - f), n[a] = (n[a] || 0) + (c - l) * (c - l));
                    return p[a] = new o(e[a][r], 0, 0, e[a + 1][r]),
                        p
                },
                c = function (e, s, o, a, c, h) {
                    var p, d, v, m, g, y, w, E, S = {},
                        x = [],
                        T = h || e[0];
                    c = "string" == typeof c ? "," + c + "," : u,
                    null == s && (s = 1);
                    for (d in e[0]) x.push(d);
                    if (e.length > 1) {
                        for (E = e[e.length - 1], w = !0, p = x.length; --p > -1;) if (d = x[p], Math.abs(T[d] - E[d]) > .05) {
                            w = !1;
                            break
                        }
                        w && (e = e.concat(), h && e.unshift(h), e.push(e[1]), h = e[e.length - 3])
                    }
                    for (t.length = n.length = r.length = 0, p = x.length; --p > -1;) d = x[p],
                        i[d] = -1 !== c.indexOf("," + d + ","),
                        S[d] = l(e, d, i[d], h);
                    for (p = t.length; --p > -1;) t[p] = Math.sqrt(t[p]),
                        n[p] = Math.sqrt(n[p]);
                    if (!a) {
                        for (p = x.length; --p > -1;) if (i[d]) for (v = S[x[p]], y = v.length - 1, m = 0; y > m; m++) g = v[m + 1].da / n[m] + v[m].da / t[m],
                            r[m] = (r[m] || 0) + g * g;
                        for (p = r.length; --p > -1;) r[p] = Math.sqrt(r[p])
                    }
                    for (p = x.length, m = o ? 4 : 1; --p > -1;) d = x[p],
                        v = S[d],
                        f(v, s, o, a, i[d]),
                    w && (v.splice(0, m), v.splice(v.length - m, m));
                    return S
                },
                h = function (e, t, n) {
                    t = t || "soft";
                    var r, i, s, u, a, f, l, c, h, p, d, v = {},
                        m = "cubic" === t ? 3 : 2,
                        y = "soft" === t,
                        b = [];
                    if (y && n && (e = [n].concat(e)), null == e || e.length < m + 1) throw "invalid Bezier data";
                    for (h in e[0]) b.push(h);
                    for (f = b.length; --f > -1;) {
                        for (h = b[f], v[h] = a = [], p = 0, c = e.length, l = 0; c > l; l++) r = null == n ? e[l][h] : "string" == typeof(d = e[l][h]) && "=" === d.charAt(1) ? n[h] + Number(d.charAt(0) + d.substr(2)) : Number(d),
                        y && l > 1 && c - 1 > l && (a[p++] = (r + a[p - 2]) / 2),
                            a[p++] = r;
                        for (c = p - m + 1, p = 0, l = 0; c > l; l += m) r = a[l],
                            i = a[l + 1],
                            s = a[l + 2],
                            u = 2 === m ? 0 : a[l + 3],
                            a[p++] = d = 3 === m ? new o(r, i, s, u) : new o(r, (2 * i + r) / 3, (2 * i + s) / 3, s);
                        a.length = p
                    }
                    return v
                },
                p = function (e, t, n) {
                    for (var r, i, s, o, u, a, f, l, c, h, p, d = 1 / n, v = e.length; --v > -1;) for (h = e[v], s = h.a, o = h.d - s, u = h.c - s, a = h.b - s, r = i = 0, l = 1; n >= l; l++) f = d * l,
                        c = 1 - f,
                        r = i - (i = (f * f * o + 3 * c * (f * u + c * a)) * f),
                        p = v * n + l - 1,
                        t[p] = (t[p] || 0) + r * r
                },
                d = function (e, t) {
                    t = t >> 0 || 6;
                    var n, r, i, s, o = [],
                        u = [],
                        a = 0,
                        f = 0,
                        l = t - 1,
                        c = [],
                        h = [];
                    for (n in e) p(e[n], o, t);
                    for (i = o.length, r = 0; i > r; r++) a += Math.sqrt(o[r]),
                        s = r % t,
                        h[s] = a,
                    s === l && (f += a, s = r / t >> 0, c[s] = h, u[s] = f, a = 0, h = []);
                    return {
                        length: f,
                        lengths: u,
                        segments: c
                    }
                },
                v = _gsScope._gsDefine.plugin({
                    propName: "bezier",
                    priority: -1,
                    version: "1.3.4",
                    API: 2,
                    global: !0,
                    init: function (e, t, n) {
                        this._target = e,
                        t instanceof Array && (t = {
                            values: t
                        }),
                            this._func = {},
                            this._round = {},
                            this._props = [],
                            this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                        var r, i, s, o, u, a = t.values || [],
                            f = {},
                            l = a[0],
                            p = t.autoRotate || n.vars.orientToBezier;
                        this._autoRotate = p ? p instanceof Array ? p : [
                                    ["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]
                                ] : null;
                        for (r in l) this._props.push(r);
                        for (s = this._props.length; --s > -1;) r = this._props[s],
                            this._overwriteProps.push(r),
                            i = this._func[r] = "function" == typeof e[r],
                            f[r] = i ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]),
                        u || f[r] !== a[0][r] && (u = f);
                        if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? c(a, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, u) : h(a, t.type, f), this._segCount = this._beziers[r].length, this._timeRes) {
                            var v = d(this._beziers, this._timeRes);
                            this._length = v.length,
                                this._lengths = v.lengths,
                                this._segments = v.segments,
                                this._l1 = this._li = this._s1 = this._si = 0,
                                this._l2 = this._lengths[0],
                                this._curSeg = this._segments[0],
                                this._s2 = this._curSeg[0],
                                this._prec = 1 / this._curSeg.length
                        }
                        if (p = this._autoRotate) for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1;) {
                            for (o = 0; 3 > o; o++) r = p[s][o],
                                this._func[r] = "function" == typeof e[r] ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)] : !1;
                            r = p[s][2],
                                this._initialRotations[s] = this._func[r] ? this._func[r].call(this._target) : this._target[r]
                        }
                        return this._startRatio = n.vars.runBackwards ? 1 : 0,
                            !0
                    },
                    set: function (t) {
                        var n, r, i, s, o, u, a, f, l, c, h = this._segCount,
                            p = this._func,
                            d = this._target,
                            v = t !== this._startRatio;
                        if (this._timeRes) {
                            if (l = this._lengths, c = this._curSeg, t *= this._length, i = this._li, t > this._l2 && h - 1 > i) {
                                for (f = h - 1; f > i && (this._l2 = l[++i]) <= t;);
                                this._l1 = l[i - 1],
                                    this._li = i,
                                    this._curSeg = c = this._segments[i],
                                    this._s2 = c[this._s1 = this._si = 0]
                            } else if (t < this._l1 && i > 0) {
                                for (; i > 0 && (this._l1 = l[--i]) >= t;);
                                0 === i && t < this._l1 ? this._l1 = 0 : i++,
                                    this._l2 = l[i],
                                    this._li = i,
                                    this._curSeg = c = this._segments[i],
                                    this._s1 = c[(this._si = c.length - 1) - 1] || 0,
                                    this._s2 = c[this._si]
                            }
                            if (n = i, t -= this._l1, i = this._si, t > this._s2 && i < c.length - 1) {
                                for (f = c.length - 1; f > i && (this._s2 = c[++i]) <= t;);
                                this._s1 = c[i - 1],
                                    this._si = i
                            } else if (t < this._s1 && i > 0) {
                                for (; i > 0 && (this._s1 = c[--i]) >= t;);
                                0 === i && t < this._s1 ? this._s1 = 0 : i++,
                                    this._s2 = c[i],
                                    this._si = i
                            }
                            u = (i + (t - this._s1) / (this._s2 - this._s1)) * this._prec
                        } else n = 0 > t ? 0 : t >= 1 ? h - 1 : h * t >> 0,
                            u = (t - n * (1 / h)) * h;
                        for (r = 1 - u, i = this._props.length; --i > -1;) s = this._props[i],
                            o = this._beziers[s][n],
                            a = (u * u * o.da + 3 * r * (u * o.ca + r * o.ba)) * u + o.a,
                        this._round[s] && (a = Math.round(a)),
                            p[s] ? d[s](a) : d[s] = a;
                        if (this._autoRotate) {
                            var m, g, y, b, w, E, S, x = this._autoRotate;
                            for (i = x.length; --i > -1;) s = x[i][2],
                                E = x[i][3] || 0,
                                S = x[i][4] === !0 ? 1 : e,
                                o = this._beziers[x[i][0]],
                                m = this._beziers[x[i][1]],
                            o && m && (o = o[n], m = m[n], g = o.a + (o.b - o.a) * u, b = o.b + (o.c - o.b) * u, g += (b - g) * u, b += (o.c + (o.d - o.c) * u - b) * u, y = m.a + (m.b - m.a) * u, w = m.b + (m.c - m.b) * u, y += (w - y) * u, w += (m.c + (m.d - m.c) * u - w) * u, a = v ? Math.atan2(w - y, b - g) * S + E : this._initialRotations[i], p[s] ? d[s](a) : d[s] = a)
                        }
                    }
                }),
                m = v.prototype;
            v.bezierThrough = c,
                v.cubicToQuadratic = a,
                v._autoCSS = !0,
                v.quadraticToCubic = function (e, t, n) {
                    return new o(e, (2 * t + e) / 3, (2 * t + n) / 3, n)
                },
                v._cssRegister = function () {
                    var e = s.CSSPlugin;
                    if (e) {
                        var t = e._internals,
                            n = t._parseToProxy,
                            r = t._setPluginRatio,
                            i = t.CSSPropTween;
                        t._registerComplexSpecialProp("bezier", {
                            parser: function (e, t, s, o, u, a) {
                                t instanceof Array && (t = {
                                    values: t
                                }),
                                    a = new v;
                                var f, l, c, h = t.values,
                                    p = h.length - 1,
                                    d = [],
                                    m = {};
                                if (0 > p) return u;
                                for (f = 0; p >= f; f++) c = n(e, h[f], o, u, a, p !== f),
                                    d[f] = c.end;
                                for (l in t) m[l] = t[l];
                                return m.values = d,
                                    u = new i(e, "bezier", 0, 0, c.pt, 2),
                                    u.data = c,
                                    u.plugin = a,
                                    u.setRatio = r,
                                0 === m.autoRotate && (m.autoRotate = !0),
                                !m.autoRotate || m.autoRotate instanceof Array || (f = m.autoRotate === !0 ? 0 : Number(m.autoRotate), m.autoRotate = null != c.end.left ? [
                                        ["left", "top", "rotation", f, !1]
                                    ] : null != c.end.x ? [
                                            ["x", "y", "rotation", f, !1]
                                        ] : !1),
                                m.autoRotate && (o._transform || o._enableTransforms(!1), c.autoRotate = o._target._gsTransform),
                                    a._onInitTween(c.proxy, m, o._tween),
                                    u
                            }
                        })
                    }
                },
                m._roundProps = function (e, t) {
                    for (var n = this._overwriteProps, r = n.length; --r > -1;)(e[n[r]] || e.bezier || e.bezierThrough) && (this._round[n[r]] = t)
                },
                m._kill = function (e) {
                    var t, n, r = this._props;
                    for (t in this._beziers) if (t in e) for (delete this._beziers[t], delete this._func[t], n = r.length; --n > -1;) r[n] === t && r.splice(n, 1);
                    return this._super._kill.call(this, e)
                }
        }(),
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (e, t) {
            var n, r, i, s, o = function () {
                    e.call(this, "css"),
                        this._overwriteProps.length = 0,
                        this.setRatio = o.prototype.setRatio
                },
                u = _gsScope._gsDefine.globals,
                a = {},
                f = o.prototype = new e("css");
            f.constructor = o,
                o.version = "1.18.2",
                o.API = 2,
                o.defaultTransformPerspective = 0,
                o.defaultSkewType = "compensated",
                o.defaultSmoothOrigin = !0,
                f = "px",
                o.suffixMap = {
                    top: f,
                    right: f,
                    bottom: f,
                    left: f,
                    width: f,
                    height: f,
                    fontSize: f,
                    padding: f,
                    margin: f,
                    perspective: f,
                    lineHeight: ""
                };
            var l, c, h, p, d, v, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                w = /(?:\d|\-|\+|=|#|\.)*/g,
                E = /opacity *= *([^)]*)/i,
                S = /opacity:([^;]*)/i,
                x = /alpha\(opacity *=.+?\)/i,
                T = /^(rgb|hsl)/,
                N = /([A-Z])/g,
                C = /-([a-z])/gi,
                k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                L = function (e, t) {
                    return t.toUpperCase()
                },
                A = /(?:Left|Right|Width)/i,
                O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                _ = /,(?=[^\)]*(?:\(|$))/gi,
                D = Math.PI / 180,
                P = 180 / Math.PI,
                H = {},
                B = document,
                j = function (e) {
                    return B.createElementNS ? B.createElementNS("http://www.w3.org/1999/xhtml", e) : B.createElement(e)
                },
                F = j("div"),
                I = j("img"),
                q = o._internals = {
                    _specialProps: a
                },
                R = navigator.userAgent,
                U = function () {
                    var e = R.indexOf("Android"),
                        t = j("a");
                    return h = -1 !== R.indexOf("Safari") && -1 === R.indexOf("Chrome") && (-1 === e || Number(R.substr(e + 8, 1)) > 3),
                        d = h && Number(R.substr(R.indexOf("Version/") + 8, 1)) < 6,
                        p = -1 !== R.indexOf("Firefox"),
                    (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(R) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(R)) && (v = parseFloat(RegExp.$1)),
                        t ? (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity)) : !1
                }(),
                z = function (e) {
                    return E.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                W = function (e) {
                    window.console && console.log(e)
                },
                X = "",
                V = "",
                $ = function (e, t) {
                    t = t || F;
                    var n, r, i = t.style;
                    if (void 0 !== i[e]) return e;
                    for (e = e.charAt(0).toUpperCase() + e.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === i[n[r] + e];);
                    return r >= 0 ? (V = 3 === r ? "ms" : n[r], X = "-" + V.toLowerCase() + "-", V + e) : null
                },
                J = B.defaultView ? B.defaultView.getComputedStyle : function () {
                    },
                K = o.getStyle = function (e, t, n, r, i) {
                    var s;
                    return U || "opacity" !== t ? (!r && e.style[t] ? s = e.style[t] : (n = n || J(e)) ? s = n[t] || n.getPropertyValue(t) || n.getPropertyValue(t.replace(N, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == i || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : i) : z(e)
                },
                Q = q.convertToPixels = function (e, n, r, i, s) {
                    if ("px" === i || !i) return r;
                    if ("auto" === i || !r) return 0;
                    var u, a, f, l = A.test(n),
                        c = e,
                        h = F.style,
                        p = 0 > r;
                    if (p && (r = -r), "%" === i && -1 !== n.indexOf("border")) u = r / 100 * (l ? e.clientWidth : e.clientHeight);
                    else {
                        if (h.cssText = "border:0 solid red;position:" + K(e, "position") + ";line-height:0;", "%" !== i && c.appendChild && "v" !== i.charAt(0) && "rem" !== i) h[l ? "borderLeftWidth" : "borderTopWidth"] = r + i;
                        else {
                            if (c = e.parentNode || B.body, a = c._gsCache, f = t.ticker.frame, a && l && a.time === f) return a.width * r / 100;
                            h[l ? "width" : "height"] = r + i
                        }
                        c.appendChild(F),
                            u = parseFloat(F[l ? "offsetWidth" : "offsetHeight"]),
                            c.removeChild(F),
                        l && "%" === i && o.cacheWidths !== !1 && (a = c._gsCache = c._gsCache || {}, a.time = f, a.width = u / r * 100),
                        0 !== u || s || (u = Q(e, n, r, i, !0))
                    }
                    return p ? -u : u
                },
                G = q.calculateOffset = function (e, t, n) {
                    if ("absolute" !== K(e, "position", n)) return 0;
                    var r = "left" === t ? "Left" : "Top",
                        i = K(e, "margin" + r, n);
                    return e["offset" + r] - (Q(e, t, parseFloat(i), i.replace(w, "")) || 0)
                },
                Y = function (e, t) {
                    var n, r, i, s = {};
                    if (t = t || J(e, null)) if (n = t.length) for (; --n > -1;) i = t[n],
                    (-1 === i.indexOf("-transform") || Nt === i) && (s[i.replace(C, L)] = t.getPropertyValue(i));
                    else for (n in t)(-1 === n.indexOf("Transform") || Tt === n) && (s[n] = t[n]);
                    else if (t = e.currentStyle || e.style) for (n in t)"string" == typeof n && void 0 === s[n] && (s[n.replace(C, L)] = t[n]);
                    return U || (s.opacity = z(e)),
                        r = jt(e, t, !1),
                        s.rotation = r.rotation,
                        s.skewX = r.skewX,
                        s.scaleX = r.scaleX,
                        s.scaleY = r.scaleY,
                        s.x = r.x,
                        s.y = r.y,
                    kt && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ),
                    s.filters && delete s.filters,
                        s
                },
                Z = function (e, t, n, r, i) {
                    var s, o, u, a = {},
                        f = e.style;
                    for (o in n)"cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = n[o]) || i && i[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (a[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(b, "") ? s : 0 : G(e, o), void 0 !== f[o] && (u = new dt(f, o, f[o], u)));
                    if (r) for (o in r)"className" !== o && (a[o] = r[o]);
                    return {
                        difs: a,
                        firstMPT: u
                    }
                },
                et = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                tt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                nt = function (e, t, n) {
                    var r = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                        i = et[t],
                        s = i.length;
                    for (n = n || J(e, null); --s > -1;) r -= parseFloat(K(e, "padding" + i[s], n, !0)) || 0,
                        r -= parseFloat(K(e, "border" + i[s] + "Width", n, !0)) || 0;
                    return r
                },
                rt = function (e, t) {
                    if ("contain" === e || "auto" === e || "auto auto" === e) return e + " ";
                    (null == e || "" === e) && (e = "0 0");
                    var n = e.split(" "),
                        r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
                        i = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
                    return null == i ? i = "center" === r ? "50%" : "0" : "center" === i && (i = "50%"),
                    ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"),
                        e = r + " " + i + (n.length > 2 ? " " + n[2] : ""),
                    t && (t.oxp = -1 !== r.indexOf("%"), t.oyp = -1 !== i.indexOf("%"), t.oxr = "=" === r.charAt(1), t.oyr = "=" === i.charAt(1), t.ox = parseFloat(r.replace(b, "")), t.oy = parseFloat(i.replace(b, "")), t.v = e),
                    t || e
                },
                it = function (e, t) {
                    return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
                },
                st = function (e, t) {
                    return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e)
                },
                ot = function (e, t, n, r) {
                    var i, s, o, u, a, f = 1e-6;
                    return null == e ? u = t : "number" == typeof e ? u = e : (i = 360, s = e.split("_"), a = "=" === e.charAt(1), o = (a ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : P) - (a ? 0 : t), s.length && (r && (r[n] = t + o), -1 !== e.indexOf("short") && (o %= i, o !== o % (i / 2) && (o = 0 > o ? o + i : o - i)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * i) % i - (o / i | 0) * i : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * i) % i - (o / i | 0) * i)), u = t + o),
                    f > u && u > -f && (u = 0),
                        u
                },
                ut = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                at = function (e, t, n) {
                    return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e,
                    255 * (1 > 6 * e ? t + (n - t) * e * 6 : .5 > e ? n : 2 > 3 * e ? t + (n - t) * (2 / 3 - e) * 6 : t) + .5 | 0
                },
                ft = o.parseColor = function (e, t) {
                    var n, r, i, s, o, u, a, f, l, c, h;
                    if (e) if ("number" == typeof e) n = [e >> 16, e >> 8 & 255, 255 & e];
                    else {
                        if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), ut[e]) n = ut[e];
                        else if ("#" === e.charAt(0)) 4 === e.length && (r = e.charAt(1), i = e.charAt(2), s = e.charAt(3), e = "#" + r + r + i + i + s + s),
                            e = parseInt(e.substr(1), 16),
                            n = [e >> 16, e >> 8 & 255, 255 & e];
                        else if ("hsl" === e.substr(0, 3)) if (n = h = e.match(m), t) {
                            if (-1 !== e.indexOf("=")) return e.match(g)
                        } else o = Number(n[0]) % 360 / 360,
                            u = Number(n[1]) / 100,
                            a = Number(n[2]) / 100,
                            i = .5 >= a ? a * (u + 1) : a + u - a * u,
                            r = 2 * a - i,
                        n.length > 3 && (n[3] = Number(e[3])),
                            n[0] = at(o + 1 / 3, r, i),
                            n[1] = at(o, r, i),
                            n[2] = at(o - 1 / 3, r, i);
                        else n = e.match(m) || ut.transparent;
                        n[0] = Number(n[0]),
                            n[1] = Number(n[1]),
                            n[2] = Number(n[2]),
                        n.length > 3 && (n[3] = Number(n[3]))
                    } else n = ut.black;
                    return t && !h && (r = n[0] / 255, i = n[1] / 255, s = n[2] / 255, f = Math.max(r, i, s), l = Math.min(r, i, s), a = (f + l) / 2, f === l ? o = u = 0 : (c = f - l, u = a > .5 ? c / (2 - f - l) : c / (f + l), o = f === r ? (i - s) / c + (s > i ? 6 : 0) : f === i ? (s - r) / c + 2 : (r - i) / c + 4, o *= 60), n[0] = o + .5 | 0, n[1] = 100 * u + .5 | 0, n[2] = 100 * a + .5 | 0),
                        n
                },
                lt = function (e, t) {
                    var n, r, i, s = e.match(ct) || [],
                        o = 0,
                        u = s.length ? "" : e;
                    for (n = 0; n < s.length; n++) r = s[n],
                        i = e.substr(o, e.indexOf(r, o) - o),
                        o += i.length + r.length,
                        r = ft(r, t),
                    3 === r.length && r.push(1),
                        u += i + (t ? "hsla(" + r[0] + "," + r[1] + "%," + r[2] + "%," + r[3] : "rgba(" + r.join(",")) + ")";
                    return u
                },
                ct = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (f in ut) ct += "|" + f + "\\b";
            ct = new RegExp(ct + ")", "gi"),
                o.colorStringFilter = function (e) {
                    var t, n = e[0] + e[1];
                    ct.lastIndex = 0,
                    ct.test(n) && (t = -1 !== n.indexOf("hsl(") || -1 !== n.indexOf("hsla("), e[0] = lt(e[0], t), e[1] = lt(e[1], t))
                },
            t.defaultStringFilter || (t.defaultStringFilter = o.colorStringFilter);
            var ht = function (e, t, n, r) {
                    if (null == e) return function (e) {
                        return e
                    };
                    var i, s = t ? (e.match(ct) || [""])[0] : "",
                        o = e.split(s).join("").match(y) || [],
                        u = e.substr(0, e.indexOf(o[0])),
                        a = ")" === e.charAt(e.length - 1) ? ")" : "",
                        f = -1 !== e.indexOf(" ") ? " " : ",",
                        l = o.length,
                        c = l > 0 ? o[0].replace(m, "") : "";
                    return l ? i = t ?
                            function (e) {
                                var t, h, p, d;
                                if ("number" == typeof e) e += c;
                                else if (r && _.test(e)) {
                                    for (d = e.replace(_, "|").split("|"), p = 0; p < d.length; p++) d[p] = i(d[p]);
                                    return d.join(",")
                                }
                                if (t = (e.match(ct) || [s])[0], h = e.split(t).join("").match(y) || [], p = h.length, l > p--) for (; ++p < l;) h[p] = n ? h[(p - 1) / 2 | 0] : o[p];
                                return u + h.join(f) + f + t + a + (-1 !== e.indexOf("inset") ? " inset" : "")
                            } : function (e) {
                                var t, s, h;
                                if ("number" == typeof e) e += c;
                                else if (r && _.test(e)) {
                                    for (s = e.replace(_, "|").split("|"), h = 0; h < s.length; h++) s[h] = i(s[h]);
                                    return s.join(",")
                                }
                                if (t = e.match(y) || [], h = t.length, l > h--) for (; ++h < l;) t[h] = n ? t[(h - 1) / 2 | 0] : o[h];
                                return u + t.join(f) + a
                            } : function (e) {
                            return e
                        }
                },
                pt = function (e) {
                    return e = e.split(","),


                        function (t, n, r, i, s, o, u) {
                            var a, f = (n + "").split(" ");
                            for (u = {}, a = 0; 4 > a; a++) u[e[a]] = f[a] = f[a] || f[(a - 1) / 2 >> 0];
                            return i.parse(t, u, s, o)
                        }
                },
                dt = (q._setPluginRatio = function (e) {
                    this.plugin.setRatio(e);
                    for (var t, n, r, i, s, o = this.data, u = o.proxy, a = o.firstMPT, f = 1e-6; a;) t = u[a.v],
                        a.r ? t = Math.round(t) : f > t && t > -f && (t = 0),
                        a.t[a.p] = t,
                        a = a._next;
                    if (o.autoRotate && (o.autoRotate.rotation = u.rotation), 1 === e || 0 === e) for (a = o.firstMPT, s = 1 === e ? "e" : "b"; a;) {
                        if (n = a.t, n.type) {
                            if (1 === n.type) {
                                for (i = n.xs0 + n.s + n.xs1, r = 1; r < n.l; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                                n[s] = i
                            }
                        } else n[s] = n.s + n.xs0;
                        a = a._next
                    }
                }, function (e, t, n, r, i) {
                    this.t = e,
                        this.p = t,
                        this.v = n,
                        this.r = i,
                    r && (r._prev = this, this._next = r)
                }),
                vt = (q._parseToProxy = function (e, t, n, r, i, s) {
                    var o, u, a, f, l, c = r,
                        h = {},
                        p = {},
                        d = n._transform,
                        v = H;
                    for (n._transform = null, H = t, r = l = n.parse(e, t, r, i), H = v, s && (n._transform = d, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
                        if (r.type <= 1 && (u = r.p, p[u] = r.s + r.c, h[u] = r.s, s || (f = new dt(r, "s", u, f, r.r), r.c = 0), 1 === r.type)) for (o = r.l; --o > 0;) a = "xn" + o,
                            u = r.p + "_" + a,
                            p[u] = r.data[a],
                            h[u] = r[a],
                        s || (f = new dt(r, a, u, f, r.rxp[a]));
                        r = r._next
                    }
                    return {
                        proxy: h,
                        end: p,
                        firstMPT: f,
                        pt: l
                    }
                }, q.CSSPropTween = function (e, t, r, i, o, u, a, f, l, c, h) {
                    this.t = e,
                        this.p = t,
                        this.s = r,
                        this.c = i,
                        this.n = a || t,
                    e instanceof vt || s.push(this.n),
                        this.r = f,
                        this.type = u || 0,
                    l && (this.pr = l, n = !0),
                        this.b = void 0 === c ? r : c,
                        this.e = void 0 === h ? r + i : h,
                    o && (this._next = o, o._prev = this)
                }),
                mt = function (e, t, n, r, i, s) {
                    var o = new vt(e, t, n, r - n, i, -1, s);
                    return o.b = n,
                        o.e = o.xs0 = r,
                        o
                },
                gt = o.parseComplex = function (e, t, n, r, i, s, o, u, a, f) {
                    n = n || s || "",
                        o = new vt(e, t, 0, 0, o, f ? 2 : 1, null, !1, u, n, r),
                        r += "";
                    var c, h, p, d, v, y, b, w, E, S, x, T, N, C = n.split(", ").join(",").split(" "),
                        k = r.split(", ").join(",").split(" "),
                        L = C.length,
                        A = l !== !1;
                    for ((-1 !== r.indexOf(",") || -1 !== n.indexOf(",")) && (C = C.join(" ").replace(_, ", ").split(" "), k = k.join(" ").replace(_, ", ").split(" "), L = C.length), L !== k.length && (C = (s || "").split(" "), L = C.length), o.plugin = a, o.setRatio = f, ct.lastIndex = 0, c = 0; L > c; c++) if (d = C[c], v = k[c], w = parseFloat(d), w || 0 === w) o.appendXtra("", w, it(v, w), v.replace(g, ""), A && -1 !== v.indexOf("px"), !0);
                    else if (i && ct.test(d)) T = "," === v.charAt(v.length - 1) ? ")," : ")",
                        N = -1 !== v.indexOf("hsl") && U,
                        d = ft(d, N),
                        v = ft(v, N),
                        E = d.length + v.length > 6,
                        E && !U && 0 === v[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(k[c]).join("transparent")) : (U || (E = !1), N ? o.appendXtra(E ? "hsla(" : "hsl(", d[0], it(v[0], d[0]), ",", !1, !0).appendXtra("", d[1], it(v[1], d[1]), "%,", !1).appendXtra("", d[2], it(v[2], d[2]), E ? "%," : "%" + T, !1) : o.appendXtra(E ? "rgba(" : "rgb(", d[0], v[0] - d[0], ",", !0, !0).appendXtra("", d[1], v[1] - d[1], ",", !0).appendXtra("", d[2], v[2] - d[2], E ? "," : T, !0), E && (d = d.length < 4 ? 1 : d[3], o.appendXtra("", d, (v.length < 4 ? 1 : v[3]) - d, T, !1))),
                        ct.lastIndex = 0;
                    else if (y = d.match(m)) {
                        if (b = v.match(g), !b || b.length !== y.length) return o;
                        for (p = 0, h = 0; h < y.length; h++) x = y[h],
                            S = d.indexOf(x, p),
                            o.appendXtra(d.substr(p, S - p), Number(x), it(b[h], x), "", A && "px" === d.substr(S + x.length, 2), 0 === h),
                            p = S + x.length;
                        o["xs" + o.l] += d.substr(p)
                    } else o["xs" + o.l] += o.l ? " " + v : v;
                    if (-1 !== r.indexOf("=") && o.data) {
                        for (T = o.xs0 + o.data.s, c = 1; c < o.l; c++) T += o["xs" + c] + o.data["xn" + c];
                        o.e = T + o["xs" + c]
                    }
                    return o.l || (o.type = -1, o.xs0 = o.e),
                    o.xfirst || o
                },
                yt = 9;
            for (f = vt.prototype, f.l = f.pr = 0; --yt > 0;) f["xn" + yt] = 0,
                f["xs" + yt] = "";
            f.xs0 = "",
                f._next = f._prev = f.xfirst = f.data = f.plugin = f.setRatio = f.rxp = null,
                f.appendXtra = function (e, t, n, r, i, s) {
                    var o = this,
                        u = o.l;
                    return o["xs" + u] += s && u ? " " + e : e || "",
                        n || 0 === u || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = r || "", u > 0 ? (o.data["xn" + u] = t + n, o.rxp["xn" + u] = i, o["xn" + u] = t, o.plugin || (o.xfirst = new vt(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                                    s: t + n
                                }, o.rxp = {}, o.s = t, o.c = n, o.r = i, o)) : (o["xs" + u] += t + (r || ""), o)
                };
            var bt = function (e, t) {
                    t = t || {},
                        this.p = t.prefix ? $(e) || e : e,
                        a[e] = a[this.p] = this,
                        this.format = t.formatter || ht(t.defaultValue, t.color, t.collapsible, t.multi),
                    t.parser && (this.parse = t.parser),
                        this.clrs = t.color,
                        this.multi = t.multi,
                        this.keyword = t.keyword,
                        this.dflt = t.defaultValue,
                        this.pr = t.priority || 0
                },
                wt = q._registerComplexSpecialProp = function (e, t, n) {
                    "object" != typeof t && (t = {
                        parser: n
                    });
                    var r, i, s = e.split(","),
                        o = t.defaultValue;
                    for (n = n || [o], r = 0; r < s.length; r++) t.prefix = 0 === r && t.prefix,
                        t.defaultValue = n[r] || o,
                        i = new bt(s[r], t)
                },
                Et = function (e) {
                    if (!a[e]) {
                        var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                        wt(e, {
                            parser: function (e, n, r, i, s, o, f) {
                                var l = u.com.greensock.plugins[t];
                                return l ? (l._cssRegister(), a[r].parse(e, n, r, i, s, o, f)) : (W("Error: " + t + " js file not loaded."), s)
                            }
                        })
                    }
                };
            f = bt.prototype,
                f.parseComplex = function (e, t, n, r, i, s) {
                    var o, u, a, f, l, c, h = this.keyword;
                    if (this.multi && (_.test(n) || _.test(t) ? (u = t.replace(_, "|").split("|"), a = n.replace(_, "|").split("|")) : h && (u = [t], a = [n])), a) {
                        for (f = a.length > u.length ? a.length : u.length, o = 0; f > o; o++) t = u[o] = u[o] || this.dflt,
                            n = a[o] = a[o] || this.dflt,
                        h && (l = t.indexOf(h), c = n.indexOf(h), l !== c && (-1 === c ? u[o] = u[o].split(h).join("") : -1 === l && (u[o] += " " + h)));
                        t = u.join(", "),
                            n = a.join(", ")
                    }
                    return gt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
                },
                f.parse = function (e, t, n, r, s, o, u) {
                    return this.parseComplex(e.style, this.format(K(e, this.p, i, !1, this.dflt)), this.format(t), s, o)
                },
                o.registerSpecialProp = function (e, t, n) {
                    wt(e, {
                        parser: function (e, r, i, s, o, u, a) {
                            var f = new vt(e, i, 0, 0, o, 2, i, !1, n);
                            return f.plugin = u,
                                f.setRatio = t(e, r, s._tween, i),
                                f
                        },
                        priority: n
                    })
                },
                o.useSVGTransformAttr = h || p;
            var St, xt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                Tt = $("transform"),
                Nt = X + "transform",
                Ct = $("transformOrigin"),
                kt = null !== $("perspective"),
                Lt = q.Transform = function () {
                    this.perspective = parseFloat(o.defaultTransformPerspective) || 0,
                        this.force3D = o.defaultForce3D !== !1 && kt ? o.defaultForce3D || "auto" : !1
                },
                At = window.SVGElement,
                Ot = function (e, t, n) {
                    var r, i = B.createElementNS("http://www.w3.org/2000/svg", e),
                        s = /([a-z])([A-Z])/g;
                    for (r in n) i.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), n[r]);
                    return t.appendChild(i),
                        i
                },
                Mt = B.documentElement,
                _t = function () {
                    var e, t, n, r = v || /Android/i.test(R) && !window.chrome;
                    return B.createElementNS && !r && (e = Ot("svg", Mt), t = Ot("rect", e, {
                        width: 100,
                        height: 50,
                        x: 100
                    }), n = t.getBoundingClientRect().width, t.style[Ct] = "50% 50%", t.style[Tt] = "scaleX(0.5)", r = n === t.getBoundingClientRect().width && (!p || !kt), Mt.removeChild(e)),
                        r
                }(),
                Dt = function (e, t, n, r, i) {
                    var s, u, a, f, l, c, h, p, d, v, m, g, y, b, w = e._gsTransform,
                        E = Bt(e, !0);
                    w && (y = w.xOrigin, b = w.yOrigin),
                    (!r || (s = r.split(" ")).length < 2) && (h = e.getBBox(), t = rt(t).split(" "), s = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * h.width : parseFloat(t[0])) + h.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * h.height : parseFloat(t[1])) + h.y]),
                        n.xOrigin = f = parseFloat(s[0]),
                        n.yOrigin = l = parseFloat(s[1]),
                    r && E !== Ht && (c = E[0], h = E[1], p = E[2], d = E[3], v = E[4], m = E[5], g = c * d - h * p, u = f * (d / g) + l * (-p / g) + (p * m - d * v) / g, a = f * (-h / g) + l * (c / g) - (c * m - h * v) / g, f = n.xOrigin = s[0] = u, l = n.yOrigin = s[1] = a),
                    w && (i || i !== !1 && o.defaultSmoothOrigin !== !1 ? (u = f - y, a = l - b, w.xOffset += u * E[0] + a * E[2] - u, w.yOffset += u * E[1] + a * E[3] - a) : w.xOffset = w.yOffset = 0),
                        e.setAttribute("data-svg-origin", s.join(" "))
                },
                Pt = function (e) {
                    return !!(At && "function" == typeof e.getBBox && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM))
                },
                Ht = [1, 0, 0, 1, 0, 0],
                Bt = function (e, t) {
                    var n, r, i, s, o, u = e._gsTransform || new Lt,
                        a = 1e5;
                    if (Tt ? r = K(e, Nt, null, !0) : e.currentStyle && (r = e.currentStyle.filter.match(O), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), u.x || 0, u.y || 0].join(",") : ""), n = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, (u.svg || e.getBBox && Pt(e)) && (n && -1 !== (e.style[Tt] + "").indexOf("matrix") && (r = e.style[Tt], n = 0), i = e.getAttribute("transform"), n && i && (-1 !== i.indexOf("matrix") ? (r = i, n = 0) : -1 !== i.indexOf("translate") && (r = "matrix(1,0,0,1," + i.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", n = 0))), n) return Ht;
                    for (i = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], yt = i.length; --yt > -1;) s = Number(i[yt]),
                        i[yt] = (o = s - (s |= 0)) ? (o * a + (0 > o ? -0.5 : .5) | 0) / a + s : s;
                    return t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i
                },
                jt = q.getTransform = function (e, n, r, s) {
                    if (e._gsTransform && r && !s) return e._gsTransform;
                    var u, a, f, l, c, h, p = r ? e._gsTransform || new Lt : new Lt,
                        d = p.scaleX < 0,
                        v = 2e-5,
                        m = 1e5,
                        g = kt ? parseFloat(K(e, Ct, n, !1, "0 0 0").split(" ")[2]) || p.zOrigin || 0 : 0,
                        y = parseFloat(o.defaultTransformPerspective) || 0;
                    if (p.svg = !!e.getBBox && !!Pt(e), p.svg && (Dt(e, K(e, Ct, i, !1, "50% 50%") + "", p, e.getAttribute("data-svg-origin")), St = o.useSVGTransformAttr || _t), u = Bt(e), u !== Ht) {
                        if (16 === u.length) {
                            var b, w, E, S, x, T = u[0],
                                N = u[1],
                                C = u[2],
                                k = u[3],
                                L = u[4],
                                A = u[5],
                                O = u[6],
                                M = u[7],
                                _ = u[8],
                                D = u[9],
                                H = u[10],
                                B = u[12],
                                j = u[13],
                                F = u[14],
                                I = u[11],
                                q = Math.atan2(O, H);
                            p.zOrigin && (F = -p.zOrigin, B = _ * F - u[12], j = D * F - u[13], F = H * F + p.zOrigin - u[14]),
                                p.rotationX = q * P,
                            q && (S = Math.cos(-q), x = Math.sin(-q), b = L * S + _ * x, w = A * S + D * x, E = O * S + H * x, _ = L * -x + _ * S, D = A * -x + D * S, H = O * -x + H * S, I = M * -x + I * S, L = b, A = w, O = E),
                                q = Math.atan2(-C, H),
                                p.rotationY = q * P,
                            q && (S = Math.cos(-q), x = Math.sin(-q), b = T * S - _ * x, w = N * S - D * x, E = C * S - H * x, D = N * x + D * S, H = C * x + H * S, I = k * x + I * S, T = b, N = w, C = E),
                                q = Math.atan2(N, T),
                                p.rotation = q * P,
                            q && (S = Math.cos(-q), x = Math.sin(-q), T = T * S + L * x, w = N * S + A * x, A = N * -x + A * S, O = C * -x + O * S, N = w),
                            p.rotationX && Math.abs(p.rotationX) + Math.abs(p.rotation) > 359.9 && (p.rotationX = p.rotation = 0, p.rotationY = 180 - p.rotationY),
                                p.scaleX = (Math.sqrt(T * T + N * N) * m + .5 | 0) / m,
                                p.scaleY = (Math.sqrt(A * A + D * D) * m + .5 | 0) / m,
                                p.scaleZ = (Math.sqrt(O * O + H * H) * m + .5 | 0) / m,
                                p.skewX = 0,
                                p.perspective = I ? 1 / (0 > I ? -I : I) : 0,
                                p.x = B,
                                p.y = j,
                                p.z = F,
                            p.svg && (p.x -= p.xOrigin - (p.xOrigin * T - p.yOrigin * L), p.y -= p.yOrigin - (p.yOrigin * N - p.xOrigin * A))
                        } else if ((!kt || s || !u.length || p.x !== u[4] || p.y !== u[5] || !p.rotationX && !p.rotationY) && (void 0 === p.x || "none" !== K(e, "display", n))) {
                            var R = u.length >= 6,
                                U = R ? u[0] : 1,
                                z = u[1] || 0,
                                W = u[2] || 0,
                                X = R ? u[3] : 1;
                            p.x = u[4] || 0,
                                p.y = u[5] || 0,
                                f = Math.sqrt(U * U + z * z),
                                l = Math.sqrt(X * X + W * W),
                                c = U || z ? Math.atan2(z, U) * P : p.rotation || 0,
                                h = W || X ? Math.atan2(W, X) * P + c : p.skewX || 0,
                            Math.abs(h) > 90 && Math.abs(h) < 270 && (d ? (f *= -1, h += 0 >= c ? 180 : -180, c += 0 >= c ? 180 : -180) : (l *= -1, h += 0 >= h ? 180 : -180)),
                                p.scaleX = f,
                                p.scaleY = l,
                                p.rotation = c,
                                p.skewX = h,
                            kt && (p.rotationX = p.rotationY = p.z = 0, p.perspective = y, p.scaleZ = 1),
                            p.svg && (p.x -= p.xOrigin - (p.xOrigin * U + p.yOrigin * W), p.y -= p.yOrigin - (p.xOrigin * z + p.yOrigin * X))
                        }
                        p.zOrigin = g;
                        for (a in p) p[a] < v && p[a] > -v && (p[a] = 0)
                    }
                    return r && (e._gsTransform = p, p.svg && (St && e.style[Tt] ? t.delayedCall(.001, function () {
                            Rt(e.style, Tt)
                        }) : !St && e.getAttribute("transform") && t.delayedCall(.001, function () {
                            e.removeAttribute("transform")
                        }))),
                        p
                },
                Ft = function (e) {
                    var t, n, r = this.data,
                        i = -r.rotation * D,
                        s = i + r.skewX * D,
                        o = 1e5,
                        u = (Math.cos(i) * r.scaleX * o | 0) / o,
                        a = (Math.sin(i) * r.scaleX * o | 0) / o,
                        f = (Math.sin(s) * -r.scaleY * o | 0) / o,
                        l = (Math.cos(s) * r.scaleY * o | 0) / o,
                        c = this.t.style,
                        h = this.t.currentStyle;
                    if (h) {
                        n = a,
                            a = -f,
                            f = -n,
                            t = h.filter,
                            c.filter = "";
                        var p, d, m = this.t.offsetWidth,
                            g = this.t.offsetHeight,
                            y = "absolute" !== h.position,
                            b = "progid:DXImageTransform.Microsoft.Matrix(M11=" + u + ", M12=" + a + ", M21=" + f + ", M22=" + l,
                            S = r.x + m * r.xPercent / 100,
                            x = r.y + g * r.yPercent / 100;
                        if (null != r.ox && (p = (r.oxp ? m * r.ox * .01 : r.ox) - m / 2, d = (r.oyp ? g * r.oy * .01 : r.oy) - g / 2, S += p - (p * u + d * a), x += d - (p * f + d * l)), y ? (p = m / 2, d = g / 2, b += ", Dx=" + (p - (p * u + d * a) + S) + ", Dy=" + (d - (p * f + d * l) + x) + ")") : b += ", sizingMethod='auto expand')", -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = t.replace(M, b) : c.filter = b + " " + t, (0 === e || 1 === e) && 1 === u && 0 === a && 0 === f && 1 === l && (y && -1 === b.indexOf("Dx=0, Dy=0") || E.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")), !y) {
                            var T, N, C, k = 8 > v ? 1 : -1;
                            for (p = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > u ? -u : u) * m + (0 > a ? -a : a) * g)) / 2 + S), r.ieOffsetY = Math.round((g - ((0 > l ? -l : l) * g + (0 > f ? -f : f) * m)) / 2 + x), yt = 0; 4 > yt; yt++) N = tt[yt],
                                T = h[N],
                                n = -1 !== T.indexOf("px") ? parseFloat(T) : Q(this.t, N, parseFloat(T), T.replace(w, "")) || 0,
                                C = n !== r[N] ? 2 > yt ? -r.ieOffsetX : -r.ieOffsetY : 2 > yt ? p - r.ieOffsetX : d - r.ieOffsetY,
                                c[N] = (r[N] = Math.round(n - C * (0 === yt || 2 === yt ? 1 : k))) + "px"
                        }
                    }
                },
                It = q.set3DTransformRatio = q.setTransformRatio = function (e) {
                    var t, n, r, i, s, o, u, a, f, l, c, h, d, v, m, g, y, b, w, E, S, x, T, N = this.data,
                        C = this.t.style,
                        k = N.rotation,
                        L = N.rotationX,
                        A = N.rotationY,
                        O = N.scaleX,
                        M = N.scaleY,
                        _ = N.scaleZ,
                        P = N.x,
                        H = N.y,
                        B = N.z,
                        j = N.svg,
                        F = N.perspective,
                        I = N.force3D;
                    if (((1 === e || 0 === e) && "auto" === I && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !I) && !B && !F && !A && !L && 1 === _ || St && j || !kt) return void(k || N.skewX || j ? (k *= D, x = N.skewX * D, T = 1e5, t = Math.cos(k) * O, i = Math.sin(k) * O, n = Math.sin(k - x) * -M, s = Math.cos(k - x) * M, x && "simple" === N.skewType && (y = Math.tan(x), y = Math.sqrt(1 + y * y), n *= y, s *= y, N.skewY && (t *= y, i *= y)), j && (P += N.xOrigin - (N.xOrigin * t + N.yOrigin * n) + N.xOffset, H += N.yOrigin - (N.xOrigin * i + N.yOrigin * s) + N.yOffset, St && (N.xPercent || N.yPercent) && (v = this.t.getBBox(), P += .01 * N.xPercent * v.width, H += .01 * N.yPercent * v.height), v = 1e-6, v > P && P > -v && (P = 0), v > H && H > -v && (H = 0)), w = (t * T | 0) / T + "," + (i * T | 0) / T + "," + (n * T | 0) / T + "," + (s * T | 0) / T + "," + P + "," + H + ")", j && St ? this.t.setAttribute("transform", "matrix(" + w) : C[Tt] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix(" : "matrix(") + w) : C[Tt] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + M + "," + P + "," + H + ")");
                    if (p && (v = 1e-4, v > O && O > -v && (O = _ = 2e-5), v > M && M > -v && (M = _ = 2e-5), !F || N.z || N.rotationX || N.rotationY || (F = 0)), k || N.skewX) k *= D,
                        m = t = Math.cos(k),
                        g = i = Math.sin(k),
                    N.skewX && (k -= N.skewX * D, m = Math.cos(k), g = Math.sin(k), "simple" === N.skewType && (y = Math.tan(N.skewX * D), y = Math.sqrt(1 + y * y), m *= y, g *= y, N.skewY && (t *= y, i *= y))),
                        n = -g,
                        s = m;
                    else {
                        if (!(A || L || 1 !== _ || F || j)) return void(C[Tt] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) translate3d(" : "translate3d(") + P + "px," + H + "px," + B + "px)" + (1 !== O || 1 !== M ? " scale(" + O + "," + M + ")" : ""));
                        t = s = 1,
                            n = i = 0
                    }
                    f = 1,
                        r = o = u = a = l = c = 0,
                        h = F ? -1 / F : 0,
                        d = N.zOrigin,
                        v = 1e-6,
                        E = ",",
                        S = "0",
                        k = A * D,
                    k && (m = Math.cos(k), g = Math.sin(k), u = -g, l = h * -g, r = t * g, o = i * g, f = m, h *= m, t *= m, i *= m),
                        k = L * D,
                    k && (m = Math.cos(k), g = Math.sin(k), y = n * m + r * g, b = s * m + o * g, a = f * g, c = h * g, r = n * -g + r * m, o = s * -g + o * m, f *= m, h *= m, n = y, s = b),
                    1 !== _ && (r *= _, o *= _, f *= _, h *= _),
                    1 !== M && (n *= M, s *= M, a *= M, c *= M),
                    1 !== O && (t *= O, i *= O, u *= O, l *= O),
                    (d || j) && (d && (P += r * -d, H += o * -d, B += f * -d + d), j && (P += N.xOrigin - (N.xOrigin * t + N.yOrigin * n) + N.xOffset, H += N.yOrigin - (N.xOrigin * i + N.yOrigin * s) + N.yOffset), v > P && P > -v && (P = S), v > H && H > -v && (H = S), v > B && B > -v && (B = 0)),
                        w = N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix3d(" : "matrix3d(",
                        w += (v > t && t > -v ? S : t) + E + (v > i && i > -v ? S : i) + E + (v > u && u > -v ? S : u),
                        w += E + (v > l && l > -v ? S : l) + E + (v > n && n > -v ? S : n) + E + (v > s && s > -v ? S : s),
                        L || A || 1 !== _ ? (w += E + (v > a && a > -v ? S : a) + E + (v > c && c > -v ? S : c) + E + (v > r && r > -v ? S : r), w += E + (v > o && o > -v ? S : o) + E + (v > f && f > -v ? S : f) + E + (v > h && h > -v ? S : h) + E) : w += ",0,0,0,0,1,0,",
                        w += P + E + H + E + B + E + (F ? 1 + -B / F : 1) + ")",
                        C[Tt] = w
                };
            f = Lt.prototype,
                f.x = f.y = f.z = f.skewX = f.skewY = f.rotation = f.rotationX = f.rotationY = f.zOrigin = f.xPercent = f.yPercent = f.xOffset = f.yOffset = 0,
                f.scaleX = f.scaleY = f.scaleZ = 1,
                wt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function (e, t, n, r, s, u, a) {
                        if (r._lastParsedTransform === a) return s;
                        r._lastParsedTransform = a;
                        var f, l, c, h, p, d, v, m, g, y, b = e._gsTransform,
                            w = e.style,
                            E = 1e-6,
                            S = xt.length,
                            x = a,
                            T = {},
                            N = "transformOrigin";
                        if (a.display ? (h = K(e, "display"), w.display = "block", f = jt(e, i, !0, a.parseTransform), w.display = h) : f = jt(e, i, !0, a.parseTransform), r._transform = f, "string" == typeof x.transform && Tt) h = F.style,
                            h[Tt] = x.transform,
                            h.display = "block",
                            h.position = "absolute",
                            B.body.appendChild(F),
                            l = jt(F, null, !1),
                            B.body.removeChild(F),
                        l.perspective || (l.perspective = f.perspective),
                        null != x.xPercent && (l.xPercent = st(x.xPercent, f.xPercent)),
                        null != x.yPercent && (l.yPercent = st(x.yPercent, f.yPercent));
                        else if ("object" == typeof x) {
                            if (l = {
                                    scaleX: st(null != x.scaleX ? x.scaleX : x.scale, f.scaleX),
                                    scaleY: st(null != x.scaleY ? x.scaleY : x.scale, f.scaleY),
                                    scaleZ: st(x.scaleZ, f.scaleZ),
                                    x: st(x.x, f.x),
                                    y: st(x.y, f.y),
                                    z: st(x.z, f.z),
                                    xPercent: st(x.xPercent, f.xPercent),
                                    yPercent: st(x.yPercent, f.yPercent),
                                    perspective: st(x.transformPerspective, f.perspective)
                                }, m = x.directionalRotation, null != m) if ("object" == typeof m) for (h in m) x[h] = m[h];
                            else x.rotation = m;
                            "string" == typeof x.x && -1 !== x.x.indexOf("%") && (l.x = 0, l.xPercent = st(x.x, f.xPercent)),
                            "string" == typeof x.y && -1 !== x.y.indexOf("%") && (l.y = 0, l.yPercent = st(x.y, f.yPercent)),
                                l.rotation = ot("rotation" in x ? x.rotation : "shortRotation" in x ? x.shortRotation + "_short" : "rotationZ" in x ? x.rotationZ : f.rotation, f.rotation, "rotation", T),
                            kt && (l.rotationX = ot("rotationX" in x ? x.rotationX : "shortRotationX" in x ? x.shortRotationX + "_short" : f.rotationX || 0, f.rotationX, "rotationX", T), l.rotationY = ot("rotationY" in x ? x.rotationY : "shortRotationY" in x ? x.shortRotationY + "_short" : f.rotationY || 0, f.rotationY, "rotationY", T)),
                                l.skewX = null == x.skewX ? f.skewX : ot(x.skewX, f.skewX),
                                l.skewY = null == x.skewY ? f.skewY : ot(x.skewY, f.skewY),
                            (c = l.skewY - f.skewY) && (l.skewX += c, l.rotation += c)
                        }
                        for (kt && null != x.force3D && (f.force3D = x.force3D, v = !0), f.skewType = x.skewType || f.skewType || o.defaultSkewType, d = f.force3D || f.z || f.rotationX || f.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, d || null == x.scale || (l.scaleZ = 1); --S > -1;) n = xt[S],
                            p = l[n] - f[n],
                        (p > E || -E > p || null != x[n] || null != H[n]) && (v = !0, s = new vt(f, n, f[n], p, s), n in T && (s.e = T[n]), s.xs0 = 0, s.plugin = u, r._overwriteProps.push(s.n));
                        return p = x.transformOrigin,
                        f.svg && (p || x.svgOrigin) && (g = f.xOffset, y = f.yOffset, Dt(e, rt(p), l, x.svgOrigin, x.smoothOrigin), s = mt(f, "xOrigin", (b ? f : l).xOrigin, l.xOrigin, s, N), s = mt(f, "yOrigin", (b ? f : l).yOrigin, l.yOrigin, s, N), (g !== f.xOffset || y !== f.yOffset) && (s = mt(f, "xOffset", b ? g : f.xOffset, f.xOffset, s, N), s = mt(f, "yOffset", b ? y : f.yOffset, f.yOffset, s, N)), p = St ? null : "0px 0px"),
                        (p || kt && d && f.zOrigin) && (Tt ? (v = !0, n = Ct, p = (p || K(e, n, i, !1, "50% 50%")) + "", s = new vt(w, n, 0, 0, s, -1, N), s.b = w[n], s.plugin = u, kt ? (h = f.zOrigin, p = p.split(" "), f.zOrigin = (p.length > 2 && (0 === h || "0px" !== p[2]) ? parseFloat(p[2]) : h) || 0, s.xs0 = s.e = p[0] + " " + (p[1] || "50%") + " 0px", s = new vt(f, "zOrigin", 0, 0, s, -1, s.n), s.b = h, s.xs0 = s.e = f.zOrigin) : s.xs0 = s.e = p) : rt(p + "", f)),
                        v && (r._transformType = f.svg && St || !d && 3 !== this._transformType ? 2 : 3),
                            s
                    },
                    prefix: !0
                }),
                wt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }),
                wt("borderRadius", {
                    defaultValue: "0px",
                    parser: function (e, t, n, s, o, u) {
                        t = this.format(t);
                        var a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            N = e.style;
                        for (m = parseFloat(e.offsetWidth), g = parseFloat(e.offsetHeight), a = t.split(" "), f = 0; f < T.length; f++) this.p.indexOf("border") && (T[f] = $(T[f])),
                            h = c = K(e, T[f], i, !1, "0px"),
                        -1 !== h.indexOf(" ") && (c = h.split(" "), h = c[0], c = c[1]),
                            p = l = a[f],
                            d = parseFloat(h),
                            b = h.substr((d + "").length),
                            w = "=" === p.charAt(1),
                            w ? (v = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), v *= parseFloat(p), y = p.substr((v + "").length - (0 > v ? 1 : 0)) || "") : (v = parseFloat(p), y = p.substr((v + "").length)),
                        "" === y && (y = r[n] || b),
                        y !== b && (E = Q(e, "borderLeft", d, b), S = Q(e, "borderTop", d, b), "%" === y ? (h = E / m * 100 + "%", c = S / g * 100 + "%") : "em" === y ? (x = Q(e, "borderLeft", 1, "em"), h = E / x + "em", c = S / x + "em") : (h = E + "px", c = S + "px"), w && (p = parseFloat(h) + v + y, l = parseFloat(c) + v + y)),
                            o = gt(N, T[f], h + " " + c, p + " " + l, !1, "0px", o);
                        return o
                    },
                    prefix: !0,
                    formatter: ht("0px 0px 0px 0px", !1, !0)
                }),
                wt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function (e, t, n, r, s, o) {
                        var u, a, f, l, c, h, p = "background-position",
                            d = i || J(e, null),
                            m = this.format((d ? v ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(t);
                        if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (h = K(e, "backgroundImage").replace(k, ""), h && "none" !== h)) {
                            for (u = m.split(" "), a = g.split(" "), I.setAttribute("src", h), f = 2; --f > -1;) m = u[f],
                                l = -1 !== m.indexOf("%"),
                            l !== (-1 !== a[f].indexOf("%")) && (c = 0 === f ? e.offsetWidth - I.width : e.offsetHeight - I.height, u[f] = l ? parseFloat(m) / 100 * c + "px" : parseFloat(m) / c * 100 + "%");
                            m = u.join(" ")
                        }
                        return this.parseComplex(e.style, m, g, s, o)
                    },
                    formatter: rt
                }),
                wt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: rt
                }),
                wt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }),
                wt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }),
                wt("transformStyle", {
                    prefix: !0
                }),
                wt("backfaceVisibility", {
                    prefix: !0
                }),
                wt("userSelect", {
                    prefix: !0
                }),
                wt("margin", {
                    parser: pt("marginTop,marginRight,marginBottom,marginLeft")
                }),
                wt("padding", {
                    parser: pt("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }),
                wt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function (e, t, n, r, s, o) {
                        var u, a, f;
                        return 9 > v ? (a = e.currentStyle, f = 8 > v ? " " : ",", u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")", t = this.format(t).split(",").join(f)) : (u = this.format(K(e, this.p, i, !1, this.dflt)), t = this.format(t)),
                            this.parseComplex(e.style, u, t, s, o)
                    }
                }),
                wt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }),
                wt("autoRound,strictUnits", {
                    parser: function (e, t, n, r, i) {
                        return i
                    }
                }),
                wt("border", {
                    defaultValue: "0px solid #000",
                    parser: function (e, t, n, r, s, o) {
                        return this.parseComplex(e.style, this.format(K(e, "borderTopWidth", i, !1, "0px") + " " + K(e, "borderTopStyle", i, !1, "solid") + " " + K(e, "borderTopColor", i, !1, "#000")), this.format(t), s, o)
                    },
                    color: !0,
                    formatter: function (e) {
                        var t = e.split(" ");
                        return t[0] + " " + (t[1] || "solid") + " " + (e.match(ct) || ["#000"])[0]
                    }
                }),
                wt("borderWidth", {
                    parser: pt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }),
                wt("float,cssFloat,styleFloat", {
                    parser: function (e, t, n, r, i, s) {
                        var o = e.style,
                            u = "cssFloat" in o ? "cssFloat" : "styleFloat";
                        return new vt(o, u, 0, 0, i, -1, n, !1, 0, o[u], t)
                    }
                });
            var qt = function (e) {
                var t, n = this.t,
                    r = n.filter || K(this.data, "filter") || "",
                    i = this.s + this.c * e | 0;
                100 === i && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (n.removeAttribute("filter"), t = !K(this.data, "filter")) : (n.filter = r.replace(x, ""), t = !0)),
                t || (this.xn1 && (n.filter = r = r || "alpha(opacity=" + i + ")"), -1 === r.indexOf("pacity") ? 0 === i && this.xn1 || (n.filter = r + " alpha(opacity=" + i + ")") : n.filter = r.replace(E, "opacity=" + i))
            };
            wt("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function (e, t, n, r, s, o) {
                    var u = parseFloat(K(e, "opacity", i, !1, "1")),
                        a = e.style,
                        f = "autoAlpha" === n;
                    return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + u),
                    f && 1 === u && "hidden" === K(e, "visibility", i) && 0 !== t && (u = 0),
                        U ? s = new vt(a, "opacity", u, t - u, s) : (s = new vt(a, "opacity", 100 * u, 100 * (t - u), s), s.xn1 = f ? 1 : 0, a.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = qt),
                    f && (s = new vt(a, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== u ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(n)),
                        s
                }
            });
            var Rt = function (e, t) {
                    t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), e.removeProperty(t.replace(N, "-$1").toLowerCase())) : e.removeAttribute(t))
                },
                Ut = function (e) {
                    if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                        this.t.setAttribute("class", 0 === e ? this.b : this.e);
                        for (var t = this.data, n = this.t.style; t;) t.v ? n[t.p] = t.v : Rt(n, t.p),
                            t = t._next;
                        1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            wt("className", {
                parser: function (e, t, r, s, o, u, a) {
                    var f, l, c, h, p, d = e.getAttribute("class") || "",
                        v = e.style.cssText;
                    if (o = s._classNamePT = new vt(e, r, 0, 0, o, 2), o.setRatio = Ut, o.pr = -11, n = !0, o.b = d, l = Y(e, i), c = e._gsClassPT) {
                        for (h = {}, p = c.data; p;) h[p.p] = 1,
                            p = p._next;
                        c.setRatio(1)
                    }
                    return e._gsClassPT = o,
                        o.e = "=" !== t.charAt(1) ? t : d.replace(new RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""),
                        e.setAttribute("class", o.e),
                        f = Z(e, l, Y(e), a, h),
                        e.setAttribute("class", d),
                        o.data = f.firstMPT,
                        e.style.cssText = v,
                        o = o.xfirst = s.parse(e, f.difs, o, u)
                }
            });
            var zt = function (e) {
                if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var t, n, r, i, s, o = this.t.style,
                        u = a.transform.parse;
                    if ("all" === this.e) o.cssText = "",
                        i = !0;
                    else for (t = this.e.split(" ").join("").split(","), r = t.length; --r > -1;) n = t[r],
                    a[n] && (a[n].parse === u ? i = !0 : n = "transformOrigin" === n ? Ct : a[n].p),
                        Rt(o, n);
                    i && (Rt(o, Tt), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                }
            };
            for (wt("clearProps", {
                parser: function (e, t, r, i, s) {
                    return s = new vt(e, r, 0, 0, s, 2),
                        s.setRatio = zt,
                        s.e = t,
                        s.pr = -10,
                        s.data = i._tween,
                        n = !0,
                        s
                }
            }), f = "bezier,throwProps,physicsProps,physics2D".split(","), yt = f.length; yt--;) Et(f[yt]);
            f = o.prototype,
                f._firstPT = f._lastParsedTransform = f._transform = null,
                f._onInitTween = function (e, t, u) {
                    if (!e.nodeType) return !1;
                    this._target = e,
                        this._tween = u,
                        this._vars = t,
                        l = t.autoRound,
                        n = !1,
                        r = t.suffixMap || o.suffixMap,
                        i = J(e, ""),
                        s = this._overwriteProps;
                    var f, p, v, m, g, y, b, w, E, x = e.style;
                    if (c && "" === x.zIndex && (f = K(e, "zIndex", i), ("auto" === f || "" === f) && this._addLazySet(x, "zIndex", 0)), "string" == typeof t && (m = x.cssText, f = Y(e, i), x.cssText = m + ";" + t, f = Z(e, f, Y(e)).difs, !U && S.test(t) && (f.opacity = parseFloat(RegExp.$1)), t = f, x.cssText = m), t.className ? this._firstPT = p = a.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = p = this.parse(e, t, null), this._transformType) {
                        for (E = 3 === this._transformType, Tt ? h && (c = !0, "" === x.zIndex && (b = K(e, "zIndex", i), ("auto" === b || "" === b) && this._addLazySet(x, "zIndex", 0)), d && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (E ? "visible" : "hidden"))) : x.zoom = 1, v = p; v && v._next;) v = v._next;
                        w = new vt(e, "transform", 0, 0, null, 2),
                            this._linkCSSP(w, null, v),
                            w.setRatio = Tt ? It : Ft,
                            w.data = this._transform || jt(e, i, !0),
                            w.tween = u,
                            w.pr = -1,
                            s.pop()
                    }
                    if (n) {
                        for (; p;) {
                            for (y = p._next, v = m; v && v.pr > p.pr;) v = v._next;
                            (p._prev = v ? v._prev : g) ? p._prev._next = p : m = p,
                                (p._next = v) ? v._prev = p : g = p,
                                p = y
                        }
                        this._firstPT = m
                    }
                    return !0
                },
                f.parse = function (e, t, n, s) {
                    var o, u, f, c, h, p, d, v, m, g, y = e.style;
                    for (o in t) p = t[o],
                        u = a[o],
                        u ? n = u.parse(e, p, o, this, n, s, t) : (h = K(e, o, i) + "", m = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || m && T.test(p) ? (m || (p = ft(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = gt(y, o, h, p, !0, "transparent", n, 0, s)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (f = parseFloat(h), d = f || 0 === f ? h.substr((f + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (f = nt(e, o, i), d = "px") : "left" === o || "top" === o ? (f = G(e, o, i), d = "px") : (f = "opacity" !== o ? 0 : 1, d = "")), g = m && "=" === p.charAt(1), g ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), v = p.replace(w, "")) : (c = parseFloat(p), v = m ? p.replace(w, "") : ""), "" === v && (v = o in r ? r[o] : d), p = c || 0 === c ? (g ? c + f : c) + v : t[o], d !== v && "" !== v && (c || 0 === c) && f && (f = Q(e, o, f, d), "%" === v ? (f /= Q(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = f + "%")) : "em" === v || "rem" === v || "vw" === v || "vh" === v ? f /= Q(e, o, 1, v) : "px" !== v && (c = Q(e, o, c, v), v = "px"), g && (c || 0 === c) && (p = c + f + v)), g && (c += f), !f && 0 !== f || !c && 0 !== c ? void 0 !== y[o] && (p || p + "" != "NaN" && null != p) ? (n = new vt(y, o, c || f || 0, 0, n, -1, o, !1, 0, h, p), n.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : W("invalid " + o + " tween value: " + t[o]) : (n = new vt(y, o, f, c - f, n, 0, o, l !== !1 && ("px" === v || "zIndex" === o), 0, h, p), n.xs0 = v)) : n = gt(y, o, h, p, !0, null, n, 0, s)),
                    s && n && !n.plugin && (n.plugin = s);
                    return n
                },
                f.setRatio = function (e) {
                    var t, n, r, i = this._firstPT,
                        s = 1e-6;
                    if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -0.000001) for (; i;) {
                        if (t = i.c * e + i.s, i.r ? t = Math.round(t) : s > t && t > -s && (t = 0), i.type) if (1 === i.type) if (r = i.l, 2 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2;
                        else if (3 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
                        else if (4 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4;
                        else if (5 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4 + i.xn4 + i.xs5;
                        else {
                            for (n = i.xs0 + t + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                            i.t[i.p] = n
                        } else -1 === i.type ? i.t[i.p] = i.xs0 : i.setRatio && i.setRatio(e);
                        else i.t[i.p] = t + i.xs0;
                        i = i._next
                    } else for (; i;) 2 !== i.type ? i.t[i.p] = i.b : i.setRatio(e),
                        i = i._next;
                    else for (; i;) {
                        if (2 !== i.type) if (i.r && -1 !== i.type) if (t = Math.round(i.s + i.c), i.type) {
                            if (1 === i.type) {
                                for (r = i.l, n = i.xs0 + t + i.xs1, r = 1; r < i.l; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                                i.t[i.p] = n
                            }
                        } else i.t[i.p] = t + i.xs0;
                        else i.t[i.p] = i.e;
                        else i.setRatio(e);
                        i = i._next
                    }
                },
                f._enableTransforms = function (e) {
                    this._transform = this._transform || jt(this._target, i, !0),
                        this._transformType = this._transform.svg && St || !e && 3 !== this._transformType ? 2 : 3
                };
            var Wt = function (e) {
                this.t[this.p] = this.e,
                    this.data._linkCSSP(this, this._next, null, !0)
            };
            f._addLazySet = function (e, t, n) {
                var r = this._firstPT = new vt(e, t, 0, 0, this._firstPT, 2);
                r.e = n,
                    r.setRatio = Wt,
                    r.data = this
            },
                f._linkCSSP = function (e, t, n, r) {
                    return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, r = !0), n ? n._next = e : r || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = n),
                        e
                },
                f._kill = function (t) {
                    var n, r, i, s = t;
                    if (t.autoAlpha || t.alpha) {
                        s = {};
                        for (r in t) s[r] = t[r];
                        s.opacity = 1,
                        s.autoAlpha && (s.visibility = 1)
                    }
                    return t.className && (n = this._classNamePT) && (i = n.xfirst, i && i._prev ? this._linkCSSP(i._prev, n._next, i._prev._prev) : i === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, i._prev), this._classNamePT = null),
                        e.prototype._kill.call(this, s)
                };
            var Xt = function (e, t, n) {
                var r, i, s, o;
                if (e.slice) for (i = e.length; --i > -1;) Xt(e[i], t, n);
                else for (r = e.childNodes, i = r.length; --i > -1;) s = r[i],
                    o = s.type,
                s.style && (t.push(Y(s)), n && n.push(s)),
                1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Xt(s, t, n)
            };
            return o.cascadeTo = function (e, n, r) {
                var i, s, o, u, a = t.to(e, n, r),
                    f = [a],
                    l = [],
                    c = [],
                    h = [],
                    p = t._internals.reservedProps;
                for (e = a._targets || a.target, Xt(e, l, h), a.render(n, !0, !0), Xt(e, c), a.render(0, !0, !0), a._enabled(!0), i = h.length; --i > -1;) if (s = Z(h[i], l[i], c[i]), s.firstMPT) {
                    s = s.difs;
                    for (o in r) p[o] && (s[o] = r[o]);
                    u = {};
                    for (o in s) u[o] = l[i][o];
                    f.push(t.fromTo(h[i], n, u, s))
                }
                return f
            },
                e.activate([o]),
                o
        }, !0),


        function () {
            var e = _gsScope._gsDefine.plugin({
                    propName: "roundProps",
                    version: "1.5",
                    priority: -1,
                    API: 2,
                    init: function (e, t, n) {
                        return this._tween = n,
                            !0
                    }
                }),
                t = function (e) {
                    for (; e;) e.f || e.blob || (e.r = 1),
                        e = e._next
                },
                n = e.prototype;
            n._onInitAllProps = function () {
                for (var e, n, r, i = this._tween, s = i.vars.roundProps.join ? i.vars.roundProps : i.vars.roundProps.split(","), o = s.length, u = {}, a = i._propLookup.roundProps; --o > -1;) u[s[o]] = 1;
                for (o = s.length; --o > -1;) for (e = s[o], n = i._firstPT; n;) r = n._next,
                    n.pg ? n.t._roundProps(u, !0) : n.n === e && (2 === n.f && n.t ? t(n.t._firstPT) : (this._add(n.t, e, n.s, n.c), r && (r._prev = n._prev), n._prev ? n._prev._next = r : i._firstPT === n && (i._firstPT = r), n._next = n._prev = null, i._propLookup[e] = a)),
                    n = r;
                return !1
            },
                n._add = function (e, t, n, r) {
                    this._addTween(e, t, n, n + r, t, !0),
                        this._overwriteProps.push(t)
                }
        }(),


        function () {
            _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.5.0",
                init: function (e, t, n) {
                    var r;
                    if ("function" != typeof e.setAttribute) return !1;
                    for (r in t) this._addTween(e, "setAttribute", e.getAttribute(r) + "", t[r] + "", r, !1, r),
                        this._overwriteProps.push(r);
                    return !0
                }
            })
        }(),
        _gsScope._gsDefine.plugin({
            propName: "directionalRotation",
            version: "0.2.1",
            API: 2,
            init: function (e, t, n) {
                "object" != typeof t && (t = {
                    rotation: t
                }),
                    this.finals = {};
                var r, i, s, o, u, a, f = t.useRadians === !0 ? 2 * Math.PI : 360,
                    l = 1e-6;
                for (r in t)"useRadians" !== r && (a = (t[r] + "").split("_"), i = a[0], s = parseFloat("function" != typeof e[r] ? e[r] : e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), o = this.finals[r] = "string" == typeof i && "=" === i.charAt(1) ? s + parseInt(i.charAt(0) + "1", 10) * Number(i.substr(2)) : Number(i) || 0, u = o - s, a.length && (i = a.join("_"), -1 !== i.indexOf("short") && (u %= f, u !== u % (f / 2) && (u = 0 > u ? u + f : u - f)), -1 !== i.indexOf("_cw") && 0 > u ? u = (u + 9999999999 * f) % f - (u / f | 0) * f : -1 !== i.indexOf("ccw") && u > 0 && (u = (u - 9999999999 * f) % f - (u / f | 0) * f)), (u > l || -l > u) && (this._addTween(e, r, s, s + u, r), this._overwriteProps.push(r)));
                return !0
            },
            set: function (e) {
                var t;
                if (1 !== e) this._super.setRatio.call(this, e);
                else for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p],
                    t = t._next
            }
        })._autoCSS = !0,
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (e) {
            var t, n, r, i = _gsScope.GreenSockGlobals || _gsScope,
                s = i.com.greensock,
                o = 2 * Math.PI,
                u = Math.PI / 2,
                a = s._class,
                f = function (t, n) {
                    var r = a("easing." + t, function () {
                        }, !0),
                        i = r.prototype = new e;
                    return i.constructor = r,
                        i.getRatio = n,
                        r
                },
                l = e.register ||
                    function () {
                    },
                c = function (e, t, n, r, i) {
                    var s = a("easing." + e, {
                        easeOut: new t,
                        easeIn: new n,
                        easeInOut: new r
                    }, !0);
                    return l(s, e),
                        s
                },
                h = function (e, t, n) {
                    this.t = e,
                        this.v = t,
                    n && (this.next = n, n.prev = this, this.c = n.v - t, this.gap = n.t - e)
                },
                p = function (t, n) {
                    var r = a("easing." + t, function (e) {
                            this._p1 = e || 0 === e ? e : 1.70158,
                                this._p2 = 1.525 * this._p1
                        }, !0),
                        i = r.prototype = new e;
                    return i.constructor = r,
                        i.getRatio = n,
                        i.config = function (e) {
                            return new r(e)
                        },
                        r
                },
                d = c("Back", p("BackOut", function (e) {
                    return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
                }), p("BackIn", function (e) {
                    return e * e * ((this._p1 + 1) * e - this._p1)
                }), p("BackInOut", function (e) {
                    return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
                })),
                v = a("easing.SlowMo", function (e, t, n) {
                    t = t || 0 === t ? t : .7,
                        null == e ? e = .7 : e > 1 && (e = 1),
                        this._p = 1 !== e ? t : 0,
                        this._p1 = (1 - e) / 2,
                        this._p2 = e,
                        this._p3 = this._p1 + this._p2,
                        this._calcEnd = n === !0
                }, !0),
                m = v.prototype = new e;
            return m.constructor = v,
                m.getRatio = function (e) {
                    var t = e + (.5 - e) * this._p;
                    return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
                },
                v.ease = new v(.7, .7),
                m.config = v.config = function (e, t, n) {
                    return new v(e, t, n)
                },
                t = a("easing.SteppedEase", function (e) {
                    e = e || 1,
                        this._p1 = 1 / e,
                        this._p2 = e + 1
                }, !0),
                m = t.prototype = new e,
                m.constructor = t,
                m.getRatio = function (e) {
                    return 0 > e ? e = 0 : e >= 1 && (e = .999999999),
                    (this._p2 * e >> 0) * this._p1
                },
                m.config = t.config = function (e) {
                    return new t(e)
                },
                n = a("easing.RoughEase", function (t) {
                    t = t || {};
                    for (var n, r, i, s, o, u, a = t.taper || "none", f = [], l = 0, c = 0 | (t.points || 20), p = c, d = t.randomize !== !1, v = t.clamp === !0, m = t.template instanceof e ? t.template : null, g = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1;) n = d ? Math.random() : 1 / c * p,
                        r = m ? m.getRatio(n) : n,
                        "none" === a ? i = g : "out" === a ? (s = 1 - n, i = s * s * g) : "in" === a ? i = n * n * g : .5 > n ? (s = 2 * n, i = s * s * .5 * g) : (s = 2 * (1 - n), i = s * s * .5 * g),
                        d ? r += Math.random() * i - .5 * i : p % 2 ? r += .5 * i : r -= .5 * i,
                    v && (r > 1 ? r = 1 : 0 > r && (r = 0)),
                        f[l++] = {
                            x: n,
                            y: r
                        };
                    for (f.sort(function (e, t) {
                        return e.x - t.x
                    }), u = new h(1, 1, null), p = c; --p > -1;) o = f[p],
                        u = new h(o.x, o.y, u);
                    this._prev = new h(0, 0, 0 !== u.t ? u : u.next)
                }, !0),
                m = n.prototype = new e,
                m.constructor = n,
                m.getRatio = function (e) {
                    var t = this._prev;
                    if (e > t.t) {
                        for (; t.next && e >= t.t;) t = t.next;
                        t = t.prev
                    } else for (; t.prev && e <= t.t;) t = t.prev;
                    return this._prev = t,
                    t.v + (e - t.t) / t.gap * t.c
                },
                m.config = function (e) {
                    return new n(e)
                },
                n.ease = new n,
                c("Bounce", f("BounceOut", function (e) {
                    return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                }), f("BounceIn", function (e) {
                    return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
                }), f("BounceInOut", function (e) {
                    var t = .5 > e;
                    return e = t ? 1 - 2 * e : 2 * e - 1,
                        e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375,
                        t ? .5 * (1 - e) : .5 * e + .5
                })),
                c("Circ", f("CircOut", function (e) {
                    return Math.sqrt(1 - (e -= 1) * e)
                }), f("CircIn", function (e) {
                    return -(Math.sqrt(1 - e * e) - 1)
                }), f("CircInOut", function (e) {
                    return (e *= 2) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                })),
                r = function (t, n, r) {
                    var i = a("easing." + t, function (e, t) {
                            this._p1 = e >= 1 ? e : 1,
                                this._p2 = (t || r) / (1 > e ? e : 1),
                                this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0),
                                this._p2 = o / this._p2
                        }, !0),
                        s = i.prototype = new e;
                    return s.constructor = i,
                        s.getRatio = n,
                        s.config = function (e, t) {
                            return new i(e, t)
                        },
                        i
                },
                c("Elastic", r("ElasticOut", function (e) {
                    return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
                }, .3), r("ElasticIn", function (e) {
                    return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
                }, .3), r("ElasticInOut", function (e) {
                    return (e *= 2) < 1 ? -0.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * .5 + 1
                }, .45)),
                c("Expo", f("ExpoOut", function (e) {
                    return 1 - Math.pow(2, -10 * e)
                }), f("ExpoIn", function (e) {
                    return Math.pow(2, 10 * (e - 1)) - .001
                }), f("ExpoInOut", function (e) {
                    return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
                })),
                c("Sine", f("SineOut", function (e) {
                    return Math.sin(e * u)
                }), f("SineIn", function (e) {
                    return -Math.cos(e * u) + 1
                }), f("SineInOut", function (e) {
                    return -0.5 * (Math.cos(Math.PI * e) - 1)
                })),
                a("easing.EaseLookup", {
                    find: function (t) {
                        return e.map[t]
                    }
                }, !0),
                l(i.SlowMo, "SlowMo", "ease,"),
                l(n, "RoughEase", "ease,"),
                l(t, "SteppedEase", "ease,"),
                d
        }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()();