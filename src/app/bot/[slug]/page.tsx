'use client';

import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useState, type ChangeEvent } from 'react';

const Page = () => {
  const [filter, setFilter] = useState('');
  return (
    <>
      <Container>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
          placeholder='Хайх'
        />
        <div className='flex justify-between'>
          <p>Үндсэн үйлдэл</p>

          <div className='flex flex-row space-x-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>+</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuItem onClick={() => {}}>
                  Бүлгийн нэр солих
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button>+ Автоматжуулалт нэмэх</Button>
          </div>
        </div>
        {/* <Accordion type='single' defaultValue='item-1' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </Container>
    </>
  );
};

export default Page;
