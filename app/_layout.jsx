import { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font'
import { Toasts } from '@backpackapp-io/react-native-toast';
import StateProvider from "../context/StateProvider"
import { ProfileHeader, UpdateHeader, PostHeader } from "../headers"
import { app_colors } from "../assets/colors/colors"

SplashScreen.preventAutoHideAsync()

const App = () => {
    const [fontsLoaded, error] = useFonts({
        'pr': require('../assets/fonts/Poppins-Regular.ttf'),
        'pmd': require('../assets/fonts/Poppins-Medium.ttf'),
        'psemibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    })

    useEffect(() => {
        if (error) throw error
        if (fontsLoaded) SplashScreen.hideAsync()
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null

    return (
        <GestureHandlerRootView>
            <StateProvider>
                <Stack screenOptions={{
                    contentStyle: {
                        backgroundColor: app_colors.primary,
                    },
                    headerTitleStyle: {
                        color: 'white',
                    },
                    headerStyle: {
                        backgroundColor: app_colors.primary
                    },
                }}>
                    <Stack.Screen
                        name='index'
                        options={{
                            headerShown: false,
                            statusBarColor: app_colors.info
                        }}
                    />
                    <Stack.Screen
                        name='(tabs)'
                        options={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: app_colors.primary,
                            },
                            statusBarColor: app_colors.primary
                        }}
                    />
                    <Stack.Screen
                        name='(auth)'
                        options={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: app_colors.primary,
                            },
                            statusBarColor: app_colors.primary
                        }}
                    />
                    <Stack.Screen
                        name='profile/[user_id]'
                        options={{
                            header: ({ route }) => <ProfileHeader id={route.params.user_id} />,
                            contentStyle: {
                                backgroundColor: app_colors.primary,
                            },
                            statusBarColor: app_colors.primary
                        }}
                    />
                    <Stack.Screen
                        name='update-profile'
                        options={{
                            header: () => <UpdateHeader />,
                            contentStyle: {
                                backgroundColor: app_colors.primary,
                            },
                            statusBarColor: app_colors.primary
                        }}
                    />
                    <Stack.Screen
                        name='post/[post_id]'
                        options={{
                            header: () => <PostHeader />,
                            contentStyle: {
                                backgroundColor: app_colors.primary,
                            },
                            statusBarColor: app_colors.primary
                        }}
                    />
                    <Stack.Screen
                        name='(messages)'
                        options={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: app_colors.primary,
                            },
                            statusBarColor: app_colors.primary
                        }}
                    />
                </Stack>
                <Toasts />
            </StateProvider>
        </GestureHandlerRootView>
    )
}

export default App