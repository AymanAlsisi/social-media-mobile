import { Redirect, Stack } from 'expo-router'
import { useStateProvider } from "../../context/StateProvider"
import { app_colors } from '../../assets/colors/colors'
import { ChatsHeader, ChatHeader } from '../../headers'

const MessagesLayout = () => {
    const { token, isLoading } = useStateProvider()

    return (
        <>
            {
                isLoading ? null
                    : !token ? <Redirect href={'sign-in'} />
                        : <Stack
                            screenOptions={{
                                contentStyle: {
                                    backgroundColor: app_colors.primary
                                }
                            }}
                        >
                            <Stack.Screen
                                name='chats'
                                options={{
                                    header: () => <ChatsHeader />,
                                }}
                            />
                            <Stack.Screen
                                name='direct/[room_id]'
                                options={{
                                    headerShown: false
                                }}
                            />
                        </Stack>
            }
        </>
    )
}

export default MessagesLayout