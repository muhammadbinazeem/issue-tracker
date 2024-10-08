import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { Pagination } from '../components'
import IssuesActions from './IssuesActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams : IssueQuery
}

const IssuePage = async ({ searchParams } : Props) => {

  const columns : { label : string, value: keyof Issue, className?: string}[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'createdAt', value: 'createdAt', className: 'hidden md:table-cell' }
  ] 

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const where = { status }

  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined;

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ 
    where
  })

  return (
    <Flex direction='column' gap='3'>
      <IssuesActions/>
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page}/>
    </Flex>
  )
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project Issues'
};

export default IssuePage;