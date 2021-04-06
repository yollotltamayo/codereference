#![feature(proc_macro_hygiene, decl_macro)]
use serde::{Serialize, Deserialize};
#[macro_use] extern crate rocket;
use rocket_contrib::json::Json;
use rocket_contrib::serve::{StaticFiles, Options};
use mongodb::{bson::doc, options::ClientOptions, sync::Client};
use rocket::response::NamedFile;
pub mod content {
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
        }
        pub fn inserta(&self, data:Vec<mongodb::bson::Document>) ->mongodb::error::Result<()> { // TODO hacer esta funcion asincrona
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
        conexion.inserta(docs); //TODO regresa un json apropiado
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
#[get("/")]
fn index() -> Option<NamedFile> {
    NamedFile::open("build/index.html").ok()
}
// produccion , los archivos se lanzan desde los archivos
// estaticos del build, el build es lo que genero el frontend. q
    fn main()  {
        rocket::ignite()
            .mount("/",routes![index])
            .mount("/static", StaticFiles::from("build/static/"))
            .mount("/api", routes![code,submit]).launch();
    }
