import { useSelector } from 'react-redux';
import { useCheckIfUserValid } from '../hooks/use-check-if-user-valid';
const Dummy = () => {

    useCheckIfUserValid() //token
  const user = useSelector(state => state.user); //ridux

  if (!user || !user.username) {
    return <div>Loading...</div>; 
  }
console.log(user);

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      {/* <h2>{user._id}</h2> */}
    </div>
  );
};

export default Dummy;
