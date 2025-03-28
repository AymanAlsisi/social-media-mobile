import { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import axios from 'axios'
import { protocols } from "../api/protocols"
import { timeAgo } from "../assets/time/time"

const UserRoom = ({ data, config, my_id, socket }) => {
  const [item, setItem] = useState(null)

  const goToRoom = () => {
    axios.get(`${protocols.http}/room/${data.id}`, config)
      .then(res => router.push(`direct/${res.data.room_id}`))
  }

  useEffect(() => {
    setItem(data)
    socket.addEventListener('message', (event) => {
      const received = JSON.parse(event.data)
      if (received.type === "last_message") {
        if (data.id === received.id) {
          setItem({ ...received })
        }
      }
    })
  }, [])

  if (!item) return null

  return (
    <TouchableOpacity className='flex-row items-center justify-between p-3' onPress={goToRoom}>
      <View className='flex-row items-center gap-x-4'>
        <Image
          source={{
            uri: item.img_url
          }}
          resizeMode='contain'
          className='w-[60px] h-[60px] rounded-full'
        />
        <View>
          <Text className='font-[pmd] text-lg text-white'>{item.username}</Text>
          <Text className='font-[pr] text-grey'>
            {my_id === item.sender ? "You: " : ""}{item.link && !item.m_img_url ? 'Shared a post' : !item.link && item.m_img_url ? 'Sent an image' : item.last_message.length >= 20 ? item.last_message.slice(0, 24) + "..." : item.last_message}
          </Text>
        </View>
      </View>
      <Text className='text-grey text-[13px] font-[pr]'>{timeAgo(item.time)}</Text>
    </TouchableOpacity>
  )
}

export default UserRoom