import { LinkStatusEnum } from '@/app/dashboard/types';

export type BotCard = {
  name: string;
  connected_page: {
    id: string;
    name: string;
  };
  avatar: {
    url: string;
  };
};

export type FilterTypes = {
  text: string;
  linkStatus: LinkStatusEnum;
  activeStatus: boolean;
};
