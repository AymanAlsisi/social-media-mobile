import { View, Text, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import { IconBtn } from "../components"
import { app_colors } from '../assets/colors/colors'

const ImageSelector = ({ form, setForm, sendMessage }) => {

  return (
    <SafeAreaView className='p-2 flex-col items-center'>
      <ImageBackground borderRadius={20} blurRadius={4} className='flex-col justify-between h-[550px] w-full' source={{ uri: form.img }}>
        <View className='p-3 flex-row items-center justify-between'>
          <Text className='text-white text-lg font-[psemibold]'>Sending an image...</Text>
          <IconBtn
            name={'close-circle'}
            size={30}
            color={'white'}
            action={() => setForm({ img: '', text: '' })}
          />
        </View>
        <View className='p-3 flex-row items-center justify-between'>
          <TextInput
            keyboardType='default'
            multiline
            verticalAlign='top'
            placeholder='Add a caption...'
            placeholderTextColor={app_colors.grey}
            focusable
            value={form.text}
            onChangeText={e => setForm(prev => ({ ...prev, text: e }))}
            className='text-white w-[80%] font-[pr] py-2 px-3 bg-secondary rounded-xl self-center'
          />
          <TouchableOpacity className='p-2 bg-info rounded' onPress={sendMessage}>
            <Text className='text-secondary text-lg font-[pmd] text-center'>Done</Text>
          </TouchableOpacity>
        </View>
        {/* <View className='flex-row items-center justify-between px-3 py-2'>
          
          <TextInput
            keyboardType='default'
            multiline
            verticalAlign='top'
            placeholder='Add a caption...'
            placeholderTextColor={app_colors.grey}
            focusable
            value={form.text}
            onChangeText={e => setForm(prev => ({ ...prev, text: e }))}
            className='text-white w-[65%] font-[pr] py-2 px-3 bg-secondary rounded-xl self-center'
          />
          <IconBtn name={'close'} size={30} color={'white'} action={() => setForm({ img: '', text: '' })} />
        </View> */}
      </ImageBackground>
    </SafeAreaView>
  )
}

export default ImageSelector