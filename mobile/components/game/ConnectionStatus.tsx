import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, spacing, fontSize } from '../../lib/theme'

interface Props {
  isConnected: boolean
  playerCount?: number
}

export function ConnectionStatus({ isConnected, playerCount }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, isConnected ? styles.dotConnected : styles.dotDisconnected]} />
      <Text style={[styles.text, isConnected ? styles.textConnected : styles.textDisconnected]}>
        {isConnected ? 'Connected' : 'Reconnecting...'}
      </Text>
      {playerCount !== undefined && (
        <Text style={styles.count}>{playerCount} player{playerCount !== 1 ? 's' : ''}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotConnected: {
    backgroundColor: colors.green,
  },
  dotDisconnected: {
    backgroundColor: colors.red,
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  textConnected: {
    color: colors.green,
  },
  textDisconnected: {
    color: colors.red,
  },
  count: {
    fontSize: fontSize.xs,
    color: colors.cream,
    opacity: 0.5,
    marginLeft: spacing.xs,
  },
})
