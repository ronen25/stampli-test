interface Props {
  text: string;
  setText: (text: string) => void;
}

const UITextInput = ({ text, setText }: Props) => {
  return (
    <div className='flex flex-row border-2'>
      <textarea
        className='flex-1 h-96 align-top p-1'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default UITextInput;
