import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const SHEET_COLS = 8
const SHEET_ROWS = 10
const CELL_W = 128
const CELL_H = 154
const SHEET_W = SHEET_COLS * CELL_W // 1024
const SHEET_H = SHEET_ROWS * CELL_H // 1540

const spriteSheet = require('../../assets/images/characters.png')

interface SpriteCharacterProps {
  col: number // 0-7
  row: number // 0-9
  size: number // display width in dp
}

export default function SpriteCharacter({ col, row, size }: SpriteCharacterProps) {
  const scale = size / CELL_W
  const displayH = CELL_H * scale

  return (
    <View style={{ width: size, height: displayH, overflow: 'hidden' }}>
      <Image
        source={spriteSheet}
        style={{
          width: SHEET_W * scale,
          height: SHEET_H * scale,
          position: 'absolute',
          left: -(col * CELL_W * scale),
          top: -(row * CELL_H * scale),
        }}
        resizeMode="cover"
      />
    </View>
  )
}
