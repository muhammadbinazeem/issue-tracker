import { Status } from '@prisma/client'
import { Flex, Card, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
    open: number,
    inProgress: number,
    closed: number
}

const IssueSummary = ({ open, inProgress, closed } : Props) => {

  const contianers : { label: string, value: number, status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ]

  return (
    <Flex gap='4'>
      {
        contianers.map(contianer => (
          <Card key={contianer.label}>
            <Flex direction='column' gap='1'>
              <Link className='text-sm font-medium' href={`/issues/?status=${contianer.status}`}>
                {contianer.label}
              </Link>
              <Text size='5' className='font-bold'>
                {contianer.value}
              </Text>
            </Flex>
          </Card>
        ))
      }
    </Flex>
  )
}

export default IssueSummary