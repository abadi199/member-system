package membersearch

import (
    "fmt"
    "github.com/gorilla/context"
    "github.com/gorilla/mux"
    jwt "github.com/dgrijalva/jwt-go"
    "log"
    "net/http"
    "strings"
)

// Handler description
func MemberSearch() http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        claims := context.Get(r, "claims")
        context.Clear(r)

        log.Println(claims)
        w.WriteHeader(http.StatusOK)
        c := claims.(jwt.MapClaims)
        uname := c["username"].(string)
        if strings.Compare(uname, vars["username"]) != 0 {
            //"Forbidden: " + claims["username"] + " does not have access to " + vars["username"]
            http.Error(w, "Forbidden", http.StatusForbidden)
            return
        }
        fmt.Fprintf(w, "user: %v title:%v\n", vars["username"], vars["title"])


    }
}
