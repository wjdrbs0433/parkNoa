"""Tests for Excel-driven Abstract page data."""

import importlib.util
import unittest
from pathlib import Path


spec = importlib.util.spec_from_file_location('build_abstract', Path(__file__).with_name('build-abstract.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class SheetRows:
    def __init__(self, rows):
        self.rows = rows

    def iter_rows(self, values_only=True):
        return iter(self.rows)


class AbstractWorkbookTest(unittest.TestCase):
    def test_added_row_is_sorted_newest_first(self):
        rows = [
            module.HEADERS,
            (8, 'Authors. 2025.', 'Existing title', '. Proceedings 2025.'),
            (9, 'Authors. 2026.', 'New title', '. Proceedings 2026.'),
        ]
        data = module.build_data({'Abstract': SheetRows(rows)})
        self.assertEqual([item['number'] for item in data['items']], [9, 8])
        self.assertEqual(data['items'][0]['title'], 'New title')

    def test_duplicate_number_is_rejected(self):
        rows = [module.HEADERS, (8, 'A', 'One', '. Proceedings.'), (8, 'B', 'Two', '. Proceedings.')]
        with self.assertRaisesRegex(ValueError, '중복 번호'):
            module.build_data({'Abstract': SheetRows(rows)})


if __name__ == '__main__':
    unittest.main()
