export interface ColorPreset {
    name: string;
    colors: {
        C: string;
        CsDb: string;
        D: string;
        DsEb: string;
        E: string;
        F: string;
        FsGb: string;
        G: string;
        GsAb: string;
        A: string;
        AsBb: string;
        B: string;
    };
}

export interface Settings {
    selectedPreset: string;
    fadeDuration: number;
    customColors: ColorPreset['colors'];
    showNoteNames: boolean;
}