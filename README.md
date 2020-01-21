# nostroflix

#Backend : ./server 
    - express js
    - morgan
    - body-parser
    - mongoose

    
#Frontend : ./client 






#--------------------#

# how to set up the project :

- 1- git repo : git clone git@bitbucket.org:mounach/nostroflix.git

- 2- install mongoDB localy

- 3- exec this command to import node modules : $ npm install

- 4- exec this command to run the API : $ npm start

- 5- use postman to try the API :

//-----------------------------------------------------------------//
    GET    : 
                localhost:3000/api/categories
                localhost:3000/api/films
                localhost:3000/api/categories/:id
                localhost:3000/api/films/:id
//-----------------------------------------------------------------//
    POST   :
                localhost:3000/api/categories

                            example :
                        {
                            "name": "horror",
                            "description": "horror description"
                        }

            //-------------------------------//
                localhost:3000/api/films

                            example :
                        {
                            "name": "the wolf of wall street",
                            "description": "the wolf of wall street description",
                            "categories": [
                                            {
                                                "_id": "5c314258ef2ac833bc0eb163",
                                                "name": "action",
                                                "description": "action description"
                                            },
                                            {
                                                "_id": "5c3140f02d4e831fc8ecddf6",
                                                "name": "drama",
                                                "description": "drama description"
                                            },
                                            {
                                                "_id": "5c314283ef2ac833bc0eb164",
                                                "name": "comedy",
                                                "description": "comedy description"
                                            }
                                        ]
                        }
//-----------------------------------------------------------------//
    PUT    :
                localhost:3000/api/categories/:id
                localhost:3000/api/films/:id
//-----------------------------------------------------------------//
    DELETE : 

    adding token to headers : 
    Authorization   :   bearer ......token.......
    
                localhost:3000/api/categories/:id
                localhost:3000/api/films/:id