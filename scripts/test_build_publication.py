"""Tests for Excel-driven Publication page data."""

import importlib.util
import unittest
from pathlib import Path


spec = importlib.util.spec_from_file_location('build_publication', Path(__file__).with_name('build-publication.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class SheetRows:
    def __init__(self, rows):
        self.rows = rows

    def iter_rows(self, values_only=True):
        return iter(self.rows)


class PublicationWorkbookTest(unittest.TestCase):
    def test_new_row_is_sorted_and_link_can_be_blank(self):
        rows = [
            module.HEADERS,
            (10, 'Authors. 2026.', 'Earlier title', '. Journal 1:1.', 'https://example.org/earlier'),
            (11, 'Authors. 2027.', 'New title', '. Journal 2:2.', None),
        ]
        data = module.build_data({'Publication': SheetRows(rows)})
        self.assertEqual([item['number'] for item in data['items']], [11, 10])
        self.assertEqual(data['items'][0]['title'], 'New title')
        self.assertEqual(data['items'][0]['url'], '')

    def test_duplicate_number_is_rejected(self):
        rows = [
            module.HEADERS,
            (10, 'Authors. 2026.', 'First', '. Journal 1:1.', ''),
            (10, 'Authors. 2026.', 'Second', '. Journal 2:2.', ''),
        ]
        with self.assertRaisesRegex(ValueError, '중복 번호'):
            module.build_data({'Publication': SheetRows(rows)})

    def test_www_link_gets_https_scheme(self):
        rows = [
            module.HEADERS,
            (11, 'Authors. 2027.', 'New title', '. Journal 2:2.', 'www.example.org/paper'),
        ]
        data = module.build_data({'Publication': SheetRows(rows)})
        self.assertEqual(data['items'][0]['url'], 'https://www.example.org/paper')


if __name__ == '__main__':
    unittest.main()
