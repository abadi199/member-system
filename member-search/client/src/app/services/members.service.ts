import { Injectable } from "@angular/core";
import { Member } from "../models/member";
import { Observable, of, throwError } from "rxjs";
import { delay, catchError } from "rxjs/operators";
import { mockMembers } from "./members.fixture";

@Injectable({
  providedIn: "root"
})
export class MemberService {
  constructor() {}

  getMembers(): Observable<Member[]> {
    return of(mockMembers);
  }

  searchMembers(firstName: string): Observable<Member[]> {
    function containsFirstName(element: Member) {
      return element.firstName.toUpperCase().includes(firstName.toUpperCase());
    }

    if (firstName.toUpperCase() === "ERROR") {
      return throwError(new Error("An error has occurred"));
    }

    return of(mockMembers.filter(containsFirstName)).pipe(
      delay(1000),
      catchError(err => {
        console.error("Encountered an error", err);
        return of([]);
      })
    );
  }
}
