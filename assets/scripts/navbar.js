document.addEventListener("DOMContentLoaded", function() {
	const toolsBtn = document.getElementById('tools-btn');
	const drawer = document.getElementById('drawer');
	const drawerCloseBtn = document.getElementById('drawer-close-btn');
	
	toolsBtn.addEventListener('click', function() {
        drawer.classList.add('active');
    });

    drawerCloseBtn.addEventListener('click', function() {
        drawer.classList.remove('active');
    });

    window.addEventListener('click', function(event) {
        if (event.target === drawer) {
            drawer.classList.remove('active');
        }
    });
})