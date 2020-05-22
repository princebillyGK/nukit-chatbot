use jonakipr_nukit;


SELECT
  *
FROM noteVerification;

Alter table noteVerification 
select * from noteVerification;
delete  from note where 1 = 1;
select * from note;
truncate noteVerification;

describe note;
alter table note modify uploadTime datetime not null default NOW();
alter table noteVerification add verificationTime datetime;
update note set verified = 1 where id = ?
update noteVerification set verificationToken = null, verificationTime = ?
truncate noteVerification;
alter table note drop column verified;
alter table note add column status enum('verfied', 'rejected', 'pending');
describe noteVerification;
alter table note modify column status enum('verified', 'rejected', 'pending') default 'pending';
alter table noteVerification modify verificationToken varchar(36);
select * from note;
select * from noteVerification;
describe note;
