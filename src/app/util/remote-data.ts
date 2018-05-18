export enum RemoteDataKind {
  NotAsked = 1,
  Loading = 2,
  Reloading = 3,
  Success = 4,
  Error = 5,
  ErrorWithData = 6
}

interface IRemoteData {
  kind: RemoteDataKind;
  isLoading(): boolean;
  hasData(): boolean;
}
class NotAsked implements IRemoteData {
  readonly kind = RemoteDataKind.NotAsked;
  isLoading = () => false;
  hasData = () => false;
}

const notAskedConst = new NotAsked();

export function notAsked(): NotAsked {
  return notAskedConst;
}

class Loading {
  readonly kind = RemoteDataKind.Loading;
  isLoading = () => true;
  hasData = () => false;
}
const loadingConst = new Loading();
export function loading(): Loading {
  return loadingConst;
}

class Reloading<data> {
  readonly kind = RemoteDataKind.Reloading;
  isLoading = () => true;
  hasData = () => true;
  constructor(public value: data) {}
}
export function reloading<data, e>(
  remoteData: RemoteData<data, e>
): RemoteData<data, e> {
  switch (remoteData.kind) {
    case RemoteDataKind.Error:
      return loading();
    case RemoteDataKind.ErrorWithData:
      return new Reloading(remoteData.value);
    case RemoteDataKind.Loading:
      return remoteData;
    case RemoteDataKind.NotAsked:
      return loading();
    case RemoteDataKind.Reloading:
      return remoteData;
    case RemoteDataKind.Success:
      return new Reloading(remoteData.value);
  }
}

class Success<data> {
  readonly kind = RemoteDataKind.Success;
  isLoading = () => false;
  hasData = () => true;
  constructor(public value: data) {}
}
export function success<data>(value: data): Success<data> {
  return new Success(value);
}

class Error<e> {
  readonly kind = RemoteDataKind.Error;
  isLoading = () => false;
  hasData = () => false;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(public error: e) {}
}
export function error<e>(value: e): Error<e> {
  return new Error(value);
}

class ErrorWithData<e, data> {
  readonly kind = RemoteDataKind.ErrorWithData;
  isLoading = () => false;
  hasData = () => true;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(public error: e, public value: data) {}
}
// tslint:disable-next-line:no-shadowed-variable
export function errorWithData<e, data>(error: e, value: data) {
  return new ErrorWithData(error, value);
}

export type RemoteData<data, e> =
  | NotAsked
  | Loading
  | Reloading<data>
  | Success<data>
  | Error<e>
  | ErrorWithData<e, data>;
