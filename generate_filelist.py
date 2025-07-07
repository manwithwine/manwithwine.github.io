import os
import json


def find_markdown_files(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                # Convert to relative path and normalize slashes
                rel_path = os.path.relpath(path, directory).replace('\\', '/')
                file_list.append({"path": rel_path})
    return file_list


def main():
    content_dir = os.path.join(os.path.dirname(__file__), 'content')
    files = find_markdown_files(content_dir)

    # Sort files by path for consistent ordering
    files.sort(key=lambda x: x['path'])

    output_path = os.path.join(content_dir, 'filelist.json')
    with open(output_path, 'w') as f:
        json.dump(files, f, indent=2)

    print(f"Generated file list with {len(files)} files at {output_path}")


if __name__ == "__main__":
    main()