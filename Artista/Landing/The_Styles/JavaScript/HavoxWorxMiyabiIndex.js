! function(a)
{
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}

(function(a) 
{
    function i(b) {
        var c = b || window.event,
            g = d.call(arguments, 1),
            i = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(c), b.type = "mousewheel", "detail" in c && (m = c.detail * -1), "wheelDelta" in c && (m = c.wheelDelta), "wheelDeltaY" in c && (m = c.wheelDeltaY), "wheelDeltaX" in c && (l = c.wheelDeltaX * -1), "axis" in c && c.axis === c.HORIZONTAL_AXIS && (l = m * -1, m = 0), i = 0 === m ? l : m, "deltaY" in c && (m = c.deltaY * -1, i = m), "deltaX" in c && (l = c.deltaX, 0 === m && (i = l * -1)), 0 !== m || 0 !== l) {
            if (1 === c.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                i *= q, m *= q, l *= q
            } else if (2 === c.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                i *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || n < f) && (f = n, k(c, n) && (f /= 40)), k(c, n) && (i /= 40, l /= 40, m /= 40), i = Math[i >= 1 ? "floor" : "ceil"](i / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), h.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, g.unshift(b, i, l, m), e && clearTimeout(e), e = setTimeout(j, 200), (a.event.dispatch || a.event.handle).apply(this, g)
        }
    }

    function j() {
        f = null
    }

    function k(a, b) {
        return h.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, b = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        c = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        d = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var g = b.length; g;) a.event.fixHooks[b[--g]] = a.event.mouseHooks;
    var h = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var b = c.length; b;) this.addEventListener(c[--b], i, !1);
            else this.onmousewheel = i;
            a.data(this, "mousewheel-line-height", h.getLineHeight(this)), a.data(this, "mousewheel-page-height", h.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var b = c.length; b;) this.removeEventListener(c[--b], i, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
}),
function(a) {
    function i() {
        this === b.elem && (b.pos = [-260, -260], b.elem = !1, c = 3)
    }
    var g, h, b = {
            pos: [-260, -260]
        },
        c = 3,
        d = document,
        e = d.documentElement,
        f = d.body;
    a.event.special.mwheelIntent = {
        setup: function() {
            var b = a(this).bind("mousewheel", a.event.special.mwheelIntent.handler);
            return this !== d && this !== e && this !== f && b.bind("mouseleave", i), b = null, !0
        },
        teardown: function() {
            return a(this).unbind("mousewheel", a.event.special.mwheelIntent.handler).unbind("mouseleave", i), !0
        },
        handler: function(d, e) {
            var f = [d.clientX, d.clientY];
            if (this === b.elem || Math.abs(b.pos[0] - f[0]) > c || Math.abs(b.pos[1] - f[1]) > c) return b.elem = this, b.pos = f, c = 250, clearTimeout(h), h = setTimeout(function() {
                c = 10
            }, 200), clearTimeout(g), g = setTimeout(function() {
                c = 3
            }, 1500), d = a.extend({}, d, {
                type: "mwheelIntent"
            }), (a.event.dispatch || a.event.handle).apply(this, arguments)
        }
    }, a.fn.extend({
        mwheelIntent: function(a) {
            return a ? this.bind("mwheelIntent", a) : this.trigger("mwheelIntent")
        },
        unmwheelIntent: function(a) {
            return this.unbind("mwheelIntent", a)
        }
    }), a(function() {
        f = d.body, a(d).bind("mwheelIntent.mwheelIntentDefault", a.noop)
    })
}(jQuery),
function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    a.fn.jScrollPane = function(b) {
        function c(b, c) {
            function S(c) {
                var e, p, q, s, t, v, w = !1,
                    x = !1;
                if (d = c, d.maxMobileWidth && d.maxMobileWidth > window.innerWidth) {
                    var y = b.find(".jspPane");
                    if (y.length) {
                        var z = y.children();
                        b.empty().removeClass("jspScrollable").removeAttr("style").append(z).unbind(".jsp"), f = void 0
                    }
                } else {
                    if (void 0 === f) t = b.scrollTop(), v = b.scrollLeft(), b.css({
                        overflow: "hidden",
                        padding: 0
                    }), g = b.innerWidth() + K, h = b.innerHeight(), b.width(g), f = a('<div class="jspPane" />').css("padding", J).append(b.children()), i = a('<div class="jspContainer" />').css({
                        width: g + "px",
                        height: h + "px"
                    }).append(f).appendTo(b);
                    else {
                        if (b.css("width", ""), w = d.stickToBottom && na(), x = d.stickToRight && oa(), s = b.innerWidth() + K != g || b.outerHeight() != h, s && (g = b.innerWidth() + K, h = b.innerHeight(), i.css({
                                width: g + "px",
                                height: h + "px"
                            })), !s && L == j && f.outerHeight() == k) return void b.width(g);
                        L = j, f.css("width", ""), b.width(g), i.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                    }
                    f.css("overflow", "auto"), j = c.contentWidth ? c.contentWidth : f[0].scrollWidth, k = f[0].scrollHeight, f.css("overflow", ""), l = j / g, m = k / h, n = m > 1, o = l > 1, o || n ? (b.addClass("jspScrollable"), e = d.maintainPosition && (r || u), e && (p = la(), q = ma()), T(), V(), X(), e && (ja(x ? j - g : p, !1), ia(w ? k - h : q, !1)), sa(), pa(), ya(), d.enableKeyboardNavigation && ua(), d.clickOnTrack && _(), wa(), d.hijackInternalLinks && xa()) : (b.removeClass("jspScrollable"), f.css({
                        top: 0,
                        left: 0,
                        width: i.width() - K
                    }), qa(), ta(), va(), aa()), d.autoReinitialise && !I ? I = setInterval(function() {
                        S(d)
                    }, d.autoReinitialiseDelay) : !d.autoReinitialise && I && clearInterval(I), t && b.scrollTop(0) && ia(t, !1), v && b.scrollLeft(0) && ja(v, !1), b.trigger("jsp-initialised", [o || n])
                }
            }

            function T() {
                n && (i.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'), a('<div class="jspDragBottom" />'))), a('<div class="jspCap jspCapBottom" />'))), v = i.find(">.jspVerticalBar"), w = v.find(">.jspTrack"), p = w.find(">.jspDrag"), d.showArrows && (A = a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", Z(0, -1)).bind("click.jsp", ra), B = a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", Z(0, 1)).bind("click.jsp", ra), d.arrowScrollOnHover && (A.bind("mouseover.jsp", Z(0, -1, A)), B.bind("mouseover.jsp", Z(0, 1, B))), Y(w, d.verticalArrowPositions, A, B)), y = h, i.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function() {
                    y -= a(this).outerHeight()
                }), p.hover(function() {
                    p.addClass("jspHover")
                }, function() {
                    p.removeClass("jspHover")
                }).bind("mousedown.jsp", function(b) {
                    a("html").bind("dragstart.jsp selectstart.jsp", ra), p.addClass("jspActive");
                    var c = b.pageY - p.position().top;
                    return a("html").bind("mousemove.jsp", function(a) {
                        ca(a.pageY - c, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", ba), !1
                }), U())
            }

            function U() {
                w.height(y + "px"), r = 0, x = d.verticalGutter + w.outerWidth(), f.width(g - x - K);
                try {
                    0 === v.position().left && f.css("margin-left", x + "px")
                } catch (a) {}
            }

            function V() {
                o && (i.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'), a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'), a('<div class="jspDragRight" />'))), a('<div class="jspCap jspCapRight" />'))), C = i.find(">.jspHorizontalBar"), D = C.find(">.jspTrack"), s = D.find(">.jspDrag"), d.showArrows && (G = a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", Z(-1, 0)).bind("click.jsp", ra), H = a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", Z(1, 0)).bind("click.jsp", ra), d.arrowScrollOnHover && (G.bind("mouseover.jsp", Z(-1, 0, G)), H.bind("mouseover.jsp", Z(1, 0, H))), Y(D, d.horizontalArrowPositions, G, H)), s.hover(function() {
                    s.addClass("jspHover")
                }, function() {
                    s.removeClass("jspHover")
                }).bind("mousedown.jsp", function(b) {
                    a("html").bind("dragstart.jsp selectstart.jsp", ra), s.addClass("jspActive");
                    var c = b.pageX - s.position().left;
                    return a("html").bind("mousemove.jsp", function(a) {
                        ea(a.pageX - c, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", ba), !1
                }), E = i.innerWidth(), W())
            }

            function W() {
                i.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function() {
                    E -= a(this).outerWidth()
                }), D.width(E + "px"), u = 0
            }

            function X() {
                if (o && n) {
                    var b = D.outerHeight(),
                        c = w.outerWidth();
                    y -= b, a(C).find(">.jspCap:visible,>.jspArrow").each(function() {
                        E += a(this).outerWidth()
                    }), E -= c, h -= c, g -= b, D.parent().append(a('<div class="jspCorner" />').css("width", b + "px")), U(), W()
                }
                o && f.width(i.outerWidth() - K + "px"), k = f.outerHeight(), m = k / h, o && (F = Math.ceil(1 / l * E), F > d.horizontalDragMaxWidth ? F = d.horizontalDragMaxWidth : F < d.horizontalDragMinWidth && (F = d.horizontalDragMinWidth), s.width(F + "px"), t = E - F, fa(u)), n && (z = Math.ceil(1 / m * y), z > d.verticalDragMaxHeight ? z = d.verticalDragMaxHeight : z < d.verticalDragMinHeight && (z = d.verticalDragMinHeight), p.height(z + "px"), q = y - z, da(r))
            }

            function Y(a, b, c, d) {
                var g, e = "before",
                    f = "after";
                "os" == b && (b = /Mac/.test(navigator.platform) ? "after" : "split"), b == e ? f = b : b == f && (e = b, g = c, c = d, d = g), a[e](c)[f](d)
            }

            function Z(a, b, c) {
                return function() {
                    return $(a, b, this, c), this.blur(), !1
                }
            }

            function $(b, c, f, g) {
                f = a(f).addClass("jspActive");
                var h, i, j = !0,
                    k = function() {
                        0 !== b && e.scrollByX(b * d.arrowButtonSpeed), 0 !== c && e.scrollByY(c * d.arrowButtonSpeed), i = setTimeout(k, j ? d.initialDelay : d.arrowRepeatFreq), j = !1
                    };
                k(), h = g ? "mouseout.jsp" : "mouseup.jsp", g = g || a("html"), g.bind(h, function() {
                    f.removeClass("jspActive"), i && clearTimeout(i), i = null, g.unbind(h)
                })
            }

            function _() {
                aa(), n && w.bind("mousedown.jsp", function(b) {
                    if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) {
                        var i, c = a(this),
                            f = c.offset(),
                            g = b.pageY - f.top - r,
                            j = !0,
                            l = function() {
                                var a = c.offset(),
                                    f = b.pageY - a.top - z / 2,
                                    n = h * d.scrollPagePercent,
                                    o = q * n / (k - h);
                                if (g < 0) r - o > f ? e.scrollByY(-n) : ca(f);
                                else {
                                    if (!(g > 0)) return void m();
                                    r + o < f ? e.scrollByY(n) : ca(f)
                                }
                                i = setTimeout(l, j ? d.initialDelay : d.trackClickRepeatFreq), j = !1
                            },
                            m = function() {
                                i && clearTimeout(i), i = null, a(document).unbind("mouseup.jsp", m)
                            };
                        return l(), a(document).bind("mouseup.jsp", m), !1
                    }
                }), o && D.bind("mousedown.jsp", function(b) {
                    if (void 0 === b.originalTarget || b.originalTarget == b.currentTarget) {
                        var i, c = a(this),
                            f = c.offset(),
                            h = b.pageX - f.left - u,
                            k = !0,
                            l = function() {
                                var a = c.offset(),
                                    f = b.pageX - a.left - F / 2,
                                    n = g * d.scrollPagePercent,
                                    o = t * n / (j - g);
                                if (h < 0) u - o > f ? e.scrollByX(-n) : ea(f);
                                else {
                                    if (!(h > 0)) return void m();
                                    u + o < f ? e.scrollByX(n) : ea(f)
                                }
                                i = setTimeout(l, k ? d.initialDelay : d.trackClickRepeatFreq), k = !1
                            },
                            m = function() {
                                i && clearTimeout(i), i = null, a(document).unbind("mouseup.jsp", m)
                            };
                        return l(), a(document).bind("mouseup.jsp", m), !1
                    }
                })
            }

            function aa() {
                D && D.unbind("mousedown.jsp"), w && w.unbind("mousedown.jsp")
            }

            function ba() {
                a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"), p && p.removeClass("jspActive"), s && s.removeClass("jspActive")
            }

            function ca(a, b) {
                n && (a < 0 ? a = 0 : a > q && (a = q), void 0 === b && (b = d.animateScroll), b ? e.animate(p, "top", a, da) : (p.css("top", a), da(a)))
            }

            function da(a) {
                void 0 === a && (a = p.position().top), i.scrollTop(0), r = a || 0;
                var c = 0 === r,
                    d = r == q,
                    e = a / q,
                    g = -e * (k - h);
                M == c && O == d || (M = c, O = d, b.trigger("jsp-arrow-change", [M, O, N, P])), ga(c, d), f.css("top", g), b.trigger("jsp-scroll-y", [-g, c, d]).trigger("scroll")
            }

            function ea(a, b) {
                o && (a < 0 ? a = 0 : a > t && (a = t), void 0 === b && (b = d.animateScroll), b ? e.animate(s, "left", a, fa) : (s.css("left", a), fa(a)))
            }

            function fa(a) {
                void 0 === a && (a = s.position().left), i.scrollTop(0), u = a || 0;
                var c = 0 === u,
                    d = u == t,
                    e = a / t,
                    h = -e * (j - g);
                N == c && P == d || (N = c, P = d, b.trigger("jsp-arrow-change", [M, O, N, P])), ha(c, d), f.css("left", h), b.trigger("jsp-scroll-x", [-h, c, d]).trigger("scroll")
            }

            function ga(a, b) {
                d.showArrows && (A[a ? "addClass" : "removeClass"]("jspDisabled"), B[b ? "addClass" : "removeClass"]("jspDisabled"))
            }

            function ha(a, b) {
                d.showArrows && (G[a ? "addClass" : "removeClass"]("jspDisabled"), H[b ? "addClass" : "removeClass"]("jspDisabled"))
            }

            function ia(a, b) {
                var c = a / (k - h);
                ca(c * q, b)
            }

            function ja(a, b) {
                var c = a / (j - g);
                ea(c * t, b)
            }

            function ka(b, c, e) {
                var f, j, k, n, o, p, q, r, s, l = 0,
                    m = 0;
                try {
                    f = a(b)
                } catch (a) {
                    return
                }
                for (j = f.outerHeight(), k = f.outerWidth(), i.scrollTop(0), i.scrollLeft(0); !f.is(".jspPane");)
                    if (l += f.position().top, m += f.position().left, f = f.offsetParent(), /^body|html$/i.test(f[0].nodeName)) return;
                n = ma(), p = n + h, l < n || c ? r = l - d.horizontalGutter : l + j > p && (r = l - h + j + d.horizontalGutter), isNaN(r) || ia(r, e), o = la(), q = o + g, m < o || c ? s = m - d.horizontalGutter : m + k > q && (s = m - g + k + d.horizontalGutter), isNaN(s) || ja(s, e)
            }

            function la() {
                return -f.position().left
            }

            function ma() {
                return -f.position().top
            }

            function na() {
                var a = k - h;
                return a > 20 && a - ma() < 10
            }

            function oa() {
                var a = j - g;
                return a > 20 && a - la() < 10
            }

            function pa() {
                i.unbind(R).bind(R, function(a, b, c, f) {
                    u || (u = 0), r || (r = 0);
                    var g = u,
                        h = r,
                        i = a.deltaFactor || d.mouseWheelSpeed;
                    return e.scrollBy(c * i, -f * i, !1), g == u && h == r
                })
            }

            function qa() {
                i.unbind(R)
            }

            function ra() {
                return !1
            }

            function sa() {
                f.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function(a) {
                    ka(a.target, !1)
                })
            }

            function ta() {
                f.find(":input,a").unbind("focus.jsp")
            }

            function ua() {
                function l() {
                    var a = u,
                        b = r;
                    switch (c) {
                        case 40:
                            e.scrollByY(d.keyboardSpeed, !1);
                            break;
                        case 38:
                            e.scrollByY(-d.keyboardSpeed, !1);
                            break;
                        case 34:
                        case 32:
                            e.scrollByY(h * d.scrollPagePercent, !1);
                            break;
                        case 33:
                            e.scrollByY(-h * d.scrollPagePercent, !1);
                            break;
                        case 39:
                            e.scrollByX(d.keyboardSpeed, !1);
                            break;
                        case 37:
                            e.scrollByX(-d.keyboardSpeed, !1)
                    }
                    return g = a != u || b != r
                }
                var c, g, j = [];
                o && j.push(C[0]), n && j.push(v[0]), f.focus(function() {
                    b.focus()
                }), b.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function(b) {
                    if (b.target === this || j.length && a(b.target).closest(j).length) {
                        var d = u,
                            e = r;
                        switch (b.keyCode) {
                            case 40:
                            case 38:
                            case 34:
                            case 32:
                            case 33:
                            case 39:
                            case 37:
                                c = b.keyCode, l();
                                break;
                            case 35:
                                ia(k - h), c = null;
                                break;
                            case 36:
                                ia(0), c = null
                        }
                        return g = b.keyCode == c && d != u || e != r, !g
                    }
                }).bind("keypress.jsp", function(a) {
                    return a.keyCode == c && l(), !g
                }), d.hideFocus ? (b.css("outline", "none"), "hideFocus" in i[0] && b.attr("hideFocus", !0)) : (b.css("outline", ""), "hideFocus" in i[0] && b.attr("hideFocus", !1))
            }

            function va() {
                b.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
            }

            function wa() {
                if (location.hash && location.hash.length > 1) {
                    var b, c, d = escape(location.hash.substr(1));
                    try {
                        b = a("#" + d + ', a[name="' + d + '"]')
                    } catch (a) {
                        return
                    }
                    b.length && f.find(d) && (0 === i.scrollTop() ? c = setInterval(function() {
                        i.scrollTop() > 0 && (ka(b, !0), a(document).scrollTop(i.position().top), clearInterval(c))
                    }, 50) : (ka(b, !0), a(document).scrollTop(i.position().top)))
                }
            }

            function xa() {
                a(document.body).data("jspHijack") || (a(document.body).data("jspHijack", !0), a(document.body).delegate("a[href*=#]", "click", function(b) {
                    var e, f, g, h, i, j, c = this.href.substr(0, this.href.indexOf("#")),
                        d = location.href;
                    if (location.href.indexOf("#") !== -1 && (d = location.href.substr(0, location.href.indexOf("#"))), c === d) {
                        e = escape(this.href.substr(this.href.indexOf("#") + 1));
                        try {
                            f = a("#" + e + ', a[name="' + e + '"]')
                        } catch (a) {
                            return
                        }
                        f.length && (g = f.closest(".jspScrollable"), h = g.data("jsp"), h.scrollToElement(f, !0), g[0].scrollIntoView && (i = a(window).scrollTop(), j = f.offset().top, (j < i || j > i + a(window).height()) && g[0].scrollIntoView()), b.preventDefault())
                    }
                }))
            }

            function ya() {
                var a, b, c, d, f, g = !1;
                i.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function(e) {
                    var h = e.originalEvent.touches[0];
                    a = la(), b = ma(), c = h.pageX, d = h.pageY, f = !1, g = !0
                }).bind("touchmove.jsp", function(h) {
                    if (g) {
                        var i = h.originalEvent.touches[0],
                            j = u,
                            k = r;
                        return e.scrollTo(a + c - i.pageX, b + d - i.pageY), f = f || Math.abs(c - i.pageX) > 5 || Math.abs(d - i.pageY) > 5, j == u && k == r
                    }
                }).bind("touchend.jsp", function(a) {
                    g = !1
                }).bind("click.jsp-touchclick", function(a) {
                    if (f) return f = !1, !1
                })
            }

            function za() {
                var a = ma(),
                    c = la();
                b.removeClass("jspScrollable").unbind(".jsp"), b.replaceWith(Q.append(f.children())), Q.scrollTop(a), Q.scrollLeft(c), I && clearInterval(I)
            }
            var d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, e = this,
                M = !0,
                N = !0,
                O = !1,
                P = !1,
                Q = b.clone(!1, !1).empty(),
                R = a.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
            "border-box" === b.css("box-sizing") ? (J = 0, K = 0) : (J = b.css("paddingTop") + " " + b.css("paddingRight") + " " + b.css("paddingBottom") + " " + b.css("paddingLeft"), K = (parseInt(b.css("paddingLeft"), 10) || 0) + (parseInt(b.css("paddingRight"), 10) || 0)), a.extend(e, {
                reinitialise: function(b) {
                    b = a.extend({}, d, b), S(b)
                },
                scrollToElement: function(a, b, c) {
                    ka(a, b, c)
                },
                scrollTo: function(a, b, c) {
                    ja(a, c), ia(b, c)
                },
                scrollToX: function(a, b) {
                    ja(a, b)
                },
                scrollToY: function(a, b) {
                    ia(a, b)
                },
                scrollToPercentX: function(a, b) {
                    ja(a * (j - g), b)
                },
                scrollToPercentY: function(a, b) {
                    ia(a * (k - h), b)
                },
                scrollBy: function(a, b, c) {
                    e.scrollByX(a, c), e.scrollByY(b, c)
                },
                scrollByX: function(a, b) {
                    var c = la() + Math[a < 0 ? "floor" : "ceil"](a),
                        d = c / (j - g);
                    ea(d * t, b)
                },
                scrollByY: function(a, b) {
                    var c = ma() + Math[a < 0 ? "floor" : "ceil"](a),
                        d = c / (k - h);
                    ca(d * q, b)
                },
                positionDragX: function(a, b) {
                    ea(a, b)
                },
                positionDragY: function(a, b) {
                    ca(a, b)
                },
                animate: function(a, b, c, e) {
                    var f = {};
                    f[b] = c, a.animate(f, {
                        duration: d.animateDuration,
                        easing: d.animateEase,
                        queue: !1,
                        step: e
                    })
                },
                getContentPositionX: function() {
                    return la()
                },
                getContentPositionY: function() {
                    return ma()
                },
                getContentWidth: function() {
                    return j
                },
                getContentHeight: function() {
                    return k
                },
                getPercentScrolledX: function() {
                    return la() / (j - g)
                },
                getPercentScrolledY: function() {
                    return ma() / (k - h)
                },
                getIsScrollableH: function() {
                    return o
                },
                getIsScrollableV: function() {
                    return n
                },
                getContentPane: function() {
                    return f
                },
                scrollToBottom: function(a) {
                    ca(q, a)
                },
                hijackInternalLinks: a.noop,
                destroy: function() {
                    za()
                }
            }), S(c)
        }
        return b = a.extend({}, a.fn.jScrollPane.defaults, b), a.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function() {
            b[this] = b[this] || b.speed
        }), this.each(function() {
            var d = a(this),
                e = d.data("jsp");
            e ? e.reinitialise(b) : (a("script", d).filter('[type="text/javascript"],:not([type])').remove(), e = new c(d, b), d.data("jsp", e))
        })
    }, a.fn.jScrollPane.defaults = {
        showArrows: !1,
        maintainPosition: !0,
        stickToBottom: !1,
        stickToRight: !1,
        clickOnTrack: !0,
        autoReinitialise: !1,
        autoReinitialiseDelay: 500,
        verticalDragMinHeight: 0,
        verticalDragMaxHeight: 99999,
        horizontalDragMinWidth: 0,
        horizontalDragMaxWidth: 99999,
        contentWidth: void 0,
        animateScroll: !1,
        animateDuration: 300,
        animateEase: "linear",
        hijackInternalLinks: !1,
        verticalGutter: 4,
        horizontalGutter: 4,
        mouseWheelSpeed: 3,
        arrowButtonSpeed: 0,
        arrowRepeatFreq: 50,
        arrowScrollOnHover: !1,
        trackClickSpeed: 0,
        trackClickRepeatFreq: 70,
        verticalArrowPositions: "split",
        horizontalArrowPositions: "split",
        enableKeyboardNavigation: !0,
        hideFocus: !1,
        keyboardSpeed: 0,
        initialDelay: 300,
        speed: 30,
        scrollPagePercent: .8,
        maxMobileWidth: 667
    }
}),
function() {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
        var d = (new Date).getTime(),
            e = Math.max(0, 16 - (d - a)),
            f = window.setTimeout(function() {
                b(d + e)
            }, e);
        return a = d + e, f
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    })
}(),
function(a) {
    "use strict";
    a.fn.lens = function(b) {
        function m() {
            f--, a(this).attr("draggable", "false").addClass("lens").bind("dragstart", function() {
                return !1
            }).appendTo(d), f || (setTimeout(function() {
                var b = a.Event("mousemove");
                b.pageX = j.x / 3, b.pageY = j.y / 3, r(b)
            }, 1500), "function" == typeof c.onLoaded && (q(), c.onLoaded()))
        }

        function o() {
            var a = navigator.userAgent;
            return a.indexOf("Chrome") > -1 ? "webkit" : a.indexOf("Safari") > -1 ? "webkit" : a.indexOf("Opera") > -1 ? "o" : a.indexOf("Firefox") > -1 ? "moz" : a.indexOf("MSIE") > -1 ? "ms" : a.indexOf(".NET") > -1 ? "ms" : void 0
        }

        function p() {
            q()
        }

        function q() {
            g = Math.ceil(Math.min(window.innerWidth, window.innerHeight) * c.radius), h = Math.ceil(g / 2), j = {
                x: Math.ceil(window.innerWidth / 2),
                y: Math.ceil(window.innerHeight / 2)
            }, i = Math.ceil(Math.sqrt(j.x * j.x + j.y * j.y)), d.css({
                width: g,
                height: g,
                marginTop: Math.ceil((window.innerHeight - g) / 2)
            })
        }

        function r(b) {
            var c = /mouse/i.test(b.type) ? b : b.originalEvent.touches[0],
                d = 13,
                f = Math.pow(c.pageX - j.x, 2) + Math.pow(c.pageY - j.y, 2),
                g = Math.ceil(Math.sqrt(f)),
                h = Math.ceil(g * d / i);
            h = Math.max(h - 2, 0), s(h), a(e[0]).css({
                transform: "rotate(" + 3 * h + "deg)"
            }), a(e[1]).css({
                transform: "rotate(" + 2 * h + "deg)"
            }), a(e[2]).css({
                transform: "rotate(-" + 1 * h + "deg)"
            })
        }

        function s(a) {
            var b;
            switch (a = Math.min(a, 3), o()) {
                case "webkit":
                    b = {
                        "-webkit-filter": "blur(" + a + "px)"
                    };
                    break;
                case "moz":
                    b = {
                        filter: "blur(" + a + "px)"
                    };
                    break;
                case "ms":
                    b = {
                        filter: 'progid:DXImageTransform.Microsoft.Blur(PixelRadius="' + a + '")'
                    };
                    break;
                default:
                    b = {
                        filter: "blur(" + a + "px)"
                    }
            }
            l.css(b)
        }
        var k, l, c = a.extend({
                radius: .872,
                smoothing: !0,
                images: [],
                logo: "",
                onLoaded: function() {}
            }, b),
            d = a(this),
            e = [],
            f = 0,
            g = 0,
            h = 0,
            i = 0,
            j = 0;
        if (!c.images.length) return console.error("Images not found."), null;
        f = c.images.length + 1;
        for (var n = 0; n < c.images.length; n++) k = new Image, k.onload = m, k.src = c.images[n][0], k.className = c.images[n][1], e.push(k);
        return k = new Image, k.onload = m, k.src = c.logo[0], k.className = c.logo[1], l = a(k), a(window).on({
            mousemove: r,
            touchmove: r,
            load: p,
            resize: q
        }), a(this)
    }
}(jQuery),
    function(a) {
        "use strict";
        a.fn.waitForImages = function(b) {
            var c = a(this).find("img"),
                d = c.length,
                e = a("body").hasClass("device"),
                f = function() {
                    "function" == typeof b && b()
                };
            return e || !d ? (a(window).load(function() {
                f()
            }), this) : (c.each(function() {
                var b = a(this),
                    c = b.attr("src");
                b.removeAttr("src"), b.load(function() {
                    d--, 0 === d && f()
                }), b.attr("src", c)
            }), this)
        }
    }(jQuery);
var vars = vars || {};
! function(a) {
    "use strict";
    var b = {
        currentPageName: void 0
    };
    a.extend(b, {
        maxMobileWidth: 737,
        isDevice: "undefined" != typeof window.orientation || navigator.userAgent.indexOf("IEMobile") !== -1,
        isSessionStorage: function() {
            var a = "sessionStorage";
            try {
                return sessionStorage.setItem(a, a), sessionStorage.removeItem(a), !0
            } catch (a) {
                return !1
            }
        },
        duration1: 600,
        duration2: 400
    }), a.fn.animateOut = function(c, d, e) {
        a(this).stop(!0, !0).animate({
            opacity: 0
        }, {
            duration: c || b.duration1,
            progress: function(a, b) {
                "function" == typeof e && e.call(this, b)
            },
            complete: function() {
                a(this).hide(), "function" == typeof d && d.call(this)
            }
        }, "swing")
    }, a.fn.animateIn = function(c, d, e) {
        a(this).stop(!0, !0).show().animate({
            opacity: 1
        }, {
            duration: c || b.duration1,
            progress: function(a, b) {
                "function" == typeof e && e.call(this, b)
            },
            complete: function() {
                "function" == typeof d && d.call(this)
            }
        }, "swing")
    }, a.extend(b, {
        preloader: {
            $loader: a(".page-loader"),
            $content: a(".page-content"),
            $header: a(".site-header"),
            $footer: a(".site-footer"),
            iteration: 2,
            hide: function(c) {
                var d = a(c);
                d = d.length ? d : b.preloader.$content, this.iteration--, this.iteration <= 0 && b.preloader.$loader.fadeOut(b.duration1, function() {
                    d.animateIn(b.duration1)
                })
            },
            showBefore: function(a) {
                b.preloader.$content.animateOut(b.duration1, function() {
                    b.preloader.$loader.fadeIn(b.duration1, function() {
                        "function" == typeof a && a()
                    })
                })
            },
            hideAndShowContent: function() {
                b.preloader.$loader.fadeOut(b.duration1, function() {
                    b.preloader.$content.animateIn(b.duration1)
                })
            },
            hideHeaderFooter: function() {
                this.$header.animateOut(b.duration2, function() {
                    a(this).addClass("hidden")
                }, function(b) {
                    a(this).css({
                        transform: "translateY(" + b * -100 + "px)"
                    })
                }), this.$footer.animateOut(b.duration2, function() {
                    a(this).addClass("hidden")
                }, function(b) {
                    a(this).css({
                        transform: "translateY(" + 100 * b + "px)"
                    })
                })
            },
            showHeaderFooter: function() {
                this.$header.hasClass("hidden") && this.$header.animateIn(b.duration2, function() {
                    a(this).removeClass("hidden")
                }, function(b) {
                    a(this).css({
                        transform: "translateY(" + (1 - b) * -100 + "px)"
                    })
                }), this.$footer.hasClass("hidden") && this.$footer.animateIn(b.duration2, function() {
                    a(this).removeClass("hidden")
                }, function(b) {
                    a(this).css({
                        transform: "translateY(" + 100 * (1 - b) + "px)"
                    })
                })
            }
        }
    }), a.extend(b, {
        menu: {
            init: function() {
                this.$button = a(".mobile-navigation"), this.$nav = this.$button.siblings(".main-navigation"), this.$items = this.$nav.find("li"), this.$button.click(this.toggle), this.$nav.click(function(a) {
                    a.stopPropagation()
                }), this.$items.on("click", "a", this.onItemClick), a(document).click(function() {
                    b.menu.$button.hasClass("opened") && b.menu.hide()
                }), a(window).on("popstate", this.onStateChange)
            },
            resize: function() {
                window.innerWidth < b.maxMobileWidth && b.menu.hide()
            },
            show: function() {
                b.menu.$button.addClass("opened"), b.menu.$nav.stop(!0, !0).slideDown(300, function() {
                    b.menu.$nav.addClass("opened")
                })
            },
            hide: function() {
                b.menu.$button.removeClass("opened"), b.menu.$nav.stop(!0, !0).fadeOut(300, function() {
                    b.menu.$nav.removeClass("opened")
                })
            },
            toggle: function(a) {
                a.stopPropagation(), b.menu.$button.hasClass("opened") ? b.menu.hide() : b.menu.show()
            },
            changeCurrentMenuItem: function(a) {
                var b = "singleNews" === a ? "news" : "singleVideo" === a ? "video" : a,
                    c = this.$items.find('[data-section="' + b + '"]').parent();
                return this.$items.removeClass("current-menu-item"), c.addClass("current-menu-item"), c.attr("id")
            },
            loadSection: function(c, d, e, f, g, h) {
                var i = "singleNews" === c ? ".single-news." + d : "singleVideo" === c ? ".single-video." + d : "." + c,
                    j = b.preloader.$content.find(i);
                j.length ? (b.global.stopVideo(j), b.preloader.$content.animateOut(b.duration1, function() {
                    var a = j.data("state");
                    b.menu.loadState(a), g && history.pushState(a, "", e), b.preloader.showHeaderFooter(), b.preloader.$content.find("section").hide(), j.show(), b.preloader.$content.css({
                        opacity: 0,
                        display: "block"
                    });
                    var d = b[vars.currentPageName].resize;
                    "function" == typeof d && d(j), "singleVideo" === c && b.preloader.hideHeaderFooter(), b.preloader.$content.animateIn(b.duration1)
                })) : b.preloader.showBefore(function() {
                    a.ajax({
                        type: "POST",
                        url: vars.ajaxUrl,
                        data: {
                            action: "get_section",
                            section: c,
                            slug: d
                        },
                        dataType: "json",
                        success: function(i) {
                            var k = {
                                title: i.title,
                                fixed: i.fixed,
                                section: c,
                                slug: d,
                                url: e,
                                menu: f
                            };
                            b.menu.loadState(k), g && history.pushState(k, "", e), j = a(i.html), j.data("state", k), h && h.length || (h = b.preloader.$content), h.find("section").hide(), h.append(j), h.css({
                                opacity: 0,
                                display: "block"
                            });
                            var l = b[vars.currentPageName].ajaxInit;
                            "function" == typeof l && l(j), "singleVideo" === c && b.preloader.hideHeaderFooter(), b.preloader.hideAndShowContent()
                        },
                        error: function(a) {
                            console.error(a.responseText), j.show(), b.preloader.hideAndShowContent()
                        }
                    })
                })
            },
            onItemClick: function(c) {
                if (!(b.isDevice || window.innerWidth < b.maxMobileWidth) && "function" == typeof history.pushState) {
                    var d = a(this),
                        e = d.attr("target"),
                        f = d.attr("data-section"),
                        g = d.attr("data-slug"),
                        h = d.attr("href");
                    if (!e && f) {
                        a(".mejs-video").find("video").each(function() {
                            this.pause()
                        }), b.global.startVideo();
                        var i = b.menu.changeCurrentMenuItem(f);
                        c.preventDefault(), vars.currentPageName = f, b.menu.loadSection(f, g, h, i, !0)
                    }
                }
            },
            onStateChange: function() {
                var c = history.state;
                c || (c = a("body").data("state")), b.menu.loadSection(c.section, c.slug, c.url, c.menu)
            },
            loadState: function(c) {
                document.title = c.title, c.fixed ? a("body").addClass("fixed") : a("body").removeClass("fixed"), c.menu && (b.menu.$items.removeClass("current-menu-item"), a("#" + c.menu).addClass("current-menu-item"))
            }
        }
    }), a.extend(b, {
        global: {
            $video: a(".bg-video"),
            init: function() {
                b.menu.init(), this.deviceOrNotDevice(), this.disableDragImage(), this.disableVideoContextMenu(), b.isSessionStorage() && this.startVideoFromLastPosition()
            },
            load: function() {},
            resize: function() {
                b.menu.resize(), b.global.deviceOrNotDevice()
            },
            deviceOrNotDevice: function() {
                b.global.$noDev || (b.global.$noDev = a(".no-dev")), b.isDevice || window.innerWidth <= b.maxMobileWidth ? b.global.$noDev.removeClass("no-dev") : b.global.$noDev.addClass("no-dev")
            },
            disableDragImage: function() {
                a("img").bind("dragstart", function(a) {
                    return a.preventDefault(), !1
                })
            },
            disableVideoContextMenu: function() {
                a("video").bind("contextmenu", function() {
                    return !1
                })
            },
            startVideoFromLastPosition: function() {
                var a = sessionStorage.getItem("videoCurrentTime");
                a || sessionStorage.setItem("videoCurrentTime", 0), this.$video.hide(), this.$video.length && (this.bgVideo = this.$video.get(0), this.bgVideo.addEventListener("loadedmetadata", function() {
                    var a = sessionStorage.getItem("videoCurrentTime");
                    this.currentTime = +a
                }, !1), this.bgVideo.addEventListener("timeupdate", function() {
                    sessionStorage.setItem("videoCurrentTime", this.currentTime)
                }), this.$video.fadeIn(1e3))
            },
            stopVideo: function(a) {
                var b = this.bgVideo;
                a && a.length && !(b = a.find("video").get(0)) || b.pause()
            },
            startVideo: function(a) {
                var b = this.bgVideo;
                a && a.length && (b = a.find("video").get(0)), b.paused && b.play()
            }
        }
    }), a.extend(b, {
        Index: {
            init: function() {
                a(".lens-holder").lens({
                    logo: ["Artista/The_Elements/Images/SVG/logo.svg", "logo"],
                    images: [
                        ["Artista/The_Elements/Images/SVG/large_circle.svg", "large"],
                        ["Artista/The_Elements/Images/SVG/medium_circle.svg", "medium"],
                        ["Artista/The_Elements/Images/SVG/small_circle.svg", "small"]
                    ],
                    onLoaded: function() {
                        b.preloader.hide()
                    }
                })
            },
            load: function() {
                b.preloader.hide()
            },
            resize: function() {},
            ajaxInit: function() {
                a(".lens-holder").lens({
                    logo: ["Artista/The_Elements/Images/SVG/logo.svg", "logo"],
                    images: [
                        ["Artista/The_Elements/Images/SVG/large_circle.svg", "large"],
                        ["Artista/The_Elements/Images/SVG/medium_circle.svg", "medium"],
                        ["Artista/The_Elements/Images/SVG/small_circle.svg", "small"]
                    ],
                    onLoaded: function() {}
                })
            }
        }
    }), a.extend(b, {
        video: {
            init: function() {
                b.video.gallery.init(), a(".page-content").waitForImages(function() {
                    b.video.gallery.resize(function() {
                        b.video.initializePlayer(), b.preloader.hide()
                    })
                })
            },
            onItemClick: function(c) {
                if (!(b.isDevice || window.innerWidth < b.maxMobileWidth) && "function" == typeof history.pushState) {
                    var d = a(this),
                        e = d.attr("target"),
                        f = d.attr("data-section"),
                        g = d.attr("data-slug"),
                        h = d.attr("href");
                    if (!e && f) {
                        var i = b.menu.changeCurrentMenuItem(f);
                        c.preventDefault(), vars.currentPageName = f, b.menu.loadSection(f, g, h, i, !0)
                    }
                }
            },
            initializePlayer: function() {
                a(".player").bind("contextmenu", function() {
                    return !1
                }).mediaelementplayer({
                    startVolume: .8,
                    features: ["playpause", "current", "duration", "progress", "qualities", "volume", "fullscreen", "preload"],
                    iPadUseNativeControls: !0,
                    iPhoneUseNativeControls: !0,
                    AndroidUseNativeControls: !0,
                    success: function() {
                        a(".mejs-overlay-loading").html(b.singleVideo.preloader), a(".mejs-container").waitForImages(function() {
                            b.preloader.hide("section.single-video > *")
                        })
                    },
                    successMobile: function() {
                        a(".mejs-overlay-loading").html(b.singleVideo.preloader), b.preloader.hide("section.single-video > *")
                    },
                    onPlay: function() {
                        b.global.$video.length && b.global.$video.get(0).pause()
                    },
                    onPause: function() {
                        b.global.$video.length && b.global.$video.get(0).play()
                    },
                    onFullScreen: function() {
                        b.preloader.hideHeaderFooter()
                    },
                    offFullScreen: function() {
                        b.preloader.showHeaderFooter()
                    }
                })
            },
            load: function() {
                b.video.gallery.resize(function() {
                    b.preloader.hide()
                })
            },
            resize: function() {
                b.video.gallery.resize()
            },
            ajaxInit: function() {
                b.video.gallery.init(), b.video.gallery.resize(), b.video.initializePlayer()
            },
            gallery: {
                options: {
                    center: !0,
                    margin: 9,
                    smartSpeed: 800,
                    mouseDrag: !1,
                    navText: ["back", "next"],
                    nav: !1,
                    dots: !1,
                    items: 1,
                    responsive: {
                        900: {
                            nav: !0
                        }
                    }
                },
                init: function() {
                    var c = this;
                    this.$carousel = a(".video-carousel"), b.isDevice || this.$carousel.on("initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel", function(b) {
                        if (b.namespace) {
                            var c = b.relatedTarget,
                                d = c.old();
                            a(".owl-next").toggleClass("enabled", d !== c.maximum()), a(".owl-prev").toggleClass("enabled", 0 !== d), a(".mejs-video").find("video").each(function() {
                                this.pause()
                            })
                        }
                    }), this.$carousel.on("click", ".owl-item .item", function(b) {
                        var d = a(this),
                            e = d.parent(),
                            f = c.$carousel.data("owlCarousel"),
                            g = e.index();
                        if (!e.hasClass("center")) return b.preventDefault(), g < f._current ? c.$carousel.trigger("prev.owl.carousel") : c.$carousel.trigger("next.owl.carousel"), !1
                    }), this.$carousel.owlCarousel(this.options)
                },
                resize: function(a) {
                    "function" == typeof a && a()
                }
            }
        }
    }), a.extend(b, {
        singleVideo: {
            $pageContent: a(".page-content"),
            preloader: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="90px" height="90px" viewBox="0 0 90 90" enable-background="new 0 0 90 90" xml:space="preserve"><rect x="0.935" y="1.003" opacity="0.3" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" width="88.065" height="88.063"/><path id="d" fill="#FFFFFF" d="M43.13,55.771h-7.515V34.298h7.108c3.89,0,7.053,0.639,9.49,4.005c1.391,1.944,1.973,4.294,1.973,6.674 C54.187,52.027,50.152,55.771,43.13,55.771 M43.479,39.115H41.1v11.839h2.351c3.743,0,5.25-2.409,5.25-5.891 C48.701,41.639,47.136,39.115,43.479,39.115"/><polygon id="f" fill="#FFFFFF" points="43.292,39.115 43.292,42.771 49.53,42.771 49.53,47.587 43.292,47.587 43.292,55.771 38.039,55.771 38.039,34.298 49.762,34.298 49.762,39.115 "/><polygon id="v" fill="#FFFFFF" points="48.14,55.37 42.48,55.37 35.312,33.898 40.942,33.898 45.266,48.958 45.324,48.958 49.676,33.898 55.333,33.898 "/><path id="c" fill="#FFFFFF" d="M45.555,55.776c-6.239,0-11.317-4.875-11.317-11.17c0-6.299,5.021-11.115,11.26-11.115 c3.889,0,7.312,1.799,9.459,5.048c0.697,1.047,1.248,2.266,1.451,3.514h-5.745c-0.842-2.207-2.785-3.745-5.194-3.745 c-3.483,0-5.746,2.96-5.746,6.268c0,3.309,2.263,6.384,5.775,6.384c2.407,0,4.207-1.509,5.165-3.627h5.745 C55.159,52.411,50.749,55.776,45.555,55.776"/></svg>',
            init: function() {
                a(".player").bind("contextmenu", function() {
                    return !1
                }).mediaelementplayer({
                    startVolume: .8,
                    features: ["playpause", "current", "duration", "progress", "qualities", "volume", "fullscreen", "preload"],
                    iPadUseNativeControls: !0,
                    iPhoneUseNativeControls: !0,
                    AndroidUseNativeControls: !0,
                    success: function() {
                        a(".mejs-overlay-loading").html(b.singleVideo.preloader), a(".mejs-container").waitForImages(function() {
                            b.preloader.hide("section.single-video > *")
                        })
                    },
                    successMobile: function() {
                        a(".mejs-overlay-loading").html(b.singleVideo.preloader), b.preloader.hide("section.single-video > *")
                    }
                }), b.singleVideo.$pageContent.on("click", ".single-video a.button-back", b.menu.onItemClick)
            },
            load: function() {
                b.preloader.hide("section.single-video > *")
            },
            resize: function() {},
            ajaxInit: function(c) {
                c.find(".player").bind("contextmenu", function() {
                    return !1
                }).mediaelementplayer({
                    startVolume: .8,
                    features: ["playpause", "current", "duration", "progress", "qualities", "volume", "fullscreen", "preload"],
                    iPadUseNativeControls: !0,
                    iPhoneUseNativeControls: !0,
                    AndroidUseNativeControls: !0,
                    success: function() {
                        a(".mejs-overlay-loading").html(b.singleVideo.preloader)
                    }
                }), b.singleNews.$pageContent.off("click").on("click", ".single-video a.button-back", b.menu.onItemClick)
            }
        }
    }), a.extend(b, {
        news: {
            init: function() {
                b.news.gallery.init(), a(".page-content").waitForImages(function() {
                    b.news.gallery.resize(function() {
                        b.preloader.hide()
                    })
                }), a(".news-carousel").on("click", ".owl-item.active a", b.menu.onItemClick)
            },
            load: function() {
                b.news.gallery.resize(function() {
                    b.preloader.hide()
                })
            },
            resize: function() {
                b.news.gallery.resize()
            },
            ajaxInit: function() {
                b.news.gallery.init(), b.news.gallery.resize(), a(".news-carousel").off("click").on("click", ".owl-item.active a", b.menu.onItemClick)
            },
            gallery: {
                options: {
                    centerWide: !1,
                    margin: 0,
                    callbacks: !0,
                    loop: !1,
                    mouseDrag: !1,
                    navText: ["back", "next"],
                    dots: !1,
                    smartSpeed: 400,
                    responsive: {
                        0: {
                            nav: !1,
                            items: 1
                        },
                        668: {
                            nav: !0,
                            items: 1
                        },
                        1025: {
                            nav: !0,
                            items: 3
                        },
                        1441: {
                            nav: !0,
                            items: 4
                        }
                    }
                },
                init: function() {
                    var c = a(".news-carousel");
                    this.$items = c.find(".item"), b.isDevice || c.on("initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel", function(b) {
                        if (b.namespace) {
                            var c = b.relatedTarget,
                                d = c.old();
                            a(".owl-next").toggleClass("enabled", d !== c.maximum()), a(".owl-prev").toggleClass("enabled", 0 !== d)
                        }
                    }), c.on("click", ".owl-item .item", function(b) {
                        var d = a(this),
                            e = d.parent(),
                            f = c.data("owlCarousel"),
                            g = e.index();
                        if (!e.hasClass("active")) return b.preventDefault(), g < f._current ? c.trigger("prev.owl.carousel") : c.trigger("next.owl.carousel"), !1
                    }), b.news.gallery.resize(function() {
                        c.owlCarousel(b.news.gallery.options), b.news.gallery.resize()
                    })
                },
                resize: function(b) {
                    var c = 0;
                    this.$items.each(function() {
                        c = Math.max(c, a(this).innerHeight())
                    }).css({
                        marginTop: Math.abs((window.innerHeight - c) / 2)
                    }), "function" == typeof b && b()
                }
            }
        }
    }), a.extend(b, {
        singleNews: {
            $pageContent: a(".page-content"),
            init: function() {
                b.singleNews.$pageContent.waitForImages(function() {
                    b.preloader.hide()
                }), b.singleNews.scrollPane(), b.singleNews.$pageContent.on("click", ".single-news a.button-back", b.menu.onItemClick)
            },
            scrollPane: function(b) {
                function f() {
                    c || (c = setTimeout(function() {
                        e.reinitialise(), c = null
                    }, 50))
                }
                var c;
                b && b.length || (b = a("section.single-news").filter(":visible"));
                var d = b.find(".content"),
                    e = d.jScrollPane({
                        contentWidth: "0px"
                    }).data("jsp");
                a(window).on({
                    load: f,
                    resize: f
                })
            },
            equalColsHeight: function(c) {
                c && c.length || (c = a("section.single-news").filter(":visible"));
                var d = c.find(".col-1"),
                    e = c.find(".col-2"),
                    f = e.find(".title"),
                    g = e.find(".content");
                if (window.innerWidth < b.maxMobileWidth) return e.css({
                    height: "auto"
                }), void g.css({
                    height: "auto"
                });
                var h = Math.max(d.height(), 300);
                e.css({
                    height: h
                }), g.css({
                    height: h - 15 - f.outerHeight()
                })
            },
            load: function() {
                b.singleNews.equalColsHeight(), b.preloader.hide()
            },
            resize: function(a) {
                b.singleNews.equalColsHeight(a), b.singleNews.scrollPane(a)
            },
            ajaxInit: function(a) {
                a.length && (b.singleNews.equalColsHeight(a), b.singleNews.scrollPane(a), b.singleNews.$pageContent.off("click").on("click", ".single-news a.button-back", b.menu.onItemClick))
            }
        }
    }), a.extend(b, {
        about: {
            init: function() {
                a(".page-content").waitForImages(function() {
                    b.preloader.hide()
                }), b.about.$col1 = a(".col-1"), b.about.$col2 = a(".col-2"), b.about.$title = b.about.$col2.find(".title"), b.about.$content = b.about.$col2.find(".content"), b.about.equalColsHeight()
            },
            load: function() {
                b.preloader.hide()
            },
            resize: function() {
                b.about.equalColsHeight()
            },
            equalColsHeight: function() {
                if (window.innerWidth < b.maxMobileWidth) return this.$col2.css({
                    height: "auto"
                }), void this.$content.css({
                    height: "auto"
                });
                var a = this.$col1.height();
                this.$col2.css({
                    height: a
                }), this.$content.css({
                    height: Math.max(a - 15 - this.$title.outerHeight(), 340)
                })
            },
            ajaxInit: function() {
                b.about.$col1 = a(".col-1"), b.about.$col2 = a(".col-2"), b.about.$title = b.about.$col2.find(".title"), b.about.$content = b.about.$col2.find(".content")
            }
        }
    }), a.extend(b, {
        contact: {
            init: function() {},
            load: function() {
                b.preloader.hide(), b.preloader.hide()
            },
            resize: function() {}
        }
    }), a.extend(b, {
        404: {
            init: function() {},
            load: function() {
                b.preloader.hide(), b.preloader.hide()
            },
            resize: function() {}
        }
    }), a.extend(b, {
        flex4k: {
            init: function() {},
            load: function() {
                b.preloader.hide(), b.preloader.hide()
            },
            resize: function() {}
        }
    }), a.extend(b, {
        init: function() {
            var c = a("body"),
                d = a("section"),
                e = d.get(0).classList,
                f = {
                    title: document.title,
                    fixed: c.hasClass("fixed"),
                    section: e[0] || "",
                    slug: e[1] || "",
                    menu: a(".current-menu-item").attr("id"),
                    url: location.href
                };
            d.data("state", f), c.data("state", f);
            try {
                b.global.init(), vars.currentPageName && b[vars.currentPageName].init()
            } catch (a) {}
        },
        load: function() {
            try {
                b.global.load(), vars.currentPageName && b[vars.currentPageName].load()
            } catch (a) {}
        },
        resize: function() {
            var a = b.preloader.$content.find("section.video");
            a.length && !a.is(":visible") && (a.find(".video-carousel").trigger("destroy.owl.carousel"), a.remove());
            try {
                b.global.resize(), vars.currentPageName && b[vars.currentPageName].resize()
            } catch (a) {}
        }
    }), a(document).ready(b.init), a(window).on({
        load: b.load,
        resize: b.resize
    })
}(window.jQuery);
