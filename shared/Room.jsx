import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { IconBtn } from '../components'
import Chat from './Chat'
import ImageSelector from "./ImageSelector"
import { getCurrentTime } from '../assets/time/time'
import { app_colors } from '../assets/colors/colors'

const Room = ({ socket, my_id, user_id, profile }) => {
  const [form, setForm] = useState({
    text: '',
    img: ''
  })

  const [messages, setMessages] = useState([])

  const [isSendingImage, setIsSendingImage] = useState(false)

  const sendMessage = () => {
    if (form.text || form.img) {
      if (form.img) setIsSendingImage(true)
      socket.send(JSON.stringify({
        sender: my_id,
        receiver: user_id,
        content: form.text,
        img: form.img,
        time: getCurrentTime()
      }))
      setForm({
        img: '',
        text: ''
      })
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setForm(prev => ({
        ...prev,
        img: `data:image/webp;base64,${result.assets[0].base64}`
      }));
    }
  };

  useEffect(() => {
    socket.addEventListener('message', (event) => {
      const received = JSON.parse(event.data)
      if (received.type === "initial") {
        setMessages(received.messages)
      } else {
        setMessages(prev => [...prev, received])
        setIsSendingImage(false)
      }
    })
  }, [])

  if (form.img) return <ImageSelector setForm={setForm} form={form} sendMessage={sendMessage} />

  return (
    <>
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
      <Chat data={messages} my_id={my_id} isSendingImage={isSendingImage} />
      <View className='flex-row items-center justify-between px-2 py-3 rounded-[20px] border border-grey-100 bg-secondary m-2'>
        <TextInput
          keyboardType='default'
          multiline
          verticalAlign='top'
          placeholder='Message...'
          placeholderTextColor={app_colors.grey}
          autoFocus
          value={form.text}
          onChangeText={e => setForm(prev => ({ ...prev, text: e }))}
          className='w-[80%] text-white font-[pr]'
        />
        <View className='flex-row items-center gap-x-3'>
          {!form.text && <IconBtn
            name={'image'}
            size={25}
            color={'white'}
            action={pickImage}
          />}
          <IconBtn
            name={'send'}
            size={25}
            color={'white'}
            action={sendMessage}
          />
        </View>
      </View>
    </>
  )
}

export default Room