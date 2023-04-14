import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  fetchUsers,
  stateType,
} from '../redux/features/userSlice';

function Users() {
  const { users, isLoading, error } = useSelector<any, stateType>(
    (state) => state
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [fetchUsers]);

  return (
    <div>
      <h1>Users</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>Error: {error}</div>}
      {users?.length > 0 && (
        <ul>
          {users.map((user: any) => (
            <li key={user.email}>
              {user.name?.first} {user.name?.last}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
