import CachedUnmintedProperty from '../CachedUnmintedProperty';

export default interface PostPropertiesUnmintedResponse {
  message: string;
  properties: CachedUnmintedProperty[];
  csvString: string;
}