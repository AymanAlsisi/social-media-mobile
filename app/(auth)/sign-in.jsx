import { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { toast } from '@backpackapp-io/react-native-toast';
import { Ionicons } from '@expo/vector-icons'
import { IconBtn, Spiner } from "../../components"
import { useStateProvider } from '../../context/StateProvider'
import { app_colors } from "../../assets/colors/colors"
import { protocols } from "../../api/protocols"

const SignIn = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(true)

  const { setUser, setToken } = useStateProvider()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const signIn = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${protocols.http}/signin`, form)
      setToken(res.data.token)
      setUser(res.data.profile)
      await AsyncStorage.setItem('token', res.data.token)
      await AsyncStorage.setItem('user', JSON.stringify(res.data.profile))
      setIsLoading(false)
      router.push('home')
      toast.success(`Welcome, ${res.data.profile.username}`)
    } catch (error) {
      setIsLoading(false)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage("An expected error occured, please try again.")
      }
      toast.error("Failed to sign in")
    }
  }
  if (isLoading) return <Spiner h={'100%'} size={80} />
  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-primary gap-y-1'>
      <View className='flex-row items-center'>
        <Ionicons name='flame' size={22} color={'white'} />
        <Text className='text-white font-[psemibold] text-2xl'>Social</Text>
      </View>
      <View className='flex-col items-center'>
        <Text className='text-white font-[psemibold] text-2xl'>Welcome Again</Text>
        <Text className='text-white text-center px-2 font-[pr] text-xl'>Please enter your account details correctly.</Text>
      </View>
      {
        errorMessage && <View className='w-[75%] p-2 border border-danger rounded flex-col items-center'>
          <Ionicons name='warning-outline' size={30} color={app_colors.danger} />
          <Text className='text-danger text-center text-lg font-[pmd]'>{errorMessage}</Text>
        </View>
      }
      <View className='flex-col items-center gap-y-1 w-[75%]'>
        <View className='py-2 px-3 bg-secondary w-full rounded'>
          <TextInput
            keyboardType='email-address'
            placeholder='Email'
            placeholderTextColor={app_colors.grey}
            className='w-full text-white font-[pr]'
            onChangeText={e => setForm(prev => ({ ...prev, email: e }))}
          />
        </View>
        <View className='py-2 px-3 bg-secondary w-full rounded flex-row items-center justify-between'>
          <TextInput
            keyboardType='default'
            placeholder='Password'
            placeholderTextColor={app_colors.grey}
            className='w-[90%] text-white font-[pr]'
            onChangeText={e => setForm(prev => ({ ...prev, password: e }))}
            secureTextEntry={passwordIsVisible}
          />
          <IconBtn
            name={passwordIsVisible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={app_colors.grey}
            action={() => passwordIsVisible ? setPasswordIsVisible(false) : setPasswordIsVisible(true)}
          />
        </View>
        <TouchableOpacity className='p-3 w-full bg-info rounded' onPress={signIn}>
          <Text className='text-secondary text-xl font-[pmd] text-center'>Sign In</Text>
        </TouchableOpacity>
        <View className='flex-row items-center gap-x-1'>
          <Text className='text-white text-lg font-[pr]'>Don't have an acount?</Text>
          <Link href={'sign-up'} className='text-info text-lg font-[pr]'>Sign Up</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignIn