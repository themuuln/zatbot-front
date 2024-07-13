import { LinkStatusEnum } from '@/app/dashboard/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterProps } from './types';
import type { ChangeEvent } from 'react';

const Filters = ({ filter, setFilter, onSearch, onClear }: FilterProps) => {
  const onChangeValue = ({
    type,
    value,
  }: {
    type: 'linkStatus' | 'activeStatus';
    value: string;
  }) => {
    console.log(`💻 ~ file: index.tsx:41 ~ setFilter ~ value:`, value);
    if (type === 'activeStatus') {
      setFilter((prev) => ({
        ...prev,
        activeStatus: value === 'true',
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        linkStatus: parseInt(value),
      }));
    }
  };

  return (
    <div className='flex space-x-2'>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFilter({ ...filter, text: e.target.value });
        }}
        className='max-w-sm'
        placeholder='Нэрээр хайх'
      />
      <Select
        value={filter.linkStatus.toString()}
        onValueChange={(e: string) => {
          onChangeValue({ type: 'linkStatus', value: e });
        }}
        defaultValue={filter.linkStatus.toString()}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Төлөв' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='0'>Бүгд</SelectItem>
            <SelectItem value='1'>Холбогдсон</SelectItem>
            <SelectItem value='-1'>Холбогдоогүй</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={filter.activeStatus.toString()}
        onValueChange={(e: string) => {
          onChangeValue({ type: 'activeStatus', value: e });
        }}
        defaultValue={filter.activeStatus.toString()}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Идэвхитэй' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='true'>Идэвхитэй</SelectItem>
            <SelectItem value='false'>Идэвхигүй</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={onSearch}>Хайх</Button>
      <Button onClick={onClear} variant={'outline'}>
        Цэвэрлэх
      </Button>
    </div>
  );
};

export default Filters;
