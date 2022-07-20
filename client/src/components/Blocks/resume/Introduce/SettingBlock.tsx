import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../Input';
import { Card } from '../../../Card/Card';
import { getStyleOptions } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import { SettingBlockProps } from '../../blockValidator';
import * as icons from '../../../../icons';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const {
    id,
    template: { blockType },
    data,
  } = useSelector((state: RootState) => selectBlockById(state, blockId));
  let styleOptions = getStyleOptions(blockType);
  const dispatch = useDispatch();

  const [style, setStyle] = useState({
    label: data.style?.value,
    value: data.style?.value,
  });
  const [title, setTitle] = useState(data.title?.value);
  const [body, setbody] = useState(data.body?.value);

  return (
    <>
      <Card title='Skillset' pinned onRemove={onRemove} icon={icons.Introduce}>
        <CustomSelect
          title='스타일'
          required={true}
          guideline='스타일를 선택해주세요.'
          placeholder='원하는 선택지를 선택해주세요'
          options={styleOptions}
          onChange={(e: any) => {
            setStyle(e);
            dispatch(
              updateBlockData({ blockId: id, field: 'style', value: e })
            );
          }}
          value={style}
        />
        <TextInput
          title='타이틀'
          required={true}
          guideline='텍스트를 입력해주세요'
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
          title='소개글'
          required={true}
          guideline='텍스트를 입력해주세요'
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setbody(e.target.value);
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
