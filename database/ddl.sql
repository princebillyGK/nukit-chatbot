create database nukit;
use nukit;
create table chatbot_unknown_message (
   id int primary key auto_increment not null,
   facebookid varchar(100) not null, 
   message varchar(1000) not null
)

select * from chatbot_unknown_message;
