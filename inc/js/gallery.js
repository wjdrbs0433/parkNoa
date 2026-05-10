// inc/js/gallery.js - 모달 제목 추가
document.addEventListener("DOMContentLoaded", function () {
    var items = document.querySelectorAll("#galleryGrid .gallery-item");
    var modalElement = document.getElementById("imageModal");

    if (modalElement) {
        var modal = new bootstrap.Modal(modalElement);
        var modalImg = document.getElementById("modalImage");
        var modalTitle = document.getElementById("modalTitle");

        items.forEach(function (item, index) {
            var img = item.querySelector("img");
            var overlayText = item.querySelector(".gallery-overlay-text");
            var imgSrc = img.src;

            item.addEventListener("click", function () {
                modalImg.src = imgSrc;
                modalImg.alt = img.alt || "Image " + (index + 1);
                modalTitle.textContent = overlayText ? overlayText.textContent : "Image " + (index + 1);
                modal.show();
            });
        });
    }
});

