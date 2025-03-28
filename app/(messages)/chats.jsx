import { protocols } from "../../api/protocols"
import { useStateProvider } from "../../context/StateProvider"
import { Rooms } from "../../shared"

const Chats = () => {
  const { token, user } = useStateProvider()
  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const socket = new WebSocket(`${protocols.ws}/ws/chats/?token=${token}`)

  return (
    <>
      <Rooms
        socket={socket}
        my_id={user.id}
        config={config}
      />
    </>
  )
}

export default Chats