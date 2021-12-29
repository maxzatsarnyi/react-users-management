import './index.scss';
import { UserForm } from '../../app/components/UserForm';

const UserInfo = () => {
  return (
    <div className='user'>
      <div className='user__container'>
        <UserForm />
      </div>
    </div>
  );
};

export default UserInfo;
