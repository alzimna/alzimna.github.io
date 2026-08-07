document.addEventListener('DOMContentLoaded', () => {
    const navElement = document.querySelector('nav.parent-nav');
    const navList = document.querySelector('ul.nav');

    if (!navElement || !navList) return;

    let navLinks = navList.querySelectorAll('li');
    let navAnchors = navList.querySelectorAll("li a");
    const animationDiv = navList.querySelector('.animation');
    const mobileBreakpoint = 650;

    let activeLink = null;

    const mobileToggle = document.createElement('button');
    mobileToggle.type = 'button';
    mobileToggle.className = 'nav-mobile-toggle';
    mobileToggle.classList.add('fw-medium');
    mobileToggle.classList.add(
        document.body.getAttribute('data-theme') === 'light' ? 'dark-shadow' : 'light-shadow'
    );
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    mobileToggle.setAttribute('aria-expanded', 'false');
    navElement.insertBefore(mobileToggle, navList);

    function isMobile() {
        return window.innerWidth <= mobileBreakpoint;
    }

    const githubli = document.createElement("li");
    const githuba = document.createElement("a");

    githuba.textContent = "GitHub";
    githuba.href = "https://alzimna.github.io/";
    githubli.appendChild(githuba);

    const divider = document.createElement("li");
    divider.className = "menu-divider";
    divider.innerHTML = "<hr>";

    function updateGithub() {
        if (isMobile()) {
            if (!navList.contains(githubli)) {
                animationDiv.before(divider);
                animationDiv.before(githubli);
            }
        } else {
            divider.remove();
            githubli.remove();
        }
    }

    function closeMobileMenu() {
        navElement.classList.remove('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
    }

    function updatePointer(target) {
        if (!animationDiv || isMobile()) return;
        animationDiv.style.width = target.offsetWidth + 4 + 'px';
        animationDiv.style.left = target.offsetLeft - 2 + 'px';
    }

    function updateToggleLabel() {
        if (!activeLink) return;
        const activeAnchor = activeLink.querySelector('a');
        if (activeAnchor) {
            mobileToggle.textContent = activeAnchor.textContent.trim();
        }
    }

    function normalizePath(path) {
        if (!path) return '/';
        let normalized = path.toLowerCase().replace(/\/+$/, '');
        if (normalized === '') normalized = '/';
        if (normalized.endsWith('/index.html')) normalized = normalized.slice(0, -'/index.html'.length) || '/';
        return normalized;
    }

    const currentPath = normalizePath(window.location.pathname);
    const currentHash = window.location.hash;

    navAnchors = navList.querySelectorAll('li a');
    navAnchors.forEach((anchor) => {
        const anchorPath = normalizePath(anchor.pathname);
        if (anchorPath === currentPath && anchor.hash === currentHash) {
            activeLink = anchor.parentElement;
            activeLink.classList.add('active');
        }
    });

    if (!activeLink) {
        activeLink = navLinks[0];
        activeLink.classList.add('active');
    }

    function resetActiveState() {
        navLinks = navList.querySelectorAll('li');
        navAnchors = navList.querySelectorAll("li a");
        navLinks.forEach((link) => link.classList.remove('active', 'hover'));
        navAnchors.forEach((anchor) => anchor.classList.remove('fw-semibold'));
    }

    function updateActiveWeightClass() {
        navAnchors = navList.querySelectorAll("li a");
        navAnchors.forEach((anchor) => anchor.classList.remove('fw-semibold'));
        if (!activeLink) return;
        const activeAnchor = activeLink.querySelector('a');
        if (activeAnchor) {
            activeAnchor.classList.add('fw-semibold');
        }
    }

    updateGithub();
    updateActiveWeightClass();
    updateToggleLabel();
    updatePointer(activeLink);

    navLinks = navList.querySelectorAll('li');
    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
            // if (isMobile()) return;
            resetActiveState();
            link.classList.add('hover');
            updatePointer(link);
        });

        link.addEventListener('mouseleave', () => {
            // if (isMobile()) return;
            link.classList.remove('hover');
            activeLink.classList.add('active');
            updateActiveWeightClass();
            updatePointer(activeLink);
        });

        link.addEventListener('click', () => {
            resetActiveState();
            link.classList.add('active');
            activeLink = link;
            updateActiveWeightClass();
            updateToggleLabel();
            updatePointer(activeLink);

            if (isMobile()) {
                closeMobileMenu();
            }
        });
    });

    mobileToggle.addEventListener('click', () => {
        const isOpen = navElement.classList.toggle('mobile-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
        if (!isMobile()) return;
        if (!navElement.contains(event.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        updateGithub();
        if (!isMobile()) {
            closeMobileMenu();
            updatePointer(activeLink);
        }
    });
});


/* ---------------- scroll ---------------- */
const scrollButtons = document.querySelectorAll(".scroll");

scrollButtons.forEach(button => {
    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});