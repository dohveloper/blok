import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../Input';
import { Card } from '../../../Card/Card';
import { HeroData } from '../../blockValidator';

interface Hero {
  data: HeroData;
}

function Hero({ data }: Hero) {
  const [input, setInput] = useState('');
  const [selectinput, setSelectInput] = useState('');
  const options = [
    { value: '스타일1', label: '스타일1' },
    { value: '스타일2', label: '스타일2' },
    { value: '스타일3', label: '스타일3' },
  ];
  return (
    <>
      <Card title='Hero'>
        <TextInput
          title='메뉴명'
          required={true}
          onChange={setInput}
          guideline='네비게이션 바에 입력될 메뉴명을 입력하세요.'
          value={data.navTitle}
        ></TextInput>
        <CustomSelect
          title='스타일'
          required={true}
          guideline='스타일를 선택해주세요.'
          placeholder='원하는 선택지를 선택해주세요'
          options={options}
          value={data.style.value}
          onChange={(e: any) => {
            setSelectInput(e.value);
          }}
        />
        <TextInput
          title='캡션'
          required={false}
          onChange={setInput}
          guideline='캡션에 표시될 내용을 입력하세요.'
          value={data?.caption?.value}
        ></TextInput>
        <TextInput
          title='헤드라인'
          required={false}
          onChange={setInput}
          guideline='캡션에 표시될 내용을 입력하세요.'
          value={data?.header?.value}
        ></TextInput>
        <TextInput
          title='헤드라인 강조 테스트'
          required={false}
          onChange={setInput}
          guideline='헤드라인 내용 중에서 강조할 텍스트를 입력하세요'
        ></TextInput>
        <TextInput
          title='설명'
          required={false}
          onChange={setInput}
          guideline='설명에 표시될 내용을 입력하세요'
          value={data?.body?.value}
        ></TextInput>
        <TextInput
          title='버튼 텍스트'
          required={false}
          onChange={setInput}
          guideline='비워둘 경우 버튼이 나타나지 않습니다.'
          value={data?.button?.title}
        ></TextInput>
        <TextInput
          title='버튼 URL'
          required={false}
          onChange={setInput}
          guideline='버튼 클릭시 이동될 url을 입력하세요'
          value={data?.button?.url}
        ></TextInput>
      </Card>
    </>
  );
}

export default Hero;
