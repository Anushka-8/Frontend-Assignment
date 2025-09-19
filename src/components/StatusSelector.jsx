import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMemberStatus } from '../redux/slices/membersSlice';

export default function StatusSelector(){
  const { currentUser } = useSelector(s => s.role);
  const members = useSelector(s => s.members.membersList);
  const dispatch = useDispatch();
  const me = members.find(m => m.id === currentUser?.id);

  const setStatus = (status) => {
    const id = currentUser?.id || me?.id;
    if (!id) return alert('No user selected');
    dispatch(updateMemberStatus({ memberId: id, status }));
  };

  return (
    <div className="p-4 bg-white rounded shadow space-x-2">
      <div className="text-sm mb-2">Update status</div>
      {['Working','Break','Meeting','Offline'].map(s => (
        <button key={s}
          onClick={() => setStatus(s)}
          className="px-3 py-1 border rounded text-sm"
        >{s}</button>
      ))}
    </div>
  );
}
