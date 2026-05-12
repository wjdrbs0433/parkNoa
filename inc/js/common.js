// inc/js/common.js — 네비·푸터 공통 주입
document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
    loadFooter();
});

/**
 * 현재 HTML 파일명 기준 활성 메뉴 키 (Abstract.html 대소문자 무관)
 */
function getNavbarActiveKey() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var seg = path.split("/").pop() || "";
    var base = seg.split("?")[0].split("#")[0];
    var lower = base.toLowerCase();
    if (!lower || lower === "index.html") return "home";
    if (lower === "about.html") return "about";
    if (lower === "publication.html") return "publication";
    if (lower === "abstract.html") return "abstract";
    if (lower === "gallery.html") return "gallery";
    if (lower === "contact.html") return "contact";
    return "";
}

function renderNavLink(activeKey, key, href, iconBi, label) {
    var activeClass = activeKey === key ? " active" : "";
    return (
        '<li class="nav-item">' +
        '<a class="nav-link fw-semibold nav-span' +
        activeClass +
        '" href="' +
        href +
        '">' +
        '<i class="bi ' +
        iconBi +
        ' me-1"></i>' +
        label +
        "</a></li>"
    );
}

function loadNavbar() {
    var placeholder = document.getElementById("navbar-placeholder");
    if (!placeholder) return;

    var activeKey = getNavbarActiveKey();
    var items =
        renderNavLink(activeKey, "home", "index.html", "bi-house", "Home") +
        renderNavLink(activeKey, "about", "about.html", "bi-person", "About") +
        renderNavLink(activeKey, "publication", "publication.html", "bi-journal-text", "Publication") +
        renderNavLink(activeKey, "abstract", "Abstract.html", "bi-file-earmark-text", "Abstract") +
        renderNavLink(activeKey, "gallery", "gallery.html", "bi-images", "Gallery") +
        renderNavLink(activeKey, "contact", "contact.html", "bi-envelope", "Contact");

    var html =
        '<nav class="navbar navbar-expand-lg navbar-light nav-stay site-navbar">' +
        '<div class="container-fluid">' +
        '<a class="navbar-brand" href="index.html">' +
        '<img src="img/logo.png" alt="Logo" style="height: 40px; width: auto; margin-right: 10px;">' +
        "</a>" +
        '<span class="nav-span fw-bold" style="font-size: 1.5rem; line-height: 40px;">Noa Park</span>' +
        '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">' +
        '<span class="navbar-toggler-icon"></span>' +
        "</button>" +
        '<div class="collapse navbar-collapse" id="navbarNavDropdown">' +
        '<ul class="navbar-nav ms-auto">' +
        items +
        "</ul></div></div></nav>";

    placeholder.outerHTML = html;
}

function loadFooter() {
    const footerHtml = `
        <footer class="footer">
            <div class="container">
                <div class="row footer-columns g-4 justify-content-center">
                    <div class="col-lg-4 col-md-6">
                        <div class="footer-panel">
                            <h6 class="footer-panel-title"><i class="bi bi-envelope-fill"></i>Contact</h6>
                            <div class="footer-panel-body">
                                <a href="mailto:noapark2@illinois.edu" class="footer-link">
                                    <i class="bi bi-envelope"></i>noapark2@illinois.edu
                                </a>
                                <a href="mailto:parknoa0227@gmail.com" class="footer-link">
                                    <i class="bi bi-envelope"></i>parknoa0227@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="footer-panel">
                            <h6 class="footer-panel-title"><i class="bi bi-share-fill"></i>Connect</h6>
                            <div class="footer-panel-body footer-connect-grid">
                                <a href="https://scholar.google.com/citations?user=YwQN3AwAAAAJ&hl=ko" class="footer-link" target="_blank" rel="noopener noreferrer"><i class="bi bi-mortarboard"></i>Google Scholar</a>
                                <a href="https://www.researchgate.net/profile/Noa-Park-2?ev=hdr_xprf" class="footer-link" target="_blank" rel="noopener noreferrer"><i class="bi bi-journal-text"></i>Research Gate</a>
                                <a href="https://www.linkedin.com/in/noa-park-84a5002b4/" class="footer-link" target="_blank" rel="noopener noreferrer"><i class="bi bi-linkedin"></i>LinkedIn</a>
                                <a href="https://www.instagram.com/_noa_park/" class="footer-link" target="_blank" rel="noopener noreferrer"><i class="bi bi-instagram"></i>Instagram</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="footer-panel">
                            <h6 class="footer-panel-title"><i class="bi bi-info-circle-fill"></i>More</h6>
                            <div class="footer-panel-body">
                                <a href="#" class="footer-link"><i class="bi bi-person-badge"></i>CV Download</a>
                                <a href="#" class="footer-link"><i class="bi bi-rss"></i>Biography</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom text-center">
                    <span>© 2026 Noa Park. All rights reserved. Designed by Jeongkyun Kim.</span>
                </div>
            </div>
        </footer>
    `;
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHtml;
    }
}
