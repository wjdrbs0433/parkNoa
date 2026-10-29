/** Load the original image only when a visitor opens it. */
document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('galleryGrid');
    var modalElement = document.getElementById('imageModal');
    if (!grid || !modalElement || !window.bootstrap) return;
    var modal = new bootstrap.Modal(modalElement);
    var modalImage = document.getElementById('modalImage');
    var modalTitle = document.getElementById('modalTitle');

    grid.addEventListener('click', function (event) {
        var item = event.target.closest('.gallery-item');
        if (!item) return;
        modalImage.src = item.dataset.src;
        modalImage.alt = item.dataset.label;
        modalTitle.textContent = item.dataset.label;
        modal.show();
    });
    modalElement.addEventListener('hidden.bs.modal', function () {
        modalImage.removeAttribute('src');
    });
});
