import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../Input';
import { Card } from '../../../Card/Card';
import { getStyleOptions, getCurrentStyleOption } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
  updateTemplate,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import { SettingBlockProps, StyleData } from '../../blockValidator';
import * as icons from '../../../../icons';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();

  const [style, setStyle] = useState(currentStyle);
  const [title, setTitle] = useState(data.title?.value);
  const [schoolName, setSchoolName] = useState(data.leftText?.value);
  const [major, setMajar] = useState(data.rightText?.value);
  const [term, setTerm] = useState(data.caption?.value);
  const [navTitle, setNavTitle] = useState(data.navTitle);

  return (
    <>
      <Card
        title="Education"
        onRemove={onRemove}
        icon={icons.Education}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
        <TextInput
          title="메뉴명"
          required={false}
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
          required={true}
          guideline="스타일를 선택해주세요."
          placeholder="원하는 선택지를 선택해주세요"
          options={styleOptions}
          onChange={(e: StyleData) => {
            setStyle(e);
            dispatch(updateTemplate({ blockId: id, newTemplate: e.value }));
          }}
          value={style}
        />
        <TextInput
          title="타이틀"
          required={true}
          guideline="텍스트를 입력해주세요"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'title',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="학력"
          required={true}
          guideline="텍스트를 입력해주세요"
          value={schoolName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSchoolName(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'leftText',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="전공"
          required={false}
          guideline="텍스트를 입력해주세요"
          value={major}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMajar(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'rightText',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="기간"
          required
          guideline="텍스트를 입력해주세요"
          value={term}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTerm(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'caption',
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
