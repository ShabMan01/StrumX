const audioCache: { [key: string]: HTMLAudioElement } = {};

export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
    const audioPath = `../../public/notes/${soundType}/${mainString}_${currentNote}_${soundType}.mp3`;
    
    if (!audioCache[audioPath]) {
        audioCache[audioPath] = new Audio(audioPath);
    }

    const audio = audioCache[audioPath];
    
    if (soundType === 'sustain' || soundType === 'vibrato') {
        audio.loop = true;
    } else {
        audio.loop = false;
    }

    audio.play();
    return audio;
}

export function stopAudio(audio: HTMLAudioElement) {
    audio.pause();
    audio.currentTime = 0;
}

