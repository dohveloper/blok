import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import BlockItem from './BlockItem';
import * as icons from '../../../icons';
import * as blockIcons from '../../../icons/blockCreation';
import config from '../../Blocks/blockTemplates.json';
import { Site, BlockTemplate } from '../../Blocks/blockValidator';
import { RootState } from '../../../reducers';
import { addBlock } from '../../../reducers/SiteReducer';
import { generateId } from '../../../reducers/IdGeneratorReducer';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled.div`
  background-color: white;
  width: 440px;
  box-sizing: border-box;
  border-radius: 12px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 56px 56px 0 56px;
  align-items: center;
`;
const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const Content = styled.div`
  padding: 48px 0;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
`;
const CloseIcon = styled.img`
  width: 18px;
  hegiht: 18px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
const BlockItemList = styled.div`
  display: grid;
  max-height: 500px;
  padding: 8px 40px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    position: relative;
    left: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #dfdfdf;
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;
const AddButton = styled.button`
  padding: 10px 48px;
  letter-spacing: 1.2px;
  background: #000000;
  border-radius: 5px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;
interface ModalProps {
  theme: string;
}

const getBlockTemplatesByTheme = (
  blockTemplates: BlockTemplate[],
  theme: string
): BlockTemplate[] => {
  const arr: BlockTemplate[] = blockTemplates.filter((block) => {
    return block.template.theme === theme;
  });
  return arr;
};
const validate = (site: Site, blockToAdd: BlockTemplate): boolean => {
  const isUnique = blockToAdd.creationData.isUnique;
  const isDuplicated: boolean = isBlockExist(site, blockToAdd);
  //1개만 있어야하는데 이미 있어서 추가 불가능
  if (isUnique && isDuplicated) {
    return false;
  }
  return true;
};
const isBlockExist = (site: Site, blockToCheck: BlockTemplate): boolean => {
  let blocks = Object.values(site.blocks);
  const index = blocks.findIndex((block) => {
    return block.template.blockType === blockToCheck.template.blockType;
  });
  const result = index >= 0 ? true : false;
  return result;
};

export default function AddModal(props: ModalProps) {
  const dispatch = useDispatch();
  const site = useSelector((state: RootState) => state.site);
  const newId = useSelector((state: RootState) => state.idGenerator.id);

  const closeModal = () => {
    dispatch({
      type: 'ADD/MODAL_OFF',
    });
  };
  const addBlockHandler = (blockTemplate: BlockTemplate) => {
    //2. 블록추가
    const result = validate(site, blockTemplate);
    dispatch(generateId());
    if (!result) {
      //이미 있는 블록이면 불가 경고창 띄우기(모달에 띄우는 로직 추가)
      dispatch({
        type: 'alertOn',
        payload: { msg: '최대 1개까지만 추가가능한 블록입니다.' },
      });
    } else {
      //추가 가능한 블록이면 추가하기
      const newBlock = {
        id: newId,
        template: blockTemplate?.template,
        data: blockTemplate?.defaultData,
      };
      //사이트 추가
      dispatch(addBlock(newBlock));

      //3.모달창 닫기
      dispatch({
        type: 'ADD/MODAL_OFF',
      });
    }
  };
  const renderBlockItem = () => {
    const blockTemplates = getBlockTemplatesByTheme(
      config.blockTemplates,
      site.theme
    );
    const blockItemList = blockTemplates.map((blockTemplate: BlockTemplate) => {
      const { icon, title } = blockTemplate.creationData;
      return (
        <BlockItem
          icon={blockIcons[icon as keyof typeof blockIcons]}
          label={title}
          onClick={() => {
            addBlockHandler(blockTemplate);
          }}
        ></BlockItem>
      );
    });
    return blockItemList;
  };
  return (
    <Background>
      <ModalBox>
        <Header>
          <HeaderText>블록 선택</HeaderText>
          <CloseButton onClick={closeModal}>
            <CloseIcon src={icons.Close} />
          </CloseButton>
        </Header>
        <Content>
          <BlockItemList>{renderBlockItem()}</BlockItemList>
        </Content>
      </ModalBox>
    </Background>
  );
}
