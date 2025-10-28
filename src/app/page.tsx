import App from '../components/App';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Pelican Point East Condos',
  description: 'Pelican Point East Condos',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Pelican Point East Condos',
    description: 'Pelican Point East Condos',
    images: '/favicon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pelican Point East Condos',
    description: 'Pelican Point East Condos',
    images: '/favicon.ico',
  },
}

export default function Home() {
  return <App />;
}
