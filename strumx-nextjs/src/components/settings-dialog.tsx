'use client'

import { useState, useEffect, useMemo } from 'react'
import { Settings, ColorPreset } from '../types/settings'

const DEFAULT_COLORS: ColorPreset['colors'] = {
    C: "#f87171",
    CsDb: "#fb923c",
    D: "#fbbf24",
    DsEb: "#a3e635",
    E: "#34d399",
    F: "#22d3ee",
    FsGb: "#60a5fa",
    G: "#818cf8",
    GsAb: "#c084fc",
    A: "#e879f9",
    AsBb: "#fca5a5",
    B: "#fde68a"
}

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
}

const NOTE_MAP: { [key: string]: string } = {
    'CsDb': 'C#/Db',
    'DsEb': 'D#/Eb',
    'FsGb': 'F#/Gb',
    'GsAb': 'G#/Ab',
    'AsBb': 'A#/Bb'
};

const formatDisplayNote = (note: string): string => {
    return NOTE_MAP[note] || note;
};

const formatStorageNote = (displayNote: string): string => {
    // Reverse lookup in NOTE_MAP
    const entry = Object.entries(NOTE_MAP).find(([_, value]) => value === displayNote);
    return entry ? entry[0] : displayNote;
};

export function SettingsDialog({ isOpen, onClose, onSettingsChange }: { isOpen: boolean; onClose: () => void; onSettingsChange: (settings: Settings) => void }) {
    const [settings, setSettings] = useState<Settings>(() => {
        // Load settings from localStorage or use defaults
        const saved = localStorage.getItem('violinSettings')
        const defaultSettings: Settings = {
            selectedPreset: 'default',
            fadeDuration: 100,
            customColors: { ...DEFAULT_COLORS },  // Create a new copy
            showNoteNames: true  // Default to true
        }
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
    });
    const [showFeedback, setShowFeedback] = useState(false);
    
    const handleApply = () => {
        localStorage.setItem('violinSettings', JSON.stringify(settings));
        onSettingsChange(settings);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000); // Hide feedback after 2 seconds
    };

    // Remove the auto-save effect
    useEffect(() => {
        if (!isOpen) {
            setShowFeedback(false);
        }
    }, [isOpen]);

    // Simplify the presets array
    const presets: ColorPreset[] = [
        { name: 'default', colors: DEFAULT_COLORS },
        { name: 'monochrome', colors: MONOCHROME_COLORS },
        { name: 'custom', colors: settings.customColors }
    ];

    if (!isOpen) return null

    return (
        <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                
                {/* Color Preset Selection */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Color Preset</h3>
                    <div className="flex gap-4">
                        {presets.map(preset => (
                            <button
                                key={preset.name}
                                className={`px-4 py-2 rounded ${
                                    settings.selectedPreset === preset.name 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200'
                                }`}
                                onClick={() => setSettings({
                                    ...settings,
                                    selectedPreset: preset.name
                                })}
                            >
                                {preset.name.charAt(0).toUpperCase() + preset.name.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Colors (only shown when custom preset is selected) */}
                {settings.selectedPreset === 'custom' && (
                    <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {Object.entries(settings.customColors).map(([note, color]) => (
                            <div key={note} className="flex items-center gap-2">
                                <label className="w-20">{formatDisplayNote(note)}:</label>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        customColors: {
                                            ...settings.customColors,
                                            [formatStorageNote(note)]: e.target.value
                                        }
                                    })}
                                    className="w-20"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Add this section before the Fade Duration slider */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Display Options</h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.showNoteNames}
                            onChange={(e) => setSettings({
                                ...settings,
                                showNoteNames: e.target.checked
                            })}
                            className="w-4 h-4"
                        />
                        <span>Show note names</span>
                    </label>
                </div>

                {/* Fade Duration Slider */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Sustain Release Fade Duration</h3>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            value={settings.fadeDuration}
                            onChange={(e) => setSettings({
                                ...settings,
                                fadeDuration: Number(e.target.value)
                            })}
                            className="w-full"
                        />
                        <span className="w-20">{settings.fadeDuration}ms</span>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                    {showFeedback && (
                        <span className="text-green-600 animate-fade-in">
                            Settings applied successfully!
                        </span>
                    )}
                    <div className="flex gap-4 ml-auto">
                        <button
                            onClick={handleApply}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Apply
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}