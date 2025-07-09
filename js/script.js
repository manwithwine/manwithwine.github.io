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

async function loadContent(filePathWithAnchor) {
    try {
        // Split file path and anchor
        const [filePath, anchor] = filePathWithAnchor.split('#');

        const response = await fetch(`content/${filePath}`);
        if (!response.ok) throw new Error('File not found');

        const markdown = await response.text();
        let html = marked.parse(markdown);

        // Process regular links
        html = html.replace(/href="([^"]+\.md)(#[^"]+)?"/g, (match, linkPath, linkAnchor) => {
            const basePath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
            const fullPath = new URL(linkPath, 'http://example.com/' + basePath).pathname.substring(1);
            return `href="#" onclick="loadContent('${fullPath}${linkAnchor ? '#' + linkAnchor : ''}'); return false;"`;
        });

        document.getElementById('content-display').innerHTML = html;

        // Handle anchor navigation
        if (anchor) {
            setTimeout(() => {
                const anchorElement = document.getElementById(anchor) ||
                                    document.querySelector(`[name="${anchor}"]`) ||
                                    document.querySelector(`a[name="${anchor}"]`);

                if (anchorElement) {
                    anchorElement.scrollIntoView({ behavior: 'smooth' });
                    // Add highlight effect
                    anchorElement.classList.add('anchor-highlight');
                    setTimeout(() => {
                        anchorElement.classList.remove('anchor-highlight');
                    }, 2000);
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }

        // Update URL
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

// Search functionality
const searchIndex = [];
let searchInitialized = false;

async function initializeSearch() {
    if (searchInitialized) return;

    try {
        const response = await fetch('content/filelist.json');
        if (!response.ok) throw new Error('File list not found');

        const files = await response.json();
        const loadingPromises = [];

        // Load content of each file to index
        for (const file of files) {
            loadingPromises.push(
                fetch(`content/${file.path}`)
                    .then(contentResponse => {
                        if (!contentResponse.ok) return;
                        return contentResponse.text()
                            .then(markdown => {
                                // Remove markdown formatting for cleaner search
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
                                    rawContent: markdown.toLowerCase() // For accurate highlighting
                                });
                            });
                    })
                    .catch(err => console.error(`Error loading ${file.path}:`, err))
            );
        }

        await Promise.all(loadingPromises);
        searchInitialized = true;

        // Search input handler with debounce
        let searchTimeout;
        document.getElementById('search-input').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value.trim());
            }, 300);
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                document.getElementById('search-results').style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Error initializing search:', error);
        document.getElementById('search-results').innerHTML =
            '<div class="search-result-item">Search unavailable</div>';
    }
}

function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!searchInitialized) {
        resultsContainer.innerHTML = '<div class="search-result-item">Search not ready</div>';
        resultsContainer.style.display = 'block';
        return;
    }

    resultsContainer.innerHTML = '<div class="search-result-item">Searching...</div>';
    resultsContainer.style.display = 'block';

    try {
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const queryLower = query.toLowerCase();
        const results = [];

        // Search both titles and content
        for (const item of searchIndex) {
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

                // Find position of first match
                const firstMatchPos = item.content.indexOf(queryLower);

                results.push({
                    ...item,
                    score,
                    firstMatchPos: firstMatchPos >= 0 ? firstMatchPos : Infinity
                });
            }
        }

        // Sort by relevance then by position of first match
        results.sort((a, b) => b.score - a.score || a.firstMatchPos - b.firstMatchPos);

        // Display results
        if (results.length > 0) {
            resultsContainer.innerHTML = '';

            for (const result of results) {
                const resultElement = document.createElement('div');
                resultElement.className = 'search-result-item';

                // Highlight matching parts in title
                const displayTitle = result.title.replace(
                    new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
                    match => `<span class="highlight">${match}</span>`
                );

                // Show path without filename
                const pathParts = result.path.split('/');
                pathParts.pop();

                resultElement.innerHTML = `
                    <div class="title">${displayTitle}</div>
                    <div class="path">${pathParts.join(' › ')}</div>
                `;

                resultElement.addEventListener('click', () => {
                    document.getElementById('search-input').value = '';
                    resultsContainer.style.display = 'none';

                    loadContent(result.path).then(() => {
                        setTimeout(() => {
                            highlightSearchTerm(query, result.rawContent);
                        }, 100);
                    });

                    if (window.innerWidth <= 768) {
                        document.getElementById('sidebar').classList.remove('open');
                    }
                });

                resultsContainer.appendChild(resultElement);
            }
        } else {
            resultsContainer.innerHTML = '<div class="search-result-item">No results found</div>';
        }
    } catch (error) {
        console.error('Search error:', error);
        resultsContainer.innerHTML = '<div class="search-result-item">Search failed</div>';
    }
}

function highlightSearchTerm(query, rawContent) {
    const contentElement = document.getElementById('content-display');
    if (!contentElement) return;

    // Clear previous highlights
    const oldHighlights = contentElement.querySelectorAll('.search-highlight');
    oldHighlights.forEach(el => {
        const parent = el.parentNode;
        if (parent) {
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        }
    });

    const queryLower = query.toLowerCase();
    const walker = document.createTreeWalker(
        contentElement,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    let firstHighlight = null;

    while (node = walker.nextNode()) {
        const nodeValue = node.nodeValue.toLowerCase();
        let matchPos = nodeValue.indexOf(queryLower);

        if (matchPos >= 0) {
            const range = document.createRange();
            range.setStart(node, matchPos);
            range.setEnd(node, matchPos + query.length);

            const span = document.createElement('span');
            span.className = 'search-highlight';
            range.surroundContents(span);

            if (!firstHighlight) {
                firstHighlight = span;
            }
        }
    }

    // Scroll to first highlight
    if (firstHighlight) {
        firstHighlight.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Add temporary animation
        firstHighlight.style.animation = 'pulse-highlight 1.5s';
        setTimeout(() => {
            firstHighlight.style.animation = '';
        }, 1500);
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