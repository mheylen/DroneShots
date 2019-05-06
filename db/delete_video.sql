delete from videos
where videos_id = $1;
select * from videos where users_id = $2;