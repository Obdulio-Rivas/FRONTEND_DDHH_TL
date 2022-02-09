import React, { useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import uploadFile from "../../services/Firebase/Firebase.Service";

import toast, { Toaster } from 'react-hot-toast';

export const Generic = () => {
  
const notify = () => toast('Here is your toast.');



return (
    <div>
      <button onClick={() => toast('Here is your toast.')}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
export default Generic;