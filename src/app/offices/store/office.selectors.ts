import { Selector } from '@ngxs/store';
import { OfficeState, OfficeStateModel } from './office.state';

export class OfficeSelector {
  @Selector([OfficeState])
  static offices(stateModel: OfficeStateModel) {
    return stateModel.offices;
  }

  @Selector([OfficeState])
  static selectedOffice(stateModel: OfficeStateModel) {
    return stateModel.selectedOffice;
  }

  @Selector([OfficeState])
  static isLoading(stateModel: OfficeStateModel) {
    return stateModel.loading;
  }
}
