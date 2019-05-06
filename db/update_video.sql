update videos set title = $1, description = $2, tag = $3
where videos_id = $4;

select * from videos;