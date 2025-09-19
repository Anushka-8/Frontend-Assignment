import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementTaskProgress, decrementTaskProgress, removeTask } from '../redux/slices/membersSlice';

export default function TaskList({ memberId }) {
  const member = useSelector(s => s.members.membersList.find(m => m.id === memberId));
  const dispatch = useDispatch();
  if (!member) return <div>No member</div>;

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Your Tasks</h3>
      {member.tasks.length === 0 && <div className="text-sm text-gray-500">No tasks</div>}
      {member.tasks.map(task => (
        <div key={task.id} className="p-3 bg-white rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</div>
              <div className="text-xs text-gray-400">Due: {task.dueDate || 'N/A'}</div>
            </div>
            <div className="w-48">
              <div className="h-3 bg-gray-200 rounded">
                <div style={{ width: `${task.progress}%` }} className="h-3 bg-indigo-500 rounded"></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs">{task.progress}%</div>
                <div className="space-x-2">
                  <button onClick={()=>dispatch(decrementTaskProgress({ memberId, taskId: task.id }))} className="px-2 py-1 border rounded text-sm">-</button>
                  <button onClick={()=>dispatch(incrementTaskProgress({ memberId, taskId: task.id }))} className="px-2 py-1 border rounded text-sm">+</button>
                  <button onClick={()=>dispatch(removeTask({ memberId, taskId: task.id }))} className="px-2 py-1 border rounded text-sm">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
