import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Inter,
  League_Spartan,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ibm-plex-mono',
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-sans',
});

export const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-league-spartan',
});
