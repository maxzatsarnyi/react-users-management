import { useEffect } from 'react';
import './index.scss';
import { loadUsers } from '../../app/store/actions/users';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Users } from '../../app/components/Users';
import { ERoutes } from '../../routes';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(loadUsers(controller));
    return () => controller.abort();
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='home__container'>
        <h1>Users page</h1>
        <Users />
        <Link to={`/${ERoutes.user}`} className='home__button'>
          Add
        </Link>
        <ToastContainer
          position='bottom-left'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default HomePage;
