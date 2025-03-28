import { View, SafeAreaView } from 'react-native'

const LoadingPost = () => {
    return (
        <SafeAreaView className='flex-col gap-y-2 py-1'>
            <View className='flex-col gap-y-1 px-2'>
                <View className='flex-row items-center gap-x-2'>
                    <View className='w-[50px] h-[50px] bg-grey rounded-full'></View>
                    <View className='flex-col w-full gap-y-1'>
                        <View className='h-[10px] w-[50%] bg-grey rounded'></View>
                        <View className='h-[10px] w-[30%] bg-grey rounded'></View>
                    </View>
                </View>
                <View className='h-[20px] w-[80%] bg-grey rounded'></View>
            </View>
            <View className='h-[500px] w-full bg-grey'></View>
        </SafeAreaView>
    )
}

export default LoadingPost