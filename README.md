# node-prisma-musics-app

1. create 5 accounts
2. Out of those 5 accounts, 3 of them will be artists
3. For every artist create 2 podcast and podcast will have 2-5 episodes
4. create 2-3 `Audiobook`
5. create 2-3 audio playlist, and some of those playlist will have followers
6. in the `single` table, `artistNameInfo` should be optional (here you will need to add extra migration to existing migrations)
7. now with step-6 in place, create some of `single` records without referencing to `Album` table and some referencing to `Album` table
8. fetch the data as per following requirements
       
    *. get the list of playlists created and folloed by every user

    *. get the information of Podcast and episodes in it

    *. get the list of singles which do not have Album and list of singles which have album => this list should be divided into 2 groups
       
        {
            "withAlbum": [],
            "withoutAlbum": [],
        }
        
    *. get the list of albums and audiobooks and podcasts created in same studio

    *. get the list of singles which were released before and after may-2022
      
        {
            "before": [],
            "after": [],
        }

    *. group Podcasts/Audiobook/Single/Album by artist and sort the list by artist's firstname

    *. Update 2 user's email and phone        

9. at last out of 5 accounts delete 2 accounts (soft-delete only)
