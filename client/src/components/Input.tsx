import styled from 'styled-components';
import React, { useMemo, useRef, useState, forwardRef } from 'react';
import ReactSelect from 'react-select';

const Width100 = styled.div`
  width: 100%;
  margin-top: 28px;
`;

const Widthflex = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Width90 = styled.div`
  width: 257px;
  margin-top: 28px;
  margin: 28px 1% 0 1%;
  box-sizing: border-box;
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
  padding: 15px 120px;
`;

const ArrButton = styled.button`
  font-size: 16px;
  line-height: 19px;
  width: 7rem;
  height: 48px;
  background-color: transparent;
  margin-left: 5px;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 12px 19px;
  border-radius: 5px;
`;

interface ImgInputprops {
  title?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: any;
  guideline?: string;
  value?: string | null;
  defaultValue?: string;
  ref?: React.RefObject<HTMLInputElement>;
  key?: string;
  src?: string;
  alt?: string;
}
interface Inputprops {
  title?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: any;
  onKeyPress?: any;
  guideline?: string;
  value?: string | null;
  ref?: React.RefObject<HTMLInputElement>;
  defaultValue?: string;
  key?: string;
  type?: string;
}
interface InputArrprops {
  title?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: any;
  onClick?: any;
  onKeyPress?: any;
  guideline?: string;
  value?: any;

  key?: string;
  type?: string;
  arr?: any;
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
  &::placeholder {
    color: #c8c8c8;
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

const ImgBnt = styled.label`
  font-size: 16px;
  width: 6.5rem;
  height: 40px;
  margin-left: 5px;
  line-height: 16px;
  text-align: center;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 12px 19px;
  border-radius: 30px;
`;

export const TextInput = forwardRef<HTMLInputElement, Inputprops>(
  (props: Inputprops, ref) => {
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
          value={props.value ? props.value : ''}
          onChange={props.onChange}
          key={props.key}
          ref={ref}
          defaultValue={props.defaultValue}
        />
        {props.guideline ? (
          <Guideline>{props.guideline}</Guideline>
        ) : (
          <DisplayNone />
        )}
      </Width100>
    );
  }
);

export const ArrInput = forwardRef<HTMLInputElement, InputArrprops>(
  (props: InputArrprops, ref) => {
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
        <Widthflex>
          <Input
            placeholder={
              props.placeholder
                ? props.placeholder
                : '안에 들어갈 내용을 입력하세요'
            }
            onChange={props.onChange}
            key={props.key}
            value={props.value}
          />
          <ArrButton onClick={props.onClick}>add</ArrButton>
        </Widthflex>
        {props.arr}
        {props.guideline ? (
          <Guideline>{props.guideline}</Guideline>
        ) : (
          <DisplayNone />
        )}
      </Width100>
    );
  }
);

export const TextInputWidth90 = forwardRef<HTMLInputElement, Inputprops>(
  (props: Inputprops, ref) => {
    return (
      <Width90>
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
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          key={props.key}
          ref={ref}
          type={props.type}
        />
        {props.guideline ? (
          <Guideline>{props.guideline}</Guideline>
        ) : (
          <DisplayNone />
        )}
      </Width90>
    );
  }
);

export const SelectBox = styled(ReactSelect)`
  width: 100%;
  & :hover {
    cursor: pointer;
  }
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
        key={props.key}
        defaultValue={props.defaultValue}
      />
      {props.guideline ? (
        <Guideline>{props.guideline}</Guideline>
      ) : (
        <DisplayNone />
      )}
    </Width100>
  );
};

export const CustomSelectWidth90 = (props: any) => {
  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        width: '100%',
        color: state.data.color,
        opacity: 0.8,
        padding: 20,
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
    <Width90>
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
        key={props.key}
        defaultValue={props.defaultValue}
      />
      {props.guideline ? (
        <Guideline>{props.guideline}</Guideline>
      ) : (
        <DisplayNone />
      )}
    </Width90>
  );
};

export const ImgInput = forwardRef<HTMLInputElement, ImgInputprops>(
  (props: ImgInputprops, ref) => {
    const [Img, setImg] = useState<any>(null);
    const onImgChange = (event: any, imgHandler: Function) => {
      setImg(URL.createObjectURL(event.target.files[0]));
      imgHandler(event.target.files[0]);
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
        <Widthflex>
          <Input
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: '7px 12px',
            }}
            disabled
            value={
              Img
                ? Img.split('blob:http://localhost:3000/')[1]
                : props.placeholder
            }
          ></Input>
          <ImgBnt htmlFor='imgUpload'>올리기</ImgBnt>
        </Widthflex>

        <InputImg
          style={{ display: 'none' }}
          key={props.key}
          id='imgUpload'
          ref={ref}
          type='file'
          className='imgInput'
          accept='image/*'
          name='file'
          onChange={(e: any) => {
            onImgChange(e, props.onChange);
          }}
        />
        {props.guideline ? (
          <Guideline>{props.guideline}</Guideline>
        ) : (
          <DisplayNone />
        )}
        {Img !== null ? <PreviewImg src={Img} /> : <DisplayNone />}
      </Width100>
    );
  }
);
