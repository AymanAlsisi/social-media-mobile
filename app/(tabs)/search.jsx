import { useEffect, useState } from 'react'
import { View, SafeAreaView, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import { Spiner } from '../../components'
import { UnSearched, SearchResult, NotFound, SearchHistory } from "../../shared"
import { useStateProvider } from "../../context/StateProvider"
import { protocols } from "../../api/protocols"
import { app_colors } from "../../assets/colors/colors"

const Search = () => {
  const { user } = useStateProvider()

  const [search, setSearch] = useState(null)
  const [users, setUsers] = useState([])
  const [searchHistory, setSearchHistory] = useState([])
  const [isSearching, setIsSearching] = useState(true)

  const searchForUsers = async (username) => {
    setSearch(username)
    try {
      setIsSearching(true)
      const res = await axios.get(`${protocols.http}/search?q=${username}`)
      setUsers(res.data.users)
      setIsSearching(false)
    } catch (error) {
      setIsSearching(false)
    }
  }

  const fetchSearchHistoryData = async () => {
    try {
      const data = await AsyncStorage.getItem('search_history')
      if (data) setSearchHistory(JSON.parse(data))
    } catch (error) {
      console.log(error)
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    fetchSearchHistoryData()
  }, [])

  return (
    <SafeAreaView className='bg-primary flex-1 px-3 py-1'>
      <View className='flex-row items-center justify-between px-3 py-2 rounded-lg bg-secondary'>
        <TextInput
          keyboardType='web-search'
          autoFocus
          placeholder='Search for friends...'
          placeholderTextColor={app_colors.grey}
          className='text-white font-[pr] w-[90%]'
          cursorColor={app_colors.info}
          onChangeText={e => searchForUsers(e)}
        />
        <Ionicons
          name='search'
          size={25}
          color={app_colors.grey}
        />
      </View>
      {
        isSearching ? <Spiner h={'75%'} size={80} />
          : search === null ? (
            <>
              {
                searchHistory.length === 0 ? <UnSearched />
                  : <SearchHistory
                    data={searchHistory}
                    setSearchHistory={setSearchHistory}
                  />
              }
            </>
          )
            : search === "" ? (
              <>
                {
                  searchHistory.length !== 0 ? <SearchHistory
                    data={searchHistory}
                    setSearchHistory={setSearchHistory}
                  />
                    : null
                }
              </>
            )
              : search && users.length === 0 ? <NotFound search={search} />
                : <SearchResult
                  search={search}
                  users={users}
                  my_id={user.id}
                  search_history={searchHistory}
                  setSearchHistory={setSearchHistory}
                />
      }
    </SafeAreaView>
  )
}

export default Search