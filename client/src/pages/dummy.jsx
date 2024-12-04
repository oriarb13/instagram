import { useSelector } from 'react-redux';

const Dummy = () => {
  // גישה לסטור של המשתמש
  const user = useSelector(state => state.user);

  if (!user || !user.username) {
    return <div>Loading...</div>;  // אם המידע על המשתמש לא קיים עדיין בסטור
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
};

export default Dummy;
