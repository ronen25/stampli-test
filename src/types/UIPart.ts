type UIPart = {
  id: string;
  row: number;
  col: number;
  label: string;
  type: 'SELECT' | 'TEXT_INPUT';
  value: string;
};

export default UIPart;
