import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import { User } from '../models/user';

const updateUser = async( user ) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch( url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();

    return updatedUser;
}


/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async( userLike ) => {
    const user = new User( userLike );
    const userToSave = userModelToLocalhost( user );

    console.log(userToSave)

    if ( !userLike.firstName || !userLike.lastName ) {
        throw 'fields required'
    }
    
    if ( user.id ) {
        await updateUser( userToSave );
    } else {
        await createUser( userToSave );
    }

    return userToSave;

}

const createUser = async( user ) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch( url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();

    return newUser;
}