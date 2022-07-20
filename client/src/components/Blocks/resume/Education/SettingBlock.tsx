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
  const [schoolName, setSchoolName] = useState(data.leftText?.value);
  const [major, setMajar] = useState(data.rightText?.value);
  const [term, setTerm] = useState(data.caption?.value);

  return (
    <>
      <Card title='Skillset' pinned onRemove={onRemove} icon={icons.Education}>
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
          title='학교'
          required={true}
          guideline='텍스트를 입력해주세요'
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
          title='전공'
          required={false}
          guideline='텍스트를 입력해주세요'
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
          title='기간'
          required
          guideline='텍스트를 입력해주세요'
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
