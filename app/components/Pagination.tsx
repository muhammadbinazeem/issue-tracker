'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    itemCount: number,
    pageSize: number,
    currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage} : Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    router.push('?' + params.toString())
  }

  return (
    <Flex align='center' gap='2'>
        <Text>{currentPage} for {totalPages}</Text>
        <Button color='gray' variant='soft' disabled={currentPage == 1} onClick={() => changePage(1)}>
          <DoubleArrowLeftIcon/>
        </Button>
        <Button color='gray' variant='soft' disabled={currentPage == 1}  onClick={() => changePage(currentPage - 1)}>
          <ChevronLeftIcon/>
        </Button>
        <Button color='gray' variant='soft' disabled={currentPage == totalPages}  onClick={() => changePage(currentPage + 1)}>
          <ChevronRightIcon/>
        </Button>
        <Button color='gray' variant='soft' disabled={currentPage == totalPages} onClick={() => changePage(totalPages)}>
          <DoubleArrowRightIcon/>
        </Button>
    </Flex>
  )
}

export default Pagination