import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const NoPosts = ({ screen }) => {
    return (
        <View className="flex-col p-3 gap-y-1 items-center justify-center">
            <Ionicons name='images-outline' color={'white'} size={80} />
            <Text className="text-white text-3xl font-[psemibold]">No posts yet</Text>
            {
                screen === 'home' && <View className="flex-col">
                    <Text className='text-white text-center text-lg font-[pr]'>No posts to show since you are not following any user, or the users you are following haven't made posts yet.</Text>
                    <TouchableOpacity className='px-3 py-2 bg-info rounded' onPress={() => router.push('search')}>
                        <Text className='text-secondary text-center text-lg font-[pmd]'>Find users</Text>
                    </TouchableOpacity>
                </View>
            }
        </View >
    )
}

export default NoPosts