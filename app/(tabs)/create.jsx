import { useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import { router } from 'expo-router'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { toast } from '@backpackapp-io/react-native-toast';
import { Ionicons } from '@expo/vector-icons'
import { IconBtn, Spiner } from "../../components"
import { useStateProvider } from "../../context/StateProvider"
import { protocols } from "../../api/protocols"
import { app_colors } from "../../assets/colors/colors"
import { getCurrentTime } from "../../assets/time/time"

const Create = () => {
  const { token } = useStateProvider()

  const [form, setForm] = useState({
    caption: '',
    img: ''
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setForm(prev => ({
        ...prev,
        img: `data:image/webp;base64,${result.assets[0].base64}`
      }));
    }
  };

  const [isLoading, setIsLoading] = useState(false)

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const createPost = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${protocols.http}/post`, { ...form, time: getCurrentTime(), post_type: 'post' }, config)
      setIsLoading(false)
      router.push('home')
      toast.success("Posted successfully!")
    } catch (error) {
      setIsLoading(false)
      toast.error("Couldn't make post.")
    } finally {
      setForm({
        img: '',
        caption: ''
      })
    }
  }

  if (isLoading) return <Spiner h={'100%'} size={80} />

  return (
    <SafeAreaView className='flex-1 bg-primary px-3 py-1 gap-y-3'>
      <TextInput
        className='h-[150px] w-full bg-secondary rounded text-white font-[pr] px-3 py-2'
        placeholder='Caption'
        placeholderTextColor={app_colors.grey}
        multiline={true}
        style={{ verticalAlign: 'top' }}
        value={form.caption}
        onChangeText={e => setForm(prev => ({ ...prev, caption: e }))}
      />
      <View>
        {
          form.img ? (
            <View className='h-[470px] w-full flex-col'>
              <IconBtn
                name={'close'}
                size={30}
                color={'white'}
                action={() => setForm(prev => ({ ...prev, img: '' }))}
                style={{ alignSelf: 'flex-end' }}
              />
              <Image
                source={{
                  uri: form.img
                }}
                className='w-full h-[445px]'
                resizeMode='cover'
              />
            </View>
          )
            : (
              <TouchableOpacity className='bg-secondary flex-col items-center justify-center h-[470px] w-full' onPress={pickImage}>
                <Ionicons name='image' size={36} color={app_colors.grey} />
                <Text className='text-grey font-[pr] text-xl'>Choose an image from gallary</Text>
                <Text className='text-grey font-[pr] text-xl'>JPG | PNG | SVG | HEIC</Text>
              </TouchableOpacity>
            )
        }
      </View>
      <TouchableOpacity className='w-full px-3 py-3 rounded bg-info' onPress={createPost}>
        <Text className='text-secondary font-[pmd] text-lg text-center'>Submit Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Create