const audioCache: { [key: string]: HTMLAudioElement } = {};
const FADE_DURATION = 100; // 100ms fade out

export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
    // Replace sharp notation (#) with 's' and remove slashes
    const formattedNote = currentNote
        .replace('#', 's')
        .replace('/', '_'); // Handle notes like "F#/Gb" -> "Fs_Gb"
    
    const audioPath = `/notes/${soundType}/${mainString}_${formattedNote}_${soundType}.mp3`;
    
    if (!audioCache[audioPath]) {
        audioCache[audioPath] = new Audio(audioPath);
    }

    const audio = audioCache[audioPath];
    
    // Configure audio based on sound type
    if (soundType === 'pluck') {
        // If the pluck sound is already playing, stop it immediately
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        // Pluck sounds should play once to completion
        audio.loop = false;
        
        // Add event listener to handle cleanup after pluck sound completes
        const onEnded = () => {
            console.log("Pluck sound completed");
            audio.removeEventListener('ended', onEnded);
        };
        audio.addEventListener('ended', onEnded);
    } else {
        // Sustain and vibrato should loop
        audio.loop = true;
    }
    
    // Reset any previous volume changes
    audio.volume = 1.0;
    audio.muted = false;

    console.log(`Playing audio: ${audioPath} (${soundType})`);
    
    audio.currentTime = 0;
    audio.play().then(() => {
        console.log("Audio is playing");
    }).catch(error => {
        if (error.name !== 'AbortError') {
            console.error("Error playing audio:", error);
        }
    });

    return audio;
}

export function stopAudio(audio: HTMLAudioElement) {
    if (!audio.paused) {
        // Check if this is a pluck sound by looking at the audio source URL
        const isPluckSound = audio.src.includes('/pluck/');
        
        if (isPluckSound) {
            // Immediately stop pluck sounds
            audio.pause();
            audio.currentTime = 0;
        } else {
            // Apply fade out only for sustain/vibrato sounds
            const startTime = performance.now();
            const startVolume = audio.volume;
            
            const fadeOut = () => {
                const currentTime = performance.now();
                const elapsed = currentTime - startTime;
                const percentage = elapsed / FADE_DURATION;
                
                if (percentage < 1) {
                    // Calculate new volume
                    audio.volume = startVolume * (1 - percentage);
                    requestAnimationFrame(fadeOut);
                } else {
                    // Fade complete, stop the audio
                    audio.pause();
                    audio.volume = startVolume; // Reset volume for next play
                    console.log("Audio faded out and paused");
                }
            };

            // Start the fade animation
            requestAnimationFrame(fadeOut);
        }
    }
}