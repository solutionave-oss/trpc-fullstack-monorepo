import { ReactNode } from "react";
import "./global.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Aiobisoft",
  description: "Your Technology Partner",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  

  return (
    <html lang="en">
      <body>



        
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
