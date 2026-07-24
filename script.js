/* =============================================================
   SCRIPT.JS — TABLE OF CONTENTS
   Search for any heading below (Ctrl+F / Cmd+F) to jump to it.

   1. Mobile Menu (hamburger toggle)
   2. Focus Area Tabs (Admin/EA vs Customer Service)
   3. FAQ Accordion (click to expand/collapse)
   4. Scroll-Spy Navigation (highlights the active menu link)
   ============================================================= */


/* =============================================================
   1. MOBILE MENU
   Controls the hamburger (☰) button that shows/hides the nav
   links on small screens (phones/tablets).
   ============================================================= */
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
  var isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu automatically after a link is tapped
navLinks.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});


/* =============================================================
   2. FOCUS AREA TABS
   Switches between the "Administrative & Executive Support" and
   "Customer Service & Success" panels in the Focus Areas section.
   ============================================================= */
var tabs = document.querySelectorAll('.tab');

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    // Turn off "active" styling on every tab and panel first
    tabs.forEach(function (t) { t.classList.remove('active'); });
    document.querySelectorAll('.panel').forEach(function (p) {
      p.classList.remove('active');
    });

    // Then turn "active" back on for just the one that was clicked
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.panel).classList.add('active');
  });
});


/* =============================================================
   3. FAQ ACCORDION
   Expands/collapses each question in the FAQ section when clicked.
   ============================================================= */
document.querySelectorAll('.faq-item').forEach(function (item) {
  item.querySelector('.faq-q').addEventListener('click', function () {
    item.classList.toggle('open');
  });
});


/* =============================================================
   4. SCROLL-SPY NAVIGATION
   Watches which section is currently on screen as you scroll,
   and highlights the matching link in the top navigation bar.
   ============================================================= */
var navAnchors = document.querySelectorAll('.navlinks a');
var sectionMap = [];

// Build a list pairing each nav link with the section it points to
navAnchors.forEach(function (a) {
  var id = a.getAttribute('href').slice(1); // removes the "#" from "#about"
  var el = document.getElementById(id);
  if (el) {
    sectionMap.push({ link: a, section: el });
  }
});

function setActiveLink() {
  var scrollPos = window.scrollY + 140; // 140px offset accounts for the sticky header
  var current = sectionMap[0];

  sectionMap.forEach(function (item) {
    if (item.section.offsetTop <= scrollPos) {
      current = item;
    }
  });

  navAnchors.forEach(function (a) { a.classList.remove('active'); });
  if (current) {
    current.link.classList.add('active');
  }
}

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);

// Give instant feedback the moment a nav link is clicked,
// rather than waiting for the scroll animation to finish
navAnchors.forEach(function (a) {
  a.addEventListener('click', function () {
    navAnchors.forEach(function (x) { x.classList.remove('active'); });
    a.classList.add('active');
  });
});
