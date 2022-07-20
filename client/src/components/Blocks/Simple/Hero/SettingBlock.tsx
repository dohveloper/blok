import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../Input';
import { Card } from '../../../Card/Card';
import { HeroData } from '../../blockValidator';
import * as icon from '../../../../icons';
import { getStyleOptions } from '../../blockHelper';
import { useAppSelector, useAppDispatch } from '../../../../reducers';
import {
  updateBlockData,
  selectBlockById,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import { SettingBlockProps } from '../../blockValidator';
interface Hero {
  data: HeroData;
  onRemove: (event: React.MouseEvent<HTMLElement>) => void;
}

function Hero({ blockId, onRemove }: SettingBlockProps) {
  const {
    id,
    template: { blockType },
    data,
  } = useAppSelector((state: RootState) => selectBlockById(state, blockId));
  let styleOptions = getStyleOptions(blockType);
  const dispatch = useAppDispatch();
  const [navTitle, setNavTitle] = useState(data.navTitle);
  const [caption, setCaption] = useState(data.caption?.value);
  const [header, setHeader] = useState(data.header?.value);
  const [body, setBody] = useState(data.logoText?.value);
  const [buttontext, setButtontext] = useState(data.button?.title);
  const [buttonurl, setButtonUrl] = useState(data.buttonurl?.url);
  const [style, setStyle] = useState({
    label: data.style?.value,
    value: data.style?.value,
  });
  return (
    <>
      <Card title='Hero' pinned onRemove={onRemove} icon={icon.Hero}>
        <TextInput
          title='메뉴명'
          required
          value={navTitle}
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
        ></TextInput>
        <CustomSelect
          title='스타일'
          required
          guideline='스타일를 선택해주세요.'
          placeholder='원하는 선택지를 선택해주세요'
          options={styleOptions}
          value={data.style}
          onChange={(e: any) => {
            setStyle(e);
            dispatch(
              updateBlockData({ blockId: id, field: 'style', value: e })
            );
          }}
        />
        <TextInput
          title='캡션'
          required={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCaption(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'title',
                value: { value: e.target.value },
              })
            );
          }}
          guideline='캡션에 표시될 내용을 입력하세요.'
          value={caption}
        ></TextInput>
        <TextInput
          title='헤드라인'
          required={false}
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
          guideline='캡션에 표시될 내용을 입력하세요.'
          value={header}
        ></TextInput>
        <TextInput
          title='설명'
          required={false}
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
          guideline='설명에 표시될 내용을 입력하세요'
          value={body}
        ></TextInput>
        <TextInput
          title='버튼 텍스트'
          required={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setButtontext(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'title',
                value: { title: e.target.value },
              })
            );
          }}
          guideline='비워둘 경우 버튼이 나타나지 않습니다.'
          value={buttontext}
        ></TextInput>
        <TextInput
          title='버튼 URL'
          required={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setButtonUrl(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'url',
                value: { url: e.target.value },
              })
            );
          }}
          guideline='버튼 클릭시 이동될 url을 입력하세요'
          value={buttonurl}
        ></TextInput>
      </Card>
    </>
  );
}

export default Hero;
