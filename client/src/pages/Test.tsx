import { useState, useMemo } from 'react';
import styled from 'styled-components';
import {
  TextInput,
  SelectBox,
  CustomSelect,
  ImageUploadModal,
} from '../components/Input';

const Container = styled.div`
  padding-top: 50px;
  background-color: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  @media screen and (max-width: 1120px) {
    justify-content: flex-start;
  }
`;

function Test() {
  const [input, setInput] = useState('');
  const [selectinput, setSelectInput] = useState('');
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,

        color: state.data.color,
        opacity: 0.8,
        padding: 20,
      }),
      control: (provided: any) => ({
        ...provided,
        border: '1px solid #ececec',
        height: 48,
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: state.data.color,
      }),
    }),
    []
  );
  return (
    <Container>
      <TextInput
        title='TextInput'
        required={true}
        onChange={setInput}
      ></TextInput>
      <TextInput
        title='TextInput'
        required={false}
        onChange={setInput}
        guideline='여기에 가이드라인을 적으세요'
      ></TextInput>
      <TextInput onChange={setInput}></TextInput>
      <div></div>
      <SelectBox styles={customStyles} options={options} />
      <CustomSelect
        title='드롭다운'
        required={true}
        guideline='드롭다운 입니다. 위에서 선택지를 선택해주세요.'
        placeholder='원하는 선택지를 선택해주세요'
        options={options}
        onChange={(e: any) => {
          setSelectInput(e.value);
        }}
      />

      <div>입력값 : {input}</div>
      <div>선택값 : {selectinput}</div>
    </Container>
  );
}

export default Test;
