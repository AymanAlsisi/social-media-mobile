import { router } from 'expo-router'
import { View, Text } from 'react-native'
import { IconBtn } from "../components"

const ChatsHeader = () => {
    return (
        <View className='p-3 flex-row items-center gap-x-5 bg-primary border-b border-grey-100'>
            <IconBtn name={'arrow-back'} color={'white'} size={25} action={() => router.back()} />
            <Text className='text-xl text-white font-[pmd]'>Messages</Text>
        </View>
    )
}

export default ChatsHeader