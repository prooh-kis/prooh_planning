import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

export const MainContentContainer: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div
      className="p-10"
    >
      {children}
    </div>
  );
};
