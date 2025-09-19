import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

// Utility: load initial from localStorage
const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem('team_pulse_state_v1');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
};

const persisted = loadFromLocal();

export const fetchSampleMembers = createAsyncThunk(
  'members/fetchSample',
  async (_, thunkAPI) => {
    // optional fetch from randomuser.me (no error if blocked)
    try {
      const res = await fetch('https://randomuser.me/api/?results=4&nat=us');
      const json = await res.json();
      return json.results.map((u, idx) => ({
        id: nanoid(),
        name: `${u.name.first} ${u.name.last}`,
        avatar: u.picture.thumbnail,
        status: ['Working','Break','Meeting','Offline'][idx % 4],
        tasks: [], // array of { id, title, dueDate, progress, completed }
        lastActive: Date.now()
      }));
    } catch (e) {
      // fallback seeded data
      return [
        { id: 'm1', name: 'John Doe', avatar: '', status: 'Working', tasks: [], lastActive: Date.now() },
        { id: 'm2', name: 'Jane Smith', avatar: '', status: 'Break', tasks: [], lastActive: Date.now() },
        { id: 'm3', name: 'Ali Khan', avatar: '', status: 'Meeting', tasks: [], lastActive: Date.now() },
        { id: 'm4', name: 'Priya Patel', avatar: '', status: 'Offline', tasks: [], lastActive: Date.now() },
      ];
    }
  }
);

const initialState = persisted?.members ?? {
  membersList: [], // each member: {id, name, avatar, status, tasks: [{id, title, dueDate, progress, completed}]}
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers(state, action) {
      state.membersList = action.payload;
    },
    updateMemberStatus(state, action) {
      const { memberId, status } = action.payload;
      const m = state.membersList.find(x => x.id === memberId);
      if (m) {
        m.status = status;
        m.lastActive = Date.now();
      }
    },
    assignTask(state, action) {
      const { memberId, title, dueDate } = action.payload;
      const member = state.membersList.find(m => m.id === memberId);
      if (!member) return;
      member.tasks.push({
        id: nanoid(),
        title,
        dueDate,
        progress: 0,
        completed: false
      });
      member.lastActive = Date.now();
    },
    incrementTaskProgress(state, action) {
      const { memberId, taskId, delta = 10 } = action.payload;
      const member = state.membersList.find(m => m.id === memberId);
      const task = member?.tasks.find(t => t.id === taskId);
      if (!task || task.completed) return;
      task.progress = Math.min(100, task.progress + delta);
      if (task.progress >= 100) {
        task.progress = 100;
        task.completed = true;
      }
      member.lastActive = Date.now();
    },
    decrementTaskProgress(state, action) {
      const { memberId, taskId, delta = 10 } = action.payload;
      const member = state.membersList.find(m => m.id === memberId);
      const task = member?.tasks.find(t => t.id === taskId);
      if (!task || task.completed) return;
      task.progress = Math.max(0, task.progress - delta);
      if (task.progress < 100) task.completed = false;
      member.lastActive = Date.now();
    },
    removeTask(state, action) {
      const { memberId, taskId } = action.payload;
      const member = state.membersList.find(m => m.id === memberId);
      if (!member) return;
      member.tasks = member.tasks.filter(t => t.id !== taskId);
    },
    addMember(state, action) {
      state.membersList.push({
        id: nanoid(), ...action.payload, tasks: [], lastActive: Date.now()
      });
    },
    autoResetOffline(state, action) {
      // bonus: auto reset statuses of users with lastActive older than given threshold
      const { cutoffMs } = action.payload;
      const now = Date.now();
      state.membersList.forEach(m => {
        if (m.status !== 'Offline' && now - (m.lastActive || 0) > cutoffMs) {
          m.status = 'Offline';
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSampleMembers.fulfilled, (state, action) => {
      // only set sample members if state empty
      if (state.membersList.length === 0) {
        state.membersList = action.payload;
      }
    });
  }
});

export const {
  setMembers, updateMemberStatus, assignTask,
  incrementTaskProgress, decrementTaskProgress,
  removeTask, addMember, autoResetOffline
} = membersSlice.actions;

export default membersSlice.reducer;
