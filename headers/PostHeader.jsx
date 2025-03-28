import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { IconBtn } from '@/components'

const PostHeader = () => {
    return (
        <View className='p-3 flex-row itms-center gap-x-5 bg-primary border-b border-grey-100'>
            <IconBtn
                name={'arrow-back'}
                size={30} color={'white'}
                action={() => router.back()}
            />
            <Text className='text-white text-xl font-[pmd]'>Post</Text>
        </View>
    )
}

export default PostHeader