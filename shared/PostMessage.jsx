import { TouchableOpacity, Text, Image } from 'react-native'
import { router } from 'expo-router'
import { getMessageTime } from '../assets/time/time'

const PostMessage = ({ data, my_id }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`${data.link}`)} className={`flex-col gap-y-1 w-[40%] p-1 rounded-lg ${data.sender === my_id ? "bg-grey self-end" : "bg-info self-start"}`}>
      <Text className='text-white font-[pr] opacity-[0.6]'>Tap to see post.</Text>
      <Image
        source={{
          uri: data.img_url
        }}
        resizeMode='cover'
        className='h-[100px] w-full opacity-[0.4]'
      />
      {data.content && <Text className="text-white font-[pr] text-[13px]">{data.content}</Text>}
      <Text className="text-white text-[11px] font-[pr] opacity-[0.6] self-end">{getMessageTime(data.time)}</Text>
    </TouchableOpacity>
  )
}

export default PostMessage