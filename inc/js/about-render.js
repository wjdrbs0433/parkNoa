/**
 * about-content.js 의 ABOUT_CONTENT 를 읽어 about.html 의 표시 영역을 채웁니다.
 * 이 파일은 수정하지 않아도 됩니다.
 */

(function () {
    function esc(s) {
        if (s == null) return "";
        var d = document.createElement("div");
        d.textContent = s;
        return d.innerHTML;
    }

    function renderResearchInterests(container, data) {
        if (!container || !data) return;
        var html = "";
        data.items.forEach(function (text) {
            html +=
                '<div class="cv-item"><div class="cv-dot"></div><div class="cv-text">' +
                esc(text) +
                "</div></div>";
        });
        container.innerHTML = html;
        var titleEl = document.getElementById("cv-research-title");
        if (titleEl) titleEl.textContent = data.title || "";
    }

    
    function renderEducation(container, data) {
        if (!container || !data) return;
        var html = '<div class="cv-education-layout cv-education-layout--rows">';
        data.items.forEach(function (row) {
            html += '<div class="cv-item-grid-wide cv-edu-row">';
            html += '<div class="cv-edu-date-col">';
            html += '<span class="cv-date">' + esc(row.period) + "</span>";
            if (row.logoSrc) {
                html +=
                    '<img src="' +
                    esc(row.logoSrc) +
                    '" alt="' +
                    esc(row.logoAlt || "") +
                    '" class="cv-univ-logo cv-univ-logo--edu-row" loading="lazy">';
            }
            html += "</div>";
            html += "<div>";
            html += '<div class="cv-text fw-semibold">' + esc(row.degree) + "</div>";
            html += '<div class="cv-text">' + esc(row.schoolLine) + "</div>";
            html += "</div></div>";
        });
        html += "</div>";
        container.innerHTML = html;
        var titleEl = document.getElementById("cv-education-title");
        if (titleEl) titleEl.textContent = data.title || "";
    }

    function renderPeerReview(container, data) {
        if (!container || !data) return;
        var journalsHtml = "";
        data.journals.forEach(function (name) {
            journalsHtml +=
                '<div class="cv-item"><div class="cv-dot"></div><div class="cv-text">' +
                esc(name) +
                "</div></div>";
        });
        var html = '<div class="cv-item-grid">';
        html += '<span class="cv-date">' + esc(data.period) + "</span>";
        html += "<div>";
        html += '<div class="cv-text fw-semibold">' + esc(data.roleLabel) + "</div>";
        html += '<div class="cv-text small">&nbsp;</div>';
        html += journalsHtml;
        html += "</div></div>";
        container.innerHTML = html;
        var titleEl = document.getElementById("cv-peer-title");
        if (titleEl) titleEl.textContent = data.title || "";
    }

    function renderLeadership(container, data) {
        if (!container || !data) return;
        var html = "";
        data.blocks.forEach(function (block) {
            html += '<div class="cv-text fw-semibold">' + esc(block.heading) + "</div>";
            html += '<div class="cv-item-grid-wide">';
            html += '<span class="cv-date">' + esc(block.period) + "</span>";
            html += "<div>";
            (block.bullets || []).forEach(function (line) {
                html +=
                    '<div class="cv-item"><div class="cv-dot"></div><div class="cv-text">' +
                    esc(line) +
                    "</div></div>";
            });
            html += "</div></div>";
        });
        container.innerHTML = html;
        var titleEl = document.getElementById("cv-leadership-title");
        if (titleEl) titleEl.textContent = data.title || "";
    }

    document.addEventListener("DOMContentLoaded", function () {
        var C = window.ABOUT_CONTENT;
        if (!C) return;

        var img = document.querySelector(".about-photo");
        if (img && C.profilePhoto) {
            img.src = C.profilePhoto.src || img.src;
            img.alt = C.profilePhoto.alt || "";
        }

        if (C.hero) {
            var elName = document.getElementById("about-hero-name");
            var elPos = document.getElementById("about-hero-position");
            var elDept = document.getElementById("about-meta-department");
            var elPrior = document.getElementById("about-meta-prior");
            var elHi = document.getElementById("about-highlight");
            if (elName) elName.textContent = C.hero.name || "";
            if (elPos) elPos.textContent = C.hero.position || "";
            var md = (C.hero.metaDepartment != null ? C.hero.metaDepartment : "").trim();
            var mp = (C.hero.metaPriorSchool != null ? C.hero.metaPriorSchool : "").trim();
            if (elDept) elDept.textContent = md;
            if (elPrior) elPrior.textContent = mp;
            var elMeta = document.querySelector(".about-meta");
            if (elMeta) {
                elMeta.classList.toggle("d-none", !md && !mp);
            }
            if (elHi) elHi.textContent = C.hero.highlight || "";
        }

        if (C.biography) {
            var elBioTitle = document.getElementById("about-bio-title");
            var elBioBody = document.getElementById("about-bio-body");
            var elScholar = document.getElementById("about-scholar-link");
            if (elBioTitle) elBioTitle.textContent = C.biography.sectionTitle || "Biography";
            if (elBioBody) {
                elBioBody.innerHTML = "";
                (C.biography.paragraphs || []).forEach(function (p) {
                    var para = document.createElement("p");
                    para.className = "about-bio-text";
                    para.textContent = p;
                    elBioBody.appendChild(para);
                });
            }
            if (elScholar && C.biography.scholarLink) {
                elScholar.href = C.biography.scholarLink.url || "#";
                elScholar.textContent = C.biography.scholarLink.label || "Google Scholar";
            }
        }

        if (C.cv) {
            renderEducation(document.getElementById("cv-education-body"), C.cv.education);
            renderResearchInterests(
                document.getElementById("cv-research-list"),
                C.cv.researchInterests
            );
            renderPeerReview(document.getElementById("cv-peer-body"), C.cv.peerReview);
            renderLeadership(document.getElementById("cv-leadership-body"), C.cv.leadership);
        }
    });
})();
