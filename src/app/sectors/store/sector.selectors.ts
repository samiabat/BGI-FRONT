import { Selector } from '@ngxs/store';
import { SectorState, SectorStateModel } from './sector.state';

export class SectorSelector {
  @Selector([SectorState])
  static sectors(stateModel: SectorStateModel) {
    return stateModel.sectors;
  }

  @Selector([SectorState])
  static selectedSectors(stateModel: SectorStateModel) {
    return stateModel.selectedSector;
  }

  @Selector([SectorState])
  static isLoading(stateModel: SectorStateModel) {
    return stateModel.loading;
  }
}
