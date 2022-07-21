import { useState } from 'react';
import { TextInput, CustomSelect, ArrInput } from '../../../Input';
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
import styled from 'styled-components';
import * as icons from '../../../../icons';
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

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();
  const [style, setStyle] = useState(currentStyle);
  const [title, setTitle] = useState(data.title?.value);
  const [intros, setIntros] = useState('');
  const [arr, setArr] = useState(data.arrText?.value);
  const [projectTitle, setProjectTitle] = useState(data.leftText?.value);
  const [term, setTerm] = useState(data.caption?.value);
  const [role, setRole] = useState(data.rightText?.value);
  const [body, setbody] = useState(data.body?.value);
  const [projectUrl, setProjectUrl] = useState(data.button?.url);
  const [navTitle, setNavTitle] = useState(data.navTitle);
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
                const newarr = res.filter((value, index) => index !== i);
                dispatch(
                  updateBlockData({
                    blockId: id,
                    field: 'arrText',
                    value: { value: newarr },
                  })
                );
                return [...newarr];
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
      <Card title='Career' onRemove={onRemove} icon={icons.Career}>
        <TextInput
          title='메뉴명'
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
          guideline='네비게이션 바에 입력될 메뉴명을 입력하세요.'
          value={navTitle}
        ></TextInput>
        <CustomSelect
          title='스타일'
          required={true}
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
          title='Career'
          required={true}
          guideline='텍스트를 입력해주세요'
          value={projectTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProjectTitle(e.target.value);
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
          title='담당 업무'
          required={false}
          guideline='텍스트를 입력해주세요'
          value={role}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRole(e.target.value);
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
          required={false}
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
        <ArrInput
          title='적용 기술'
          required={false}
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
        <TextInput
          title='프로젝트 소개'
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
        <TextInput
          title='url'
          required={true}
          guideline='텍스트를 입력해주세요'
          value={projectUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProjectUrl(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'button',
                value: { url: e.target.value },
              })
            );
          }}
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
