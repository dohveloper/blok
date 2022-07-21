import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../../Input';
import { Card } from '../../../../Card/Card';
import { getStyleOptions, getCurrentStyleOption } from '../../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
  updateTemplate,
} from '../../../../../reducers/SiteReducer';
import type { RootState } from '../../../../../reducers/store';
import * as icon from '../../../../../icons';
import { SettingBlockProps, StyleData } from '../../../blockValidator';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  let styleOptions = getStyleOptions(template);
  let currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();

  //Input

  const [navTitle, setNavTitle] = useState(data.navTitle);
  const [style, setStyle] = useState(currentStyle);

  const [caption, setCaption] = useState(data.caption?.value);
  const [header, setHeader] = useState(data.header?.value);
  const [headerHighlight, setHeaderHighlight] = useState(
    data.headerHighlight?.value
  );
  const [body, setBody] = useState(data.body?.value);

  return (
    <>
      <Card title="Feature" onRemove={onRemove} icon={icon.Feature}>
        <TextInput
          title="메뉴명"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNavTitle(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'navTitle',
                value: e.target.value,
              })
            );
          }}
          guideline="네비게이션 바에 입력될 메뉴명을 입력하세요."
          value={navTitle}
        ></TextInput>
        <CustomSelect
          title="스타일"
          required
          guideline="스타일를 선택해주세요."
          placeholder="원하는 선택지를 선택해주세요"
          options={styleOptions}
          onChange={(e: StyleData) => {
            setStyle(e);
            dispatch(
              dispatch(updateTemplate({ blockId: id, newTemplate: e.value }))
            );
          }}
          value={style}
        />
        <TextInput
          title="캡션"
          required={false}
          guideline="캡션에 표시될 내용을 입력하세요."
          value={caption}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCaption(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'caption',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="헤드라인"
          required
          guideline="헤드라인에 표시될 내용을 입력하세요."
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
          title="헤드라인 강조 테스트"
          required={false}
          guideline="헤드라인 내용 중에서 강조할 텍스트를 입력하세요"
          value={headerHighlight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHeaderHighlight(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'headerHighlight',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="설명"
          required={false}
          guideline="설명에 표시될 내용을 입력하세요"
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
      </Card>
    </>
  );
}

export default SettingBlock;
