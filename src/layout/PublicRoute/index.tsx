import React, { ElementType, useEffect, useState } from "react";
import { Header } from "../../components/header";
import NoInternetPage from "../../components/segments/NoInternetPage";

interface IProps {
  layout: ElementType;
}

export const PublicRoute = (props: any) => {
  const { children } = props;
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
    <div className="h-[100vh] w-[100vw] p-0 m-0">
      <Header />
      <div className="h-[100vh] w-[100vw] bg-[#FFFFFF] overflow-y-auto scrollbar-minimal">
        {children}
      </div>
    </div>
  );
};
