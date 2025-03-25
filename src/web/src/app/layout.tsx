import "./global.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Aiobisoft",
  description: "Your Technology Partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
