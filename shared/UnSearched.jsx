import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const UnSearched = () => {
  return (
    <View className="flex-col items-center justify-center h-[70%] gap-y-1 w-full">
      <Ionicons name='search-circle' size={50} color='#FFF' />
      <Text className='text-white text-lg font-[pr] text-center'>Here you can find your friends.</Text>
      <Text className='text-white text-lg font-[pr] text-center'>Enter the username of the user you want correctlly.</Text>
    </View>
  )
}

export default UnSearched