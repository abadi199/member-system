import { Injectable } from "@angular/core";
import { Member } from "../models/member";
import { Observable, of } from "rxjs";
import { delay, catchError } from "rxjs/operators";

const mockMembers = [
  {
    firstName: "Will",
    lastName: "Farrell"
  },
  {
    firstName: "Abadi",
    lastName: "Kurniawan"
  }
];

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
      return element.firstName.includes(firstName);
    }

    return of(mockMembers.filter(containsFirstName)).pipe(
      delay(3000),
      catchError(err => {
        console.error("Encountered an error", err);
        return of([]);
      })
    );
  }
}
