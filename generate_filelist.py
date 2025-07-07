import os
import json
import re
from functools import cmp_to_key


def extract_number(filename):
    """Extract leading number from filename"""
    match = re.match(r'^(\d+)', filename)
    return int(match.group(1)) if match else float('inf')


def compare_items(a, b):
    """Comparison function that properly handles numbered files"""
    # Get base names without extension
    a_name = os.path.basename(a['path']).replace('.md', '')
    b_name = os.path.basename(b['path']).replace('.md', '')

    # Check for intro files (highest priority)
    intro_terms = ['intro', 'содержание', 'readme']
    a_is_intro = any(term in a_name.lower() for term in intro_terms)
    b_is_intro = any(term in b_name.lower() for term in intro_terms)

    if a_is_intro and not b_is_intro:
        return -1
    if not a_is_intro and b_is_intro:
        return 1

    # Extract numbers from filenames
    a_num = extract_number(a_name)
    b_num = extract_number(b_name)

    # If both have numbers, sort by numbers
    if a_num != float('inf') and b_num != float('inf'):
        if a_num != b_num:
            return a_num - b_num

    # If only one has number, it comes first
    if a_num != float('inf') and b_num == float('inf'):
        return -1
    if a_num == float('inf') and b_num != float('inf'):
        return 1

    # Finally sort alphabetically
    return (a_name.lower() > b_name.lower()) - (a_name.lower() < b_name.lower())


def find_markdown_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        # Sort directories considering numbers
        dirs.sort(key=lambda d: [int(s) if s.isdigit() else s.lower()
                                 for s in re.split('([0-9]+)', d)])

        # Sort files using our custom comparison
        files_sorted = sorted(files, key=cmp_to_key(
            lambda a, b: compare_items({'path': a}, {'path': b})
        ))

        for file in files_sorted:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                rel_path = os.path.relpath(path, directory).replace('\\', '/')
                file_list.append({"path": rel_path})
    return file_list


def main():
    content_dir = os.path.join(os.path.dirname(__file__), 'content')
    files = find_markdown_files(content_dir)

    # Secondary sort by path depth
    files.sort(key=lambda x: x['path'].count('/'))

    output_path = os.path.join(content_dir, 'filelist.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(files, f, indent=2, ensure_ascii=False)

    print(f"Generated file list with {len(files)} files at {output_path}")


if __name__ == "__main__":
    main()