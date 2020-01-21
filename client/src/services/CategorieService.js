import axiox from 'axios';
import { resolve } from 'url';
import { rejects } from 'assert';

const url = 'http://localhost:3000/api/categories/';

class CategorieService {
    //get Categories
    static getCategories(){
        return new Promise(async (resolve, rejects) => {
            try {
                const res = await axiox.get(url);
                const data = res.data;
                resolve(
                    data.categories.map(categorie=> ({
                        ...categorie
                    }))
                );
            } catch (error) {
                rejects(error)
            }
        });
    }

    static getCategorie(id){
        return new Promise(async (resolve, rejects) => {
            try {
                const res = await axiox.get(url+id);
                const data = res.data;
                resolve(data.categorie);
            } catch (error) {
                rejects(error)
            }
        });
    }
}

export default CategorieService;