import { useRef } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Redirect, router, Tabs } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { toast } from "@backpackapp-io/react-native-toast"
import { Ionicons } from "@expo/vector-icons"
import { HomeHeader, TabsHeader, MeHeader } from "../../headers"
import { CustomBottomSheet, IconBtn } from "../../components"
import { useStateProvider } from "../../context/StateProvider"
import { app_colors } from "../../assets/colors/colors"

const TabsLayout = () => {
    const logOutBSRef = useRef();

    const { token, isLoading, setToken, setUser } = useStateProvider()

    const signOut = async () => {
        setToken(null)
        setUser(null)
        await AsyncStorage.clear()
        router.push('sign-in')
        toast.success("Logged out")
    }

    if (isLoading) return null
    if (!token) return <Redirect href={'sign-in'} />
    return (
        <>
            <Tabs screenOptions={{
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                    backgroundColor: "transparent",
                    borderColor: app_colors.grey_secondary,
                },
                tabBarActiveTintColor: app_colors.info,
                tabBarInactiveTintColor: app_colors.grey,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
            }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        header: () => <HomeHeader openBS={() => logOutBSRef.current.openBS()} />,
                        tabBarIcon: ({ focused, color }) => <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={focused ? 30 : 25}
                            color={color}
                        />
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        header: () => <TabsHeader title={"Create"} />,
                        tabBarIcon: ({ focused, color }) => <Ionicons
                            name={focused ? 'add-circle' : 'add-circle-outline'}
                            size={focused ? 30 : 25}
                            color={color}
                        />
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        header: () => <TabsHeader title={"Search"} />,
                        tabBarIcon: ({ focused, color }) => <Ionicons
                            name={focused ? 'search' : 'search-outline'}
                            size={focused ? 30 : 25}
                            color={color}
                        />
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Me",
                        header: () => <MeHeader openLogOutModal={() => logOutBSRef.current.openBS()} />,
                        tabBarIcon: ({ focused, color }) => <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={focused ? 30 : 25}
                            color={color}
                        />
                    }}
                />
            </Tabs>

            <CustomBottomSheet ref={logOutBSRef}>
                <View className='flex-col items-center w-full h-[240px]'>
                    <View className='flex-row items-center justify-between px-3 py-2 w-full'>
                        <Text className='text-white text-2xl font-[pmd]'>Are you sure?</Text>
                        <IconBtn
                            name={'close'}
                            size={30}
                            color={'white'}
                            action={() => logOutBSRef.current.closeBS()}
                        />
                    </View>
                    <Ionicons name="warning-outline" size={50} color={'orange'} />
                    <Text className='text-white text-center text-lg font-[pr]'>You'll be logged out.</Text>
                    <View className='flex-row items-center justify-between w-full p-3'>
                        <TouchableOpacity className='p-2 rounded w-[49%] bg-info' onPress={signOut}>
                            <Text className='text-secondary font-[pmd] text-center text-lg'>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='p-2 rounded w-[49%] bg-grey' onPress={() => logOutBSRef.current.closeBS()}>
                            <Text className='text-white font-[pmd] text-center text-lg'>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomBottomSheet>
        </>
    )
}

export default TabsLayout