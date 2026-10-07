// ============================================
// SOUND EFFECT — WEB AUDIO API
// ============================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const soundBuffers = {};

async function loadSound(name, url) {
    try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        soundBuffers[name] = await audioCtx.decodeAudioData(arrayBuffer);
    } catch (e) {
        console.warn('Sound loading failed:', name, e);
    }
}

function playClick(strong = false) {
    const buffer = soundBuffers[strong ? 'clickStrong' : 'click'];
    if (!buffer) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    source.buffer = buffer;
    gainNode.gain.value = strong ? 0.6 : 0.5;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start(0);
}

window.addEventListener('load', () => {
    loadSound('click', '/sound/click.ogg');
    loadSound('clickStrong', '/sound/click.ogg');
});

// ============================================
// LENIS SMOOTH SCROLL
// ============================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ============================================
// DATA (global, dipakai banyak halaman)
// ============================================
const TIP4SERV_PRODUCTS = {
    bedwars: [
        { id: "1561293", name: "VIP", desc: "", price: "12 USD", badge: "cheapest", features: ["Have access to Vip Cosmetics"] },
        { id: "1561294", name: "Premium", desc: "", price: "18 USD", badge: null, features: ["Have access to Premium and Vip Cosmetics"] },
        { id: "1561297", name: "Legend", desc: "", price: "24 USD", badge: null, features: ["Have access to Premium, Vip, and Legend Cosmetics"] }
    ],
    special: [
        { id: "1543314", name: "Beta Access", desc: "Get a Beta Access to our Private Server with a custom plugins", price: "Rp 86.000", badge: "special", features: ["Have an access to our server with custom plugins", "Testing our plugins", "Request a plugins in the private server with custom plugins"] }
    ]
};

const storeCategories = [
    { id: 'bedwars', name: 'Bedwars', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8"/></svg>' },
    { id: 'special', name: 'Special', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8"/></svg>' }
];

const rules = [
    { title: "No Cheating / Hacking", content: ["Using client hacks, x-rays, or other cheats is strictly prohibited", "Auto-clickers and macros are not allowed", "Exploiting bugs for personal gain will be punished"], punishment: "ban", punishmentText: "Permanent Ban" },
    { title: "Respect All Players", content: ["Bullying, harassment, or hate speech is prohibited", "Racism and discrimination will be dealt with strictly", "Do not be toxic to other players"], punishment: "warn", punishmentText: "Warning / Temp Ban" },
    { title: "No Griefing or Stealing", content: ["Destroying other people's buildings is prohibited", "Stealing items from other people's claims is not allowed", "Report if someone griefs your base"], punishment: "ban", punishmentText: "Temp Ban / Permanent Ban" },
    { title: "No Spam or Advertising", content: ["Spam chat or commands are not allowed", "Advertising other servers is strictly prohibited", "Promoting without permission will be penalized"], punishment: "warn", punishmentText: "Mute / Warning" },
    { title: "No Scamming", content: ["Deceiving other players in trading is prohibited", "Fake drops or giveaways are not allowed", "If a scam is discovered, items will be returned to the victim."], punishment: "ban", punishmentText: "Permanent Ban" },
    { title: "No Inappropriate Content", content: ["Inappropriate skins are prohibited", "Builds with NSFW content will be deleted", "Offensive usernames must be changed."], punishment: "warn", punishmentText: "Warning / Ban" },
    { title: "Listen to Staff", content: ["Follow the instructions of the server staff", "Do not argue excessively with staff", "Report problems through the correct channel"], punishment: "warn", punishmentText: "Warning / Temp Ban" },
    { title: "Fair Play", content: ["No teaming in solo games", "No stat boosting or win trading", "No account sharing untuk leaderboard"], punishment: "warn", punishmentText: "Stats Reset / Ban" }
];

const voteSites = [
    { name: "MinecraftServers", desc: "", url: "https://minecraftservers.org/vote/684785" },
    { name: "Minecraft Tip List", desc: "", url: "https://www.minecraftiplist.com/server/CrackedNetwork-39303" },
    { name: "Minecraft Server List", desc: "", url: "https://minecraft-server-list.com/server/518411/vote/" },
    { name: "Minecraft Mp", desc: "", url: "https://minecraft-mp.com/server/352192/vote/" },
    { name: "Top Minecraft Servers", desc: "", url: "https://topminecraftservers.org/vote/42388" },
    { name: "MCSL", desc: "", url: "https://minecraft-serverlist.com/server/3915" },
    { name: "Minecraft Buzz", desc: "", url: "https://minecraft.buzz/vote/18324" },
    { name: "TopG", desc: "", url: "https://topg.org/minecraft-servers/server-680462" }
];

const gamemodes = [
    { name: "Bedwars", tag: "PvP / Team", desc: "Protect your bed and destroy your enemies' beds! An exciting and thrilling team PvP game.", features: ["Solo/Duo/Trio/Squad", "Ranked Mode", "Custom Maps", "Stats Tracking", "Leaderboards", "Custom sounds with Resources Pack", "Indonesian Language"], icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8"/></svg>' },
    { name: "Who's Lying", tag: "Betrayal", desc: " ", features: ["Vote Players", "Leaderboards", "Voice Chat", "Indonesian & English language"], icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8"/></svg>' }
];

const staffTeam = [
    { name: "NeedFriend", role: "Owner", initial: "O", bio: "Founder of CrackedNetwork. Passionate about creating a fun and fair Minecraft experience for everyone.", joinDate: "2024", specialty: "Server Development & Management", discord: "needfriend", status: "Active", responsibilities: ["Overall server management & direction", "Plugin development & configuration", "Financial management & hosting", "Community growth strategy", "Staff team coordination & recruitment"], tags: ["Developer", "Leader", "Full-Stack", "Config", "Builder"], socials: { youtube: "https://youtube.com/@needfriend2?si=fLuu8Z8mRetJhIrU", instagram: "https://www.instagram.com/bismasyafif/?utm_source=qr&r=nametag" } },
    { name: "HafisGG", role: "Fake Staff", initial: "FS", bio: "This is a fake staff member who only exists on the website for decoration purposes.", joinDate: "2025", specialty: "Being Decorative", discord: "hafisgg", status: "Mostly AFK", responsibilities: ["Exist on the staff list only", "Play 3 times a month maximum", "Let the Owner handle everything alone", "Look important without doing anything"], tags: ["Fake Staff", "Decorative", "AFK", "Title Only"], socials: {} },
    { name: "", role: "Staff", initial: "S", bio: "This position is currently open.", joinDate: "-", specialty: "-", discord: "-", status: "Position Open", responsibilities: ["General staff duties", "Player support & moderation"], tags: ["Open Position"], socials: {} },
    { name: "", role: "Staff", initial: "S", bio: "This position is currently open.", joinDate: "-", specialty: "-", discord: "-", status: "Position Open", responsibilities: ["General staff duties", "Player support & moderation"], tags: ["Open Position"], socials: {} },
    { name: "", role: "Head Mod", initial: "HM", bio: "This position is currently open.", joinDate: "-", specialty: "-", discord: "-", status: "Position Open", responsibilities: ["Lead the moderation team", "Handle ban appeals", "Review staff reports", "Coordinate with Owner on policy changes"], tags: ["Open Position", "Leadership"], socials: {} },
    { name: "", role: "Moderator", initial: "M", bio: "This position is currently open.", joinDate: "-", specialty: "-", discord: "-", status: "Position Open", responsibilities: ["Enforce server rules", "Handle player reports", "Monitor chat & gameplay", "Assist helpers with complex issues"], tags: ["Open Position"], socials: {} },
    { name: "", role: "Helper", initial: "H", bio: "This position is currently open.", joinDate: "-", specialty: "-", discord: "-", status: "Position Open", responsibilities: ["Welcome new players", "Answer common questions", "Report issues to moderators", "Guide players through features"], tags: ["Open Position"], socials: {} }
];

const faqData = [
    { q: "Does the server support Bedrock?", a: "Sorry, our server does not support the Bedrock edition right now." },
    { q: "How do I get a rank?", a: "You can purchase ranks in our Store or earn them through events and giveaways on Discord." },
    { q: "What game versions are supported?", a: "The server supports Minecraft Java Edition versions 1.8 to the latest release, but we recommend you to use 1.21+" },
    { q: "What hosting service is being used?", a: "We use a hosting service trusted by over 20,000 people and known for its high performance. ( https://free.freezehost.com )" },
    { q: "What software is used for the server?", a: "Proxy = Velocity, <br>Lobby & Minigame = PaperMC" }
];

// ============================================
// PARTICLES (jalan di semua halaman)
// ============================================
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    function createParticles() {
        particles = [];
        const count = Math.min(80, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < count; i++) {
            particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, radius: Math.max(1, Math.random() * 2), opacity: Math.random() * 0.5 + 0.2 });
        }
    }
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 160, ${p.opacity})`; ctx.fill();
            particles.slice(i + 1).forEach(p2 => {
                const dx = p.x - p2.x, dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 229, 160, ${0.1 * (1 - dist / 120)})`; ctx.stroke();
                }
            });
        });
        requestAnimationFrame(drawParticles);
    }
    if (!prefersReducedMotion) {
        resizeCanvas(); createParticles(); drawParticles();
        window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
    }
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');
const navEl = document.querySelector('.nav');

if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navLinksContainer.classList.toggle('open');
    });
}

window.addEventListener('scroll', () => {
    if (navEl) navEl.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================
// ANCHOR SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); lenis.scrollTo(target); }
    });
});

// ============================================
// ESCAPE KEY HANDLER
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('checkoutModal');
        if (modal) modal.classList.remove('active');
        if (window.closeServerModal) window.closeServerModal();
        if (navLinksContainer) navLinksContainer.classList.remove('open');
        if (mobileToggle) mobileToggle.classList.remove('open');
    }
});

// ============================================
// SCROLL REVEAL
// ============================================
function observeElements() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), index * 100);
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

// ============================================
// CHECKOUT MODAL (shared)
// ============================================
(function() {
    const modal = document.getElementById('checkoutModal');
    const checkoutFrame = document.getElementById('checkoutFrame');
    const iframeLoader = document.getElementById('iframeLoader');
    const closeModalBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const btnViewBasket = document.getElementById('btnViewBasket');

    if (!modal) return;

    window.openCheckout = function(productId) {
        if (!productId) return;
        modalTitle.textContent = "Purchase Item";
        modal.classList.add('active');
        checkoutFrame.src = "about:blank";
        iframeLoader.style.display = "flex";
        checkoutFrame.src = `https://crackedshop.craftingstore.net/package/${productId}`;
    };

    function openBasket() {
        modalTitle.textContent = "Shopping Basket / Checkout";
        modal.classList.add('active');
        checkoutFrame.src = "about:blank";
        iframeLoader.style.display = "flex";
        checkoutFrame.src = `https://crackedshop.craftingstore.net/checkout/basket`;
    }

    if (btnViewBasket) btnViewBasket.addEventListener('click', openBasket);

    if (checkoutFrame) checkoutFrame.addEventListener('load', () => {
        if (checkoutFrame.src !== "about:blank") iframeLoader.style.display = "none";
    });

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => { checkoutFrame.src = "about:blank"; }, 300);
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
})();

// ============================================
// PAGE-SPECIFIC INITIALIZERS
// ============================================

// --- Home ---
function initHomePage() {
    const playerCountEl = document.getElementById('playerCount');
    const statusIndicator = document.getElementById('statusIndicator');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const statusCard = document.getElementById('serverStatusCard');

    async function fetchServerStatus() {
        if (!playerCountEl) return;
        try {
            const response = await fetch('https://api.mcsrvstat.us/3/crackednetwork.run.place');
            const data = await response.json();
            if (data.online) {
                playerCountEl.textContent = data.players ? data.players.online : 0;
                statusCard.classList.remove('offline');
                statusIndicator.classList.remove('offline');
                statusDot.classList.remove('offline');
                statusText.textContent = 'Server Online';
            } else {
                playerCountEl.textContent = "0";
                statusCard.classList.add('offline');
                statusIndicator.classList.add('offline');
                statusDot.classList.add('offline');
                statusText.textContent = 'Server Offline';
            }
        } catch (error) {
            playerCountEl.textContent = "Error";
            statusIndicator.classList.add('offline');
            statusDot.classList.add('offline');
            statusText.textContent = 'API Error';
        }
    }
    fetchServerStatus();
    if (window._statusInterval) clearInterval(window._statusInterval);
    window._statusInterval = setInterval(fetchServerStatus, 60000);
}

// --- Gamemodes ---
function initGamemodesPage() {
    const grid = document.getElementById('gamemodeGrid');
    if (!grid) return;
    grid.innerHTML = '';
    gamemodes.forEach(gm => {
        const card = document.createElement('div');
        card.className = 'gamemode-card';
        card.innerHTML = `
            <div class="gamemode-image"><div class="gamemode-icon">${gm.icon}</div></div>
            <div class="gamemode-content">
                <span class="gamemode-tag">${gm.tag}</span>
                <h3 class="gamemode-title">${gm.name}</h3>
                <p class="gamemode-desc">${gm.desc}</p>
                <div class="gamemode-features">${gm.features.map(f => `<span class="gm-feature">${f}</span>`).join('')}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- Wiki ---
function initWikiPage() {
    // Staff grid
    const staffGrid = document.getElementById('staffGrid');
    if (staffGrid) {
        staffGrid.innerHTML = '';
        staffTeam.forEach((staff, index) => {
            const card = document.createElement('div');
            card.className = 'staff-card';
            card.innerHTML = `
                <div class="staff-avatar">${staff.initial}</div>
                <div class="staff-name">${staff.name || 'Position Open'}</div>
                <div class="staff-role">${staff.role}</div>
                <button class="btn-more-info" data-staff-index="${index}">More Info
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
            `;
            staffGrid.appendChild(card);
        });
        staffGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-more-info');
            if (!btn) return;
            const staffIndex = parseInt(btn.dataset.staffIndex);
            sessionStorage.setItem('staffIndex', staffIndex);
            window.pjaxNavigate('/staff-detail');
        });
    }

    // FAQ
    const faqContainer = document.getElementById('faqContainer');
    if (faqContainer) {
        faqContainer.innerHTML = '';
        faqData.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <div class="faq-question">${item.q}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="faq-answer"><p>${item.a}</p></div>
            `;
            faqItem.querySelector('.faq-question').addEventListener('click', () => {
                faqContainer.querySelectorAll('.faq-item.open').forEach(x => { if (x !== faqItem) x.classList.remove('open'); });
                faqItem.classList.toggle('open');
            });
            faqContainer.appendChild(faqItem);
        });
    }

    // Wiki tabs
    const wikiTabs = document.querySelectorAll('.wiki-tab');
    const wikiSections = document.querySelectorAll('.wiki-section');
    wikiTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            wikiTabs.forEach(t => t.classList.remove('active'));
            wikiSections.forEach(s => s.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.tab);
            if (target) target.classList.add('active');
        });
    });
}

// --- Rules ---
function initRulesPage() {
    const rulesGrid = document.getElementById('rulesGrid');
    if (!rulesGrid) return;
    rulesGrid.innerHTML = '';
    rules.forEach((rule, index) => {
        const card = document.createElement('div');
        card.className = 'rule-card';
        card.innerHTML = `
            <div class="rule-header" tabindex="0" role="button" aria-expanded="false">
                <div class="rule-number">${index + 1}</div>
                <div class="rule-title">${rule.title}</div>
                <div class="rule-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div>
            </div>
            <div class="rule-content">
                <div class="rule-body">
                    <ul>${rule.content.map(item => `<li>${item}</li>`).join('')}</ul>
                    <span class="punishment-tag ${rule.punishment}">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            ${rule.punishment === 'ban' ? '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>' : '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'}
                        </svg>
                        ${rule.punishmentText}
                    </span>
                </div>
            </div>
        `;
        const header = card.querySelector('.rule-header');
        header.addEventListener('click', () => {
            rulesGrid.querySelectorAll('.rule-card.open').forEach(x => { if (x !== card) x.classList.remove('open'); });
            card.classList.toggle('open');
            header.setAttribute('aria-expanded', card.classList.contains('open'));
        });
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
        });
        rulesGrid.appendChild(card);
    });
}

// --- Vote ---
function initVotePage() {
    const grid = document.getElementById('voteSites');
    if (!grid) return;
    grid.innerHTML = '';
    voteSites.forEach(site => {
        const card = document.createElement('div');
        card.className = 'vote-card';
        card.innerHTML = `
            <div class="vote-site-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg></div>
            <h3 class="vote-site-name">${site.name}</h3>
            <p class="vote-site-desc">${site.desc}</p>
            <a href="${site.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary vote-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Vote Now
            </a>
        `;
        grid.appendChild(card);
    });
}

// --- Store ---
function initStorePage() {
    const storeCategoriesEl = document.getElementById('storeCategories');
    const productsGrid = document.getElementById('productsGrid');
    if (!storeCategoriesEl || !productsGrid) return;

    let activeCategory = 'bedwars';

    function getProductIcon(category) {
        const icons = {
            bedwars: '<svg viewBox="0 0 24 24" fill="none"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8" stroke-width="1.5"/></svg>'
        };
        return icons[category] || icons.bedwars;
    }

    function renderProducts(category) {
        productsGrid.innerHTML = '';
        const products = TIP4SERV_PRODUCTS[category] || [];
        if (products.length === 0) {
            productsGrid.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--muted); grid-column: 1/-1;">Product is not available for this category.</div>`;
            return;
        }
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            let badgeHTML = '';
            if (product.badge) {
                const badgeText = product.badge === 'legendary' ? 'Legendary' : product.badge === 'popular' ? 'Popular' : product.badge === 'cheapest' ? 'Cheapest' : product.badge === 'special' ? 'Special' : product.badge === 'new' ? 'New' : 'Best Value';
                badgeHTML = `<span class="product-badge ${product.badge}">${badgeText}</span>`;
            }
            card.innerHTML = `
                ${badgeHTML}
                <div class="product-image"><div class="product-icon">${getProductIcon(category)}</div></div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="product-features">
                        ${product.features.map(f => `<div class="product-feature"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${f}</div>`).join('')}
                    </div>
                    <div class="product-footer">
                        <div class="product-price">${product.price}</div>
                        <button class="btn-buy" data-id="${product.id}">Buy Now</button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });
        document.querySelectorAll('.btn-buy').forEach(btn => {
            btn.addEventListener('click', () => window.openCheckout(btn.dataset.id));
        });
    }

    storeCategoriesEl.innerHTML = '';
    storeCategories.forEach(cat => {
        const tab = document.createElement('button');
        tab.className = `category-tab ${cat.id === activeCategory ? 'active' : ''}`;
        tab.innerHTML = `${cat.icon}<span>${cat.name}</span>`;
        tab.addEventListener('click', () => {
            activeCategory = cat.id;
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProducts(cat.id);
        });
        storeCategoriesEl.appendChild(tab);
    });

    renderProducts(activeCategory);
}

// --- Plugins ---
function initPluginsPage() {
    const pluginCategoryTabs = document.getElementById('pluginCategoryTabs');
    const pluginListContainer = document.getElementById('pluginListContainer');
    const fmCurrentPath = document.getElementById('fmCurrentPath');
    if (!pluginCategoryTabs || !pluginListContainer) return;

    const DEFAULT_DATA = {
        categories: [{ id: "lobby", name: "Lobby" }, { id: "bedwars", name: "Bedwars" }],
        plugins: {
            lobby: [{ name: "WorldEdit", version: "7.2.15", author: "EngineHub", description: "Map editing tool." }, { name: "EssentialsX", version: "2.20.1", author: "Essentials Team", description: "Commands." }],
            bedwars: [{ name: "BedWars1058", version: "22.2", author: "andrei1058", description: "Bedwars plugin." }]
        }
    };

    function renderPluginList(plugins) {
        pluginListContainer.innerHTML = '';
        if (!plugins || plugins.length === 0) return;
        plugins.forEach(p => {
            const item = document.createElement('div');
            item.className = 'fm-item';
            item.innerHTML = `
                <div class="fm-name"><div class="fm-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div>${p.name || 'Unknown'}</div>
                <div class="fm-version">${p.version || '-'}</div>
                <div class="fm-author">${p.author || '-'}</div>
                <div class="fm-desc">${p.description || '-'}</div>
            `;
            pluginListContainer.appendChild(item);
        });
    }

    async function loadPluginCategory(id, name, btnElement = null) {
        document.querySelectorAll('.fm-tab').forEach(t => t.classList.remove('active'));
        if (btnElement) btnElement.classList.add('active');
        fmCurrentPath.textContent = `/${id}/plugins`;
        pluginListContainer.innerHTML = '<div class="fm-item" style="color:var(--accent);">Loading plugins...</div>';
        let plugins = [];
        try {
            const response = await fetch(`/${id}.json`);
            plugins = await response.json();
        } catch (err) {
            plugins = DEFAULT_DATA.plugins[id] || [];
        }
        if (plugins.length === 0) plugins = [{ name: "Data Tidak Ditemukan", version: "-", author: "System", description: "-" }];
        renderPluginList(plugins);
    }

    function renderPluginTabs(manifest) {
        pluginCategoryTabs.innerHTML = '';
        manifest.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'fm-tab';
            btn.dataset.id = cat.id;
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg> ${cat.name}`;
            btn.onclick = function() { loadPluginCategory(cat.id, cat.name, this); };
            pluginCategoryTabs.appendChild(btn);
        });
    }

    (async () => {
        pluginCategoryTabs.innerHTML = 'Memuat...';
        let manifest = [];
        try {
            const response = await fetch('/plugin_categories.json');
            manifest = await response.json();
        } catch (err) {
            manifest = DEFAULT_DATA.categories;
        }
        renderPluginTabs(manifest);
        if (manifest.length > 0) loadPluginCategory(manifest[0].id, manifest[0].name);
    })();
}

// --- Staff Detail ---
function initStaffDetailPage() {
    const container = document.getElementById('staffDetailContent');
    if (!container) return;
    const staffIndex = parseInt(sessionStorage.getItem('staffIndex') || '0');
    const staff = staffTeam[staffIndex];
    if (!staff) {
        container.innerHTML = `<div class="staff-detail-empty"><h3>Staff Not Found</h3></div>`;
        return;
    }
    const displayName = staff.name || 'Position Open';
    const isOpen = !staff.name;
    const roleBadgeClass = staff.role.toLowerCase().replace(/\s+/g, '-');

    const avatarGradients = {
        owner: 'linear-gradient(135deg, #ffd700, #ffaa00)',
        'head-mod': 'linear-gradient(135deg, #ff6b9d, #ff3366)',
        moderator: 'linear-gradient(135deg, #00b4d8, #0077b6)',
        helper: 'linear-gradient(135deg, #00e5a0, #00b4d8)',
        staff: 'linear-gradient(135deg, #6b6b7b, #4a4a5a)'
    };
    const avatarBg = avatarGradients[roleBadgeClass] || avatarGradients.staff;

    let socialsHTML = '';
    if (staff.socials) {
        if (staff.socials.youtube) socialsHTML += `<a href="${staff.socials.youtube}" target="_blank" rel="noopener" class="sd-social-btn">YouTube</a>`;
        if (staff.socials.instagram) socialsHTML += `<a href="${staff.socials.instagram}" target="_blank" rel="noopener" class="sd-social-btn">Instagram</a>`;
    }
    if (isOpen) socialsHTML = `<span style="color: var(--muted); font-size: 0.9rem;">Social links will be added when this position is filled.</span>`;

    container.innerHTML = `
        <button class="staff-detail-back" id="staffBackBtn" aria-label="Back to Staff Team">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Staff Team
        </button>
        ${isOpen ? `
            <div class="staff-detail-empty">
                <h3>${staff.role} — Position Open</h3>
                <p>We're looking for someone to fill this role. If you're interested, apply on our Discord server!</p>
                <div style="margin-top: 1.5rem;"><a href="/discord" class="btn btn-primary">Join Discord to Apply</a></div>
            </div>
        ` : `
            <div class="staff-detail-hero">
                <div class="staff-detail-hero-top"></div>
                <div class="staff-detail-hero-body">
                    <div class="staff-detail-avatar" style="background: ${avatarBg};">${staff.initial}</div>
                    <div class="staff-detail-identity">
                        <h1 class="staff-detail-name">${displayName}</h1>
                        <span class="staff-detail-role-badge ${roleBadgeClass}">${staff.role}</span>
                    </div>
                </div>
            </div>
            <div class="staff-detail-bio"><h3>About</h3><p>${staff.bio}</p></div>
            <div class="staff-detail-info-grid">
                <div class="sd-info-card"><div class="sd-info-label">Joined Since</div><div class="sd-info-value">${staff.joinDate}</div></div>
                <div class="sd-info-card"><div class="sd-info-label">Specialty</div><div class="sd-info-value">${staff.specialty}</div></div>
                <div class="sd-info-card"><div class="sd-info-label">Discord</div><div class="sd-info-value accent">${staff.discord}</div></div>
                <div class="sd-info-card"><div class="sd-info-label">Status</div><div class="sd-info-value">${staff.status}</div></div>
            </div>
            <div class="staff-detail-section"><h3>Responsibilities</h3>
                <ul class="sd-resp-list">${staff.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
            </div>
            <div class="staff-detail-section"><h3>Skills & Tags</h3>
                <div class="sd-tags">${staff.tags.map(t => `<span class="sd-tag">${t}</span>`).join('')}</div>
            </div>
            <div class="staff-detail-section"><h3>Social Links</h3>
                <div class="staff-detail-socials">${socialsHTML}</div>
            </div>
        `}
    `;

    const backBtn = document.getElementById('staffBackBtn');
    if (backBtn) backBtn.addEventListener('click', () => window.pjaxNavigate('/wiki'));
}

// --- AI page ---
function initAIPage() {
    const container = document.getElementById('cn-ai-embed');
    if (!container) return;

    // Kalau function udah ada (script udah ke-load), langsung panggil
    if (typeof window.initCnAiEmbed === 'function') {
        window.initCnAiEmbed();
        return;
    }

    // Kalau belum, load script dinamis
    if (window.__aiEmbedLoading) return; // cegah double load
    window.__aiEmbedLoading = true;

    const script = document.createElement('script');
    script.src = '/JS/embed_ai.js';
    script.onload = () => {
        window.__aiEmbedLoading = false;
        if (typeof window.initCnAiEmbed === 'function') {
            window.initCnAiEmbed();
        }
    };
    script.onerror = () => {
        window.__aiEmbedLoading = false;
        console.error('[AI] Gagal load embed_ai.js');
    };
    document.body.appendChild(script);
}

// ============================================
// REINIT DISPATCHER (dipanggil router.js)
// ============================================
window.reinitPage = function() {
    const path = window.location.pathname.replace(/\/$/, '') || '/home';

    if (path === '/home' || path === '/' || path === '/index.html') initHomePage();
    else if (path === '/gamemodes') initGamemodesPage();
    else if (path === '/wiki') initWikiPage();
    else if (path === '/rules') initRulesPage();
    else if (path === '/vote') initVotePage();
    else if (path === '/store') initStorePage();
    else if (path === '/ai') initAIPage();
    else if (path === '/plugins') initPluginsPage();
    else if (path === '/staff-detail') initStaffDetailPage();
    else if (path === '/launcher') initLauncherPage();

    // Selalu jalanin scroll reveal di halaman baru
    observeElements();

    // Reset Lenis
    if (typeof lenis !== 'undefined' && lenis) {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true });
    }
};

// ============================================
// INIT SAAT PERTAMA KALI LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.reinitPage();
});

function initHomePage() {
    const playerCountEl = document.getElementById('playerCount');
    const statusIndicator = document.getElementById('statusIndicator');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const statusCard = document.getElementById('serverStatusCard');

    async function fetchServerStatus() {
        if (!playerCountEl) return;
        try {
            const response = await fetch('https://api.mcsrvstat.us/3/crackednetwork.run.place');
            const data = await response.json();
            const playerCount = (data.online && data.players) ? data.players.online : 0;

            // Toggle abandoned state
            if (data.online && playerCount === 0) {
                document.body.classList.add('abandoned');
                statusText.textContent = 'Server Sepi';
            } else {
                document.body.classList.remove('abandoned');
                statusText.textContent = 'Server Online';
            }

            if (data.online) {
                playerCountEl.textContent = playerCount;
                statusCard.classList.remove('offline');
                statusIndicator.classList.remove('offline');
                statusDot.classList.remove('offline');
            } else {
                playerCountEl.textContent = "0";
                statusCard.classList.add('offline');
                statusIndicator.classList.add('offline');
                statusDot.classList.add('offline');
                statusText.textContent = 'Server Offline';
            }
        } catch (error) {
            playerCountEl.textContent = "Error";
            statusIndicator.classList.add('offline');
            statusDot.classList.add('offline');
            statusText.textContent = 'API Error';
        }
    }
    fetchServerStatus();
    if (window._statusInterval) clearInterval(window._statusInterval);
    window._statusInterval = setInterval(fetchServerStatus, 60000);
}