import os
from pydub import AudioSegment
from pydub.silence import split_on_silence

# Set paths relative to the script location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FFMPEG_PATH = os.path.join(SCRIPT_DIR, "ffmpeg.exe")
FFPROBE_PATH = os.path.join(SCRIPT_DIR, "ffprobe.exe")

# Update ffmpeg settings
AudioSegment.converter = FFMPEG_PATH
AudioSegment.ffprobe = FFPROBE_PATH

# Define the note arrays as given
violin_notes = [
    ["E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"],  # E string
    ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E"],  # A string
    ["D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A"],  # D string
    ["G", "G#/Ab", "A", "A#/Bb", "B", "C", "C#/Db", "D"]   # G string
]

def sanitize_filename(filename):
    # Replace forward slashes and other invalid characters
    return filename.replace('/', '_').replace('\\', '_').replace('#', 's')

def split_notes(audio_file, string_idx):
    try:
        # Load the original audio file
        print(f"Loading audio file: {audio_file}")
        audio = AudioSegment.from_mp3(audio_file)
        
        # Get the notes for the chosen string
        string_notes = violin_notes[string_idx]

        # Create directories for sustain and pluck if they don't exist
        sustain_dir = os.path.join(os.path.dirname(audio_file), "sustain_audio")
        pluck_dir = os.path.join(os.path.dirname(audio_file), "pluck_audio")
        os.makedirs(sustain_dir, exist_ok=True)
        os.makedirs(pluck_dir, exist_ok=True)

        # Get the current string letter
        string_letter = ["E", "A", "D", "G"][string_idx]


        # silence_thresholds sustain/pluck (idek if this matters anymore but im still gonna leave it here)
        # E: -30dB for sustain, -65dB for pluck
        # A: -25dB for sustain, -65dB for pluck
        # D: -30dB for sustain, -65dB for pluck
        # G: -30dB for sustain, -60dB for pluck

        # Process sustain segments
        print("Splitting sustain audio on silence...")
        sustain_segments = split_on_silence(
            audio, 
            min_silence_len=1000,  # Longer silence detection for sustained notes
            silence_thresh=-30,       # Less sensitive threshold
            keep_silence=500       # Keep more silence around the segment
        )
        print(f"Found {len(sustain_segments)} sustain segments")

        # Process pluck segments
        print("Splitting pluck audio on silence...")
        pluck_segments = split_on_silence(
            audio, 
            min_silence_len=300,   # Shorter silence detection for plucks
            silence_thresh=-60,    # More sensitive threshold
            keep_silence=100       # Keep less silence around the segment
        )
        print(f"Found {len(pluck_segments)} pluck segments")

        # Take only the first 8 segments for each type
        sustain_segments = sustain_segments[:8]
        pluck_segments = pluck_segments[8:]

        # Export sustain segments
        for i, note in enumerate(string_notes):
            if i >= len(sustain_segments):
                print(f"Error: Ran out of sustain segments at index {i}")
                return
            
            safe_note = sanitize_filename(note)
            note_name = f"{string_letter}_{safe_note}_sustain.mp3"
            sustain_segments[i].export(os.path.join(sustain_dir, note_name), format="mp3")
            print(f"Exported {os.path.join(sustain_dir, note_name)}")

        # Export pluck segments
        for i, note in enumerate(string_notes):
            if i >= len(pluck_segments):
                print(f"Error: Ran out of pluck segments at index {i}")
                return
            
            safe_note = sanitize_filename(note)
            note_name = f"{string_letter}_{safe_note}_pluck.mp3"
            pluck_segments[i].export(os.path.join(pluck_dir, note_name), format="mp3")
            print(f"Exported {os.path.join(pluck_dir, note_name)}")

    except Exception as e:
        print(f"Error processing audio: {str(e)}")

def main():
    # Get audio filename from user
    print("\nAudio file should be in the same directory as this script.")
    audio_filename = input("Enter the audio filename (e.g. g_string.mp3): ")
    audio_path = os.path.join(SCRIPT_DIR, audio_filename)
    
    # Check if file exists
    if not os.path.exists(audio_path):
        print(f"Error: File '{audio_filename}' not found in {SCRIPT_DIR}")
        return
    
    print("\nSelect the violin string (0 = E, 1 = A, 2 = D, 3 = G):")
    try:
        string_choice = int(input("Enter the string number: "))
        
        if 0 <= string_choice <= 3:
            split_notes(audio_path, string_choice)
        else:
            print("Invalid choice. Please select a number between 0 and 3.")
    except ValueError:
        print("Please enter a valid number (0-3)")

if __name__ == "__main__":
    main()
