'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { playAudio, stopAudio } from '../utils/audio'

export interface ViolinButtonProps {
  note: string;
  mainString: string;
  position: {
    row: number;
    col: number;
  };
  isOpenString: boolean;
  color: string;
}

export function ViolinButton({ note, mainString, position, isOpenString, color }: ViolinButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const touchStartY = useRef<number | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    setIsPressed(true)
    if ('touches' in e) {
      touchStartY.current = e.touches[0].clientY
    } else {
      touchStartY.current = e.clientY
    }
    audioRef.current = playAudio(mainString, note, 'pluck')
    console.log(`Button ${note} at position ${position.row},${position.col} was tapped`)
  }, [note, position, mainString])

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isPressed || touchStartY.current === null) return

    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = touchStartY.current - currentY

    if (deltaY > 20) { // threshold for upward drag
      if (audioRef.current) {
        stopAudio(audioRef.current)
      }
      audioRef.current = playAudio(mainString, note, 'vibrato')
      console.log(`Button ${note} at position ${position.row},${position.col} was dragged up`)
      touchStartY.current = null // Reset to prevent multiple triggers
    }
  }, [isPressed, note, position, mainString])

  const handleTouchEnd = useCallback(() => {
    if (isPressed) {
      console.log(`Button ${note} at position ${position.row},${position.col} was released`)
      if (audioRef.current) {
        stopAudio(audioRef.current)
      }
    }
    setIsPressed(false)
    touchStartY.current = null
  }, [isPressed, note, position])

  useEffect(() => {
    let sustainTimeout: NodeJS.Timeout;
    if (isPressed) {
      sustainTimeout = setTimeout(() => {
        if (audioRef.current) {
          stopAudio(audioRef.current)
        }
        audioRef.current = playAudio(mainString, note, 'sustain')
      }, 200) // Start sustain after 200ms of being pressed
    }
    return () => {
      clearTimeout(sustainTimeout)
      if (audioRef.current) {
        stopAudio(audioRef.current)
      }
    }
  }, [isPressed, note, mainString])

  const buttonStyle = {
    backgroundColor: isPressed ? `${color}cc` : color,
  }

  return (
    <button
      ref={buttonRef}
      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full transition-colors flex items-center justify-center p-0.5 ${
        isPressed ? 'bg-blue-700' : isOpenString ? 'bg-blue-600' : 'bg-blue-500'
      } hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 touch-none`}
      style={buttonStyle}
      onTouchStart={handleTouchStart}
      onMouseDown={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <span className="text-white font-bold text-xs sm:text-sm leading-none break-words text-center">
        {note}
      </span>
    </button>
  )
}

