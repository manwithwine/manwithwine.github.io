import os
import json
from functools import cmp_to_key


def compare_files(a, b):
    """Custom comparator for better sorting"""
    # Get paths without extensions
    path_a = a['path'].lower().replace('.md', '')
    path_b = b['path'].lower().replace('.md', '')

    # Check for intro files
    is_intro_a = any(x in os.path.basename(path_a).lower() for x in ['intro', 'содержание', 'readme'])
    is_intro_b = any(x in os.path.basename(path_b).lower() for x in ['intro', 'содержание', 'readme'])

    # Intro files come first
    if is_intro_a and not is_intro_b:
        return -1
    if not is_intro_a and is_intro_b:
        return 1

    # Then sort by depth
    depth_cmp = a['path'].count('/') - b['path'].count('/')
    if depth_cmp != 0:
        return depth_cmp

    # Finally alphabetical
    return (a['path'] > b['path']) - (a['path'] < b['path'])


def find_markdown_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        # Sort directories for consistent ordering
        dirs.sort()
        for file in sorted(files):
            if file.endswith('.md'):
                path = os.path.join(root, file)
                rel_path = os.path.relpath(path, directory).replace('\\', '/')
                file_list.append({"path": rel_path})
    return file_list


def main():
    content_dir = os.path.join(os.path.dirname(__file__), 'content')
    files = find_markdown_files(content_dir)

    # Use custom sorting
    files.sort(key=cmp_to_key(compare_files))

    output_path = os.path.join(content_dir, 'filelist.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(files, f, indent=2, ensure_ascii=False)

    print(f"Generated file list with {len(files)} files at {output_path}")


if __name__ == "__main__":
    main()