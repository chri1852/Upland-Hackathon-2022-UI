import WebNFT from '../WebNFT';

export default interface PostSearchNFTResponse {
  message: string,
  nfTs: WebNFT[];
  csvString: string;
}