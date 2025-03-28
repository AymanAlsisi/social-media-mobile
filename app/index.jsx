import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { router } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import { app_colors } from '@/assets/colors/colors'

const Index = () => {
  const moveToTabs = () => {
    setTimeout(() => {
      router.push('home')
    }, 3000)
  }

  useEffect(() => {
    moveToTabs()
  }, [])
  return (
    <LinearGradient colors={[app_colors.info, app_colors.primary]} className='flex-1 items-center justify-center'>
      <View className='flex-row items-center'>
        <Ionicons name='flame' color={app_colors.secondary} size={25} />
        <Text className='text-secondary text-3xl font-[psemibold]'>Social</Text>
      </View>
    </LinearGradient>
  )
}

export default Index