import { useState } from 'react';
import { TextInput, CustomSelect, ArrInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import { getStyleOptions } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import { SettingBlockProps } from '../../blockValidator';
import styled from 'styled-components';
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
  const [intros, setIntros] = useState('');
  const [arr, setArr] = useState(data.arrText?.value);
  const Skill = styled.div`
    box-sizing: border-box;
    padding: 5px 8px;
    background-color: #f0f1f3;
    margin: 0 4px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  `;
  const Intro = styled.span`
    font-size: 1rem;
    color: black;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
  `;
  const Del = styled.img`
    width: 8px;
    height: 8px;
    padding: 3px;
    margin-left: 2px;
    cursor: pointer;
  `;
  const skills = (data: Array<string> | undefined) => {
    const arr = [];
    if (!data) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      arr.push(
        <Skill key={`${data}-${i}`}>
          {data[i]}
          <Del
            src={icons.x}
            onClick={() => {
              setArr((res) => {
                if (!res) {
                  return;
                }
                res.splice(i, 1);
                return [...res];
              });
            }}
          />
        </Skill>
      );
    }
    return arr;
  };

  return (
    <>
      <Card title='Skillset' pinned onRemove={onRemove} icon={icons.Skillset}>
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
        <ArrInput
          title='기술 스택'
          required
          guideline='기술 스택을 입력해주세요'
          key={'skillset'}
          value={intros}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIntros(e.target.value);
          }}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            console.log(e);
            setArr((res) => {
              if (!res) {
                return;
              }
              return [...res, intros];
            });
            setIntros(() => '');
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'arrText',
                value: { value: arr },
              })
            );
          }}
          arr={<Intro>{skills(arr)}</Intro>}
        ></ArrInput>
      </Card>
    </>
  );
}

export default SettingBlock;
