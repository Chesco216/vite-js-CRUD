
import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {number} page 
 * @returns { Promise<User[]>}
 */
export const loadUsersByPage = async( page = 1) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
    const res = await fetch(url);
    const dataR = await res.json();
    const data = dataR.data;

    const users = data.map( localhostUserToModel );

    return users;

}