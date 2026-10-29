/** Render the Publication sheet data into publication.html. */
(function () {
    function appendAfter(paragraph, after) {
        var journal = /^([.,;:!?]?\s*)(.+?)(\s+\d+(?::|\().*)$/.exec(after);
        if (!journal) {
            paragraph.appendChild(document.createTextNode(/^[.,;:!?]/.test(after) ? after : ' ' + after));
            return;
        }
        paragraph.appendChild(document.createTextNode(journal[1] || ' '));
        var cite = document.createElement('cite');
        cite.className = 'pub-journal-name';
        cite.textContent = journal[2];
        paragraph.appendChild(cite);
        paragraph.appendChild(document.createTextNode(journal[3]));
    }

    document.addEventListener('DOMContentLoaded', function () {
        var data = window.PUBLICATION_CONTENT;
        var list = document.getElementById('publication-list');
        var count = document.getElementById('publication-count');
        if (!data || !list || !count) return;

        var fragment = document.createDocumentFragment();
        data.items.forEach(function (item) {
            var li = document.createElement('li');
            li.className = 'pub-item';
            var number = document.createElement('span');
            number.className = 'pub-item-num';
            number.setAttribute('aria-hidden', 'true');
            number.textContent = item.number;
            var body = document.createElement('div');
            body.className = 'pub-item-body';
            var paragraph = document.createElement('p');
            paragraph.className = 'pub-item-text';
            paragraph.appendChild(document.createTextNode(item.before + ' '));
            var title = document.createElement(item.url ? 'a' : 'span');
            title.className = 'pub-title-link';
            title.textContent = item.title;
            if (item.url) {
                title.href = item.url;
                title.target = '_blank';
                title.rel = 'noopener noreferrer';
            }
            paragraph.appendChild(title);
            appendAfter(paragraph, item.after);
            body.appendChild(paragraph);
            li.appendChild(number);
            li.appendChild(body);
            fragment.appendChild(li);
        });
        list.replaceChildren(fragment);
        count.textContent = data.items.length + (data.items.length === 1 ? ' article' : ' articles') + ' — newest first';
    });
})();
