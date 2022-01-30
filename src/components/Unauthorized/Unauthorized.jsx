import React from 'react';
import Navbar from '../Navbar/Navbar';

const Unauthorized = () => {
  return (
    <>
      <Navbar />
      <div>Uppps sorry, it seems you do not have permission to view this module, contact the administrator.</div>
    </>
  );
};

export default Unauthorized;
