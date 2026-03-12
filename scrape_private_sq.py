from playwright.sync_api import sync_playwright
from pathlib import Path

BASE_URL = "https://piano-asparagus.squarespace.com/"
OUT_DIR = Path("/Users/danielkopaee/Cusor Projects/FA:Spatial- Website")
STATE_PATH = OUT_DIR / "sq_auth_state.json"
HTML_PATH = OUT_DIR / "page-auth.html"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)

    if STATE_PATH.exists():
        context = browser.new_context(storage_state=str(STATE_PATH))
    else:
        context = browser.new_context()

    page = context.new_page()
    page.goto(BASE_URL, wait_until="domcontentloaded")

    # First run: log in manually, then press Enter in terminal.
    if not STATE_PATH.exists():
        print("Log in in the opened browser, then press Enter here...")
        input()
        context.storage_state(path=str(STATE_PATH))
        print(f"Saved auth state to: {STATE_PATH}")

    # Revisit with authenticated session and wait for page to finish loading.
    page.goto(BASE_URL, wait_until="networkidle")
    html = page.content()
    HTML_PATH.write_text(html, encoding="utf-8")
    print(f"Saved HTML to: {HTML_PATH}")

    if "This site is currently private" in html:
        print("Still seeing private gate page. Session may be invalid or missing access.")
    else:
        print("Success: got authenticated page HTML.")

    browser.close()
