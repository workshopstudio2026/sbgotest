import zipfile
import os
import sys

def zip_dir(dir_path, zip_path):
    os.makedirs(os.path.dirname(os.path.abspath(zip_path)), exist_ok=True)
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dir_path):
            for file in files:
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, os.path.dirname(dir_path))
                zipf.write(abs_path, rel_path)

if __name__ == '__main__':
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    theme_dir = os.path.join(root_dir, 'wordpress-theme', 'sb-go-theme')
    public_zip = os.path.join(root_dir, 'public', 'sb-go-theme.zip')
    theme_zip = os.path.join(root_dir, 'wordpress-theme', 'sb-go-theme.zip')

    zip_dir(theme_dir, public_zip)
    zip_dir(theme_dir, theme_zip)
    print(f'Successfully created {public_zip} and {theme_zip}')
