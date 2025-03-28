import { View, ActivityIndicator } from 'react-native'
import { app_colors } from "../assets/colors/colors"

const Spiner = ({ h, size }) => {
    return (
        <View className='flex-col items-center justify-center bg-primary' style={{ height: h }}>
            <ActivityIndicator size={size} color={app_colors.info} />
        </View>
    )
}

export default Spiner