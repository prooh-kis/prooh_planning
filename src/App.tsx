import React from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import "./index.css";
import Routers from "./routes/Router";
import { APIProvider } from '@vis.gl/react-google-maps';

const queryClient = new QueryClient();
const libraries = ["drawing", "geometry"];

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey="AIzaSyAtq5k13iEUZWrdT4wrwWmxRWh4Cw8t_i8" libraries={libraries}>
        <Routers />
      </APIProvider>
    </QueryClientProvider>
  )
}

export default App;
