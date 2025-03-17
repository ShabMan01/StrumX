'use client'

import { useState, useCallback } from 'react'
import { ViolinButton } from './violin-button'
import { SettingsDialog } from './settings-dialog'
import { Settings, ColorPreset } from '../types/settings'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

interface NoteInfo {
    note: string;
    color: string;
}

const noteColor_C    = "#f87171"
const noteColor_CsDb = "#fb923c"
const noteColor_D    = "#fbbf24"
const noteColor_DsEb = "#a3e635"
const noteColor_E    = "#34d399"
const noteColor_F    = "#22d3ee"
const noteColor_FsGb = "#60a5fa"
const noteColor_G    = "#818cf8"
const noteColor_GsAb = "#c084fc"
const noteColor_A    = "#e879f9"
const noteColor_AsBb = "#fca5a5"
const noteColor_B    = "#fde68a"

const DEFAULT_COLORS: ColorPreset['colors'] = {
    C: noteColor_C,
    CsDb: noteColor_CsDb,
    D: noteColor_D,
    DsEb: noteColor_DsEb,
    E: noteColor_E,
    F: noteColor_F,
    FsGb: noteColor_FsGb,
    G: noteColor_G,
    GsAb: noteColor_GsAb,
    A: noteColor_A,
    AsBb: noteColor_AsBb,
    B: noteColor_B
};

const MONOCHROME_COLORS: ColorPreset['colors'] = {
    C: "#000000",
    CsDb: "#000000",
    D: "#000000",
    DsEb: "#000000",
    E: "#000000",
    F: "#000000",
    FsGb: "#000000",
    G: "#000000",
    GsAb: "#000000",
    A: "#000000",
    AsBb: "#000000",
    B: "#000000"
};

const NOTES_MATRIX: NoteInfo[][] = [
    [
      { note: "E",     color: noteColor_E    },
      { note: "F",     color: noteColor_F    },
      { note: "Fs/Gb", color: noteColor_FsGb },
      { note: "G",     color: noteColor_G    },
      { note: "Gs/Ab", color: noteColor_GsAb },
      { note: "A",     color: noteColor_A    },
      { note: "As/Bb", color: noteColor_AsBb },
      { note: "B",     color: noteColor_B    }
    ],
    [
      { note: "A",     color: noteColor_A    },
      { note: "As/Bb", color: noteColor_AsBb },
      { note: "B",     color: noteColor_B    },
      { note: "C",     color: noteColor_C    },
      { note: "Cs/Db", color: noteColor_CsDb },
      { note: "D",     color: noteColor_D    },
      { note: "Ds/Eb", color: noteColor_DsEb },
      { note: "E",     color: noteColor_E    }
    ],
    [
      { note: "D",     color: noteColor_D    },
      { note: "Ds/Eb", color: noteColor_DsEb },
      { note: "E",     color: noteColor_E    },
      { note: "F",     color: noteColor_F    },
      { note: "Fs/Gb", color: noteColor_FsGb },
      { note: "G",     color: noteColor_G    },
      { note: "Gs/Ab", color: noteColor_GsAb },
      { note: "A",     color: noteColor_A    }
    ],
    [
      { note: "G",     color: noteColor_G    },
      { note: "Gs/Ab", color: noteColor_GsAb },
      { note: "A",     color: noteColor_A    },
      { note: "As/Bb", color: noteColor_AsBb },
      { note: "B",     color: noteColor_B    },
      { note: "C",     color: noteColor_C    },
      { note: "Cs/Db", color: noteColor_CsDb },
      { note: "D",     color: noteColor_D    }
    ]
]

const MAIN_STRINGS = ["E", "A", "D", "G"]

const NOTE_TO_COLOR_KEY: { [key: string]: string } = {
    "E": "E",
    "F": "F",
    "Fs/Gb": "FsGb",
    "G": "G",
    "Gs/Ab": "GsAb",
    "A": "A",
    "As/Bb": "AsBb",
    "B": "B",
    "C": "C",
    "Cs/Db": "CsDb",
    "D": "D",
    "Ds/Eb": "DsEb"
};

export function ViolinFingerboard() {
    const [soundType, setSoundType] = useState<'pluck' | 'sustain' | 'vibrato'>('pluck')
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('violinSettings')
        return saved ? JSON.parse(saved) : {
            selectedPreset: 'default',
            fadeDuration: 100,
            customColors: { ...DEFAULT_COLORS },
            showNoteNames: true
        }
    })

    const handleSettingsChange = useCallback((newSettings: Settings) => {
        setSettings(newSettings)
        // Update the fade duration in the audio utility
        window.FADE_DURATION = newSettings.fadeDuration
    }, [])

    // Get the current color set based on selected preset
    const getCurrentColors = (noteKey: string): string => {
        const colorKey = NOTE_TO_COLOR_KEY[noteKey];
        if (!colorKey) {
            console.warn(`No color mapping found for note: ${noteKey}`);
            return DEFAULT_COLORS.E; // Fallback color
        }

        const { selectedPreset, customColors } = settings;
        switch (selectedPreset) {
            case 'monochrome':
                return MONOCHROME_COLORS[colorKey as keyof typeof DEFAULT_COLORS];
            case 'custom':
                return customColors[colorKey as keyof typeof DEFAULT_COLORS] || DEFAULT_COLORS[colorKey as keyof typeof DEFAULT_COLORS];
            default:
                return DEFAULT_COLORS[colorKey as keyof typeof DEFAULT_COLORS];
        }
    };

    // Update NOTES_MATRIX to use dynamic colors
    const getNotesMatrix = () => NOTES_MATRIX.map(row => 
        row.map(noteInfo => ({
            ...noteInfo,
            color: getCurrentColors(noteInfo.note)
        }))
    );

    return (
        <div className="p-4 w-full max-w-7xl mx-auto select-none">
            <div className="mb-6 flex justify-center items-center">
                <div className="flex items-center gap-4">
                    {['pluck', 'sustain'/*, 'vibrato'*/].map((type) => (
                        <label 
                            key={type} 
                            className={`
                                cursor-pointer flex items-center p-2 px-4 rounded-full
                                ${soundType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}
                                transition-colors
                            `}
                        >
                            <input
                                type="radio"
                                name="soundType"
                                value={type}
                                checked={soundType === type}
                                onChange={() => setSoundType(type as 'pluck' | 'sustain' | 'vibrato')}
                                className="sr-only"
                            />
                            <span className="capitalize">{type}</span>
                        </label>
                    ))}

                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <Cog6ToothIcon className="text-black w-6 h-6" />
                    </button>
                </div>
            </div>

            <div 
                className="relative bg-amber-800 p-6 sm:p-8 rounded-lg overflow-hidden"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        to bottom,
                        transparent,
                        transparent 82px,
                        white 82px,
                        white 84px
                    )`
                }}
            >
                <div className="grid gap-y-4 sm:gap-y-8">
                    {getNotesMatrix().map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-between relative">
                            {row.map((noteInfo, colIndex) => (
                                <ViolinButton
                                    key={`${rowIndex}-${colIndex}`}
                                    note={noteInfo.note}
                                    mainString={MAIN_STRINGS[rowIndex]}
                                    position={{ row: rowIndex, col: colIndex }}
                                    isOpenString={colIndex === 0}
                                    color={noteInfo.color}
                                    soundType={soundType}
                                    showNoteName={settings.showNoteNames}
                                />
                            ))}
                            {(
                                <div 
                                    className="absolute top-0 bottom-0 left-[calc(10%_-_1px)] w-1 bg-gray-300 opacity-50"
                                    style={{ boxShadow: '0 0 5px rgba(255,255,255,0.5)' }}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <SettingsDialog
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onSettingsChange={handleSettingsChange}
            />
        </div>
    )
}