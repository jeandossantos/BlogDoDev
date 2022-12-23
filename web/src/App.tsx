import { Toaster } from 'react-hot-toast';
import './App.css';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import Routes from './components/Routes';

function App() {
  return (
    <div className="app max-w-[1344px]  mx-auto  grid grid-rows-[5rem_1fr_5rem]  grid-cols-[1fr_20rem] rounded-md  border-4 border-zinc-500">
      <Header />
      <Routes />
      <Aside />
      <Toaster position="top-center" />
      <Footer />
    </div>
  );
}

export default App;
