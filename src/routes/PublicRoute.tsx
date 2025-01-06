import React, { ReactNode } from "react";
import { Header } from "../components/header";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  return (
    <div className="p-0 m-0">
      <Header />
      <main className="h-full w-screen">{children}</main>
    </div>
  );
};

export { PublicRoute };
