import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';   // ✅ import sidebar
import SummaryCards from '../components/SummaryCards';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/TaskForm';
import StatusSelector from '../components/StatusSelector';
import TaskList from '../components/TaskList';
import { fetchSampleMembers, autoResetOffline } from '../redux/slices/membersSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const role = useSelector(s => s.role.currentRole);
  const members = useSelector(s => s.members.membersList);
  const currentUser = useSelector(s => s.role.currentUser);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortByTasks, setSortByTasks] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);

  useEffect(() => {
    dispatch(fetchSampleMembers());
    const timer = setInterval(() => {
      dispatch(autoResetOffline({ cutoffMs: 10 * 60 * 1000 }));
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  let shown = members.slice();
  if (filterStatus) shown = shown.filter(m => m.status === filterStatus);
  if (sortByTasks) {
    shown.sort(
      (a, b) =>
        b.tasks.filter(t => !t.completed).length -
        a.tasks.filter(t => !t.completed).length
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 max-w-7xl mx-auto w-full">
          {/* Summary cards row */}
          <SummaryCards />

          <div className="mt-8 grid grid-cols-3 gap-6">
            {/* Members list */}
            <div className="col-span-2 space-y-6">
              {/* Filters */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="p-2 rounded border bg-white dark:bg-gray-800 
                               border-gray-300 dark:border-gray-600
                               text-gray-700 dark:text-gray-200"
                  >
                    <option value="">All statuses</option>
                    <option>Working</option>
                    <option>Meeting</option>
                    <option>Break</option>
                    <option>Offline</option>
                  </select>

                  <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={sortByTasks}
                      onChange={e => setSortByTasks(e.target.checked)}
                      className="accent-blue-500"
                    />
                    <span className="text-sm">Sort by active tasks</span>
                  </label>
                </div>
              </div>

              {/* Member grid */}
              <div className="grid grid-cols-2 gap-4">
                {shown.map(m => (
                  <MemberCard
                    key={m.id}
                    member={m}
                    showAssignBtn={role === 'lead'}
                    onSelect={() => setAssignTarget(m)}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar-like right column */}
            <aside className="space-y-6">
              {role === 'lead' ? (
                <>
                  <TaskForm preselectMemberId={assignTarget?.id} />
                  <div className="p-4 rounded-lg shadow 
                                  bg-white dark:bg-gray-900 
                                  border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Quick Lead Actions
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Click a member’s "Assign" to prefill the form.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <StatusSelector />
                  <TaskList memberId={currentUser?.id || members[0]?.id} />
                </>
              )}
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
