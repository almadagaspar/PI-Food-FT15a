import React from "react";

export default function Diet({ diet }) {  // Accedo mediante deestructuring a las props que envian a este componente.
    return (
        // <React.Fragment>
            <option value={diet}>{diet}</option>     
        // </React.Fragment>
    );
}