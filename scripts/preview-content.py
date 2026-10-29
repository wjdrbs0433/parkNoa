"""Preview the site locally and rebuild Excel-backed pages when the workbook changes."""

import os
import subprocess
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Lock


ROOT = Path(__file__).resolve().parents[1]
WORKBOOK = ROOT / 'content' / 'site-content.xlsx'
IMAGE_DIR = ROOT / 'img'
BUILDERS = ('build-about.py', 'build-publication.py', 'build-abstract.py', 'build-gallery.py')
BUILD_LOCK = Lock()
last_seen = None
last_build_ok = False
last_build_error = ''


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_GET(self):
        if not ensure_current():
            self.send_error(503, last_build_error or 'Content build failed; check the preview terminal')
            return
        if 'If-Modified-Since' in self.headers:
            del self.headers['If-Modified-Since']
        super().do_GET()

    def do_HEAD(self):
        if not ensure_current():
            self.send_error(503, last_build_error or 'Content build failed; check the preview terminal')
            return
        if 'If-Modified-Since' in self.headers:
            del self.headers['If-Modified-Since']
        super().do_HEAD()


def rebuild():
    global last_build_error
    errors = []
    for builder in BUILDERS:
        result = subprocess.run(
            [sys.executable, str(ROOT / 'scripts' / builder)],
            cwd=ROOT,
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
            env={**os.environ, 'PYTHONIOENCODING': 'utf-8'},
        )
        message = (result.stdout + result.stderr).strip()
        if message:
            print(message, flush=True)
        if result.returncode != 0:
            errors.append(message.splitlines()[-1] if message else f'{builder} failed')
    last_build_error = ' '.join(errors)
    return not errors


def ensure_current():
    global last_seen, last_build_ok, last_build_error
    with BUILD_LOCK:
        try:
            photos = tuple(sorted(
                (path.name, path.stat().st_mtime_ns, path.stat().st_size)
                for path in IMAGE_DIR.iterdir()
                if path.is_file() and path.name.lower().startswith('gallery')
            ))
            changed = (WORKBOOK.stat().st_mtime_ns, photos)
        except OSError as exc:
            print(f'Cannot read workbook: {exc}', flush=True)
            return False
        if changed != last_seen:
            last_seen = changed
            try:
                last_build_ok = rebuild()
            except Exception as exc:
                last_build_ok = False
                last_build_error = f'Preview build failed: {exc}'
                print(last_build_error, flush=True)
            if not last_build_ok:
                print('Build failed. Correct the workbook, save, then refresh.', flush=True)
        return last_build_ok


def main():
    server = ThreadingHTTPServer(('127.0.0.1', 8000), PreviewHandler)
    print('Preview: http://127.0.0.1:8000/publication.html', flush=True)
    print('Save the workbook, then refresh to rebuild About, Publication, Abstract, and Gallery.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nPreview stopped.', flush=True)
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
