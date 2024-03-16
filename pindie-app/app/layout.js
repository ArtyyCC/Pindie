import './globals.css';
import {Header} from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";


export const metadata = {
  title: 'Pindie',
  description: 'Портал инди-игр от студентов Яндекс Практикума',
}

export default function RootLayout({ children }) {
  return (
      <html lang="ru">
          <body>
          <Header/>
              {children}
          <Footer/>
          </body>
      </html>
  )
}
