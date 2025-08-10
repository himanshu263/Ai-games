document.addEventListener('DOMContentLoaded', () => {
    // Background Music Control
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let musicPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            backgroundMusic.pause();
            musicToggle.querySelector('.sound-on').style.display = 'none';
            musicToggle.querySelector('.sound-off').style.display = 'inline';
            musicPlaying = false;
        } else {
            backgroundMusic.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
            musicToggle.querySelector('.sound-on').style.display = 'inline';
            musicToggle.querySelector('.sound-off').style.display = 'none';
            musicPlaying = true;
        }
    });

    // Game Card Navigation
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        const gameName = card.getAttribute('data-game');
        
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card flip when clicking the button
            navigateToGame(gameName);
        });
    });

    function navigateToGame(gameName) {
        // Play click sound
        playSound('click');
        
        // Navigate to the game page
        window.location.href = `games/${gameName}.html`;
    }

    // Sound Effects
    function playSound(soundName) {
        const sound = new Audio(`assets/audio/${soundName}.mp3`);
        sound.volume = 0.5;
        sound.play().catch(error => {
            console.log('Sound playback failed:', error);
        });
    }

    // Add hover sound to game cards
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            playSound('hover');
        });
    });

    // Create stars for background
    createStars();

    function createStars() {
        const starsContainer = document.querySelector('.stars');
        const starCount = 100;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 1}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            starsContainer.appendChild(star);
        }
    }
});