import { useState, useEffect, useRef } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { CustomBottomSheet, NetworkError, Spiner } from "../../components"
import { NoPosts, PostCard, ProfileDetails, ShareCompnent } from "../../shared"
import { useStateProvider } from "../../context/StateProvider"
import { protocols } from "../../api/protocols"
import { app_colors } from '../../assets/colors/colors';

const Profile = () => {
    const bottomSheetModalRef = useRef();
    const { token, user } = useStateProvider()

    const [data, setData] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [isFailed, setIsFailed] = useState(false)

    const config = {
        headers: {
            "Authorization": `Token ${token}`
        }
    }

    const { user_id } = useLocalSearchParams()

    const fetchProfileData = async () => {
        try {
            const res = await axios.get(`${protocols.http}/profile/${user_id}`, config)
            setData({
                profile: { ...res.data.profile, posts: res.data.posts.length },
                posts: res.data.posts
            })
            setIsFailed(false)
            setIsLoading(false)
        } catch (error) {
            setIsFailed(true)
            setIsLoading(false)
            console.log(error)
        }
    }

    const [isRefreshing, setIsRefreshing] = useState(false)

    const runRefreshAction = async () => {
        setIsRefreshing(true)
        setIsLoading(true)
        await fetchProfileData()
        setIsRefreshing(false)
    }

    const [shareData, setShareData] = useState(null)

    useEffect(() => {
        fetchProfileData()
    }, [])

    if (isLoading) return <Spiner h={'100%'} size={80} />
    if (isFailed) return <NetworkError h={'100%'} action={fetchProfileData} />
    if (!data) return null
    return (
        <>
            <FlatList
                className='bg-primary'
                scrollEnabled
                data={data.posts}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => <NoPosts />}
                ListHeaderComponent={() => {
                    return (
                        <ProfileDetails data={data.profile} my_id={user.id} config={config} />
                    )
                }}
                renderItem={({ item }) => {
                    return (
                        <PostCard
                            data={{ ...item, user: data.profile }}
                            my_id={user.id}
                            setShareData={setShareData}
                            openShareModal={() => bottomSheetModalRef.current.openBS()}
                        />
                    )
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={runRefreshAction}
                        colors={[app_colors.info, "white"]}
                    />
                }
            />
            <CustomBottomSheet ref={bottomSheetModalRef}>
                <ShareCompnent data={shareData} closeModal={() => bottomSheetModalRef.current.closeBS()} />
            </CustomBottomSheet>
        </>
    )
}

export default Profile