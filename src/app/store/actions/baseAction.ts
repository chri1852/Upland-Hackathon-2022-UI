
export interface Action<K extends string, P = {}> {
  type: K;
  payload?: P;
}

export default Action;