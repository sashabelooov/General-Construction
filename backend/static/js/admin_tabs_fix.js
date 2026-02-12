/**
 * Fix Jazzmin Bootstrap 4/5 mismatch (AdminLTE 3 uses data-toggle, Bootstrap 5 needs data-bs-toggle).
 *
 * Jazzmin 3.x ships AdminLTE 3 (Bootstrap 4 markup) but loads Bootstrap 5 JS.
 * This script bridges the gap for tabs and dropdowns.
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

    /* ── Dropdown fix ── */
    function fixDropdowns() {
        document.querySelectorAll('[data-toggle="dropdown"]').forEach(function (el) {
            if (!el.hasAttribute("data-bs-toggle")) {
                el.setAttribute("data-bs-toggle", "dropdown");
            }
            // Initialize Bootstrap 5 Dropdown instance
            if (typeof bootstrap !== "undefined" && bootstrap.Dropdown) {
                new bootstrap.Dropdown(el);
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Fix dropdowns (language chooser, user menu, etc.)
        fixDropdowns();

        // Fix tabs
        document.addEventListener("click", function (e) {
            var link = e.target.closest('a[data-toggle="tab"], a[data-bs-toggle="tab"], .changeform-tabs-item a');
            if (!link) return;
            e.preventDefault();
            activateTab(link);
        });

        if (window.location.hash) {
            var hashLink = document.querySelector('a[href="' + window.location.hash + '"]');
            if (hashLink) activateTab(hashLink);
        }
    });
})();
