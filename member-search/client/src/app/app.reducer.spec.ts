import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Search, SearchCompleted, SearchFailed } from "./app.actions";
import { reducer, initialState } from "./app.reducer";
import { RemoteDataKind, success } from "./remote-data/remote-data";
import { Member } from "./models/member";

describe("Reducer", () => {
  const members: Member[] = [{ firstName: "Abadi", lastName: "Kurniawan" }];
  it("should return loading state given Search Action and empty state", () => {
    const newState = reducer(initialState, new Search("aba"));
    expect(newState.searchResult.kind).toEqual(RemoteDataKind.Loading);
  });

  it("should return reloading state given Search action and state with existing data", () => {
    const newState = reducer(
      { ...initialState, searchResult: success(members) },
      new Search("aba")
    );
    expect(newState.searchResult.kind).toEqual(RemoteDataKind.Reloading);
    if (newState.searchResult.kind === RemoteDataKind.Reloading) {
      expect(newState.searchResult.value).toEqual(members);
    }
  });

  it("should return success status with data given SearchCompleted action", () => {
    const newState = reducer(
      initialState,
      new SearchCompleted(success(members))
    );
    expect(newState.searchResult.kind).toEqual(RemoteDataKind.Success);
    if (newState.searchResult.kind === RemoteDataKind.Success) {
      expect(newState.searchResult.value).toEqual(members);
    }
  });

  it("should return fail status given SearchFailed action", () => {
    const newState = reducer(
      initialState,
      new SearchFailed(new Error("Error"))
    );
    expect(newState.searchResult.kind).toEqual(RemoteDataKind.Error);
    if (newState.searchResult.kind === RemoteDataKind.Error) {
      expect(newState.searchResult.error).toEqual("Error");
    }
  });
});
