import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { StyledNotification } from './StyledComponents'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  if (notification === null) return null

  return <StyledNotification>{notification}</StyledNotification>
}

export default Notification
