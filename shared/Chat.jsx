import { ActivityIndicator, FlatList, View } from 'react-native'
import PostMessage from "./PostMessage"
import ImgMessage from "./ImgMessage"
import TextMessage from "./TextMessage"
import NoRoom from './NoRoom'

const Chat = ({ data, my_id, isSendingImage }) => {
  let messages = []
  messages.unshift(...data)
  messages.reverse()
  if (data.length === 0) return <NoRoom h={'83%'} text={'No Messages yet\nStart the conversations'} />
  return (
    <>
      <FlatList
        className='flex-col px-2'
        inverted
        scrollEnabled
        ItemSeparatorComponent={() => {
          return (
            <View className='h-[5px]'></View>
          )
        }}
        data={messages}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => {
          if (item.link && item.img_url) {
            return (
              <PostMessage data={item} my_id={my_id} />
            )
          }
          if (item.img_url && !item.link) {
            return (
              <ImgMessage data={item} my_id={my_id} />
            )
          } else {
            return (
              <TextMessage data={item} my_id={my_id} />
            )
          }
        }}
        ListHeaderComponent={() => {
          return (
            <>
              {isSendingImage && <View className='flex-col h-[130px] w-[45%] bg-grey self-end my-1 rounded items-center justify-center'>
                <ActivityIndicator size={50} color={'white'} />
              </View>}
            </>
          )
        }}
      />
    </>
  )
}

export default Chat