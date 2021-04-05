#![feature(proc_macro_hygiene, decl_macro)]
use serde::{Serialize, Deserialize};
#[macro_use] extern crate rocket;
use rocket_contrib::json::Json;
use mongodb::{bson::doc, options::ClientOptions, sync::Client};
pub mod content {
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
            let mut client_options =SECRETS;

            Self{
                  client: Client::with_uri_str(client_options).unwrap()
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
}
#[post("/submit",data="<codigo>")]
    fn submit(codigo:Json<content::Codigo>) {
        let conexion = content::Bro::connect();
        let docs = vec![
            doc!{"sku":"12", "autor":"yollotl" ,"codigo":&codigo.content}
        ];
        conexion.inserta(docs);
    }
#[get("/")]
    fn code() -> Json<Vec<content::Codigo>>{
        Json(
            vec![
            content::Codigo{
                author : "yo mero".to_string(), 
                content: " fn main()  {) }".to_string()
            },
            content::Codigo{
                author : "yo mero".to_string(), 
                content: " fn main()  {) }".to_string()
            }
            ]
        )
    }
    fn main()  {
        rocket::ignite().mount("/api", routes![code,submit]).launch();
    }
