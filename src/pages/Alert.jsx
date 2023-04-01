/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

function Alert({ type, message, fetchError, setFetchError }) {

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const textColor = type === 'success' ? 'text-green-50' : 'text-red-50';

  useEffect(() => {
    const timer = setTimeout(() => {
      setFetchError(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {fetchError && (
        <div
          className={`${bgColor} ${textColor} px-4 py-2 rounded-md fixed left-2 bottom-10 transform translate-x-4 z-40`}
        >
          {message}
        </div>
      )}
    </>
  );
}

export default Alert;