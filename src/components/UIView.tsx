import { useCallback, useEffect, useRef, useState } from 'react';
import UIPart from '../types/UIPart';
import { nanoid } from 'nanoid';

interface Props {
  text: string;
  onChange?: (name: string, value: string) => void;
}

const parseUI = (text: string): UIPart[] | null => {
  const uiParts: UIPart[] = [];

  for (const line of text.split('\n')) {
    if (line.length === 0) {
      continue;
    }

    const parts = line.split(';');
    if (parts.length != 5) {
      console.error("Line must have 5 parts but doesn't: ", line);
      return null;
    }

    const [row, col, label, inputType, value] = parts;
    uiParts.push({
      id: nanoid(),
      row: parseInt(row) as number,
      col: parseInt(col) as number,
      label,
      type: inputType as unknown as 'SELECT' | 'TEXT_INPUT', // TODO: Verify this
      value,
    });
  }

  return uiParts;
};

const getInput = (type: 'SELECT' | 'TEXT_INPUT', value: string) => {
  if (type === 'SELECT') {
    return (
      <select className='flex-1 m-1 p-1'>
        {value.split(',').map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  } else {
    return <input type='text' className='border m-1 flex-1' placeholder={value} />;
  }
};

const UIView = ({ text }: Props) => {
  const renderFlag = useRef(false);
  const [parts, setParts] = useState<UIPart[]>([]);

  useEffect(() => {
    setParts(parseUI(text) ?? []);
  }, [text, renderFlag]);

  const renderedParts = useCallback(
    (order: 'COL' | 'GRID' = 'GRID') => {
      const partArr = order === 'GRID' ? parts : parts.sort((item) => item.row);

      return partArr.map((part) => (
        <div
          key={part.id}
          className='flex flex-row border-4 items-center'
          style={{ gridColumnStart: part.col, gridRowStart: part.row }}
        >
          <label className='font-bold mr-2'>{part.label}</label>
          {getInput(part.type, part.value)}
        </div>
      ));
    },
    [parts]
  );

  return (
    <div className='flex-1'>
      <div className='hidden md:grid grid-flow-col auto-cols-max auto-rows-max justify-stretch items-stretch'>
        {parts.length != 0 ? renderedParts() : <div>Nothing to render...</div>}
      </div>

      <div className='md:hidden flex flex-col justify-stretch items-stretch'>
        {parts.length != 0 ? renderedParts('COL') : <div>Nothing to render...</div>}
      </div>
    </div>
  );
};

export default UIView;
