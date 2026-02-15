/**
 * Fix Jazzmin Bootstrap 4/5 mismatch (AdminLTE 3 uses data-toggle, Bootstrap 5 needs data-bs-toggle).
 *
 * Jazzmin 3.x ships AdminLTE 3 (Bootstrap 4 markup) but loads Bootstrap 5 JS.
 * This script bridges the gap for tabs, dropdowns, and the language chooser.
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

    /* ── Bridge data-toggle to data-bs-toggle for all elements ── */
    function bridgeDataAttributes() {
        var toggleTypes = ["dropdown", "collapse", "tab", "pill", "modal", "tooltip", "popover"];
        toggleTypes.forEach(function (type) {
            document.querySelectorAll('[data-toggle="' + type + '"]').forEach(function (el) {
                if (!el.hasAttribute("data-bs-toggle")) {
                    el.setAttribute("data-bs-toggle", type);
                }
                // Also bridge data-target to data-bs-target
                var target = el.getAttribute("data-target");
                if (target && !el.hasAttribute("data-bs-target")) {
                    el.setAttribute("data-bs-target", target);
                }
            });
        });
    }

    /* ── Language chooser fix ── */
    function fixLanguageChooser() {
        var menu = document.getElementById("jazzy-languagemenu");
        if (!menu) return;

        var navItem = menu.closest(".nav-item.dropdown");
        if (!navItem) return;

        var toggle = navItem.querySelector("a.nav-link");
        if (!toggle) return;

        // Remove any existing Bootstrap dropdown behavior that might interfere
        toggle.removeAttribute("data-toggle");
        toggle.removeAttribute("data-bs-toggle");

        // Manual toggle: click the globe icon to show/hide the menu
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            var isOpen = menu.classList.contains("show");

            // Close all open dropdowns first
            document.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
                m.classList.remove("show");
                var p = m.closest(".nav-item");
                if (p) p.classList.remove("show");
            });

            if (!isOpen) {
                menu.classList.add("show");
                navItem.classList.add("show");
            }
        });

        // The language buttons are type="submit" inside a form - they work natively.
        // No extra JS needed for them. Clicking a button submits the form with the language value.
    }

    /* ── Close dropdowns on outside click ── */
    function setupOutsideClickClose() {
        document.addEventListener("click", function (e) {
            if (!e.target.closest(".nav-item.dropdown")) {
                document.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
                    m.classList.remove("show");
                    var p = m.closest(".nav-item");
                    if (p) p.classList.remove("show");
                });
            }
        });
    }

    /* ── Fix all other dropdowns (user menu, etc.) ── */
    function fixOtherDropdowns() {
        if (typeof bootstrap === "undefined" || !bootstrap.Dropdown) return;

        document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function (el) {
            // Skip the language chooser - we handle it manually
            if (el.closest("#jazzy-languagemenu") || (el.nextElementSibling && el.nextElementSibling.id === "jazzy-languagemenu")) return;

            try {
                if (!bootstrap.Dropdown.getInstance(el)) {
                    new bootstrap.Dropdown(el);
                }
            } catch (e) { /* already initialized */ }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Bridge Bootstrap 4 data attributes to Bootstrap 5
        bridgeDataAttributes();

        // Fix language chooser with manual toggle
        fixLanguageChooser();

        // Fix other dropdowns using Bootstrap 5
        fixOtherDropdowns();

        // Close dropdowns on outside click
        setupOutsideClickClose();

        // Fix tabs and pills
        document.addEventListener("click", function (e) {
            var link = e.target.closest(
                'a[data-toggle="tab"], a[data-toggle="pill"], ' +
                'a[data-bs-toggle="tab"], a[data-bs-toggle="pill"], ' +
                '.changeform-tabs-item a'
            );
            if (!link) return;

            // Don't intercept dropdown items or language chooser clicks
            if (link.closest(".dropdown-menu") || link.closest(".dropdown")) return;

            e.preventDefault();
            activateTab(link);
        });

        // Activate tab from URL hash
        if (window.location.hash) {
            var hashLink = document.querySelector('a[href="' + window.location.hash + '"]');
            if (hashLink) activateTab(hashLink);
        }

        // Retry after short delay in case Bootstrap loads asynchronously
        setTimeout(function () {
            bridgeDataAttributes();
            fixOtherDropdowns();
        }, 500);
    });
})();
