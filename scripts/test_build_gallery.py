"""Tests for Excel-driven Gallery page data."""

import importlib.util
import tempfile
import unittest
from pathlib import Path


spec = importlib.util.spec_from_file_location('build_gallery', Path(__file__).with_name('build-gallery.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class SheetRows:
    def __init__(self, rows):
        self.rows = rows

    def iter_rows(self, values_only=True):
        return iter(self.rows)


class GalleryWorkbookTest(unittest.TestCase):
    def test_rows_sort_by_year_month_and_order(self):
        with tempfile.TemporaryDirectory() as directory:
            folder = Path(directory)
            for name in ('older.png', 'newer.jpg', 'latest.jpeg'):
                (folder / name).touch()
            rows = [
                module.HEADERS,
                ('older', 'png', 2024, 5, 1, '예', '', 1),
                ('newer', 'jpg', 2025, 2, 1, '예', '', 2),
                ('latest', 'jpeg', 2025, 2, 2, '아니요', 'Featured', 3),
            ]
            data = module.build_data({'Gallery': SheetRows(rows)}, folder)
            self.assertEqual([item['src'] for item in data['items']],
                             ['img/latest.jpeg', 'img/newer.jpg', 'img/older.png'])
            self.assertFalse(data['items'][0]['visible'])
            self.assertEqual(data['items'][0]['carouselOrder'], 3)

    def test_duplicate_month_order_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            folder = Path(directory)
            for name in ('one.png', 'two.png'):
                (folder / name).touch()
            rows = [module.HEADERS,
                    ('one', 'png', 2025, 2, 1, '예', '', 1),
                    ('two', 'png', 2025, 2, 1, '예', '', 2)]
            with self.assertRaisesRegex(ValueError, '중복'):
                module.build_data({'Gallery': SheetRows(rows)}, folder)

    def test_duplicate_carousel_slot_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            folder = Path(directory)
            (folder / 'one.png').touch()
            (folder / 'two.png').touch()
            rows = [module.HEADERS,
                    ('one', 'png', 2025, 2, 1, '예', '', 1),
                    ('two', 'png', 2025, 2, 2, '예', '', 1)]
            with self.assertRaisesRegex(ValueError, '캐러셀 순서 1.*중복'):
                module.build_data({'Gallery': SheetRows(rows)}, folder)

    def test_wrong_extension_skips_only_that_photo(self):
        with tempfile.TemporaryDirectory() as directory:
            folder = Path(directory)
            for name in ('photo.png', 'one.png', 'two.png', 'three.png'):
                (folder / name).touch()
            rows = [module.HEADERS,
                    ('photo', 'jpg', 2025, 12, 1, '예', '', ''),
                    ('one', 'png', 2025, 2, 1, '예', '', 1),
                    ('two', 'png', 2025, 2, 2, '예', '', 2),
                    ('three', 'png', 2025, 2, 3, '예', '', 3)]
            data = module.build_data({'Gallery': SheetRows(rows)}, folder)
            self.assertEqual(len(data['items']), 3)
            self.assertIn('photo.png', data['skipped'][0])


if __name__ == '__main__':
    unittest.main()
