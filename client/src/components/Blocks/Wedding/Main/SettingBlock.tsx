import { useState } from 'react';
import { TextInput, CustomSelect, ImgInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import { getCurrentStyleOption, getStyleOptions } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
  updateTemplate,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import * as icon from '../../../../icons';
import { SettingBlockProps, StyleData } from '../../blockValidator';
import axios from 'axios';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();

  //Input
  const [navTitle, setNavTitle] = useState(data.navTitle);
  const [style, setStyle] = useState(currentStyle);
  const [date, setDate] = useState(data.date?.value);
  const [venue, setVenue] = useState(data.venue?.value);
  const [header, setHeader] = useState(data.header?.value);
  const [body, setBody] = useState(data.body?.value);
  const [image, setImage] = useState(data.image);

  const imgHandler = async (data: any) => {
    const formData = new FormData();
    formData.append('file', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const result = await axios.post('/api/site/image', formData, config);

    setImage(result.data);
    dispatch(
      updateBlockData({
        blockId: id,
        field: 'image',
        value: {
          src: result.data,
          alt: result.data,
        },
      })
    );
  };

  return (
    <>
      <Card
        title='Main'
        onRemove={onRemove}
        icon={icon.Feature}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
        <CustomSelect
          title='스타일'
          required
          guideline='스타일를 선택해주세요.'
          placeholder='원하는 선택지를 선택해주세요'
          options={styleOptions}
          onChange={(e: StyleData) => {
            setStyle(e);
            dispatch(updateTemplate({ blockId: id, newTemplate: e.value }));
          }}
          value={style}
        />

        <TextInput
          title='신랑/신부 이름'
          required
          guideline='헤드라인에 표시될 내용을 입력하세요.'
          value={header}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHeader(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'header',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title='추가 문구'
          required={false}
          guideline='설명에 표시될 내용을 입력하세요'
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBody(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'body',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <ImgInput
          title='이미지'
          guideline='사이트에 표시할 이미지를 업로드하세요'
          src={image?.src}
          alt={image?.alt}
          placeholder={image?.src}
          onChange={imgHandler}
        />
        <TextInput
          title='결혼 날짜'
          required
          guideline='yyyy-mm-dd-hh-mm 형식으로 입력해주세요'
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDate(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'date',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title='결혼 장소'
          required
          guideline='결혼식 장소를 입력해주세요'
          value={venue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setVenue(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'venue',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
