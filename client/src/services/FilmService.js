import axiox from 'axios';
import { resolve } from 'url';
import { rejects } from 'assert';

const url = 'http://localhost:3000/api/films/';

class FilmService {
    //get films
    static getFilms(){
        return new Promise(async (resolve, rejects) => {
            try {
                const res = await axiox.get(url);
                const data = res.data;
                resolve(
                    data.films.map(film=> ({
                        ...film
                    }))
                );
            } catch (error) {
                rejects(error)
            }
        });
    }

    static getFilm(id){
        return new Promise(async (resolve, rejects) => {
            try {
                const res = await axiox.get(url+id);
                const data = res.data;
                resolve(data.film);
            } catch (error) {
                rejects(error)
            }
        });
    }
}

export default FilmService;