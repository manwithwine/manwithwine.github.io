function slugify(text) {
    return String(text).trim()
        .toLowerCase()
        .replace(/[^\w\u0400-\u04FF0-9 -]/gi, '')
        .replace(/\s+/g, '-');
}

marked.use({
    renderer: {
        heading(text, level) {
            const slug = slugify(text);
            return `<h${level} id="${slug}">${String(text)}</h${level}>`;
        }
    }
});

// ---------------------------------------------------------------------------

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

// ------------- CHANGED: Use slugify(anchor) for scrolling to header -------------
async function loadContent(filePathWithAnchor) {
    try {
        // Split file path and anchor
        const [filePath, anchor] = filePathWithAnchor.split('#');

        const response = await fetch(`content/${filePath}`);
        if (!response.ok) throw new Error('File not found');

        const markdown = await response.text();
        let html = marked.parse(markdown);

        // Process markdown links to use our loadContent function
        html = html.replace(/href="([^"]+\.md)(#[^"]+)?"/g, (match, linkPath, linkAnchor) => {
            const basePath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
            const fullPath = new URL(linkPath, 'http://example.com/' + basePath).pathname.substring(1);
            return `href="#" onclick="loadContent('${fullPath}${linkAnchor ? '#' + linkAnchor : ''}'); return false;"`;
        });

        document.getElementById('content-display').innerHTML = html;

        // Handle anchor navigation after content loads
        if (anchor) {
            setTimeout(() => {
                const target = document.getElementById(slugify(anchor));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    target.classList.add('anchor-highlight');
                    setTimeout(() => {
                        target.classList.remove('anchor-highlight');
                    }, 2000);
                }
            }, 300); // Timeout to ensure DOM is ready
        } else {
            window.scrollTo(0, 0);
        }

        window.location.hash = filePathWithAnchor;
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
// ---------------------------------------------------------------------
const searchIndex = [];
let searchInitialized = false;
let currentSearchTerm = '';

async function initializeSearch() {
    if (searchInitialized) return;

    try {
        const response = await fetch('content/filelist.json');
        if (!response.ok) throw new Error('File list not found');

        const files = await response.json();
        const loadingPromises = files.map(file =>
            fetch(`content/${file.path}`)
                .then(res => res.ok ? res.text() : '')
                .then(markdown => {
                    const plainText = markdown
                        .replace(/[#*`\-_\[\]()]/g, ' ')
                        .replace(/\s+/g, ' ')
                        .toLowerCase();

                    searchIndex.push({
                        path: file.path,
                        title: file.path.split('/').pop()
                            .replace('.md', '')
                            .replace(/-/g, ' '),
                        content: plainText,
                        rawMarkdown: markdown
                    });
                })
                .catch(err => console.error(`Error loading ${file.path}:`, err))
        );

        await Promise.all(loadingPromises);
        searchInitialized = true;

        // Search input handler with debounce
        let searchTimeout;
        document.getElementById('search-input').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentSearchTerm = e.target.value.trim();
                performSearch(currentSearchTerm);
            }, 300);
        });

    } catch (error) {
        console.error('Error initializing search:', error);
    }
}

function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!searchInitialized || query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }

    resultsContainer.innerHTML = '<div class="search-result-item">Searching...</div>';
    resultsContainer.style.display = 'block';

    try {
        const queryLower = query.toLowerCase();
        const results = searchIndex.map(item => {
            const titleMatch = item.title.toLowerCase().includes(queryLower);
            const contentMatch = item.content.includes(queryLower);

            if (titleMatch || contentMatch) {
                const score = (titleMatch ? 2 : 0) +
                              (contentMatch ? 1 : 0) +
                              (item.content.match(new RegExp(queryLower, 'g'))?.length * 0.5 || 0);

                return { ...item, score };
            }
            return null;
        }).filter(Boolean).sort((a, b) => b.score - a.score);

        resultsContainer.innerHTML = '';
        if (results.length) {
            results.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.className = 'search-result-item';
                resultElement.innerHTML = `
                    <div class="title">${highlightMatches(result.title, query)}</div>
                    <div class="path">${result.path.split('/').slice(0, -1).join(' › ')}</div>
                `;

                resultElement.addEventListener('click', () => {
                    loadSearchResult(result.path, query);
                });

                resultsContainer.appendChild(resultElement);
            });
        } else {
            resultsContainer.innerHTML = '<div class="search-result-item">No results found</div>';
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = '<div class="search-result-item">Search failed</div>';
    }
}

function highlightMatches(text, query) {
    return text.replace(
        new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
        match => `<span class="highlight">${match}</span>`
    );
}

async function loadSearchResult(filePath, query) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.style.display = 'none';
    document.getElementById('search-input').value = '';

    await loadContent(filePath);

    if (query) {
        setTimeout(() => {
            highlightAndScrollToSearchTerm(query);
        }, 500);
    }
}

function highlightAndScrollToSearchTerm(query) {
    const contentEl = document.getElementById('content-display');
    if (!contentEl) return;

    // Clear previous highlights
    contentEl.querySelectorAll('.search-highlight').forEach(el => {
        el.replaceWith(el.textContent);
    });

    const walker = document.createTreeWalker(
        contentEl,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    let firstHighlight = null;
    const queryLower = query.toLowerCase();

    while (node = walker.nextNode()) {
        const nodeValue = node.nodeValue.toLowerCase();
        const matchPos = nodeValue.indexOf(queryLower);

        if (matchPos >= 0) {
            const range = document.createRange();
            range.setStart(node, matchPos);
            range.setEnd(node, matchPos + query.length);

            const span = document.createElement('span');
            span.className = 'search-highlight';
            range.surroundContents(span);

            if (!firstHighlight) {
                firstHighlight = span;
                setTimeout(() => {
                    span.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    span.style.animation = 'pulse-highlight 1.5s';
                }, 50);
            }
        }
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
