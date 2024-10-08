'use client'
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Skeleton } from '../../components';

// const [users, setUsers] = useState<User[]>([]);
  
// useEffect(() => {
//   const fetchUsers = async () => {
//       const { data } = await axios.get<User[]>('/api/users')
//       setUsers(data)
//   }
//   fetchUsers()
// }, [])

const AssigneeSelect = ({ issue } : { issue : Issue }) => {

  // we can put the logic of useQuery in a custom hook like useUsers() etc.
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />

  if (error) return null

  const assignIssue = (userId : string) => (
    axios.patch('/api/issues/' + issue.id, { assignedToUserId : userId || null }).catch(() => {
        toast.error("Changes could not be made!")
    })
  )

  return (
    <>
        <Select.Root defaultValue={issue.assignedToUserId || ""} onValueChange={assignIssue}>
            <Select.Trigger />
            <Select.Content>
                <Select.Group>
                    <Select.Label>
                        Suggestions
                    </Select.Label>
                    <Select.Item value=''>
                        UnAssigned
                    </Select.Item>
                    {
                        users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>
                        ))
                    }
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster/>
    </>
  )
}

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60sec
    retry: 3
})

export default AssigneeSelect