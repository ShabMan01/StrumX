


'use client'

import { useState, useRef, useCallback } from 'react'
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
  soundType: 'pluck' | 'sustain' | 'vibrato';
}

export function ViolinButton({ note, mainString, position, isOpenString, color, soundType }: ViolinButtonProps) {
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

    // Stop any currently playing audio
    if (audioRef.current) {
      stopAudio(audioRef.current)
    }
    
    // Play the audio with the selected sound type
    audioRef.current = playAudio(mainString, note, soundType)
    
    console.log(`String ${mainString} Button ${note} at position ${position.row},${position.col} was tapped with sound type: ${soundType}`)
  }, [note, position, mainString, soundType])

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isPressed || touchStartY.current === null) return

    const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = touchStartY.current - currentY

    // Only handle significant vertical movements if you want to keep some gesture functionality
    if (deltaY > 20) {
      console.log(`String ${mainString} Button ${note} at position ${position.row},${position.col} was dragged up`)
      touchStartY.current = null // Reset to prevent multiple triggers
    }
  }, [isPressed, note, position, mainString])

  const handleTouchEnd = useCallback(() => {
    if (isPressed) {
      console.log(`String ${mainString} Button ${note} at position ${position.row},${position.col} was released`)
      
      // Only stop the audio for sustain and vibrato sounds
      // Let pluck sounds play to completion
      if (audioRef.current && (soundType === 'sustain' || soundType === 'vibrato')) {
        stopAudio(audioRef.current)
      }
    }

    setIsPressed(false)
    touchStartY.current = null
  }, [isPressed, note, position, mainString, soundType])

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