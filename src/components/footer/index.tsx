import Link from 'next/link';
import Container from '../ui/container';

const Footer = () => {
  return (
    <footer className='h-40 border-t bottom-0 fixed p-10 w-full'>
      <Container>
        <div className='space-x-4'>
          <Link href={'https://facebook.com/themuln'}>Facebook</Link>
          <Link href={'https://facebook.com/themuuln'}>Instagram</Link>
          <Link href={'https://github.com/themuuln'}>Github</Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
