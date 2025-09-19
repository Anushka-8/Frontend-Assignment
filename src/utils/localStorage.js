// helpers to persist needed parts of state
export const saveStateToLocal = (state) => {
  try {
    const toSave = {
      members: state.members,
      role: state.role,
    };
    localStorage.setItem('team_pulse_state_v1', JSON.stringify(toSave));
  } catch (e) { /* ignore */ }
};
