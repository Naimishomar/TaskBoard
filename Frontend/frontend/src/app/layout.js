import './globals.css'
import Header from './header/page';
import { AuthProvider } from './context/authContext';

export const metadata = {
  title: 'TaskBoard App',
  description: 'Manage your task boards and tasks efficiently.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans m-0 bg-black text-white">
        <AuthProvider>
          <Header/>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}