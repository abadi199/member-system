package gettoken

import (
    "crypto/ecdsa"
    "encoding/json"
    "fmt"
    jwt "github.com/dgrijalva/jwt-go"
    "net/http"
    "strings"
)

type postAuth struct {
    Username string `json:"username"`
}

func GetToken (key *ecdsa.PrivateKey) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        
        if strings.Compare(r.Method, "POST") == 0 {
            // w.Header().Set("Content-Type", "application/json")

            var post postAuth
            decoder := json.NewDecoder(r.Body)
            if err := decoder.Decode(&post); err != nil {
                http.Error(w, "Couldn't decode post: " + err.Error(), http.StatusNotFound)
                return
            }

            tokData := []byte("{\"username\": \"" + post.Username + "\"}")
            var claims jwt.MapClaims
            if err := json.Unmarshal(tokData, &claims); err != nil {
                http.Error(w, "Couldn't parse claims JSON: " + err.Error(), http.StatusNotFound)
                return
            }

            token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)

            if out, err := token.SignedString(key); err == nil {
                w.Header().Set("X-Session-Token", out)
                fmt.Fprintf(w, out + "\n")
                return
            } else {
                http.Error(w, "Error signing token: " + err.Error(), http.StatusNotFound)
            }
        } else {
            http.Error(w, "Method " + r.Method + " not implemented", http.StatusNotImplemented)
        }

    }
}