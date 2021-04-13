#![feature(proc_macro_hygiene, decl_macro)]
use serde::{Serialize, Deserialize};
#[macro_use] extern crate rocket;
use rocket_contrib::json::Json;
use rocket_contrib::serve::{StaticFiles, Options};
use rocket::response::Redirect;
use mongodb::{bson::doc};
use rocket::http::{Cookie, Cookies};
mod content;
pub mod Oauth {
    //use reqwest; // 0.10.0
    extern crate reqwest;
    use tokio; // 0.2.6
    use std::collections::HashMap;
    use reqwest::header::USER_AGENT;
    use reqwest::header::AUTHORIZATION;
    use serde::{Serialize, Deserialize};
    pub const CLIENT_ID:&str= "ca3cac765529f9d577ec";
    pub const CLIENT_SECRET:&str = "2f8a660c689f82dcc0bf7673e3d4a8f80b1ae715";
    use serde_json::{Result, Value};
        //"1e3781cf623452543a958587f4b5531024be1c48";
        //"af69c6351d627f4457a095a443499b28a76ff78c";
        pub struct user_response {
            pub name : String,
            pub user : String,
            pub email : String,
            pub avatar : String
        }
        #[tokio::main]
        pub async fn get_access_token(code:String)-> String{
            let client = reqwest::Client::new();
            let  map : HashMap<&str, &str> = [
                ("client_id",CLIENT_ID),
                ("client_secret",CLIENT_SECRET),
                ("code", &code)
            ].iter().cloned().collect();
            let uri = "https://github.com/login/oauth/access_token?";
            let result= client
                .post(uri)
                .json(&map)
                .send()
                .await
                .expect("Algo salio mal");
            // TODO
            // buscar la manera de serializar el result en una struct
            // lo intente pero no funciono, por ahora lo hice a manita
            let resp = result.text().await.unwrap();
            let params:Vec<String>= resp.split("&")
                .map(|s| s.to_string())
                .collect();
            let  values:Vec<String>= params[0].split("=")
                .map(|s| s.to_string())
                .collect();
            let token = values[1].clone();
            token
        }
        #[tokio::main]
        pub async fn get_github_user(token:String) ->user_response {
            let head = format!(" token {}",token);
            let head2 = format!(" token {}",token);
            let client = reqwest::Client::new();
           let req = client.get("https://api.github.com/user")
               .header(AUTHORIZATION,head)
               .header(USER_AGENT,head2)
               .send()
               .await
               .expect("algo salio mal");
            let res =  req.text().await.unwrap();
            let data:Value = serde_json::from_str(&res).unwrap();
            user_response {
                email: data["email"].to_string(),
                user : data["login"].to_string(),
                name : data["name"].to_string(),
                avatar : data["avatar"].to_string()
            }
            //println!("{}",res);
            //println!("{:?}", data);

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
            }
            ]
        )
    }
#[get("/login/github/callback?<code>")]
    fn login(mut cookie:Cookies,code:String) -> Json<Vec<content::Codigo>>{
        let token = Oauth::get_access_token(code);
        let user_data:Oauth::user_response = Oauth::get_github_user(token);
        cookie.add(Cookie::new("user",user_data.user));
        cookie.add(Cookie::new("email",user_data.email));
        cookie.add(Cookie::new("avatar",user_data.avatar));
        cookie.add(Cookie::new("name",user_data.name));
        Json(
            vec![
            content::Codigo{
                author : "siuuu".to_string(), 
                content: " lml".to_string()
            }]
        )
    }
#[get("/login/github")]
    fn redirect() -> Redirect{
        let redir_uri = "http://localhost:8000/login/github/callback";
        let redir = format!("https://github.com/login/oauth/authorize?client_id={}&redirect_uri={}", Oauth::CLIENT_ID, redir_uri);
        Redirect::to(redir)
    }
    fn main()  {
        rocket::ignite()
            .mount("/",routes![login,redirect])
            .mount("/api", routes![code,submit])
            .launch();
    }
