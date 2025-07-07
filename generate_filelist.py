import os
import json
import re


def get_file_sort_key(filepath):
    """Extract all sorting components from filepath"""
    filename = os.path.basename(filepath)
    dirname = os.path.dirname(filepath)

    # 1. Check for intro files
    lower_name = filename.lower()
    if any(x in lower_name for x in ['intro', 'содержание', 'readme']):
        return (0, 0, dirname, filename)  # Highest priority

    # 2. Extract leading number if exists
    num_match = re.match(r'^(\d+)', filename)
    number = int(num_match.group(1)) if num_match else float('inf')

    return (1, number, dirname, filename)  # Sort by number then alphabetically


def find_markdown_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        # Sort directories by numbers then alphabetically
        dirs.sort(key=lambda d: [int(s) if s.isdigit() else s.lower()
                                 for s in re.split('([0-9]+)', d)])

        # Sort files using our sort key
        files.sort(key=lambda f: get_file_sort_key(f))

        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                rel_path = os.path.relpath(path, directory).replace('\\', '/')
                file_list.append({"path": rel_path})
    return file_list


def main():
    content_dir = os.path.join(os.path.dirname(__file__), 'content')
    files = find_markdown_files(content_dir)

    output_path = os.path.join(content_dir, 'filelist.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(files, f, indent=2, ensure_ascii=False)

    print(f"Generated file list with {len(files)} files at {output_path}")


if __name__ == "__main__":
    main()