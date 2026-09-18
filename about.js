const ABOUT_TEXT = `
<h1>3D Parkour Obby</h1>
<p><strong>3D Parkour Obby</strong> is a fully three-dimensional mobile obstacle course game engineered for high-performance mobile browsers and standalone apps. Players navigate a 3D character across 100 platforms, scaling moving hazards, neon grids, and icy peaks.</p>

<h2>Key Features</h2>
<ul>
    <li><strong>Full 3D Physics:</strong> Calculated fixed-jump heights and responsive gravity mechanics.</li>
    <li><strong>100 Playable Levels:</strong> Progressing across Nature Plains, Neon Sky Grid, and Glacial Ice environments.</li>
    <li><strong>Customization:</strong> Earn coins to unlock 50 distinct characters and 100+ jump particle trails.</li>
    <li><strong>Responsive Touch System:</strong> Integrated landscape virtual joystick and ergonomic jump controls.</li>
</ul>

<h2>Support & Contact</h2>
<p>For technical inquiries, bug reports, or partnership opportunities, reach out directly to our team:</p>
<p><strong>Official Contact Email:</strong> mygame24545@gmail.com</p>
`;

function openAboutUs() {
    document.getElementById('about-text-container').innerHTML = ABOUT_TEXT;
    document.getElementById('about-modal').classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}
