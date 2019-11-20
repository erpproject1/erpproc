/*
 Highcharts JS v7.2.0 (2019-09-03)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(P, N) {
    "object" === typeof module && module.exports ? (N["default"] = N, module.exports = P.document ? N(P) : N) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function() {
        return N(P)
    }) : (P.Highcharts && P.Highcharts.error(16, !0), P.Highcharts = N(P))
})("undefined" !== typeof window ? window : this, function(P) {
    function N(c, n, A, D) {
        c.hasOwnProperty(n) || (c[n] = D.apply(null, A))
    }
    var H = {};
    N(H, "parts/Globals.js", [], function() {
        var c = "undefined" !== typeof P ? P : "undefined" !== typeof window ? window : {},
            n = c.document,
            A = c.navigator && c.navigator.userAgent || "",
            D = n && n.createElementNS && !!n.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            F = /(edge|msie|trident)/i.test(A) && !c.opera,
            z = -1 !== A.indexOf("Firefox"),
            u = -1 !== A.indexOf("Chrome"),
            L = z && 4 > parseInt(A.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "7.2.0",
            deg2rad: 2 * Math.PI / 360,
            doc: n,
            hasBidiBug: L,
            hasTouch: !!c.TouchEvent,
            isMS: F,
            isWebKit: -1 !== A.indexOf("AppleWebKit"),
            isFirefox: z,
            isChrome: u,
            isSafari: !u && -1 !== A.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(A),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            win: c,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: [],
            dateFormats: {}
        }
    });
    N(H, "parts/Utilities.js", [H["parts/Globals.js"]], function(c) {
        function n(b, a) {
            return parseInt(b, a || 10)
        }

        function A(b) {
            return "string" === typeof b
        }

        function D(b) {
            b = Object.prototype.toString.call(b);
            return "[object Array]" === b || "[object Array Iterator]" === b
        }

        function F(b, a) {
            return !!b && "object" === typeof b && (!a ||
                !D(b))
        }

        function z(b) {
            return F(b) && "number" === typeof b.nodeType
        }

        function u(b) {
            var a = b && b.constructor;
            return !(!F(b, !0) || z(b) || !a || !a.name || "Object" === a.name)
        }

        function L(b) {
            return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
        }

        function y(b) {
            return "undefined" !== typeof b && null !== b
        }

        function C(b, a, d) {
            var f;
            A(a) ? y(d) ? b.setAttribute(a, d) : b && b.getAttribute && ((f = b.getAttribute(a)) || "class" !== a || (f = b.getAttribute(a + "Name"))) : x(a, function(a, d) {
                b.setAttribute(d, a)
            });
            return f
        }

        function x(b, a, d) {
            for (var f in b) Object.hasOwnProperty.call(b,
                f) && a.call(d || b[f], b[f], f, b)
        }
        c.timers = [];
        var m = c.charts,
            p = c.doc,
            g = c.win;
        c.error = function(b, a, d) {
            var f = L(b) ? "Highcharts error #" + b + ": www.highcharts.com/errors/" + b : b,
                e = function() {
                    if (a) throw Error(f);
                    g.console && console.log(f)
                };
            d ? c.fireEvent(d, "displayError", {
                code: b,
                message: f
            }, e) : e()
        };
        c.Fx = function(b, a, d) {
            this.options = a;
            this.elem = b;
            this.prop = d
        };
        c.Fx.prototype = {
            dSetter: function() {
                var b = this.paths[0],
                    a = this.paths[1],
                    d = [],
                    f = this.now,
                    e = b.length;
                if (1 === f) d = this.toD;
                else if (e === a.length && 1 > f)
                    for (; e--;) {
                        var c =
                            parseFloat(b[e]);
                        d[e] = isNaN(c) ? a[e] : f * parseFloat("" + (a[e] - c)) + c
                    } else d = a;
                this.elem.attr("d", d, null, !0)
            },
            update: function() {
                var b = this.elem,
                    a = this.prop,
                    d = this.now,
                    f = this.options.step;
                if (this[a + "Setter"]) this[a + "Setter"]();
                else b.attr ? b.element && b.attr(a, d, null, !0) : b.style[a] = d + this.unit;
                f && f.call(b, d, this)
            },
            run: function(b, a, d) {
                var f = this,
                    e = f.options,
                    h = function(a) {
                        return h.stopped ? !1 : f.step(a)
                    },
                    r = g.requestAnimationFrame || function(a) {
                        setTimeout(a, 13)
                    },
                    E = function() {
                        for (var a = 0; a < c.timers.length; a++) c.timers[a]() ||
                            c.timers.splice(a--, 1);
                        c.timers.length && r(E)
                    };
                b !== a || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = b, this.end = a, this.unit = d, this.now = this.start, this.pos = 0, h.elem = this.elem, h.prop = this.prop, h() && 1 === c.timers.push(h) && r(E)) : (delete e.curAnim[this.prop], e.complete && 0 === Object.keys(e.curAnim).length && e.complete.call(this.elem))
            },
            step: function(b) {
                var a = +new Date,
                    d = this.options,
                    f = this.elem,
                    e = d.complete,
                    c = d.duration,
                    r = d.curAnim;
                if (f.attr && !f.element) b = !1;
                else if (b || a >= c + this.startTime) {
                    this.now =
                        this.end;
                    this.pos = 1;
                    this.update();
                    var E = r[this.prop] = !0;
                    x(r, function(a) {
                        !0 !== a && (E = !1)
                    });
                    E && e && e.call(f);
                    b = !1
                } else this.pos = d.easing((a - this.startTime) / c), this.now = this.start + (this.end - this.start) * this.pos, this.update(), b = !0;
                return b
            },
            initPath: function(b, a, d) {
                function f(a) {
                    for (t = a.length; t--;) {
                        var b = "M" === a[t] || "L" === a[t];
                        var d = /[a-zA-Z]/.test(a[t + 3]);
                        b && d && a.splice(t + 1, 0, a[t + 1], a[t + 2], a[t + 1], a[t + 2])
                    }
                }

                function e(a, b) {
                    for (; a.length < J;) {
                        a[0] = b[J - a.length];
                        var d = a.slice(0, v);
                        [].splice.apply(a, [0, 0].concat(d));
                        B && (d = a.slice(a.length - v), [].splice.apply(a, [a.length, 0].concat(d)), t--)
                    }
                    a[0] = "M"
                }

                function c(a, b) {
                    for (var d = (J - a.length) / v; 0 < d && d--;) k = a.slice().splice(a.length / I - v, v * I), k[0] = b[J - v - d * v], q && (k[v - 6] = k[v - 2], k[v - 5] = k[v - 1]), [].splice.apply(a, [a.length / I, 0].concat(k)), B && d--
                }
                a = a || "";
                var r = b.startX,
                    E = b.endX,
                    q = -1 < a.indexOf("C"),
                    v = q ? 7 : 3,
                    k, t;
                a = a.split(" ");
                d = d.slice();
                var B = b.isArea,
                    I = B ? 2 : 1;
                q && (f(a), f(d));
                if (r && E) {
                    for (t = 0; t < r.length; t++)
                        if (r[t] === E[0]) {
                            var w = t;
                            break
                        } else if (r[0] === E[E.length - r.length + t]) {
                        w =
                            t;
                        var l = !0;
                        break
                    } else if (r[r.length - 1] === E[E.length - r.length + t]) {
                        w = r.length - t;
                        break
                    }
                    "undefined" === typeof w && (a = [])
                }
                if (a.length && L(w)) {
                    var J = d.length + w * I * v;
                    l ? (e(a, d), c(d, a)) : (e(d, a), c(a, d))
                }
                return [a, d]
            },
            fillSetter: function() {
                c.Fx.prototype.strokeSetter.apply(this, arguments)
            },
            strokeSetter: function() {
                this.elem.attr(this.prop, c.color(this.start).tweenTo(c.color(this.end), this.pos), null, !0)
            }
        };
        c.merge = function() {
            var b, a = arguments,
                d = {},
                f = function(a, b) {
                    "object" !== typeof a && (a = {});
                    x(b, function(d, e) {
                        !F(d, !0) ||
                            u(d) || z(d) ? a[e] = b[e] : a[e] = f(a[e] || {}, d)
                    });
                    return a
                };
            !0 === a[0] && (d = a[1], a = Array.prototype.slice.call(a, 2));
            var e = a.length;
            for (b = 0; b < e; b++) d = f(d, a[b]);
            return d
        };
        c.syncTimeout = function(b, a, d) {
            if (a) return setTimeout(b, a, d);
            b.call(0, d)
        };
        c.clearTimeout = function(b) {
            y(b) && clearTimeout(b)
        };
        c.extend = function(b, a) {
            var d;
            b || (b = {});
            for (d in a) b[d] = a[d];
            return b
        };
        c.pick = function() {
            var b = arguments,
                a, d = b.length;
            for (a = 0; a < d; a++) {
                var f = b[a];
                if ("undefined" !== typeof f && null !== f) return f
            }
        };
        c.css = function(b, a) {
            c.isMS &&
                !c.svg && a && "undefined" !== typeof a.opacity && (a.filter = "alpha(opacity=" + 100 * a.opacity + ")");
            c.extend(b.style, a)
        };
        c.createElement = function(b, a, d, f, e) {
            b = p.createElement(b);
            var h = c.css;
            a && c.extend(b, a);
            e && h(b, {
                padding: "0",
                border: "none",
                margin: "0"
            });
            d && h(b, d);
            f && f.appendChild(b);
            return b
        };
        c.extendClass = function(b, a) {
            var d = function() {};
            d.prototype = new b;
            c.extend(d.prototype, a);
            return d
        };
        c.pad = function(b, a, d) {
            return Array((a || 2) + 1 - String(b).replace("-", "").length).join(d || "0") + b
        };
        c.relativeLength = function(b,
            a, d) {
            return /%$/.test(b) ? a * parseFloat(b) / 100 + (d || 0) : parseFloat(b)
        };
        c.wrap = function(b, a, d) {
            var f = b[a];
            b[a] = function() {
                var a = Array.prototype.slice.call(arguments),
                    b = arguments,
                    c = this;
                c.proceed = function() {
                    f.apply(c, arguments.length ? arguments : b)
                };
                a.unshift(f);
                a = d.apply(this, a);
                c.proceed = null;
                return a
            }
        };
        c.datePropsToTimestamps = function(b) {
            x(b, function(a, d) {
                F(a) && "function" === typeof a.getTime ? b[d] = a.getTime() : (F(a) || D(a)) && c.datePropsToTimestamps(a)
            })
        };
        c.formatSingle = function(b, a, d) {
            var f = /\.([0-9])/,
                e = c.defaultOptions.lang;
            /f$/.test(b) ? (d = (d = b.match(f)) ? d[1] : -1, null !== a && (a = c.numberFormat(a, d, e.decimalPoint, -1 < b.indexOf(",") ? e.thousandsSep : ""))) : a = (d || c.time).dateFormat(b, a);
            return a
        };
        c.format = function(b, a, d) {
            for (var f = "{", e = !1, h, r, E, q, v = [], k; b;) {
                f = b.indexOf(f);
                if (-1 === f) break;
                h = b.slice(0, f);
                if (e) {
                    h = h.split(":");
                    r = h.shift().split(".");
                    q = r.length;
                    k = a;
                    for (E = 0; E < q; E++) k && (k = k[r[E]]);
                    h.length && (k = c.formatSingle(h.join(":"), k, d));
                    v.push(k)
                } else v.push(h);
                b = b.slice(f + 1);
                f = (e = !e) ? "}" : "{"
            }
            v.push(b);
            return v.join("")
        };
        c.getMagnitude =
            function(b) {
                return Math.pow(10, Math.floor(Math.log(b) / Math.LN10))
            };
        c.normalizeTickInterval = function(b, a, d, f, e) {
            var h = b;
            d = c.pick(d, 1);
            var r = b / d;
            a || (a = e ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === f && (1 === d ? a = a.filter(function(a) {
                return 0 === a % 1
            }) : .1 >= d && (a = [1 / d])));
            for (f = 0; f < a.length && !(h = a[f], e && h * d >= b || !e && r <= (a[f] + (a[f + 1] || a[f])) / 2); f++);
            return h = c.correctFloat(h * d, -Math.round(Math.log(.001) / Math.LN10))
        };
        c.stableSort = function(b, a) {
            var d = b.length,
                f, e;
            for (e = 0; e < d; e++) b[e].safeI = e;
            b.sort(function(b,
                d) {
                f = a(b, d);
                return 0 === f ? b.safeI - d.safeI : f
            });
            for (e = 0; e < d; e++) delete b[e].safeI
        };
        c.arrayMin = function(b) {
            for (var a = b.length, d = b[0]; a--;) b[a] < d && (d = b[a]);
            return d
        };
        c.arrayMax = function(b) {
            for (var a = b.length, d = b[0]; a--;) b[a] > d && (d = b[a]);
            return d
        };
        c.destroyObjectProperties = function(b, a) {
            x(b, function(d, f) {
                d && d !== a && d.destroy && d.destroy();
                delete b[f]
            })
        };
        c.discardElement = function(b) {
            var a = c.garbageBin;
            a || (a = c.createElement("div"));
            b && a.appendChild(b);
            a.innerHTML = ""
        };
        c.correctFloat = function(b, a) {
            return parseFloat(b.toPrecision(a ||
                14))
        };
        c.setAnimation = function(b, a) {
            a.renderer.globalAnimation = c.pick(b, a.options.chart.animation, !0)
        };
        c.animObject = function(b) {
            return F(b) ? c.merge(b) : {
                duration: b ? 500 : 0
            }
        };
        c.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        c.numberFormat = function(b, a, d, f) {
            b = +b || 0;
            a = +a;
            var e = c.defaultOptions.lang,
                h = (b.toString().split(".")[1] || "").split("e")[0].length,
                r = b.toString().split("e");
            if (-1 === a) a = Math.min(h, 20);
            else if (!L(a)) a = 2;
            else if (a && r[1] && 0 > r[1]) {
                var m =
                    a + +r[1];
                0 <= m ? (r[0] = (+r[0]).toExponential(m).split("e")[0], a = m) : (r[0] = r[0].split(".")[0] || 0, b = 20 > a ? (r[0] * Math.pow(10, r[1])).toFixed(a) : 0, r[1] = 0)
            }
            var q = (Math.abs(r[1] ? r[0] : b) + Math.pow(10, -Math.max(a, h) - 1)).toFixed(a);
            h = String(n(q));
            m = 3 < h.length ? h.length % 3 : 0;
            d = c.pick(d, e.decimalPoint);
            f = c.pick(f, e.thousandsSep);
            b = (0 > b ? "-" : "") + (m ? h.substr(0, m) + f : "");
            b += h.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + f);
            a && (b += d + q.slice(-a));
            r[1] && 0 !== +b && (b += "e" + r[1]);
            return b
        };
        Math.easeInOutSine = function(b) {
            return -.5 * (Math.cos(Math.PI *
                b) - 1)
        };
        c.getStyle = function(b, a, d) {
            if ("width" === a) return a = Math.min(b.offsetWidth, b.scrollWidth), d = b.getBoundingClientRect && b.getBoundingClientRect().width, d < a && d >= a - 1 && (a = Math.floor(d)), Math.max(0, a - c.getStyle(b, "padding-left") - c.getStyle(b, "padding-right"));
            if ("height" === a) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - c.getStyle(b, "padding-top") - c.getStyle(b, "padding-bottom"));
            g.getComputedStyle || c.error(27, !0);
            if (b = g.getComputedStyle(b, void 0)) b = b.getPropertyValue(a), c.pick(d, "opacity" !==
                a) && (b = n(b));
            return b
        };
        c.inArray = function(b, a, d) {
            return a.indexOf(b, d)
        };
        c.find = Array.prototype.find ? function(b, a) {
            return b.find(a)
        } : function(b, a) {
            var d, f = b.length;
            for (d = 0; d < f; d++)
                if (a(b[d], d)) return b[d]
        };
        c.keys = Object.keys;
        c.offset = function(b) {
            var a = p.documentElement;
            b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (g.pageYOffset || a.scrollTop) - (a.clientTop || 0),
                left: b.left + (g.pageXOffset || a.scrollLeft) - (a.clientLeft || 0)
            }
        };
        c.stop = function(b, a) {
            for (var d = c.timers.length; d--;) c.timers[d].elem !==
                b || a && a !== c.timers[d].prop || (c.timers[d].stopped = !0)
        };
        x({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function(b, a) {
            c[a] = function(a) {
                return Array.prototype[b].apply(a, [].slice.call(arguments, 1))
            }
        });
        c.addEvent = function(b, a, d, f) {
            void 0 === f && (f = {});
            var e = b.addEventListener || c.addEventListenerPolyfill;
            var h = "function" === typeof b && b.prototype ? b.prototype.protoEvents = b.prototype.protoEvents || {} : b.hcEvents = b.hcEvents || {};
            c.Point && b instanceof c.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
            e && e.call(b, a, d, !1);
            h[a] || (h[a] = []);
            h[a].push({
                fn: d,
                order: "number" === typeof f.order ? f.order : Infinity
            });
            h[a].sort(function(a, b) {
                return a.order - b.order
            });
            return function() {
                c.removeEvent(b, a, d)
            }
        };
        c.removeEvent = function(b, a, d) {
            function f(a, d) {
                var e = b.removeEventListener || c.removeEventListenerPolyfill;
                e && e.call(b, a, d, !1)
            }

            function e(d) {
                var e;
                if (b.nodeName) {
                    if (a) {
                        var c = {};
                        c[a] = !0
                    } else c = d;
                    x(c, function(a, b) {
                        if (d[b])
                            for (e = d[b].length; e--;) f(b, d[b][e].fn)
                    })
                }
            }
            var h;
            ["protoEvents", "hcEvents"].forEach(function(c) {
                var r =
                    b[c];
                r && (a ? (h = r[a] || [], d ? (r[a] = h.filter(function(a) {
                    return d !== a.fn
                }), f(a, d)) : (e(r), r[a] = [])) : (e(r), b[c] = {}))
            })
        };
        c.fireEvent = function(b, a, d, f) {
            var e;
            d = d || {};
            if (p.createEvent && (b.dispatchEvent || b.fireEvent)) {
                var h = p.createEvent("Events");
                h.initEvent(a, !0, !0);
                c.extend(h, d);
                b.dispatchEvent ? b.dispatchEvent(h) : b.fireEvent(a, h)
            } else d.target || c.extend(d, {
                    preventDefault: function() {
                        d.defaultPrevented = !0
                    },
                    target: b,
                    type: a
                }),
                function(a, f) {
                    void 0 === a && (a = []);
                    void 0 === f && (f = []);
                    var c = 0,
                        h = 0,
                        k = a.length + f.length;
                    for (e = 0; e < k; e++) !1 === (a[c] ? f[h] ? a[c].order <= f[h].order ? a[c++] : f[h++] : a[c++] : f[h++]).fn.call(b, d) && d.preventDefault()
                }(b.protoEvents && b.protoEvents[a], b.hcEvents && b.hcEvents[a]);
            f && !d.defaultPrevented && f.call(b, d)
        };
        c.animate = function(b, a, d) {
            var f, e = "",
                h, r;
            if (!F(d)) {
                var m = arguments;
                d = {
                    duration: m[2],
                    easing: m[3],
                    complete: m[4]
                }
            }
            L(d.duration) || (d.duration = 400);
            d.easing = "function" === typeof d.easing ? d.easing : Math[d.easing] || Math.easeInOutSine;
            d.curAnim = c.merge(a);
            x(a, function(q, v) {
                c.stop(b, v);
                r = new c.Fx(b,
                    d, v);
                h = null;
                "d" === v ? (r.paths = r.initPath(b, b.d, a.d), r.toD = a.d, f = 0, h = 1) : b.attr ? f = b.attr(v) : (f = parseFloat(c.getStyle(b, v)) || 0, "opacity" !== v && (e = "px"));
                h || (h = q);
                h && h.match && h.match("px") && (h = h.replace(/px/g, ""));
                r.run(f, h, e)
            })
        };
        c.seriesType = function(b, a, d, f, e) {
            var h = c.getOptions(),
                r = c.seriesTypes;
            h.plotOptions[b] = c.merge(h.plotOptions[a], d);
            r[b] = c.extendClass(r[a] || function() {}, f);
            r[b].prototype.type = b;
            e && (r[b].prototype.pointClass = c.extendClass(c.Point, e));
            return r[b]
        };
        c.uniqueKey = function() {
            var b = Math.random().toString(36).substring(2,
                    9),
                a = 0;
            return function() {
                return "highcharts-" + b + "-" + a++
            }
        }();
        c.isFunction = function(b) {
            return "function" === typeof b
        };
        g.jQuery && (g.jQuery.fn.highcharts = function() {
            var b = [].slice.call(arguments);
            if (this[0]) return b[0] ? (new(c[A(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) : m[C(this[0], "data-highcharts-chart")]
        });
        return {
            attr: C,
            defined: y,
            erase: function(b, a) {
                for (var d = b.length; d--;)
                    if (b[d] === a) {
                        b.splice(d, 1);
                        break
                    }
            },
            isArray: D,
            isClass: u,
            isDOMElement: z,
            isNumber: L,
            isObject: F,
            isString: A,
            objectEach: x,
            pInt: n,
            splat: function(b) {
                return D(b) ? b : [b]
            }
        }
    });
    N(H, "parts/Color.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.isNumber,
            D = n.pInt,
            F = c.merge;
        c.Color = function(z) {
            if (!(this instanceof c.Color)) return new c.Color(z);
            this.init(z)
        };
        c.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(c) {
                    return [D(c[1]), D(c[2]), D(c[3]), parseFloat(c[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(c) {
                    return [D(c[1]), D(c[2]), D(c[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(z) {
                var u, n;
                if ((this.input = z = this.names[z && z.toLowerCase ? z.toLowerCase() : ""] || z) && z.stops) this.stops = z.stops.map(function(x) {
                    return new c.Color(x[1])
                });
                else {
                    if (z && z.charAt && "#" === z.charAt()) {
                        var y = z.length;
                        z = parseInt(z.substr(1), 16);
                        7 === y ? u = [(z & 16711680) >> 16, (z & 65280) >> 8, z & 255, 1] : 4 === y && (u = [(z & 3840) >> 4 | (z & 3840) >> 8, (z & 240) >> 4 | z & 240, (z & 15) << 4 | z & 15, 1])
                    }
                    if (!u)
                        for (n = this.parsers.length; n-- && !u;) {
                            var C =
                                this.parsers[n];
                            (y = C.regex.exec(z)) && (u = C.parse(y))
                        }
                }
                this.rgba = u || []
            },
            get: function(c) {
                var u = this.input,
                    z = this.rgba;
                if (this.stops) {
                    var y = F(u);
                    y.stops = [].concat(y.stops);
                    this.stops.forEach(function(u, x) {
                        y.stops[x] = [y.stops[x][0], u.get(c)]
                    })
                } else y = z && A(z[0]) ? "rgb" === c || !c && 1 === z[3] ? "rgb(" + z[0] + "," + z[1] + "," + z[2] + ")" : "a" === c ? z[3] : "rgba(" + z.join(",") + ")" : u;
                return y
            },
            brighten: function(c) {
                var u, z = this.rgba;
                if (this.stops) this.stops.forEach(function(u) {
                    u.brighten(c)
                });
                else if (A(c) && 0 !== c)
                    for (u = 0; 3 > u; u++) z[u] +=
                        D(255 * c), 0 > z[u] && (z[u] = 0), 255 < z[u] && (z[u] = 255);
                return this
            },
            setOpacity: function(c) {
                this.rgba[3] = c;
                return this
            },
            tweenTo: function(c, u) {
                var z = this.rgba,
                    y = c.rgba;
                y.length && z && z.length ? (c = 1 !== y[3] || 1 !== z[3], u = (c ? "rgba(" : "rgb(") + Math.round(y[0] + (z[0] - y[0]) * (1 - u)) + "," + Math.round(y[1] + (z[1] - y[1]) * (1 - u)) + "," + Math.round(y[2] + (z[2] - y[2]) * (1 - u)) + (c ? "," + (y[3] + (z[3] - y[3]) * (1 - u)) : "") + ")") : u = c.input || "none";
                return u
            }
        };
        c.color = function(z) {
            return new c.Color(z)
        }
    });
    N(H, "parts/SvgRenderer.js", [H["parts/Globals.js"],
        H["parts/Utilities.js"]
    ], function(c, n) {
        var A = n.attr,
            D = n.defined,
            F = n.erase,
            z = n.isArray,
            u = n.isNumber,
            L = n.isObject,
            y = n.isString,
            C = n.objectEach,
            x = n.pInt,
            m = n.splat,
            p = c.addEvent,
            g = c.animate,
            b = c.charts,
            a = c.color,
            d = c.css,
            f = c.createElement,
            e = c.deg2rad,
            h = c.destroyObjectProperties,
            r = c.doc,
            E = c.extend,
            q = c.hasTouch,
            v = c.isFirefox,
            k = c.isMS,
            t = c.isWebKit,
            B = c.merge,
            I = c.noop,
            w = c.pick,
            l = c.removeEvent,
            J = c.stop,
            K = c.svg,
            T = c.SVG_NS,
            R = c.symbolSizes,
            S = c.win;
        var M = c.SVGElement = function() {
            return this
        };
        E(M.prototype, {
            opacity: 1,
            SVG_NS: T,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function(a, b) {
                this.element = "span" === b ? f(b) : r.createElementNS(this.SVG_NS, b);
                this.renderer = a;
                c.fireEvent(this, "afterInit")
            },
            animate: function(a, b, d) {
                var G = c.animObject(w(b, this.renderer.globalAnimation, !0));
                w(r.hidden, r.msHidden, r.webkitHidden, !1) && (G.duration = 0);
                0 !== G.duration ? (d && (G.complete = d), g(this, a, G)) : (this.attr(a, void 0, d), C(a,
                    function(a, b) {
                        G.step && G.step.call(this, a, {
                            prop: b,
                            pos: 1
                        })
                    }, this));
                return this
            },
            complexColor: function(a, b, d) {
                var G = this.renderer,
                    l, w, e, f, k, O, t, h, J, K, r, Q = [],
                    M;
                c.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    a.radialGradient ? w = "radialGradient" : a.linearGradient && (w = "linearGradient");
                    w && (e = a[w], k = G.gradients, t = a.stops, K = d.radialReference, z(e) && (a[w] = e = {
                            x1: e[0],
                            y1: e[1],
                            x2: e[2],
                            y2: e[3],
                            gradientUnits: "userSpaceOnUse"
                        }), "radialGradient" === w && K && !D(e.gradientUnits) && (f = e, e = B(e, G.getRadialAttr(K,
                            f), {
                            gradientUnits: "userSpaceOnUse"
                        })), C(e, function(a, G) {
                            "id" !== G && Q.push(G, a)
                        }), C(t, function(a) {
                            Q.push(a)
                        }), Q = Q.join(","), k[Q] ? r = k[Q].attr("id") : (e.id = r = c.uniqueKey(), k[Q] = O = G.createElement(w).attr(e).add(G.defs), O.radAttr = f, O.stops = [], t.forEach(function(a) {
                            0 === a[1].indexOf("rgba") ? (l = c.color(a[1]), h = l.get("rgb"), J = l.get("a")) : (h = a[1], J = 1);
                            a = G.createElement("stop").attr({
                                offset: a[0],
                                "stop-color": h,
                                "stop-opacity": J
                            }).add(O);
                            O.stops.push(a)
                        })), M = "url(" + G.url + "#" + r + ")", d.setAttribute(b, M), d.gradient =
                        Q, a.toString = function() {
                            return M
                        })
                })
            },
            applyTextOutline: function(a) {
                var b = this.element,
                    G; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(b.style.fill)));
                a = a.split(" ");
                var d = a[a.length - 1];
                if ((G = a[0]) && "none" !== G && c.svg) {
                    this.fakeTS = !0;
                    a = [].slice.call(b.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    G = G.replace(/(^[\d\.]+)(.*?)$/g, function(a, b, G) {
                        return 2 * b + G
                    });
                    this.removeTextOutline(a);
                    var w = b.firstChild;
                    a.forEach(function(a, l) {
                        0 === l && (a.setAttribute("x", b.getAttribute("x")),
                            l = b.getAttribute("y"), a.setAttribute("y", l || 0), null === l && b.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        A(a, {
                            "class": "highcharts-text-outline",
                            fill: d,
                            stroke: d,
                            "stroke-width": G,
                            "stroke-linejoin": "round"
                        });
                        b.insertBefore(a, w)
                    })
                }
            },
            removeTextOutline: function(a) {
                for (var b = a.length, G; b--;) G = a[b], "highcharts-text-outline" === G.getAttribute("class") && F(a, this.element.removeChild(G))
            },
            symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
            attr: function(a, b, d, l) {
                var G = this.element,
                    w, e = this,
                    f, k, O = this.symbolCustomAttribs;
                if ("string" === typeof a && void 0 !== b) {
                    var t = a;
                    a = {};
                    a[t] = b
                }
                "string" === typeof a ? e = (this[a + "Getter"] || this._defaultGetter).call(this, a, G) : (C(a, function(b, d) {
                    f = !1;
                    l || J(this, d);
                    this.symbolName && -1 !== c.inArray(d, O) && (w || (this.symbolAttr(a), w = !0), f = !0);
                    !this.rotation || "x" !== d && "y" !== d || (this.doTransform = !0);
                    f || (k = this[d + "Setter"] || this._defaultSetter, k.call(this, b, d, G), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d) && this.updateShadows(d,
                        b, k))
                }, this), this.afterSetters());
                d && d.call(this);
                return e
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function(a, b, d) {
                for (var G = this.shadows, l = G.length; l--;) d.call(G[l], "height" === a ? Math.max(b - (G[l].cutHeight || 0), 0) : "d" === a ? this.d : b, a, G[l])
            },
            addClass: function(a, b) {
                var d = this.attr("class") || "";
                b || (a = (a || "").split(/ /g).reduce(function(a, b) {
                    -1 === d.indexOf(b) && a.push(b);
                    return a
                }, d ? [d] : []).join(" "));
                a !== d && this.attr("class", a);
                return this
            },
            hasClass: function(a) {
                return -1 !== (this.attr("class") || "").split(" ").indexOf(a)
            },
            removeClass: function(a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function(a) {
                var b = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(d) {
                    b[d] = w(a[d], b[d])
                });
                b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a,
                b) {
                b = b || a.strokeWidth || 0;
                var d = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + d;
                a.y = Math.floor(a.y || this.y || 0) + d;
                a.width = Math.floor((a.width || this.width || 0) - 2 * d);
                a.height = Math.floor((a.height || this.height || 0) - 2 * d);
                D(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function(a) {
                var b = this.styles,
                    G = {},
                    l = this.element,
                    w = "",
                    e = !b,
                    f = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                b && C(a, function(a, d) {
                    a !== b[d] && (G[d] = a, e = !0)
                });
                if (e) {
                    b && (a = E(b, G));
                    if (a)
                        if (null === a.width || "auto" === a.width) delete this.textWidth;
                        else if ("text" === l.nodeName.toLowerCase() && a.width) var k = this.textWidth = x(a.width);
                    this.styles = a;
                    k && !K && this.renderer.forExport && delete a.width;
                    if (l.namespaceURI === this.SVG_NS) {
                        var c = function(a, b) {
                            return "-" + b.toLowerCase()
                        };
                        C(a, function(a, b) {
                            -1 === f.indexOf(b) && (w += b.replace(/([A-Z])/g, c) + ":" + a + ";")
                        });
                        w && A(l, "style", w)
                    } else d(l, a);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            },
            getStyle: function(a) {
                return S.getComputedStyle(this.element ||
                    this, "").getPropertyValue(a)
            },
            strokeWidth: function() {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width");
                if (a.indexOf("px") === a.length - 2) a = x(a);
                else {
                    var b = r.createElementNS(T, "rect");
                    A(b, {
                        width: a,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(b);
                    a = b.getBBox().width;
                    b.parentNode.removeChild(b)
                }
                return a
            },
            on: function(a, b) {
                var d = this,
                    l = d.element;
                q && "click" === a ? (l.ontouchstart = function(a) {
                        d.touchEventFired = Date.now();
                        a.preventDefault();
                        b.call(l, a)
                    }, l.onclick =
                    function(a) {
                        (-1 === S.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (d.touchEventFired || 0)) && b.call(l, a)
                    }) : l["on" + a] = b;
                return this
            },
            setRadialReference: function(a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function(a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a =
                    this.translateX || 0,
                    b = this.translateY || 0,
                    d = this.scaleX,
                    l = this.scaleY,
                    e = this.inverted,
                    f = this.rotation,
                    k = this.matrix,
                    c = this.element;
                e && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                D(k) && a.push("matrix(" + k.join(",") + ")");
                e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + w(this.rotationOriginX, c.getAttribute("x"), 0) + " " + w(this.rotationOriginY, c.getAttribute("y") || 0) + ")");
                (D(d) || D(l)) && a.push("scale(" + w(d, 1) + " " + w(l, 1) + ")");
                a.length && c.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a =
                    this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, b, d) {
                var l, G = {};
                var e = this.renderer;
                var f = e.alignedObjects;
                var k, c;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = b, !d || y(d)) this.alignTo = l = d || "renderer", F(f, this), f.push(this), d = null
                } else a = this.alignOptions, b = this.alignByTranslate, l = this.alignTo;
                d = w(d, e[l], e);
                l = a.align;
                e = a.verticalAlign;
                f = (d.x || 0) + (a.x || 0);
                var t = (d.y || 0) + (a.y || 0);
                "right" === l ? k = 1 : "center" === l && (k = 2);
                k && (f += (d.width - (a.width || 0)) / k);
                G[b ? "translateX" : "x"] = Math.round(f);
                "bottom" === e ? c = 1 : "middle" === e && (c = 2);
                c && (t += (d.height - (a.height || 0)) / c);
                G[b ? "translateY" : "y"] = Math.round(t);
                this[this.placed ? "animate" : "attr"](G);
                this.placed = !0;
                this.alignAttr = G;
                return this
            },
            getBBox: function(a, b) {
                var d, l = this.renderer,
                    G = this.element,
                    f = this.styles,
                    k = this.textStr,
                    c, t = l.cache,
                    h = l.cacheKeys,
                    O = G.namespaceURI === this.SVG_NS;
                b = w(b, this.rotation);
                var B = b * e;
                var J = l.styledMode ? G && M.prototype.getStyle.call(G, "font-size") : f && f.fontSize;
                if (D(k)) {
                    var K = k.toString(); - 1 === K.indexOf("<") && (K = K.replace(/[0-9]/g,
                        "0"));
                    K += ["", b || 0, J, this.textWidth, f && f.textOverflow].join()
                }
                K && !a && (d = t[K]);
                if (!d) {
                    if (O || l.forExport) {
                        try {
                            (c = this.fakeTS && function(a) {
                                [].forEach.call(G.querySelectorAll(".highcharts-text-outline"), function(b) {
                                    b.style.display = a
                                })
                            }) && c("none"), d = G.getBBox ? E({}, G.getBBox()) : {
                                width: G.offsetWidth,
                                height: G.offsetHeight
                            }, c && c("")
                        } catch (Z) {
                            ""
                        }
                        if (!d || 0 > d.width) d = {
                            width: 0,
                            height: 0
                        }
                    } else d = this.htmlGetBBox();
                    l.isSVG && (a = d.width, l = d.height, O && (d.height = l = {
                            "11px,17": 14,
                            "13px,20": 16
                        } [f && f.fontSize + "," + Math.round(l)] ||
                        l), b && (d.width = Math.abs(l * Math.sin(B)) + Math.abs(a * Math.cos(B)), d.height = Math.abs(l * Math.cos(B)) + Math.abs(a * Math.sin(B))));
                    if (K && 0 < d.height) {
                        for (; 250 < h.length;) delete t[h.shift()];
                        t[K] || h.push(K);
                        t[K] = d
                    }
                }
                return d
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function(a) {
                a ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            },
            fadeOut: function(a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var b =
                    this.renderer,
                    d = this.element;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) var l = this.zIndexSetter();
                l || (a ? a.element : b.box).appendChild(d);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    b = a.element || {},
                    d = a.renderer,
                    l = d.isSVG && "SPAN" === b.nodeName && a.parentGroup,
                    w = b.ownerSVGElement,
                    e = a.clipPath;
                b.onclick = b.onmouseout =
                    b.onmouseover = b.onmousemove = b.point = null;
                J(a);
                e && w && ([].forEach.call(w.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                    -1 < a.getAttribute("clip-path").indexOf(e.element.id) && a.removeAttribute("clip-path")
                }), a.clipPath = e.destroy());
                if (a.stops) {
                    for (w = 0; w < a.stops.length; w++) a.stops[w] = a.stops[w].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(b);
                for (d.styledMode || a.destroyShadows(); l && l.div && 0 === l.div.childNodes.length;) b = l.parentGroup, a.safeRemoveChild(l.div), delete l.div, l = b;
                a.alignTo && F(d.alignedObjects,
                    a);
                C(a, function(b, d) {
                    a[d] && a[d].parentGroup === a && a[d].destroy && a[d].destroy();
                    delete a[d]
                })
            },
            shadow: function(a, b, d) {
                var l = [],
                    e, f = this.element;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    var G = w(a.width, 3);
                    var k = (a.opacity || .15) / G;
                    var c = this.parentInverted ? "(-1,-1)" : "(" + w(a.offsetX, 1) + ", " + w(a.offsetY, 1) + ")";
                    for (e = 1; e <= G; e++) {
                        var t = f.cloneNode(0);
                        var h = 2 * G + 1 - 2 * e;
                        A(t, {
                            stroke: a.color || "#000000",
                            "stroke-opacity": k * e,
                            "stroke-width": h,
                            transform: "translate" + c,
                            fill: "none"
                        });
                        t.setAttribute("class",
                            (t.getAttribute("class") || "") + " highcharts-shadow");
                        d && (A(t, "height", Math.max(A(t, "height") - h, 0)), t.cutHeight = h);
                        b ? b.element.appendChild(t) : f.parentNode && f.parentNode.insertBefore(t, f);
                        l.push(t)
                    }
                    this.shadows = l
                }
                return this
            },
            destroyShadows: function() {
                (this.shadows || []).forEach(function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = w(this[a + "Value"],
                    this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, b, d) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[b] !== a && (d.setAttribute(b, a), this[b] = a)
            },
            dashstyleSetter: function(a) {
                var b, d = this["stroke-width"];
                "inherit" === d && (d = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash",
                        "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = x(a[b]) * d;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                var b = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                b[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", b[a]))
            },
            opacitySetter: function(a, b, d) {
                this[b] = a;
                d.setAttribute(b, a)
            },
            titleSetter: function(a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = r.createElementNS(this.SVG_NS,
                    "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(r.createTextNode(String(w(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            setTextPath: function(a, b) {
                var d = this.element,
                    l = {
                        textAnchor: "text-anchor"
                    },
                    w = !1,
                    e = this.textPathWrapper,
                    f = !e;
                b = B(!0, {
                        enabled: !0,
                        attributes: {
                            dy: -5,
                            startOffset: "50%",
                            textAnchor: "middle"
                        }
                    },
                    b);
                var k = b.attributes;
                if (a && b && b.enabled) {
                    this.options && this.options.padding && (k.dx = -this.options.padding);
                    e || (this.textPathWrapper = e = this.renderer.createElement("textPath"), w = !0);
                    var G = e.element;
                    (b = a.element.getAttribute("id")) || a.element.setAttribute("id", b = c.uniqueKey());
                    if (f)
                        for (a = d.getElementsByTagName("tspan"); a.length;) a[0].setAttribute("y", 0), G.appendChild(a[0]);
                    w && e.add({
                        element: this.text ? this.text.element : d
                    });
                    G.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + b);
                    D(k.dy) && (G.parentNode.setAttribute("dy", k.dy), delete k.dy);
                    D(k.dx) && (G.parentNode.setAttribute("dx", k.dx), delete k.dx);
                    C(k, function(a, b) {
                        G.setAttribute(l[b] || b, a)
                    });
                    d.removeAttribute("transform");
                    this.removeTextOutline.call(e, [].slice.call(d.getElementsByTagName("tspan")));
                    this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    });
                    this.applyTextOutline = this.updateTransform = I
                } else e && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(d, a));
                return this
            },
            destroyTextPath: function(a, b) {
                var d;
                b.element.setAttribute("id", "");
                for (d = this.textPathWrapper.element.childNodes; d.length;) a.firstChild.appendChild(d[0]);
                a.firstChild.removeChild(this.textPathWrapper.element);
                delete b.textPathWrapper
            },
            fillSetter: function(a, b, d) {
                "string" === typeof a ? d.setAttribute(b, a) : a && this.complexColor(a, b, d)
            },
            visibilitySetter: function(a, b, d) {
                "inherit" === a ? d.removeAttribute(b) : this[b] !== a && d.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function(a, b) {
                var d = this.renderer,
                    l = this.parentGroup,
                    w = (l || d).element || d.box,
                    e = this.element,
                    f = !1;
                d = w === d.box;
                var k = this.added;
                var c;
                D(a) ? (e.setAttribute("data-z-index", a), a = +a, this[b] === a && (k = !1)) : D(this[b]) && e.removeAttribute("data-z-index");
                this[b] = a;
                if (k) {
                    (a = this.zIndex) && l && (l.handleZ = !0);
                    b = w.childNodes;
                    for (c = b.length - 1; 0 <= c && !f; c--) {
                        l = b[c];
                        k = l.getAttribute("data-z-index");
                        var G = !D(k);
                        if (l !== e)
                            if (0 > a && G && !d && !c) w.insertBefore(e, b[c]), f = !0;
                            else if (x(k) <= a || G && (!D(a) || 0 <= a)) w.insertBefore(e, b[c + 1] || null), f = !0
                    }
                    f || (w.insertBefore(e, b[d ? 3 : 0] || null),
                        f = !0)
                }
                return f
            },
            _defaultSetter: function(a, b, d) {
                d.setAttribute(b, a)
            }
        });
        M.prototype.yGetter = M.prototype.xGetter;
        M.prototype.translateXSetter = M.prototype.translateYSetter = M.prototype.rotationSetter = M.prototype.verticalAlignSetter = M.prototype.rotationOriginXSetter = M.prototype.rotationOriginYSetter = M.prototype.scaleXSetter = M.prototype.scaleYSetter = M.prototype.matrixSetter = function(a, b) {
            this[b] = a;
            this.doTransform = !0
        };
        M.prototype["stroke-widthSetter"] = M.prototype.strokeSetter = function(a, b, d) {
            this[b] = a;
            this.stroke &&
                this["stroke-width"] ? (M.prototype.fillSetter.call(this, this.stroke, "stroke", d), d.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke ? (d.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (d.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
        };
        n = c.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        E(n.prototype, {
            Element: M,
            SVG_NS: T,
            init: function(a, b, l, w, e, f, k) {
                var c = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                });
                k || c.css(this.getStyle(w));
                w = c.element;
                a.appendChild(w);
                A(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && A(w, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = w;
                this.boxWrapper = c;
                this.alignedObjects = [];
                this.url = (v || t) && r.getElementsByTagName("base").length ? S.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(r.createTextNode("Created with Highcharts 7.2.0"));
                this.defs =
                    this.createElement("defs").add();
                this.allowHTML = f;
                this.forExport = e;
                this.styledMode = k;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, l, !1);
                var G;
                v && a.getBoundingClientRect && (b = function() {
                    d(a, {
                        left: 0,
                        top: 0
                    });
                    G = a.getBoundingClientRect();
                    d(a, {
                        left: Math.ceil(G.left) - G.left + "px",
                        top: Math.ceil(G.top) - G.top + "px"
                    })
                }, b(), this.unSubPixelFix = p(S, "resize", b))
            },
            definition: function(a) {
                function b(a, l) {
                    var w;
                    m(a).forEach(function(a) {
                        var e = d.createElement(a.tagName),
                            f = {};
                        C(a, function(a,
                            b) {
                            "tagName" !== b && "children" !== b && "textContent" !== b && (f[b] = a)
                        });
                        e.attr(f);
                        e.add(l || d.defs);
                        a.textContent && e.element.appendChild(r.createTextNode(a.textContent));
                        b(a.children || [], e);
                        w = e
                    });
                    return w
                }
                var d = this;
                return b(a)
            },
            getStyle: function(a) {
                return this.style = E({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a =
                    this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                h(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: I,
            getRadialAttr: function(a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            truncate: function(a, b, d, l, w, e, f) {
                var k = this,
                    c = a.rotation,
                    t, G = l ? 1 : 0,
                    h = (d || l).length,
                    B = h,
                    J = [],
                    K = function(a) {
                        b.firstChild &&
                            b.removeChild(b.firstChild);
                        a && b.appendChild(r.createTextNode(a))
                    },
                    M = function(e, c) {
                        c = c || e;
                        if (void 0 === J[c])
                            if (b.getSubStringLength) try {
                                J[c] = w + b.getSubStringLength(0, l ? c + 1 : c)
                            } catch (aa) {
                                ""
                            } else k.getSpanWidth && (K(f(d || l, e)), J[c] = w + k.getSpanWidth(a, b));
                        return J[c]
                    },
                    O;
                a.rotation = 0;
                var q = M(b.textContent.length);
                if (O = w + q > e) {
                    for (; G <= h;) B = Math.ceil((G + h) / 2), l && (t = f(l, B)), q = M(B, t && t.length - 1), G === h ? G = h + 1 : q > e ? h = B - 1 : G = B;
                    0 === h ? K("") : d && h === d.length - 1 || K(t || f(d || l, B))
                }
                l && l.splice(0, B);
                a.actualWidth = q;
                a.rotation =
                    c;
                return O
            },
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            buildText: function(a) {
                var b = a.element,
                    l = this,
                    e = l.forExport,
                    f = w(a.textStr, "").toString(),
                    k = -1 !== f.indexOf("<"),
                    c = b.childNodes,
                    t, h = A(b, "x"),
                    G = a.styles,
                    B = a.textWidth,
                    J = G && G.lineHeight,
                    M = G && G.textOutline,
                    q = G && "ellipsis" === G.textOverflow,
                    v = G && "nowrap" === G.whiteSpace,
                    I = G && G.fontSize,
                    m, g = c.length;
                G = B && !a.added && this.box;
                var E = function(a) {
                        var d;
                        l.styledMode || (d = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : I || l.style.fontSize ||
                            12);
                        return J ? x(J) : l.fontMetrics(d, a.getAttribute("style") ? a : b).h
                    },
                    p = function(a, b) {
                        C(l.escapes, function(d, l) {
                            b && -1 !== b.indexOf(d) || (a = a.toString().replace(new RegExp(d, "g"), l))
                        });
                        return a
                    },
                    R = function(a, b) {
                        var d = a.indexOf("<");
                        a = a.substring(d, a.indexOf(">") - d);
                        d = a.indexOf(b + "=");
                        if (-1 !== d && (d = d + b.length + 1, b = a.charAt(d), '"' === b || "'" === b)) return a = a.substring(d + 1), a.substring(0, a.indexOf(b))
                    },
                    S = /<br.*?>/g;
                var u = [f, q, v, J, M, I, B].join();
                if (u !== a.textCache) {
                    for (a.textCache = u; g--;) b.removeChild(c[g]);
                    k || M ||
                        q || B || -1 !== f.indexOf(" ") && (!v || S.test(f)) ? (G && G.appendChild(b), k ? (f = l.styledMode ? f.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g, '<span class="highcharts-emphasized">') : f.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), f = f.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(S)) : f = [f], f = f.filter(function(a) {
                            return "" !== a
                        }), f.forEach(function(w, f) {
                            var k = 0,
                                c = 0;
                            w = w.replace(/^\s+|\s+$/g,
                                "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                            var G = w.split("|||");
                            G.forEach(function(w) {
                                if ("" !== w || 1 === G.length) {
                                    var J = {},
                                        M = r.createElementNS(l.SVG_NS, "tspan"),
                                        O, g;
                                    (O = R(w, "class")) && A(M, "class", O);
                                    if (O = R(w, "style")) O = O.replace(/(;| |^)color([ :])/, "$1fill$2"), A(M, "style", O);
                                    (g = R(w, "href")) && !e && (A(M, "onclick", 'location.href="' + g + '"'), A(M, "class", "highcharts-anchor"), l.styledMode || d(M, {
                                        cursor: "pointer"
                                    }));
                                    w = p(w.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== w) {
                                        M.appendChild(r.createTextNode(w));
                                        k ? J.dx = 0 : f && null !== h && (J.x = h);
                                        A(M, J);
                                        b.appendChild(M);
                                        !k && m && (!K && e && d(M, {
                                            display: "block"
                                        }), A(M, "dy", E(M)));
                                        if (B) {
                                            var Q = w.replace(/([^\^])-/g, "$1- ").split(" ");
                                            J = !v && (1 < G.length || f || 1 < Q.length);
                                            g = 0;
                                            var x = E(M);
                                            if (q) t = l.truncate(a, M, w, void 0, 0, Math.max(0, B - parseInt(I || 12, 10)), function(a, b) {
                                                return a.substring(0, b) + "\u2026"
                                            });
                                            else if (J)
                                                for (; Q.length;) Q.length && !v && 0 < g && (M = r.createElementNS(T, "tspan"), A(M, {
                                                        dy: x,
                                                        x: h
                                                    }), O && A(M, "style", O), M.appendChild(r.createTextNode(Q.join(" ").replace(/- /g, "-"))), b.appendChild(M)),
                                                    l.truncate(a, M, null, Q, 0 === g ? c : 0, B, function(a, b) {
                                                        return Q.slice(0, b).join(" ").replace(/- /g, "-")
                                                    }), c = a.actualWidth, g++
                                        }
                                        k++
                                    }
                                }
                            });
                            m = m || b.childNodes.length
                        }), q && t && a.attr("title", p(a.textStr, ["&lt;", "&gt;"])), G && G.removeChild(b), M && a.applyTextOutline && a.applyTextOutline(M)) : b.appendChild(r.createTextNode(p(f)))
                }
            },
            getContrast: function(b) {
                b = a(b).rgba;
                b[0] *= 1;
                b[1] *= 1.2;
                b[2] *= .5;
                return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, b, d, l, w, e, f, c, t, h) {
                var G = this.label(a, b, d, t, null, null, h, null, "button"),
                    J = 0,
                    K = this.styledMode;
                G.attr(B({
                    padding: 8,
                    r: 2
                }, w));
                if (!K) {
                    w = B({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {
                            color: "#333333",
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, w);
                    var M = w.style;
                    delete w.style;
                    e = B(w, {
                        fill: "#e6e6e6"
                    }, e);
                    var r = e.style;
                    delete e.style;
                    f = B(w, {
                        fill: "#e6ebf5",
                        style: {
                            color: "#000000",
                            fontWeight: "bold"
                        }
                    }, f);
                    var q = f.style;
                    delete f.style;
                    c = B(w, {
                        style: {
                            color: "#cccccc"
                        }
                    }, c);
                    var O = c.style;
                    delete c.style
                }
                p(G.element, k ? "mouseover" : "mouseenter", function() {
                    3 !== J && G.setState(1)
                });
                p(G.element,
                    k ? "mouseout" : "mouseleave",
                    function() {
                        3 !== J && G.setState(J)
                    });
                G.setState = function(a) {
                    1 !== a && (G.state = J = a);
                    G.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    K || G.attr([w, e, f, c][a || 0]).css([M, r, q, O][a || 0])
                };
                K || G.attr(w).css(E({
                    cursor: "default"
                }, M));
                return G.on("click", function(a) {
                    3 !== J && l.call(G, a)
                })
            },
            crispLine: function(a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) +
                    b % 2 / 2);
                return a
            },
            path: function(a) {
                var b = this.styledMode ? {} : {
                    fill: "none"
                };
                z(a) ? b.d = a : L(a) && E(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function(a, b, d) {
                a = L(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    r: d
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function(a, b, d) {
                    d.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function(a, b, d, l, w, e) {
                L(a) ? (l = a, b = l.y, d = l.r, a = l.x) : l = {
                    innerR: l,
                    start: w,
                    end: e
                };
                a = this.symbol("arc", a, b, d, d, l);
                a.r = d;
                return a
            },
            rect: function(a, b, d, l, w, e) {
                w = L(a) ? a.r : w;
                var f = this.createElement("rect");
                a = L(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(d, 0),
                    height: Math.max(l, 0)
                };
                this.styledMode || (void 0 !== e && (a.strokeWidth = e, a = f.crisp(a)), a.fill = "none");
                w && (a.r = w);
                f.rSetter = function(a, b, d) {
                    f.r = a;
                    A(d, {
                        rx: a,
                        ry: a
                    })
                };
                f.rGetter = function() {
                    return f.r
                };
                return f.attr(a)
            },
            setSize: function(a, b, d) {
                var l = this.alignedObjects,
                    e = l.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                        width: a,
                        height: b
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: w(d, !0) ?
                            void 0 : 0
                    }); e--;) l[e].align()
            },
            g: function(a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function(a, b, d, l, w, e) {
                var f = {
                        preserveAspectRatio: "none"
                    },
                    k = function(a, b) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b)
                    },
                    c = function(b) {
                        k(t.element, a);
                        e.call(t, b)
                    };
                1 < arguments.length && E(f, {
                    x: b,
                    y: d,
                    width: l,
                    height: w
                });
                var t = this.createElement("image").attr(f);
                e ? (k(t.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                    f = new S.Image, p(f, "load", c), f.src = a, f.complete && c({})) : k(t.element, a);
                return t
            },
            symbol: function(a, l, e, k, c, t) {
                var h = this,
                    B = /^url\((.*?)\)$/,
                    G = B.test(a),
                    J = !G && (this.symbols[a] ? a : "circle"),
                    K = J && this.symbols[J],
                    M = D(l) && K && K.call(this.symbols, Math.round(l), Math.round(e), k, c, t);
                if (K) {
                    var q = this.path(M);
                    h.styledMode || q.attr("fill", "none");
                    E(q, {
                        symbolName: J,
                        x: l,
                        y: e,
                        width: k,
                        height: c
                    });
                    t && E(q, t)
                } else if (G) {
                    var v = a.match(B)[1];
                    q = this.image(v);
                    q.imgwidth = w(R[v] && R[v].width, t && t.width);
                    q.imgheight = w(R[v] && R[v].height,
                        t && t.height);
                    var I = function() {
                        q.attr({
                            width: q.width,
                            height: q.height
                        })
                    };
                    ["width", "height"].forEach(function(a) {
                        q[a + "Setter"] = function(a, b) {
                            var d = {},
                                l = this["img" + b],
                                w = "width" === b ? "translateX" : "translateY";
                            this[b] = a;
                            D(l) && (t && "within" === t.backgroundSize && this.width && this.height && (l = Math.round(l * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(b, l), this.alignByTranslate || (d[w] = ((this[b] || 0) - l) / 2, this.attr(d)))
                        }
                    });
                    D(l) && q.attr({
                        x: l,
                        y: e
                    });
                    q.isImg = !0;
                    D(q.imgwidth) && D(q.imgheight) ? I() : (q.attr({
                        width: 0,
                        height: 0
                    }), f("img", {
                        onload: function() {
                            var a = b[h.chartIndex];
                            0 === this.width && (d(this, {
                                position: "absolute",
                                top: "-999em"
                            }), r.body.appendChild(this));
                            R[v] = {
                                width: this.width,
                                height: this.height
                            };
                            q.imgwidth = this.width;
                            q.imgheight = this.height;
                            q.element && I();
                            this.parentNode && this.parentNode.removeChild(this);
                            h.imgCount--;
                            if (!h.imgCount && a && a.onload) a.onload()
                        },
                        src: v
                    }), this.imgCount++)
                }
                return q
            },
            symbols: {
                circle: function(a, b, d, l) {
                    return this.arc(a + d / 2, b + l / 2,
                        d / 2, l / 2, {
                            start: .5 * Math.PI,
                            end: 2.5 * Math.PI,
                            open: !1
                        })
                },
                square: function(a, b, d, l) {
                    return ["M", a, b, "L", a + d, b, a + d, b + l, a, b + l, "Z"]
                },
                triangle: function(a, b, d, l) {
                    return ["M", a + d / 2, b, "L", a + d, b + l, a, b + l, "Z"]
                },
                "triangle-down": function(a, b, d, l) {
                    return ["M", a, b, "L", a + d, b, a + d / 2, b + l, "Z"]
                },
                diamond: function(a, b, d, l) {
                    return ["M", a + d / 2, b, "L", a + d, b + l / 2, a + d / 2, b + l, a, b + l / 2, "Z"]
                },
                arc: function(a, b, d, l, e) {
                    var f = e.start,
                        k = e.r || d,
                        c = e.r || l || d,
                        t = e.end - .001;
                    d = e.innerR;
                    l = w(e.open, .001 > Math.abs(e.end - e.start - 2 * Math.PI));
                    var h = Math.cos(f),
                        B = Math.sin(f),
                        J = Math.cos(t);
                    t = Math.sin(t);
                    f = .001 > e.end - f - Math.PI ? 0 : 1;
                    e = ["M", a + k * h, b + c * B, "A", k, c, 0, f, w(e.clockwise, 1), a + k * J, b + c * t];
                    D(d) && e.push(l ? "M" : "L", a + d * J, b + d * t, "A", d, d, 0, f, 0, a + d * h, b + d * B);
                    e.push(l ? "" : "Z");
                    return e
                },
                callout: function(a, b, d, l, w) {
                    var e = Math.min(w && w.r || 0, d, l),
                        f = e + 6,
                        k = w && w.anchorX;
                    w = w && w.anchorY;
                    var c = ["M", a + e, b, "L", a + d - e, b, "C", a + d, b, a + d, b, a + d, b + e, "L", a + d, b + l - e, "C", a + d, b + l, a + d, b + l, a + d - e, b + l, "L", a + e, b + l, "C", a, b + l, a, b + l, a, b + l - e, "L", a, b + e, "C", a, b, a, b, a + e, b];
                    k && k > d ? w > b + f && w < b + l - f ? c.splice(13,
                        3, "L", a + d, w - 6, a + d + 6, w, a + d, w + 6, a + d, b + l - e) : c.splice(13, 3, "L", a + d, l / 2, k, w, a + d, l / 2, a + d, b + l - e) : k && 0 > k ? w > b + f && w < b + l - f ? c.splice(33, 3, "L", a, w + 6, a - 6, w, a, w - 6, a, b + e) : c.splice(33, 3, "L", a, l / 2, k, w, a, l / 2, a, b + e) : w && w > l && k > a + f && k < a + d - f ? c.splice(23, 3, "L", k + 6, b + l, k, b + l + 6, k - 6, b + l, a + e, b + l) : w && 0 > w && k > a + f && k < a + d - f && c.splice(3, 3, "L", k - 6, b, k, b - 6, k + 6, b, d - e, b);
                    return c
                }
            },
            clipRect: function(a, b, d, l) {
                var w = c.uniqueKey() + "-",
                    e = this.createElement("clipPath").attr({
                        id: w
                    }).add(this.defs);
                a = this.rect(a, b, d, l, 0).add(e);
                a.id = w;
                a.clipPath =
                    e;
                a.count = 0;
                return a
            },
            text: function(a, b, d, l) {
                var w = {};
                if (l && (this.allowHTML || !this.forExport)) return this.html(a, b, d);
                w.x = Math.round(b || 0);
                d && (w.y = Math.round(d));
                D(a) && (w.text = a);
                a = this.createElement("text").attr(w);
                l || (a.xSetter = function(a, b, d) {
                    var l = d.getElementsByTagName("tspan"),
                        w = d.getAttribute(b),
                        e;
                    for (e = 0; e < l.length; e++) {
                        var f = l[e];
                        f.getAttribute(b) === w && f.setAttribute(b, a)
                    }
                    d.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function(a, b) {
                a = !this.styledMode && /px/.test(a) || !S.getComputedStyle ? a || b &&
                    b.style && b.style.fontSize || this.style && this.style.fontSize : b && M.prototype.getStyle.call(b, "font-size");
                a = /px/.test(a) ? x(a) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b,
                    b: Math.round(.8 * b),
                    f: a
                }
            },
            rotCorr: function(a, b, d) {
                var l = a;
                b && d && (l = Math.max(l * Math.cos(b * e), 4));
                return {
                    x: -a / 3 * Math.sin(b * e),
                    y: l
                }
            },
            label: function(a, b, d, w, e, f, k, c, t) {
                var h = this,
                    J = h.styledMode,
                    K = h.g("button" !== t && "label"),
                    q = K.text = h.text("", 0, 0, k).attr({
                        zIndex: 1
                    }),
                    r, v, G = 0,
                    I = 3,
                    m = 0,
                    g, p, O, T, x, Q = {},
                    R, S, z = /^url\((.*?)\)$/.test(w),
                    y = J || z,
                    n = function() {
                        return J ?
                            r.strokeWidth() % 2 / 2 : (R ? parseInt(R, 10) : 0) % 2 / 2
                    };
                t && K.addClass("highcharts-" + t);
                var L = function() {
                    var a = q.element.style,
                        b = {};
                    v = (void 0 === g || void 0 === p || x) && D(q.textStr) && q.getBBox();
                    K.width = (g || v.width || 0) + 2 * I + m;
                    K.height = (p || v.height || 0) + 2 * I;
                    S = I + Math.min(h.fontMetrics(a && a.fontSize, q).b, v ? v.height : Infinity);
                    y && (r || (K.box = r = h.symbols[w] || z ? h.symbol(w) : h.rect(), r.addClass(("button" === t ? "" : "highcharts-label-box") + (t ? " highcharts-" + t + "-box" : "")), r.add(K), a = n(), b.x = a, b.y = (c ? -S : 0) + a), b.width = Math.round(K.width),
                        b.height = Math.round(K.height), r.attr(E(b, Q)), Q = {})
                };
                var C = function() {
                    var a = m + I;
                    var b = c ? 0 : S;
                    D(g) && v && ("center" === x || "right" === x) && (a += {
                        center: .5,
                        right: 1
                    } [x] * (g - v.width));
                    if (a !== q.x || b !== q.y) q.attr("x", a), q.hasBoxWidthChanged && (v = q.getBBox(!0), L()), void 0 !== b && q.attr("y", b);
                    q.x = a;
                    q.y = b
                };
                var A = function(a, b) {
                    r ? r.attr(a, b) : Q[a] = b
                };
                K.onAdd = function() {
                    q.add(K);
                    K.attr({
                        text: a || 0 === a ? a : "",
                        x: b,
                        y: d
                    });
                    r && D(e) && K.attr({
                        anchorX: e,
                        anchorY: f
                    })
                };
                K.widthSetter = function(a) {
                    g = u(a) ? a : null
                };
                K.heightSetter = function(a) {
                    p =
                        a
                };
                K["text-alignSetter"] = function(a) {
                    x = a
                };
                K.paddingSetter = function(a) {
                    D(a) && a !== I && (I = K.padding = a, C())
                };
                K.paddingLeftSetter = function(a) {
                    D(a) && a !== m && (m = a, C())
                };
                K.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [a];
                    a !== G && (G = a, v && K.attr({
                        x: O
                    }))
                };
                K.textSetter = function(a) {
                    void 0 !== a && q.attr({
                        text: a
                    });
                    L();
                    C()
                };
                K["stroke-widthSetter"] = function(a, b) {
                    a && (y = !0);
                    R = this["stroke-width"] = a;
                    A(b, a)
                };
                J ? K.rSetter = function(a, b) {
                    A(b, a)
                } : K.strokeSetter = K.fillSetter = K.rSetter = function(a, b) {
                    "r" !== b && ("fill" === b &&
                        a && (y = !0), K[b] = a);
                    A(b, a)
                };
                K.anchorXSetter = function(a, b) {
                    e = K.anchorX = a;
                    A(b, Math.round(a) - n() - O)
                };
                K.anchorYSetter = function(a, b) {
                    f = K.anchorY = a;
                    A(b, a - T)
                };
                K.xSetter = function(a) {
                    K.x = a;
                    G && (a -= G * ((g || v.width) + 2 * I), K["forceAnimate:x"] = !0);
                    O = Math.round(a);
                    K.attr("translateX", O)
                };
                K.ySetter = function(a) {
                    T = K.y = Math.round(a);
                    K.attr("translateY", T)
                };
                var U = K.css;
                k = {
                    css: function(a) {
                        if (a) {
                            var b = {};
                            a = B(a);
                            K.textProps.forEach(function(d) {
                                void 0 !== a[d] && (b[d] = a[d], delete a[d])
                            });
                            q.css(b);
                            "width" in b && L();
                            "fontSize" in b &&
                                (L(), C())
                        }
                        return U.call(K, a)
                    },
                    getBBox: function() {
                        return {
                            width: v.width + 2 * I,
                            height: v.height + 2 * I,
                            x: v.x - I,
                            y: v.y - I
                        }
                    },
                    destroy: function() {
                        l(K.element, "mouseenter");
                        l(K.element, "mouseleave");
                        q && (q = q.destroy());
                        r && (r = r.destroy());
                        M.prototype.destroy.call(K);
                        K = h = L = C = A = null
                    }
                };
                J || (k.shadow = function(a) {
                    a && (L(), r && r.shadow(a));
                    return K
                });
                return E(K, k)
            }
        });
        c.Renderer = n
    });
    N(H, "parts/Html.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.attr,
            D = n.defined,
            F = n.pInt,
            z = c.createElement,
            u = c.css,
            L =
            c.extend,
            y = c.isFirefox,
            C = c.isMS,
            x = c.isWebKit,
            m = c.pick,
            p = c.SVGElement;
        n = c.SVGRenderer;
        var g = c.win;
        L(p.prototype, {
            htmlCss: function(b) {
                var a = "SPAN" === this.element.tagName && b && "width" in b,
                    d = m(a && b.width, void 0);
                if (a) {
                    delete b.width;
                    this.textWidth = d;
                    var f = !0
                }
                b && "ellipsis" === b.textOverflow && (b.whiteSpace = "nowrap", b.overflow = "hidden");
                this.styles = L(this.styles, b);
                u(this.element, b);
                f && this.htmlUpdateTransform();
                return this
            },
            htmlGetBBox: function() {
                var b = this.element;
                return {
                    x: b.offsetLeft,
                    y: b.offsetTop,
                    width: b.offsetWidth,
                    height: b.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var b = this.renderer,
                        a = this.element,
                        d = this.translateX || 0,
                        f = this.translateY || 0,
                        e = this.x || 0,
                        c = this.y || 0,
                        r = this.textAlign || "left",
                        m = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [r],
                        q = this.styles,
                        v = q && q.whiteSpace;
                    u(a, {
                        marginLeft: d,
                        marginTop: f
                    });
                    !b.styledMode && this.shadows && this.shadows.forEach(function(a) {
                        u(a, {
                            marginLeft: d + 1,
                            marginTop: f + 1
                        })
                    });
                    this.inverted && [].forEach.call(a.childNodes, function(d) {
                        b.invertChild(d, a)
                    });
                    if ("SPAN" === a.tagName) {
                        q = this.rotation;
                        var k = this.textWidth && F(this.textWidth),
                            t = [q, r, a.innerHTML, this.textWidth, this.textAlign].join(),
                            B;
                        (B = k !== this.oldTextWidth) && !(B = k > this.oldTextWidth) && ((B = this.textPxLength) || (u(a, {
                            width: "",
                            whiteSpace: v || "nowrap"
                        }), B = a.offsetWidth), B = B > k);
                        B && (/[ \-]/.test(a.textContent || a.innerText) || "ellipsis" === a.style.textOverflow) ? (u(a, {
                            width: k + "px",
                            display: "block",
                            whiteSpace: v || "normal"
                        }), this.oldTextWidth = k, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        t !== this.cTT && (v = b.fontMetrics(a.style.fontSize,
                            a).b, !D(q) || q === (this.oldRotation || 0) && r === this.oldAlign || this.setSpanRotation(q, m, v), this.getSpanCorrection(!D(q) && this.textPxLength || a.offsetWidth, v, m, q, r));
                        u(a, {
                            left: e + (this.xCorr || 0) + "px",
                            top: c + (this.yCorr || 0) + "px"
                        });
                        this.cTT = t;
                        this.oldRotation = q;
                        this.oldAlign = r
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(b, a, d) {
                var f = {},
                    e = this.renderer.getTransformKey();
                f[e] = f.transform = "rotate(" + b + "deg)";
                f[e + (y ? "Origin" : "-origin")] = f.transformOrigin = 100 * a + "% " + d + "px";
                u(this.element, f)
            },
            getSpanCorrection: function(b,
                a, d) {
                this.xCorr = -b * d;
                this.yCorr = -a
            }
        });
        L(n.prototype, {
            getTransformKey: function() {
                return C && !/Edge/.test(g.navigator.userAgent) ? "-ms-transform" : x ? "-webkit-transform" : y ? "MozTransform" : g.opera ? "-o-transform" : ""
            },
            html: function(b, a, d) {
                var f = this.createElement("span"),
                    e = f.element,
                    c = f.renderer,
                    r = c.isSVG,
                    g = function(a, b) {
                        ["opacity", "visibility"].forEach(function(d) {
                            a[d + "Setter"] = function(e, f, k) {
                                var w = a.div ? a.div.style : b;
                                p.prototype[d + "Setter"].call(this, e, f, k);
                                w && (w[f] = e)
                            }
                        });
                        a.addedSetters = !0
                    };
                f.textSetter =
                    function(a) {
                        a !== e.innerHTML && (delete this.bBox, delete this.oldTextWidth);
                        this.textStr = a;
                        e.innerHTML = m(a, "");
                        f.doTransform = !0
                    };
                r && g(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function(a, b) {
                    "align" === b && (b = "textAlign");
                    f[b] = a;
                    f.doTransform = !0
                };
                f.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                f.attr({
                    text: b,
                    x: Math.round(a),
                    y: Math.round(d)
                }).css({
                    position: "absolute"
                });
                c.styledMode || f.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                e.style.whiteSpace = "nowrap";
                f.css = f.htmlCss;
                r && (f.add = function(a) {
                    var b = c.box.parentNode,
                        d = [];
                    if (this.parentGroup = a) {
                        var t = a.div;
                        if (!t) {
                            for (; a;) d.push(a), a = a.parentGroup;
                            d.reverse().forEach(function(a) {
                                function e(b, d) {
                                    a[d] = b;
                                    "translateX" === d ? l.left = b + "px" : l.top = b + "px";
                                    a.doTransform = !0
                                }
                                var w = A(a.element, "class");
                                t = a.div = a.div || z("div", w ? {
                                        className: w
                                    } : void 0, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    },
                                    t || b);
                                var l = t.style;
                                L(a, {
                                    classSetter: function(a) {
                                        return function(b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(t),
                                    on: function() {
                                        d[0].div && f.on.apply({
                                            element: d[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: e,
                                    translateYSetter: e
                                });
                                a.addedSetters || g(a)
                            })
                        }
                    } else t = b;
                    t.appendChild(e);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f
                });
                return f
            }
        })
    });
    N(H, "parts/Time.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.isObject,
            F = n.objectEach,
            z = n.splat,
            u =
            c.extend,
            L = c.merge,
            y = c.pick,
            C = c.timeUnits,
            x = c.win;
        c.Time = function(c) {
            this.update(c, !1)
        };
        c.Time.prototype = {
            defaultOptions: {},
            update: function(c) {
                var m = y(c && c.useUTC, !0),
                    g = this;
                this.options = c = L(!0, this.options || {}, c);
                this.Date = c.Date || x.Date || Date;
                this.timezoneOffset = (this.useUTC = m) && c.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(m && !c.getTimezoneOffset && !c.timezone)) || this.timezoneOffset ? (this.get = function(b, a) {
                    var d = a.getTime(),
                        f = d - g.getTimezoneOffset(a);
                    a.setTime(f);
                    b = a["getUTC" + b]();
                    a.setTime(d);
                    return b
                }, this.set = function(b, a, d) {
                    if ("Milliseconds" === b || "Seconds" === b || "Minutes" === b && 0 === a.getTimezoneOffset() % 60) a["set" + b](d);
                    else {
                        var f = g.getTimezoneOffset(a);
                        f = a.getTime() - f;
                        a.setTime(f);
                        a["setUTC" + b](d);
                        b = g.getTimezoneOffset(a);
                        f = a.getTime() + b;
                        a.setTime(f)
                    }
                }) : m ? (this.get = function(b, a) {
                    return a["getUTC" + b]()
                }, this.set = function(b, a, d) {
                    return a["setUTC" + b](d)
                }) : (this.get = function(b, a) {
                    return a["get" + b]()
                }, this.set = function(b, a, d) {
                    return a["set" + b](d)
                })
            },
            makeTime: function(m, p, g, b, a, d) {
                if (this.useUTC) {
                    var f = this.Date.UTC.apply(0, arguments);
                    var e = this.getTimezoneOffset(f);
                    f += e;
                    var h = this.getTimezoneOffset(f);
                    e !== h ? f += h - e : e - 36E5 !== this.getTimezoneOffset(f - 36E5) || c.isSafari || (f -= 36E5)
                } else f = (new this.Date(m, p, y(g, 1), y(b, 0), y(a, 0), y(d, 0))).getTime();
                return f
            },
            timezoneOffsetFunction: function() {
                var m = this,
                    p = this.options,
                    g = x.moment;
                if (!this.useUTC) return function(b) {
                    return 6E4 * (new Date(b)).getTimezoneOffset()
                };
                if (p.timezone) {
                    if (g) return function(b) {
                        return 6E4 *
                            -g.tz(b, p.timezone).utcOffset()
                    };
                    c.error(25)
                }
                return this.useUTC && p.getTimezoneOffset ? function(b) {
                    return 6E4 * p.getTimezoneOffset(b)
                } : function() {
                    return 6E4 * (m.timezoneOffset || 0)
                }
            },
            dateFormat: function(m, p, g) {
                if (!A(p) || isNaN(p)) return c.defaultOptions.lang.invalidDate || "";
                m = c.pick(m, "%Y-%m-%d %H:%M:%S");
                var b = this,
                    a = new this.Date(p),
                    d = this.get("Hours", a),
                    f = this.get("Day", a),
                    e = this.get("Date", a),
                    h = this.get("Month", a),
                    r = this.get("FullYear", a),
                    E = c.defaultOptions.lang,
                    q = E.weekdays,
                    v = E.shortWeekdays,
                    k = c.pad;
                a = c.extend({
                    a: v ? v[f] : q[f].substr(0, 3),
                    A: q[f],
                    d: k(e),
                    e: k(e, 2, " "),
                    w: f,
                    b: E.shortMonths[h],
                    B: E.months[h],
                    m: k(h + 1),
                    o: h + 1,
                    y: r.toString().substr(2, 2),
                    Y: r,
                    H: k(d),
                    k: d,
                    I: k(d % 12 || 12),
                    l: d % 12 || 12,
                    M: k(b.get("Minutes", a)),
                    p: 12 > d ? "AM" : "PM",
                    P: 12 > d ? "am" : "pm",
                    S: k(a.getSeconds()),
                    L: k(Math.floor(p % 1E3), 3)
                }, c.dateFormats);
                F(a, function(a, d) {
                    for (; - 1 !== m.indexOf("%" + d);) m = m.replace("%" + d, "function" === typeof a ? a.call(b, p) : a)
                });
                return g ? m.substr(0, 1).toUpperCase() + m.substr(1) : m
            },
            resolveDTLFormat: function(c) {
                return D(c, !0) ?
                    c : (c = z(c), {
                        main: c[0],
                        from: c[1],
                        to: c[2]
                    })
            },
            getTimeTicks: function(c, p, g, b) {
                var a = this,
                    d = [],
                    f = {};
                var e = new a.Date(p);
                var h = c.unitRange,
                    r = c.count || 1,
                    m;
                b = y(b, 1);
                if (A(p)) {
                    a.set("Milliseconds", e, h >= C.second ? 0 : r * Math.floor(a.get("Milliseconds", e) / r));
                    h >= C.second && a.set("Seconds", e, h >= C.minute ? 0 : r * Math.floor(a.get("Seconds", e) / r));
                    h >= C.minute && a.set("Minutes", e, h >= C.hour ? 0 : r * Math.floor(a.get("Minutes", e) / r));
                    h >= C.hour && a.set("Hours", e, h >= C.day ? 0 : r * Math.floor(a.get("Hours", e) / r));
                    h >= C.day && a.set("Date", e, h >=
                        C.month ? 1 : Math.max(1, r * Math.floor(a.get("Date", e) / r)));
                    if (h >= C.month) {
                        a.set("Month", e, h >= C.year ? 0 : r * Math.floor(a.get("Month", e) / r));
                        var q = a.get("FullYear", e)
                    }
                    h >= C.year && a.set("FullYear", e, q - q % r);
                    h === C.week && (q = a.get("Day", e), a.set("Date", e, a.get("Date", e) - q + b + (q < b ? -7 : 0)));
                    q = a.get("FullYear", e);
                    b = a.get("Month", e);
                    var v = a.get("Date", e),
                        k = a.get("Hours", e);
                    p = e.getTime();
                    a.variableTimezone && (m = g - p > 4 * C.month || a.getTimezoneOffset(p) !== a.getTimezoneOffset(g));
                    p = e.getTime();
                    for (e = 1; p < g;) d.push(p), p = h === C.year ?
                        a.makeTime(q + e * r, 0) : h === C.month ? a.makeTime(q, b + e * r) : !m || h !== C.day && h !== C.week ? m && h === C.hour && 1 < r ? a.makeTime(q, b, v, k + e * r) : p + h * r : a.makeTime(q, b, v + e * r * (h === C.day ? 1 : 7)), e++;
                    d.push(p);
                    h <= C.hour && 1E4 > d.length && d.forEach(function(b) {
                        0 === b % 18E5 && "000000000" === a.dateFormat("%H%M%S%L", b) && (f[b] = "day")
                    })
                }
                d.info = u(c, {
                    higherRanks: f,
                    totalRange: h * r
                });
                return d
            }
        }
    });
    N(H, "parts/Options.js", [H["parts/Globals.js"]], function(c) {
        var n = c.color,
            A = c.merge;
        c.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: c.Time.prototype.defaultOptions,
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            caption: {
                margin: 15,
                text: "",
                align: "left",
                verticalAlign: "bottom"
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: c.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: c.isTouchDevice ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: n("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        c.setOptions = function(n) {
            c.defaultOptions = A(!0, c.defaultOptions, n);
            c.time.update(A(c.defaultOptions.global, c.defaultOptions.time), !1);
            return c.defaultOptions
        };
        c.getOptions = function() {
            return c.defaultOptions
        };
        c.defaultPlotOptions = c.defaultOptions.plotOptions;
        c.time = new c.Time(A(c.defaultOptions.global, c.defaultOptions.time));
        c.dateFormat = function(n, A, z) {
            return c.time.dateFormat(n, A, z)
        };
        ""
    });
    N(H, "parts/Tick.js", [H["parts/Globals.js"], H["parts/Utilities.js"]],
        function(c, n) {
            var A = n.defined,
                D = n.isNumber,
                F = c.correctFloat,
                z = c.destroyObjectProperties,
                u = c.fireEvent,
                L = c.merge,
                y = c.pick,
                C = c.deg2rad;
            c.Tick = function(c, m, p, g, b) {
                this.axis = c;
                this.pos = m;
                this.type = p || "";
                this.isNewLabel = this.isNew = !0;
                this.parameters = b || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                p || g || this.addLabel()
            };
            c.Tick.prototype = {
                addLabel: function() {
                    var x = this,
                        m = x.axis,
                        p = m.options,
                        g = m.chart,
                        b = m.categories,
                        a = m.names,
                        d = x.pos,
                        f = y(x.options && x.options.labels,
                            p.labels),
                        e = m.tickPositions,
                        h = d === e[0],
                        r = d === e[e.length - 1];
                    b = this.parameters.category || (b ? y(b[d], a[d], d) : d);
                    var E = x.label;
                    e = e.info;
                    var q, v;
                    if (m.isDatetimeAxis && e) {
                        var k = g.time.resolveDTLFormat(p.dateTimeLabelFormats[!p.grid && e.higherRanks[d] || e.unitName]);
                        var t = k.main
                    }
                    x.isFirst = h;
                    x.isLast = r;
                    x.formatCtx = {
                        axis: m,
                        chart: g,
                        isFirst: h,
                        isLast: r,
                        dateTimeLabelFormat: t,
                        tickPositionInfo: e,
                        value: m.isLog ? F(m.lin2log(b)) : b,
                        pos: d
                    };
                    p = m.labelFormatter.call(x.formatCtx, this.formatCtx);
                    if (v = k && k.list) x.shortenLabel =
                        function() {
                            for (q = 0; q < v.length; q++)
                                if (E.attr({
                                        text: m.labelFormatter.call(c.extend(x.formatCtx, {
                                            dateTimeLabelFormat: v[q]
                                        }))
                                    }), E.getBBox().width < m.getSlotWidth(x) - 2 * y(f.padding, 5)) return;
                            E.attr({
                                text: ""
                            })
                        };
                    if (A(E)) E && E.textStr !== p && (!E.textWidth || f.style && f.style.width || E.styles.width || E.css({
                        width: null
                    }), E.attr({
                        text: p
                    }), E.textPxLength = E.getBBox().width);
                    else {
                        if (x.label = E = A(p) && f.enabled ? g.renderer.text(p, 0, 0, f.useHTML).add(m.labelGroup) : null) g.styledMode || E.css(L(f.style)), E.textPxLength = E.getBBox().width;
                        x.rotation = 0
                    }
                },
                getLabelSize: function() {
                    return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
                },
                handleOverflow: function(c) {
                    var m = this.axis,
                        p = m.options.labels,
                        g = c.x,
                        b = m.chart.chartWidth,
                        a = m.chart.spacing,
                        d = y(m.labelLeft, Math.min(m.pos, a[3]));
                    a = y(m.labelRight, Math.max(m.isRadial ? 0 : m.pos + m.len, b - a[1]));
                    var f = this.label,
                        e = this.rotation,
                        h = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [m.labelAlign || f.attr("align")],
                        r = f.getBBox().width,
                        E = m.getSlotWidth(this),
                        q = E,
                        v = 1,
                        k, t = {};
                    if (e || "justify" !== y(p.overflow,
                            "justify")) 0 > e && g - h * r < d ? k = Math.round(g / Math.cos(e * C) - d) : 0 < e && g + h * r > a && (k = Math.round((b - g) / Math.cos(e * C)));
                    else if (b = g + (1 - h) * r, g - h * r < d ? q = c.x + q * (1 - h) - d : b > a && (q = a - c.x + q * h, v = -1), q = Math.min(E, q), q < E && "center" === m.labelAlign && (c.x += v * (E - q - h * (E - Math.min(r, q)))), r > q || m.autoRotation && (f.styles || {}).width) k = q;
                    k && (this.shortenLabel ? this.shortenLabel() : (t.width = Math.floor(k), (p.style || {}).textOverflow || (t.textOverflow = "ellipsis"), f.css(t)))
                },
                getPosition: function(x, m, p, g) {
                    var b = this.axis,
                        a = b.chart,
                        d = g && a.oldChartHeight ||
                        a.chartHeight;
                    x = {
                        x: x ? c.correctFloat(b.translate(m + p, null, null, g) + b.transB) : b.left + b.offset + (b.opposite ? (g && a.oldChartWidth || a.chartWidth) - b.right - b.left : 0),
                        y: x ? d - b.bottom + b.offset - (b.opposite ? b.height : 0) : c.correctFloat(d - b.translate(m + p, null, null, g) - b.transB)
                    };
                    x.y = Math.max(Math.min(x.y, 1E5), -1E5);
                    u(this, "afterGetPosition", {
                        pos: x
                    });
                    return x
                },
                getLabelPosition: function(c, m, p, g, b, a, d, f) {
                    var e = this.axis,
                        h = e.transA,
                        r = e.isLinked && e.linkedParent ? e.linkedParent.reversed : e.reversed,
                        E = e.staggerLines,
                        q = e.tickRotCorr || {
                            x: 0,
                            y: 0
                        },
                        v = b.y,
                        k = g || e.reserveSpaceDefault ? 0 : -e.labelOffset * ("center" === e.labelAlign ? .5 : 1),
                        t = {};
                    A(v) || (v = 0 === e.side ? p.rotation ? -8 : -p.getBBox().height : 2 === e.side ? q.y + 8 : Math.cos(p.rotation * C) * (q.y - p.getBBox(!1, 0).height / 2));
                    c = c + b.x + k + q.x - (a && g ? a * h * (r ? -1 : 1) : 0);
                    m = m + v - (a && !g ? a * h * (r ? 1 : -1) : 0);
                    E && (p = d / (f || 1) % E, e.opposite && (p = E - p - 1), m += e.labelOffset / E * p);
                    t.x = c;
                    t.y = Math.round(m);
                    u(this, "afterGetLabelPosition", {
                        pos: t,
                        tickmarkOffset: a,
                        index: d
                    });
                    return t
                },
                getMarkPath: function(c, m, p, g, b, a) {
                    return a.crispLine(["M",
                        c, m, "L", c + (b ? 0 : -p), m + (b ? p : 0)
                    ], g)
                },
                renderGridLine: function(c, m, p) {
                    var g = this.axis,
                        b = g.options,
                        a = this.gridLine,
                        d = {},
                        f = this.pos,
                        e = this.type,
                        h = y(this.tickmarkOffset, g.tickmarkOffset),
                        r = g.chart.renderer,
                        E = e ? e + "Grid" : "grid",
                        q = b[E + "LineWidth"],
                        v = b[E + "LineColor"];
                    b = b[E + "LineDashStyle"];
                    a || (g.chart.styledMode || (d.stroke = v, d["stroke-width"] = q, b && (d.dashstyle = b)), e || (d.zIndex = 1), c && (m = 0), this.gridLine = a = r.path().attr(d).addClass("highcharts-" + (e ? e + "-" : "") + "grid-line").add(g.gridGroup));
                    if (a && (p = g.getPlotLinePath({
                            value: f +
                                h,
                            lineWidth: a.strokeWidth() * p,
                            force: "pass",
                            old: c
                        }))) a[c || this.isNew ? "attr" : "animate"]({
                        d: p,
                        opacity: m
                    })
                },
                renderMark: function(c, m, p) {
                    var g = this.axis,
                        b = g.options,
                        a = g.chart.renderer,
                        d = this.type,
                        f = d ? d + "Tick" : "tick",
                        e = g.tickSize(f),
                        h = this.mark,
                        r = !h,
                        E = c.x;
                    c = c.y;
                    var q = y(b[f + "Width"], !d && g.isXAxis ? 1 : 0);
                    b = b[f + "Color"];
                    e && (g.opposite && (e[0] = -e[0]), r && (this.mark = h = a.path().addClass("highcharts-" + (d ? d + "-" : "") + "tick").add(g.axisGroup), g.chart.styledMode || h.attr({
                        stroke: b,
                        "stroke-width": q
                    })), h[r ? "attr" : "animate"]({
                        d: this.getMarkPath(E,
                            c, e[0], h.strokeWidth() * p, g.horiz, a),
                        opacity: m
                    }))
                },
                renderLabel: function(c, m, p, g) {
                    var b = this.axis,
                        a = b.horiz,
                        d = b.options,
                        f = this.label,
                        e = d.labels,
                        h = e.step;
                    b = y(this.tickmarkOffset, b.tickmarkOffset);
                    var r = !0,
                        E = c.x;
                    c = c.y;
                    f && D(E) && (f.xy = c = this.getLabelPosition(E, c, f, a, e, b, g, h), this.isFirst && !this.isLast && !y(d.showFirstLabel, 1) || this.isLast && !this.isFirst && !y(d.showLastLabel, 1) ? r = !1 : !a || e.step || e.rotation || m || 0 === p || this.handleOverflow(c), h && g % h && (r = !1), r && D(c.y) ? (c.opacity = p, f[this.isNewLabel ? "attr" : "animate"](c),
                        this.isNewLabel = !1) : (f.attr("y", -9999), this.isNewLabel = !0))
                },
                render: function(x, m, p) {
                    var g = this.axis,
                        b = g.horiz,
                        a = this.pos,
                        d = y(this.tickmarkOffset, g.tickmarkOffset);
                    a = this.getPosition(b, a, d, m);
                    d = a.x;
                    var f = a.y;
                    g = b && d === g.pos + g.len || !b && f === g.pos ? -1 : 1;
                    p = y(p, 1);
                    this.isActive = !0;
                    this.renderGridLine(m, p, g);
                    this.renderMark(a, p, g);
                    this.renderLabel(a, m, p, x);
                    this.isNew = !1;
                    c.fireEvent(this, "afterRender")
                },
                destroy: function() {
                    z(this, this.axis)
                }
            }
        });
    N(H, "parts/Axis.js", [H["parts/Globals.js"], H["parts/Utilities.js"]],
        function(c, n) {
            var A = n.defined,
                D = n.isArray,
                F = n.isNumber,
                z = n.isString,
                u = n.objectEach,
                L = n.splat,
                y = c.addEvent,
                C = c.animObject,
                x = c.arrayMax,
                m = c.arrayMin,
                p = c.color,
                g = c.correctFloat,
                b = c.defaultOptions,
                a = c.deg2rad,
                d = c.destroyObjectProperties,
                f = c.extend,
                e = c.fireEvent,
                h = c.format,
                r = c.getMagnitude,
                E = c.merge,
                q = c.normalizeTickInterval,
                v = c.pick,
                k = c.removeEvent,
                t = c.seriesTypes,
                B = c.syncTimeout,
                I = c.Tick;
            n = function() {
                this.init.apply(this, arguments)
            };
            c.extend(n.prototype, {
                defaultOptions: {
                    dateTimeLabelFormats: {
                        millisecond: {
                            main: "%H:%M:%S.%L",
                            range: !1
                        },
                        second: {
                            main: "%H:%M:%S",
                            range: !1
                        },
                        minute: {
                            main: "%H:%M",
                            range: !1
                        },
                        hour: {
                            main: "%H:%M",
                            range: !1
                        },
                        day: {
                            main: "%e. %b"
                        },
                        week: {
                            main: "%e. %b"
                        },
                        month: {
                            main: "%b '%y"
                        },
                        year: {
                            main: "%Y"
                        }
                    },
                    endOnTick: !1,
                    labels: {
                        enabled: !0,
                        indentation: 10,
                        x: 0,
                        style: {
                            color: "#666666",
                            cursor: "default",
                            fontSize: "11px"
                        }
                    },
                    maxPadding: .01,
                    minorTickLength: 2,
                    minorTickPosition: "outside",
                    minPadding: .01,
                    showEmpty: !0,
                    startOfWeek: 1,
                    startOnTick: !1,
                    tickLength: 10,
                    tickPixelInterval: 100,
                    tickmarkPlacement: "between",
                    tickPosition: "outside",
                    title: {
                        align: "middle",
                        style: {
                            color: "#666666"
                        }
                    },
                    type: "linear",
                    minorGridLineColor: "#f2f2f2",
                    minorGridLineWidth: 1,
                    minorTickColor: "#999999",
                    lineColor: "#ccd6eb",
                    lineWidth: 1,
                    gridLineColor: "#e6e6e6",
                    tickColor: "#ccd6eb"
                },
                defaultYAxisOptions: {
                    endOnTick: !0,
                    maxPadding: .05,
                    minPadding: .05,
                    tickPixelInterval: 72,
                    showLastLabel: !0,
                    labels: {
                        x: -8
                    },
                    startOnTick: !0,
                    title: {
                        rotation: 270,
                        text: "Values"
                    },
                    stackLabels: {
                        allowOverlap: !1,
                        enabled: !1,
                        crop: !0,
                        overflow: "justify",
                        formatter: function() {
                            return c.numberFormat(this.total, -1)
                        },
                        style: {
                            color: "#000000",
                            fontSize: "11px",
                            fontWeight: "bold",
                            textOutline: "1px contrast"
                        }
                    },
                    gridLineWidth: 1,
                    lineWidth: 0
                },
                defaultLeftAxisOptions: {
                    labels: {
                        x: -15
                    },
                    title: {
                        rotation: 270
                    }
                },
                defaultRightAxisOptions: {
                    labels: {
                        x: 15
                    },
                    title: {
                        rotation: 90
                    }
                },
                defaultBottomAxisOptions: {
                    labels: {
                        autoRotation: [-45],
                        x: 0
                    },
                    margin: 15,
                    title: {
                        rotation: 0
                    }
                },
                defaultTopAxisOptions: {
                    labels: {
                        autoRotation: [-45],
                        x: 0
                    },
                    margin: 15,
                    title: {
                        rotation: 0
                    }
                },
                init: function(a, b) {
                    var d = b.isX,
                        l = this;
                    l.chart = a;
                    l.horiz = a.inverted && !l.isZAxis ? !d : d;
                    l.isXAxis = d;
                    l.coll = l.coll || (d ? "xAxis" :
                        "yAxis");
                    e(this, "init", {
                        userOptions: b
                    });
                    l.opposite = b.opposite;
                    l.side = b.side || (l.horiz ? l.opposite ? 0 : 2 : l.opposite ? 1 : 3);
                    l.setOptions(b);
                    var w = this.options,
                        f = w.type;
                    l.labelFormatter = w.labels.formatter || l.defaultLabelFormatter;
                    l.userOptions = b;
                    l.minPixelPadding = 0;
                    l.reversed = w.reversed;
                    l.visible = !1 !== w.visible;
                    l.zoomEnabled = !1 !== w.zoomEnabled;
                    l.hasNames = "category" === f || !0 === w.categories;
                    l.categories = w.categories || l.hasNames;
                    l.names || (l.names = [], l.names.keys = {});
                    l.plotLinesAndBandsGroups = {};
                    l.isLog = "logarithmic" ===
                        f;
                    l.isDatetimeAxis = "datetime" === f;
                    l.positiveValuesOnly = l.isLog && !l.allowNegativeLog;
                    l.isLinked = A(w.linkedTo);
                    l.ticks = {};
                    l.labelEdge = [];
                    l.minorTicks = {};
                    l.plotLinesAndBands = [];
                    l.alternateBands = {};
                    l.len = 0;
                    l.minRange = l.userMinRange = w.minRange || w.maxZoom;
                    l.range = w.range;
                    l.offset = w.offset || 0;
                    l.stacks = {};
                    l.oldStacks = {};
                    l.stacksTouched = 0;
                    l.max = null;
                    l.min = null;
                    l.crosshair = v(w.crosshair, L(a.options.tooltip.crosshairs)[d ? 0 : 1], !1);
                    b = l.options.events; - 1 === a.axes.indexOf(l) && (d ? a.axes.splice(a.xAxis.length, 0, l) :
                        a.axes.push(l), a[l.coll].push(l));
                    l.series = l.series || [];
                    a.inverted && !l.isZAxis && d && void 0 === l.reversed && (l.reversed = !0);
                    u(b, function(a, b) {
                        c.isFunction(a) && y(l, b, a)
                    });
                    l.lin2log = w.linearToLogConverter || l.lin2log;
                    l.isLog && (l.val2lin = l.log2lin, l.lin2val = l.lin2log);
                    e(this, "afterInit")
                },
                setOptions: function(a) {
                    this.options = E(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side],
                        E(b[this.coll], a));
                    e(this, "afterSetOptions", {
                        userOptions: a
                    })
                },
                defaultLabelFormatter: function() {
                    var a = this.axis,
                        d = this.value,
                        e = a.chart.time,
                        f = a.categories,
                        k = this.dateTimeLabelFormat,
                        t = b.lang,
                        B = t.numericSymbols;
                    t = t.numericSymbolMagnitude || 1E3;
                    var r = B && B.length,
                        q = a.options.labels.format;
                    a = a.isLog ? Math.abs(d) : a.tickInterval;
                    if (q) var v = h(q, this, e);
                    else if (f) v = d;
                    else if (k) v = e.dateFormat(k, d);
                    else if (r && 1E3 <= a)
                        for (; r-- && void 0 === v;) e = Math.pow(t, r + 1), a >= e && 0 === 10 * d % e && null !== B[r] && 0 !== d && (v = c.numberFormat(d /
                            e, -1) + B[r]);
                    void 0 === v && (v = 1E4 <= Math.abs(d) ? c.numberFormat(d, -1) : c.numberFormat(d, -1, void 0, ""));
                    return v
                },
                getSeriesExtremes: function() {
                    var a = this,
                        b = a.chart,
                        d;
                    e(this, "getSeriesExtremes", null, function() {
                        a.hasVisibleSeries = !1;
                        a.dataMin = a.dataMax = a.threshold = null;
                        a.softThreshold = !a.isXAxis;
                        a.buildStacks && a.buildStacks();
                        a.series.forEach(function(l) {
                            if (l.visible || !b.options.chart.ignoreHiddenSeries) {
                                var e = l.options,
                                    w = e.threshold;
                                a.hasVisibleSeries = !0;
                                a.positiveValuesOnly && 0 >= w && (w = null);
                                if (a.isXAxis) {
                                    if (e =
                                        l.xData, e.length) {
                                        d = l.getXExtremes(e);
                                        var f = d.min;
                                        var c = d.max;
                                        F(f) || f instanceof Date || (e = e.filter(F), d = l.getXExtremes(e), f = d.min, c = d.max);
                                        e.length && (a.dataMin = Math.min(v(a.dataMin, f), f), a.dataMax = Math.max(v(a.dataMax, c), c))
                                    }
                                } else if (l.getExtremes(), c = l.dataMax, f = l.dataMin, A(f) && A(c) && (a.dataMin = Math.min(v(a.dataMin, f), f), a.dataMax = Math.max(v(a.dataMax, c), c)), A(w) && (a.threshold = w), !e.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                            }
                        })
                    });
                    e(this, "afterGetSeriesExtremes")
                },
                translate: function(a,
                    b, d, e, f, c) {
                    var l = this.linkedParent || this,
                        w = 1,
                        k = 0,
                        t = e ? l.oldTransA : l.transA;
                    e = e ? l.oldMin : l.min;
                    var h = l.minPixelPadding;
                    f = (l.isOrdinal || l.isBroken || l.isLog && f) && l.lin2val;
                    t || (t = l.transA);
                    d && (w *= -1, k = l.len);
                    l.reversed && (w *= -1, k -= w * (l.sector || l.len));
                    b ? (a = (a * w + k - h) / t + e, f && (a = l.lin2val(a))) : (f && (a = l.val2lin(a)), a = F(e) ? w * (a - e) * t + k + w * h + (F(c) ? t * c : 0) : void 0);
                    return a
                },
                toPixels: function(a, b) {
                    return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
                },
                toValue: function(a, b) {
                    return this.translate(a - (b ? 0 : this.pos),
                        !0, !this.horiz, null, !0)
                },
                getPlotLinePath: function(a) {
                    var b = this,
                        d = b.chart,
                        f = b.left,
                        w = b.top,
                        c = a.old,
                        k = a.value,
                        t = a.translatedValue,
                        h = a.lineWidth,
                        B = a.force,
                        r, q, I, m, g = c && d.oldChartHeight || d.chartHeight,
                        p = c && d.oldChartWidth || d.chartWidth,
                        E, x = b.transB,
                        u = function(a, b, d) {
                            if ("pass" !== B && a < b || a > d) B ? a = Math.min(Math.max(b, a), d) : E = !0;
                            return a
                        };
                    a = {
                        value: k,
                        lineWidth: h,
                        old: c,
                        force: B,
                        acrossPanes: a.acrossPanes,
                        translatedValue: t
                    };
                    e(this, "getPlotLinePath", a, function(a) {
                        t = v(t, b.translate(k, null, null, c));
                        t = Math.min(Math.max(-1E5,
                            t), 1E5);
                        r = I = Math.round(t + x);
                        q = m = Math.round(g - t - x);
                        F(t) ? b.horiz ? (q = w, m = g - b.bottom, r = I = u(r, f, f + b.width)) : (r = f, I = p - b.right, q = m = u(q, w, w + b.height)) : (E = !0, B = !1);
                        a.path = E && !B ? null : d.renderer.crispLine(["M", r, q, "L", I, m], h || 1)
                    });
                    return a.path
                },
                getLinearTickPositions: function(a, b, d) {
                    var l = g(Math.floor(b / a) * a);
                    d = g(Math.ceil(d / a) * a);
                    var e = [],
                        f;
                    g(l + a) === l && (f = 20);
                    if (this.single) return [b];
                    for (b = l; b <= d;) {
                        e.push(b);
                        b = g(b + a, f);
                        if (b === w) break;
                        var w = b
                    }
                    return e
                },
                getMinorTickInterval: function() {
                    var a = this.options;
                    return !0 ===
                        a.minorTicks ? v(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
                },
                getMinorTickPositions: function() {
                    var a = this,
                        b = a.options,
                        d = a.tickPositions,
                        e = a.minorTickInterval,
                        f = [],
                        c = a.pointRangePadding || 0,
                        k = a.min - c;
                    c = a.max + c;
                    var t = c - k;
                    if (t && t / e < a.len / 3)
                        if (a.isLog) this.paddedTicks.forEach(function(b, d, l) {
                            d && f.push.apply(f, a.getLogTickPositions(e, l[d - 1], l[d], !0))
                        });
                        else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) f = f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), k, c, b.startOfWeek));
                    else
                        for (b = k + (d[0] - k) % e; b <= c && b !== f[0]; b += e) f.push(b);
                    0 !== f.length && a.trimTicks(f);
                    return f
                },
                adjustForMinRange: function() {
                    var a = this.options,
                        b = this.min,
                        d = this.max,
                        e, f, c, k, t;
                    this.isXAxis && void 0 === this.minRange && !this.isLog && (A(a.min) || A(a.max) ? this.minRange = null : (this.series.forEach(function(a) {
                        k = a.xData;
                        for (f = t = a.xIncrement ? 1 : k.length - 1; 0 < f; f--)
                            if (c = k[f] - k[f - 1], void 0 === e || c < e) e = c
                    }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
                    if (d - b < this.minRange) {
                        var h = this.dataMax - this.dataMin >= this.minRange;
                        var B = this.minRange;
                        var r = (B - d + b) / 2;
                        r = [b - r, v(a.min, b - r)];
                        h && (r[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin);
                        b = x(r);
                        d = [b + B, v(a.max, b + B)];
                        h && (d[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax);
                        d = m(d);
                        d - b < B && (r[0] = d - B, r[1] = v(a.min, d - B), b = x(r))
                    }
                    this.min = b;
                    this.max = d
                },
                getClosest: function() {
                    var a;
                    this.categories ? a = 1 : this.series.forEach(function(b) {
                        var d = b.closestPointRange,
                            l = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                        !b.noSharedTooltip && A(d) && l && (a = A(a) ? Math.min(a, d) : d)
                    });
                    return a
                },
                nameToX: function(a) {
                    var b = D(this.categories),
                        d = b ? this.categories : this.names,
                        e = a.options.x;
                    a.series.requireSorting = !1;
                    A(e) || (e = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? d.indexOf(a.name) : v(d.keys[a.name], -1));
                    if (-1 === e) {
                        if (!b) var f = d.length
                    } else f = e;
                    void 0 !== f && (this.names[f] = a.name, this.names.keys[a.name] = f);
                    return f
                },
                updateNames: function() {
                    var a = this,
                        b = this.names;
                    0 < b.length && (Object.keys(b.keys).forEach(function(a) {
                        delete b.keys[a]
                    }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(b) {
                        b.xIncrement = null;
                        if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length - 1), b.processData(), b.generatePoints();
                        b.data.forEach(function(d, l) {
                            if (d && d.options && void 0 !== d.name) {
                                var e = a.nameToX(d);
                                void 0 !== e && e !== d.x && (d.x = e, b.xData[l] = e)
                            }
                        })
                    }))
                },
                setAxisTranslation: function(a) {
                    var b = this,
                        d = b.max - b.min,
                        f = b.axisPointRange || 0,
                        c = 0,
                        w = 0,
                        k = b.linkedParent,
                        h = !!b.categories,
                        B = b.transA,
                        r = b.isXAxis;
                    if (r || h || f) {
                        var q = b.getClosest();
                        k ? (c = k.minPointOffset, w = k.pointRangePadding) : b.series.forEach(function(a) {
                            var d =
                                h ? 1 : r ? v(a.options.pointRange, q, 0) : b.axisPointRange || 0,
                                l = a.options.pointPlacement;
                            f = Math.max(f, d);
                            if (!b.single || h) a = t.xrange && a instanceof t.xrange ? !r : r, c = Math.max(c, a && z(l) ? 0 : d / 2), w = Math.max(w, a && "on" === l ? 0 : d)
                        });
                        k = b.ordinalSlope && q ? b.ordinalSlope / q : 1;
                        b.minPointOffset = c *= k;
                        b.pointRangePadding = w *= k;
                        b.pointRange = Math.min(f, d);
                        r && (b.closestPointRange = q)
                    }
                    a && (b.oldTransA = B);
                    b.translationSlope = b.transA = B = b.staticScale || b.len / (d + w || 1);
                    b.transB = b.horiz ? b.left : b.bottom;
                    b.minPixelPadding = B * c;
                    e(this, "afterSetAxisTranslation")
                },
                minFromRange: function() {
                    return this.max - this.range
                },
                setTickInterval: function(a) {
                    var b = this,
                        d = b.chart,
                        f = b.options,
                        w = b.isLog,
                        k = b.isDatetimeAxis,
                        t = b.isXAxis,
                        h = b.isLinked,
                        B = f.maxPadding,
                        I = f.minPadding,
                        m = f.tickInterval,
                        p = f.tickPixelInterval,
                        E = b.categories,
                        x = F(b.threshold) ? b.threshold : null,
                        u = b.softThreshold;
                    k || E || h || this.getTickAmount();
                    var z = v(b.userMin, f.min);
                    var y = v(b.userMax, f.max);
                    if (h) {
                        b.linkedParent = d[b.coll][f.linkedTo];
                        var n = b.linkedParent.getExtremes();
                        b.min = v(n.min, n.dataMin);
                        b.max = v(n.max, n.dataMax);
                        f.type !== b.linkedParent.options.type && c.error(11, 1, d)
                    } else {
                        if (!u && A(x))
                            if (b.dataMin >= x) n = x, I = 0;
                            else if (b.dataMax <= x) {
                            var L = x;
                            B = 0
                        }
                        b.min = v(z, n, b.dataMin);
                        b.max = v(y, L, b.dataMax)
                    }
                    w && (b.positiveValuesOnly && !a && 0 >= Math.min(b.min, v(b.dataMin, b.min)) && c.error(10, 1, d), b.min = g(b.log2lin(b.min), 15), b.max = g(b.log2lin(b.max), 15));
                    b.range && A(b.max) && (b.userMin = b.min = z = Math.max(b.dataMin, b.minFromRange()), b.userMax = y = b.max, b.range = null);
                    e(b, "foundExtremes");
                    b.beforePadding && b.beforePadding();
                    b.adjustForMinRange();
                    !(E || b.axisPointRange || b.usePercentage || h) && A(b.min) && A(b.max) && (d = b.max - b.min) && (!A(z) && I && (b.min -= d * I), !A(y) && B && (b.max += d * B));
                    F(f.softMin) && !F(b.userMin) && f.softMin < b.min && (b.min = z = f.softMin);
                    F(f.softMax) && !F(b.userMax) && f.softMax > b.max && (b.max = y = f.softMax);
                    F(f.floor) && (b.min = Math.min(Math.max(b.min, f.floor), Number.MAX_VALUE));
                    F(f.ceiling) && (b.max = Math.max(Math.min(b.max, f.ceiling), v(b.userMax, -Number.MAX_VALUE)));
                    u && A(b.dataMin) && (x = x || 0, !A(z) && b.min < x && b.dataMin >= x ? b.min = b.options.minRange ? Math.min(x,
                        b.max - b.minRange) : x : !A(y) && b.max > x && b.dataMax <= x && (b.max = b.options.minRange ? Math.max(x, b.min + b.minRange) : x));
                    b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : h && !m && p === b.linkedParent.options.tickPixelInterval ? m = b.linkedParent.tickInterval : v(m, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, E ? 1 : (b.max - b.min) * p / Math.max(b.len, p));
                    t && !a && b.series.forEach(function(a) {
                        a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                    });
                    b.setAxisTranslation(!0);
                    b.beforeSetTickPositions &&
                        b.beforeSetTickPositions();
                    b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                    b.pointRange && !m && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                    a = v(f.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                    !m && b.tickInterval < a && (b.tickInterval = a);
                    k || w || m || (b.tickInterval = q(b.tickInterval, null, r(b.tickInterval), v(f.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                    this.tickAmount || (b.tickInterval = b.unsquish());
                    this.setTickPositions()
                },
                setTickPositions: function() {
                    var a = this.options,
                        b = a.tickPositions;
                    var d = this.getMinorTickInterval();
                    var f = a.tickPositioner,
                        k = a.startOnTick,
                        t = a.endOnTick;
                    this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                    this.minorTickInterval = "auto" === d && this.tickInterval ? this.tickInterval / 5 : d;
                    this.single = this.min === this.max && A(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                    this.tickPositions = d = b && b.slice();
                    !d && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (d = [this.min, this.max], c.error(19, !1, this.chart)) : d = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), d.length > this.len && (d = [d[0], d.pop()], d[0] ===
                        d[1] && (d.length = 1)), this.tickPositions = d, f && (f = f.apply(this, [this.min, this.max]))) && (this.tickPositions = d = f);
                    this.paddedTicks = d.slice(0);
                    this.trimTicks(d, k, t);
                    this.isLinked || (this.single && 2 > d.length && !this.categories && (this.min -= .5, this.max += .5), b || f || this.adjustTickAmount());
                    e(this, "afterSetTickPositions")
                },
                trimTicks: function(a, b, d) {
                    var f = a[0],
                        c = a[a.length - 1],
                        l = this.minPointOffset || 0;
                    e(this, "trimTicks");
                    if (!this.isLinked) {
                        if (b && -Infinity !== f) this.min = f;
                        else
                            for (; this.min - l > a[0];) a.shift();
                        if (d) this.max =
                            c;
                        else
                            for (; this.max + l < a[a.length - 1];) a.pop();
                        0 === a.length && A(f) && !this.options.tickPositions && a.push((c + f) / 2)
                    }
                },
                alignToOthers: function() {
                    var a = {},
                        b, d = this.options;
                    !1 === this.chart.options.chart.alignTicks || !1 === d.alignTicks || !1 === d.startOnTick || !1 === d.endOnTick || this.isLog || this.chart[this.coll].forEach(function(d) {
                        var f = d.options;
                        f = [d.horiz ? f.left : f.top, f.width, f.height, f.pane].join();
                        d.series.length && (a[f] ? b = !0 : a[f] = 1)
                    });
                    return b
                },
                getTickAmount: function() {
                    var a = this.options,
                        b = a.tickAmount,
                        d = a.tickPixelInterval;
                    !A(a.tickInterval) && this.len < d && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                    !b && this.alignToOthers() && (b = Math.ceil(this.len / d) + 1);
                    4 > b && (this.finalTickAmt = b, b = 5);
                    this.tickAmount = b
                },
                adjustTickAmount: function() {
                    var a = this.options,
                        b = this.tickInterval,
                        d = this.tickPositions,
                        f = this.tickAmount,
                        e = this.finalTickAmt,
                        c = d && d.length,
                        k = v(this.threshold, this.softThreshold ? 0 : null),
                        t;
                    if (this.hasData()) {
                        if (c < f) {
                            for (t = this.min; d.length < f;) d.length % 2 || t === k ? d.push(g(d[d.length - 1] + b)) : d.unshift(g(d[0] -
                                b));
                            this.transA *= (c - 1) / (f - 1);
                            this.min = a.startOnTick ? d[0] : Math.min(this.min, d[0]);
                            this.max = a.endOnTick ? d[d.length - 1] : Math.max(this.max, d[d.length - 1])
                        } else c > f && (this.tickInterval *= 2, this.setTickPositions());
                        if (A(e)) {
                            for (b = a = d.length; b--;)(3 === e && 1 === b % 2 || 2 >= e && 0 < b && b < a - 1) && d.splice(b, 1);
                            this.finalTickAmt = void 0
                        }
                    }
                },
                setScale: function() {
                    var a = this.series.some(function(a) {
                            return a.isDirtyData || a.isDirty || a.xAxis && a.xAxis.isDirty
                        }),
                        b;
                    this.oldMin = this.min;
                    this.oldMax = this.max;
                    this.oldAxisLength = this.len;
                    this.setAxisSize();
                    (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                    e(this, "afterSetScale")
                },
                setExtremes: function(a,
                    b, d, c, k) {
                    var l = this,
                        w = l.chart;
                    d = v(d, !0);
                    l.series.forEach(function(a) {
                        delete a.kdTree
                    });
                    k = f(k, {
                        min: a,
                        max: b
                    });
                    e(l, "setExtremes", k, function() {
                        l.userMin = a;
                        l.userMax = b;
                        l.eventArgs = k;
                        d && w.redraw(c)
                    })
                },
                zoom: function(a, b) {
                    var d = this.dataMin,
                        f = this.dataMax,
                        c = this.options,
                        k = Math.min(d, v(c.min, d)),
                        l = Math.max(f, v(c.max, f));
                    a = {
                        newMin: a,
                        newMax: b
                    };
                    e(this, "zoom", a, function(a) {
                        var b = a.newMin,
                            e = a.newMax;
                        if (b !== this.min || e !== this.max) this.allowZoomOutside || (A(d) && (b < k && (b = k), b > l && (b = l)), A(f) && (e < k && (e = k), e > l && (e = l))),
                            this.displayBtn = void 0 !== b || void 0 !== e, this.setExtremes(b, e, !1, void 0, {
                                trigger: "zoom"
                            });
                        a.zoomed = !0
                    });
                    return a.zoomed
                },
                setAxisSize: function() {
                    var a = this.chart,
                        b = this.options,
                        d = b.offsets || [0, 0, 0, 0],
                        f = this.horiz,
                        e = this.width = Math.round(c.relativeLength(v(b.width, a.plotWidth - d[3] + d[1]), a.plotWidth)),
                        k = this.height = Math.round(c.relativeLength(v(b.height, a.plotHeight - d[0] + d[2]), a.plotHeight)),
                        t = this.top = Math.round(c.relativeLength(v(b.top, a.plotTop + d[0]), a.plotHeight, a.plotTop));
                    b = this.left = Math.round(c.relativeLength(v(b.left,
                        a.plotLeft + d[3]), a.plotWidth, a.plotLeft));
                    this.bottom = a.chartHeight - k - t;
                    this.right = a.chartWidth - e - b;
                    this.len = Math.max(f ? e : k, 0);
                    this.pos = f ? b : t
                },
                getExtremes: function() {
                    var a = this.isLog;
                    return {
                        min: a ? g(this.lin2log(this.min)) : this.min,
                        max: a ? g(this.lin2log(this.max)) : this.max,
                        dataMin: this.dataMin,
                        dataMax: this.dataMax,
                        userMin: this.userMin,
                        userMax: this.userMax
                    }
                },
                getThreshold: function(a) {
                    var b = this.isLog,
                        d = b ? this.lin2log(this.min) : this.min;
                    b = b ? this.lin2log(this.max) : this.max;
                    null === a || -Infinity === a ? a = d : Infinity ===
                        a ? a = b : d > a ? a = d : b < a && (a = b);
                    return this.translate(a, 0, 1, 0, 1)
                },
                autoLabelAlign: function(a) {
                    var b = (v(a, 0) - 90 * this.side + 720) % 360;
                    a = {
                        align: "center"
                    };
                    e(this, "autoLabelAlign", a, function(a) {
                        15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left")
                    });
                    return a.align
                },
                tickSize: function(a) {
                    var b = this.options,
                        d = b[a + "Length"],
                        f = v(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0);
                    if (f && d) {
                        "inside" === b[a + "Position"] && (d = -d);
                        var c = [d, f]
                    }
                    a = {
                        tickSize: c
                    };
                    e(this, "afterTickSize", a);
                    return a.tickSize
                },
                labelMetrics: function() {
                    var a =
                        this.tickPositions && this.tickPositions[0] || 0;
                    return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
                },
                unsquish: function() {
                    var b = this.options.labels,
                        d = this.horiz,
                        f = this.tickInterval,
                        e = f,
                        c = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f),
                        k, t = b.rotation,
                        h = this.labelMetrics(),
                        B, r = Number.MAX_VALUE,
                        q, I = this.max - this.min,
                        m = function(a) {
                            var b = a / (c || 1);
                            b = 1 < b ? Math.ceil(b) : 1;
                            b * f > I && Infinity !== a && Infinity !== c && I && (b = Math.ceil(I /
                                f));
                            return g(b * f)
                        };
                    d ? (q = !b.staggerLines && !b.step && (A(t) ? [t] : c < v(b.autoRotationLimit, 80) && b.autoRotation)) && q.forEach(function(b) {
                        if (b === t || b && -90 <= b && 90 >= b) {
                            B = m(Math.abs(h.h / Math.sin(a * b)));
                            var d = B + Math.abs(b / 360);
                            d < r && (r = d, k = b, e = B)
                        }
                    }) : b.step || (e = m(h.h));
                    this.autoRotation = q;
                    this.labelRotation = v(k, t);
                    return e
                },
                getSlotWidth: function(a) {
                    var b = this.chart,
                        d = this.horiz,
                        f = this.options.labels,
                        e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                        c = b.margin[3];
                    return a && a.slotWidth || d && 2 > (f.step ||
                        0) && !f.rotation && (this.staggerLines || 1) * this.len / e || !d && (f.style && parseInt(f.style.width, 10) || c && c - b.spacing[3] || .33 * b.chartWidth)
                },
                renderUnsquish: function() {
                    var a = this.chart,
                        b = a.renderer,
                        d = this.tickPositions,
                        f = this.ticks,
                        e = this.options.labels,
                        c = e && e.style || {},
                        k = this.horiz,
                        t = this.getSlotWidth(),
                        h = Math.max(1, Math.round(t - 2 * (e.padding || 5))),
                        B = {},
                        r = this.labelMetrics(),
                        q = e.style && e.style.textOverflow,
                        v = 0;
                    z(e.rotation) || (B.rotation = e.rotation || 0);
                    d.forEach(function(a) {
                        (a = f[a]) && a.label && a.label.textPxLength >
                            v && (v = a.label.textPxLength)
                    });
                    this.maxLabelLength = v;
                    if (this.autoRotation) v > h && v > r.h ? B.rotation = this.labelRotation : this.labelRotation = 0;
                    else if (t) {
                        var I = h;
                        if (!q) {
                            var m = "clip";
                            for (h = d.length; !k && h--;) {
                                var g = d[h];
                                if (g = f[g].label) g.styles && "ellipsis" === g.styles.textOverflow ? g.css({
                                    textOverflow: "clip"
                                }) : g.textPxLength > t && g.css({
                                    width: t + "px"
                                }), g.getBBox().height > this.len / d.length - (r.h - r.f) && (g.specificTextOverflow = "ellipsis")
                            }
                        }
                    }
                    B.rotation && (I = v > .5 * a.chartHeight ? .33 * a.chartHeight : v, q || (m = "ellipsis"));
                    if (this.labelAlign =
                        e.align || this.autoLabelAlign(this.labelRotation)) B.align = this.labelAlign;
                    d.forEach(function(a) {
                        var b = (a = f[a]) && a.label,
                            d = c.width,
                            e = {};
                        b && (b.attr(B), a.shortenLabel ? a.shortenLabel() : I && !d && "nowrap" !== c.whiteSpace && (I < b.textPxLength || "SPAN" === b.element.tagName) ? (e.width = I, q || (e.textOverflow = b.specificTextOverflow || m), b.css(e)) : b.styles && b.styles.width && !e.width && !d && b.css({
                            width: null
                        }), delete b.specificTextOverflow, a.rotation = B.rotation)
                    }, this);
                    this.tickRotCorr = b.rotCorr(r.b, this.labelRotation || 0, 0 !==
                        this.side)
                },
                hasData: function() {
                    return this.series.some(function(a) {
                        return a.hasData()
                    }) || this.options.showEmpty && A(this.min) && A(this.max)
                },
                addTitle: function(a) {
                    var b = this.chart.renderer,
                        d = this.horiz,
                        f = this.opposite,
                        e = this.options.title,
                        c, k = this.chart.styledMode;
                    this.axisTitle || ((c = e.textAlign) || (c = (d ? {
                            low: "left",
                            middle: "center",
                            high: "right"
                        } : {
                            low: f ? "right" : "left",
                            middle: "center",
                            high: f ? "left" : "right"
                        })[e.align]), this.axisTitle = b.text(e.text, 0, 0, e.useHTML).attr({
                            zIndex: 7,
                            rotation: e.rotation || 0,
                            align: c
                        }).addClass("highcharts-axis-title"),
                        k || this.axisTitle.css(E(e.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                    k || e.style.width || this.isRadial || this.axisTitle.css({
                        width: this.len
                    });
                    this.axisTitle[a ? "show" : "hide"](a)
                },
                generateTick: function(a) {
                    var b = this.ticks;
                    b[a] ? b[a].addLabel() : b[a] = new I(this, a)
                },
                getOffset: function() {
                    var a = this,
                        b = a.chart,
                        d = b.renderer,
                        f = a.options,
                        c = a.tickPositions,
                        k = a.ticks,
                        t = a.horiz,
                        h = a.side,
                        B = b.inverted && !a.isZAxis ? [1, 0, 3, 2][h] : h,
                        r, q = 0,
                        I = 0,
                        m = f.title,
                        g = f.labels,
                        p = 0,
                        E = b.axisOffset;
                    b = b.clipOffset;
                    var x = [-1, 1, 1, -1][h],
                        z = f.className,
                        y = a.axisParent;
                    var n = a.hasData();
                    a.showAxis = r = n || v(f.showEmpty, !0);
                    a.staggerLines = a.horiz && g.staggerLines;
                    a.axisGroup || (a.gridGroup = d.g("grid").attr({
                        zIndex: f.gridZIndex || 1
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (z || "")).add(y), a.axisGroup = d.g("axis").attr({
                        zIndex: f.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (z || "")).add(y), a.labelGroup = d.g("axis-labels").attr({
                        zIndex: g.zIndex || 7
                    }).addClass("highcharts-" + a.coll.toLowerCase() +
                        "-labels " + (z || "")).add(y));
                    n || a.isLinked ? (c.forEach(function(b, d) {
                        a.generateTick(b, d)
                    }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === h || 2 === h || {
                        1: "left",
                        3: "right"
                    } [h] === a.labelAlign, v(g.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && c.forEach(function(a) {
                        p = Math.max(k[a].getLabelSize(), p)
                    }), a.staggerLines && (p *= a.staggerLines), a.labelOffset = p * (a.opposite ? -1 : 1)) : u(k, function(a, b) {
                        a.destroy();
                        delete k[b]
                    });
                    if (m && m.text && !1 !== m.enabled && (a.addTitle(r), r && !1 !== m.reserveSpace)) {
                        a.titleOffset =
                            q = a.axisTitle.getBBox()[t ? "height" : "width"];
                        var L = m.offset;
                        I = A(L) ? 0 : v(m.margin, t ? 5 : 10)
                    }
                    a.renderLine();
                    a.offset = x * v(f.offset, E[h] ? E[h] + (f.margin || 0) : 0);
                    a.tickRotCorr = a.tickRotCorr || {
                        x: 0,
                        y: 0
                    };
                    d = 0 === h ? -a.labelMetrics().h : 2 === h ? a.tickRotCorr.y : 0;
                    I = Math.abs(p) + I;
                    p && (I = I - d + x * (t ? v(g.y, a.tickRotCorr.y + 8 * x) : g.x));
                    a.axisTitleMargin = v(L, I);
                    a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(k, c));
                    t = this.tickSize("tick");
                    E[h] = Math.max(E[h], a.axisTitleMargin + q + x * a.offset, I, c && c.length && t ? t[0] +
                        x * a.offset : 0);
                    f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                    b[B] = Math.max(b[B], f);
                    e(this, "afterGetOffset")
                },
                getLinePath: function(a) {
                    var b = this.chart,
                        d = this.opposite,
                        f = this.offset,
                        e = this.horiz,
                        c = this.left + (d ? this.width : 0) + f;
                    f = b.chartHeight - this.bottom - (d ? this.height : 0) + f;
                    d && (a *= -1);
                    return b.renderer.crispLine(["M", e ? this.left : c, e ? f : this.top, "L", e ? b.chartWidth - this.right : c, e ? f : b.chartHeight - this.bottom], a)
                },
                renderLine: function() {
                    this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                        this.chart.styledMode || this.axisLine.attr({
                            stroke: this.options.lineColor,
                            "stroke-width": this.options.lineWidth,
                            zIndex: 7
                        }))
                },
                getTitlePosition: function() {
                    var a = this.horiz,
                        b = this.left,
                        d = this.top,
                        f = this.len,
                        c = this.options.title,
                        k = a ? b : d,
                        t = this.opposite,
                        h = this.offset,
                        B = c.x || 0,
                        r = c.y || 0,
                        q = this.axisTitle,
                        v = this.chart.renderer.fontMetrics(c.style && c.style.fontSize, q);
                    q = Math.max(q.getBBox(null, 0).height - v.h - 1, 0);
                    f = {
                        low: k + (a ? 0 : f),
                        middle: k + f / 2,
                        high: k + (a ? f : 0)
                    } [c.align];
                    b = (a ? d + this.height : b) + (a ? 1 : -1) * (t ? -1 : 1) * this.axisTitleMargin + [-q, q, v.f, -q][this.side];
                    a = {
                        x: a ? f + B : b + (t ? this.width : 0) + h + B,
                        y: a ? b + r - (t ? this.height : 0) + h : f + r
                    };
                    e(this, "afterGetTitlePosition", {
                        titlePosition: a
                    });
                    return a
                },
                renderMinorTick: function(a) {
                    var b = this.chart.hasRendered && F(this.oldMin),
                        d = this.minorTicks;
                    d[a] || (d[a] = new I(this, a, "minor"));
                    b && d[a].isNew && d[a].render(null, !0);
                    d[a].render(null, !1, 1)
                },
                renderTick: function(a, b) {
                    var d = this.isLinked,
                        f = this.ticks,
                        e = this.chart.hasRendered && F(this.oldMin);
                    if (!d || a >= this.min && a <= this.max) f[a] || (f[a] = new I(this, a)), e && f[a].isNew &&
                        f[a].render(b, !0, -1), f[a].render(b)
                },
                render: function() {
                    var a = this,
                        b = a.chart,
                        d = a.options,
                        f = a.isLog,
                        k = a.isLinked,
                        t = a.tickPositions,
                        h = a.axisTitle,
                        r = a.ticks,
                        q = a.minorTicks,
                        v = a.alternateBands,
                        m = d.stackLabels,
                        g = d.alternateGridColor,
                        p = a.tickmarkOffset,
                        E = a.axisLine,
                        x = a.showAxis,
                        z = C(b.renderer.globalAnimation),
                        y, n;
                    a.labelEdge.length = 0;
                    a.overlap = !1;
                    [r, q, v].forEach(function(a) {
                        u(a, function(a) {
                            a.isActive = !1
                        })
                    });
                    if (a.hasData() || k) a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function(b) {
                            a.renderMinorTick(b)
                        }),
                        t.length && (t.forEach(function(b, d) {
                            a.renderTick(b, d)
                        }), p && (0 === a.min || a.single) && (r[-1] || (r[-1] = new I(a, -1, null, !0)), r[-1].render(-1))), g && t.forEach(function(d, e) {
                            n = void 0 !== t[e + 1] ? t[e + 1] + p : a.max - p;
                            0 === e % 2 && d < a.max && n <= a.max + (b.polar ? -p : p) && (v[d] || (v[d] = new c.PlotLineOrBand(a)), y = d + p, v[d].options = {
                                from: f ? a.lin2log(y) : y,
                                to: f ? a.lin2log(n) : n,
                                color: g
                            }, v[d].render(), v[d].isActive = !0)
                        }), a._addedPlotLB || ((d.plotLines || []).concat(d.plotBands || []).forEach(function(b) {
                            a.addPlotBandOrLine(b)
                        }), a._addedPlotLB = !0);
                    [r, q, v].forEach(function(a) {
                        var d, f = [],
                            e = z.duration;
                        u(a, function(a, b) {
                            a.isActive || (a.render(b, !1, 0), a.isActive = !1, f.push(b))
                        });
                        B(function() {
                            for (d = f.length; d--;) a[f[d]] && !a[f[d]].isActive && (a[f[d]].destroy(), delete a[f[d]])
                        }, a !== v && b.hasRendered && e ? e : 0)
                    });
                    E && (E[E.isPlaced ? "animate" : "attr"]({
                        d: this.getLinePath(E.strokeWidth())
                    }), E.isPlaced = !0, E[x ? "show" : "hide"](x));
                    h && x && (d = a.getTitlePosition(), F(d.y) ? (h[h.isNew ? "attr" : "animate"](d), h.isNew = !1) : (h.attr("y", -9999), h.isNew = !0));
                    m && m.enabled && a.renderStackTotals();
                    a.isDirty = !1;
                    e(this, "afterRender")
                },
                redraw: function() {
                    this.visible && (this.render(), this.plotLinesAndBands.forEach(function(a) {
                        a.render()
                    }));
                    this.series.forEach(function(a) {
                        a.isDirty = !0
                    })
                },
                keepProps: "extKey hcEvents names series userMax userMin".split(" "),
                destroy: function(a) {
                    var b = this,
                        f = b.stacks,
                        c = b.plotLinesAndBands,
                        t;
                    e(this, "destroy", {
                        keepEvents: a
                    });
                    a || k(b);
                    u(f, function(a, b) {
                        d(a);
                        f[b] = null
                    });
                    [b.ticks, b.minorTicks, b.alternateBands].forEach(function(a) {
                        d(a)
                    });
                    if (c)
                        for (a = c.length; a--;) c[a].destroy();
                    "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a) {
                        b[a] && (b[a] = b[a].destroy())
                    });
                    for (t in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[t] = b.plotLinesAndBandsGroups[t].destroy();
                    u(b, function(a, d) {
                        -1 === b.keepProps.indexOf(d) && delete b[d]
                    })
                },
                drawCrosshair: function(a, b) {
                    var d, f = this.crosshair,
                        c = v(f.snap, !0),
                        k, l = this.cross;
                    e(this, "drawCrosshair", {
                        e: a,
                        point: b
                    });
                    a || (a = this.cross && this.cross.e);
                    if (this.crosshair && !1 !== (A(b) || !c)) {
                        c ? A(b) &&
                            (k = v("colorAxis" !== this.coll ? b.crosshairPos : null, this.isXAxis ? b.plotX : this.len - b.plotY)) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                        A(k) && (d = this.getPlotLinePath({
                            value: b && (this.isXAxis ? b.x : v(b.stackY, b.y)),
                            translatedValue: k
                        }) || null);
                        if (!A(d)) {
                            this.hideCrosshair();
                            return
                        }
                        c = this.categories && !this.isRadial;
                        l || (this.cross = l = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (c ? "category " : "thin ") + f.className).attr({
                                zIndex: v(f.zIndex, 2)
                            }).add(), this.chart.styledMode ||
                            (l.attr({
                                stroke: f.color || (c ? p("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                                "stroke-width": v(f.width, 1)
                            }).css({
                                "pointer-events": "none"
                            }), f.dashStyle && l.attr({
                                dashstyle: f.dashStyle
                            })));
                        l.show().attr({
                            d: d
                        });
                        c && !f.width && l.attr({
                            "stroke-width": this.transA
                        });
                        this.cross.e = a
                    } else this.hideCrosshair();
                    e(this, "afterDrawCrosshair", {
                        e: a,
                        point: b
                    })
                },
                hideCrosshair: function() {
                    this.cross && this.cross.hide();
                    e(this, "afterHideCrosshair")
                }
            });
            return c.Axis = n
        });
    N(H, "parts/DateTimeAxis.js", [H["parts/Globals.js"]], function(c) {
        var n =
            c.Axis,
            A = c.getMagnitude,
            D = c.normalizeTickInterval,
            F = c.timeUnits;
        n.prototype.getTimeTicks = function() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        n.prototype.normalizeTimeTickInterval = function(c, u) {
            var z = u || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            u = z[z.length - 1];
            var y = F[u[0]],
                n = u[1],
                x;
            for (x = 0; x < z.length && !(u = z[x], y = F[u[0]],
                    n = u[1], z[x + 1] && c <= (y * n[n.length - 1] + F[z[x + 1][0]]) / 2); x++);
            y === F.year && c < 5 * y && (n = [1, 2, 5]);
            c = D(c / y, n, "year" === u[0] ? Math.max(A(c / y), 1) : 1);
            return {
                unitRange: y,
                count: c,
                unitName: u[0]
            }
        }
    });
    N(H, "parts/LogarithmicAxis.js", [H["parts/Globals.js"]], function(c) {
        var n = c.Axis,
            A = c.getMagnitude,
            D = c.normalizeTickInterval,
            F = c.pick;
        n.prototype.getLogTickPositions = function(c, u, n, y) {
            var z = this.options,
                x = this.len,
                m = [];
            y || (this._minorAutoInterval = null);
            if (.5 <= c) c = Math.round(c), m = this.getLinearTickPositions(c, u, n);
            else if (.08 <=
                c) {
                x = Math.floor(u);
                var p, g;
                for (z = .3 < c ? [1, 2, 4] : .15 < c ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; x < n + 1 && !g; x++) {
                    var b = z.length;
                    for (p = 0; p < b && !g; p++) {
                        var a = this.log2lin(this.lin2log(x) * z[p]);
                        a > u && (!y || d <= n) && void 0 !== d && m.push(d);
                        d > n && (g = !0);
                        var d = a
                    }
                }
            } else u = this.lin2log(u), n = this.lin2log(n), c = y ? this.getMinorTickInterval() : z.tickInterval, c = F("auto" === c ? null : c, this._minorAutoInterval, z.tickPixelInterval / (y ? 5 : 1) * (n - u) / ((y ? x / this.tickPositions.length : x) || 1)), c = D(c, null, A(c)), m = this.getLinearTickPositions(c, u, n).map(this.log2lin),
                y || (this._minorAutoInterval = c / 5);
            y || (this.tickInterval = c);
            return m
        };
        n.prototype.log2lin = function(c) {
            return Math.log(c) / Math.LN10
        };
        n.prototype.lin2log = function(c) {
            return Math.pow(10, c)
        }
    });
    N(H, "parts/PlotLineOrBand.js", [H["parts/Globals.js"], H["parts/Axis.js"], H["parts/Utilities.js"]], function(c, n, A) {
        var D = A.defined,
            F = A.erase,
            z = A.objectEach,
            u = c.arrayMax,
            L = c.arrayMin,
            y = c.destroyObjectProperties,
            C = c.merge,
            x = c.pick;
        c.PlotLineOrBand = function(c, p) {
            this.axis = c;
            p && (this.options = p, this.id = p.id)
        };
        c.PlotLineOrBand.prototype = {
            render: function() {
                c.fireEvent(this, "render");
                var m = this,
                    p = m.axis,
                    g = p.horiz,
                    b = m.options,
                    a = b.label,
                    d = m.label,
                    f = b.to,
                    e = b.from,
                    h = b.value,
                    r = D(e) && D(f),
                    E = D(h),
                    q = m.svgElem,
                    v = !q,
                    k = [],
                    t = b.color,
                    B = x(b.zIndex, 0),
                    I = b.events;
                k = {
                    "class": "highcharts-plot-" + (r ? "band " : "line ") + (b.className || "")
                };
                var w = {},
                    l = p.chart.renderer,
                    J = r ? "bands" : "lines";
                p.isLog && (e = p.log2lin(e), f = p.log2lin(f), h = p.log2lin(h));
                p.chart.styledMode || (E ? (k.stroke = t || "#999999", k["stroke-width"] = x(b.width, 1), b.dashStyle && (k.dashstyle = b.dashStyle)) :
                    r && (k.fill = t || "#e6ebf5", b.borderWidth && (k.stroke = b.borderColor, k["stroke-width"] = b.borderWidth)));
                w.zIndex = B;
                J += "-" + B;
                (t = p.plotLinesAndBandsGroups[J]) || (p.plotLinesAndBandsGroups[J] = t = l.g("plot-" + J).attr(w).add());
                v && (m.svgElem = q = l.path().attr(k).add(t));
                if (E) k = p.getPlotLinePath({
                    value: h,
                    lineWidth: q.strokeWidth(),
                    acrossPanes: b.acrossPanes
                });
                else if (r) k = p.getPlotBandPath(e, f, b);
                else return;
                (v || !q.d) && k && k.length ? (q.attr({
                    d: k
                }), I && z(I, function(a, b) {
                    q.on(b, function(a) {
                        I[b].apply(m, [a])
                    })
                })) : q && (k ? (q.show(!0),
                    q.animate({
                        d: k
                    })) : q.d && (q.hide(), d && (m.label = d = d.destroy())));
                a && (D(a.text) || D(a.formatter)) && k && k.length && 0 < p.width && 0 < p.height && !k.isFlat ? (a = C({
                    align: g && r && "center",
                    x: g ? !r && 4 : 10,
                    verticalAlign: !g && r && "middle",
                    y: g ? r ? 16 : 10 : r ? 6 : -4,
                    rotation: g && !r && 90
                }, a), this.renderLabel(a, k, r, B)) : d && d.hide();
                return m
            },
            renderLabel: function(c, p, g, b) {
                var a = this.label,
                    d = this.axis.chart.renderer;
                a || (a = {
                        align: c.textAlign || c.align,
                        rotation: c.rotation,
                        "class": "highcharts-plot-" + (g ? "band" : "line") + "-label " + (c.className || "")
                    },
                    a.zIndex = b, b = this.getLabelText(c), this.label = a = d.text(b, 0, 0, c.useHTML).attr(a).add(), this.axis.chart.styledMode || a.css(c.style));
                d = p.xBounds || [p[1], p[4], g ? p[6] : p[1]];
                p = p.yBounds || [p[2], p[5], g ? p[7] : p[2]];
                g = L(d);
                b = L(p);
                a.align(c, !1, {
                    x: g,
                    y: b,
                    width: u(d) - g,
                    height: u(p) - b
                });
                a.show(!0)
            },
            getLabelText: function(c) {
                return D(c.formatter) ? c.formatter.call(this) : c.text
            },
            destroy: function() {
                F(this.axis.plotLinesAndBands, this);
                delete this.axis;
                y(this)
            }
        };
        c.extend(n.prototype, {
            getPlotBandPath: function(c, p) {
                var g = this.getPlotLinePath({
                        value: p,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    b = this.getPlotLinePath({
                        value: c,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    a = [],
                    d = this.horiz,
                    f = 1;
                c = c < this.min && p < this.min || c > this.max && p > this.max;
                if (b && g) {
                    if (c) {
                        var e = b.toString() === g.toString();
                        f = 0
                    }
                    for (c = 0; c < b.length; c += 6) d && g[c + 1] === b[c + 1] ? (g[c + 1] += f, g[c + 4] += f) : d || g[c + 2] !== b[c + 2] || (g[c + 2] += f, g[c + 5] += f), a.push("M", b[c + 1], b[c + 2], "L", b[c + 4], b[c + 5], g[c + 4], g[c + 5], g[c + 1], g[c + 2], "z"), a.isFlat = e
                }
                return a
            },
            addPlotBand: function(c) {
                return this.addPlotBandOrLine(c,
                    "plotBands")
            },
            addPlotLine: function(c) {
                return this.addPlotBandOrLine(c, "plotLines")
            },
            addPlotBandOrLine: function(m, p) {
                var g = (new c.PlotLineOrBand(this, m)).render(),
                    b = this.userOptions;
                if (g) {
                    if (p) {
                        var a = b[p] || [];
                        a.push(m);
                        b[p] = a
                    }
                    this.plotLinesAndBands.push(g)
                }
                return g
            },
            removePlotBandOrLine: function(c) {
                for (var m = this.plotLinesAndBands, g = this.options, b = this.userOptions, a = m.length; a--;) m[a].id === c && m[a].destroy();
                [g.plotLines || [], b.plotLines || [], g.plotBands || [], b.plotBands || []].forEach(function(b) {
                    for (a =
                        b.length; a--;) b[a].id === c && F(b, b[a])
                })
            },
            removePlotBand: function(c) {
                this.removePlotBandOrLine(c)
            },
            removePlotLine: function(c) {
                this.removePlotBandOrLine(c)
            }
        })
    });
    N(H, "parts/Tooltip.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.isNumber,
            F = n.isString,
            z = n.splat;
        "";
        var u = c.doc,
            L = c.extend,
            y = c.format,
            C = c.merge,
            x = c.pick,
            m = c.syncTimeout,
            p = c.timeUnits;
        c.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        c.Tooltip.prototype = {
            init: function(c, b) {
                this.chart = c;
                this.options =
                    b;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = b.split && !c.inverted;
                this.shared = b.shared || this.split;
                this.outside = x(b.outside, !(!c.scrollablePixelsX && !c.scrollablePixelsY)) && !this.split
            },
            cleanSplit: function(c) {
                this.chart.series.forEach(function(b) {
                    var a = b && b.tt;
                    a && (!a.isActive || c ? b.tt = a.destroy() : a.isActive = !1)
                })
            },
            applyFilter: function() {
                var c = this.chart;
                c.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + c.index,
                    opacity: .5,
                    children: [{
                        tagName: "feGaussianBlur",
                        "in": "SourceAlpha",
                        stdDeviation: 1
                    }, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            type: "linear",
                            slope: .3
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            "in": "SourceGraphic"
                        }]
                    }]
                });
                c.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + c.index + "{filter:url(#drop-shadow-" + c.index + ")}"
                })
            },
            getLabel: function() {
                var g = this,
                    b = this.chart.renderer,
                    a = this.chart.styledMode,
                    d = this.options,
                    f = "tooltip" + (A(d.className) ? " " + d.className : ""),
                    e;
                if (!this.label) {
                    this.outside && (this.container = e = c.doc.createElement("div"), e.className = "highcharts-tooltip-container", c.css(e, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: d.style && d.style.pointerEvents,
                        zIndex: 3
                    }), c.doc.body.appendChild(e), this.renderer = b = new c.Renderer(e, 0, 0, {}, void 0, void 0, b.styledMode));
                    this.split ? this.label = b.g(f) : (this.label = b.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, f).attr({
                        padding: d.padding,
                        r: d.borderRadius
                    }), a || this.label.attr({
                        fill: d.backgroundColor,
                        "stroke-width": d.borderWidth
                    }).css(d.style).shadow(d.shadow));
                    a && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
                    if (this.outside) {
                        var h = {
                            x: this.label.xSetter,
                            y: this.label.ySetter
                        };
                        this.label.xSetter = function(a, b) {
                            h[b].call(this.label, g.distance);
                            e.style.left = a + "px"
                        };
                        this.label.ySetter = function(a, b) {
                            h[b].call(this.label, g.distance);
                            e.style.top = a + "px"
                        }
                    }
                    this.label.attr({
                        zIndex: 8
                    }).add()
                }
                return this.label
            },
            update: function(c) {
                this.destroy();
                C(!0, this.chart.options.tooltip.userOptions, c);
                this.init(this.chart, C(!0, this.options, c))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), c.discardElement(this.container));
                c.clearTimeout(this.hideTimer);
                c.clearTimeout(this.tooltipTimeout)
            },
            move: function(g, b, a, d) {
                var f = this,
                    e = f.now,
                    h = !1 !== f.options.animation && !f.isHidden && (1 < Math.abs(g - e.x) || 1 < Math.abs(b - e.y)),
                    r = f.followPointer || 1 < f.len;
                L(e, {
                    x: h ? (2 * e.x + g) / 3 : g,
                    y: h ? (e.y + b) / 2 : b,
                    anchorX: r ? void 0 : h ? (2 * e.anchorX + a) / 3 : a,
                    anchorY: r ? void 0 : h ? (e.anchorY + d) / 2 : d
                });
                f.getLabel().attr(e);
                h && (c.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    f && f.move(g, b, a, d)
                }, 32))
            },
            hide: function(g) {
                var b = this;
                c.clearTimeout(this.hideTimer);
                g = x(g, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = m(function() {
                    b.getLabel()[g ? "fadeOut" : "hide"]();
                    b.isHidden = !0
                }, g))
            },
            getAnchor: function(c, b) {
                var a = this.chart,
                    d = a.pointer,
                    f = a.inverted,
                    e = a.plotTop,
                    h = a.plotLeft,
                    r = 0,
                    g = 0,
                    q, v;
                c = z(c);
                this.followPointer &&
                    b ? (void 0 === b.chartX && (b = d.normalize(b)), c = [b.chartX - a.plotLeft, b.chartY - e]) : c[0].tooltipPos ? c = c[0].tooltipPos : (c.forEach(function(a) {
                        q = a.series.yAxis;
                        v = a.series.xAxis;
                        r += a.plotX + (!f && v ? v.left - h : 0);
                        g += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!f && q ? q.top - e : 0)
                    }), r /= c.length, g /= c.length, c = [f ? a.plotWidth - g : r, this.shared && !f && 1 < c.length && b ? b.chartY - e : f ? a.plotHeight - r : g]);
                return c.map(Math.round)
            },
            getPosition: function(c, b, a) {
                var d = this.chart,
                    f = this.distance,
                    e = {},
                    h = d.inverted && a.h || 0,
                    r, g = this.outside,
                    q = g ? u.documentElement.clientWidth - 2 * f : d.chartWidth,
                    v = g ? Math.max(u.body.scrollHeight, u.documentElement.scrollHeight, u.body.offsetHeight, u.documentElement.offsetHeight, u.documentElement.clientHeight) : d.chartHeight,
                    k = d.pointer.chartPosition,
                    t = d.containerScaling,
                    B = function(a) {
                        return t ? a * t.scaleX : a
                    },
                    I = function(a) {
                        return t ? a * t.scaleY : a
                    },
                    w = function(e) {
                        var l = "x" === e;
                        return [e, l ? q : v, l ? c : b].concat(g ? [l ? B(c) : I(b), l ? k.left - f + B(a.plotX + d.plotLeft) : k.top - f + I(a.plotY + d.plotTop), 0, l ? q : v] : [l ? c : b, l ? a.plotX + d.plotLeft :
                            a.plotY + d.plotTop, l ? d.plotLeft : d.plotTop, l ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight
                        ])
                    },
                    l = w("y"),
                    m = w("x"),
                    p = !this.followPointer && x(a.ttBelow, !d.inverted === !!a.negative),
                    n = function(a, b, d, c, k, l, t) {
                        var w = "y" === a ? I(f) : B(f),
                            r = (d - c) / 2,
                            q = c < k - f,
                            v = k + f + c < b,
                            g = k - w - d + r;
                        k = k + w - r;
                        if (p && v) e[a] = k;
                        else if (!p && q) e[a] = g;
                        else if (q) e[a] = Math.min(t - c, 0 > g - h ? g : g - h);
                        else if (v) e[a] = Math.max(l, k + h + d > b ? k : k + h);
                        else return !1
                    },
                    y = function(a, b, d, c, k) {
                        var l;
                        k < f || k > b - f ? l = !1 : e[a] = k < d / 2 ? 1 : k > b - c / 2 ? b - c - 2 : k - d / 2;
                        return l
                    },
                    z = function(a) {
                        var b =
                            l;
                        l = m;
                        m = b;
                        r = a
                    },
                    M = function() {
                        !1 !== n.apply(0, l) ? !1 !== y.apply(0, m) || r || (z(!0), M()) : r ? e.x = e.y = 0 : (z(!0), M())
                    };
                (d.inverted || 1 < this.len) && z();
                M();
                return e
            },
            defaultFormatter: function(c) {
                var b = this.points || z(this);
                var a = [c.tooltipFooterHeaderFormatter(b[0])];
                a = a.concat(c.bodyFormatter(b));
                a.push(c.tooltipFooterHeaderFormatter(b[0], !0));
                return a
            },
            refresh: function(g, b) {
                var a = this.chart,
                    d = this.options,
                    f = g,
                    e = {},
                    h = [];
                var r = d.formatter || this.defaultFormatter;
                e = this.shared;
                var m = a.styledMode;
                if (d.enabled) {
                    c.clearTimeout(this.hideTimer);
                    this.followPointer = z(f)[0].series.tooltipOptions.followPointer;
                    var q = this.getAnchor(f, b);
                    b = q[0];
                    var v = q[1];
                    !e || f.series && f.series.noSharedTooltip ? e = f.getLabelConfig() : (a.pointer.applyInactiveState(f), f.forEach(function(a) {
                        a.setState("hover");
                        h.push(a.getLabelConfig())
                    }), e = {
                        x: f[0].category,
                        y: f[0].y
                    }, e.points = h, f = f[0]);
                    this.len = h.length;
                    r = r.call(e, this);
                    e = f.series;
                    this.distance = x(e.tooltipOptions.distance, 16);
                    !1 === r ? this.hide() : (a = this.getLabel(), this.isHidden && a.attr({
                            opacity: 1
                        }).show(), this.split ?
                        this.renderSplit(r, z(g)) : (d.style.width && !m || a.css({
                            width: this.chart.spacingBox.width
                        }), a.attr({
                            text: r && r.join ? r.join("") : r
                        }), a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + x(f.colorIndex, e.colorIndex)), m || a.attr({
                            stroke: d.borderColor || f.color || e.color || "#666666"
                        }), this.updatePosition({
                            plotX: b,
                            plotY: v,
                            negative: f.negative,
                            ttBelow: f.ttBelow,
                            h: q[2] || 0
                        })), this.isHidden = !1);
                    c.fireEvent(this, "refresh")
                }
            },
            renderSplit: function(g, b) {
                var a = this,
                    d = [],
                    f = this.chart,
                    e = f.renderer,
                    h = !0,
                    r = this.options,
                    m = 0,
                    q, v = this.getLabel(),
                    k = f.plotTop;
                F(g) && (g = [!1, g]);
                g.slice(0, b.length + 1).forEach(function(c, B) {
                    if (!1 !== c && "" !== c) {
                        B = b[B - 1] || {
                            isHeader: !0,
                            plotX: b[0].plotX,
                            plotY: f.plotHeight
                        };
                        var t = B.series || a,
                            w = t.tt,
                            l = B.series || {},
                            g = "highcharts-color-" + x(B.colorIndex, l.colorIndex, "none");
                        w || (w = {
                            padding: r.padding,
                            r: r.borderRadius
                        }, f.styledMode || (w.fill = r.backgroundColor, w["stroke-width"] = r.borderWidth), t.tt = w = e.label(null, null, null, (B.isHeader ? r.headerShape : r.shape) || "callout", null, null, r.useHTML).addClass("highcharts-tooltip-box " +
                            g).attr(w).add(v));
                        w.isActive = !0;
                        w.attr({
                            text: c
                        });
                        f.styledMode || w.css(r.style).shadow(r.shadow).attr({
                            stroke: r.borderColor || B.color || l.color || "#333333"
                        });
                        c = w.getBBox();
                        g = c.width + w.strokeWidth();
                        B.isHeader ? (m = c.height, f.xAxis[0].opposite && (q = !0, k -= m), c = Math.max(0, Math.min(B.plotX + f.plotLeft - g / 2, f.chartWidth + (f.scrollablePixelsX ? f.scrollablePixelsX - f.marginRight : 0) - g))) : c = B.plotX + f.plotLeft - x(r.distance, 16) - g;
                        0 > c && (h = !1);
                        B.isHeader ? l = q ? -m : f.plotHeight + m : (l = l.yAxis, l = l.pos - k + Math.max(0, Math.min(B.plotY ||
                            0, l.len)));
                        d.push({
                            target: l,
                            rank: B.isHeader ? 1 : 0,
                            size: t.tt.getBBox().height + 1,
                            point: B,
                            x: c,
                            tt: w
                        })
                    }
                });
                this.cleanSplit();
                r.positioner && d.forEach(function(b) {
                    var d = r.positioner.call(a, b.tt.getBBox().width, b.size, b.point);
                    b.x = d.x;
                    b.align = 0;
                    b.target = d.y;
                    b.rank = x(d.rank, b.rank)
                });
                c.distribute(d, f.plotHeight + m);
                d.forEach(function(b) {
                    var d = b.point,
                        c = d.series,
                        e = c && c.yAxis;
                    b.tt.attr({
                        visibility: void 0 === b.pos ? "hidden" : "inherit",
                        x: h || d.isHeader || r.positioner ? b.x : d.plotX + f.plotLeft + a.distance,
                        y: b.pos + k,
                        anchorX: d.isHeader ?
                            d.plotX + f.plotLeft : d.plotX + c.xAxis.pos,
                        anchorY: d.isHeader ? f.plotTop + f.plotHeight / 2 : e.pos + Math.max(0, Math.min(d.plotY, e.len))
                    })
                })
            },
            updatePosition: function(g) {
                var b = this.chart,
                    a = b.pointer,
                    d = this.getLabel(),
                    f = g.plotX + b.plotLeft,
                    e = g.plotY + b.plotTop;
                a.chartPosition || (a.chartPosition = c.offset(b.container));
                g = (this.options.positioner || this.getPosition).call(this, d.width, d.height, g);
                if (this.outside) {
                    var h = (this.options.borderWidth || 0) + 2 * this.distance;
                    this.renderer.setSize(d.width + h, d.height + h, !1);
                    if (b = b.containerScaling) c.css(this.container, {
                        transform: "scale(" + b.scaleX + ", " + b.scaleY + ")"
                    }), f *= b.scaleX, e *= b.scaleY;
                    f += a.chartPosition.left - g.x;
                    e += a.chartPosition.top - g.y
                }
                this.move(Math.round(g.x), Math.round(g.y || 0), f, e)
            },
            getDateFormat: function(c, b, a, d) {
                var f = this.chart.time,
                    e = f.dateFormat("%m-%d %H:%M:%S.%L", b),
                    h = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    r = "millisecond";
                for (g in p) {
                    if (c === p.week && +f.dateFormat("%w", b) === a && "00:00:00.000" === e.substr(6)) {
                        var g = "week";
                        break
                    }
                    if (p[g] > c) {
                        g = r;
                        break
                    }
                    if (h[g] && e.substr(h[g]) !== "01-01 00:00:00.000".substr(h[g])) break;
                    "week" !== g && (r = g)
                }
                if (g) var q = f.resolveDTLFormat(d[g]).main;
                return q
            },
            getXDateFormat: function(c, b, a) {
                b = b.dateTimeLabelFormats;
                var d = a && a.closestPointRange;
                return (d ? this.getDateFormat(d, c.x, a.options.startOfWeek, b) : b.day) || b.year
            },
            tooltipFooterHeaderFormatter: function(g, b) {
                var a = b ? "footer" : "header",
                    d = g.series,
                    f = d.tooltipOptions,
                    e = f.xDateFormat,
                    h = d.xAxis,
                    r = h && "datetime" === h.options.type && D(g.key),
                    m = f[a + "Format"];
                b = {
                    isFooter: b,
                    labelConfig: g
                };
                c.fireEvent(this, "headerFormatter", b, function(a) {
                    r && !e && (e =
                        this.getXDateFormat(g, f, h));
                    r && e && (g.point && g.point.tooltipDateKeys || ["key"]).forEach(function(a) {
                        m = m.replace("{point." + a + "}", "{point." + a + ":" + e + "}")
                    });
                    d.chart.styledMode && (m = this.styledModeFormat(m));
                    a.text = y(m, {
                        point: g,
                        series: d
                    }, this.chart.time)
                });
                return b.text
            },
            bodyFormatter: function(c) {
                return c.map(function(b) {
                    var a = b.series.tooltipOptions;
                    return (a[(b.point.formatPrefix || "point") + "Formatter"] || b.point.tooltipFormatter).call(b.point, a[(b.point.formatPrefix || "point") + "Format"] || "")
                })
            },
            styledModeFormat: function(c) {
                return c.replace('style="font-size: 10px"',
                    'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
            }
        }
    });
    N(H, "parts/Pointer.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.attr,
            D = n.defined,
            F = n.isNumber,
            z = n.isObject,
            u = n.objectEach,
            L = n.splat,
            y = c.addEvent,
            C = c.charts,
            x = c.color,
            m = c.css,
            p = c.extend,
            g = c.find,
            b = c.fireEvent,
            a = c.offset,
            d = c.pick,
            f = c.Tooltip;
        c.Pointer = function(a, b) {
            this.init(a, b)
        };
        c.Pointer.prototype = {
            init: function(a, b) {
                this.options = b;
                this.chart =
                    a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                f && (a.tooltip = new f(a, b.tooltip), this.followTouchMove = d(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    f = c.zoomType || "";
                b = b.inverted;
                /touch/.test(a.type) && (f = d(c.pinchType, f));
                this.zoomX = a = /x/.test(f);
                this.zoomY = f = /y/.test(f);
                this.zoomHor = a && !b || f && b;
                this.zoomVert = f && !b || a && b;
                this.hasZoom = a || f
            },
            normalize: function(b, d) {
                var c = b.touches ? b.touches.length ?
                    b.touches.item(0) : b.changedTouches[0] : b;
                d || (this.chartPosition = d = a(this.chart.container));
                var f = c.pageX - d.left;
                d = c.pageY - d.top;
                if (c = this.chart.containerScaling) f /= c.scaleX, d /= c.scaleY;
                return p(b, {
                    chartX: Math.round(f),
                    chartY: Math.round(d)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function(d) {
                    b[d.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: d,
                        value: d.toValue(a[d.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function(a, b, d) {
                var c;
                a.forEach(function(a) {
                    var f = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(d, f);
                    if ((f = z(a, !0)) && !(f = !z(c, !0))) {
                        f = c.distX - a.distX;
                        var e = c.dist - a.dist,
                            t = (a.series.group && a.series.group.zIndex) - (c.series.group && c.series.group.zIndex);
                        f = 0 < (0 !== f && b ? f : 0 !== e ? e : 0 !== t ? t : c.series.index > a.series.index ? -1 : 1)
                    }
                    f && (c = a)
                });
                return c
            },
            getPointFromEvent: function(a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function(a, b) {
                var c = a.series,
                    f = c.xAxis;
                c = c.yAxis;
                var e = d(a.clientX, a.plotX),
                    h = a.shapeArgs;
                if (f && c) return b ? {
                    chartX: f.len + f.pos - e,
                    chartY: c.len + c.pos - a.plotY
                } : {
                    chartX: e + f.pos,
                    chartY: a.plotY + c.pos
                };
                if (h && h.x && h.y) return {
                    chartX: h.x,
                    chartY: h.y
                }
            },
            getHoverData: function(a, b, c, f, q, v) {
                var e, t = [];
                f = !(!f || !a);
                var h = b && !b.stickyTracking ? [b] : c.filter(function(a) {
                    return a.visible && !(!q && a.directTouch) && d(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                b = (e = f || !v ? a : this.findNearestKDPoint(h, q, v)) && e.series;
                e && (q && !b.noSharedTooltip ? (h = c.filter(function(a) {
                    return a.visible &&
                        !(!q && a.directTouch) && d(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), h.forEach(function(a) {
                    var b = g(a.points, function(a) {
                        return a.x === e.x && !a.isNull
                    });
                    z(b) && (a.chart.isBoosting && (b = a.getPoint(b)), t.push(b))
                })) : t.push(e));
                return {
                    hoverPoint: e,
                    hoverSeries: b,
                    hoverPoints: t
                }
            },
            runPointActions: function(a, b) {
                var f = this.chart,
                    e = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0,
                    h = e ? e.shared : !1,
                    v = b || f.hoverPoint,
                    k = v && v.series || f.hoverSeries;
                k = this.getHoverData(v, k, f.series, (!a || "touchmove" !== a.type) &&
                    (!!b || k && k.directTouch && this.isDirectTouch), h, a);
                v = k.hoverPoint;
                var t = k.hoverPoints;
                b = (k = k.hoverSeries) && k.tooltipOptions.followPointer;
                h = h && k && !k.noSharedTooltip;
                if (v && (v !== f.hoverPoint || e && e.isHidden)) {
                    (f.hoverPoints || []).forEach(function(a) {
                        -1 === t.indexOf(a) && a.setState()
                    });
                    if (f.hoverSeries !== k) k.onMouseOver();
                    this.applyInactiveState(t);
                    (t || []).forEach(function(a) {
                        a.setState("hover")
                    });
                    f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
                    if (!v.series) return;
                    v.firePointEvent("mouseOver");
                    f.hoverPoints =
                        t;
                    f.hoverPoint = v;
                    e && e.refresh(h ? t : v, a)
                } else b && e && !e.isHidden && (v = e.getAnchor([{}], a), e.updatePosition({
                    plotX: v[0],
                    plotY: v[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = y(f.container.ownerDocument, "mousemove", function(a) {
                    var b = C[c.hoverChartIndex];
                    if (b) b.pointer.onDocumentMouseMove(a)
                }));
                f.axes.forEach(function(b) {
                    var f = d(b.crosshair.snap, !0),
                        e = f ? c.find(t, function(a) {
                            return a.series[b.coll] === b
                        }) : void 0;
                    e || !f ? b.drawCrosshair(a, e) : b.hideCrosshair()
                })
            },
            applyInactiveState: function(a) {
                var b = [],
                    d;
                (a || []).forEach(function(a) {
                    d = a.series;
                    b.push(d);
                    d.linkedParent && b.push(d.linkedParent);
                    d.linkedSeries && (b = b.concat(d.linkedSeries));
                    d.navigatorSeries && b.push(d.navigatorSeries)
                });
                this.chart.series.forEach(function(a) {
                    -1 === b.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
                })
            },
            reset: function(a, b) {
                var d = this.chart,
                    c = d.hoverSeries,
                    f = d.hoverPoint,
                    e = d.hoverPoints,
                    k = d.tooltip,
                    t = k && k.shared ? e : f;
                a && t && L(t).forEach(function(b) {
                    b.series.isCartesian && void 0 ===
                        b.plotX && (a = !1)
                });
                if (a) k && t && L(t).length && (k.refresh(t), k.shared && e ? e.forEach(function(a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                }) : f && (f.setState(f.state, !0), d.axes.forEach(function(a) {
                    a.crosshair && a.drawCrosshair(null, f)
                })));
                else {
                    if (f) f.onMouseOut();
                    e && e.forEach(function(a) {
                        a.setState()
                    });
                    if (c) c.onMouseOut();
                    k && k.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    d.axes.forEach(function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = d.hoverPoints = d.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var d = this.chart,
                    c;
                d.series.forEach(function(f) {
                    c = a || f.getPlotBox();
                    f.xAxis && f.xAxis.zoomEnabled && f.group && (f.group.attr(c), f.markerGroup && (f.markerGroup.attr(c), f.markerGroup.clip(b ? d.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(c))
                });
                d.clipRect.attr(b || d.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX =
                    a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    d = b.options.chart,
                    c = a.chartX,
                    f = a.chartY,
                    e = this.zoomHor,
                    k = this.zoomVert,
                    t = b.plotLeft,
                    B = b.plotTop,
                    I = b.plotWidth,
                    w = b.plotHeight,
                    l = this.selectionMarker,
                    g = this.mouseDownX,
                    m = this.mouseDownY,
                    p = d.panKey && a[d.panKey + "Key"];
                if (!l || !l.touch)
                    if (c < t ? c = t : c > t + I && (c = t + I), f < B ? f = B : f > B + w && (f = B + w), this.hasDragged = Math.sqrt(Math.pow(g - c, 2) + Math.pow(m - f, 2)), 10 < this.hasDragged) {
                        var u = b.isInsidePlot(g - t, m - B);
                        b.hasCartesianSeries && (this.zoomX ||
                            this.zoomY) && u && !p && !l && (this.selectionMarker = l = b.renderer.rect(t, B, e ? 1 : I, k ? 1 : w, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), b.styledMode || l.attr({
                            fill: d.selectionMarkerFill || x("#335cad").setOpacity(.25).get()
                        }));
                        l && e && (c -= g, l.attr({
                            width: Math.abs(c),
                            x: (0 < c ? 0 : c) + g
                        }));
                        l && k && (c = f - m, l.attr({
                            height: Math.abs(c),
                            y: (0 < c ? 0 : c) + m
                        }));
                        u && !l && d.panning && b.pan(a, d.panning)
                    }
            },
            drop: function(a) {
                var d = this,
                    c = this.chart,
                    f = this.hasPinched;
                if (this.selectionMarker) {
                    var e = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        v = this.selectionMarker,
                        k = v.attr ? v.attr("x") : v.x,
                        t = v.attr ? v.attr("y") : v.y,
                        B = v.attr ? v.attr("width") : v.width,
                        I = v.attr ? v.attr("height") : v.height,
                        w;
                    if (this.hasDragged || f) c.axes.forEach(function(b) {
                        if (b.zoomEnabled && D(b.min) && (f || d[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [b.coll]])) {
                            var c = b.horiz,
                                l = "touchend" === a.type ? b.minPixelPadding : 0,
                                h = b.toValue((c ? k : t) + l);
                            c = b.toValue((c ? k + B : t + I) - l);
                            e[b.coll].push({
                                axis: b,
                                min: Math.min(h, c),
                                max: Math.max(h, c)
                            });
                            w = !0
                        }
                    }), w && b(c, "selection", e, function(a) {
                        c.zoom(p(a, f ? {
                                animation: !1
                            } :
                            null))
                    });
                    F(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    f && this.scaleGroups()
                }
                c && F(c.index) && (m(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(a) {
                C[c.hoverChartIndex] && C[c.hoverChartIndex].pointer.drop(a)
            },
            onDocumentMouseMove: function(a) {
                var b =
                    this.chart,
                    d = this.chartPosition;
                a = this.normalize(a, d);
                !d || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(a) {
                var b = C[c.hoverChartIndex];
                b && (a.relatedTarget || a.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(a) {
                var b = this.chart;
                D(c.hoverChartIndex) && C[c.hoverChartIndex] && C[c.hoverChartIndex].mouseIsDown || (c.hoverChartIndex = b.index);
                a = this.normalize(a);
                a.preventDefault ||
                    (a.returnValue = !1);
                "mousedown" === b.mouseIsDown && this.drag(a);
                !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || b.openMenu || this.runPointActions(a)
            },
            inClass: function(a, b) {
                for (var d; a;) {
                    if (d = A(a, "class")) {
                        if (-1 !== d.indexOf(b)) return !0;
                        if (-1 !== d.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a,
                        "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var d = this.chart,
                    c = d.hoverPoint,
                    f = d.plotLeft,
                    e = d.plotTop;
                a = this.normalize(a);
                d.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (b(c.series, "click", p(a, {
                    point: c
                })), d.hoverPoint && c.firePointEvent("click", a)) : (p(a, this.getCoordinates(a)), d.isInsidePlot(a.chartX - f, a.chartY - e) && b(d, "click", a)))
            },
            setDOMEvents: function() {
                var a = this,
                    b = a.chart.container,
                    d = b.ownerDocument;
                b.onmousedown = function(b) {
                    a.onContainerMouseDown(b)
                };
                b.onmousemove = function(b) {
                    a.onContainerMouseMove(b)
                };
                b.onclick = function(b) {
                    a.onContainerClick(b)
                };
                this.unbindContainerMouseLeave = y(b, "mouseleave", a.onContainerMouseLeave);
                c.unbindDocumentMouseUp || (c.unbindDocumentMouseUp = y(d, "mouseup", a.onDocumentMouseUp));
                c.hasTouch && (y(b, "touchstart", function(b) {
                    a.onContainerTouchStart(b)
                }), y(b, "touchmove", function(b) {
                    a.onContainerTouchMove(b)
                }), c.unbindDocumentTouchEnd || (c.unbindDocumentTouchEnd =
                    y(d, "touchend", a.onDocumentTouchEnd)))
            },
            destroy: function() {
                var a = this;
                a.unDocMouseMove && a.unDocMouseMove();
                this.unbindContainerMouseLeave();
                c.chartCount || (c.unbindDocumentMouseUp && (c.unbindDocumentMouseUp = c.unbindDocumentMouseUp()), c.unbindDocumentTouchEnd && (c.unbindDocumentTouchEnd = c.unbindDocumentTouchEnd()));
                clearInterval(a.tooltipTimeout);
                u(a, function(b, d) {
                    a[d] = null
                })
            }
        }
    });
    N(H, "parts/TouchPointer.js", [H["parts/Globals.js"]], function(c) {
        var n = c.charts,
            A = c.extend,
            D = c.noop,
            F = c.pick;
        A(c.Pointer.prototype, {
            pinchTranslate: function(c, u, n, y, A, x) {
                this.zoomHor && this.pinchTranslateDirection(!0, c, u, n, y, A, x);
                this.zoomVert && this.pinchTranslateDirection(!1, c, u, n, y, A, x)
            },
            pinchTranslateDirection: function(c, u, n, y, A, x, m, p) {
                var g = this.chart,
                    b = c ? "x" : "y",
                    a = c ? "X" : "Y",
                    d = "chart" + a,
                    f = c ? "width" : "height",
                    e = g["plot" + (c ? "Left" : "Top")],
                    h, r, E = p || 1,
                    q = g.inverted,
                    v = g.bounds[c ? "h" : "v"],
                    k = 1 === u.length,
                    t = u[0][d],
                    B = n[0][d],
                    I = !k && u[1][d],
                    w = !k && n[1][d];
                n = function() {
                    !k && 20 < Math.abs(t - I) && (E = p || Math.abs(B - w) / Math.abs(t - I));
                    r = (e - B) / E + t;
                    h = g["plot" + (c ? "Width" : "Height")] / E
                };
                n();
                u = r;
                if (u < v.min) {
                    u = v.min;
                    var l = !0
                } else u + h > v.max && (u = v.max - h, l = !0);
                l ? (B -= .8 * (B - m[b][0]), k || (w -= .8 * (w - m[b][1])), n()) : m[b] = [B, w];
                q || (x[b] = r - e, x[f] = h);
                x = q ? 1 / E : E;
                A[f] = h;
                A[b] = u;
                y[q ? c ? "scaleY" : "scaleX" : "scale" + a] = E;
                y["translate" + a] = x * e + (B - x * t)
            },
            pinch: function(c) {
                var u = this,
                    n = u.chart,
                    y = u.pinchDown,
                    z = c.touches,
                    x = z.length,
                    m = u.lastValidTouch,
                    p = u.hasZoom,
                    g = u.selectionMarker,
                    b = {},
                    a = 1 === x && (u.inClass(c.target, "highcharts-tracker") && n.runTrackerClick || u.runChartClick),
                    d = {};
                1 < x && (u.initiated = !0);
                p && u.initiated && !a && c.preventDefault();
                [].map.call(z, function(a) {
                    return u.normalize(a)
                });
                "touchstart" === c.type ? ([].forEach.call(z, function(a, b) {
                    y[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), m.x = [y[0].chartX, y[1] && y[1].chartX], m.y = [y[0].chartY, y[1] && y[1].chartY], n.axes.forEach(function(a) {
                    if (a.zoomEnabled) {
                        var b = n.bounds[a.horiz ? "h" : "v"],
                            d = a.minPixelPadding,
                            c = a.toPixels(Math.min(F(a.options.min, a.dataMin), a.dataMin)),
                            f = a.toPixels(Math.max(F(a.options.max, a.dataMax), a.dataMax)),
                            q = Math.max(c,
                                f);
                        b.min = Math.min(a.pos, Math.min(c, f) - d);
                        b.max = Math.max(a.pos + a.len, q + d)
                    }
                }), u.res = !0) : u.followTouchMove && 1 === x ? this.runPointActions(u.normalize(c)) : y.length && (g || (u.selectionMarker = g = A({
                    destroy: D,
                    touch: !0
                }, n.plotBox)), u.pinchTranslate(y, z, b, g, d, m), u.hasPinched = p, u.scaleGroups(b, d), u.res && (u.res = !1, this.reset(!1, 0)))
            },
            touch: function(n, u) {
                var z = this.chart,
                    y;
                if (z.index !== c.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                c.hoverChartIndex = z.index;
                if (1 === n.touches.length)
                    if (n = this.normalize(n),
                        (y = z.isInsidePlot(n.chartX - z.plotLeft, n.chartY - z.plotTop)) && !z.openMenu) {
                        u && this.runPointActions(n);
                        if ("touchmove" === n.type) {
                            u = this.pinchDown;
                            var A = u[0] ? 4 <= Math.sqrt(Math.pow(u[0].chartX - n.chartX, 2) + Math.pow(u[0].chartY - n.chartY, 2)) : !1
                        }
                        F(A, !0) && this.pinch(n)
                    } else u && this.reset();
                else 2 === n.touches.length && this.pinch(n)
            },
            onContainerTouchStart: function(c) {
                this.zoomOption(c);
                this.touch(c, !0)
            },
            onContainerTouchMove: function(c) {
                this.touch(c)
            },
            onDocumentTouchEnd: function(z) {
                n[c.hoverChartIndex] && n[c.hoverChartIndex].pointer.drop(z)
            }
        })
    });
    N(H, "parts/MSPointer.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.objectEach,
            D = c.addEvent,
            F = c.charts,
            z = c.css,
            u = c.doc;
        n = c.extend;
        var L = c.noop,
            y = c.Pointer,
            C = c.removeEvent,
            x = c.win,
            m = c.wrap;
        if (!c.hasTouch && (x.PointerEvent || x.MSPointerEvent)) {
            var p = {},
                g = !!x.PointerEvent,
                b = function() {
                    var a = [];
                    a.item = function(a) {
                        return this[a]
                    };
                    A(p, function(b) {
                        a.push({
                            pageX: b.pageX,
                            pageY: b.pageY,
                            target: b.target
                        })
                    });
                    return a
                },
                a = function(a, f, e, h) {
                    "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH ||
                        !F[c.hoverChartIndex] || (h(a), h = F[c.hoverChartIndex].pointer, h[f]({
                            type: e,
                            target: a.currentTarget,
                            preventDefault: L,
                            touches: b()
                        }))
                };
            n(y.prototype, {
                onContainerPointerDown: function(b) {
                    a(b, "onContainerTouchStart", "touchstart", function(a) {
                        p[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(b) {
                    a(b, "onContainerTouchMove", "touchmove", function(a) {
                        p[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        p[a.pointerId].target || (p[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(b) {
                    a(b,
                        "onDocumentTouchEnd", "touchend",
                        function(a) {
                            delete p[a.pointerId]
                        })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, g ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, g ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(u, g ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            m(y.prototype, "init", function(a, b, c) {
                a.call(this, b, c);
                this.hasZoom && z(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            m(y.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(D)
            });
            m(y.prototype, "destroy", function(a) {
                this.batchMSEvents(C);
                a.call(this)
            })
        }
    });
    N(H, "parts/Legend.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.isNumber,
            F = c.addEvent,
            z = c.css,
            u = c.discardElement,
            L = c.fireEvent;
        n = c.isFirefox;
        var y = c.marginNames,
            C = c.merge,
            x = c.pick,
            m = c.setAnimation,
            p = c.stableSort,
            g = c.win,
            b = c.wrap;
        c.Legend = function(a, b) {
            this.init(a, b)
        };
        c.Legend.prototype = {
            init: function(a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), F(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = F(this.chart, "render", function() {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            },
            setOptions: function(a) {
                var b = x(a.padding, 8);
                this.options = a;
                this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = C(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY =
                    b - 5;
                this.symbolWidth = x(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            },
            update: function(a, b) {
                var d = this.chart;
                this.setOptions(C(!0, this.options, a));
                this.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                x(b, !0) && d.redraw();
                L(this, "afterUpdate")
            },
            colorizeItem: function(a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var d = this.options,
                        c = a.legendItem,
                        h = a.legendLine,
                        r = a.legendSymbol,
                        g = this.itemHiddenStyle.color;
                    d = b ? d.itemStyle.color : g;
                    var q = b ? a.color || g : g,
                        v = a.options && a.options.marker,
                        k = {
                            fill: q
                        };
                    c && c.css({
                        fill: d,
                        color: d
                    });
                    h && h.attr({
                        stroke: q
                    });
                    r && (v && r.isMarker && (k = a.pointAttribs(), b || (k.stroke = k.fill = g)), r.attr(k))
                }
                L(this, "afterColorizeItem", {
                    item: a,
                    visible: b
                })
            },
            positionItems: function() {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function(a) {
                var b = this.options,
                    c = b.symbolPadding;
                b = !b.rtl;
                var e = a._legendItemPos,
                    h = e[0];
                e = e[1];
                var r = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[A(a.translateY) ? "animate" : "attr"]({
                    translateX: b ? h : this.legendWidth - h - 2 * c - 4,
                    translateY: e
                });
                r && (r.x = h, r.y = e)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && u(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                this.getAllItems().forEach(function(b) {
                    ["legendItem", "legendGroup"].forEach(a, b)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a,
                    this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    b = this.clipHeight || this.legendHeight,
                    c = this.titleHeight;
                if (a) {
                    var e = a.translateY;
                    this.allItems.forEach(function(d) {
                        var f = d.checkbox;
                        if (f) {
                            var h = e + c + f.y + (this.scrollOffset || 0) + 3;
                            z(f, {
                                left: a.translateX + d.checkboxOffset + f.x - 20 + "px",
                                top: h + "px",
                                display: this.proximate || h > e - 6 && h < e + b - 6 ? "" : "none"
                            })
                        }
                    }, this)
                }
            },
            renderTitle: function() {
                var a = this.options,
                    b = this.padding,
                    c = a.title,
                    e = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text,
                    b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }), this.chart.styledMode || this.title.css(c.style), this.title.add(this.group)), c.width || this.title.css({
                    width: this.maxLegendWidth + "px"
                }), a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: e
                }));
                this.titleHeight = e
            },
            setText: function(a) {
                var b = this.options;
                a.legendItem.attr({
                    text: b.labelFormat ? c.format(b.labelFormat, a, this.chart.time) : b.labelFormatter.call(a)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    c = b.renderer,
                    e = this.options,
                    h = this.symbolWidth,
                    r = e.symbolPadding,
                    g = this.itemStyle,
                    q = this.itemHiddenStyle,
                    v = "horizontal" === e.layout ? x(e.itemDistance, 20) : 0,
                    k = !e.rtl,
                    t = a.legendItem,
                    B = !a.series,
                    I = !B && a.series.drawLegendSymbol ? a.series : a,
                    w = I.options;
                w = this.createCheckboxForItem && w && w.showCheckbox;
                v = h + r + v + (w ? 20 : 0);
                var l = e.useHTML,
                    m = a.options.className;
                t || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + I.type + "-series highcharts-color-" + a.colorIndex + (m ? " " + m : "") + (B ? " highcharts-series-" + a.index :
                    "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = t = c.text("", k ? h + r : -r, this.baseline || 0, l), b.styledMode || t.css(C(a.visible ? g : q)), t.attr({
                    align: k ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = c.fontMetrics(b.styledMode ? 12 : g.fontSize, t), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, t.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, I.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, t, l));
                w && !a.checkbox && this.createCheckboxForItem(a);
                this.colorizeItem(a, a.visible);
                !b.styledMode && g.width || t.css({
                    width: (e.itemWidth || this.widthOption || b.spacingBox.width) - v
                });
                this.setText(a);
                b = t.getBBox();
                a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width + v;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            },
            layoutItem: function(a) {
                var b = this.options,
                    c = this.padding,
                    e = "horizontal" === b.layout,
                    h = a.itemHeight,
                    g = b.itemMarginBottom || 0,
                    m = this.itemMarginTop,
                    q = e ? x(b.itemDistance, 20) : 0,
                    v = this.maxLegendWidth;
                b = b.alignColumns && this.totalItemWidth > v ? this.maxItemWidth : a.itemWidth;
                e && this.itemX - c + b > v && (this.itemX = c, this.lastLineHeight && (this.itemY += m + this.lastLineHeight + g), this.lastLineHeight = 0);
                this.lastItemY = m + this.itemY + g;
                this.lastLineHeight = Math.max(h, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += b : (this.itemY += m + h + g, this.lastLineHeight = h);
                this.offsetWidth = this.widthOption || Math.max((e ?
                    this.itemX - c - (a.checkbox ? 0 : q) : b) + c, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                this.chart.series.forEach(function(b) {
                    var d = b && b.options;
                    b && x(d.showInLegend, A(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ? b.data : b)))
                });
                L(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            },
            getAlignment: function() {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function(a, b) {
                var d =
                    this.chart,
                    c = this.options,
                    h = this.getAlignment();
                h && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(f, e) {
                    f.test(h) && !A(a[e]) && (d[y[e]] = Math.max(d[y[e]], d.legend[(e + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][e] * c[e % 2 ? "x" : "y"] + x(c.margin, 12) + b[e] + (d.titleOffset[e] || 0)))
                })
            },
            proximatePositions: function() {
                var a = this.chart,
                    b = [],
                    f = "left" === this.options.align;
                this.allItems.forEach(function(d) {
                    var e = f;
                    if (d.yAxis && d.points) {
                        d.xAxis.options.reversed && (e = !e);
                        var g = c.find(e ? d.points :
                            d.points.slice(0).reverse(),
                            function(a) {
                                return D(a.plotY)
                            });
                        e = d.legendGroup.getBBox().height;
                        var m = d.yAxis.top - a.plotTop;
                        d.visible ? (g = g ? g.plotY : d.yAxis.height, g += m - .3 * e) : g = m + d.yAxis.height;
                        b.push({
                            target: g,
                            size: e,
                            item: d
                        })
                    }
                }, this);
                c.distribute(b, a.plotHeight);
                b.forEach(function(b) {
                    b.item._legendItemPos[1] = a.plotTop - a.spacing[0] + b.pos
                })
            },
            render: function() {
                var a = this.chart,
                    b = a.renderer,
                    f = this.group,
                    e, h = this.box,
                    g = this.options,
                    m = this.padding;
                this.itemX = m;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth =
                    0;
                this.widthOption = c.relativeLength(g.width, a.spacingBox.width - m);
                var q = a.spacingBox.width - 2 * m - g.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (q /= 2);
                this.maxLegendWidth = this.widthOption || q;
                f || (this.group = f = b.g("legend").attr({
                    zIndex: 7
                }).add(), this.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(f), this.scrollGroup = b.g().add(this.contentGroup));
                this.renderTitle();
                q = this.getAllItems();
                p(q, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                g.reversed &&
                    q.reverse();
                this.allItems = q;
                this.display = e = !!q.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                q.forEach(this.renderItem, this);
                q.forEach(this.layoutItem, this);
                q = (this.widthOption || this.offsetWidth) + m;
                var v = this.lastItemY + this.lastLineHeight + this.titleHeight;
                v = this.handleOverflow(v);
                v += m;
                h || (this.box = h = b.rect().addClass("highcharts-legend-box").attr({
                    r: g.borderRadius
                }).add(f), h.isNew = !0);
                a.styledMode || h.attr({
                    stroke: g.borderColor,
                    "stroke-width": g.borderWidth || 0,
                    fill: g.backgroundColor ||
                        "none"
                }).shadow(g.shadow);
                0 < q && 0 < v && (h[h.isNew ? "attr" : "animate"](h.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: q,
                    height: v
                }, h.strokeWidth())), h.isNew = !1);
                h[e ? "show" : "hide"]();
                a.styledMode && "none" === f.getStyle("display") && (q = v = 0);
                this.legendWidth = q;
                this.legendHeight = v;
                e && (b = a.spacingBox, h = b.y, /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? h += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a.titleOffset[2] && (h -= a.titleOffset[2]), h !== b.y && (b = C(b, {
                    y: h
                })), f.align(C(g, {
                    width: q,
                    height: v,
                    verticalAlign: this.proximate ?
                        "top" : g.verticalAlign
                }), !0, b));
                this.proximate || this.positionItems();
                L(this, "afterRender")
            },
            handleOverflow: function(a) {
                var b = this,
                    c = this.chart,
                    e = c.renderer,
                    h = this.options,
                    g = h.y,
                    m = this.padding;
                g = c.spacingBox.height + ("top" === h.verticalAlign ? -g : g) - m;
                var q = h.maxHeight,
                    v, k = this.clipRect,
                    t = h.navigation,
                    B = x(t.animation, !0),
                    I = t.arrowSize || 12,
                    w = this.nav,
                    l = this.pages,
                    p, K = this.allItems,
                    n = function(a) {
                        "number" === typeof a ? k.attr({
                            height: a
                        }) : k && (b.clipRect = k.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip =
                            a ? "rect(" + m + "px,9999px," + (m + a) + "px,0)" : "auto")
                    },
                    u = function(a) {
                        b[a] = e.circle(0, 0, 1.3 * I).translate(I / 2, I / 2).add(w);
                        c.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
                        return b[a]
                    };
                "horizontal" !== h.layout || "middle" === h.verticalAlign || h.floating || (g /= 2);
                q && (g = Math.min(g, q));
                l.length = 0;
                a > g && !1 !== t.enabled ? (this.clipHeight = v = Math.max(g - 20 - this.titleHeight - m, 0), this.currentPage = x(this.currentPage, 1), this.fullHeight = a, K.forEach(function(a, b) {
                    var d = a._legendItemPos[1],
                        c = Math.round(a.legendItem.getBBox().height),
                        f = l.length;
                    if (!f || d - l[f - 1] > v && (p || d) !== l[f - 1]) l.push(p || d), f++;
                    a.pageIx = f - 1;
                    p && (K[b - 1].pageIx = f - 1);
                    b === K.length - 1 && d + c - l[f - 1] > v && d !== p && (l.push(d), a.pageIx = f);
                    d !== p && (p = d)
                }), k || (k = b.clipRect = e.clipRect(0, m, 9999, 0), b.contentGroup.clip(k)), n(v), w || (this.nav = w = e.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = e.symbol("triangle", 0, 0, I, I).add(w), u("upTracker").on("click", function() {
                        b.scroll(-1, B)
                    }), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation"), c.styledMode || this.pager.css(t.style),
                    this.pager.add(w), this.down = e.symbol("triangle-down", 0, 0, I, I).add(w), u("downTracker").on("click", function() {
                        b.scroll(1, B)
                    })), b.scroll(0), a = g) : w && (n(), this.nav = w.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, b) {
                var d = this.pages,
                    c = d.length,
                    h = this.currentPage + a;
                a = this.clipHeight;
                var g = this.options.navigation,
                    p = this.pager,
                    q = this.padding;
                h > c && (h = c);
                0 < h && (void 0 !== b && m(b, this.chart), this.nav.attr({
                    translateX: q,
                    translateY: a + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), [this.up, this.upTracker].forEach(function(a) {
                    a.attr({
                        "class": 1 === h ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }), p.attr({
                    text: h + "/" + c
                }), [this.down, this.downTracker].forEach(function(a) {
                    a.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": h === c ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }, this), this.chart.styledMode || (this.up.attr({
                    fill: 1 === h ? g.inactiveColor : g.activeColor
                }), this.upTracker.css({
                    cursor: 1 === h ? "default" : "pointer"
                }), this.down.attr({
                    fill: h ===
                        c ? g.inactiveColor : g.activeColor
                }), this.downTracker.css({
                    cursor: h === c ? "default" : "pointer"
                })), this.scrollOffset = -d[h - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = h, this.positionCheckboxes())
            }
        };
        c.LegendSymbolMixin = {
            drawRectangle: function(a, b) {
                var d = a.symbolHeight,
                    c = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - d) / 2 : 0, a.baseline - d + 1, c ? d : a.symbolWidth, d, x(a.options.symbolRadius, d / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options,
                    c = b.marker,
                    e = a.symbolWidth,
                    h = a.symbolHeight,
                    g = h / 2,
                    m = this.chart.renderer,
                    q = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var v = {};
                this.chart.styledMode || (v = {
                    "stroke-width": b.lineWidth || 0
                }, b.dashStyle && (v.dashstyle = b.dashStyle));
                this.legendLine = m.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr(v).add(q);
                c && !1 !== c.enabled && e && (b = Math.min(x(c.radius, g), g), 0 === this.symbol.indexOf("url") && (c = C(c, {
                        width: h,
                        height: h
                    }), b = 0), this.legendSymbol =
                    c = m.symbol(this.symbol, e / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(q), c.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(g.navigator && g.navigator.userAgent) || n) && b(c.Legend.prototype, "positionItem", function(a, b) {
            var d = this,
                c = function() {
                    b._legendItemPos && a.call(d, b)
                };
            c();
            d.bubbleLegend || setTimeout(c)
        })
    });
    N(H, "parts/Chart.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.attr,
            D = n.defined,
            F = n.erase,
            z = n.isArray,
            u = n.isNumber,
            L = n.isObject,
            y = n.isString,
            C = n.objectEach,
            x = n.pInt,
            m = n.splat,
            p = c.addEvent,
            g = c.animate,
            b = c.animObject,
            a = c.doc,
            d = c.Axis,
            f = c.createElement,
            e = c.defaultOptions,
            h = c.discardElement,
            r = c.charts,
            E = c.css,
            q = c.extend,
            v = c.find,
            k = c.fireEvent,
            t = c.Legend,
            B = c.marginNames,
            I = c.merge,
            w = c.Pointer,
            l = c.pick,
            J = c.removeEvent,
            K = c.seriesTypes,
            T = c.syncTimeout,
            R = c.win,
            S = c.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        c.chart = function(a, b, d) {
            return new S(a, b, d)
        };
        q(S.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (y(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(a, b) {
                var d, f = a.series,
                    l = a.plotOptions || {};
                k(this, "init", {
                    args: arguments
                }, function() {
                    a.series = null;
                    d = I(e, a);
                    C(d.plotOptions, function(a, b) {
                        L(a) && (a.tooltip = l[b] && I(l[b].tooltip) || void 0)
                    });
                    d.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip;
                    d.series = a.series = f;
                    this.userOptions = a;
                    var t = d.chart,
                        B = t.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = b;
                    this.isResizing = 0;
                    this.options = d;
                    this.axes = [];
                    this.series = [];
                    this.time = a.time && Object.keys(a.time).length ? new c.Time(a.time) : c.time;
                    this.styledMode = t.styledMode;
                    this.hasCartesianSeries = t.showAxes;
                    var h = this;
                    h.index = r.length;
                    r.push(h);
                    c.chartCount++;
                    B && C(B, function(a, b) {
                        c.isFunction(a) && p(h, b, a)
                    });
                    h.xAxis = [];
                    h.yAxis = [];
                    h.pointCount = h.colorCounter = h.symbolCounter = 0;
                    k(h, "afterInit");
                    h.firstRender()
                })
            },
            initSeries: function(a) {
                var b = this.options.chart;
                (b = K[a.type || b.type || b.defaultSeriesType]) || c.error(17, !0, this);
                b = new b;
                b.init(this, a);
                return b
            },
            orderSeries: function(a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function(a, b, d) {
                var c = d ? b : a;
                a = d ? a : b;
                return 0 <= c && c <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(a) {
                k(this, "beforeRedraw");
                var b = this.axes,
                    d = this.series,
                    f = this.pointer,
                    e = this.legend,
                    l = this.userOptions.legend,
                    t = this.isDirtyLegend,
                    h = this.hasCartesianSeries,
                    B = this.isDirtyBox,
                    w = this.renderer,
                    g = w.isHidden(),
                    v = [];
                this.setResponsive && this.setResponsive(!1);
                c.setAnimation(a,
                    this);
                g && this.temporaryDisplay();
                this.layOutTitles();
                for (a = d.length; a--;) {
                    var m = d[a];
                    if (m.options.stacking) {
                        var I = !0;
                        if (m.isDirty) {
                            var p = !0;
                            break
                        }
                    }
                }
                if (p)
                    for (a = d.length; a--;) m = d[a], m.options.stacking && (m.isDirty = !0);
                d.forEach(function(a) {
                    a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), t = !0) : l && (l.labelFormatter || l.labelFormat) && (t = !0));
                    a.isDirtyData && k(a, "updatedData")
                });
                t && e && e.options.enabled && (e.render(), this.isDirtyLegend = !1);
                I && this.getStacks();
                h && b.forEach(function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                h && (b.forEach(function(a) {
                    a.isDirty && (B = !0)
                }), b.forEach(function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, v.push(function() {
                        k(a, "afterSetExtremes", q(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (B || I) && a.redraw()
                }));
                B && this.drawChartBox();
                k(this, "predraw");
                d.forEach(function(a) {
                    (B || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                f && f.reset(!0);
                w.draw();
                k(this, "redraw");
                k(this, "render");
                g && this.temporaryDisplay(!0);
                v.forEach(function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }
                var d = this.series,
                    c;
                var f = v(this.axes, b) || v(this.series, b);
                for (c = 0; !f && c < d.length; c++) f = v(d[c].points || [], b);
                return f
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = m(b.xAxis || {});
                b = b.yAxis = m(b.yAxis || {});
                k(this, "getAxes");
                c.forEach(function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                b.forEach(function(a, b) {
                    a.index = b
                });
                c.concat(b).forEach(function(b) {
                    new d(a, b)
                });
                k(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var a = [];
                this.series.forEach(function(b) {
                    a =
                        a.concat((b[b.hasGroupedData ? "points" : "data"] || []).filter(function(a) {
                            return l(a.selectedStaging, a.selected)
                        }))
                });
                return a
            },
            getSelectedSeries: function() {
                return this.series.filter(function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, d) {
                this.applyDescription("title", a);
                this.applyDescription("subtitle", b);
                this.applyDescription("caption", void 0);
                this.layOutTitles(d)
            },
            applyDescription: function(a, b) {
                var d = this,
                    c = "title" === a ? {
                        color: "#333333",
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {
                        color: "#666666"
                    };
                c = this.options[a] = I(!this.styledMode && {
                    style: c
                }, this.options[a], b);
                var f = this[a];
                f && b && (this[a] = f = f.destroy());
                c && !f && (f = this.renderer.text(c.text, 0, 0, c.useHTML).attr({
                    align: c.align,
                    "class": "highcharts-" + a,
                    zIndex: c.zIndex || 4
                }).add(), f.update = function(b) {
                    d[{
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    } [a]](b)
                }, this.styledMode || f.css(c.style), this[a] = f)
            },
            layOutTitles: function(a) {
                var b = [0, 0, 0],
                    d = this.renderer,
                    c = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function(a) {
                    var f =
                        this[a],
                        e = this.options[a],
                        k = e.verticalAlign || "top";
                    a = "title" === a ? -3 : "top" === k ? b[0] + 2 : 0;
                    if (f) {
                        if (!this.styledMode) var l = e.style.fontSize;
                        l = d.fontMetrics(l, f).b;
                        f.css({
                            width: (e.width || c.width + (e.widthAdjust || 0)) + "px"
                        });
                        var t = f.getBBox(e.useHTML).height;
                        f.align(q({
                            y: "bottom" === k ? l : a + l,
                            height: t
                        }, e), !1, "spacingBox");
                        e.floating || ("top" === k ? b[0] = Math.ceil(b[0] + t) : "bottom" === k && (b[2] = Math.ceil(b[2] + t)))
                    }
                }, this);
                b[0] && "top" === (this.options.title.verticalAlign || "top") && (b[0] += this.options.title.margin);
                b[2] &&
                    "bottom" === this.options.caption.verticalAlign && (b[2] += this.options.caption.margin);
                var f = !this.titleOffset || this.titleOffset.join(",") !== b.join(",");
                this.titleOffset = b;
                !this.isDirtyBox && f && (this.isDirtyBox = this.isDirtyLegend = f, this.hasRendered && l(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var a = this.options.chart,
                    b = a.width;
                a = a.height;
                var d = this.renderTo;
                D(b) || (this.containerWidth = c.getStyle(d, "width"));
                D(a) || (this.containerHeight = c.getStyle(d, "height"));
                this.chartWidth = Math.max(0,
                    b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, c.relativeLength(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(b) {
                var d = this.renderTo;
                if (b)
                    for (; d && d.style;) d.hcOrigStyle && (c.css(d, d.hcOrigStyle), delete d.hcOrigStyle), d.hcOrigDetached && (a.body.removeChild(d), d.hcOrigDetached = !1), d = d.parentNode;
                else
                    for (; d && d.style;) {
                        a.body.contains(d) || d.parentNode || (d.hcOrigDetached = !0, a.body.appendChild(d));
                        if ("none" === c.getStyle(d, "display", !1) || d.hcOricDetached) d.hcOrigStyle = {
                            display: d.style.display,
                            height: d.style.height,
                            overflow: d.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, d !== this.renderTo && (b.height = 0), c.css(d, b), d.offsetWidth || d.style.setProperty("display", "block", "important");
                        d = d.parentNode;
                        if (d === a.body) break
                    }
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var b = this.options,
                    d = b.chart;
                var e = this.renderTo;
                var l = c.uniqueKey(),
                    t, h;
                e || (this.renderTo = e = d.renderTo);
                y(e) && (this.renderTo = e = a.getElementById(e));
                e || c.error(13, !0, this);
                var B = x(A(e, "data-highcharts-chart"));
                u(B) && r[B] && r[B].hasRendered && r[B].destroy();
                A(e, "data-highcharts-chart", this.index);
                e.innerHTML = "";
                d.skipClone || e.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                B = this.chartWidth;
                var w = this.chartHeight;
                E(e, {
                    overflow: "hidden"
                });
                this.styledMode || (t = q({
                    position: "relative",
                    overflow: "hidden",
                    width: B + "px",
                    height: w + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, d.style));
                this.container =
                    e = f("div", {
                        id: l
                    }, t, e);
                this._cursor = e.style.cursor;
                this.renderer = new(c[d.renderer] || c.Renderer)(e, B, w, null, d.forExport, b.exporting && b.exporting.allowHTML, this.styledMode);
                this.setClassName(d.className);
                if (this.styledMode)
                    for (h in b.defs) this.renderer.definition(b.defs[h]);
                else this.renderer.setStyle(d.style);
                this.renderer.chartIndex = this.index;
                k(this, "afterGetContainer")
            },
            getMargins: function(a) {
                var b = this.spacing,
                    d = this.margin,
                    c = this.titleOffset;
                this.resetMargins();
                c[0] && !D(d[0]) && (this.plotTop = Math.max(this.plotTop,
                    c[0] + b[0]));
                c[2] && !D(d[2]) && (this.marginBottom = Math.max(this.marginBottom, c[2] + b[2]));
                this.legend && this.legend.display && this.legend.adjustMargins(d, b);
                k(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    d = a.colorAxis,
                    c = a.margin,
                    f = function(a) {
                        a.forEach(function(a) {
                            a.visible && a.getOffset()
                        })
                    };
                a.hasCartesianSeries ? f(a.axes) : d && d.length && f(d);
                B.forEach(function(d, f) {
                    D(c[f]) || (a[d] += b[f])
                });
                a.setChartSize()
            },
            reflow: function(b) {
                var d = this,
                    f = d.options.chart,
                    e = d.renderTo,
                    k = D(f.width) && D(f.height),
                    l = f.width || c.getStyle(e, "width");
                f = f.height || c.getStyle(e, "height");
                e = b ? b.target : R;
                if (!k && !d.isPrinting && l && f && (e === R || e === a)) {
                    if (l !== d.containerWidth || f !== d.containerHeight) c.clearTimeout(d.reflowTimeout), d.reflowTimeout = T(function() {
                        d.container && d.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    d.containerWidth = l;
                    d.containerHeight = f
                }
            },
            setReflow: function(a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow =
                    p(R, "resize", function(a) {
                        b.options && b.reflow(a)
                    }), p(this, "destroy", this.unbindReflow))
            },
            setSize: function(a, d, f) {
                var e = this,
                    l = e.renderer;
                e.isResizing += 1;
                c.setAnimation(f, e);
                e.oldChartHeight = e.chartHeight;
                e.oldChartWidth = e.chartWidth;
                void 0 !== a && (e.options.chart.width = a);
                void 0 !== d && (e.options.chart.height = d);
                e.getChartSize();
                if (!e.styledMode) {
                    var t = l.globalAnimation;
                    (t ? g : E)(e.container, {
                        width: e.chartWidth + "px",
                        height: e.chartHeight + "px"
                    }, t)
                }
                e.setChartSize(!0);
                l.setSize(e.chartWidth, e.chartHeight, f);
                e.axes.forEach(function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                e.isDirtyLegend = !0;
                e.isDirtyBox = !0;
                e.layOutTitles();
                e.getMargins();
                e.redraw(f);
                e.oldChartHeight = null;
                k(e, "resize");
                T(function() {
                    e && k(e, "endResize", null, function() {
                        --e.isResizing
                    })
                }, b(t).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    d = this.renderer,
                    c = this.chartWidth,
                    f = this.chartHeight,
                    e = this.options.chart,
                    l = this.spacing,
                    t = this.clipOffset,
                    B, h, w, g;
                this.plotLeft = B = Math.round(this.plotLeft);
                this.plotTop = h = Math.round(this.plotTop);
                this.plotWidth =
                    w = Math.max(0, Math.round(c - B - this.marginRight));
                this.plotHeight = g = Math.max(0, Math.round(f - h - this.marginBottom));
                this.plotSizeX = b ? g : w;
                this.plotSizeY = b ? w : g;
                this.plotBorderWidth = e.plotBorderWidth || 0;
                this.spacingBox = d.spacingBox = {
                    x: l[3],
                    y: l[0],
                    width: c - l[3] - l[1],
                    height: f - l[0] - l[2]
                };
                this.plotBox = d.plotBox = {
                    x: B,
                    y: h,
                    width: w,
                    height: g
                };
                c = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(c, t[3]) / 2);
                d = Math.ceil(Math.max(c, t[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: d,
                    width: Math.floor(this.plotSizeX - Math.max(c, t[1]) /
                        2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(c, t[2]) / 2 - d))
                };
                a || this.axes.forEach(function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                k(this, "afterSetChartSize", {
                    skipAxes: a
                })
            },
            resetMargins: function() {
                k(this, "resetMargins");
                var a = this,
                    b = a.options.chart;
                ["margin", "spacing"].forEach(function(d) {
                    var c = b[d],
                        f = L(c) ? c : [c, c, c, c];
                    ["Top", "Right", "Bottom", "Left"].forEach(function(c, e) {
                        a[d][e] = l(b[d + c], f[e])
                    })
                });
                B.forEach(function(b, d) {
                    a[b] = l(a.margin[d], a.spacing[d])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    b = this.renderer,
                    d = this.chartWidth,
                    c = this.chartHeight,
                    f = this.chartBackground,
                    e = this.plotBackground,
                    l = this.plotBorder,
                    t = this.styledMode,
                    B = this.plotBGImage,
                    h = a.backgroundColor,
                    w = a.plotBackgroundColor,
                    g = a.plotBackgroundImage,
                    q, v = this.plotLeft,
                    m = this.plotTop,
                    I = this.plotWidth,
                    p = this.plotHeight,
                    r = this.plotBox,
                    K = this.clipRect,
                    x = this.clipBox,
                    J = "animate";
                f || (this.chartBackground = f = b.rect().addClass("highcharts-background").add(), J = "attr");
                if (t) var n =
                    q = f.strokeWidth();
                else {
                    n = a.borderWidth || 0;
                    q = n + (a.shadow ? 8 : 0);
                    h = {
                        fill: h || "none"
                    };
                    if (n || f["stroke-width"]) h.stroke = a.borderColor, h["stroke-width"] = n;
                    f.attr(h).shadow(a.shadow)
                }
                f[J]({
                    x: q / 2,
                    y: q / 2,
                    width: d - q - n % 2,
                    height: c - q - n % 2,
                    r: a.borderRadius
                });
                J = "animate";
                e || (J = "attr", this.plotBackground = e = b.rect().addClass("highcharts-plot-background").add());
                e[J](r);
                t || (e.attr({
                    fill: w || "none"
                }).shadow(a.plotShadow), g && (B ? B.animate(r) : this.plotBGImage = b.image(g, v, m, I, p).add()));
                K ? K.animate({
                        width: x.width,
                        height: x.height
                    }) :
                    this.clipRect = b.clipRect(x);
                J = "animate";
                l || (J = "attr", this.plotBorder = l = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                t || l.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                l[J](l.crisp({
                    x: v,
                    y: m,
                    width: I,
                    height: p
                }, -l.strokeWidth()));
                this.isDirtyBox = !1;
                k(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    d, c = a.options.series,
                    f, e;
                ["inverted", "angular", "polar"].forEach(function(k) {
                    d = K[b.type || b.defaultSeriesType];
                    e = b[k] ||
                        d && d.prototype[k];
                    for (f = c && c.length; !e && f--;)(d = K[c[f].type]) && d.prototype[k] && (e = !0);
                    a[k] = e
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                b.forEach(function(a) {
                    a.linkedSeries.length = 0
                });
                b.forEach(function(b) {
                    var d = b.options.linkedTo;
                    y(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && d.linkedParent !== b && (d.linkedSeries.push(b), b.linkedParent = d, b.visible = l(b.options.visible, d.options.visible, b.visible))
                });
                k(this, "afterLinkSeries")
            },
            renderSeries: function() {
                this.series.forEach(function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && b.items.forEach(function(d) {
                    var c = q(b.style, d.style),
                        f = x(c.left) + a.plotLeft,
                        e = x(c.top) + a.plotTop + 12;
                    delete c.left;
                    delete c.top;
                    a.renderer.text(d.html, f, e).attr({
                        zIndex: 2
                    }).css(c).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.colorAxis,
                    d = this.renderer,
                    c = this.options,
                    f = 0,
                    e = function(a) {
                        a.forEach(function(a) {
                            a.visible && a.render()
                        })
                    };
                this.setTitle();
                this.legend = new t(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                a.some(function(a) {
                    if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return f = 21, !0
                });
                var k = this.plotHeight = Math.max(this.plotHeight - f, 0);
                a.forEach(function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                var l = 1.1 < c / this.plotWidth;
                var h = 1.05 < k / this.plotHeight;
                if (l || h) a.forEach(function(a) {
                    (a.horiz && l || !a.horiz && h) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? e(a) : b && b.length && e(b);
                this.seriesGroup || (this.seriesGroup =
                    d.g("series-group").attr({
                        zIndex: 3
                    }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.updateContainerScaling();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = I(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                        a.href && (R.location.href = a.href)
                    }).attr({
                        align: a.position.align,
                        zIndex: 8
                    }), b.styledMode || this.credits.css(a.style),
                    this.credits.add().align(a.position), this.credits.update = function(a) {
                        b.credits = b.credits.destroy();
                        b.addCredits(a)
                    })
            },
            updateContainerScaling: function() {
                var a = this.container;
                if (a.offsetWidth && a.offsetHeight && a.getBoundingClientRect) {
                    var b = a.getBoundingClientRect(),
                        d = b.width / a.offsetWidth;
                    a = b.height / a.offsetHeight;
                    1 !== d || 1 !== a ? this.containerScaling = {
                        scaleX: d,
                        scaleY: a
                    } : delete this.containerScaling
                }
            },
            destroy: function() {
                var a = this,
                    b = a.axes,
                    d = a.series,
                    f = a.container,
                    e, l = f && f.parentNode;
                k(a, "destroy");
                a.renderer.forExport ?
                    F(r, a) : r[a.index] = void 0;
                c.chartCount--;
                a.renderTo.removeAttribute("data-highcharts-chart");
                J(a);
                for (e = b.length; e--;) b[e] = b[e].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (e = d.length; e--;) d[e] = d[e].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(b) {
                    var d = a[b];
                    d && d.destroy && (a[b] = d.destroy())
                });
                f && (f.innerHTML = "", J(f),
                    l && h(f));
                C(a, function(b, d) {
                    delete a[d]
                })
            },
            firstRender: function() {
                var a = this,
                    b = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    (z(b.series) ? b.series : []).forEach(function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    k(a, "beforeRender");
                    w && (a.pointer = new w(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function() {
                this.callbacks.concat([this.callback]).forEach(function(a) {
                    a && void 0 !==
                        this.index && a.apply(this, [this])
                }, this);
                k(this, "load");
                k(this, "render");
                D(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    });
    N(H, "parts/ScrollablePlotArea.js", [H["parts/Globals.js"]], function(c) {
        var n = c.addEvent,
            A = c.Chart;
        "";
        n(A, "afterSetChartSize", function(n) {
            var A = this.options.chart.scrollablePlotArea,
                z = A && A.minWidth;
            A = A && A.minHeight;
            if (!this.renderer.forExport) {
                if (z) {
                    if (this.scrollablePixelsX = z = Math.max(0, z - this.chartWidth)) {
                        this.plotWidth += z;
                        this.inverted ? (this.clipBox.height +=
                            z, this.plotBox.height += z) : (this.clipBox.width += z, this.plotBox.width += z);
                        var u = {
                            1: {
                                name: "right",
                                value: z
                            }
                        }
                    }
                } else A && (this.scrollablePixelsY = z = Math.max(0, A - this.chartHeight)) && (this.plotHeight += z, this.inverted ? (this.clipBox.width += z, this.plotBox.width += z) : (this.clipBox.height += z, this.plotBox.height += z), u = {
                    2: {
                        name: "bottom",
                        value: z
                    }
                });
                u && !n.skipAxes && this.axes.forEach(function(n) {
                    u[n.side] ? n.getPlotLinePath = function() {
                        var y = u[n.side].name,
                            z = this[y];
                        this[y] = z - u[n.side].value;
                        var x = c.Axis.prototype.getPlotLinePath.apply(this,
                            arguments);
                        this[y] = z;
                        return x
                    } : (n.setAxisSize(), n.setAxisTranslation())
                })
            }
        });
        n(A, "render", function() {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        A.prototype.setUpScrolling = function() {
            var n = {
                WebkitOverflowScrolling: "touch",
                overflowX: "hidden",
                overflowY: "hidden"
            };
            this.scrollablePixelsX && (n.overflowX = "auto");
            this.scrollablePixelsY && (n.overflowY = "auto");
            this.scrollingContainer = c.createElement("div", {
                    className: "highcharts-scrolling"
                },
                n, this.renderTo);
            this.innerContainer = c.createElement("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        A.prototype.moveFixedElements = function() {
            var c = this.container,
                n = this.fixedRenderer,
                z = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-reset-zoom .highcharts-subtitle .highcharts-title .highcharts-legend-checkbox".split(" "),
                u;
            this.scrollablePixelsX && !this.inverted ? u = ".highcharts-yaxis" :
                this.scrollablePixelsX && this.inverted ? u = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? u = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (u = ".highcharts-yaxis");
            z.push(u, u + "-labels");
            z.forEach(function(u) {
                [].forEach.call(c.querySelectorAll(u), function(c) {
                    (c.namespaceURI === n.SVG_NS ? n.box : n.box.parentNode).appendChild(c);
                    c.style.pointerEvents = "auto"
                })
            })
        };
        A.prototype.applyFixed = function() {
            var A, F = !this.fixedDiv,
                z = this.options.chart.scrollablePlotArea;
            F ? (this.fixedDiv = c.createElement("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = A = new c.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight), this.scrollableMask = A.path().attr({
                    fill: c.color(this.options.chart.backgroundColor || "#fff").setOpacity(c.pick(z.opacity, .85)).get(),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(),
                n(this, "afterShowResetZoom", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            A = this.chartWidth + (this.scrollablePixelsX || 0);
            var u = this.chartHeight + (this.scrollablePixelsY || 0);
            c.stop(this.container);
            this.container.style.width = A + "px";
            this.container.style.height = u + "px";
            this.renderer.boxWrapper.attr({
                width: A,
                height: u,
                viewBox: [0, 0, A, u].join(" ")
            });
            this.chartBackground.attr({
                width: A,
                height: u
            });
            this.scrollablePixelsY && (this.scrollingContainer.style.height = this.chartHeight +
                "px");
            F && (z.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * z.scrollPositionX), z.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * z.scrollPositionY));
            u = this.axisOffset;
            F = this.plotTop - u[0] - 1;
            z = this.plotLeft - u[3] - 1;
            A = this.plotTop + this.plotHeight + u[2] + 1;
            u = this.plotLeft + this.plotWidth + u[1] + 1;
            var L = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                y = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            F = this.scrollablePixelsX ? ["M", 0, F, "L",
                this.plotLeft - 1, F, "L", this.plotLeft - 1, A, "L", 0, A, "Z", "M", L, F, "L", this.chartWidth, F, "L", this.chartWidth, A, "L", L, A, "Z"
            ] : this.scrollablePixelsY ? ["M", z, 0, "L", z, this.plotTop - 1, "L", u, this.plotTop - 1, "L", u, 0, "Z", "M", z, y, "L", z, this.chartHeight, "L", u, this.chartHeight, "L", u, y, "Z"] : ["M", 0, 0];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: F
            })
        }
    });
    N(H, "parts/Point.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.erase,
            F = n.isArray,
            z = n.isNumber,
            u = n.isObject,
            L,
            y = c.extend,
            C = c.fireEvent,
            x = c.format,
            m = c.pick,
            p = c.uniqueKey,
            g = c.removeEvent;
        c.Point = L = function() {};
        c.Point.prototype = {
            init: function(b, a, d) {
                this.series = b;
                this.applyOptions(a, d);
                this.id = A(this.id) ? this.id : p();
                this.resolveColor();
                b.chart.pointCount++;
                C(this, "afterInit");
                return this
            },
            resolveColor: function() {
                var b = this.series;
                var a = b.chart.options.chart.colorCount;
                var d = b.chart.styledMode;
                d || this.options.color || (this.color = b.color);
                b.options.colorByPoint ? (d || (a = b.options.colors || b.chart.options.colors,
                    this.color = this.color || a[b.colorCounter], a = a.length), d = b.colorCounter, b.colorCounter++, b.colorCounter === a && (b.colorCounter = 0)) : d = b.colorIndex;
                this.colorIndex = m(this.colorIndex, d)
            },
            applyOptions: function(b, a) {
                var d = this.series,
                    c = d.options.pointValKey || d.pointValKey;
                b = L.prototype.optionsToObject.call(this, b);
                y(this, b);
                this.options = this.options ? y(this.options, b) : b;
                b.group && delete this.group;
                b.dataLabels && delete this.dataLabels;
                c && (this.y = this[c]);
                this.formatPrefix = (this.isNull = m(this.isValid && !this.isValid(),
                    null === this.x || !z(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && void 0 === a && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                void 0 === this.x && d && (this.x = void 0 === a ? d.autoIncrement(this) : a);
                return this
            },
            setNestedProperty: function(b, a, d) {
                d.split(".").reduce(function(b, d, c, g) {
                    b[d] = g.length - 1 === c ? a : u(b[d], !0) ? b[d] : {};
                    return b[d]
                }, b);
                return b
            },
            optionsToObject: function(b) {
                var a = {},
                    d = this.series,
                    f = d.options.keys,
                    e = f || d.pointArrayMap || ["y"],
                    h = e.length,
                    g = 0,
                    m = 0;
                if (z(b) ||
                    null === b) a[e[0]] = b;
                else if (F(b))
                    for (!f && b.length > h && (d = typeof b[0], "string" === d ? a.name = b[0] : "number" === d && (a.x = b[0]), g++); m < h;) f && void 0 === b[g] || (0 < e[m].indexOf(".") ? c.Point.prototype.setNestedProperty(a, b[g], e[m]) : a[e[m]] = b[g]), g++, m++;
                else "object" === typeof b && (a = b, b.dataLabels && (d._hasPointLabels = !0), b.marker && (d._hasPointMarkers = !0));
                return a
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" :
                    "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function() {
                var b = this.series,
                    a = b.zones;
                b = b.zoneAxis || "y";
                var d = 0,
                    c;
                for (c = a[d]; this[b] >= c.value;) c = a[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = c && c.color && !this.options.color ? c.color : this.nonZonedColor;
                return c
            },
            destroy: function() {
                var b = this.series.chart,
                    a = b.hoverPoints,
                    d;
                b.pointCount--;
                a && (this.setState(), D(a, this), a.length || (b.hoverPoints = null));
                if (this === b.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel || this.dataLabels) g(this), this.destroyElements();
                this.legendItem && b.legend.destroyItem(this);
                for (d in this) this[d] = null
            },
            destroyElements: function(b) {
                var a = this,
                    d = [],
                    c;
                b = b || {
                    graphic: 1,
                    dataLabel: 1
                };
                b.graphic && d.push("graphic", "shadowGroup");
                b.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                for (c = d.length; c--;) {
                    var e = d[c];
                    a[e] &&
                        (a[e] = a[e].destroy())
                } ["dataLabel", "connector"].forEach(function(d) {
                    var c = d + "s";
                    b[d] && a[c] && (a[c].forEach(function(a) {
                        a.element && a.destroy()
                    }), delete a[c])
                })
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(b) {
                var a = this.series,
                    d = a.tooltipOptions,
                    c = m(d.valueDecimals, ""),
                    e = d.valuePrefix || "",
                    h = d.valueSuffix ||
                    "";
                a.chart.styledMode && (b = a.chart.tooltip.styledModeFormat(b));
                (a.pointArrayMap || ["y"]).forEach(function(a) {
                    a = "{point." + a;
                    if (e || h) b = b.replace(RegExp(a + "}", "g"), e + a + "}" + h);
                    b = b.replace(RegExp(a + "}", "g"), a + ":,." + c + "f}")
                });
                return x(b, {
                    point: this,
                    series: this.series
                }, a.chart.time)
            },
            firePointEvent: function(b, a, d) {
                var c = this,
                    e = this.series.options;
                (e.point.events[b] || c.options && c.options.events && c.options.events[b]) && this.importEvents();
                "click" === b && e.allowPointSelect && (d = function(a) {
                    c.select && c.select(null,
                        a.ctrlKey || a.metaKey || a.shiftKey)
                });
                C(this, b, a, d)
            },
            visible: !0
        }
    });
    N(H, "parts/Series.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.erase,
            F = n.isArray,
            z = n.isNumber,
            u = n.isString,
            L = n.objectEach,
            y = n.splat,
            C = c.addEvent,
            x = c.animObject,
            m = c.arrayMax,
            p = c.arrayMin,
            g = c.correctFloat,
            b = c.defaultOptions,
            a = c.defaultPlotOptions,
            d = c.extend,
            f = c.fireEvent,
            e = c.merge,
            h = c.pick,
            r = c.removeEvent,
            E = c.SVGElement,
            q = c.syncTimeout,
            v = c.win;
        c.Series = c.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : c.numberFormat(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            axisTypes: ["xAxis", "yAxis"],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            isCartesian: !0,
            parallelArrays: ["x", "y"],
            pointClass: c.Point,
            requireSorting: !0,
            sorted: !0,
            init: function(a,
                b) {
                f(this, "init", {
                    options: b
                });
                var e = this,
                    k = a.series,
                    t;
                this.eventOptions = this.eventOptions || {};
                e.chart = a;
                e.options = b = e.setOptions(b);
                e.linkedSeries = [];
                e.bindAxes();
                d(e, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                var l = b.events;
                L(l, function(a, b) {
                    c.isFunction(a) && e.eventOptions[b] !== a && (c.isFunction(e.eventOptions[b]) && r(e, b, e.eventOptions[b]), e.eventOptions[b] = a, C(e, b, a))
                });
                if (l && l.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                e.getColor();
                e.getSymbol();
                e.parallelArrays.forEach(function(a) {
                    e[a + "Data"] || (e[a + "Data"] = [])
                });
                e.points || e.data || e.setData(b.data, !1);
                e.isCartesian && (a.hasCartesianSeries = !0);
                k.length && (t = k[k.length - 1]);
                e._i = h(t && t._i, -1) + 1;
                a.orderSeries(this.insert(k));
                f(this, "afterInit")
            },
            insert: function(a) {
                var b = this.options.index,
                    d;
                if (z(b)) {
                    for (d = a.length; d--;)
                        if (b >= h(a[d].options.index, a[d]._i)) {
                            a.splice(d + 1, 0, this);
                            break
                        } - 1 === d && a.unshift(this);
                    d += 1
                } else a.push(this);
                return h(d, a.length - 1)
            },
            bindAxes: function() {
                var a =
                    this,
                    b = a.options,
                    d = a.chart,
                    e;
                f(this, "bindAxes", null, function() {
                    (a.axisTypes || []).forEach(function(f) {
                        d[f].forEach(function(d) {
                            e = d.options;
                            if (b[f] === e.index || void 0 !== b[f] && b[f] === e.id || void 0 === b[f] && 0 === e.index) a.insert(d.series), a[f] = d, d.isDirty = !0
                        });
                        a[f] || a.optionalAxis === f || c.error(18, !0, d)
                    })
                })
            },
            updateParallelArrays: function(a, b) {
                var d = a.series,
                    c = arguments,
                    f = z(b) ? function(c) {
                        var f = "y" === c && d.toYData ? d.toYData(a) : a[c];
                        d[c + "Data"][b] = f
                    } : function(a) {
                        Array.prototype[b].apply(d[a + "Data"], Array.prototype.slice.call(c,
                            2))
                    };
                d.parallelArrays.forEach(f)
            },
            hasData: function() {
                return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.yData && 0 < this.yData.length
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    d, c = a.pointIntervalUnit,
                    f = this.chart.time;
                b = h(b, a.pointStart, 0);
                this.pointInterval = d = h(this.pointInterval, a.pointInterval, 1);
                c && (a = new f.Date(b), "day" === c ? f.set("Date", a, f.get("Date", a) + d) : "month" === c ? f.set("Month", a, f.get("Month", a) + d) : "year" === c && f.set("FullYear", a, f.get("FullYear",
                    a) + d), d = a.getTime() - b);
                this.xIncrement = b + d;
                return b
            },
            setOptions: function(a) {
                var d = this.chart,
                    c = d.options,
                    k = c.plotOptions,
                    w = d.userOptions || {};
                a = e(a);
                d = d.styledMode;
                var l = {
                    plotOptions: k,
                    userOptions: a
                };
                f(this, "setOptions", l);
                var g = l.plotOptions[this.type],
                    q = w.plotOptions || {};
                this.userOptions = l.userOptions;
                w = e(g, k.series, w.plotOptions && w.plotOptions[this.type], a);
                this.tooltipOptions = e(b.tooltip, b.plotOptions.series && b.plotOptions.series.tooltip, b.plotOptions[this.type].tooltip, c.tooltip.userOptions, k.series &&
                    k.series.tooltip, k[this.type].tooltip, a.tooltip);
                this.stickyTracking = h(a.stickyTracking, q[this.type] && q[this.type].stickyTracking, q.series && q.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : w.stickyTracking);
                null === g.marker && delete w.marker;
                this.zoneAxis = w.zoneAxis;
                c = this.zones = (w.zones || []).slice();
                !w.negativeColor && !w.negativeFillColor || w.zones || (k = {
                    value: w[this.zoneAxis + "Threshold"] || w.threshold || 0,
                    className: "highcharts-negative"
                }, d || (k.color = w.negativeColor, k.fillColor =
                    w.negativeFillColor), c.push(k));
                c.length && A(c[c.length - 1].value) && c.push(d ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                f(this, "afterSetOptions", {
                    options: w
                });
                return w
            },
            getName: function() {
                return h(this.options.name, "Series " + (this.index + 1))
            },
            getCyclic: function(a, b, d) {
                var c = this.chart,
                    f = this.userOptions,
                    e = a + "Index",
                    k = a + "Counter",
                    t = d ? d.length : h(c.options.chart[a + "Count"], c[a + "Count"]);
                if (!b) {
                    var B = h(f[e], f["_" + e]);
                    A(B) || (c.series.length || (c[k] = 0), f["_" + e] = B = c[k] % t, c[k] += 1);
                    d && (b = d[B])
                }
                void 0 !== B &&
                    (this[e] = B);
                this[a] = b
            },
            getColor: function() {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || a[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            findPointIndex: function(a, b) {
                var d = a.id;
                a = a.x;
                var c = this.points,
                    f;
                if (d) {
                    var e = (d = this.chart.get(d)) && d.index;
                    void 0 !== e && (f = !0)
                }
                void 0 === e && z(a) && (e = this.xData.indexOf(a, b)); -
                1 !== e && void 0 !== e && this.cropped && (e = e >= this.cropStart ? e - this.cropStart : e);
                !f && c[e] && c[e].touched && (e = void 0);
                return e
            },
            drawLegendSymbol: c.LegendSymbolMixin.drawLineMarker,
            updateData: function(a) {
                var b = this.options,
                    d = this.points,
                    c = [],
                    f, e, k, h = this.requireSorting,
                    g = a.length === d.length,
                    q = !0;
                this.xIncrement = null;
                a.forEach(function(a, e) {
                    var l = A(a) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, a) || {};
                    var t = l.x;
                    if (l.id || z(t))
                        if (t = this.findPointIndex(l, k), -1 === t || void 0 === t ? c.push(a) : d[t] &&
                            a !== b.data[t] ? (d[t].update(a, !1, null, !1), d[t].touched = !0, h && (k = t + 1)) : d[t] && (d[t].touched = !0), !g || e !== t || this.hasDerivedData) f = !0
                }, this);
                if (f)
                    for (a = d.length; a--;)(e = d[a]) && !e.touched && e.remove(!1);
                else g ? a.forEach(function(a, b) {
                    d[b].update && a !== d[b].y && d[b].update(a, !1, null, !1)
                }) : q = !1;
                d.forEach(function(a) {
                    a && (a.touched = !1)
                });
                if (!q) return !1;
                c.forEach(function(a) {
                    this.addPoint(a, !1, null, null, !1)
                }, this);
                return !0
            },
            setData: function(a, b, d, f) {
                var e = this,
                    k = e.points,
                    t = k && k.length || 0,
                    g, q = e.options,
                    v = e.chart,
                    m = null,
                    B = e.xAxis,
                    p = q.turboThreshold,
                    I = this.xData,
                    r = this.yData,
                    x = (g = e.pointArrayMap) && g.length,
                    n = q.keys,
                    y = 0,
                    E = 1,
                    A;
                a = a || [];
                g = a.length;
                b = h(b, !0);
                !1 !== f && g && t && !e.cropped && !e.hasGroupedData && e.visible && !e.isSeriesBoosting && (A = this.updateData(a));
                if (!A) {
                    e.xIncrement = null;
                    e.colorCounter = 0;
                    this.parallelArrays.forEach(function(a) {
                        e[a + "Data"].length = 0
                    });
                    if (p && g > p) {
                        for (d = 0; null === m && d < g;) m = a[d], d++;
                        if (z(m))
                            for (d = 0; d < g; d++) I[d] = this.autoIncrement(), r[d] = a[d];
                        else if (F(m))
                            if (x)
                                for (d = 0; d < g; d++) m = a[d], I[d] = m[0],
                                    r[d] = m.slice(1, x + 1);
                            else
                                for (n && (y = n.indexOf("x"), E = n.indexOf("y"), y = 0 <= y ? y : 0, E = 0 <= E ? E : 1), d = 0; d < g; d++) m = a[d], I[d] = m[y], r[d] = m[E];
                        else c.error(12, !1, v)
                    } else
                        for (d = 0; d < g; d++) void 0 !== a[d] && (m = {
                            series: e
                        }, e.pointClass.prototype.applyOptions.apply(m, [a[d]]), e.updateParallelArrays(m, d));
                    r && u(r[0]) && c.error(14, !0, v);
                    e.data = [];
                    e.options.data = e.userOptions.data = a;
                    for (d = t; d--;) k[d] && k[d].destroy && k[d].destroy();
                    B && (B.minRange = B.userMinRange);
                    e.isDirty = v.isDirtyBox = !0;
                    e.isDirtyData = !!k;
                    d = !1
                }
                "point" === q.legendType &&
                    (this.processData(), this.generatePoints());
                b && v.redraw(d)
            },
            processData: function(a) {
                var b = this.xData,
                    d = this.yData,
                    f = b.length;
                var e = 0;
                var k = this.xAxis,
                    h = this.options;
                var g = h.cropThreshold;
                var q = this.getExtremesFromAll || h.getExtremesFromAll,
                    m = this.isCartesian;
                h = k && k.val2lin;
                var v = k && k.isLog,
                    p = this.requireSorting;
                if (m && !this.isDirty && !k.isDirty && !this.yAxis.isDirty && !a) return !1;
                if (k) {
                    a = k.getExtremes();
                    var r = a.min;
                    var x = a.max
                }
                if (m && this.sorted && !q && (!g || f > g || this.forceCrop))
                    if (b[f - 1] < r || b[0] > x) b = [], d = [];
                    else if (this.yData && (b[0] < r || b[f - 1] > x)) {
                    e = this.cropData(this.xData, this.yData, r, x);
                    b = e.xData;
                    d = e.yData;
                    e = e.start;
                    var n = !0
                }
                for (g = b.length || 1; --g;)
                    if (f = v ? h(b[g]) - h(b[g - 1]) : b[g] - b[g - 1], 0 < f && (void 0 === u || f < u)) var u = f;
                    else 0 > f && p && (c.error(15, !1, this.chart), p = !1);
                this.cropped = n;
                this.cropStart = e;
                this.processedXData = b;
                this.processedYData = d;
                this.closestPointRange = this.basePointRange = u
            },
            cropData: function(a, b, d, c, f) {
                var e = a.length,
                    k = 0,
                    t = e,
                    g;
                f = h(f, this.cropShoulder);
                for (g = 0; g < e; g++)
                    if (a[g] >= d) {
                        k = Math.max(0,
                            g - f);
                        break
                    } for (d = g; d < e; d++)
                    if (a[d] > c) {
                        t = d + f;
                        break
                    } return {
                    xData: a.slice(k, t),
                    yData: b.slice(k, t),
                    start: k,
                    end: t
                }
            },
            generatePoints: function() {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    e, h = this.processedXData,
                    l = this.processedYData,
                    g = this.pointClass,
                    q = h.length,
                    m = this.cropStart || 0,
                    v = this.hasGroupedData;
                a = a.keys;
                var p = [],
                    r;
                c || v || (c = [], c.length = b.length, c = this.data = c);
                a && v && (this.options.keys = !1);
                for (r = 0; r < q; r++) {
                    var x = m + r;
                    if (v) {
                        var n = (new g).init(this, [h[r]].concat(y(l[r])));
                        n.dataGroup = this.groupMap[r];
                        n.dataGroup.options &&
                            (n.options = n.dataGroup.options, d(n, n.dataGroup.options), delete n.dataLabels)
                    } else(n = c[x]) || void 0 === b[x] || (c[x] = n = (new g).init(this, b[x], h[r]));
                    n && (n.index = x, p[r] = n)
                }
                this.options.keys = a;
                if (c && (q !== (e = c.length) || v))
                    for (r = 0; r < e; r++) r !== m || v || (r += q), c[r] && (c[r].destroyElements(), c[r].plotX = void 0);
                this.data = c;
                this.points = p;
                f(this, "afterGeneratePoints")
            },
            getXExtremes: function(a) {
                return {
                    min: p(a),
                    max: m(a)
                }
            },
            getExtremes: function(a) {
                var b = this.xAxis,
                    d = this.yAxis,
                    c = this.processedXData || this.xData,
                    e = [],
                    k = 0,
                    h = 0;
                var g = 0;
                var q = this.requireSorting ? this.cropShoulder : 0,
                    v = d ? d.positiveValuesOnly : !1,
                    r;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                b && (g = b.getExtremes(), h = g.min, g = g.max);
                for (r = 0; r < d; r++) {
                    var x = c[r];
                    var n = a[r];
                    var u = (z(n) || F(n)) && (n.length || 0 < n || !v);
                    x = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !b || (c[r + q] || x) >= h && (c[r - q] || x) <= g;
                    if (u && x)
                        if (u = n.length)
                            for (; u--;) z(n[u]) && (e[k++] = n[u]);
                        else e[k++] = n
                }
                this.dataMin = p(e);
                this.dataMax = m(e);
                f(this, "afterGetExtremes")
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    d = this.xAxis,
                    c = d.categories,
                    e = this.yAxis,
                    l = this.points,
                    q = l.length,
                    m = !!this.modifyValue,
                    v, p = this.pointPlacementToXValue(),
                    r = z(p),
                    n = a.threshold,
                    x = a.startFromThreshold ? n : 0,
                    u, y = this.zoneAxis || "y",
                    E = Number.MAX_VALUE;
                for (v = 0; v < q; v++) {
                    var C = l[v],
                        L = C.x;
                    var D = C.y;
                    var H = C.low,
                        N = b && e.stacks[(this.negStacks && D < (x ? 0 : n) ? "-" : "") + this.stackKey];
                    e.positiveValuesOnly && null !== D && 0 >= D && (C.isNull = !0);
                    C.plotX =
                        u = g(Math.min(Math.max(-1E5, d.translate(L, 0, 0, 0, 1, p, "flags" === this.type)), 1E5));
                    if (b && this.visible && N && N[L]) {
                        var W = this.getStackIndicator(W, L, this.index);
                        if (!C.isNull) {
                            var P = N[L];
                            var X = P.points[W.key]
                        }
                    }
                    F(X) && (H = X[0], D = X[1], H === x && W.key === N[L].base && (H = h(z(n) && n, e.min)), e.positiveValuesOnly && 0 >= H && (H = null), C.total = C.stackTotal = P.total, C.percentage = P.total && C.y / P.total * 100, C.stackY = D, this.irregularWidths || P.setOffset(this.pointXOffset || 0, this.barW || 0));
                    C.yBottom = A(H) ? Math.min(Math.max(-1E5, e.translate(H,
                        0, 1, 0, 1)), 1E5) : null;
                    m && (D = this.modifyValue(D, C));
                    C.plotY = D = "number" === typeof D && Infinity !== D ? Math.min(Math.max(-1E5, e.translate(D, 0, 1, 0, 1)), 1E5) : void 0;
                    C.isInside = void 0 !== D && 0 <= D && D <= e.len && 0 <= u && u <= d.len;
                    C.clientX = r ? g(d.translate(L, 0, 0, 0, 1, p)) : u;
                    C.negative = C[y] < (a[y + "Threshold"] || n || 0);
                    C.category = c && void 0 !== c[C.x] ? c[C.x] : C.x;
                    if (!C.isNull) {
                        void 0 !== Y && (E = Math.min(E, Math.abs(u - Y)));
                        var Y = u
                    }
                    C.zone = this.zones.length && C.getZone()
                }
                this.closestPointRangePx = E;
                f(this, "afterTranslate")
            },
            getValidPoints: function(a,
                b, d) {
                var c = this.chart;
                return (a || this.points || []).filter(function(a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : d || !a.isNull
                })
            },
            getClipBox: function(a, b) {
                var d = this.options,
                    c = this.chart,
                    f = c.inverted,
                    e = this.xAxis,
                    k = e && this.yAxis;
                a && !1 === d.clip && k ? a = f ? {
                    y: -c.chartWidth + k.len + k.pos,
                    height: c.chartWidth,
                    width: c.chartHeight,
                    x: -c.chartHeight + e.len + e.pos
                } : {
                    y: -k.pos,
                    height: c.chartHeight,
                    width: c.chartWidth,
                    x: -e.pos
                } : (a = this.clipBox || c.clipBox, b && (a.width = c.plotSizeX, a.x = 0));
                return b ? {
                    width: a.width,
                    x: a.x
                } : a
            },
            setClip: function(a) {
                var b = this.chart,
                    d = this.options,
                    c = b.renderer,
                    f = b.inverted,
                    e = this.clipBox,
                    k = this.getClipBox(a),
                    h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, k.height, d.xAxis, d.yAxis].join(),
                    g = b[h],
                    q = b[h + "m"];
                g || (a && (k.width = 0, f && (k.x = b.plotSizeX + (!1 !== d.clip ? 0 : b.plotTop)), b[h + "m"] = q = c.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[h] = g = c.clipRect(k), g.count = {
                    length: 0
                });
                a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length +=
                    1);
                if (!1 !== d.clip || a) this.group.clip(a || e ? g : b.clipRect), this.markerGroup.clip(q), this.sharedClipKey = h;
                a || (g.count[this.index] && (delete g.count[this.index], --g.count.length), 0 === g.count.length && h && b[h] && (e || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    d = x(this.options.animation);
                if (a) this.setClip(d);
                else {
                    var c = this.sharedClipKey;
                    a = b[c];
                    var f = this.getClipBox(d, !0);
                    a && a.animate(f, d);
                    b[c + "m"] && b[c + "m"].animate({
                        width: f.width + 99,
                        x: f.x - (b.inverted ?
                            0 : 99)
                    }, d);
                    this.animate = null
                }
            },
            afterAnimate: function() {
                this.setClip();
                f(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    d, c = this.options.marker,
                    f = this[this.specialGroup] || this.markerGroup;
                var e = this.xAxis;
                var g = h(c.enabled, !e || e.isRadial ? !0 : null, this.closestPointRangePx >= c.enabledThreshold * c.radius);
                if (!1 !== c.enabled || this._hasPointMarkers)
                    for (e = 0; e < a.length; e++) {
                        var q = a[e];
                        var m = (d = q.graphic) ? "animate" : "attr";
                        var v = q.marker || {};
                        var p = !!q.marker;
                        var r = g && void 0 === v.enabled || v.enabled;
                        var n = !1 !== q.isInside;
                        if (r && !q.isNull) {
                            r = h(v.symbol, this.symbol);
                            var x = this.markerAttribs(q, q.selected && "select");
                            d ? d[n ? "show" : "hide"](n).animate(x) : n && (0 < x.width || q.hasImage) && (q.graphic = d = b.renderer.symbol(r, x.x, x.y, x.width, x.height, p ? v : c).add(f));
                            if (d && !b.styledMode) d[m](this.pointAttribs(q, q.selected && "select"));
                            d && d.addClass(q.getClassName(), !0)
                        } else d && (q.graphic = d.destroy())
                    }
            },
            markerAttribs: function(a, b) {
                var d = this.options.marker,
                    c = a.marker || {},
                    f = c.symbol ||
                    d.symbol,
                    e = h(c.radius, d.radius);
                b && (d = d.states[b], b = c.states && c.states[b], e = h(b && b.radius, d && d.radius, e + (d && d.radiusPlus || 0)));
                a.hasImage = f && 0 === f.indexOf("url");
                a.hasImage && (e = 0);
                a = {
                    x: Math.floor(a.plotX) - e,
                    y: a.plotY - e
                };
                e && (a.width = a.height = 2 * e);
                return a
            },
            pointAttribs: function(a, b) {
                var d = this.options.marker,
                    c = a && a.options,
                    f = c && c.marker || {},
                    e = this.color,
                    k = c && c.color,
                    t = a && a.color;
                c = h(f.lineWidth, d.lineWidth);
                var g = a && a.zone && a.zone.color;
                a = 1;
                e = k || g || t || e;
                k = f.fillColor || d.fillColor || e;
                e = f.lineColor ||
                    d.lineColor || e;
                b = b || "normal";
                d = d.states[b];
                b = f.states && f.states[b] || {};
                c = h(b.lineWidth, d.lineWidth, c + h(b.lineWidthPlus, d.lineWidthPlus, 0));
                k = b.fillColor || d.fillColor || k;
                e = b.lineColor || d.lineColor || e;
                a = h(b.opacity, d.opacity, a);
                return {
                    stroke: e,
                    "stroke-width": c,
                    fill: k,
                    opacity: a
                }
            },
            destroy: function(a) {
                var b = this,
                    d = b.chart,
                    e = /AppleWebKit\/533/.test(v.navigator.userAgent),
                    k, l, h = b.data || [],
                    g, q;
                f(b, "destroy");
                a || r(b);
                (b.axisTypes || []).forEach(function(a) {
                    (q = b[a]) && q.series && (D(q.series, b), q.isDirty = q.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (l = h.length; l--;)(g = h[l]) && g.destroy && g.destroy();
                b.points = null;
                c.clearTimeout(b.animationTimeout);
                L(b, function(a, b) {
                    a instanceof E && !a.survive && (k = e && "group" === b ? "hide" : "destroy", a[k]())
                });
                d.hoverSeries === b && (d.hoverSeries = null);
                D(d.series, b);
                d.orderSeries();
                L(b, function(d, c) {
                    a && "hcEvents" === c || delete b[c]
                })
            },
            getGraphPath: function(a, b, d) {
                var c = this,
                    f = c.options,
                    e = f.step,
                    k, h = [],
                    t = [],
                    g;
                a = a || c.points;
                (k = a.reversed) && a.reverse();
                (e = {
                        right: 1,
                        center: 2
                    } [e] ||
                    e && 3) && k && (e = 4 - e);
                !f.connectNulls || b || d || (a = this.getValidPoints(a));
                a.forEach(function(k, l) {
                    var q = k.plotX,
                        v = k.plotY,
                        m = a[l - 1];
                    (k.leftCliff || m && m.rightCliff) && !d && (g = !0);
                    k.isNull && !A(b) && 0 < l ? g = !f.connectNulls : k.isNull && !b ? g = !0 : (0 === l || g ? l = ["M", k.plotX, k.plotY] : c.getPointSpline ? l = c.getPointSpline(a, k, l) : e ? (l = 1 === e ? ["L", m.plotX, v] : 2 === e ? ["L", (m.plotX + q) / 2, m.plotY, "L", (m.plotX + q) / 2, v] : ["L", q, m.plotY], l.push("L", q, v)) : l = ["L", q, v], t.push(k.x), e && (t.push(k.x), 2 === e && t.push(k.x)), h.push.apply(h, l), g = !1)
                });
                h.xMap = t;
                return c.graphPath = h
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    d = (this.gappedPath || this.getGraphPath).call(this),
                    c = this.chart.styledMode,
                    f = [
                        ["graph", "highcharts-graph"]
                    ];
                c || f[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
                f = a.getZonesGraphs(f);
                f.forEach(function(f, e) {
                    var k = f[0],
                        l = a[k],
                        h = l ? "animate" : "attr";
                    l ? (l.endX = a.preventGraphAnimation ? null : d.xMap, l.animate({
                        d: d
                    })) : d.length && (a[k] = l = a.chart.renderer.path(d).addClass(f[1]).attr({
                        zIndex: 1
                    }).add(a.group));
                    l && !c && (k = {
                        stroke: f[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, f[3] ? k.dashstyle = f[3] : "square" !== b.linecap && (k["stroke-linecap"] = k["stroke-linejoin"] = "round"), l[h](k).shadow(2 > e && b.shadow));
                    l && (l.startX = d.xMap, l.isArea = d.isArea)
                })
            },
            getZonesGraphs: function(a) {
                this.zones.forEach(function(b, d) {
                    d = ["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (b.className || "")];
                    this.chart.styledMode || d.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                    a.push(d)
                }, this);
                return a
            },
            applyZones: function() {
                var a =
                    this,
                    b = this.chart,
                    d = b.renderer,
                    c = this.zones,
                    f, e, g = this.clips || [],
                    q, m = this.graph,
                    v = this.area,
                    p = Math.max(b.chartWidth, b.chartHeight),
                    r = this[(this.zoneAxis || "y") + "Axis"],
                    n = b.inverted,
                    x, u, y, E = !1;
                if (c.length && (m || v) && r && void 0 !== r.min) {
                    var z = r.reversed;
                    var A = r.horiz;
                    m && !this.showLine && m.hide();
                    v && v.hide();
                    var C = r.getExtremes();
                    c.forEach(function(c, k) {
                        f = z ? A ? b.plotWidth : 0 : A ? 0 : r.toPixels(C.min) || 0;
                        f = Math.min(Math.max(h(e, f), 0), p);
                        e = Math.min(Math.max(Math.round(r.toPixels(h(c.value, C.max), !0) || 0), 0), p);
                        E &&
                            (f = e = r.toPixels(C.max));
                        x = Math.abs(f - e);
                        u = Math.min(f, e);
                        y = Math.max(f, e);
                        r.isXAxis ? (q = {
                            x: n ? y : u,
                            y: 0,
                            width: x,
                            height: p
                        }, A || (q.x = b.plotHeight - q.x)) : (q = {
                            x: 0,
                            y: n ? y : u,
                            width: p,
                            height: x
                        }, A && (q.y = b.plotWidth - q.y));
                        n && d.isVML && (q = r.isXAxis ? {
                            x: 0,
                            y: z ? u : y,
                            height: q.width,
                            width: b.chartWidth
                        } : {
                            x: q.y - b.plotLeft - b.spacingBox.x,
                            y: 0,
                            width: q.height,
                            height: b.chartHeight
                        });
                        g[k] ? g[k].animate(q) : g[k] = d.clipRect(q);
                        m && a["zone-graph-" + k].clip(g[k]);
                        v && a["zone-area-" + k].clip(g[k]);
                        E = c.value > C.max;
                        a.resetZones && 0 === e && (e = void 0)
                    });
                    this.clips = g
                } else a.visible && (m && m.show(!0), v && v.show(!0))
            },
            invertGroups: function(a) {
                function b() {
                    ["group", "markerGroup"].forEach(function(b) {
                        d[b] && (c.renderer.isVML && d[b].attr({
                            width: d.yAxis.len,
                            height: d.xAxis.len
                        }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(a))
                    })
                }
                var d = this,
                    c = d.chart;
                if (d.xAxis) {
                    var f = C(c, "resize", b);
                    C(d, "destroy", f);
                    b(a);
                    d.invertGroups = b
                }
            },
            plotGroup: function(a, b, d, c, f) {
                var e = this[a],
                    k = !e;
                k && (this[a] = e = this.chart.renderer.g().attr({
                    zIndex: c || .1
                }).add(f));
                e.addClass("highcharts-" +
                    b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (A(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                e.attr({
                    visibility: d
                })[k ? "attr" : "animate"](this.getPlotBox());
                return e
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    d = this.yAxis;
                a.inverted && (b = d, d = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: d ? d.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a =
                    this,
                    b = a.chart,
                    d = a.options,
                    c = !!a.animate && b.renderer.isSVG && x(d.animation).duration,
                    e = a.visible ? "inherit" : "hidden",
                    l = d.zIndex,
                    h = a.hasRendered,
                    g = b.seriesGroup,
                    m = b.inverted;
                f(this, "render");
                var v = a.plotGroup("group", "series", e, l, g);
                a.markerGroup = a.plotGroup("markerGroup", "markers", e, l, g);
                c && a.animate(!0);
                v.inverted = a.isCartesian || a.invertable ? m : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.visible && a.drawPoints();
                a.drawDataLabels && a.drawDataLabels();
                a.redrawPoints && a.redrawPoints();
                a.drawTracker &&
                    !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(m);
                !1 === d.clip || a.sharedClipKey || h || v.clip(b.clipRect);
                c && a.animate();
                h || (a.animationTimeout = q(function() {
                    a.afterAnimate()
                }, c));
                a.isDirty = !1;
                a.hasRendered = !0;
                f(a, "afterRender")
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    d = this.group,
                    c = this.xAxis,
                    f = this.yAxis;
                d && (a.inverted && d.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), d.animate({
                    translateX: h(c && c.left, a.plotLeft),
                    translateY: h(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var d = this.xAxis,
                    c = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                    plotY: f ? c.len - a.chartX + c.pos : a.chartY - c.pos
                }, b, a)
            },
            buildKDTree: function(a) {
                function b(a, c, f) {
                    var e;
                    if (e = a && a.length) {
                        var k = d.kdAxisArray[c % f];
                        a.sort(function(a, b) {
                            return a[k] - b[k]
                        });
                        e = Math.floor(e / 2);
                        return {
                            point: a[e],
                            left: b(a.slice(0, e), c + 1, f),
                            right: b(a.slice(e + 1), c + 1, f)
                        }
                    }
                }
                this.buildingKdTree = !0;
                var d = this,
                    c = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete d.kdTree;
                q(function() {
                    d.kdTree = b(d.getValidPoints(null, !d.directTouch), c, c);
                    d.buildingKdTree = !1
                }, d.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
            },
            searchKDTree: function(a, b, d) {
                function c(a, b, d, l) {
                    var g = b.point,
                        q = f.kdAxisArray[d % l],
                        t = g;
                    var m = A(a[e]) && A(g[e]) ? Math.pow(a[e] - g[e], 2) : null;
                    var v = A(a[k]) && A(g[k]) ? Math.pow(a[k] - g[k], 2) : null;
                    v = (m || 0) + (v || 0);
                    g.dist = A(v) ? Math.sqrt(v) : Number.MAX_VALUE;
                    g.distX = A(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                    q = a[q] - g[q];
                    v = 0 > q ? "left" : "right";
                    m = 0 > q ? "right" : "left";
                    b[v] && (v = c(a, b[v], d + 1, l), t = v[h] < t[h] ? v : g);
                    b[m] && Math.sqrt(q * q) < t[h] && (a = c(a, b[m], d + 1, l), t = a[h] < t[h] ? a : t);
                    return t
                }
                var f = this,
                    e = this.kdAxisArray[0],
                    k = this.kdAxisArray[1],
                    h = b ? "distX" : "dist";
                b = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(d);
                if (this.kdTree) return c(a, this.kdTree, b, b)
            },
            pointPlacementToXValue: function() {
                var a = this.options.pointPlacement;
                "between" === a && (a = .5);
                z(a) && (a *= h(this.options.pointRange ||
                    this.xAxis.pointRange));
                return a
            }
        });
        ""
    });
    N(H, "parts/Stacking.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.objectEach;
        n = c.Axis;
        var F = c.Chart,
            z = c.correctFloat,
            u = c.destroyObjectProperties,
            L = c.format,
            y = c.pick,
            C = c.Series;
        c.StackItem = function(c, m, p, g, b) {
            var a = c.chart.inverted;
            this.axis = c;
            this.isNegative = p;
            this.options = m = m || {};
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = b;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: m.align || (a ? p ? "left" : "right" :
                    "center"),
                verticalAlign: m.verticalAlign || (a ? "middle" : p ? "bottom" : "top"),
                y: m.y,
                x: m.x
            };
            this.textAlign = m.textAlign || (a ? p ? "right" : "left" : "center")
        };
        c.StackItem.prototype = {
            destroy: function() {
                u(this, this.axis)
            },
            render: function(c) {
                var m = this.axis.chart,
                    p = this.options,
                    g = p.format;
                g = g ? L(g, this, m.time) : p.formatter.call(this);
                this.label ? this.label.attr({
                    text: g,
                    visibility: "hidden"
                }) : (this.label = m.renderer.label(g, null, null, p.shape, null, null, p.useHTML, !1, "stack-labels"), g = {
                    text: g,
                    align: this.textAlign,
                    rotation: p.rotation,
                    padding: y(p.padding, 0),
                    visibility: "hidden"
                }, this.label.attr(g), m.styledMode || this.label.css(p.style), this.label.added || this.label.add(c));
                this.label.labelrank = m.plotHeight
            },
            setOffset: function(c, m, p, g, b) {
                var a = this.axis,
                    d = a.chart;
                g = a.translate(a.usePercentage ? 100 : g ? g : this.total, 0, 0, 0, 1);
                p = a.translate(p ? p : 0);
                p = A(g) && Math.abs(g - p);
                c = y(b, d.xAxis[0].translate(this.x)) + c;
                a = A(g) && this.getStackBox(d, this, c, g, m, p, a);
                m = this.label;
                c = this.isNegative;
                b = "justify" === y(this.options.overflow, "justify");
                if (m && a) {
                    p =
                        m.getBBox();
                    var f = d.inverted ? c ? p.width : 0 : p.width / 2,
                        e = d.inverted ? p.height / 2 : c ? -4 : p.height + 4;
                    this.alignOptions.x = y(this.options.x, 0);
                    m.align(this.alignOptions, null, a);
                    g = m.alignAttr;
                    m.show();
                    g.y -= e;
                    b && (g.x -= f, C.prototype.justifyDataLabel.call(this.axis, m, this.alignOptions, g, p, a), g.x += f);
                    g.x = m.alignAttr.x;
                    m.attr({
                        x: g.x,
                        y: g.y
                    });
                    y(!b && this.options.crop, !0) && ((d = d.isInsidePlot(m.x + (d.inverted ? 0 : -p.width / 2), m.y) && d.isInsidePlot(m.x + (d.inverted ? c ? -p.width : p.width : p.width / 2), m.y + p.height)) || m.hide())
                }
            },
            getStackBox: function(c,
                m, p, g, b, a, d) {
                var f = m.axis.reversed,
                    e = c.inverted;
                c = d.height + d.pos - (e ? c.plotLeft : c.plotTop);
                m = m.isNegative && !f || !m.isNegative && f;
                return {
                    x: e ? m ? g : g - a : p,
                    y: e ? c - p - b : m ? c - g - a : c - g,
                    width: e ? a : b,
                    height: e ? b : a
                }
            }
        };
        F.prototype.getStacks = function() {
            var c = this,
                m = c.inverted;
            c.yAxis.forEach(function(c) {
                c.stacks && c.hasVisibleSeries && (c.oldStacks = c.stacks)
            });
            c.series.forEach(function(p) {
                var g = p.xAxis && p.xAxis.options || {};
                !p.options.stacking || !0 !== p.visible && !1 !== c.options.chart.ignoreHiddenSeries || (p.stackKey = [p.type, y(p.options.stack,
                    ""), m ? g.top : g.left, m ? g.height : g.width].join())
            })
        };
        n.prototype.buildStacks = function() {
            var c = this.series,
                m = y(this.options.reversedStacks, !0),
                p = c.length,
                g;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (g = p; g--;) c[m ? g : p - g - 1].setStackedPoints();
                for (g = 0; g < p; g++) c[g].modifyStacks()
            }
        };
        n.prototype.renderStackTotals = function() {
            var c = this.chart,
                m = c.renderer,
                p = this.stacks,
                g = this.stackTotalGroup;
            g || (this.stackTotalGroup = g = m.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            g.translate(c.plotLeft, c.plotTop);
            D(p, function(b) {
                D(b, function(a) {
                    a.render(g)
                })
            })
        };
        n.prototype.resetStacks = function() {
            var c = this,
                m = c.stacks;
            c.isXAxis || D(m, function(m) {
                D(m, function(g, b) {
                    g.touched < c.stacksTouched ? (g.destroy(), delete m[b]) : (g.total = null, g.cumulative = null)
                })
            })
        };
        n.prototype.cleanStacks = function() {
            if (!this.isXAxis) {
                if (this.oldStacks) var c = this.stacks = this.oldStacks;
                D(c, function(c) {
                    D(c, function(c) {
                        c.cumulative = c.total
                    })
                })
            }
        };
        C.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var n =
                    this.processedXData,
                    m = this.processedYData,
                    p = [],
                    g = m.length,
                    b = this.options,
                    a = b.threshold,
                    d = y(b.startFromThreshold && a, 0),
                    f = b.stack;
                b = b.stacking;
                var e = this.stackKey,
                    h = "-" + e,
                    r = this.negStacks,
                    u = this.yAxis,
                    q = u.stacks,
                    v = u.oldStacks,
                    k, t;
                u.stacksTouched += 1;
                for (t = 0; t < g; t++) {
                    var B = n[t];
                    var I = m[t];
                    var w = this.getStackIndicator(w, B, this.index);
                    var l = w.key;
                    var J = (k = r && I < (d ? 0 : a)) ? h : e;
                    q[J] || (q[J] = {});
                    q[J][B] || (v[J] && v[J][B] ? (q[J][B] = v[J][B], q[J][B].total = null) : q[J][B] = new c.StackItem(u, u.options.stackLabels, k, B, f));
                    J = q[J][B];
                    null !== I ? (J.points[l] = J.points[this.index] = [y(J.cumulative, d)], A(J.cumulative) || (J.base = l), J.touched = u.stacksTouched, 0 < w.index && !1 === this.singleStacks && (J.points[l][0] = J.points[this.index + "," + B + ",0"][0])) : J.points[l] = J.points[this.index] = null;
                    "percent" === b ? (k = k ? e : h, r && q[k] && q[k][B] ? (k = q[k][B], J.total = k.total = Math.max(k.total, J.total) + Math.abs(I) || 0) : J.total = z(J.total + (Math.abs(I) || 0))) : J.total = z(J.total + (I || 0));
                    J.cumulative = y(J.cumulative, d) + (I || 0);
                    null !== I && (J.points[l].push(J.cumulative),
                        p[t] = J.cumulative)
                }
                "percent" === b && (u.usePercentage = !0);
                this.stackedYData = p;
                u.oldStacks = {}
            }
        };
        C.prototype.modifyStacks = function() {
            var c = this,
                m = c.stackKey,
                p = c.yAxis.stacks,
                g = c.processedXData,
                b, a = c.options.stacking;
            c[a + "Stacker"] && [m, "-" + m].forEach(function(d) {
                for (var f = g.length, e, h; f--;)
                    if (e = g[f], b = c.getStackIndicator(b, e, c.index, d), h = (e = p[d] && p[d][e]) && e.points[b.key]) c[a + "Stacker"](h, e, f)
            })
        };
        C.prototype.percentStacker = function(c, m, p) {
            m = m.total ? 100 / m.total : 0;
            c[0] = z(c[0] * m);
            c[1] = z(c[1] * m);
            this.stackedYData[p] =
                c[1]
        };
        C.prototype.getStackIndicator = function(c, m, p, g) {
            !A(c) || c.x !== m || g && c.key !== g ? c = {
                x: m,
                index: 0,
                key: g
            } : c.index++;
            c.key = [p, m, c.index].join();
            return c
        }
    });
    N(H, "parts/Dynamics.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.erase,
            F = n.isArray,
            z = n.isNumber,
            u = n.isObject,
            L = n.isString,
            y = n.objectEach,
            C = n.splat,
            x = c.addEvent,
            m = c.animate,
            p = c.Axis;
        n = c.Chart;
        var g = c.createElement,
            b = c.css,
            a = c.extend,
            d = c.fireEvent,
            f = c.merge,
            e = c.pick,
            h = c.Point,
            r = c.Series,
            E = c.seriesTypes,
            q = c.setAnimation;
        c.cleanRecursively = function(a, b) {
            var d = {};
            y(a, function(f, e) {
                if (u(a[e], !0) && !a.nodeType && b[e]) f = c.cleanRecursively(a[e], b[e]), Object.keys(f).length && (d[e] = f);
                else if (u(a[e]) || a[e] !== b[e]) d[e] = a[e]
            });
            return d
        };
        a(n.prototype, {
            addSeries: function(a, b, c) {
                var f, k = this;
                a && (b = e(b, !0), d(k, "addSeries", {
                    options: a
                }, function() {
                    f = k.initSeries(a);
                    k.isDirtyLegend = !0;
                    k.linkSeries();
                    d(k, "afterAddSeries", {
                        series: f
                    });
                    b && k.redraw(c)
                }));
                return f
            },
            addAxis: function(a, b, d, c) {
                return this.createAxis(b ? "xAxis" : "yAxis", {
                    axis: a,
                    redraw: d,
                    animation: c
                })
            },
            addColorAxis: function(a, b, d) {
                return this.createAxis("colorAxis", {
                    axis: a,
                    redraw: b,
                    animation: d
                })
            },
            createAxis: function(a, b) {
                var d = this.options,
                    k = "colorAxis" === a,
                    h = b.redraw,
                    g = b.animation;
                b = f(b.axis, {
                    index: this[a].length,
                    isX: "xAxis" === a
                });
                var l = k ? new c.ColorAxis(this, b) : new p(this, b);
                d[a] = C(d[a] || {});
                d[a].push(b);
                k && (this.isDirtyLegend = !0);
                e(h, !0) && this.redraw(g);
                return l
            },
            showLoading: function(d) {
                var c = this,
                    f = c.options,
                    h = c.loadingDiv,
                    q = f.loading,
                    v = function() {
                        h && b(h, {
                            left: c.plotLeft +
                                "px",
                            top: c.plotTop + "px",
                            width: c.plotWidth + "px",
                            height: c.plotHeight + "px"
                        })
                    };
                h || (c.loadingDiv = h = g("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, c.container), c.loadingSpan = g("span", {
                    className: "highcharts-loading-inner"
                }, null, h), x(c, "redraw", v));
                h.className = "highcharts-loading";
                c.loadingSpan.innerHTML = e(d, f.lang.loading, "");
                c.styledMode || (b(h, a(q.style, {
                    zIndex: 10
                })), b(c.loadingSpan, q.labelStyle), c.loadingShown || (b(h, {
                    opacity: 0,
                    display: ""
                }), m(h, {
                    opacity: q.style.opacity || .5
                }, {
                    duration: q.showDuration ||
                        0
                })));
                c.loadingShown = !0;
                v()
            },
            hideLoading: function() {
                var a = this.options,
                    d = this.loadingDiv;
                d && (d.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || m(d, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        b(d, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "),
            update: function(a, b, h, g) {
                var k = this,
                    q = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    l, m, t, v = a.isResponsiveOptions,
                    r = [];
                d(k, "update", {
                    options: a
                });
                v || k.setResponsive(!1, !0);
                a = c.cleanRecursively(a, k.options);
                f(!0, k.userOptions, a);
                if (l = a.chart) {
                    f(!0, k.options.chart,
                        l);
                    "className" in l && k.setClassName(l.className);
                    "reflow" in l && k.setReflow(l.reflow);
                    if ("inverted" in l || "polar" in l || "type" in l) {
                        k.propFromSeries();
                        var p = !0
                    }
                    "alignTicks" in l && (p = !0);
                    y(l, function(a, b) {
                        -1 !== k.propsRequireUpdateSeries.indexOf("chart." + b) && (m = !0); - 1 !== k.propsRequireDirtyBox.indexOf(b) && (k.isDirtyBox = !0);
                        v || -1 === k.propsRequireReflow.indexOf(b) || (t = !0)
                    });
                    !k.styledMode && "style" in l && k.renderer.setStyle(l.style)
                }!k.styledMode && a.colors && (this.options.colors = a.colors);
                a.plotOptions && f(!0, this.options.plotOptions,
                    a.plotOptions);
                a.time && this.time === c.time && (this.time = new c.Time(a.time));
                y(a, function(a, b) {
                    if (k[b] && "function" === typeof k[b].update) k[b].update(a, !1);
                    else if ("function" === typeof k[q[b]]) k[q[b]](a);
                    "chart" !== b && -1 !== k.propsRequireUpdateSeries.indexOf(b) && (m = !0)
                });
                this.collectionsWithUpdate.forEach(function(b) {
                    if (a[b]) {
                        if ("series" === b) {
                            var d = [];
                            k[b].forEach(function(a, b) {
                                a.options.isInternal || d.push(e(a.options.index, b))
                            })
                        }
                        C(a[b]).forEach(function(a, c) {
                            (c = A(a.id) && k.get(a.id) || k[b][d ? d[c] : c]) && c.coll ===
                                b && (c.update(a, !1), h && (c.touched = !0));
                            !c && h && k.collectionsWithInit[b] && (k.collectionsWithInit[b][0].apply(k, [a].concat(k.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
                        });
                        h && k[b].forEach(function(a) {
                            a.touched || a.options.isInternal ? delete a.touched : r.push(a)
                        })
                    }
                });
                r.forEach(function(a) {
                    a.remove && a.remove(!1)
                });
                p && k.axes.forEach(function(a) {
                    a.update({}, !1)
                });
                m && k.series.forEach(function(a) {
                    a.update({}, !1)
                });
                a.loading && f(!0, k.options.loading, a.loading);
                p = l && l.width;
                l = l && l.height;
                L(l) && (l = c.relativeLength(l,
                    p || k.chartWidth));
                t || z(p) && p !== k.chartWidth || z(l) && l !== k.chartHeight ? k.setSize(p, l, g) : e(b, !0) && k.redraw(g);
                d(k, "afterUpdate", {
                    options: a,
                    redraw: b,
                    animation: g
                })
            },
            setSubtitle: function(a, b) {
                this.applyDescription("subtitle", a);
                this.layOutTitles(b)
            },
            setCaption: function(a, b) {
                this.applyDescription("caption", a);
                this.layOutTitles(b)
            }
        });
        n.prototype.collectionsWithInit = {
            xAxis: [n.prototype.addAxis, [!0]],
            yAxis: [n.prototype.addAxis, [!1]],
            colorAxis: [n.prototype.addColorAxis, [!1]],
            series: [n.prototype.addSeries]
        };
        a(h.prototype, {
            update: function(a, b, d, c) {
                function f() {
                    k.applyOptions(a);
                    null === k.y && h && (k.graphic = h.destroy());
                    u(a, !0) && (h && h.element && a && a.marker && void 0 !== a.marker.symbol && (k.graphic = h.destroy()), a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()), k.connector && (k.connector = k.connector.destroy()));
                    g = k.index;
                    l.updateParallelArrays(k, g);
                    m.data[g] = u(m.data[g], !0) || u(a, !0) ? k.options : e(a, m.data[g]);
                    l.isDirty = l.isDirtyData = !0;
                    !l.fixedBox && l.hasCartesianSeries && (q.isDirtyBox = !0);
                    "point" ===
                    m.legendType && (q.isDirtyLegend = !0);
                    b && q.redraw(d)
                }
                var k = this,
                    l = k.series,
                    h = k.graphic,
                    g, q = l.chart,
                    m = l.options;
                b = e(b, !0);
                !1 === c ? f() : k.firePointEvent("update", {
                    options: a
                }, f)
            },
            remove: function(a, b) {
                this.series.removePoint(this.series.data.indexOf(this), a, b)
            }
        });
        a(r.prototype, {
            addPoint: function(a, b, c, f, h) {
                var k = this.options,
                    l = this.data,
                    g = this.chart,
                    q = this.xAxis;
                q = q && q.hasNames && q.names;
                var m = k.data,
                    t = this.xData,
                    v;
                b = e(b, !0);
                var r = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(r, [a]);
                var p = r.x;
                var n = t.length;
                if (this.requireSorting && p < t[n - 1])
                    for (v = !0; n && t[n - 1] > p;) n--;
                this.updateParallelArrays(r, "splice", n, 0, 0);
                this.updateParallelArrays(r, n);
                q && r.name && (q[p] = r.name);
                m.splice(n, 0, a);
                v && (this.data.splice(n, 0, null), this.processData());
                "point" === k.legendType && this.generatePoints();
                c && (l[0] && l[0].remove ? l[0].remove(!1) : (l.shift(), this.updateParallelArrays(r, "shift"), m.shift()));
                !1 !== h && d(this, "addPoint", {
                    point: r
                });
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(f)
            },
            removePoint: function(a, b, d) {
                var c =
                    this,
                    f = c.data,
                    k = f[a],
                    l = c.points,
                    h = c.chart,
                    g = function() {
                        l && l.length === f.length && l.splice(a, 1);
                        f.splice(a, 1);
                        c.options.data.splice(a, 1);
                        c.updateParallelArrays(k || {
                            series: c
                        }, "splice", a, 1);
                        k && k.destroy();
                        c.isDirty = !0;
                        c.isDirtyData = !0;
                        b && h.redraw()
                    };
                q(d, h);
                b = e(b, !0);
                k ? k.firePointEvent("remove", null, g) : g()
            },
            remove: function(a, b, c, f) {
                function k() {
                    h.destroy(f);
                    h.remove = null;
                    l.isDirtyLegend = l.isDirtyBox = !0;
                    l.linkSeries();
                    e(a, !0) && l.redraw(b)
                }
                var h = this,
                    l = h.chart;
                !1 !== c ? d(h, "remove", null, k) : k()
            },
            update: function(b,
                k) {
                b = c.cleanRecursively(b, this.userOptions);
                d(this, "update", {
                    options: b
                });
                var h = this,
                    g = h.chart,
                    q = h.userOptions,
                    m = h.initialType || h.type,
                    l = b.type || q.type || g.options.chart.type,
                    r = !(this.hasDerivedData || b.dataGrouping || l && l !== this.type || void 0 !== b.pointStart || b.pointInterval || b.pointIntervalUnit || b.keys),
                    p = E[m].prototype,
                    v, n = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"],
                    u = ["eventOptions", "navigatorSeries", "baseSeries"],
                    x = h.finishedAnimating && {
                        animation: !1
                    },
                    y = {};
                r && (u.push("data", "isDirtyData",
                    "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== b.visible && u.push("area", "graph"), h.parallelArrays.forEach(function(a) {
                    u.push(a + "Data")
                }), b.data && this.setData(b.data, !1));
                b = f(q, x, {
                    index: void 0 === q.index ? h.index : q.index,
                    pointStart: e(q.pointStart, h.xData[0])
                }, !r && {
                    data: h.options.data
                }, b);
                r && b.data && (b.data = h.options.data);
                u = n.concat(u);
                u.forEach(function(a) {
                    u[a] = h[a];
                    delete h[a]
                });
                h.remove(!1, null, !1, !0);
                for (v in p) h[v] = void 0;
                E[l || m] ? a(h, E[l || m].prototype) : c.error(17, !0, g);
                u.forEach(function(a) {
                    h[a] = u[a]
                });
                h.init(g, b);
                if (r && this.points) {
                    var z = h.options;
                    !1 === z.visible ? (y.graphic = 1, y.dataLabel = 1) : h._hasPointLabels || (l = z.marker, p = z.dataLabels, l && (!1 === l.enabled || "symbol" in l) && (y.graphic = 1), p && !1 === p.enabled && (y.dataLabel = 1));
                    this.points.forEach(function(a) {
                        a && a.series && (a.resolveColor(), Object.keys(y).length && a.destroyElements(y), !1 === z.showInLegend && a.legendItem && g.legend.destroyItem(a))
                    }, this)
                }
                b.zIndex !==
                    q.zIndex && n.forEach(function(a) {
                        h[a] && h[a].attr({
                            zIndex: b.zIndex
                        })
                    });
                h.initialType = m;
                g.linkSeries();
                d(this, "afterUpdate");
                e(k, !0) && g.redraw(r ? void 0 : !1)
            },
            setName: function(a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        a(p.prototype, {
            update: function(b, d) {
                var c = this.chart,
                    k = b && b.events || {};
                b = f(this.userOptions, b);
                c.options[this.coll].indexOf && (c.options[this.coll][c.options[this.coll].indexOf(this.userOptions)] = b);
                y(c.options[this.coll].events, function(a, b) {
                    "undefined" ===
                    typeof k[b] && (k[b] = void 0)
                });
                this.destroy(!0);
                this.init(c, a(b, {
                    events: k
                }));
                c.isDirtyBox = !0;
                e(d, !0) && c.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, d = this.coll, c = this.series, f = c.length; f--;) c[f] && c[f].remove(!1);
                D(b.axes, this);
                D(b[d], this);
                F(b.options[d]) ? b.options[d].splice(this.options.index, 1) : delete b.options[d];
                b[d].forEach(function(a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                e(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a,
                b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    });
    N(H, "parts/AreaSeries.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.objectEach,
            D = c.color,
            F = c.pick,
            z = c.Series;
        n = c.seriesType;
        n("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(c) {
                var n = [],
                    u = [],
                    z = this.xAxis,
                    x = this.yAxis,
                    m = x.stacks[this.stackKey],
                    p = {},
                    g = this.index,
                    b = x.series,
                    a = b.length,
                    d = F(x.options.reversedStacks, !0) ? 1 : -1,
                    f;
                c = c || this.points;
                if (this.options.stacking) {
                    for (f = 0; f < c.length; f++) c[f].leftNull =
                        c[f].rightNull = null, p[c[f].x] = c[f];
                    A(m, function(a, b) {
                        null !== a.total && u.push(b)
                    });
                    u.sort(function(a, b) {
                        return a - b
                    });
                    var e = b.map(function(a) {
                        return a.visible
                    });
                    u.forEach(function(b, c) {
                        var h = 0,
                            q, r;
                        if (p[b] && !p[b].isNull) n.push(p[b]), [-1, 1].forEach(function(k) {
                            var h = 1 === k ? "rightNull" : "leftNull",
                                v = 0,
                                n = m[u[c + k]];
                            if (n)
                                for (f = g; 0 <= f && f < a;) q = n.points[f], q || (f === g ? p[b][h] = !0 : e[f] && (r = m[b].points[f]) && (v -= r[1] - r[0])), f += d;
                            p[b][1 === k ? "rightCliff" : "leftCliff"] = v
                        });
                        else {
                            for (f = g; 0 <= f && f < a;) {
                                if (q = m[b].points[f]) {
                                    h =
                                        q[1];
                                    break
                                }
                                f += d
                            }
                            h = x.translate(h, 0, 1, 0, 1);
                            n.push({
                                isNull: !0,
                                plotX: z.translate(b, 0, 0, 0, 1),
                                x: b,
                                plotY: h,
                                yBottom: h
                            })
                        }
                    })
                }
                return n
            },
            getGraphPath: function(n) {
                var u = z.prototype.getGraphPath,
                    y = this.options,
                    A = y.stacking,
                    x = this.yAxis,
                    m, p = [],
                    g = [],
                    b = this.index,
                    a = x.stacks[this.stackKey],
                    d = y.threshold,
                    f = Math.round(x.getThreshold(y.threshold));
                y = c.pick(y.connectNulls, "percent" === A);
                var e = function(c, e, k) {
                    var h = n[c];
                    c = A && a[h.x].points[b];
                    var q = h[k + "Null"] || 0;
                    k = h[k + "Cliff"] || 0;
                    h = !0;
                    if (k || q) {
                        var m = (q ? c[0] : c[1]) + k;
                        var v =
                            c[0] + k;
                        h = !!q
                    } else !A && n[e] && n[e].isNull && (m = v = d);
                    void 0 !== m && (g.push({
                        plotX: r,
                        plotY: null === m ? f : x.getThreshold(m),
                        isNull: h,
                        isCliff: !0
                    }), p.push({
                        plotX: r,
                        plotY: null === v ? f : x.getThreshold(v),
                        doCurve: !1
                    }))
                };
                n = n || this.points;
                A && (n = this.getStackPoints(n));
                for (m = 0; m < n.length; m++) {
                    var h = n[m].isNull;
                    var r = F(n[m].rectPlotX, n[m].plotX);
                    var E = F(n[m].yBottom, f);
                    if (!h || y) y || e(m, m - 1, "left"), h && !A && y || (g.push(n[m]), p.push({
                        x: m,
                        plotX: r,
                        plotY: E
                    })), y || e(m, m + 1, "right")
                }
                m = u.call(this, g, !0, !0);
                p.reversed = !0;
                h = u.call(this,
                    p, !0, !0);
                h.length && (h[0] = "L");
                h = m.concat(h);
                u = u.call(this, g, !1, y);
                h.xMap = m.xMap;
                this.areaPath = h;
                return u
            },
            drawGraph: function() {
                this.areaPath = [];
                z.prototype.drawGraph.apply(this);
                var c = this,
                    n = this.areaPath,
                    y = this.options,
                    A = [
                        ["area", "highcharts-area", this.color, y.fillColor]
                    ];
                this.zones.forEach(function(n, m) {
                    A.push(["zone-area-" + m, "highcharts-area highcharts-zone-area-" + m + " " + n.className, n.color || c.color, n.fillColor || y.fillColor])
                });
                A.forEach(function(u) {
                    var m = u[0],
                        p = c[m],
                        g = p ? "animate" : "attr",
                        b = {};
                    p ?
                        (p.endX = c.preventGraphAnimation ? null : n.xMap, p.animate({
                            d: n
                        })) : (b.zIndex = 0, p = c[m] = c.chart.renderer.path(n).addClass(u[1]).add(c.group), p.isArea = !0);
                    c.chart.styledMode || (b.fill = F(u[3], D(u[2]).setOpacity(F(y.fillOpacity, .75)).get()));
                    p[g](b);
                    p.startX = n.xMap;
                    p.shiftUnit = y.step ? 2 : 1
                })
            },
            drawLegendSymbol: c.LegendSymbolMixin.drawRectangle
        });
        ""
    });
    N(H, "parts/SplineSeries.js", [H["parts/Globals.js"]], function(c) {
        var n = c.pick;
        c = c.seriesType;
        c("spline", "line", {}, {
            getPointSpline: function(c, D, F) {
                var z = D.plotX,
                    u = D.plotY,
                    A = c[F - 1];
                F = c[F + 1];
                if (A && !A.isNull && !1 !== A.doCurve && !D.isCliff && F && !F.isNull && !1 !== F.doCurve && !D.isCliff) {
                    c = A.plotY;
                    var y = F.plotX;
                    F = F.plotY;
                    var C = 0;
                    var x = (1.5 * z + A.plotX) / 2.5;
                    var m = (1.5 * u + c) / 2.5;
                    y = (1.5 * z + y) / 2.5;
                    var p = (1.5 * u + F) / 2.5;
                    y !== x && (C = (p - m) * (y - z) / (y - x) + u - p);
                    m += C;
                    p += C;
                    m > c && m > u ? (m = Math.max(c, u), p = 2 * u - m) : m < c && m < u && (m = Math.min(c, u), p = 2 * u - m);
                    p > F && p > u ? (p = Math.max(F, u), m = 2 * u - p) : p < F && p < u && (p = Math.min(F, u), m = 2 * u - p);
                    D.rightContX = y;
                    D.rightContY = p
                }
                D = ["C", n(A.rightContX, A.plotX), n(A.rightContY, A.plotY), n(x,
                    z), n(m, u), z, u];
                A.rightContX = A.rightContY = null;
                return D
            }
        });
        ""
    });
    N(H, "parts/AreaSplineSeries.js", [H["parts/Globals.js"]], function(c) {
        var n = c.seriesTypes.area.prototype,
            A = c.seriesType;
        A("areaspline", "spline", c.defaultPlotOptions.area, {
            getStackPoints: n.getStackPoints,
            getGraphPath: n.getGraphPath,
            drawGraph: n.drawGraph,
            drawLegendSymbol: c.LegendSymbolMixin.drawRectangle
        });
        ""
    });
    N(H, "parts/ColumnSeries.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.isNumber,
            F = c.animObject,
            z = c.color,
            u = c.extend,
            L = c.merge,
            y = c.pick,
            C = c.Series;
        n = c.seriesType;
        var x = c.svg;
        n("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group",
                "dataLabelsGroup"
            ],
            negStacks: !0,
            init: function() {
                C.prototype.init.apply(this, arguments);
                var c = this,
                    p = c.chart;
                p.hasRendered && p.series.forEach(function(g) {
                    g.type === c.type && (g.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var c = this,
                    p = c.options,
                    g = c.xAxis,
                    b = c.yAxis,
                    a = g.options.reversedStacks;
                a = g.reversed && !a || !g.reversed && a;
                var d, f = {},
                    e = 0;
                !1 === p.grouping ? e = 1 : c.chart.series.forEach(function(a) {
                    var h = a.yAxis,
                        k = a.options;
                    if (a.type === c.type && (a.visible || !c.chart.options.chart.ignoreHiddenSeries) && b.len === h.len &&
                        b.pos === h.pos) {
                        if (k.stacking) {
                            d = a.stackKey;
                            void 0 === f[d] && (f[d] = e++);
                            var g = f[d]
                        } else !1 !== k.grouping && (g = e++);
                        a.columnIndex = g
                    }
                });
                var h = Math.min(Math.abs(g.transA) * (g.ordinalSlope || p.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
                    r = h * p.groupPadding,
                    n = (h - 2 * r) / (e || 1);
                p = Math.min(p.maxPointWidth || g.len, y(p.pointWidth, n * (1 - 2 * p.pointPadding)));
                c.columnMetrics = {
                    width: p,
                    offset: (n - p) / 2 + (r + ((c.columnIndex || 0) + (a ? 1 : 0)) * n - h / 2) * (a ? -1 : 1)
                };
                return c.columnMetrics
            },
            crispCol: function(c, p, g, b) {
                var a = this.chart,
                    d = this.borderWidth,
                    f = -(d % 2 ? .5 : 0);
                d = d % 2 ? .5 : 1;
                a.inverted && a.renderer.isVML && (d += 1);
                this.options.crisp && (g = Math.round(c + g) + f, c = Math.round(c) + f, g -= c);
                b = Math.round(p + b) + d;
                f = .5 >= Math.abs(p) && .5 < b;
                p = Math.round(p) + d;
                b -= p;
                f && b && (--p, b += 1);
                return {
                    x: c,
                    y: p,
                    width: g,
                    height: b
                }
            },
            translate: function() {
                var c = this,
                    p = c.chart,
                    g = c.options,
                    b = c.dense = 2 > c.closestPointRange * c.xAxis.transA;
                b = c.borderWidth = y(g.borderWidth, b ? 0 : 1);
                var a = c.yAxis,
                    d = g.threshold,
                    f = c.translatedThreshold = a.getThreshold(d),
                    e = y(g.minPointLength, 5),
                    h = c.getColumnMetrics(),
                    r = h.width,
                    n = c.barW = Math.max(r, 1 + 2 * b),
                    q = c.pointXOffset = h.offset,
                    v = c.dataMin,
                    k = c.dataMax;
                p.inverted && (f -= .5);
                g.pointPadding && (n = Math.ceil(n));
                C.prototype.translate.apply(c);
                c.points.forEach(function(b) {
                    var h = y(b.yBottom, f),
                        g = 999 + Math.abs(h),
                        m = r;
                    g = Math.min(Math.max(-g, b.plotY), a.len + g);
                    var l = b.plotX + q,
                        t = n,
                        u = Math.min(g, h),
                        x = Math.max(g, h) - u;
                    if (e && Math.abs(x) < e) {
                        x = e;
                        var z = !a.reversed && !b.negative || a.reversed && b.negative;
                        b.y === d && c.dataMax <= d && a.min < d && v !== k && (z = !z);
                        u = Math.abs(u - f) > e ? h - e : f - (z ? e : 0)
                    }
                    A(b.options.pointWidth) &&
                        (m = t = Math.ceil(b.options.pointWidth), l -= Math.round((m - r) / 2));
                    b.barX = l;
                    b.pointWidth = m;
                    b.tooltipPos = p.inverted ? [a.len + a.pos - p.plotLeft - g, c.xAxis.len - l - t / 2, x] : [l + t / 2, g + a.pos - p.plotTop, x];
                    b.shapeType = c.pointClass.prototype.shapeType || "rect";
                    b.shapeArgs = c.crispCol.apply(c, b.isNull ? [l, f, t, 0] : [l, u, t, x])
                })
            },
            getSymbol: c.noop,
            drawLegendSymbol: c.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(c, p) {
                var g = this.options,
                    b = this.pointAttrToOptions || {};
                var a = b.stroke || "borderColor";
                var d = b["stroke-width"] || "borderWidth",
                    f = c && c.color || this.color,
                    e = c && c[a] || g[a] || this.color || f,
                    h = c && c[d] || g[d] || this[d] || 0;
                b = c && c.options.dashStyle || g.dashStyle;
                var m = y(g.opacity, 1);
                if (c && this.zones.length) {
                    var n = c.getZone();
                    f = c.options.color || n && (n.color || c.nonZonedColor) || this.color;
                    n && (e = n.borderColor || e, b = n.dashStyle || b, h = n.borderWidth || h)
                }
                p && (c = L(g.states[p], c.options.states && c.options.states[p] || {}), p = c.brightness, f = c.color || void 0 !==
                    p && z(f).brighten(c.brightness).get() || f, e = c[a] || e, h = c[d] || h, b = c.dashStyle || b, m = y(c.opacity, m));
                a = {
                    fill: f,
                    stroke: e,
                    "stroke-width": h,
                    opacity: m
                };
                b && (a.dashstyle = b);
                return a
            },
            drawPoints: function() {
                var c = this,
                    p = this.chart,
                    g = c.options,
                    b = p.renderer,
                    a = g.animationLimit || 250,
                    d;
                c.points.forEach(function(f) {
                    var e = f.graphic,
                        h = e && p.pointCount < a ? "animate" : "attr";
                    if (D(f.plotY) && null !== f.y) {
                        d = f.shapeArgs;
                        e && e.element.nodeName !== f.shapeType && (e = e.destroy());
                        if (e) e[h](L(d));
                        else f.graphic = e = b[f.shapeType](d).add(f.group ||
                            c.group);
                        if (g.borderRadius) e[h]({
                            r: g.borderRadius
                        });
                        p.styledMode || e[h](c.pointAttribs(f, f.selected && "select")).shadow(!1 !== f.allowShadow && g.shadow, null, g.stacking && !g.borderRadius);
                        e.addClass(f.getClassName(), !0)
                    } else e && (f.graphic = e.destroy())
                })
            },
            animate: function(c) {
                var m = this,
                    g = this.yAxis,
                    b = m.options,
                    a = this.chart.inverted,
                    d = {},
                    f = a ? "translateX" : "translateY";
                if (x)
                    if (c) d.scaleY = .001, c = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(b.threshold))), a ? d.translateX = c - g.len : d.translateY = c, m.clipBox && m.setClip(),
                        m.group.attr(d);
                    else {
                        var e = m.group.attr(f);
                        m.group.animate({
                            scaleY: 1
                        }, u(F(m.options.animation), {
                            step: function(a, b) {
                                d[f] = e + b.pos * (g.pos - e);
                                m.group.attr(d)
                            }
                        }));
                        m.animate = null
                    }
            },
            remove: function() {
                var c = this,
                    p = c.chart;
                p.hasRendered && p.series.forEach(function(g) {
                    g.type === c.type && (g.isDirty = !0)
                });
                C.prototype.remove.apply(c, arguments)
            }
        });
        ""
    });
    N(H, "parts/BarSeries.js", [H["parts/Globals.js"]], function(c) {
        c = c.seriesType;
        c("bar", "column", null, {
            inverted: !0
        });
        ""
    });
    N(H, "parts/ScatterSeries.js", [H["parts/Globals.js"]],
        function(c) {
            var n = c.Series,
                A = c.seriesType;
            A("scatter", "line", {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {
                    x: 0,
                    y: 0
                },
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            }, {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                drawGraph: function() {
                    this.options.lineWidth &&
                        n.prototype.drawGraph.call(this)
                },
                applyJitter: function() {
                    var c = this,
                        n = this.options.jitter,
                        z = this.points.length;
                    n && this.points.forEach(function(u, A) {
                        ["x", "y"].forEach(function(y, C) {
                            var x = "plot" + y.toUpperCase();
                            if (n[y] && !u.isNull) {
                                var m = c[y + "Axis"];
                                var p = n[y] * m.transA;
                                if (m && !m.isLog) {
                                    var g = Math.max(0, u[x] - p);
                                    m = Math.min(m.len, u[x] + p);
                                    C = 1E4 * Math.sin(A + C * z);
                                    u[x] = g + (m - g) * (C - Math.floor(C));
                                    "x" === y && (u.clientX = u.plotX)
                                }
                            }
                        })
                    })
                }
            });
            c.addEvent(n, "afterTranslate", function() {
                this.applyJitter && this.applyJitter()
            });
            ""
        });
    N(H, "mixins/centered-series.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.isNumber,
            D = c.deg2rad,
            F = c.pick,
            z = c.relativeLength;
        c.CenteredSeriesMixin = {
            getCenter: function() {
                var c = this.options,
                    n = this.chart,
                    y = 2 * (c.slicedOffset || 0),
                    A = n.plotWidth - 2 * y;
                n = n.plotHeight - 2 * y;
                var x = c.center;
                x = [F(x[0], "50%"), F(x[1], "50%"), c.size || "100%", c.innerSize || 0];
                var m = Math.min(A, n),
                    p;
                for (p = 0; 4 > p; ++p) {
                    var g = x[p];
                    c = 2 > p || 2 === p && /%$/.test(g);
                    x[p] = z(g, [A, n, m, x[2]][p]) + (c ? y : 0)
                }
                x[3] > x[2] && (x[3] = x[2]);
                return x
            },
            getStartAndEndRadians: function(c, n) {
                c = A(c) ? c : 0;
                n = A(n) && n > c && 360 > n - c ? n : c + 360;
                return {
                    start: D * (c + -90),
                    end: D * (n + -90)
                }
            }
        }
    });
    N(H, "parts/PieSeries.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.isNumber,
            F = c.addEvent;
        n = c.CenteredSeriesMixin;
        var z = n.getStartAndEndRadians,
            u = c.merge,
            H = c.noop,
            y = c.pick,
            C = c.Point,
            x = c.Series,
            m = c.seriesType,
            p = c.fireEvent,
            g = c.setAnimation;
        m("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                connectorPadding: 5,
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                softConnector: !0,
                x: 0,
                connectorShape: "fixedOffset",
                crookDistance: "70%"
            },
            fillColor: void 0,
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group",
                "dataLabelsGroup"
            ],
            axisTypes: [],
            pointAttribs: c.seriesTypes.column.prototype.pointAttribs,
            animate: function(b) {
                var a = this,
                    d = a.points,
                    c = a.startAngleRad;
                b || (d.forEach(function(b) {
                    var d = b.graphic,
                        f = b.shapeArgs;
                    d && (d.attr({
                        r: b.startR || a.center[3] / 2,
                        start: c,
                        end: c
                    }), d.animate({
                        r: f.r,
                        start: f.start,
                        end: f.end
                    }, a.options.animation))
                }), a.animate = null)
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            updateTotals: function() {
                var b, a = 0,
                    d = this.points,
                    c = d.length,
                    e = this.options.ignoreHiddenPoint;
                for (b = 0; b < c; b++) {
                    var h =
                        d[b];
                    a += e && !h.visible ? 0 : h.isNull ? 0 : h.y
                }
                this.total = a;
                for (b = 0; b < c; b++) h = d[b], h.percentage = 0 < a && (h.visible || !e) ? h.y / a * 100 : 0, h.total = a
            },
            generatePoints: function() {
                x.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function(b, a, d) {
                var c = this.center,
                    e = this.radii ? this.radii[d.index] : c[2] / 2;
                return c[0] + (a ? -1 : 1) * Math.cos(Math.asin(Math.max(Math.min((b - c[1]) / (e + d.labelDistance), 1), -1))) * (e + d.labelDistance) + (0 < d.labelDistance ? (a ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function(b) {
                this.generatePoints();
                var a = 0,
                    d = this.options,
                    f = d.slicedOffset,
                    e = f + (d.borderWidth || 0),
                    h = z(d.startAngle, d.endAngle),
                    g = this.startAngleRad = h.start;
                h = (this.endAngleRad = h.end) - g;
                var m = this.points,
                    q = d.dataLabels.distance;
                d = d.ignoreHiddenPoint;
                var v, k = m.length;
                b || (this.center = b = this.getCenter());
                for (v = 0; v < k; v++) {
                    var t = m[v];
                    var n = g + a * h;
                    if (!d || t.visible) a += t.percentage / 100;
                    var u = g + a * h;
                    t.shapeType = "arc";
                    t.shapeArgs = {
                        x: b[0],
                        y: b[1],
                        r: b[2] / 2,
                        innerR: b[3] / 2,
                        start: Math.round(1E3 * n) / 1E3,
                        end: Math.round(1E3 * u) / 1E3
                    };
                    t.labelDistance = y(t.options.dataLabels &&
                        t.options.dataLabels.distance, q);
                    t.labelDistance = c.relativeLength(t.labelDistance, t.shapeArgs.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, t.labelDistance);
                    u = (u + n) / 2;
                    u > 1.5 * Math.PI ? u -= 2 * Math.PI : u < -Math.PI / 2 && (u += 2 * Math.PI);
                    t.slicedTranslation = {
                        translateX: Math.round(Math.cos(u) * f),
                        translateY: Math.round(Math.sin(u) * f)
                    };
                    var w = Math.cos(u) * b[2] / 2;
                    var l = Math.sin(u) * b[2] / 2;
                    t.tooltipPos = [b[0] + .7 * w, b[1] + .7 * l];
                    t.half = u < -Math.PI / 2 || u > Math.PI / 2 ? 1 : 0;
                    t.angle = u;
                    n = Math.min(e, t.labelDistance / 5);
                    t.labelPosition = {
                        natural: {
                            x: b[0] + w + Math.cos(u) * t.labelDistance,
                            y: b[1] + l + Math.sin(u) * t.labelDistance
                        },
                        "final": {},
                        alignment: 0 > t.labelDistance ? "center" : t.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: b[0] + w + Math.cos(u) * n,
                                y: b[1] + l + Math.sin(u) * n
                            },
                            touchingSliceAt: {
                                x: b[0] + w,
                                y: b[1] + l
                            }
                        }
                    }
                }
                p(this, "afterTranslate")
            },
            drawEmpty: function() {
                var b = this.options;
                if (0 === this.total) {
                    var a = this.center[0];
                    var d = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.circle(a, d, 0).addClass("highcharts-graph").add(this.group));
                    this.graph.animate({
                        "stroke-width": b.borderWidth,
                        cx: a,
                        cy: d,
                        r: this.center[2] / 2,
                        fill: b.fillColor || "none",
                        stroke: b.color || "#cccccc"
                    })
                } else this.graph && (this.graph = this.graph.destroy())
            },
            redrawPoints: function() {
                var b = this,
                    a = b.chart,
                    d = a.renderer,
                    c, e, h, g, m = b.options.shadow;
                this.drawEmpty();
                !m || b.shadowGroup || a.styledMode || (b.shadowGroup = d.g("shadow").attr({
                    zIndex: -1
                }).add(b.group));
                b.points.forEach(function(f) {
                    var q = {};
                    e = f.graphic;
                    if (!f.isNull && e) {
                        g = f.shapeArgs;
                        c = f.getTranslate();
                        if (!a.styledMode) {
                            var k = f.shadowGroup;
                            m && !k && (k = f.shadowGroup = d.g("shadow").add(b.shadowGroup));
                            k && k.attr(c);
                            h = b.pointAttribs(f, f.selected && "select")
                        }
                        f.delayedRendering ? (e.setRadialReference(b.center).attr(g).attr(c), a.styledMode || e.attr(h).attr({
                            "stroke-linejoin": "round"
                        }).shadow(m, k), f.delayedRendering = !1) : (e.setRadialReference(b.center), a.styledMode || u(!0, q, h), u(!0, q, g, c), e.animate(q));
                        e.attr({
                            visibility: f.visible ? "inherit" : "hidden"
                        });
                        e.addClass(f.getClassName())
                    } else e && (f.graphic = e.destroy())
                })
            },
            drawPoints: function() {
                var b = this.chart.renderer;
                this.points.forEach(function(a) {
                    a.graphic ||
                        (a.graphic = b[a.shapeType](a.shapeArgs).add(a.series.group), a.delayedRendering = !0)
                })
            },
            searchPoint: H,
            sortByAngle: function(b, a) {
                b.sort(function(b, c) {
                    return void 0 !== b.angle && (c.angle - b.angle) * a
                })
            },
            drawLegendSymbol: c.LegendSymbolMixin.drawRectangle,
            getCenter: n.getCenter,
            getSymbol: H,
            drawGraph: null
        }, {
            init: function() {
                C.prototype.init.apply(this, arguments);
                var b = this;
                b.name = y(b.name, "Slice");
                var a = function(a) {
                    b.slice("select" === a.type)
                };
                F(b, "select", a);
                F(b, "unselect", a);
                return b
            },
            isValid: function() {
                return D(this.y) &&
                    0 <= this.y
            },
            setVisible: function(b, a) {
                var c = this,
                    f = c.series,
                    e = f.chart,
                    h = f.options.ignoreHiddenPoint;
                a = y(a, h);
                b !== c.visible && (c.visible = c.options.visible = b = void 0 === b ? !c.visible : b, f.options.data[f.data.indexOf(c)] = c.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(a) {
                    if (c[a]) c[a][b ? "show" : "hide"](!0)
                }), c.legendItem && e.legend.colorizeItem(c, b), b || "hover" !== c.state || c.setState(""), h && (f.isDirty = !0), a && e.redraw())
            },
            slice: function(b, a, c) {
                var d = this.series;
                g(c, d.chart);
                y(a, !0);
                this.sliced =
                    this.options.sliced = A(b) ? b : !this.sliced;
                d.options.data[d.data.indexOf(this)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(b) {
                var a = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(a.x, a.y, a.r + b, a.r + b, {
                    innerR: a.r - 1,
                    start: a.start,
                    end: a.end
                })
            },
            connectorShapes: {
                fixedOffset: function(b,
                    a, c) {
                    var d = a.breakAt;
                    a = a.touchingSliceAt;
                    return ["M", b.x, b.y].concat(c.softConnector ? ["C", b.x + ("left" === b.alignment ? -5 : 5), b.y, 2 * d.x - a.x, 2 * d.y - a.y, d.x, d.y] : ["L", d.x, d.y]).concat(["L", a.x, a.y])
                },
                straight: function(b, a) {
                    a = a.touchingSliceAt;
                    return ["M", b.x, b.y, "L", a.x, a.y]
                },
                crookedLine: function(b, a, d) {
                    a = a.touchingSliceAt;
                    var f = this.series,
                        e = f.center[0],
                        h = f.chart.plotWidth,
                        g = f.chart.plotLeft;
                    f = b.alignment;
                    var m = this.shapeArgs.r;
                    d = c.relativeLength(d.crookDistance, 1);
                    d = "left" === f ? e + m + (h + g - e - m) * (1 - d) : g + (e - m) *
                        d;
                    e = ["L", d, b.y];
                    if ("left" === f ? d > b.x || d < a.x : d < b.x || d > a.x) e = [];
                    return ["M", b.x, b.y].concat(e).concat(["L", a.x, a.y])
                }
            },
            getConnectorPath: function() {
                var b = this.labelPosition,
                    a = this.series.options.dataLabels,
                    c = a.connectorShape,
                    f = this.connectorShapes;
                f[c] && (c = f[c]);
                return c.call(this, {
                    x: b.final.x,
                    y: b.final.y,
                    alignment: b.alignment
                }, b.connectorPosition, a)
            }
        });
        ""
    });
    N(H, "parts/DataLabels.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.isArray,
            F = n.objectEach,
            z = n.splat,
            u = c.arrayMax,
            H = c.extend,
            y = c.format,
            C = c.merge;
        n = c.noop;
        var x = c.pick,
            m = c.relativeLength,
            p = c.Series,
            g = c.seriesTypes,
            b = c.stableSort;
        c.distribute = function(a, d, f) {
            function e(a, b) {
                return a.target - b.target
            }
            var h, g = !0,
                m = a,
                q = [];
            var p = 0;
            var k = m.reducedLen || d;
            for (h = a.length; h--;) p += a[h].size;
            if (p > k) {
                b(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (p = h = 0; p <= k;) p += a[h].size, h++;
                q = a.splice(h - 1, a.length)
            }
            b(a, e);
            for (a = a.map(function(a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: x(a.align, .5)
                    }
                }); g;) {
                for (h = a.length; h--;) g =
                    a[h], p = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, p - g.size * g.align), d - g.size);
                h = a.length;
                for (g = !1; h--;) 0 < h && a[h - 1].pos + a[h - 1].size > a[h].pos && (a[h - 1].size += a[h].size, a[h - 1].targets = a[h - 1].targets.concat(a[h].targets), a[h - 1].align = .5, a[h - 1].pos + a[h - 1].size > d && (a[h - 1].pos = d - a[h - 1].size), a.splice(h, 1), g = !0)
            }
            m.push.apply(m, q);
            h = 0;
            a.some(function(a) {
                var b = 0;
                if (a.targets.some(function() {
                        m[h].pos = a.pos + b;
                        if (Math.abs(m[h].pos - m[h].target) > f) return m.slice(0, h + 1).forEach(function(a) {
                                delete a.pos
                            }),
                            m.reducedLen = (m.reducedLen || d) - .1 * d, m.reducedLen > .1 * d && c.distribute(m, d, f), !0;
                        b += m[h].size;
                        h++
                    })) return !0
            });
            b(m, e)
        };
        p.prototype.drawDataLabels = function() {
            function a(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, ">" === b && a > c || "<" === b && a < c || ">=" === b && a >= c || "<=" === b && a <= c || "==" === b && a == c || "===" === b && a === c ? !0 : !1) : !0
            }

            function b(a, b) {
                var c = [],
                    d;
                if (D(a) && !D(b)) c = a.map(function(a) {
                    return C(a, b)
                });
                else if (D(b) && !D(a)) c = b.map(function(b) {
                    return C(a, b)
                });
                else if (D(a) || D(b))
                    for (d = Math.max(a.length,
                            b.length); d--;) c[d] = C(a[d], b[d]);
                else c = C(a, b);
                return c
            }
            var f = this,
                e = f.chart,
                h = f.options,
                g = h.dataLabels,
                m = f.points,
                q, p = f.hasRendered || 0,
                k = c.animObject(h.animation).duration,
                t = Math.min(k, 200),
                n = !e.renderer.forExport && x(g.defer, 0 < t),
                u = e.renderer;
            g = b(b(e.options.plotOptions && e.options.plotOptions.series && e.options.plotOptions.series.dataLabels, e.options.plotOptions && e.options.plotOptions[f.type] && e.options.plotOptions[f.type].dataLabels), g);
            c.fireEvent(this, "drawDataLabels");
            if (D(g) || g.enabled || f._hasPointLabels) {
                var w =
                    f.plotGroup("dataLabelsGroup", "data-labels", n && !p ? "hidden" : "inherit", g.zIndex || 6);
                n && (w.attr({
                    opacity: +p
                }), p || setTimeout(function() {
                    var a = f.dataLabelsGroup;
                    a && (f.visible && w.show(!0), a[h.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: t
                    }))
                }, k - t));
                m.forEach(function(c) {
                    q = z(b(g, c.dlOptions || c.options && c.options.dataLabels));
                    q.forEach(function(b, d) {
                        var k = b.enabled && (!c.isNull || c.dataLabelOnNull) && a(c, b),
                            g = c.dataLabels ? c.dataLabels[d] : c.dataLabel,
                            l = c.connectors ? c.connectors[d] : c.connector,
                            q = x(b.distance,
                                c.labelDistance),
                            m = !g;
                        if (k) {
                            var t = c.getLabelConfig();
                            var p = x(b[c.formatPrefix + "Format"], b.format);
                            t = A(p) ? y(p, t, e.time) : (b[c.formatPrefix + "Formatter"] || b.formatter).call(t, b);
                            p = b.style;
                            var n = b.rotation;
                            e.styledMode || (p.color = x(b.color, p.color, f.color, "#000000"), "contrast" === p.color && (c.contrastColor = u.getContrast(c.color || f.color), p.color = !A(q) && b.inside || 0 > q || h.stacking ? c.contrastColor : "#000000"), h.cursor && (p.cursor = h.cursor));
                            var r = {
                                r: b.borderRadius || 0,
                                rotation: n,
                                padding: b.padding,
                                zIndex: 1
                            };
                            e.styledMode ||
                                (r.fill = b.backgroundColor, r.stroke = b.borderColor, r["stroke-width"] = b.borderWidth);
                            F(r, function(a, b) {
                                void 0 === a && delete r[b]
                            })
                        }!g || k && A(t) ? k && A(t) && (g ? r.text = t : (c.dataLabels = c.dataLabels || [], g = c.dataLabels[d] = n ? u.text(t, 0, -9999).addClass("highcharts-data-label") : u.label(t, 0, -9999, b.shape, null, null, b.useHTML, null, "data-label"), d || (c.dataLabel = g), g.addClass(" highcharts-data-label-color-" + c.colorIndex + " " + (b.className || "") + (b.useHTML ? " highcharts-tracker" : ""))), g.options = b, g.attr(r), e.styledMode || g.css(p).shadow(b.shadow),
                            g.added || g.add(w), b.textPath && !b.useHTML && g.setTextPath(c.getDataLabelPath && c.getDataLabelPath(g) || c.graphic, b.textPath), f.alignDataLabel(c, g, b, null, m)) : (c.dataLabel = c.dataLabel && c.dataLabel.destroy(), c.dataLabels && (1 === c.dataLabels.length ? delete c.dataLabels : delete c.dataLabels[d]), d || delete c.dataLabel, l && (c.connector = c.connector.destroy(), c.connectors && (1 === c.connectors.length ? delete c.connectors : delete c.connectors[d])))
                    })
                })
            }
            c.fireEvent(this, "afterDrawDataLabels")
        };
        p.prototype.alignDataLabel =
            function(a, b, c, e, h) {
                var d = this.chart,
                    f = this.isCartesian && d.inverted,
                    g = x(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                    m = x(a.plotY, -9999),
                    k = b.getBBox(),
                    p = c.rotation,
                    n = c.align,
                    u = this.visible && (a.series.forceDL || d.isInsidePlot(g, Math.round(m), f) || e && d.isInsidePlot(g, f ? e.x + 1 : e.y + e.height - 1, f)),
                    w = "justify" === x(c.overflow, "justify");
                if (u) {
                    var l = d.renderer.fontMetrics(d.styledMode ? void 0 : c.style.fontSize, b).b;
                    e = H({
                        x: f ? this.yAxis.len - m : g,
                        y: Math.round(f ? this.xAxis.len - g : m),
                        width: 0,
                        height: 0
                    }, e);
                    H(c, {
                        width: k.width,
                        height: k.height
                    });
                    p ? (w = !1, g = d.renderer.rotCorr(l, p), g = {
                        x: e.x + c.x + e.width / 2 + g.x,
                        y: e.y + c.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        } [c.verticalAlign] * e.height
                    }, b[h ? "attr" : "animate"](g).attr({
                        align: n
                    }), m = (p + 720) % 360, m = 180 < m && 360 > m, "left" === n ? g.y -= m ? k.height : 0 : "center" === n ? (g.x -= k.width / 2, g.y -= k.height / 2) : "right" === n && (g.x -= k.width, g.y -= m ? 0 : k.height), b.placed = !0, b.alignAttr = g) : (b.align(c, null, e), g = b.alignAttr);
                    w && 0 <= e.height ? this.justifyDataLabel(b, c, g, k, e, h) : x(c.crop, !0) && (u = d.isInsidePlot(g.x, g.y) && d.isInsidePlot(g.x +
                        k.width, g.y + k.height));
                    if (c.shape && !p) b[h ? "attr" : "animate"]({
                        anchorX: f ? d.plotWidth - a.plotY : a.plotX,
                        anchorY: f ? d.plotHeight - a.plotX : a.plotY
                    })
                }
                u || (b.hide(!0), b.placed = !1)
            };
        p.prototype.justifyDataLabel = function(a, b, c, e, g, m) {
            var d = this.chart,
                f = b.align,
                h = b.verticalAlign,
                k = a.box ? 0 : a.padding || 0;
            var p = c.x + k;
            if (0 > p) {
                "right" === f ? (b.align = "left", b.inside = !0) : b.x = -p;
                var n = !0
            }
            p = c.x + e.width - k;
            p > d.plotWidth && ("left" === f ? (b.align = "right", b.inside = !0) : b.x = d.plotWidth - p, n = !0);
            p = c.y + k;
            0 > p && ("bottom" === h ? (b.verticalAlign =
                "top", b.inside = !0) : b.y = -p, n = !0);
            p = c.y + e.height - k;
            p > d.plotHeight && ("top" === h ? (b.verticalAlign = "bottom", b.inside = !0) : b.y = d.plotHeight - p, n = !0);
            n && (a.placed = !m, a.align(b, null, g));
            return n
        };
        g.pie && (g.pie.prototype.dataLabelPositioners = {
                radialDistributionY: function(a) {
                    return a.top + a.distributeBox.pos
                },
                radialDistributionX: function(a, b, c, e) {
                    return a.getX(c < b.top + 2 || c > b.bottom - 2 ? e : c, b.half, b)
                },
                justify: function(a, b, c) {
                    return c[0] + (a.half ? -1 : 1) * (b + a.labelDistance)
                },
                alignToPlotEdges: function(a, b, c, e) {
                    a = a.getBBox().width;
                    return b ? a + e : c - a - e
                },
                alignToConnectors: function(a, b, c, e) {
                    var d = 0,
                        f;
                    a.forEach(function(a) {
                        f = a.dataLabel.getBBox().width;
                        f > d && (d = f)
                    });
                    return b ? d + e : c - d - e
                }
            }, g.pie.prototype.drawDataLabels = function() {
                var a = this,
                    b = a.data,
                    f, e = a.chart,
                    g = a.options.dataLabels,
                    m = g.connectorPadding,
                    n, q = e.plotWidth,
                    v = e.plotHeight,
                    k = e.plotLeft,
                    t = Math.round(e.chartWidth / 3),
                    y, z = a.center,
                    w = z[2] / 2,
                    l = z[1],
                    J, D, F, H, L = [
                        [],
                        []
                    ],
                    M, G, N, Q, P = [0, 0, 0, 0],
                    U = a.dataLabelPositioners,
                    V;
                a.visible && (g.enabled || a._hasPointLabels) && (b.forEach(function(a) {
                    a.dataLabel &&
                        a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                            width: "auto"
                        }).css({
                            width: "auto",
                            textOverflow: "clip"
                        }), a.dataLabel.shortened = !1)
                }), p.prototype.drawDataLabels.apply(a), b.forEach(function(a) {
                    a.dataLabel && (a.visible ? (L[a.half].push(a), a.dataLabel._pos = null, !A(g.style.width) && !A(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > t && (a.dataLabel.css({
                        width: .7 * t
                    }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels &&
                        1 === a.dataLabels.length && delete a.dataLabels))
                }), L.forEach(function(b, d) {
                    var h = b.length,
                        p = [],
                        n;
                    if (h) {
                        a.sortByAngle(b, d - .5);
                        if (0 < a.maxLabelDistance) {
                            var t = Math.max(0, l - w - a.maxLabelDistance);
                            var r = Math.min(l + w + a.maxLabelDistance, e.plotHeight);
                            b.forEach(function(a) {
                                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, l - w - a.labelDistance), a.bottom = Math.min(l + w + a.labelDistance, e.plotHeight), n = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                    target: a.labelPosition.natural.y - a.top + n / 2,
                                    size: n,
                                    rank: a.y
                                }, p.push(a.distributeBox))
                            });
                            t = r + n - t;
                            c.distribute(p, t, t / 5)
                        }
                        for (Q = 0; Q < h; Q++) {
                            f = b[Q];
                            F = f.labelPosition;
                            J = f.dataLabel;
                            N = !1 === f.visible ? "hidden" : "inherit";
                            G = t = F.natural.y;
                            p && A(f.distributeBox) && (void 0 === f.distributeBox.pos ? N = "hidden" : (H = f.distributeBox.size, G = U.radialDistributionY(f)));
                            delete f.positionIndex;
                            if (g.justify) M = U.justify(f, w, z);
                            else switch (g.alignTo) {
                                case "connectors":
                                    M = U.alignToConnectors(b, d, q, k);
                                    break;
                                case "plotEdges":
                                    M = U.alignToPlotEdges(J, d, q, k);
                                    break;
                                default:
                                    M = U.radialDistributionX(a, f, G, t)
                            }
                            J._attr = {
                                visibility: N,
                                align: F.alignment
                            };
                            J._pos = {
                                x: M + g.x + ({
                                    left: m,
                                    right: -m
                                } [F.alignment] || 0),
                                y: G + g.y - 10
                            };
                            F.final.x = M;
                            F.final.y = G;
                            x(g.crop, !0) && (D = J.getBBox().width, t = null, M - D < m && 1 === d ? (t = Math.round(D - M + m), P[3] = Math.max(t, P[3])) : M + D > q - m && 0 === d && (t = Math.round(M + D - q + m), P[1] = Math.max(t, P[1])), 0 > G - H / 2 ? P[0] = Math.max(Math.round(-G + H / 2), P[0]) : G + H / 2 > v && (P[2] = Math.max(Math.round(G + H / 2 - v), P[2])), J.sideOverflow = t)
                        }
                    }
                }), 0 === u(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(), this.points.forEach(function(b) {
                    V = C(g, b.options.dataLabels);
                    if (n = x(V.connectorWidth, 1)) {
                        var c;
                        y = b.connector;
                        if ((J = b.dataLabel) && J._pos && b.visible && 0 < b.labelDistance) {
                            N = J._attr.visibility;
                            if (c = !y) b.connector = y = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b.colorIndex + (b.className ? " " + b.className : "")).add(a.dataLabelsGroup), e.styledMode || y.attr({
                                "stroke-width": n,
                                stroke: V.connectorColor || b.color || "#666666"
                            });
                            y[c ? "attr" : "animate"]({
                                d: b.getConnectorPath()
                            });
                            y.attr("visibility", N)
                        } else y && (b.connector = y.destroy())
                    }
                }))
            }, g.pie.prototype.placeDataLabels =
            function() {
                this.points.forEach(function(a) {
                    var b = a.dataLabel,
                        c;
                    b && a.visible && ((c = b._pos) ? (b.sideOverflow && (b._attr.width = Math.max(b.getBBox().width - b.sideOverflow, 0), b.css({
                        width: b._attr.width + "px",
                        textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                    }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](c), b.moved = !0) : b && b.attr({
                        y: -9999
                    }));
                    delete a.distributeBox
                }, this)
            }, g.pie.prototype.alignDataLabel = n, g.pie.prototype.verifyDataLabelOverflow = function(a) {
                var b = this.center,
                    c = this.options,
                    e = c.center,
                    g = c.minSize || 80,
                    p = null !== c.size;
                if (!p) {
                    if (null !== e[0]) var n = Math.max(b[2] - Math.max(a[1], a[3]), g);
                    else n = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2;
                    null !== e[1] ? n = Math.max(Math.min(n, b[2] - Math.max(a[0], a[2])), g) : (n = Math.max(Math.min(n, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2);
                    n < b[2] ? (b[2] = n, b[3] = Math.min(m(c.innerSize || 0, n), n), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : p = !0
                }
                return p
            });
        g.column && (g.column.prototype.alignDataLabel = function(a, b, c, e, g) {
            var d =
                this.chart.inverted,
                f = a.series,
                h = a.dlBox || a.shapeArgs,
                m = x(a.below, a.plotY > x(this.translatedThreshold, f.yAxis.len)),
                k = x(c.inside, !!this.options.stacking);
            h && (e = C(h), 0 > e.y && (e.height += e.y, e.y = 0), h = e.y + e.height - f.yAxis.len, 0 < h && (e.height -= h), d && (e = {
                x: f.yAxis.len - e.y - e.height,
                y: f.xAxis.len - e.x - e.width,
                width: e.height,
                height: e.width
            }), k || (d ? (e.x += m ? 0 : e.width, e.width = 0) : (e.y += m ? e.height : 0, e.height = 0)));
            c.align = x(c.align, !d || k ? "center" : m ? "right" : "left");
            c.verticalAlign = x(c.verticalAlign, d || k ? "middle" : m ? "top" :
                "bottom");
            p.prototype.alignDataLabel.call(this, a, b, c, e, g);
            c.inside && a.contrastColor && b.css({
                color: a.contrastColor
            })
        })
    });
    N(H, "modules/overlapping-datalabels.src.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.isArray,
            D = n.objectEach;
        n = c.Chart;
        var F = c.pick,
            z = c.addEvent,
            u = c.fireEvent;
        z(n, "render", function() {
            var c = [];
            (this.labelCollectors || []).forEach(function(n) {
                c = c.concat(n())
            });
            (this.yAxis || []).forEach(function(n) {
                n.options.stackLabels && !n.options.stackLabels.allowOverlap &&
                    D(n.stacks, function(n) {
                        D(n, function(n) {
                            c.push(n.label)
                        })
                    })
            });
            (this.series || []).forEach(function(n) {
                var u = n.options.dataLabels;
                n.visible && (!1 !== u.enabled || n._hasPointLabels) && n.points.forEach(function(n) {
                    n.visible && (A(n.dataLabels) ? n.dataLabels : n.dataLabel ? [n.dataLabel] : []).forEach(function(m) {
                        var p = m.options;
                        m.labelrank = F(p.labelrank, n.labelrank, n.shapeArgs && n.shapeArgs.height);
                        p.allowOverlap || c.push(m)
                    })
                })
            });
            this.hideOverlappingLabels(c)
        });
        n.prototype.hideOverlappingLabels = function(c) {
            var n = this,
                z = c.length,
                x = n.renderer,
                m, p, g;
            var b = function(a) {
                var b = a.box ? 0 : a.padding || 0;
                var c = 0;
                if (a && (!a.alignAttr || a.placed)) {
                    var d = a.alignAttr || {
                        x: a.attr("x"),
                        y: a.attr("y")
                    };
                    var f = a.parentGroup;
                    a.width || (c = a.getBBox(), a.width = c.width, a.height = c.height, c = x.fontMetrics(null, a.element).h);
                    return {
                        x: d.x + (f.translateX || 0) + b,
                        y: d.y + (f.translateY || 0) + b - c,
                        width: a.width - 2 * b,
                        height: a.height - 2 * b
                    }
                }
            };
            for (p = 0; p < z; p++)
                if (m = c[p]) m.oldOpacity = m.opacity, m.newOpacity = 1, m.absoluteBox = b(m);
            c.sort(function(a, b) {
                return (b.labelrank ||
                    0) - (a.labelrank || 0)
            });
            for (p = 0; p < z; p++) {
                var a = (b = c[p]) && b.absoluteBox;
                for (m = p + 1; m < z; ++m) {
                    var d = (g = c[m]) && g.absoluteBox;
                    !a || !d || b === g || 0 === b.newOpacity || 0 === g.newOpacity || d.x > a.x + a.width || d.x + d.width < a.x || d.y > a.y + a.height || d.y + d.height < a.y || ((b.labelrank < g.labelrank ? b : g).newOpacity = 0)
                }
            }
            c.forEach(function(a) {
                var b;
                if (a) {
                    var c = a.newOpacity;
                    a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function() {
                        a.hide(!0);
                        a.placed = !1
                    }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b), u(n,
                        "afterHideOverlappingLabels")) : a.attr({
                        opacity: c
                    }));
                    a.isOld = !0
                }
            })
        }
    });
    N(H, "parts/Interaction.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.defined,
            D = n.isArray,
            F = n.isObject,
            z = n.objectEach,
            u = c.addEvent;
        n = c.Chart;
        var H = c.createElement,
            y = c.css,
            C = c.defaultOptions,
            x = c.defaultPlotOptions,
            m = c.extend,
            p = c.fireEvent,
            g = c.hasTouch,
            b = c.Legend,
            a = c.merge,
            d = c.pick,
            f = c.Point,
            e = c.Series,
            h = c.seriesTypes,
            r = c.svg;
        var E = c.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    d = function(a) {
                        var b = c.getPointFromEvent(a);
                        void 0 !== b && (c.isDirectTouch = !0, b.onMouseOver(a))
                    },
                    e;
                a.points.forEach(function(a) {
                    e = D(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    e.forEach(function(b) {
                        b.div ? b.div.point = a : b.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function(e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function(a) {
                            c.onTrackerMouseOut(a)
                        });
                        if (g) a[e].on("touchstart", d);
                        !b.styledMode && a.options.cursor &&
                            a[e].css(y).css({
                                cursor: a.options.cursor
                            })
                    }
                }), a._hasTracking = !0);
                p(this, "afterDrawTracker")
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length,
                    f = a.chart,
                    h = f.pointer,
                    l = f.renderer,
                    m = f.options.tooltip.snap,
                    n = a.tracker,
                    u, x = function() {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    },
                    y = "rgba(192,192,192," + (r ? .0001 : .002) + ")";
                if (e && !c)
                    for (u = e + 1; u--;) "M" === d[u] && d.splice(u + 1, 0, d[u + 1] - m, d[u + 2], "L"), (u && "M" === d[u] || u === e) && d.splice(u, 0, "L", d[u - 2] + m, d[u -
                        1]);
                n ? n.attr({
                    d: d
                }) : a.graph && (a.tracker = l.path(d).attr({
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(c ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), f.styledMode || a.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: y,
                    fill: c ? y : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * m)
                }), [a.tracker, a.markerGroup].forEach(function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", x).on("mouseout", function(a) {
                        h.onTrackerMouseOut(a)
                    });
                    b.cursor && !f.styledMode && a.css({
                        cursor: b.cursor
                    });
                    if (g) a.on("touchstart", x)
                }));
                p(this, "afterDrawTracker")
            }
        };
        h.column && (h.column.prototype.drawTracker = E.drawTrackerPoint);
        h.pie && (h.pie.prototype.drawTracker = E.drawTrackerPoint);
        h.scatter && (h.scatter.prototype.drawTracker = E.drawTrackerPoint);
        m(b.prototype, {
            setItemEvents: function(b, c, d) {
                var e = this,
                    g = e.chart.renderer.boxWrapper,
                    k = b instanceof f,
                    h = "highcharts-legend-" + (k ? "point" : "series") + "-active",
                    l = e.chart.styledMode;
                (d ? c : b.legendGroup).on("mouseover", function() {
                    b.visible && e.allItems.forEach(function(a) {
                        b !==
                            a && a.setState("inactive", !k)
                    });
                    b.setState("hover");
                    b.visible && g.addClass(h);
                    l || c.css(e.options.itemHoverStyle)
                }).on("mouseout", function() {
                    e.chart.styledMode || c.css(a(b.visible ? e.itemStyle : e.itemHiddenStyle));
                    e.allItems.forEach(function(a) {
                        b !== a && a.setState("", !k)
                    });
                    g.removeClass(h);
                    b.setState()
                }).on("click", function(a) {
                    var c = function() {
                        b.setVisible && b.setVisible();
                        e.allItems.forEach(function(a) {
                            b !== a && a.setState(b.visible ? "inactive" : "", !k)
                        })
                    };
                    g.removeClass(h);
                    a = {
                        browserEvent: a
                    };
                    b.firePointEvent ? b.firePointEvent("legendItemClick",
                        a, c) : p(b, "legendItemClick", a, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = H("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                u(a.checkbox, "click", function(b) {
                    p(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        m(n.prototype, {
            showResetZoom: function() {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    c = C.lang,
                    d = b.options.chart.resetZoomButton,
                    e = d.theme,
                    f =
                    e.states,
                    g = "chart" === d.relativeTo || "spaceBox" === d.relativeTo ? null : "plotBox";
                p(this, "beforeShowResetZoom", null, function() {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, e, f && f.hover).attr({
                        align: d.position.align,
                        title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1, g)
                });
                p(this, "afterShowResetZoom")
            },
            zoomOut: function() {
                p(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function(a) {
                var b = this,
                    c, e = b.pointer,
                    f = !1,
                    g = b.inverted ? e.mouseDownX : e.mouseDownY;
                !a ||
                    a.resetSelection ? (b.axes.forEach(function(a) {
                        c = a.zoom()
                    }), e.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function(a) {
                        var d = a.axis,
                            k = b.inverted ? d.left : d.top,
                            h = b.inverted ? k + d.width : k + d.height,
                            l = d.isXAxis,
                            m = !1;
                        if (!l && g >= k && g <= h || l || !A(g)) m = !0;
                        e[l ? "zoomX" : "zoomY"] && m && (c = d.zoom(a.min, a.max), d.displayBtn && (f = !0))
                    });
                var h = b.resetZoomButton;
                f && !h ? b.showResetZoom() : !f && F(h) && (b.resetZoomButton = h.destroy());
                c && b.redraw(d(b.options.chart.animation, a && a.animation, 100 > b.pointCount))
            },
            pan: function(a, b) {
                var c =
                    this,
                    d = c.hoverPoints,
                    e;
                p(this, "pan", {
                    originalEvent: a
                }, function() {
                    d && d.forEach(function(a) {
                        a.setState()
                    });
                    ("xy" === b ? [1, 0] : [1]).forEach(function(b) {
                        b = c[b ? "xAxis" : "yAxis"][0];
                        var d = b.horiz,
                            f = a[d ? "chartX" : "chartY"];
                        d = d ? "mouseDownX" : "mouseDownY";
                        var g = c[d],
                            k = (b.pointRange || 0) / 2,
                            h = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
                            m = b.getExtremes(),
                            n = b.toValue(g - f, !0) + k * h;
                        h = b.toValue(g + b.len - f, !0) - k * h;
                        var p = h < n;
                        g = p ? h : n;
                        n = p ? n : h;
                        h = Math.min(m.dataMin, k ? m.min : b.toValue(b.toPixels(m.min) - b.minPixelPadding));
                        k = Math.max(m.dataMax, k ? m.max : b.toValue(b.toPixels(m.max) + b.minPixelPadding));
                        p = h - g;
                        0 < p && (n += p, g = h);
                        p = n - k;
                        0 < p && (n = k, g -= p);
                        b.series.length && g !== m.min && n !== m.max && (b.setExtremes(g, n, !1, !1, {
                            trigger: "pan"
                        }), e = !0);
                        c[d] = f
                    });
                    e && c.redraw(!1);
                    y(c.container, {
                        cursor: "move"
                    })
                })
            }
        });
        m(f.prototype, {
            select: function(a, b) {
                var c = this,
                    e = c.series,
                    f = e.chart;
                this.selectedStaging = a = d(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    e.options.data[e.data.indexOf(c)] =
                        c.options;
                    c.setState(a && "select");
                    b || f.getSelectedPoints().forEach(function(a) {
                        var b = a.series;
                        a.selected && a !== c && (a.selected = a.options.selected = !1, b.options.data[b.data.indexOf(a)] = a.options, a.setState(f.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            },
            onMouseOver: function(a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a =
                    this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        d = a(b.series.options.point, b.options).events;
                    b.events = d;
                    z(d, function(a, d) {
                        c.isFunction(a) && u(b, d, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = this.series,
                    e = this.state,
                    f = c.options.states[a || "normal"] || {},
                    g = x[c.type].marker && c.options.marker,
                    h =
                    g && !1 === g.enabled,
                    l = g && g.states && g.states[a || "normal"] || {},
                    n = !1 === l.enabled,
                    q = c.stateMarkerGraphic,
                    r = this.marker || {},
                    v = c.chart,
                    u = c.halo,
                    y, z = g && c.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === f.enabled || a && (n || h && !1 === l.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
                    this.state = a;
                    z && (y = c.markerAttribs(this, a));
                    if (this.graphic) {
                        e && this.graphic.removeClass("highcharts-point-" + e);
                        a && this.graphic.addClass("highcharts-point-" + a);
                        if (!v.styledMode) {
                            var A =
                                c.pointAttribs(this, a);
                            var C = d(v.options.chart.animation, f.animation);
                            c.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function(a) {
                                a && a.animate({
                                    opacity: A.opacity
                                }, C)
                            }), this.connector && this.connector.animate({
                                opacity: A.opacity
                            }, C));
                            this.graphic.animate(A, C)
                        }
                        y && this.graphic.animate(y, d(v.options.chart.animation, l.animation, g.animation));
                        q && q.hide()
                    } else {
                        if (a && l) {
                            e = r.symbol || c.symbol;
                            q && q.currentSymbol !== e && (q = q.destroy());
                            if (y)
                                if (q) q[b ? "animate" : "attr"]({
                                    x: y.x,
                                    y: y.y
                                });
                                else e && (c.stateMarkerGraphic =
                                    q = v.renderer.symbol(e, y.x, y.y, y.width, y.height).add(c.markerGroup), q.currentSymbol = e);
                            !v.styledMode && q && q.attr(c.pointAttribs(this, a))
                        }
                        q && (q[a && this.isInside ? "show" : "hide"](), q.element.point = this)
                    }
                    a = f.halo;
                    f = (q = this.graphic || q) && q.visibility || "inherit";
                    a && a.size && q && "hidden" !== f ? (u || (c.halo = u = v.renderer.path().add(q.parentGroup)), u.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(a.size)
                    }), u.attr({
                        "class": "highcharts-halo highcharts-color-" + d(this.colorIndex, c.colorIndex) + (this.className ? " " + this.className :
                            ""),
                        visibility: f,
                        zIndex: -1
                    }), u.point = this, v.styledMode || u.attr(m({
                        fill: this.color || c.color,
                        "fill-opacity": a.opacity
                    }, a.attributes))) : u && u.point && u.point.haloPath && u.animate({
                        d: u.point.haloPath(0)
                    }, null, u.hide);
                    p(this, "afterSetState")
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        m(e.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && p(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && p(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                b.series.forEach(function(a) {
                    a.setState("", !0)
                })
            },
            setState: function(a, b) {
                var c = this,
                    e = c.options,
                    f = c.graph,
                    g = e.inactiveOtherPoints,
                    h = e.states,
                    l = e.lineWidth,
                    m = e.opacity,
                    n = d(h[a || "normal"] && h[a || "normal"].animation, c.chart.options.chart.animation);
                e = 0;
                a = a || "";
                if (c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function(b) {
                        b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a))
                    }), c.state = a, !c.chart.styledMode)) {
                    if (h[a] && !1 === h[a].enabled) return;
                    a && (l = h[a].lineWidth || l + (h[a].lineWidthPlus || 0), m = d(h[a].opacity, m));
                    if (f && !f.dashstyle)
                        for (h = {
                                "stroke-width": l
                            }, f.animate(h, n); c["zone-graph-" + e];) c["zone-graph-" + e].attr(h), e += 1;
                    g || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function(a) {
                        a &&
                            a.animate({
                                opacity: m
                            }, n)
                    })
                }
                b && g && c.points && c.setAllPointsToState(a)
            },
            setAllPointsToState: function(a) {
                this.points.forEach(function(b) {
                    b.setState && b.setState(a)
                })
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    f = d.options.chart.ignoreHiddenSeries,
                    g = c.visible;
                var h = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !g : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(a) {
                    if (c[a]) c[a][h]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) ===
                    c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && d.series.forEach(function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                c.linkedSeries.forEach(function(b) {
                    b.setVisible(a, !1)
                });
                f && (d.isDirtyBox = !0);
                p(c, h);
                !1 !== b && d.redraw()
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = this.options.selected = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                p(this, a ? "select" : "unselect")
            },
            drawTracker: E.drawTrackerGraph
        })
    });
    N(H, "parts/Responsive.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = n.isArray,
            D = n.isObject,
            F = n.objectEach,
            z = n.splat;
        n = c.Chart;
        var u = c.pick;
        n.prototype.setResponsive = function(n, u) {
            var y = this.options.responsive,
                x = [],
                m = this.currentResponsive;
            !u && y && y.rules && y.rules.forEach(function(m) {
                void 0 === m._id && (m._id = c.uniqueKey());
                this.matchResponsiveRule(m, x)
            }, this);
            u = c.merge.apply(0, x.map(function(m) {
                return c.find(y.rules, function(c) {
                    return c._id === m
                }).chartOptions
            }));
            u.isResponsiveOptions = !0;
            x = x.toString() || void 0;
            x !== (m && m.ruleIds) && (m && this.update(m.undoOptions, n, !0), x ? (m = this.currentOptions(u), m.isResponsiveOptions = !0, this.currentResponsive = {
                ruleIds: x,
                mergedOptions: u,
                undoOptions: m
            }, this.update(u, n, !0)) : this.currentResponsive = void 0)
        };
        n.prototype.matchResponsiveRule = function(c, n) {
            var y = c.condition;
            (y.callback || function() {
                return this.chartWidth <= u(y.maxWidth, Number.MAX_VALUE) && this.chartHeight <= u(y.maxHeight, Number.MAX_VALUE) && this.chartWidth >= u(y.minWidth, 0) && this.chartHeight >= u(y.minHeight,
                    0)
            }).call(this) && n.push(c._id)
        };
        n.prototype.currentOptions = function(c) {
            function n(c, p, g, b) {
                var a;
                F(c, function(c, f) {
                    if (!b && -1 < u.collectionsWithUpdate.indexOf(f))
                        for (c = z(c), g[f] = [], a = 0; a < c.length; a++) p[f][a] && (g[f][a] = {}, n(c[a], p[f][a], g[f][a], b + 1));
                    else D(c) ? (g[f] = A(c) ? [] : {}, n(c, p[f] || {}, g[f], b + 1)) : g[f] = void 0 === p[f] ? null : p[f]
                })
            }
            var u = this,
                x = {};
            n(c, this.options, x, 0);
            return x
        }
    });
    N(H, "masters/highcharts.src.js", [H["parts/Globals.js"], H["parts/Utilities.js"]], function(c, n) {
        var A = c.extend;
        A(c, {
            attr: n.attr,
            defined: n.defined,
            erase: n.erase,
            isArray: n.isArray,
            isClass: n.isClass,
            isDOMElement: n.isDOMElement,
            isNumber: n.isNumber,
            isObject: n.isObject,
            isString: n.isString,
            objectEach: n.objectEach,
            pInt: n.pInt,
            splat: n.splat
        });
        return c
    });
    H["masters/highcharts.src.js"]._modules = H;
    return H["masters/highcharts.src.js"]
});
//# sourceMappingURL=highcharts.js.map