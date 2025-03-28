import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const NotFound = ({ search }) => {
  return (
    <View className='flex-col items-center justify-center gap-y-1 h-[70%] w-full'>
      <Ionicons name='sad' size={50} color='#FFF' />
      <Text className='text-lg font-[pr] text-white text-center'>Your search "{search}" didn't match any username.</Text>
      <Text className='text-lg font-[pmd] text-white'>Suggestions:</Text>
      <View className='flex-col'>
        <View className='flex-row items-start gap-x-1'>
          <Ionicons name='information-circle' size={22} color={'white'} />
          <Text className='text-lg font-[pr] text-white'>Make sure that all words are spelled correctly.</Text>
        </View>
        <View className='flex-row items-start gap-x-1'>
          <Ionicons name='information-circle' size={22} color={'white'} />
          <Text className='text-lg font-[pr] text-white'>Try different keywords.</Text>
        </View>
        <View className='flex-row items-start gap-x-1'>
          <Ionicons name='information-circle' size={22} color={'white'} />
          <Text className='text-lg font-[pr] text-white'>Try more general keywords.</Text>
        </View>
      </View>
    </View>
  )
}

export default NotFound