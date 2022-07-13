import styled, { css } from 'styled-components';
import React, { useMemo, useState } from 'react';
import ReactSelect, { GroupBase, OptionsOrGroups } from 'react-select';
import Dropzone from './Dropzone';
import ImageCrop from './ImageCrop';

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

interface Inputprops {
  title?: string;
  required?: boolean;
  placeholder?: string;
  onChange: Function;
  guideline?: string;
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.onChange(e.target.value);
        }}
      />
      {props.guideline ? (
        <Guideline>{props.guideline}</Guideline>
      ) : (
        <DisplayNone />
      )}
    </Width100>
  );
}
export const Width100 = styled.div`
  width: 100%;
`;

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

const Container = styled.div`
  width: 600px;
  padding: 3rem;
  background-color: #fff;
  z-index: 11;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 16px;
`;

interface IImageUploadModalProps {
  closeModal: () => void;
}

export function ImageUploadModal({ closeModal }: IImageUploadModalProps) {
  const [image, setImage] = useState('');

  const onChangeImage = (uploadedImage: File) => {
    setImage(URL.createObjectURL(uploadedImage));
  };

  return (
    <Container>
      {image ? (
        <ImageCrop image={image} closeModal={closeModal} />
      ) : (
        <Dropzone onChangeImage={onChangeImage} />
      )}
    </Container>
  );
}
