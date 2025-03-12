import React, { Children, ElementType, useEffect, useState } from "react";
import { Header } from "../../components/header";
import NoInternetPage from "../../components/segments/NoInternetPage";

interface AppDashBoardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppDashBoardLayout: React.FC<AppDashBoardLayoutProps> = ({
  children,
  className = "bg-[#FFFFFF] pt-28",
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <NoInternetPage />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header />
      <div className={`h-full w-full px-8 ${className}`}>{children}</div>
    </div>
  );
};
