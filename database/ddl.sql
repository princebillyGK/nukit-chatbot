create database nukit;
use nukit;
-- unkown messages
create table chatbot_unknown_message (
  id int primary key auto_increment not null,
  facebookid varchar(100) not null,
  message varchar(1000) not null
) -- unknown_messages stored here
describe chatbot_unknown_message;
truncate table chatbot_unknown_message;