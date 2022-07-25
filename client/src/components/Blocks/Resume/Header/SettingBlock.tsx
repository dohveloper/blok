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
  const [rem, setRem] = useState(data.headerHighlight?.value);

  return (
    <>
      <Card
        title="Header"
        onRemove={onRemove}
        icon={icons.Navbar}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
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
          title="너비"
          required={true}
          guideline="1~10 숫자를 입력해주세요."
          type="number"
          value={rem}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (0 <= Number(e.target.value) && 10 >= Number(e.target.value)) {
              setRem(e.target.value);
              dispatch(
                updateBlockData({
                  blockId: id,
                  field: 'number',
                  value: { value: e.target.value },
                })
              );
            }
          }}
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
