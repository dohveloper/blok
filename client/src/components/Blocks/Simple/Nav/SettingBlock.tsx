import { useState } from 'react';
import { TextInput, CustomSelect, ImgInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import * as icon from '../../../../icons';
import { getStyleOptions, getCurrentStyleOption } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  updateTemplate,
  selectBlockById,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import { SettingBlockProps, StyleData } from '../../blockValidator';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  let styleOptions = getStyleOptions(template);
  let currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();

  const [style, setStyle] = useState(currentStyle);
  const [Logo, setLogo] = useState(data.logoText?.value);
  const [image, setImage] = useState<any>(data.logoImage);
  const onImgChange = async (event: any) => {
    // setImgLoading(true);
    setImage(URL.createObjectURL(event.target.files[0]));
    // const response = axios.post(URL.createObjectURL(event.target.files[0]))
    // setImgLoading(false);
    dispatch(
      updateBlockData({
        blockId: id,
        field: 'logoImage',
        value: { url: URL.createObjectURL(event.target.files[0]) },
      })
    );
  };
  console.log(data);
  return (
    <>
      <Card title='Navbar' pinned onRemove={onRemove} icon={icon.Navbar}>
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
        <ImgInput
          title='로고 이미지'
          guideline='가능한 포맷: .jpg, .png'
          src={image?.src}
          alt={image?.alt}
          onChange={onImgChange}
        />
        <TextInput
          title='텍스트'
          required={true}
          guideline='텍스트를 입력해주세요'
          value={Logo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLogo(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'logoText',
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
