'use client'

import { ViolinButton } from './violin-button'

// const NOTES_MATRIX = [
//   ["E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"],
//   ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E"],
//   ["D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A"],
//   ["G", "G#/Ab", "A", "A#/Bb", "B", "C", "C#/Db", "D"]
// ]


interface NoteInfo
{
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


const NOTES_MATRIX: NoteInfo[][] = [
    [
      { note: "E",      color: noteColor_E    },
      { note: "F",      color: noteColor_F    },
      { note: "F#/Gb",  color: noteColor_FsGb },
      { note: "G",      color: noteColor_G    },
      { note: "G#/Ab",  color: noteColor_GsAb },
      { note: "A",      color: noteColor_A    },
      { note: "A#/Bb",  color: noteColor_AsBb },
      { note: "B",      color: noteColor_B    }
    ],
    [
      { note: "A",      color: noteColor_A    },
      { note: "A#/Bb",  color: noteColor_AsBb },
      { note: "B",      color: noteColor_B    },
      { note: "C",      color: noteColor_C    },
      { note: "C#/Db",  color: noteColor_CsDb },
      { note: "D",      color: noteColor_D    },
      { note: "D#/Eb",  color: noteColor_DsEb },
      { note: "E",      color: noteColor_E    }
    ],
    [
      { note: "D",      color: noteColor_D    },
      { note: "D#/Eb",  color: noteColor_DsEb },
      { note: "E",      color: noteColor_E    },
      { note: "F",      color: noteColor_F    },
      { note: "F#/Gb",  color: noteColor_FsGb },
      { note: "G",      color: noteColor_G    },
      { note: "G#/Ab",  color: noteColor_GsAb },
      { note: "A",      color: noteColor_A    }
    ],
    [
      { note: "G",      color: noteColor_G    },
      { note: "G#/Ab",  color: noteColor_GsAb },
      { note: "A",      color: noteColor_A    },
      { note: "A#/Bb",  color: noteColor_AsBb },
      { note: "B",      color: noteColor_B    },
      { note: "C",      color: noteColor_C    },
      { note: "C#/Db",  color: noteColor_CsDb },
      { note: "D",      color: noteColor_D    }
    ]
  ]

const MAIN_STRINGS = ["E", "A", "D", "G"]

export function ViolinFingerboard() {
  return (
    <div className="p-4 w-full max-w-7xl mx-auto select-none">
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
          {NOTES_MATRIX.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-between relative">
              {row.map((noteInfo, colIndex) => (
                <ViolinButton
                    key={`${rowIndex}-${colIndex}`}
                    note={noteInfo.note}
                    mainString={MAIN_STRINGS[rowIndex]}
                    position={{ row: rowIndex, col: colIndex }}
                    isOpenString={colIndex === 0}
                    color={noteInfo.color}
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
    </div>
  )
}

