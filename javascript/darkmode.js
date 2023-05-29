const modeToggle = $('#mode-toggle');
const body = $('body');

modeToggle.on('click', () => {
    body.toggleClass('dark-mode');
    body.toggleClass('light-mode');
    modeToggle.toggleClass('btn-dark');
    modeToggle.toggleClass('btn-light');

    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('dark-mode');
    navbar.classList.toggle('light-mode');

    const navLinkHoverColor = getComputedStyle(navbar).getPropertyValue('--nav-link-hover-color');
    const navLinkHoverBackground = getComputedStyle(navbar).getPropertyValue('--nav-link-hover-background');

    document.documentElement.style.setProperty('--nav-link-hover-color', navLinkHoverColor);
    document.documentElement.style.setProperty('--nav-link-hover-background', navLinkHoverBackground);
});