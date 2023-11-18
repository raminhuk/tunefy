import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full w-full left-0 top-0 absolute bg-opacity-80 bg-zinc-950">
      <ImSpinner2 className="animate-spin text-customBlue text-4xl" />
    </div>
  );
};

export default LoadingSpinner;