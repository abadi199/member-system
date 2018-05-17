export enum RemoteDataKind {
  NotAsked = "NotAsked",
  Loading = "Loading",
  Success = "Success",
  Error = "Error"
}

class NotAsked {
  readonly kind = RemoteDataKind.NotAsked;
}

const notAskedConst = new NotAsked();

export function notAsked(): NotAsked {
  return notAskedConst;
}

class Loading {
  readonly kind = RemoteDataKind.Loading;
}
const loadingConst = new Loading();
export function loading(): Loading {
  return loadingConst;
}

class Success<data> {
  readonly kind = RemoteDataKind.Success;
  constructor(public value: data) {}
}
export function success<data>(value: data): Success<data> {
  return new Success(value);
}

class Error<e> {
  readonly kind = RemoteDataKind.Error;
  constructor(public value: e) {}
}
export function error<e>(value: e): Error<e> {
  return new Error(value);
}

export type RemoteData<data, e> = NotAsked | Loading | Success<data> | Error<e>;
