use futures::stream::StreamExt;

use mongodb::{
    bson::{doc,Bson}, 
    options::FindOptions,
    error::Error, 
    results::InsertManyResult, 
    Client,
    Collection
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Codigo {
    pub author: String,
    pub content: String,
}

pub struct Bro {
    pub client: Client,
    pub collection : Collection
}

impl Bro {
    pub async fn connect() -> Self {
        let uri = std::env::var("MONGO_URI").unwrap();
        let _client = Client::with_uri_str(&uri).await.unwrap();
        let _collection = _client.database("Reference").collection("contenido");
        Self {
            client: _client,
            collection: _collection
        }
    }

    pub async fn inserta(
        &self,
        data: Vec<mongodb::bson::Document>,
    ) -> Result<InsertManyResult, Error> {
        let collection = self.client.database("Reference").collection("contenido");
        collection.insert_many(data, None).await
    }
    pub async fn busca ( 
        &self,
        query : String
    ) -> Vec<Codigo>{
        let filter = doc! { "autor": query };
        let find_options = FindOptions::builder().build();
        let mut query : Vec<Codigo>  = vec![];
        if let  Some(mut cursor)= self.collection.find(filter,find_options).await.ok() {
            while let Some(result) = cursor.next().await {
                match result {
                    Ok(document) => {
                        query.push( Codigo { 
                            author : document.get("autor").unwrap().to_string(),
                            content : document.get("codigo").unwrap().to_string(),
                        });
                    },
                    Err(_) => {println!("BRO :o");}
                }
            }
        }
        query
    }
}

