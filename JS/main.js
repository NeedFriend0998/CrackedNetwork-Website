// ============================================
// SMOOTH SCROLL DENGAN EFEK MOMENTUM (LENIS)
// ============================================
const lenis = new Lenis({
    duration: 1.2,              // Durasi animasi scroll
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing eksponensial
    smoothWheel: true,          // Smooth scroll untuk mouse wheel
    smoothTouch: false,         // Biarkan false agar mobile tetap native
    touchMultiplier: 2,         // Kecepatan scroll di touch device
});

// Animation loop untuk Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Optional: Update otomatis saat ada perubahan halaman (navigasi SPA)
window.addEventListener('pageChanged', () => {
    lenis.resize(); // Recalculate ukuran halaman
});

// Optional: Scroll ke anchor link dengan smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            lenis.scrollTo(target);
        }
    });
});

// ========== CONFIGURATION ==========
        const TIP4SERV_PRODUCTS = {
           
            /*survival: [
                {
                    id: "1492986", 
                    name: "VIP",
                    desc: "",
                    price: "5 USD",
                    badge: "cheapest",
                    features: [
                      " "
                      ]
                },
                {
                    id: "1492989", 
                    name: "Elite",
                    desc: "",
                    price: "12 USD",
                    badge: "popular",
                    features: [
                      " "
                      ]
                },
                {
                    id: "1517985",
                    name: "Premium",
                    desc: "",
                    price: "20 USD",
                    badge: null,
                    features: [
                      " "
                      ]
                },
                {
                    id: "1518006",
                    name: "Ultimate",
                    desc: "",
                    price: "24 USD",
                    badge: null,
                    features: [
                      " "
                      ]
                }
                
            ],*/
            bedwars: [
                {
                    id: "1561293", 
                    name: "VIP",
                    desc: "",
                    price: "12 USD",
                    badge: "cheapest",
                    features: [
                      "Have access to Vip Cosmetics"
                      ]
                },
                {
                    id: "1561294",
                    name: "Premium",
                    desc: "",
                    price: "18 USD",
                    badge: null,
                    features: [
                      "Have access to Premium and Vip Cosmetics"
                      ]
                },
                {
                    id: "1561297",
                    name: "Legend",
                    desc: "",
                    price: "24 USD",
                    badge: null,
                    features: [
                      "Have access to Premium, Vip, and Legend Cosmetics"
                      ]
                }
                
            ],
          special: [
            {
              id: "1543314",
              name: "Beta Access",
              desc: "Get a Beta Access to our Private Server with a custom plugins",
              price: "Rp 86.000",
              badge: "special",
              features: [
                "Have an access to our server with custom plugins",
                "Testing our plugins",
                "Request a plugins in the private server with custom plugins"
                ]
            }
            ]
        };

        const storeCategories = [
             /*{ id: 'survival', name: 'Survival', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8"/></svg>' },*/
             { id: 'bedwars', name: 'Bedwars', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8"/></svg>' },
            { id: 'special', name: 'Special', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8"/></svg>' }
        ];

        // ========== DATA ==========
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
            { name: "Survival", tag: "PvE / Economy", desc: "Classic survival mode with economy, land claim, and active community features. Build bases, farm, and trade with other players.", features: ["Land Claim", "Economy", "Custom Enchants", "Player Shops", "Jobs"], icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
            { name: "SkyBlock ", tag: "Island / Grinding", desc: "Start with a small island in the sky. Develop your island, create an automated farm, and become the strongest in the sky!", features: ["Custom Islands", "Minions", "Quests", "Bazaar", "Minions"], icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
            { name: "Bedwars", tag: "PvP / Team", desc: "Protect your bed and destroy your enemies' beds! An exciting and thrilling team PvP game.", features: ["Solo/Duo/Trio/Squad", "Ranked Mode", "Custom Maps", "Stats Tracking", "Leaderboards"], icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8"/></svg>' },
            { name: "Practice ( Coming Soon)", tag: "PvP / Duel", desc: "Hone your PvP skills against other players in various duel modes. From No Debuff to Build UHC.", features: ["Build UHC", "No Debuff", "Gapple", "Combo", "Sumo"], icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
            { name: "Hide And Seek ", tag: "Mini Game", desc: "Hide as a block or search for the hiders! A fun casual game to relax with friends.", features: ["Block Disguise", "Props", "Multiple Maps", "Taunts", "Effects"], icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' }
        ];

        // ========== STAFF DATA (ENHANCED) ==========
        const staffTeam = [
            {
                name: "NeedFriend",
                role: "Owner",
                initial: "O",
                bio: "Founder of CrackedNetwork. Passionate about creating a fun and fair Minecraft experience for everyone. Handles server management, development, and community building. Started this project with a vision to build a server where both cracked and premium players can play together seamlessly.",
                joinDate: "2024",
                specialty: "Server Development & Management",
                discord: "needfriend",
                status: "Active",
                responsibilities: [
                    "Overall server management & direction",
                    "Plugin development & configuration",
                    "Financial management & hosting",
                    "Community growth strategy",
                    "Staff team coordination & recruitment"
                ],
                tags: ["Developer", "Leader", "Full-Stack", "Config", "Builder"],
                socials: {
                    youtube: "https://youtube.com/@needfriend2?si=fLuu8Z8mRetJhIrU",
                    instagram: "https://www.instagram.com/bismasyafif/?utm_source=qr&r=nametag"
                }
            },
            {
              name: "HafisGG",
              role: "Fake Staff",
              initial: "FS",
              bio: "This is a fake staff member who only exists on the website for decoration purposes. Rarely plays on the server (approximately 3 times a month). Does not actually help players or moderate. If you need real help, please contact the Owner directly.",
              joinDate: "2025",
              specialty: "Being Decorative",
              discord: "hafisgg",
              status: "Mostly AFK",
              responsibilities: [
                "Exist on the staff list only",
                "Play 3 times a month maximum",
                "Let the Owner handle everything alone",
                "Look important without doing anything"
                ],
                tags: ["Fake Staff", "Decorative", "AFK", "Title Only"],
                socials: {}
              
            },
            {
                name: "",
                role: "Staff",
                initial: "S",
                bio: "This position is currently open. We are looking for dedicated and responsible individuals to join our team.",
                joinDate: "-",
                specialty: "-",
                discord: "-",
                status: "Position Open",
                responsibilities: [
                    "General staff duties",
                    "Player support & moderation"
                ],
                tags: ["Open Position"],
                socials: {}
            },
            {
                name: "",
                role: "Staff",
                initial: "S",
                bio: "This position is currently open. We are looking for dedicated and responsible individuals to join our team.",
                joinDate: "-",
                specialty: "-",
                discord: "-",
                status: "Position Open",
                responsibilities: [
                    "General staff duties",
                    "Player support & moderation"
                ],
                tags: ["Open Position"],
                socials: {}
            },
            {
                name: "",
                role: "Head Mod",
                initial: "HM",
                bio: "This position is currently open. The Head Moderator is responsible for leading the moderation team and ensuring all rules are enforced consistently.",
                joinDate: "-",
                specialty: "-",
                discord: "-",
                status: "Position Open",
                responsibilities: [
                    "Lead the moderation team",
                    "Handle ban appeals",
                    "Review staff reports",
                    "Coordinate with Owner on policy changes"
                ],
                tags: ["Open Position", "Leadership"],
                socials: {}
            },
            {
                name: "",
                role: "Moderator",
                initial: "M",
                bio: "This position is currently open. Moderators help keep the server safe and enjoyable by enforcing rules and helping players.",
                joinDate: "-",
                specialty: "-",
                discord: "-",
                status: "Position Open",
                responsibilities: [
                    "Enforce server rules",
                    "Handle player reports",
                    "Monitor chat & gameplay",
                    "Assist helpers with complex issues"
                ],
                tags: ["Open Position"],
                socials: {}
            },
            {
                name: "",
                role: "Helper",
                initial: "H",
                bio: "This position is currently open. Helpers are the first point of contact for players who need assistance on the server.",
                joinDate: "-",
                specialty: "-",
                discord: "-",
                status: "Position Open",
                responsibilities: [
                    "Welcome new players",
                    "Answer common questions",
                    "Report issues to moderators",
                    "Guide players through features"
                ],
                tags: ["Open Position"],
                socials: {}
            }
        ];

        const faqData = [
            { q: "Does the server support Bedrock?", a: "Sorry, our server does not support the Bedrock edition right now." },
            { q: "How do I get a rank?", a: "You can purchase ranks in our Store or earn them through events and giveaways on Discord." },
            { q: "What game versions are supported?", a: "The server supports Minecraft Java Edition versions 1.8 to the latest release, but we recommend you to use 1.21+" },
            { q: "What hosting service is being used?", a: "We use a hosting service trusted by over 20,000 people and known for its high performance. ( https://free.freezehost.com )" },
            { q: "What software is used for the server?", a: "Proxy = Velocity, <br>Lobby & Minigame = PaperMC" }
        ];

        // ========== PARTICLES ==========
        const canvas = document.getElementById('particles');
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
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.max(1, Math.random() * 2),
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 160, ${p.opacity})`;
                ctx.fill();
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 229, 160, ${0.1 * (1 - dist / 120)})`;
                        ctx.stroke();
                    }
                });
            });
            requestAnimationFrame(drawParticles);
        }

        if (!prefersReducedMotion) {
            resizeCanvas();
            createParticles();
            drawParticles();
            window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
        }

        // ========== NAVIGATION ==========
        const navLinks = document.querySelectorAll('.nav-link, [data-page]');
        const pages = document.querySelectorAll('.page');
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinksContainer = document.getElementById('navLinks');
        const nav = document.querySelector('.nav');

        function showPage(pageId, extraState) {
            pageId = pageId.replace(/\/$/, '');
            const targetPage = document.getElementById(pageId);
            if (!targetPage) {
                console.warn('Page not found:', pageId, 'Redirecting to home');
                showPage('home');
                return;
            }

            pages.forEach(page => page.classList.remove('active'));
            targetPage.classList.add('active');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });

            navLinksContainer.classList.remove('open');
            mobileToggle.classList.remove('open');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (pageId === 'plugins') {
                initPluginManager();
            }

            setTimeout(observeElements, 100);
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                const url = link.getAttribute('href');
                window.history.pushState({ page: pageId }, "", url);
                showPage(pageId);
            });
        });

        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                // Jika kembali ke staff-detail, render ulang
                if (e.state.page === 'staff-detail' && e.state.staffIndex !== undefined) {
                    showPage('staff-detail');
                    renderStaffDetail(e.state.staffIndex);
                } else if (e.state.page === 'wiki' && e.state.tab) {
                    showPage('wiki');
                    // Aktifkan tab yang benar
                    document.querySelectorAll('.wiki-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.wiki-section').forEach(s => s.classList.remove('active'));
                    const targetTab = document.querySelector(`.wiki-tab[data-tab="${e.state.tab}"]`);
                    const targetSection = document.getElementById(e.state.tab);
                    if (targetTab) targetTab.classList.add('active');
                    if (targetSection) targetSection.classList.add('active');
                } else {
                    showPage(e.state.page);
                }
            } else {
                showPage('home');
            }
        });

        // Initial Load
        let currentPath = window.location.pathname;
        if (currentPath.endsWith('/') && currentPath.length > 1) {
            currentPath = currentPath.slice(0, -1);
        }
        if (currentPath === '/' || currentPath === '') currentPath = '/home';
        const initialPage = currentPath.substring(1);
        window.history.replaceState({ page: initialPage }, "", currentPath);
        showPage(initialPage);

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
        });

        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });

        // ========== COPY IP ==========
        const copyBtn = document.getElementById('copyBtn');
        const serverIP = document.getElementById('serverIP');

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(serverIP.textContent);
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');
                setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 2000);
            } catch (err) {
                const textarea = document.createElement('textarea');
                textarea.value = serverIP.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                copyBtn.textContent = 'Copied!';
                copyBtn.classList.add('copied');
                setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 2000);
            }
        });

        // ========== SERVER STATUS ==========
        const playerCountEl = document.getElementById('playerCount');
        const statusIndicator = document.getElementById('statusIndicator');
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        const statusCard = document.getElementById('serverStatusCard');

        async function fetchServerStatus() {
            try {
                const response = await fetch('https://api.mcstatus.io/status/java/crackednetwork.mcgg.nl');
                
              
                const data = await response.json();
                if (data.online) {
                    const online = data.players ? data.players.online : 0;
                    playerCountEl.textContent = online;
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
        setInterval(fetchServerStatus, 60000);

        // ========== RENDER GAMEMODES ==========
        const gamemodeGrid = document.getElementById('gamemodeGrid');
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
            gamemodeGrid.appendChild(card);
        });

        // ========== RENDER STAFF (WITH MORE INFO BUTTON) ==========
        const staffGrid = document.getElementById('staffGrid');
        staffTeam.forEach((staff, index) => {
            const card = document.createElement('div');
            card.className = 'staff-card';
            card.innerHTML = `
                <div class="staff-avatar">${staff.initial}</div>
                <div class="staff-name">${staff.name || 'Position Open'}</div>
                <div class="staff-role">${staff.role}</div>
                <button class="btn-more-info" data-staff-index="${index}" aria-label="More info about ${staff.name || staff.role}">
                    More Info
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </button>
            `;
            staffGrid.appendChild(card);
        });

        // Event delegation untuk tombol More Info
        staffGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-more-info');
            if (!btn) return;
            const staffIndex = parseInt(btn.dataset.staffIndex);
            showStaffDetailPage(staffIndex);
        });

        // ========== SHOW STAFF DETAIL PAGE ==========
        function showStaffDetailPage(staffIndex) {
            window.history.pushState(
                { page: 'staff-detail', staffIndex: staffIndex },
                "",
                '/staff-detail'
            );
            showPage('staff-detail');
            renderStaffDetail(staffIndex);
        }

        // ========== RENDER STAFF DETAIL ==========
        function renderStaffDetail(staffIndex) {
            const staff = staffTeam[staffIndex];
            if (!staff) {
                document.getElementById('staffDetailContent').innerHTML = `
                    <div class="staff-detail-empty">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                        <h3>Staff Not Found</h3>
                        <p>The staff member you're looking for doesn't exist.</p>
                    </div>
                `;
                return;
            }

            const displayName = staff.name || 'Position Open';
            const isOpen = !staff.name;
            const roleBadgeClass = staff.role.toLowerCase().replace(/\s+/g, '-');

            // Warna avatar berbeda per role
            const avatarGradients = {
                owner: 'linear-gradient(135deg, #ffd700, #ffaa00)',
                'head-mod': 'linear-gradient(135deg, #ff6b9d, #ff3366)',
                moderator: 'linear-gradient(135deg, #00b4d8, #0077b6)',
                helper: 'linear-gradient(135deg, #00e5a0, #00b4d8)',
                staff: 'linear-gradient(135deg, #6b6b7b, #4a4a5a)'
            };
            const avatarBg = avatarGradients[roleBadgeClass] || avatarGradients.staff;

            // Social links HTML
            let socialsHTML = '';
            if (staff.socials) {
                if (staff.socials.youtube) {
                    socialsHTML += `<a href="${staff.socials.youtube}" target="_blank" rel="noopener noreferrer" class="sd-social-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                        YouTube
                    </a>`;
                }
                if (staff.socials.instagram) {
                    socialsHTML += `<a href="${staff.socials.instagram}" target="_blank" rel="noopener noreferrer" class="sd-social-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        Instagram
                    </a>`;
                }
            }

            if (isOpen) {
                socialsHTML = `<span style="color: var(--muted); font-size: 0.9rem;">Social links will be added when this position is filled.</span>`;
            }

            document.getElementById('staffDetailContent').innerHTML = `
                <button class="staff-detail-back" id="staffBackBtn" aria-label="Back to Staff Team">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Back to Staff Team
                </button>

                ${isOpen ? `
                <div class="staff-detail-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                    <h3>${staff.role} — Position Open</h3>
                    <p>We're looking for someone to fill this role. If you're interested, apply on our Discord server!</p>
                    <div style="margin-top: 1.5rem;">
                        <a href="/discord" class="btn btn-primary" data-page="discord">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                            Join Discord to Apply
                        </a>
                    </div>
                </div>
                ` : `
                <!-- Hero Card -->
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

                <!-- Bio -->
                <div class="staff-detail-bio">
                    <h3>About</h3>
                    <p>${staff.bio}</p>
                </div>

                <!-- Info Grid -->
                <div class="staff-detail-info-grid">
                    <div class="sd-info-card">
                        <div class="sd-info-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            Joined Since
                        </div>
                        <div class="sd-info-value">${staff.joinDate}</div>
                    </div>
                    <div class="sd-info-card">
                        <div class="sd-info-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
                            Specialty
                        </div>
                        <div class="sd-info-value">${staff.specialty}</div>
                    </div>
                    <div class="sd-info-card">
                        <div class="sd-info-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                            Discord
                        </div>
                        <div class="sd-info-value accent">${staff.discord}</div>
                    </div>
                    <div class="sd-info-card">
                        <div class="sd-info-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                            Status
                        </div>
                        <div class="sd-info-value" style="color: ${staff.status === 'Active' ? 'var(--accent)' : 'var(--muted)'};">${staff.status}</div>
                    </div>
                </div>

                <!-- Responsibilities -->
                <div class="staff-detail-section">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                        Responsibilities
                    </h3>
                    <ul class="sd-resp-list">
                        ${staff.responsibilities.map(r => `
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                ${r}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- Tags -->
                <div class="staff-detail-section">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                        Skills & Tags
                    </h3>
                    <div class="sd-tags">
                        ${staff.tags.map(t => `<span class="sd-tag">${t}</span>`).join('')}
                    </div>
                </div>

                <!-- Socials -->
                <div class="staff-detail-section">
                    <h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Social Links
                    </h3>
                    <div class="staff-detail-socials">
                        ${socialsHTML}
                    </div>
                </div>
                `}
            `;

            // Tombol Back — kembali ke Wiki tab Staff
            const backBtn = document.getElementById('staffBackBtn');
            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    window.history.pushState({ page: 'wiki', tab: 'staff' }, "", '/wiki');
                    showPage('wiki');
                    // Aktifkan tab staff
                    document.querySelectorAll('.wiki-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.wiki-section').forEach(s => s.classList.remove('active'));
                    const staffTab = document.querySelector('.wiki-tab[data-tab="staff"]');
                    const staffSection = document.getElementById('staff');
                    if (staffTab) staffTab.classList.add('active');
                    if (staffSection) staffSection.classList.add('active');
                });
            }

            // Re-bind data-page links di dalam staff detail (untuk tombol Join Discord, dll)
            document.querySelectorAll('#staffDetailContent [data-page]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pageId = link.getAttribute('data-page');
                    const url = link.getAttribute('href');
                    window.history.pushState({ page: pageId }, "", url);
                    showPage(pageId);
                });
            });
        }

        // ========== RENDER FAQ ==========
        const faqContainer = document.getElementById('faqContainer');
        faqData.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <div class="faq-question">
                    ${item.q}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="faq-answer"><p>${item.a}</p></div>
            `;
                        faqItem.querySelector('.faq-question').addEventListener('click', () => {
                faqContainer.querySelectorAll('.faq-item.open').forEach(x => { if(x!==faqItem) x.classList.remove('open'); });
                faqItem.classList.toggle('open');
            });
            faqContainer.appendChild(faqItem);
        });

        // ========== WIKI TABS ==========
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

        // ========== RENDER RULES ==========
        const rulesGrid = document.getElementById('rulesGrid');
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
                                ${rule.punishment === 'ban' 
                                    ? '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>'
                                    : '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'}
                            </svg>
                            ${rule.punishmentText}
                        </span>
                    </div>
                </div>
            `;
            const header = card.querySelector('.rule-header');
                        header.addEventListener('click', () => {
                rulesGrid.querySelectorAll('.rule-card.open').forEach(x => { if(x!==card) x.classList.remove('open'); });
                card.classList.toggle('open');
                header.setAttribute('aria-expanded', !isOpen);
            })
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
            });
            rulesGrid.appendChild(card);
        });

        // ========== RENDER VOTE SITES ==========
        const voteSitesGrid = document.getElementById('voteSites');
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
                        voteSitesGrid.appendChild(card);
        });

        // ========== RENDER STORE ==========
        const storeCategoriesEl = document.getElementById('storeCategories');
        const productsGrid = document.getElementById('productsGrid');
        let activeCategory = 'bedwars';

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

        function getProductIcon(category) {
            const icons = {
                bedwars: '<svg viewBox="0 0 24 24" fill="none"><path d="M2 4v16h20V4H2zm0 8h20M12 4v8" stroke-width="1.5"/></svg>',
                /*survival: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="1.5"/></svg>',*/
                coins: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke-width="1.5"/><path d="M12 6v12M8 10h8M8 14h8" stroke-width="1.5"/></svg>'
            };
            return icons[category] || icons.bedwars;
        }

        function renderProducts(category) {
            productsGrid.innerHTML = '';
            const products = TIP4SERV_PRODUCTS[category] || [];
            
            if(products.length === 0) {
                productsGrid.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--muted); grid-column: 1/-1;">Product is not available for this category.</div>`;
                return;
            }

            products.forEach(product => {
                const card = document.createElement('div');
                let cardClass = 'product-card';
                if (category === 'coins') cardClass += ' coins';
                if (category === 'cosmetics') cardClass += ' cosmetic';

                let badgeHTML = '';
                if (product.badge) {
                    const badgeText = product.badge === 'legendary' ? 'Legendary' : 
                                     product.badge === 'popular' ? 'Popular' : 
                                     product.badge === 'cheapest' ? 'Cheapest' : 
                                     
                    product.badge === 'special' ? 'Special' :
                                     product.badge === 'new' ? 'New' : 'Best Value';
                    badgeHTML = `<span class="product-badge ${product.badge === 'legendary' ? 'legendary' : product.badge === 'new' ? 'new' : ''}">${badgeText}</span>`;
                }

                card.className = cardClass;
                card.innerHTML = `
                    ${badgeHTML}
                    <div class="product-image">
                        <div class="product-icon">${getProductIcon(category)}</div>
                    </div>
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.desc}</p>
                        <div class="product-features">
                            ${product.features.map(f => `
                                <div class="product-feature">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                    ${f}
                                </div>
                            `).join('')}
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
                btn.addEventListener('click', () => {
                    openCheckout(btn.dataset.id);
                });
            });
        }

        renderProducts(activeCategory);

        // ========== CHECKOUT MODAL ==========
        const modal = document.getElementById('checkoutModal');
        const checkoutFrame = document.getElementById('checkoutFrame');
        const iframeLoader = document.getElementById('iframeLoader');
        const closeModalBtn = document.getElementById('closeModal');
        const modalTitle = document.getElementById('modalTitle');
        const btnViewBasket = document.getElementById('btnViewBasket');

        function openCheckout(productId) {
            if (!productId || productId.startsWith("GANTI_DENGAN_ID_")) {
                alert("Error: This product is not setup correctly or not available right now.");
                return;
            }
            modalTitle.textContent = "Purchase Item";
            modal.classList.add('active');
            checkoutFrame.src = "about:blank";
            iframeLoader.style.display = "flex";
            const checkoutUrl = `https://crackedshop.craftingstore.net/package/${productId}`;
            checkoutFrame.src = checkoutUrl;
        }

        function openBasket() {
            modalTitle.textContent = "Shopping Basket / Checkout";
            modal.classList.add('active');
            checkoutFrame.src = "about:blank";
            iframeLoader.style.display = "flex";
            const basketUrl = `https://crackedshop.craftingstore.net/checkout/basket`;
            checkoutFrame.src = basketUrl;
        }

        btnViewBasket.addEventListener('click', openBasket);

        checkoutFrame.addEventListener('load', () => {
            if (checkoutFrame.src !== "about:blank") {
                iframeLoader.style.display = "none";
            }
        });

        function closeModal() {
            modal.classList.remove('active');
            setTimeout(() => {
                checkoutFrame.src = "about:blank";
            }, 300);
        }

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // ========== PLUGIN MANAGER ==========
        const pluginCategoryTabs = document.getElementById('pluginCategoryTabs');
        const pluginListContainer = document.getElementById('pluginListContainer');
        const fmCurrentPath = document.getElementById('fmCurrentPath');
        let currentPluginCategory = null;
        let pluginManifest = [];

        const DEFAULT_DATA = {
            categories: [
                { id: "lobby", name: "Lobby" },
                { id: "bedwars", name: "Bedwars" }
            ],
            plugins: {
                lobby: [
                    { name: "WorldEdit", version: "7.2.15", author: "EngineHub", description: "Map editing tool." },
                    { name: "EssentialsX", version: "2.20.1", author: "Essentials Team", description: "Commands." }
                ],
                bedwars: [
                    { name: "BedWars1058", version: "22.2", author: "andrei1058", description: "Bedwars plugin." }
                ]
            }
        };

        async function initPluginManager() {
            pluginCategoryTabs.innerHTML = 'Memuat...';
            try {
                const response = await fetch('/plugin_categories.json');
                const data = await response.json(); 
                pluginManifest = data;
            } catch (err) {
                console.warn("Gagal load JSON, pakai data bawaan.");
                pluginManifest = DEFAULT_DATA.categories;
            }
            renderPluginTabs(pluginManifest);
            if (pluginManifest.length > 0) {
                loadPluginCategory(pluginManifest[0].id, pluginManifest[0].name);
            }
        }

        function renderPluginTabs(manifest) {
            pluginCategoryTabs.innerHTML = '';
            if(manifest.length === 0) {
                pluginCategoryTabs.innerHTML = '<span style="color:var(--danger);padding:1rem;">Kategori kosong</span>';
                return;
            }
            manifest.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = 'fm-tab';
                btn.dataset.id = cat.id;
                btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg> ${cat.name}`;
                btn.onclick = function() { loadPluginCategory(cat.id, cat.name, this); };
                pluginCategoryTabs.appendChild(btn);
            });
        }

        async function loadPluginCategory(id, name, btnElement = null) {
            document.querySelectorAll('.fm-tab').forEach(t => t.classList.remove('active'));
            if (btnElement) { btnElement.classList.add('active'); } else { 
                const t = document.querySelector(`.fm-tab[data-id="${id}"]`); 
                if(t) t.classList.add('active'); 
            }
            currentPluginCategory = id;
            fmCurrentPath.textContent = `/${id}/plugins`;
            pluginListContainer.innerHTML = '<div class="fm-item" style="color:var(--accent);">Loading plugins...</div>';

            let plugins = [];
            try {
                const response = await fetch(`/${id}.json`);
                plugins = await response.json(); 
            } catch (err) {
                console.warn(`File ${id}.json tidak ada/error. Pakai data bawaan.`);
                plugins = DEFAULT_DATA.plugins[id] || [];
            }

            if (plugins.length === 0) {
                plugins = [{ name: "Data Tidak Ditemukan", version: "-", author: "System", description: "Buat file .json atau edit DEFAULT_DATA di script." }];
            }
            renderPluginList(plugins);
        }

        function renderPluginList(plugins) {
            pluginListContainer.innerHTML = '';
            if (!plugins || plugins.length === 0) return;
            plugins.forEach(p => {
                const item = document.createElement('div');
                item.className = 'fm-item';
                item.innerHTML = `
                    <div class="fm-name">
                        <div class="fm-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div>
                        ${p.name || 'Unknown'}
                    </div>
                    <div class="fm-version">${p.version || '-'}</div>
                    <div class="fm-author">${p.author || '-'}</div>
                    <div class="fm-desc">${p.description || '-'}</div>
                `;
                pluginListContainer.appendChild(item);
            });
        }
        
        // ========== SCROLL REVEAL ==========
        function observeElements() {
            const reveals = document.querySelectorAll('.reveal');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('visible'), index * 100);
                    }
                });
            }, { threshold: 0.1 });
            reveals.forEach(el => observer.observe(el));
        }
        observeElements();

        // ========== KEYBOARD NAVIGATION ==========
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
                navLinksContainer.classList.remove('open');
                mobileToggle.classList.remove('open');
            }
        });

// ============================================================
// LEGAL PAGES NAVIGATION — CrackedNetwork
// ============================================================
(function() {
    // Select the legal pick cards
    const legalCards = document.querySelectorAll('[data-legal]');
    // Select all back buttons inside legal pages
    const legalBackButtons = document.querySelectorAll('[data-legal-back]');

    // Function to switch to a specific page (reuse your existing logic if available)
    function switchToPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        // Show target page
        const target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
        }
        // Update nav active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId || 
                (pageId === 'terms-of-service' && link.getAttribute('data-page') === 'legal') ||
                (pageId === 'privacy-policy' && link.getAttribute('data-page') === 'legal')) {
                link.classList.add('active');
            }
        });
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Handle clicks on the legal pick cards
    legalCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-legal');
            if (targetPage === 'terms') {
                switchToPage('terms-of-service');
            } else if (targetPage === 'privacy') {
                switchToPage('privacy-policy');
            }
        });
    });

    // Handle back button clicks
    legalBackButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const backTarget = this.getAttribute('data-legal-back');
            if (backTarget === 'legal') {
                switchToPage('legal');
            }
        });
    });
})();

const SEO_DATA = {

  "/home": {
    title: "CrackedNetwork | Non Pay To Win Minecraft Server",
    desc: "Join CrackedNetwork, a Minecraft Java server supporting Crack & Premium players. Enjoy BedWars, custom systems, active community, and 24/7 uptime."
  },

  "/gamemodes": {
    title: "Gamemodes | CrackedNetwork Minecraft Server",
    desc: "Explore all available gamemodes on CrackedNetwork including BedWars, Survival, events, and upcoming custom Minecraft experiences."
  },

  "/wiki": {
    title: "Wiki | CrackedNetwork Help & Information",
    desc: "Learn how CrackedNetwork works. Find tutorials, FAQs, staff information, server systems, and Minecraft server guides."
  },

  "/rules": {
    title: "Server Rules | CrackedNetwork",
    desc: "Read the official CrackedNetwork server rules to ensure a fair, friendly, and enjoyable Minecraft multiplayer experience."
  },

  "/vote": {
    title: "Vote | CrackedNetwork Minecraft Server",
    desc: "Vote for CrackedNetwork on Minecraft server lists and support the server. Earn rewards, coins, and exclusive perks."
  },

  "/store": {
    title: "Store | CrackedNetwork Official Webstore",
    desc: "Purchase ranks, coins, cosmetics, and exclusive perks on the official CrackedNetwork Minecraft server store."
  },

  "/discord": {
    title: "Discord | CrackedNetwork Community",
    desc: "Join the official CrackedNetwork Discord server to chat with players, get updates, participate in events, and receive support."
  },

  "/forums": {
    title: "Forums | CrackedNetwork Community Discussions",
    desc: "Join discussions with the CrackedNetwork community. Share suggestions, bug reports, screenshots, and Minecraft experiences."
  },

  "/plugins": {
    title: "Plugins | CrackedNetwork Server Information",
    desc: "View the plugins and systems running on CrackedNetwork. Explore custom Minecraft server features and plugin details."
  },

  "/donation": {
    title: "Donation | Support CrackedNetwork",
    desc: "Support CrackedNetwork with donations to help keep the Minecraft server online, updated, and improving every day."
  },

  "/legal": {
    title: "Legal Information | CrackedNetwork",
    desc: "Read the official CrackedNetwork legal documents including Terms of Service and Privacy Policy."
  },

  "/terms-of-service": {
    title: "Terms of Service | CrackedNetwork",
    desc: "Read the CrackedNetwork Terms of Service including refund policy, subscriptions, rules, and player responsibilities."
  },

  "/privacy-policy": {
    title: "Privacy Policy | CrackedNetwork",
    desc: "Learn how CrackedNetwork collects, stores, and protects your personal data, purchases, and Minecraft account information."
  }

};

function updateSEO(path) {

  const seo = SEO_DATA[path];

  if (!seo) return;

  document.title = seo.title;

  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", seo.desc);

  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", seo.title);

  document
    .querySelector('meta[property="og:description"]')
    .setAttribute("content", seo.desc);

  document
    .querySelector('link[rel="canonical"]')
    .setAttribute(
      "href",
      "https://crackednetwork.netlify.app" + path
    );
}

// ============================================
// SWIPE NAVIGATION SYSTEM
// ============================================

// Urutan halaman sesuai navbar (hanya halaman utama)
const pageOrder = [
    'home',
    'gamemodes', 
    'wiki', 
    'rules', 
    'vote', 
    'store', 
    'discord', 
    'forums'
];

// State untuk mencegah double swipe
let isSwiping = false;
let swipeTimeout = null;

/**
 * Mendapatkan index halaman yang sedang aktif
 */
function getCurrentPageIndex() {
    const activePage = document.querySelector('.page.active');
    if (!activePage) return -1;
    return pageOrder.indexOf(activePage.id);
}

/**
 * Navigasi dengan animasi swipe
 * @param {string} targetId - ID halaman tujuan
 * @param {string} direction - 'next' (ke kanan) atau 'prev' (ke kiri)
 */
function swipeToPage(targetId, direction) {
    // Cegah double swipe
    if (isSwiping) return;
    
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(targetId);
    
    if (!currentPage || !targetPage || currentPage === targetPage) return;
    
    // Cek apakah halaman target ada di pageOrder
    const targetIndex = pageOrder.indexOf(targetId);
    if (targetIndex === -1) return; // Hanya izinkan swipe untuk halaman di pageOrder
    
    isSwiping = true;
    
    // Simpan display original
    const targetOriginalDisplay = targetPage.style.display || '';
    
    // Setup halaman saat ini
    currentPage.classList.add('swipe-active', 'swipe-transition');
    
    // Setup halaman target
    targetPage.classList.add('swipe-transition');
    targetPage.style.display = 'block';
    
    if (direction === 'next') {
        // Target masuk dari kanan
        targetPage.classList.add('swipe-enter-right');
    } else {
        // Target masuk dari kiri
        targetPage.classList.add('swipe-enter-left');
    }
    
    // Force reflow
    void targetPage.offsetWidth;
    
    // Jalankan animasi
    if (direction === 'next') {
        currentPage.classList.add('swipe-exit-left');
        targetPage.classList.add('swipe-to-center');
        targetPage.classList.remove('swipe-enter-right');
    } else {
        currentPage.classList.add('swipe-exit-right');
        targetPage.classList.add('swipe-to-center');
        targetPage.classList.remove('swipe-enter-left');
    }
    
    // Cleanup setelah animasi selesai
    const cleanup = () => {
        // Reset halaman saat ini
        currentPage.classList.remove(
            'swipe-active', 
            'swipe-transition', 
            'swipe-exit-left', 
            'swipe-exit-right'
        );
        currentPage.style.display = '';
        currentPage.style.transform = '';
        currentPage.classList.remove('active');
        
        // Reset halaman target
        targetPage.classList.remove(
            'swipe-transition',
            'swipe-enter-right',
            'swipe-enter-left',
            'swipe-to-center'
        );
        targetPage.style.display = targetOriginalDisplay;
        targetPage.style.transform = '';
        
        // Aktifkan halaman baru
        targetPage.classList.add('active');
        
        // Update URL dan history
        const newPath = '/' + targetId;
        if (window.location.pathname !== newPath) {
            history.pushState({ page: targetId }, '', newPath);
        }
        
        // Update document title
        updatePageTitle(targetId);
        
        // Update active nav link
        updateNavActive(targetId);
        
        // Trigger event untuk komponen lain
        window.dispatchEvent(new CustomEvent('pageChanged', { 
            detail: { page: targetId } 
        }));
        
        // Update Lenis jika ada
        if (typeof lenis !== 'undefined') {
            lenis.resize();
        }
        
        // Reset state
        isSwiping = false;
        if (swipeTimeout) clearTimeout(swipeTimeout);
    };
    
    // Gunakan transitionend event
    const handleTransitionEnd = (e) => {
        if (e.target === targetPage && e.propertyName === 'transform') {
            targetPage.removeEventListener('transitionend', handleTransitionEnd);
            cleanup();
        }
    };
    
    targetPage.addEventListener('transitionend', handleTransitionEnd);
    
    // Fallback: cleanup setelah 500ms jika transitionend tidak terpanggil
    swipeTimeout = setTimeout(() => {
        targetPage.removeEventListener('transitionend', handleTransitionEnd);
        cleanup();
    }, 500);
}

/**
 * Update title halaman
 */
function updatePageTitle(pageId) {
    const titles = {
        'home': 'CrackedNetwork | Non Pay to Win Minecraft Server',
        'gamemodes': 'Gamemodes | CrackedNetwork',
        'wiki': 'Wiki | CrackedNetwork',
        'rules': 'Rules | CrackedNetwork',
        'vote': 'Vote | CrackedNetwork',
        'store': 'Store | CrackedNetwork',
        'discord': 'Discord | CrackedNetwork',
        'forums': 'Forums | CrackedNetwork',
        'plugins': 'Plugin Info | CrackedNetwork',
        'donate': 'Donation | CrackedNetwork',
        'legal': 'Legal | CrackedNetwork',
        'staff-detail': 'Staff Detail | CrackedNetwork'
    };
    document.title = titles[pageId] || 'CrackedNetwork';
}

/**
 * Update active state di navbar
 */
function updateNavActive(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// SWIPE DETECTION
// ============================================

let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let isDragging = false;

const minSwipeDistance = 60; // px - jarak minimum untuk trigger swipe
const maxSwipeTime = 400;    // ms - waktu maksimum swipe
const maxVerticalMovement = 50; // px - toleransi gerakan vertikal

/**
 * Handle touch/mouse start
 */
function handleSwipeStart(e) {
    // Jangan proses jika user sedang interact dengan elemen tertentu
    const target = e.target;
    if (target.closest('button, a, input, textarea, select, .wiki-tab, .nav-link, iframe, [data-no-swipe]')) {
        return;
    }
    
    const point = e.touches ? e.touches[0] : e;
    touchStartX = point.clientX;
    touchStartY = point.clientY;
    touchStartTime = Date.now();
    isDragging = true;
}

/**
 * Handle touch/mouse move (opsional - untuk visual feedback)
 */
function handleSwipeMove(e) {
    if (!isDragging) return;
    
    // Bisa ditambahkan visual feedback di sini jika diinginkan
    const point = e.touches ? e.touches[0] : e;
    const deltaX = point.clientX - touchStartX;
    const deltaY = point.clientY - touchStartY;
    
    // Jika gerakan terlalu vertikal, batalkan swipe
    if (Math.abs(deltaY) > maxVerticalMovement && Math.abs(deltaY) > Math.abs(deltaX)) {
        isDragging = false;
    }
}

/**
 * Handle touch/mouse end
 */
function handleSwipeEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    const point = e.changedTouches ? e.changedTouches[0] : e;
    const deltaX = point.clientX - touchStartX;
    const deltaY = point.clientY - touchStartY;
    const elapsed = Date.now() - touchStartTime;
    
    // Validasi swipe
    if (Math.abs(deltaX) < minSwipeDistance) return; // Terlalu pendek
    if (elapsed > maxSwipeTime) return; // Terlalu lama
    if (Math.abs(deltaY) > maxVerticalMovement) return; // Terlalu vertikal
    
    // Harus dominan horizontal
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    
    const currentIndex = getCurrentPageIndex();
    if (currentIndex === -1) return;
    
    if (deltaX < 0) {
        // Swipe ke kiri → halaman berikutnya
        const nextIndex = currentIndex + 1;
        if (nextIndex < pageOrder.length) {
            swipeToPage(pageOrder[nextIndex], 'next');
        }
    } else if (deltaX > 0) {
        // Swipe ke kanan → halaman sebelumnya
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            swipeToPage(pageOrder[prevIndex], 'prev');
        }
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Gunakan pages container untuk area swipe
const swipeArea = document.querySelector('.pages');

if (swipeArea) {
    // Touch events (mobile)
    swipeArea.addEventListener('touchstart', handleSwipeStart, { passive: true });
    swipeArea.addEventListener('touchmove', handleSwipeMove, { passive: true });
    swipeArea.addEventListener('touchend', handleSwipeEnd, { passive: true });
    
    // Mouse events (desktop)
    swipeArea.addEventListener('mousedown', handleSwipeStart);
    
    document.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) { // Left button pressed
            handleSwipeMove(e);
        }
    });
    
    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            handleSwipeEnd(e);
        }
    });
    
    // Cegah default drag behavior
    swipeArea.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
}

// ============================================
// KEYBOARD NAVIGATION (Arrow Keys)
// ============================================

document.addEventListener('keydown', (e) => {
    // Jangan proses jika user sedang mengetik di input
    if (e.target.closest('input, textarea, [contenteditable]')) return;
    
    const currentIndex = getCurrentPageIndex();
    if (currentIndex === -1) return;
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = currentIndex + 1;
        if (nextIndex < pageOrder.length) {
            swipeToPage(pageOrder[nextIndex], 'next');
        }
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            swipeToPage(pageOrder[prevIndex], 'prev');
        }
    }
});

// ============================================
// INTEGRASI DENGAN NAVIGASI KLIK YANG SUDAH ADA
// ============================================

// Override fungsi navigateTo jika ada, atau tambahkan event listener baru
document.addEventListener('DOMContentLoaded', () => {
    // Tambahkan event listener ke semua link dengan data-page
    document.querySelectorAll('[data-page]').forEach(link => {
        // Hindari double binding
        if (link.hasAttribute('data-swipe-bound')) return;
        link.setAttribute('data-swipe-bound', 'true');
        
        link.addEventListener('click', function(e) {
            const pageId = this.getAttribute('data-page');
            if (!pageId) return;
            
            // Cek apakah halaman ada di pageOrder untuk animasi swipe
            const currentIndex = getCurrentPageIndex();
            const targetIndex = pageOrder.indexOf(pageId);
            
            if (currentIndex !== -1 && targetIndex !== -1 && currentIndex !== targetIndex) {
                e.preventDefault();
                const direction = targetIndex > currentIndex ? 'next' : 'prev';
                swipeToPage(pageId, direction);
            }
            // Jika tidak di pageOrder, navigasi normal (tanpa animasi swipe)
        });
    });
});

console.log('✅ Swipe navigation initialized');
console.log('📱 Swipe left/right to navigate between pages');
console.log('⌨️  Use Arrow keys Left/Right for keyboard navigation');

// ============================================
// PERFORMANCE DETECTION
// ============================================
const isLowEndDevice = () => {
    // Cek RAM (Chrome only)
    if ('deviceMemory' in navigator) {
        if (navigator.deviceMemory < 4) return true; // RAM < 4GB
    }
    
    // Cek koneksi (anggap low-end kalo pake 3G atau lebih lambat)
    if ('connection' in navigator) {
        const conn = navigator.connection;
        if (conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.effectiveType === '3g') {
            return true;
        }
    }
    
    // Cek resolusi layar (HP kecil biasanya low-end)
    if (window.innerWidth < 768) return true;
    
    // Cek hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true;
    
    return false;
};

// Simpan status
window.isLowEnd = isLowEndDevice();

// Apply optimasi kalo low-end
if (window.isLowEnd) {
    console.log('📱 Low-end device detected - Applying optimizations');
    document.documentElement.classList.add('low-end-device');
}