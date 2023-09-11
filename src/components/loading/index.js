import React from 'react';
import ReactLoading from 'react-loading';
import { useLoading } from "../../hooks";
import { Overlay } from './styles/loading';

function Loading({children, ...restProps}) {
    const {loading, setLoading} = useLoading();

    return(
        <>
            {loading ? 
                <Overlay {...restProps}>
                    <ReactLoading type={"spinningBubbles"} color={"#ffffff"} height={"100px"} width={"100px"} />
                </Overlay>
            : null}
        </>
    );
}

export default Loading;