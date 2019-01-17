# frontcamp2018
3.1 Query: db.restaurants.find({borough:"Queens", cuisine:"Chinese"}).count()
    Result: 728

3.2 Query: db.restaurants.find({ "grades.grade": {$exists: true}}).sort({"grades.grade": 1, "grades.score": -1}).limit(1)
    Result: ObjectId("5c1395cb31ab641e6b85be71")

3.3 Query: db.restaurants.updateMany({ "borough": "Manhattan" },{ $push: { "grades" : {  grade: "A", score: 7, date: ISODate() }} })
    Result: { "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }

3.4 Query: db.restaurants.find({"grades.8.score": {$lt:7}},{name:1})
    Result: { "_id" : ObjectId("5c175bc442a23d1d66230304"), "name" : "Silver Krust West Indian Restaurant" }
            { "_id" : ObjectId("5c175bc442a23d1d6623111c"), "name" : "Pure Food" }

3.5 Query: db.restaurants.find({cuisine:"Seafood", "grades":{$elemMatch:{date: {$gte: ISODate("2014-02-01T00:00:00.000Z"), $lt: ISODate("2014-03-01T00:00:00.000Z")}, grade:"B"}}},             {borough:1})
    Result: { "_id" : ObjectId("5c175bc442a23d1d66230ff4"), "borough" : "Bronx" }
            { "_id" : ObjectId("5c175bc442a23d1d6623126b"), "borough" : "Manhattan" }

4.0 Query: db.restaurants.createIndex({"name" : 1})
           db.restaurants.explain().find({ name: "Glorious Food" }) 
    Result:
    {
            "queryPlanner" : {
                    "plannerVersion" : 1,
                    "namespace" : "frontcamp.restaurants",
                    "indexFilterSet" : false,
                    "parsedQuery" : {
                            "name" : {
                                    "$eq" : "Glorious Food"
                            }
                    },
                    "winningPlan" : {
                            "stage" : "FETCH",
                            "inputStage" : {
                                    "stage" : "IXSCAN",
                                    "keyPattern" : {
                                            "name" : 1
                                    },
                                    "indexName" : "name_1",
                                    "isMultiKey" : false,
                                    "multiKeyPaths" : {
                                            "name" : [ ]
                                    },
                                    "isUnique" : false,
                                    "isSparse" : false,
                                    "isPartial" : false,
                                    "indexVersion" : 2,
                                    "direction" : "forward",
                                    "indexBounds" : {
                                            "name" : [
                                                    "[\"Glorious Food\", \"Glorious Food\"]"
                                            ]
                                    }
                            }
                    },
                    "rejectedPlans" : [ ]
            },
            "serverInfo" : {
                    "host" : "83e5f806df88",
                    "port" : 27017,
                    "version" : "4.0.4",
                    "gitVersion" : "f288a3bdf201007f3693c58e140056adf8b04839"
            },
            "ok" : 1
    }

4.1 Query: db.restaurants.createIndex({"name" : 1})

4.2 Query: db.restaurants.dropIndex("name_1")
    Result: { "nIndexesWas" : 2, "ok" : 1 }

4.3 Query: db.restaurants.createIndex({"restaurant_id" : 1, "borough":1})
    Results: {
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}

4.4 Query: db.restaurants.createIndex({ cuisine: 1 },{ partialFilterExpression: { borough: "Staten Island" } })

4.5 Query: db.restaurants.createIndex({"grades.8.score" : 1, name:1}) 
    Result:                         "inputStage" : {
                                "stage" : "FETCH",
                                "inputStage" : {
                                        "stage" : "IXSCAN",
                                        "keyPattern" : {
                                                "grades.8.score" : 1
                                        },
                                        "indexName" : "grades.8.score_1",
                                        "isMultiKey" : true,
                                        "multiKeyPaths" : {
                                                "grades.8.score" : [
                                                        "grades"
                                                ]
                                        },
                                        "isUnique" : false,
                                        "isSparse" : false,
                                        "isPartial" : false,
                                        "indexVersion" : 2,
                                        "direction" : "forward",
                                        "indexBounds" : {
                                                "grades.8.score" : [
                                                        "[-inf.0, 7.0)"
                                                ]
                                        }
                                }