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

    /* ── Dropdown fix ── */
    function fixDropdowns() {
        document.querySelectorAll('[data-toggle="dropdown"]').forEach(function (el) {
            if (!el.hasAttribute("data-bs-toggle")) {
                el.setAttribute("data-bs-toggle", "dropdown");
            }
        });

        // Also fix collapse toggles (sidebar, etc.)
        document.querySelectorAll('[data-toggle="collapse"]').forEach(function (el) {
            if (!el.hasAttribute("data-bs-toggle")) {
                el.setAttribute("data-bs-toggle", "collapse");
                var target = el.getAttribute("data-target");
                if (target && !el.hasAttribute("data-bs-target")) {
                    el.setAttribute("data-bs-target", target);
                }
            }
        });

        // Initialize Bootstrap 5 Dropdown instances
        if (typeof bootstrap !== "undefined" && bootstrap.Dropdown) {
            document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function (el) {
                try {
                    if (!bootstrap.Dropdown.getInstance(el)) {
                        new bootstrap.Dropdown(el);
                    }
                } catch (e) { /* already initialized */ }
            });
        }
    }

    /* ── Language chooser fix ── */
    function fixLanguageChooser() {
        // Find the language chooser form and dropdown items
        var langForm = document.getElementById("language-form");
        if (!langForm) return;

        // Make sure clicking language dropdown items submits the form
        document.querySelectorAll('.dropdown-item').forEach(function (item) {
            // Check if this is a language switcher item by looking for onclick with language-form
            var onclick = item.getAttribute("onclick");
            if (onclick && onclick.indexOf("language-form") !== -1) {
                // Replace onclick with a proper event listener
                item.removeAttribute("onclick");
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Extract language code from the onclick attribute
                    var langMatch = onclick.match(/value\s*=\s*'([^']+)'/);
                    if (langMatch) {
                        var langInput = langForm.querySelector('[name="language"]');
                        if (langInput) {
                            langInput.value = langMatch[1];
                            langForm.submit();
                        }
                    }
                });
            }
        });

        // Also handle the dropdown toggle for the language chooser specifically
        var langDropdownToggle = langForm.closest('.nav-item');
        if (langDropdownToggle) {
            var toggle = langDropdownToggle.querySelector('[data-toggle="dropdown"], [data-bs-toggle="dropdown"]');
            var menu = langDropdownToggle.querySelector('.dropdown-menu');
            if (toggle && menu) {
                toggle.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var isOpen = menu.classList.contains("show");
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu.show').forEach(function (m) {
                        m.classList.remove("show");
                    });
                    if (!isOpen) {
                        menu.classList.add("show");
                    }
                });
            }
        }

        // Close dropdown when clicking outside
        document.addEventListener("click", function (e) {
            if (!e.target.closest('.nav-item.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(function (m) {
                    m.classList.remove("show");
                });
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Fix dropdowns (language chooser, user menu, etc.)
        fixDropdowns();

        // Fix language chooser specifically
        fixLanguageChooser();

        // Fix tabs and pills (Jazzmin uses data-toggle="pill" for horizontal tabs)
        document.addEventListener("click", function (e) {
            var link = e.target.closest(
                'a[data-toggle="tab"], a[data-toggle="pill"], ' +
                'a[data-bs-toggle="tab"], a[data-bs-toggle="pill"], ' +
                '.changeform-tabs-item a'
            );
            if (!link) return;

            // Don't intercept dropdown items or language chooser clicks
            if (link.closest('.dropdown-menu') || link.closest('.dropdown')) return;

            e.preventDefault();
            activateTab(link);
        });

        if (window.location.hash) {
            var hashLink = document.querySelector('a[href="' + window.location.hash + '"]');
            if (hashLink) activateTab(hashLink);
        }

        // Retry dropdown fix after a short delay (in case Bootstrap loads async)
        setTimeout(fixDropdowns, 500);
        setTimeout(fixLanguageChooser, 500);
    });
})();
