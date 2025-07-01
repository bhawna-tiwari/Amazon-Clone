import React, { useContext } from 'react';
import { Logincontext } from '../context/Contextprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({ deletedata, get }) => {
  const { account, setAccount } = useContext(Logincontext);

  const removedata = async () => {
    try {
      const res = await fetch(`https://amazon-clone-project-u1p8.onrender.com/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        console.log("error");
      } else {
        console.log("user deleted");
        setAccount(data);
        toast.success("Item removed from cart 😃!", {
          position: "top-center"
        });
        get();
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <div className='add_remove_select'>
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <p style={{ cursor: "pointer" }} onClick={removedata}>Delete</p><span>|</span>
        <p className="forremovemedia">Save Or Later</p><span>|</span>
        <p className="forremovemedia">See More like this</p>
      </div>
      <ToastContainer />
    </>
  );
};

export default Option;
