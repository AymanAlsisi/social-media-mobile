import { View, Text } from 'react-native'
import { getMessageTime } from '../assets/time/time'

const TextMessage = ({ data, my_id }) => {
  return (
    <View className={`flex-col p-2 max-w-[60%] rounded-lg ${data.sender === my_id ? 'bg-grey self-end' : 'bg-info self-start'}`}>
      <Text className="font-[pr] text-[13px] text-white">{data.content}</Text>
      <Text className="text-white text-[11px] font-[pr] opacity-[0.6] self-end">{getMessageTime(data.time)}</Text>
    </View>
  )
}

export default TextMessage