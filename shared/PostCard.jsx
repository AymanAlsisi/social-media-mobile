import { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import axios from 'axios'
import { IconBtn } from "../components"
import { getCurrentTime, timeAgo } from "../assets/time/time"
import { protocols } from '../api/protocols'

const PostCard = ({ data, my_id, openShareModal, setShareData }) => {
    const [post, setPost] = useState(null)

    const handleLike = () => {
        axios.post(`${protocols.http}/like`, JSON.stringify({
            user_id: my_id,
            post_id: post.id
        }))

        if (post.color === "crimson") {
            setPost(prev => ({
                ...prev,
                color: 'white',
                count: prev.count - 1,
                icon: 'heart-outline'
            }))
        } else {
            setPost(prev => ({
                ...prev,
                color: 'crimson',
                count: prev.count + 1,
                icon: 'heart'
            }))
        }
    }

    useEffect(() => {
        setPost({
            ...data,
            icon: data.like_state ? 'heart' : 'heart-outline',
            color: data.like_state ? 'crimson' : 'white',
            count: data.like
        })
    }, [])

    if (!post) return null

    return (
        <SafeAreaView className='my-2'>
            <View className='flex-col gap-y-2 p-2'>
                <TouchableOpacity onPress={() => router.push(`profile/${post.user.id}`)} className='flex-row items-center gap-x-3'>
                    <Image
                        source={{
                            uri: post.user.img_url
                        }}
                        resizeMode='contain'
                        className='w-10 h-10 rounded-full'
                    />
                    <View className='flex-col'>
                        <Text className='text-white font-[pmd]'>{post.user.username}</Text>
                        <Text className='text-grey font-[pr] text-[11px]'>{timeAgo(post.time)}</Text>
                    </View>
                </TouchableOpacity>
                {post.caption && <Text className='text-[16px] font-[pmd] text-white'>{post.caption}</Text>}
            </View>
            <Image
                source={{
                    uri: post.img_url
                }}
                resizeMode='cover'
                className='w-full h-[470px]'
            />
            <View className='flex-row items-center justify-between px-3 py-2'>
                <View className='flex-row items-center gap-x-1'>
                    <IconBtn
                        name={post.icon}
                        size={25}
                        color={post.color}
                        action={handleLike}
                    />
                    <Text className='text-white text-lg font-[pr]'>{post.count}</Text>
                </View>
                <IconBtn
                    name={'share'}
                    size={25}
                    color={'white'}
                    action={() => {
                        new Promise((resolve, reject) => {
                            setShareData({
                                sender: my_id,
                                content: post.caption,
                                time: getCurrentTime(),
                                img_url: post.img_url,
                                link: `/post/${post.id}`,
                                post_id: post.id
                            })
                            resolve()
                        }).then(() => openShareModal())
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default PostCard