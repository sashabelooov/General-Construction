/**
 * Fix Jazzmin Bootstrap 4/5 mismatch (AdminLTE 3 uses data-toggle, Bootstrap 5 needs data-bs-toggle).
 *
 * Jazzmin 3.x ships AdminLTE 3 (Bootstrap 4 markup) but loads Bootstrap 5 JS.
 * This script bridges data-toggle → data-bs-toggle and lets Bootstrap 5 handle
 * all dropdowns (language chooser, user menu) natively.
 */
(function () {
    "use strict";

    /* ── Tab fix ── */
    function activateTab(tab) {
        var target = tab.getAttribute("href") || tab.getAttribute("data-bs-target") || tab.getAttribute("data-target");
        if (!target || target === "#") return;

        var nav = tab.closest(".nav, .nav-tabs");
        if (nav) {
            nav.querySelectorAll(".nav-link, .nav-item > a").forEach(function (t) {
                t.classList.remove("active");
            });
        }
        tab.classList.add("active");

        var pane = document.querySelector(target);
        if (pane) {
            var content = pane.closest(".tab-content");
            if (content) {
                content.querySelectorAll(".tab-pane").forEach(function (p) {
                    p.classList.remove("show", "active", "in");
                });
            }
            pane.classList.add("show", "active");
        }
    }

    /* ── Bridge data-toggle to data-bs-toggle for Bootstrap 5 compatibility ── */
    function bridgeDataAttributes() {
        ["dropdown", "collapse", "tab", "pill", "modal", "tooltip", "popover"].forEach(function (type) {
            document.querySelectorAll('[data-toggle="' + type + '"]').forEach(function (el) {
                if (!el.hasAttribute("data-bs-toggle")) {
                    el.setAttribute("data-bs-toggle", type);
                }
                var target = el.getAttribute("data-target");
                if (target && !el.hasAttribute("data-bs-target")) {
                    el.setAttribute("data-bs-target", target);
                }
            });
        });
    }

    /* ── Initialize all dropdowns via Bootstrap 5 (language chooser + user menu) ── */
    function initDropdowns() {
        if (typeof bootstrap === "undefined" || !bootstrap.Dropdown) return;
        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function (el) {
            if (!bootstrap.Dropdown.getInstance(el)) {
                try { new bootstrap.Dropdown(el); } catch (e) {}
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        bridgeDataAttributes();
        initDropdowns();

        // Fix tabs and pills (changeform horizontal tabs)
        document.addEventListener("click", function (e) {
            var link = e.target.closest(
                'a[data-toggle="tab"], a[data-toggle="pill"], ' +
                'a[data-bs-toggle="tab"], a[data-bs-toggle="pill"], ' +
                '.changeform-tabs-item a'
            );
            if (!link || link.closest(".dropdown-menu") || link.closest(".dropdown")) return;
            e.preventDefault();
            activateTab(link);
        });

        // Activate tab from URL hash on page load
        if (window.location.hash) {
            var hashLink = document.querySelector('a[href="' + window.location.hash + '"]');
            if (hashLink) activateTab(hashLink);
        }

        // Retry after short delay in case Bootstrap loads asynchronously
        setTimeout(function () {
            bridgeDataAttributes();
            initDropdowns();
        }, 300);
    });
})();
