import React, { useState, useEffect } from 'react';
import {SearchDescriptionData} from './searchDescriptionData';
//@ts-ignore 
import styles from './style.css'

interface CategoryDescription {
    [key: string]: {
        "bloco-text": [string];
    }
} 

const SearchDescription = () => {

    const [catDescription, setCatDescription] = useState({});
    const [currentCatDescription, setCurrentCatDescription] = useState<CategoryDescription>({});
    
 
    function chooseDescription() {
        const pageLocation = window.location.href;  
        const newpageLocation = pageLocation + " ";
        console.log('teste newpagelocation: ' + newpageLocation);
        const filteredCatDescription = Object.keys(catDescription)
            .filter(key => newpageLocation.includes(key))
            .reduce((obj, key) => { 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                obj[key] = catDescription[key]; 
                return obj; 
            }, {}); 
        setCurrentCatDescription(filteredCatDescription);
    }

    useEffect(() => {
        // Seguir este modelo de descrição, basta adicionar mais um item neste objeto, o nome o item deve ser o a url da categoria ex: jeans/femino com um espaço na frente
        setCatDescription(SearchDescriptionData());
    }, []);

    useEffect(() => {
        if(!(Object.keys(catDescription).length === 0 && catDescription.constructor === Object)) {
            chooseDescription();
        }
    }, [catDescription]);

    useEffect(() => {
        console.log(currentCatDescription);
    }, [currentCatDescription]);

    return (
        <>
            {!(Object.keys(currentCatDescription).length === 0 && currentCatDescription.constructor === Object) &&
                <div className={styles.SEODescription}>

                    <div dangerouslySetInnerHTML={{ __html: currentCatDescription[Object.keys(currentCatDescription)[0]]["bloco-text"].join("") }} />

                </div>    
            }
        </>
    );
};

export default SearchDescription;