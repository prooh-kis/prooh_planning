import { useLocation } from "react-router-dom";
import { Header } from "../../header";

export const PublicLayout = (props: any) => {
  const { children } = props;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isEmbedded = searchParams.get('embed') === 'true';

  return (
    <div className="h-[100vh] w-full bg-gray-100 overflow-y-auto no-scrollbar">
      {!isEmbedded && <Header />}
      <div className="h-[92vh] overflow-y-auto no-scrollbar">{children}</div>
    </div>
  );
};
