import { View, Text } from 'react-native'

const TabsHeader = ({ title }) => {
    return (
        <View className='flex-row py-3 px-5 items-center bg-primary justify-between border-b border-grey-100'>
            <Text className='text-white text-xl font-[pmd]'>{title}</Text>
        </View>
    )
}

export default TabsHeader