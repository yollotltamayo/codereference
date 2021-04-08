use std::env;
use mongodb::{bson::doc, options::ClientOptions,sync::Client};
use serde::{Serialize, Deserialize};
#[derive(Serialize,Deserialize)]
pub struct Codigo {
    pub author: String, 
    pub content: String,
}
pub struct Bro {
    pub client: Client
}
impl Bro {
    //#[tokio::main]
    //pub async fn connect(&mut self)->mongodb::error::Result<()>{
    pub fn connect()->Self{
        let URI = match env::var("MONGO_URI")  {
            Ok(val) => val,
            Err(e) => e.to_string()
        };

        Self{
            client: Client::with_uri_str(&URI).unwrap()
        }
        //let collection = db.collection("contenido")
        //Ok(())
    }
    pub fn inserta(&self, data:Vec<mongodb::bson::Document>) ->mongodb::error::Result<()> {
        let collection = self.client.database("Reference").collection("contenido");
        collection.insert_many(data,None)?;
        Ok(())
    }
}

