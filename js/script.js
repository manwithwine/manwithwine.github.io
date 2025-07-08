document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Home button in sidebar with adjusted icon position
    const homeButton = document.createElement('div');
    homeButton.className = 'nav-item home-button';
    homeButton.innerHTML = '<i class="fas fa-home" style="margin-left: 5px; transform: translateX(3px)"></i> Home';
    homeButton.addEventListener('click', () => {
        document.getElementById('content-display').innerHTML = `
            <h1>Welcome to My Knowledge Base</h1>
            <p>Select a topic from the sidebar to begin.</p>
        `;
        window.location.hash = '';
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
    });
    document.getElementById('nav-container').prepend(homeButton);

    // Theme switcher functionality
    const themeSwitcher = document.getElementById('themeSwitcher');
    const themeIcons = themeSwitcher.querySelectorAll('.theme-icon');

    // Check for saved preference or use system preference
    const savedTheme = localStorage.getItem('theme') ||
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Update active icon
    themeIcons.forEach(icon => {
        if (icon.dataset.theme === savedTheme) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });

    // Handle theme switching
    themeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const theme = icon.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            themeIcons.forEach(i => i.classList.toggle('active', i === icon));
        });
    });

    // Load navigation
    loadNavigation();

    // Load content from URL hash if present
    if (window.location.hash) {
        loadContent(window.location.hash.substring(1));
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

        // Initialize search after navigation is built
        initializeSearch();

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
        let html = marked.parse(markdown);

        // Fix markdown links to use loadContent
        html = html.replace(/href="([^"]+\.md)"/g, 'href="#" onclick="loadContent(\'$1\'); return false;"');

        // Add responsive table wrapper if needed
        html = html.replace(/<table>/g, '<div class="table-wrapper"><table>');
        html = html.replace(/<\/table>/g, '</table></div>');

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

// Search functionality
const searchIndex = [];

async function initializeSearch() {
    try {
        const response = await fetch('content/filelist.json');
        if (!response.ok) throw new Error('File list not found');

        const files = await response.json();

        // Load content of each file to index
        for (const file of files) {
            const contentResponse = await fetch(`content/${file.path}`);
            if (contentResponse.ok) {
                const markdown = await contentResponse.text();
                // Remove markdown formatting for cleaner search
                const plainText = markdown
                    .replace(/[#*`\-_\[\]()]/g, ' ')
                    .replace(/\s+/g, ' ');

                searchIndex.push({
                    path: file.path,
                    title: file.path.split('/').pop().replace('.md', '').replace(/-/g, ' '),
                    content: plainText.toLowerCase()
                });
            }
        }
    } catch (error) {
        console.error('Error building search index:', error);
    }

    // Search input handler
    document.getElementById('search-input').addEventListener('input', (e) => {
        performSearch(e.target.value.trim());
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            document.getElementById('search-results').style.display = 'none';
        }
    });
}

function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }

    const queryLower = query.toLowerCase();
    const results = [];

    // Search both titles and content
    searchIndex.forEach(item => {
        const titleMatch = item.title.toLowerCase().includes(queryLower);
        const contentMatch = item.content.includes(queryLower);

        if (titleMatch || contentMatch) {
            // Calculate relevance score
            let score = 0;
            if (titleMatch) score += 2;
            if (contentMatch) score += 1;

            // Count occurrences in content
            const contentOccurrences = (item.content.match(new RegExp(queryLower, 'g')) || []).length;
            score += contentOccurrences * 0.5;

            results.push({ ...item, score });
        }
    });

    // Sort by relevance
    results.sort((a, b) => b.score - a.score);

    // Display results
    if (results.length > 0) {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result-item';

            // Highlight matching parts in title
            let displayTitle = result.title;
            if (query.length > 1) {
                displayTitle = result.title.replace(
                    new RegExp(query, 'gi'),
                    match => `<span class="highlight">${match}</span>`
                );
            }

            // Show path without filename
            const pathParts = result.path.split('/');
            pathParts.pop(); // Remove filename

            resultElement.innerHTML = `
                <div class="title">${displayTitle}</div>
                <div class="path">${pathParts.join(' › ')}</div>
            `;

            resultElement.addEventListener('click', () => {
                loadContent(result.path);
                document.getElementById('search-input').value = '';
                resultsContainer.style.display = 'none';
                if (window.innerWidth <= 768) sidebar.classList.remove('open');
            });

            resultsContainer.appendChild(resultElement);
        });
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<div class="search-result-item">No results found</div>';
        resultsContainer.style.display = 'block';
    }
}

// Mobile sidebar improvements
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebar = document.getElementById('sidebar');

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// Move menu toggle button
function positionMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    if (window.innerWidth <= 768) {
        menuToggle.style.position = 'fixed';
        menuToggle.style.bottom = '20px';
        menuToggle.style.left = '20px';
        menuToggle.style.top = 'auto';
    } else {
        menuToggle.style.position = 'absolute';
        menuToggle.style.top = '10px';
        menuToggle.style.left = '10px';
        menuToggle.style.bottom = 'auto';
    }
}

// Initialize on load
positionMenuToggle();
window.addEventListener('resize', positionMenuToggle);

// Swipe gesture support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    // Swipe right to open (only if starting from left edge)
    if (touchEndX > touchStartX + 50 && touchStartX < 50) {
        sidebar.classList.add('open');
    }
    // Swipe left to close
    else if (touchStartX > touchEndX + 50 && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
}