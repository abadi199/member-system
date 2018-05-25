package authtoken

import (
    "crypto/ecdsa"
    "fmt"
    jwt "github.com/dgrijalva/jwt-go"
    "github.com/gorilla/context"
    "net/http"
    "strings"
)

type AuthMiddleware struct {
    Key *ecdsa.PrivateKey
}

func (amw *AuthMiddleware) AuthMW(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        tokenString := strings.TrimSpace(r.Header.Get("X-Session-Token"))

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            // Don't forget to validate the alg is what you expect:
            if _, ok := token.Method.(*jwt.SigningMethodECDSA); !ok {
                return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
            }
            return amw.Key.Public(), nil
        })
        
        if token != nil {
            if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
                context.Set(r, "claims", claims)
                next.ServeHTTP(w, r)
                return
            }
        }

        http.Error(w, "Forbidden: " + err.Error(), http.StatusForbidden)
    })
}