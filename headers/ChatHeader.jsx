import { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import axios from 'axios'
import { useStateProvider } from '@/context/StateProvider'
import { protocols } from '@/api/protocols'
import { IconBtn } from '@/components'

const ChatHeader = ({ room_id }) => {
  const { token, user } = useStateProvider()

  const profile_id = room_id.split('_').find(e => Number(e) !== user.id)

  const [profile, setProfile] = useState(null)

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const getProfile = async () => {
    try {
      const res = await axios.get(`${protocols.http}/profile/${profile_id}`, config)
      setProfile({
        id: res.data.profile.id,
        username: res.data.profile.username,
        img_url: res.data.profile.img_url,
        bio: res.data.profile.bio
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  if (!profile) return null
  return (
    <View className='flex-row items-center gap-x-5 p-3 border-b border-grey-100 bg-primary'>
      <IconBtn
        name={'arrow-back'}
        size={25}
        color={'white'}
        action={() => router.back()}
      />
      <TouchableOpacity className='flex-row items-center gap-x-3' onPress={() => router.push(`profile/${profile.id}`)}>
        <Image
          source={{
            uri: profile.img_url
          }}
          resizeMode='contain'
          className='w-10 h-10 rounded-full'
        />
        <View className='flex-col'>
          <Text className='text-white font-[pmd]'>{profile.username}</Text>
          {profile.bio && <Text className='text-grey font-[pr]'>{profile.bio.length <= 30 ? profile.bio : profile.bio.slice(0, 30) + "..."}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ChatHeader