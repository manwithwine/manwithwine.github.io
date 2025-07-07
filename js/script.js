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

        // Create a map to track directories and their files
        const directoryMap = new Map();

        // First pass: organize files by directory while preserving order
        files.forEach(file => {
            const parts = file.path.split('/');
            const directory = parts.slice(0, -1).join('/');
            const filename = parts[parts.length - 1];
            const displayName = filename.replace('.md', '')
                                      .replace(/^\d+-/, '')  // Remove numbers
                                      .replace(/-/g, ' ');   // Replace hyphens

            if (!directoryMap.has(directory)) {
                directoryMap.set(directory, []);
            }
            directoryMap.get(directory).push({
                displayName: displayName,
                fullPath: file.path
            });
        });

        // Second pass: build the navigation tree
        directoryMap.forEach((files, directory) => {
            const parts = directory.split('/');
            let currentContainer = navContainer;

            // Create directory structure if needed
            parts.forEach((part, index) => {
                const displayPart = part.replace(/^\d+-/, '').replace(/-/g, ' ');
                let dirElement = Array.from(currentContainer.children)
                    .find(el => el.querySelector('.nav-category-title')?.textContent.includes(displayPart));

                if (!dirElement && part) {
                    dirElement = document.createElement('div');
                    dirElement.className = 'nav-category';
                    dirElement.innerHTML = `
                        <div class="nav-category-title ${index > 0 ? 'collapsed' : ''}">
                            <i class="fas fa-folder"></i> ${displayPart}
                        </div>
                        <div class="nav-items ${index > 0 ? 'collapsed' : ''}"></div>
                    `;
                    currentContainer.appendChild(dirElement);

                    // Add click handler
                    const titleEl = dirElement.querySelector('.nav-category-title');
                    titleEl.addEventListener('click', (e) => {
                        e.stopPropagation();
                        titleEl.classList.toggle('collapsed');
                        dirElement.querySelector('.nav-items').classList.toggle('collapsed');
                    });
                }

                if (dirElement) {
                    currentContainer = dirElement.querySelector('.nav-items');
                }
            });

            // Add files in EXACT original order
            files.forEach(file => {
                const itemEl = document.createElement('div');
                itemEl.className = 'nav-item';
                itemEl.innerHTML = `<i class="fas fa-file-alt"></i> ${file.displayName}`;
                itemEl.dataset.path = file.fullPath;
                itemEl.addEventListener('click', () => {
                    loadContent(file.fullPath);
                    if (window.innerWidth <= 768) sidebar.classList.remove('open');
                });
                currentContainer.appendChild(itemEl);
            });
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