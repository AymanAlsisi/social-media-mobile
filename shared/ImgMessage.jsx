import { Text, Image, TouchableOpacity } from 'react-native'
import { getMessageTime } from '../assets/time/time'

const ImgMessage = ({ data, my_id, viewImage }) => {
  return (
    <TouchableOpacity
      className={`flex-col rounded-lg p-1 w-[45%] gap-y-1 ${data.sender === my_id ? 'bg-grey self-end' : 'bg-info self-start'}`}
      onPress={viewImage}
    >
      <Image
        source={{
          uri: data.img_url
        }}
        resizeMode='cover'
        className='w-full h-[150px]'
      />
      {data.content && <Text className="text-white font-[pr] text-[13px]">{data.content}</Text>}
      <Text className="text-white font-[pr] text-[11px] self-end opacity-[0.6]">{getMessageTime(data.time)}</Text>
    </TouchableOpacity>
  )
}

export default ImgMessage