import { Redirect, Stack } from 'expo-router'
import { useStateProvider } from "../../context/StateProvider"

const AuthLayout = () => {
    const { token, isLoading } = useStateProvider()
    return (
        <>
            {
                isLoading ? null
                    : token ? <Redirect href={'home'} />
                        : <Stack>
                            <Stack.Screen
                                name='sign-in'
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name='sign-up'
                                options={{
                                    headerShown: false
                                }}
                            />
                        </Stack>
            }
        </>
    )
}

export default AuthLayout