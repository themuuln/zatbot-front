'use client';

import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/initSupabase';
import { useEffect, useState } from 'react';
import { tab } from './data';
import { LinkStatusEnum } from './types';
import type { BotCardType, FilterTypes } from '@/types';
import Filters from '@/components/dashboard/filters';
import BotCard from '@/components/dashboard/bot-card';

const Dashboard = () => {
  const [bots, setBots] = useState<any>();
  const [filter, setFilter] = useState<FilterTypes>({
    text: '',
    linkStatus: LinkStatusEnum.ALL,
    activeStatus: true,
  });

  const getBotData = async () => {
    const { data: bots, error } = await supabase
      .from('bot')
      .select('*')
      .order('id', { ascending: true })
      .eq('isActive', filter.activeStatus)
      .ilike('name', `%${filter.text}%`);

    if (error) console.log('error', error);
    else setBots(bots);
  };

  useEffect(() => {
    getBotData();
  }, [supabase]);

  useEffect(() => {
    getBotData();
  }, [filter]);

  const onSearch = () => {
    getBotData();
  };

  const onClear = () => {
    setFilter({
      text: '',
      linkStatus: LinkStatusEnum.ALL,
      activeStatus: true,
    });
  };

  return (
    <Container>
      <Tabs defaultValue='bot'>
        <TabsList>
          {tab.map((item) => (
            <TabsTrigger key={item?.value} value={item?.value}>
              {item?.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent className='space-y-4' value='bot'>
          <Filters
            onSearch={onSearch}
            onClear={onClear}
            setFilter={setFilter}
            filter={filter}
          />
          <div className='grid grid-cols-4 gap-4'>
            {bots?.map((item: BotCardType) => (
              <BotCard key={item?.name} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent className='space-y-4' value='shared'>
          <Filters
            onSearch={onSearch}
            onClear={onClear}
            setFilter={setFilter}
            filter={filter}
          />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
