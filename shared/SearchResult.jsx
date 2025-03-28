import { Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SearchResult = ({ search, users, my_id, search_history, setSearchHistory }) => {
  const onPressOnUser = async (user, user_id) => {
    setSearchHistory(prev => [...prev, user])
    await AsyncStorage.setItem('search_history', JSON.stringify([...search_history, user]))
    router.push(`profile/${user_id}`)
  }
  return (
    <FlatList
      scrollEnabled
      data={users}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <Text className='text-white text-xl py-1 font-[pmd]'>Result for searching "{search}"</Text>}
      renderItem={({ item }) => {
        if (item.id === my_id) return null
        return (
          <TouchableOpacity className='flex-row items-center gap-x-3 p-3 w-full' onPress={() => onPressOnUser(item, item.id)}>
            <Image
              source={{
                uri: item.img_url
              }}
              resizeMode='contain'
              className='w-12 h-12 rounded-full'
            />
            <Text className='text-white font-[pr] text-lg'>{item.username}</Text>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default SearchResult