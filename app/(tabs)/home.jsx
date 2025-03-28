import { useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native'
import axios from 'axios'
import { CustomBottomSheet, NetworkError } from '../../components'
import { PostCard, LoadingPost, NoPosts, ShareCompnent } from "../../shared"
import { useStateProvider } from "../../context/StateProvider"
import { protocols } from "../../api/protocols"
import { app_colors } from '../../assets/colors/colors'

const Home = () => {
  const sharePostBSRef = useRef();
  const { token, user } = useStateProvider()

  const [posts, setPosts] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isFailed, setIsFailed] = useState(false)

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const fetchHomeData = async () => {
    try {
      const res = await axios.get(`${protocols.http}/home`, config)
      setPosts(res.data.posts)
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
    await fetchHomeData()
    setIsRefreshing(false)
  }

  const [shareData, setShareData] = useState(null)

  useEffect(() => {
    fetchHomeData()
  }, [])

  return (
    <>
      {
        isLoading ? <ScrollView className='bg-primary'>
          {
            ['', '', '', '', ''].map((card, i) => <LoadingPost key={i} />)
          }
        </ScrollView>
          : isFailed ? <NetworkError h={'100%'} action={fetchHomeData} />
            :
            <FlatList
              className='bg-primary'
              scrollEnabled
              data={posts}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => <NoPosts screen={'home'} />}
              renderItem={({ item }) => {
                return (
                  <PostCard
                    data={item}
                    my_id={user.id}
                    setShareData={setShareData}
                    openShareModal={() => sharePostBSRef.current.openBS()}
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
      }
      <CustomBottomSheet ref={sharePostBSRef}>
        <ShareCompnent data={shareData} closeModal={() => sharePostBSRef.current.closeBS()} />
      </CustomBottomSheet>
    </>
  )
}

export default Home