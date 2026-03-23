/**
 * Jazzmin 3.x (AdminLTE 4 + Bootstrap 5) already handles all dropdowns natively
 * via data-bs-toggle="dropdown". This script only fixes the Django changeform
 * horizontal tabs, which use custom tab switching logic.
 */
(function () {
    "use strict";

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

    document.addEventListener("DOMContentLoaded", function () {
        document.addEventListener("click", function (e) {
            var link = e.target.closest(
                'a[data-bs-toggle="tab"], a[data-bs-toggle="pill"], .changeform-tabs-item a'
            );
            if (!link || link.closest(".dropdown-menu") || link.closest(".dropdown")) return;
            e.preventDefault();
            activateTab(link);
        });

        if (window.location.hash) {
            var hashLink = document.querySelector('a[href="' + window.location.hash + '"]');
            if (hashLink) activateTab(hashLink);
        }
    });
})();
