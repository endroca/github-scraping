export interface IRequestsProvider {
  get: (url: string) => Promise<string>;
}
