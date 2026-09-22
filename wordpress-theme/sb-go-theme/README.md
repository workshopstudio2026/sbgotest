# SB GO Stationery — WordPress Theme

This WordPress theme embeds and powers the modern SB GO React application with full responsiveness, dynamic menus, and asset handling.

## Features
- **Modern React & Tailwind Architecture**: High-speed, responsive, interactive store & franchise experience.
- **Elementor Free & Pro Support**: Full native support for Elementor drag-and-drop page building on any page, post, or homepage.
- **Dedicated Page Templates**:
  - `Elementor Full Width`: Edge-to-edge content container with site header and footer.
  - `Elementor Canvas`: 100% blank template for custom landing pages.
- **Automated Asset Enqueueing**: `functions.php` automatically parses the Vite manifest and enqueues compiled styles and scripts without conflicting with Elementor's editor.
- **WordPress Ready**: Includes `style.css`, `header.php`, `footer.php`, `functions.php`, `index.php`, `front-page.php`, `page.php`, and Elementor templates.
- **Supports WordPress REST API & Context**: Injects `window.sbGoWpData` (site URL, theme directory, REST endpoint, nonce) into the React app.

---

## Using with Elementor Free

1. In your WordPress Dashboard, install and activate the free **Elementor** plugin (**Plugins → Add New → Search "Elementor" → Install & Activate**).
2. Create a new page (**Pages → Add New**), enter a title, and click the blue **"Edit with Elementor"** button.
3. In the page settings (gear icon on bottom-left) or in **Page Attributes → Template**, you can select:
   - **Default Template**: Renders Elementor content with standard SB GO styling.
   - **Elementor Full Width**: Full edge-to-edge layout with header and footer.
   - **Elementor Canvas**: Completely blank canvas without header/footer for landing pages.
4. Drag and drop any Elementor widgets (Headings, Images, Text, Buttons, Columns, Containers, Testimonials, Maps, etc.) and click **Publish**.

---

## How to Install in WordPress

### Method 1: Upload via WordPress Admin (Recommended)
1. Zip the `sb-go-theme` folder (so the zip contains `sb-go-theme/style.css`, `functions.php`, `dist/`, etc.).
2. In your WordPress Dashboard, navigate to **Appearance > Themes**.
3. Click **Add New Theme** → **Upload Theme**.
4. Choose the `sb-go-theme.zip` file and click **Install Now**.
5. Click **Activate**.

### Method 2: Copy via FTP or cPanel File Manager
1. Copy or upload the `sb-go-theme` folder into your WordPress site directory at:
   ```
   wp-content/themes/sb-go-theme
   ```
2. In your WordPress Dashboard, navigate to **Appearance > Themes**.
3. Find **SB GO Stationery** and click **Activate**.

---

## How to Rebuild After Code Changes
In this project root:
```bash
npm run build:wordpress
```
This will compile the latest React components with relative paths and copy the assets directly into `wordpress-theme/sb-go-theme/dist`.
