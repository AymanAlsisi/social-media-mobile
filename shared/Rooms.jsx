import { useEffect, useState } from 'react'
import { View, TextInput, FlatList, RefreshControl } from 'react-native'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import { Spiner } from '../components'
import UserRoom from './UserRoom'
import RoomsSearch from './RoomsSearch'
import NoRoom from './NoRoom'
import { protocols } from '../api/protocols'
import { app_colors } from '../assets/colors/colors'

const Rooms = ({ socket, my_id, config }) => {
  const [rooms, setRooms] = useState([])

  const [search, setSearch] = useState(null)
  const [users, setUsers] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const findUsers = async (username) => {
    setSearch(username)
    try {
      setIsSearching(true)
      const res = await axios.get(`${protocols.http}/search?q=${username}`)
      setUsers(res.data.users)
      setIsSearching(false)
    } catch (error) {
      setIsSearching(false)
      console.log(error)
    }
  }

  const [isRefreshing, setIsRefreshing] = useState(false)
  const runRefreshAction = async () => {
    setIsRefreshing(true)
    await new Promise((resolve, reject) => {
      socket.addEventListener('message', (event) => {
        const received = JSON.parse(event.data)
        if (received.type === 'initial') {
          setRooms(received.chats)
        } else if (received.type === 'new_message') {
          setRooms(prev => [...prev, received])
        }
      })
      resolve()
    })
    setIsRefreshing(false)
  }

  useEffect(() => {
    socket.addEventListener('message', (event) => {
      const received = JSON.parse(event.data)
      if (received.type === 'initial') {
        setRooms(received.chats)
      } else if (received.type === 'new_message') {
        setRooms(prev => [received, ...prev])
      }
    })
  }, [])
  return (
    <>
      <View className='p-3 bg-secondary rounded-lg flex-row m-3 items-center justify-between'>
        <TextInput
          keyboardType='ascii-capable'
          placeholder='Search for Users...'
          placeholderTextColor={app_colors.grey}
          className='text-white font-[pr] w-[90%]'
          onChangeText={e => findUsers(e)}
        />
        <Ionicons name='search' size={22} color={app_colors.grey} />
      </View>
      {
        isSearching ? <Spiner size={80} h={'70%'} />
          : search ? <RoomsSearch
            search={search}
            users={users}
            my_id={my_id}
            config={config}
          />
            : (
              <FlatList
                scrollEnabled
                data={rooms}
                keyExtractor={item => item.id}
                ListEmptyComponent={() => <NoRoom text={'No Chats yet'} />}
                renderItem={({ item }) => {
                  return (
                    <UserRoom
                      data={item}
                      socket={socket}
                      my_id={my_id}
                      config={config}
                    />
                  )
                }}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={runRefreshAction} colors={[app_colors.info]} />}
              />
            )
      }
    </>
  )
}

export default Rooms