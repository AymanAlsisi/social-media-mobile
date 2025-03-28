import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { IconBtn } from '@/components'

const MeHeader = ({ openLogOutModal }) => {
    return (
        <View className='flex-row py-3 px-5 items-center bg-primary justify-between border-b border-grey-100'>
            <Text className='text-white text-xl font-[pmd]'>Me</Text>
            <View className='flex-row items-center gap-x-4'>
                <IconBtn
                    name={'add-circle-outline'}
                    size={30}
                    color={'white'}
                    action={() => router.push('create')}
                />
                <IconBtn
                    name={'log-out-outline'}
                    size={30}
                    color={'white'}
                    action={openLogOutModal}
                />
            </View>
        </View>
    )
}

export default MeHeader