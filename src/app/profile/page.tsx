'use client';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>({
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: user?.phoneNumber,
  });

  const formData = [
    {
      label: 'Нэр',
      name: 'firstName',
      value: data?.firstName,
    },
    {
      label: 'Овог',
      name: 'lastName',
      value: data?.lastName,
    },
    {
      label: 'Утасны дугаар',
      name: 'phoneNumber',
      value: data?.phoneNumber,
    },
    {
      label: 'И-Мэйл',
      name: 'email',
      value: data?.email,
    },
  ];

  useEffect(() => {
    const setDefaultData = () => {
      setData((prev: any) => ({
        ...prev,
        email: user?.email,
      }));
    };

    const getUserData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('_id', user?.id)
        .single();
      setData(data);
    };

    setDefaultData();
    getUserData();
  }, [user]);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    if (!user?.id) return;

    const { error } = await supabase.from('users').upsert(
      {
        id: data?.id,
        _id: user?.id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
      },
      {
        ignoreDuplicates: true,
      },
    );
    if (!error) {
      toast('Амжилттай хадгаллаа.');
    }
  };

  return (
    <Container>
      <div className='flex flex-col gap-2'>
        <Card>
          <CardHeader>
            {formData.map((item) => {
              return (
                <div className='space-y-1' key={item?.label}>
                  <Label>{item?.label}</Label>
                  <Input
                    name={item?.name}
                    onChange={handleChangeText}
                    placeholder=''
                    value={item?.value}
                    disabled={item?.name === 'email'}
                  />
                </div>
              );
            })}
          </CardHeader>
          <CardFooter className='space-x-4 flex justify-end'>
            <Button onClick={() => router.back()} variant={'outline'}>
              Цуцлах
            </Button>
            <Button onClick={onSubmit}>Хадгалах</Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};

export default Page;
