// js/app.js
let fakemons = []; // Variável global vazia

async function initApp() {
    try {
        const response = await fetch('js/fakemons.json');
        const data = await response.json();
        fakemons = data;
        renderFeaturedFakemons();
        renderRecentArtists();
        setupEventListeners();
    } catch (error) {
        console.error('Erro ao carregar os fakemons:', error);
    }
}

console.log('Fakemons carregados com sucesso:', fakemons);

// Sample data for artists
const artists = [
    { name: "Rod", fakemons: 12, avatar: "https://placehold.co/100/A855F7/FFFFFF?text=ROD" },
    { name: "MarineArt", fakemons: 8, avatar: "https://placehold.co/100/4ECDC4/FFFFFF?text=MA" },
    { name: "GeoDesigns", fakemons: 15, avatar: "https://placehold.co/100/FFE66D/000000?text=GD" },
    { name: "SkyIllustrator", fakemons: 6, avatar: "https://placehold.co/100/A5D8FF/000000?text=SI" },
    { name: "PixelDrake", fakemons: 22, avatar: "https://placehold.co/100/FF9F1C/FFFFFF?text=PD" },
    { name: "MythicInk", fakemons: 17, avatar: "https://placehold.co/100/8A2BE2/FFFFFF?text=MI" }
];

// Type colors
const typeColors = {
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    electric: "bg-yellow-500 text-gray-800",
    ice: "bg-cyan-300 text-gray-800",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-600 text-white",
    ground: "bg-yellow-700 text-white",
    flying: "bg-indigo-300 text-gray-800",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-500 text-gray-800",
    rock: "bg-yellow-600 text-white",
    ghost: "bg-indigo-700 text-white",
    dragon: "bg-gradient-to-r from-indigo-600 to-red-600 text-white",
    darkj: "bg-gray-800 text-white",
    steel: "bg-gray-400 text-gray-800",
    fairy: "bg-pink-300 text-gray-800"
};

// Social icons
const socialIcons = {
    twitter: "fab fa-twitter",
    instagram: "fab fa-instagram",
    deviantart: "fab fa-deviantart",
    artstation: "fas fa-palette",
    facebook: "fab fa-facebook",
    youtube: "fab fa-youtube",
    tiktok: "fab fa-tiktok",
    patreon: "fab fa-patreon"
};

// DOM elements
const featuredFakemonsContainer = document.getElementById('featured-fakemons');
const recentArtistsContainer = document.getElementById('recent-artists');
const fakemonModal = document.getElementById('fakemon-modal');
const closeModalBtn = document.getElementById('close-modal');
const addFakemonModal = document.getElementById('add-fakemon-modal');
const closeAddModalBtn = document.getElementById('close-add-modal');
const addFakemonForm = document.getElementById('add-fakemon-form');
const authModal = document.getElementById('auth-modal');
const closeAuthModalBtn = document.getElementById('close-auth-modal');
const authModalTitle = document.getElementById('auth-modal-title');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authButton = document.getElementById('auth-button');

// Initialize the app
// function initApp() {
//     renderFeaturedFakemons();
//     renderRecentArtists();
//     setupEventListeners();
// }

// Render featured fakemons
function renderFeaturedFakemons() {
    featuredFakemonsContainer.innerHTML = '';

    fakemons.forEach(fakemon => {
        const fakemonCard = document.createElement('div');
        fakemonCard.className = 'bg-white darkj:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer';
        fakemonCard.addEventListener('click', () => openFakemonModal(fakemon));

        fakemonCard.innerHTML = `
            <div class="h-48 bg-gray-100 darkj:bg-gray-700 flex items-center justify-center p-4">
                <img src="${fakemon.image}" alt="${fakemon.name}" class="h-full object-contain">
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg text-gray-800 darkj:text-white">${fakemon.name}</h3>
                    <div class="flex space-x-1">
                        ${fakemon.types.map(type => `
                            <span class="text-xs px-2 py-1 rounded-full ${typeColors[type]}">${document.querySelector(`[data-i18n="type_${type}"]`)?.textContent || type}</span>
                        `).join('')}
                    </div>
                </div>
                <p class="text-sm text-gray-600 darkj:text-gray-300 line-clamp-2 mb-3">${fakemon.description}</p>
                <div class="flex items-center">
                    <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                        ${fakemon.artist.name.charAt(0)}
                    </div>
                    <span class="ml-2 text-sm text-gray-700 darkj:text-gray-300">${fakemon.artist.name}</span>
                </div>
            </div>
        `;

        featuredFakemonsContainer.appendChild(fakemonCard);
    });
}

// Render recent artists
function renderRecentArtists() {
    recentArtistsContainer.innerHTML = '';

    artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.className = 'bg-white darkj:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden text-center p-4 cursor-pointer';

        artistCard.innerHTML = `
            <div class="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-purple-500">
                <img src="${artist.avatar}" alt="${artist.name}" class="w-full h-full object-cover">
            </div>
            <h3 class="font-semibold text-gray-800 darkj:text-white">${artist.name}</h3>
            <p class="text-sm text-gray-600 darkj:text-gray-300">${artist.fakemons} <span data-i18n="fakemons">Fakemons</span></p>
        `;

        recentArtistsContainer.appendChild(artistCard);
    });
}

// Open fakemon modal
function openFakemonModal(fakemon) {
    const modal = document.getElementById('fakemon-modal');
    document.getElementById('modal-fakemon-name').textContent = fakemon.name;
    document.getElementById('modal-fakemon-description').textContent = fakemon.description;
    document.getElementById('modal-fakemon-image').src = fakemon.image;
    document.getElementById('modal-fakemon-height').textContent = `${fakemon.height}m`;
    document.getElementById('modal-fakemon-weight').textContent = `${fakemon.weight}kg`;
    document.getElementById('modal-fakemon-artist').textContent = fakemon.artist.name;

    // Set types
    const typesContainer = document.getElementById('modal-fakemon-types');
    typesContainer.innerHTML = '';
    fakemon.types.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.className = `text-xs px-3 py-1 rounded-full ${typeColors[type]}`;
        typeSpan.textContent = document.querySelector(`[data-i18n="type_${type}"]`)?.textContent || type;
        typesContainer.appendChild(typeSpan);
    });

    // Set stats
    document.getElementById('modal-fakemon-hp').textContent = fakemon.stats.hp;
    document.getElementById('modal-fakemon-attack').textContent = fakemon.stats.attack;
    document.getElementById('modal-fakemon-defense').textContent = fakemon.stats.defense;
    document.getElementById('modal-fakemon-speed').textContent = fakemon.stats.speed;

    document.getElementById('modal-fakemon-hp-bar').style.width = `${(fakemon.stats.hp / 255) * 100}%`;
    document.getElementById('modal-fakemon-attack-bar').style.width = `${(fakemon.stats.attack / 255) * 100}%`;
    document.getElementById('modal-fakemon-defense-bar').style.width = `${(fakemon.stats.defense / 255) * 100}%`;
    document.getElementById('modal-fakemon-speed-bar').style.width = `${(fakemon.stats.speed / 255) * 100}%`;

    // Set social links
    const socialContainer = document.getElementById('modal-fakemon-social');
    socialContainer.innerHTML = '';
    fakemon.artist.social.forEach(social => {
        const socialLink = document.createElement('a');
        socialLink.href = social.url;
        socialLink.target = "_blank";
        socialLink.className = "text-gray-600 darkj:text-gray-300 hover:text-purple-600 darkj:hover:text-purple-400";
        socialLink.innerHTML = `<i class="${socialIcons[social.platform] || 'fas fa-link'}"></i>`;
        socialContainer.appendChild(socialLink);
    });

    modal.classList.remove('hidden');
}

// Setup event listeners
function setupEventListeners() {
    // Close fakemon modal
    closeModalBtn.addEventListener('click', () => {
        fakemonModal.classList.add('hidden');
    });

    // Close add fakemon modal
    closeAddModalBtn.addEventListener('click', () => {
        addFakemonModal.classList.add('hidden');
    });

    // Close auth modal
    closeAuthModalBtn.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    // Auth button
    authButton.addEventListener('click', () => {
        authModalTitle.textContent = document.querySelector('[data-i18n="login"]').textContent;
        loginTab.classList.add('border-purple-600', 'darkj:border-purple-400', 'text-purple-600', 'darkj:text-purple-400');
        loginTab.classList.remove('text-gray-500', 'darkj:text-gray-400');
        registerTab.classList.add('text-gray-500', 'darkj:text-gray-400');
        registerTab.classList.remove('border-purple-600', 'darkj:border-purple-400', 'text-purple-600', 'darkj:text-purple-400');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        authModal.classList.remove('hidden');
    });

    // Auth tabs
    loginTab.addEventListener('click', () => {
        authModalTitle.textContent = document.querySelector('[data-i18n="login"]').textContent;
        loginTab.classList.add('border-purple-600', 'darkj:border-purple-400', 'text-purple-600', 'darkj:text-purple-400');
        loginTab.classList.remove('text-gray-500', 'darkj:text-gray-400');
        registerTab.classList.add('text-gray-500', 'darkj:text-gray-400');
        registerTab.classList.remove('border-purple-600', 'darkj:border-purple-400', 'text-purple-600', 'darkj:text-purple-400');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    registerTab.addEventListener('click', () => {
        authModalTitle.textContent = document.querySelector('[data-i18n="register"]').textContent;
        registerTab.classList.add('border-purple-600', 'darkj:border-purple-400', 'text-purple-600', 'darkj:text-purple-400');
        registerTab.classList.remove('text-gray-500', 'darkj:text-gray-400');
        loginTab.classList.add('text-gray-500', 'darkj:text-gray-400');
        loginTab.classList.remove('border-purple-600', 'darkj:border-purple-400', 'text-purple-600', 'darkj:text-purple-400');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Add fakemon form
    addFakemonForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // In a real app, you would upload the image to a server and get a URL
        const fakemonName = document.getElementById('fakemon-name').value;
        const fakemonTypes = Array.from(document.getElementById('fakemon-types').selectedOptions).map(opt => opt.value);
        const fakemonDescription = document.getElementById('fakemon-description').value;
        const fakemonHeight = document.getElementById('fakemon-height').value;
        const fakemonWeight = document.getElementById('fakemon-weight').value;
        const fakemonHp = document.getElementById('fakemon-hp').value;
        const fakemonAttack = document.getElementById('fakemon-attack').value;
        const fakemonDefense = document.getElementById('fakemon-defense').value;
        const fakemonSpeed = document.getElementById('fakemon-speed').value;
        const fakemonImage = document.getElementById('fakemon-image').files[0];

        // Create a preview URL for the image
        const imageUrl = fakemonImage ? URL.createObjectURL(fakemonImage) : 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=No+Image';

        // Create new fakemon object
        const newFakemon = {
            id: fakemons.length + 1,
            name: fakemonName,
            types: fakemonTypes,
            description: fakemonDescription,
            height: parseFloat(fakemonHeight),
            weight: parseFloat(fakemonWeight),
            stats: {
                hp: parseInt(fakemonHp),
                attack: parseInt(fakemonAttack),
                defense: parseInt(fakemonDefense),
                speed: parseInt(fakemonSpeed)
            },
            artist: {
                name: "Current User", // In a real app, this would be the logged in user
                social: []
            },
            image: imageUrl
        };

        // Add to the fakemons array
        fakemons.unshift(newFakemon);

        // Re-render the fakemons
        renderFeaturedFakemons();

        // Close the modal and reset the form
        addFakemonModal.classList.add('hidden');
        addFakemonForm.reset();

        // Show success message
        alert(document.querySelector('[data-i18n="add_success"]')?.textContent || 'Fakemon added successfully!');
    });

    // Add fakemon button (you would add this to your "Add Fakemon" button)
    document.querySelector('[data-i18n="add_fakemon"]').closest('button').addEventListener('click', () => {
        addFakemonModal.classList.remove('hidden');
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);








// Nova função para inicializar filtros
function initFilters() {
    const searchInput = document.getElementById('search-fakemon');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Filtra fakemons pelo nome
    });

    // Filtro por tipo
    document.querySelectorAll('#type-filters button').forEach(button => {
        button.addEventListener('click', () => {
            // Lógica de filtro
        });
    });
}

// Função específica para a página de upload
function setupUploadForm() {
    document.getElementById('add-fakemon-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Lógica de upload (mesma do modal anterior)
        alert('Fakemon cadastrado! Redirecionando...');
        window.location.href = 'index.html'; // Volta para a listagem
    });
}


