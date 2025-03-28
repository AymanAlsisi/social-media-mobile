import { TouchableOpacity, Text, Image, FlatList } from 'react-native'
import { router } from 'expo-router'
import axios from 'axios'
import { protocols } from '../api/protocols'

const RoomsSearch = ({ search, users, my_id, config }) => {
  const goToRoom = (user_id) => {
    axios.get(`${protocols.http}/room/${user_id}`, config)
      .then(res => router.push(`direct/${res.data.room_id}`))
  }
  if (search && users.length === 0) return <Text className='p-3 text-white font-[pmd] text-lg'>No user found.</Text>
  return (
    <FlatList
      scrollEnabled
      data={users}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        if (item.id === my_id) return null
        return (
          <TouchableOpacity className='flex-row items-center gap-x-4 p-3' onPress={() => goToRoom(item.id)}>
            <Image
              source={{
                uri: item.img_url
              }}
              resizeMode='contain'
              className='w-[60px] h-[60px] rounded-full'
            />
            <Text className='font-[pmd] text-lg text-white'>{item.username}</Text>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default RoomsSearch