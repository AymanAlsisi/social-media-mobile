import { View, Text } from 'react-native'
import { IconBtn } from '@/components'
import { router } from 'expo-router'

const UpdateHeader = () => {
    return (
        <View className='flex-row items-center gap-x-4 bg-primary py-3 px-4 border-b border-grey-100'>
            <IconBtn
                name={'arrow-back'}
                color={'white'}
                size={30}
                action={() => router.back()}
            />
            <Text className='text-lg text-white font-[pmd]'>Edit Profile</Text>
        </View>
    )
}

export default UpdateHeader