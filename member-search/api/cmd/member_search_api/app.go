package main

import (
    "../../handlers/notfound"
    "../../handlers/gettoken"
    "../../handlers/membersearch"
    "../../middleware/authtoken"
    /*
    "bitbucket.org/gsteurer/jot/handlers/jgettoken"
    "bitbucket.org/gsteurer/jot/handlers/jnote"
    
    */
    "crypto/rand"
    "crypto/ecdsa"
    "crypto/elliptic"
    "fmt"
    "github.com/gorilla/mux"
    "log"
    "net/http"
    "os"
    "time"
)


func errorFatal(err error) {
    if err != nil {
        fmt.Println("Fatal error ", err.Error())
        os.Exit(1)
    }
}

func main() {

    log.Println("Generating ecdsa key...")
    reader := rand.Reader
    key, err := ecdsa.GenerateKey(elliptic.P256(), reader)
    errorFatal(err)
    log.Println("...done!")

    mainRouter := mux.NewRouter()
    mainRouter.NotFoundHandler = http.HandlerFunc(notfound.NotFound)
    mainRouter.HandleFunc("/api/auth", gettoken.GetToken(key))

    amw := authtoken.AuthMiddleware {
        Key: key }

    restRouter := mainRouter.PathPrefix("/api/rest/member_search").Subrouter()
    restRouter.Use(amw.AuthMW)
    restRouter.HandleFunc("/{query}", membersearch.MemberSearch())
    restRouter.NotFoundHandler = http.HandlerFunc(notfound.NotFound)

    srv := &http.Server{
        Addr:         "0.0.0.0:8080",
        // Good practice to set timeouts to avoid Slowloris attacks.
        WriteTimeout: time.Second * 15,
        ReadTimeout:  time.Second * 15,
        IdleTimeout:  time.Second * 60,
        Handler: mainRouter, // Pass our instance of gorilla/mux in.
    }

    srv.ListenAndServe()

}