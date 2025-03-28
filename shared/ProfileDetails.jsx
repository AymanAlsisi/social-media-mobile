import { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import { router } from 'expo-router'
import axios from 'axios'
import { protocols } from '../api/protocols'
import { app_colors } from '../assets/colors/colors'

const ProfileDetails = ({ data, my_id, config }) => {
    const [item, setItem] = useState(null)

    const hanldeFollow = () => {
        axios.post(`${protocols.http}/follow`, JSON.stringify({
            user_id: item.id,
            follower_id: my_id
        }))

        if (item.btn.text === "Following") {
            setItem(prev => ({
                ...prev,
                followers: prev.followers - 1,
                btn: {
                    text: "Follow",
                    bg: app_colors.primary,
                    color: app_colors.info
                }
            }))
        } else {
            setItem(prev => ({
                ...prev,
                followers: prev.followers + 1,
                btn: {
                    text: "Following",
                    bg: app_colors.info,
                    color: app_colors.secondary
                }
            }))
        }
    }

    const getRoom = () => {
        axios.get(`${protocols.http}/room/${item.id}`, config)
            .then(res => router.push(`direct/${res.data.room_id}`))
    }

    useEffect(() => {
        setItem({
            ...data,
            followers: data.followers,
            btn: {
                text: data.following ? "Following" : "Follow",
                bg: data.following ? app_colors.info : app_colors.primary,
                color: data.following ? app_colors.secondary : app_colors.info
            }
        })
    }, [])
    if (!item) return null;
    return (
        <SafeAreaView className='py-4'>
            <View className='flex-row items-center justify-around'>
                <Image
                    source={{
                        uri: item.img_url
                    }}
                    resizeMode='contain'
                    className='w-[100px] h-[100px] rounded-full'
                />
                <View className='flex-col items-center'>
                    <Text className='text-white text-lg font-[pr] text-[16px]'>{item.posts}</Text>
                    <Text className='text-white text-lg font-[pr] text-[16px]'>Post</Text>
                </View>
                <View className='flex-col items-center'>
                    <Text className='text-white text-lg font-[pr] text-[16px]'>{item.followers}</Text>
                    <Text className='text-white text-lg font-[pr] text-[16px]'>Followers</Text>
                </View>
                <View className='flex-col items-center'>
                    <Text className='text-white text-lg font-[pr] text-[16px]'>{item.follows}</Text>
                    <Text className='text-white text-lg font-[pr] text-[16px]'>Following</Text>
                </View>
            </View>
            <View className='px-3 flex-col'>
                <Text className='text-white text-[26px] font-[psemibold]'>{item.username}</Text>
                <Text className='text-white text-[15px] font-[pmd]'>{item.email}</Text>
                {item.bio && <Text className='text-white text-[18px] font-[pr]'>{item.bio}</Text>}
            </View>
            <View className='flex-row w-full px-3 gap-x-1'>
                {item.state && <TouchableOpacity className='py-1 px-3 w-full bg-grey rounded' onPress={() => router.push('update-profile')}>
                    <Text className='text-secondary text-lg font-[pmd] text-center'>Edit Profile</Text>
                </TouchableOpacity>}
                {!item.state && <TouchableOpacity className='py-1 px-3 w-[50%] bg-grey rounded border border-info' onPress={hanldeFollow} style={{ backgroundColor: item.btn.bg }}>
                    <Text className='text-secondary text-lg font-[pmd] text-center' style={{ color: item.btn.color }}>{item.btn.text}</Text>
                </TouchableOpacity>}
                {!item.state && <TouchableOpacity className='py-1 px-3 w-[50%] bg-info rounded' onPress={getRoom}>
                    <Text className='text-secondary text-lg font-[pmd] text-center'>Message</Text>
                </TouchableOpacity>}
            </View>
        </SafeAreaView>
    )
}

export default ProfileDetails