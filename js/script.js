document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Load navigation and content
    loadNavigation();

    // Load default content if URL has hash
    if (window.location.hash) {
        loadContent(window.location.hash.substring(1));
    }
});

async function loadNavigation() {
    try {
        // Fetch the list of markdown files
        const response = await fetch('content/filelist.json');
        if (!response.ok) throw new Error('File list not found');

        const files = await response.json();
        const navContainer = document.getElementById('nav-container');

        // Group files by category
        const categories = {};
        files.forEach(file => {
            const parts = file.path.split('/');
            const category = parts[1]; // "Network", "Linux", etc.
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(file);
        });

        // Build navigation HTML
        for (const [category, items] of Object.entries(categories)) {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'nav-category';

            const titleEl = document.createElement('div');
            titleEl.className = 'nav-category-title';
            titleEl.innerHTML = `<i class="fas fa-folder"></i> ${category}`;

            const itemsEl = document.createElement('div');
            itemsEl.className = 'nav-items';

            items.forEach(item => {
                const displayName = item.path.split('/').pop().replace('.md', '').replace(/-/g, ' ');
                const itemEl = document.createElement('div');
                itemEl.className = 'nav-item';
                itemEl.textContent = displayName;
                itemEl.dataset.path = item.path;
                itemEl.addEventListener('click', () => {
                    loadContent(item.path);
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('open');
                    }
                });
                itemsEl.appendChild(itemEl);
            });

            // Collapse/expand functionality
            titleEl.addEventListener('click', () => {
                titleEl.classList.toggle('collapsed');
                itemsEl.classList.toggle('collapsed');
            });

            categoryEl.appendChild(titleEl);
            categoryEl.appendChild(itemsEl);
            navContainer.appendChild(categoryEl);
        }
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
    } catch (error) {
        document.getElementById('content-display').innerHTML = `
            <h1>Error loading content</h1>
            <p>${error.message}</p>
        `;
    }
}