import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const EmptyChat = () => {
  return (
    <View className='flex-col gap-y-1 p-5 h-[87%] items-center justify-center'>
      <Ionicons name='chatbubbles-outline' size={80} color={'white'} />
      <Text className='text-white text-2xl font-[psemibold]'>No Messages currently</Text>
      <Text className='text-white text-lg font-[pr]'>Start the conversation</Text>
      <Ionicons name='arrow-down-circle' size={30} color={'white'} />
    </View>
  )
}

export default EmptyChat