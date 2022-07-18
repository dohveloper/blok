import { siteModel } from "../db";
import { BadRequestError, ForbiddenError } from "../errors";

class SiteService {
  constructor(siteModel) {
    this.siteModel = siteModel;
  }

  // 사이트 추가
  async addSite(siteInfo) {
    const { userId, name, domain } = siteInfo;
    // const siteNameCheck = await this.siteModel.findBySiteName(name);
    // const siteDomainCheck = await this.siteModel.findBySiteDomain(domain);
    // if (siteNameCheck) {
    //   throw new BadRequestError(
    //     "이 사이트의 이름은 현재 사용중입니다. 다른 사이트 이름을 입력해 주세요"
    //   );
    // }
    // if (siteDomainCheck) {
    //   throw new BadRequestError(
    //     "이 사이트의 도메인은 현재 사용중입니다. 다른 도메인을 입력해 주세요"
    //   );
    // }
    const createdNewSite = await this.siteModel.create(siteInfo);
    return createdNewSite;
  }

  // 특정 사이트 정보 조회
  async getSiteInfo(siteId) {
    const site = await this.siteModel.findBySiteId(siteId);
    if (!site) {
      throw new BadRequestError("존재하지 않는 사이트입니다.");
    }
    return site;
  }

  // 유저가 가진 사이트 목록을 받음.
  async getSites(userId) {
    const sites = await this.siteModel.findAllUserSites(userId);
    return sites;
  }

  // 사이트 정보 수정
  async updateSite(siteId, toUpdate) {
    let site = await this.siteModel.findBySiteId(siteId);
    if (!site) {
      throw new BadRequestError(
        "등록된 사이트가 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    // let name = await this.siteModel.findBySiteName(toUpdate.name);
    // if (name && name.no !== siteId) {
    //   throw new BadRequestError(
    //     "이 사이트의 이름은 현재 사용중입니다. 다른 사이트 이름을 입력해 주세요"
    //   );
    // }
    // let domain = await this.siteModel.findBySiteDomain(toUpdate.domain);
    // if (domain && domain.no !== siteId) {
    //   throw new BadRequestError(
    //     "이 사이트의 도메인은 현재 사용중입니다. 다른 도메인을 입력해 주세요"
    //   );
    // }
    site = await this.siteModel.update({
      id: siteId,
      update: toUpdate,
    });
    return site;
  }

  // 사이트 삭제 구현
  async deleteSiteById(siteIdentifier) {
    const site = await this.siteModel.deleteById(siteIdentifier);
    if (!site) {
      throw new ForbiddenError("삭제할 사이트가 없습니다.");
    }

    return site;
  }

  async deleteSiteBySiteId(siteId) {
    const site = await this.siteModel.deleteSiteBySiteId(siteId);
    if (!site) {
      throw new ForbiddenError("삭제할 사이트가 없습니다.");
    }

    return site;
  }
}

const siteService = new SiteService(siteModel);

export { siteService };
