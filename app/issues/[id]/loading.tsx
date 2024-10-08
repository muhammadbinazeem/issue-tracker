import { Box, Card, Flex } from '@radix-ui/themes'
import { Skeleton } from '../../components'


const IssueDetailLoading = () => {
  return (
    <Box className='max-w-xl'>
        <Skeleton/>
        <Flex className='space-x-2' my='2'>
          <Skeleton className='5rem'/>
          <Skeleton className='8rem'/>
        </Flex>
        <Card className='prose' mt='4'>
          <Skeleton count={3}/>
        </Card>
    </Box>
  )
}

export default IssueDetailLoading