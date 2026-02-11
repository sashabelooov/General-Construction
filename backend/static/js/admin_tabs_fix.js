/**
 * Fix Jazzmin tab switching (AdminLTE 3 / Bootstrap 4-5 mismatch).
 *
 * Jazzmin 3.x ships AdminLTE 3 (Bootstrap 4 markup) but loads Bootstrap 5 JS,
 * which expects data-bs-toggle instead of data-toggle. This script handles
 * tab switching manually so it works regardless of the attribute used.
 */
(function () {
    "use strict";

    function activateTab(tab) {
        var target = tab.getAttribute("href") || tab.getAttribute("data-bs-target") || tab.getAttribute("data-target");
        if (!target || target === "#") return;

        // Deactivate sibling tabs
        var nav = tab.closest(".nav, .nav-tabs");
        if (nav) {
            nav.querySelectorAll(".nav-link, .nav-item > a").forEach(function (t) {
                t.classList.remove("active");
            });
        }
        tab.classList.add("active");

        // Switch panes
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

    document.addEventListener("DOMContentLoaded", function () {
        document.addEventListener("click", function (e) {
            var link = e.target.closest('a[data-toggle="tab"], a[data-bs-toggle="tab"], .changeform-tabs-item a');
            if (!link) return;
            e.preventDefault();
            activateTab(link);
        });

        // Activate tab from URL hash on page load
        if (window.location.hash) {
            var hashLink = document.querySelector('a[href="' + window.location.hash + '"]');
            if (hashLink) activateTab(hashLink);
        }
    });
})();
