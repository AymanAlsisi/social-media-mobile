import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { IconBtn } from '../components'

const SearchHistory = ({ data, setSearchHistory }) => {
  const onClearData = async () => {
    await AsyncStorage.removeItem('search_history')
    setSearchHistory([])
  }

  const onRemoveItem = async (index) => {
    data.splice(index, 1)
    await AsyncStorage.setItem('search_history', JSON.stringify(data))
    setSearchHistory(data)
  }

  return (
    <FlatList
      scrollEnabled
      data={data}
      keyExtractor={(item, i) => i}
      ListHeaderComponent={() => {
        return (
          <View className='p-2 flex-row items-center justify-between'>
            <Text className='text-white text-xl font-[pmd]'>Search History</Text>
            <TouchableOpacity onPress={onClearData}>
              <Text className='text-info text-lg font-[pmd]'>Clear all</Text>
            </TouchableOpacity>
          </View>
        )
      }}
      renderItem={({ item, index }) => {
        return (
          <View className='flex-row items-center justify-between p-3 w-full'>
            <TouchableOpacity className='flex-row items-center w-[90%] gap-x-3' onPress={() => router.push(`profile/${item.id}`)}>
              <Image
                source={{
                  uri: item.img_url
                }}
                resizeMode='contain'
                className='w-12 h-12 rounded-full'
              />
              <Text className='text-white font-[pr] text-lg'>{item.username}</Text>
            </TouchableOpacity>
            <IconBtn
              name={'close'}
              size={30}
              color={'white'}
              action={() => onRemoveItem(index)}
            />
          </View>
        )
      }}
    />
  )
}

export default SearchHistory