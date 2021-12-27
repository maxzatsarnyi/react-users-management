import './index.scss';
import { Info } from '../../app/components/Info';

const UserInfo = () => {
  return (
    <div className='info'>
      <div className='info__container'>
        <h1>User Info</h1>
        <Info />
      </div>
    </div>
  );
};

export default UserInfo;
