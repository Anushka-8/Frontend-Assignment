import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';

export default function TaskForm({ preselectMemberId }) {
  const members = useSelector(s => s.members.membersList);
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState(preselectMemberId || (members[0]?.id || ''));
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!memberId || !title) return alert('select member and title');
    dispatch(assignTask({ memberId, title, dueDate }));
    setTitle(''); setDueDate('');
    alert('Task assigned');
  };

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow space-y-3">
      <h3 className="font-semibold">Assign Task</h3>
      <select value={memberId} onChange={e=>setMemberId(e.target.value)} className="w-full p-2 border rounded">
        {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>

      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" className="w-full p-2 border rounded"/>
      <input value={dueDate} onChange={e=>setDueDate(e.target.value)} type="date" className="w-full p-2 border rounded" />
      <button className="px-3 py-2 bg-indigo-600 text-white rounded">Assign</button>
    </form>
  );
}
