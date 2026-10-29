/** Render Abstract sheet data into Abstract.html. */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var data = window.ABSTRACT_CONTENT;
        var list = document.getElementById('abstract-list');
        var count = document.getElementById('abstract-count');
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
            var title = document.createElement('span');
            title.className = 'pub-abstract-title';
            title.textContent = item.title;
            paragraph.appendChild(title);
            var after = /^([.,;:!?]\s*)?(.*)$/.exec(item.after);
            paragraph.appendChild(document.createTextNode(after[1] || ' '));
            var citation = document.createElement('cite');
            citation.className = 'pub-journal-plain';
            citation.textContent = after[2];
            paragraph.appendChild(citation);
            body.appendChild(paragraph);
            li.appendChild(number);
            li.appendChild(body);
            fragment.appendChild(li);
        });
        list.replaceChildren(fragment);
        count.textContent = data.items.length + (data.items.length === 1 ? ' presentation' : ' presentations') + ' — newest first';
    });
})();
