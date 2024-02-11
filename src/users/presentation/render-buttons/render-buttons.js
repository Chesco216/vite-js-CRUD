import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';

/**
 * 
 * @param {HTMLElement} element 
 */
export const renderButtons = ( element ) => {

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >';

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev';

    const currPageLabel = document.createElement('span');
    currPageLabel.innerText = `page: ${ usersStore.getCurrentPage() }`;

    element.append( prevButton, currPageLabel, nextButton );

    nextButton.addEventListener( 'click', async() => {

        await usersStore.loadNextPage();
        currPageLabel.innerText = `page: ${ usersStore.getCurrentPage() }`;

        renderTable( element );
    });

    prevButton.addEventListener( 'click', async() => {

        await usersStore.loadPreviousPage();
        currPageLabel.innerText = `page: ${ usersStore.getCurrentPage() }`;

        renderTable( element );

    });
}