#![feature(decl_macro)]

use mongodb::{bson::doc, sync::Client};
use rocket_contrib::json::{Json, JsonValue};
use serde::{Deserialize, Serialize};

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate rocket_contrib;

#[derive(Debug, Serialize, Deserialize)]
pub struct Codigo {
    pub author: String,
    pub content: String,
}

pub struct Bro {
    pub client: Client,
}

impl Bro {
    pub fn connect() -> Self {
        let client_options = env!("MONGO_DB");

        Self {
            client: Client::with_uri_str(client_options).unwrap(),
        }
    }

    pub fn inserta(&self, data: Vec<mongodb::bson::Document>) {
        let collection = self.client.database("Reference").collection("contenido");

        if let Err(e) = collection.insert_many(data, None) {
            eprintln!("Error al insertar: {}", e);
        }
    }
}

#[post("/submit", data = "<codigo>")]
fn submit(codigo: Json<Codigo>) {
    let conexion = Bro::connect();
    let docs = vec![doc! {"sku":"12", "autor":"yollotl" ,"codigo": &codigo.content}];
    conexion.inserta(docs);
}

#[get("/")]
fn code() -> JsonValue {
    json!(vec![
        Codigo {
            author: "yo mero".to_string(),
            content: " fn main()  {) }".to_string(),
        },
        Codigo {
            author: "yo mero".to_string(),
            content: " fn main()  {) }".to_string(),
        },
    ])
}

fn main() {
    rocket::ignite()
        .mount("/api", routes![code, submit])
        .launch();
}
