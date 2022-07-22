import config from './blockTemplates.json';
import { StyleData, TemplateData, Site, BlockTemplate } from './blockValidator';

// 세팅블록 스타일변경 관련 함수
export const getStyleOptions = (template: TemplateData): StyleData[] => {
  //동일한 blockType을 가진 다른 블록템플릿 리스트를 구함
  let blockTemplates = config.blockTemplates.filter((blockTemplate) => {
    return blockTemplate.template.blockType === template.blockType;
  });
  let styleOptions = blockTemplates.map(({ template }) => {
    return { label: getLabelOfTemplate(template), value: template };
  });
  return styleOptions;
};

export const getCurrentStyleOption = (template: TemplateData) => {
  return {
    label: getLabelOfTemplate(template),
    value: template,
  };
};

const getLabelOfTemplate = (template: TemplateData) => {
  const name = template.layout
    ? `${template.theme} ${template.layout}`
    : `${template.theme} Default`;
  return name;
};

// [블록 추가기능] 선택한 테마의 BlockTemplates 만 리턴하는 함수
export const getBlockTemplatesByTheme = (
  blockTemplates: BlockTemplate[],
  theme: string
): BlockTemplate[] => {
  const filteredBlockTemplates: BlockTemplate[] = blockTemplates.filter(
    (block) => {
      return block.template.theme === theme;
    }
  );
  return filteredBlockTemplates;
};

// [블록 추가기능] 블록 추가 가능여부를 확인해주는 함수( ex) Nav,Hero,Footer등은 사이트당 1개만 추가가능)
export const addValidator = (
  site: Site,
  blockToAdd: BlockTemplate
): boolean => {
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
