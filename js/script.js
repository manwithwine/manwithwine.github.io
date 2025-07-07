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

        // Build hierarchical structure
        const root = {};
        files.forEach(file => {
            const parts = file.path.split('/');
            let current = root;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const isFile = i === parts.length - 1;

                if (isFile) {
                    const fileName = part.replace('.md', '')
                                       .replace(/^\d+-/, '')  // Remove leading numbers
                                       .replace(/-/g, ' ');   // Replace hyphens with spaces
                    current[fileName] = file.path; // Mark as file
                } else {
                    if (!current[part]) {
                        current[part] = {}; // Create folder if not exists
                    }
                    current = current[part];
                }
            }
        });

        // Recursive function to build navigation
        function buildNav(node, parentElement, depth = 0) {
            // Convert to array and sort
            const entries = Object.entries(node).sort(([aName, aValue], [bName, bValue]) => {
                const aIsFolder = typeof aValue === 'object';
                const bIsFolder = typeof bValue === 'object';

                // Intro files first
                const aIsIntro = aName.toLowerCase().includes('intro') ||
                                aName.toLowerCase().includes('содержание');
                const bIsIntro = bName.toLowerCase().includes('intro') ||
                                bName.toLowerCase().includes('содержание');

                if (aIsIntro && !bIsIntro) return -1;
                if (!aIsIntro && bIsIntro) return 1;

                // Then folders
                if (aIsFolder && !bIsFolder) return -1;
                if (!aIsFolder && bIsFolder) return 1;

                // Then by name
                return aName.localeCompare(bName);
            });

            for (const [name, value] of entries) {
                if (typeof value === 'string') {
                    // It's a file
                    const itemEl = document.createElement('div');
                    itemEl.className = 'nav-item';
                    itemEl.innerHTML = `<i class="fas fa-file-alt"></i> ${name}`;
                    itemEl.dataset.path = value;
                    itemEl.addEventListener('click', () => {
                        loadContent(value);
                        if (window.innerWidth <= 768) sidebar.classList.remove('open');
                    });
                    parentElement.appendChild(itemEl);
                } else {
                    // It's a folder
                    const categoryEl = document.createElement('div');
                    categoryEl.className = 'nav-category';

                    const titleEl = document.createElement('div');
                    titleEl.className = 'nav-category-title';
                    titleEl.innerHTML = `<i class="fas fa-folder"></i> ${name}`;

                    const itemsEl = document.createElement('div');
                    itemsEl.className = 'nav-items';

                    // Add collapse class if not top level
                    if (depth > 0) {
                        itemsEl.classList.add('collapsed');
                        titleEl.classList.add('collapsed');
                    }

                    buildNav(value, itemsEl, depth + 1);

                    titleEl.addEventListener('click', (e) => {
                        e.stopPropagation();
                        titleEl.classList.toggle('collapsed');
                        itemsEl.classList.toggle('collapsed');
                    });

                    categoryEl.appendChild(titleEl);
                    categoryEl.appendChild(itemsEl);
                    parentElement.appendChild(categoryEl);
                }
            }
        }

        buildNav(root, navContainer);

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