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

const SignUp = () => {
  const [firstPasswordIsVisible, setFirstPasswordIsVisible] = useState(true)
  const [secPasswordIsVisible, setSecPasswordIsVisible] = useState(true)

  const { setUser, setToken } = useStateProvider()

  const [form, setForm] = useState({
    username: '',
    email: '',
    firstPass: '',
    secPass: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const signIn = async (data) => {
    try {
      const res = await axios.post(`${protocols.http}/signin`, data)
      setToken(res.data.token)
      setUser(res.data.profile)
      await AsyncStorage.setItem('token', res.data.token)
      await AsyncStorage.setItem('user', JSON.stringify(res.data.profile))
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      toast.error("Account created, but failed to sign in, try sign in")
    }
  }

  const createAccount = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${protocols.http}/signup`, form)
      await signIn({ email: form.email, password: form.secPass })
      setIsLoading(false)
      router.push('home')
      toast.success(`Welcome, ${form.username}`)
    } catch (error) {
      setIsLoading(false)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage("An expected error occured, please try again.")
      }
      toast.error("Failed to sign up")
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
        <Text className='text-white font-[psemibold] text-2xl'>Sign-Up Form</Text>
        <Text className='text-white text-center px-2 font-[pr] text-xl'>Please enter your details correctly.</Text>
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
            keyboardType='default'
            placeholder='Username'
            placeholderTextColor={app_colors.grey}
            className='w-full text-white font-[pr]'
            onChangeText={e => setForm(prev => ({ ...prev, username: e }))}
          />
        </View>
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
            placeholder='Create a password'
            placeholderTextColor={app_colors.grey}
            className='w-[90%] text-white font-[pr]'
            onChangeText={e => setForm(prev => ({ ...prev, firstPass: e }))}
            secureTextEntry={firstPasswordIsVisible}
          />
          <IconBtn
            name={firstPasswordIsVisible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={app_colors.grey}
            action={() => firstPasswordIsVisible ? setFirstPasswordIsVisible(false) : setFirstPasswordIsVisible(true)}
          />
        </View>
        <View className='py-2 px-3 bg-secondary w-full rounded flex-row items-center justify-between'>
          <TextInput
            keyboardType='default'
            placeholder='Confirm the password'
            placeholderTextColor={app_colors.grey}
            className='w-[90%] text-white font-[pr]'
            onChangeText={e => setForm(prev => ({ ...prev, secPass: e }))}
            secureTextEntry={secPasswordIsVisible}
          />
          <IconBtn
            name={secPasswordIsVisible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={app_colors.grey}
            action={() => secPasswordIsVisible ? setSecPasswordIsVisible(false) : setSecPasswordIsVisible(true)}
          />
        </View>
        <TouchableOpacity className='p-3 w-full bg-info rounded' onPress={createAccount}>
          <Text className='text-secondary text-xl font-[pmd] text-center'>Sign Up</Text>
        </TouchableOpacity>
        <View className='flex-row items-center gap-x-1'>
          <Text className='text-white text-lg font-[pr]'>Already have an acount?</Text>
          <Link href={'sign-in'} className='text-info text-lg font-[pr]'>Sign In</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp