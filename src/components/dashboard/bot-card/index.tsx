import { BsThreeDotsVertical } from 'react-icons/bs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import type { BotCard } from '@/types';
import { options } from './data';

const BotCard = ({ item }: { item: BotCard }) => {
  return (
    <Link href={`/bot/${item?.name}`}>
      <Card className='max-w-xs'>
        <CardHeader>
          <Avatar className='flex self-center w-14 h-14'>
            <AvatarImage
              src={
                item?.avatar?.url ??
                'https://avatars.githubusercontent.com/u/75017829?v=4'
              }
            />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className='flex flex-col items-center'>
          <h6 className='font-semibold text-lg'>{item?.name ?? 'Zatbot'}</h6>
          <p className='text-sm'>
            {item?.connected_page?.name ?? 'Нэр'} хуудастай холбогдсон
          </p>
        </CardContent>

        <CardFooter className='flex justify-end'>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className='bg-[#f3f2f2] dark:bg-[#262626] rounded-full p-2'>
                <BsThreeDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {options.map((item) => (
                  <DropdownMenuItem key={item.id}>
                    {item?.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BotCard;
