/** Show only the selected year's Excel-managed gallery photos. */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var filters = document.getElementById('galleryYearFilters');
        var grid = document.getElementById('galleryGrid');
        var heading = document.getElementById('galleryYearHeading');
        var count = document.getElementById('galleryYearCount');
        var empty = document.getElementById('galleryEmpty');
        var carousel = document.getElementById('galleryCarousel');
        var data = window.GALLERY_CONTENT;
        if (!filters || !grid || !heading || !count || !empty || !carousel) return;
        if (!data || !Array.isArray(data.items)) {
            empty.textContent = 'Gallery content could not be loaded. Please refresh the page.';
            empty.hidden = false;
            return;
        }

        var photos = data.items.filter(function (item) { return item.visible && item.thumb; });
        var years = Array.from(new Set(photos.map(function (item) { return item.year; })))
            .sort(function (a, b) { return b - a; });
        if (!years.length) {
            empty.textContent = 'No photos are available yet.';
            empty.hidden = false;
            return;
        }

        var requestedYear = Number(new URLSearchParams(window.location.search).get('year'));
        var selectedYear = years.includes(requestedYear) ? requestedYear : years[0];
        var carouselInstance = null;

        years.forEach(function (year) {
            var yearPhotos = photos.filter(function (item) { return item.year === year; });
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'gallery-year-button';
            button.dataset.year = year;
            button.setAttribute('aria-pressed', year === selectedYear ? 'true' : 'false');
            var yearText = document.createElement('span');
            yearText.textContent = year;
            var badge = document.createElement('small');
            badge.textContent = yearPhotos.length;
            button.append(yearText, badge);
            button.addEventListener('click', function () {
                if (selectedYear === year) return;
                selectedYear = year;
                var url = new URL(window.location.href);
                url.searchParams.set('year', year);
                window.history.replaceState(null, '', url);
                renderYear();
            });
            filters.appendChild(button);
        });

        function makeCard(item) {
            var col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 col-sm-6';
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'gallery-item';
            button.dataset.src = item.src;
            button.dataset.label = item.label;
            button.setAttribute('aria-label', 'View ' + item.label + ', photo ' + item.order);
            var wrap = document.createElement('span');
            wrap.className = 'gallery-img-wrap';
            var image = document.createElement('img');
            image.src = item.thumb;
            image.alt = item.label;
            image.width = 640;
            image.height = 480;
            image.loading = 'lazy';
            image.decoding = 'async';
            var overlay = document.createElement('span');
            overlay.className = 'gallery-overlay';
            var caption = document.createElement('span');
            caption.className = 'gallery-overlay-text';
            caption.textContent = item.label;
            overlay.appendChild(caption);
            wrap.append(image, overlay);
            button.appendChild(wrap);
            col.appendChild(button);
            return col;
        }

        function renderCarousel() {
            if (carouselInstance) {
                carouselInstance.dispose();
                carouselInstance = null;
            }
            var slides = data.items.filter(function (item) {
                return item.carouselOrder && item.preview;
            }).sort(function (a, b) { return a.carouselOrder - b.carouselOrder; });
            carousel.hidden = !slides.length;
            if (!slides.length) return;

            var indicators = carousel.querySelector('.carousel-indicators');
            var inner = carousel.querySelector('.carousel-inner');
            var indicatorNodes = document.createDocumentFragment();
            var slideNodes = document.createDocumentFragment();
            slides.forEach(function (item, index) {
                var indicator = document.createElement('button');
                indicator.type = 'button';
                indicator.dataset.bsTarget = '#galleryCarousel';
                indicator.dataset.bsSlideTo = index;
                indicator.setAttribute('aria-label', 'Photo ' + (index + 1));
                if (index === 0) {
                    indicator.className = 'active';
                    indicator.setAttribute('aria-current', 'true');
                }
                indicatorNodes.appendChild(indicator);

                var slide = document.createElement('div');
                slide.className = 'carousel-item' + (index === 0 ? ' active' : '');
                var wrapper = document.createElement('div');
                wrapper.className = 'carousel-slide-wrapper';
                var image = document.createElement('img');
                image.className = 'carousel-slide-img';
                image.src = item.preview;
                image.alt = item.label;
                image.loading = index === 0 ? 'eager' : 'lazy';
                image.decoding = 'async';
                image.fetchPriority = index === 0 ? 'high' : 'low';
                var caption = document.createElement('div');
                caption.className = 'carousel-caption';
                var text = document.createElement('p');
                text.textContent = item.label;
                caption.appendChild(text);
                wrapper.appendChild(image);
                slide.append(wrapper, caption);
                slideNodes.appendChild(slide);
            });
            indicators.replaceChildren(indicatorNodes);
            inner.replaceChildren(slideNodes);
            indicators.hidden = slides.length < 2;
            carousel.querySelector('.carousel-control-prev').hidden = slides.length < 2;
            carousel.querySelector('.carousel-control-next').hidden = slides.length < 2;
            if (slides.length > 1 && window.bootstrap && bootstrap.Carousel) {
                carouselInstance = new bootstrap.Carousel(carousel, { interval: 5000, ride: 'carousel' });
            }
        }

        function renderYear() {
            var selectedPhotos = photos.filter(function (item) { return item.year === selectedYear; });
            filters.querySelectorAll('button').forEach(function (button) {
                button.setAttribute('aria-pressed', Number(button.dataset.year) === selectedYear ? 'true' : 'false');
            });
            heading.textContent = selectedYear;
            count.textContent = selectedPhotos.length + (selectedPhotos.length === 1 ? ' photo' : ' photos');
            var cards = document.createDocumentFragment();
            selectedPhotos.forEach(function (item) { cards.appendChild(makeCard(item)); });
            grid.replaceChildren(cards);
            empty.hidden = true;
        }

        renderCarousel();
        renderYear();
    });
})();
