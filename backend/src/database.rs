use mongodb::{bson::doc, options::ClientOptions, Client};

pub mod content {
pub struct Content {
    db: ()
}
    pub impl Content {
        pub connect(){
            let mut client_options = ClientOptions::parse(SECRETS).await?;
            client_options.app_name = Some("Rust Demo".to_string());
            // Get a handle to the cluster
            let client = Client::with_options(client_options)?;
             &self.db =  client.database("Reference");
            //let collection = db.collection("contenido");
        }
    }
}
