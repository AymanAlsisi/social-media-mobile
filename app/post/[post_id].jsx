import { useState, useEffect, useRef } from 'react'
import { SafeAreaView  } from 'react-native'
import { useLocalSearchParams, Redirect } from 'expo-router'
import axios from 'axios'
import { PostCard, ShareCompnent } from "../../shared"
import { Spiner, CustomBottomSheet } from '../../components'
import { useStateProvider } from '../../context/StateProvider'
import { protocols } from '../../api/protocols'

const Post = () => {
    const sharePostBSRef = useRef();
    const { token, user, isLoading } = useStateProvider()
    const { post_id } = useLocalSearchParams()

    const [post, setPost] = useState(null)

    const config = {
        headers: {
            "Authorization": `Token ${token}`
        }
    }

    const [isFetching, setIsFetching] = useState(false)

    const fetchPostData = async () => {
        try {
            setIsFetching(true)
            const res = await axios.get(`${protocols.http}/post?post_id=${post_id}`, config)
            setPost(res.data.post)
            setIsFetching(false)
        } catch (error) {
            setIsFetching(false)
            console.log(error)
        }
    }

    const [shareData, setShareData] = useState(null)

    useEffect(() => {
        fetchPostData()
    }, [])

    return (
        <>
            {
                isLoading ? null
                    : !token ? <Redirect href={'sign-in'} />
                        : isFetching ? <Spiner h={'100%'} size={80} />
                            : !post ? null
                                : <SafeAreaView className='py-5'>
                                    <PostCard data={post} my_id={user.id} openShareModal={() => sharePostBSRef.current.openBS()} setShareData={setShareData} />
                                </SafeAreaView>
            }
            <CustomBottomSheet ref={sharePostBSRef}>
                <ShareCompnent closeModal={() => sharePostBSRef.current.closeBS()} data={shareData} />
            </CustomBottomSheet>
        </>
    )
}

export default Post