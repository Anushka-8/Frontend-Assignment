import React from 'react';
import { useSelector } from 'react-redux';

export default function SummaryCards(){
  const members = useSelector(s => s.members.membersList);
  const counts = members.reduce((acc, m) => { acc[m.status] = (acc[m.status]||0)+1; return acc; }, {});
  return (
    <div className="flex gap-4">
      <div className="p-4 bg-white rounded shadow w-48">
        <div className="text-sm text-gray-500">Working</div>
        <div className="text-2xl font-bold">{counts['Working'] || 0}</div>
      </div>
      <div className="p-4 bg-white rounded shadow w-48">
        <div className="text-sm text-gray-500">Meeting</div>
        <div className="text-2xl font-bold">{counts['Meeting'] || 0}</div>
      </div>
      <div className="p-4 bg-white rounded shadow w-48">
        <div className="text-sm text-gray-500">Break</div>
        <div className="text-2xl font-bold">{counts['Break'] || 0}</div>
      </div>
      <div className="p-4 bg-white rounded shadow w-48">
        <div className="text-sm text-gray-500">Offline</div>
        <div className="text-2xl font-bold">{counts['Offline'] || 0}</div>
      </div>
    </div>
  );
}
