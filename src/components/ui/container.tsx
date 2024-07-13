import { type ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='flex justify-center'>
      <div className={`container py-8`}>{children}</div>
    </div>
  );
};

export default Container;
