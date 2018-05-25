package notfound

import (
    "net/http"
)

func NotFound(w http.ResponseWriter, r *http.Request) {
  http.Error(w, "The page you were looking for doesn't exist", http.StatusNotFound)
}