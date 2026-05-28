document.addEventListener('DOMContentLoaded', () => {
    // --- JACK IN SEQUENCE ---
    const jackInBtn = document.getElementById('jack-in-btn');
    const jackInScreen = document.getElementById('jack-in-screen');
    const cyberWorld = document.getElementById('cyber-world');
    const jackInFlash = document.querySelector('.jack-in-flash');
    const jackInTunnel = document.querySelector('.jack-in-tunnel');

    jackInBtn.addEventListener('click', () => {
        // Change text to show execution
        jackInBtn.textContent = 'EXECUTING...';
        jackInBtn.style.pointerEvents = 'none';
        
        // Start tunnel expansion
        jackInTunnel.classList.remove('hidden');
        jackInTunnel.classList.add('anim-tunnel');

        // Flash screen white after short delay
        setTimeout(() => {
            jackInFlash.classList.remove('hidden');
            jackInFlash.classList.add('anim-flash');
            
            // Hide intro screen and show lobby during the flash
            setTimeout(() => {
                jackInScreen.style.display = 'none';
                cyberWorld.classList.remove('hidden');
            }, 200);

        }, 600);
    });

    // --- DATA / PROJECTS ---
    const projects = [
        // Card Games (Phantom Knights)
        { name: "Dark Renaissance Xyz Dragon", category: "card-games", path: "../Dark Renaissance Xyz Dragon/card.html", icon: "🐉", categoryLabel: "Phantom Knights" },
        { name: "Dark Revolution Xyz Dragon", category: "card-games", path: "../Dark Revolution Xyz Dragon/card.html", icon: "🐉", categoryLabel: "Phantom Knights" },
        { name: "Baneful Javelin", category: "card-games", path: "../The Phantom Knights of Baneful Javelin/card.html", icon: "🛡️", categoryLabel: "Phantom Knights" },
        { name: "Broken Helm", category: "card-games", path: "../The Phantom Knights of Broken Helm/card.html", icon: "🪖", categoryLabel: "Phantom Knights" },
        { name: "Dark Star", category: "card-games", path: "../The Phantom Knights of Dark Star/card.html", icon: "⭐", categoryLabel: "Phantom Knights" },
        { name: "Decrepit Scepter", category: "card-games", path: "../The Phantom Knights of Decrepit Scepter/card.html", icon: "🪄", categoryLabel: "Phantom Knights" },
        { name: "Dreadful Hammer", category: "card-games", path: "../The Phantom Knights of Dreadful Hammer/card.html", icon: "🔨", categoryLabel: "Phantom Knights" },
        { name: "Feeble Armor", category: "card-games", path: "../The Phantom Knights of Feeble Armor/card.html", icon: "🛡️", categoryLabel: "Phantom Knights" },
        { name: "Haunting Arrows", category: "card-games", path: "../The Phantom Knights of Haunting Arrows/card.html", icon: "🏹", categoryLabel: "Phantom Knights" },
        { name: "Jagged Gloves", category: "card-games", path: "../The Phantom Knights of Jagged Gloves/card.html", icon: "🧤", categoryLabel: "Phantom Knights" },
        { name: "Vengeful Axe", category: "card-games", path: "../The Phantom Knights of Vengeful Axe/card.html", icon: "🪓", categoryLabel: "Phantom Knights" },
        { name: "Rebellious Soul", category: "card-games", path: "../The Phantom Knights' Rebellious Soul/card.html", icon: "👻", categoryLabel: "Phantom Knights" },
        { name: "Phantom Knights' Burial", category: "card-games", path: "../Phantom Knights' Burial/card.html", icon: "🪦", categoryLabel: "Phantom Knights" },
        { name: "Phantom Knights' Chain", category: "card-games", path: "../Phantom Knights' Chain/card.html", icon: "⛓️", categoryLabel: "Phantom Knights" },
        { name: "Corrupted Cuffs", category: "card-games", path: "../Phantom Knights' Corrupted Cuffs/card.html", icon: "🔗", categoryLabel: "Phantom Knights" },
        { name: "Ghostly Wail", category: "card-games", path: "../Phantom Knights' Ghostly Wail/card.html", icon: "😱", categoryLabel: "Phantom Knights" },
        { name: "Phantom Knights' Revival", category: "card-games", path: "../Phantom Knights' Revival/card.html", icon: "🔥", categoryLabel: "Phantom Knights" },
        { name: "Shattered Staff", category: "card-games", path: "../Phantom Knights' Shattered Staff/card.html", icon: "🥢", categoryLabel: "Phantom Knights" },
        { name: "Sorrowful Shackles", category: "card-games", path: "../Phantom Knights' Sorrowful Shackles/card.html", icon: "⛓️", categoryLabel: "Phantom Knights" },
        { name: "Tainted Necklace", category: "card-games", path: "../Phantom Knights' Tainted Necklace/card.html", icon: "📿", categoryLabel: "Phantom Knights" },
        { name: "Phantom Knights' Tombstone", category: "card-games", path: "../Phantom Knights' Tombstone/card.html", icon: "🪦", categoryLabel: "Phantom Knights" },
        { name: "Raiders' Resistance", category: "card-games", path: "../Raiders' Resistance/card.html", icon: "🛡️", categoryLabel: "Phantom Knights" },
        { name: "Restless Souls", category: "card-games", path: "../Restless Souls of The Rebellion/card.html", icon: "👻", categoryLabel: "Phantom Knights" },
        { name: "The Phantom Knights' Coffin", category: "card-games", path: "../The Phantom Knights' Coffin/card.html", icon: "⚰️", categoryLabel: "Phantom Knights" },
        { name: "The Phantom Knights' Graveyard", category: "card-games", path: "../The Phantom Knights' Graveyard/card.html", icon: "🪦", categoryLabel: "Phantom Knights" },
        { name: "RUM Rebellion", category: "card-games", path: "../The Phantom Knights' Rank-Up Magic Rebellion/card.html", icon: "✨", categoryLabel: "Phantom Knights" },
        { name: "RUM Revenge", category: "card-games", path: "../The Phantom Knights' Rank-Up Magic Revenge/card.html", icon: "✨", categoryLabel: "Phantom Knights" },
        { name: "RUM Revolution", category: "card-games", path: "../The Phantom Knights' Rank-Up Magic Revolution/card.html", icon: "✨", categoryLabel: "Phantom Knights" },
        { name: "Regretful Shield", category: "card-games", path: "../The Phantom Knights' Regretful Shield/card.html", icon: "🛡️", categoryLabel: "Phantom Knights" },
        { name: "Shattered Spear", category: "card-games", path: "../The Phantom Knights' Shattered Spear/card.html", icon: "🔱", categoryLabel: "Phantom Knights" },

        // Miscellaneous
        { name: "Block Breaker", category: "misc", path: "../Block Breaker/index.html", icon: "🧱", categoryLabel: "Miscellaneous" },
        { name: "Dead Cells", category: "misc", path: "../Dead Cells/index.html", icon: "⚔️", categoryLabel: "Miscellaneous" },
        { name: "Smoothie Slicer", category: "misc", path: "../Smoothie Slicer - Remake of Fruit Ninja/index.html", icon: "🍉", categoryLabel: "Miscellaneous" },
        { name: "Tetris", category: "misc", path: "../Tetris/index.html", icon: "🧩", categoryLabel: "Miscellaneous" },

        // Mock Board Games (Placeholders to demonstrate section)
        { name: "Antigravity Chess", category: "board-games", path: "#", icon: "♟️", categoryLabel: "Board Game" },

        // Mock Mobile Games (Placeholders to demonstrate sub-filters)
        { name: "Mobile RPG Adventure", category: "mobile-games", genre: "rpg", brand: "square-enix", path: "#", icon: "📱", categoryLabel: "Mobile RPG" },
        { name: "Puzzle Pop", category: "mobile-games", genre: "puzzle", brand: "king", path: "#", icon: "🧩", categoryLabel: "Mobile Puzzle" },
        { name: "Pocket Racer", category: "mobile-games", genre: "racing", brand: "nintendo", path: "#", icon: "🏎️", categoryLabel: "Mobile Racing" },

        // Mock Console Games (Placeholders to demonstrate sub-filters)
        { name: "Epic Fantasy VII", category: "console-games", genre: "rpg", brand: "playstation", path: "#", icon: "🎮", categoryLabel: "Console RPG" },
        { name: "Super Plumber Bros", category: "console-games", genre: "platformer", brand: "nintendo", path: "#", icon: "🍄", categoryLabel: "Console Platformer" },
        { name: "Halo Strike", category: "console-games", genre: "shooter", brand: "xbox", path: "#", icon: "🔫", categoryLabel: "Console Shooter" }
    ];

    // Filter configuration for genres and brands
    const filterConfig = {
        'mobile-games': {
            genres: ['All', 'RPG', 'Puzzle', 'Racing', 'Action'],
            brands: ['All', 'Square-Enix', 'King', 'Nintendo', 'Apple']
        },
        'console-games': {
            genres: ['All', 'RPG', 'Platformer', 'Shooter', 'Action'],
            brands: ['All', 'PlayStation', 'Nintendo', 'Xbox']
        }
    };

    const grid = document.getElementById('project-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const subFiltersContainer = document.getElementById('sub-filters');

    let currentCategory = 'all';
    let currentGenre = 'All';
    let currentBrand = 'All';

    // Function to render projects based on current filters
    function renderProjects() {
        grid.innerHTML = ''; // Clear grid

        let filteredProjects = currentCategory === 'all' 
            ? projects 
            : projects.filter(p => p.category === currentCategory);

        // Apply sub-filters if applicable
        if (currentCategory === 'mobile-games' || currentCategory === 'console-games') {
            if (currentGenre !== 'All') {
                filteredProjects = filteredProjects.filter(p => p.genre && p.genre.toLowerCase() === currentGenre.toLowerCase());
            }
            if (currentBrand !== 'All') {
                filteredProjects = filteredProjects.filter(p => p.brand && p.brand.toLowerCase() === currentBrand.toLowerCase());
            }
        }

        filteredProjects.forEach((project, index) => {
            const card = document.createElement('a');
            card.href = project.path;
            card.className = 'project-card';
            card.style.animationDelay = `${index * 0.05}s`; 
            
            // New Cyberworld HTML structure for Cards (Mystery Data style)
            card.innerHTML = `
                <div class="card-icon-wrapper">
                    <div class="card-icon">${project.icon}</div>
                </div>
                <h3 class="card-title">${project.name}</h3>
                <span class="card-category">${project.categoryLabel}</span>
            `;
            
            grid.appendChild(card);
        });
    }

    // Function to render sub-filters dynamically
    function renderSubFilters(category) {
        subFiltersContainer.innerHTML = '';
        
        if (!filterConfig[category]) {
            subFiltersContainer.classList.add('hidden');
            return;
        }

        subFiltersContainer.classList.remove('hidden');
        const config = filterConfig[category];

        // Genre filter group
        const genreLabel = document.createElement('span');
        genreLabel.style.color = 'var(--neon-green)';
        genreLabel.style.marginRight = '0.5rem';
        genreLabel.style.alignSelf = 'center';
        genreLabel.textContent = 'DATA TYPE:';
        subFiltersContainer.appendChild(genreLabel);

        config.genres.forEach(genre => {
            const btn = document.createElement('button');
            btn.className = `sub-filter-btn ${currentGenre === genre ? 'active' : ''}`;
            btn.textContent = genre;
            btn.onclick = () => {
                currentGenre = genre;
                renderSubFilters(category);
                renderProjects();
            };
            subFiltersContainer.appendChild(btn);
        });

        // Separator
        const separator = document.createElement('span');
        separator.style.margin = '0 1rem';
        separator.style.borderLeft = '1px solid var(--neon-purple)';
        subFiltersContainer.appendChild(separator);

        // Brand filter group
        const brandLabel = document.createElement('span');
        brandLabel.style.color = 'var(--neon-green)';
        brandLabel.style.marginRight = '0.5rem';
        brandLabel.style.alignSelf = 'center';
        brandLabel.textContent = 'MAKER ID:';
        subFiltersContainer.appendChild(brandLabel);

        config.brands.forEach(brand => {
            const btn = document.createElement('button');
            btn.className = `sub-filter-btn ${currentBrand === brand ? 'active' : ''}`;
            btn.textContent = brand;
            btn.onclick = () => {
                currentBrand = brand;
                renderSubFilters(category);
                renderProjects();
            };
            subFiltersContainer.appendChild(btn);
        });
    }

    // Initial render
    renderProjects();

    // Main Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentCategory = btn.getAttribute('data-filter');
            currentGenre = 'All';
            currentBrand = 'All';

            if (currentCategory === 'mobile-games' || currentCategory === 'console-games') {
                renderSubFilters(currentCategory);
            } else {
                subFiltersContainer.classList.add('hidden');
            }

            renderProjects();
        });
    });
});
