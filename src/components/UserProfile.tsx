import { User } from '@/types/event'
import { useSelector } from 'react-redux'
import { Skeleton } from './ui/skeleton'

function UserProfile() {
  const user = useSelector((state: { user: { user: User } }) => (state.user.user))
  return (
    <div className='flex gap-3'>
      <img />
      <span>{user?.name || <Skeleton className="h-4 w-[150px]  bg-white/50" />}</span>
    </div>
  )
}

export default UserProfile