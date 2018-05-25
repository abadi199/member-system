package membersearch

type Member struct {
	FirstName string `bson:"firstName" json:"firstName"`
	LastName string `bson:"lastName" json:"lastName"`
}