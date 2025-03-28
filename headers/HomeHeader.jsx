import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { IconBtn } from '../components'

const HomeHeader = () => {
  return (
    <View className='flex-row border-b border-grey-100 p-3 items-center bg-primary justify-between'>
      <View className='flex-row items-center'>
        <Ionicons name='flame' color={'white'} size={22} />
        <Text className='text-white text-2xl font-[psemibold]'>Social</Text>
      </View>
      <IconBtn
        name={'chatbubbles-outline'}
        size={30}
        color={'white'}
        action={() => router.push('chats')}
      />
    </View>
  )
}

export default HomeHeader