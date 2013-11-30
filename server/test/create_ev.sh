curl -X POST -H "Content-Type: application/json" -d '{"name" :"colin"}' http://localhost:3000/api/test
curl -X GET http://localhost:3000/api/test
curl -XPUT http://localhost:3000/api/test/13445userID
curl -XDELETE localhost:3000/api/test
