document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Home button in sidebar
    const homeButton = document.createElement('div');
    homeButton.className = 'nav-item home-button';
    homeButton.innerHTML = '<i class="fas fa-home"></i> Home';
    homeButton.addEventListener('click', () => {
        document.getElementById('content-display').innerHTML = `
            <h1>Welcome to My Knowledge Base</h1>
            <p>Select a topic from the sidebar to begin.</p>
        `;
        window.location.hash = '';
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
    });
    document.getElementById('nav-container').prepend(homeButton);

    // Load navigation
    loadNavigation();

    // Load content from URL hash if present
    if (window.location.hash) {
        loadContent(window.location.hash.substring(1));
    } else {
        // Show welcome message by default
        document.getElementById('content-display').innerHTML = `
            <h1>Welcome to My Knowledge Base</h1>
            <p>Select a topic from the sidebar to begin.</p>
        `;
    }
});

async function loadNavigation() {
    try {
        const response = await fetch('content/filelist.json');
        if (!response.ok) throw new Error('File list not found');

        const files = await response.json();
        const navContainer = document.getElementById('nav-container');

        // Create a map to organize files by directory
        const dirMap = new Map();

        // Process all files and group by directory while preserving order
        files.forEach(file => {
            const parts = file.path.split('/');
            const dirPath = parts.slice(0, -1).join('/');
            const fileName = parts[parts.length - 1];
            const displayName = fileName.replace('.md', '')
                                      .replace(/^\d+-/, '')  // Remove leading numbers
                                      .replace(/-/g, ' ');   // Replace hyphens with spaces

            if (!dirMap.has(dirPath)) {
                dirMap.set(dirPath, []);
            }
            dirMap.get(dirPath).push({
                displayName: displayName,
                fullPath: file.path,
                fileName: fileName
            });
        });

        // Helper function to create directory hierarchy
        function addDirectoryItems(dirPath, items, parentElement) {
            const dirParts = dirPath ? dirPath.split('/') : [];
            let currentElement = parentElement;

            // Create hierarchy elements if needed
            for (let i = 0; i < dirParts.length; i++) {
                const currentDir = dirParts[i];
                const displayDirName = currentDir.replace(/^\d+-/, '').replace(/-/g, ' ');
                let dirElement = Array.from(currentElement.children)
                    .find(el => {
                        const title = el.querySelector('.nav-category-title');
                        return title && title.textContent.includes(displayDirName);
                    });

                if (!dirElement) {
                    dirElement = document.createElement('div');
                    dirElement.className = 'nav-category';
                    dirElement.innerHTML = `
                        <div class="nav-category-title">
                            <i class="fas fa-folder"></i> ${displayDirName}
                        </div>
                        <div class="nav-items ${i > 0 ? 'collapsed' : ''}"></div>
                    `;
                    currentElement.appendChild(dirElement);

                    // Add click handler for this category
                    const titleEl = dirElement.querySelector('.nav-category-title');
                    titleEl.addEventListener('click', (e) => {
                        e.stopPropagation();
                        titleEl.classList.toggle('collapsed');
                        dirElement.querySelector('.nav-items').classList.toggle('collapsed');
                    });

                    // Collapse if not top level
                    if (i > 0) {
                        dirElement.querySelector('.nav-category-title').classList.add('collapsed');
                    }
                }

                currentElement = dirElement.querySelector('.nav-items');
            }

            // Add files in the exact order from filelist.json
            items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'nav-item';
                itemEl.innerHTML = `<i class="fas fa-file-alt"></i> ${item.displayName}`;
                itemEl.dataset.path = item.fullPath;
                itemEl.addEventListener('click', () => {
                    loadContent(item.fullPath);
                    if (window.innerWidth <= 768) sidebar.classList.remove('open');
                });
                currentElement.appendChild(itemEl);
            });
        }

        // Process each directory in order
        const sortedDirs = Array.from(dirMap.keys()).sort((a, b) => {
            // Sort directories by their appearance in the filelist
            const firstFileA = files.find(f => f.path.startsWith(a + '/'));
            const firstFileB = files.find(f => f.path.startsWith(b + '/'));
            return files.indexOf(firstFileA) - files.indexOf(firstFileB);
        });

        sortedDirs.forEach(dirPath => {
            addDirectoryItems(dirPath, dirMap.get(dirPath), navContainer);
        });

    } catch (error) {
        console.error('Error loading navigation:', error);
        document.getElementById('nav-container').innerHTML =
            '<p>Error loading navigation. Please check filelist.json</p>';
    }
}

async function loadContent(filePath) {
    try {
        const response = await fetch(`content/${filePath}`);
        if (!response.ok) throw new Error('File not found');

        const markdown = await response.text();
        const html = marked.parse(markdown);

        document.getElementById('content-display').innerHTML = html;
        window.location.hash = filePath;

        // Scroll to top
        window.scrollTo(0, 0);
    } catch (error) {
        document.getElementById('content-display').innerHTML = `
            <div class="error-message">
                <h1>Error loading content</h1>
                <p>${error.message}</p>
                <button onclick="location.hash='';location.reload()" class="home-button">
                    <i class="fas fa-home"></i> Return Home
                </button>
            </div>
        `;
    }
}