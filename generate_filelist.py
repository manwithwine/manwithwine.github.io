import os
import json
import re
from functools import cmp_to_key


def get_file_sort_key(filepath):
    """Extract numeric prefix and other sorting factors"""
    filename = os.path.basename(filepath)

    # 1. Check for intro files
    lower_name = filename.lower()
    if any(x in lower_name for x in ['intro', 'содержание', 'readme']):
        return (0, 0, filename)  # Highest priority

    # 2. Extract leading number if exists
    num_match = re.match(r'^(\d+)', filename)
    if num_match:
        return (1, int(num_match.group(1)), filename)  # Medium priority with number

    return (2, float('inf'), filename)  # Lowest priority (unnumbered files)


def compare_files(a, b):
    """Custom comparator for sorting files"""
    # Primary sort by directory depth
    depth_cmp = a['path'].count('/') - b['path'].count('/')
    if depth_cmp != 0:
        return depth_cmp

    # Get sort keys for both files
    a_priority, a_num, a_name = get_file_sort_key(a['path'])
    b_priority, b_num, b_name = get_file_sort_key(b['path'])

    # Sort by priority (intro files first)
    if a_priority != b_priority:
        return a_priority - b_priority

    # For numbered files, sort by numbers
    if a_priority == 1 and b_priority == 1:
        return a_num - b_num

    # Finally sort alphabetically
    return (a_name > b_name) - (a_name < b_name)


def find_markdown_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        # Sort directories considering numbers
        dirs.sort(key=lambda d: [int(s) if s.isdigit() else s.lower()
                                 for s in re.split('([0-9]+)', d)])

        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                rel_path = os.path.relpath(path, directory).replace('\\', '/')
                file_list.append({"path": rel_path})
    return file_list


def main():
    content_dir = os.path.join(os.path.dirname(__file__), 'content')
    files = find_markdown_files(content_dir)

    # Sort using our custom comparator
    files.sort(key=cmp_to_key(compare_files))

    output_path = os.path.join(content_dir, 'filelist.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(files, f, indent=2, ensure_ascii=False)

    print(f"Generated file list with {len(files)} files at {output_path}")


if __name__ == "__main__":
    main()