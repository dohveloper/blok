import { useState } from 'react';
import { TextInput, CustomSelect, ImgInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import { NavData } from '../../blockValidator';

interface Navbar {
  data: NavData;
}
function Navbar({ data }: Navbar) {
  const [input, setInput] = useState('');
  const [selectinput, setSelectInput] = useState('');
  const options = [
    { value: '스타일1', label: '스타일1' },
    { value: '스타일2', label: '스타일2' },
    { value: '스타일3', label: '스타일3' },
  ];
  console.log(data.style.value);
  return (
    <>
      <Card title='Navbar'>
        <CustomSelect
          title='스타일'
          required={true}
          guideline='스타일를 선택해주세요.'
          placeholder='원하는 선택지를 선택해주세요'
          options={options}
          onChange={(e: any) => {
            setSelectInput(e.value);
          }}
          value={data?.style?.value}
        />
        <ImgInput title='로고 이미지' guideline='가능한 포맷: .jpg, .png' />
        <TextInput
          title='로고 텍스트'
          required={true}
          onChange={setInput}
          guideline='로고이미지가 없을시 입력될 로고 텍스트를 입력하세요.'
          value={data?.logoText?.value}
        ></TextInput>
      </Card>
    </>
  );
}

export default Navbar;
