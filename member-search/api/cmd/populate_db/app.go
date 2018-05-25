package main

import (
	"context"
	"log"
	// "github.com/mongodb/mongo-go-driver/bson"
	"github.com/mongodb/mongo-go-driver/mongo"
	"../../handlers/membersearch"
)
//https://godoc.org/github.com/mongodb/mongo-go-driver/mongo
func main() {
	client, err := mongo.Connect(context.Background(), "mongodb://localhost:27017", nil)
	if err != nil {
		log.Fatal("Could not connect to db " + err.Error())
	}
	db := client.Database("member_system")
	coll := db.Collection("member_search")

	mem := membersearch.Member {
		FirstName: "Gus",
		LastName: "Steurer"	}

	result, err := coll.InsertOne(
				context.Background(),
				mem)

	if result == nil {
		log.Fatal("Could not insert item.")
	}
}