import { useState, useEffect, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { toast } from '@backpackapp-io/react-native-toast';
import { CustomBottomSheet, IconBtn, Spiner } from "../components"
import { useStateProvider } from "../context/StateProvider"
import { protocols } from "../api/protocols"
import { app_colors } from "../assets/colors/colors"

const Update_profile = () => {
  const ImageChangeBS = useRef();
  const { token, user, setUser } = useStateProvider()

  const [form, setForm] = useState(null)

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
      ImageChangeBS.current.closeBS()
    }
  };
  const OpenCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
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
      ImageChangeBS.current.closeBS()
    }
  };

  const [isLoading, setIsLoading] = useState(true)

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const fetchProfileData = async () => {
    try {
      const res = await axios.get(`${protocols.http}/profile/${user.id}`, config)
      setForm({
        id: res.data.profile.id,
        img: res.data.profile.img_url,
        username: res.data.profile.username,
        bio: res.data.profile.bio
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const editProfileDetails = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await axios.put(`${protocols.http}/profile/${user.id}`, JSON.stringify({
        username: form.username,
        bio: form.bio,
        img: form.img
      }))
      setUser({
        id: user.id,
        img_url: res.data.img_url,
        username: res.data.username,
        state: true
      })
      AsyncStorage.setItem('user', JSON.stringify({
        id: user.id,
        img_url: res.data.img_url,
        username: res.data.username,
        state: true
      }))
      setIsLoading(false)
      router.push('profile')
      toast.success("Profile updated successfully!")
    } catch (error) {
      setIsLoading(false)
      toast.error("Couldn't update profile.")
    }
  }

  const removeProfileImage = async () => {
    try {
      setIsLoading(true)
      const res = await axios.delete(`${protocols.http}/profile/${user.id}`)
      AsyncStorage.setItem('user', JSON.stringify({
        id: user.id,
        img_url: res.data.img_url,
        username: res.data.username,
        state: true
      }))
      setForm(prev => ({
        ...prev,
        img: res.data.img_url
      }))
      setUser(prev => ({
        ...prev,
        img_url: res.data.img_url
      }))
      setIsLoading(false)
      toast.success("Profile picture was deleted.")
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      toast.error("Couldn't delete profile picture.")
    } finally {
      ImageChangeBS.current.closeBS()
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  if (isLoading) return <Spiner h={'100%'} size={80} />
  if (!form) return null

  return (
    <>
      <SafeAreaView className='px-3 py-6 gap-y-2 flex-col items-center'>
        <View className='flex-col gap-y-2 items-center'>
          <Image
            source={{
              uri: form.img
            }}
            resizeMode='contain'
            className='w-[150px] h-[150px] rounded-full'
          />
          <TouchableOpacity onPress={() => ImageChangeBS.current.openBS()}>
            <Text className='text-info text-lg font-[pmd]'>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-col w-full gap-y-1'>
          <Text className='text-white font-[pmd]'>Username</Text>
          <TextInput
            keyboardType='default'
            placeholder='Username'
            placeholderTextColor={app_colors.grey}
            onChangeText={e => setForm(prev => ({ ...prev, username: e }))}
            className='bg-secondary p-3 font-[pr] text-white w-full'
            value={form.username}
          />
        </View>
        <View className='flex-col w-full gap-y-1'>
          <Text className='text-white font-[pmd]'>Bio</Text>
          <TextInput
            keyboardType='default'
            placeholder='Bio'
            multiline
            style={{ verticalAlign: 'top' }}
            placeholderTextColor={app_colors.grey}
            onChangeText={e => setForm(prev => ({ ...prev, bio: e }))}
            className='bg-secondary p-3 font-[pr] text-white h-[100px] w-full'
            value={form.bio}
          />
        </View>
        <TouchableOpacity className='p-3 bg-info w-full rounded' onPress={editProfileDetails}>
          <Text className='text-secondary text-lg font-[pmd] text-center'>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <CustomBottomSheet ref={ImageChangeBS} >
        <View className='flex-col items-center w-full gap-y-1'>
          <View className='flex-row items-center justify-between py-2 px-3 w-full'>
            <Text className='text-lg text-white font-[pmd]'>Changing Profile Picture</Text>
            <IconBtn
              name={'close'}
              size={30}
              color={'white'}
              action={() => ImageChangeBS.current.closeBS()}
            />
          </View>
          <View className='flex-col items-center gap-y-2 w-full h-[150px]'>
            <TouchableOpacity className='' onPress={pickImage}>
              <Text className='text-info text-lg font-[pmd]'>Choose from gallary</Text>
            </TouchableOpacity>
            <TouchableOpacity className='' onPress={OpenCamera}>
              <Text className='text-info text-lg font-[pmd]'>Open camera</Text>
            </TouchableOpacity>
            <TouchableOpacity className='' onPress={removeProfileImage}>
              <Text className='text-danger text-lg font-[pmd]'>Remove Profile Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomBottomSheet>
    </>
  )
}

export default Update_profile