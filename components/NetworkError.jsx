import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons"

const NetworkError = ({ action, h }) => {
    return (
        <SafeAreaView className='bg-primary p-5 flex-col items-center justify-center gap-y-1' style={{ height: h }}>
            <Ionicons name='wifi' size={80} color={'white'} />
            <View className='flex-col'>
                <Text className='text-white text-center text-xl font-[psemibold]'>No internet connection</Text>
                <Text className='text-white text-center text-lg font-[pr]'>Please check your internet connection and try again.</Text>
                <TouchableOpacity className='p-3 bg-info rounded my-1' onPress={action}>
                    <Text className='text-secondary text-center text-lg font-[pmd]'>Reload Page</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NetworkError