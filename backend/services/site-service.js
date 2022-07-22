import { siteModel } from "../db";
import { BadRequestError, ForbiddenError } from "../errors";

class SiteService {
  constructor(siteModel) {
    this.siteModel = siteModel;
  }

  async addSite(siteInfo) {
    const { domain } = siteInfo;
    const siteDomainCheck = await this.siteModel.findBySiteDomain(domain);
    if (siteDomainCheck) {
      throw new BadRequestError(
        "이 사이트의 도메인은 현재 사용중입니다. 다른 도메인을 입력해 주세요"
      );
    }
    const createdNewSite = await this.siteModel.create(siteInfo);
    return createdNewSite;
  }

  async getSiteInfo(siteId) {
    const site = await this.siteModel.findBySiteId(siteId);
    if (!site) {
      throw new BadRequestError("존재하지 않는 사이트입니다.");
    }
    return site;
  }

  async getSites(userId) {
    const sites = await this.siteModel.findAllUserSites(userId);
    return sites;
  }

  async getSiteInfoByDomain(domain) {
    const site = await this.siteModel.findBySiteDomain(domain);
    if (!site) {
      throw new BadRequestError("존재하지 않는 사이트입니다.");
    }
    return site;
  }

  async updateSite(siteId, toUpdate) {
    let site = await this.siteModel.findBySiteId(siteId);
    if (!site) {
      throw new BadRequestError(
        "등록된 사이트가 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    let domainSite = await this.siteModel.findBySiteDomain(toUpdate.domain);
    if (domainSite && domainSite.no !== site.no) {
      throw new BadRequestError(
        "이 사이트의 도메인은 현재 사용중입니다. 다른 도메인을 입력해 주세요"
      );
    }
    site = await this.siteModel.update({
      id: siteId,
      update: toUpdate,
    });
    return site;
  }

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
