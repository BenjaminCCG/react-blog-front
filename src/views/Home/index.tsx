import reactLogo from '@assets/react.svg';
import HomeStyle from './index.module.scss';
import { useUserStore } from '@store/user';
function Home() {
  const { num, changeNum } = useUserStore();
  const navigate = useNavigate();
  const goAboutPage = () => {
    navigate('/about');
  };

  return (
    <>
      <div onClick={goAboutPage}>click</div>
    </>
  );
}

export default Home;
