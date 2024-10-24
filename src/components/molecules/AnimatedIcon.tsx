import { Player } from "@lordicon/react";
import React, { useEffect, useRef } from "react";

interface AnimatedIconProps {
  icon: any;
  size?: any;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({icon, size}) => {

  const playerRef = useRef<Player>(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <Player
        ref={playerRef}
        size={size|| 96}
        icon={icon}
        onComplete={() => playerRef.current?.playFromBeginning()}
      />
    </div>
  );
};
