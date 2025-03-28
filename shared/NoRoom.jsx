import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const NoRoom = ({ text, h }) => {
  return (
    <View className='flex-col items-center p-5 justify-center' style={{ height: h }}>
      <Ionicons name='chatbubbles-outline' size={80} color={'white'} />
      <Text className='text-white text-2xl font-[pmd] text-center'>{text}</Text>
    </View>
  )
}

export default NoRoom