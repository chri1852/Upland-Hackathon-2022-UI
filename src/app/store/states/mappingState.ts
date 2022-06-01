import MappingForm from '../../common/types/MappingForm';

export interface MappingState {
  isLoadingMap: boolean;
  hasError: boolean;
  errorMessage: string;
  
  mapFilePath: string;
  mapFound: boolean;
  notEnoughRuns: boolean;
  mapCreationDateTime?: Date;

  mappingForm: MappingForm;
}