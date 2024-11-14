'use client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { createNewDocument } from '@/actions/actions'
  function NewdocumentButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
  
    const handleCreateNewDocument = () => {
      startTransition(async () => {
        const docId = await createNewDocument();
        router.push(`/doc/${docId}`);
      });
    };
  return <Button onClick={handleCreateNewDocument} disabled = {isPending}> {isPending ? "creating ...":" "}New document</Button>
}

export default NewdocumentButton
