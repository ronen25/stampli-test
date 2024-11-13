import { useState } from 'react';
import './App.css';
import UITextInput from './components/UITextInput';
import UIView from './components/UIView';

function App() {
  const [uiText, setUIText] = useState('');

  const onSetUIText = (value: string) => {
    setUIText(value);
  };

  const rerender = () => {
    setUIText((uiText) => uiText);
  };

  const onRerenderClick = () => {
    rerender();
  };

  return (
    <div className='p-4 flex flex-col h-full w-full items-stretch justify-stretch'>
      <h1 className='text-3xl mb-4'>Test app</h1>
      <UITextInput text={uiText} setText={onSetUIText} />

      <button
        className='border-2 border-blue-400 bg-blue-500 hover:bg-blue-800 hover:text-white my-2'
        onClick={onRerenderClick}
      >
        Rerender
      </button>

      <UIView text={uiText} />
    </div>
  );
}

export default App;
