import React from "react";
import {RiDownloadFill} from "react-icons/ri";

interface PropDownloadButton {
    id: string;
    movieURL: string;
}

const DownloadButton: React.FC<PropDownloadButton> = ({id, movieURL}) => {
    return(
        <a className={`text-3xl`} href={movieURL} download>
            <RiDownloadFill/>
        </a>
    )
}

export default React.memo(DownloadButton);