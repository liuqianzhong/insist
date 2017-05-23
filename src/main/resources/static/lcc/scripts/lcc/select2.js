(function (e, t) {
    "use strict";

    function p(e) {
        var t, n, r, i;
        if (!e || e.length < 1) return e;
        t = "";
        for (n = 0, r = e.length; n < r; n++) i = e.charAt(n),
            t += h[i] || i;
        return t
    }
    function d(e, t) {
        var n = 0,
            r = t.length;
        for (; n < r; n += 1) if (m(e, t[n])) return n;
        return -1
    }
    function v() {
        var t = e(c);
        t.appendTo("body");
        var n = {
            width: t.width() - t[0].clientWidth,
            height: t.height() - t[0].clientHeight
        };
        return t.remove(),
            n
    }
    function m(e, n) {
        return e === n ? !0 : e === t || n === t ? !1 : e === null || n === null ? !1 : e.constructor === String ? e + "" == n + "" : n.constructor === String ? n + "" == e + "" : !1
    }
    function g(t, n) {
        var r, i, s;
        if (t === null || t.length < 1) return [];
        r = t.split(n);
        for (i = 0, s = r.length; i < s; i += 1) r[i] = e.trim(r[i]);
        return r
    }
    function y(e) {
        return e.outerWidth(!1) - e.width()
    }
    function b(n) {
        var r = "keyup-change-value";
        n.on("keydown", function () {
            e.data(n, r) === t && e.data(n, r, n.val())
        }),
            n.on("keyup", function () {
                var i = e.data(n, r);
                i !== t && n.val() !== i && (e.removeData(n, r), n.trigger("keyup-change"))
            })
    }
    function w(n) {
        n.on("mousemove", function (n) {
            var r = a;
            (r === t || r.x !== n.pageX || r.y !== n.pageY) && e(n.target).trigger("mousemove-filtered", n)
        })
    }
    function E(e, n, r) {
        r = r || t;
        var i;
        return function () {
            var t = arguments;
            window.clearTimeout(i),
                i = window.setTimeout(function () {
                    n.apply(r, t)
                }, e)
        }
    }
    function S(e) {
        var t = !1,
            n;
        return function () {
            return t === !1 && (n = e(), t = !0),
                n
        }
    }
    function x(e, t) {
        var n = E(e, function (e) {
            t.trigger("scroll-debounced", e)
        });
        t.on("scroll", function (e) {
            d(e.target, t.get()) >= 0 && n(e)
        })
    }
    function T(e) {
        if (e[0] === document.activeElement) return;
        window.setTimeout(function () {
            var t = e[0],
                n = e.val().length,
                r;
            e.focus(),
            e.is(":visible") && t === document.activeElement && (t.setSelectionRange ? t.setSelectionRange(n, n) : t.createTextRange && (r = t.createTextRange(), r.collapse(!1), r.select()))
        }, 0)
    }
    function N(t) {
        t = e(t)[0];
        var n = 0,
            r = 0;
        if ("selectionStart" in t) n = t.selectionStart,
            r = t.selectionEnd - n;
        else if ("selection" in document) {
            t.focus();
            var i = document.selection.createRange();
            r = document.selection.createRange().text.length,
                i.moveStart("character", -t.value.length),
                n = i.text.length - r
        }
        return {
            offset: n,
            length: r
        }
    }
    function C(e) {
        e.preventDefault(),
            e.stopPropagation()
    }
    function k(e) {
        e.preventDefault(),
            e.stopImmediatePropagation()
    }
    function L(t) {
        if (!u) {
            var n = t[0].currentStyle || window.getComputedStyle(t[0], null);
            u = e(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: n.fontSize,
                fontFamily: n.fontFamily,
                fontStyle: n.fontStyle,
                fontWeight: n.fontWeight,
                letterSpacing: n.letterSpacing,
                textTransform: n.textTransform,
                whiteSpace: "nowrap"
            }),
                u.attr("class", "select2-sizer"),
                e("body").append(u)
        }
        return u.text(t.val()),
            u.width()
    }
    function A(t, n, r) {
        var i, s = [],
            o;
        i = t.attr("class"),
        i && (i = "" + i, e(i.split(" ")).each2(function () {
            this.indexOf("select2-") === 0 && s.push(this)
        })),
            i = n.attr("class"),
        i && (i = "" + i, e(i.split(" ")).each2(function () {
            this.indexOf("select2-") !== 0 && (o = r(this), o && s.push(o))
        })),
            t.attr("class", s.join(" "))
    }
    function O(e, t, n, r) {
        var i = p(e.toUpperCase()).indexOf(p(t.toUpperCase())),
            s = t.length;
        if (i < 0) {
            n.push(r(e));
            return
        }
        n.push(r(e.substring(0, i))),
            n.push("<span class='select2-match'>"),
            n.push(r(e.substring(i, i + s))),
            n.push("</span>"),
            n.push(r(e.substring(i + s, e.length)))
    }
    function M(e) {
        var t = {
            "\\": "&#92;",
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#47;"
        };
        return String(e).replace(/[&<>"'\/\\]/g, function (e) {
            return t[e]
        })
    }
    function _(n) {
        var r, i = null,
            s = n.quietMillis || 100,
            o = n.url,
            u = this;
        return function (a) {
            window.clearTimeout(r),
                r = window.setTimeout(function () {
                    var r = n.data,
                        s = o,
                        f = n.transport || e.fn.select2.ajaxDefaults.transport,
                        l = {
                            type: n.type || "GET",
                            cache: n.cache || !1,
                            jsonpCallback: n.jsonpCallback || t,
                            dataType: n.dataType || "json"
                        },
                        c = e.extend({}, e.fn.select2.ajaxDefaults.params, l);
                    r = r ? r.call(u, a.term, a.page, a.context) : null,
                        s = typeof s == "function" ? s.call(u, a.term, a.page, a.context) : s,
                    i && i.abort(),
                    n.params && (e.isFunction(n.params) ? e.extend(c, n.params.call(u)) : e.extend(c, n.params)),
                        e.extend(c, {
                            url: s,
                            dataType: n.dataType,
                            data: r,
                            success: function (e) {
                                var t = n.results(e, a.page);
                                a.callback(t)
                            }
                        }),
                        i = f.call(u, c)
                }, s)
        }
    }
    function D(t) {
        var n = t,
            r, i, s = function (e) {
                return "" + e.text
            };
        e.isArray(n) && (i = n, n = {
            results: i
        }),
        e.isFunction(n) === !1 && (i = n, n = function () {
            return i
        });
        var o = n();
        return o.text && (s = o.text, e.isFunction(s) || (r = o.text, s = function (e) {
            return e[r]
        })),


            function (t) {
                var r = t.term,
                    i = {
                        results: []
                    },
                    o;
                if (r === "") {
                    t.callback(n());
                    return
                }
                o = function (n, i) {
                    var u, a;
                    n = n[0];
                    if (n.children) {
                        u = {};
                        for (a in n) n.hasOwnProperty(a) && (u[a] = n[a]);
                        u.children = [],
                            e(n.children).each2(function (e, t) {
                                o(t, u.children)
                            }),
                        (u.children.length || t.matcher(r, s(u), n)) && i.push(u)
                    } else t.matcher(r, s(n), n) && i.push(n)
                },
                    e(n().results).each2(function (e, t) {
                        o(t, i.results)
                    }),
                    t.callback(i)
            }
    }
    function P(n) {
        var r = e.isFunction(n);
        return function (i) {
            var s = i.term,
                o = {
                    results: []
                };
            e(r ? n() : n).each(function () {
                var e = this.text !== t,
                    n = e ? this.text : this;
                (s === "" || i.matcher(s, n)) && o.results.push(e ? this : {
                        id: this,
                        text: this
                    })
            }),
                i.callback(o)
        }
    }
    function H(t, n) {
        if (e.isFunction(t)) return !0;
        if (!t) return !1;
        throw new Error(n + " must be a function or a falsy value")
    }
    function B(t) {
        return e.isFunction(t) ? t() : t
    }
    function j(t) {
        var n = 0;
        return e.each(t, function (e, t) {
            t.children ? n += j(t.children) : n++
        }),
            n
    }
    function F(e, n, r, i) {
        var s = e,
            o = !1,
            u, a, f, l, c;
        if (!i.createSearchChoice || !i.tokenSeparators || i.tokenSeparators.length < 1) return t;
        for (;;) {
            a = -1;
            for (f = 0, l = i.tokenSeparators.length; f < l; f++) {
                c = i.tokenSeparators[f],
                    a = e.indexOf(c);
                if (a >= 0) break
            }
            if (a < 0) break;
            u = e.substring(0, a),
                e = e.substring(a + c.length);
            if (u.length > 0) {
                u = i.createSearchChoice.call(this, u, n);
                if (u !== t && u !== null && i.id(u) !== t && i.id(u) !== null) {
                    o = !1;
                    for (f = 0, l = n.length; f < l; f++) if (m(i.id(u), i.id(n[f]))) {
                        o = !0;
                        break
                    }
                    o || r(u)
                }
            }
        }
        if (s !== e) return e
    }
    function I(t, n) {
        var r = function () {};
        return r.prototype = new t,
            r.prototype.constructor = r,
            r.prototype.parent = t.prototype,
            r.prototype = e.extend(r.prototype, n),
            r
    }
    if (window.Select2 !== t) return;
    var n, r, i, s, o, u, a = {
            x: 0,
            y: 0
        },
        f, l, n = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function (e) {
                e = e.which ? e.which : e;
                switch (e) {
                    case n.LEFT:
                    case n.RIGHT:
                    case n.UP:
                    case n.DOWN:
                        return !0
                }
                return !1
            },
            isControl: function (e) {
                var t = e.which;
                switch (t) {
                    case n.SHIFT:
                    case n.CTRL:
                    case n.ALT:
                        return !0
                }
                return e.metaKey ? !0 : !1
            },
            isFunctionKey: function (e) {
                return e = e.which ? e.which : e,
                e >= 112 && e <= 123
            }
        },
        c = "<div class='select2-measure-scrollbar'></div>",
        h = {
            "Ⓐ": "A",
            "Ａ": "A",
            "À": "A",
            "Á": "A",
            "Â": "A",
            "Ầ": "A",
            "Ấ": "A",
            "Ẫ": "A",
            "Ẩ": "A",
            "Ã": "A",
            "Ā": "A",
            "Ă": "A",
            "Ằ": "A",
            "Ắ": "A",
            "Ẵ": "A",
            "Ẳ": "A",
            "Ȧ": "A",
            "Ǡ": "A",
            "Ä": "A",
            "Ǟ": "A",
            "Ả": "A",
            "Å": "A",
            "Ǻ": "A",
            "Ǎ": "A",
            "Ȁ": "A",
            "Ȃ": "A",
            "Ạ": "A",
            "Ậ": "A",
            "Ặ": "A",
            "Ḁ": "A",
            "Ą": "A",
            "Ⱥ": "A",
            "Ɐ": "A",
            "Ꜳ": "AA",
            "Æ": "AE",
            "Ǽ": "AE",
            "Ǣ": "AE",
            "Ꜵ": "AO",
            "Ꜷ": "AU",
            "Ꜹ": "AV",
            "Ꜻ": "AV",
            "Ꜽ": "AY",
            "Ⓑ": "B",
            "Ｂ": "B",
            "Ḃ": "B",
            "Ḅ": "B",
            "Ḇ": "B",
            "Ƀ": "B",
            "Ƃ": "B",
            "Ɓ": "B",
            "Ⓒ": "C",
            "Ｃ": "C",
            "Ć": "C",
            "Ĉ": "C",
            "Ċ": "C",
            "Č": "C",
            "Ç": "C",
            "Ḉ": "C",
            "Ƈ": "C",
            "Ȼ": "C",
            "Ꜿ": "C",
            "Ⓓ": "D",
            "Ｄ": "D",
            "Ḋ": "D",
            "Ď": "D",
            "Ḍ": "D",
            "Ḑ": "D",
            "Ḓ": "D",
            "Ḏ": "D",
            "Đ": "D",
            "Ƌ": "D",
            "Ɗ": "D",
            "Ɖ": "D",
            "Ꝺ": "D",
            "Ǳ": "DZ",
            "Ǆ": "DZ",
            "ǲ": "Dz",
            "ǅ": "Dz",
            "Ⓔ": "E",
            "Ｅ": "E",
            "È": "E",
            "É": "E",
            "Ê": "E",
            "Ề": "E",
            "Ế": "E",
            "Ễ": "E",
            "Ể": "E",
            "Ẽ": "E",
            "Ē": "E",
            "Ḕ": "E",
            "Ḗ": "E",
            "Ĕ": "E",
            "Ė": "E",
            "Ë": "E",
            "Ẻ": "E",
            "Ě": "E",
            "Ȅ": "E",
            "Ȇ": "E",
            "Ẹ": "E",
            "Ệ": "E",
            "Ȩ": "E",
            "Ḝ": "E",
            "Ę": "E",
            "Ḙ": "E",
            "Ḛ": "E",
            "Ɛ": "E",
            "Ǝ": "E",
            "Ⓕ": "F",
            "Ｆ": "F",
            "Ḟ": "F",
            "Ƒ": "F",
            "Ꝼ": "F",
            "Ⓖ": "G",
            "Ｇ": "G",
            "Ǵ": "G",
            "Ĝ": "G",
            "Ḡ": "G",
            "Ğ": "G",
            "Ġ": "G",
            "Ǧ": "G",
            "Ģ": "G",
            "Ǥ": "G",
            "Ɠ": "G",
            "Ꞡ": "G",
            "Ᵹ": "G",
            "Ꝿ": "G",
            "Ⓗ": "H",
            "Ｈ": "H",
            "Ĥ": "H",
            "Ḣ": "H",
            "Ḧ": "H",
            "Ȟ": "H",
            "Ḥ": "H",
            "Ḩ": "H",
            "Ḫ": "H",
            "Ħ": "H",
            "Ⱨ": "H",
            "Ⱶ": "H",
            "Ɥ": "H",
            "Ⓘ": "I",
            "Ｉ": "I",
            "Ì": "I",
            "Í": "I",
            "Î": "I",
            "Ĩ": "I",
            "Ī": "I",
            "Ĭ": "I",
            "İ": "I",
            "Ï": "I",
            "Ḯ": "I",
            "Ỉ": "I",
            "Ǐ": "I",
            "Ȉ": "I",
            "Ȋ": "I",
            "Ị": "I",
            "Į": "I",
            "Ḭ": "I",
            "Ɨ": "I",
            "Ⓙ": "J",
            "Ｊ": "J",
            "Ĵ": "J",
            "Ɉ": "J",
            "Ⓚ": "K",
            "Ｋ": "K",
            "Ḱ": "K",
            "Ǩ": "K",
            "Ḳ": "K",
            "Ķ": "K",
            "Ḵ": "K",
            "Ƙ": "K",
            "Ⱪ": "K",
            "Ꝁ": "K",
            "Ꝃ": "K",
            "Ꝅ": "K",
            "Ꞣ": "K",
            "Ⓛ": "L",
            "Ｌ": "L",
            "Ŀ": "L",
            "Ĺ": "L",
            "Ľ": "L",
            "Ḷ": "L",
            "Ḹ": "L",
            "Ļ": "L",
            "Ḽ": "L",
            "Ḻ": "L",
            "Ł": "L",
            "Ƚ": "L",
            "Ɫ": "L",
            "Ⱡ": "L",
            "Ꝉ": "L",
            "Ꝇ": "L",
            "Ꞁ": "L",
            "Ǉ": "LJ",
            "ǈ": "Lj",
            "Ⓜ": "M",
            "Ｍ": "M",
            "Ḿ": "M",
            "Ṁ": "M",
            "Ṃ": "M",
            "Ɱ": "M",
            "Ɯ": "M",
            "Ⓝ": "N",
            "Ｎ": "N",
            "Ǹ": "N",
            "Ń": "N",
            "Ñ": "N",
            "Ṅ": "N",
            "Ň": "N",
            "Ṇ": "N",
            "Ņ": "N",
            "Ṋ": "N",
            "Ṉ": "N",
            "Ƞ": "N",
            "Ɲ": "N",
            "Ꞑ": "N",
            "Ꞥ": "N",
            "Ǌ": "NJ",
            "ǋ": "Nj",
            "Ⓞ": "O",
            "Ｏ": "O",
            "Ò": "O",
            "Ó": "O",
            "Ô": "O",
            "Ồ": "O",
            "Ố": "O",
            "Ỗ": "O",
            "Ổ": "O",
            "Õ": "O",
            "Ṍ": "O",
            "Ȭ": "O",
            "Ṏ": "O",
            "Ō": "O",
            "Ṑ": "O",
            "Ṓ": "O",
            "Ŏ": "O",
            "Ȯ": "O",
            "Ȱ": "O",
            "Ö": "O",
            "Ȫ": "O",
            "Ỏ": "O",
            "Ő": "O",
            "Ǒ": "O",
            "Ȍ": "O",
            "Ȏ": "O",
            "Ơ": "O",
            "Ờ": "O",
            "Ớ": "O",
            "Ỡ": "O",
            "Ở": "O",
            "Ợ": "O",
            "Ọ": "O",
            "Ộ": "O",
            "Ǫ": "O",
            "Ǭ": "O",
            "Ø": "O",
            "Ǿ": "O",
            "Ɔ": "O",
            "Ɵ": "O",
            "Ꝋ": "O",
            "Ꝍ": "O",
            "Ƣ": "OI",
            "Ꝏ": "OO",
            "Ȣ": "OU",
            "Ⓟ": "P",
            "Ｐ": "P",
            "Ṕ": "P",
            "Ṗ": "P",
            "Ƥ": "P",
            "Ᵽ": "P",
            "Ꝑ": "P",
            "Ꝓ": "P",
            "Ꝕ": "P",
            "Ⓠ": "Q",
            "Ｑ": "Q",
            "Ꝗ": "Q",
            "Ꝙ": "Q",
            "Ɋ": "Q",
            "Ⓡ": "R",
            "Ｒ": "R",
            "Ŕ": "R",
            "Ṙ": "R",
            "Ř": "R",
            "Ȑ": "R",
            "Ȓ": "R",
            "Ṛ": "R",
            "Ṝ": "R",
            "Ŗ": "R",
            "Ṟ": "R",
            "Ɍ": "R",
            "Ɽ": "R",
            "Ꝛ": "R",
            "Ꞧ": "R",
            "Ꞃ": "R",
            "Ⓢ": "S",
            "Ｓ": "S",
            "ẞ": "S",
            "Ś": "S",
            "Ṥ": "S",
            "Ŝ": "S",
            "Ṡ": "S",
            "Š": "S",
            "Ṧ": "S",
            "Ṣ": "S",
            "Ṩ": "S",
            "Ș": "S",
            "Ş": "S",
            "Ȿ": "S",
            "Ꞩ": "S",
            "Ꞅ": "S",
            "Ⓣ": "T",
            "Ｔ": "T",
            "Ṫ": "T",
            "Ť": "T",
            "Ṭ": "T",
            "Ț": "T",
            "Ţ": "T",
            "Ṱ": "T",
            "Ṯ": "T",
            "Ŧ": "T",
            "Ƭ": "T",
            "Ʈ": "T",
            "Ⱦ": "T",
            "Ꞇ": "T",
            "Ꜩ": "TZ",
            "Ⓤ": "U",
            "Ｕ": "U",
            "Ù": "U",
            "Ú": "U",
            "Û": "U",
            "Ũ": "U",
            "Ṹ": "U",
            "Ū": "U",
            "Ṻ": "U",
            "Ŭ": "U",
            "Ü": "U",
            "Ǜ": "U",
            "Ǘ": "U",
            "Ǖ": "U",
            "Ǚ": "U",
            "Ủ": "U",
            "Ů": "U",
            "Ű": "U",
            "Ǔ": "U",
            "Ȕ": "U",
            "Ȗ": "U",
            "Ư": "U",
            "Ừ": "U",
            "Ứ": "U",
            "Ữ": "U",
            "Ử": "U",
            "Ự": "U",
            "Ụ": "U",
            "Ṳ": "U",
            "Ų": "U",
            "Ṷ": "U",
            "Ṵ": "U",
            "Ʉ": "U",
            "Ⓥ": "V",
            "Ｖ": "V",
            "Ṽ": "V",
            "Ṿ": "V",
            "Ʋ": "V",
            "Ꝟ": "V",
            "Ʌ": "V",
            "Ꝡ": "VY",
            "Ⓦ": "W",
            "Ｗ": "W",
            "Ẁ": "W",
            "Ẃ": "W",
            "Ŵ": "W",
            "Ẇ": "W",
            "Ẅ": "W",
            "Ẉ": "W",
            "Ⱳ": "W",
            "Ⓧ": "X",
            "Ｘ": "X",
            "Ẋ": "X",
            "Ẍ": "X",
            "Ⓨ": "Y",
            "Ｙ": "Y",
            "Ỳ": "Y",
            "Ý": "Y",
            "Ŷ": "Y",
            "Ỹ": "Y",
            "Ȳ": "Y",
            "Ẏ": "Y",
            "Ÿ": "Y",
            "Ỷ": "Y",
            "Ỵ": "Y",
            "Ƴ": "Y",
            "Ɏ": "Y",
            "Ỿ": "Y",
            "Ⓩ": "Z",
            "Ｚ": "Z",
            "Ź": "Z",
            "Ẑ": "Z",
            "Ż": "Z",
            "Ž": "Z",
            "Ẓ": "Z",
            "Ẕ": "Z",
            "Ƶ": "Z",
            "Ȥ": "Z",
            "Ɀ": "Z",
            "Ⱬ": "Z",
            "Ꝣ": "Z",
            "ⓐ": "a",
            "ａ": "a",
            "ẚ": "a",
            "à": "a",
            "á": "a",
            "â": "a",
            "ầ": "a",
            "ấ": "a",
            "ẫ": "a",
            "ẩ": "a",
            "ã": "a",
            "ā": "a",
            "ă": "a",
            "ằ": "a",
            "ắ": "a",
            "ẵ": "a",
            "ẳ": "a",
            "ȧ": "a",
            "ǡ": "a",
            "ä": "a",
            "ǟ": "a",
            "ả": "a",
            "å": "a",
            "ǻ": "a",
            "ǎ": "a",
            "ȁ": "a",
            "ȃ": "a",
            "ạ": "a",
            "ậ": "a",
            "ặ": "a",
            "ḁ": "a",
            "ą": "a",
            "ⱥ": "a",
            "ɐ": "a",
            "ꜳ": "aa",
            "æ": "ae",
            "ǽ": "ae",
            "ǣ": "ae",
            "ꜵ": "ao",
            "ꜷ": "au",
            "ꜹ": "av",
            "ꜻ": "av",
            "ꜽ": "ay",
            "ⓑ": "b",
            "ｂ": "b",
            "ḃ": "b",
            "ḅ": "b",
            "ḇ": "b",
            "ƀ": "b",
            "ƃ": "b",
            "ɓ": "b",
            "ⓒ": "c",
            "ｃ": "c",
            "ć": "c",
            "ĉ": "c",
            "ċ": "c",
            "č": "c",
            "ç": "c",
            "ḉ": "c",
            "ƈ": "c",
            "ȼ": "c",
            "ꜿ": "c",
            "ↄ": "c",
            "ⓓ": "d",
            "ｄ": "d",
            "ḋ": "d",
            "ď": "d",
            "ḍ": "d",
            "ḑ": "d",
            "ḓ": "d",
            "ḏ": "d",
            "đ": "d",
            "ƌ": "d",
            "ɖ": "d",
            "ɗ": "d",
            "ꝺ": "d",
            "ǳ": "dz",
            "ǆ": "dz",
            "ⓔ": "e",
            "ｅ": "e",
            "è": "e",
            "é": "e",
            "ê": "e",
            "ề": "e",
            "ế": "e",
            "ễ": "e",
            "ể": "e",
            "ẽ": "e",
            "ē": "e",
            "ḕ": "e",
            "ḗ": "e",
            "ĕ": "e",
            "ė": "e",
            "ë": "e",
            "ẻ": "e",
            "ě": "e",
            "ȅ": "e",
            "ȇ": "e",
            "ẹ": "e",
            "ệ": "e",
            "ȩ": "e",
            "ḝ": "e",
            "ę": "e",
            "ḙ": "e",
            "ḛ": "e",
            "ɇ": "e",
            "ɛ": "e",
            "ǝ": "e",
            "ⓕ": "f",
            "ｆ": "f",
            "ḟ": "f",
            "ƒ": "f",
            "ꝼ": "f",
            "ⓖ": "g",
            "ｇ": "g",
            "ǵ": "g",
            "ĝ": "g",
            "ḡ": "g",
            "ğ": "g",
            "ġ": "g",
            "ǧ": "g",
            "ģ": "g",
            "ǥ": "g",
            "ɠ": "g",
            "ꞡ": "g",
            "ᵹ": "g",
            "ꝿ": "g",
            "ⓗ": "h",
            "ｈ": "h",
            "ĥ": "h",
            "ḣ": "h",
            "ḧ": "h",
            "ȟ": "h",
            "ḥ": "h",
            "ḩ": "h",
            "ḫ": "h",
            "ẖ": "h",
            "ħ": "h",
            "ⱨ": "h",
            "ⱶ": "h",
            "ɥ": "h",
            "ƕ": "hv",
            "ⓘ": "i",
            "ｉ": "i",
            "ì": "i",
            "í": "i",
            "î": "i",
            "ĩ": "i",
            "ī": "i",
            "ĭ": "i",
            "ï": "i",
            "ḯ": "i",
            "ỉ": "i",
            "ǐ": "i",
            "ȉ": "i",
            "ȋ": "i",
            "ị": "i",
            "į": "i",
            "ḭ": "i",
            "ɨ": "i",
            "ı": "i",
            "ⓙ": "j",
            "ｊ": "j",
            "ĵ": "j",
            "ǰ": "j",
            "ɉ": "j",
            "ⓚ": "k",
            "ｋ": "k",
            "ḱ": "k",
            "ǩ": "k",
            "ḳ": "k",
            "ķ": "k",
            "ḵ": "k",
            "ƙ": "k",
            "ⱪ": "k",
            "ꝁ": "k",
            "ꝃ": "k",
            "ꝅ": "k",
            "ꞣ": "k",
            "ⓛ": "l",
            "ｌ": "l",
            "ŀ": "l",
            "ĺ": "l",
            "ľ": "l",
            "ḷ": "l",
            "ḹ": "l",
            "ļ": "l",
            "ḽ": "l",
            "ḻ": "l",
            "ſ": "l",
            "ł": "l",
            "ƚ": "l",
            "ɫ": "l",
            "ⱡ": "l",
            "ꝉ": "l",
            "ꞁ": "l",
            "ꝇ": "l",
            "ǉ": "lj",
            "ⓜ": "m",
            "ｍ": "m",
            "ḿ": "m",
            "ṁ": "m",
            "ṃ": "m",
            "ɱ": "m",
            "ɯ": "m",
            "ⓝ": "n",
            "ｎ": "n",
            "ǹ": "n",
            "ń": "n",
            "ñ": "n",
            "ṅ": "n",
            "ň": "n",
            "ṇ": "n",
            "ņ": "n",
            "ṋ": "n",
            "ṉ": "n",
            "ƞ": "n",
            "ɲ": "n",
            "ŉ": "n",
            "ꞑ": "n",
            "ꞥ": "n",
            "ǌ": "nj",
            "ⓞ": "o",
            "ｏ": "o",
            "ò": "o",
            "ó": "o",
            "ô": "o",
            "ồ": "o",
            "ố": "o",
            "ỗ": "o",
            "ổ": "o",
            "õ": "o",
            "ṍ": "o",
            "ȭ": "o",
            "ṏ": "o",
            "ō": "o",
            "ṑ": "o",
            "ṓ": "o",
            "ŏ": "o",
            "ȯ": "o",
            "ȱ": "o",
            "ö": "o",
            "ȫ": "o",
            "ỏ": "o",
            "ő": "o",
            "ǒ": "o",
            "ȍ": "o",
            "ȏ": "o",
            "ơ": "o",
            "ờ": "o",
            "ớ": "o",
            "ỡ": "o",
            "ở": "o",
            "ợ": "o",
            "ọ": "o",
            "ộ": "o",
            "ǫ": "o",
            "ǭ": "o",
            "ø": "o",
            "ǿ": "o",
            "ɔ": "o",
            "ꝋ": "o",
            "ꝍ": "o",
            "ɵ": "o",
            "ƣ": "oi",
            "ȣ": "ou",
            "ꝏ": "oo",
            "ⓟ": "p",
            "ｐ": "p",
            "ṕ": "p",
            "ṗ": "p",
            "ƥ": "p",
            "ᵽ": "p",
            "ꝑ": "p",
            "ꝓ": "p",
            "ꝕ": "p",
            "ⓠ": "q",
            "ｑ": "q",
            "ɋ": "q",
            "ꝗ": "q",
            "ꝙ": "q",
            "ⓡ": "r",
            "ｒ": "r",
            "ŕ": "r",
            "ṙ": "r",
            "ř": "r",
            "ȑ": "r",
            "ȓ": "r",
            "ṛ": "r",
            "ṝ": "r",
            "ŗ": "r",
            "ṟ": "r",
            "ɍ": "r",
            "ɽ": "r",
            "ꝛ": "r",
            "ꞧ": "r",
            "ꞃ": "r",
            "ⓢ": "s",
            "ｓ": "s",
            "ß": "s",
            "ś": "s",
            "ṥ": "s",
            "ŝ": "s",
            "ṡ": "s",
            "š": "s",
            "ṧ": "s",
            "ṣ": "s",
            "ṩ": "s",
            "ș": "s",
            "ş": "s",
            "ȿ": "s",
            "ꞩ": "s",
            "ꞅ": "s",
            "ẛ": "s",
            "ⓣ": "t",
            "ｔ": "t",
            "ṫ": "t",
            "ẗ": "t",
            "ť": "t",
            "ṭ": "t",
            "ț": "t",
            "ţ": "t",
            "ṱ": "t",
            "ṯ": "t",
            "ŧ": "t",
            "ƭ": "t",
            "ʈ": "t",
            "ⱦ": "t",
            "ꞇ": "t",
            "ꜩ": "tz",
            "ⓤ": "u",
            "ｕ": "u",
            "ù": "u",
            "ú": "u",
            "û": "u",
            "ũ": "u",
            "ṹ": "u",
            "ū": "u",
            "ṻ": "u",
            "ŭ": "u",
            "ü": "u",
            "ǜ": "u",
            "ǘ": "u",
            "ǖ": "u",
            "ǚ": "u",
            "ủ": "u",
            "ů": "u",
            "ű": "u",
            "ǔ": "u",
            "ȕ": "u",
            "ȗ": "u",
            "ư": "u",
            "ừ": "u",
            "ứ": "u",
            "ữ": "u",
            "ử": "u",
            "ự": "u",
            "ụ": "u",
            "ṳ": "u",
            "ų": "u",
            "ṷ": "u",
            "ṵ": "u",
            "ʉ": "u",
            "ⓥ": "v",
            "ｖ": "v",
            "ṽ": "v",
            "ṿ": "v",
            "ʋ": "v",
            "ꝟ": "v",
            "ʌ": "v",
            "ꝡ": "vy",
            "ⓦ": "w",
            "ｗ": "w",
            "ẁ": "w",
            "ẃ": "w",
            "ŵ": "w",
            "ẇ": "w",
            "ẅ": "w",
            "ẘ": "w",
            "ẉ": "w",
            "ⱳ": "w",
            "ⓧ": "x",
            "ｘ": "x",
            "ẋ": "x",
            "ẍ": "x",
            "ⓨ": "y",
            "ｙ": "y",
            "ỳ": "y",
            "ý": "y",
            "ŷ": "y",
            "ỹ": "y",
            "ȳ": "y",
            "ẏ": "y",
            "ÿ": "y",
            "ỷ": "y",
            "ẙ": "y",
            "ỵ": "y",
            "ƴ": "y",
            "ɏ": "y",
            "ỿ": "y",
            "ⓩ": "z",
            "ｚ": "z",
            "ź": "z",
            "ẑ": "z",
            "ż": "z",
            "ž": "z",
            "ẓ": "z",
            "ẕ": "z",
            "ƶ": "z",
            "ȥ": "z",
            "ɀ": "z",
            "ⱬ": "z",
            "ꝣ": "z"
        };
    f = e(document),
        o = function () {
            var e = 1;
            return function () {
                return e++
            }
        }(),
        f.on("mousemove", function (e) {
            a.x = e.pageX,
                a.y = e.pageY
        }),
        r = I(Object, {
            bind: function (e) {
                var t = this;
                return function () {
                    e.apply(t, arguments)
                }
            },
            init: function (n) {
                var r, i, s = ".select2-results";
                this.opts = n = this.prepareOpts(n),
                    this.id = n.id,
                n.element.data("select2") !== t && n.element.data("select2") !== null && n.element.data("select2").destroy(),
                    this.container = this.createContainer(),
                    this.containerId = "s2id_" + (n.element.attr("id") || "autogen" + o()),
                    this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"),
                    this.container.attr("id", this.containerId),
                    this.body = S(function () {
                        return n.element.closest("body")
                    }),
                    A(this.container, this.opts.element, this.opts.adaptContainerCssClass),
                    this.container.attr("style", n.element.attr("style")),
                    this.container.css(B(n.containerCss)),
                    this.container.addClass(B(n.containerCssClass)),
                    this.elementTabIndex = this.opts.element.attr("tabindex"),
                    this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", C),
                    this.container.data("select2", this),
                    this.dropdown = this.container.find(".select2-drop"),
                    A(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass),
                    this.dropdown.addClass(B(n.dropdownCssClass)),
                    this.dropdown.data("select2", this),
                    this.dropdown.on("click", C),
                    this.results = r = this.container.find(s),
                    this.search = i = this.container.find("input.select2-input"),
                    this.queryCount = 0,
                    this.resultsPage = 0,
                    this.context = null,
                    this.initContainer(),
                    this.container.on("click", C),
                    w(this.results),
                    this.dropdown.on("mousemove-filtered touchstart touchmove touchend", s, this.bind(this.highlightUnderEvent)),
                    x(80, this.results),
                    this.dropdown.on("scroll-debounced", s, this.bind(this.loadMoreIfNeeded)),
                    e(this.container).on("change", ".select2-input", function (e) {
                        e.stopPropagation()
                    }),
                    e(this.dropdown).on("change", ".select2-input", function (e) {
                        e.stopPropagation()
                    }),
                e.fn.mousewheel && r.mousewheel(function (e, t, n, i) {
                    var s = r.scrollTop();
                    i > 0 && s - i <= 0 ? (r.scrollTop(0), C(e)) : i < 0 && r.get(0).scrollHeight - r.scrollTop() + i <= r.height() && (r.scrollTop(r.get(0).scrollHeight - r.height()), C(e))
                }),
                    b(i),
                    i.on("keyup-change input paste", this.bind(this.updateResults)),
                    i.on("focus", function () {
                        i.addClass("select2-focused")
                    }),
                    i.on("blur", function () {
                        i.removeClass("select2-focused")
                    }),
                    this.dropdown.on("mouseup", s, this.bind(function (t) {
                        e(t.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(t), this.selectHighlighted(t))
                    })),
                    this.dropdown.on("click mouseup mousedown", function (e) {
                        e.stopPropagation()
                    }),
                e.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()),
                n.maximumInputLength !== null && this.search.attr("maxlength", n.maximumInputLength);
                var u = n.element.prop("disabled");
                u === t && (u = !1),
                    this.enable(!u);
                var a = n.element.prop("readonly");
                a === t && (a = !1),
                    this.readonly(a),
                    l = l || v(),
                    this.autofocus = n.element.prop("autofocus"),
                    n.element.prop("autofocus", !1),
                this.autofocus && this.focus(),
                    this.nextSearchTerm = t
            },
            destroy: function () {
                var e = this.opts.element,
                    n = e.data("select2");
                this.close(),
                this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null),
                n !== t && (n.container.remove(), n.dropdown.remove(), e.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), this.elementTabIndex ? e.attr({
                        tabindex: this.elementTabIndex
                    }) : e.removeAttr("tabindex"), e.show())
            },
            optionToData: function (e) {
                if (e.is("option")) return {
                    id: e.prop("value"),
                    text: e.text(),
                    element: e.get(),
                    css: e.attr("class"),
                    disabled: e.prop("disabled"),
                    locked: m(e.attr("locked"), "locked") || m(e.data("locked"), !0)
                };
                if (e.is("optgroup")) return {
                    text: e.attr("label"),
                    children: [],
                    element: e.get(),
                    css: e.attr("class")
                }
            },
            prepareOpts: function (n) {
                var r, i, s, o, u = this;
                r = n.element,
                r.get(0).tagName.toLowerCase() === "select" && (this.select = i = n.element),
                i && e.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in n) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                }),
                    n = e.extend({}, {
                        populateResults: function (r, i, s) {
                            var o, a = this.opts.id;
                            o = function (r, i, f) {
                                var l, c, h, p, d, v, m, g, y, b;
                                r = n.sortResults(r, i, s);
                                for (l = 0, c = r.length; l < c; l += 1) h = r[l],
                                    d = h.disabled === !0,
                                    p = !d && a(h) !== t,
                                    v = h.children && h.children.length > 0,
                                    m = e("<li></li>"),
                                    m.addClass("select2-results-dept-" + f),
                                    m.addClass("select2-result"),
                                    m.addClass(p ? "select2-result-selectable" : "select2-result-unselectable"),
                                d && m.addClass("select2-disabled"),
                                v && m.addClass("select2-result-with-children"),
                                    m.addClass(u.opts.formatResultCssClass(h)),
                                    g = e(document.createElement("div")),
                                    g.addClass("select2-result-label"),
                                    b = n.formatResult(h, g, s, u.opts.escapeMarkup),
                                b !== t && g.html(b),
                                    m.append(g),
                                v && (y = e("<ul></ul>"), y.addClass("select2-result-sub"), o(h.children, y, f + 1), m.append(y)),
                                    m.data("select2-data", h),
                                    i.append(m)
                            },
                                o(i, r, 0)
                        }
                    }, e.fn.select2.defaults, n),
                typeof n.id != "function" && (s = n.id, n.id = function (e) {
                    return e[s]
                });
                if (e.isArray(n.element.data("select2Tags"))) {
                    if ("tags" in n) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + n.element.attr("id");
                    n.tags = n.element.data("select2Tags")
                }
                i ? (n.query = this.bind(function (e) {
                        var n = {
                                results: [],
                                more: !1
                            },
                            i = e.term,
                            s, o, a;
                        a = function (t, n) {
                            var r;
                            t.is("option") ? e.matcher(i, t.text(), t) && n.push(u.optionToData(t)) : t.is("optgroup") && (r = u.optionToData(t), t.children().each2(function (e, t) {
                                    a(t, r.children)
                                }), r.children.length > 0 && n.push(r))
                        },
                            s = r.children(),
                        this.getPlaceholder() !== t && s.length > 0 && (o = this.getPlaceholderOption(), o && (s = s.not(o))),
                            s.each2(function (e, t) {
                                a(t, n.results)
                            }),
                            e.callback(n)
                    }), n.id = function (e) {
                        return e.id
                    }, n.formatResultCssClass = function (e) {
                        return e.css
                    }) : "query" in n || ("ajax" in n ? (o = n.element.data("ajax-url"), o && o.length > 0 && (n.ajax.url = o), n.query = _.call(n.element, n.ajax)) : "data" in n ? n.query = D(n.data) : "tags" in n && (n.query = P(n.tags), n.createSearchChoice === t && (n.createSearchChoice = function (t) {
                                return {
                                    id: e.trim(t),
                                    text: e.trim(t)
                                }
                            }), n.initSelection === t && (n.initSelection = function (t, r) {
                                var i = [];
                                e(g(t.val(), n.separator)).each(function () {
                                    var t = {
                                            id: this,
                                            text: this
                                        },
                                        r = n.tags;
                                    e.isFunction(r) && (r = r()),
                                        e(r).each(function () {
                                            if (m(this.id, t.id)) return t = this,
                                                !1
                                        }),
                                        i.push(t)
                                }),
                                    r(i)
                            })));
                if (typeof n.query != "function") throw "query function not defined for Select2 " + n.element.attr("id");
                return n
            },
            monitorSource: function () {
                var e = this.opts.element,
                    n, r;
                e.on("change.select2", this.bind(function (e) {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                })),
                    n = this.bind(function () {
                        var n = e.prop("disabled");
                        n === t && (n = !1),
                            this.enable(!n);
                        var r = e.prop("readonly");
                        r === t && (r = !1),
                            this.readonly(r),
                            A(this.container, this.opts.element, this.opts.adaptContainerCssClass),
                            this.container.addClass(B(this.opts.containerCssClass)),
                            A(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass),
                            this.dropdown.addClass(B(this.opts.dropdownCssClass))
                    }),
                    e.on("propertychange.select2", n),
                this.mutationCallback === t && (this.mutationCallback = function (e) {
                    e.forEach(n)
                }),
                    r = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
                r !== t && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new r(this.mutationCallback), this.propertyObserver.observe(e.get(0), {
                    attributes: !0,
                    subtree: !1
                }))
            },
            triggerSelect: function (t) {
                var n = e.Event("select2-selecting", {
                    val: this.id(t),
                    object: t
                });
                return this.opts.element.trigger(n),
                    !n.isDefaultPrevented()
            },
            triggerChange: function (t) {
                t = t || {},
                    t = e.extend({}, t, {
                        type: "change",
                        val: this.val()
                    }),
                    this.opts.element.data("select2-change-triggered", !0),
                    this.opts.element.trigger(t),
                    this.opts.element.data("select2-change-triggered", !1),
                    this.opts.element.click(),
                this.opts.blurOnChange && this.opts.element.blur()
            },
            isInterfaceEnabled: function () {
                return this.enabledInterface === !0
            },
            enableInterface: function () {
                var e = this._enabled && !this._readonly,
                    t = !e;
                return e === this.enabledInterface ? !1 : (this.container.toggleClass("select2-container-disabled", t), this.close(), this.enabledInterface = e, !0)
            },
            enable: function (e) {
                e === t && (e = !0);
                if (this._enabled === e) return;
                this._enabled = e,
                    this.opts.element.prop("disabled", !e),
                    this.enableInterface()
            },
            disable: function () {
                this.enable(!1)
            },
            readonly: function (e) {
                return e === t && (e = !1),
                    this._readonly === e ? !1 : (this._readonly = e, this.opts.element.prop("readonly", e), this.enableInterface(), !0)
            },
            opened: function () {
                return this.container.hasClass("select2-dropdown-open")
            },
            positionDropdown: function () {
                var t = this.dropdown,
                    n = this.container.offset(),
                    r = this.container.outerHeight(!1),
                    i = this.container.outerWidth(!1),
                    s = t.outerHeight(!1),
                    o = e(window),
                    u = o.width(),
                    a = o.height(),
                    f = o.scrollLeft() + u,
                    c = o.scrollTop() + a,
                    h = n.top + r,
                    p = n.left,
                    d = h + s <= c,
                    v = n.top - s >= this.body().scrollTop(),
                    m = t.outerWidth(!1),
                    g = p + m <= f,
                    y = t.hasClass("select2-drop-above"),
                    b, w, E, S, x;
                y ? (w = !0, !v && d && (E = !0, w = !1)) : (w = !1, !d && v && (E = !0, w = !0)),
                E && (t.hide(), n = this.container.offset(), r = this.container.outerHeight(!1), i = this.container.outerWidth(!1), s = t.outerHeight(!1), f = o.scrollLeft() + u, c = o.scrollTop() + a, h = n.top + r, p = n.left, m = t.outerWidth(!1), g = p + m <= f, t.show()),
                    this.opts.dropdownAutoWidth ? (x = e(".select2-results", t)[0], t.addClass("select2-drop-auto-width"), t.css("width", ""), m = t.outerWidth(!1) + (x.scrollHeight === x.clientHeight ? 0 : l.width), m > i ? i = m : m = i, g = p + m <= f) : this.container.removeClass("select2-drop-auto-width"),
                this.body().css("position") !== "static" && (b = this.body().offset(), h -= b.top, p -= b.left),
                g || (p = n.left + i - m),
                    S = {
                        left: p,
                        width: i
                    },
                    w ? (S.bottom = a - n.top, S.top = "auto", this.container.addClass("select2-drop-above"), t.addClass("select2-drop-above")) : (S.top = h, S.bottom = "auto", this.container.removeClass("select2-drop-above"), t.removeClass("select2-drop-above")),
                    S = e.extend(S, B(this.opts.dropdownCss)),
                    t.css(S)
            },
            shouldOpen: function () {
                var t;
                return this.opened() ? !1 : this._enabled === !1 || this._readonly === !0 ? !1 : (t = e.Event("select2-opening"), this.opts.element.trigger(t), !t.isDefaultPrevented())
            },
            clearDropdownAlignmentPreference: function () {
                this.container.removeClass("select2-drop-above"),
                    this.dropdown.removeClass("select2-drop-above")
            },
            open: function () {
                return this.shouldOpen() ? (this.opening(), !0) : !1
            },
            opening: function () {
                var t = this.containerId,
                    n = "scroll." + t,
                    r = "resize." + t,
                    i = "orientationchange." + t,
                    s;
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),
                    this.clearDropdownAlignmentPreference(),
                this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()),
                    s = e("#select2-drop-mask"),
                s.length == 0 && (s = e(document.createElement("div")), s.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), s.hide(), s.appendTo(this.body()), s.on("mousedown touchstart click", function (t) {
                    var n = e("#select2-drop"),
                        r;
                    n.length > 0 && (r = n.data("select2"), r.opts.selectOnBlur && r.selectHighlighted({
                        noFocus: !0
                    }), r.close({
                        focus: !0
                    }), t.preventDefault(), t.stopPropagation())
                })),
                this.dropdown.prev()[0] !== s[0] && this.dropdown.before(s),
                    e("#select2-drop").removeAttr("id"),
                    this.dropdown.attr("id", "select2-drop"),
                    s.show(),
                    this.positionDropdown(),
                    this.dropdown.show(),
                    this.positionDropdown(),
                    this.dropdown.addClass("select2-drop-active");
                var o = this;
                this.container.parents().add(window).each(function () {
                    e(this).on(r + " " + n + " " + i, function (e) {
                        o.positionDropdown()
                    })
                })
            },
            close: function () {
                if (!this.opened()) return;
                var t = this.containerId,
                    n = "scroll." + t,
                    r = "resize." + t,
                    i = "orientationchange." + t;
                this.container.parents().add(window).each(function () {
                    e(this).off(n).off(r).off(i)
                }),
                    this.clearDropdownAlignmentPreference(),
                    e("#select2-drop-mask").hide(),
                    this.dropdown.removeAttr("id"),
                    this.dropdown.hide(),
                    this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),
                    this.results.empty(),
                    this.clearSearch(),
                    this.search.removeClass("select2-active"),
                    this.opts.element.trigger(e.Event("select2-close"))
            },
            externalSearch: function (e) {
                this.open(),
                    this.search.val(e),
                    this.updateResults(!1)
            },
            clearSearch: function () {},
            getMaximumSelectionSize: function () {
                return B(this.opts.maximumSelectionSize)
            },
            ensureHighlightVisible: function () {
                var t = this.results,
                    n, r, i, s, o, u, a;
                r = this.highlight();
                if (r < 0) return;
                if (r == 0) {
                    t.scrollTop(0);
                    return
                }
                n = this.findHighlightableChoices().find(".select2-result-label"),
                    i = e(n[r]),
                    s = i.offset().top + i.outerHeight(!0),
                r === n.length - 1 && (a = t.find("li.select2-more-results"), a.length > 0 && (s = a.offset().top + a.outerHeight(!0))),
                    o = t.offset().top + t.outerHeight(!0),
                s > o && t.scrollTop(t.scrollTop() + (s - o)),
                    u = i.offset().top - t.offset().top,
                u < 0 && i.css("display") != "none" && t.scrollTop(t.scrollTop() + u)
            },
            findHighlightableChoices: function () {
                return this.results.find(".select2-result-selectable:not(.select2-disabled, .select2-selected)")
            },
            moveHighlight: function (t) {
                var n = this.findHighlightableChoices(),
                    r = this.highlight();
                while (r > -1 && r < n.length) {
                    r += t;
                    var i = e(n[r]);
                    if (i.hasClass("select2-result-selectable") && !i.hasClass("select2-disabled") && !i.hasClass("select2-selected")) {
                        this.highlight(r);
                        break
                    }
                }
            },
            highlight: function (t) {
                var n = this.findHighlightableChoices(),
                    r, i;
                if (arguments.length === 0) return d(n.filter(".select2-highlighted")[0], n.get());
                t >= n.length && (t = n.length - 1),
                t < 0 && (t = 0),
                    this.removeHighlight(),
                    r = e(n[t]),
                    r.addClass("select2-highlighted"),
                    this.ensureHighlightVisible(),
                    i = r.data("select2-data"),
                i && this.opts.element.trigger({
                    type: "select2-highlight",
                    val: this.id(i),
                    choice: i
                })
            },
            removeHighlight: function () {
                this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            },
            countSelectableResults: function () {
                return this.findHighlightableChoices().length
            },
            highlightUnderEvent: function (t) {
                var n = e(t.target).closest(".select2-result-selectable");
                if (n.length > 0 && !n.is(".select2-highlighted")) {
                    var r = this.findHighlightableChoices();
                    this.highlight(r.index(n))
                } else n.length == 0 && this.removeHighlight()
            },
            loadMoreIfNeeded: function () {
                var e = this.results,
                    t = e.find("li.select2-more-results"),
                    n, r = this.resultsPage + 1,
                    i = this,
                    s = this.search.val(),
                    o = this.context;
                if (t.length === 0) return;
                n = t.offset().top - e.offset().top - e.height(),
                n <= this.opts.loadMorePadding && (t.addClass("select2-active"), this.opts.query({
                    element: this.opts.element,
                    term: s,
                    page: r,
                    context: o,
                    matcher: this.opts.matcher,
                    callback: this.bind(function (n) {
                        if (!i.opened()) return;
                        i.opts.populateResults.call(this, e, n.results, {
                            term: s,
                            page: r,
                            context: o
                        }),
                            i.postprocessResults(n, !1, !1),
                            n.more === !0 ? (t.detach().appendTo(e).text(i.opts.formatLoadMore(r + 1)), window.setTimeout(function () {
                                    i.loadMoreIfNeeded()
                                }, 10)) : t.remove(),
                            i.positionDropdown(),
                            i.resultsPage = r,
                            i.context = n.context,
                            this.opts.element.trigger({
                                type: "select2-loaded",
                                items: n
                            })
                    })
                }))
            },
            tokenize: function () {},
            updateResults: function (n) {
                function h() {
                    r.removeClass("select2-active"),
                        u.positionDropdown()
                }
                function p(e) {
                    i.html(e),
                        h()
                }
                var r = this.search,
                    i = this.results,
                    s = this.opts,
                    o, u = this,
                    a, f = r.val(),
                    l = e.data(this.container, "select2-last-term"),
                    c;
                if (n !== !0 && l && m(f, l)) return;
                e.data(this.container, "select2-last-term", f);
                if (n !== !0 && (this.showSearchInput === !1 || !this.opened())) return;
                c = ++this.queryCount;
                var d = this.getMaximumSelectionSize();
                if (d >= 1) {
                    o = this.data();
                    if (e.isArray(o) && o.length >= d && H(s.formatSelectionTooBig, "formatSelectionTooBig")) {
                        p("<li class='select2-selection-limit'>" + s.formatSelectionTooBig(d) + "</li>");
                        return
                    }
                }
                if (r.val().length < s.minimumInputLength) {
                    H(s.formatInputTooShort, "formatInputTooShort") ? p("<li class='select2-no-results'>" + s.formatInputTooShort(r.val(), s.minimumInputLength) + "</li>") : p(""),
                    n && this.showSearch && this.showSearch(!0);
                    return
                }
                if (s.maximumInputLength && r.val().length > s.maximumInputLength) {
                    H(s.formatInputTooLong, "formatInputTooLong") ? p("<li class='select2-no-results'>" + s.formatInputTooLong(r.val(), s.maximumInputLength) + "</li>") : p("");
                    return
                }
                s.formatSearching && this.findHighlightableChoices().length === 0 && p("<li class='select2-searching'>" + s.formatSearching() + "</li>"),
                    r.addClass("select2-active"),
                    this.removeHighlight(),
                    a = this.tokenize(),
                a != t && a != null && r.val(a),
                    this.resultsPage = 1,
                    s.query({
                        element: s.element,
                        term: r.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: s.matcher,
                        callback: this.bind(function (o) {
                            var a;
                            if (c != this.queryCount) return;
                            if (!this.opened()) {
                                this.search.removeClass("select2-active");
                                return
                            }
                            this.context = o.context === t ? null : o.context,
                            this.opts.createSearchChoice && r.val() !== "" && (a = this.opts.createSearchChoice.call(u, r.val(), o.results), a !== t && a !== null && u.id(a) !== t && u.id(a) !== null && e(o.results).filter(function () {
                                return m(u.id(this), u.id(a))
                            }).length === 0 && o.results.unshift(a));
                            if (o.results.length === 0 && H(s.formatNoMatches, "formatNoMatches")) {
                                p("<li class='select2-no-results'>" + s.formatNoMatches(r.val()) + "</li>");
                                return
                            }
                            i.empty(),
                                u.opts.populateResults.call(this, i, o.results, {
                                    term: r.val(),
                                    page: this.resultsPage,
                                    context: null
                                }),
                            o.more === !0 && H(s.formatLoadMore, "formatLoadMore") && (i.append("<li class='select2-more-results'>" + u.opts.escapeMarkup(s.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function () {
                                u.loadMoreIfNeeded()
                            }, 10)),
                                this.postprocessResults(o, n),
                                h(),
                                this.opts.element.trigger({
                                    type: "select2-loaded",
                                    items: o
                                })
                        })
                    })
            },
            cancel: function () {
                this.close()
            },
            blur: function () {
                this.opts.selectOnBlur && this.selectHighlighted({
                    noFocus: !0
                }),
                    this.close(),
                    this.container.removeClass("select2-container-active"),
                this.search[0] === document.activeElement && this.search.blur(),
                    this.clearSearch(),
                    this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
            },
            focusSearch: function () {
                T(this.search)
            },
            selectHighlighted: function (e) {
                var t = this.highlight(),
                    n = this.results.find(".select2-highlighted"),
                    r = n.closest(".select2-result").data("select2-data");
                r ? (this.highlight(t), this.onSelect(r, e)) : e && e.noFocus && this.close()
            },
            getPlaceholder: function () {
                var e;
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((e = this.getPlaceholderOption()) !== t ? e.text() : t)
            },
            getPlaceholderOption: function () {
                if (this.select) {
                    var e = this.select.children("option").first();
                    if (this.opts.placeholderOption !== t) return this.opts.placeholderOption === "first" && e || typeof this.opts.placeholderOption == "function" && this.opts.placeholderOption(this.select);
                    if (e.text() === "" && e.val() === "") return e
                }
            },
            initContainerWidth: function () {
                function n() {
                    var n, r, i, s, o, u;
                    if (this.opts.width === "off") return null;
                    if (this.opts.width === "element") return this.opts.element.outerWidth(!1) === 0 ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if (this.opts.width === "copy" || this.opts.width === "resolve") {
                        n = this.opts.element.attr("style");
                        if (n !== t) {
                            r = n.split(";");
                            for (s = 0, o = r.length; s < o; s += 1) {
                                u = r[s].replace(/\s/g, ""),
                                    i = u.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i);
                                if (i !== null && i.length >= 1) return i[1]
                            }
                        }
                        return this.opts.width === "resolve" ? (n = this.opts.element.css("width"), n.indexOf("%") > 0 ? n : this.opts.element.outerWidth(!1) === 0 ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return e.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }
                var r = n.call(this);
                r !== null && this.container.css("width", r)
            }
        }),
        i = I(r, {
            createContainer: function () {
                var t = e(document.createElement("div")).attr({
                    "class": "select2-container"
                }).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow'><b></b></span>", "</a>", "<input class='select2-focusser select2-offscreen' type='text'/>", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            },
            enableInterface: function () {
                this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled())
            },
            opening: function () {
                var n, r, i;
                this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0),
                    this.parent.opening.apply(this, arguments),
                this.showSearchInput !== !1 && this.search.val(this.focusser.val()),
                    this.search.focus(),
                    n = this.search.get(0),
                    n.createTextRange ? (r = n.createTextRange(), r.collapse(!1), r.select()) : n.setSelectionRange && (i = this.search.val().length, n.setSelectionRange(i, i)),
                this.search.val() === "" && this.nextSearchTerm != t && (this.search.val(this.nextSearchTerm), this.search.select()),
                    this.focusser.prop("disabled", !0).val(""),
                    this.updateResults(!0),
                    this.opts.element.trigger(e.Event("select2-open"))
            },
            close: function (e) {
                if (!this.opened()) return;
                this.parent.close.apply(this, arguments),
                    e = e || {
                            focus: !0
                        },
                    this.focusser.removeAttr("disabled"),
                e.focus && this.focusser.focus()
            },
            focus: function () {
                this.opened() ? this.close() : (this.focusser.removeAttr("disabled"), this.focusser.focus())
            },
            isFocused: function () {
                return this.container.hasClass("select2-container-active")
            },
            cancel: function () {
                this.parent.cancel.apply(this, arguments),
                    this.focusser.removeAttr("disabled"),
                    this.focusser.focus()
            },
            destroy: function () {
                e("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")),
                    this.parent.destroy.apply(this, arguments)
            },
            initContainer: function () {
                var t, r = this.container,
                    i = this.dropdown;
                this.opts.minimumResultsForSearch < 0 ? this.showSearch(!1) : this.showSearch(!0),
                    this.selection = t = r.find(".select2-choice"),
                    this.focusser = r.find(".select2-focusser"),
                    this.focusser.attr("id", "s2id_autogen" + o()),
                    e("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.focusser.attr("id")),
                    this.focusser.attr("tabindex", this.elementTabIndex),
                    this.search.on("keydown", this.bind(function (e) {
                        if (!this.isInterfaceEnabled()) return;
                        if (e.which === n.PAGE_UP || e.which === n.PAGE_DOWN) {
                            C(e);
                            return
                        }
                        switch (e.which) {
                            case n.UP:
                            case n.DOWN:
                                this.moveHighlight(e.which === n.UP ? -1 : 1),
                                    C(e);
                                return;
                            case n.ENTER:
                                this.selectHighlighted(),
                                    C(e);
                                return;
                            case n.TAB:
                                this.selectHighlighted({
                                    noFocus: !0
                                });
                                return;
                            case n.ESC:
                                this.cancel(e),
                                    C(e);
                                return
                        }
                    })),
                    this.search.on("blur", this.bind(function (e) {
                        document.activeElement === this.body().get(0) && window.setTimeout(this.bind(function () {
                            this.search.focus()
                        }), 0)
                    })),
                    this.focusser.on("keydown", this.bind(function (e) {
                        if (!this.isInterfaceEnabled()) return;
                        if (e.which === n.TAB || n.isControl(e) || n.isFunctionKey(e) || e.which === n.ESC) return;
                        if (this.opts.openOnEnter === !1 && e.which === n.ENTER) {
                            C(e);
                            return
                        }
                        if (e.which == n.DOWN || e.which == n.UP || e.which == n.ENTER && this.opts.openOnEnter) {
                            if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
                            this.open(),
                                C(e);
                            return
                        }
                        if (e.which == n.DELETE || e.which == n.BACKSPACE) {
                            this.opts.allowClear && this.clear(),
                                C(e);
                            return
                        }
                    })),
                    b(this.focusser),
                    this.focusser.on("keyup-change input", this.bind(function (e) {
                        if (this.opts.minimumResultsForSearch >= 0) {
                            e.stopPropagation();
                            if (this.opened()) return;
                            this.open()
                        }
                    })),
                    t.on("mousedown", "abbr", this.bind(function (e) {
                        if (!this.isInterfaceEnabled()) return;
                        this.clear(),
                            k(e),
                            this.close(),
                            this.selection.focus()
                    })),
                    t.on("mousedown", this.bind(function (t) {
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")),
                            this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(),
                            C(t)
                    })),
                    i.on("mousedown", this.bind(function () {
                        this.search.focus()
                    })),
                    t.on("focus", this.bind(function (e) {
                        C(e)
                    })),
                    this.focusser.on("focus", this.bind(function () {
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")),
                            this.container.addClass("select2-container-active")
                    })).on("blur", this.bind(function () {
                        this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(e.Event("select2-blur")))
                    })),
                    this.search.on("focus", this.bind(function () {
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")),
                            this.container.addClass("select2-container-active")
                    })),
                    this.initContainerWidth(),
                    this.opts.element.addClass("select2-offscreen"),
                    this.setPlaceholder()
            },
            clear: function (t) {
                var n = this.selection.data("select2-data");
                if (n) {
                    var r = e.Event("select2-clearing");
                    this.opts.element.trigger(r);
                    if (r.isDefaultPrevented()) return;
                    var i = this.getPlaceholderOption();
                    this.opts.element.val(i ? i.val() : ""),
                        this.selection.find(".select2-chosen").empty(),
                        this.selection.removeData("select2-data"),
                        this.setPlaceholder(),
                    t !== !1 && (this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(n),
                        choice: n
                    }), this.triggerChange({
                        removed: n
                    }))
                }
            },
            initSelection: function () {
                var e;
                if (this.isPlaceholderOptionSelected()) this.updateSelection(null),
                    this.close(),
                    this.setPlaceholder();
                else {
                    var n = this;
                    this.opts.initSelection.call(null, this.opts.element, function (e) {
                        e !== t && e !== null && (n.updateSelection(e), n.close(), n.setPlaceholder())
                    })
                }
            },
            isPlaceholderOptionSelected: function () {
                var e;
                return this.getPlaceholder() ? (e = this.getPlaceholderOption()) !== t && e.prop("selected") || this.opts.element.val() === "" || this.opts.element.val() === t || this.opts.element.val() === null : !1
            },
            prepareOpts: function () {
                var t = this.parent.prepareOpts.apply(this, arguments),
                    n = this;
                return t.element.get(0).tagName.toLowerCase() === "select" ? t.initSelection = function (e, t) {
                        var r = e.find("option").filter(function () {
                            return this.selected
                        });
                        t(n.optionToData(r))
                    } : "data" in t && (t.initSelection = t.initSelection ||
                        function (n, r) {
                            var i = n.val(),
                                s = null;
                            t.query({
                                matcher: function (e, n, r) {
                                    var o = m(i, t.id(r));
                                    return o && (s = r),
                                        o
                                },
                                callback: e.isFunction(r) ?
                                    function () {
                                        r(s)
                                    } : e.noop
                            })
                        }),
                    t
            },
            getPlaceholder: function () {
                return this.select && this.getPlaceholderOption() === t ? t : this.parent.getPlaceholder.apply(this, arguments)
            },
            setPlaceholder: function () {
                var e = this.getPlaceholder();
                if (this.isPlaceholderOptionSelected() && e !== t) {
                    if (this.select && this.getPlaceholderOption() === t) return;
                    this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(e)),
                        this.selection.addClass("select2-default"),
                        this.container.removeClass("select2-allowclear")
                }
            },
            postprocessResults: function (e, t, n) {
                var r = 0,
                    i = this,
                    s = !0;
                this.findHighlightableChoices().each2(function (e, t) {
                    if (m(i.id(t.data("select2-data")), i.opts.element.val())) return r = e,
                        !1
                }),
                n !== !1 && (t === !0 && r >= 0 ? this.highlight(r) : this.highlight(0));
                if (t === !0) {
                    var o = this.opts.minimumResultsForSearch;
                    o >= 0 && this.showSearch(j(e.results) >= o)
                }
            },
            showSearch: function (t) {
                if (this.showSearchInput === t) return;
                this.showSearchInput = t,
                    this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !t),
                    this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !t),
                    e(this.dropdown, this.container).toggleClass("select2-with-searchbox", t)
            },
            onSelect: function (e, t) {
                if (!this.triggerSelect(e)) return;
                var n = this.opts.element.val(),
                    r = this.data();
                this.opts.element.val(this.id(e)),
                    this.updateSelection(e),
                    this.opts.element.trigger({
                        type: "select2-selected",
                        val: this.id(e),
                        choice: e
                    }),
                    this.nextSearchTerm = this.opts.nextSearchTerm(e, this.search.val()),
                    this.close(),
                (!t || !t.noFocus) && this.focusser.focus(),
                m(n, this.id(e)) || this.triggerChange({
                    added: e,
                    removed: r
                })
            },
            updateSelection: function (e) {
                var n = this.selection.find(".select2-chosen"),
                    r, i;
                this.selection.data("select2-data", e),
                    n.empty(),
                e !== null && (r = this.opts.formatSelection(e, n, this.opts.escapeMarkup)),
                r !== t && n.append(r),
                    i = this.opts.formatSelectionCssClass(e, n),
                i !== t && n.addClass(i),
                    this.selection.removeClass("select2-default"),
                this.opts.allowClear && this.getPlaceholder() !== t && this.container.addClass("select2-allowclear")
            },
            val: function () {
                var e, n = !1,
                    r = null,
                    i = this,
                    s = this.data();
                if (arguments.length === 0) return this.opts.element.val();
                e = arguments[0],
                arguments.length > 1 && (n = arguments[1]);
                if (this.select) this.select.val(e).find("option").filter(function () {
                    return this.selected
                }).each2(function (e, t) {
                    return r = i.optionToData(t),
                        !1
                }),
                    this.updateSelection(r),
                    this.setPlaceholder(),
                n && this.triggerChange({
                    added: r,
                    removed: s
                });
                else {
                    if (!e && e !== 0) {
                        this.clear(n);
                        return
                    }
                    if (this.opts.initSelection === t) throw new Error("cannot call val() if initSelection() is not defined");
                    this.opts.element.val(e),
                        this.opts.initSelection(this.opts.element, function (e) {
                            i.opts.element.val(e ? i.id(e) : ""),
                                i.updateSelection(e),
                                i.setPlaceholder(),
                            n && i.triggerChange({
                                added: e,
                                removed: s
                            })
                        })
                }
            },
            clearSearch: function () {
                this.search.val(""),
                    this.focusser.val("")
            },
            data: function (e) {
                var n, r = !1;
                if (arguments.length === 0) return n = this.selection.data("select2-data"),
                n == t && (n = null),
                    n;
                arguments.length > 1 && (r = arguments[1]),
                    e ? (n = this.data(), this.opts.element.val(e ? this.id(e) : ""), this.updateSelection(e), r && this.triggerChange({
                            added: e,
                            removed: n
                        })) : this.clear(r)
            }
        }),
        s = I(r, {
            createContainer: function () {
                var t = e(document.createElement("div")).attr({
                    "class": "select2-container select2-container-multi"
                }).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            },
            prepareOpts: function () {
                var t = this.parent.prepareOpts.apply(this, arguments),
                    n = this;
                return t.element.get(0).tagName.toLowerCase() === "select" ? t.initSelection = function (e, t) {
                        var r = [];
                        e.find("option").filter(function () {
                            return this.selected
                        }).each2(function (e, t) {
                            r.push(n.optionToData(t))
                        }),
                            t(r)
                    } : "data" in t && (t.initSelection = t.initSelection ||
                        function (n, r) {
                            var i = g(n.val(), t.separator),
                                s = [];
                            t.query({
                                matcher: function (n, r, o) {
                                    var u = e.grep(i, function (e) {
                                        return m(e, t.id(o))
                                    }).length;
                                    return u && s.push(o),
                                        u
                                },
                                callback: e.isFunction(r) ?
                                    function () {
                                        var e = [];
                                        for (var n = 0; n < i.length; n++) {
                                            var o = i[n];
                                            for (var u = 0; u < s.length; u++) {
                                                var a = s[u];
                                                if (m(o, t.id(a))) {
                                                    e.push(a),
                                                        s.splice(u, 1);
                                                    break
                                                }
                                            }
                                        }
                                        r(e)
                                    } : e.noop
                            })
                        }),
                    t
            },
            selectChoice: function (e) {
                var t = this.container.find(".select2-search-choice-focus");
                if (!t.length || !e || e[0] != t[0]) t.length && this.opts.element.trigger("choice-deselected", t),
                    t.removeClass("select2-search-choice-focus"),
                e && e.length && (this.close(), e.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", e))
            },
            destroy: function () {
                e("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")),
                    this.parent.destroy.apply(this, arguments)
            },
            initContainer: function () {
                var t = ".select2-choices",
                    r;
                this.searchContainer = this.container.find(".select2-search-field"),
                    this.selection = r = this.container.find(t);
                var i = this;
                this.selection.on("click", ".select2-search-choice:not(.select2-locked)", function (t) {
                    i.search[0].focus(),
                        i.selectChoice(e(this))
                }),
                    this.search.attr("id", "s2id_autogen" + o()),
                    e("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.search.attr("id")),
                    this.search.on("input paste", this.bind(function () {
                        if (!this.isInterfaceEnabled()) return;
                        this.opened() || this.open()
                    })),
                    this.search.attr("tabindex", this.elementTabIndex),
                    this.keydowns = 0,
                    this.search.on("keydown", this.bind(function (e) {
                        if (!this.isInterfaceEnabled()) return;
                        ++this.keydowns;
                        var t = r.find(".select2-search-choice-focus"),
                            i = t.prev(".select2-search-choice:not(.select2-locked)"),
                            s = t.next(".select2-search-choice:not(.select2-locked)"),
                            o = N(this.search);
                        if (!(!t.length || e.which != n.LEFT && e.which != n.RIGHT && e.which != n.BACKSPACE && e.which != n.DELETE && e.which != n.ENTER)) {
                            var u = t;
                            e.which == n.LEFT && i.length ? u = i : e.which == n.RIGHT ? u = s.length ? s : null : e.which === n.BACKSPACE ? (this.unselect(t.first()), this.search.width(10), u = i.length ? i : s) : e.which == n.DELETE ? (this.unselect(t.first()), this.search.width(10), u = s.length ? s : null) : e.which == n.ENTER && (u = null),
                                this.selectChoice(u),
                                C(e),
                            (!u || !u.length) && this.open();
                            return
                        }
                        if ((e.which === n.BACKSPACE && this.keydowns == 1 || e.which == n.LEFT) && o.offset == 0 && !o.length) {
                            this.selectChoice(r.find(".select2-search-choice:not(.select2-locked)").last()),
                                C(e);
                            return
                        }
                        this.selectChoice(null);
                        if (this.opened()) switch (e.which) {
                            case n.UP:
                            case n.DOWN:
                                this.moveHighlight(e.which === n.UP ? -1 : 1),
                                    C(e);
                                return;
                            case n.ENTER:
                                this.selectHighlighted(),
                                    C(e);
                                return;
                            case n.TAB:
                                this.selectHighlighted({
                                    noFocus: !0
                                }),
                                    this.close();
                                return;
                            case n.ESC:
                                this.cancel(e),
                                    C(e);
                                return
                        }
                        if (e.which === n.TAB || n.isControl(e) || n.isFunctionKey(e) || e.which === n.BACKSPACE || e.which === n.ESC) return;
                        if (e.which === n.ENTER) {
                            if (this.opts.openOnEnter === !1) return;
                            if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return
                        }
                        this.open(),
                        (e.which === n.PAGE_UP || e.which === n.PAGE_DOWN) && C(e),
                        e.which === n.ENTER && C(e)
                    })),
                    this.search.on("keyup", this.bind(function (e) {
                        this.keydowns = 0,
                            this.resizeSearch()
                    })),
                    this.search.on("blur", this.bind(function (t) {
                        this.container.removeClass("select2-container-active"),
                            this.search.removeClass("select2-focused"),
                            this.selectChoice(null),
                        this.opened() || this.clearSearch(),
                            t.stopImmediatePropagation(),
                            this.opts.element.trigger(e.Event("select2-blur"))
                    })),
                    this.container.on("click", t, this.bind(function (t) {
                        if (!this.isInterfaceEnabled()) return;
                        if (e(t.target).closest(".select2-search-choice").length > 0) return;
                        this.selectChoice(null),
                            this.clearPlaceholder(),
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")),
                            this.open(),
                            this.focusSearch(),
                            t.preventDefault()
                    })),
                    this.container.on("focus", t, this.bind(function () {
                        if (!this.isInterfaceEnabled()) return;
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")),
                            this.container.addClass("select2-container-active"),
                            this.dropdown.addClass("select2-drop-active"),
                            this.clearPlaceholder()
                    })),
                    this.initContainerWidth(),
                    this.opts.element.addClass("select2-offscreen"),
                    this.clearSearch()
            },
            enableInterface: function () {
                this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled())
            },
            initSelection: function () {
                var e;
                this.opts.element.val() === "" && this.opts.element.text() === "" && (this.updateSelection([]), this.close(), this.clearSearch());
                if (this.select || this.opts.element.val() !== "") {
                    var n = this;
                    this.opts.initSelection.call(null, this.opts.element, function (e) {
                        e !== t && e !== null && (n.updateSelection(e), n.close(), n.clearSearch())
                    })
                }
            },
            clearSearch: function () {
                var e = this.getPlaceholder(),
                    n = this.getMaxSearchWidth();
                e !== t && this.getVal().length === 0 && this.search.hasClass("select2-focused") === !1 ? (this.search.val(e).addClass("select2-default"), this.search.width(n > 0 ? n : this.container.css("width"))) : this.search.val("").width(10)
            },
            clearPlaceholder: function () {
                this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
            },
            opening: function () {
                this.clearPlaceholder(),
                    this.resizeSearch(),
                    this.parent.opening.apply(this, arguments),
                    this.focusSearch(),
                    this.updateResults(!0),
                    this.search.focus(),
                    this.opts.element.trigger(e.Event("select2-open"))
            },
            close: function () {
                if (!this.opened()) return;
                this.parent.close.apply(this, arguments)
            },
            focus: function () {
                this.close(),
                    this.search.focus()
            },
            isFocused: function () {
                return this.search.hasClass("select2-focused")
            },
            updateSelection: function (t) {
                var n = [],
                    r = [],
                    i = this;
                e(t).each(function () {
                    d(i.id(this), n) < 0 && (n.push(i.id(this)), r.push(this))
                }),
                    t = r,
                    this.selection.find(".select2-search-choice").remove(),
                    e(t).each(function () {
                        i.addSelectedChoice(this)
                    }),
                    i.postprocessResults()
            },
            tokenize: function () {
                var e = this.search.val();
                e = this.opts.tokenizer.call(this, e, this.data(), this.bind(this.onSelect), this.opts),
                e != null && e != t && (this.search.val(e), e.length > 0 && this.open())
            },
            onSelect: function (e, t) {
                if (!this.triggerSelect(e)) return;
                this.addSelectedChoice(e),
                    this.opts.element.trigger({
                        type: "selected",
                        val: this.id(e),
                        choice: e
                    }),
                (this.select || !this.opts.closeOnSelect) && this.postprocessResults(e, !1, this.opts.closeOnSelect === !0),
                    this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() && this.updateResults(!0), this.positionDropdown()) : (this.close(), this.search.width(10)),
                    this.triggerChange({
                        added: e
                    }),
                (!t || !t.noFocus) && this.focusSearch()
            },
            cancel: function () {
                this.close(),
                    this.focusSearch()
            },
            addSelectedChoice: function (n) {
                var r = !n.locked,
                    i = e("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                    s = e("<li class='select2-search-choice select2-locked'><div></div></li>"),
                    o = r ? i : s,
                    u = this.id(n),
                    a = this.getVal(),
                    f, l;
                f = this.opts.formatSelection(n, o.find("div"), this.opts.escapeMarkup),
                f != t && o.find("div").replaceWith("<div>" + f + "</div>"),
                    l = this.opts.formatSelectionCssClass(n, o.find("div")),
                l != t && o.addClass(l),
                r && o.find(".select2-search-choice-close").on("mousedown", C).on("click dblclick", this.bind(function (t) {
                    if (!this.isInterfaceEnabled()) return;
                    e(t.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function () {
                        this.unselect(e(t.target)),
                            this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),
                            this.close(),
                            this.focusSearch()
                    })).dequeue(),
                        C(t)
                })).on("focus", this.bind(function () {
                    if (!this.isInterfaceEnabled()) return;
                    this.container.addClass("select2-container-active"),
                        this.dropdown.addClass("select2-drop-active")
                })),
                    o.data("select2-data", n),
                    o.insertBefore(this.searchContainer),
                    a.push(u),
                    this.setVal(a)
            },
            unselect: function (t) {
                var n = this.getVal(),
                    r, i;
                t = t.closest(".select2-search-choice");
                if (t.length === 0) throw "Invalid argument: " + t + ". Must be .select2-search-choice";
                r = t.data("select2-data");
                if (!r) return;
                while ((i = d(this.id(r), n)) >= 0) n.splice(i, 1),
                    this.setVal(n),
                this.select && this.postprocessResults();
                var s = e.Event("select2-removing");
                s.val = this.id(r),
                    s.choice = r,
                    this.opts.element.trigger(s);
                if (s.isDefaultPrevented()) return;
                t.remove(),
                    this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(r),
                        choice: r
                    }),
                    this.triggerChange({
                        removed: r
                    })
            },
            postprocessResults: function (e, t, n) {
                var r = this.getVal(),
                    i = this.results.find(".select2-result"),
                    s = this.results.find(".select2-result-with-children"),
                    o = this;
                i.each2(function (e, t) {
                    var n = o.id(t.data("select2-data"));
                    d(n, r) >= 0 && (t.addClass("select2-selected"), t.find(".select2-result-selectable").addClass("select2-selected"))
                }),
                    s.each2(function (e, t) {
                        !t.is(".select2-result-selectable") && t.find(".select2-result-selectable:not(.select2-selected)").length === 0 && t.addClass("select2-selected")
                    }),
                this.highlight() == -1 && n !== !1 && o.highlight(0),
                !this.opts.createSearchChoice && !i.filter(".select2-result:not(.select2-selected)").length > 0 && (!e || e && !e.more && this.results.find(".select2-no-results").length === 0) && H(o.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + o.opts.formatNoMatches(o.search.val()) + "</li>")
            },
            getMaxSearchWidth: function () {
                return this.selection.width() - y(this.search)
            },
            resizeSearch: function () {
                var e, t, n, r, i, s = y(this.search);
                e = L(this.search) + 10,
                    t = this.search.offset().left,
                    n = this.selection.width(),
                    r = this.selection.offset().left,
                    i = n - (t - r) - s,
                i < e && (i = n - s),
                i < 40 && (i = n - s),
                i <= 0 && (i = e),
                    this.search.width(Math.floor(i))
            },
            getVal: function () {
                var e;
                return this.select ? (e = this.select.val(), e === null ? [] : e) : (e = this.opts.element.val(), g(e, this.opts.separator))
            },
            setVal: function (t) {
                var n;
                this.select ? this.select.val(t) : (n = [], e(t).each(function () {
                        d(this, n) < 0 && n.push(this)
                    }), this.opts.element.val(n.length === 0 ? "" : n.join(this.opts.separator)))
            },
            buildChangeDetails: function (e, t) {
                var t = t.slice(0),
                    e = e.slice(0);
                for (var n = 0; n < t.length; n++) for (var r = 0; r < e.length; r++) m(this.opts.id(t[n]), this.opts.id(e[r])) && (t.splice(n, 1), n > 0 && n--, e.splice(r, 1), r--);
                return {
                    added: t,
                    removed: e
                }
            },
            val: function (n, r) {
                var i, s = this;
                if (arguments.length === 0) return this.getVal();
                i = this.data(),
                i.length || (i = []);
                if (!n && n !== 0) {
                    this.opts.element.val(""),
                        this.updateSelection([]),
                        this.clearSearch(),
                    r && this.triggerChange({
                        added: this.data(),
                        removed: i
                    });
                    return
                }
                this.setVal(n);
                if (this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)),
                r && this.triggerChange(this.buildChangeDetails(i, this.data()));
                else {
                    if (this.opts.initSelection === t) throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function (t) {
                        var n = e.map(t, s.id);
                        s.setVal(n),
                            s.updateSelection(t),
                            s.clearSearch(),
                        r && s.triggerChange(s.buildChangeDetails(i, s.data()))
                    })
                }
                this.clearSearch()
            },
            onSortStart: function () {
                if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0),
                    this.searchContainer.hide()
            },
            onSortEnd: function () {
                var t = [],
                    n = this;
                this.searchContainer.show(),
                    this.searchContainer.appendTo(this.searchContainer.parent()),
                    this.resizeSearch(),
                    this.selection.find(".select2-search-choice").each(function () {
                        t.push(n.opts.id(e(this).data("select2-data")))
                    }),
                    this.setVal(t),
                    this.triggerChange()
            },
            data: function (t, n) {
                var r = this,
                    i, s;
                if (arguments.length === 0) return this.selection.find(".select2-search-choice").map(function () {
                    return e(this).data("select2-data")
                }).get();
                s = this.data(),
                t || (t = []),
                    i = e.map(t, function (e) {
                        return r.opts.id(e)
                    }),
                    this.setVal(i),
                    this.updateSelection(t),
                    this.clearSearch(),
                n && this.triggerChange(this.buildChangeDetails(s, this.data()))
            }
        }),
        e.fn.select2 = function () {
            var n = Array.prototype.slice.call(arguments, 0),
                r, o, u, a, f, l = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
                c = ["opened", "isFocused", "container", "dropdown"],
                h = ["val", "data"],
                p = {
                    search: "externalSearch"
                };
            return this.each(function () {
                if (n.length === 0 || typeof n[0] == "object") r = n.length === 0 ? {} : e.extend({}, n[0]),
                    r.element = e(this),
                    r.element.get(0).tagName.toLowerCase() === "select" ? f = r.element.prop("multiple") : (f = r.multiple || !1, "tags" in r && (r.multiple = f = !0)),
                    o = f ? new s : new i,
                    o.init(r);
                else {
                    if (typeof n[0] != "string") throw "Invalid arguments to select2 plugin: " + n;
                    if (d(n[0], l) < 0) throw "Unknown method: " + n[0];
                    a = t,
                        o = e(this).data("select2");
                    if (o === t) return;
                    u = n[0],
                        u === "container" ? a = o.container : u === "dropdown" ? a = o.dropdown : (p[u] && (u = p[u]), a = o[u].apply(o, n.slice(1)));
                    if (d(n[0], c) >= 0 || d(n[0], h) && n.length == 1) return !1
                }
            }),
                a === t ? this : a
        },
        e.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function (e, t, n, r) {
                var i = [];
                return O(e.text, n.term, i, r),
                    i.join("")
            },
            formatSelection: function (e, n, r) {
                return e ? r(e.text) : t
            },
            sortResults: function (e, t, n) {
                return e
            },
            formatResultCssClass: function (e) {
                return t
            },
            formatSelectionCssClass: function (e, n) {
                return t
            },
            formatNoMatches: function () {
                return "No matches found"
            },
            formatInputTooShort: function (e, t) {
                var n = t - e.length;
                return "Please enter " + n + " more character" + (n == 1 ? "" : "s")
            },
            formatInputTooLong: function (e, t) {
                var n = e.length - t;
                return "Please delete " + n + " character" + (n == 1 ? "" : "s")
            },
            formatSelectionTooBig: function (e) {
                return "You can only select " + e + " item" + (e == 1 ? "" : "s")
            },
            formatLoadMore: function (e) {
                return "Loading more results..."
            },
            formatSearching: function () {
                return "Searching..."
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function (e) {
                return e.id
            },
            matcher: function (e, t) {
                return p("" + t).toUpperCase().indexOf(p("" + e).toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: F,
            escapeMarkup: M,
            blurOnChange: !1,
            selectOnBlur: !1,
            adaptContainerCssClass: function (e) {
                return e
            },
            adaptDropdownCssClass: function (e) {
                return null
            },
            nextSearchTerm: function (e, n) {
                return t
            }
        },
        e.fn.select2.ajaxDefaults = {
            transport: e.ajax,
            params: {
                type: "GET",
                cache: !1,
                dataType: "json"
            }
        },
        window.Select2 = {
            query: {
                ajax: _,
                local: D,
                tags: P
            },
            util: {
                debounce: E,
                markMatch: O,
                escapeMarkup: M,
                stripDiacritics: p
            },
            "class": {
                "abstract": r,
                single: i,
                multi: s
            }
        }
})(jQuery);