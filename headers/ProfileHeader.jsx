import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { protocols } from '../api/protocols'
import { useStateProvider } from '../context/StateProvider'
import { IconBtn } from '../components'
import { router } from 'expo-router'

const ProfileHeader = ({ id }) => {
    const [username, setUsername] = useState(null)
    const { token } = useStateProvider()
    useEffect(() => {
        axios.get(`${protocols.http}/profile/${id}`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        }).then(res => setUsername(res.data.profile.username))
    }, [])

    if (!username) return null
    return (
        <View className='flex-row items-center gap-x-4 bg-primary py-3 px-4 border-b border-grey-100'>
            <IconBtn
                name={'arrow-back'}
                color={'white'}
                size={30}
                action={() => router.back()}
            />
            <Text className='text-lg text-white font-[pmd]'>{username}</Text>
        </View>
    )
}

export default ProfileHeader