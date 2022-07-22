import { useState } from 'react';
import { CustomSelect, TextInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  updateTemplate,
  selectBlockById,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import * as icon from '../../../../icons';
import { SettingBlockProps, StyleData } from '../../blockValidator';
import { getStyleOptions, getCurrentStyleOption } from '../../blockHelper';

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
  const [leftText, setLeftText] = useState(data.leftText?.value);
  const [rightText, setRightText] = useState(data.rightText?.value);
  return (
    <>
      <Card
        title="Footer"
        pinned
        onRemove={onRemove}
        icon={icon.Footer}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
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
            dispatch(updateTemplate({ blockId: id, newTemplate: e.value }));
          }}
          value={style}
        />
        <TextInput
          title="왼쪽 텍스트"
          required={false}
          placeholder="©2022 Block Inc. All rights reserved"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLeftText(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'leftText',
                value: { value: e.target.value },
              })
            );
          }}
          guideline="푸터 왼쪽에 들어갈 문구를 입력하세요"
          value={leftText}
        ></TextInput>
        <TextInput
          title="오른쪽 텍스트"
          required={false}
          placeholder="블록"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRightText(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'rightText',
                value: { value: e.target.value },
              })
            );
          }}
          guideline="푸터 오른쪽에 들어갈 문구를 입력하세요."
          value={rightText}
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
