'use client';

import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DeleteIssueButton = ({ issueId } : { issueId : number }) => {

  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
        try {
            setDeleting(true)
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setDeleting(false);
            setError(true);
        }
  }

  return (
    <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red' disabled={isDeleting}>    
                    Delete Issue
                    { isDeleting && <Spinner/> }
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    Confirm Deleteion
                </AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete. this action cannot be reversed.
                </AlertDialog.Description>
                <Flex mt='4' gap='3'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red' onClick={deleteIssue}>Delete</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>
                    SomeThing Goes Wrong
                </AlertDialog.Title>
                <AlertDialog.Description>
                    This issue could not be delete
                </AlertDialog.Description>
                <AlertDialog.Action>
                    <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Action>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton