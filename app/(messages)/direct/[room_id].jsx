import { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import axios from "axios"
import { Room } from "../../../shared"
import { useStateProvider } from "../../../context/StateProvider"
import { protocols } from "../../../api/protocols"

const Direct = () => {
  const { user, token } = useStateProvider()

  const { room_id } = useLocalSearchParams()

  const profile_id = room_id.split('_').find(e => Number(e) !== user.id)

  const socket = new WebSocket(`${protocols.ws}/ws/chat/${room_id}/`)

  const [profile, setProfile] = useState(null)

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const getProfile = async () => {
    try {
      const res = await axios.get(`${protocols.http}/profile/${profile_id}`, config)
      setProfile({
        id: res.data.profile.id,
        username: res.data.profile.username,
        img_url: res.data.profile.img_url,
        bio: res.data.profile.bio
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  if (!profile) return null

  return (
    <Room
      socket={socket}
      my_id={user.id}
      user_id={profile_id}
      profile={profile}
    />
  )
}

export default Direct