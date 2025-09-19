import React from 'react';
import { useDispatch } from 'react-redux';
import { updateMemberStatus } from '../redux/slices/membersSlice';

const badgeColor = (status) => {
  switch(status){
    case 'Working': return 'bg-green-100 text-green-800';
    case 'Meeting': return 'bg-blue-100 text-blue-800';
    case 'Break': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function MemberCard({ member, showAssignBtn=false, onSelect }) {
  const dispatch = useDispatch();
  return (
    <div className="p-3 bg-white rounded shadow flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">{member.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
        <div>
          <div className="font-medium">{member.name}</div>
          <div className={`inline-block px-2 py-0.5 text-xs rounded ${badgeColor(member.status)}`}>{member.status}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-500">{member.tasks?.filter(t=>!t.completed).length || 0} active</div>
        {showAssignBtn && <button onClick={() => onSelect(member)} className="px-2 py-1 border rounded text-sm">Assign</button>}
      </div>
    </div>
  );
}
