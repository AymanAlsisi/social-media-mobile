import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator, Keyboard } from 'react-native'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import { toast } from '@backpackapp-io/react-native-toast'
import { IconBtn } from '../components'
import { useStateProvider } from '../context/StateProvider'
import { protocols } from '../api/protocols'
import { app_colors } from '../assets/colors/colors'

const ShareCompnent = ({ closeModal, data }) => {
    const { user } = useStateProvider()

    const [search, setSearch] = useState(null)
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const searchForUsers = async (username) => {
        setSearch(username)
        try {
            setIsLoading(true)
            const res = await axios.get(`${protocols.http}/search?q=${username}`)
            setUsers(res.data.users)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const sharePost = async (receiver_id) => {
        try {
            const res = await axios.post(`${protocols.http}/share_post`, JSON.stringify({
                ...data,
                receiver: receiver_id
            }))
            closeModal()
            toast.success("Post was sent successfully!")
        } catch (error) {
            console.log(error)
            toast.error("Couldn't send post")
        }
    }
    return (
        <View className='flex-col items-start w-full px-2 gap-y-3 h-[700px]'>
            <View className='flex-row items-center justify-between w-full px-2'>
                <Text className='text-white text-xl font-[pmd]'>Search for users</Text>
                <IconBtn name={'close'} size={30} color={'white'} action={() => {
                    setSearch(null)
                    setUsers([])
                    Keyboard.dismiss()
                    closeModal()
                }} />
            </View>
            <View className='flex-row items-center justify-between px-3 py-2 rounded-xl bg-secondary'>
                <TextInput
                    keyboardType='default'
                    placeholder='Search...'
                    placeholderTextColor={app_colors.grey}
                    style={{ width: '90%', color: 'white', fontFamily: 'pr' }}
                    onChangeText={e => searchForUsers(e)}
                />
                <Ionicons name='search' size={22} color={app_colors.grey} />
            </View>
            {
                isLoading ? <View className='h-[70%] w-full flex-col items-center justify-center'>
                    <ActivityIndicator size={60} color={app_colors.info} />
                </View>
                        : search && users.length === 0 ? (
                            <View className='p-3'>
                                <Text className='text-white text-lg font-[pr]'>User not found.</Text>
                            </View>
                        )
                            : search === "" ? null
                                :
                                (
                                    <FlatList
                                        scrollEnabled
                                        data={users}
                                        keyExtractor={(item, i) => `${i}`}
                                        renderItem={({ item }) => {
                                            if (item.id === user.id) return null
                                            return (
                                                <View className='flex-row items-center justify-between px-3 py-2 w-full'>
                                                    <View className='flex-row items-center gap-x-3'>
                                                        <Image
                                                            source={{
                                                                uri: item.img_url
                                                            }}
                                                            resizeMode='contain'
                                                            className='w-12 h-12 rounded-full'
                                                        />
                                                        <Text className='text-white text-lg font-[pr]'>{item.username}</Text>
                                                    </View>
                                                    <TouchableOpacity className='p-2 bg-info rounded' onPress={() => sharePost(item.id)}>
                                                        <Text className='text-secondary font-[pmd]'>Send</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }}
                                    />
                                )
            }
        </View>
    )
}

export default ShareCompnent