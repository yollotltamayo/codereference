use mongodb::{bson::doc, error::Error, results::InsertManyResult, Client};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Codigo {
    pub author: String,
    pub content: String,
}

pub struct Bro {
    pub client: Client,
}

impl Bro {
    pub async fn connect() -> Self {
        let uri = env!("MONGO_URI");

        Self {
            client: Client::with_uri_str(&uri).await.unwrap(),
        }
    }

    pub async fn inserta(
        &self,
        data: Vec<mongodb::bson::Document>,
    ) -> Result<InsertManyResult, Error> {
        let collection = self.client.database("Reference").collection("contenido");
        collection.insert_many(data, None).await
    }
}

