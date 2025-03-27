import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "./global.css";

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
