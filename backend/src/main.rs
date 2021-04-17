
#![feature(decl_macro)]

mod content;
use std::collections::HashMap;

use mongodb::bson::doc;
use reqwest::header::{AUTHORIZATION, USER_AGENT};
use serde::{Deserialize, Serialize};
use rocket::{
    error::Error,
    http::{Status,Cookie, CookieJar},
    response::{Redirect,NamedFile},
};
use rocket_contrib::{
    json::{json,Json,JsonValue},
    serve::StaticFiles,
};
use serde_json::Value;

#[macro_use]
extern crate rocket;

const CLIENT_ID: &str = env!("CLIENT_ID");
const CLIENT_SECRET: &str = env!("CLIENT_SECRET");

#[derive(Deserialize, Serialize)]
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
    println!("{}",data["login"].to_string());
    UserResponse {
        email: data["email"].to_string(),
        user: data["login"].to_string(),
        name: data["id"].to_string(),
        avatar: data["avatar_url"].to_string(),
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

//#[derive(Serialize,Deserialize)]
//struct res {
    //ress: String,
//}
#[get("/github/callback?<code>")]
async fn login(cookie: &CookieJar<'_>, code: String) -> Redirect{
    let token = get_access_token(code).await;
    let user_data = get_github_user(&token).await;

    cookie.add(Cookie::new("user", user_data.user));
    cookie.add(Cookie::new("email", user_data.email));
    cookie.add(Cookie::new("avatar", user_data.avatar));
    cookie.add(Cookie::new("name", user_data.name));
    cookie.add(Cookie::new("auth", "correcto"));
    Redirect::to("/authorize/second")
}
#[get("/")] // /user
async fn user_data(cookie:&CookieJar<'_>) -> Result<JsonValue,Status>{
    //println!("{}", cookie.get("user").unwrap().value().to_string());
    match cookie.get("auth")  {
    Some(_)=> {
        Ok(json!(UserResponse {
            email: cookie.get("email").unwrap().value().to_string(),
            user:  cookie.get("user").unwrap().value().to_string(),
            name: cookie.get("name").unwrap().value().to_string(),
            avatar:cookie.get("avatar").unwrap().value().to_string(), 
        }))
    },
    None => Err(Status::Unauthorized)
    }
}
#[get("/delete")] // /user/delete
async fn delete_user(cookie:&CookieJar<'_>) -> Result<Status,Status>{
    match cookie.get("auth")  {
    Some(_)=> {
        cookie.remove(Cookie::named("email"));
        cookie.remove(Cookie::named("user"));
        cookie.remove(Cookie::named("name"));
        cookie.remove(Cookie::named("avatar"));
        cookie.remove(Cookie::named("auth"));
        Ok(Status::Ok)
    },
    None => Err(Status::Unauthorized)
    }
}

#[get("/authorize/<signal>")]
fn authorize(signal:&str ) -> Result<Redirect,Redirect>{
    match signal {
        "first" => Err(Redirect::to("/login/github/")),
            _ => Ok(Redirect::to("/")),
    }
}
#[get("/github")]
fn redirect() -> Redirect {
    let redir_uri = env!("REDIR_URI").to_owned() + "/login/github/callback";

    let redir = format!(
        "https://github.com/login/oauth/authorize?client_id={}&redirect_uri={}",
        CLIENT_ID, redir_uri
    );

    Redirect::to(redir)
}
#[get("/")]
async fn index() -> Option<NamedFile> {
    NamedFile::open("build/index.html").await.ok()
}

#[rocket::main]
async fn main() -> Result<(), Error> {
        rocket::build()
        .mount("/",routes![index,authorize])
        .mount("/user",routes![user_data,delete_user])
        .mount("/login", routes![login, redirect])
        .mount("/api", routes![code, submit])
        .mount("/static", StaticFiles::from("build/static/"))
        .launch()
        .await
}

