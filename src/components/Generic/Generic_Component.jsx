import React from 'react';
import { useParams } from "react-router-dom";

const Generic_Component = () => {

    let { module } = useParams();

    return (
        <div>
            {module}
        </div>
    )
}

export default Generic_Component
