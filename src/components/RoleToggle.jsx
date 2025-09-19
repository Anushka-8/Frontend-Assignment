import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';

export default function RoleToggle(){
  const current = useSelector(s => s.role.currentRole);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => dispatch(switchRole('member'))}
        className={`px-3 py-1 rounded ${current==='member' ? 'bg-indigo-600 text-white' : 'border'}`}
      >
        Member
      </button>
      <button
        onClick={() => dispatch(switchRole('lead'))}
        className={`px-3 py-1 rounded ${current==='lead' ? 'bg-indigo-600 text-white' : 'border'}`}
      >
        Team Lead
      </button>
    </div>
  );
}
