/* gallery-manifest.js 목록 → 정렬 후 #galleryGrid 에 카드만 생성 (캐러셀 미사용) */
(function () {
    var MONTH = {
        jan: 1,
        feb: 2,
        mar: 3,
        apr: 4,
        may: 5,
        jun: 6,
        jul: 7,
        aug: 8,
        sep: 9,
        sept: 9,
        oct: 10,
        nov: 11,
        dec: 12,
    };

    function parseFilename(name) {
        var m = String(name)
            .trim()
            .match(/^gallery(\d+)_([a-z]+)_(\d{4})\.(png|jpe?g|webp)$/i);
        if (!m) return null;
        var key = m[2].toLowerCase().slice(0, 3);
        var mn = MONTH[key];
        if (!mn) return null;
        var label =
            m[2].charAt(0).toUpperCase() +
            m[2].slice(1).toLowerCase() +
            " " +
            m[3];
        return {
            src: "img/" + name.trim(),
            seq: parseInt(m[1], 10),
            mn: mn,
            y: parseInt(m[3], 10),
            label: label,
        };
    }

    
    document.addEventListener("DOMContentLoaded", function () {
        var grid = document.getElementById("galleryGrid");
        var files = window.GALLERY_GRID_FILES;
        if (!grid || !files || !files.length) return;

        var rows = [];
        files.forEach(function (name) {
            var row = parseFilename(name);
            if (row) rows.push(row);
        });
        rows.sort(function (a, b) {
            if (b.y !== a.y) return b.y - a.y;
            if (b.mn !== a.mn) return b.mn - a.mn;
            return b.seq - a.seq;
        });

        grid.innerHTML = "";
        rows.forEach(function (r) {
            var col = document.createElement("div");
            col.className = "col-lg-4 col-md-6 col-sm-6";

            var item = document.createElement("div");
            item.className = "gallery-item";
            item.setAttribute("data-desc", r.label);

            var wrap = document.createElement("div");
            wrap.className = "gallery-img-wrap";

            var img = document.createElement("img");
            img.src = r.src;
            img.className = "img-fluid";
            img.alt = r.label;
            img.loading = "lazy";

            var overlay = document.createElement("div");
            overlay.className = "gallery-overlay";
            var span = document.createElement("span");
            span.className = "gallery-overlay-text";
            span.textContent = r.label;
            overlay.appendChild(span);

            wrap.appendChild(img);
            wrap.appendChild(overlay);
            item.appendChild(wrap);
            col.appendChild(item);
            grid.appendChild(col);
        });
    });
})();
