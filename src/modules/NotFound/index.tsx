import './index.scss';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../routes/index';

const NotFound = () => {
  return (
    <div className='notfound-page'>
      <div className='notfound'>
        <h1 className='notfound__title'>Page is not founded</h1>
        <Link to={`${ERoutes.home}`} className='notfound__link'>
          home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
