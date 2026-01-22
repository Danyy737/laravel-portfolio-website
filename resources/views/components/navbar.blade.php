<header class="site-header">
    <h1 class="site-title">Daniel Portfolio</h1>

    <nav class="site-nav">
        <a href="/" class="{{ request()->is('/') ? 'active' : '' }}">Home</a>
        <a href="/about" class="{{ request()->is('about') ? 'active' : '' }}">About</a>
        <a href="/projects" class="{{ request()->is('projects') ? 'active' : '' }}">Projects</a>
        <a href="/contact" class="{{ request()->is('contact') ? 'active' : '' }}">Contact</a>
    </nav>
</header>
