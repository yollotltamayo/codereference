#![feature(decl_macro)]

mod content;

use std::collections::HashMap;

use mongodb::bson::doc;
use reqwest::header::{AUTHORIZATION, USER_AGENT};
use rocket::{
    error::Error,
    http::{Cookie, CookieJar},
    response::Redirect,
};
use rocket_contrib::json::Json;
use serde_json::Value;

#[macro_use]
extern crate rocket;

pub const CLIENT_ID: &str = env!("CLIENT_ID");
pub const CLIENT_SECRET: &str = env!("CLIENT_SECRET");

pub struct UserResponse {
    pub name: String,
    pub user: String,
    pub email: String,
    pub avatar: String,
}

pub async fn get_access_token(code: String) -> String {
    let client = reqwest::Client::new();

    let map: HashMap<&str, &str> = [
        ("client_id", CLIENT_ID),
        ("client_secret", CLIENT_SECRET),
        ("code", &code),
    ]
    .iter()
    .map(|&(k, v)| (k, v))
    .collect();

    let uri = "https://github.com/login/oauth/access_token?";
    let result = client
        .post(uri)
        .json(&map)
        .send()
        .await
        .expect("Algo salio mal");

    // TODO
    // buscar la manera de serializar el result en una struct
    // lo intente pero no funciono, por ahora lo hice a manita
    let resp = result.text().await.unwrap();

    let (_, token) = resp.split('&').next().unwrap().split_once('=').unwrap();
    token.to_string()
}

pub async fn get_github_user(token: &str) -> UserResponse {
    let head = format!(" token {}", token);

    let client = reqwest::Client::new();
    let req = client
        .get("https://api.github.com/user")
        .header(AUTHORIZATION, &head)
        .header(USER_AGENT, &head)
        .send()
        .await
        .expect("algo salio mal");

    let res = req.text().await.unwrap();
    let data: Value = serde_json::from_str(&res).unwrap();

    UserResponse {
        email: data["email"].to_string(),
        user: data["login"].to_string(),
        name: data["name"].to_string(),
        avatar: data["avatar"].to_string(),
    }
}

#[post("/submit", data = "<codigo>")]
async fn submit(codigo: Json<content::Codigo>) {
    let conexion = content::Bro::connect();
    let docs = vec![doc! {"sku":"12", "autor":"yollotl" ,"codigo":&codigo.content}];
    let _ = conexion.await.inserta(docs).await;
}

#[get("/")]
fn code() -> Json<Vec<content::Codigo>> {
    Json(vec![content::Codigo {
        author: "yo mero".to_string(),
        content: " fn main()  {) }".to_string(),
    }])
}

#[get("/login/github/callback?<code>")]
async fn login(cookie: &CookieJar<'_>, code: String) -> Json<Vec<content::Codigo>> {
    let token = get_access_token(code).await;
    let user_data = get_github_user(&token).await;

    cookie.add_private(Cookie::new("user", user_data.user));
    cookie.add_private(Cookie::new("email", user_data.email));
    cookie.add_private(Cookie::new("avatar", user_data.avatar));
    cookie.add_private(Cookie::new("name", user_data.name));

    Json(vec![content::Codigo {
        author: "siuuu".to_string(),
        content: " lml".to_string(),
    }])
}

#[get("/login/github")]
fn redirect() -> Redirect {
    let redir_uri = "http://localhost:8000/api/login/github/callback";

    let redir = format!(
        "https://github.com/login/oauth/authorize?client_id={}&redirect_uri={}",
        CLIENT_ID, redir_uri
    );

    Redirect::to(redir)
}

#[rocket::main]
async fn main() -> Result<(), Error> {
    rocket::ignite()
        .mount("/", routes![login, redirect])
        .mount("/api", routes![code, submit])
        .launch()
        .await
}
