import styled from 'styled-components';
import React, { useMemo, useRef, useState } from 'react';
import ReactSelect from 'react-select';

const Width100 = styled.div`
  width: 100%;
  margin-top: 28px;
`;

const DisplayNone = styled.div`
  display: none;
`;

export const Label = styled.div<{ required?: boolean }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 12px;
  span {
    display: ${(props) => (props.required === true ? 'static' : 'none')};
  }
`;
export const Required = styled.span`
  color: red;
  margin-left: 2px;
`;

const InputImg = styled.input`
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  height: 48px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 12px 19px;
  border-radius: 5px;
`;

const PreviewImg = styled.img`
  width: 100px;
`;

interface ImgInputprops {
  title?: string;
  required?: boolean;
  placeholder?: string;
  guideline?: string;
}
interface Inputprops {
  title?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: any;
  guideline?: string;
  value?: string;
  ref?: React.RefObject<HTMLInputElement>;
}

export const Input = styled.input`
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  height: 48px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 15px 19px;
  border-radius: 5px;
  @media screen and (max-width: 499px) {
    font-size: 12px;
  }
`;

export const Guideline = styled.div`
  color: #949494;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-top: 16px;
  margin-left: 1px;
`;

export function TextInput(props: Inputprops) {
  return (
    <Width100>
      {props.title ? (
        <Label required={props.required}>
          {props.title}
          <Required>*</Required>
        </Label>
      ) : (
        <DisplayNone />
      )}
      <Input
        placeholder={
          props.placeholder
            ? props.placeholder
            : '안에 들어갈 내용을 입력하세요'
        }
        value={props.value && props.value}
        onChange={props.onChange}
        ref={props.ref}
      />
      {props.guideline ? (
        <Guideline>{props.guideline}</Guideline>
      ) : (
        <DisplayNone />
      )}
    </Width100>
  );
}

export const SelectBox = styled(ReactSelect)`
  width: 100%;
`;

export const CustomSelect = (props: any) => {
  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        width: '100%',
        color: state.data.color,
        opacity: 0.8,
        padding: 20,
        height: 52,
      }),
      control: (provided: any) => ({
        ...provided,
        border: '1px solid #ececec',
        height: 48,
        width: '100%',
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: state.data.color,
        width: '100%',
      }),
    }),
    []
  );
  return (
    <Width100>
      {props.title ? (
        <Label required={props.required}>
          {props.title}
          <Required>*</Required>
        </Label>
      ) : (
        <DisplayNone />
      )}
      <SelectBox
        placeholder={props.placeholder}
        value={props.value}
        styles={customStyles}
        options={props.options}
        onChange={props.onChange}
      />
      {props.guideline ? (
        <Guideline>{props.guideline}</Guideline>
      ) : (
        <DisplayNone />
      )}
    </Width100>
  );
};

export const ImgInput = (props: ImgInputprops) => {
  // const [ImgLoading, setImgLoading] = useState<boolean>(false);
  const ImgRef = useRef<HTMLInputElement>(null);
  const [Img, setImg] = useState<any>(null);
  const onImgChange = async (event: any) => {
    // setImgLoading(true);
    setImg(URL.createObjectURL(event.target.files[0]));
    // const response = axios.post(URL.createObjectURL(event.target.files[0]))
    // setImgLoading(false);
  };
  return (
    <Width100>
      {props.title ? (
        <Label required={props.required}>
          {props.title}
          <Required>*</Required>
        </Label>
      ) : (
        <DisplayNone />
      )}
      <InputImg
        ref={ImgRef}
        type='file'
        className='imgInput'
        accept='image/*'
        name='file'
        onChange={onImgChange}
      />
      {props.guideline ? (
        <Guideline>{props.guideline}</Guideline>
      ) : (
        <DisplayNone />
      )}
      {Img !== null ? <PreviewImg src={Img} /> : <DisplayNone />}
    </Width100>
  );
};
