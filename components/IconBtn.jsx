import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const IconBtn = ({ name, size, color, action, style }) => {
    return (
        <Pressable className='items-center' style={style} onPress={action}>
            <Ionicons
                name={name}
                size={size}
                color={color}
            />
        </Pressable>
    )
}

export default IconBtn