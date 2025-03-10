// // const audioCache: { [key: string]: HTMLAudioElement } = {};


// // export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
// //     // const audioPath = "../../public/notes/pluck/E_F_pluck.mp3";
// //     const audioPath = `./notes/${soundType}/${mainString}_${currentNote}_${soundType}.mp3`;
// //     // const audioPath = `../notes/${soundType}/${mainString}_${currentNote}_${soundType}.mp3`;
    
// //     if (!audioCache[audioPath]) {
// //         audioCache[audioPath] = new Audio(audioPath);
// //     }

// //     const audio = audioCache[audioPath];
    
// //     if (soundType === 'sustain' || soundType === 'vibrato') {
// //         audio.loop = true;
// //     } else {
// //         audio.loop = false;
// //     }

// //     audio.play();
// //     return audio;
// // }

// // export function stopAudio(audio: HTMLAudioElement) {
// //     audio.pause();
// //     audio.currentTime = 0;
// // }
























// // const audioCache: { [key: string]: HTMLAudioElement } = {};

// // export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
// //     const audioPath = `/notes/${soundType}/${mainString}_${currentNote}_${soundType}.mp3`;
    
// //     if (!audioCache[audioPath]) {
// //         audioCache[audioPath] = new Audio(audioPath);
// //     }

// //     const audio = audioCache[audioPath];
    
// //     if (soundType === 'sustain' || soundType === 'vibrato') {
// //         audio.loop = true;
// //     } else {
// //         audio.loop = false;
// //     }

// //     if (audio.paused) {
// //         audio.play().catch(error => {
// //             console.error("Error playing audio:", error);
// //         });
// //     }

// //     return audio;
// // }

// // export function stopAudio(audio: HTMLAudioElement) {
// //     if (!audio.paused) {
// //         audio.pause();
// //     }
// // }








// // const audioCache: { [key: string]: HTMLAudioElement } = {};

// // export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
// //     const audioPath = `/notes/${soundType}/${mainString}_${currentNote}_${soundType}.mp3`;
    
// //     if (!audioCache[audioPath]) {
// //         audioCache[audioPath] = new Audio(audioPath);
// //     }

// //     const audio = audioCache[audioPath];
    
// //     if (soundType === 'sustain' || soundType === 'vibrato') {
// //         audio.loop = true;
// //     } else {
// //         audio.loop = false;
// //     }

// //     if (audio.paused || audio.ended) {
// //         audio.play().catch(error => {
// //             if (error.name !== 'AbortError') {
// //                 console.error("Error playing audio:", error);
// //             }
// //         });
// //     }

// //     return audio;
// // }

// // export function stopAudio(audio: HTMLAudioElement) {
// //     if (!audio.paused) {
// //         audio.pause();
// //     }
// // }














// // const audioCache: { [key: string]: HTMLAudioElement } = {};

// // export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
// //     const audioPath = `/notes/${soundType}/${mainString}_${currentNote}_${soundType}.mp3`;
    
// //     if (!audioCache[audioPath]) {
// //         audioCache[audioPath] = new Audio(audioPath);
// //     }

// //     const audio = audioCache[audioPath];
    
// //     if (soundType === 'sustain' || soundType === 'vibrato') {
// //         audio.loop = true;
// //     } else {
// //         audio.loop = false;
// //     }

// //     audio.volume = 1.0; // Ensure volume is set
// //     audio.muted = false; // Ensure audio is not muted

// //     if (audio.paused || audio.ended) {
// //         audio.play().catch(error => {
// //             if (error.name !== 'AbortError') {
// //                 console.error("Error playing audio:", error);
// //             }
// //         });
// //     }

// //     return audio;
// // }

// // export function stopAudio(audio: HTMLAudioElement) {
// //     if (!audio.paused) {
// //         audio.pause();
// //     }
// // }













// const audioCache: { [key: string]: HTMLAudioElement } = {};

// export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
//     const audioPath = `/notes/${soundType}/${mainString}_${currentNote}_${soundType}.mp3`;
    
//     if (!audioCache[audioPath]) {
//         audioCache[audioPath] = new Audio(audioPath);
//     }

//     const audio = audioCache[audioPath];
    
//     if (soundType === 'sustain' || soundType === 'vibrato') {
//         audio.loop = true;
//     } else {
//         audio.loop = false;
//     }

//     audio.volume = 1.0; // Ensure volume is set
//     audio.muted = false; // Ensure audio is not muted

//     console.log(`Playing audio: ${audioPath}`);
//     console.log(`Audio state: paused=${audio.paused}, ended=${audio.ended}, currentTime=${audio.currentTime}`);

//     audio.currentTime = 0; // Restart the audio
//     audio.play().then(() => {
//         console.log("Audio is playing");
//     }).catch(error => {
//         if (error.name !== 'AbortError') {
//             console.error("Error playing audio:", error);
//         }
//     });

//     return audio;
// }

// export function stopAudio(audio: HTMLAudioElement) {
//     if (!audio.paused) {
//         audio.pause();
//         console.log("Audio is paused");
//     }
// }


































// const audioCache: { [key: string]: HTMLAudioElement } = {};

// export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
//     const audioPath = `/notes/${soundType}/${mainString}_${currentNote}_${soundType}.mp3`;
    
//     if (!audioCache[audioPath]) {
//         audioCache[audioPath] = new Audio(audioPath);
//     }

//     const audio = audioCache[audioPath];
    
//     // Only use looping for sustain and vibrato
//     audio.loop = soundType === 'sustain' || soundType === 'vibrato';
//     audio.volume = 1.0;
//     audio.muted = false;

//     console.log(`Playing audio: ${audioPath} (${soundType})`);
    
//     audio.currentTime = 0;
//     audio.play().then(() => {
//         console.log("Audio is playing");
//     }).catch(error => {
//         if (error.name !== 'AbortError') {
//             console.error("Error playing audio:", error);
//         }
//     });

//     return audio;
// }

// export function stopAudio(audio: HTMLAudioElement) {
//     if (!audio.paused) {
//         audio.pause();
//         console.log("Audio is paused");
//     }
// }





































const audioCache: { [key: string]: HTMLAudioElement } = {};

export function playAudio(mainString: string, currentNote: string, soundType: 'pluck' | 'sustain' | 'vibrato') {
    const formattedNote = currentNote.replace('/', '_'); // Handle notes like "F#/Gb"
    const audioPath = `/notes/${soundType}/${mainString}_${formattedNote}_${soundType}.mp3`;
    
    if (!audioCache[audioPath]) {
        audioCache[audioPath] = new Audio(audioPath);
    }

    const audio = audioCache[audioPath];
    
    // Configure audio based on sound type
    if (soundType === 'pluck') {
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
        audio.pause();
        console.log("Audio is paused");
    }
}