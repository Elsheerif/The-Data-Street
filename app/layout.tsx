import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Data Street',
  description: 'Where Data meets Discovery. Join the next generation of data innovators.',
  icons: {
    icon: '/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const darkMode = JSON.parse(localStorage.getItem('darkMode'));
                if (darkMode) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <div className="dark-mode-toggle-provider">{children}</div>
      </body>
    </html>
  );
}
